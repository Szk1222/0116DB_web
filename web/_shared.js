/* =========================================================
   标贝 Cyber · 共享行为（Header / Footer / Cursor / Reveal）
   ========================================================= */
(function () {

  /* ── 数据源 ─────────────────────────────────────── */
  const BRAND_LOGO = 'images/logo.png';

  const DATASETS = [
    { href: 'dataset_speech_asr.html',  name: '语音识别数据集', en: 'ASR Dataset',   icon: 'M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zm-7 9a7 7 0 0 0 14 0M12 19v3' },
    { href: 'dataset_speech_tts.html',  name: '语音合成数据集', en: 'TTS Dataset',   icon: 'M9 18V5l12-2v13M6 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm12-2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' },
    { href: 'dataset_image.html',       name: '图像数据集',     en: 'Image Dataset', icon: 'M3 5h18M3 12h18M3 19h12' },
    { href: 'dataset_video.html',       name: '视频数据集',     en: 'Video Dataset', icon: 'M15 10l4.553-2.277A1 1 0 0 1 21 8.649v6.702a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z' },
    { href: 'dataset_text.html',        name: '文本数据集',     en: 'Text Dataset',  icon: 'M4 6h16M4 10h16M4 14h10M4 18h6' },
    { href: 'dataset_llm.html',         name: '大模型数据集',   en: 'LLM Dataset',   icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  ];

  const TOOLS_ANNOTATION = [
    { href: 'tool_annotation_3d.html',  name: '3D 点云标注',   en: '3D Point Cloud' },
    { href: 'tool_annotation_2d.html',  name: '2D 图像标注',   en: '2D Image' },
    { href: 'tool_annotation_tts.html', name: '语音合成标注',   en: 'TTS Annotation' },
    { href: 'tool_annotation_asr.html', name: '语音识别标注',   en: 'ASR Annotation' },
  ];
  const TOOLS_COLLECTION = [
    { href: 'tool_collection.html', name: '标贝易采', en: 'EasyColl' },
  ];
  const TOOLS_OPENPLATFORM = [
    { href: 'tool_openplatform.html', name: '开放平台', en: 'Open Platform' },
  ];
  const TOOLS_READER = [
    { href: 'tool_reader.html', name: '标贝悦读', en: 'YueReader' },
  ];

  /* 工具平台：纵向四个工具（各自独立页面） */
  const TOOLS_PLATFORMS = [
    { href: 'tool_annotation.html',   name: '标注平台', en: 'Annotation' },
    { href: 'tool_collection.html',   name: '采集平台', en: 'Collection' },
    { href: 'tool_reader.html',       name: '标贝悦读', en: 'YueReader' },
    { href: 'tool_openplatform.html', name: '开放平台', en: 'Open Platform' },
  ];

  const SOL_INDUSTRY_SCENES = [
    { href: 'solution_embodied.html', name: '具身人',   en: 'Embodied AI' },
    { href: 'solution_auto.html',     name: '自动驾驶', en: 'Autonomous Driving' },
    { href: 'solution_llm.html',      name: '大模型',   en: 'Large Model' },
    { href: 'solution_finance.html',  name: '金融',     en: 'Finance' },
    { href: 'solution_medical.html',  name: '医疗',     en: 'Medical' },
    { href: 'solution_internet.html', name: '互联网',   en: 'Internet' },
    { href: 'solution_terminal.html', name: '智能终端', en: 'Smart Device' },
    { href: 'solution_review.html',   name: '内容审核', en: 'Content Review' },
  ];
  const SOL_DATA_SERVICE = [
    { href: 'data_service_collection.html', name: '数据采集服务', en: 'Collection' },
    { href: 'data_service_annotation.html', name: '数据标注服务', en: 'Annotation' },
  ];
  const SOL_VOICE = [
    { href: 'voice_ai.html#asr', name: 'ASR 语音识别', en: 'Speech Recognition', badge: '' },
    { href: 'voice_ai.html#tts', name: 'TTS 语音合成', en: 'Text-to-Speech',     badge: '' },
    { href: 'voice_ai.html#ext', name: '语音拓展产品', en: 'Voice Extension',    badge: '' },
  ];

  const INDUSTRY_SCENES = {
    embodied: {
      title: '具身人解决方案', en: 'Embodied AI', image: 'images/scenes/embodied.jpg',
      summary: '面向人形机器人、服务机器人与具身智能训练，构建多模态感知、动作理解、任务执行与人机交互数据闭环。',
      meta: ['多模态采集', '动作指令标注', '机器人评测'],
      services: [
        ['动作与任务采集', '采集操作轨迹、环境状态、指令语义与反馈结果，沉淀可复用的任务数据。', 'images/scenes/embodied.jpg'],
        ['多模态标注', '同步标注视频、语音、文本、点云与传感器数据，支持动作识别和策略学习。', 'images/datasets/video.jpg'],
        ['评测数据构建', '围绕导航、抓取、避障、问答等任务搭建标准化评测集。', 'images/datasets/llm.jpg']
      ],
      advantages: ['跨模态同步采集与质检', '任务级标签体系可扩展', '支持复杂环境与长链路任务', '交付格式适配训练与评测'],
      cases: [
        ['服务机器人室内交互数据', '覆盖家庭、商超、展厅等环境的人机对话、路径规划与任务执行数据。', 'images/scenes/home.jpg', ['导航', '语音交互', '任务执行']],
        ['人形机器人操作任务数据', '围绕抓取、搬运、整理等动作构建视频与指令对齐样本。', 'images/scenes/embodied.jpg', ['动作理解', '视觉标注', '策略训练']]
      ]
    },
    auto: {
      title: '自动驾驶解决方案', en: 'Autonomous Driving', image: 'images/scenes/auto.jpg',
      summary: '面向智能座舱、辅助驾驶和自动驾驶研发，提供舱内舱外采集、2D/3D/4D 标注、场景切片与多传感器融合数据服务。',
      meta: ['舱内舱外', '多传感器融合', '点云/视频标注'],
      services: [
        ['道路场景采集', '覆盖城市道路、高速、泊车、夜间、雨雾等关键场景数据采集。', 'images/scenes/auto.jpg'],
        ['2D/3D/4D 标注', '提供图像框、车道线、语义分割、点云框、连续帧追踪等标注。', 'images/datasets/cat-auto.jpg'],
        ['驾驶行为识别', '构建分心、疲劳、危险动作与座舱交互相关数据。', 'images/scenes/auto03.jpg'],
        ['车载语音服务', '覆盖车载语音识别与语音合成，支持唤醒、指令理解、播报音色与座舱交互体验优化。', 'images/datasets/asr.jpg']
      ],
      advantages: ['多源传感器时间对齐', '连续帧 ID 一致性管理', '自动预标注提升效率', '场景库按研发需求切片'],
      cases: [
        ['自动驾驶多传感器融合标注', '对摄像头、激光雷达与毫米波雷达数据进行联合标注，支撑感知模型迭代。', 'images/scenes/auto.jpg', ['点云', '2D/3D 融合', '连续帧']],
        ['驾驶员危险行为识别', '构建舱内视频数据，标注疲劳、分心、接打电话等危险行为。', 'images/datasets/cat-auto.jpg', ['座舱智能', '行为识别', '质检']]
      ]
    },
    llm: {
      title: '大模型解决方案', en: 'Large Model', image: 'images/scenes/llm.jpg',
      summary: '面向通用大模型、多模态大模型与垂直模型训练，提供指令数据、偏好数据、评测数据与安全对齐数据。',
      meta: ['SFT/RLHF', '多模态评测', '安全对齐'],
      services: [
        ['指令微调数据', '构建多轮对话、任务指令、工具调用与领域知识问答样本。', 'images/scenes/llm.jpg'],
        ['偏好与评测数据', '提供回复排序、事实性评估、安全性评估与专家打分流程。', 'images/datasets/llm.jpg'],
        ['多模态图文数据', '围绕图片、视频与文本构造描述、问答、推理与检索样本。', 'images/datasets/image.jpg']
      ],
      advantages: ['专家审核机制可配置', '标注规范版本化管理', '支持多轮一致性校验', '数据闭环适配训练评测'],
      cases: [
        ['企业知识问答数据建设', '将行业文档转化为高质量问答、摘要与多轮追问数据。', 'images/scenes/llm.jpg', ['SFT', '知识库', '评测']],
        ['多模态理解评测集', '围绕图文理解、细粒度识别和复杂推理构建评测数据。', 'images/datasets/llm.jpg', ['VQA', 'Caption', '多模态']]
      ]
    },
    finance: {
      title: '金融解决方案', en: 'Finance', image: 'images/scenes/finance.jpg',
      summary: '面向银行、保险、证券与金融科技场景，建设客服质检、风控审核、单证识别、舆情分析与合规评测数据。',
      meta: ['合规安全', '单证识别', '客服质检'],
      services: [
        ['金融语音与文本处理', '对客服通话、工单、合同文本进行转写、分类、实体与意图标注。', 'images/scenes/finance.jpg'],
        ['票据单证识别', '构建银行卡、票据、合同、表单等 OCR 与版面理解数据。', 'images/datasets/cat-ocr.jpg'],
        ['风控与合规评测', '建设异常交易、投诉舆情、营销合规与模型安全评测集。', 'images/datasets/text.jpg']
      ],
      advantages: ['隐私脱敏与权限管控', '金融字段体系可定制', '多轮质检保障一致性', '支持私有化流程交付'],
      cases: [
        ['智能客服质检数据', '对通话内容进行转写、情绪、意图和合规点标注。', 'images/scenes/finance-case01.jpg', ['ASR', '质检', '情绪']],
        ['金融票据 OCR 数据', '构建票据检测、字段转写与版面结构数据集。', 'images/datasets/cat-ocr.jpg', ['OCR', '字段抽取', '版面']]
      ]
    },
    medical: {
      title: '医疗解决方案', en: 'Medical', image: 'images/scenes/medical.jpg',
      summary: '面向临床文本、导诊问答与医疗语音场景，提供专业标注、结构化处理与模型评测数据服务。',
      meta: ['医疗语音', '临床文本', '专业审核'],
      services: [
        ['医疗数据标注', '支持病灶框选、分割、关键点与多模态影像标注。', 'images/scenes/medical.jpg'],
        ['临床文本结构化', '处理病历、检查报告、问诊记录中的实体、关系与摘要任务。', 'images/datasets/cat-medical.jpg'],
        ['医疗问答评测', '构建医学问答、导诊分诊与安全回答评测集。', 'images/datasets/text.jpg']
      ],
      advantages: ['医学专家参与复核', '标签体系贴合科室场景', '支持敏感信息脱敏', '质量抽检链路清晰'],
      cases: [
        ['医疗分割数据', '围绕特定病灶区域进行像素级分割与复核。', 'images/datasets/cat-medical.jpg', ['影像', 'Mask', '复核']],
        ['智能导诊问答数据', '构建症状描述、分诊建议与安全边界样本。', 'images/scenes/medical.jpg', ['问答', '分诊', '安全']]
      ]
    },
    internet: {
      title: '互联网解决方案', en: 'Internet', image: 'images/datasets/cat-retail.jpg',
      summary: '面向内容平台、电商、本地生活和在线服务场景，提供搜索推荐、商品理解、用户反馈和内容理解数据。',
      meta: ['商品理解', '推荐搜索', '用户反馈'],
      services: [
        ['商品与内容理解', '标注商品属性、图文描述、类目体系和内容标签。', 'images/scenes/Internet01.png'],
        ['用户反馈分析', '对评论、客服工单、社区内容进行意图、情绪与主题归因。', 'images/scenes/service.jpg'],
        ['搜索推荐评测', '构建相关性、排序偏好与召回质量评测数据。', 'images/datasets/text.jpg']
      ],
      advantages: ['标签层级灵活扩展', '适配高并发批量交付', '支持图文多模态处理', '指标反馈驱动迭代'],
      cases: [
        ['电商商品属性标注', '对商品图文进行类目、属性、风格与适用场景标注。', 'images/datasets/cat-retail.jpg', ['商品', '属性', '图文']],
        ['社区评论情绪分析', '为评论治理和推荐策略构建主题与情绪数据。', 'images/scenes/internetcase02.png', ['评论', '情绪', '主题']]
      ]
    },
    terminal: {
      title: '智能终端解决方案', en: 'Smart Device', image: 'images/scenes/home.jpg',
      summary: '面向智能硬件、家居设备、穿戴设备与车载终端，建设语音交互、视觉感知、端侧评测和多模态指令数据。',
      meta: ['端侧交互', '语音视觉', '低延迟评测'],
      services: [
        ['唤醒与语音交互', '采集多环境、多口音、多距离语音，支持唤醒、识别和意图理解。', 'images/scenes/home.jpg'],
        ['端侧视觉数据', '构建家庭、办公、户外等真实环境下的视觉识别数据。', 'images/scenes/terminal02.png'],
        ['设备体验评测', '围绕响应速度、误唤醒、识别准确率和用户体验搭建评测样本。', 'images/scenes/terminal03.png']
      ],
      advantages: ['覆盖真实设备环境', '支持噪声与远场采集', '多语种多口音可扩展', '交付格式适配端侧模型'],
      cases: [
        ['智能家居语音数据', '采集客厅、卧室、厨房等环境下的唤醒与控制指令。', 'images/scenes/home.jpg', ['远场', '指令', '噪声']],
        ['穿戴设备交互评测', '构建短语音、动作和场景化响应评测数据。', 'images/datasets/asr.jpg', ['穿戴', '短音频', '评测']]
      ]
    },
    review: {
      title: '内容审核解决方案', en: 'Content Review', image: 'images/scenes/service.jpg',
      summary: '面向平台治理与安全合规场景，提供文本、图像、音视频与多模态内容审核数据、策略评测和模型对齐服务。',
      meta: ['安全合规', '多模态审核', '策略评测'],
      services: [
        ['违规内容标注', '建设涉政、暴恐、低俗、广告、辱骂等多维审核标签数据。', 'images/scenes/review01.png'],
        ['音视频审核数据', '对音频、视频、直播切片进行风险识别、时间戳与证据标注。', 'images/datasets/video.jpg'],
        ['审核策略评测', '构建误判、漏放、边界样本和模型对抗评测集。', 'images/datasets/text.jpg']
      ],
      advantages: ['风险标签体系可配置', '边界样本沉淀能力强', '支持多轮安全复核', '评测结果可回流模型'],
      cases: [
        ['社区内容安全数据', '对图文帖、评论和短视频进行风险分类和证据标注。', 'images/scenes/reviewcase01.png', ['图文', '短视频', '安全']],
        ['模型安全对齐评测', '构建敏感问题、拒答边界与合规回答评测样本。', 'images/scenes/llm.jpg', ['安全', '对齐', '评测']]
      ]
    }
  };

  /* ── 小工具 ─────────────────────────────────────── */
  const IC = `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>`;

  function icPath(d) {
    return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
  }

  function badge(type) {
    if (!type) return '';
    const labels = { hot: 'HOT', new: 'NEW', free: '免费' };
    return `<span class="mega-badge badge-${type}">${labels[type] || type.toUpperCase()}</span>`;
  }

  /* 普通小下拉（数据集用） */
  function simpleMenu(items) {
    return `<div class="nav-menu">
      ${items.map(it => `
        <a href="${it.href}">
          <div class="mega-ds-icon">${icPath(it.icon)}</div>
          <span class="col"><span>${it.name}</span><small>${it.en}</small></span>
        </a>`).join('')}
    </div>`;
  }

  /* 二级标题箭头 */
  const MST_ARROW = `<svg class="mst-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  /* 二级标题：传入 href 时渲染为链接，否则只作为固定栏目标题 */
  function sectionTitle(name, href) {
    return href
      ? `<a class="mega-section-title" href="${href}">${name}${MST_ARROW}</a>`
      : `<div class="mega-section-title">${name}</div>`;
  }

  /* Mega 列 */
  function megaCol(head, subhead, items, headHref) {
    const rows = items.map(it =>
      `<a href="${it.href}">${IC}<span>${it.name}</span>${it.badge ? badge(it.badge) : ''}</a>`
    ).join('');
    return `<div class="mega-col">
      ${head ? sectionTitle(head, headHref) : ''}
      ${subhead ? `<div class="mega-subhead">${subhead}</div>` : ''}
      ${rows}
    </div>`;
  }

  /* ── 当前页高亮 ──────────────────────────────────── */
  const cur = (location.pathname.split('/').pop() || 'homepage.html');

  function isActive(group) {
    if (group === 'home')      return cur === '' || cur === 'homepage.html' || cur === 'index.html';
    if (group === 'datasets')  return cur.startsWith('dataset_') || cur === 'datasets_overview.html';
    if (group === 'tools')     return cur.startsWith('tool_');
    if (group === 'solutions') return cur.startsWith('solution_') || cur === 'solutions_overview.html'
                                   || cur === 'voice_ai.html'
                                   || cur.startsWith('data_service_');
    if (group === 'about')     return cur === 'about.html';
    return false;
  }

  function getCtaLabel() {
    return isActive('home') || isActive('tools') ? '预约试用' : '联系我们';
  }

  /* ── renderHeader ───────────────────────────────── */
  function renderHeader() {
    const el = document.getElementById('nav-placeholder');
    if (!el) return;
    const ctaLabel = getCtaLabel();

    /* 数据集 mega：六个数据集直接作为二级标题纵向排列 */
    const datasetsMega = `<div class="nav-mega" style="min-width:220px;">
      <div class="mega-col mega-col-vertical" style="min-width:200px;border-right:0;padding-right:16px;">
        ${DATASETS.map(it => sectionTitle(it.name, it.href)).join('')}
      </div>
    </div>`;

    /* 工具平台 mega：纵向四个二级标题（与其它栏目二级标题样式一致，无三级） */
    const toolsMega = `<div class="nav-mega" style="min-width:188px;">
      <div class="mega-col mega-col-vertical" style="min-width:168px;border-right:0;padding-right:16px;">
        ${TOOLS_PLATFORMS.map(it => sectionTitle(it.name, it.href)).join('')}
      </div>
    </div>`;

    /* 解决方案 mega */
    const solMega = `<div class="nav-mega" style="min-width:350px;">
      <div class="mega-col" style="min-width:165px;">
        ${sectionTitle('行业场景')}
        ${SOL_INDUSTRY_SCENES.map(it => `<a href="${it.href}">${IC}<span>${it.name}</span></a>`).join('')}
      </div>
      <div class="mega-col" style="min-width:145px;">
        ${sectionTitle('数据服务')}
        ${SOL_DATA_SERVICE.map(it => `<a href="${it.href}">${IC}<span>${it.name}</span></a>`).join('')}
        ${sectionTitle('智能语音', 'voice_ai.html')}
        ${SOL_VOICE.map(it => `<a href="${it.href}">${IC}<span>${it.name}</span>${it.badge ? badge(it.badge) : ''}</a>`).join('')}
      </div>
    </div>`;

    el.innerHTML = `
      <header class="header" id="header">
        <div class="header-inner">
          <a href="homepage.html" class="logo" aria-label="标贝科技首页">
            <img class="logo-img" src="${BRAND_LOGO}" alt="标贝科技 DataBaker Technology" />
          </a>

          <nav class="nav" aria-label="主导航">
            <div class="nav-item">
              <a class="nav-link ${isActive('home') ? 'active' : ''}" href="homepage.html">首页</a>
            </div>

            <div class="nav-item">
              <a class="nav-link ${isActive('datasets') ? 'active' : ''}" href="datasets_overview.html">
                数据集
                <svg class="nav-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4l3 3 3-3"/></svg>
              </a>
              ${datasetsMega}
            </div>

            <div class="nav-item">
              <button class="nav-link ${isActive('tools') ? 'active' : ''}" type="button" aria-haspopup="true">
                工具平台
                <svg class="nav-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4l3 3 3-3"/></svg>
              </button>
              ${toolsMega}
            </div>

            <div class="nav-item">
              <button class="nav-link ${isActive('solutions') ? 'active' : ''}" type="button" aria-haspopup="true">
                解决方案
                <svg class="nav-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 4l3 3 3-3"/></svg>
              </button>
              ${solMega}
            </div>

            <div class="nav-item">
              <a class="nav-link ${isActive('about') ? 'active' : ''}" href="about.html">关于我们</a>
            </div>
          </nav>

          <div class="header-cta">
            <a class="nav-tel" href="tel:4008982016">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
              400 898 2016
            </a>
            <a class="btn btn-primary btn-sm" onclick="openTrialModal()" href="javascript:void(0)">
              ${ctaLabel}
              <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </header>`;
  }

  /* ── renderFooter ───────────────────────────────── */
  function renderFooter() {
    const el = document.getElementById('footer-placeholder');
    if (!el) return;
    el.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-main">
            <div class="footer-col">
              <h4>AI 数据服务</h4>
              <a href="data_service_collection.html">数据采集服务</a>
              <a href="data_service_annotation.html">数据标注服务</a>
              <a href="datasets_overview.html">成品数据集</a>
              <a href="https://yuedu.data-baker.com/" target="_blank" rel="noopener noreferrer">标贝悦读</a>
              <a href="tool_annotation.html">工具平台</a>
            </div>
            <div class="footer-col">
              <h4>场景解决方案</h4>
              ${SOL_INDUSTRY_SCENES.map(s => `<a href="${s.href}">${s.name}解决方案</a>`).join('')}
            </div>
            <div class="footer-col">
              <h4>智能语音</h4>
              <a href="voice_ai.html">ASR 语音识别</a>
              <a href="voice_ai.html">TTS 语音合成</a>
              <a href="voice_ai.html">语音拓展</a>
            </div>
            <div class="footer-col">
              <h4>关于我们</h4>
              <a href="about.html">公司介绍</a>
              <a href="about.html">荣誉资质</a>
              <a href="homepage.html">最新动态</a>
              <a href="about.html">联系我们</a>
              <a href="https://distribute.ebiaoge.com/sp/formreport/distribute/TY0D2TKKVP/4748489893055628723" target="_blank" rel="noopener">数据供应商加盟</a>
              <a href="https://distribute.ebiaoge.com/sp/formreport/distribute/ty0d2tkkvp/1476002722365784915" target="_blank" rel="noopener">技术产品销售渠道</a>
            </div>
            <div class="footer-info-col">
              <div class="fi-name">标贝科技有限公司</div>
              <div class="fi-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>北京：北京市海淀区西小口路66号中关村东升科技园·北领地B-1楼4层</span>
              </div>
              <div class="fi-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>青岛：山东省青岛市崂山区科苑纬一路一号创新园C座12层</span>
              </div>
              <div class="fi-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
                <a href="tel:4008982016">400 898 2016</a>
              </div>
              <div class="fi-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                <span>marketing@data-baker.com</span>
              </div>
              <div class="footer-qr-row">
                <div class="footer-qr-item">
                  <div class="fqr-box has-img">
                    <img src="images/weixin.png" alt="微信公众号二维码" loading="lazy" />
                  </div>
                  <span>微信公众号</span>
                </div>
                <div class="footer-qr-item">
                  <div class="fqr-box has-img">
                    <img src="images/weixinkefu.png" alt="服务顾问二维码" loading="lazy" />
                  </div>
                  <span>服务顾问</span>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="fb-links">
              <a href="javascript:void(0)">标贝科技服务声明</a>
              <a href="https://www.data-baker.com/m/#/about/personRightFile " target="_blank" rel="noopener noreferrer">个人信息保护政策</a>
              <a href="javascript:void(0)">意见反馈</a>
              <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer">鲁ICP备2023038621号</a>
            </div>
            <span>© 2025 DataBaker Technology · All rights reserved.</span>
          </div>
        </div>
      </footer>`;
  }

  /* ── renderSidebar（全局右侧侧栏 + 试用弹窗 + 在线咨询）── */
  function renderSidebar() {
    const ctaLabel = getCtaLabel();
    /* 侧栏 HTML */
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar-right';
    sidebar.id = 'sidebarRight';
    sidebar.innerHTML = `
      <button class="sidebar-btn" onclick="openChatPopup()" title="在线咨询">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="sb-label">咨询</span>
      </button>
      <button class="sidebar-btn" title="客服二维码">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
        <span class="sb-label">客服</span>
        <div class="sb-qr-pop">
          <h4 class="qr-title">标贝科技</h4>
          <div class="qr-img"><img src="images/qv.png" alt="客服企微二维码" /></div>
          <p>扫码加客服企微<br/>提供更多<span class="qr-hl">咨询服务</span></p>
        </div>
      </button>
      <button class="sidebar-btn" onclick="openTrialModal()" title="${ctaLabel}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>
        <span class="sb-label">试用</span>
      </button>
      <button class="sb-collapse" onclick="document.getElementById('sidebarRight').classList.toggle('collapsed')" title="收起">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>`;

    /* 试用弹窗 */
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'trialModal';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-left">
          <div class="modal-logo">
            <img class="modal-logo-img" src="${BRAND_LOGO}" alt="标贝科技 DataBaker Technology" />
          </div>
          <div class="modal-tel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
            400 898 2016
          </div>
        </div>
        <form class="modal-right" id="trialForm" novalidate>
          <button class="modal-close" type="button" onclick="closeTrialModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <h2>联系我们</h2>
          <div class="mf-row">
            <div class="mf-field has-icon mf-required">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" name="name" placeholder="请填写您的姓名" autocomplete="name" required />
            </div>
          </div>
          <div class="mf-row">
            <div class="mf-gender">
              <label><input type="radio" name="gender" value="m" checked /> 男</label>
              <label><input type="radio" name="gender" value="f" /> 女</label>
            </div>
          </div>
          <div class="mf-row">
            <div class="mf-field has-icon mf-required">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
              <input type="tel" name="phone" placeholder="请填写您的手机号" autocomplete="tel" required />
            </div>
          </div>
          <div class="mf-row">
            <div class="mf-field has-icon mf-required">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2H8L2 7h20z"/></svg>
              <input type="text" name="company" placeholder="请填写您的公司名称" autocomplete="organization" required />
            </div>
          </div>
          <div class="mf-row">
            <div class="mf-field has-icon mf-required">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              <input type="email" name="email" placeholder="请填写您的企业邮箱" autocomplete="email" required />
            </div>
          </div>
          <div class="mf-row">
            <div class="mf-field">
              <input type="text" name="position" placeholder="请填写您的职位" autocomplete="organization-title" />
            </div>
          </div>
          <div class="mf-row">
            <div class="mf-field">
              <textarea name="requirement" placeholder="请详细填写您的需求、数据规模、预留信息等，我们会反馈更快哦"></textarea>
            </div>
          </div>
          <button class="mf-submit" type="submit">提 交</button>
        </form>
      </div>`;

    /* 在线咨询气泡 */
    const chat = document.createElement('div');
    chat.className = 'chat-popup';
    chat.id = 'chatPopup';
    chat.innerHTML = `
      <div class="cp-head">
        <span>在线咨询</span>
        <button class="cp-close" onclick="closeChatPopup()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="cp-body">
        <div class="cp-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <p>您好！欢迎咨询标贝科技，我们的专属顾问将在工作时间内尽快回复。</p>
        <button class="cp-human" onclick="openHumanChat()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          转人工客服
        </button>
        <a class="cp-tel" href="tel:4008982016">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
          400 898 2016
        </a>
      </div>`;

    document.body.appendChild(sidebar);
    document.body.appendChild(modal);
    document.body.appendChild(chat);

    /* 点击背景关闭弹窗 */
    modal.addEventListener('click', e => { if (e.target === modal) closeTrialModal(); });

    const trialForm = modal.querySelector('#trialForm');
    const emailInput = trialForm && trialForm.querySelector('input[name="email"]');
    if (emailInput) {
      emailInput.addEventListener('input', () => emailInput.setCustomValidity(''));
    }
    if (trialForm) {
      trialForm.addEventListener('submit', e => {
        e.preventDefault();
        trialForm.classList.add('is-submitted');
        if (emailInput) {
          const value = emailInput.value.trim();
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          emailInput.setCustomValidity(value && !isEmail ? '请填写正确的邮箱格式' : '');
        }
        trialForm.reportValidity();
      });
    }
  }

  /* 全局暴露弹窗方法 */
  window.openTrialModal  = () => {
    const modal = document.getElementById('trialModal');
    const form = modal && modal.querySelector('#trialForm');
    if (form) form.classList.remove('is-submitted');
    if (modal) modal.classList.add('is-open');
  };
  window.closeTrialModal = () => document.getElementById('trialModal').classList.remove('is-open');
  window.openChatPopup   = () => document.getElementById('chatPopup').classList.add('is-open');
  window.closeChatPopup  = () => document.getElementById('chatPopup').classList.remove('is-open');
  const QIAO_URL = 'https://p.qiao.baidu.com/cps/chat?siteId=14907061&userId=30234502';
  window.openHumanChat = function () {
    try {
      const im = window.AffIm;
      if (im) {
        if (typeof im.openIm === 'function') { im.openIm(); return; }
        if (typeof im.open   === 'function') { im.open();   return; }
        if (typeof im.show   === 'function') { im.show();   return; }
      }
    } catch (e) { /* ignore，走回退 */ }
    window.open(QIAO_URL, '_blank', 'noopener');
  };

  /* 动态加载接口封装与百度商桥脚本（无需逐页修改 HTML） */
  function loadOnce(src) {
    if (document.querySelector(`script[data-shared-src="${src}"]`)) return;
    const s = document.createElement('script');
    s.src = src; s.defer = true; s.setAttribute('data-shared-src', src);
    document.head.appendChild(s);
  }
  loadOnce('js/api.js');
  loadOnce('js/baidu.js');
  /* ── Cursor ─────────────────────────────────────── */
  function cursor() {
    if (!matchMedia('(hover: hover)').matches) return;
    if (document.querySelector('.cursor-glow')) return;
    const wrap = document.createElement('div'); wrap.innerHTML = `
      <div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>`;
    [...wrap.children].forEach(c => document.body.appendChild(c));
    const cg = document.getElementById('cursorGlow');
    const root = document.documentElement;
    addEventListener('mousemove', e => {
      if (root.classList.contains('cursor-out')) root.classList.remove('cursor-out');
      const x = e.clientX;
      const y = e.clientY;
      cg.style.left = x + 'px';
      cg.style.top = y + 'px';
    });

    /* 指针移出窗口/切走时隐藏光标，回到窗口再显示 —— 修复停滞在边缘的问题 */
    const hideCursor = () => root.classList.add('cursor-out');
    const showCursor = () => root.classList.remove('cursor-out');
    root.addEventListener('mouseleave', hideCursor);   // 指针离开视口
    root.addEventListener('mouseenter', showCursor);   // 指针返回视口
    document.addEventListener('mouseout', e => { if (!e.relatedTarget) hideCursor(); }); // 兜底：移出到页面外
    window.addEventListener('blur', hideCursor);        // 切换到其它窗口/应用
    window.addEventListener('focus', showCursor);
  }

  function scrollProgress() {
    if (document.getElementById('scrollProgress')) return;
    const sp = document.createElement('div'); sp.className = 'scroll-progress'; sp.id = 'scrollProgress';
    document.body.prepend(sp);
    addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      sp.style.transform = `scaleX(${Math.min(1, scrollY / Math.max(1, max))})`;
    });
  }

  function headerScroll() {
    const h = document.getElementById('header');
    if (!h) return;
    const sync = () => h.classList.toggle('is-scrolled', scrollY > 24);
    sync(); addEventListener('scroll', sync, { passive: true });
  }

  function scrollTargetButtons() {
    document.querySelectorAll('[data-scroll-target]').forEach(el => {
      if (el.dataset.scrollInit) return;
      el.dataset.scrollInit = '1';
      el.addEventListener('click', e => {
        const id = el.getAttribute('data-scroll-target');
        const target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  }

  function renderSharedProductAdvantages() {
    document.querySelectorAll('[data-shared-product-advantages]').forEach(el => {
      el.innerHTML = `
        <div class="sol-section shared-product-advantages" data-reveal style="margin-bottom:0;">
          <div class="sol-section-head">
            <div>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
                <span class="sol-section-badge" style="color:#44e08a;border-color:rgba(68,224,138,0.3);background:rgba(68,224,138,0.06);">PRODUCT ADVANTAGES</span>
              </div>
              <h2>产品优势</h2>
              <p>10 年深耕 AI 数据与语音赛道，自研全栈工具链，已服务 1000+ 头部企业与科研机构</p>
            </div>
          </div>
          <div class="adv-band">
            <div class="adv-stat-item"><div class="adv-num">10<span class="unit">年+</span></div><p>AI 数据与语音技术积累</p></div>
            <div class="adv-stat-item"><div class="adv-num">1000<span class="unit">+</span></div><p>头部企业与科研机构客户</p></div>
            <div class="adv-stat-item"><div class="adv-num">50<span class="unit">+</span></div><p>支持语种与地区方言</p></div>
            <div class="adv-stat-item"><div class="adv-num">稳定</div><p>多轮质检后数据准确率</p></div>
          </div>
          <div class="pa-grid">
            ${[
              ['v1','M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5','全品类数据资产','覆盖语音、视觉、点云、文本与大模型语料，10 亿+ 多模态样本沉淀，支持从样本试制到百万级商用训练。',['SPEECH','CV','NLP','3D','LLM']],
              ['v2','M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9 12l2 2 4-4','高精度交付','AI 预标注 + 多轮人工质检 + 抽检复核三道闸口，平均交付质量稳定，满足商用级 AI 模型训练标准。',['QA','AI ASSIST','QUALITY']],
              ['v3','M3 11h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9zM7 11V7a5 5 0 0 1 10 0v4','安全合规体系','ISO 27001 / 27701 双认证，符合 GDPR 与国内数据合规法规，支持端到端加密、私有化部署、全流程留痕。',['ISO 27001','27701','GDPR']],
              ['v4','M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20','全球资源 · 多语种','覆盖 50+ 主流语种与地区方言，自有海外采集团队与录音棚，200 万+ 全球众包资源池，赋能企业出海。',['GLOBAL','50+ LANG','200W+ POOL']],
              ['v5','M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z','自研全栈工具链','标贝易采、3D / 2D 标注平台、ASR / TTS 切音转写工具与开放平台，端到端打通采集—标注—模型迭代。',['EASY COLL','3D / 2D','SaaS']],
              ['v1','M20 21v-2a4 4 0 0 0-3-3.87M4 21v-2a4 4 0 0 1 3-3.87M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 11l-3 3-3-3M16 14V8','专属项目化交付','专属项目经理 + 行业算法专家组队对接，里程碑式迭代交付，支持紧急排期与扩量，缩短产品上线周期。',['DEDICATED PM','AGILE','FAST DELIVER']]
            ].map(card => `
              <div class="pa-card ${card[0]}">
                <div class="pa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${card[1]}"/></svg></div>
                <div class="pa-text"><h4>${card[2]}</h4><p>${card[3]}</p><div class="pa-tags">${card[4].map(t => `<span>${t}</span>`).join('')}</div></div>
              </div>`).join('')}
          </div>
        </div>`;
    });
  }

  function renderIndustryScenarioPage() {
    const page = document.getElementById('industryPage');
    if (!page) return;
    const key = page.getAttribute('data-scene');
    const scene = INDUSTRY_SCENES[key];
    if (!scene) return;
    const heroImg = page.getAttribute('data-hero-img') || `images/solution/${key}/${key}-hero.png`;
    document.title = `${scene.title} · 标贝科技`;
    page.innerHTML = `
      <section class="page-hero has-hero-img" style="--hero-img:url('${heroImg}')">
        <div class="container industry-hero-main">
            <span class="eyebrow">Industry Scenario · ${scene.en}</span>
            <h1 class="display" style="font-size:clamp(2.2rem,4.8vw,4rem);margin:16px 0 20px;">${scene.title}</h1>
            <p class="industry-hero-summary">${scene.summary}</p>
            <div class="industry-meta">${scene.meta.map(m => `<span>${m}</span>`).join('')}</div>
            <a href="javascript:void(0)" onclick="openTrialModal()" class="btn btn-primary">联系我们<svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
      </section>
      <section class="section" style="padding-top:70px;">
        <div class="container industry-body">
          <div class="block-head"><h3>定制服务类型</h3><p>根据场景目标组合采集、标注、清洗、评测与交付流程，服务类型可按项目继续扩展。</p></div>
          <div class="service-panel">
            <div class="adv-show">
              <div class="adv-tabs">${scene.services.map((item, i) => `<button class="adv-tab${i === 0 ? ' active' : ''}" data-a="${i}">${item[0]}<span class="bar"></span></button>`).join('')}</div>
              ${scene.services.map((item, i) => `<div class="adv-sub${i === 0 ? ' is-active' : ''}" data-a="${i}"><b>${item[0]}</b><span>${item[1]}</span></div>`).join('')}
              <div class="adv-stage">
                <span class="ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8M12 18v3"/></svg></span>
                ${scene.services.map((item, i) => `<img class="adv-slide${i === 0 ? ' is-active' : ''}" data-a="${i}" src="${item[2]}" alt="${item[0]}" loading="lazy" onerror="this.hidden=true">`).join('')}
              </div>
            </div>
          </div>
          <div class="block-head"><h3>优势特点</h3><p>围绕数据质量、效率、安全与交付一致性建立项目保障机制。</p></div>
          <div class="advantage-grid">${scene.advantages.map(a => `<div class="advantage-card"><strong>${a}</strong></div>`).join('')}</div>
          <div class="block-head"><h3>成功案例</h3></div>
          <div class="case-list">${scene.cases.map((c, i) => `<div class="case-row"><div class="case-img"><img src="${c[2]}" alt="${c[0]}" loading="lazy" onerror="this.hidden=true"></div><div class="case-text"><div class="num">CASE ${String(i + 1).padStart(2, '0')}</div><h4>${c[0]}</h4><p>${c[1]}</p><div class="case-tags">${c[3].map(t => `<span>${t}</span>`).join('')}</div></div></div>`).join('')}</div>
        </div>
      </section>`;
  }

  function renderDatasetQualityStandard() {
    document.querySelectorAll('[data-dataset-quality-standard]').forEach(el => {
      if (el.dataset.dqsInit) return;
      el.dataset.dqsInit = '1';

      const cfg = window.DATASET_QUALITY_STANDARD || {};
      const h = value => String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      const pairRows = rows => (rows || []).map(row => `
        <li><b>${h(row[0])}</b><span>${h(row[1])}</span></li>
      `).join('');
      const metricRows = rows => (rows || []).map(row => `
        <div class="dqs-metric-row"><b>${h(row[0])}</b><span>${h(row[1])}</span></div>
      `).join('');
      const panel = (title, rows) => Array.isArray(rows) && rows.length ? `
        <div class="dqs-panel">
          <h4>${h(title)}</h4>
          <ul class="dqs-list">${pairRows(rows)}</ul>
        </div>
      ` : '';

      const data = {
        eyebrow: '02 · Delivery & QA',
        title: '数据交付与质量标准',
        intro: '每批数据均按训练可用标准交付，覆盖数据文件、标注结果、元数据、质检记录与授权说明，便于算法团队直接进入训练、评测和迭代流程。',
        stats: [
          ['4 类', '音频、标注、元数据与质检文档同步交付'],
          ['6 步', '初标、复核、抽检、校验、回流、交付闭环'],
          ['3 集', '支持训练集、验证集、测试集比例切分'],
          ['可定制', '格式、字段、标签深度和授权范围按项目约定']
        ],
        deliveryItems: [
          ['文件格式', 'WAV / PCM / FLAC 音频，JSON / CSV / TextGrid / SRT 标注文件'],
          ['采样规格', '支持 16kHz / 48kHz、单声道 / 双声道 / 多通道阵列统一处理'],
          ['数据切分', '可按句、按轮次、按固定时长或 VAD 结果切分'],
          ['命名规则', '统一文件 ID、批次号、说话人 ID、场景标签与授权编码']
        ],
        annotationItems: [
          ['基础标注', '转写文本、时间戳、说话人 ID、场景标签'],
          ['扩展标签', '口音、噪声、情绪、意图、热词与行业术语'],
          ['元数据', '采集设备、环境、地域、年龄段、授权范围等字段']
        ],
        customItems: [
          ['字段深度', '按模型训练、评测或业务分析需求扩展字段'],
          ['数据比例', '按语种、性别、年龄、地域、场景与噪声条件配比'],
          ['授权方式', '支持样本试用、子集授权与项目化定制授权']
        ],
        qaSteps: [
          ['初标', '完成基础转写、标签与时间戳'],
          ['复核', '校验漏字、错字、断句和标签一致性'],
          ['抽检', '按批次抽样检查并记录问题'],
          ['格式校验', '检查命名、字段、时长、采样率'],
          ['问题回流', '低质样本重新标注或剔除'],
          ['最终交付', '输出数据包、说明文档和质检报告']
        ],
        metrics: [
          ['准确性', '核心标注指标按项目验收标准抽检，复杂场景单独约定阈值'],
          ['完整性', '文件 ID、标签字段、授权字段和元数据字段完整可追溯'],
          ['一致性', '多人标注规范一致性、字段枚举一致性与批次格式一致性校验'],
          ['可用性', '剔除空白、损坏、严重不可辨识或不符合授权范围的样本']
        ],
        packageItems: ['数据文件包', '标注文件', '元数据表', '字段说明文档', '训练/验证/测试集切分', '质检报告', '授权与合规说明'],
        ...cfg
      };
      const hasIntro = String(data.intro || '').trim() !== '';
      const panelsHTML = [
        panel('交付内容', data.deliveryItems),
        panel('标注维度', data.annotationItems),
        panel('可定制项', data.customItems)
      ].join('');

      el.innerHTML = `
        <div class="dqs-module" data-reveal>
          <div class="dqs-hero${hasIntro ? '' : ' dqs-hero-no-intro'}">
            <div class="dqs-copy">
              <span class="eyebrow">${h(data.eyebrow)}</span>
              <h3>${h(data.title)}</h3>
              ${hasIntro ? `<p>${h(data.intro)}</p>` : ''}
            </div>
            <div class="dqs-summary">
              ${(data.stats || []).map(item => `
                <div class="dqs-stat"><b>${h(item[0])}</b><span>${h(item[1])}</span></div>
              `).join('')}
            </div>
          </div>

          ${panelsHTML ? `<div class="dqs-grid">${panelsHTML}</div>` : ''}

          <div class="dqs-flow">
            <h4>质检流程</h4>
            <div class="dqs-steps">
              ${(data.qaSteps || []).map((step, i) => `
                <div class="dqs-step">
                  <span class="num">STEP ${String(i + 1).padStart(2, '0')}</span>
                  <b>${h(step[0])}</b>
                  <span>${h(step[1])}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="dqs-bottom">
            <div class="dqs-metrics">
              <h4>验收指标</h4>
              ${metricRows(data.metrics)}
            </div>
            <div class="dqs-package">
              <h4>交付包清单</h4>
              <ul>${(data.packageItems || []).map(item => `<li>${h(item)}</li>`).join('')}</ul>
            </div>
          </div>
        </div>`;
    });
  }

  function renderSharedDatasetUseCases() {
    document.querySelectorAll('[data-shared-dataset-use-cases]').forEach(el => {
      if (el.dataset.dsUseCasesInit) return;
      el.dataset.dsUseCasesInit = '1';
      el.innerHTML = `
        <section class="section section-tight dataset-use-cases" style="padding-top:0;">
          <div class="container">
            <div class="section-head" data-reveal>
              <span class="eyebrow">Use Cases</span>
              <h2 class="display">数据集<span class="glow-text">应用场景</span></h2>
              <p>从语音交互到大模型训练，覆盖 8 大行业核心场景，支持算法预研到产品商用的全链路 AI 数据需求。</p>
            </div>
            <div class="scene-acc" data-reveal>
              <div class="sa-item is-active" style="--accent:#4cc9f0;--img:url('images/scenes/embodied.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="8" width="14" height="10" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/><path d="M3 13v2M21 13v2"/></svg></div>
                  <h4 class="sa-title">具身智能</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">ROBOT · VLA · MULTIMODAL</span>
                    <div class="sa-cap">核心能力</div>
                    <p>面向机器人与具身智能体的多模态数据，覆盖视觉、语音、动作轨迹与操作示教，支撑感知—决策—控制闭环训练。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#b14dff;--img:url('images/scenes/service.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></svg></div>
                  <h4 class="sa-title">智能客服</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">DIALOG · QA</span>
                    <div class="sa-cap">核心能力</div>
                    <p>外呼质检、坐席辅助、意图理解，提供高质量对话与语音语料。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#44e08a;--img:url('images/scenes/auto.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3l-2-6H5l-2 6v3z"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg></div>
                  <h4 class="sa-title">车载 / 智能驾驶</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">3D · LIDAR · BEV</span>
                    <div class="sa-cap">核心能力</div>
                    <p>3D 点云、4D BEV、车道线、舱内行为多模态数据，加速自动驾驶研发。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#ffc850;--img:url('images/scenes/home.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-9 9 9M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg></div>
                  <h4 class="sa-title">智能家居 / IoT</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">FAR-FIELD · IOT</span>
                    <div class="sa-cap">核心能力</div>
                    <p>远场唤醒、近场指令、声源定位等小型设备 AI 训练数据。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#ff4dcb;--img:url('images/scenes/finance.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 22v-6M2 12h6M22 12h-6"/><circle cx="12" cy="12" r="3"/></svg></div>
                  <h4 class="sa-title">金融科技</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">OCR · COMPLIANCE</span>
                    <div class="sa-cap">核心能力</div>
                    <p>金融术语语音、证件文档 OCR、风控文本，满足金融合规要求。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#4cc9f0;--img:url('images/scenes/medical.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.5 3-6a4 4 0 0 0-8 0 4 4 0 0 0-8 0c0 2.5 1.5 4.5 3 6M12 8v13M9 21h6"/></svg></div>
                  <h4 class="sa-title">医疗健康</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">MEDICAL · EHR</span>
                    <div class="sa-cap">核心能力</div>
                    <p>医疗对话语料，加速医疗 AI 算法落地。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#b14dff;--img:url('images/scenes/edu.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg></div>
                  <h4 class="sa-title">教育科研</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">K12 · NLP</span>
                    <div class="sa-cap">核心能力</div>
                    <p>儿童语料、学科文本、双语翻译数据，支撑教育领域智能化产品。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
              <div class="sa-item" style="--accent:#44e08a;--img:url('images/scenes/llm.jpg');">
                <span class="sa-ph"></span><span class="sa-bg"></span><span class="sa-grad"></span>
                <div class="sa-content">
                  <div class="sa-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                  <h4 class="sa-title">大模型训练</h4>
                  <div class="sa-detail">
                    <span class="sa-tag">PRETRAIN · SFT · RLHF</span>
                    <div class="sa-cap">核心能力</div>
                    <p>预训练语料、SFT 指令对、RLHF 偏好数据，覆盖 LLM 全链路。</p>
                    <a class="sa-link" href="javascript:void(0)" onclick="openTrialModal()">获取方案<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>`;
    });
  }

  /* 应用场景手风琴：悬停展开，点击锁定（适配触屏）。任何含 .scene-acc 的页面自动生效 */
  function sceneAccordion() {
    document.querySelectorAll('.scene-acc').forEach(acc => {
      if (acc.dataset.accInit) return;           // 防止重复绑定
      acc.dataset.accInit = '1';
      const items = [...acc.querySelectorAll('.sa-item')];
      if (!items.length) return;
      const activate = it => items.forEach(x => x.classList.toggle('is-active', x === it));
      items.forEach(it => {
        it.addEventListener('mouseenter', () => activate(it));
        it.addEventListener('click', () => activate(it));
      });
    });
  }

  /* 标签进度轮播：点击切换 + 5s 自动播放 + 悬停暂停。含 .adv-show 的页面自动生效 */
  function advSlider() {
    document.querySelectorAll('.adv-show').forEach(show => {
      if (show.dataset.advInit) return;            // 防止重复绑定
      show.dataset.advInit = '1';
      const tabs   = [...show.querySelectorAll('.adv-tab')];
      const subs   = [...show.querySelectorAll('.adv-sub')];
      const slides = [...show.querySelectorAll('.adv-slide')];
      if (!tabs.length) return;
      const n = tabs.length; let cur = 0, timer;
      const go = i => {
        cur = (i + n) % n;
        tabs.forEach((t, k) => t.classList.toggle('active', k === cur));
        subs.forEach((s, k) => s.classList.toggle('is-active', k === cur));
        slides.forEach((s, k) => s.classList.toggle('is-active', k === cur));
      };
      const start = () => { timer = setInterval(() => go(cur + 1), 5000); };
      const stop  = () => clearInterval(timer);
      tabs.forEach((t, k) => t.addEventListener('click', () => { go(k); stop(); start(); }));
      show.addEventListener('mouseenter', stop);
      show.addEventListener('mouseleave', start);
      start();
    });
  }

  function addDatasetConsultButtons() {
    const cur = (location.pathname.split('/').pop() || '').toLowerCase();
    if (!cur.startsWith('dataset_')) return;

    const grid = document.querySelector(
      '#datasets .ds-grid, #catalog .cat-grid, #voices .voices-grid, #types .type-grid, #pipeline .pipe-grid'
    );
    if (!grid || grid.dataset.consultButtonInit) return;
    grid.dataset.consultButtonInit = '1';

    const row = document.createElement('div');
    row.className = 'dataset-consult-row';
    row.innerHTML = `
      <a href="javascript:void(0)" onclick="openTrialModal()" class="btn btn-primary">
        咨询更多
        <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    `;
    grid.insertAdjacentElement('afterend', row);
  }

  function removeBreadcrumbs() {
    document.querySelectorAll('nav.crumbs, .crumbs').forEach(el => el.remove());
  }

  function init() {
    renderHeader();
    renderFooter();
    renderSidebar();
    renderSharedProductAdvantages();
    renderIndustryScenarioPage();
    renderDatasetQualityStandard();
    renderSharedDatasetUseCases();
    removeBreadcrumbs();
    cursor();
    scrollProgress();
    headerScroll();
    scrollTargetButtons();
    reveal();
    sceneAccordion();
    advSlider();
    addDatasetConsultButtons();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
