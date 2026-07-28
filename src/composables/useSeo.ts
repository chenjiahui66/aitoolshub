import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { SeoConfig } from '@/types/seo'
import { SITE_URL } from '@/data/seo'

const SITE_NAME = 'AIToolsHub'
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.png`
const DEFAULT_AUTHOR = 'AIToolsHub 编辑部'

const ensureMeta = (selector: string, attrs: Record<string, string>): HTMLMetaElement => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    const [name, value] = selector.replace(/[\[\]"]/g, '').split('=')
    el.setAttribute(name, value)
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v)
  }
  return el
}

const setMeta = (name: string, content: string) =>
  ensureMeta(`meta[name="${name}"]`, { name, content })
const setOg = (property: string, content: string) =>
  ensureMeta(`meta[property="${property}"]`, { property, content })
const setTwitter = (name: string, content: string) =>
  ensureMeta(`meta[name="${name}"]`, { name, content })
const ensureLink = (rel: string): HTMLLinkElement => {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}

let jsonLdEls: HTMLScriptElement[] = []
const setJsonLd = (data: unknown) => {
  jsonLdEls.forEach((el) => el.remove())
  jsonLdEls = []
  if (!data) return
  const payload = Array.isArray(data) ? data : [data]
  payload.forEach((item) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoJsonld = 'true'
    script.text = JSON.stringify(item)
    document.head.appendChild(script)
    jsonLdEls.push(script)
  })
}

/**
 * 在 setup 中调用。客户端水合后自动同步 SEO meta。
 * SSR 阶段由 vite-ssg 的 onBeforePageRender 注入（见 vite.config.ts）。
 * 注意：apply() 延后到 onMounted + nextTick 后执行，
 * 避免在 setup 顶层同步操作 14+ 个 DOM 元素，阻塞 transition leave 阶段导致页面空白。
 */
export function useSeo(config: SeoConfig) {
  if (typeof window === 'undefined') return // SSR 不执行

  const route = useRoute()

  const apply = () => {
    const path = config.path ?? route.path
    const fullUrl = `${SITE_URL}${path}`
    const fullTitle = `${config.title} | ${SITE_NAME}`
    const image = config.image || DEFAULT_IMAGE
    const type = config.type || 'website'

    document.title = fullTitle

    setMeta('description', config.description)
    if (config.keywords) setMeta('keywords', config.keywords)
    setMeta('author', config.author || DEFAULT_AUTHOR)
    setMeta(
      'robots',
      config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    )

    const canonical = ensureLink('canonical')
    canonical.setAttribute('href', fullUrl)

    setOg('og:type', type)
    setOg('og:title', fullTitle)
    setOg('og:description', config.description)
    setOg('og:url', fullUrl)
    setOg('og:image', image)
    setOg('og:site_name', SITE_NAME)
    setOg('og:locale', 'zh_CN')
    if (type === 'article' && config.publishedTime) {
      setOg('article:published_time', config.publishedTime)
      setOg('article:author', config.author || DEFAULT_AUTHOR)
    }

    setTwitter('twitter:card', 'summary_large_image')
    setTwitter('twitter:title', fullTitle)
    setTwitter('twitter:description', config.description)
    setTwitter('twitter:image', image)

    if (config.jsonLd) {
      setJsonLd(config.jsonLd)
    } else if (type === 'article') {
      setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        image,
        author: { '@type': 'Organization', name: config.author || DEFAULT_AUTHOR },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
        datePublished: config.publishedTime,
      })
    } else {
      setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: config.description,
        inLanguage: 'zh-CN',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/tools?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      })
    }
  }

  // 延后到 onMounted + nextTick，让首屏 hydrate 先完成，避开 transition leave 阶段的卡顿
  onMounted(() => {
    nextTick(apply)
  })

  // 路由切换时（仅在已 hydrate 后）同步更新 SEO
  const stop = watch(
    () => route.fullPath,
    () => {
      nextTick(apply)
    },
  )
  onBeforeUnmount(stop)
}

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  defaultImage: DEFAULT_IMAGE,
  defaultAuthor: DEFAULT_AUTHOR,
}
