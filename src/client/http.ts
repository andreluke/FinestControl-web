import { env } from '@/env/env'

async function getBody<T>(c: Response | Request): Promise<T> {
  const contentType = c.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return c.json()
  }

  return c.text() as Promise<T>
}

async function getHeaders(headers?: HeadersInit): Promise<HeadersInit> {
  // Adicione aqui a lógica para recuperar o token de cookies/localStorage

  // const token = localStorage.getItem('token');
  // if (token) {
  //   return { ...headers, Authorization: `Bearer ${token}` };
  // }

  return headers ?? {}
}

function getUrl(contextUrl: string): string {
  const url = new URL(contextUrl, 'http://localhost:3333')
  const pathname = url.pathname
  const search = url.search

  const baseUrl =
    env.NODE_ENV === 'production'
      ? env.NEXT_PUBLIC_API_URL_PROD
      : env.NEXT_PUBLIC_API_URL_DEV || 'http://localhost:3333'

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`)

  return requestUrl.toString()
}

export async function http<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const requestHeaders = await getHeaders(options.headers)
  const url = getUrl(path)

  const request = new Request(url, {
    ...options,
    headers: requestHeaders,
  })

  const response = await fetch(request)

  if (!response.ok) {
    const errorBody = await response.text()
    const errorData = errorBody
      ? JSON.parse(errorBody)
      : { message: 'Erro desconhecido' }

    throw new Error(errorData.message || `Erro HTTP ${response.status}`)
  }

  const data = await getBody<T>(response)
  return data
}
