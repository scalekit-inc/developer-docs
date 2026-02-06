import type { APIContext } from 'astro'

export type TokenData = {
  access_token?: string
  id_token?: string
  refresh_token?: string
  expires_in?: number
  refresh_token_expires_in?: number
}

export const getSecureCookieFlag = () => !import.meta.env.DEV

export const getPkceCookieOptions = () => ({
  httpOnly: true,
  secure: getSecureCookieFlag(),
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 10, // 10 minutes
})

export const setPkceCookies = (context: APIContext, codeVerifier: string, state: string) => {
  const options = getPkceCookieOptions()
  context.cookies.set('sk_pkce_verifier', codeVerifier, options)
  context.cookies.set('sk_pkce_state', state, options)
}

export const setPostLoginRedirectCookie = (context: APIContext, redirectPath: string) => {
  const options = getPkceCookieOptions()
  context.cookies.set('sk_post_login_redirect', redirectPath, options)
}

export const getTokenMaxAges = (tokenData: TokenData) => {
  const maxAge = tokenData.expires_in ? Number(tokenData.expires_in) : 60 * 60
  const refreshMaxAge = tokenData.refresh_token_expires_in
    ? Number(tokenData.refresh_token_expires_in)
    : 30 * 24 * 60 * 60

  return { maxAge, refreshMaxAge }
}

export const setAuthCookies = (
  context: APIContext,
  tokenData: TokenData,
  secureCookie: boolean,
  maxAge: number,
  refreshMaxAge: number,
) => {
  if (tokenData.access_token) {
    context.cookies.set('sk_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
  }

  if (tokenData.id_token) {
    context.cookies.set('sk_id_token', tokenData.id_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
  }

  if (tokenData.refresh_token) {
    context.cookies.set('sk_refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: refreshMaxAge,
    })
  }
}

export const buildAuthCookieHeaders = (
  tokenData: TokenData,
  secureCookie: boolean,
  maxAge: number,
  refreshMaxAge: number,
) => {
  const cookieHeaders: string[] = []

  if (tokenData.access_token) {
    cookieHeaders.push(
      `sk_access_token=${tokenData.access_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    )
  }
  if (tokenData.id_token) {
    cookieHeaders.push(
      `sk_id_token=${tokenData.id_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Lax; Path=/; Max-Age=${maxAge}`,
    )
  }
  if (tokenData.refresh_token) {
    cookieHeaders.push(
      `sk_refresh_token=${tokenData.refresh_token}; HttpOnly; ${secureCookie ? 'Secure;' : ''} SameSite=Strict; Path=/auth/refresh; Max-Age=${refreshMaxAge}`,
    )
  }

  return cookieHeaders
}

export const buildPkceClearCookieHeaders = () => [
  'sk_pkce_verifier=; Path=/; Max-Age=0',
  'sk_pkce_state=; Path=/; Max-Age=0',
  'sk_post_login_redirect=; Path=/; Max-Age=0',
]

export const clearSessionCookies = (context: APIContext) => {
  context.cookies.delete('sk_access_token', { path: '/' })
  context.cookies.delete('sk_id_token', { path: '/' })
  context.cookies.delete('sk_refresh_token', { path: '/auth/refresh' })
}

export const clearAllAuthCookies = (context: APIContext) => {
  context.cookies.delete('sk_access_token', { path: '/' })
  context.cookies.delete('sk_id_token', { path: '/' })
  context.cookies.delete('sk_refresh_token', { path: '/' })
  context.cookies.delete('sk_pkce_verifier', { path: '/' })
  context.cookies.delete('sk_pkce_state', { path: '/' })
  context.cookies.delete('sk_post_login_redirect', { path: '/' })
}
