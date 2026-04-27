import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlecontacts_contacts_list',
    description:
      "List all contacts in the authenticated user's Google Contacts account with optional filtering and pagination.",
    params: [
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description:
          'Comma-separated fields to return (e.g. names,emailAddresses,phoneNumbers,organizations)',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of contacts to return (default 100, max 1000)',
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: 'Token for fetching the next page of results',
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: 'Sort order: LAST_MODIFIED_ASCENDING or LAST_MODIFIED_DESCENDING',
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: 'Sync token from a previous response for incremental sync',
      },
    ],
  },
  {
    name: 'googlecontacts_contact_get',
    description: 'Retrieve a single contact by their resource name (person ID).',
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: 'The person ID (part after "people/"). Get from googlecontacts_contacts_list.',
      },
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: 'Comma-separated fields to return (e.g. names,emailAddresses,phoneNumbers)',
      },
    ],
  },
  {
    name: 'googlecontacts_contact_create',
    description: "Create a new contact in the authenticated user's Google Contacts account.",
    params: [
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: 'Fields to return in the response (e.g. names,emailAddresses)',
      },
      { name: 'given_name', type: 'string', required: false, description: "Contact's first name" },
      { name: 'family_name', type: 'string', required: false, description: "Contact's last name" },
      { name: 'email', type: 'string', required: false, description: "Contact's email address" },
      {
        name: 'email_type',
        type: 'string',
        required: false,
        description: 'Email type: home, work, other',
      },
      { name: 'phone', type: 'string', required: false, description: "Contact's phone number" },
      {
        name: 'phone_type',
        type: 'string',
        required: false,
        description: 'Phone type: home, work, mobile, other',
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: "Contact's organization/company name",
      },
      { name: 'job_title', type: 'string', required: false, description: "Contact's job title" },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: 'Freeform notes about the contact',
      },
    ],
  },
  {
    name: 'googlecontacts_contact_update',
    description: "Update an existing contact. Requires the contact's etag for optimistic locking.",
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: 'The person ID. Get from googlecontacts_contacts_list.',
      },
      {
        name: 'update_person_fields',
        type: 'string',
        required: true,
        description: 'Comma-separated fields to update (e.g. names,emailAddresses,phoneNumbers)',
      },
      {
        name: 'etag',
        type: 'string',
        required: false,
        description:
          'Current etag for optimistic concurrency. Get from googlecontacts_contact_get.',
      },
      { name: 'given_name', type: 'string', required: false, description: 'Updated first name' },
      { name: 'family_name', type: 'string', required: false, description: 'Updated last name' },
      { name: 'email', type: 'string', required: false, description: 'Updated email address' },
      {
        name: 'email_type',
        type: 'string',
        required: false,
        description: 'Email type: home, work, other',
      },
      { name: 'phone', type: 'string', required: false, description: 'Updated phone number' },
      {
        name: 'phone_type',
        type: 'string',
        required: false,
        description: 'Phone type: home, work, mobile, other',
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: 'Updated organization name',
      },
      { name: 'job_title', type: 'string', required: false, description: 'Updated job title' },
      { name: 'notes', type: 'string', required: false, description: 'Updated notes' },
      {
        name: 'person_fields',
        type: 'string',
        required: false,
        description: 'Fields to return in the response',
      },
    ],
  },
  {
    name: 'googlecontacts_contact_delete',
    description: 'Permanently delete a contact from Google Contacts.',
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: 'The person ID to delete. Get from googlecontacts_contacts_list.',
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_search',
    description: 'Search contacts by name, email, phone number, or other fields.',
    params: [
      { name: 'query', type: 'string', required: true, description: 'Search query string' },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Comma-separated fields to return (e.g. names,emailAddresses)',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of results (max 30)',
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_batch_create',
    description: 'Create up to 200 new contacts in a single request.',
    params: [
      {
        name: 'contacts',
        type: 'string',
        required: true,
        description:
          'JSON-encoded array of contact person objects, each with a "names" array. E.g. `[{"names":[{"givenName":"Jane","familyName":"Doe"}]}]`',
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Fields to return for each created contact (e.g. names,emailAddresses)',
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_batch_update',
    description: 'Update up to 200 contacts in a single request.',
    params: [
      {
        name: 'contacts',
        type: 'string',
        required: true,
        description:
          'JSON-encoded object map of `{resourceName: {etag, names, ...}}`. Keys are full resource names like "people/c123".',
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: 'Comma-separated fields to update (e.g. names,emailAddresses)',
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Fields to return for each updated contact',
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_batch_delete',
    description: 'Permanently delete up to 500 contacts in a single request.',
    params: [
      {
        name: 'resource_names',
        type: 'string',
        required: true,
        description:
          'A contact resource name to delete in the format "people/<id>". Get from googlecontacts_contacts_list.',
      },
    ],
  },
  {
    name: 'googlecontacts_contact_update_photo',
    description: "Upload or replace a contact's profile photo.",
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: 'The person ID. Get from googlecontacts_contacts_list.',
      },
      {
        name: 'photo_bytes',
        type: 'string',
        required: true,
        description: 'Base64-encoded image data for the profile photo',
      },
      {
        name: 'person_fields',
        type: 'string',
        required: false,
        description: 'Fields to return in the response',
      },
    ],
  },
  {
    name: 'googlecontacts_contact_delete_photo',
    description: "Remove a contact's profile photo.",
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: 'The person ID. Get from googlecontacts_contacts_list.',
      },
      {
        name: 'person_fields',
        type: 'string',
        required: false,
        description: 'Fields to return in the response',
      },
    ],
  },
  {
    name: 'googlecontacts_groups_list',
    description: 'List all contact groups (both user-created and system groups) in the account.',
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of groups to return',
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: 'Token for the next page of results',
      },
      {
        name: 'group_fields',
        type: 'string',
        required: false,
        description: 'Fields to return for each group (e.g. name,memberCount,groupType)',
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: 'Sync token for incremental sync',
      },
    ],
  },
  {
    name: 'googlecontacts_group_get',
    description: 'Retrieve a single contact group by its ID.',
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description:
          'The contact group ID (part after "contactGroups/"). Get from googlecontacts_groups_list.',
      },
      {
        name: 'group_fields',
        type: 'string',
        required: false,
        description: 'Fields to return for the group',
      },
      {
        name: 'max_members',
        type: 'integer',
        required: false,
        description: 'Maximum number of member resource names to return',
      },
    ],
  },
  {
    name: 'googlecontacts_group_create',
    description: 'Create a new contact group.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Display name for the new group',
      },
      {
        name: 'read_group_fields',
        type: 'string',
        required: false,
        description: 'Fields to return in the response',
      },
    ],
  },
  {
    name: 'googlecontacts_group_update',
    description: "Update a contact group's name.",
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: 'The contact group ID. Get from googlecontacts_groups_list.',
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'New display name for the group',
      },
      {
        name: 'etag',
        type: 'string',
        required: false,
        description: 'Current etag for optimistic concurrency. Get from googlecontacts_group_get.',
      },
      {
        name: 'update_group_fields',
        type: 'string',
        required: false,
        description: 'Fields to update',
      },
      {
        name: 'read_group_fields',
        type: 'string',
        required: false,
        description: 'Fields to return in the response',
      },
    ],
  },
  {
    name: 'googlecontacts_group_delete',
    description:
      'Delete a contact group. System groups (myContacts, starred, etc.) cannot be deleted.',
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: 'The contact group ID. Get from googlecontacts_groups_list.',
      },
      {
        name: 'delete_contacts',
        type: 'boolean',
        required: false,
        description: 'If true, also delete all contacts in the group',
      },
    ],
  },
  {
    name: 'googlecontacts_group_members_modify',
    description: 'Add or remove contacts from a contact group.',
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: 'The contact group ID. Get from googlecontacts_groups_list.',
      },
      {
        name: 'resource_names_to_add',
        type: 'array',
        required: false,
        description: 'Array of contact resource names to add (e.g. ["people/c123"])',
      },
      {
        name: 'resource_names_to_remove',
        type: 'array',
        required: false,
        description: 'Array of contact resource names to remove',
      },
    ],
  },
  {
    name: 'googlecontacts_groups_batch_get',
    description: 'Retrieve a contact group by its resource name.',
    params: [
      {
        name: 'resource_names',
        type: 'string',
        required: true,
        description:
          'A contact group resource name in the format "contactGroups/<id>" (e.g. contactGroups/myContacts). Get from googlecontacts_groups_list.',
      },
      {
        name: 'group_fields',
        type: 'string',
        required: false,
        description: 'Fields to return for the group',
      },
      {
        name: 'max_members',
        type: 'integer',
        required: false,
        description: 'Maximum number of group members to return',
      },
    ],
  },
  {
    name: 'googlecontacts_people_batch_get',
    description: 'Retrieve a contact by their resource name.',
    params: [
      {
        name: 'resource_names',
        type: 'string',
        required: true,
        description:
          'A contact resource name in the format "people/<id>" (e.g. people/c123456789). Get from googlecontacts_contacts_list.',
      },
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: 'Comma-separated fields to return (e.g. names,emailAddresses,phoneNumbers)',
      },
    ],
  },
  {
    name: 'googlecontacts_other_contacts_list',
    description:
      'List contacts in the "Other contacts" section — contacts auto-generated from email history that the user hasn\'t explicitly added.',
    params: [
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Fields to return (e.g. names,emailAddresses,phoneNumbers)',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of contacts to return',
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: 'Token for the next page',
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: 'Sync token for incremental sync',
      },
    ],
  },
  {
    name: 'googlecontacts_other_contacts_search',
    description: 'Search contacts in the "Other contacts" section.',
    params: [
      { name: 'query', type: 'string', required: true, description: 'Search query string' },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Fields to return (e.g. names,emailAddresses)',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of results (max 30)',
      },
    ],
  },
  {
    name: 'googlecontacts_other_contact_copy',
    description: 'Copy an "Other contact" to the user\'s main contacts list.',
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description:
          'The person ID of the other contact. Get from googlecontacts_other_contacts_list.',
      },
      {
        name: 'copy_mask',
        type: 'string',
        required: true,
        description: 'Fields to copy (e.g. names,emailAddresses,phoneNumbers)',
      },
      {
        name: 'read_mask',
        type: 'string',
        required: false,
        description: 'Fields to return in the created contact',
      },
    ],
  },
  {
    name: 'googlecontacts_directory_list',
    description:
      'List people in the Google Workspace domain directory. Requires a Google Workspace account.',
    params: [
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Fields to return (e.g. names,emailAddresses,phoneNumbers)',
      },
      {
        name: 'sources',
        type: 'string',
        required: true,
        description:
          'Directory source type: DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT or DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of people to return',
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: 'Token for the next page',
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: 'Sync token for incremental sync',
      },
    ],
  },
  {
    name: 'googlecontacts_directory_search',
    description:
      'Search people in the Google Workspace domain directory. Requires a Google Workspace account.',
    params: [
      { name: 'query', type: 'string', required: true, description: 'Search query string' },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: 'Fields to return (e.g. names,emailAddresses)',
      },
      {
        name: 'sources',
        type: 'string',
        required: true,
        description:
          'Directory source: DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT or DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Maximum number of results',
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: 'Token for the next page',
      },
    ],
  },
]
