import type { RegistryTool } from '@scalekit/agentkit'
import { searchAlgolia } from '../lib/search-algolia.js'

export const searchDocsTool: RegistryTool = {
  definition: {
    name: 'search_docs',
    description:
      'Search Scalekit documentation to answer questions. ' +
      'Always call this tool before answering any question about Scalekit products ' +
      '(FSA, SSO, SCIM, Agent Auth, MCP, M2M, SDK). ' +
      'Returns relevant snippets with source URLs.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The user question to search for in the docs',
        },
      },
      required: ['query'],
    },
  },
  execute: async (args) => {
    const { query } = args as { query: string }
    const snippets = await searchAlgolia(query)

    if (snippets.length === 0) {
      return 'No relevant documentation found for this query.'
    }

    return snippets.map((s) => `## ${s.title}\nURL: ${s.url}\n${s.snippet}`).join('\n\n---\n\n')
  },
  requiresConfirmation: false,
}
