<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'ChatGPT 完整使用教程 - 注册、登录、Prompt 与高阶玩法',
  description:
    'ChatGPT 是什么？怎么注册、登录、使用？本文提供 ChatGPT 从入门到精通的完整教程，包括账号注册、模型选择（GPT-4o、GPT-4.1、o1、o3）、Prompt 工程、API 调用、GPTs 应用与 50+ 实战模板。',
  keywords:
    'ChatGPT,ChatGPT教程,ChatGPT注册,ChatGPT登录,ChatGPT使用,ChatGPT Plus,ChatGPT 4,ChatGPT 4o,ChatGPT o1,ChatGPT o3,OpenAI,GPT-4,GPT-4o,Prompt,Prompt工程,ChatGPT API,ChatGPT技巧',
  path: '/tools/chatgpt',
  type: 'article',
  author: 'AIToolsHub 编辑部',
  publishedTime: '2026-07-20T00:00:00+08:00',
  image: 'https://gwdemo2.example.com/og-chatgpt.png',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'ChatGPT 完整使用教程',
    description: '从注册、登录到 Prompt 工程与高阶玩法的 ChatGPT 全流程指南。',
    step: [
      { '@type': 'HowToStep', name: '注册 ChatGPT 账号', text: '访问 chat.openai.com 并使用邮箱完成注册与手机验证。' },
      { '@type': 'HowToStep', name: '选择模型', text: '免费用户可使用 GPT-4o mini，Plus 用户可使用 GPT-4o、o1、o3 等。' },
      { '@type': 'HowToStep', name: '掌握 Prompt', text: '使用角色、示例、格式与约束四要素撰写高质量提示词。' },
      { '@type': 'HowToStep', name: '创建 GPTs', text: '无需代码即可定制专属 AI 助手。' },
      { '@type': 'HowToStep', name: '调用 API', text: '通过 OpenAI API 将 ChatGPT 集成到自己的应用。' },
    ],
  },
})

const features = [
  {
    icon: 'ChatDotRound',
    title: '多模型选择',
    desc: '支持 GPT-4o、GPT-4.1、o1、o3 等多款模型，适配不同任务。',
  },
  {
    icon: 'Connection',
    title: '插件与工具调用',
    desc: '联网、代码解释器、文件分析等工具让 AI 真正能干活。',
  },
  {
    icon: 'Picture',
    title: '多模态能力',
    desc: '支持图片、语音、视频理解与生成。',
  },
  {
    icon: 'DataAnalysis',
    title: '数据分析',
    desc: '上传 CSV/Excel，AI 自动清洗、分析与可视化。',
  },
]

const steps = [
  {
    title: '注册账号',
    desc: '访问 chat.openai.com，使用邮箱（推荐 Google/Outlook）注册并完成手机号验证。',
  },
  {
    title: '选择版本',
    desc: '免费版使用 GPT-4o mini；Plus 订阅（$20/月）解锁 GPT-4o、o1、o3 等旗舰模型。',
  },
  {
    title: '掌握 Prompt',
    desc: '使用"角色 + 任务 + 约束 + 示例"四要素，让 AI 准确理解你的需求。',
  },
  {
    title: '使用工具',
    desc: '开启联网、代码解释器、DALL·E 绘图等工具，让 ChatGPT 完成复杂任务。',
  },
  {
    title: '创建 GPTs',
    desc: '无需代码，定制专属 AI 助手，发布到 GPT Store 分享给他人。',
  },
  {
    title: '调用 API',
    desc: '通过 OpenAI API 将 ChatGPT 集成到自己的应用与服务。',
  },
]

const prompts = [
  {
    title: '📝 写作助手',
    template: `请你扮演一位资深公众号作者，主题是"远程办公如何提升效率"。要求：
1. 开头有冲击力
2. 正文分 3 个小节
3. 结尾有行动建议
4. 字数 1200-1500
5. 风格：轻松幽默`,
  },
  {
    title: '💻 编程专家',
    template: `请你扮演资深前端工程师，请用 Vue 3 + Composition API 写一个支持搜索、分页、排序的用户列表组件。要求：
- 使用 TypeScript
- 包含错误处理
- 代码带详细注释
- 输出可直接使用`,
  },
  {
    title: '🌍 翻译官',
    template: `请你扮演专业翻译，请将以下中文翻译为英文。要求：
- 保持原文风格
- 地道自然
- 专业术语准确
- 保留 Markdown 格式`,
  },
  {
    title: '📊 数据分析师',
    template: `请你扮演数据分析师，分析我上传的 CSV 文件。要求：
1. 描述数据结构
2. 指出数据质量问题
3. 提出 3 个业务洞察
4. 给出可视化建议`,
  },
]

const faqs = [
  {
    q: 'ChatGPT 是什么？',
    a: 'ChatGPT 是由 OpenAI 开发的对话式 AI，基于 GPT（Generative Pre-trained Transformer）大语言模型，能理解和生成自然语言、代码、图片等多种内容。',
  },
  {
    q: 'ChatGPT 国内怎么用？',
    a: '国内使用 ChatGPT 通常需要稳定的网络环境。可考虑使用第三方镜像站、WildCard 虚拟卡订阅、或使用国内合规的国产大模型作为替代。',
  },
  {
    q: 'ChatGPT 免费吗？',
    a: 'ChatGPT 提供免费版本（使用 GPT-4o mini 模型），付费版 ChatGPT Plus 每月 $20，可使用 GPT-4o、o1、o3 等更强大的模型。',
  },
  {
    q: 'GPT-4o 和 o1 有什么区别？',
    a: 'GPT-4o 是多模态通用模型，速度快、适合日常对话；o1 是推理专用模型，会"思考"更长时间，适合数学、编程、复杂推理任务。',
  },
  {
    q: '如何写出高质量 Prompt？',
    a: '高质量 Prompt 包含 4 个要素：1）明确角色；2）清晰任务；3）具体约束（字数、格式、风格）；4）示例（Few-shot）。',
  },
]
</script>

