<script setup lang="ts">
import type { Post } from '@/data/posts'

defineProps<{ post: Post; featured?: boolean }>()
</script>

<template>
  <article class="blog-card" :class="{ featured }">
    <a class="cover" :href="`#${post.id}`" :aria-label="post.title" :style="{ background: post.cover }">
      <span class="cover-tag">{{ post.category }}</span>
    </a>
    <div class="body">
      <div class="meta">
        <span>{{ post.date }}</span>
        <span class="dot">·</span>
        <span>{{ post.readTime }}阅读</span>
        <span class="dot">·</span>
        <span>{{ post.author }}</span>
      </div>
      <h3>
        <a :href="`#${post.id}`">{{ post.title }}</a>
      </h3>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="tags">
        <el-tag v-for="t in post.tags" :key="t" size="small" effect="plain">{{ t }}</el-tag>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.blog-card {
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
    border-color: var(--site-primary-light);
  }
}
.cover {
  display: block;
  height: 180px;
  position: relative;
  background-size: cover;
  background-position: center;
}
.cover-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--site-text);
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
}
.body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--site-text-muted);
  margin-bottom: 10px;
  .dot {
    color: var(--site-text-muted);
  }
}
h3 {
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 10px;
  a {
    color: var(--site-text);
    &:hover {
      color: var(--site-primary);
    }
  }
}
.excerpt {
  margin: 0 0 16px;
  font-size: 14px;
  color: var(--site-text-secondary);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.tags {
  margin-top: auto;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.blog-card.featured {
  flex-direction: row;
  .cover {
    width: 45%;
    height: auto;
    min-height: 240px;
  }
  .body {
    width: 55%;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .cover,
    .body {
      width: 100%;
    }
  }
}
</style>
