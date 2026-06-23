import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'examcp_web_fetch_exa',
    description: `Read one or more webpages and return their full content as clean markdown. Use when you have specific URLs to read, or to get full content after a web search returns insufficient highlights. Supports batching multiple URLs in a single call.`,
    params: [
      { name: 'urls', type: 'array', required: true, description: `One or more URLs to fetch. Batch multiple URLs in a single call.` },
      { name: 'maxCharacters', type: 'number', required: false, description: `Maximum characters to extract per page (default: 3000).` },
    ],
  },
  {
    name: 'examcp_web_search_exa',
    description: `Search the web and get clean, ready-to-use content. Best for current information, news, facts, people, and companies. Describe the ideal page rather than using keywords (e.g. 'blog post comparing React and Vue performance'). Use category:people or category:company to search LinkedIn profiles or companies.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Natural language description of the ideal page. Optionally include category:people or category:company to focus results.` },
      { name: 'numResults', type: 'number', required: false, description: `Number of search results to return (default: 10).` },
    ],
  },
]
