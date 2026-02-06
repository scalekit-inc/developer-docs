import type { TokenData } from '@/utils/auth/auth-cookies'

export const requestToken = async (tokenUrl: string, body: URLSearchParams) =>
  fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

export const parseTokenResponse = async (response: Response): Promise<TokenData> =>
  (await response.json()) as TokenData
