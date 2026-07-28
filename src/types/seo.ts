/**
 * 每页的 SEO 元数据。
 * 在 useSeo() 中传入，自动同步到 <title>、meta、og、twitter、canonical、JSON-LD。
 */
export interface SeoConfig {
  /** 页面标题（不含站点名后缀） */
  title: string
  /** 描述，160 字符内最佳 */
  description: string
  /** 关键词，逗号分隔 */
  keywords?: string
  /** 绝对路径或完整 URL；不传则用当前路由 */
  path?: string
  /** og:type，website / article */
  type?: 'website' | 'article'
  /** og:image 完整 URL；不传则用站点默认 og-cover */
  image?: string
  /** 文章发布时间（ISO），仅 type=article 使用 */
  publishedTime?: string
  /** 文章作者 */
  author?: string
  /** 是否不允许搜索引擎索引（如 404 页面） */
  noindex?: boolean
  /** 自定义 JSON-LD 结构化数据 */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}
