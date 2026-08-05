import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'resend_api_key_create',
    description: `Create a new API key for the Resend account. The full token is only returned once in the response of this call and cannot be retrieved again afterwards, so it must be saved immediately. By default the key has full_access permission; restrict it to sending_access to only allow sending emails, optionally scoped to a single domain.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A descriptive name for the API key, e.g. "Production" or "CI Pipeline".`,
      },
      {
        name: 'domain_id',
        type: 'string',
        required: false,
        description: `Restrict this API key to only send emails from a specific verified domain. Only used when permission is sending_access; ignored otherwise.`,
      },
      {
        name: 'permission',
        type: 'string',
        required: false,
        description: `The API key's access level. "full_access" can create, delete, get, and update any resource. "sending_access" can only send emails. If omitted, the key defaults to full_access.`,
      },
    ],
  },
  {
    name: 'resend_api_key_delete',
    description: `Permanently remove an existing API key from the Resend account. This is destructive and cannot be undone -- any application currently authenticating with this key will immediately lose access.`,
    params: [
      {
        name: 'api_key_id',
        type: 'string',
        required: true,
        description: `The ID of the API key to remove.`,
      },
    ],
  },
  {
    name: 'resend_api_key_list',
    description: `Retrieve a list of API keys configured on the Resend account, including each key's name, creation date, and permission level. The full token value is never returned by this endpoint (only shown once at creation time). Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_api_key_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of an API key from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of an API key from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of API keys to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_automation_create',
    description: `Create a new automation workflow in Resend. An automation is a graph of steps (must include at least one "trigger" step) connected by edges describing the flow between them. Supported step types: trigger, send_email, delay, wait_for_event, condition, contact_update, contact_delete, add_to_segment -- each with a type-specific "config" object. The automation is created disabled by default; pass status="enabled" to activate it immediately.`,
    params: [
      {
        name: 'connections',
        type: 'array',
        required: true,
        description: `The connections (edges) between steps in the automation graph. Each connection has a "from" step key, a "to" step key, and an optional "type" (default, condition_met, condition_not_met, timeout, event_received) which defaults to "default". Example: [{"from":"trigger1","to":"send1"}]`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the automation, shown in the Resend dashboard.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `The steps that compose the automation workflow. Must include at least one "trigger" step (1-150 steps total). Each step has a unique "key", a "type", and a "config" object whose shape depends on the type: trigger={event_name}, send_email={template:{id,variables?},subject?,from?,reply_to?}, delay={duration}, wait_for_event={event_name,timeout?,filter_rule?}, condition={type:rule|and|or, field, operator, value}, contact_update={first_name?,last_name?,unsubscribed?,properties?}, contact_delete={}, add_to_segment={segment_id}. Example: [{"key":"trigger1","type":"trigger","config":{"event_name":"contact.created"}}]`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The initial status of the automation. One of "enabled" or "disabled". Defaults to "disabled" if omitted, so the automation is created but not yet running.`,
      },
    ],
  },
  {
    name: 'resend_automation_delete',
    description: `Permanently delete an existing automation from the Resend account. This is destructive and cannot be undone -- any contacts currently mid-workflow in this automation will stop being processed by it.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation to delete.`,
      },
    ],
  },
  {
    name: 'resend_automation_get',
    description: `Retrieve the full details of a single automation by ID, including its name, status, and the steps and connections that make up its active workflow graph.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_automation_list',
    description: `Retrieve a list of automations configured in the Resend account, optionally filtered by status. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass status="enabled" to only see active automations.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of an automation from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of an automation from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of automations to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter automations by status. One of "enabled" or "disabled". Leave blank to return automations of all statuses.`,
      },
    ],
  },
  {
    name: 'resend_automation_run_get',
    description: `Retrieve the full details of a single automation run, including its status (running, completed, failed, cancelled), start/completion timestamps, and the steps executed so far in graph order.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation this run belongs to.`,
      },
      {
        name: 'run_id',
        type: 'string',
        required: true,
        description: `The ID of the automation run to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_automation_runs_list',
    description: `Retrieve a list of runs (executions) for a given automation, optionally filtered by status. Each run shows its execution status and the steps it has passed through. Supports cursor-based pagination via limit/after/before.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation whose runs should be listed.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a run from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a run from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of runs to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter runs by status. Comma-separated list of one or more of: running, completed, failed, cancelled. Example: "running,completed".`,
      },
    ],
  },
  {
    name: 'resend_automation_stop',
    description: `Stop a running automation, setting its status to disabled so it no longer triggers for new events. Existing in-flight runs are not resumed. Calling this on an automation that is already stopped has no additional effect.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation to stop.`,
      },
    ],
  },
  {
    name: 'resend_automation_update',
    description: `Update an existing automation in Resend. At least one of name, status, or the (steps + connections) pair must be provided. When updating the workflow graph, steps and connections must both be provided together -- providing one without the other is rejected by the API.`,
    params: [
      {
        name: 'automation_id',
        type: 'string',
        required: true,
        description: `The ID of the automation to update.`,
      },
      {
        name: 'connections',
        type: 'array',
        required: false,
        description: `Replacement set of connections (edges) between steps. Must be provided together with steps; providing only one is rejected. Each connection has a from step key, a to step key, and an optional type (defaults to "default").`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the automation.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status for the automation. One of "enabled" or "disabled".`,
      },
      {
        name: 'steps',
        type: 'array',
        required: false,
        description: `Replacement set of steps for the automation workflow (1-150 steps). Must be provided together with connections; providing only one is rejected. Each step has a unique key, a type, and a type-specific config object (see Create Automation for the full shape catalog).`,
      },
    ],
  },
  {
    name: 'resend_broadcast_create',
    description: `Create a broadcast email in Resend, targeted at a segment of contacts. A broadcast is created as a draft by default -- pass send=true to send it immediately, or send=true with scheduled_at to schedule it for later. Provide html and/or text content for the message body -- at least one of the two is required by the API.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>". The domain must be a verified sending domain in your Resend account.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the segment (of contacts within an audience) this broadcast will be sent to.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `The subject line of the broadcast email.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `The HTML version of the broadcast message body. At least one of html or text must be provided.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Internal name of the broadcast, used to identify it in the Resend dashboard. Not shown to recipients.`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Short preview text shown next to the subject line in most email clients' inbox lists.`,
      },
      {
        name: 'reply_to',
        type: 'array',
        required: false,
        description: `The email address(es) that recipient replies should be sent to. Provide an array of one or more email address strings.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `Schedule time to send the broadcast, in ISO 8601 format (natural language like "in 1 hour" is also accepted). Can only be used when send is true.`,
      },
      {
        name: 'send',
        type: 'boolean',
        required: false,
        description: `Whether to send the broadcast immediately (or schedule it, if scheduled_at is also provided) instead of keeping it as a draft. Defaults to false (draft).`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The plain text version of the broadcast message body. At least one of html or text must be provided.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `The topic ID that this broadcast will be scoped to. Recipients who have opted out of this topic will not receive the broadcast.`,
      },
    ],
  },
  {
    name: 'resend_broadcast_delete',
    description: `Permanently remove an existing broadcast from the Resend account. Only broadcasts in the draft status can be removed -- broadcasts that have already been sent or scheduled cannot be deleted this way. This is destructive and cannot be undone.`,
    params: [
      {
        name: 'broadcast_id',
        type: 'string',
        required: true,
        description: `The ID of the draft broadcast to remove.`,
      },
    ],
  },
  {
    name: 'resend_broadcast_get',
    description: `Retrieve details of a single broadcast by ID, including its status (draft, scheduled, sending, sent, canceled), subject, sender, content, and target segment.`,
    params: [
      {
        name: 'broadcast_id',
        type: 'string',
        required: true,
        description: `The ID of the broadcast to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_broadcast_list',
    description: `Retrieve a list of broadcasts configured on the Resend account, including each broadcast's name, status, subject, and creation date. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_broadcast_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a broadcast from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a broadcast from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of broadcasts to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_broadcast_send',
    description: `Send a draft broadcast immediately, or schedule it for a future time by providing scheduled_at. Once sent or scheduled, the broadcast can no longer be edited or deleted (a scheduled broadcast can typically still be canceled from the Resend dashboard before it goes out).`,
    params: [
      {
        name: 'broadcast_id',
        type: 'string',
        required: true,
        description: `The ID of the broadcast to send or schedule.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `Schedule time to send the broadcast, in ISO 8601 format (natural language like "in 1 hour" is also accepted). Leave blank to send immediately.`,
      },
    ],
  },
  {
    name: 'resend_broadcast_update',
    description: `Update an existing broadcast in Resend. All fields besides broadcast_id are optional; only the ones provided are changed. Typically used to edit a draft broadcast's content, sender, subject, or target segment before sending it.`,
    params: [
      {
        name: 'broadcast_id',
        type: 'string',
        required: true,
        description: `The ID of the broadcast to update.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>". The domain must be a verified sending domain in your Resend account.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `The HTML version of the broadcast message body.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Internal name of the broadcast, used to identify it in the Resend dashboard. Not shown to recipients.`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Short preview text shown next to the subject line in most email clients' inbox lists.`,
      },
      {
        name: 'reply_to',
        type: 'array',
        required: false,
        description: `The email address(es) that recipient replies should be sent to. Provide an array of one or more email address strings.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the segment (of contacts within an audience) this broadcast will be sent to.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `The subject line of the broadcast email.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The plain text version of the broadcast message body.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `The topic ID that this broadcast will be scoped to. Recipients who have opted out of this topic will not receive the broadcast.`,
      },
    ],
  },
  {
    name: 'resend_contact_create',
    description: `Create a new contact in the Resend account. Requires an email address; first_name, last_name, unsubscribed status, custom properties, segment membership, and topic subscriptions can all be set optionally. Returns the newly created contact's ID.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the contact to create.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name of the contact.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Last name of the contact.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `A map of custom property keys and values to create on this contact, e.g. {"plan": "pro", "signup_source": "website"}.`,
      },
      {
        name: 'segments',
        type: 'array',
        required: false,
        description: `Array of segment IDs to add the contact to on creation.`,
      },
      {
        name: 'topics',
        type: 'array',
        required: false,
        description: `Array of topic subscriptions for the contact. Each item is an object with id (topic ID) and subscription ("opt_in" or "opt_out").`,
      },
      {
        name: 'unsubscribed',
        type: 'boolean',
        required: false,
        description: `The contact's global subscription status. If true, the contact is unsubscribed from all Broadcasts. Defaults to false (subscribed) if omitted.`,
      },
    ],
  },
  {
    name: 'resend_contact_delete',
    description: `Permanently remove an existing contact from the Resend account by ID or email address. This is destructive and cannot be undone.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact to remove.`,
      },
    ],
  },
  {
    name: 'resend_contact_get',
    description: `Retrieve a single contact by ID or email address, including name, subscription status, creation date, and any custom properties.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_contact_import_create',
    description: `Create a bulk contact import from a CSV file (max 50MB). Provide the file as base64-encoded content. Optionally map CSV columns to contact fields/custom properties via column_map, choose a conflict strategy for existing contacts, and pre-assign imported contacts to segments and/or topic subscriptions.`,
    params: [
      {
        name: 'file_content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded contents of the CSV file to import. Maximum file size is 50MB.`,
      },
      {
        name: 'column_map',
        type: 'string',
        required: false,
        description: `JSON-encoded object mapping contact fields and custom property keys to CSV column names. Supports email, first_name, last_name, unsubscribed, and properties. Custom property mappings can include type as string, number, or boolean; defaults to string. Example: {"email":"Email","first_name":"First Name","properties":{"plan":{"column":"Plan","type":"string"}}}`,
      },
      {
        name: 'on_conflict',
        type: 'string',
        required: false,
        description: `Strategy to use when an imported contact already exists. One of: upsert, skip. Defaults to skip.`,
      },
      {
        name: 'segments',
        type: 'string',
        required: false,
        description: `JSON-encoded array of segments to add imported contacts to, e.g. [{"id":"78261eea-8f8b-4381-83c6-79fa7120f1cf"}].`,
      },
      {
        name: 'topics',
        type: 'string',
        required: false,
        description: `JSON-encoded array of topic subscriptions to apply to imported contacts. Each subscription must be opt_in or opt_out. Example: [{"id":"b6d24b8e-af0b-4c3c-be0c-359bbd97381e","subscription":"opt_in"}].`,
      },
    ],
  },
  {
    name: 'resend_contact_import_get',
    description: `Retrieve the status and details of a single contact import by ID, including its current status (queued, in_progress, completed, or failed), creation/completion timestamps, and counts.`,
    params: [
      {
        name: 'import_id',
        type: 'string',
        required: true,
        description: `The Contact Import ID (UUID) to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_contact_import_list',
    description: `Retrieve a list of contact imports for the Resend account, optionally filtered by status. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_import_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a contact import from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a contact import from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of contact imports to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter contact imports by status. One of: queued, in_progress, completed, failed.`,
      },
    ],
  },
  {
    name: 'resend_contact_list',
    description: `Retrieve a list of contacts in the Resend account. Optionally filter by segment_id. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_contact_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a contact from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a contact from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of contacts to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: false,
        description: `Filter contacts by segment ID. Only contacts that belong to this segment are returned.`,
      },
    ],
  },
  {
    name: 'resend_contact_property_create',
    description: `Create a new contact property (a custom field definition that can be set on individual contacts). Requires a key and a type ("string" or "number"); an optional fallback_value can be set as the default used when a contact doesn't have this property set. Returns the newly created contact property's ID.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The property key. Maximum length is 50 characters. Only alphanumeric characters and underscores are allowed.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The property type. Must be either "string" or "number".`,
      },
      {
        name: 'fallback_value',
        type: 'string',
        required: false,
        description: `The default value to use when this property is not set for a contact. Must match the type specified in the type field (a string value if type is "string", a number value if type is "number").`,
      },
    ],
  },
  {
    name: 'resend_contact_property_delete',
    description: `Permanently remove an existing contact property (custom field definition) from the Resend account. This is destructive and cannot be undone -- the property definition and any values stored under it on individual contacts will no longer be accessible.`,
    params: [
      {
        name: 'contact_property_id',
        type: 'string',
        required: true,
        description: `The ID of the contact property to permanently remove.`,
      },
    ],
  },
  {
    name: 'resend_contact_property_get',
    description: `Retrieve a single contact property (custom field definition) by ID, including its key, type, fallback value, and creation date.`,
    params: [
      {
        name: 'contact_property_id',
        type: 'string',
        required: true,
        description: `The ID of the contact property to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_contact_property_list',
    description: `Retrieve a list of contact properties (custom field definitions) configured in the Resend account, including each property's key, type, fallback value, and creation date. Supports cursor-based pagination via limit/after/before.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a contact property from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a contact property from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of contact properties to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_contact_property_update',
    description: `Update an existing contact property by ID. Only the fallback_value can be changed; it must match the property's original type (a string value if the property type is "string", a number value if the property type is "number"). If fallback_value is omitted, it will be cleared (set to no default) -- there is no way to make a no-op update call.`,
    params: [
      {
        name: 'contact_property_id',
        type: 'string',
        required: true,
        description: `The ID of the contact property to update.`,
      },
      {
        name: 'fallback_value',
        type: 'string',
        required: false,
        description: `New default value to use when this property is not set for a contact. Must match the property's type (a string value if type is "string", a number value if type is "number").`,
      },
    ],
  },
  {
    name: 'resend_contact_segment_add',
    description: `Add a contact to a segment by contact ID (or email) and segment ID. No request body is required.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact to add to the segment.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The Segment ID to add the contact to.`,
      },
    ],
  },
  {
    name: 'resend_contact_segment_remove',
    description: `Remove a contact from a segment by contact ID (or email) and segment ID. This only removes the segment membership -- it does not delete the contact or the segment itself. No request body is required.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact to remove from the segment.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The Segment ID to remove the contact from.`,
      },
    ],
  },
  {
    name: 'resend_contact_segments_list',
    description: `Retrieve a list of segments that a given contact belongs to. Supports cursor-based pagination via limit/after/before.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact whose segments to list.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a segment from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a segment from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of segments to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_contact_topics_get',
    description: `Retrieve the topic subscription state for a contact -- for each topic, its ID, name, description, and whether the contact is opted in or opted out. Identify the contact by ID or email. Supports cursor-based pagination via limit/after/before.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact whose topic subscriptions to retrieve.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a topic from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a topic from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of topics to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_contact_topics_update',
    description: `Update topic subscriptions for a contact, identified by ID or email. Provide an array of {id, subscription} objects, where subscription is either "opt_in" or "opt_out". Only the topics included in the array are changed; topics not mentioned are left as-is.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact whose topic subscriptions to update.`,
      },
      {
        name: 'topics',
        type: 'array',
        required: true,
        description: `Array of topic subscriptions to apply to the contact. Each item is an object with id (the topic ID) and subscription ("opt_in" or "opt_out"). Example: [{"id": "b6d24b8e-af0b-4c3c-be0c-359bbd97381e", "subscription": "opt_in"}].`,
      },
    ],
  },
  {
    name: 'resend_contact_update',
    description: `Update a single contact by ID or email address. Only the fields provided are updated; omitted fields are left unchanged.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Contact ID (UUID) or email address of the contact to update.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `New email address for the contact.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `New first name for the contact.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `New last name for the contact.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `A map of custom property keys and values to update on this contact, e.g. {"plan": "enterprise"}.`,
      },
      {
        name: 'unsubscribed',
        type: 'boolean',
        required: false,
        description: `The contact's global subscription status. If true, the contact is unsubscribed from all Broadcasts.`,
      },
    ],
  },
  {
    name: 'resend_domain_claim',
    description: `Advanced/enterprise workflow: start a claim for a domain that another Resend account has already verified. The domain is recreated under your account with fresh DKIM keys, so the previous account's DNS records cannot be reused. Returns a TXT record to add to your DNS to prove ownership. Uses the same request shape as creating a domain. If an identical pending claim already exists, it is returned unchanged.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain you want to claim from another Resend account, e.g. "example.com".`,
      },
      {
        name: 'click_tracking',
        type: 'boolean',
        required: false,
        description: `Whether to track clicks on links within the body of HTML emails sent from this domain once claimed.`,
      },
      {
        name: 'custom_return_path',
        type: 'string',
        required: false,
        description: `Advanced: a custom subdomain to use for the Return-Path address, e.g. "send" produces send.example.com. Defaults to "send".`,
      },
      {
        name: 'open_tracking',
        type: 'boolean',
        required: false,
        description: `Whether to track the open rate of each email sent from this domain once claimed.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `The region where emails will be sent from once the claim is completed. One of: us-east-1, eu-west-1, sa-east-1, ap-northeast-1. Defaults to us-east-1.`,
      },
      {
        name: 'tracking_subdomain',
        type: 'string',
        required: false,
        description: `The subdomain to use for click and open tracking links once claimed, e.g. "track" produces track.example.com.`,
      },
    ],
  },
  {
    name: 'resend_domain_claim_get',
    description: `Retrieve the latest status of a domain claim, using the ID of the placeholder domain created when the claim was started. Status is one of: pending, verified, completed, blocked, expired, superseded, canceled, or failed.`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: true,
        description: `The ID of the placeholder domain created by the claim (returned as "domain_id" in the claim-domain response).`,
      },
    ],
  },
  {
    name: 'resend_domain_claim_verify',
    description: `Trigger asynchronous DNS verification and ownership transfer for a pending domain claim, using the ID of the placeholder domain created when the claim was started. The claim stays "pending" while verification runs; poll resend_domain_claim_get for status. Once "completed", the transferred domain has new DKIM records that must be added to DNS and verified via resend_domain_verify.`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: true,
        description: `The ID of the placeholder domain created by the claim (returned as "domain_id" in the claim-domain response).`,
      },
    ],
  },
  {
    name: 'resend_domain_create',
    description: `Create a new sending domain in the Resend account. Only the domain name is required; region, TLS mode, return-path subdomain, click/open tracking, tracking subdomain, and sending/receiving capabilities can be configured optionally. After creation, add the returned DNS records to your domain provider and call the verify-domain tool to activate it.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name you want to send (and optionally receive) email from, e.g. "example.com".`,
      },
      {
        name: 'capabilities',
        type: 'object',
        required: false,
        description: `Configure whether this domain can send and/or receive email. Object shape: {"sending": "enabled"|"disabled", "receiving": "enabled"|"disabled"}. At least one capability must be enabled. Example: {"sending": "enabled", "receiving": "disabled"}.`,
      },
      {
        name: 'click_tracking',
        type: 'boolean',
        required: false,
        description: `Whether to track clicks on links within the body of HTML emails sent from this domain.`,
      },
      {
        name: 'custom_return_path',
        type: 'string',
        required: false,
        description: `Advanced: a custom subdomain to use for the Return-Path address, e.g. "send" produces send.example.com. Defaults to "send".`,
      },
      {
        name: 'open_tracking',
        type: 'boolean',
        required: false,
        description: `Whether to track the open rate of each email sent from this domain.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `The region where emails will be sent from. One of: us-east-1, eu-west-1, sa-east-1, ap-northeast-1. Defaults to us-east-1.`,
      },
      {
        name: 'tls',
        type: 'string',
        required: false,
        description: `TLS delivery mode. "opportunistic" attempts a secure connection but falls back to unencrypted delivery if the recipient doesn't support TLS. "enforced" requires TLS or the email will not be sent. Defaults to opportunistic.`,
      },
      {
        name: 'tracking_subdomain',
        type: 'string',
        required: false,
        description: `The subdomain to use for click and open tracking links, e.g. "track" produces track.example.com.`,
      },
    ],
  },
  {
    name: 'resend_domain_delete',
    description: `Permanently remove an existing sending domain from the Resend account. This is destructive and cannot be undone -- any emails still pending delivery through this domain, or automations/webhooks relying on it, will stop working.`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: true,
        description: `The ID of the domain to remove.`,
      },
    ],
  },
  {
    name: 'resend_domain_get',
    description: `Retrieve a single sending domain by ID, including its verification status, region, sending/receiving capabilities, DNS records, and tracking settings.`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: true,
        description: `The ID of the domain to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_domain_list',
    description: `Retrieve a list of sending domains configured in the Resend account, including each domain's verification status, region, and creation date. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_domain_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a domain from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a domain from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of domains to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_domain_update',
    description: `Update settings on an existing sending domain: click/open tracking, TLS mode, tracking subdomain, and sending/receiving capabilities. All fields are optional; only the ones provided are changed.`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: true,
        description: `The ID of the domain to update.`,
      },
      {
        name: 'capabilities',
        type: 'object',
        required: false,
        description: `Configure whether this domain can send and/or receive email. Object shape: {"sending": "enabled"|"disabled", "receiving": "enabled"|"disabled"}. At least one capability must be enabled. Example: {"sending": "enabled", "receiving": "disabled"}.`,
      },
      {
        name: 'click_tracking',
        type: 'boolean',
        required: false,
        description: `Whether to track clicks on links within the body of HTML emails sent from this domain.`,
      },
      {
        name: 'open_tracking',
        type: 'boolean',
        required: false,
        description: `Whether to track the open rate of each email sent from this domain.`,
      },
      {
        name: 'tls',
        type: 'string',
        required: false,
        description: `TLS delivery mode. "opportunistic" attempts a secure connection but falls back to unencrypted delivery if the recipient doesn't support TLS. "enforced" requires TLS or the email will not be sent. Defaults to opportunistic.`,
      },
      {
        name: 'tracking_subdomain',
        type: 'string',
        required: false,
        description: `The subdomain to use for click and open tracking links, e.g. "track" produces track.example.com.`,
      },
    ],
  },
  {
    name: 'resend_domain_verify',
    description: `Trigger verification of an existing domain's DNS records, including DKIM, SPF, and the tracking CNAME (if a tracking subdomain is configured). Call this after adding the domain's DNS records to your DNS provider to move the domain from "pending" to "verified".`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: true,
        description: `The ID of the domain to verify.`,
      },
    ],
  },
  {
    name: 'resend_email_attachment_get',
    description: `Retrieve a single attachment for a previously sent email, including its filename, content type, size, and a signed, time-limited download URL.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `The ID of the attachment to retrieve.`,
      },
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the sent email that the attachment belongs to.`,
      },
    ],
  },
  {
    name: 'resend_email_attachments_list',
    description: `Retrieve a list of attachments for a previously sent email, including a signed, time-limited download URL for each attachment. Supports cursor-based pagination via limit/after/before. Example: call with just email_id to fetch the first page, or pass after="<last_attachment_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the sent email whose attachments should be listed.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor (an attachment ID) to fetch results after this cursor. Cannot be used together with before.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Pagination cursor (an attachment ID) to fetch results before this cursor. Cannot be used together with after.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of attachments to return per page. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_email_cancel',
    description: `Cancel the schedule of an email that has not been sent yet. Only works on emails currently in a scheduled state; has no effect once an email has already been sent. Returns the full email object with its updated status.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled email to cancel.`,
      },
    ],
  },
  {
    name: 'resend_email_get',
    description: `Retrieve the full details of a single sent email by its ID, including recipients, subject, body content, and its last delivery event status (e.g. delivered, bounced, opened).`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the email to retrieve. This is the ID returned when the email was sent (or listed).`,
      },
    ],
  },
  {
    name: 'resend_email_list',
    description: `Retrieve a list of emails sent from the Resend account, including delivery status and metadata for each. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_email_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of an email from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of an email from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of emails to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_email_send',
    description: `Send a transactional email through Resend. Requires a sender (from), at least one recipient (to), and a subject. Provide either html and/or text content, or a published template (do not combine template with html/text). Supports cc, bcc, reply_to, custom headers, scheduling for later delivery, file attachments, tags for tracking, and topic-scoped sending for contacts that have opted in/out.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>". The domain must be a verified sending domain in your Resend account.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `The subject line of the email.`,
      },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `Recipient email addresses. Provide an array of one or more email address strings. Maximum 50 recipients.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `File attachments for the email. Array of objects, each with: content (base64-encoded file content), filename, path (URL to a hosted file, alternative to content), content_type (optional, derived from filename if omitted), and content_id (optional, for embedding inline images via cid: references).`,
      },
      {
        name: 'bcc',
        type: 'array',
        required: false,
        description: `Bcc recipient email address(es). Provide an array of one or more email address strings.`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `Cc recipient email address(es). Provide an array of one or more email address strings.`,
      },
      {
        name: 'headers',
        type: 'object',
        required: false,
        description: `Custom headers to add to the email as a JSON object, e.g. {"X-Entity-Ref-ID": "123"}.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `The HTML version of the message body. Do not set together with template.`,
      },
      {
        name: 'idempotency_key',
        type: 'string',
        required: false,
        description: `A unique identifier for the request to ensure the email is only sent once, even if the request is retried. Sent as the Idempotency-Key header. Max 256 characters.`,
      },
      {
        name: 'reply_to',
        type: 'array',
        required: false,
        description: `Reply-to email address(es). Provide an array of one or more email address strings.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: false,
        description: `Schedule the email to be sent later. The date should be in ISO 8601 format, e.g. 2024-08-05T11:52:01.858Z. Natural language such as "in 1 min" is also accepted by the API.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags for tracking/categorizing this email. Array of objects, each with name and value. Names and values may only contain ASCII letters, numbers, underscores, or dashes, and no more than 256 characters.`,
      },
      {
        name: 'template',
        type: 'object',
        required: false,
        description: `Use a published Resend template to send the email instead of html/text. Shape: {"id": "<template_id>", "variables": {"name": "value"}}. If provided, do not include html or text.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The plain text version of the message body. Do not set together with template.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `The topic ID to scope the email to. If the recipient is a contact and opted-in to the topic, the email is sent; if opted-out, it is not sent. If the recipient is not a contact, the email is sent when the topic's default subscription is opt_in.`,
      },
    ],
  },
  {
    name: 'resend_email_send_batch',
    description: `Trigger up to 100 separate emails in a single API call. Provide an array of email objects; each object follows the same shape as the single Send Email tool (requires from, to, subject; optionally cc, bcc, reply_to, html, text, template, headers, scheduled_at, attachments, tags, topic_id). Note: attachments and scheduling are NOT supported by this batch endpoint's tag-level features in the same way as single sends — refer to the Resend docs for current per-item limitations. Returns an array of created email IDs in the same order as the input.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `Array of email objects to send (max 100 per request). Each object requires from (sender), to (recipient email address string, or array of strings), and subject. Each object may also include: cc, bcc, reply_to (string or array of strings), html (HTML body), text (plain text body), template ({"id": "...", "variables": {...}} — do not combine with html/text), headers (custom headers object), scheduled_at (ISO 8601 datetime), attachments (array of {content, filename, path, content_type, content_id}), tags (array of {name, value}), and topic_id.`,
      },
      {
        name: 'idempotency_key',
        type: 'string',
        required: false,
        description: `A unique identifier for the request to ensure the batch is only sent once, even if the request is retried. Sent as the Idempotency-Key header. Max 256 characters.`,
      },
    ],
  },
  {
    name: 'resend_email_update',
    description: `Update a single scheduled email that has not yet been sent — currently used to reschedule its send time. Provide the email_id and a new scheduled_at datetime (ISO 8601). Has no effect on emails that have already been sent.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled email to update.`,
      },
      {
        name: 'scheduled_at',
        type: 'string',
        required: true,
        description: `The new date and time to send the email, in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'resend_event_create',
    description: `Create a custom event definition in the Resend account. An event definition is a named event type (e.g. "user_signed_up") that can later be fired for a specific contact via the Send Event tool. Optionally define a flat key/type schema describing the payload fields the event will carry.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the event definition. Cannot start with the reserved "resend:" prefix. Example: "user_signed_up".`,
      },
      {
        name: 'schema',
        type: 'object',
        required: false,
        description: `An optional flat key/type map defining the event payload schema. Supported value types are "string", "number", "boolean", and "date". Example: {"plan": "string", "amount": "number"}.`,
      },
    ],
  },
  {
    name: 'resend_event_delete',
    description: `Permanently delete a custom event definition from the Resend account, identified by ID or name. This is destructive and cannot be undone -- automations or reporting relying on this event will stop working.`,
    params: [
      {
        name: 'identifier',
        type: 'string',
        required: true,
        description: `The event ID (UUID) or event name to permanently delete.`,
      },
    ],
  },
  {
    name: 'resend_event_get',
    description: `Retrieve a single custom event definition by its ID or name, including its payload schema and creation/update timestamps.`,
    params: [
      {
        name: 'identifier',
        type: 'string',
        required: true,
        description: `The event ID (UUID) or event name to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_event_list',
    description: `Retrieve a list of custom event definitions configured in the Resend account, including each event's name, payload schema, and creation date. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_event_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of an event from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of an event from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of events to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_event_send',
    description: `Fire an occurrence of a previously-created event definition for a specific contact. Exactly one of contact_id or email must be provided to identify the contact. An optional payload of key/value pairs can be attached, matching the event's defined schema (if any).`,
    params: [
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `The name of the event definition to fire (must already exist -- create it first with the Create Event tool).`,
      },
      {
        name: 'contact_id',
        type: 'string',
        required: false,
        description: `The ID (UUID) of the contact to associate with this event occurrence. Exactly one of contact_id or email must be provided.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The email address of the contact to associate with this event occurrence. Exactly one of contact_id or email must be provided.`,
      },
      {
        name: 'payload',
        type: 'object',
        required: false,
        description: `An optional payload of key/value pairs to include with the event occurrence, matching the event definition's schema (if one was defined). Example: {"plan": "pro", "amount": 49.99}.`,
      },
    ],
  },
  {
    name: 'resend_event_update',
    description: `Update the payload schema of an existing event definition, identified by ID or name. Pass a new flat key/type schema object, or set schema to null to clear the schema entirely.`,
    params: [
      {
        name: 'identifier',
        type: 'string',
        required: true,
        description: `The event ID (UUID) or event name to update.`,
      },
      {
        name: 'schema',
        type: 'object',
        required: true,
        description: `A flat key/type map defining the event payload schema. Supported value types are "string", "number", "boolean", and "date". Set to null to clear the existing schema. Example: {"plan": "string", "amount": "number"}.`,
      },
    ],
  },
  {
    name: 'resend_log_get',
    description: `Retrieve the full details of a single API request log by its ID, including the endpoint, HTTP method, response status, user agent, and the request/response bodies (when captured).`,
    params: [
      {
        name: 'log_id',
        type: 'string',
        required: true,
        description: `The ID of the log to retrieve. This is the ID returned when listing logs.`,
      },
    ],
  },
  {
    name: 'resend_log_list',
    description: `Retrieve a list of API request logs for the Resend account. Each log entry captures the endpoint called, HTTP method, response status, user agent, and (where available) the request/response bodies. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_log_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a log from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a log from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of logs to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_oauth_grant_list',
    description: `Retrieve a list of third-party OAuth applications authorized on this Resend account, including each grant's client info, granted scopes, and revocation status. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_grant_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of an OAuth grant from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of an OAuth grant from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of OAuth grants to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_oauth_grant_revoke',
    description: `Revoke a third-party application's OAuth grant/access on this Resend account. This is destructive and cannot be undone -- the authorized app immediately loses access and must go through the OAuth authorization flow again to reconnect.`,
    params: [
      {
        name: 'oauth_grant_id',
        type: 'string',
        required: true,
        description: `The ID of the OAuth grant to revoke.`,
      },
    ],
  },
  {
    name: 'resend_received_email_attachment_get',
    description: `Retrieve a single attachment belonging to a received (inbound) email, including its filename, content type, size, and a signed, time-limited download URL you can use to fetch the raw attachment content.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `The ID of the specific attachment to retrieve.`,
      },
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the received email that owns the attachment. This is the UUID of the inbound email.`,
      },
    ],
  },
  {
    name: 'resend_received_email_attachments_list',
    description: `Retrieve a list of attachments for a received (inbound) email, including each attachment's filename, content type, size, and a signed, time-limited download URL. Supports cursor-based pagination via limit/after/before. Example: call with email_id set to fetch the first page, or pass after="<last_attachment_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the received email whose attachments should be listed. This is the UUID of the inbound email, not the attachment.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor to fetch attachments after this attachment ID. Cannot be used together with 'before'.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Pagination cursor to fetch attachments before this attachment ID. Cannot be used together with 'after'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of attachments to return in this page of results. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_received_email_get',
    description: `Retrieve the full details of a single received (inbound) email by its ID, including sender, recipients, subject, html/text body, headers, and attachments.`,
    params: [
      {
        name: 'email_id',
        type: 'string',
        required: true,
        description: `The ID of the received email to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_received_email_list',
    description: `Retrieve a list of emails received on your Resend inbound/receiving domains, including sender, recipients, subject, and attachments metadata. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_email_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor (a received email ID) to fetch results after this cursor. Cannot be used together with before.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Pagination cursor (a received email ID) to fetch results before this cursor. Cannot be used together with after.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of received emails to return per page. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_segment_create',
    description: `Create a new segment. Requires a name. Contacts are added to the segment afterward via the contact-segment endpoints; Resend's segments API does not accept a filter/rule object at creation time. Returns the newly created segment's ID.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the segment.` },
    ],
  },
  {
    name: 'resend_segment_delete',
    description: `Permanently remove an existing segment from the Resend account. This is destructive and cannot be undone -- any automations, broadcasts, or filters relying on this segment will stop working.`,
    params: [
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment to remove.`,
      },
    ],
  },
  {
    name: 'resend_segment_get',
    description: `Retrieve a single segment by ID from the Resend account. Returns the segment's name, filter conditions, and creation timestamp.`,
    params: [
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_segment_list',
    description: `Retrieve a list of segments configured in the Resend account, including each segment's name and creation date. Supports cursor-based pagination via limit/after/before.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a segment from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a segment from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of segments to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_suppression_batch_add',
    description: `Add up to 100 email addresses to the Resend account's suppression list in a single call. Suppressed addresses will not receive further emails from this account until the suppression is removed. Example: emails=["steve.wozniak@gmail.com"].`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `Array of 1 to 100 email addresses to add to the suppression list.`,
      },
    ],
  },
  {
    name: 'resend_suppression_batch_remove',
    description: `Remove up to 100 suppressions from the Resend account's suppression list in a single call. Provide either emails or ids to identify which suppressions to remove, but not both.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `Array of 1 to 100 email addresses to remove from the suppression list. Provide this or ids, but not both.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Array of 1 to 100 suppression IDs to remove from the suppression list. Provide this or emails, but not both.`,
      },
    ],
  },
  {
    name: 'resend_suppression_create',
    description: `Create a suppression in the Resend account for a given email address. Suppressed addresses will not receive further emails from this account until the suppression is removed.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address to suppress.`,
      },
    ],
  },
  {
    name: 'resend_suppression_delete',
    description: `Permanently remove a single suppression from the Resend account by ID or email address. Once removed, the address will resume receiving emails from this account. This is destructive and cannot be undone.`,
    params: [
      {
        name: 'suppression',
        type: 'string',
        required: true,
        description: `The Suppression ID or email address to remove.`,
      },
    ],
  },
  {
    name: 'resend_suppression_get',
    description: `Retrieve a single suppression by ID or email address from the Resend account. Returns the suppressed email, origin (bounce, complaint, or manual), source event ID, and creation timestamp.`,
    params: [
      {
        name: 'suppression',
        type: 'string',
        required: true,
        description: `The Suppression ID or email address to look up.`,
      },
    ],
  },
  {
    name: 'resend_suppression_list',
    description: `Retrieve a list of suppressed email addresses in the Resend account, including each suppression's origin (bounce, complaint, or manual), source event, and creation date. Supports filtering by origin and cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_suppression_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a suppression from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a suppression from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of suppressions to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
      {
        name: 'origin',
        type: 'string',
        required: false,
        description: `Filter suppressions by origin. One of: bounce, complaint, manual.`,
      },
    ],
  },
  {
    name: 'resend_template_create',
    description: `Create a new reusable email template in the Resend account. Requires a name and the HTML body; sender, subject, reply-to addresses, plain text body, and typed template variables (used to personalize each send) can all be set optionally. New templates start as a draft -- use resend_template_publish to make them live.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `The HTML version of the template body. Use {{{variable_key}}} triple-brace placeholders for any declared template variable; every placeholder referenced here must have a matching entry in "variables" or the request fails validation.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the template, used to identify it in the Resend dashboard.`,
      },
      {
        name: 'alias',
        type: 'string',
        required: false,
        description: `A unique alias for the template, which can be used instead of its ID when getting, updating, publishing, duplicating, or deleting it.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Default sender email address for this template. To include a friendly name, use the format "Your Name <sender@domain.com>".`,
      },
      {
        name: 'reply_to',
        type: 'array',
        required: false,
        description: `Default reply-to email address(es) for this template. Provide an array of one or more email address strings.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Default email subject line for this template. May include {{{variable_key}}} triple-brace placeholders for any declared template variable.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The plain text version of the template body. Use {{{variable_key}}} triple-brace placeholders for any declared template variable; every placeholder referenced here must have a matching entry in "variables" or the request fails validation.`,
      },
      {
        name: 'variables',
        type: 'array',
        required: false,
        description: `Array of typed variables this template accepts, used to personalize each send. Each item is an object with key (the placeholder name), type (string, number, boolean, object, or list), and an optional fallback_value used when a send doesn't supply that variable. Every {{{variable_key}}} placeholder used in html, text, or subject must have a matching entry here (by key), or the request is rejected. Example: [{"key": "first_name", "type": "string", "fallback_value": "there"}].`,
      },
    ],
  },
  {
    name: 'resend_template_delete',
    description: `Permanently remove an existing email template from the Resend account. This is destructive and cannot be undone -- any broadcasts, automations, or send calls still referencing this template's ID or alias will fail.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Template ID or alias to remove.`,
      },
    ],
  },
  {
    name: 'resend_template_duplicate',
    description: `Create a copy of an existing email template in the Resend account. The duplicate is created as a new draft template with its own ID, leaving the original template unchanged.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Template ID or alias to duplicate.`,
      },
    ],
  },
  {
    name: 'resend_template_get',
    description: `Retrieve a single email template by ID or alias from the Resend account. Returns the template's name, sender/subject defaults, HTML/text bodies, declared variables, and publication status (draft or published).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Template ID or alias to look up.`,
      },
    ],
  },
  {
    name: 'resend_template_list',
    description: `Retrieve a list of reusable email templates configured in the Resend account, including each template's publication status (draft or published) and timestamps. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_template_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a template from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a template from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of templates to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_template_publish',
    description: `Publish a template in the Resend account, making its current draft version live. Once published, the template's HTML/text bodies, sender/subject defaults, and variables reflect the most recently saved draft and are used for any future sends referencing this template.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Template ID or alias to publish.`,
      },
    ],
  },
  {
    name: 'resend_template_update',
    description: `Update an existing email template in the Resend account: name, alias, sender/subject defaults, reply-to addresses, HTML/text bodies, and declared variables. All fields are optional; only the ones provided are changed. Note: updating a published template creates a new draft version -- call resend_template_publish to make the changes live.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Template ID or alias to update.`,
      },
      {
        name: 'alias',
        type: 'string',
        required: false,
        description: `New unique alias for the template.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `New default sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>".`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `New HTML version of the template body. Use {{{variable_key}}} triple-brace placeholders for any declared template variable; every placeholder referenced here must have a matching entry in "variables" or the request fails validation.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the template.` },
      {
        name: 'reply_to',
        type: 'array',
        required: false,
        description: `New default reply-to email address(es). Provide an array of one or more email address strings.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New default email subject line. May include {{{variable_key}}} triple-brace placeholders for any declared template variable.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New plain text version of the template body. Use {{{variable_key}}} triple-brace placeholders for any declared template variable; every placeholder referenced here must have a matching entry in "variables" or the request fails validation.`,
      },
      {
        name: 'variables',
        type: 'array',
        required: false,
        description: `New array of typed variables this template accepts. Replaces the existing declared variables. Each item is an object with key, type (string, number, boolean, object, or list), and an optional fallback_value. Every {{{variable_key}}} placeholder used in html, text, or subject must have a matching entry here (by key), or the request is rejected. Example: [{"key": "first_name", "type": "string", "fallback_value": "there"}].`,
      },
    ],
  },
  {
    name: 'resend_topic_create',
    description: `Create a new topic in the Resend account. Topics let contacts opt in or out of specific kinds of communication (e.g. "Newsletter", "Product Updates"). Requires a name and a default_subscription status; description and visibility are optional.`,
    params: [
      {
        name: 'default_subscription',
        type: 'string',
        required: true,
        description: `The default subscription status for the topic. One of: opt_in, opt_out. Cannot be changed after creation.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the topic. Max 50 characters.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the topic. Max 200 characters.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The visibility of the topic. One of: public, private. Public topics are visible to all contacts on the unsubscribe page. Private topics are only visible to opted-in contacts. Defaults to private.`,
      },
    ],
  },
  {
    name: 'resend_topic_delete',
    description: `Permanently remove an existing topic from the Resend account. This is destructive and cannot be undone -- contacts' subscription preferences for this topic will be lost.`,
    params: [
      {
        name: 'topic_id',
        type: 'string',
        required: true,
        description: `The ID of the topic to remove.`,
      },
    ],
  },
  {
    name: 'resend_topic_get',
    description: `Retrieve a single topic by ID from the Resend account. Returns the topic's name, description, default subscription status, visibility, and creation timestamp.`,
    params: [
      {
        name: 'topic_id',
        type: 'string',
        required: true,
        description: `The ID of the topic to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_topic_list',
    description: `Retrieve a list of topics configured in the Resend account, including each topic's name, description, default subscription status, visibility, and creation date. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_topic_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID of a topic from the current page to fetch the page of results immediately after it.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID of a topic from the current page to fetch the page of results immediately before it.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of topics to return per page. Must be between 1 and 100. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_topic_update',
    description: `Update an existing topic in the Resend account. Name, description, and visibility can be changed; only the fields provided are updated. Note: default_subscription cannot be changed after a topic is created.`,
    params: [
      {
        name: 'topic_id',
        type: 'string',
        required: true,
        description: `The ID of the topic to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description of the topic. Max 200 characters.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name of the topic. Max 50 characters.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `The new visibility of the topic. One of: public, private. Public topics are visible to all contacts on the unsubscribe page. Private topics are only visible to opted-in contacts.`,
      },
    ],
  },
  {
    name: 'resend_webhook_create',
    description: `Create a new webhook endpoint to receive Resend email, contact, and domain event callbacks. The response includes a signing_secret used to verify that incoming webhook payloads genuinely came from Resend.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The publicly reachable URL where Resend will POST webhook event payloads.`,
      },
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `Array of event types this webhook should subscribe to. At least one event type is required. Example: ["email.sent", "email.delivered", "email.bounced"].`,
      },
    ],
  },
  {
    name: 'resend_webhook_delete',
    description: `Permanently remove an existing webhook from the Resend account. This is destructive and cannot be undone -- once deleted, the endpoint will no longer receive event notifications, and the webhook's signing secret is invalidated.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID (UUID) of the webhook to permanently delete.`,
      },
    ],
  },
  {
    name: 'resend_webhook_get',
    description: `Retrieve a single webhook by ID from the Resend account, including its endpoint URL, subscribed event types, status (enabled/disabled), creation timestamp, and signing secret used to verify incoming payloads.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID (UUID) of the webhook to retrieve.`,
      },
    ],
  },
  {
    name: 'resend_webhook_list',
    description: `Retrieve a list of webhook endpoints configured in the Resend account, including each webhook's endpoint URL, subscribed event types, status, and creation date. Supports cursor-based pagination via limit/after/before. Example: call with no parameters to fetch the first page, or pass after="<last_webhook_id_from_previous_page>" to fetch the next page.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for forward pagination. Pass the ID (UUID) of a webhook from the current page to fetch the page of results immediately after it. Cannot be used together with before.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for backward pagination. Pass the ID (UUID) of a webhook from the current page to fetch the page of results immediately before it. Cannot be used together with after.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of webhooks to return per page. If omitted, the Resend API default page size is used.`,
      },
    ],
  },
  {
    name: 'resend_webhook_update',
    description: `Update an existing webhook in the Resend account: its endpoint URL, the array of event types it subscribes to, and/or its status (enabled/disabled). All body fields are optional; only the ones provided are changed. Returns the updated webhook's ID.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID (UUID) of the webhook to update.`,
      },
      {
        name: 'endpoint',
        type: 'string',
        required: false,
        description: `The URL where webhook events will be sent. Must be a valid HTTPS URL reachable from the internet.`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `Array of event types to subscribe this webhook to, e.g. ["email.sent", "email.delivered"]. Must contain at least one item if provided.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The status of the webhook: "enabled" to actively receive events, or "disabled" to pause delivery without deleting the webhook.`,
      },
    ],
  },
]
