/** Pinned Scalar standalone bundle. Bump the version here only. */
export const SCALAR_API_REFERENCE_CDN = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.67.0'

/** Path prefixes for the three API reference pages. */
export const API_REFERENCE_PATH_PREFIXES = ['/apis', '/agentkit/apis', '/saaskit/apis']

/**
 * Splash/home hides secondary nav with CSS. API hrefs stay in the DOM but are
 * not visible nav, so do not prefetch Scalar there.
 */
export const SCALAR_PREFETCH_EXCLUDED_PATHS = ['/']

/** Normalize href or pathname to a trailing-slash-free path (`/` for home). */
export function normalizeDocsPath(hrefOrPath) {
  let path = hrefOrPath || ''
  try {
    path = new URL(hrefOrPath, 'https://docs.scalekit.com').pathname
  } catch {
    path = String(hrefOrPath).split('#')[0].split('?')[0]
  }
  return path.replace(/\/+$/, '') || '/'
}

/** True when href or pathname is one of the API reference pages. */
export function pathnameIsApiReference(hrefOrPath) {
  const normalized = normalizeDocsPath(hrefOrPath)
  return API_REFERENCE_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  )
}

/**
 * True when this page should prefetch the Scalar API-reference script.
 * Home is excluded even if hidden product/portal hrefs point at /apis.
 */
export function shouldPrefetchScalarCdn(pathname, hrefs = []) {
  if (SCALAR_PREFETCH_EXCLUDED_PATHS.includes(normalizeDocsPath(pathname))) {
    return false
  }
  return hrefs.some(pathnameIsApiReference)
}
