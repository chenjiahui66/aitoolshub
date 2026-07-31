import { defineConfig, type UserConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const EL_CSS_STUB_ID = '\0virtual:element-plus-css-stub'

/**
 * 移除 SSR bundle 中 element-plus 组件 CSS 的 import。
 * Node ESM 不支持 .css 文件的同步 import，客户端 bundle 不受影响。
 */
function stripElementPlusCssInSsr(): Plugin {
  return {
    name: 'strip-element-plus-css-in-ssr',
    enforce: 'pre',
    apply: 'build',
    resolveId(id, _importer, options) {
      const isSsr = options?.ssr === true
      if (!isSsr) return null
      if (
        id === 'element-plus/dist/index.css' ||
        /element-plus.*\.css(\?|$)/.test(id) ||
        /element-plus\/es\/components\/.*\/style\/css/.test(id)
      ) {
        return EL_CSS_STUB_ID
      }
      return null
    },
    load(id) {
      if (id === EL_CSS_STUB_ID) {
        return 'export default {}'
      }
      return null
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
    stripElementPlusCssInSsr(),
  ],
  base:'/aitoolshub/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // 把 /api 前缀的请求转发到 Spring Boot，避免前端写死后端 host/端口
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    sourcemap: false,
  },
  // @ts-expect-error vite-ssg 扩展的 UserConfig 在 vue-tsc 中不可见
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes: (paths: string[]) =>
      paths.filter((p: string) => !p.includes(':pathMatch')),
    crittersOptions: false,
    // SSR 阶段根据 route 注入完整 SEO meta
    onBeforePageRender: async (route: string, indexHTML: string) => {
      const mod = await import(pathToFileURL(path.resolve(__dirname, 'build/seo-injector.mjs')).href)
      return mod.injectSeo(route, indexHTML)
    },
    onPageRendered: (_route: string, html: string) => html,
  },
} satisfies UserConfig)
