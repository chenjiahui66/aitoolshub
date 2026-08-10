/**
 * 前端共用类型（从早期 data/tools.ts、data/posts.ts 提出来，删掉静态数据后保留形状）。
 */

export interface Tool {
  id: string
  name: string
  category: string
  desc: string
  url: string
  tags: string[]
  hot?: boolean
  free?: boolean
  logoColor: string
  initial: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  cover: string
  content: string
  tags: string[]
}