import { createRemoteJWKSet, jwtVerify } from 'jose'

const issuer = import.meta.env.SCALEKIT_ISSUER ?? ''
const audience = import.meta.env.SCALEKIT_AUDIENCE ?? ''
const jwksUrl =
  import.meta.env.SCALEKIT_JWKS_URL ?? (issuer ? `${issuer.replace(/\/$/, '')}/keys` : '')

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null

try {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'src/utils/auth/jwt.ts:12',
      message: 'jwt module init',
      data: { hasIssuer: Boolean(issuer), hasAudience: Boolean(audience), jwksUrl },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'pre-fix',
      hypothesisId: 'H2',
    }),
  }).catch(() => {})
  // #endregion agent log
  if (jwksUrl) {
    jwks = createRemoteJWKSet(new URL(jwksUrl))
  }
} catch (error) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'src/utils/auth/jwt.ts:20',
      message: 'jwks init error',
      data: { name: error?.name, message: error?.message },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'pre-fix',
      hypothesisId: 'H2',
    }),
  }).catch(() => {})
  // #endregion agent log
  throw error
}

/**
 * Verifies a JWT using Scalekit's JWKS endpoint.
 *
 * @param jwt - Raw JWT string from the cookie.
 * @returns Verified payload + header, or null if verification is not configured.
 * @throws if verification fails.
 */
export async function verifyJwt(jwt: string) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'src/utils/auth/jwt.ts:29',
      message: 'verifyJwt called',
      data: { hasJwt: Boolean(jwt), hasJwks: Boolean(jwks) },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'pre-fix',
      hypothesisId: 'H3',
    }),
  }).catch(() => {})
  // #endregion agent log
  if (!jwks || !issuer || !audience) {
    return null
  }

  const { payload, protectedHeader } = await jwtVerify(jwt, jwks, {
    issuer,
    audience,
  })

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/18f42a52-d518-4397-98e5-b904bddd7feb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location: 'src/utils/auth/jwt.ts:41',
      message: 'verifyJwt success',
      data: { hasPayload: Boolean(payload), hasHeader: Boolean(protectedHeader) },
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'pre-fix',
      hypothesisId: 'H3',
    }),
  }).catch(() => {})
  // #endregion agent log
  return { payload, protectedHeader }
}
