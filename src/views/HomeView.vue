<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSeo, siteConfig } from '@/composables/useSeo'
import { tools } from '@/data/tools'
import { posts } from '@/data/posts'
import ToolCard from '@/components/ToolCard.vue'
import BlogCard from '@/components/BlogCard.vue'

const router = useRouter()

useSeo({
  title: 'AI 工具导航站 - 发现最好用的 AI 工具',
  description:
    'AIToolsHub 是专业的 AI 工具导航站,收录 ChatGPT、Claude、Midjourney 等数百款热门 AI 工具,提供 AI 教程、AI 小工具与 AI 行业文章,助你高效上手 AI。',
  keywords:
    'AI工具,AI工具导航,ChatGPT教程,Claude介绍,AI小工具,AI文章,AIGC,人工智能,AI绘画,AI编程,AI视频,AI写作',
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: '专业的 AI 工具导航站,收录数百款热门 AI 工具与教程。',
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
})

const hotTools = tools.filter((t) => t.hot).slice(0, 6)
const latestPosts = posts.slice(0, 3)

const features = [
  {
    icon: 'Compass',
    title: '精选 AI 工具导航',
    desc: '收录 16+ 类目、数百款热门 AI 工具，每日人工筛选更新。',
  },
  {
    icon: 'Reading',
    title: '深度教程与对比',
    desc: '从入门到精通，ChatGPT、Claude 等主流 AI 的实战指南。',
  },
  {
    icon: 'Tools',
    title: '在线 AI 小工具',
    desc: '即开即用的 AI 小工具集合，免登录、客户端运行、保护隐私。',
  },
  {
    icon: 'TrendCharts',
    title: 'AI 行业洞察',
    desc: '追踪 AI 行业最新动态，每周精选优质内容。',
  },
]

const stats = [
  { value: '500+', label: 'AI 工具' },
  { value: '100+', label: '教程文章' },
  { value: '50万+', label: '月访问用户' },
  { value: '10万+', label: '注册用户' },
]
</script>

<template>
  <!-- Hero -->
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-content">
        <el-tag class="hero-badge" type="primary" effect="light" round>2026 AI 工具精选</el-tag>
        <h1>发现最好用的 <span class="gradient">AI 工具</span></h1>
        <p class="lead">
          AIToolsHub 收录了 ChatGPT、Claude、Midjourney 等数百款热门 AI 工具，
          提供详尽教程与行业洞察，帮你快速上手 AI、提升 10 倍效率。
        </p>
        <div class="cta">
          <el-button type="primary" size="large" round @click="router.push('/tools')">
            立即开始 →
          </el-button>
          <el-button size="large" round @click="router.push('/blog')">阅读文章</el-button>
        </div>
        <div class="stats">
          <div v-for="s in stats" :key="s.label" class="stat">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-card">
          <div class="grid-row">
            <div class="dot" style="background: #10a37f"></div>
            <div class="line"></div>
          </div>
          <div class="grid-row">
            <div class="dot" style="background: #cc785c"></div>
            <div class="line short"></div>
          </div>
          <div class="grid-row">
            <div class="dot" style="background: #8b5cf6"></div>
            <div class="line"></div>
          </div>
          <div class="grid-row">
            <div class="dot" style="background: #0ea5e9"></div>
            <div class="line short"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 特色 -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">为什么选择 AIToolsHub</h2>
      <p class="section-subtitle">最专业、最实用的 AI 工具导航与教程平台</p>
      <div class="features">
        <div v-for="f in features" :key="f.title" class="feature">
          <el-icon :size="32" color="#0ea5e9"><component :is="f.icon" /></el-icon>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 热门工具 -->
  <section class="section section-soft">
    <div class="container">
      <div class="section-head">
        <div>
          <h2 class="section-title left">热门 AI 工具</h2>
          <p class="section-subtitle left">用户最常访问、口碑最佳的 AI 工具</p>
        </div>
        <el-button text @click="router.push('/tools')" type="primary">
          查看全部 →
        </el-button>
      </div>
      <div class="tool-grid">
        <ToolCard v-for="t in hotTools" :key="t.id" :tool="t" />
      </div>
    </div>
  </section>

  <!-- 最新文章 -->
  <section class="section">
    <div class="container">
      <div class="section-head">
        <div>
          <h2 class="section-title left">最新 AI 文章</h2>
          <p class="section-subtitle left">深度教程、行业洞察与实战技巧</p>
        </div>
        <el-button text @click="router.push('/blog')" type="primary">
          更多文章 →
        </el-button>
      </div>
      <div class="blog-grid">
        <BlogCard v-for="p in latestPosts" :key="p.id" :post="p" />
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section">
    <div class="container">
      <div class="cta-banner">
        <div>
          <h2>开始你的 AI 之旅</h2>
          <p>探索数百款 AI 工具，让 AI 成为你的得力助手</p>
        </div>
        <el-button type="primary" size="large" round @click="router.push('/tools')">
          探索全部工具 →
        </el-button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 80px 0 96px;
  background: var(--site-gradient-soft);
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 48px 0 64px;
  }
}
.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
}
.hero-badge {
  margin-bottom: 16px;
  font-size: 13px;
  padding: 4px 14px;
}
h1 {
  font-size: 48px;
  line-height: 1.2;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
}
.gradient {
  background: var(--site-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead {
  font-size: 17px;
  color: var(--site-text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 540px;
}
.cta {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.stat {
  display: flex;
  flex-direction: column;
  strong {
    font-size: 24px;
    color: var(--site-text);
    font-weight: 700;
  }
  span {
    font-size: 13px;
    color: var(--site-text-muted);
  }
}
.hero-visual {
  position: relative;
  height: 360px;
  @media (max-width: 960px) {
    display: none;
  }
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.5;
}
.orb-1 {
  width: 220px;
  height: 220px;
  background: #0ea5e9;
  top: 0;
  right: 20px;
}
.orb-2 {
  width: 180px;
  height: 180px;
  background: #8b5cf6;
  bottom: 20px;
  left: 40px;
}
.orb-3 {
  width: 120px;
  height: 120px;
  background: #06b6d4;
  top: 50%;
  right: 60%;
}
.grid-card {
  position: absolute;
  inset: 40px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(14, 165, 233, 0.2);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
}
.grid-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}
.line {
  height: 10px;
  background: linear-gradient(90deg, #e2e8f0, transparent);
  border-radius: 5px;
  flex: 1;
  &.short {
    flex: 0.5;
  }
}

.section-soft {
  background: var(--site-bg-soft);
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
}
.section-title.left {
  text-align: left;
  margin-bottom: 4px;
}
.section-subtitle.left {
  text-align: left;
  margin-bottom: 0;
}
.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
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
  transition: transform 0.25s, box-shadow 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
  }
  h3 {
    font-size: 17px;
    margin: 16px 0 8px;
  }
  p {
    margin: 0;
    color: var(--site-text-secondary);
    font-size: 14px;
    line-height: 1.7;
  }
}
.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
.cta-banner {
  background: var(--site-gradient);
  color: #fff;
  border-radius: var(--site-radius-lg);
  padding: 48px 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  h2 {
    color: #fff;
    font-size: 28px;
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
    &:hover {
      background: rgba(255, 255, 255, 0.92);
    }
  }
}
</style>
