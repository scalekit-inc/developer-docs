import type { TokenData } from '@/utils/auth/auth-cookies'

export const requestToken = async (tokenUrl: string, body: URLSearchParams) =>
  fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

/**
 * Parses a Response body as JSON and returns TokenData.
 * On JSON parse failure, throws a descriptive Error including HTTP status and body snippet.
 *
 * @param response - The Response object to parse
 * @returns Promise resolving to TokenData on successful JSON parse
 * @throws Error with status code and body snippet if JSON parsing fails
 */
export const parseTokenResponse = async (response: Response): Promise<TokenData> => {
  try {
    return (await response.json()) as TokenData
  } catch (jsonError) {
    // Read the raw response body for diagnostics
    const bodyText = await response.text()
    const bodySnippet = bodyText.length > 200 ? `${bodyText.slice(0, 200)}...` : bodyText

    throw new Error(
      `Failed to parse token response as JSON. Status: ${response.status}, Body: ${bodySnippet}`,
      { cause: jsonError },
    )
  }
}
