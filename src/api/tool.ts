/**
 * 工具相关 API。底层走 src/api/http.ts 的统一 HTTP 客户端。
 */
import { http } from './http'

/** 后端 Tool 实体 */
export interface BackendTool {
  id: number
  name: string
  slug: string
  category: string
  description: string
  url: string
  /** 后端存为逗号分隔字符串,前端按需 split */
  tags: string
  featured: boolean
  status: string
  createdAt: string
  updatedAt: string
}

/** 前台工具列表响应(一次性返回全部 online 工具 + 类目聚合) */
export interface BackendToolListResult {
  items: BackendTool[]
  categories: string[]
  total: number
}

/** 工具列表查询 */
export interface ListToolsParams {
  keyword?: string
  category?: string
}

export function listTools(params: ListToolsParams = {}) {
  const qs = new URLSearchParams()
  if (params.keyword) qs.set('keyword', params.keyword)
  if (params.category) qs.set('category', params.category)
  const q = qs.toString()
  return http.get<BackendToolListResult>(`/web/tools${q ? '?' + q : ''}`)
}

/** 工具详情(按 slug) */
export function getToolBySlug(slug: string) {
  return http.get<BackendTool>(`/web/tools/${encodeURIComponent(slug)}`)
}

/** 把后端的 tags 字符串拆成数组(空白/逗号分隔) */
export function splitTags(raw: string | undefined | null): string[] {
  if (!raw) return []
  return raw
    .split(/[,，\s]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}