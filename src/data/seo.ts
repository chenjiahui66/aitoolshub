// 重导出 seo-shared.mjs 中的常量，方便 TypeScript 端导入。
// seo-shared.mjs 是纯 ESM、不依赖 Vite 注入的环境变量，可在 vite-ssg 的
// onBeforePageRender hook 中被 Node 直接 import。
// @ts-expect-error .mjs 没有类型声明
import * as shared from './seo-shared.mjs'

export const SITE_URL: string = shared.SITE_URL
export const SITE_NAME: string = shared.SITE_NAME
export const DEFAULT_IMAGE: string = shared.DEFAULT_IMAGE
export const DEFAULT_AUTHOR: string = shared.DEFAULT_AUTHOR
