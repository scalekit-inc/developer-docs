import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'context7mcp_query_docs',
    description: `Fetch up-to-date, version-specific documentation and code examples for a library using its Context7 ID. Returns relevant docs for the given query to help answer questions about a specific library, API, or framework.`,
    params: [
      { name: 'libraryId', type: 'string', required: true, description: `The Context7-compatible library ID (e.g. '/vercel/next.js', '/mongodb/docs')` },
      { name: 'query', type: 'string', required: true, description: `The user's question or task to retrieve relevant documentation for` },
      { name: 'schema_version', type: 'string', required: false, description: `Optional schema version to use for tool execution` },
      { name: 'tool_version', type: 'string', required: false, description: `Optional tool version to use for tool execution` },
    ],
  },
  {
    name: 'context7mcp_resolve_library_id',
    description: `Search for a library by name and resolve it to a Context7-compatible library ID. Use this before calling context7mcp_query_docs when you have a library name but not its Context7 ID.`,
    params: [
      { name: 'libraryName', type: 'string', required: true, description: `The name of the library or framework to search for (e.g. 'Next.js', 'React', 'MongoDB')` },
      { name: 'query', type: 'string', required: true, description: `The user's question or task to help rank library results by relevance` },
      { name: 'schema_version', type: 'string', required: false, description: `Optional schema version to use for tool execution` },
      { name: 'tool_version', type: 'string', required: false, description: `Optional tool version to use for tool execution` },
    ],
  },
]
