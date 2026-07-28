// SSR 阶段 SEO meta 注入器。在 vite.config.ts 的 onBeforePageRender 中调用。
// 把 seo-shared 里对应路由的 title/description/og/twitter/canonical/JSON-LD 全部写入 HTML head。
import { getSeoByPath, SITE_URL, SITE_NAME, DEFAULT_IMAGE, DEFAULT_AUTHOR } from '../src/data/seo-shared.mjs'

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * @param {string} route - 当前路由路径，如 "/tools/chatgpt"
 * @param {string} indexHTML - vite-ssg 传入的 index.html 模板
 * @returns {string} 注入 SEO meta 后的 HTML
 */
export function injectSeo(route, indexHTML) {
  const config = getSeoByPath(route) || {
    title: '页面',
    description: '',
    path: route,
  }

  const fullUrl = `${SITE_URL}${config.path ?? route}`
  const fullTitle = `${config.title} | ${SITE_NAME}`
  const image = config.image || DEFAULT_IMAGE
  const type = config.type || 'website'
  const noindex = !!config.noindex

  const headParts = []
  headParts.push(`<title>${escapeHtml(fullTitle)}</title>`)
  headParts.push(`<meta name="description" content="${escapeHtml(config.description)}">`)
  if (config.keywords) {
    headParts.push(`<meta name="keywords" content="${escapeHtml(config.keywords)}">`)
  }
  headParts.push(
    `<meta name="author" content="${escapeHtml(config.author || DEFAULT_AUTHOR)}">`,
  )
  headParts.push(
    `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">`,
  )
  headParts.push(`<link rel="canonical" href="${escapeHtml(fullUrl)}">`)

  // og
  headParts.push(`<meta property="og:type" content="${escapeHtml(type)}">`)
  headParts.push(`<meta property="og:title" content="${escapeHtml(fullTitle)}">`)
  headParts.push(`<meta property="og:description" content="${escapeHtml(config.description)}">`)
  headParts.push(`<meta property="og:url" content="${escapeHtml(fullUrl)}">`)
  headParts.push(`<meta property="og:image" content="${escapeHtml(image)}">`)
  headParts.push(`<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">`)
  headParts.push(`<meta property="og:locale" content="zh_CN">`)
  if (type === 'article' && config.publishedTime) {
    headParts.push(`<meta property="article:published_time" content="${escapeHtml(config.publishedTime)}">`)
    if (config.author) {
      headParts.push(`<meta property="article:author" content="${escapeHtml(config.author)}">`)
    }
  }

  // twitter
  headParts.push(`<meta name="twitter:card" content="summary_large_image">`)
  headParts.push(`<meta name="twitter:title" content="${escapeHtml(fullTitle)}">`)
  headParts.push(`<meta name="twitter:description" content="${escapeHtml(config.description)}">`)
  headParts.push(`<meta name="twitter:image" content="${escapeHtml(image)}">`)

  // JSON-LD
  let jsonLd = config.jsonLd
  if (!jsonLd) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      headline: config.title,
      name: SITE_NAME,
      url: fullUrl,
      description: config.description,
      ...(type === 'article' && config.publishedTime
        ? {
            datePublished: config.publishedTime,
            author: { '@type': 'Organization', name: config.author || DEFAULT_AUTHOR },
          }
        : {}),
    }
  }
  headParts.push(
    `<script type="application/ld+json" data-seo="ssr">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  )

  const headBlock = headParts.join('\n    ')

  // 清掉模板里已有的 title/description/keywords/author/robots/twitter/og/canonical，避免重复
  let html = indexHTML
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name=["'](description|keywords|author|robots|twitter:[^"']+)["']\s+content=["'][^"']*["']\s*\/?>/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["']\s+content=["'][^"']*["']\s*\/?>/gi, '')
    .replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/gi, '')

  // 在 </head> 之前注入
  html = html.replace('</head>', `    ${headBlock}\n  </head>`)

  return html
}
