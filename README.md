# AIToolsHub - AI 工具导航站

一个用 Vue 3 + Vite 8 + Element Plus 构建的 AI 工具导航与教程站,主打 ChatGPT、Claude、Midjourney 等热门 AI 工具的收录、教程与行业洞察。

## 技术栈

- **框架**: Vue 3.5 + TypeScript
- **构建**: Vite 8 (含 vite-ssg 28 做 SSG 预渲染)
- **UI**: Element Plus 2.14
- **路由**: Vue Router 4
- **状态**: Pinia 4
- **Head / SEO**: @unhead/vue + 自建 SSR 注入器
- **样式**: SCSS (BEM 命名 + CSS 变量主题)

## 页面

| 路径 | 页面 | SEO 类型 |
|------|------|----------|
| `/` | 首页 (Hero / 特色 / 热门工具 / 最新文章 / CTA) | WebSite |
| `/tools` | AI 工具导航 (16+ 类目筛选 / 搜索 / 排序) | CollectionPage |
| `/tools/chatgpt` | ChatGPT 完整教程 (能力 / 步骤 / Prompt / FAQ) | HowTo / Article |
| `/tools/claude` | Claude 介绍 (能力 / 版本 / 场景 / 对比 / FAQ) | Article |
| `/apps` | AI 小工具 (字数统计 / JSON / Base64 / 密码 / 时间戳 / Markdown) | CollectionPage |
| `/blog` | AI 文章 (分类 / 搜索 / 订阅) | Blog |
| 404 | 页面未找到 | noindex |

## SEO

每页独立配置,SSR 阶段通过 `build/seo-injector.mjs` 注入完整 head 标签:

- `<title>` `<meta description/keywords/author/robots>`
- `<link rel="canonical">`
- Open Graph (`og:type/title/description/url/image/site_name/locale/article:*`)
- Twitter Card (`twitter:card/title/description/image`)
- JSON-LD 结构化数据 (WebSite / CollectionPage / HowTo / Article / Blog)
- 站点 `sitemap.xml` + `robots.txt`

## 项目结构

```
gwdemo2/
├── build/
│   └── seo-injector.mjs          # SSR 阶段 SEO meta 注入器
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── SiteHeader.vue        # 顶部导航
│   │   ├── SiteFooter.vue        # 底部
│   │   ├── ToolCard.vue          # AI 工具卡片
│   │   └── BlogCard.vue          # 文章卡片
│   ├── composables/
│   │   └── useSeo.ts             # 客户端动态 SEO
│   ├── data/
│   │   ├── tools.ts              # AI 工具数据
│   │   ├── apps.ts               # 小工具数据
│   │   ├── posts.ts              # 博客文章数据
│   │   ├── seo-shared.mjs        # 共享 SEO 配置 (SSR + 客户端)
│   │   └── seo.ts                # SEO TS 入口
│   ├── router/
│   │   └── index.ts              # 6 个页面路由
│   ├── styles/
│   │   ├── variables.scss        # 设计 token
│   │   └── index.scss            # 全局样式
│   ├── types/
│   │   └── seo.ts                # SeoConfig 类型
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ToolsView.vue
│   │   ├── ChatGPTView.vue
│   │   ├── ClaudeView.vue
│   │   ├── AppsView.vue
│   │   ├── BlogView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue
│   ├── env.d.ts
│   └── main.ts                   # vite-ssg 入口
├── index.html                    # 基础 HTML 模板
├── package.json
├── tsconfig.json
├── vite.config.ts                # 含 ssgOptions + element-plus CSS stub
└── README.md
```

## 命令

```bash
# 安装依赖
npm install

# 开发服务器 (http://localhost:5173)
npm run dev

# 类型检查 + 生产构建 (SSG, 6 页预渲染到 dist/)
npm run build

# 纯 SPA 模式构建 (不预渲染)
npm run build:spa

# 本地预览 dist/
npm run preview
```

## 部署

`npm run build` 后将 `dist/` 目录上传到任意静态服务器 (Nginx / Vercel / Netlify / OSS / CDN),所有路由都有真实的 HTML 页面,无需 Node.js 运行时。

### Nginx 配置示例

```nginx
server {
  listen 80;
  server_name gwdemo2.example.com;
  root /var/www/gwdemo2/dist;
  index index.html;

  # SPA fallback (用户访问 /tools/chatgpt 时,直接返回对应 html)
  location / {
    try_files $uri $uri/ $uri.html /index.html;
  }
}
```

## 特性

- 🎨 Element Plus + 自定义渐变主题
- 📱 完全响应式 (移动端汉堡菜单)
- 🔍 站内搜索 + 类目筛选 + 排序
- 💬 9 个即用 AI 小工具
- 📰 6 篇深度文章
- 🔎 每页独立 SEO 标签
- ⚡ Vite 8 + SSG 静态预渲染
- 🌐 客户端路由切换后 head 自动更新
