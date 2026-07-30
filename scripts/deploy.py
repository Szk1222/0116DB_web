#!/usr/bin/env python3
"""
Deploy the static files under web/ through JumpServer.

Usage:
  python3 scripts/deploy.py --env dev
  python3 scripts/deploy.py --env fat

The script expects deploy.config.json in the project root. The archive contains
the contents of web/ directly, so web/index.html becomes remote_path/index.html.
"""

import argparse
import base64
import http.server
import ipaddress
import json
import os
import re
import shlex
import socket
import socketserver
import subprocess
import sys
import tarfile
import tempfile
import textwrap
import threading
import time
from pathlib import Path
from typing import Iterable, Optional, Tuple


pyotp = None
pexpect = None
DEFAULT_TRANSFER_TIMEOUT_SECONDS = 30 * 60


def ensure_runtime_deps() -> None:
    global pyotp
    global pexpect

    missing = []
    try:
        import pyotp as imported_pyotp

        pyotp = imported_pyotp
    except ImportError:
        missing.append("pyotp")

    try:
        import pexpect as imported_pexpect

        pexpect = imported_pexpect
    except ImportError:
        missing.append("pexpect")

    if missing:
        print("Missing deploy dependencies: " + ", ".join(missing))
        print("Install with: python3 -m pip install " + " ".join(missing))
        sys.exit(1)


def load_config(config_file: Path) -> dict:
    if not config_file.exists():
        print("Config file not found: {}".format(config_file))
        print("Copy deploy.config.example.json to deploy.config.json and fill secrets.")
        sys.exit(1)

    with config_file.open("r", encoding="utf-8") as f:
        return json.load(f)


def generate_totp(secret: str) -> str:
    remaining = 30 - (int(time.time()) % 30)
    if remaining <= 3:
        print("TOTP window is about to rotate; waiting {}s...".format(remaining + 1))
        time.sleep(remaining + 1)

    code = pyotp.TOTP(secret).now()
    remaining = 30 - (int(time.time()) % 30)
    print("TOTP code generated; expires in {}s.".format(remaining))
    return code


def make_tar(local_dir: Path, tar_path: Path) -> None:
    print("Packaging {} ...".format(local_dir))
    with tarfile.open(tar_path, "w:gz") as tar:
        for item in sorted(local_dir.iterdir(), key=lambda p: p.name):
            if item.name == ".DS_Store":
                continue
            tar.add(item, arcname=item.name)

    size_mb = tar_path.stat().st_size / 1024 / 1024
    print("Archive ready: {:.1f} MB".format(size_mb))


def get_local_ip(target_host: str) -> str:
    override_ip = os.environ.get("DEPLOY_LOCAL_IP")
    if override_ip:
        return override_ip

    def is_reachable_local_ip(ip: str) -> bool:
        try:
            addr = ipaddress.ip_address(ip)
        except ValueError:
            return False

        benchmark_net = ipaddress.ip_network("198.18.0.0/15")
        return (
            addr.version == 4
            and not addr.is_loopback
            and not addr.is_link_local
            and addr not in benchmark_net
        )

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect((target_host, 80))
        ip = s.getsockname()[0]
        s.close()
        if is_reachable_local_ip(ip):
            return ip
    except Exception:
        pass

    try:
        ifconfig = subprocess.check_output(["ifconfig"], text=True)
        candidates = re.findall(r"\binet\s+(\d+\.\d+\.\d+\.\d+)\b", ifconfig)
        private_candidates = [
            ip
            for ip in candidates
            if is_reachable_local_ip(ip) and ipaddress.ip_address(ip).is_private
        ]
        if private_candidates:
            return private_candidates[0]
    except Exception:
        pass

    return "127.0.0.1"


def start_http_server(serve_dir: Path, port: int = 0) -> Tuple[socketserver.TCPServer, int]:
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, fmt, *args):
            pass

        def translate_path(self, path):
            import urllib.parse

            path = urllib.parse.unquote(path.split("?", 1)[0]).lstrip("/")
            return str(serve_dir / path)

    server = socketserver.TCPServer(("0.0.0.0", port), QuietHandler)
    actual_port = server.server_address[1]
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, actual_port


