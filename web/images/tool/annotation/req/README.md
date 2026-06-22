# 多样化需求图片接口

页面会优先读取三级应用场景图片，缺失时回退到二级分类默认图。

- 二级分类默认图：`images/tool/annotation/req/{二级slug}.png`
- 三级应用场景图：`images/tool/annotation/req/{二级slug}-scene-01.png`
- 如果要单独指定某个标签图片，可在 `tool_annotation.html` 对应二级分类里增加 `sceneImgs: { '标签名': '图片路径' }`

## 点云标注

- 4D 标注 (`pointcloud-4d`)
  - 自动驾驶：`images/tool/annotation/req/pointcloud-4d-scene-01.png`
  - 机器人：`images/tool/annotation/req/pointcloud-4d-scene-02.png`
  - 车路协同：`images/tool/annotation/req/pointcloud-4d-scene-03.png`
- 语义分割 (`pointcloud-seg`)
  - 高精地图：`images/tool/annotation/req/pointcloud-seg-scene-01.png`
  - 场景理解：`images/tool/annotation/req/pointcloud-seg-scene-02.png`
  - 可行驶区域：`images/tool/annotation/req/pointcloud-seg-scene-03.png`
- 点云标注 (`pointcloud-box`)
  - 目标检测：`images/tool/annotation/req/pointcloud-box-scene-01.png`
  - 障碍物识别：`images/tool/annotation/req/pointcloud-box-scene-02.png`
  - 测距：`images/tool/annotation/req/pointcloud-box-scene-03.png`
- 点云连续帧 (`pointcloud-frames`)
  - 轨迹预测：`images/tool/annotation/req/pointcloud-frames-scene-01.png`
  - 行为分析：`images/tool/annotation/req/pointcloud-frames-scene-02.png`
- 2&3D 融合标注 (`pointcloud-fusion`)
  - 多传感器融合：`images/tool/annotation/req/pointcloud-fusion-scene-01.png`
  - BEV 感知：`images/tool/annotation/req/pointcloud-fusion-scene-02.png`

## 语音标注

- 语音合成标注 (`speech-tts`)
  - 语音合成：`images/tool/annotation/req/speech-tts-scene-01.png`
  - 有声内容：`images/tool/annotation/req/speech-tts-scene-02.png`
  - 虚拟人：`images/tool/annotation/req/speech-tts-scene-03.png`
- 语音识别标注 (`speech-asr`)
  - 智能客服：`images/tool/annotation/req/speech-asr-scene-01.png`
  - 车载：`images/tool/annotation/req/speech-asr-scene-02.png`
  - 输入法：`images/tool/annotation/req/speech-asr-scene-03.png`
- 说话人分离 (`speech-spk`)
  - 会议转写：`images/tool/annotation/req/speech-spk-scene-01.png`
  - 呼叫中心：`images/tool/annotation/req/speech-spk-scene-02.png`
  - 访谈：`images/tool/annotation/req/speech-spk-scene-03.png`
- 情感标注 (`speech-emotion`)
  - 情感电台：`images/tool/annotation/req/speech-emotion-scene-01.png`
  - 客服质检：`images/tool/annotation/req/speech-emotion-scene-02.png`
  - 陪伴助手：`images/tool/annotation/req/speech-emotion-scene-03.png`

## 图像标注

- 目标检测 (`image-det`)
  - 安防：`images/tool/annotation/req/image-det-scene-01.png`
  - 零售：`images/tool/annotation/req/image-det-scene-02.png`
  - 工业质检：`images/tool/annotation/req/image-det-scene-03.png`
- 关键点标注 (`image-keypoint`)
  - 姿态估计：`images/tool/annotation/req/image-keypoint-scene-01.png`
  - 手势识别：`images/tool/annotation/req/image-keypoint-scene-02.png`
  - 美颜：`images/tool/annotation/req/image-keypoint-scene-03.png`
