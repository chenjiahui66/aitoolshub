// 纯 ESM 模块，不依赖 import.meta.env，可在 vite-ssg 的 onBeforePageRender hook 中加载。
export const SITE_URL = 'https://gwdemo2.example.com'
export const SITE_NAME = 'AIToolsHub'
export const DEFAULT_IMAGE = `${SITE_URL}/og-cover.png`
export const DEFAULT_AUTHOR = 'AIToolsHub 编辑部'

export const seoMap = {
  home: {
    title: 'AI 工具导航站 - 发现最好用的 AI 工具',
    description:
      'AIToolsHub 是专业的 AI 工具导航站,收录 ChatGPT、Claude、Midjourney 等数百款热门 AI 工具,提供 AI 工具教程、AI 小工具与 AI 行业文章,助你高效上手 AI。',
    keywords:
      'AI工具,AI工具导航,ChatGPT教程,Claude介绍,AI小工具,AI文章,AIGC,人工智能,ChatGPT,Claude,Midjourney,AI绘画,AI写作',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: '专业的 AI 工具导航站,收录数百款热门 AI 工具与教程。',
      inLanguage: 'zh-CN',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/tools?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  },
  tools: {
    title: 'AI 工具导航 - 收录数百款热门 AI 工具',
    description:
      'AIToolsHub AI 工具导航页,收录 ChatGPT、Claude、Midjourney、Sora、Cursor 等 16+ 类目、数百款热门 AI 工具,按类目筛选、按热度排序,助你快速找到合适的 AI 工具。',
    keywords:
      'AI工具导航,AI工具大全,ChatGPT,Claude,Midjourney,Sora,Cursor,AI绘画工具,AI编程工具,AI视频工具,AI写作工具,AI搜索,AI语音,AI音乐,AI设计,开源模型',
    path: '/tools',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI 工具导航',
      description: '收录数百款热门 AI 工具的导航页。',
    },
  },
  'tools-chatgpt': {
    title: 'ChatGPT 完整使用教程 - 注册、登录、Prompt 与高阶玩法',
    description:
      'ChatGPT 是什么？怎么注册、登录、使用？本文提供 ChatGPT 从入门到精通的完整教程，包括账号注册、模型选择（GPT-4o、GPT-4.1、o1、o3）、Prompt 工程、API 调用、GPTs 应用与 50+ 实战模板。',
    keywords:
      'ChatGPT,ChatGPT教程,ChatGPT注册,ChatGPT登录,ChatGPT使用,ChatGPT Plus,ChatGPT 4,ChatGPT 4o,ChatGPT o1,ChatGPT o3,OpenAI,GPT-4,GPT-4o,Prompt,Prompt工程,ChatGPT API,ChatGPT技巧',
    path: '/tools/chatgpt',
    type: 'article',
    author: 'AIToolsHub 编辑部',
    publishedTime: '2026-07-20T00:00:00+08:00',
    image: `${SITE_URL}/og-chatgpt.png`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'ChatGPT 完整使用教程',
      description: '从注册、登录到 Prompt 工程与高阶玩法的 ChatGPT 全流程指南。',
      step: [
        { '@type': 'HowToStep', name: '注册 ChatGPT 账号', text: '访问 chat.openai.com 并使用邮箱完成注册与手机验证。' },
        { '@type': 'HowToStep', name: '选择模型', text: '免费用户可使用 GPT-4o mini，Plus 用户可使用 GPT-4o、o1、o3 等。' },
        { '@type': 'HowToStep', name: '掌握 Prompt', text: '使用角色、示例、格式与约束四要素撰写高质量提示词。' },
        { '@type': 'HowToStep', name: '创建 GPTs', text: '无需代码即可定制专属 AI 助手。' },
        { '@type': 'HowToStep', name: '调用 API', text: '通过 OpenAI API 将 ChatGPT 集成到自己的应用。' },
      ],
    },
  },
  'tools-claude': {
    title: 'Claude 介绍 - Anthropic 出品的 AI 助手能力详解',
    description:
      'Claude 是由 Anthropic 推出的 AI 助手，以 Claude 4 Sonnet、Claude 4 Opus 为代表，主打长上下文（200K tokens）、代码能力、工具调用（Artifacts、Computer Use）与安全可控。本文详解 Claude 的能力、注册、订阅与最佳实践。',
    keywords:
      'Claude,Claude介绍,Claude教程,Claude 4,Claude Sonnet,Claude Opus,Anthropic,Claude注册,Claude Pro,Claude API,Artifacts,Computer Use,长上下文,AI助手,Claude vs ChatGPT',
    path: '/tools/claude',
    type: 'article',
    author: 'AIToolsHub 编辑部',
    publishedTime: '2026-07-18T00:00:00+08:00',
    image: `${SITE_URL}/og-claude.png`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Claude 介绍 - Anthropic 出品的 AI 助手能力详解',
      author: { '@type': 'Organization', name: 'AIToolsHub 编辑部' },
      datePublished: '2026-07-18',
      publisher: { '@type': 'Organization', name: 'AIToolsHub 编辑部' },
    },
  },
  apps: {
    title: 'AI 小工具 - 即开即用的在线工具集合',
    description:
      'AIToolsHub 在线 AI 小工具集合，包括字数统计、JSON 格式化、Base64 编解码、AI 配色、Markdown 编辑器、二维码生成、密码生成、时间戳转换、图片压缩等。免登录、客户端运行、保护隐私。',
    keywords:
      'AI小工具,在线工具,字数统计,JSON格式化,Base64,配色工具,Markdown编辑器,二维码生成,密码生成,时间戳转换,图片压缩,免费工具',
    path: '/apps',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'AI 小工具',
      description: '即开即用的在线 AI 小工具集合。',
    },
  },
  blog: {
    title: 'AI 文章 - 深度教程、行业洞察与实战技巧',
    description:
      'AIToolsHub AI 文章专栏,提供 ChatGPT、Claude、Midjourney、Sora 等主流 AI 工具的深度教程,Prompt 工程技巧,AI 行业动态与趋势分析。',
    keywords:
      'AI文章,AI教程,AI博客,ChatGPT教程,Claude教程,Prompt工程,AI行业,AI趋势,AI工具评测,AI对比,深度文章',
    path: '/blog',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'AIToolsHub 博客',
      description: 'AI 行业的深度教程与趋势分析。',
    },
  },
  'not-found': {
    title: '404 - 页面未找到',
    description: '抱歉,你访问的页面不存在或已被移除。',
    path: '/404',
    noindex: true,
  },
}

export function getSeoByPath(path) {
  if (path === '/' || path === '') return seoMap.home
  if (path === '/tools' || path === '/tools/') return seoMap.tools
  if (path.startsWith('/tools/chatgpt')) return seoMap['tools-chatgpt']
  if (path.startsWith('/tools/claude')) return seoMap['tools-claude']
  if (path.startsWith('/apps')) return seoMap.apps
  if (path.startsWith('/blog')) return seoMap.blog
  return seoMap['not-found']
}
