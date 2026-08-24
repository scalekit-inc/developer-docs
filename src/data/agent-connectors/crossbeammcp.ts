import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'crossbeammcp_find_overlap_partners',
    description: `Identify which partners have a given account in their data, revealing who can help with a specific company.`,
    params: [
      {
        name: 'account',
        type: 'string',
        required: true,
        description: `The account to check for partner overlaps, specified as a company name, domain, or CRM record ID.`,
      },
    ],
  },
  {
    name: 'crossbeammcp_find_overlaps',
    description: `Pull a list of accounts you share with one or more partners. Supports filtering by partner, population, segment, and partner score.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of overlapping accounts to return.`,
      },
      {
        name: 'min_partner_score',
        type: 'number',
        required: false,
        description: `Minimum partner score required for an overlap to be included.`,
      },
      {
        name: 'partners',
        type: 'array',
        required: false,
        description: `Partner organization names to find shared accounts (overlaps) with. Omit to include all partners.`,
      },
      {
        name: 'population',
        type: 'string',
        required: false,
        description: `Population to filter overlaps by, such as customers, prospects, or open opportunities.`,
      },
      {
        name: 'segment',
        type: 'string',
        required: false,
        description: `Segment to filter overlaps by.`,
      },
    ],
  },
  {
    name: 'crossbeammcp_find_partner_recommendations',
    description: `Return ranked partner suggestions for an open opportunity, helping identify which partners can best assist with a deal.`,
    params: [
      {
        name: 'opportunity',
        type: 'string',
        required: true,
        description: `The open opportunity to get partner recommendations for, specified as an opportunity name or CRM opportunity ID.`,
      },
      {
        name: 'account',
        type: 'string',
        required: false,
        description: `The account associated with the opportunity, specified as a company name, domain, or CRM record ID.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of recommended partners to return.`,
      },
    ],
  },
  {
    name: 'crossbeammcp_get_account_context',
    description: `Retrieve a unified view of an account, including details and owner information. Look up by domain, CRM record ID, or company name.`,
    params: [
      {
        name: 'account',
        type: 'string',
        required: true,
        description: `The account to look up, specified as a company name, domain, or CRM record ID.`,
      },
    ],
  },
  {
    name: 'crossbeammcp_get_ecosystem_activity',
    description: `Surface recent partner activity across your ecosystem, such as new overlaps, updates, and engagement signals.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of activity items to return.`,
      },
      {
        name: 'partner',
        type: 'string',
        required: false,
        description: `Limit activity to a specific partner organization. Omit to include activity across all partners.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Only include activity on or after this date (ISO 8601 format, e.g. 2026-01-01).`,
      },
    ],
  },
  {
    name: 'crossbeammcp_get_list_link',
    description: `Generate a shareable Crossbeam list link from a plain-language description of the accounts or overlaps you want to share.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Plain-language description of the list to generate, such as the accounts, partners, or overlaps to include.`,
      },
    ],
  },
  {
    name: 'crossbeammcp_get_partner_context',
    description: `Provide an overview of a partner relationship, including scores and recent activity. Filter by partner name, tag, or region.`,
    params: [
      {
        name: 'partner',
        type: 'string',
        required: false,
        description: `The partner organization name to retrieve context for.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `Filter partners by region.`,
      },
      { name: 'tag', type: 'string', required: false, description: `Filter partners by tag.` },
    ],
  },
  {
    name: 'crossbeammcp_get_partner_suggestions',
    description: `Surface potential new partners based on ecosystem fit, helping expand your partner network.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of suggested partners to return.`,
      },
    ],
  },
  {
    name: 'crossbeammcp_search_crossbeam_knowledge',
    description: `Answer Crossbeam product questions and surface best practices from the Crossbeam knowledge base.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The product question or topic to search the Crossbeam knowledge base for.`,
      },
    ],
  },
]
