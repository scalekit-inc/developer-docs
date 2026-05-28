import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'biorendermcp_search-icons',
    description: `Search BioRender's scientific icon library by keyword. Returns icon names, asset types, and placeability status for use in figures.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'page', type: 'number', required: false, description: `No description.` },
      { name: 'perPage', type: 'number', required: false, description: `No description.` },
    ],
  },
  {
    name: 'biorendermcp_search-templates',
    description: `Search BioRender's scientific figure template library. Returns templates with titles, descriptions, and preview links.`,
    params: [
      { name: 'analytics', type: 'object', required: true, description: `No description.` },
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'page', type: 'number', required: false, description: `No description.` },
      { name: 'perPage', type: 'number', required: false, description: `No description.` },
    ],
  },
]
