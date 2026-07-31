/**
 * 通用 HTTP 客户端：拦截器链 + Result 拆箱 + 错误归一化
 *
 * 拦截器模型：
 *  - RequestInterceptor  ：在 fetch 前修改 url/init（含 headers/body），返回新的 init；可返回 null 短路。
 *  - ResponseInterceptor ：拿到 { response, body, request }，可改 body 再返回；抛错即视为失败。
 *
 * 用法：
 *   const http = createHttpClient({ baseURL: '/api' })
 *   http.useRequestInterceptor((ctx) => { ctx.init.headers['X-Token'] = 'xxx'; return ctx.init })
 *   const data = await http.get<MyData>('/foo')
 */

import { ElMessage } from 'element-plus'

export interface HttpRequestContext {
  url: string
  init: RequestInit
  /** 原始的 init（不可变），用于拦截器读 body/headers 不可改需求 */
  readonly rawInit: Readonly<RequestInit>
}

export interface HttpResponseContext<T = unknown> {
  response: Response
  body: BackendResult<T> | null
  request: HttpRequestContext
}

export type RequestInterceptor = (
  ctx: HttpRequestContext,
) => RequestInit | void | null | Promise<RequestInit | void | null>

export type ResponseInterceptor<T = unknown> = (
  ctx: HttpResponseContext<T>,
) => unknown | Promise<unknown>

/** 后端统一返回结构（与 Spring Boot Result<T> 对齐） */
export interface BackendResult<T> {
  code: number
  message: string
  data: T | null
}

export interface CreateHttpClientOptions {
  /** 基础路径，如 '/api' */
  baseURL?: string
  /** 默认 headers，会被每次请求合并（请求级 headers 优先） */
  headers?: Record<string, string>
  /** HTTP 状态码非 2xx、Result.code !== 0 时，是否自动 ElMessage 提示，默认 true */
  showErrorMessage?: boolean
  /** 自定义错误提示，默认用 message → HTTP 状态码 */
  errorMessage?: (err: HttpError) => string
  /**
   * 自定义 Result 判定"成功"的方式，默认 code === 0。
   * 改成 (code) => code === 200 / 其它业务约定都可以。
   */
  isSuccess?: (body: BackendResult<unknown>) => boolean
}

export class HttpError extends Error {
  readonly status: number
  readonly code: number
  readonly body: BackendResult<unknown> | null

  constructor(
    message: string,
    opts: { status: number; code: number; body: BackendResult<unknown> | null },
  ) {
    super(message)
    this.name = 'HttpError'
    this.status = opts.status
    this.code = opts.code
    this.body = opts.body
  }
}

