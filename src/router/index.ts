import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
    meta: { title: 'AI 工具导航' },
  },
  {
    path: '/tools/chatgpt',
    name: 'tools-chatgpt',
    component: () => import('@/views/ChatGPTView.vue'),
    meta: { title: 'ChatGPT 教程' },
  },
  {
    path: '/tools/claude',
    name: 'tools-claude',
    component: () => import('@/views/ClaudeView.vue'),
    meta: { title: 'Claude 介绍' },
  },
  {
    path: '/apps',
    name: 'apps',
    component: () => import('@/views/AppsView.vue'),
    meta: { title: 'AI 小工具' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: 'AI 文章' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面未找到' },
  },
]
