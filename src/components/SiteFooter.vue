<script setup lang="ts">
import { siteConfig } from '@/composables/useSeo'

const year = new Date().getFullYear()

const linkGroups = [
  {
    title: '导航',
    links: [
      { label: '首页', to: '/' },
      { label: 'AI 工具导航', to: '/tools' },
      { label: 'AI 小工具', to: '/apps' },
      { label: 'AI 文章', to: '/blog' },
    ],
  },
  {
    title: '热门工具',
    links: [
      { label: 'ChatGPT 教程', to: '/tools/chatgpt' },
      { label: 'Claude 介绍', to: '/tools/claude' },
      { label: '更多工具', to: '/tools' },
    ],
  },
  {
    title: '关于',
    links: [
      { label: '联系我们', to: '/blog#contact' },
      { label: '隐私政策', to: '/blog#privacy' },
      { label: '免责声明', to: '/blog#disclaimer' },
    ],
  },
]
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="brand">
          <span class="brand-logo" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#0ea5e9" />
                  <stop offset="1" stop-color="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#fg)" />
              <path
                d="M11 10v12M11 10l8 12M19 10v12"
                stroke="#fff"
                stroke-width="2.5"
                stroke-linecap="round"
                fill="none"
              />
            </svg>
          </span>
          <span class="brand-text">AITools<strong>Hub</strong></span>
        </div>
        <p class="brand-desc">
          发现最好用的 AI 工具，专注于 ChatGPT、Claude 等主流 AI 的教程、导航与行业洞察。
        </p>
      </div>

      <div v-for="group in linkGroups" :key="group.title" class="footer-col">
        <h4>{{ group.title }}</h4>
        <ul>
          <li v-for="l in group.links" :key="l.to">
            <router-link :to="l.to">{{ l.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>© {{ year }} {{ siteConfig.name }}. All rights reserved.</span>
        <span class="icp">本站为演示站点，内容仅供学习参考。</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  margin-top: 80px;
  background: #0f172a;
  color: #cbd5e1;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 48px;
  padding: 56px 24px 32px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}
.footer-brand {
  max-width: 360px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  strong {
    background: var(--site-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
.brand-desc {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.7;
  color: #94a3b8;
}
.footer-col h4 {
  color: #fff;
  font-size: 15px;
  margin-bottom: 16px;
}
.footer-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-col a {
  color: #94a3b8;
  font-size: 14px;
  &:hover {
    color: #fff;
  }
}
.footer-bottom {
  border-top: 1px solid #1e293b;
  padding: 20px 0;
  font-size: 13px;
  color: #64748b;
}
.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