- 语义分割 (`image-seg`)
  - 医疗影像：`images/tool/annotation/req/image-seg-scene-01.png`
  - 遥感：`images/tool/annotation/req/image-seg-scene-02.png`
  - 自动驾驶：`images/tool/annotation/req/image-seg-scene-03.png`
- 图片分类 (`image-cls`)
  - 内容审核：`images/tool/annotation/req/image-cls-scene-01.png`
  - 数据治理：`images/tool/annotation/req/image-cls-scene-02.png`
- OCR 转写 (`image-ocr`)
  - 票据识别：`images/tool/annotation/req/image-ocr-scene-01.png`
  - 证件：`images/tool/annotation/req/image-ocr-scene-02.png`
  - 文档数字化：`images/tool/annotation/req/image-ocr-scene-03.png`
- 连续帧标注 (`image-frames`)
  - 视频结构化：`images/tool/annotation/req/image-frames-scene-01.png`
  - 行为分析：`images/tool/annotation/req/image-frames-scene-02.png`

## 视频标注

- 行为识别 (`video-action`)
  - 安防监控：`images/tool/annotation/req/video-action-scene-01.png`
  - 体育分析：`images/tool/annotation/req/video-action-scene-02.png`
  - 智能零售：`images/tool/annotation/req/video-action-scene-03.png`
- 目标跟踪 (`video-track`)
  - 自动驾驶：`images/tool/annotation/req/video-track-scene-01.png`
  - 无人机：`images/tool/annotation/req/video-track-scene-02.png`
  - 监控：`images/tool/annotation/req/video-track-scene-03.png`
- 视频分割 (`video-seg`)
  - 影视后期：`images/tool/annotation/req/video-seg-scene-01.png`
  - 虚拟背景：`images/tool/annotation/req/video-seg-scene-02.png`
- 时序事件 (`video-event`)
  - 内容理解：`images/tool/annotation/req/video-event-scene-01.png`
  - 直播审核：`images/tool/annotation/req/video-event-scene-02.png`

## 文本标注

- 命名实体 NER (`text-ner`)
  - 知识图谱：`images/tool/annotation/req/text-ner-scene-01.png`
  - 信息抽取：`images/tool/annotation/req/text-ner-scene-02.png`
- 情感分类 (`text-senti`)
  - 舆情：`images/tool/annotation/req/text-senti-scene-01.png`
  - 电商评论：`images/tool/annotation/req/text-senti-scene-02.png`
- 关系抽取 (`text-relation`)
  - 知识图谱：`images/tool/annotation/req/text-relation-scene-01.png`
  - 智能问答：`images/tool/annotation/req/text-relation-scene-02.png`
- 文本分类 (`text-cls`)
  - 内容审核：`images/tool/annotation/req/text-cls-scene-01.png`
  - 工单路由：`images/tool/annotation/req/text-cls-scene-02.png`
- 机器翻译 (`text-mt`)
  - 多语种：`images/tool/annotation/req/text-mt-scene-01.png`
  - 跨境：`images/tool/annotation/req/text-mt-scene-02.png`

## 多模态大模型标注

- 图文问答 VQA (`llm-qa`)
  - 多模态大模型：`images/tool/annotation/req/llm-qa-scene-01.png`
  - VQA 评测：`images/tool/annotation/req/llm-qa-scene-02.png`
- 指令微调 SFT (`llm-sft`)
  - 对话助手：`images/tool/annotation/req/llm-sft-scene-01.png`
  - Agent：`images/tool/annotation/req/llm-sft-scene-02.png`
- 偏好对齐 RLHF (`llm-rlhf`)
  - 对齐训练：`images/tool/annotation/req/llm-rlhf-scene-01.png`
  - 安全治理：`images/tool/annotation/req/llm-rlhf-scene-02.png`
- 图文对 (`llm-caption`)
  - 预训练：`images/tool/annotation/req/llm-caption-scene-01.png`
  - 检索：`images/tool/annotation/req/llm-caption-scene-02.png`