export interface HttpClient {
  request<T>(method: string, path: string, init?: RequestInit): Promise<T>
  get<T>(path: string, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T>
  post<T>(path: string, body?: unknown, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T>
  put<T>(path: string, body?: unknown, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T>
  del<T>(path: string, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T>
  useRequestInterceptor(fn: RequestInterceptor): () => void
  useResponseInterceptor<T = unknown>(fn: ResponseInterceptor<T>): () => void
  /** 同时给所有拦截器传"短路"信号——例如鉴权失败时跳登录 */
  abort(): void
}

export function createHttpClient(options: CreateHttpClientOptions = {}): HttpClient {
  const {
    baseURL = '',
    headers: defaultHeaders = {},
    showErrorMessage = true,
    errorMessage,
    isSuccess = (b) => b.code === 0,
  } = options

  const requestInterceptors: RequestInterceptor[] = []
  const responseInterceptors: ResponseInterceptor[] = []
  let aborted = false

  function joinUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path // 绝对 URL 直通
    if (!baseURL) return path
    if (path.startsWith('/')) return baseURL + path
    return baseURL + '/' + path
  }

  function mergeHeaders(init?: RequestInit): Record<string, string> {
    const out: Record<string, string> = { 'Content-Type': 'application/json;charset=UTF-8', ...defaultHeaders }
    if (init?.headers) {
      const h = init.headers
      if (h instanceof Headers) {
        h.forEach((v, k) => (out[k] = v))
      } else if (Array.isArray(h)) {
        h.forEach(([k, v]) => (out[k] = v))
      } else {
        Object.assign(out, h)
      }
    }
    return out
  }

  async function request<T>(method: string, path: string, init?: RequestInit): Promise<T> {
    if (aborted) throw new HttpError('请求已取消', { status: 0, code: -1, body: null })

    let url = joinUrl(path)
    let currentInit: RequestInit = { ...(init || {}), method }

    // 第一遍：先合并一次 headers，方便拦截器读
    currentInit.headers = mergeHeaders(currentInit)

    // 跑请求拦截器
    for (const interceptor of requestInterceptors) {
      const ctx: HttpRequestContext = { url, init: currentInit, rawInit: init || {} }
      const ret = await interceptor(ctx)
      if (ret === null) throw new HttpError('请求被拦截器短路', { status: 0, code: -1, body: null })
      if (ret) {
        // 拦截器返回了新的 init，重新合并 headers（防止拦截器没带 headers）
        currentInit = ret
        currentInit.headers = mergeHeaders(currentInit)
        url = ctx.url // 拦截器也可改 url（虽然 ctx.url 是 getter）
      }
    }

    let response: Response
    try {
      response = await fetch(url, currentInit)
    } catch (e) {
      const err = new HttpError(
        `网络错误：${e instanceof Error ? e.message : String(e)}`,
        { status: 0, code: -1, body: null },
      )
      if (showErrorMessage) ElMessage.error(err.message)
      throw err
    }

    // 解析 body（不一定成功）
    let body: BackendResult<T> | null = null
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      try {
        body = (await response.json()) as BackendResult<T>
      } catch {
        body = null
      }
    }

    const resCtx: HttpResponseContext<T> = {
      response,
      body,
      request: { url, init: currentInit, rawInit: init || {} },
    }

    // 跑响应拦截器
    for (const interceptor of responseInterceptors) {
      const out = await (interceptor as ResponseInterceptor)(resCtx)
      // 拦截器可以返回新的 body
      if (out !== undefined) {
        body = out as BackendResult<T>
        resCtx.body = body
      }
    }

    // 判定成功
    if (!response.ok) {
      const msg = errorMessage
        ? errorMessage(
            new HttpError(
              body?.message || `HTTP ${response.status}`,
              { status: response.status, code: body?.code ?? response.status, body: body as BackendResult<unknown> | null },
            ),
          )
        : body?.message || `HTTP ${response.status}`
      const err = new HttpError(msg, {
        status: response.status,
        code: body?.code ?? response.status,
        body: body as BackendResult<unknown> | null,
      })
      if (showErrorMessage) ElMessage.error(msg)
      throw err
    }

    if (!body || !isSuccess(body as BackendResult<unknown>)) {
      const msg = body?.message || '业务错误'
      const err = new HttpError(msg, {
        status: response.status,
        code: body?.code ?? 1,
        body: body as BackendResult<unknown> | null,
      })
      if (showErrorMessage) ElMessage.error(msg)
      throw err
    }

    return body.data as T
  }

  return {
    request,
    get: (path, init) => request('GET', path, init),
    post: (path, body, init) =>
      request('POST', path, { ...(init || {}), body: body !== undefined ? JSON.stringify(body) : undefined }),
    put: (path, body, init) =>
      request('PUT', path, { ...(init || {}), body: body !== undefined ? JSON.stringify(body) : undefined }),
    del: (path, init) => request('DELETE', path, init),
    useRequestInterceptor(fn) {
      requestInterceptors.push(fn)
      return () => {
        const i = requestInterceptors.indexOf(fn)
        if (i >= 0) requestInterceptors.splice(i, 1)
      }
    },
    useResponseInterceptor(fn) {
      responseInterceptors.push(fn as ResponseInterceptor)
      return () => {
        const i = responseInterceptors.indexOf(fn as ResponseInterceptor)
        if (i >= 0) responseInterceptors.splice(i, 1)
      }
    },
    abort() {
      aborted = true
    },
  }
}

/** 默认实例：所有业务模块直接用。baseURL 走 vite proxy /api */
export const http = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE ?? '/api',
})

/** 给以后接 token 鉴权用的占位（注释里说明用法即可，按需启用） */
/*
http.useRequestInterceptor((ctx) => {
  const token = localStorage.getItem('token')
  if (token) {
    ctx.init.headers = { ...ctx.init.headers, Authorization: `Bearer ${token}` }
  }
  return ctx.init
})
*/