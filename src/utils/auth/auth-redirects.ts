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

  // Security: Block protocol-relative URLs (//evil.com) and empty strings
  // Protocol-relative URLs can bypass origin checks by using the current page's protocol
  if (postLoginRedirect === '' || postLoginRedirect.startsWith('//')) {
    postLoginRedirect = '/'
  }

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
