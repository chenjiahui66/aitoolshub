/**
 * 文章相关 API（当前只接列表查询，其他接口后续按需加）
 * 底层走 src/api/http.ts 的统一 HTTP 客户端。
 */
import { http } from './http'

/** 后端 Article 实体 */
export interface BackendArticle {
  id: number
  title: string
  slug: string
  content: string
  coverImage?: string | null
  author?: string | null
  publishedAt?: string | null
  createdAt: string
  updatedAt: string
}

/** 后端分页结果 */
export interface BackendPage<T> {
  items: T[]
  total: number
  page: number
  size: number
}

export interface ListArticlesParams {
  keyword?: string
  page?: number
  size?: number
}

/** 文章列表查询 */
export function listArticles(params: ListArticlesParams = {}) {
  const qs = new URLSearchParams()
  if (params.keyword) qs.set('keyword', params.keyword)
  qs.set('page', String(params.page ?? 1))
  qs.set('size', String(params.size ?? 10))
  return http.get<BackendPage<BackendArticle>>(`/articles?${qs.toString()}`)
}