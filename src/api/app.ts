/**
 * 小工具相关 API。底层走 src/api/http.ts 的统一 HTTP 客户端。
 */
import { http } from './http'

/** 后端 AppItem 实体 */
export interface BackendApp {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  path: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
}

/** 小工具列表(只展示 online) */
export function listApps() {
  return http.get<BackendApp[]>('/web/apps')
}