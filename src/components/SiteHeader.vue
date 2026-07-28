<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isFixed = ref(false)
const drawerOpen = ref(false)

const navItems = [
  { name: 'home', label: '首页', to: '/' },
  { name: 'tools', label: 'AI 工具导航', to: '/tools' },
  { name: 'tools-chatgpt', label: 'ChatGPT 教程', to: '/tools/chatgpt' },
  { name: 'tools-claude', label: 'Claude 介绍', to: '/tools/claude' },
  { name: 'apps', label: 'AI 小工具', to: '/apps' },
  { name: 'blog', label: 'AI 文章', to: '/blog' },
]

const activeIndex = computed(() => {
  const path = route.path
  if (path.startsWith('/tools/chatgpt')) return 'tools-chatgpt'
  if (path.startsWith('/tools/claude')) return 'tools-claude'
  if (path.startsWith('/tools')) return 'tools'
  if (path.startsWith('/apps')) return 'apps'
  if (path.startsWith('/blog')) return 'blog'
  return 'home'
})

const onSelect = (index: string) => {
  const item = navItems.find((n) => n.name === index)
  if (item) router.push(item.to)
  drawerOpen.value = false
}

const onScroll = () => {
  isFixed.value = window.scrollY > 8
}
watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false
  },
)
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScroll, { passive: true })
}
</script>

<template>
  <header class="site-header" :class="{ 'is-fixed': isFixed }">
    <div class="container header-inner">
      <router-link to="/" class="brand" aria-label="AIToolsHub 首页">
        <span class="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="32" height="32">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#0ea5e9" />
                <stop offset="1" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#g)" />
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
      </router-link>

      <nav class="nav-desktop" aria-label="主导航">
        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          :ellipsis="false"
          @select="onSelect"
        >
          <el-menu-item v-for="item in navItems" :key="item.name" :index="item.name">
            {{ item.label }}
          </el-menu-item>
        </el-menu>
      </nav>

      <div class="header-actions">
        <el-button type="primary" size="default" round @click="router.push('/tools')">
          开始探索
        </el-button>
        <el-button
          class="menu-btn"
          :icon="drawerOpen ? 'Close' : 'Menu'"
          circle
          aria-label="菜单"
          @click="drawerOpen = !drawerOpen"
        />
      </div>
    </div>

    <el-drawer v-model="drawerOpen" direction="rtl" size="280px" :with-header="false">
      <div class="drawer-brand">
        <span class="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="28" height="28">
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#0ea5e9" />
                <stop offset="1" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#g2)" />
            <path
              d="M11 10v12M11 10l8 12M19 10v12"
              stroke="#fff"
              stroke-width="2.5"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
        </span>
        <span>AITools<strong>Hub</strong></span>
      </div>
      <el-menu
        class="drawer-menu"
        :default-active="activeIndex"
        @select="onSelect"
      >
        <el-menu-item v-for="item in navItems" :key="item.name" :index="item.name">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.site-header.is-fixed {
  border-bottom-color: var(--site-border);
  box-shadow: var(--site-shadow-sm);
  background: rgba(255, 255, 255, 0.95);
}
.header-inner {
  height: var(--site-header-h);
  display: flex;
  align-items: center;
  gap: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  color: var(--site-text);
  &-logo {
    display: inline-flex;
  }
  strong {
    background: var(--site-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
.nav-desktop {
  flex: 1;
  display: flex;
  justify-content: center;
  :deep(.el-menu) {
    border-bottom: 0 !important;
    background: transparent;
  }
  :deep(.el-menu-item) {
    height: var(--site-header-h);
    line-height: var(--site-header-h);
    font-size: 15px;
    font-weight: 500;
    color: var(--site-text-secondary);
    &.is-active {
      color: var(--site-primary);
    }
    &:hover {
      color: var(--site-primary);
    }
  }
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
.menu-btn {
  display: none;
}
@media (max-width: 960px) {
  .nav-desktop {
    display: none;
  }
  .menu-btn {
    display: inline-flex;
  }
}
.drawer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 8px 20px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid var(--site-border-light);
  margin-bottom: 8px;
  strong {
    background: var(--site-gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
.drawer-menu {
  border-right: 0 !important;
  :deep(.el-menu-item) {
    font-size: 15px;
  }
}
</style>
