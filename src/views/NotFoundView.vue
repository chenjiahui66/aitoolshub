<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { useRouter } from 'vue-router'

const router = useRouter()

useSeo({
  title: '404 - 页面未找到',
  description: '抱歉,你访问的页面不存在或已被移除。',
  path: '/404',
  noindex: true,
})
</script>

<template>
  <section class="not-found">
    <div class="container">
      <div class="content">
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉,你访问的页面不存在,可能已被移除或地址输入错误。</p>
        <div class="actions">
          <el-button type="primary" size="large" round @click="router.push('/')">
            返回首页
          </el-button>
          <el-button size="large" round @click="router.push('/tools')">
            浏览工具
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.not-found {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: var(--site-gradient-soft);
  text-align: center;
}
.content {
  padding: 48px 24px;
  h1 {
    font-size: 120px;
    background: var(--site-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    line-height: 1;
    margin-bottom: 16px;
  }
  h2 {
    font-size: 24px;
    margin-bottom: 12px;
  }
  p {
    color: var(--site-text-secondary);
    margin-bottom: 24px;
  }
}
.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
