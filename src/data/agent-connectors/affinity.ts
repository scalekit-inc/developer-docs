import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'affinity_add_to_list',
    description: `Add a person or organization to an Affinity list by creating a new list entry. Use this to add a founder to a deal pipeline, add a company to a watchlist, or track a new contact in a relationship list. Provide either entity_id for persons/organizations.`,
    params: [
      {
        name: 'entity_id',
        type: 'integer',
        required: true,
        description: `ID of the person or organization to add to the list`,
      },
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `ID of the Affinity list to add the entity to`,
      },
    ],
  },
  {
    name: 'affinity_create_note',
    description: `Create a note on a person, organization, or opportunity in Affinity. Notes support plain text content and can be attached to multiple entity types simultaneously. Use this to log meeting summaries, due diligence findings, or relationship context directly on a CRM record.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Plain text content of the note`,
      },
      {
        name: 'opportunity_ids',
        type: 'array',
        required: false,
        description: `List of opportunity IDs to attach this note to`,
      },
      {
        name: 'organization_ids',
        type: 'array',
        required: false,
        description: `List of organization IDs to attach this note to`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `List of person IDs to attach this note to`,
      },
    ],
  },
  {
    name: 'affinity_create_opportunity',
    description: `Create a new deal or opportunity record in Affinity and add it to a pipeline list. Supports associating persons and organizations, setting the deal name, and assigning an owner. Ideal for logging inbound deals or sourcing new investment targets.`,
    params: [
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `ID of the Affinity list to add this opportunity to`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the opportunity or deal`,
      },
      {
        name: 'organization_ids',
        type: 'array',
        required: false,
        description: `List of Affinity organization IDs to associate with this opportunity`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `List of Affinity person IDs to associate with this opportunity`,
      },
    ],
  },
  {
    name: 'affinity_get_opportunity',
    description: `Retrieve full details of a deal or opportunity in Affinity including current stage, owner, associated persons and organizations, custom field values, and list membership. Use this before updating a deal or generating a deal memo.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the opportunity to retrieve`,
      },
    ],
  },
  {
    name: 'affinity_get_organization',
    description: `Retrieve an organization's full profile from Affinity including domain, team member connections, associated people, deal history, and interaction metadata. Use this for deep company diligence or to understand team relationships before an investment.`,
    params: [
      {
        name: 'organization_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the organization to retrieve`,
      },
      {
        name: 'with_interaction_dates',
        type: 'boolean',
        required: false,
        description: `Include first and last interaction dates in the response`,
      },
    ],
  },
  {
    name: 'affinity_get_person',
    description: `Retrieve a person's full profile from Affinity including contact information, email addresses, phone numbers, organization memberships, interaction history, and relationship score. Use this to deeply evaluate a contact before a meeting or investment decision.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the person to retrieve`,
      },
      {
        name: 'with_interaction_dates',
        type: 'boolean',
        required: false,
        description: `Include first and last interaction dates in the response`,
      },
    ],
  },
  {
    name: 'affinity_get_relationship_strength',
    description: `Retrieve relationship strength scores between your team members and an external contact (person) in Affinity. Scores reflect email and meeting interaction frequency and recency. Use this to identify the best warm introduction path to a founder, LP, or co-investor.`,
    params: [
      {
        name: 'external_id',
        type: 'integer',
        required: true,
        description: `Affinity person ID of the external contact to evaluate relationship strength against`,
      },
      {
        name: 'internal_id',
        type: 'integer',
        required: false,
        description: `Affinity person ID of the internal team member (optional — omit to get scores for all team members)`,
      },
    ],
  },
  {
    name: 'affinity_list_lists',
    description: `Retrieve all Affinity lists available in the workspace, including people lists, organization lists, and opportunity/deal pipeline lists. Returns list IDs, names, types, and owner information. Use this to discover list IDs before adding entries or filtering opportunities.`,
    params: [],
  },
  {
    name: 'affinity_list_notes',
    description: `Retrieve notes associated with a specific person, organization, or opportunity in Affinity. Returns paginated note records including content, creator, and creation timestamp. Use this to review interaction history, meeting summaries, or due diligence logs on a CRM entity.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'integer',
        required: false,
        description: `Filter notes by opportunity ID`,
      },
      {
        name: 'organization_id',
        type: 'integer',
        required: false,
        description: `Filter notes by organization ID`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (max 500)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous response to fetch the next page`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: false,
        description: `Filter notes by person ID`,
      },
    ],
  },
  {
    name: 'affinity_list_opportunities',
    description: `List pipeline opportunities in Affinity with optional filters by list ID, owner, or stage. Returns paginated deal records including stage, value, associated people and organizations, and custom field values. Designed for deal flow monitoring and portfolio tracking.`,
    params: [
      {
        name: 'list_id',
        type: 'integer',
        required: false,
        description: `Filter opportunities belonging to a specific Affinity list ID`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (max 500)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous response to fetch the next page`,
      },
    ],
  },
  {
    name: 'affinity_search_organizations',
    description: `Search for companies and organizations in the Affinity network by name or domain. Returns a paginated list of matching organization records including team connections, domain info, and interaction metadata. Useful for deal sourcing and company diligence lookups.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (max 500)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous response to fetch the next page`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Search term to filter organizations by name or domain`,
      },
      {
        name: 'with_interaction_dates',
        type: 'boolean',
        required: false,
        description: `Include first and last interaction dates in the response`,
      },
    ],
  },
  {
    name: 'affinity_search_persons',
    description: `Search for people in the Affinity network by name, email, or relationship strength. Returns a paginated list of matching person records including contact information and relationship metadata. Ideal for finding contacts before creating notes or evaluating deal connections.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (max 500)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous response to fetch the next page`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Search term to filter persons by name or email address`,
      },
      {
        name: 'with_interaction_dates',
        type: 'boolean',
        required: false,
        description: `Include first and last interaction dates in the response`,
      },
    ],
  },
  {
    name: 'affinity_update_opportunity',
    description: `Update an existing deal or opportunity in Affinity. Supports renaming the deal, adding or removing associated persons and organizations. Use this to reflect changes in deal status, team assignment, or company involvement during a pipeline review.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the opportunity`,
      },
      {
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the opportunity to update`,
      },
      {
        name: 'organization_ids',
        type: 'array',
        required: false,
        description: `Updated list of Affinity organization IDs associated with this opportunity`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `Updated list of Affinity person IDs associated with this opportunity`,
      },
    ],
  },
]
