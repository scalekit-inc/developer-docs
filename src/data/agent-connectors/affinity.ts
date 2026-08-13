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
    name: 'affinity_create_organization',
    description: `Create a new organization/company record in Affinity. The connector could already search and get organizations but had no way to create one. Optionally link the new organization to existing persons immediately.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the organization to create.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `The organization's primary web domain.`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `List of Affinity person IDs to associate with this organization.`,
      },
    ],
  },
  {
    name: 'affinity_create_person',
    description: `Create a new person record in Affinity. The connector could already search and get persons but had no way to create one.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `Email addresses for the person. Pass an empty array if none are known.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `The person's first name.`,
      },
      { name: 'last_name', type: 'string', required: true, description: `The person's last name.` },
      {
        name: 'organization_ids',
        type: 'array',
        required: false,
        description: `List of Affinity organization IDs to associate with this person.`,
      },
    ],
  },
  {
    name: 'affinity_delete_opportunity',
    description: `Permanently delete a deal or opportunity from Affinity. Create/Get/List/Update already exist for opportunities (affinity_create_opportunity, affinity_get_opportunity, affinity_list_opportunities, affinity_update_opportunity) but Delete did not.`,
    params: [
      {
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the opportunity to delete.`,
      },
    ],
  },
  {
    name: 'affinity_delete_organization',
    description: `Permanently delete an organization from Affinity. This also removes it from any lists and detaches it from associated notes and opportunities.`,
    params: [
      {
        name: 'organization_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the organization to delete.`,
      },
    ],
  },
  {
    name: 'affinity_delete_person',
    description: `Permanently delete a person from Affinity. This also removes them from any lists and detaches them from associated notes and opportunities.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the person to delete.`,
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
    name: 'affinity_note_delete',
    description: `Permanently delete a note from Affinity.`,
    params: [
      {
        name: 'note_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the note to delete.`,
      },
    ],
  },
  {
    name: 'affinity_note_update',
    description: `Update the text content of an existing note in Affinity. affinity_create_note and affinity_list_notes exist but there was no way to edit a note afterward.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The new plain text content of the note, replacing the existing content.`,
      },
      {
        name: 'note_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the note to update.`,
      },
    ],
  },
  {
    name: 'affinity_remove_from_list',
    description: `Remove a person, organization, or opportunity from a list by deleting its list entry. affinity_add_to_list creates entries with no corresponding removal tool until now.`,
    params: [
      {
        name: 'list_entry_id',
        type: 'integer',
        required: true,
        description: `The ID of the list entry to remove.`,
      },
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `ID of the Affinity list the entry belongs to.`,
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
        name: 'opportunity_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the opportunity to update`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the opportunity`,
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
  {
    name: 'affinity_update_organization',
    description: `Update an existing organization's name, domain, or person associations in Affinity.`,
    params: [
      {
        name: 'organization_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the organization to update.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Updated primary web domain for the organization.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the organization.`,
      },
      {
        name: 'person_ids',
        type: 'array',
        required: false,
        description: `Updated list of Affinity person IDs associated with this organization. Replaces the full set of linked persons.`,
      },
    ],
  },
  {
    name: 'affinity_update_person',
    description: `Update an existing person's name, emails, or organization associations in Affinity.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `Unique numeric ID of the person to update.`,
      },
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `Updated list of email addresses for the person. Replaces the full set.`,
      },
      { name: 'first_name', type: 'string', required: false, description: `Updated first name.` },
      { name: 'last_name', type: 'string', required: false, description: `Updated last name.` },
      {
        name: 'organization_ids',
        type: 'array',
        required: false,
        description: `Updated list of Affinity organization IDs associated with this person. Replaces the full set.`,
      },
    ],
  },
  {
    name: 'affinity_v2_get_company',
    description: `Retrieves basic information for a single company using the V2 API. Pass field_ids or field_types to also receive field data.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'field_ids',
        type: 'array',
        required: false,
        description: `Specific field IDs to return field data for. Mutually exclusive with field_types.`,
      },
      {
        name: 'field_types',
        type: 'array',
        required: false,
        description: `Category of fields to return field data for. Mutually exclusive with field_ids.`,
      },
    ],
  },
  {
    name: 'affinity_v2_get_company_field_dropdown_options',
    description: `Returns the dropdown options for a specific dropdown or ranked-dropdown company field. Use the returned option IDs when writing dropdown field values.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the dropdown field.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_get_company_field_value',
    description: `Retrieves a single field's value on a company.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to retrieve.`,
      },
    ],
  },
  {
    name: 'affinity_v2_get_current_user',
    description: `Returns information about the authenticated user, their current organization, and the permissions granted to the API key in use. Useful for verifying authentication before making other V2 API calls.`,
    params: [],
  },
  {
    name: 'affinity_v2_get_person',
    description: `Retrieves basic information for a single person using the V2 API. Pass field_ids or field_types to also receive field data.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'field_ids',
        type: 'array',
        required: false,
        description: `Specific field IDs to return field data for. Mutually exclusive with field_types.`,
      },
      {
        name: 'field_types',
        type: 'array',
        required: false,
        description: `Category of fields to return field data for. Mutually exclusive with field_ids.`,
      },
    ],
  },
  {
    name: 'affinity_v2_get_person_field_dropdown_options',
    description: `Returns the dropdown options for a specific dropdown or ranked-dropdown person field. Use the returned option IDs when writing dropdown field values.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the dropdown field.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_get_person_field_value',
    description: `Retrieves a single field's value on a person.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to retrieve.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_companies',
    description: `Paginates through companies in your Affinity organization using the V2 API. Returns basic information; pass field_ids or field_types to also receive field data (omit both to skip field data entirely).`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'field_ids',
        type: 'array',
        required: false,
        description: `Specific field IDs to return field data for. Mutually exclusive with field_types.`,
      },
      {
        name: 'field_types',
        type: 'array',
        required: false,
        description: `Category of fields to return field data for. Mutually exclusive with field_ids.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter to specific company IDs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_company_field_values',
    description: `Paginates through field values on a single company. Enriched, global, and relationship-intelligence fields are included by default; use ids or types to filter. List fields are not returned here — use the list entry fields endpoints instead.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Field IDs to filter the returned field values to. Mutually exclusive with types.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `Field type categories to filter the returned field values to. Mutually exclusive with ids.`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_company_fields',
    description: `Returns metadata on non-list-specific company fields, including each field's ID and value type. Use the returned field IDs with the list/get company endpoints to request field data.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression restricting the results. See Affinity's filtering syntax docs for the fields and operators supported by this endpoint.`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_company_list_entries',
    description: `Paginates through the list entries (rows) for a given company across all lists it appears on, including list-specific field data and creation metadata.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_company_lists',
    description: `Paginates through all lists where the given company appears as an entry and that the caller has access to view.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_company_notes',
    description: `Returns notes for a given company, including directly attached notes, notes on meetings the company attended (for persons), and notes where the company is mentioned. Supports filtering via the filter parameter.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression restricting the results. See Affinity's filtering syntax docs for the fields and operators supported by this endpoint.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_company_relationships',
    description: `Returns the relationships for a given company, including an interaction score (0.0-1.0) measuring relationship strength based on emails, meetings, and other interactions. Useful for finding the best warm introduction path.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_list_entries',
    description: `Paginates through every entry (row) on a given list — a list's actual contents/pipeline view. The existing V2 tools only go the opposite direction (affinity_v2_list_company_list_entries / affinity_v2_list_person_list_entries list which lists a company/person appears on); there was no way to browse what's ON a list.`,
    params: [
      {
        name: 'list_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the list.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_person_field_values',
    description: `Paginates through field values on a single person. Enriched, global, and relationship-intelligence fields are included by default; use ids or types to filter. List fields are not returned here — use the list entry fields endpoints instead.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Field IDs to filter the returned field values to. Mutually exclusive with types.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
      {
        name: 'types',
        type: 'array',
        required: false,
        description: `Field type categories to filter the returned field values to. Mutually exclusive with ids.`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_person_fields',
    description: `Returns metadata on non-list-specific person fields, including each field's ID and value type. Use the returned field IDs with the list/get person endpoints to request field data.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression restricting the results. See Affinity's filtering syntax docs for the fields and operators supported by this endpoint.`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_person_list_entries',
    description: `Paginates through the list entries (rows) for a given person across all lists it appears on, including list-specific field data and creation metadata.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_person_lists',
    description: `Paginates through all lists where the given person appears as an entry and that the caller has access to view.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_person_notes',
    description: `Returns notes for a given person, including directly attached notes, notes on meetings the person attended (for persons), and notes where the person is mentioned. Supports filtering via the filter parameter.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression restricting the results. See Affinity's filtering syntax docs for the fields and operators supported by this endpoint.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_person_relationships',
    description: `Returns the relationships for a given person, including an interaction score (0.0-1.0) measuring relationship strength based on emails, meetings, and other interactions. Useful for finding the best warm introduction path.`,
    params: [
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_list_persons',
    description: `Paginates through persons in your Affinity organization using the V2 API. Returns basic information; pass field_ids or field_types to also receive field data (omit both to skip field data entirely).`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'field_ids',
        type: 'array',
        required: false,
        description: `Specific field IDs to return field data for. Mutually exclusive with field_types.`,
      },
      {
        name: 'field_types',
        type: 'array',
        required: false,
        description: `Category of fields to return field data for. Mutually exclusive with field_ids.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter to specific person IDs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'affinity_v2_search_companies',
    description: `Searches companies matching a combination of filters, sorts, and a search term. Omitting the request body is equivalent to listing all companies with default pagination. Requires the appropriate export permission.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'field_ids',
        type: 'array',
        required: false,
        description: `Specific field IDs to return field data for. Mutually exclusive with field_types.`,
      },
      {
        name: 'field_types',
        type: 'array',
        required: false,
        description: `Category of fields to return field data for. Mutually exclusive with field_ids.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `A logical group of filter conditions combined with AND/OR, optionally nested. Up to 50 items per group.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
      {
        name: 'search',
        type: 'object',
        required: false,
        description: `A single keyword or phrase to match against field values.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Up to 5 sort criteria, applied in order.`,
      },
      {
        name: 'total_count',
        type: 'boolean',
        required: false,
        description: `When true, includes the total matching count in the pagination response. Adds query cost; use only when needed.`,
      },
    ],
  },
  {
    name: 'affinity_v2_search_persons',
    description: `Searches persons matching a combination of filters, sorts, and a search term. Omitting the request body is equivalent to listing all persons with default pagination. Requires the appropriate export permission.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextUrl/cursor.`,
      },
      {
        name: 'field_ids',
        type: 'array',
        required: false,
        description: `Specific field IDs to return field data for. Mutually exclusive with field_types.`,
      },
      {
        name: 'field_types',
        type: 'array',
        required: false,
        description: `Category of fields to return field data for. Mutually exclusive with field_ids.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `A logical group of filter conditions combined with AND/OR, optionally nested. Up to 50 items per group.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 100).`,
      },
      {
        name: 'search',
        type: 'object',
        required: false,
        description: `A single keyword or phrase to match against field values.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Up to 5 sort criteria, applied in order.`,
      },
      {
        name: 'total_count',
        type: 'boolean',
        required: false,
        description: `When true, includes the total matching count in the pagination response. Adds query cost; use only when needed.`,
      },
    ],
  },
  {
    name: 'affinity_v2_update_company_field_value',
    description: `Updates a single field's value on a company. Only non-list fields can be written this way; use the list entry field endpoints for list-specific fields.`,
    params: [
      {
        name: 'company_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the company.`,
      },
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to update.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `The new value for the field. Shape depends on the field's value type (string, number, date, dropdown option ID, etc).`,
      },
    ],
  },
  {
    name: 'affinity_v2_update_person_field_value',
    description: `Updates a single field's value on a person. Only non-list fields can be written this way; use the list entry field endpoints for list-specific fields.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The ID of the field to update.`,
      },
      {
        name: 'person_id',
        type: 'integer',
        required: true,
        description: `The unique numeric ID of the person.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `The new value for the field. Shape depends on the field's value type (string, number, date, dropdown option ID, etc).`,
      },
    ],
  },
]
