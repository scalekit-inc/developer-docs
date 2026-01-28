type AuthSession = {
  authenticated: boolean
  user?: Record<string, unknown> | null
  idTokenClaims?: Record<string, unknown> | null
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
    const response = await fetch('/auth/session', { credentials: 'include' })
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
