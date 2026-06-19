import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'candidmcp_current_date',
    description: `Get today's date for use in time-sensitive queries and data requests.`,
    params: [
    ],
  },
  {
    name: 'candidmcp_identify_locations',
    description: `Detect and resolve geographic names in text to Geonames IDs for use in organization search filters.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'candidmcp_identify_mentioned_organizations',
    description: `Resolve nonprofit names mentioned in text to Candid profile URLs.`,
    params: [
      { name: 'organizations', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'candidmcp_knowledge_resources',
    description: `Search Candid's knowledge base for articles, blog posts, research reports, and training content about the social and philanthropic sector.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'sources', type: 'array', required: true, description: `No description.` },
      { name: 'news_days_ago', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'candidmcp_search_organizations',
    description: `Search Candid's database for nonprofits and grantmaking organizations by name, mission, location, or type of work.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'geonameids_of_geographies_served', type: 'string', required: false, description: `No description.` },
      { name: 'geonameids_of_organization_location', type: 'string', required: false, description: `No description.` },
      { name: 'leader_demographics', type: 'string', required: false, description: `No description.` },
      { name: 'located_admin1', type: 'string', required: false, description: `No description.` },
      { name: 'located_postal_code', type: 'string', required: false, description: `No description.` },
      { name: 'org_seal_status', type: 'string', required: false, description: `No description.` },
      { name: 'populations_served_codes', type: 'string', required: false, description: `No description.` },
      { name: 'subject_codes', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'candidmcp_taxonomy_terms',
    description: `Classify text using Candid's Philanthropy Classification System (PCS) taxonomy to get subject and population codes.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `No description.` },
    ],
  },
]