<template>
  <article class="page">
    <!-- 头部 -->
    <section class="page-hero chatgpt">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/tools' }">AI 工具</el-breadcrumb-item>
          <el-breadcrumb-item>ChatGPT 教程</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="hero-grid">
          <div>
            <el-tag type="success" effect="light" round>由 OpenAI 出品</el-tag>
            <h1>ChatGPT 完整使用教程</h1>
            <p class="lead">
              从注册、登录到 Prompt 工程、GPTs 创建、API 集成，
              一文掌握 OpenAI 出品的 ChatGPT 全流程使用技巧。
            </p>
            <div class="cta">
              <el-button type="primary" size="large" round href="https://chat.openai.com" target="_blank">
                立即访问 ChatGPT →
              </el-button>
              <el-button size="large" round @click="$router.push('/blog')">
                更多教程
              </el-button>
            </div>
          </div>
          <div class="hero-card">
            <div class="chat-bubble from">你好，请用一句话介绍 ChatGPT</div>
            <div class="chat-bubble to">
              ChatGPT 是 OpenAI 推出的对话式 AI，能写作、翻译、编程、分析，帮你提升 10 倍效率 🚀
            </div>
            <div class="chat-bubble from">给我一份周报模板</div>
            <div class="chat-bubble to">好的，本周工作概览：...</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心能力 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">ChatGPT 的核心能力</h2>
        <p class="section-subtitle">不止是聊天，更是你全能的 AI 助理</p>
        <div class="features">
          <div v-for="f in features" :key="f.title" class="feature">
            <el-icon :size="32" color="#10a37f"><component :is="f.icon" /></el-icon>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用步骤 -->
    <section class="section section-soft">
      <div class="container">
        <h2 class="section-title">六步上手 ChatGPT</h2>
        <p class="section-subtitle">从注册到精通，循序渐进</p>
        <div class="steps">
          <div v-for="(s, i) in steps" :key="i" class="step">
            <div class="step-num">{{ i + 1 }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Prompt 模板 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">实战 Prompt 模板</h2>
        <p class="section-subtitle">复制即用，提升输出质量 10 倍</p>
        <div class="prompt-grid">
          <div v-for="p in prompts" :key="p.title" class="prompt-card">
            <h3>{{ p.title }}</h3>
            <pre>{{ p.template }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section section-soft">
      <div class="container">
        <h2 class="section-title">常见问题</h2>
        <p class="section-subtitle">关于 ChatGPT 你想知道的都在这里</p>
        <div class="faq">
          <el-collapse>
            <el-collapse-item v-for="(f, i) in faqs" :key="i" :title="f.q">
              {{ f.a }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </section>

    <!-- 关联推荐 -->
    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <div>
            <h2>想了解更多 AI 工具？</h2>
            <p>查看完整 AI 工具导航，对比 ChatGPT 与其他 AI 的差异</p>
          </div>
          <el-button type="primary" size="large" round @click="$router.push('/tools')">
            浏览 AI 工具 →
          </el-button>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.page-hero.chatgpt {
  background: linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 100%);
  padding: 48px 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
  margin-top: 24px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  h1 {
    font-size: 40px;
    margin: 12px 0 16px;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
  .lead {
    color: var(--site-text-secondary);
    font-size: 16px;
    margin-bottom: 24px;
  }
  .cta {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}
.hero-card {
  background: #fff;
  border-radius: var(--site-radius-lg);
  padding: 24px;
  box-shadow: var(--site-shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.chat-bubble {
  padding: 12px 16px;
  border-radius: 14px;
  max-width: 80%;
  font-size: 14px;
  line-height: 1.5;
  &.from {
    background: #f1f5f9;
    color: var(--site-text);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
  &.to {
    background: #10a37f;
    color: #fff;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
}
.section-soft {
  background: var(--site-bg-soft);
}
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
.feature {
  padding: 28px 24px;
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  text-align: center;
  transition: transform 0.25s, box-shadow 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
  }
  h3 {
    font-size: 16px;
    margin: 16px 0 8px;
  }
  p {
    margin: 0;
    font-size: 13px;
    color: var(--site-text-secondary);
    line-height: 1.7;
  }
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.step {
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 24px;
  position: relative;
  h3 {
    font-size: 16px;
    margin: 12px 0 8px;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: var(--site-text-secondary);
    line-height: 1.7;
  }
}
.step-num {
  width: 36px;
  height: 36px;
  background: #10a37f;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.prompt-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.prompt-card {
  background: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 24px;
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
  }
  pre {
    margin: 0;
    background: #0f172a;
    color: #e2e8f0;
    padding: 16px;
    border-radius: 8px;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
.faq {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: var(--site-radius);
  padding: 8px 24px;
  border: 1px solid var(--site-border);
}
.cta-banner {
  background: var(--site-gradient);
  color: #fff;
  border-radius: var(--site-radius-lg);
  padding: 40px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  h2 {
    color: #fff;
    font-size: 24px;
    margin-bottom: 8px;
  }
  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
  }
  :deep(.el-button) {
    background: #fff;
    color: var(--site-primary);
    border-color: #fff;
  }
}
</style>
