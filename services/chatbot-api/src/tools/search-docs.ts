import { tool } from 'ai'
import { z } from 'zod'
import { searchAlgolia } from '../lib/search-algolia.js'

export const searchDocsTool = tool({
  description:
    'Search Scalekit documentation to answer questions. ' +
    'Always call this tool before answering any question about Scalekit products ' +
    '(FSA, SSO, SCIM, Agent Auth, MCP, M2M, SDK). ' +
    'Returns relevant snippets with source URLs.',
  parameters: z.object({
    query: z.string().describe('The user question to search for in the docs'),
  }),
  execute: async ({ query }) => {
    const snippets = await searchAlgolia(query)
    if (snippets.length === 0) return 'No relevant documentation found for this query.'
    return snippets.map((s) => `## ${s.title}\nURL: ${s.url}\n${s.snippet}`).join('\n\n---\n\n')
  },
})
