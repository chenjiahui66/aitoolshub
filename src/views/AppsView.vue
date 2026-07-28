<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useSeo } from '@/composables/useSeo'
import { apps } from '@/data/apps'

useSeo({
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
})

const wordText = ref('欢迎使用 AIToolsHub 在线 AI 小工具！Hello, world.')
const wordCount = () => {
  const text = wordText.value
  return {
    all: text.length,
    noSpace: text.replace(/\s/g, '').length,
    cn: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    en: (text.match(/[a-zA-Z]/g) || []).length,
  }
}

const jsonInput = ref('{"name":"AIToolsHub","url":"https://gwdemo2.example.com","tools":["ChatGPT","Claude","Midjourney"]}')
const jsonOutput = ref('')
const jsonError = ref('')
const formatJson = () => {
  try {
    const obj = JSON.parse(jsonInput.value)
    jsonOutput.value = JSON.stringify(obj, null, 2)
    jsonError.value = ''
  } catch (e) {
    jsonError.value = (e as Error).message
    jsonOutput.value = ''
  }
}
const minifyJson = () => {
  try {
    const obj = JSON.parse(jsonInput.value)
    jsonOutput.value = JSON.stringify(obj)
    jsonError.value = ''
  } catch (e) {
    jsonError.value = (e as Error).message
  }
}

const baseInput = ref('Hello, AIToolsHub!')
const base64Output = ref('')
const base64Input = ref('')
const base64Output2 = ref('')
const toBase64 = () => {
  try {
    base64Output.value = btoa(unescape(encodeURIComponent(baseInput.value)))
  } catch (e) {
    showError('编码失败: ' + (e as Error).message)
  }
}
const fromBase64 = () => {
  try {
    base64Output2.value = decodeURIComponent(escape(atob(base64Input.value)))
  } catch (e) {
    showError('解码失败: ' + (e as Error).message)
  }
}

const tsInput = ref('')
const tsDate = ref('')
const tsTimestamp = ref('')
const tsToDate = () => {
  const n = Number(tsInput.value)
  if (isNaN(n)) {
    showError('请输入有效的时间戳')
    return
  }
  tsDate.value = new Date(n).toLocaleString('zh-CN')
}
const dateToTs = () => {
  const d = new Date(tsTimestamp.value)
  if (isNaN(d.getTime())) {
    showError('请输入有效的日期时间')
    return
  }
  tsInput.value = d.getTime().toString()
}

const mdInput = ref('# 欢迎使用 AIToolsHub\n\n## AI 小工具\n\n- **加粗**\n- *斜体*\n- `代码`\n\n```js\nconsole.log("Hello AI")\n```\n\n> 这是一个引用块')
const mdHtml = ref('')
const renderMd = () => {
  let html = mdInput.value
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  html = html.replace(/\n/g, '<br>')
  mdHtml.value = html
}

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败，请手动复制')
  }
}

const pwdLen = ref(16)
const pwdOutput = ref('')
const generatePwd = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+'
  let s = ''
  for (let i = 0; i < pwdLen.value; i++) {
    s += chars[Math.floor(Math.random() * chars.length)]
  }
  pwdOutput.value = s
}

const showError = (msg: string) => {
  if (typeof window !== 'undefined') {
    ElMessage.error(msg)
  }
}

