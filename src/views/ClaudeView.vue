<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Claude 介绍 - Anthropic 出品的 AI 助手能力详解',
  description:
    'Claude 是由 Anthropic 推出的 AI 助手，以 Claude 4 Sonnet、Claude 4 Opus 为代表，主打长上下文（200K tokens）、代码能力、工具调用（Artifacts、Computer Use）与安全可控。本文详解 Claude 的能力、注册、订阅与最佳实践。',
  keywords:
    'Claude,Claude介绍,Claude教程,Claude 4,Claude Sonnet,Claude Opus,Anthropic,Claude注册,Claude Pro,Claude API,Artifacts,Computer Use,长上下文,AI助手,Claude vs ChatGPT',
  path: '/tools/claude',
  type: 'article',
  author: 'AIToolsHub 编辑部',
  publishedTime: '2026-07-18T00:00:00+08:00',
  image: 'https://gwdemo2.example.com/og-claude.png',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Claude 介绍 - Anthropic 出品的 AI 助手能力详解',
    author: { '@type': 'Organization', name: 'AIToolsHub 编辑部' },
    datePublished: '2026-07-18',
    publisher: {
      '@type': 'Organization',
      name: 'AIToolsHub',
    },
  },
})

const abilities = [
  {
    icon: 'Document',
    title: '200K 长上下文',
    desc: '单次可处理 50 万字中文文本，轻松应对长文档分析、代码库理解。',
  },
  {
    icon: 'Cpu',
    title: 'Artifacts 工具',
    desc: '在右侧面板实时渲染代码、网页、SVG、图表，所见即所得。',
  },
  {
    icon: 'Mouse',
    title: 'Computer Use',
    desc: '让 Claude 像人一样操作电脑，自动完成浏览器与桌面任务。',
  },
  {
    icon: 'Lock',
    title: '安全可控',
    desc: 'Constitutional AI 训练方法，最大限度减少有害输出。',
  },
  {
    icon: 'ChatLineRound',
    title: '自然对话',
    desc: '风格更自然、更有温度，被认为最像人类的 AI 对话。',
  },
  {
    icon: 'SetUp',
    title: '工具调用',
    desc: '支持 Function Calling、Tool Use，可连接外部 API 与数据。',
  },
]

const versions = [
  {
    name: 'Claude 4.1 Opus',
    desc: '最强版本，复杂任务首选',
    price: '$15 / $75 per MTok',
    features: ['200K 上下文', '顶级推理', '工具调用', 'Computer Use'],
    recommended: true,
  },
  {
    name: 'Claude 4 Sonnet',
    desc: '性能与价格的最优平衡',
    price: '$3 / $15 per MTok',
    features: ['200K 上下文', '高性价比', '工具调用', 'Artifacts'],
  },
  {
    name: 'Claude 4 Haiku',
    desc: '轻量快速，适合批量任务',
    price: '$0.8 / $4 per MTok',
    features: ['200K 上下文', '超快响应', '低成本', '批量处理'],
  },
]

const useCases = [
  {
    title: '📚 长文档分析',
    desc: '上传整本书、论文合集，Claude 能快速总结、对比、回答细节问题。',
  },
  {
    title: '💻 编程助手',
    desc: '跨文件重构、代码审查、bug 定位，Claude 4 在 SWE-bench 上表现领先。',
  },
  {
    title: '✍️ 创意写作',
    desc: '小说、营销文案、剧本，Claude 的写作风格最接近人类。',
  },
  {
    title: '🔍 深度研究',
    desc: '结合 Web Search 工具，Claude 能完成多步骤的深度研究报告。',
  },
  {
    title: '📊 数据处理',
    desc: '上传 CSV/Excel，使用 Artifacts 生成可视化图表与洞察。',
  },
  {
    title: '🤖 AI Agent',
    desc: 'Computer Use 与 Tool Use 让 Claude 自主完成多步任务。',
  },
]

const comparisons = [
  { feature: '上下文窗口', claude: '200K tokens', gpt: '128K tokens' },
  { feature: '风格', claude: '自然、人类化', gpt: '结构化、精确' },
  { feature: '代码能力', claude: '跨文件重构强', gpt: '单文件能力强' },
  { feature: '工具使用', claude: 'Computer Use', gpt: 'GPTs / Plugin' },
  { feature: '多模态', claude: '图像理解', gpt: '图像/语音/视频' },
  { feature: '价格', claude: '更便宜', gpt: '较贵' },
]

const faqs = [
  {
    q: 'Claude 是什么？',
    a: 'Claude 是由美国 AI 公司 Anthropic 开发的 AI 助手，以宪法 AI（Constitutional AI）方法训练，主打安全性、长上下文与代码能力。',
  },
  {
    q: 'Claude 和 ChatGPT 哪个好？',
    a: '两者各有优势。Claude 长上下文（200K）、代码重构、写作风格更自然；ChatGPT 多模态、生态、插件更成熟。日常对话推荐 Claude，长任务或工具集成按需选择。',
  },
  {
    q: 'Claude 怎么注册？',
    a: '访问 claude.ai，使用 Google 邮箱或邮箱注册即可使用免费版（Claude 3.5 Sonnet）。订阅 Pro 版（$20/月）可使用 Claude 4 系列。',
  },
  {
    q: 'Claude 4 有什么新特性？',
    a: 'Claude 4 引入 Computer Use（操控电脑）、Artifacts（实时渲染）、增强的代码能力、更长的稳定运行时间（可连续工作数小时）。',
  },
  {
    q: 'Claude API 怎么用？',
    a: '在 console.anthropic.com 申请 API Key，使用 Messages API 调用，支持流式响应、工具调用、视觉输入。',
  },
]
</script>

