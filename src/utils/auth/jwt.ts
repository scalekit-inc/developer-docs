import { createRemoteJWKSet, decodeJwt, jwtVerify } from 'jose'

/**
 * Configuration for JWT verification
 */
interface JwtConfig {
  /** Maximum number of cached JWKS entries */
  maxCacheEntries: number
  /** Time-to-live for cached entries in milliseconds */
  cacheTtl: number
  /** Set of trusted issuer URLs (normalized, without trailing slashes) */
  trustedIssuers: Set<string>
  /** Set of expected audience values */
  expectedAudiences: Set<string>
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: JwtConfig = {
  maxCacheEntries: 10,
  cacheTtl: 60 * 60 * 1000, // 1 hour
  trustedIssuers: new Set(),
  expectedAudiences: new Set(),
}

/**
 * Get JWT verification configuration from environment variables
 */
function getJwtConfig(): JwtConfig {
  const config: JwtConfig = {
    maxCacheEntries:
      Number(import.meta.env.JWT_CACHE_MAX_ENTRIES) || DEFAULT_CONFIG.maxCacheEntries,
    cacheTtl: Number(import.meta.env.JWT_CACHE_TTL_MS) || DEFAULT_CONFIG.cacheTtl,
    trustedIssuers: new Set(),
    expectedAudiences: new Set(),
  }

  // Parse trusted issuers from environment variable (comma-separated)
  const trustedIssuersEnv = import.meta.env.JWT_TRUSTED_ISSUERS
  if (trustedIssuersEnv) {
    trustedIssuersEnv.split(',').forEach((issuer: string) => {
      const normalized = issuer.trim().replace(/\/$/, '')
      if (normalized) {
        config.trustedIssuers.add(normalized)
      }
    })
  }

  // Parse expected audiences from environment variable (comma-separated)
  const expectedAudiencesEnv = import.meta.env.JWT_EXPECTED_AUDIENCES
  if (expectedAudiencesEnv) {
    expectedAudiencesEnv.split(',').forEach((audience: string) => {
      const trimmed = audience.trim()
      if (trimmed) {
        config.expectedAudiences.add(trimmed)
      }
    })
  }

  return config
}

const jwtConfig = getJwtConfig()

/**
 * Cache entry with timestamp for TTL tracking
 */
interface CacheEntry {
  jwks: ReturnType<typeof createRemoteJWKSet>
  timestamp: number
}

/**
 * Bounded LRU cache with TTL for JWKS entries
 */
class JwksCache {
  private cache = new Map<string, CacheEntry>()
  private readonly maxSize: number
  private readonly ttl: number

  constructor(maxSize: number, ttl: number) {
    this.maxSize = maxSize
    this.ttl = ttl
  }

  /**
   * Get JWKS for an issuer, or create if not cached
   */
  getOrCreate(
    issuer: string,
    createFn: () => ReturnType<typeof createRemoteJWKSet>,
  ): ReturnType<typeof createRemoteJWKSet> {
    const normalizedIssuer = issuer.replace(/\/$/, '')
    const now = Date.now()

    // Check if entry exists and is not stale
    const entry = this.cache.get(normalizedIssuer)
    if (entry && now - entry.timestamp < this.ttl) {
      // Move to end (most recently used)
      this.cache.delete(normalizedIssuer)
      this.cache.set(normalizedIssuer, entry)
      return entry.jwks
    }

    // Remove stale entry if present
    if (entry) {
      this.cache.delete(normalizedIssuer)
    }

    // Evict oldest entries if at capacity
    while (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      } else {
        break
      }
    }

    // Create new entry
    const jwks = createFn()
    this.cache.set(normalizedIssuer, { jwks, timestamp: now })
    return jwks
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
  }
}

// Bounded JWKS cache with TTL
const jwksCache = new JwksCache(jwtConfig.maxCacheEntries, jwtConfig.cacheTtl)

function getJwks(issuer: string) {
  const jwksUrl = `${issuer}/keys`
  return jwksCache.getOrCreate(issuer, () => {
    return createRemoteJWKSet(new URL(jwksUrl))
  })
}

/**
 * Validates issuer against trusted allowlist (optional).
 * If no trusted issuers are configured, trusts the token's issuer.
 */
function validateIssuer(issuer: string): void {
  const normalizedIssuer = issuer.replace(/\/$/, '')

  // If no trusted issuers configured, skip validation (trust the token's issuer)
  if (jwtConfig.trustedIssuers.size === 0) {
    return
  }

  if (!jwtConfig.trustedIssuers.has(normalizedIssuer)) {
    throw new Error(`JWT issuer "${normalizedIssuer}" is not in the trusted issuers list`)
  }
}

/**
 * Validates audience against expected values
 */
function validateAudience(audience: string | string[] | undefined): void {
  if (!audience) {
    throw new Error('JWT missing "aud" claim')
  }

  if (jwtConfig.expectedAudiences.size === 0) {
    // If no expected audiences configured, skip validation
    // This allows backward compatibility but is less secure
    return
  }

  const audiences = Array.isArray(audience) ? audience : [audience]
  const hasValidAudience = audiences.some((aud) => jwtConfig.expectedAudiences.has(aud))

  if (!hasValidAudience) {
    throw new Error(
      `JWT audience "${Array.isArray(audience) ? audience.join(', ') : audience}" does not match any expected audience`,
    )
  }
}

/**
 * Verifies a JWT using the issuer's JWKS endpoint.
 *
 * Security: Validates issuer against trusted allowlist and audience against expected values
 * before fetching JWKS keys to prevent attacker-controlled issuer attacks.
 *
 * @param jwt - Raw JWT string from the cookie.
 * @returns Verified payload + header.
 * @throws if verification fails, token is malformed, or issuer/audience validation fails.
 */
export async function verifyJwt(jwt: string) {
  // First decode without verification to get issuer and audience
  const decoded = decodeJwt(jwt)
  const issuer = decoded.iss as string | undefined
  const audience = decoded.aud as string | string[] | undefined

  if (!issuer) {
    throw new Error('JWT missing "iss" claim')
  }

  // Security: Validate issuer against trusted allowlist BEFORE fetching JWKS
  // This prevents attacker-controlled issuer from determining where keys are fetched
  validateIssuer(issuer)

  // Security: Validate audience against expected values BEFORE proceeding
  validateAudience(audience)

  // Only fetch JWKS after issuer validation passes
  const jwks = getJwks(issuer)

  const { payload, protectedHeader } = await jwtVerify(jwt, jwks, {
    issuer,
    audience,
  })

  return { payload, protectedHeader }
}
