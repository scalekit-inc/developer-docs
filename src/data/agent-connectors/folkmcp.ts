import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'folkmcp_folk_create_company',
    description: `Create a new company record in the Folk CRM workspace with native and custom field values.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Company name.` },
      { name: 'customFields', type: 'object', required: false, description: `Custom field values keyed by field name.` },
      { name: 'domain', type: 'string', required: false, description: `Company domain (e.g. acme.com).` },
    ],
  },
  {
    name: 'folkmcp_folk_create_object',
    description: `Create a new custom object record in a Folk CRM group with specified field values.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Object name or title.` },
      { name: 'objectType', type: 'string', required: true, description: `The type of custom object to create.` },
      { name: 'customFields', type: 'object', required: false, description: `Custom field values keyed by field name.` },
    ],
  },
  {
    name: 'folkmcp_folk_create_person',
    description: `Create a new person (contact) record in the Folk CRM workspace with native and custom field values.`,
    params: [
      { name: 'customFields', type: 'object', required: false, description: `Custom field values keyed by field name.` },
      { name: 'email', type: 'string', required: false, description: `Person's email address.` },
      { name: 'firstName', type: 'string', required: false, description: `Person's first name.` },
      { name: 'lastName', type: 'string', required: false, description: `Person's last name.` },
    ],
  },
  {
    name: 'folkmcp_folk_get_company',
    description: `Retrieve a single company record from Folk CRM by its ID, including all native and custom fields.`,
    params: [
      { name: 'companyId', type: 'string', required: true, description: `The ID of the company to retrieve.` },
    ],
  },
  {
    name: 'folkmcp_folk_get_current_user',
    description: `Returns the identity of the authenticated folk user for this MCP session: their id, email, and fullName.`,
    params: [
    ],
  },
  {
    name: 'folkmcp_folk_get_object',
    description: `Retrieve a single custom object record from Folk CRM by its ID, including all native and custom fields.`,
    params: [
      { name: 'groupId', type: 'string', required: true, description: `The group ID the object belongs to.` },
      { name: 'objectId', type: 'string', required: true, description: `The ID of the object to retrieve.` },
      { name: 'objectType', type: 'string', required: true, description: `The object type.` },
    ],
  },
  {
    name: 'folkmcp_folk_get_person',
    description: `Retrieve a single person (contact) record from Folk CRM by its ID, including all native and custom fields.`,
    params: [
      { name: 'personId', type: 'string', required: true, description: `The ID of the person to retrieve.` },
    ],
  },
  {
    name: 'folkmcp_folk_get_workspace_structure',
    description: `Retrieves the complete structure of the folk workspace: groups, entity types per group, native fields, custom field definitions, pipeline views, and workspace members.`,
    params: [
    ],
  },
  {
    name: 'folkmcp_folk_search_companies',
    description: `Search for companies in the Folk CRM workspace by name, domain, or custom field values.`,
    params: [
      { name: 'filter', type: 'object', required: true, description: `Filter criteria. Use field names as keys with operator objects as values. Example: {"name": {"contains": "Acme"}}` },
    ],
  },
  {
    name: 'folkmcp_folk_search_objects',
    description: `Search for custom objects in the Folk CRM workspace by name or custom field values within a specific group.`,
    params: [
      { name: 'filter', type: 'object', required: true, description: `Filter criteria keyed by field name with operator objects.` },
      { name: 'groupId', type: 'string', required: true, description: `The group ID to search within.` },
      { name: 'objectType', type: 'string', required: true, description: `The object type to search for.` },
    ],
  },
  {
    name: 'folkmcp_folk_search_people',
    description: `Search for people (contacts) in the Folk CRM workspace by name, email, or custom field values.`,
    params: [
      { name: 'filter', type: 'object', required: true, description: `Filter criteria. Use field names as keys with operator objects as values. Example: {"name": {"contains": "Jane"}}` },
    ],
  },
  {
    name: 'folkmcp_folk_update_company',
    description: `Update an existing company record in Folk CRM with new native or custom field values.`,
    params: [
      { name: 'companyId', type: 'string', required: true, description: `The ID of the company to update.` },
      { name: 'customFields', type: 'object', required: false, description: `Custom field values to update, keyed by field name.` },
      { name: 'domain', type: 'string', required: false, description: `Updated company domain.` },
      { name: 'name', type: 'string', required: false, description: `Updated company name.` },
    ],
  },
  {
    name: 'folkmcp_folk_update_object',
    description: `Update an existing custom object record in Folk CRM with new field values.`,
    params: [
      { name: 'objectId', type: 'string', required: true, description: `The ID of the object to update.` },
      { name: 'objectType', type: 'string', required: true, description: `The type of custom object to update.` },
      { name: 'customFields', type: 'object', required: false, description: `Custom field values to update, keyed by field name.` },
      { name: 'name', type: 'string', required: false, description: `Updated object name or title.` },
    ],
  },
  {
    name: 'folkmcp_folk_update_person',
    description: `Update an existing person (contact) record in Folk CRM with new native or custom field values.`,
    params: [
      { name: 'personId', type: 'string', required: true, description: `The ID of the person to update.` },
      { name: 'customFields', type: 'object', required: false, description: `Custom field values to update, keyed by field name.` },
      { name: 'email', type: 'string', required: false, description: `Updated email address.` },
      { name: 'firstName', type: 'string', required: false, description: `Updated first name.` },
      { name: 'lastName', type: 'string', required: false, description: `Updated last name.` },
    ],
  },
]
