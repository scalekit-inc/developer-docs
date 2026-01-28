import { createRemoteJWKSet, jwtVerify } from 'jose'

const issuer = import.meta.env.SCALEKIT_ISSUER ?? ''
const audience = import.meta.env.SCALEKIT_AUDIENCE ?? ''
const jwksUrl =
  import.meta.env.SCALEKIT_JWKS_URL ?? (issuer ? `${issuer.replace(/\/$/, '')}/keys` : '')

const jwks = jwksUrl ? createRemoteJWKSet(new URL(jwksUrl)) : null

/**
 * Verifies a JWT using Scalekit's JWKS endpoint.
 *
 * @param jwt - Raw JWT string from the cookie.
 * @returns Verified payload + header, or null if verification is not configured.
 * @throws if verification fails.
 */
export async function verifyJwt(jwt: string) {
  if (!jwks || !issuer || !audience) {
    return null
  }

  const { payload, protectedHeader } = await jwtVerify(jwt, jwks, {
    issuer,
    audience,
  })

  return { payload, protectedHeader }
}
