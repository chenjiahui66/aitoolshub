<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { tools, categories, type Tool } from '@/data/tools'
import ToolCard from '@/components/ToolCard.vue'

const router = useRouter()

useSeo({
  title: 'AI 工具导航 - 收录数百款热门 AI 工具',
  description:
    'AIToolsHub AI 工具导航页,收录 ChatGPT、Claude、Midjourney、Sora、Cursor 等 16+ 类目、数百款热门 AI 工具,按类目筛选、按热度排序,助你快速找到合适的 AI 工具。',
  keywords:
    'AI工具导航,AI工具大全,ChatGPT,Claude,Midjourney,Sora,Cursor,AI绘画工具,AI编程工具,AI视频工具,AI写作工具,AI搜索,AI语音,AI音乐,AI设计,开源模型',
  path: '/tools',
  type: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI 工具导航',
    description: '收录数百款热门 AI 工具的导航页。',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tools.length,
      itemListElement: tools.slice(0, 10).map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        url: t.url,
        description: t.desc,
      })),
    },
  },
})

const activeCategory = ref<string>('全部')
const searchQuery = ref('')
const sortBy = ref<'hot' | 'name'>('hot')

const filtered = computed(() => {
  let list: Tool[] = tools
  if (activeCategory.value !== '全部') {
    list = list.filter((t) => t.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
  }
  if (sortBy.value === 'hot') {
    list = [...list].sort((a, b) => Number(!!b.hot) - Number(!!a.hot))
  } else {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  }
  return list
})

const categoryList = ['全部', ...categories.map((c) => c.name)]
const totalCount = computed(() => filtered.value.length)
</script>

<template>
  <!-- 页面头部 -->
  <section class="page-hero">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>AI 工具导航</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>AI 工具导航</h1>
      <p class="lead">
        收录 16+ 类目、数百款热门 AI 工具，覆盖对话、绘画、视频、编程、写作、搜索、语音、音乐、设计等全场景。
      </p>

      <div class="toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索工具名称、描述、标签..."
          clearable
          size="large"
          class="search"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-radio-group v-model="sortBy" size="large">
          <el-radio-button value="hot">热度</el-radio-button>
          <el-radio-button value="name">字母</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <!-- 类目筛选 -->
      <div class="categories">
        <button
          v-for="c in categoryList"
          :key="c"
          class="category-chip"
          :class="{ active: activeCategory === c }"
          @click="activeCategory = c"
        >
          {{ c }}
        </button>
      </div>

      <div class="result-info">
        <span>共 <strong>{{ totalCount }}</strong> 款工具</span>
      </div>

      <!-- 列表 -->
      <div v-if="filtered.length" class="tool-grid">
        <ToolCard v-for="t in filtered" :key="t.id" :tool="t" />
      </div>
      <el-empty v-else description="没有找到匹配的工具，试试其他关键词或类目" />

      <!-- 推荐深入阅读 -->
      <div class="related-articles">
        <h2>推荐阅读</h2>
        <div class="related-grid">
          <a class="related-card" @click="router.push('/tools/chatgpt')">
            <h3>ChatGPT 完整教程</h3>
            <p>从注册到精通，附 50+ 实战 Prompt 模板</p>
          </a>
          <a class="related-card" @click="router.push('/tools/claude')">
            <h3>Claude 深度介绍</h3>
            <p>了解 Claude 4 的能力边界与最佳实践</p>
          </a>
          <a class="related-card" @click="router.push('/blog')">
            <h3>AI 行业洞察</h3>
            <p>追踪最新 AI 趋势与深度分析文章</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.page-hero {
  background: var(--site-gradient-soft);
  padding: 48px 0 40px;
  h1 {
    font-size: 36px;
    margin: 16px 0 12px;
  }
  .lead {
    color: var(--site-text-secondary);
    font-size: 16px;
    max-width: 720px;
    margin: 0 0 28px;
  }
}
.toolbar {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  .search {
    flex: 1;
    min-width: 280px;
    max-width: 480px;
  }
}
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}
.category-chip {
  border: 1px solid var(--site-border);
  background: #fff;
  color: var(--site-text-secondary);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: var(--site-primary);
    border-color: var(--site-primary-light);
  }
  &.active {
    background: var(--site-gradient);
    color: #fff;
    border-color: transparent;
  }
}
.result-info {
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--site-text-muted);
  strong {
    color: var(--site-primary);
    font-size: 18px;
    margin: 0 4px;
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
.related-articles {
  margin-top: 64px;
  padding-top: 48px;
  border-top: 1px solid var(--site-border);
  h2 {
    font-size: 24px;
    margin-bottom: 24px;
  }
}
.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.related-card {
  background: var(--site-bg-soft);
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 24px;
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    background: #fff;
    border-color: var(--site-primary-light);
    transform: translateY(-4px);
    box-shadow: var(--site-shadow);
  }
  h3 {
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--site-text);
  }
  p {
    margin: 0;
    font-size: 14px;
    color: var(--site-text-secondary);
  }
}
</style>
