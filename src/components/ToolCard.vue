<script setup lang="ts">
import type { Tool } from '@/data/tools'

defineProps<{ tool: Tool }>()
</script>

<template>
  <a class="tool-card" :href="tool.url" target="_blank" rel="noopener noreferrer">
    <div class="logo" :style="{ background: tool.logoColor }">{{ tool.initial }}</div>
    <div class="body">
      <div class="head">
        <h3>{{ tool.name }}</h3>
        <div class="badges">
          <el-tag v-if="tool.hot" type="danger" size="small" effect="light">热门</el-tag>
          <el-tag v-if="tool.free" type="success" size="small" effect="light">免费</el-tag>
        </div>
      </div>
      <p class="desc">{{ tool.desc }}</p>
      <div class="meta">
        <span class="category">{{ tool.category }}</span>
        <span class="tags">
          <el-tag v-for="t in tool.tags.slice(0, 3)" :key="t" size="small" effect="plain">
            {{ t }}
          </el-tag>
        </span>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.tool-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
    border-color: var(--site-primary-light);
  }
}
.logo {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.body {
  flex: 1;
  min-width: 0;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--site-text);
  }
}
.badges {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}
.desc {
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--site-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.category {
  font-size: 12px;
  color: var(--site-primary);
  background: var(--site-primary-light);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
