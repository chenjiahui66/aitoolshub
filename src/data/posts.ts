export interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  cover: string
  content: string
  tags: string[]
}

export const posts: Post[] = [
  {
    id: 'chatgpt-beginner-guide',
    title: 'ChatGPT 新手入门：从注册到第一次对话的完整指南',
    excerpt:
      '本指南手把手教你注册 ChatGPT 账号、选择合适的模型，并掌握高效提问的 5 个关键技巧。',
    category: 'ChatGPT',
    author: '编辑小王',
    date: '2026-07-20',
    readTime: '8 分钟',
    cover: 'linear-gradient(135deg,#10a37f 0%,#0ea5e9 100%)',
    tags: ['ChatGPT', '入门', '教程'],
    content: `## 为什么是 ChatGPT
ChatGPT 是当前最流行的对话式 AI，从写邮件、写代码到翻译、总结，几乎覆盖所有文字工作场景。

## 注册流程
1. 打开 [chat.openai.com](https://chat.openai.com)
2. 使用邮箱（推荐 Google / Outlook）注册
3. 完成手机号验证（部分区域需要）
4. 选择免费版或 Plus（GPT-4 访问）

## 5 个高效提问技巧
- **明确角色**：让 AI 扮演"资深产品经理"
- **给出示例**：Few-shot 提升输出质量
- **分步思考**：使用"请一步步推理"
- **设定格式**：要求 Markdown / 表格 / JSON
- **指定约束**：字数、语气、受众`,
  },
  {
    id: 'claude-vs-gpt',
    title: 'Claude 4 vs GPT-4o：谁才是 2026 年最强的 AI 助手？',
    excerpt:
      '从长上下文、代码能力、写作风格、价格四个维度深度对比 Claude 4 与 GPT-4o。',
    category: 'Claude',
    author: '编辑小李',
    date: '2026-07-18',
    readTime: '12 分钟',
    cover: 'linear-gradient(135deg,#cc785c 0%,#8b5cf6 100%)',
    tags: ['Claude', 'GPT-4', '对比'],
    content: `## 测试维度
我们使用 4 类典型任务对比两款模型：长文档摘要、复杂代码生成、创意写作、逻辑推理。

## 长上下文
Claude 4 支持 200K tokens，GPT-4o 128K。Claude 在 50K 以上的"大海捞针"测试中胜出。

## 代码能力
GPT-4o 在 HumanEval 仍略胜，但 Claude 4 在跨文件重构上更稳定。

## 写作风格
Claude 4 更自然、更像人类；GPT-4o 更结构化、更适合企业场景。

## 价格
Claude Sonnet 4 价格约为 GPT-4o 的 1/5，性价比突出。`,
  },
  {
    id: 'ai-tool-stack-2026',
    title: '2026 年最值得订阅的 10 个 AI 工具，效率翻倍',
    excerpt:
      '从写作到设计，从编程到视频，这 10 个 AI 工具覆盖了 90% 的日常工作流。',
    category: '工具推荐',
    author: '编辑小张',
    date: '2026-07-15',
    readTime: '10 分钟',
    cover: 'linear-gradient(135deg,#0ea5e9 0%,#06b6d4 100%)',
    tags: ['工具', '效率', '推荐'],
    content: `## 写作类
- **ChatGPT Plus**：通用对话王者
- **Claude Pro**：长文档分析首选
- **Notion AI**：笔记 + AI 一体化

## 编程类
- **Cursor**：AI-first IDE
- **GitHub Copilot**：成熟稳定

## 图像 / 视频
- **Midjourney v7**：绘画标杆
- **Runway Gen-3**：视频生成
- **Sora**：长视频突破

## 语音 / 音乐
- **ElevenLabs**：语音克隆
- **Suno v4**：AI 作曲`,
  },
  {
    id: 'prompt-engineering-basics',
    title: 'Prompt Engineering 基础：让 AI 听懂你说话的 7 条原则',
    excerpt: '系统化讲解 Prompt 工程的 7 条核心原则，附大量实战模板。',
    category: 'Prompt',
    author: '编辑小陈',
    date: '2026-07-10',
    readTime: '15 分钟',
    cover: 'linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%)',
    tags: ['Prompt', '技巧', 'AI'],
    content: `## 原则 1：明确目标
避免"帮我写点东西"，要说"为 30 岁产品经理写一封周报邮件"。

## 原则 2：提供上下文
AI 不知道你的背景，告诉它行业、目标用户、使用场景。

## 原则 3：分步拆解
复杂任务拆成多个子任务，每步单独提问。

## 原则 4：示例驱动
给出 1-3 个示例，AI 立刻 get 你的期望格式。

## 原则 5：设定边界
字数、风格、禁用词、必须包含的要点。

## 原则 6：让 AI 自检
"请检查上述回答是否覆盖了 X、Y、Z"。

## 原则 7：迭代优化
把第一版答案当草稿，持续追问直到满意。`,
  },
  {
    id: 'midjourney-v7-tips',
    title: 'Midjourney v7 全新升级：20 个让你惊艳的提示词模板',
    excerpt: 'Midjourney v7 引入了多项新功能，本文整理 20 个高赞提示词模板。',
    category: 'AI 绘画',
    author: '编辑小林',
    date: '2026-07-05',
    readTime: '9 分钟',
    cover: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
    tags: ['Midjourney', '绘画', 'Prompt'],
    content: `## v7 新特性
- 更准确的中文 / 英文理解
- 风格迁移一致性大幅提升
- 图像分辨率提升至 4K

## 20 个模板节选
1. 极简产品摄影：\`--style raw\` + 柔光
2. 复古海报：1980s 杂志封面风格
3. 国风插画：水墨 + 工笔结合
4. 赛博朋克：霓虹 + 雨夜 + 雾
5. 3D 角色：皮克斯风格
... （更多见站内专题）`,
  },
  {
    id: 'ai-video-tools',
    title: 'Sora、Runway、可灵：AI 视频生成工具横评',
    excerpt: '三大主流 AI 视频生成工具全方位对比，帮你选对工具。',
    category: 'AI 视频',
    author: '编辑小赵',
    date: '2026-06-30',
    readTime: '11 分钟',
    cover: 'linear-gradient(135deg,#06b6d4 0%,#0ea5e9 100%)',
    tags: ['视频', 'Sora', 'Runway'],
    content: `## 横评维度
视频长度、画质、可控性、生成速度、价格。

## Sora
最长 60 秒，画质顶级，但对提示词要求高。

## Runway Gen-3
影视级工作流，5/10 秒片段适合专业剪辑。

## 可灵
国内友好，免费额度大，更适合短视频创作者。

## 选择建议
- 个人创作：可灵 / Sora
- 商业制作：Runway + Sora 组合`,
  },
]
