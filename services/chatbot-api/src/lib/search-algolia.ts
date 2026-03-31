const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID ?? '7554BDRAJD'
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY ?? 'b2fecf525a556f05d46ef2389ad7e4b6'
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX ?? 'scalekit-starlight-crawler'

interface AlgoliaHit {
  objectID: string
  url: string
  hierarchy: {
    lvl0?: string
    lvl1?: string
    lvl2?: string
    lvl3?: string
  }
  content?: string
}

interface AlgoliaResponse {
  hits: AlgoliaHit[]
}

export interface DocSnippet {
  title: string
  url: string
  snippet: string
}

export async function searchAlgolia(query: string, hitsPerPage = 6): Promise<DocSnippet[]> {
  const url = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/query`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Algolia-API-Key': ALGOLIA_API_KEY,
      'X-Algolia-Application-Id': ALGOLIA_APP_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      hitsPerPage,
      attributesToRetrieve: ['url', 'hierarchy', 'content'],
      attributesToHighlight: [],
    }),
  })

  if (!res.ok) {
    throw new Error(`Algolia search failed: ${res.status}`)
  }

  const data = (await res.json()) as AlgoliaResponse

  return data.hits.map((hit) => ({
    title: hit.hierarchy.lvl2 ?? hit.hierarchy.lvl1 ?? hit.hierarchy.lvl0 ?? 'Scalekit Docs',
    url: hit.url,
    snippet: hit.content ?? '',
  }))
}
