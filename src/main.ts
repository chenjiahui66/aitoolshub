import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import {
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY,
} from 'element-plus'
import App from './App.vue'
import { routes } from './router'
import './styles/index.scss'

// vite-ssg 入口：dev 时走 SPA 模式，build 时走 SSG
// element-plus 的样式由 unplugin-vue-components 自动按需注入，无需手动 import
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app, router, isClient }) => {
    const head = createHead()
    app.use(head)
    app.use(createPinia())

    // SSR 阶段为 element-plus 提供必要的 injection key，避免 hydration mismatch
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    app.provide(ID_INJECTION_KEY, { prefix: 0, current: 0 })

    if (isClient) {
      router.options.scrollBehavior = (_to, _from, savedPosition) => {
        if (savedPosition) return savedPosition
        return { top: 0, behavior: 'smooth' }
      }
    }
  },
)
