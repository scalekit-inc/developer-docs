import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'pylon_account_activity_create',
    description: `Creates a new activity (a timeline event) for a Pylon account, identified by a custom activity type slug configured in your Pylon organization. Optionally attach HTML body content, a link, and note the contact or user who performed the activity, and when it happened.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account to create the activity for. Required.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The slug of the custom activity type to create. Required. Slugs for available activity types can be found via the GET /activity-types endpoint.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `Optional HTML content to display in the activity.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `Optional contact ID of the actor of the activity.`,
      },
      {
        name: 'happened_at',
        type: 'string',
        required: false,
        description: `Timestamp (RFC 3339) of when the activity happened. Defaults to the current time if empty.`,
      },
      {
        name: 'link',
        type: 'string',
        required: false,
        description: `Optional link to add to the activity.`,
      },
      {
        name: 'link_text',
        type: 'string',
        required: false,
        description: `Optional link text to display on the activity. Defaults to "Open link" if not provided. Applies only if a link is provided.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional Pylon user ID of the actor of the activity.`,
      },
    ],
  },
  {
    name: 'pylon_account_create',
    description: `Creates a new Pylon account with the specified name and optional metadata, such as domains, tags, custom fields, linked channels, external IDs, and an owner. Returns the newly created account.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the account to create. Required.`,
      },
      {
        name: 'account_type',
        type: 'string',
        required: false,
        description: `The type of the account. Must be one of "customer", "internal", "community", or "partner". Defaults to "customer" if not specified.`,
      },
      {
        name: 'channels',
        type: 'array',
        required: false,
        description: `An array of channels (Slack, Microsoft Teams, or Discord) to link to this account.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to set on this account. Each entry has a slug identifying the custom field, and either a single value or an array of values for multi-valued fields.`,
      },
      {
        name: 'domains',
        type: 'array',
        required: false,
        description: `The domains of the account, without any leading scheme, for example "stripe.com". If provided, exactly one domain must also be set as primary_domain.`,
      },
      {
        name: 'external_ids',
        type: 'array',
        required: false,
        description: `An array of external IDs to associate with this account. Each entry has an external_id and a label, both unique per account.`,
      },
      {
        name: 'logo_url',
        type: 'string',
        required: false,
        description: `The logo URL of the account. Must be a square .png, .jpg, or .jpeg image.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `The ID of the Pylon user who owns this account.`,
      },
      {
        name: 'primary_domain',
        type: 'string',
        required: false,
        description: `The primary domain for this account. Must be present in the domains array if domains is provided.`,
      },
      {
        name: 'subaccount_ids',
        type: 'array',
        required: false,
        description: `An array of account IDs to add as subaccounts to this account. For normal accounts, these represent subaccounts; for partner accounts, these represent associated accounts.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `An array of strings to use as tags on this account.`,
      },
    ],
  },
  {
    name: 'pylon_account_delete',
    description: `Permanently deletes an existing Pylon account by its ID or external ID. This action cannot be undone. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account to delete.`,
      },
    ],
  },
  {
    name: 'pylon_account_file_upload',
    description: `Uploads a file to a Pylon account by ID or external ID, as multipart/form-data. Provide either the file content as a base64-encoded string, or a file_url that Pylon will fetch the file from — exactly one of file_content_base64 or file_url must be set.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account to upload the file to. Required.`,
      },
      {
        name: 'file_content_base64',
        type: 'string',
        required: false,
        description: `Base64-encoded contents of the file to upload. Provide this or file_url, but not both.`,
      },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `The URL to fetch the file from, if the file content is not provided directly. Provide this or file_content_base64, but not both.`,
      },
    ],
  },
  {
    name: 'pylon_account_get',
    description: `Retrieve a single Pylon account by its ID or external ID. Returns the account's details including name, domain, custom fields, tags, and other metadata. Use this to look up an existing account before updating it or to fetch its current state.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account to fetch. Accepts either Pylon's internal account ID (UUID) or the external_id you assigned when creating the account.`,
      },
    ],
  },
  {
    name: 'pylon_account_highlight_create',
    description: `Creates a new highlight (a pinned note or memory) on a Pylon account. Highlights surface important context about an account to support agents. Optionally associate the highlight with a specific contact on the account and set an expiration time.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account that the highlight belongs to. Required.`,
      },
      {
        name: 'content_html',
        type: 'string',
        required: true,
        description: `The HTML content for this highlight. Required.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `Optional ID or external ID of a contact to associate the resulting highlight with. The contact must belong to the account.`,
      },
      {
        name: 'expires_at',
        type: 'string',
        required: false,
        description: `Optional RFC 3339 timestamp of when this highlight will expire, e.g. 2024-09-30T00:00:00Z.`,
      },
    ],
  },
  {
    name: 'pylon_account_highlight_delete',
    description: `Permanently deletes an account highlight by ID from a Pylon account. This action cannot be undone. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account that the highlight belongs to.`,
      },
      {
        name: 'highlight_id',
        type: 'string',
        required: true,
        description: `The ID of the highlight to delete.`,
      },
    ],
  },
  {
    name: 'pylon_account_highlight_update',
    description: `Updates an existing highlight on a Pylon account. Only the fields you provide are modified; omitted fields are left unchanged. Use this to change the highlight's HTML content or its expiration timestamp.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account that the highlight belongs to. Required.`,
      },
      {
        name: 'highlight_id',
        type: 'string',
        required: true,
        description: `The ID of the highlight to update. Required.`,
      },
      {
        name: 'content_html',
        type: 'string',
        required: false,
        description: `The updated HTML content for this highlight. Leave empty to leave unchanged.`,
      },
      {
        name: 'expires_at',
        type: 'string',
        required: false,
        description: `The updated expiration timestamp (RFC 3339) for this highlight. Leave empty to leave unchanged.`,
      },
    ],
  },
  {
    name: 'pylon_account_relationship_create',
    description: `Creates a parent-account or partner-account relationship for the account given in the URL. The account in the URL is treated as the child (for a parent relationship) or client (for a partner relationship), and related_object_id identifies the parent or partner account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the child or client account (the account this relationship is being created for). Required.`,
      },
      {
        name: 'related_object_id',
        type: 'string',
        required: true,
        description: `The ID of the related parent or partner account. Required.`,
      },
      {
        name: 'relationship_type',
        type: 'string',
        required: true,
        description: `The relationship type. Must be "parent_account" or "partner_account". Required.`,
      },
    ],
  },
  {
    name: 'pylon_account_relationship_delete',
    description: `Deletes an account relationship (e.g. a parent/child or vendor/client link between two accounts) by ID. This action cannot be undone. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the child or client account.`,
      },
      {
        name: 'relationship_id',
        type: 'string',
        required: true,
        description: `The ID of the account relationship to delete.`,
      },
    ],
  },
  {
    name: 'pylon_account_relationships_list',
    description: `Returns the parent-child and partner-client relationships where the given account is the child or client, i.e. the parent and/or partner accounts related to this account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the child or client account whose relationships should be returned. Required.`,
      },
    ],
  },
  {
    name: 'pylon_account_update',
    description: `Updates an existing Pylon account by ID or external ID. Only the fields you provide are modified; omitted fields are left unchanged. Use this to change the account's name, type, domains, tags, custom fields, owner, linked channels, external IDs, or disabled status.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or external ID of the account to update. Required.`,
      },
      {
        name: 'account_type',
        type: 'string',
        required: false,
        description: `The type of the account. Can only be changed to "customer" or "partner".`,
      },
      {
        name: 'channels',
        type: 'array',
        required: false,
        description: `An array of channels (Slack, Microsoft Teams, or Discord) to link to this account.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to set on this account. Each entry has a slug identifying the custom field, and either a single value or an array of values for multi-valued fields.`,
      },
      {
        name: 'domains',
        type: 'array',
        required: false,
        description: `Domains of the account, without any leading scheme. If provided, exactly one domain must also be set as primary_domain. If provided, this replaces the account's existing domains.`,
      },
      {
        name: 'external_ids',
        type: 'array',
        required: false,
        description: `An array of external IDs to set on this account. Each entry has an external_id and a label, both unique per account. If provided, replaces the account's existing external IDs.`,
      },
      {
        name: 'is_disabled',
        type: 'boolean',
        required: false,
        description: `Whether the account is disabled.`,
      },
      {
        name: 'logo_url',
        type: 'string',
        required: false,
        description: `The logo URL of the account. Must be a square .png, .jpg, or .jpeg image.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name of the account. Leave empty to leave unchanged.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `The ID of the new owner of the account. If an empty string is passed in, the owner will be removed.`,
      },
      {
        name: 'primary_domain',
        type: 'string',
        required: false,
        description: `The primary domain for this account. Must be present in the domains array if domains is provided.`,
      },
      {
        name: 'subaccount_ids',
        type: 'array',
        required: false,
        description: `An array of account IDs to add as subaccounts to this account.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `An array of strings to use as tags on this account. If provided, replaces the account's existing tags.`,
      },
    ],
  },
  {
    name: 'pylon_accounts_bulk_update',
    description: `Updates multiple Pylon accounts in a single request. Only the fields you provide are modified on each of the specified accounts. Supports changing the account type, owner, tags, and custom fields across up to 100 accounts at once. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'account_ids',
        type: 'array',
        required: true,
        description: `The account IDs to update. Must contain between 1 and 100 IDs.`,
      },
      {
        name: 'account_type',
        type: 'string',
        required: false,
        description: `The type of the account. Can only be changed to "customer" or "partner".`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to be updated on the accounts. Each entry has a slug identifying the custom field, and either a single value or an array of values for multi-valued fields.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `The ID of the new owner. If an empty string is passed in, the owner will be removed.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `An array of tags to be updated on the accounts.`,
      },
      {
        name: 'tags_apply_mode',
        type: 'string',
        required: false,
        description: `The mode for applying tags. Valid values: "append_only", "remove_only", "replace". Defaults to "replace".`,
      },
    ],
  },
  {
    name: 'pylon_accounts_list',
    description: `Returns a paginated list of accounts for the organization. Use the cursor from the previous response to fetch the next page, and limit to control page size (default 100, max 999).`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pagination cursor from a previous response's \`cursor\` / \`next_cursor\` field. Omit to fetch the first page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `The number of accounts to fetch per page. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_accounts_merge',
    description: `Merges one or more accounts into a surviving account. Issues, contacts, opportunities, domains, channels, external IDs, and other associated data are transferred to the surviving account. Tags and custom field values of the merged accounts are NOT transferred. The merged accounts are permanently deleted and this cannot be undone. Accounts are merged sequentially, each in its own transaction; if a merge fails partway through, accounts already merged are not restored. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'merge_account_ids',
        type: 'array',
        required: true,
        description: `The IDs of the accounts to merge into the surviving account. These accounts are permanently deleted after their data is transferred. Must contain between 1 and 100 IDs.`,
      },
      {
        name: 'merge_into_account_id',
        type: 'string',
        required: true,
        description: `The ID of the account that will survive the merge and receive the merged data.`,
      },
    ],
  },
  {
    name: 'pylon_accounts_search',
    description: `Search for Pylon accounts using an optional fuzzy text search and/or a structured filter. Filterable fields include id, domains, tags, name, external_ids, owner_id, and any custom field slug. Supports cursor-based pagination. Returns a page of matching accounts and a cursor for fetching the next page, if any.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination. Pass the cursor returned from a previous search response to fetch the next page of results.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object describing which accounts to match. Structure: {"field": "name", "operator": "string_contains", "value": "acme"} for a single match, or {"field": "tags", "operator": "contains", "values": ["vip"]} for multi-value operators. Filterable fields: id (equals, in, not_in), domains (contains, does_not_contain, in, not_in), tags (contains, does_not_contain, in, not_in), name (equals, in, not_in, string_contains), external_ids (equals, in, not_in, is_set, is_unset), owner_id (equals, in, not_in, is_set, is_unset), and custom field slugs.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `The number of accounts to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
      {
        name: 'search_text',
        type: 'string',
        required: false,
        description: `Fuzzy text search across account fields. Results are intersected with any provided filter.`,
      },
    ],
  },
  {
    name: 'pylon_activity_types_list',
    description: `Returns all custom activity type definitions configured for the organization. Use this to discover which activity type slugs are valid before creating a new activity on an account. Rate limit: 10 requests per minute.`,
    params: [],
  },
  {
    name: 'pylon_attachment_create',
    description: `Uploads a file as a Pylon attachment. The returned URL can be used when creating issues or messages. Provide the file contents as a base64-encoded string together with a filename, OR provide a file_url that Pylon will fetch the file from. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the file.`,
      },
      {
        name: 'file_content_base64',
        type: 'string',
        required: false,
        description: `Base64-encoded contents of the file to upload. Required when file_url is not provided.`,
      },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `The URL to fetch the file from, if the file is not provided directly.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `The name of the file being uploaded, including extension. Required when file_content_base64 is provided.`,
      },
    ],
  },
  {
    name: 'pylon_audit_logs_list',
    description: `Returns a paginated list of audit log entries for the organization. Use the cursor from the response to fetch subsequent pages. Rate limit: 60 requests per minute.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of audit logs to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_audit_logs_search',
    description: `Returns a filtered, paginated list of audit log entries for the organization. Currently filterable fields are: action (operators: equals, in, not_in, string_contains, string_does_not_contain) and action_happened_at in RFC3339 format (operators: time_is_after, time_is_before, time_range). Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `A filter object narrowing which audit logs are returned. Shape: {"field": "action", "operator": "equals", "value": "issue.created"}. Combine multiple conditions with operator "and"/"or" and a "subfilters" array (max depth 3). Filterable fields: action, action_happened_at.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of audit logs to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_call_recording_delete',
    description: `Permanently deletes a Pylon call recording by its ID. This action cannot be undone. Use pylon_call_recording_get first to confirm you are deleting the correct recording.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Pylon ID of the call recording to permanently delete. This is the internal UUID assigned by Pylon when the call recording was created.`,
      },
    ],
  },
  {
    name: 'pylon_call_recording_get',
    description: `Retrieve a single Pylon call recording by its ID. Returns the call recording's details including associated account, custom fields, and other metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Pylon ID of the call recording to fetch. This is the internal UUID assigned by Pylon when the call recording was created.`,
      },
    ],
  },
  {
    name: 'pylon_call_recording_update',
    description: `Updates a Pylon call recording by ID. Only the fields provided are modified; omitted fields are left unchanged. Use this to associate the recording with an account or to set/update its custom field values.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Pylon ID of the call recording to update. This is the internal UUID assigned by Pylon when the call recording was created.`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `The account ID to associate with the call recording. Pass an empty string to remove the account association. Leave unset to leave the association unchanged.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom field objects to set on the call recording. Only the fields passed in are modified. Each object has a \`slug\` (the custom field's slug, from GET /custom-fields) and either a \`value\` (single-valued fields) or \`values\` (multi-valued fields, e.g. multiselect). Example: [{"slug": "priority", "value": "high"}].`,
      },
    ],
  },
  {
    name: 'pylon_call_recordings_search',
    description: `Searches for call recordings by a given filter. Currently filterable fields are: account_id (operators: equals, in, not_in, is_set, is_unset), source (operators: equals, in, not_in), title (operators: equals, string_contains), and start_time (operators: time_is_after, time_is_before, time_range). Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `A filter object narrowing which call recordings are returned. Shape: {"field": "account_id", "operator": "equals", "value": "<account id>"}. Combine multiple conditions with operator "and"/"or" and a "subfilters" array (max depth 3). Filterable fields: account_id, source, title, start_time.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of call recordings to fetch. Defaults to 100. Must be greater than 0 and less than or equal to 1000.`,
      },
    ],
  },
  {
    name: 'pylon_contact_create',
    description: `Creates a new Pylon contact with the specified name and optional metadata such as email, associated account, phone numbers, external IDs, and custom fields.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the contact. This is the only required field.`,
      },
      {
        name: 'account_external_id',
        type: 'string',
        required: false,
        description: `The external ID of the account that this contact belongs to. Cannot be used together with account_id.`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `The Pylon ID of the account that this contact belongs to. Cannot be used together with account_external_id.`,
      },
      {
        name: 'avatar_url',
        type: 'string',
        required: false,
        description: `The avatar URL of the contact. Must be a square .png, .jpg, or .jpeg image.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom field objects to apply to this contact. Each object has a \`slug\` (the custom field's slug, from GET /custom-fields) and either a \`value\` (single-valued fields) or \`values\` (multi-valued fields). Example: [{"slug": "tier", "value": "gold"}].`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The email address of the contact.`,
      },
      {
        name: 'external_ids',
        type: 'array',
        required: false,
        description: `An array of external ID objects to associate with this contact. Each object has \`external_id\` (string) and \`label\` (string, must be unique per object). Example: [{"external_id": "crm-123", "label": "salesforce"}].`,
      },
      {
        name: 'phone_numbers',
        type: 'array',
        required: false,
        description: `The phone numbers of the contact, as an array of strings. Each must contain only digits 0-9 and be 15 digits or less. Example: ["14155551234"].`,
      },
      {
        name: 'portal_role',
        type: 'string',
        required: false,
        description: `The portal role to assign to the contact. One of \`no_access\`, \`member\`, or \`admin\`. If not provided, uses the default portal role from the portal settings.`,
      },
      {
        name: 'portal_role_id',
        type: 'string',
        required: false,
        description: `The ID of a custom portal role to assign to the contact. Takes precedence over portal_role if provided.`,
      },
      {
        name: 'primary_phone_number',
        type: 'string',
        required: false,
        description: `The primary phone number. Must be one of the values in phone_numbers. If phone_numbers is set and this is not specified, the first entry becomes primary.`,
      },
    ],
  },
  {
    name: 'pylon_contact_delete',
    description: `Permanently deletes a Pylon contact by ID. This action cannot be undone. Use pylon_contact_get first to confirm you are deleting the correct contact.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Pylon ID of the contact to permanently delete. This is the internal UUID assigned by Pylon when the contact was created.`,
      },
    ],
  },
  {
    name: 'pylon_contact_get',
    description: `Retrieve a single Pylon contact by its ID. Returns the contact's details including name, email, associated account, custom fields, and other metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Pylon ID of the contact to fetch. This is the internal UUID assigned by Pylon when the contact was created.`,
      },
    ],
  },
  {
    name: 'pylon_contact_update',
    description: `Updates an existing Pylon contact by ID. Only the fields provided are modified; omitted fields are left unchanged.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Pylon ID of the contact to update. This is the internal UUID assigned by Pylon when the contact was created.`,
      },
      {
        name: 'account_external_id',
        type: 'string',
        required: false,
        description: `The external ID of the account to move the contact to. Cannot be used together with account_id.`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `The account to move the contact to, by Pylon account ID. If an empty string is passed, the contact is removed from its account. Cannot be used together with account_external_id.`,
      },
      {
        name: 'avatar_url',
        type: 'string',
        required: false,
        description: `The new avatar URL of the contact. Must be a square .png, .jpg, or .jpeg image.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom field objects to apply to this contact. Only the fields passed in are modified. Each object has a \`slug\` (the custom field's slug, from GET /custom-fields) and either a \`value\` (single-valued fields) or \`values\` (multi-valued fields). Example: [{"slug": "tier", "value": "gold"}].`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The new email of the contact. Cannot be used together with the \`emails\` array field.`,
      },
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `The emails of the contact as an array. Cannot be used together with the singular \`email\` field. Each entry must include an \`email\` string and an optional \`is_primary\` boolean. If no email is marked primary, the first one becomes primary. Example: [{"email": "jane@acme.com", "is_primary": true}].`,
      },
      {
        name: 'external_ids',
        type: 'array',
        required: false,
        description: `An array of external ID objects to associate with this contact. If provided, the contact's external IDs are replaced with the given list. Each object has \`external_id\` (string) and \`label\` (string). Example: [{"external_id": "crm-123", "label": "salesforce"}].`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name of the contact.`,
      },
      {
        name: 'phone_numbers',
        type: 'array',
        required: false,
        description: `The phone numbers of the contact, as an array of strings. Each must contain only digits 0-9 and be 15 digits or less. Example: ["14155551234"].`,
      },
      {
        name: 'portal_role',
        type: 'string',
        required: false,
        description: `The portal role to assign to the contact. Can be \`no_access\`, \`member\`, \`admin\`, or a custom role slug.`,
      },
      {
        name: 'portal_role_id',
        type: 'string',
        required: false,
        description: `The ID of a custom portal role to assign to the contact. Takes precedence over portal_role if provided.`,
      },
      {
        name: 'primary_phone_number',
        type: 'string',
        required: false,
        description: `The primary phone number. Must be one of the values in phone_numbers. If phone_numbers is set and this is not specified, the first entry becomes primary.`,
      },
    ],
  },
  {
    name: 'pylon_contacts_list',
    description: `Returns a paginated list of contacts for the organization. Use the cursor from the previous response to fetch the next page, and limit to control page size (default 100, max 1000).`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pagination cursor from a previous response's \`cursor\` / \`next_cursor\` field. Omit to fetch the first page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `The number of contacts to fetch per page. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_contacts_search',
    description: `Searches for Pylon contacts using a structured filter and/or fuzzy text search. Filterable fields include \`id\`, \`email\`, \`name\`, \`account_id\`, and any custom field (by its slug). Supports operators like \`equals\`, \`in\`, \`not_in\`, and \`string_contains\` depending on the field. Results can be combined with \`search_text\` for fuzzy matching, and results are intersected with any provided filter. Note this endpoint uses POST for a read/search operation, so it is not marked read-only.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pagination cursor from a previous response's \`cursor\` field. Omit to fetch the first page.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `A structured filter object to narrow the search. Must include \`field\` and \`operator\`, plus \`value\`/\`values\` for leaf filters or \`subfilters\` for compound \`and\`/\`or\` filters. Filterable fields: id, email, name, account_id, and custom field slugs. Example: {"field": "email", "operator": "string_contains", "value": "@acme.com"}.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `The number of contacts to fetch per page. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
      {
        name: 'search_text',
        type: 'string',
        required: false,
        description: `Fuzzy text search across contact fields. Results are intersected with any provided filter.`,
      },
    ],
  },
  {
    name: 'pylon_custom_field_create',
    description: `Create a new custom field definition for a Pylon object type (account, issue, contact, task, project, meeting, or opportunity). Supports text, number, decimal, boolean, date, datetime, user, url, select, and multiselect field types. For select/multiselect fields, pass the list of options.`,
    params: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `The label of the custom field.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The object type this custom field applies to.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of the custom field.`,
      },
      {
        name: 'default_value',
        type: 'string',
        required: false,
        description: `The default value for single-valued custom fields.`,
      },
      {
        name: 'default_values',
        type: 'string',
        required: false,
        description: `The default values for multi-valued custom fields, as a JSON-encoded array of strings.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the custom field.`,
      },
      {
        name: 'select_options',
        type: 'string',
        required: false,
        description: `The list options for select/multiselect custom fields, as a JSON-encoded array of {slug, label, ai_description} objects.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `The slug of the custom field. If omitted, Pylon generates one from the label.`,
      },
    ],
  },
  {
    name: 'pylon_custom_field_get',
    description: `Retrieve a single custom field definition by its ID. Returns the field's label, slug, type, description, default value(s), and select options if applicable.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the custom field to fetch.`,
      },
    ],
  },
  {
    name: 'pylon_custom_field_update',
    description: `Update a custom field definition by its ID. Only the fields you provide are modified; omitted fields are left unchanged. Note: object_type and type cannot be changed after creation.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the custom field to update.`,
      },
      {
        name: 'default_value',
        type: 'string',
        required: false,
        description: `The default value for single-valued custom fields.`,
      },
      {
        name: 'default_values',
        type: 'string',
        required: false,
        description: `The default values for multi-valued custom fields, as a JSON-encoded array of strings.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the custom field.`,
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: `The label of the custom field.`,
      },
      {
        name: 'select_options',
        type: 'string',
        required: false,
        description: `The list options for select/multiselect custom fields, as a JSON-encoded array of {slug, label, ai_description} objects.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `The slug of the custom field.`,
      },
    ],
  },
  {
    name: 'pylon_custom_fields_list',
    description: `Returns all custom field definitions for a given Pylon object type. Use this to discover the slugs, types, and (for select/multiselect fields) valid option slugs before setting custom field values on that object type via other tools.`,
    params: [
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The object type to list custom field definitions for. One of: account, issue, contact, task, project, meeting, opportunity.`,
      },
    ],
  },
  {
    name: 'pylon_custom_object_create',
    description: `Create a new custom object instance of the given type (e.g. 'companies'). To link the object to an account, pass the built-in Account relationship field in custom_fields, e.g. custom_fields = '{"account":{"value":"account_uuid"}}'.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the custom object.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Custom field values to set on the object, keyed by field slug, as a JSON-encoded object. Each value is either {"value": "..."} for single-valued fields or {"values": [...]} for multi-valued fields. To link the object to an account, use the built-in 'account' relationship field.`,
      },
    ],
  },
  {
    name: 'pylon_custom_object_delete',
    description: `Permanently deletes a custom object instance of the given type. This action cannot be undone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the custom object to delete.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
    ],
  },
  {
    name: 'pylon_custom_object_get',
    description: `Retrieve a single custom object by its type and ID, including its custom field values.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the custom object.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
    ],
  },
  {
    name: 'pylon_custom_object_update',
    description: `Update a custom object. Only the fields you provide are modified. To update the linked account, pass the built-in Account relationship field in custom_fields, e.g. custom_fields = '{"account":{"value":"account_uuid"}}'. To unset a custom field, pass its slug with an empty value.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the custom object.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Custom field values to set on the object, keyed by field slug, as a JSON-encoded object. Only the provided fields are modified.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the custom object.`,
      },
    ],
  },
  {
    name: 'pylon_custom_objects_bulk_update',
    description: `Applies the same custom field update to multiple custom objects of the given type in a single request. Pass between 1 and 100 IDs and the custom field values to set; only the provided fields are modified on each object. To update the linked account, pass the built-in Account relationship field in custom_fields, e.g. custom_fields = '{"account":{"value":"account_uuid"}}'. To unset a field, pass its slug with an empty value. This mutates every object listed in ids in one call, so double-check the ID list before running.`,
    params: [
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `The IDs of the custom objects to update, as a JSON-encoded array of strings. Must be between 1 and 100 IDs.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
      {
        name: 'custom_fields',
        type: 'string',
        required: false,
        description: `Custom field values to apply to every listed custom object, keyed by field slug, as a JSON-encoded object. To unset a field, pass its slug with an empty value.`,
      },
    ],
  },
  {
    name: 'pylon_custom_objects_list',
    description: `Returns a paginated list of custom objects of the given type (e.g. 'companies'). Use the cursor from the response to page through results.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page. Defaults to 25, max 100.`,
      },
    ],
  },
  {
    name: 'pylon_custom_objects_search',
    description: `Search for custom objects of a given type using a filter. Filterable fields are: name (operators: equals, in, not_in, string_contains, string_does_not_contain, is_set, is_unset), created_at/updated_at in RFC3339 format (operators: time_is_after, time_is_before, time_range), and custom fields (referenced by their slug). Filters can be combined with 'and'/'or' operators using subfilters, up to a depth of 3.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type slug of the custom object.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `The filter to apply, as a JSON-encoded Filter object with field, operator, and value/values (or subfilters for 'and'/'or').`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of results to fetch. Defaults to 25, max 100.`,
      },
    ],
  },
  {
    name: 'pylon_feature_request_create',
    description: `Create a new Pylon feature request. Provide a title and optionally a description. When should_auto_fetch_evidence is true, Pylon asynchronously gathers supporting evidence and generates the description itself, in which case any description you pass is ignored. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the feature request. Required. Example: 'Add dark mode support'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the feature request. Ignored when should_auto_fetch_evidence is true, since the description is then generated from gathered evidence.`,
      },
      {
        name: 'should_auto_fetch_evidence',
        type: 'boolean',
        required: false,
        description: `When true, asynchronously gathers supporting evidence and generates a description, mirroring the in-app experience. Defaults to false, which creates the feature request as-is using the provided description.`,
      },
    ],
  },
  {
    name: 'pylon_feature_request_delete',
    description: `Permanently deletes a Pylon feature request and its associated evidence. This action is irreversible. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the feature request to delete. Required. Example: 'fr_182b0f4e9d3a4c2b'.`,
      },
    ],
  },
  {
    name: 'pylon_feature_request_get',
    description: `Returns a single Pylon feature request by ID. Optionally includes evidence items when fetch_evidence is true. Rate limit: 60 requests per minute.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the feature request to fetch. Example: 'fr_182b0f4e9d3a4c2b'.`,
      },
      {
        name: 'fetch_evidence',
        type: 'boolean',
        required: false,
        description: `Whether to include evidence items in the response. Defaults to false.`,
      },
    ],
  },
  {
    name: 'pylon_feature_request_set_portal_visibility',
    description: `Toggle portal visibility for a set of accounts on a Pylon feature request. Idempotent — adding already-visible accounts or removing already-hidden accounts is a no-op. Note: visibility only takes effect when the Feature Requests tab is enabled in portal settings. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'account_ids',
        type: 'array',
        required: true,
        description: `The account IDs to add or remove portal visibility for. Required. Example: ["acc_123", "acc_456"].`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the feature request. Example: 'fr_182b0f4e9d3a4c2b'.`,
      },
      {
        name: 'visible',
        type: 'boolean',
        required: true,
        description: `Whether the specified accounts should be able to see this feature request in the portal. True to add visibility, false to remove. Required.`,
      },
    ],
  },
  {
    name: 'pylon_feature_request_update',
    description: `Update an existing Pylon feature request by ID. Only provided fields are modified. You can change the request_status (a built-in status like new/in_progress/closed/archived, or a custom status slug) and/or set custom field values. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the feature request to update. Example: 'fr_182b0f4e9d3a4c2b'.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to set. Only passed-in fields will be modified. Each item has a 'slug' (the custom field slug), and either 'value' (for single-valued fields, e.g. select option slug or related object ID) or 'values' (for multi-valued fields like multiselect). Example: [{"slug": "priority_tier", "value": "high"}].`,
      },
      {
        name: 'request_status',
        type: 'string',
        required: false,
        description: `The new request status. Can be a built-in status (new, in_progress, closed, archived) or a custom status slug.`,
      },
    ],
  },
  {
    name: 'pylon_feature_requests_merge',
    description: `Merge one or more Pylon feature requests into a surviving feature request. Evidence and linked external issues are consolidated onto the survivor, and the merged (source) feature requests are archived — this is a destructive, irreversible operation for the merged-away requests. Merge requests that share a target should be sent serially. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'merge_feature_request_ids',
        type: 'array',
        required: true,
        description: `The IDs of the Feature Requests to merge into the surviving Feature Request. Must contain between 1 and 100 unique IDs. Required. Example: ["fr_dup1", "fr_dup2"].`,
      },
      {
        name: 'merge_into_feature_request_id',
        type: 'string',
        required: true,
        description: `The ID of the Feature Request that will survive the merge. Required. Example: 'fr_survivor123'.`,
      },
    ],
  },
  {
    name: 'pylon_feature_requests_search',
    description: `Search or list Pylon feature requests. Supports semantic/keyword search via 'query', filtering by account IDs and request statuses, and a result limit. If query is omitted, all feature requests are returned (subject to the other filters and limit). Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'account_ids',
        type: 'array',
        required: false,
        description: `Filter by one or more account IDs. Returns only feature requests with evidence linked to any of the given accounts. Example: ["acc_123", "acc_456"].`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of feature requests to return. Defaults to 100, max 1000.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `A search query string for semantic and keyword matching. If omitted, all feature requests are returned (subject to other filters and limit).`,
      },
      {
        name: 'request_statuses',
        type: 'array',
        required: false,
        description: `Filter by one or more request statuses. Each value can be a built-in status (new, in_progress, closed, archived) or a custom status slug.`,
      },
    ],
  },
  {
    name: 'pylon_issue_ai_response_create',
    description: `Generate an AI response for a Pylon issue using a specified AI agent. The response can be posted as a customer-facing reply or as an internal note on the issue, depending on post_as_internal_note.`,
    params: [
      {
        name: 'ai_agent_id',
        type: 'string',
        required: true,
        description: `The ID of the AI agent to use to generate the response. Required; identifies which configured Pylon AI agent should produce the response.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or number of the issue to create an AI response for.`,
      },
      {
        name: 'post_as_internal_note',
        type: 'boolean',
        required: false,
        description: `Whether to post the generated AI response as an internal note on the issue rather than a customer-facing reply. Defaults to false, meaning the response is posted as a customer-facing message.`,
      },
    ],
  },
  {
    name: 'pylon_issue_create',
    description: `Creates a new Pylon issue and its first message. Requires either account_id or requester information (requester_id or requester_email). The requester (who the issue is for), the first-message author (user_id or contact_id), and the delivery destination (destination_metadata) are independent settings — see field help for details. If destination_metadata is omitted or set to internal, the first message stays internal and no customer is contacted. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: true,
        description: `The HTML content of the body of the issue's first message. Required. Example: '<p>I cannot access my account.</p>'.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the issue. Required. Example: 'Unable to sign in'.`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `The account this issue belongs to. If requester_id is also provided, the requester must belong to this account. If requester_email is provided, the contact is found or created in this account.`,
      },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `The user the issue should be assigned to.`,
      },
      {
        name: 'attachment_urls',
        type: 'array',
        required: false,
        description: `URLs of files to attach to the issue's first message. Example: ["https://example.com/file.pdf"].`,
      },
      {
        name: 'author_unverified',
        type: 'boolean',
        required: false,
        description: `Whether the requester's identity has NOT been verified. Defaults to false (verified).`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `The contact to attribute the first message to. This controls the message author, not the issue requester. Makes the message appear as a customer message rather than an internal note. Only one of user_id or contact_id can be provided. Requires destination_metadata.`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `Timestamp of when the issue was created. If not specified, the current time will be used. (RFC3339)`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to be used on this issue. Each item has a 'slug' (the custom field slug), and either 'value' (for single-valued fields, e.g. select option slug or related object ID) or 'values' (for multi-valued fields like multiselect). Example: [{"slug": "issue_source", "value": "api"}].`,
      },
      {
        name: 'customer_portal_visible',
        type: 'boolean',
        required: false,
        description: `Whether the issue should be visible in the customer portal.`,
      },
      {
        name: 'destination_metadata',
        type: 'object',
        required: false,
        description: `Specifies if/how communication will be delivered to the customer. If omitted, the first message is internal and no customer is contacted. When provided, 'destination' is required (one of email, slack, in_app_chat, sms, whatsapp, internal), and destination-specific fields apply: email requires 'email' (the configured Pylon sender address); sms requires 'from_sms_phone_number_id'; whatsapp requires 'whatsapp_app_id', 'whatsapp_message_template_name', and 'whatsapp_message_template_language'. Example: {"destination": "email", "email": "support@example.com"}.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `The priority of the issue. Can be one of: urgent, high, medium, or low.`,
      },
      {
        name: 'requester_avatar_url',
        type: 'string',
        required: false,
        description: `The URL of an avatar of the requester.`,
      },
      {
        name: 'requester_email',
        type: 'string',
        required: false,
        description: `The email of the customer this issue is for. Used when requester_id is omitted. If no matching contact exists, one will be created. When account_id is provided, the contact is found or created in that account. This does not control who authored the first message.`,
      },
      {
        name: 'requester_id',
        type: 'string',
        required: false,
        description: `The customer this issue is for. Sets the 'Requester' shown in the issue sidebar but does not control who authored the first message. If account_id is omitted, the requester's primary account is used when available. If requester_email is also provided, requester_id takes precedence.`,
      },
      {
        name: 'requester_name',
        type: 'string',
        required: false,
        description: `The optional full name of the requester. Used when creating a new contact via requester_email.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `An array of strings to use as tags on this issue. If provided, the issue tags will be updated to the given tags. Example: ["billing", "urgent"].`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `The ID of the team this issue should be assigned to.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `The internal Pylon user to attribute the first message to. This does not assign the user as the requester. Only one of user_id or contact_id can be provided. If neither is set, the API token's user is used.`,
      },
    ],
  },
  {
    name: 'pylon_issue_delete',
    description: `Permanently delete an issue from Pylon by its ID. This action cannot be undone and removes the issue and its associated data. Use with caution; verify the issue ID before calling this tool.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue to permanently delete. Accepts Pylon's internal issue ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_issue_external_issue_link',
    description: `Link or unlink an external issue (from a system like Linear, Asana, Jira, GitHub, or Shortcut) to/from a Pylon issue. By default this links the external issue; set operation to "unlink" to remove an existing link instead.`,
    params: [
      {
        name: 'external_issue_id',
        type: 'string',
        required: true,
        description: `The ID of the external issue in the source system.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the Pylon issue to link external issues to.`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `The source system of the external issue, e.g. "linear", "asana", "jira", "github", or "shortcut".`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation to perform. Use "link" to link the external issue (default if omitted) or "unlink" to remove an existing link.`,
      },
    ],
  },
  {
    name: 'pylon_issue_followers_list',
    description: `Retrieve the list of followers (users and contacts) currently subscribed to a Pylon issue. Followers receive notifications about updates to the issue. Use pylon_issue_followers_update to add or remove followers.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to get followers for.`,
      },
    ],
  },
  {
    name: 'pylon_issue_followers_update',
    description: `Add or remove followers (users and/or contacts) on a Pylon issue. By default this adds the given users/contacts as followers; set operation to "remove" to unfollow them instead. Provide at least one of contact_ids or user_ids.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to add or remove followers from.`,
      },
      {
        name: 'contact_ids',
        type: 'array',
        required: false,
        description: `The IDs of contacts to add (or remove, if operation is "remove") as followers. Example: ["9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d"]`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation to perform. Use "add" to add followers (default if omitted) or "remove" to remove followers.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `The IDs of Pylon users to add (or remove, if operation is "remove") as followers. Example: ["8f7e6d5c-4b3a-4291-9c8d-7e6f5a4b3c2d"]`,
      },
    ],
  },
  {
    name: 'pylon_issue_get',
    description: `Retrieve a single Pylon issue by its ID or issue number. Returns the issue's details including title, state, account, assignee, requester, tags, custom fields, and other metadata. Use this to look up an existing issue before updating it, replying to it, or fetching its current state.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to fetch. Accepts either Pylon's internal issue ID (UUID) or the issue's numeric identifier shown in the Pylon UI.`,
      },
    ],
  },
  {
    name: 'pylon_issue_message_delete',
    description: `Permanently delete a message from a Pylon issue and from its connected external system (e.g. email, chat). This action cannot be undone. Use with caution; verify the issue and message IDs before calling this tool.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue that the message belongs to. Accepts Pylon's internal issue ID (UUID).`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to permanently delete.`,
      },
    ],
  },
  {
    name: 'pylon_issue_message_redact',
    description: `Permanently redact the content of a message on a Pylon issue. Redaction removes the message body irreversibly; this action cannot be undone. Use this to comply with data removal requests or to scrub sensitive content from a message.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue that the message belongs to. Accepts Pylon's internal issue ID (UUID).`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message whose content should be permanently redacted.`,
      },
    ],
  },
  {
    name: 'pylon_issue_messages_list',
    description: `Retrieve the messages on a Pylon issue, including customer-visible replies and internal notes, ordered from oldest to newest. Use the returned message IDs when posting a reply (pylon_issue_reply_create) or an internal note (pylon_issue_note_create): pick a customer-visible message where is_private is false and pass its top-level id as message_id to reply, or pick an internal note where is_private is true and pass its thread_id (or top-level id) as thread_id/message_id to post a note. Do not use the nested email_info.message_id for either operation. Omit both limit and cursor to return all messages; otherwise set limit (1-1000) and follow pagination.cursor while pagination.has_next_page is true.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to fetch messages for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pagination cursor to fetch the next page of messages. Obtain this from the pagination.cursor field of the previous response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of messages to fetch, between 1 and 1000. If omitted (along with cursor), all messages for the issue are returned.`,
      },
    ],
  },
  {
    name: 'pylon_issue_note_create',
    description: `Post an internal note on a Pylon issue thread. Internal notes are not visible to the requester/customer. If thread_id is provided, posts to that internal thread. If message_id is provided (the top-level id of an existing internal note from pylon_issue_messages_list), posts to the thread containing that note. Providing both thread_id and message_id returns an error. If neither is provided, posts to the most recently created Slack-backed internal thread, or creates a new Pylon-only internal thread named by thread_name if none exists.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: true,
        description: `The body of the internal note, as HTML.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to post the internal note on.`,
      },
      {
        name: 'attachment_urls',
        type: 'array',
        required: false,
        description: `URLs of files to attach to this internal note. Example: ["https://example.com/file.pdf"]`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: false,
        description: `The ID of an existing internal note whose thread should receive the new note. Use the top-level id from pylon_issue_messages_list for a message where is_private is true. Cannot be combined with thread_id.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `The ID of the internal thread to post the note to. Cannot be combined with message_id.`,
      },
      {
        name: 'thread_name',
        type: 'string',
        required: false,
        description: `Optional name for a new Pylon-only internal thread. Only used when neither thread_id nor message_id is provided and no Slack-backed internal thread already exists.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional user ID to post the message as. If not provided, the API token's user is used.`,
      },
    ],
  },
  {
    name: 'pylon_issue_reply_create',
    description: `Send a customer-facing reply on a Pylon issue, visible to the requester. message_id is required and must be the top-level id of an existing customer-visible message from pylon_issue_messages_list (where is_private is false); this identifies which conversation or thread the reply continues and, for email, controls the In-Reply-To/References threading. For an email conversation, provide email_info with at least one recipient across to_emails, cc_emails, and bcc_emails - recipients are not copied automatically from the referenced message.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: true,
        description: `The body of the reply, as HTML.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to reply to.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The top-level Pylon message ID to reply to, from the id field returned by pylon_issue_messages_list. The message must belong to this issue and must be customer-visible (is_private false), not an internal note. Do not use a provider-specific message ID or email_info.message_id.`,
      },
      {
        name: 'attachment_urls',
        type: 'array',
        required: false,
        description: `URLs of files to attach to this reply. Example: ["https://example.com/file.pdf"]`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `Optional contact ID to post the reply as. Only one of user_id or contact_id can be provided.`,
      },
      {
        name: 'custom_source',
        type: 'object',
        required: false,
        description: `Metadata for messages on custom source issues. Requires external_id. Example: {"external_id": "ext-123", "created_at": "2024-01-01T00:00:00Z"}`,
      },
      {
        name: 'email_info',
        type: 'object',
        required: false,
        description: `Recipient information for replies to email conversations. Provide at least one address across to_emails, cc_emails, and bcc_emails. Example: {"to_emails": ["customer@example.com"], "cc_emails": [], "bcc_emails": []}`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional user ID to post the reply as. Only one of user_id or contact_id can be provided. If neither is provided, the API token's user is used.`,
      },
    ],
  },
  {
    name: 'pylon_issue_snooze',
    description: `Snooze a Pylon issue until a specified date and time. The issue will be hidden from active queues until the snooze period elapses, at which point it becomes active again. This is a reversible, non-destructive state change.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to snooze.`,
      },
      {
        name: 'snooze_until',
        type: 'string',
        required: true,
        description: `The date and time to snooze the issue until, as an RFC 3339 timestamp. The issue will reactivate automatically at this time.`,
      },
    ],
  },
  {
    name: 'pylon_issue_statuses_list',
    description: `Retrieve all issue statuses (states) configured for your Pylon organization, including built-in states like new, waiting_on_you, waiting_on_customer, on_hold, and closed, as well as any custom statuses your workspace has defined. Use this to discover valid values for the state field when updating an issue with pylon_issue_update.`,
    params: [],
  },
  {
    name: 'pylon_issue_thread_create',
    description: `Create a new internal thread on a Pylon issue. Internal threads are used for team collaboration on an issue and are not visible to the customer. Optionally provide a name for the thread.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue to create a thread on. Accepts Pylon's internal issue ID (UUID).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the thread. Optional; if omitted, Pylon assigns a default name to the thread.`,
      },
    ],
  },
  {
    name: 'pylon_issue_threads_list',
    description: `Retrieve all internal threads on a Pylon issue. Threads are internal discussion containers on an issue (distinct from customer-facing messages). Use this to review internal collaboration history on an issue.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue to fetch threads for. Accepts Pylon's internal issue ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_issue_update',
    description: `Update an existing Pylon issue by ID or issue number. Only the fields you provide are modified; all other fields on the issue are left unchanged. Use this to reassign, re-tag, re-team, close, or otherwise change the state of an issue.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or issue number of the issue to update.`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `The ID of the account that this issue belongs to.`,
      },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `The ID of the user who should be assigned to this issue. Pass an empty string to remove the current assignee.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom field values to set on this issue. Only the fields provided are modified. Each item has shape {"slug": "field_slug", "value": "single value"} or {"slug": "field_slug", "values": ["multi", "values"]} for multi-valued fields. For select fields, use the option slug from GET /custom-fields. Example: [{"slug": "priority", "value": "high"}]`,
      },
      {
        name: 'customer_portal_visible',
        type: 'boolean',
        required: false,
        description: `Whether the issue should be visible in the customer portal.`,
      },
      {
        name: 'requester_id',
        type: 'string',
        required: false,
        description: `The ID of the requester (contact) that this issue is on behalf of.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `The state this issue should be moved to. Can be one of new, waiting_on_you, waiting_on_customer, on_hold, closed, or a custom status slug configured in your Pylon workspace (see pylon_issue_statuses_list).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `An array of tag strings to set on this issue. If provided, the issue's tags are replaced entirely with the given list (not merged). Example: ["billing", "urgent"]`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `The ID of the team this issue should be assigned to. Pass an empty string to remove the currently assigned team.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title of the issue.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of the issue. Set to "ticket" to upgrade a conversation to a support ticket. Cannot be downgraded from "ticket" back to "conversation".`,
      },
    ],
  },
  {
    name: 'pylon_issue_voice_calls_list',
    description: `Retrieve voice call records for a Pylon phone issue, including recordings, parsed transcript segments, and a presigned download URL for each audio file. Recordings whose transcript has not yet completed are omitted from the response; refetch later to see them once transcription finishes.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue to fetch voice calls for. Accepts Pylon's internal issue ID (UUID) for a phone issue.`,
      },
    ],
  },
  {
    name: 'pylon_issues_list',
    description: `Returns a paginated list of Pylon issues created within a required time range. The duration between start_time and end_time must be 30 days or less. Use cursor for pagination and limit to control page size (defaults to 20000, max 20000). Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `The end time (RFC3339) of the time range to get issues for. The duration between start_time and end_time must be less than or equal to 30 days. Required. Example: '2024-01-31T00:00:00Z'.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `The start time (RFC3339) of the time range to get issues for. The duration between start_time and end_time must be less than or equal to 30 days. Required. Example: '2024-01-01T00:00:00Z'.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination. Pass the cursor value returned by a previous call to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of issues to fetch. Defaults to 20000. Set to 0 or omit to use the default. Must be between 0 and 20000.`,
      },
    ],
  },
  {
    name: 'pylon_issues_search',
    description: `Search for Pylon issues by a given filter and/or fuzzy text search, with cursor-based pagination. Filterable fields include created_at, account_id, ticket_form_id, requester_id, follower_user_id, follower_contact_id, state, custom field slugs, tags, title, body_html, assignee_id, team_id, issue_type, resolved_at, latest_message_activity_at, updated_at, and slack_channel_id — each with its own allowed operators (equals, in, not_in, contains, string_contains, time_is_after, time_range, is_set, etc). Filters can be combined with 'and'/'or' operators and nested subfilters up to depth 3. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination. Pass the cursor value returned by a previous call to fetch the next page.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `A filter object describing which issues to match. Each filter has a required 'field' and 'operator', plus either 'value' (single-valued operators like equals/contains), 'values' (multi-valued operators like in/not_in), or 'subfilters' (an array of nested Filter objects, only valid when operator is 'and' or 'or'; max nesting depth 3). Example: {"operator": "equals", "field": "state", "value": "new"}. Compound example: {"operator": "and", "field": "", "subfilters": [{"operator": "equals", "field": "state", "value": "new"}, {"operator": "is_set", "field": "assignee_id"}]}.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of issues to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
      {
        name: 'search_text',
        type: 'string',
        required: false,
        description: `Fuzzy text search. Results are intersected with any provided filter.`,
      },
    ],
  },
  {
    name: 'pylon_kb_article_create',
    description: `Create a new article within a Pylon knowledge base. Requires the knowledge base ID, a title, an author user ID, and the HTML body of the article. Optionally place the article in a collection, control publish/unlisted state, set a custom slug, provide translations, and configure visibility. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'author_user_id',
        type: 'string',
        required: true,
        description: `The ID of the user attributed as the author of the article.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: true,
        description: `The HTML body of the article. Example: "<p>Click the reset link in your email...</p>"`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the article is being added to.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the article.` },
      {
        name: 'ai_agent_access',
        type: 'string',
        required: false,
        description: `AI agent access control for this article: inherit (default, defers to parent collection/knowledge base), none, or specific_agents.`,
      },
      {
        name: 'allowed_agent_ids',
        type: 'array',
        required: false,
        description: `List of AI agent IDs allowed to access this article when ai_agent_access is set to specific_agents.`,
      },
      {
        name: 'collection_id',
        type: 'string',
        required: false,
        description: `The ID of the collection this article should be placed in. If omitted, the article is not placed in a collection.`,
      },
      {
        name: 'is_published',
        type: 'boolean',
        required: false,
        description: `Whether the article should be published. Defaults to false (saved as a draft).`,
      },
      {
        name: 'is_unlisted',
        type: 'boolean',
        required: false,
        description: `Whether the article is only accessible via direct link (not listed in navigation/search). Defaults to false.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `The slug of the article. Defaults to a slug generated from the title if omitted.`,
      },
      {
        name: 'translations',
        type: 'array',
        required: false,
        description: `Translations of the article content in different languages. Array of objects, each with required \`language\`, \`title\`, and \`body_html\` fields. Example: [{"language":"es","title":"Como restablecer tu contrasena","body_html":"<p>...</p>"}]`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The visibility setting for the article: public, customer, or internal_only.`,
      },
    ],
  },
  {
    name: 'pylon_kb_article_delete',
    description: `Permanently delete an article from a Pylon knowledge base. This action cannot be undone. Requires the knowledge base ID and the article ID. Rate limit: 20 requests per minute.`,
    params: [
      {
        name: 'article_id',
        type: 'string',
        required: true,
        description: `The ID of the article to delete.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base that the article belongs to.`,
      },
    ],
  },
  {
    name: 'pylon_kb_article_get',
    description: `Retrieve a single article by its ID within a specified knowledge base. Optionally specify a language code to fetch a translated version; if omitted, the default language version is returned.`,
    params: [
      {
        name: 'article_id',
        type: 'string',
        required: true,
        description: `The ID of the article to fetch.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the article belongs to.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `The language code to fetch the article in (e.g. 'es', 'fr'). If not provided, returns the default language version.`,
      },
    ],
  },
  {
    name: 'pylon_kb_article_request_review',
    description: `Request human and/or AI review on an article's current draft version in a Pylon knowledge base. At least one of reviewer_user_ids or request_ai_review must be provided. The article must have an unpublished current version, and requesting AI review requires the organization to have AI article review enabled. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'article_id',
        type: 'string',
        required: true,
        description: `The ID of the article to request review for.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the article belongs to.`,
      },
      {
        name: 'request_ai_review',
        type: 'boolean',
        required: false,
        description: `When true, also queue an AI review. Requires the organization to have AI article review enabled. At least one of reviewer_user_ids or request_ai_review must be provided.`,
      },
      {
        name: 'reviewer_user_ids',
        type: 'array',
        required: false,
        description: `IDs of users to request a human review from. Each user must already be a configured reviewer for the article's knowledge base. At least one of reviewer_user_ids or request_ai_review must be provided.`,
      },
    ],
  },
  {
    name: 'pylon_kb_article_update',
    description: `Update an existing article in a Pylon knowledge base. Only the fields you provide are modified. Supports updating title, HTML body, publish/unlisted state, tags, visibility, and translations. To update a specific translation instead of the default language, pass the language code.`,
    params: [
      {
        name: 'article_id',
        type: 'string',
        required: true,
        description: `The ID of the article to update.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the article belongs to.`,
      },
      {
        name: 'ai_agent_access',
        type: 'string',
        required: false,
        description: `AI agent access control for this article: inherit, none, or specific_agents.`,
      },
      {
        name: 'allowed_agent_ids',
        type: 'array',
        required: false,
        description: `List of AI agent IDs allowed to access this article when ai_agent_access is set to specific_agents.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `The new HTML body of the article.`,
      },
      {
        name: 'is_published',
        type: 'boolean',
        required: false,
        description: `Whether the article should be published or unpublished.`,
      },
      {
        name: 'is_unlisted',
        type: 'boolean',
        required: false,
        description: `Whether the article can only be accessed via direct link.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `The language code of the translation to update. If not provided, the default language (original article) is updated.`,
      },
      {
        name: 'publish_updated_body_html',
        type: 'boolean',
        required: false,
        description: `Whether the changes to the article body should be published immediately. Defaults to false.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: false,
        description: `IDs of article tags to assign. If provided, replaces all tags currently assigned to the article.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title of the article.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The visibility setting for the article: public, customer, or internal_only.`,
      },
    ],
  },
  {
    name: 'pylon_kb_articles_list',
    description: `Retrieve a paginated list of articles in a Pylon knowledge base. Supports cursor-based pagination, limiting the page size, selecting a language, and controlling whether embedded media is included in the article HTML.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base to fetch articles from. Accepts Pylon's internal knowledge base ID (UUID).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pagination cursor to use for fetching the next page of articles. Omit for the first page; use the cursor value returned in a previous response to fetch subsequent pages.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `The language code to fetch articles in (e.g. 'en', 'fr'). If not provided, the knowledge base's default language is returned.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of articles to fetch per page. Must be greater than 0 and less than 1000. Defaults to 100 if not provided.`,
      },
      {
        name: 'media',
        type: 'string',
        required: false,
        description: `Controls whether embedded media is included in the article HTML. Valid values are 'all' (default, includes embedded images, video, audio, and inline media) and 'none' (strips embedded media while preserving descriptive text and standard links).`,
      },
    ],
  },
  {
    name: 'pylon_kb_collection_create',
    description: `Create a new collection within a Pylon knowledge base. Collections organize articles and can be nested under a parent collection. Requires the knowledge base ID and a title; description, slug, parent collection, and visibility are optional.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the collection is being added to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the collection.`,
      },
      {
        name: 'ai_agent_access',
        type: 'string',
        required: false,
        description: `AI agent access control for this collection: inherit (default, defers to parent knowledge base), none, or specific_agents.`,
      },
      {
        name: 'allowed_agent_ids',
        type: 'array',
        required: false,
        description: `List of AI agent IDs allowed to access this collection when ai_agent_access is set to specific_agents.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the collection.`,
      },
      {
        name: 'parent_collection_id',
        type: 'string',
        required: false,
        description: `The ID of the parent collection this collection should be nested under. Omit to create a top-level collection.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `The slug of the collection. Defaults to a slug generated from the title if omitted.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The visibility setting for the collection: public, customer, or internal_only.`,
      },
    ],
  },
  {
    name: 'pylon_kb_collection_delete',
    description: `Permanently delete a collection and all articles within it from a Pylon knowledge base. Nested collections and their articles are also deleted. This action cannot be undone. Rate limit: 10 requests per minute.`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `The ID of the collection to delete.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base that the collection belongs to.`,
      },
    ],
  },
  {
    name: 'pylon_kb_collection_get',
    description: `Retrieve a single collection by its ID within the specified Pylon knowledge base. Returns the collection's title, description, slug, parent collection, and visibility settings.`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `The ID of the collection to fetch.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the collection belongs to.`,
      },
    ],
  },
  {
    name: 'pylon_kb_collection_update',
    description: `Update an existing collection in a Pylon knowledge base. Only the fields you provide are modified. Supports updating the title, description, slug, and visibility settings.`,
    params: [
      {
        name: 'collection_id',
        type: 'string',
        required: true,
        description: `The ID of the collection to update.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base that the collection belongs to.`,
      },
      {
        name: 'ai_agent_access',
        type: 'string',
        required: false,
        description: `AI agent access control for this collection: inherit, none, or specific_agents.`,
      },
      {
        name: 'allowed_agent_ids',
        type: 'array',
        required: false,
        description: `List of AI agent IDs allowed to access this collection when ai_agent_access is set to specific_agents.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description of the collection.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `The new slug of the collection.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title of the collection.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The visibility setting for the collection: public, customer, or internal_only.`,
      },
    ],
  },
  {
    name: 'pylon_kb_collections_list',
    description: `Returns all collections for the specified Pylon knowledge base. Use this to browse the collection hierarchy before creating or updating articles and nested collections.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base to list collections for.`,
      },
    ],
  },
  {
    name: 'pylon_kb_route_redirect_create',
    description: `Create a new path redirect within a knowledge base, mapping a source path to an existing article or collection. Use this to preserve old URLs when content is moved or renamed.`,
    params: [
      {
        name: 'from_path',
        type: 'string',
        required: true,
        description: `The path to redirect from.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base the route redirect is being added to.`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `The ID of the object to redirect to.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of the object to redirect to. Must be "article" or "collection".`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Language of the object to redirect to. If not specified, the default language of the knowledge base will be used.`,
      },
    ],
  },
  {
    name: 'pylon_knowledge_base_get',
    description: `Retrieve a single Pylon knowledge base by its ID. Returns the knowledge base's name and other metadata. Use this to look up details for a specific knowledge base before listing its articles.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the knowledge base to fetch. Accepts Pylon's internal knowledge base ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_knowledge_bases_list',
    description: `Retrieve all knowledge bases configured for the Pylon organization. Returns each knowledge base's ID, name, and other metadata. Use this to discover available knowledge bases before fetching their articles.`,
    params: [],
  },
  {
    name: 'pylon_macro_create',
    description: `Create a new macro (canned response) within a specified macro group. Macros are reusable snippets of text that can be inserted into replies, notes, or emails, optionally scoped by visibility and matching conditions.`,
    params: [
      {
        name: 'macro_group_id',
        type: 'string',
        required: true,
        description: `The ID of the macro group this macro belongs to.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the macro.` },
      {
        name: 'text_html',
        type: 'string',
        required: true,
        description: `The HTML content of the macro.`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: false,
        description: `A filter that determines when this macro is suggested or shown, based on ticket fields.`,
      },
      {
        name: 'text_type',
        type: 'string',
        required: false,
        description: `The type of text: "reply", "note", or "email". Defaults to "reply".`,
      },
      {
        name: 'visibility',
        type: 'object',
        required: false,
        description: `Visibility settings that determine who can use this macro.`,
      },
    ],
  },
  {
    name: 'pylon_macro_delete',
    description: `Permanently delete a macro by ID. This action cannot be undone. Use pylon_macro_get first to confirm you are deleting the correct macro.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the macro to delete.` },
    ],
  },
  {
    name: 'pylon_macro_get',
    description: `Retrieve a single macro by its ID. Returns the macro's name, content, macro group, text type, conditions, and visibility settings.`,
    params: [{ name: 'id', type: 'string', required: true, description: `The ID of the macro.` }],
  },
  {
    name: 'pylon_macro_groups_list',
    description: `Retrieve all macro groups for the organization. Macro groups are used to organize related macros together.`,
    params: [],
  },
  {
    name: 'pylon_macro_update',
    description: `Update an existing macro by ID. All fields are optional; only the fields you provide will be updated. Use pylon_macro_get first to see the macro's current state.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the macro to update.` },
      {
        name: 'conditions',
        type: 'object',
        required: false,
        description: `A filter that determines when this macro is suggested or shown, based on ticket fields.`,
      },
      {
        name: 'macro_group_id',
        type: 'string',
        required: false,
        description: `The ID of the macro group this macro belongs to.`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the macro.` },
      {
        name: 'text_html',
        type: 'string',
        required: false,
        description: `The HTML content of the macro.`,
      },
      {
        name: 'text_type',
        type: 'string',
        required: false,
        description: `The type of text: "reply", "note", or "email".`,
      },
      {
        name: 'visibility',
        type: 'object',
        required: false,
        description: `Visibility settings that determine who can use this macro.`,
      },
    ],
  },
  {
    name: 'pylon_macros_list',
    description: `Retrieve all macros for the organization. Optionally filter by macro group ID to only return macros belonging to a specific group.`,
    params: [
      {
        name: 'macro_group_id',
        type: 'string',
        required: false,
        description: `Filter macros by macro group ID.`,
      },
    ],
  },
  {
    name: 'pylon_me_get',
    description: `Retrieve details of the authenticated organization and user associated with the credentials used for this request. Use this to verify which Pylon account and user the current API token belongs to.`,
    params: [],
  },
  {
    name: 'pylon_milestone_create',
    description: `Create a new milestone within a project. Milestones mark significant checkpoints in a project's progress and can optionally be associated with an account and a due date.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for this milestone` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project ID for this milestone`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `Account ID for this project`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for this milestone, in RFC 3339 format`,
      },
    ],
  },
  {
    name: 'pylon_milestone_delete',
    description: `Permanently delete a Pylon milestone by its ID. This action cannot be undone. Use this only when you are certain the milestone should be removed.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the milestone to delete. Accepts Pylon's internal milestone ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_milestone_get',
    description: `Retrieve a single milestone by its ID. Returns the milestone's name, project, account, due date, and other metadata.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the milestone to fetch.`,
      },
    ],
  },
  {
    name: 'pylon_milestone_update',
    description: `Update an existing Pylon milestone. Only the fields you provide are modified; omitted fields are left unchanged. Use this to rename a milestone or change its due date.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the milestone to update. Accepts Pylon's internal milestone ID (UUID).`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `New due date for this milestone, in RFC 3339 format (e.g. 2024-12-31T00:00:00Z). Optional; if omitted, the existing due date is kept.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for this milestone. Optional; if omitted, the existing name is kept.`,
      },
    ],
  },
  {
    name: 'pylon_project_create',
    description: `Create a new Pylon project for an account. A project is a container for tracking a body of work, optionally linked to a project template, owner, and start/end dates. Requires a name and an account ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the account this project belongs to. Required.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for this project. Required.`,
      },
      {
        name: 'customer_portal_visible',
        type: 'boolean',
        required: false,
        description: `Whether this project is visible to customers in the customer portal. Defaults to false.`,
      },
      {
        name: 'description_html',
        type: 'string',
        required: false,
        description: `Description for this project, as an HTML string. Optional.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for this project, in RFC 3339 format (e.g. 2024-09-30T00:00:00Z). Optional.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `The ID of the user who owns this project. Optional.`,
      },
      {
        name: 'project_template_id',
        type: 'string',
        required: false,
        description: `The ID of the project template to base this project on. Optional.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for this project, in RFC 3339 format (e.g. 2024-07-01T00:00:00Z). Optional.`,
      },
    ],
  },
  {
    name: 'pylon_project_delete',
    description: `Permanently delete an existing Pylon project by its ID. This action cannot be undone. Use this only when you are certain the project should be removed.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the project to delete. Accepts Pylon's internal project ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_project_get',
    description: `Retrieve a single Pylon project by its ID. Returns the project's details including name, status, owner, account, dates, and custom fields. Use this to look up an existing project before updating it or to fetch its current state.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the project to fetch. Accepts Pylon's internal project ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_project_update',
    description: `Update an existing Pylon project. Only the fields you provide are modified; omitted fields are left unchanged. Use this to rename a project, change its owner or dates, archive it, toggle customer portal visibility, or set custom field values.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the project to update. Accepts Pylon's internal project ID (UUID).`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Array of custom field values to set on this project. Only passed-in fields are modified. Shape: [{"slug": "priority", "value": "high"}]. Use "value" for single-valued fields (select fields use the option slug from GET /custom-fields; relationship fields use the related object ID) or "values" for multi-valued fields.`,
      },
      {
        name: 'customer_portal_visible',
        type: 'boolean',
        required: false,
        description: `Whether this project is visible to customers in the customer portal. Optional.`,
      },
      {
        name: 'description_html',
        type: 'string',
        required: false,
        description: `New description for this project, as an HTML string. Optional.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `New end date for this project, in RFC 3339 format (e.g. 2024-09-30T00:00:00Z). Optional.`,
      },
      {
        name: 'is_archived',
        type: 'boolean',
        required: false,
        description: `Whether the project is archived. Optional.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for this project. Optional; if omitted, the existing name is kept.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `The ID of the user to set as the project owner. Optional.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `New start date for this project, in RFC 3339 format (e.g. 2024-07-01T00:00:00Z). Optional.`,
      },
    ],
  },
  {
    name: 'pylon_projects_search',
    description: `Search for Pylon projects using a filter. Filterable fields include account_id (equals, in, not_in, is_set), status (equals, in, not_in; valid values: not_started, in_progress, completed), owner_id (equals, in, not_in, is_set, is_unset), is_archived (equals), created_at and updated_at (time_is_after, time_is_before, time_range, RFC3339), and custom fields by slug. Supports cursor-based pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination, obtained from a previous search response. Optional.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object describing which projects to match. Shape: {"field": "status", "operator": "equals", "value": "in_progress"}. Compound filters use operator "and"/"or" with a "subfilters" array (max depth 3). Valid operators: equals, not_equals, contains, does_not_contain, in, not_in, and, or, time_is_after, time_is_before, time_range, string_contains, string_does_not_contain, is_set, is_unset, greater_than, less_than, greater_than_or_equals, less_than_or_equals.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of projects to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_survey_get',
    description: `Retrieve a single Pylon survey by its ID. Returns the survey's name, configuration, and questions. Use this to look up an existing survey's details.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the survey to fetch. Accepts Pylon's internal survey ID (UUID).`,
      },
    ],
  },
  {
    name: 'pylon_survey_responses_list',
    description: `Returns paginated survey responses for a given survey, optionally filtered by submission time range, account, or contact. Use this to analyze feedback collected through a Pylon survey.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the survey to fetch responses for.`,
      },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `Filter responses by account ID.`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `Filter responses by contact ID.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of responses to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
      {
        name: 'submitted_after',
        type: 'string',
        required: false,
        description: `Filter responses submitted after this time (RFC3339 format).`,
      },
      {
        name: 'submitted_before',
        type: 'string',
        required: false,
        description: `Filter responses submitted before this time (RFC3339 format).`,
      },
    ],
  },
  {
    name: 'pylon_surveys_list',
    description: `Retrieve all surveys configured for the organization. Returns each survey's ID, name, and configuration. Use this to enumerate available surveys before searching or fetching a specific one.`,
    params: [],
  },
  {
    name: 'pylon_surveys_search',
    description: `Search for Pylon surveys using a filter. Currently the only filterable field is updated_at (in RFC3339 format), supporting operators time_is_after, time_is_before, and time_range. Returns a list of matching surveys.`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object describing which surveys to match. Shape: {"field": "updated_at", "operator": "time_is_after", "value": "2024-01-01T00:00:00Z"}. Compound filters use operator "and"/"or" with a "subfilters" array (max depth 3). Valid operators for surveys: time_is_after, time_is_before, time_range.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of surveys to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_tag_create',
    description: `Creates a new tag with the specified value and object type (account, article, or issue). Optionally accepts a hex color for the tag. Use this to define a new tag before applying it to Pylon objects.`,
    params: [
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The object type the tag applies to. Can be "account", "article", or "issue".`,
      },
      { name: 'value', type: 'string', required: true, description: `The tag value.` },
      {
        name: 'hex_color',
        type: 'string',
        required: false,
        description: `The hex code of the tag's color.`,
      },
    ],
  },
  {
    name: 'pylon_tag_delete',
    description: `Permanently deletes a Pylon tag by its ID. This removes the tag definition entirely; any objects it was applied to will no longer show it. This action cannot be undone.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the tag to delete.` },
    ],
  },
  {
    name: 'pylon_tag_get',
    description: `Retrieve a single Pylon tag by its ID. Returns the tag's value, hex color, and the object type it applies to. Use this to look up an existing tag before updating or deleting it.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the tag to fetch.` },
    ],
  },
  {
    name: 'pylon_tag_update',
    description: `Updates an existing Pylon tag by its ID. Only the fields you provide are modified; omitted fields are left unchanged. Use this to rename a tag or change its color.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the tag to update.` },
      {
        name: 'hex_color',
        type: 'string',
        required: false,
        description: `The hex code of the tag's color.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `The new name/value of the tag.`,
      },
    ],
  },
  {
    name: 'pylon_tags_list',
    description: `Returns all tags defined for the organization, including their value, hex color, and the object type (account, article, or issue) they apply to. Use this to discover existing tags before creating or applying new ones.`,
    params: [],
  },
  {
    name: 'pylon_task_comment_create',
    description: `Create a new comment on a Pylon task. The comment body must be provided as HTML. Optionally mark the comment as internal-only, so it is visible only to internal users and not to the customer.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: true,
        description: `The body of the comment in HTML format.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the task to add a comment to.`,
      },
      {
        name: 'is_internal',
        type: 'boolean',
        required: false,
        description: `Whether the comment is visible only to internal users. Optional; defaults to false (visible to the customer) if omitted.`,
      },
    ],
  },
  {
    name: 'pylon_task_comment_delete',
    description: `Permanently delete a comment on a Pylon task. This action cannot be undone.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to delete.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the task the comment belongs to.`,
      },
    ],
  },
  {
    name: 'pylon_task_comment_update',
    description: `Update the body of an existing comment on a Pylon task. Replaces the comment's HTML body with the provided content.`,
    params: [
      {
        name: 'body_html',
        type: 'string',
        required: true,
        description: `The updated body of the comment in HTML format.`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to update.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the task the comment belongs to.`,
      },
    ],
  },
  {
    name: 'pylon_task_comments_list',
    description: `Retrieve all comments on a Pylon task. Returns each comment's body, author, internal/external visibility, and timestamps. Use this to review the discussion history on a task.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the task to fetch comments for.`,
      },
    ],
  },
  {
    name: 'pylon_task_create',
    description: `Creates a new Pylon task with a title and optional metadata such as assignee, account, project, milestone, due date, custom fields, and status. Use this to create follow-up work items linked to accounts, projects, or milestones.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Title for this task.` },
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `Account ID for this task.`,
      },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `Assignee ID for this task.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `Body HTML for this task.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to set on this task. Each entry has a slug and either a single value or a values array for multi-valued fields.`,
      },
      {
        name: 'customer_portal_visible',
        type: 'boolean',
        required: false,
        description: `Customer portal visible for this task.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for this task, in RFC 3339 format.`,
      },
      {
        name: 'milestone_id',
        type: 'string',
        required: false,
        description: `Milestone ID for this task.`,
      },
      {
        name: 'parent_task_id',
        type: 'string',
        required: false,
        description: `Parent task ID, to create this task as a subtask.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Project ID for this task.`,
      },
      { name: 'status', type: 'string', required: false, description: `Status for this task.` },
    ],
  },
  {
    name: 'pylon_task_delete',
    description: `Permanently delete an existing Pylon task by its ID. This action cannot be undone. Use pylon_task_comments_list or pylon_task equivalents to confirm the task before deleting it.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task to delete.` },
    ],
  },
  {
    name: 'pylon_task_get',
    description: `Retrieve a single Pylon task by its ID. Returns the task's title, status, assignee, account, project, milestone, due date, custom fields, and other metadata. Use this to look up an existing task before updating or deleting it.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task to fetch.` },
    ],
  },
  {
    name: 'pylon_task_update',
    description: `Update an existing Pylon task by its ID. Only the fields you provide are modified; omitted fields are left unchanged. Supports updating the assignee, title, body, due date, status, project, milestone, customer portal visibility, and custom fields.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task to update.` },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `Assignee ID for this task. Optional; if omitted, the assignee is left unchanged.`,
      },
      {
        name: 'body_html',
        type: 'string',
        required: false,
        description: `Body HTML for this task. Optional; if omitted, the body is left unchanged.`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `An array of custom fields to update on this task. Only the passed-in fields are modified. Each entry has a slug and either a single value or an array of values (for multi-valued fields like multiselect).`,
      },
      {
        name: 'customer_portal_visible',
        type: 'boolean',
        required: false,
        description: `Whether this task is visible in the customer portal. Optional; if omitted, left unchanged.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for this task, in RFC 3339 format. Optional; if omitted, left unchanged.`,
      },
      {
        name: 'milestone_id',
        type: 'string',
        required: false,
        description: `Milestone ID for this task. Optional; if omitted, left unchanged.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Project ID for this task. Optional; if omitted, left unchanged.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status for this task. Optional; if omitted, left unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title for this task. Optional; if omitted, left unchanged.`,
      },
    ],
  },
  {
    name: 'pylon_tasks_list',
    description: `Returns a paginated list of tasks for the organization. Use this to browse all tasks; use pylon_tasks_search instead if you need to filter tasks by account, project, status, assignee, or other fields.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of tasks to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_tasks_search',
    description: `Searches for tasks matching a given filter. Filterable fields are account_id, project_id, status, assignee_id, milestone_id, created_at, due_date, updated_at, and custom field slugs. Filters support operators like equals, in, not_in, is_set, is_unset, time_is_after, time_is_before, time_range, and compound and/or filters up to 3 levels deep. Use this instead of pylon_tasks_list when you need to filter tasks by specific criteria.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `The filter tree to apply. A single filter object with a 'field' and 'operator', plus 'value'/'values' for leaf filters, or 'subfilters' (an array of filter objects) when operator is 'and' or 'or'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The number of tasks to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
  {
    name: 'pylon_team_create',
    description: `Create a new team in Pylon with a name and an optional list of member user IDs.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the team.` },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `The list of user IDs to add to the team. Optional; if omitted, the team is created with no members.`,
      },
    ],
  },
  {
    name: 'pylon_team_get',
    description: `Retrieve a single Pylon team by its ID. Returns the team's name and member list.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the team to fetch.` },
    ],
  },
  {
    name: 'pylon_team_update',
    description: `Update an existing Pylon team's name and/or member list. If user_ids is provided, the team's members are replaced to be exactly the given users. Only the fields you provide are modified.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the team to update.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated name of the team. Optional; if omitted, the name is left unchanged.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `The list of user IDs to set as the team's members. If provided, the team's members are replaced to be exactly these users. Optional; if omitted, the team's members are left unchanged.`,
      },
    ],
  },
  {
    name: 'pylon_teams_list',
    description: `Retrieve all teams for the organization. Returns each team's ID, name, and member list. Use this to look up a team's ID before fetching, creating, or updating team assignments.`,
    params: [],
  },
  {
    name: 'pylon_ticket_form_get',
    description: `Retrieve a single ticket form by its ID. Returns the form's field definitions and layout configuration. Use pylon_ticket_forms_list to discover valid ticket form IDs.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the ticket form to fetch.`,
      },
    ],
  },
  {
    name: 'pylon_ticket_forms_list',
    description: `Returns all ticket forms configured for the organization. Ticket forms define the fields and layout customers or agents see when submitting a ticket. Use this to discover available forms before fetching a specific one by ID.`,
    params: [],
  },
  {
    name: 'pylon_training_data_create',
    description: `Create a new training data configuration (container) for the organization. Training data containers hold documents (files or text content) that power Pylon's AI agent responses. After creating a container, add documents to it with pylon_training_data_upload_files or pylon_training_data_upload_content.`,
    params: [
      {
        name: 'training_data_name',
        type: 'string',
        required: false,
        description: `The name of the training data container.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The visibility of the training data. Defaults to 'everyone' if not provided.`,
      },
    ],
  },
  {
    name: 'pylon_training_data_documents_delete',
    description: `Permanently removes one or more documents from a training data configuration by document ID or external ID. Once deleted, the documents will no longer be used to power Pylon's AI agent responses. Provide document_ids and/or external_ids to identify which documents to remove.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the training data configuration to delete documents from.`,
      },
      {
        name: 'document_ids',
        type: 'array',
        required: false,
        description: `Document IDs to delete.`,
      },
      {
        name: 'external_ids',
        type: 'array',
        required: false,
        description: `External IDs to delete.`,
      },
    ],
  },
  {
    name: 'pylon_training_data_get',
    description: `Retrieve a single training data configuration by its ID. Returns the container's name, visibility, and metadata about the documents it holds. Use pylon_training_data_list to discover valid training data IDs.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the training data configuration to fetch.`,
      },
    ],
  },
  {
    name: 'pylon_training_data_list',
    description: `Returns all training data configurations for the organization. Training data configurations are containers of documents (files or text content) that power Pylon's AI agent responses. Use this to discover existing training data containers before adding documents to them.`,
    params: [],
  },
  {
    name: 'pylon_training_data_upload_content',
    description: `Upload plain text content as a training data document, either into a new training data container or an existing one. Use this when you have raw text (not a file) that should power Pylon's AI agent responses. Provide either training_data_id (to add to an existing container) or training_data_name (to create a new one).`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The text content to upload.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The name for the uploaded document.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `External ID for idempotent operations (optional).`,
      },
      {
        name: 'training_data_id',
        type: 'string',
        required: false,
        description: `The ID of an existing training data container to upload to. Required if training_data_name is not provided.`,
      },
      {
        name: 'training_data_name',
        type: 'string',
        required: false,
        description: `The name of a new training data container to create. Required if training_data_id is not provided.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility of the training data. Defaults to 'everyone'.`,
      },
    ],
  },
  {
    name: 'pylon_training_data_upload_files',
    description: `Upload a single file as training data, either into a new training data container or an existing one. The file content must be supplied as a base64-encoded string. Supported file types are PDF, plain text, markdown, CSV, JSON, and images (JPEG, PNG, GIF, WebP), up to 50MB. Provide either training_data_id (to add to an existing container) or training_data_name (to create a new one).`,
    params: [
      {
        name: 'file_content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded contents of the file to upload.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The name for the uploaded file, including extension.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `External ID for idempotent operations. Used for duplicate detection and updates.`,
      },
      {
        name: 'training_data_id',
        type: 'string',
        required: false,
        description: `The ID of an existing training data container to upload the file to. Required if training_data_name is not provided.`,
      },
      {
        name: 'training_data_name',
        type: 'string',
        required: false,
        description: `The name of a new training data container to create. Required if training_data_id is not provided.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility of the training data. Defaults to 'everyone'.`,
      },
    ],
  },
  {
    name: 'pylon_user_get',
    description: `Retrieve a single Pylon user by their ID. Returns the user's details including name, email, avatar, role, and status. Use this to look up an existing user before updating it or to fetch its current state.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the user to fetch.` },
    ],
  },
  {
    name: 'pylon_user_roles_list',
    description: `Returns all user roles configured for the organization, including their names and permission sets. Use this to look up valid role identifiers when creating or updating users.`,
    params: [],
  },
  {
    name: 'pylon_user_update',
    description: `Update an existing Pylon user. Only the fields you provide are modified; omitted fields are left unchanged. Supports updating the user's name, avatar URL, role, and status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the user to update.` },
      {
        name: 'avatar_url',
        type: 'string',
        required: false,
        description: `The avatar URL of the user. Must be a square .png, .jpg or .jpeg.`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the user.` },
      { name: 'role_id', type: 'string', required: false, description: `The role_id of the user.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The new user status for the user. Can be one of \`active\`, \`away\`, or \`out_of_office\`.`,
      },
    ],
  },
  {
    name: 'pylon_users_list',
    description: `Returns all users (agents/teammates) for the organization, including their name, email, and role. Use this to look up user IDs before assigning them to issues or account relationships.`,
    params: [],
  },
  {
    name: 'pylon_users_search',
    description: `Search for Pylon users using a filter. Currently, the only filterable field is \`email\`, using the \`equals\`, \`in\`, or \`not_in\` operators. Supports cursor-based pagination. Returns a page of matching users and a cursor for fetching the next page, if any.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to use for pagination. Pass the cursor returned from a previous search response to fetch the next page of results.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object describing which users to match. Structure: {"field": "email", "operator": "equals", "value": "alice@example.com"} for a single match, or use "operator": "in"/"not_in" with "values": ["a@example.com", "b@example.com"] to match multiple emails. Currently only the "email" field is filterable.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `The number of users to fetch. Defaults to 100. Must be greater than 0 and less than 1000.`,
      },
    ],
  },
]
