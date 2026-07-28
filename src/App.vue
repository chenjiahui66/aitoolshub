<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <router-view />
  </main>
  <SiteFooter />
</template>

<style lang="scss">
// 路由切换走 Vue Router 默认行为，避免 vite-ssg hydration 时因
// <transition mode="out-in"> + :key 导致的「点击菜单后中间区域空白」问题。
</style>
