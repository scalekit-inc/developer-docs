import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'igptmcp_ask',
    description: `Sends user question to backend and returns answer based on connected datasources which include documents and messages`,
    params: [
      { name: 'input', type: 'string', required: true, description: `User input question` },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Output format. Use "json" for a automatic generic object, or provide a JSON Schema to enforce a specific output structure ex:{"schema":{"type":"object"}}`,
      },
    ],
  },
  {
    name: 'igptmcp_search',
    description: `Search connected datasources which include documents and messages`,
    params: [
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Optional lower bound (inclusive) date for filtering results by their timestamp, date only (e.g. 2025-01-01). Only set this when the user explicitly specifies a concrete start date or range.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `Optional upper bound (inclusive) date for filtering results by their timestamp, date only (e.g. 2025-01-01). Only set this when the user explicitly specifies a concrete start date or range.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional search query. When provided, the tool performs a hybrid search (semantic + full-text). When omitted or empty, the tool returns results sorted in descending ordered by recency.`,
      },
    ],
  },
]
