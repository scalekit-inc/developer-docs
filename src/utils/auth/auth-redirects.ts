export const getSafeRedirectPath = (requestUrl: URL, redirectTarget: string | null) => {
  if (!redirectTarget) return null

  try {
    const redirectUrl = new URL(redirectTarget, requestUrl.origin)
    if (redirectUrl.origin === requestUrl.origin && redirectUrl.pathname.startsWith('/')) {
      return redirectUrl.pathname
    }
  } catch {
    return null
  }

  return null
}

export const normalizePostLoginRedirect = (redirectPath: string | null | undefined) => {
  let postLoginRedirect = redirectPath ?? '/'

  if (postLoginRedirect && !postLoginRedirect.startsWith('/')) {
    postLoginRedirect = '/'
  }

  const pathnameOnly = postLoginRedirect.split('?')[0].split('#')[0]
  let cleanRedirect = pathnameOnly || '/'

  if (!cleanRedirect.startsWith('/')) {
    cleanRedirect = '/'
  }

  return cleanRedirect
}

export const toAbsoluteRedirectUrl = (origin: string, redirectPath: string) =>
  new URL(redirectPath, origin).toString()
