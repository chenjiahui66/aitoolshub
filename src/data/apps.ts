export interface AppItem {
  id: string
  name: string
  desc: string
  emoji: string
  tag: string
  hot?: boolean
}

export const apps: AppItem[] = [
  {
    id: 'word-counter',
    name: '字数统计',
    desc: '实时统计中英文字数、字符数与阅读时长。',
    emoji: '📝',
    tag: '写作',
    hot: true,
  },
  {
    id: 'json-formatter',
    name: 'JSON 格式化',
    desc: '在线格式化、压缩、校验 JSON 数据。',
    emoji: '🧩',
    tag: '开发',
    hot: true,
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    desc: '文本 / 图片 Base64 互转，复制即用。',
    emoji: '🔐',
    tag: '开发',
  },
  {
    id: 'color-picker',
    name: 'AI 配色助手',
    desc: '输入关键词，生成可访问性达标的配色方案。',
    emoji: '🎨',
    tag: '设计',
    hot: true,
  },
  {
    id: 'markdown',
    name: 'Markdown 编辑器',
    desc: '在线 Markdown，所见即所得，支持导出。',
    emoji: '📄',
    tag: '写作',
  },
  {
    id: 'qrcode',
    name: '二维码生成',
    desc: '文本 / 链接一键生成高清二维码。',
    emoji: '📱',
    tag: '工具',
  },
  {
    id: 'password',
    name: '强密码生成',
    desc: '一键生成高强度随机密码，安全可靠。',
    emoji: '🔑',
    tag: '安全',
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    desc: 'Unix 时间戳与日期互，支持毫秒。',
    emoji: '⏱️',
    tag: '开发',
  },
  {
    id: 'image-compress',
    name: '图片压缩',
    desc: '客户端本地压缩，保护隐私不传服务器。',
    emoji: '🖼️',
    tag: '设计',
    hot: true,
  },
]