<template>
  <article class="page">
    <!-- 头部 -->
    <section class="page-hero claude">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/tools' }">AI 工具</el-breadcrumb-item>
          <el-breadcrumb-item>Claude 介绍</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="hero-grid">
          <div>
            <el-tag type="warning" effect="light" round>由 Anthropic 出品</el-tag>
            <h1>Claude 介绍</h1>
            <p class="lead">
              Anthropic 推出的 AI 助手 Claude，200K 长上下文、Artifacts 工具、Computer Use，
              写作与编程能力领先，是 ChatGPT 最强竞争对手。
            </p>
            <div class="cta">
              <el-button type="primary" size="large" round href="https://claude.ai" target="_blank">
                立即访问 Claude →
              </el-button>
              <el-button size="large" round @click="$router.push('/tools/chatgpt')">
                对比 ChatGPT
              </el-button>
            </div>
          </div>
          <div class="hero-card">
            <div class="claude-mark">A</div>
            <div class="claude-name">Claude 4 Sonnet</div>
            <div class="claude-stat">
              <div><strong>200K</strong><span>上下文</span></div>
              <div><strong>3</strong><span>模型版本</span></div>
              <div><strong>Top 1</strong><span>SWE-bench</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心能力 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Claude 的六大核心能力</h2>
        <p class="section-subtitle">重新定义 AI 助手的可能性</p>
        <div class="abilities">
          <div v-for="a in abilities" :key="a.title" class="ability">
            <div class="icon-wrap">
              <el-icon :size="28" color="#cc785c"><component :is="a.icon" /></el-icon>
            </div>
            <h3>{{ a.title }}</h3>
            <p>{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 模型版本 -->
    <section class="section section-soft">
      <div class="container">
        <h2 class="section-title">Claude 模型版本</h2>
        <p class="section-subtitle">按需选择最适合的版本</p>
        <div class="versions">
          <div
            v-for="v in versions"
            :key="v.name"
            class="version"
            :class="{ recommended: v.recommended }"
          >
            <el-tag v-if="v.recommended" type="warning" effect="dark" class="rec-tag">
              推荐
            </el-tag>
            <h3>{{ v.name }}</h3>
            <p class="desc">{{ v.desc }}</p>
            <div class="price">{{ v.price }}</div>
            <ul>
              <li v-for="f in v.features" :key="f">
                <el-icon color="#10b981"><CircleCheck /></el-icon>
                {{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 应用场景 -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">典型应用场景</h2>
        <p class="section-subtitle">Claude 在这些任务中表现尤其出色</p>
        <div class="use-cases">
          <div v-for="u in useCases" :key="u.title" class="use-case">
            <h3>{{ u.title }}</h3>
            <p>{{ u.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 对比 -->
    <section class="section section-soft">
      <div class="container">
        <h2 class="section-title">Claude vs ChatGPT</h2>
        <p class="section-subtitle">六大维度全面对比</p>
        <div class="compare-wrap">
          <table class="compare">
            <thead>
              <tr>
                <th>对比项</th>
                <th>Claude 4</th>
                <th>GPT-4o</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in comparisons" :key="c.feature">
                <td><strong>{{ c.feature }}</strong></td>
                <td>{{ c.claude }}</td>
                <td>{{ c.gpt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">常见问题</h2>
        <p class="section-subtitle">关于 Claude 你想知道的</p>
        <div class="faq">
          <el-collapse>
            <el-collapse-item v-for="(f, i) in faqs" :key="i" :title="f.q">
              {{ f.a }}
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.page-hero.claude {
  background: linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%);
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
  padding: 32px;
  box-shadow: var(--site-shadow-lg);
  text-align: center;
}
.claude-mark {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #cc785c 0%, #f59e0b 100%);
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.claude-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
}
.claude-stat {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  div {
    display: flex;
    flex-direction: column;
    strong {
      font-size: 22px;
      color: var(--site-text);
      font-weight: 700;
    }
    span {
      font-size: 12px;
      color: var(--site-text-muted);
      margin-top: 4px;
    }
  }
}
.section-soft {
  background: var(--site-bg-soft);
}
.abilities {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.ability {
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 28px 24px;
  transition: transform 0.25s, box-shadow 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
  }
  .icon-wrap {
    width: 56px;
    height: 56px;
    background: #fef3c7;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 17px;
    margin-bottom: 8px;
  }
  p {
    margin: 0;
    color: var(--site-text-secondary);
    font-size: 14px;
    line-height: 1.7;
  }
}
.versions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.version {
  position: relative;
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 32px 24px;
  transition: transform 0.25s, box-shadow 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
  }
  &.recommended {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
  }
  .rec-tag {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
  h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .desc {
    margin: 0 0 16px;
    color: var(--site-text-secondary);
    font-size: 14px;
  }
  .price {
    font-size: 14px;
    color: #cc785c;
    font-weight: 600;
    margin-bottom: 20px;
    padding: 8px 12px;
    background: #fef3c7;
    border-radius: 8px;
    text-align: center;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--site-text-secondary);
    }
  }
}
.use-cases {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.use-case {
  background: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 24px;
  h3 {
    font-size: 17px;
    margin-bottom: 8px;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: var(--site-text-secondary);
    line-height: 1.7;
  }
}
.compare-wrap {
  background: #fff;
  border-radius: var(--site-radius);
  padding: 24px;
  border: 1px solid var(--site-border);
  overflow-x: auto;
}
.compare {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid var(--site-border-light);
    font-size: 14px;
  }
  th {
    background: var(--site-bg-soft);
    font-weight: 600;
  }
  tbody tr:last-child td {
    border-bottom: none;
  }
  tbody td:not(:first-child) {
    color: var(--site-text-secondary);
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
</style>