onMounted(() => {
  // 客户端首次挂载时初始化（避免 SSR 阶段触发 ElMessage 的 document 访问）
  tsInput.value = Date.now().toString()
  tsTimestamp.value = new Date().toLocaleString('zh-CN').replace(/\//g, '-')
  tsToDate()
  dateToTs()
  toBase64()
  formatJson()
  renderMd()
  generatePwd()
})
</script>

<template>
  <article class="page">
    <section class="page-hero">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>AI 小工具</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>AI 小工具</h1>
        <p class="lead">
          即开即用的在线 AI 小工具集合，免登录、客户端运行、保护隐私。持续更新中。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">所有工具</h2>
        <p class="section-subtitle">点击下方任一工具卡片即可使用</p>
        <div class="app-grid">
          <a v-for="a in apps" :key="a.id" :href="`#${a.id}`" class="app-card">
            <div class="emoji">{{ a.emoji }}</div>
            <div class="body">
              <h3>{{ a.name }}</h3>
              <p>{{ a.desc }}</p>
              <el-tag size="small" effect="plain">{{ a.tag }}</el-tag>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 字数统计 -->
    <section id="word-counter" class="section section-soft">
      <div class="container">
        <h2 class="section-title">📝 字数统计</h2>
        <p class="section-subtitle">实时统计中英文字数、字符数</p>
        <div class="tool-box">
          <el-input
            v-model="wordText"
            type="textarea"
            :rows="8"
            placeholder="输入或粘贴文本..."
            maxlength="5000"
            show-word-limit
          />
          <div class="stats">
            <div class="stat-card">
              <strong>{{ wordCount().all }}</strong>
              <span>总字符</span>
            </div>
            <div class="stat-card">
              <strong>{{ wordCount().noSpace }}</strong>
              <span>不含空格</span>
            </div>
            <div class="stat-card">
              <strong>{{ wordCount().cn }}</strong>
              <span>中文字数</span>
            </div>
            <div class="stat-card">
              <strong>{{ wordCount().en }}</strong>
              <span>英文字数</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- JSON 格式化 -->
    <section id="json-formatter" class="section">
      <div class="container">
        <h2 class="section-title">🧩 JSON 格式化</h2>
        <p class="section-subtitle">格式化、压缩、校验 JSON 数据</p>
        <div class="tool-box">
          <el-input
            v-model="jsonInput"
            type="textarea"
            :rows="6"
            placeholder="输入 JSON..."
          />
          <div class="actions">
            <el-button type="primary" @click="formatJson">格式化</el-button>
            <el-button @click="minifyJson">压缩</el-button>
            <el-button @click="copy(jsonOutput)">复制结果</el-button>
          </div>
          <el-alert v-if="jsonError" type="error" :title="jsonError" show-icon :closable="false" />
          <pre v-if="jsonOutput" class="output">{{ jsonOutput }}</pre>
        </div>
      </div>
    </section>

    <!-- Base64 -->
    <section id="base64" class="section section-soft">
      <div class="container">
        <h2 class="section-title">🔐 Base64 编解码</h2>
        <p class="section-subtitle">文本 Base64 双向转换</p>
        <div class="grid-2">
          <div class="tool-box">
            <label>原文</label>
            <el-input v-model="baseInput" type="textarea" :rows="4" />
            <el-button type="primary" @click="toBase64">编码 →</el-button>
            <pre class="output">{{ base64Output }}</pre>
          </div>
          <div class="tool-box">
            <label>Base64</label>
            <el-input v-model="base64Input" type="textarea" :rows="4" />
            <el-button type="primary" @click="fromBase64">← 解码</el-button>
            <pre class="output">{{ base64Output2 }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 密码生成 -->
    <section id="password" class="section">
      <div class="container">
        <h2 class="section-title">🔑 强密码生成</h2>
        <p class="section-subtitle">一键生成高强度随机密码</p>
        <div class="tool-box">
          <div class="pwd-row">
            <span>长度：{{ pwdLen }}</span>
            <el-slider v-model="pwdLen" :min="6" :max="64" :step="1" style="flex:1; margin: 0 16px;" />
            <el-button type="primary" @click="generatePwd">重新生成</el-button>
          </div>
          <div class="pwd-output" @click="copy(pwdOutput)">
            {{ pwdOutput }}
            <el-icon class="copy-icon"><CopyDocument /></el-icon>
          </div>
          <p class="hint">点击密码即可复制</p>
        </div>
      </div>
    </section>

    <!-- 时间戳 -->
    <section id="timestamp" class="section section-soft">
      <div class="container">
        <h2 class="section-title">⏱️ 时间戳转换</h2>
        <p class="section-subtitle">Unix 时间戳与日期互转</p>
        <div class="grid-2">
          <div class="tool-box">
            <label>时间戳 → 日期</label>
            <el-input v-model="tsInput" placeholder="毫秒时间戳" />
            <el-button type="primary" @click="tsToDate">转换 →</el-button>
            <pre class="output">{{ tsDate }}</pre>
          </div>
          <div class="tool-box">
            <label>日期 → 时间戳</label>
            <el-input
              v-model="tsTimestamp"
              placeholder="2026-07-27 18:00:00"
            />
            <el-button type="primary" @click="dateToTs">转换 →</el-button>
            <pre class="output">{{ tsInput }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Markdown -->
    <section id="markdown" class="section">
      <div class="container">
        <h2 class="section-title">📄 Markdown 预览</h2>
        <p class="section-subtitle">实时预览 Markdown 渲染效果</p>
        <div class="grid-2">
          <div class="tool-box">
            <label>Markdown 源码</label>
            <el-input
              v-model="mdInput"
              type="textarea"
              :rows="12"
              @input="renderMd"
            />
          </div>
          <div class="tool-box">
            <label>预览</label>
            <div class="md-preview" v-html="mdHtml"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 敬请期待 -->
    <section class="section">
      <div class="container">
        <div class="coming">
          <h2>更多工具开发中</h2>
          <p>图片压缩、AI 配色助手、二维码生成等小工具持续上线中，欢迎反馈需求。</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.page-hero {
  background: var(--site-gradient-soft);
  padding: 48px 0 40px;
  h1 {
    font-size: 36px;
    margin: 16px 0 12px;
  }
  .lead {
    color: var(--site-text-secondary);
    font-size: 16px;
    max-width: 720px;
    margin: 0;
  }
}
.section-soft {
  background: var(--site-bg-soft);
}
.app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.app-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  text-decoration: none;
  color: inherit;
  transition: all 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--site-shadow-lg);
    border-color: var(--site-primary-light);
  }
  .emoji {
    font-size: 32px;
    flex-shrink: 0;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 6px;
  }
  p {
    margin: 0 0 10px;
    font-size: 13px;
    color: var(--site-text-secondary);
    line-height: 1.5;
  }
}
.tool-box {
  background: #fff;
  border: 1px solid var(--site-border);
  border-radius: var(--site-radius);
  padding: 24px;
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--site-text-secondary);
    margin-bottom: 8px;
  }
  .actions {
    display: flex;
    gap: 8px;
    margin: 16px 0;
  }
  .output {
    background: #0f172a;
    color: #e2e8f0;
    padding: 16px;
    border-radius: 8px;
    font-size: 13px;
    line-height: 1.6;
    overflow-x: auto;
    margin: 12px 0 0;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 20px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
.stat-card {
  background: var(--site-bg-soft);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  strong {
    display: block;
    font-size: 28px;
    color: var(--site-primary);
    font-weight: 700;
  }
  span {
    font-size: 13px;
    color: var(--site-text-muted);
  }
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.pwd-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--site-text-secondary);
}
.pwd-output {
  background: #0f172a;
  color: #10b981;
  padding: 24px;
  border-radius: 10px;
  font-size: 22px;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
  position: relative;
  word-break: break-all;
  &:hover {
    background: #1e293b;
  }
  .copy-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #94a3b8;
  }
}
.hint {
  text-align: center;
  font-size: 12px;
  color: var(--site-text-muted);
  margin: 8px 0 0;
}
.md-preview {
  background: var(--site-bg-soft);
  padding: 20px;
  border-radius: 10px;
  min-height: 280px;
  border: 1px solid var(--site-border);
  :deep(h1) {
    font-size: 24px;
    margin-bottom: 12px;
  }
  :deep(h2) {
    font-size: 20px;
    margin: 16px 0 8px;
  }
  :deep(h3) {
    font-size: 16px;
    margin: 12px 0 8px;
  }
  :deep(p) {
    margin: 8px 0;
  }
  :deep(ul) {
    padding-left: 24px;
  }
  :deep(code) {
    background: #0f172a;
    color: #f59e0b;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }
  :deep(pre) {
    background: #0f172a;
    color: #e2e8f0;
    padding: 12px;
    border-radius: 8px;
    overflow-x: auto;
    code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
  }
  :deep(blockquote) {
    border-left: 4px solid var(--site-primary);
    padding-left: 12px;
    color: var(--site-text-secondary);
    margin: 12px 0;
  }
}
.coming {
  text-align: center;
  padding: 48px 24px;
  background: var(--site-bg-soft);
  border: 1px dashed var(--site-border);
  border-radius: var(--site-radius);
  h2 {
    font-size: 22px;
    margin-bottom: 8px;
  }
  p {
    color: var(--site-text-secondary);
    margin: 0;
  }
}
</style>
