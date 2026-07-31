<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { ElMessage } from 'element-plus'
import { listArticles } from '@/api/article'
import BlogCard from '@/components/BlogCard.vue'

useSeo({
  title: 'AI 文章 - 深度教程、行业洞察与实战技巧',
  description:
    'AIToolsHub AI 文章专栏,提供 ChatGPT、Claude、Midjourney、Sora 等主流 AI 工具的深度教程,Prompt 工程技巧,AI 行业动态与趋势分析。',
  keywords:
    'AI文章,AI教程,AI博客,ChatGPT教程,Claude教程,Prompt工程,AI行业,AI趋势,AI工具评测,AI对比,深度文章',
  path: '/blog',
  type: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AIToolsHub 博客',
    description: 'AI 行业的深度教程与趋势分析。',
    blogPost: [],
  },
})

interface Post {
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

/** 把后端实体映射成前端 Post。后端暂时没存的字段用兜底值。 */
function toPost(a: BackendArticle): Post {
  const plain = (a.content || '').replace(/\s+/g, ' ').trim()
  const excerpt = plain.length > 80 ? plain.slice(0, 80) + '…' : plain
  const date = (a.publishedAt || a.createdAt || '').slice(0, 10)
  return {
    id: String(a.id),
    title: a.title,
    excerpt: excerpt || '（暂无摘要）',
    category: 'AI 文章',
    author: a.author || 'AIToolsHub 编辑部',
    date,
    readTime: `${Math.max(1, Math.round((a.content?.length || 0) / 400))} 分钟`,
    cover:
      a.coverImage ||
      'linear-gradient(135deg,#0ea5e9 0%,#8b5cf6 100%)',
    content: a.content,
    tags: [],
  }
}

// 远程数据
const remotePosts = ref<Post[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(6) // 1 张精选 + 5 张卡片，桌面端 3 列 -> 第二页基本是 6/3=2 行
const loading = ref(false)

async function fetchList(p = page.value) {
  loading.value = true
  try {
    const data = await listArticles({ page: p, size: size.value })
    remotePosts.value = data.items.map(toPost)
    total.value = data.total
    page.value = data.page
  } catch (err) {
    const msg = err instanceof Error ? err.message : '加载失败'
    ElMessage.error('文章加载失败：' + msg)
    remotePosts.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchList(1))

// 客户端筛选（不调接口，列表内过滤）
const activeCategory = ref('全部')
const searchQuery = ref('')
const allCategories = computed(() => ['全部'])

const filtered = computed(() => {
  let list = remotePosts.value
  if (activeCategory.value !== '全部') {
    // 后端没存 category，分类按钮目前只占位
    list = []
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q),
    )
  }
  return list
})

const featured = computed(() => filtered.value[0])
const restPosts = computed(() => filtered.value.slice(1))

function onPageChange(p: number) {
  fetchList(p)
}
</script>

<template>
  <article class="page">
    <section class="page-hero">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>AI 文章</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>AI 文章</h1>
        <p class="lead">
          深度教程、行业洞察、实战技巧 —— 与你一起追踪 AI 行业最前沿。
        </p>

        <div class="search-bar">
          <el-input
            v-model="searchQuery"
            placeholder="搜索文章标题、正文..."
            size="large"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="categories">
          <button
            v-for="c in allCategories"
            :key="c"
            class="category-chip"
            :class="{ active: activeCategory === c }"
            @click="activeCategory = c"
          >
            {{ c }}
          </button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <el-skeleton v-if="loading" :rows="6" animated />
        <template v-else-if="filtered.length">
          <BlogCard v-if="featured" :post="featured" featured />
          <div class="blog-grid">
            <BlogCard v-for="p in restPosts" :key="p.id" :post="p" />
          </div>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next, total"
              :total="total"
              :page-size="size"
              :current-page="page"
              @current-change="onPageChange"
            />
          </div>
        </template>
        <el-empty v-else description="没有找到匹配的文章，试试其他关键词" />
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <h2 class="section-title">订阅更新</h2>
        <p class="section-subtitle">每周精选优质 AI 内容，不错过任何干货</p>
        <div class="subscribe">
          <el-input placeholder="输入你的邮箱地址" size="large" style="max-width: 360px;" />
          <el-button type="primary" size="large">立即订阅</el-button>
        </div>
      </div>
    </section>
  </article>
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
    margin: 0 0 24px;
  }
}
.search-bar {
  max-width: 480px;
  margin-bottom: 20px;
}
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
.section-soft {
  background: var(--site-bg-soft);
}
.blog-grid {
  margin-top: 24px;
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
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
.subscribe {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>