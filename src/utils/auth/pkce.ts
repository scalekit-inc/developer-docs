/**
 * Generates PKCE values using Web Crypto.
 *
 * This follows RFC 7636 recommendations for high-entropy verifiers.
 */
const btoaShim =
  typeof btoa === 'function'
    ? btoa
    : (input: string) => Buffer.from(input, 'binary').toString('base64')

function base64UrlEncode(bytes: Uint8Array): string {
  let str = btoaShim(String.fromCharCode(...bytes))
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

async function sha256(input: Uint8Array): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', input as BufferSource)
  return new Uint8Array(digest)
}

function randomBytes(length = 32): Uint8Array {
  const arr = new Uint8Array(length)
  crypto.getRandomValues(arr)
  return arr
}

function genCodeVerifier(): string {
  // 43–128 chars; RFC7636 recommends high entropy
  return base64UrlEncode(randomBytes(64))
}

async function genCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier)
  const hash = await sha256(data)
  return base64UrlEncode(hash)
}

function genRandomString(len = 32): string {
  return base64UrlEncode(randomBytes(len))
}

export { genCodeChallenge, genCodeVerifier, genRandomString }