def password_pattern() -> str:
    return r"[Pp]assword:|" + "\u5bc6\u7801\uff1a|\u5bc6\u7801:"


def sudo_password_pattern() -> str:
    return r"\[sudo\].*(?:[Pp]assword|" + "\u5bc6\u7801" + r")"


def shell_quote(value: object) -> str:
    return shlex.quote(str(value))


def join_remote_path(base: str, *parts: str) -> str:
    result = base.rstrip("/") or "/"
    for part in parts:
        clean_part = part.strip("/")
        if clean_part:
            result = "{}/{}".format(result.rstrip("/"), clean_part)
    return result


def infer_writable_base(remote_path: str) -> Optional[Tuple[str, str]]:
    """Keep deploy-host writes inside its writable html_dev/html_fat subtree."""
    normalized = remote_path.rstrip("/")
    match = re.match(r"^(.*/html_(?:dev|fat))(?:/(.*))?$", normalized)
    if not match:
        return None
    return match.group(1), match.group(2) or "."


def jumpserver_deploy(
    jump_cfg: dict,
    target_cfg: dict,
    tar_path: Path,
    tar_name: str,
    local_ip: str,
    http_port: int,
    remote_path: str,
    deploy_cfg: Optional[dict] = None,
    transfer_timeout_seconds: int = DEFAULT_TRANSFER_TIMEOUT_SECONDS,
) -> bool:
    j_host = jump_cfg["host"]
    j_port = jump_cfg["port"]
    j_user = jump_cfg["username"]
    j_password = jump_cfg["password"]
    totp_code = generate_totp(jump_cfg["totp_secret"])

    t_host = target_cfg["host"]
    target_selector = str(
        target_cfg.get("asset_query") or target_cfg.get("asset_id") or t_host
    )
    target_choice = str(target_cfg.get("asset_choice") or "")
    if target_cfg.get("asset_query") and not target_choice:
        target_choice = "1"

    t_user = target_cfg.get("username", "")
    t_pass = target_cfg.get("password", "")
    sudo_pass = target_cfg.get("sudo_password", target_cfg.get("su_password", t_pass))

    use_deploy_host = bool(deploy_cfg)
    writable_base = infer_writable_base(remote_path) if use_deploy_host else None
    if writable_base:
        remote_work_dir, relative_remote_path = writable_base
        remote_tar = join_remote_path(remote_work_dir, tar_name)
    else:
        remote_work_dir = None
        relative_remote_path = None
        remote_tar = "/tmp/{}".format(tar_name)
    download_url = "http://{}:{}/{}".format(local_ip, http_port, tar_name)

    ssh_options = [
        "-o StrictHostKeyChecking=no",
        "-o ConnectTimeout=30",
        "-o HostKeyAlgorithms=+ssh-rsa",
    ]
    for option in jump_cfg.get("ssh_options", []):
        ssh_options.append(option)

    ssh_cmd = "ssh {} -p {} {}@{}".format(
        " ".join(ssh_options), j_port, j_user, j_host
    )
    print("Connecting to JumpServer: {}@{}:{}".format(j_user, j_host, j_port))
    child = pexpect.spawn(
        "bash", ["-c", ssh_cmd], encoding="utf-8", timeout=120, echo=False
    )
    child.logfile_read = sys.stdout
    deploy_host_root_escalated = False

    def marker_pattern(marker: str) -> str:
        return r"(?m)^{}\r?$".format(re.escape(marker))

    patterns = [
        r"are you sure you want to continue connecting",
        password_pattern(),
        r"Please enter 6 digits",
        r"\[MFA auth\]:",
        "\u6ca1\u6709\u8d44\u4ea7|No assets?|No asset",
        r"Opt>",
        r"\$\s*$",
        r"#\s*$",
        r"[Pp]ermission denied",
        r"Connection refused",
        r"No PTY requested",
        pexpect.EOF,
        pexpect.TIMEOUT,
    ]
    (
        ASK_HOSTKEY,
        ASK_PASSWORD,
        TOTP_HINT,
        TOTP_PROMPT,
        NO_ASSET,
        JUMP_MENU,
        USER_SHELL,
        ROOT_SHELL,
        PERMISSION_DENIED,
        CONNECTION_REFUSED,
        NO_PTY,
        EOF_REACHED,
        WAIT_TIMEOUT,
    ) = range(len(patterns))

    def wait_shell(timeout: int = 30) -> bool:
        idx = child.expect(
            [r"\$\s*$", r"#\s*$", r"\$\s", r"#\s", pexpect.TIMEOUT, pexpect.EOF],
            timeout=timeout,
        )
        return idx in (0, 1, 2, 3)

    def upload_tar_over_shell(timeout: int = transfer_timeout_seconds) -> bool:
        remote_b64 = "{}.b64".format(remote_tar)
        marker = "__OFFICIAL_WEBSITE_2026_DEPLOY_B64__"

        print("HTTP download failed; uploading archive over the SSH session...")
        child.sendline("stty -echo && echo STTY_OK")
        if child.expect([marker_pattern("STTY_OK"), pexpect.TIMEOUT], timeout=10) != 0:
            print("Failed to disable remote echo.")
            return False
        wait_shell(timeout=5)

        old_logfile = child.logfile_read
        old_delay = child.delaybeforesend
        try:
            child.logfile_read = None
            child.delaybeforesend = 0
            encoded = base64.b64encode(tar_path.read_bytes()).decode("ascii")
            wrapped = "\n".join(textwrap.wrap(encoded, 1024))
            child.sendline("cat > '{}' <<'{}'".format(remote_b64, marker))
            child.send(wrapped + "\n")
            child.sendline(marker)
            if not wait_shell(timeout=timeout):
                return False
        finally:
            child.logfile_read = old_logfile
            child.delaybeforesend = old_delay

        child.sendline(
            "base64 -d '{}' > '{}' && rm -f '{}' && stty echo && echo UPLOAD_OK "
            "|| (stty echo; echo UPLOAD_FAIL)".format(remote_b64, remote_tar, remote_b64)
        )
        idx = child.expect(
            [marker_pattern("UPLOAD_OK"), marker_pattern("UPLOAD_FAIL"), pexpect.TIMEOUT],
            timeout=timeout,
        )
        if idx == 0:
            wait_shell(timeout=5)
            return True

        child.sendline("stty echo")
        wait_shell(timeout=5)
        return False

    def read_current_user(timeout: int = 10) -> Optional[str]:
        child.sendline("whoami")
        current_user = None
        for _ in range(10):
            idx = child.expect(
                [r"(?m)^([A-Za-z0-9_.-]+)\r?$", r"\$\s*$", r"#\s*$", pexpect.TIMEOUT],
                timeout=timeout,
            )
            if idx == 0:
                current_user = child.match.group(1)
                continue
            if idx in (1, 2):
                return current_user
            return None
        return current_user

    def connect_deploy_host() -> bool:
        nonlocal deploy_host_root_escalated

        if not deploy_cfg:
            return True

        d_host = deploy_cfg["host"]
        d_port = deploy_cfg.get("port", 22)
        d_user = deploy_cfg["username"]
        d_pass = deploy_cfg.get("password", "")
        use_sudo = bool(deploy_cfg.get("use_sudo"))
        d_sudo_pass = deploy_cfg.get(
            "sudo_password", deploy_cfg.get("su_password", d_pass)
        )
        deploy_ssh_options = [
            "-o",
            "StrictHostKeyChecking=no",
            "-o",
            "UserKnownHostsFile=/dev/null",
            "-o",
            "ConnectTimeout=30",
        ]
        for option in deploy_cfg.get("ssh_options", []):
            deploy_ssh_options.append(str(option))
        deploy_ssh_parts = [
            "ssh",
            *deploy_ssh_options,
            "-p",
            str(d_port),
            "{}@{}".format(d_user, d_host),
        ]

        print("")
        print("[5/6] Opening deploy host {}@{}:{}...".format(d_user, d_host, d_port))
        child.sendline(" ".join(shell_quote(part) for part in deploy_ssh_parts))

        deploy_patterns = [
            r"are you sure you want to continue connecting",
            password_pattern(),
            r"\$\s*$",
            r"#\s*$",
            r"[Pp]ermission denied",
            r"Connection refused",
            r"Could not resolve hostname",
            pexpect.EOF,
            pexpect.TIMEOUT,
        ]
        (
            DEPLOY_ASK_HOSTKEY,
            DEPLOY_ASK_PASSWORD,
            DEPLOY_USER_SHELL,
            DEPLOY_ROOT_SHELL,
            DEPLOY_PERMISSION_DENIED,
            DEPLOY_CONNECTION_REFUSED,
            DEPLOY_HOST_RESOLVE_FAILED,
            DEPLOY_EOF_REACHED,
            DEPLOY_WAIT_TIMEOUT,
        ) = range(len(deploy_patterns))

        for _ in range(20):
            idx = child.expect(deploy_patterns, timeout=30)
            if idx == DEPLOY_ASK_HOSTKEY:
                child.sendline("yes")
            elif idx == DEPLOY_ASK_PASSWORD:
                child.sendline(d_pass)
            elif idx in (DEPLOY_USER_SHELL, DEPLOY_ROOT_SHELL):
                current_user = read_current_user()
                if current_user == "root":
                    print("Entered deploy host as root.")
                    return True
                if current_user != d_user:
                    print(
                        "Deploy host user check failed; current user: {}".format(
                            current_user or "unknown"
                        )
                    )
                    return False

                print("Confirmed deploy host user: {}".format(d_user))
                if not use_sudo:
                    return True

                print("Switching to root on deploy host with sudo su...")
                child.sendline("sudo su")
                sudo_idx = child.expect(
                    [sudo_password_pattern(), r"#\s*$", pexpect.TIMEOUT],
                    timeout=15,
                )
                if sudo_idx == 0:
                    child.sendline(d_sudo_pass)
                    if not wait_shell(timeout=15):
                        print("sudo su failed on deploy host.")
                        return False
                elif sudo_idx == 2:
                    print("sudo su timed out on deploy host.")
                    return False

                current_user = read_current_user()
                if current_user != "root":
                    print(
                        "Deploy host root user check failed; current user: {}".format(
                            current_user or "unknown"
                        )
                    )
                    return False

                deploy_host_root_escalated = True
                print("Confirmed root user on deploy host.")
                return True
            elif idx == DEPLOY_PERMISSION_DENIED:
                print("Deploy host authentication failed.")
                return False
            elif idx == DEPLOY_CONNECTION_REFUSED:
                print("Deploy host connection was refused.")
                return False
            elif idx == DEPLOY_HOST_RESOLVE_FAILED:
                print("Deploy host address could not be resolved.")
                return False
            elif idx in (DEPLOY_EOF_REACHED, DEPLOY_WAIT_TIMEOUT):
                print("Timed out waiting for deploy host shell.")
                return False

        print("Could not enter deploy host shell.")
        return False

    totp_sent = False

    stage_count = 6 if use_deploy_host else 5

    print("")
    print("[1/{}] Authenticating on JumpServer...".format(stage_count))
    in_jump_menu = False
    for _ in range(20):
        idx = child.expect(patterns, timeout=30)
        if idx == ASK_HOSTKEY:
            child.sendline("yes")
        elif idx == ASK_PASSWORD:
            child.sendline(j_password)
        elif idx == TOTP_HINT:
            pass
        elif idx == TOTP_PROMPT:
            if not totp_sent:
                child.sendline(totp_code)
                totp_sent = True
        elif idx == JUMP_MENU:
            print("Entered JumpServer menu.")
            in_jump_menu = True
            break
        elif idx == PERMISSION_DENIED:
            print("JumpServer authentication failed.")
            child.close()
            return False
        elif idx in (CONNECTION_REFUSED, NO_PTY, EOF_REACHED, WAIT_TIMEOUT):
            print("JumpServer connection failed; idx={}.".format(idx))
            child.close()
            return False

    if not in_jump_menu:
        print("Could not enter JumpServer menu.")
        child.close()
        return False

    print("")
    print(
        "[2/{}] Opening target host {} with selector {}...".format(
            stage_count, t_host, target_selector
        )
    )
    child.send(target_selector + "\r")

    in_target_shell = False
    target_choice_sent = False
    for _ in range(20):
        idx = child.expect(patterns, timeout=30)
        if idx == ASK_PASSWORD:
            child.send(t_pass + "\r")
        elif idx in (USER_SHELL, ROOT_SHELL):
            print("Entered target shell.")
            in_target_shell = True
            break
        elif idx == NO_ASSET:
            print("JumpServer did not find target asset: {}".format(target_selector))
            child.close()
            return False
        elif idx == JUMP_MENU:
            if target_choice and not target_choice_sent:
                print("Selecting search result: {}".format(target_choice))
                child.send(target_choice + "\r")
                target_choice_sent = True
            else:
                print("Retrying target selector: {}".format(target_selector))
                child.send(target_selector + "\r")
        elif idx == PERMISSION_DENIED:
            print("Target host authentication failed.")
            child.close()
            return False
        elif idx in (CONNECTION_REFUSED, NO_PTY, EOF_REACHED, WAIT_TIMEOUT):
            print("Timed out waiting for target shell.")
            child.close()
            return False

    if not in_target_shell:
        print("Could not enter target shell.")
        child.close()
        return False

    current_user = read_current_user()
    if not current_user:
        print("Could not read current remote user.")
        child.close()
        return False

    print("")
    if current_user == t_user:
        print("[3/{}] Already running as target user {}.".format(stage_count, t_user))
    else:
        print("[3/{}] Switching to target user {}...".format(stage_count, t_user))
        child.sendline("su - {}".format(t_user))
        idx = child.expect([password_pattern(), pexpect.TIMEOUT], timeout=15)
        if idx == 0:
            child.sendline(t_pass)
            if not wait_shell(timeout=15):
                print("su to {} failed.".format(t_user))
                child.close()
                return False
        else:
            print("Timed out while switching to {}.".format(t_user))
            child.close()
            return False

    current_user = read_current_user()
    if current_user != t_user:
        print("Target user check failed; current user: {}".format(current_user or "unknown"))
        child.close()
        return False
    print("Confirmed target user: {}".format(t_user))

    print("")
    print("[4/{}] Switching to root with sudo su...".format(stage_count))
    child.sendline("sudo su")
    idx = child.expect([sudo_password_pattern(), r"#\s*$", pexpect.TIMEOUT], timeout=15)
    if idx == 0:
        child.sendline(sudo_pass)
        if not wait_shell(timeout=15):
            print("sudo su failed.")
            child.close()
            return False
    elif idx == 2:
        print("sudo su timed out.")
        child.close()
        return False

    current_user = read_current_user()
    if current_user != "root":
        print("Root user check failed; current user: {}".format(current_user or "unknown"))
        child.close()
        return False
    print("Confirmed root user.")

    if use_deploy_host and not connect_deploy_host():
        child.close()
        return False

    deploy_stage = 6 if use_deploy_host else 5
    deploy_location = "deploy host" if use_deploy_host else "target host"
    remote_tar_quoted = shell_quote(remote_tar)
    remote_path_quoted = shell_quote(remote_path)
    remote_work_dir_quoted = shell_quote(remote_work_dir) if remote_work_dir else None
    relative_remote_path_quoted = (
        shell_quote(relative_remote_path) if relative_remote_path else None
    )

    print("")
    print(
        "[{}/{}] Deploying archive on {}...".format(
            deploy_stage, stage_count, deploy_location
        )
    )
    try:
        if remote_work_dir_quoted:
            print("Checking writable base: {}".format(remote_work_dir))
            child.sendline(
                "test -d {0} && test -w {0} "
                "&& echo WORKDIR_OK || echo WORKDIR_FAIL".format(
                    remote_work_dir_quoted
                )
            )
            if child.expect(
                [
                    marker_pattern("WORKDIR_OK"),
                    marker_pattern("WORKDIR_FAIL"),
                    pexpect.TIMEOUT,
                ],
                timeout=15,
            ) != 0:
                print(
                    "Writable base does not exist or is not writable: {}".format(
                        remote_work_dir
                    )
                )
                child.close()
                return False
            wait_shell(timeout=5)

        print("Downloading {} to {} ...".format(download_url, remote_tar))
        child.sendline(
            "wget -O {} {} && echo WGET_OK || echo WGET_FAIL".format(
                remote_tar_quoted, shell_quote(download_url)
            )
        )
        idx = child.expect(
            [marker_pattern("WGET_OK"), marker_pattern("WGET_FAIL"), pexpect.TIMEOUT],
            timeout=transfer_timeout_seconds,
        )
        if idx == 1:
            if not upload_tar_over_shell():
                print("Archive upload fallback failed.")
                child.close()
                return False
            print("Archive upload fallback succeeded.")
        elif idx == 2:
            print(
                "wget timed out after {}s.".format(transfer_timeout_seconds)
            )
            child.sendcontrol("c")
            if wait_shell(timeout=15):
                child.sendline(
                    "rm -f {} && echo TIMEOUT_CLEAN_OK || echo TIMEOUT_CLEAN_FAIL".format(
                        remote_tar_quoted
                    )
                )
                cleanup_idx = child.expect(
                    [
                        marker_pattern("TIMEOUT_CLEAN_OK"),
                        marker_pattern("TIMEOUT_CLEAN_FAIL"),
                        pexpect.TIMEOUT,
                    ],
                    timeout=30,
                )
                if cleanup_idx == 0:
                    print("Removed the partial archive after timeout.")
                    wait_shell(timeout=5)
                else:
                    print("Could not remove the partial archive after timeout.")
            else:
                print("Could not recover the remote shell after wget timeout.")
            child.close()
            return False
        else:
            print("Download succeeded.")
            wait_shell(timeout=10)

        child.sendline(
            "ls -lh {} && echo LS_OK || echo LS_FAIL".format(remote_tar_quoted)
        )
        if child.expect(
            [marker_pattern("LS_OK"), marker_pattern("LS_FAIL"), pexpect.TIMEOUT],
            timeout=15,
        ) != 0:
            print("Remote archive was not found.")
            child.close()
            return False
        wait_shell(timeout=5)

        print("Clearing remote directory: {}".format(remote_path))
        if remote_work_dir_quoted and relative_remote_path_quoted:
            child.sendline(
                "cd {0} && mkdir -p {1} "
                "&& find {1} -mindepth 1 -maxdepth 1 -exec rm -rf -- {{}} + "
                "&& echo CLEAR_OK || echo CLEAR_FAIL".format(
                    remote_work_dir_quoted, relative_remote_path_quoted
                )
            )
        else:
            child.sendline(
                "mkdir -p {0} "
                "&& find {0} -mindepth 1 -maxdepth 1 -exec rm -rf -- {{}} + "
                "&& echo CLEAR_OK || echo CLEAR_FAIL".format(remote_path_quoted)
            )
        if child.expect(
            [marker_pattern("CLEAR_OK"), marker_pattern("CLEAR_FAIL"), pexpect.TIMEOUT],
            timeout=30,
        ) != 0:
            print("Failed to clear remote directory.")
            child.close()
            return False
        wait_shell(timeout=5)

        print("Extracting archive to: {}".format(remote_path))
        if remote_work_dir_quoted and relative_remote_path_quoted:
            child.sendline(
                "cd {0} && tar -xzf {1} -C {2} "
                "&& echo TAR_OK || echo TAR_FAIL".format(
                    remote_work_dir_quoted,
                    remote_tar_quoted,
                    relative_remote_path_quoted,
                )
            )
        else:
            child.sendline(
                "tar -xzf {} -C {} && echo TAR_OK || echo TAR_FAIL".format(
                    remote_tar_quoted, remote_path_quoted
                )
            )
        if child.expect(
            [marker_pattern("TAR_OK"), marker_pattern("TAR_FAIL"), pexpect.TIMEOUT],
            timeout=60,
        ) != 0:
            print("Failed to extract archive.")
            child.close()
            return False
        wait_shell(timeout=5)

        child.sendline("rm -f {} && echo CLEAN_OK".format(remote_tar_quoted))
        child.expect([marker_pattern("CLEAN_OK"), pexpect.TIMEOUT], timeout=10)
        wait_shell(timeout=5)

        print("Remote deploy finished on {}.".format(deploy_location))
    except Exception as exc:
        print("Remote deploy command failed: {}".format(exc))
        child.close()
        return False

    if use_deploy_host:
        deploy_host_exit_count = 2 if deploy_host_root_escalated else 1
        for _ in range(deploy_host_exit_count):
            child.sendline("exit")
            wait_shell(timeout=10)
            time.sleep(0.5)
    child.sendline("exit")
    time.sleep(0.5)
    child.sendline("exit")
    time.sleep(0.5)
    child.send("q\r")
    child.close()
    return True


