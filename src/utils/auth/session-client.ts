type AuthSession = {
  authenticated: boolean
  user?: Record<string, unknown> | null
  idTokenClaims?: Record<string, unknown> | null
  idToken?: string | null
  uid?: string | null // User ID (sub claim)
  xoid?: string | null // Workspace ID
  expiresAt?: number | null
}

const STORAGE_KEY = 'sk_auth_session'

const readCache = (): AuthSession | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

const writeCache = (session: AuthSession) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

const clearCache = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
}

const isExpired = (expiresAt?: number | null) => {
  if (!expiresAt) return false
  return Date.now() >= expiresAt
}

export const getSession = async (): Promise<AuthSession> => {
  const cached = readCache()
  if (cached?.authenticated && !isExpired(cached.expiresAt)) {
    return cached
  }

  clearCache()

  try {
    let response = await fetch('/auth/session', { credentials: 'include' })

    // If access token is expired (401), try to refresh
    if (response.status === 401) {
      const refreshResponse = await fetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (refreshResponse.ok) {
        // Refresh succeeded - retry session fetch
        response = await fetch('/auth/session', { credentials: 'include' })
      } else {
        // Refresh failed - user needs to re-login
        clearCache()
        return { authenticated: false }
      }
    }

    if (!response.ok) {
      clearCache()
      return { authenticated: false }
    }

    const data = (await response.json()) as AuthSession
    if (data?.authenticated) {
      writeCache(data)
    } else {
      clearCache()
    }
    return data
  } catch {
    clearCache()
    return { authenticated: false }
  }
}

export const clearSessionCache = () => {
  clearCache()
}
