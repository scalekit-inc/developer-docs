import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'deepgrammcp_search_deepgram_knowledge_sources',
    description: `Search Deepgram documentation and knowledge sources for the most relevant results for a given query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `A single, well-formed natural-language query to search Deepgram knowledge sources. Must be a complete sentence.`,
      },
    ],
  },
]