def parse_args(env_choices: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Deploy web/ static files to a remote path through JumpServer."
    )
    parser.add_argument("--env", required=True, choices=list(env_choices), help="deploy env")
    parser.add_argument(
        "--config",
        default="deploy.config.json",
        help="config file path relative to the project root",
    )
    parser.add_argument(
        "--source-dir",
        default="web",
        help="source directory relative to the project root; defaults to web",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="only validate config and create the archive; do not connect",
    )
    parser.add_argument(
        "--transfer-timeout",
        type=int,
        default=DEFAULT_TRANSFER_TIMEOUT_SECONDS,
        help="archive transfer timeout in seconds; defaults to 1800",
    )
    return parser.parse_args()


def main() -> None:
    project_dir = Path(__file__).resolve().parent.parent
    args = parse_args(("dev", "fat"))

    config_file = project_dir / args.config
    source_dir = project_dir / args.source_dir

    if not source_dir.exists() or not any(source_dir.iterdir()):
        print("Source directory does not exist or is empty: {}".format(source_dir))
        sys.exit(1)
    if args.transfer_timeout <= 0:
        print("Transfer timeout must be greater than zero.")
        sys.exit(1)

    config = load_config(config_file)
    jump_cfg = config["jump_host"]
    target_cfg = config["target_host"]
    deploy_cfg = config.get("deploy_host")
    remote_path = config["deploy"][args.env]["remote_path"]

    print("")
    print("Deploy env: {}".format(args.env))
    print("Source dir: {}".format(source_dir))
    print(
        "Target relay: {}@{}:{}".format(
            target_cfg.get("username", ""),
            target_cfg["host"],
            target_cfg.get("port", 22),
        )
    )
    if deploy_cfg:
        print(
            "Deploy host: {}@{}:{}".format(
                deploy_cfg.get("username", ""),
                deploy_cfg["host"],
                deploy_cfg.get("port", 22),
            )
        )
    print("Remote path: {}".format(remote_path))
    print("Transfer timeout: {}s".format(args.transfer_timeout))
    print("")

    with tempfile.TemporaryDirectory() as tmpdir:
        tar_name = "official_website_2026_{}_{}.tar.gz".format(
            args.env, int(time.time())
        )
        tar_path = Path(tmpdir) / tar_name
        make_tar(source_dir, tar_path)

        if args.dry_run:
            print("Dry run finished; no remote connection was opened.")
            return

        ensure_runtime_deps()
        download_host = deploy_cfg["host"] if deploy_cfg else target_cfg["host"]
        local_ip = get_local_ip(download_host)
        server, http_port = start_http_server(Path(tmpdir))
        print("Local archive URL: http://{}:{}/{}".format(local_ip, http_port, tar_name))
        print("")

        try:
            ok = jumpserver_deploy(
                jump_cfg=jump_cfg,
                target_cfg=target_cfg,
                tar_path=tar_path,
                tar_name=tar_name,
                local_ip=local_ip,
                http_port=http_port,
                remote_path=remote_path,
                deploy_cfg=deploy_cfg,
                transfer_timeout_seconds=args.transfer_timeout,
            )
        finally:
            server.shutdown()

    if not ok:
        print("")
        print("Deploy failed.")
        sys.exit(1)

    print("")
    print("Deploy succeeded: {}".format(remote_path))


if __name__ == "__main__":
    main()
