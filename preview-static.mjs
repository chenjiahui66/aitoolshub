// 极简静态文件服务器，专门给 vite-ssg 生成的 dist 用
// 特点：纯 Node、无依赖；直接读文件返回；不重定向、不 fallback。
// 用法：node preview-static.mjs [port]
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'

const ROOT = join(process.cwd(), 'dist')
const PORT = Number(process.argv[2] || 4173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

async function tryFile(p) {
  try {
    const s = await stat(p)
    if (s.isFile()) return p
  } catch {}
  return null
}

const server = createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || '/').split('?')[0])
    let path = normalize(url).replace(/^([\\/])+/, '')
    if (path.endsWith('/')) path += 'index.html'

    let file = await tryFile(join(ROOT, path))

    // 直接访问 /tools/chatgpt 这种没有 .html 后缀的路径 → 找 chatgpt.html
    if (!file) {
      file = await tryFile(join(ROOT, path + '.html'))
    }

    // 目录尝试加 index.html
    if (!file) {
      file = await tryFile(join(ROOT, path, 'index.html'))
    }

    if (!file) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end('Not Found: ' + path)
      return
    }

    const body = await readFile(file)
    const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream'
    res.writeHead(200, {
      'content-type': type,
      'cache-control': 'no-cache',
    })
    res.end(body)
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('Server Error: ' + (err && err.message))
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[preview] serving ${ROOT}`)
  console.log(`[preview] http://127.0.0.1:${PORT}/`)
})