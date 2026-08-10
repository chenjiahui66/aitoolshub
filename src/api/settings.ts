/**
 * 站点设置 API。底层走 src/api/http.ts 的统一 HTTP 客户端。
 */
import { http } from './http'

export interface FriendLink {
  name: string
  url: string
  desc?: string
}

export interface BackendSettings {
  siteName: string
  siteDesc: string
  logo: string
  icp: string
  seoTitle: string
  seoKeywords: string
  seoDescription: string
  friends: FriendLink[]
}

export function getSettings() {
  return http.get<BackendSettings>('/web/settings')
}