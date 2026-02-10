export const getAuthorizeUrl = () =>
  import.meta.env.SCALEKIT_AUTHORIZE_URL ?? 'https://auth.scalekit.com/oauth/authorize'

export const getTokenUrl = () =>
  import.meta.env.SCALEKIT_TOKEN_URL ?? 'https://auth.scalekit.com/oauth/token'

export const getUserinfoUrl = () => import.meta.env.SCALEKIT_USERINFO_URL ?? ''

export const getClientId = () => {
  const clientId = import.meta.env.SCALEKIT_CLIENT_ID
  if (!clientId || clientId.trim() === '') {
    throw new Error('Missing SCALEKIT_CLIENT_ID environment variable')
  }
  return clientId
}

export const getRedirectUri = (requestUrl: URL) =>
  import.meta.env.SCALEKIT_REDIRECT_URI ?? new URL('/auth/callback', requestUrl).toString()

export const getScopes = () =>
  import.meta.env.SCALEKIT_SCOPES ?? 'openid email profile offline_access'

export const getScalekitBaseUrl = () => {
  const authorizeUrl = import.meta.env.SCALEKIT_AUTHORIZE_URL
  return authorizeUrl ? new URL(authorizeUrl).origin : 'https://auth.scalekit.com'
}
