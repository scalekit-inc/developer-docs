/** Pinned Scalar standalone bundle. Bump the version here only. */
export const SCALAR_API_REFERENCE_CDN = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.67.0'

/** Path prefixes for the three API reference pages. */
export const API_REFERENCE_PATH_PREFIXES = ['/apis', '/agentkit/apis', '/saaskit/apis']

/** True when href or pathname is one of the API reference pages. */
export function pathnameIsApiReference(hrefOrPath) {
  let path = hrefOrPath || ''
  try {
    path = new URL(hrefOrPath, 'https://docs.scalekit.com').pathname
  } catch {
    path = String(hrefOrPath).split('#')[0].split('?')[0]
  }
  const normalized = path.replace(/\/+$/, '') || '/'
  return API_REFERENCE_PATH_PREFIXES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  )
}
