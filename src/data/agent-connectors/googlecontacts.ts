import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlecontacts_contact_create',
    description: `Creates a new contact in Google Contacts for the authenticated user.`,
    params: [
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: `Comma-separated fields to return in the response.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Primary email address of the contact.`,
      },
      {
        name: 'email_type',
        type: 'string',
        required: false,
        description: `Type of email: home, work, or other.`,
      },
      {
        name: 'family_name',
        type: 'string',
        required: false,
        description: `Last name of the contact.`,
      },
      {
        name: 'given_name',
        type: 'string',
        required: false,
        description: `First name of the contact.`,
      },
      {
        name: 'job_title',
        type: 'string',
        required: false,
        description: `Job title at the organization.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-text notes or biography for the contact.`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Company or organization name.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Primary phone number of the contact.`,
      },
      {
        name: 'phone_type',
        type: 'string',
        required: false,
        description: `Type of phone: mobile, home, work, or other.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contact_delete',
    description: `Permanently deletes a contact from Google Contacts by resource name.`,
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID of the contact to delete (the part after 'people/').`,
      },
    ],
  },
  {
    name: 'googlecontacts_contact_delete_photo',
    description: `Removes the profile photo of a contact in Google Contacts.`,
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID of the contact (the part after 'people/').`,
      },
      {
        name: 'person_fields',
        type: 'string',
        required: false,
        description: `Comma-separated FieldMask of person fields to return after deleting the photo.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contact_get',
    description: `Returns a single contact by resource name from Google Contacts.`,
    params: [
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: `Comma-separated fields to return for the contact.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID of the contact to retrieve (the part after 'people/'). 'me' is not supported by this connector: it requires Google's userinfo.profile scope, which is not part of this connection's granted scopes and will return a 403.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contact_update',
    description: `Updates an existing contact in Google Contacts. Only fields specified in update_person_fields are modified.`,
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID of the contact to update (the part after 'people/').`,
      },
      {
        name: 'update_person_fields',
        type: 'string',
        required: true,
        description: `Comma-separated list of fields to update (FieldMask).`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated primary email address.`,
      },
      {
        name: 'email_type',
        type: 'string',
        required: false,
        description: `Type of email: home, work, or other.`,
      },
      {
        name: 'etag',
        type: 'string',
        required: false,
        description: `Etag of the contact for conflict detection (recommended).`,
      },
      {
        name: 'family_name',
        type: 'string',
        required: false,
        description: `Updated last name of the contact.`,
      },
      {
        name: 'given_name',
        type: 'string',
        required: false,
        description: `Updated first name of the contact.`,
      },
      {
        name: 'job_title',
        type: 'string',
        required: false,
        description: `Updated job title at the organization.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Updated free-text notes or biography.`,
      },
      {
        name: 'organization',
        type: 'string',
        required: false,
        description: `Updated company or organization name.`,
      },
      {
        name: 'person_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return in the response.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Updated primary phone number.`,
      },
      {
        name: 'phone_type',
        type: 'string',
        required: false,
        description: `Type of phone: mobile, home, work, or other.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contact_update_photo',
    description: `Uploads a new profile photo for a contact in Google Contacts. The photo must be provided as base64-encoded bytes.`,
    params: [
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID of the contact to update (the part after 'people/').`,
      },
      {
        name: 'photo_bytes',
        type: 'string',
        required: true,
        description: `Base64-encoded bytes of the photo to upload.`,
      },
      {
        name: 'person_fields',
        type: 'string',
        required: false,
        description: `Comma-separated FieldMask of person fields to return after updating the photo.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_batch_create',
    description: `Creates up to 200 new contacts in a single request in Google Contacts.`,
    params: [
      {
        name: 'contacts',
        type: 'string',
        required: true,
        description: `JSON array of contact objects to create (max 200). Each object is a Person resource with fields like names, emailAddresses, phoneNumbers.`,
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to return for each created contact. Valid values: addresses, biographies, birthdays, emailAddresses, memberships, names, nicknames, organizations, phoneNumbers, photos, urls.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_batch_delete',
    description: `Permanently deletes up to 500 contacts in a single request from Google Contacts.`,
    params: [
      {
        name: 'resource_names',
        type: 'array',
        required: true,
        description: `Array of contact resource names to delete (max 500). e.g. ['people/c123456789']`,
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_batch_update',
    description: `Updates up to 200 existing contacts in a single request in Google Contacts.`,
    params: [
      {
        name: 'contacts',
        type: 'string',
        required: true,
        description: `JSON object mapping each contact's resourceName (e.g. 'people/c123') to a Person object with updated fields (max 200 entries).`,
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to return for each updated contact.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to update across all contacts.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_list',
    description: `Returns all contacts (connections) for the authenticated user from Google Contacts, with cursor-based pagination and optional sync token support.`,
    params: [
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to return. Valid values: addresses, ageRanges, biographies, birthdays, calendarUrls, clientData, coverPhotos, emailAddresses, events, externalIds, genders, imClients, interests, locales, locations, memberships, metadata, miscKeywords, names, nicknames, occupations, organizations, phoneNumbers, photos, relations, sipAddresses, skills, urls, userDefined.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of contacts to return per page (max 1000).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response for pagination.`,
      },
      {
        name: 'request_sync_token',
        type: 'boolean',
        required: false,
        description: `If true, returns a sync token on the last page for incremental sync.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort order for contacts. One of: LAST_MODIFIED_ASCENDING, LAST_MODIFIED_DESCENDING, FIRST_NAME_ASCENDING, LAST_NAME_ASCENDING.`,
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: `Sync token from a previous response to fetch only changed contacts.`,
      },
    ],
  },
  {
    name: 'googlecontacts_contacts_search',
    description: `Searches the authenticated user's contacts by prefix query across names, email addresses, and phone numbers.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Prefix phrase to search across contact fields.`,
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated fields to return for each matching contact.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 10, max 30).`,
      },
    ],
  },
  {
    name: 'googlecontacts_directory_list',
    description: `Lists people in the Google Workspace domain directory. Requires the directory.readonly OAuth scope.`,
    params: [
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to return. Valid values: addresses, ageRanges, biographies, birthdays, calendarUrls, clientData, coverPhotos, emailAddresses, events, externalIds, genders, imClients, interests, locales, locations, memberships, metadata, miscKeywords, names, nicknames, occupations, organizations, phoneNumbers, photos, relations, sipAddresses, skills, urls, userDefined.`,
      },
      {
        name: 'sources',
        type: 'string',
        required: true,
        description: `Directory source type to return. Use DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT for domain contacts or DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE for domain profiles.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of people to return per page (1–1000, default 100).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response for pagination.`,
      },
      {
        name: 'request_sync_token',
        type: 'boolean',
        required: false,
        description: `If true, returns a sync token on the last page for incremental sync.`,
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: `Sync token from a previous response to fetch only changed people.`,
      },
    ],
  },
  {
    name: 'googlecontacts_directory_search',
    description: `Searches the Google Workspace domain directory by prefix query across names, email addresses, and phone numbers. Requires the directory.readonly OAuth scope.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Prefix query string to search across directory people.`,
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to return. Valid values: addresses, ageRanges, biographies, birthdays, calendarUrls, clientData, coverPhotos, emailAddresses, events, externalIds, genders, imClients, interests, locales, locations, memberships, metadata, miscKeywords, names, nicknames, occupations, organizations, phoneNumbers, photos, relations, sipAddresses, skills, urls, userDefined.`,
      },
      {
        name: 'sources',
        type: 'string',
        required: true,
        description: `Directory source type to search. Use DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT or DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (1–500, default 100).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response for pagination.`,
      },
    ],
  },
  {
    name: 'googlecontacts_group_create',
    description: `Creates a new contact group with the given name in Google Contacts. Group names must be unique per user.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new contact group (must be unique).`,
      },
      {
        name: 'read_group_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return in the response.`,
      },
    ],
  },
  {
    name: 'googlecontacts_group_delete',
    description: `Deletes a contact group from Google Contacts. Optionally also deletes all contacts that belong to the group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The group ID of the contact group to delete (the part after 'contactGroups/').`,
      },
      {
        name: 'delete_contacts',
        type: 'boolean',
        required: false,
        description: `If true, also deletes all contacts in the group.`,
      },
    ],
  },
  {
    name: 'googlecontacts_group_get',
    description: `Returns a single contact group by resource name, including its members if requested.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The group ID of the contact group (the part after 'contactGroups/').`,
      },
      {
        name: 'group_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return: clientData, groupType, memberCount, metadata, name.`,
      },
      {
        name: 'max_members',
        type: 'integer',
        required: false,
        description: `Maximum number of group members to return (default 0 = none).`,
      },
    ],
  },
  {
    name: 'googlecontacts_group_members_modify',
    description: `Adds or removes contacts from a contact group. Supports adding to 'myContacts' and 'starred' groups, and removing from any group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The group ID of the contact group to modify (the part after 'contactGroups/').`,
      },
      {
        name: 'resource_names_to_add',
        type: 'array',
        required: false,
        description: `JSON array of contact resource names to add to the group.`,
      },
      {
        name: 'resource_names_to_remove',
        type: 'array',
        required: false,
        description: `JSON array of contact resource names to remove from the group.`,
      },
    ],
  },
  {
    name: 'googlecontacts_group_update',
    description: `Updates the name of an existing contact group in Google Contacts.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The group ID of the contact group to update (the part after 'contactGroups/').`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the contact group (must be unique).`,
      },
      {
        name: 'etag',
        type: 'string',
        required: false,
        description: `Etag of the contact group for conflict detection.`,
      },
      {
        name: 'read_group_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return in the response.`,
      },
      {
        name: 'update_group_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to update: clientData, name. Defaults to name.`,
      },
    ],
  },
  {
    name: 'googlecontacts_groups_batch_get',
    description: `Retrieves up to 200 contact groups in a single request from Google Contacts.`,
    params: [
      {
        name: 'resource_names',
        type: 'array',
        required: true,
        description: `One or more contact group resource names to retrieve, in the format 'contactGroups/<id>' (e.g. 'contactGroups/myContacts' or 'contactGroups/starred'), up to 200. Get IDs from googlecontacts_groups_list. Sent as repeated resourceNames query parameters.`,
      },
      {
        name: 'group_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return for each group: clientData, groupType, memberCount, metadata, name.`,
      },
      {
        name: 'max_members',
        type: 'integer',
        required: false,
        description: `Maximum number of group members to return per group (default 0 = none).`,
      },
    ],
  },
  {
    name: 'googlecontacts_groups_list',
    description: `Returns all contact groups owned by the authenticated user, including system groups like 'My Contacts' and 'Starred'.`,
    params: [
      {
        name: 'group_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return: clientData, groupType, memberCount, metadata, name.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of contact groups to return per page (max 1000).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response for pagination.`,
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: `Sync token to fetch only changed contact groups. Unlike googlecontacts_contacts_list, this endpoint always returns nextSyncToken on the last page — no request flag is needed.`,
      },
    ],
  },
  {
    name: 'googlecontacts_other_contact_copy',
    description: `Copies an 'Other Contact' (auto-generated from email history) into the authenticated user's main contacts (myContacts group).`,
    params: [
      {
        name: 'copy_mask',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of fields to copy from the Other Contact. Valid values: emailAddresses, names, phoneNumbers.`,
      },
      {
        name: 'person_id',
        type: 'string',
        required: true,
        description: `The person ID of the Other Contact to copy (the part after 'otherContacts/').`,
      },
      {
        name: 'read_mask',
        type: 'string',
        required: false,
        description: `Comma-separated FieldMask of person fields to return for the newly created contact.`,
      },
    ],
  },
  {
    name: 'googlecontacts_other_contacts_list',
    description: `Returns the authenticated user's 'Other Contacts' — contacts auto-generated from email history that haven't been saved to personal contacts.`,
    params: [
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated fields to return. Valid values: emailAddresses, metadata, names, phoneNumbers, photos.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of contacts to return per page (max 1000).`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token from a previous response for pagination.`,
      },
      {
        name: 'request_sync_token',
        type: 'boolean',
        required: false,
        description: `If true, returns a sync token on the last page.`,
      },
      {
        name: 'sync_token',
        type: 'string',
        required: false,
        description: `Sync token to fetch only changed contacts (expires after 7 days).`,
      },
    ],
  },
  {
    name: 'googlecontacts_other_contacts_search',
    description: `Searches the authenticated user's 'Other Contacts' by prefix query across names, email addresses, and phone numbers.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Prefix phrase to search across other contact fields.`,
      },
      {
        name: 'read_mask',
        type: 'string',
        required: true,
        description: `Comma-separated fields to return. Valid values: emailAddresses, metadata, names, phoneNumbers.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 10, max 30).`,
      },
    ],
  },
  {
    name: 'googlecontacts_people_batch_get',
    description: `Retrieves up to 200 contacts in a single request by their resource names from Google Contacts.`,
    params: [
      {
        name: 'person_fields',
        type: 'string',
        required: true,
        description: `Comma-separated FieldMask of person fields to return. Valid values: addresses, ageRanges, biographies, birthdays, calendarUrls, clientData, coverPhotos, emailAddresses, events, externalIds, genders, imClients, interests, locales, locations, memberships, metadata, miscKeywords, names, nicknames, occupations, organizations, phoneNumbers, photos, relations, sipAddresses, skills, urls, userDefined.`,
      },
      {
        name: 'resource_names',
        type: 'array',
        required: true,
        description: `One or more contact resource names in the format 'people/<id>' (e.g. 'people/c123456789'), up to 200. Get resource names from googlecontacts_contacts_list. Sent as repeated resourceNames query parameters.`,
      },
    ],
  },
]
