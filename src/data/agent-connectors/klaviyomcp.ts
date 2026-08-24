import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'klaviyomcp_add_categories_to_catalog_item',
    description: `Create a new catalog category relationship for the given item ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog item ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_add_items_to_catalog_category',
    description: `Create a new item relationship for the given category ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog category ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_add_profiles_to_list',
    description: `Add a profile to a list with the given list ID.

It is recommended that you use the Subscribe Profiles endpoint if you're trying to give a profile consent to receive email marketing, SMS marketing, or both.

This endpoint accepts a maximum of 1000 profiles per call.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_assign_template_to_campaign_message',
    description: `Assigns an email template to a campaign message. This should be used after creating a template with the create_email_template tool and creating an email campaign.`,
    params: [
      {
        name: 'campaignMessageId',
        type: 'string',
        required: true,
        description: `The ID of the email campaign message to assign the template to.`,
      },
      {
        name: 'emailTemplateId',
        type: 'string',
        required: true,
        description: `The ID of the email template to assign to the campaign message.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_create_catalog_items',
    description: `Create a catalog item bulk create job to create a batch of catalog items.

Accepts up to 100 catalog items per request. The maximum allowed payload size is 5MB.
The maximum number of jobs in progress at one time is 500.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_create_catalog_variants',
    description: `Create a catalog variant bulk create job to create a batch of catalog variants.

Accepts up to 100 catalog variants per request. The maximum allowed payload size is 5MB.
The maximum number of jobs in progress at one time is 500.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_create_coupon_codes',
    description: `Create a coupon-code-bulk-create-job to bulk create a list of coupon codes.

Max number of coupon codes per job we allow for is 1000.
Max number of jobs queued at once we allow for is 100.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon_code_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_create_events',
    description: `Create a batch of events for one or more profiles.

Note that this endpoint allows you to create new profiles or update existing profile properties.

At a minimum, profile and metric objects should include at least one profile identifier (e.g., \`id\`, \`email\`, or \`phone_number\`) and the metric \`name\`, respectively.

Accepts up to 1,000 events per request. The maximum allowed payload size is 5MB. A single string cannot exceed 100KB.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_delete_catalog_items',
    description: `Create a catalog item bulk delete job to delete a batch of catalog items.

Accepts up to 100 catalog items per request. The maximum allowed payload size is 5MB.
The maximum number of jobs in progress at one time is 500.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_delete_catalog_variants',
    description: `Create a catalog variant bulk delete job to delete a batch of catalog variants.

Accepts up to 100 catalog variants per request. The maximum allowed payload size is 5MB.
The maximum number of jobs in progress at one time is 500.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_import_profiles',
    description: `Create a bulk profile import job to create or update a batch of profiles.

Accepts up to 10,000 profiles per request. The maximum allowed payload size is 5MB. The maximum allowed payload size per-profile is 100KB.

To learn more, see our Bulk Profile Import API guide.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_bulk_import_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_suppress_profiles',
    description: `Manually suppress profiles by email address or specify a segment/list ID to suppress all current members of a segment/list.

Suppressed profiles cannot receive email marketing, independent of their consent status. To learn more, see our guides on [email suppressions](https://help.klaviyo.com/hc/en-us/articles/115005246108#what-is-a-suppressed-profile-1) and collecting consent.

Email address per request limit: 100

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_suppression_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_unsuppress_profiles',
    description: `Manually unsuppress profiles by email address or specify a segment/list ID to unsuppress all current members of a segment/list.

This only removes suppressions with reason USER_SUPPRESSED ; unsubscribed profiles and suppressed profiles with reason INVALID_EMAIL or HARD_BOUNCE remain unchanged. To learn more, see our guides on [email suppressions](https://help.klaviyo.com/hc/en-us/articles/115005246108#what-is-a-suppressed-profile-1) and collecting consent.

Email address per request limit: 100

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_suppression_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_update_catalog_items',
    description: `Create a catalog item bulk update job to update a batch of catalog items.

Accepts up to 100 catalog items per request. The maximum allowed payload size is 5MB.
The maximum number of jobs in progress at one time is 500.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_update_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_bulk_update_catalog_variants',
    description: `Create a catalog variant bulk update job to update a batch of catalog variants.

Accepts up to 100 catalog variants per request. The maximum allowed payload size is 5MB.
The maximum number of jobs in progress at one time is 500.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_update_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_cancel_campaign_send',
    description: `Cancel or revert the send of a currently sending or scheduled campaign. action='cancel' permanently cancels the campaign, setting its status to CANCELED; action='revert' stops the send job and returns the campaign to DRAFT.

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the currently sending campaign to cancel or revert`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_clone_email_template',
    description: `Create a clone of an existing email template. Returns the new template with a copy of the source template's content (HTML, text, AMP, and DND definition). Cloning counts toward the 1,000-templates-per-account limit. Optionally pass a name to override the cloned template's name.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_agent_knowledge',
    description: `Adds an Agent Knowledge item from either a text snippet
(\`\`source.source_type: snippet\`\`, requires \`\`title\`\` and
\`\`content\`\`) or a single URL (\`\`source.source_type: webpage\`\`,
requires \`\`url\`\`). The URL is normalized before the uniqueness
check; duplicate normalized URLs return \`\`409 Conflict\`\`. The
resource is fetchable immediately; clients can poll its \`\`status\`\`
until indexing completes. For files, use
\`\`POST /agent-knowledge-files\`\`.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_knowledge',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_agent_skill',
    description: `Adds a skill to Customer Agent.

Customer Agent will invoke this skill when the customer message
matches its \`\`description\`\`. Provide \`\`display_name\`\`,
\`\`description\`\` (summary of the skill's capabilities and when it
should be used), \`\`instructions\`\` (the system prompt the skill
uses to handle a turn), optional \`\`handoff\`\` (escalation
behavior), optional \`\`references\`\` for named tools used as
\`\`{{tool ref=<name>}}\`\` in instructions, optional \`\`agent-
tools\`\` relationship data, and \`\`status\`\`. Set \`\`status: draft\`\`
to stage without going live, \`\`live\`\` to activate immediately.
Customer Agent generates the skill name and returns a prefixed
custom id plus the generated \`\`name\`\` attribute.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_skill',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_agent_tool',
    description: `Adds a new external HTTP tool Customer Agent skills can call.

Provide protocol details (method, URL, query parameter, header,
and body templates using Jinja-style \`\`{{variable_name}}\`\`
syntax) and declare the variables those templates reference. The
runtime uses \`\`variables\`\` to determine which values are
supplied at call time. To reference a secret, include a variable
with \`\`source: secret\`\` and \`\`value\`\` set to the \`\`agent-
secret\`\` id. The tool isn't directly callable until bound to a
skill with \`\`PATCH /agent-skills/{id}\`\`.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_tool',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_back_in_stock_subscription',
    description: `Subscribe a profile to receive back in stock notifications. Check out our Back in Stock API guide for more details.

This endpoint is specifically designed to be called from server-side applications. To create subscriptions from client-side contexts, use POST /client/back-in-stock-subscriptions.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_brand_button',
    description: `Create a new brand button.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_button',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_brand_color',
    description: `Create a new brand color group.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_color',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_brand_logo',
    description: `Create a new brand logo.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_logo',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_brand_social_group',
    description: `Create a new brand social group.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_social_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_campaign',
    description: `Creates a new draft campaign. For email campaigns, this can be used with the create_email_template tool for template creation and then assign_template_to_campaign_message to assign the template to the email campaign. You can view and edit a campaign in the Klaviyo UI at https://www.klaviyo.com/campaign/{CAMPAIGN_ID}/wizard`,
    params: [
      { name: 'input', type: 'object', required: true, description: `CampaignCreateQuery` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_campaign_clone',
    description: `Clones an existing campaign, returning a new campaign based on the original with a new ID and name.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_catalog_category',
    description: `Create a new catalog category.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_category',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_catalog_item',
    description: `Create a new catalog item.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_catalog_variant',
    description: `Create a new variant for a related catalog item.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_coupon',
    description: `Creates a new coupon.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_coupon_code',
    description: `Synchronously creates a coupon code for the given coupon.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon_code',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_custom_metric',
    description: `Create a new custom metric.

Custom metric objects must include a \`name\` and \`definition\`.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_custom_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_customer_agent_response',
    description: `Sends one user message into Customer Agent and returns every public
event Customer Agent emits in response.

Each call is one turn: the caller supplies the conversation
history with the new user message as the last entry, and
Customer Agent runs one routing and response cycle against it.
The response is non-streaming; the caller receives the entire
event list at once and renders it in order. Continue an existing
conversation by passing the optional \`\`conversation\`\`
relationship; omit it to start a new one.

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_response',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_dnd_email_template',
    description: `Create a new drag-and-drop (DND, \`\`editor_type='SYSTEM_DRAGGABLE'\`\`) email template with a structured \`\`definition\`\`. Unlike HTML templates created with create_email_template, DND templates use a structured definition describing sections, rows, columns, and blocks (text, image, button, etc.) — there is no raw HTML body. The definition fully describes the template layout and content. You can view and edit the template in the Klaviyo UI at https://www.klaviyo.com/email-template-editor/{TEMPLATE_ID}.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_template',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'definition'`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_email_template',
    description: `Create a new email template from the given HTML. Returns the ID of the template. You can view and edit a template in the Klaviyo UI at https://www.klaviyo.com/email-editor/{TEMPLATE_ID}/edit.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `
The complete HTML of the template. Should include <html> and <body> tags.
To include an image, first upload the image using the upload_image_from_file or upload_image_from_url tool, then use the returned image URL.
Always include an unsubscribe link. Do this by inserting the template string "{% unsubscribe 'Unsubscribe' %}". You can replace 'Unsubscribe' with custom text.

To add an editable region to the template, ensure the has_editable_regions param is true and add the following:
<td align="center" data-klaviyo-region="true" data-klaviyo-region-width-pixels="600"></td>

To add an editable text block, add the following within that region:
<div class="klaviyo-block klaviyo-text-block">Hello world!</div>

To add an editable image block, add the following within that region:
<div class="klaviyo-block klaviyo-image-block"></div>

To add a universal content block, add the following within that region, replacing block_id with the ID of the universal content block:
<div data-klaviyo-universal-block="block_id">&nbsp;<div>
`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the template` },
      {
        name: 'hasEditableRegions',
        type: 'boolean',
        required: false,
        description: `Whether the template HTML contains editable regions. Should be false unless they explicitly request an editable/drag-and-drop/hybrid template.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_event',
    description: `Create a new event to track a profile's activity.

Note that this endpoint allows you to create a new profile or update an existing profile's properties.

At a minimum, profile and metric objects should include at least one profile identifier (e.g., \`id\`, \`email\`, or \`phone_number\`) and the metric \`name\`, respectively.

Successful response indicates that the event was validated and submitted for processing, but does not guarantee that processing is complete.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_flow',
    description: `Create a new flow using an encoded flow definition.

New objects within the flow definition, such as actions, will need to use a
\`temporary_id\` field for identification. These will be replaced with traditional \`id\` fields
after successful creation.

A successful request will return the new definition to you.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_flow',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'definition'`,
      },
      {
        name: 'fields_flow',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_form',
    description: `Create a new form.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_form',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_list',
    description: `Create a new list.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_list',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_or_update_profile',
    description: `Given a set of profile attributes and optionally an ID, create or update a profile.

Returns 201 if a new profile was created, 200 if an existing profile was updated.

Use the \`additional-fields\` parameter to include subscriptions and predictive analytics data in your response.

Note that setting a field to \`null\` will clear out the field, whereas not including a field in your request will leave it unchanged.

The maximum allowed payload size is 100KB.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_profile',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'subscriptions', 'predictive_analytics'`,
      },
      {
        name: 'fields_profile',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_profile',
    description: `Create a new profile. Must include either email, phone_number, or external_id. You can view and edit a profile in the Klaviyo UI at https://www.klaviyo.com/profile/{PROFILE_ID}`,
    params: [
      { name: 'input', type: 'object', required: true, description: `ProfileCreateQuery` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_push_token',
    description: `Create or update a push token.

This endpoint can be used to migrate push tokens from another platform to Klaviyo. Please use our mobile SDKs ([iOS](https://github.com/klaviyo/klaviyo-swift-sdk) and [Android](https://github.com/klaviyo/klaviyo-android-sdk)) to create push tokens from users' devices.

The maximum allowed payload size is 100KB.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_segment',
    description: `Create a segment.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_segment',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_sending_domain',
    description: `Register a new sending domain and return the DNS records to configure.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_sending_domain',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_sending_domain_activation_job',
    description: `Activate the referenced sending domain (requires prior verify to pass).`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_sending_domain_activation_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_sending_domain_verification_job',
    description: `Run a DNS verification check for the referenced sending domain.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_sending_domain_verification_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_tag',
    description: `Create a tag. An account cannot have more than **500** unique tags.

A tag belongs to a single tag group. If \`relationships.tag-group.data.id\` is not specified,
the tag is added to the account's default tag group.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_tag',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_tag_group',
    description: `Create a tag group. An account cannot have more than **50** unique tag groups.

If \`exclusive\` is not specified \`true\` or \`false\`, the tag group defaults to non-exclusive.

If a tag group is non-exclusive, any given related resource (campaign, flow, etc.)
can be linked to multiple tags from that tag group.
If a tag group is exclusive, any given related resource can only be linked to one tag from that tag group.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_tag_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_template_preview_send_job',
    description: `Send a test email of a template to one or more recipients.

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template_preview_send_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_text_messaging_configuration',
    description: `Create the SMS account for the calling company.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_configuration',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_text_messaging_sender',
    description: `Create a sender and submit its initial registration.

A toll-free number is provisioned in all supported regions (US + CA), so
the response is the sender for the requested country and the
sibling-region sender also appears in list/retrieve.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_sender',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_text_messaging_sender_registration',
    description: `Submit a new registration for an existing sender (resubmission).`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_sender_registration',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_translation',
    description: `Create a new translation collection for a Klaviyo resource. Exactly one relationship must be provided. Valid channel + relationship combinations: email → campaign-variation, flow-message, template, template-universal-content; sms → campaign-variation, flow-message; mobile_push → campaign-variation, flow-message; whatsapp → template only.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel for this translation`,
      },
      {
        name: 'fallbackLocale',
        type: 'string',
        required: true,
        description: `Fallback locale (e.g. 'en')`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'relationshipId',
        type: 'string',
        required: true,
        description: `ID of the related resource`,
      },
      {
        name: 'relationshipType',
        type: 'string',
        required: true,
        description: `Type of related resource`,
      },
      {
        name: 'sourceLocale',
        type: 'string',
        required: true,
        description: `Source locale (e.g. 'en')`,
      },
      {
        name: 'targetLocales',
        type: 'array',
        required: true,
        description: `Target locales (e.g. ['fr', 'es']). Pass as a JSON array of values.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_create_universal_content',
    description: `Create universal content. Currently supported block types are: \`button\`, \`drop_shadow\`, \`horizontal_rule\`, \`html\`, \`image\`, \`spacer\`, and \`text\`.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template_universal_content',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_agent_knowledge',
    description: `Permanently removes the Agent Knowledge item and its indexed
content.

The agent will stop retrieving from it on the next turn.
Conversations that previously cited this item remain unchanged.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_agent_skill',
    description: `Permanently removes the skill from Customer Agent.

Past conversations routed to this skill are unchanged; future
conversations cannot route to it. To disable without deletion,
use \`\`PATCH /agent-skills/{id}\`\` with \`\`status: draft\`\`.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_agent_tool',
    description: `Permanently removes the tool.

Skills that referenced it lose the binding; Customer Agent will
not be able to use that tool with those skills until it is
rebound.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_brand_button',
    description: `Delete the brand button with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the brand button.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_brand_color',
    description: `Delete the brand color group with the given ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand color group.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_brand_logo',
    description: `Delete the brand logo with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the brand logo.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_brand_social_group',
    description: `Delete the brand social group with the given ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand social group.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_campaign',
    description: `Delete a campaign with the given campaign ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The campaign ID to be deleted` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_catalog_category',
    description: `Delete a catalog category using the given category ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog category ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_catalog_item',
    description: `Delete a catalog item with the given item ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog item ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_catalog_variant',
    description: `Delete a catalog item variant with the given variant ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog variant ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_coupon',
    description: `Delete the coupon with the given coupon ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The internal id of a Coupon is equivalent to its external id stored within an integration.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_coupon_code',
    description: `Deletes a coupon code specified by the given identifier synchronously. If a profile has been assigned to the
coupon code, an exception will be raised`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id of a coupon code is a combination of its unique code and the id of the coupon it is associated with.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_custom_metric',
    description: `Delete a custom metric with the given custom metric ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the custom metric` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_email_template',
    description: `Delete an email template by ID. Will fail with a 409 Conflict if the template is currently attached to a campaign or flow message — detach the message or delete the campaign/flow first. This action cannot be undone.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of template` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_flow',
    description: `Delete a flow with the given flow ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the Flow to delete. Ex: XVTP5Q`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_form',
    description: `Delete a given form.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the form` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_list',
    description: `Delete a list with the given list ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Primary key that uniquely identifies this list. Generated by Klaviyo.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_push_token',
    description: `Delete a specific push token based on its ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The value of the push token to delete`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_segment',
    description: `Delete a segment with the given segment ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_sending_domain',
    description: `Delete a sending domain.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the sending domain.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_tag',
    description: `Delete the tag with the given tag ID. Any associations between the tag and other resources will also be removed.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_tag_group',
    description: `Delete the tag group with the given tag group ID.

Any tags inside that tag group, and any associations between those tags and other resources, will also be removed. The default tag group cannot be deleted.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The Tag Group ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_translation',
    description: `Delete a translation collection by ID. This removes all localization settings and translation values for the resource.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'translationId',
        type: 'string',
        required: true,
        description: `The ID of the translation to delete`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_universal_content',
    description: `Delete the universal content with the given ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the template universal content`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_delete_webhook',
    description: `Delete a webhook with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the webhook.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_account_details',
    description: `Get the details of the account. You can view and edit your account details flow in the Klaviyo UI at https://www.klaviyo.com/settings/account`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_agent_knowledge',
    description: `Returns one Agent Knowledge resource by id.

Resources are fetchable immediately after creation, including
while pending, indexing, failed, or rejected.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_knowledge',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_agent_messages_for_customer_agent_conversation',
    description: `List message linkage or full message resources for a
conversation.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_message',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'page_cursor', type: 'string', required: false, description: `Page cursor` },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 50. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_agent_skill',
    description: `Returns full detail for a single skill: \`\`name\`\`, \`\`display_name\`\`,
\`\`description\`\`, \`\`instructions\`\`, bound \`\`agent-tools\`\` relationship
data, \`\`status\`\`, and \`\`handoff\`\`.

Skills are looked up by prefixed \`\`id\`\`. To list all skills, use
\`\`GET /agent-skills\`\`.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_skill',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_agent_skills',
    description: `Returns every skill configured for the calling company's Customer
Agent.

Use this to inspect Customer Agent's current skills before
adding or modifying a custom skill. Each item carries a prefixed
\`\`id\`\`, \`\`source\`\`, \`\`name\`\`, \`\`display_name\`\`, \`\`description\`\`,
\`\`instructions\`\`, bound \`\`agent-tools\`\` relationship data,
\`\`status\`\`, and \`\`handoff\`\`. Use retrieve to inspect any one
skill in detail.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_skill',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_agent_tool',
    description: `Returns full configuration for a single tool: protocol, auth method,
templated request configuration, variables, and referenced secrets.

Use to inspect a tool's setup before referencing it from a skill
or modifying its config.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_tool',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_agent_tools',
    description: `Returns every external tool (HTTP API endpoint) Customer Agent
skills can call.

Each tool has an id, display name, protocol details (method, URL
template), authentication setup, and any referenced secrets. Use
this before creating a new tool to avoid duplicates, or before
binding a tool to a skill to confirm the tool exists.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_tool',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "name": {
    "operators": [
      "contains"
    ]
  },
  "tool_type": {
    "operators": [
      "equals"
    ],
    "enum": [
      "internal",
      "custom"
    ]
  },
  "created_at": {
    "operators": [
      "equals",
      "greater-or-equal",
      "less-or-equal"
    ],
    "type": "datetime"
  },
  "updated_at": {
    "operators": [
      "equals",
      "greater-or-equal",
      "less-or-equal"
    ],
    "type": "datetime"
  }
}`,
      },
      { name: 'page_cursor', type: 'string', required: false, description: `Page cursor` },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 50. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_all_universal_content',
    description: `Get all universal content in an account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template_universal_content',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "name": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "created": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "updated": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "definition.content_type": {
    "operators": [
      "equals"
    ],
    "enum": [
      "block",
      "section"
    ]
  },
  "definition.type": {
    "operators": [
      "equals"
    ],
    "enum": [
      "button",
      "coupon",
      "drop_shadow",
      "header",
      "horizontal_rule",
      "html",
      "image",
      "product",
      "review",
      "social",
      "spacer",
      "split",
      "table",
      "text",
      "unsupported",
      "video"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_applications',
    description: `List installable marketplace applications.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_application',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "name": {
    "operators": [
      "contains"
    ]
  },
  "category": {
    "operators": [
      "equals"
    ],
    "enum": [
      "Accounting",
      "Advertising",
      "CDP",
      "CRM",
      "Data Warehouse",
      "Design & Content",
      "Direct Mail",
      "Donations",
      "eCommerce Platform",
      "Email Service Provider",
      "Event Management",
      "Fundraising",
      "Health & Wellness",
      "Journey Optimization",
      "Landing Pages & Forms",
      "Payments",
      "Personalization",
      "POS",
      "Project Management",
      "Quizzes & Surveys",
      "Restaurants",
      "Reviews",
      "Rewards",
      "Shipping",
      "SMTP",
      "Subscriptions",
      "Support & Help Desk",
      "Travel",
      "Workflow Automation"
    ]
  },
  "built_by": {
    "operators": [
      "equals"
    ],
    "enum": [
      "KLAVIYO",
      "KLAVIYO_PARTNERS"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 25. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_billing_usage',
    description: `Get current-period usage and plan cap for a single usage type.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The usage type to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_billing_usage',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_button',
    description: `Get the brand button with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the brand button.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_button',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_buttons',
    description: `Get all brand buttons for the authenticated account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_button',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_color',
    description: `Get the brand color group with the given ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand color group.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_color',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_colors',
    description: `Get all brand color groups for the authenticated account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_color',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_email_default',
    description: `Get the brand email defaults for the authenticated account.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand email defaults (must equal the account ID).`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_button',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_brand_email_default',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_brand_logo',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_brand_social_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related brand-button, brand-logo, or brand-social-group.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_email_defaults',
    description: `List the brand email defaults for the authenticated account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_button',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_brand_email_default',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_brand_logo',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_brand_social_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related brand-button, brand-logo, or brand-social-group.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_logo',
    description: `Get the brand logo with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the brand logo.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_logo',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_image',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related image.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_logos',
    description: `Get all brand logos for the authenticated account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_logo',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_image',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related image.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_social_group',
    description: `Get the brand social group with the given ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand social group.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_social_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_social_groups',
    description: `Get all brand social groups for the authenticated account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_social_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_brand_voice',
    description: `Get the brand voice for the authenticated company.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company ID. Must match the authenticated account.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_voice',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_create_catalog_items_job',
    description: `Get a catalog item bulk create job with the given job ID.

An \`include\` parameter can be provided to get the following related resource data: \`items\`.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_catalog_item_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related items.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_create_catalog_items_jobs',
    description: `Get all catalog item bulk create jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_create_coupon_code_jobs',
    description: `Get all coupon code bulk create jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon_code_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_create_coupon_codes_job',
    description: `Get a coupon code bulk create job with the given job ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon_code',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_coupon_code_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related coupon-codes.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_create_variants_job',
    description: `Get a catalog variant bulk create job with the given job ID.

An \`include\` parameter can be provided to get the following related resource data: \`variants\`.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_catalog_variant_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related variants.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_create_variants_jobs',
    description: `Get all catalog variant bulk create jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_delete_catalog_items_job',
    description: `Get a catalog item bulk delete job with the given job ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_delete_catalog_items_jobs',
    description: `Get all catalog item bulk delete jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_delete_variants_job',
    description: `Get a catalog variant bulk delete job with the given job ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_delete_variants_jobs',
    description: `Get all catalog variant bulk delete jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_import_profiles_job',
    description: `Get a bulk profile import job with the given job ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_list',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_profile_bulk_import_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related lists.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_import_profiles_jobs',
    description: `Get all bulk profile import jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_bulk_import_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "any",
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_suppress_profiles_job',
    description: `Get the bulk suppress profiles job with the given job ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_suppression_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_suppress_profiles_jobs',
    description: `Get the status of all bulk profile suppression jobs.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_suppression_bulk_create_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  },
  "list_id": {
    "operators": [
      "equals"
    ]
  },
  "segment_id": {
    "operators": [
      "equals"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_unsuppress_profiles_job',
    description: `Get the bulk unsuppress profiles job with the given job ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_suppression_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_unsuppress_profiles_jobs',
    description: `Get all bulk unsuppress profiles jobs.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_suppression_bulk_delete_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  },
  "list_id": {
    "operators": [
      "equals"
    ]
  },
  "segment_id": {
    "operators": [
      "equals"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_update_catalog_items_job',
    description: `Get a catalog item bulk update job with the given job ID.

An \`include\` parameter can be provided to get the following related resource data: \`items\`.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_catalog_item_bulk_update_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related items.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_update_catalog_items_jobs',
    description: `Get all catalog item bulk update jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item_bulk_update_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_update_variants_job',
    description: `Get a catalog variate bulk update job with the given job ID.

An \`include\` parameter can be provided to get the following related resource data: \`variants\`.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_catalog_variant_bulk_update_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related variants.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_bulk_update_variants_jobs',
    description: `Get all catalog variant bulk update jobs.

Returns a maximum of 100 jobs per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant_bulk_update_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "queued",
      "processing",
      "complete",
      "cancelled"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaign',
    description: `Returns a specific campaign based on a required id. You can view and edit a campaign in the Klaviyo UI at https://www.klaviyo.com/campaign/{CAMPAIGN_ID}/wizard`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaign_message',
    description: `Returns a specific message based on a required id.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The message ID to be retrieved` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_campaign_message',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_image',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related campaign, image, or template.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaign_recipient_estimation',
    description: `Get the estimated recipient count for a campaign with the provided campaign ID.
You can refresh this count by using the \`Create Campaign Recipient Estimation Job\` endpoint.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the campaign for which to get the estimated number of recipients`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign_recipient_estimation',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaign_recipient_estimation_job',
    description: `Retrieve the status of a recipient estimation job triggered
with the \`Create Campaign Recipient Estimation Job\` endpoint.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to get recipient estimation status`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign_recipient_estimation_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaign_report',
    description: `Returns metrics data for campaigns with the given filters and within the given timeframe. Can return performance data such as opens, clicks, and conversions, etc. This tool will also give you information about each campaign in the report, such as: audience names and IDs for the campaign (included audiences are audiences sent the campaign, excluded audiences are audiences not sent the campaign), campaign name, send time, send channel, and campaign ID.`,
    params: [
      {
        name: 'conversionMetricId',
        type: 'string',
        required: true,
        description: `ID of the metric to be used for conversion statistics. You can get available metrics IDs using the get_metrics tool and just requesting the 'name' field. Do not use any additional filters on the get_metrics tool. If a specific metric is not requested, use the ID of the metric named 'Placed Order'. If it doesn't exist, use any metric.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'statistics',
        type: 'array',
        required: true,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "bounce_rate", "bounced", "bounced_or_failed", "bounced_or_failed_rate", "click_rate", "click_to_open_rate", "clicks", "clicks_unique", "conversion_rate", "conversion_uniques", "conversions", "delivered", "delivery_rate", "failed", "failed_rate", "open_rate", "opens", "opens_unique", "recipients", "spam_complaint_rate", "spam_complaints", "unsubscribe_rate", "unsubscribe_uniques", "unsubscribes". Example: ["bounce_rate", "bounced", "bounced_or_failed"]`,
      },
      {
        name: 'detailFilters',
        type: 'array',
        required: false,
        description: `Array of detail filter objects for breakdown rows. Each object must have fieldName (e.g. "tags", "audiences.included.name"), operator, and value. Example: [{"fieldName": "tags", "operator": "equals", "value": "promo"}]`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "send_channel", "campaign_id"), operator (e.g. "equals", "contains-any"), and value. Example: [{"fieldName": "send_channel", "operator": "equals", "value": "email"}]`,
      },
      {
        name: 'groupBy',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "campaign_id", "campaign_message_id", "campaign_message_name", "group", "group_name", "send_channel", "tag_id", "tag_name", "text_message_format", "variation", "variation_name". Example: ["campaign_id", "campaign_message_id", "campaign_message_name"]`,
      },
      {
        name: 'groupByAudience',
        type: 'boolean',
        required: false,
        description: `If true, also return an aggregation of stats grouped by audience (list/segment) and send channel, combining data across campaigns.`,
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: `The timeframe to query for data within. The max length a timeframe can be is 1 year. If unspecified, use 1 year.`,
      },
      {
        name: 'valueStatistics',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "average_order_value", "conversion_value", "revenue_per_recipient". Example: ["average_order_value", "conversion_value", "revenue_per_recipient"]`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaign_send_job',
    description: `Get a campaign send job`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the campaign to send` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign_send_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_campaigns',
    description: `Returns some or all campaigns based on filters. You can view and edit a campaign in the Klaviyo UI at https://www.klaviyo.com/campaign/{CAMPAIGN_ID}/wizard. Do not use this for queries related to the status of campaigns, reporting on campaigns, or campaign performance data. For those use cases, use the get_campaign_report tool.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Which types of campaigns to return. To get all types of campaigns, call this tool for each channel.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'campaignMessageFields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "definition", "definition.channel", "definition.label", "definition.content", "definition.content.subject", "definition.content.preview_text", "definition.content.from_email", "definition.content.from_label", "definition.content.reply_to_email", "definition.content.cc_email", "definition.content.bcc_email", "definition.content.body", "definition.content.media_url", "definition.content.title", "definition.content.dynamic_image", "definition.render_options", "definition.render_options.shorten_links", "definition.render_options.add_org_prefix", "definition.render_options.add_info_link", "definition.render_options.add_opt_out_language", "definition.notification_type", "definition.kv_pairs", "definition.options", "definition.options.on_open", "definition.options.on_open.type", "definition.options.on_open.ios_deep_link", "definition.options.on_open.android_deep_link", "definition.options.badge", "definition.options.badge.display", "definition.options.badge.badge_options", "definition.options.badge.badge_options.badge_config", "definition.options.badge.badge_options.value", "definition.options.badge.badge_options.set_from_property", "definition.options.play_sound", "send_times", "created_at", "updated_at". Example: ["definition", "definition.channel", "definition.label"]`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "name", "status", "archived", "audiences", "audiences.included", "audiences.excluded", "send_options", "send_options.use_smart_sending", "tracking_options", "tracking_options.add_tracking_params", "tracking_options.custom_tracking_params", "tracking_options.is_tracking_clicks", "tracking_options.is_tracking_opens", "send_strategy", "send_strategy.method", "send_strategy.datetime", "send_strategy.options", "send_strategy.options.is_local", "send_strategy.options.send_past_recipients_immediately", "send_strategy.throttle_percentage", "send_strategy.date", "created_at", "scheduled_at", "updated_at", "send_time". Example: ["name", "status", "archived"]`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "status", "name", "archived"), operator (e.g. "equals", "contains", "any"), and value. Example: [{"fieldName": "status", "operator": "equals", "value": "Draft"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_catalog_categories',
    description: `Get all catalog categories in an account.

Catalog categories can be sorted by the following fields, in ascending and descending order:
\`created\`

Currently, the only supported integration type is \`$custom\`, and the only supported catalog type is \`$default\`.

Returns a maximum of 100 categories per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_category',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "ids": {
    "operators": [
      "any"
    ]
  },
  "item.id": {
    "operators": [
      "equals"
    ]
  },
  "name": {
    "operators": [
      "contains"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 100. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_catalog_category',
    description: `Get a catalog category with the given category ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog category ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_category',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_catalog_item',
    description: `Get a specific catalog item with the given item ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog item ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related variants.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_catalog_items',
    description: `Get all catalog items in an account. (Also known as products)`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'catalogVariantFields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "external_id", "title", "description", "sku", "inventory_policy", "inventory_quantity", "price", "url", "image_full_url", "image_thumbnail_url", "images", "custom_metadata", "published", "created", "updated". Example: ["external_id", "title", "description"]`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "external_id", "title", "description", "price", "url", "image_full_url", "image_thumbnail_url", "images", "custom_metadata", "published", "created", "updated". Example: ["external_id", "title", "description"]`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "title", "ids", "published"), operator (e.g. "contains", "any", "equals"), and value. Example: [{"fieldName": "title", "operator": "contains", "value": "shirt"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      { name: 'sort', type: 'string', required: false, description: `What to sort by.` },
    ],
  },
  {
    name: 'klaviyomcp_get_catalog_variant',
    description: `Get a catalog item variant with the given variant ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog variant ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_catalog_variants',
    description: `Get all variants in an account.

Variants can be sorted by the following fields, in ascending and descending order:
\`created\`

Currently, the only supported integration type is \`$custom\`, and the only supported catalog type is \`$default\`.

Returns a maximum of 100 variants per request.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "ids": {
    "operators": [
      "any"
    ]
  },
  "item.id": {
    "operators": [
      "equals"
    ]
  },
  "sku": {
    "operators": [
      "equals"
    ]
  },
  "title": {
    "operators": [
      "contains"
    ]
  },
  "published": {
    "operators": [
      "equals"
    ],
    "type": "bool"
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 100. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_coupon',
    description: `Get a specific coupon with the given coupon ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The internal id of a Coupon is equivalent to its external id stored within an integration.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_coupon_code',
    description: `Returns a Coupon Code specified by the given identifier.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id of a coupon code is a combination of its unique code and the id of the coupon it is associated with.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_coupon_code',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related coupon.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_coupon_codes',
    description: `Gets a list of coupon codes associated with a coupon/coupons or a profile/profiles.

A coupon/coupons or a profile/profiles must be provided as required filter params.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: true,
        description: `Available filters for this endpoint:

{
  "expires_at": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "UNASSIGNED",
      "PROCESSING",
      "ASSIGNED_TO_PROFILE",
      "VERSION_NOT_ACTIVE",
      "DELETING",
      "USED"
    ]
  },
  "coupon.id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "profile.id": {
    "operators": [
      "any",
      "equals"
    ]
  }
}`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_coupon_code',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related coupon.` },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 100. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_coupons',
    description: `Get all coupons in an account.

To learn more, see our Coupons API guide.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 100. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_custom_metric',
    description: `Get a custom metric with the given custom metric ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the custom metric` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_custom_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related metrics.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_custom_metrics',
    description: `Get all custom metrics in an account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_custom_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related metrics.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_customer_agent',
    description: `Returns the Customer Agent resource for the calling company.

Includes \`\`name\`\`, \`\`tone_of_voice\`\` with preset, optional
custom instruction, and updated timestamp, \`\`escalation_rules\`\`,
and \`\`communication_styles\`\`. There is one Customer Agent per
company.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_download_for_event_bulk_export_job',
    description: `Download the completed export as a gzipped CSV file.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_download',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_download_for_profile_bulk_export_job',
    description: `Download the completed export as a gzipped CSV file.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_download',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_email_template',
    description: `Get an email template with the given data. Returns attributes including the html or amp. You can view and edit a template in the Klaviyo UI at https://www.klaviyo.com/email-editor/{TEMPLATE_ID}/edit.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'templateId',
        type: 'string',
        required: true,
        description: `The ID of the template return`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_event',
    description: `Get an event with the given event ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the event` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_attribution',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_event',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_profile',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related attributions, metric, or profile.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_event_bulk_export_job',
    description: `Get the status and details of an event bulk export job.

When the job is complete, the response will include the expiration and file size
of the exported events file.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_event_bulk_export_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_events',
    description: `Get individual event records for a given filter such as a profile ID or metric ID. For aggregated data, prefer get_campaign_report or get_flow_report (performance metrics) or query_metric_aggregates (counts, sums, unique profiles). Only use this tool to inspect specific events or when the other tools don't support the dimension you need — in that case, only a small sample of events can be processed in context, so clearly tell the user the results are based on a limited sample.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "timestamp", "event_properties", "datetime", "uuid". Example: ["timestamp", "event_properties", "datetime"]`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "metric_id", "profile_id", "datetime"), operator (e.g. "equals", "greater-than"), and value. Example: [{"fieldName": "metric_id", "operator": "equals", "value": "abc123"}]`,
      },
      {
        name: 'metricFields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "name", "created", "updated", "integration". Example: ["name", "created", "updated"]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (1-1000). Default is 10. Keep small (10-50) when processing results in context. Use larger values only when paginating to export or aggregate data outside of context.`,
      },
      {
        name: 'profileFields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "email", "phone_number", "external_id", "first_name", "last_name", "organization", "locale", "title", "image", "created", "updated", "last_event_date", "location", "location.address1", "location.address2", "location.city", "location.country", "location.latitude", "location.longitude", "location.region", "location.zip", "location.timezone", "location.ip", "properties". Example: ["email", "phone_number", "external_id"]`,
      },
      { name: 'sort', type: 'string', required: false, description: `What to sort by.` },
    ],
  },
  {
    name: 'klaviyomcp_get_flow',
    description: `Returns a flow by ID. You can view and edit a flow in the Klaviyo UI at https://www.klaviyo.com/flow/{FLOW_ID}/edit.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flow_action',
    description: `Get a flow action from a flow with the given flow action ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_flow_action',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_flow_message',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related flow or flow-messages.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flow_message',
    description: `Get a flow message from a flow with the given flow message ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow_action',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_flow_message',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related flow-action or template.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flow_report',
    description: `Returns metrics data for flows with the given filters and within the given timeframe. Can return performance data such as opens, clicks, and conversions, etc. This tool will also give you information about each flow in the report, such as: flow name, trigger type, and flow ID.`,
    params: [
      {
        name: 'conversionMetricId',
        type: 'string',
        required: true,
        description: `ID of the metric to be used for conversion statistics. You can get available metrics IDs using the get_metrics tool and just requesting the 'name' field. Do not use any additional filters on the get_metrics tool. If a specific metric is not requested, use the ID of the metric named 'Placed Order'. If it doesn't exist, use any metric.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'statistics',
        type: 'array',
        required: true,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "bounce_rate", "bounced", "bounced_or_failed", "bounced_or_failed_rate", "click_rate", "click_to_open_rate", "clicks", "clicks_unique", "conversion_rate", "conversion_uniques", "conversions", "delivered", "delivery_rate", "failed", "failed_rate", "open_rate", "opens", "opens_unique", "recipients", "spam_complaint_rate", "spam_complaints", "unsubscribe_rate", "unsubscribe_uniques", "unsubscribes". Example: ["bounce_rate", "bounced", "bounced_or_failed"]`,
      },
      {
        name: 'detailFilters',
        type: 'array',
        required: false,
        description: `Array of detail filter objects. Each object must have fieldName ("name"), operator ("contains-any"), and value (array). Example: [{"fieldName": "name", "operator": "contains-any", "value": ["welcome"]}]`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "send_channel", "flow_id"), operator (e.g. "equals", "contains-any"), and value. Example: [{"fieldName": "send_channel", "operator": "equals", "value": "email"}]`,
      },
      {
        name: 'groupBy',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "flow_id", "flow_name", "flow_message_id", "flow_message_name", "send_channel", "tag_id", "tag_name", "text_message_format", "variation", "variation_name". Example: ["flow_id", "flow_name", "flow_message_id"]`,
      },
      {
        name: 'timeframe',
        type: 'string',
        required: false,
        description: `The timeframe to query for data within. The max length a timeframe can be is 1 year. If unspecified, use 1 year.`,
      },
      {
        name: 'valueStatistics',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "average_order_value", "conversion_value", "revenue_per_recipient". Example: ["average_order_value", "conversion_value", "revenue_per_recipient"]`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flows',
    description: `Returns some or all flows based on filters. You can view and edit a flow in the Klaviyo UI at https://www.klaviyo.com/flow/{FLOW_ID}/edit. Do not use this for queries related to the status of flows, reporting on flows, or flow performance data. For those use cases, use the get_flow_report tool.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "name", "status", "archived", "created", "updated", "trigger_type". Example: ["name", "status", "archived"]`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects to narrow results. Each object must have fieldName (e.g. "status", "name", "trigger_type"), operator (e.g. "equals", "contains", "any"), and value. Example: [{"fieldName": "status", "operator": "equals", "value": "live"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (1-100)`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flows_triggered_by_list',
    description: `Get all flows where the given list ID is being used as the trigger.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Primary key that uniquely identifies this list. Generated by Klaviyo.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flows_triggered_by_metric',
    description: `Get all flows where the given metric is being used as the trigger.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_flows_triggered_by_segment',
    description: `Get all flows where the given segment ID is being used as the trigger.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Primary key that uniquely identifies this segment. Generated by Klaviyo.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_form',
    description: `Get the form with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the form` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_form',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_form_version',
    description: `Get the form version with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the form version` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_form',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_form_version',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related form.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_forms',
    description: `Get all forms in an account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_form',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "name": {
    "operators": [
      "any",
      "contains",
      "equals"
    ]
  },
  "ab_test": {
    "operators": [
      "equals"
    ],
    "type": "bool"
  },
  "updated_at": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "created_at": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "live",
      "draft"
    ]
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_image',
    description: `Get the image with the given image ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the image` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_image',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_images',
    description: `Get all images in an account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_image',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "updated_at": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "format": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "name": {
    "operators": [
      "any",
      "contains",
      "ends-with",
      "equals",
      "starts-with"
    ]
  },
  "size": {
    "operators": [
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "int"
  },
  "hidden": {
    "operators": [
      "any",
      "equals"
    ],
    "type": "bool"
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_list',
    description: `Get a list with the given list ID. You can view and edit a list in the Klaviyo UI at https://www.klaviyo.com/lists/{LIST_ID}`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'includeProfileCount',
        type: 'boolean',
        required: false,
        description: `Whether to include the number of profiles. Only set to true if this is requested.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_lists',
    description: `Get all lists in an account. To filter by tag, do not use the 'filters' parameter. Instead, call this and look for the 'tags' property in the response. You can view and edit a list in the Klaviyo UI at https://www.klaviyo.com/lists/{LIST_ID}`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "name", "created", "updated", "opt_in_process". Example: ["name", "created", "updated"]`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "name", "id"), operator (e.g. "equals", "any"), and value. Example: [{"fieldName": "name", "operator": "equals", "value": "My List"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      { name: 'sort', type: 'string', required: false, description: `What to sort by.` },
    ],
  },
  {
    name: 'klaviyomcp_get_mapped_metric',
    description: `Get the mapped metric with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The type of mapping.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_custom_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_mapped_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related custom-metric or metric.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_mapped_metrics',
    description: `Get all mapped metrics in an account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_custom_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_mapped_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related custom-metric or metric.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_messaging_sender_registration_id_for_text_messaging_sender',
    description: `Return the most-recent registration for the given sender.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the text-messaging sender.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_metric',
    description: `Get a metric with the given metric ID. You can view and edit a metric in the Klaviyo UI at https://www.klaviyo.com/metric/{METRIC_ID}/{METRIC_NAME}`,
    params: [
      {
        name: 'metricId',
        type: 'string',
        required: true,
        description: `The ID of the metric to return`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_metric_property',
    description: `Get a metric property with the given metric property ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the metric property` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_metric_property',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'sample_values'`,
      },
      {
        name: 'fields_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_metric_property',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related metric.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_metrics',
    description: `Get all metrics in an account. You can view and edit a metric in the Klaviyo UI at https://www.klaviyo.com/metric/{METRIC_ID}/{METRIC_NAME}`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "name", "created", "updated", "integration". Example: ["name", "created", "updated"]`,
      },
      {
        name: 'filter',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "integration.name", "integration.category"), operator ("equals"), and value. Example: [{"fieldName": "integration.name", "operator": "equals", "value": "Shopify"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_profile',
    description: `Get details of the profile with the given profile ID. Includes additional information about their subscriptions. You can view and edit a profile in the Klaviyo UI at https://www.klaviyo.com/profile/{PROFILE_ID}`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The profile ID to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_profile_bulk_export_job',
    description: `Get the status and details of a profile bulk export job.

When the job is complete, the response will include the expiration and file size
of the exported profiles file.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `ID of the job to retrieve.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile_bulk_export_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_profiles',
    description: `Get all profiles in an account. You can view and edit a profile in the Klaviyo UI at https://www.klaviyo.com/profile/{PROFILE_ID}`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "email", "phone_number", "external_id", "first_name", "last_name", "organization", "locale", "title", "image", "created", "updated", "last_event_date", "location", "location.address1", "location.address2", "location.city", "location.country", "location.latitude", "location.longitude", "location.region", "location.zip", "location.timezone", "location.ip", "properties". Example: ["email", "phone_number", "external_id"]`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "email", "id", "phone_number"), operator (e.g. "equals", "any"), and value. Example: [{"fieldName": "email", "operator": "equals", "value": "user@example.com"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of results to return per page (1-100)`,
      },
      { name: 'sort', type: 'string', required: false, description: `What to sort by.` },
    ],
  },
  {
    name: 'klaviyomcp_get_push_token',
    description: `Return a specific push token based on its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The value of the push token` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_push_token',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related profile.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_push_tokens',
    description: `Return push tokens associated with company.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_push_token',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "id": {
    "operators": [
      "equals"
    ]
  },
  "profile.id": {
    "operators": [
      "equals"
    ]
  },
  "enablement_status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "AUTHORIZED",
      "UNAUTHORIZED",
      "DENIED",
      "PROVISIONAL",
      "NOT_DETERMINED"
    ]
  },
  "platform": {
    "operators": [
      "equals"
    ],
    "enum": [
      "ios",
      "android"
    ]
  }
}`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related profile.` },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_review',
    description: `Get the review with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the review` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_event',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_review',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related events.` },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_reviews',
    description: `Get all reviews.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_event',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_review',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "created": {
    "operators": [
      "greater-or-equal",
      "less-or-equal"
    ],
    "type": "datetime"
  },
  "rating": {
    "operators": [
      "any",
      "equals",
      "greater-or-equal",
      "less-or-equal"
    ],
    "type": "int"
  },
  "id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "item.id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "content": {
    "operators": [
      "contains"
    ]
  },
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "published",
      "unpublished",
      "rejected",
      "featured",
      "pending",
      "all"
    ]
  },
  "review_type": {
    "operators": [
      "equals"
    ],
    "enum": [
      "question",
      "review",
      "rating",
      "store"
    ]
  },
  "verified": {
    "operators": [
      "equals"
    ],
    "type": "bool"
  }
}`,
      },
      { name: 'include', type: 'string', required: false, description: `Include related events.` },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_segment',
    description: `Get a segment with the given segment ID. You can view and edit a segment in the Klaviyo UI at https://www.klaviyo.com/lists/{SEGMENT_ID}`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      { name: 'segmentId', type: 'string', required: true, description: `No description.` },
      {
        name: 'includeProfileCount',
        type: 'boolean',
        required: false,
        description: `Whether to include the number of profiles. Only set to true if this is requested.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_segments',
    description: `Get all segments in an account. To filter by tag, do not use the 'filters' parameter. Instead, call this and look for the 'tags' property in the response. You can view and edit a segment in the Klaviyo UI at https://www.klaviyo.com/lists/{SEGMENT_ID}`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "name", "definition", "definition.condition_groups", "created", "updated", "is_active", "is_processing", "is_starred". Example: ["name", "definition", "definition.condition_groups"]`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Array of filter objects. Each object must have fieldName (e.g. "name", "id", "is_active"), operator (e.g. "equals", "any"), and value. Example: [{"fieldName": "name", "operator": "equals", "value": "Active Users"}]`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      { name: 'sort', type: 'string', required: false, description: `What to sort by.` },
    ],
  },
  {
    name: 'klaviyomcp_get_sending_domain',
    description: `Get the sending domain with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the sending domain.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_sending_domain',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_sending_domains',
    description: `List all sending domains configured for the account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_sending_domain',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 20. Min: 1. Max: 20.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_skills_for_agent_tool',
    description: `List Agent Skill resources that can call this Agent Tool.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_skill',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'page_cursor', type: 'string', required: false, description: `Page cursor` },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 50. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_tag',
    description: `Retrieve the tag with the given tag ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_tag',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_tag_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related tag-group.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_tag_group',
    description: `Retrieve the tag group with the given tag group ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The Tag Group ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_tag_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_tag_groups',
    description: `List all tag groups in an account. Every account has one default tag group.

Tag groups can be filtered by \`name\`, \`exclusive\`, and \`default\`, and sorted by \`name\` or \`id\` in ascending or descending order.

Returns a maximum of 25 tag groups per request, which can be paginated with
cursor-based pagination.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_tag_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "name": {
    "operators": [
      "contains",
      "ends-with",
      "equals",
      "starts-with"
    ]
  },
  "exclusive": {
    "operators": [
      "equals"
    ],
    "type": "bool"
  },
  "default": {
    "operators": [
      "equals"
    ],
    "type": "bool"
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 25. Min: 1. Max: 25.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_tags',
    description: `List all tags in an account.

Tags can be filtered by \`name\`, and sorted by \`name\` or \`id\` in ascending or descending order.

Returns a maximum of 50 tags per request, which can be paginated with
cursor-based pagination.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_tag',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_tag_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "name": {
    "operators": [
      "contains",
      "ends-with",
      "equals",
      "starts-with"
    ]
  }
}`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related tag-group.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 50. Min: 1. Max: 50.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_text_messaging_configuration',
    description: `Retrieve the SMS account for the calling company.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier for this text messaging configuration (must equal the caller's company id).`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_configuration',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_text_messaging_sender',
    description: `Retrieve a single text-messaging sender by ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier for the text-messaging sender.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_sender',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_text_messaging_sender_registration',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related text-messaging-sender-registration.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_text_messaging_sender_registration',
    description: `Retrieve a sender registration by ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the sender registration.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_sender',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_text_messaging_sender_registration',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related text-messaging-sender.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_text_messaging_senders',
    description: `List the calling company's text-messaging senders.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_text_messaging_sender',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_text_messaging_sender_registration',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related text-messaging-sender-registration.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 10. Min: 1. Max: 20.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_translation',
    description: `Get a translation collection by ID. Returns localization settings (source/target locales, channel, fallback). Set includeValues to true to also get the translation values (source text and translations per locale for each translatable field).`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'translationId',
        type: 'string',
        required: true,
        description: `The ID of the translation`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Related resource to include in the response`,
      },
      {
        name: 'includeValues',
        type: 'boolean',
        required: false,
        description: `Include translation values (source text and translations per locale)`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_translations',
    description: `List all translation collections in the account. Each translation links a Klaviyo resource (campaign variation, flow message, template, etc.) to its localization settings. Supports filtering by channel, resource_type, and related_resource_id.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter string, e.g. equals(channel,"email") or equals(resource_type,"campaign-variation")`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination (from previous response)`,
      },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Page size (1-100, default 20)`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_universal_content',
    description: `Get the universal content with the given ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the universal content`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template_universal_content',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_webhook',
    description: `Get the webhook with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the webhook.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_webhook',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_webhook_topic',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related webhook-topics.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_webhook_topic',
    description: `Get the webhook topic with the given ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the webhook topic.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_webhook_topic',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_webhook_topics',
    description: `Get all webhook topics in a Klaviyo account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_webhook_topic',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_get_webhooks',
    description: `Get all webhooks in an account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_webhook',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'fields_webhook_topic',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include related webhook-topics.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_list_agent_knowledge',
    description: `Returns every Agent Knowledge item for the calling company,
including items that are pending, indexing, indexed, failed, or
rejected.

To add a snippet or webpage, POST to this endpoint with the
appropriate nested \`\`source.source_type\`\`; upload files with the
file upload endpoint.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_knowledge',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      { name: 'page_cursor', type: 'string', required: false, description: `Page cursor` },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 50. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      { name: 'sort', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'klaviyomcp_list_billing_usage',
    description: `List current-period usage and plan caps for the account.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_billing_usage',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "id": {
    "operators": [
      "any"
    ]
  }
}`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_list_customer_agent_conversations',
    description: `Returns Customer Agent conversations for the calling company.

Results are ordered with newest conversations first. Supports
filters by \`\`status\`\` and \`\`created_at\`\` time window, plus
cursor pagination for large pulls. Use to audit production
behavior, spot-check escalations, or feed conversation samples
back into Configure decisions.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_conversation',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "created_at": {
    "operators": [
      "greater-or-equal"
    ],
    "type": "datetime"
  },
  "status": {
    "operators": [
      "equals"
    ],
    "enum": [
      "open",
      "routed-to-team",
      "resolved-by-ai",
      "closed"
    ]
  }
}`,
      },
      { name: 'page_cursor', type: 'string', required: false, description: `Page cursor` },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 50. Min: 1. Max: 100.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_list_email_templates',
    description: `List email templates in the account with optional filtering and sorting. Returns template metadata (id, name, editor_type, html, created, updated). Drag-and-drop (SYSTEM_DRAGGABLE) templates only include their structured definition when additional_fields_template includes "definition". For a single template, prefer get_email_template.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_template',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'definition'`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Available filters for this endpoint:

{
  "id": {
    "operators": [
      "any",
      "equals"
    ]
  },
  "name": {
    "operators": [
      "any",
      "contains",
      "equals"
    ]
  },
  "created": {
    "operators": [
      "equals",
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  },
  "updated": {
    "operators": [
      "equals",
      "greater-or-equal",
      "greater-than",
      "less-or-equal",
      "less-than"
    ],
    "type": "datetime"
  }
}`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor returned in the previous response's \`links.next\`; supply to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Default: 10. Min: 1. Max: 10.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by attribute. Prefix with \`-\` for descending order.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_merge_profiles',
    description: `Merge a given related profile into a profile with the given profile ID.

The profile provided under \`relationships\` (the "source" profile) will be merged into the profile provided by the ID in the base data object (the "destination" profile).
This endpoint queues an asynchronous task which will merge data from the source profile into the destination profile, deleting the source profile in the process. This endpoint accepts only one source profile.

To learn more about how profile data is preserved or overwritten during a merge, please [visit our Help Center](https://help.klaviyo.com/hc/en-us/articles/115005073847#merge-2-profiles3).

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_profile',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_customer_agent_skill_values',
    description: `Returns per-skill aggregates across the requested timeframe.

Each row of \`\`results\`\` is one skill bucket with a computed
\`\`volume\`\` statistic. Counts are at the invocation level: one
conversation that runs multiple skills contributes to multiple
buckets.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_skill_values_report',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_customer_agent_values',
    description: `Returns conversation-level aggregates across the requested
timeframe.

A single call may request multiple \`\`statistics\`\` (\`\`volume\`\`
and/or \`\`resolution-rate\`\`); each row of \`\`results\`\` carries the
bucket-identifying \`\`groupings\`\` values and computed
\`\`statistics\`\` for that bucket. Optionally group by \`\`channel\`\`
or \`\`status\`\`, or omit \`\`groupings\`\` for a single overall row.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_values_report',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_form_series',
    description: `Returns the requested form analytics series data.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_form_series_report',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_form_values',
    description: `Returns the requested form analytics values data.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_form_values_report',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_metric_aggregates',
    description: `Query and aggregate event data for a specific metric, with optional grouping by dimensions such as flows, campaigns, messages, etc.

IMPORTANT: This endpoint returns data based on EVENT TIME (when events occurred), NOT send date. For campaign/flow performance data that matches the Klaviyo UI (which uses send date), use get_campaign_report or get_flow_report instead. Only use this tool when:
- You need to aggregate raw event data by dimensions not supported by the Reporting API, but supported by this endpoint
- You need time-series data broken down by hour/day/week/month
- The Reporting API tools (get_campaign_report, get_flow_report) don't fulfill your specific requirements
- You need to query custom metrics or non-standard aggregations

Results from this endpoint are not directly comparable to get_campaign_report or get_flow_report due to different time semantics and uniqueness definitions (not attribution — both use the same attribution framework). If cross-referencing, clearly caveat this to the user.

Examples of appropriate use cases:
- Sum of revenue by flow over a time period (use sum_value measurement with $attributed_flow grouping)
- Count of events per day/week/month for trend analysis
- Unique profile counts grouped by campaign or message
- Custom metric aggregations not available in standard reports`,
    params: [
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `End of the date range (exclusive) in ISO 8601 format without timezone offset, e.g. '2024-12-31T23:59:59'. Do not include a 'Z' suffix or timezone offset; use the timezone parameter instead. The date range must not exceed 1 year.`,
      },
      {
        name: 'measurements',
        type: 'array',
        required: true,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "count", "sum_value", "unique". Example: ["count", "sum_value", "unique"]`,
      },
      {
        name: 'metricId',
        type: 'string',
        required: true,
        description: `The ID of the metric to aggregate. Use the get_metrics tool to find available metric IDs. Common metrics include 'Placed Order', 'Opened Email', 'Clicked Email', etc.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Start of the date range (inclusive) in ISO 8601 format without timezone offset, e.g. '2024-01-01T00:00:00'. Do not include a 'Z' suffix or timezone offset; use the timezone parameter instead. The date range must not exceed 1 year.`,
      },
      {
        name: 'additionalFilter',
        type: 'string',
        required: false,
        description: `Optional structured filter to narrow results by a single dimension. Only one additional filter is supported by the API.`,
      },
      {
        name: 'groupBy',
        type: 'array',
        required: false,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "$attributed_channel", "$attributed_flow", "$attributed_message", "$attributed_variation", "$campaign_channel", "$flow", "$flow_channel", "$message", "$message_send_cohort", "$usage_amount", "$value_currency", "$variation", "$variation_send_cohort", "Bot Click", "Bounce Type", "Campaign Name", "Client Canonical", "Client Name", "Client Type", "Email Domain", "Failure Source", "Failure Type", "From Number", "From Phone Region", "Inbox Provider", "List", "Message Name", "Message Type", "Method", "Segment Count", "Subject", "To Number", "To Phone Region", "URL", "form_id". Example: ["$attributed_channel", "$attributed_flow", "$attributed_message"]`,
      },
      {
        name: 'interval',
        type: 'string',
        required: false,
        description: `Time interval for grouping results: 'hour', 'day' (default), 'week', or 'month'`,
      },
      {
        name: 'pageCursor',
        type: 'string',
        required: false,
        description: `Only used for pagination. If links.next is null then you've reached the last page of results. Otherwise, pass links.next to this parameter to get the next page.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of rows per page. Must be between 500 and 10,000 (default 500).`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by a grouping dimension. Prefix with '-' for descending order (e.g., '-$attributed_flow'). The sort value must also be included in the 'groupBy' parameter. Only dimension-based sorting is supported.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for processing the query (e.g., 'America/New_York', 'US/Eastern'). Defaults to UTC.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_segment_series',
    description: `Returns the requested segment analytics series data.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_segment_series_report',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_query_segment_values',
    description: `Returns the requested segment analytics values data.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_segment_values_report',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_refresh_campaign_recipient_estimation',
    description: `Trigger an asynchronous job to update the estimated number of recipients
for the given campaign ID. Use the \`Get Campaign Recipient Estimation
Job\` endpoint to retrieve the status of this estimation job. Use the
\`Get Campaign Recipient Estimation\` endpoint to retrieve the estimated
recipient count for a given campaign.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign_recipient_estimation_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_categories_from_catalog_item',
    description: `Delete catalog category relationships for the given item ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog item ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_items_from_catalog_category',
    description: `Delete item relationships for the given category ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog category ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_profiles_from_list',
    description: `Remove a profile from a list with the given list ID.

The provided profile will no longer receive marketing from this particular list once removed.

Removing a profile from a list will not impact the profile's consent status or subscription status in general.
To update a profile's subscription status, please use the Unsubscribe Profiles endpoint.

This endpoint accepts a maximum of 1000 profiles per call.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_tag_from_campaigns',
    description: `Remove a tag's association with one or more campaigns.


Use the request body to pass in the ID(s) of the campaign(s) whose association with the tag
will be removed.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_tag_from_flows',
    description: `Remove a tag's association with one or more flows.


Use the request body to pass in the ID(s) of the flows(s) whose association with the tag
will be removed.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_tag_from_lists',
    description: `Remove a tag's association with one or more lists.


Use the request body to pass in the ID(s) of the list(s) whose association with the tag
will be removed.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_remove_tag_from_segments',
    description: `Remove a tag's association with one or more segments.


Use the request body to pass in the ID(s) of the segments(s) whose association with the tag
will be removed.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_render_email_template',
    description: `Render an email template with a provided context. Returns the HTML, plaintext, and AMP versions of the template with template tags evaluated. Does not modify the template or send any email. Templates are rendered with contexts in a similar manner to Django templates; nested variables can be referenced via dot notation. Variables without corresponding context values are treated as FALSE. Rate-limited to 3/s burst and 60/m steady — significantly stricter than other template endpoints.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_request_profile_deletion',
    description: `Request a deletion for the profiles corresponding to one of the following identifiers: \`email\`, \`phone_number\`, or \`id\`. If multiple identifiers are provided, we will return an error.

All profiles that match the provided identifier will be deleted.

The deletion occurs asynchronously; however, once it has completed, the deleted profile will appear on the [Deleted Profiles page](https://www.klaviyo.com/account/deleted).

For more information on the deletion process, please refer to our [Help Center docs on how to handle GDPR and CCPA deletion requests](https://help.klaviyo.com/hc/en-us/articles/360004217631-How-to-Handle-GDPR-Requests#record-gdpr-and-ccpa%20%20-deletion-requests2).

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_retrieve_customer_agent_conversation',
    description: `Returns one Customer Agent conversation with its status and message
turns.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_conversation',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_send_campaign',
    description: `Trigger a campaign to send asynchronously. Creates a campaign send job that sends the campaign to its configured audience. Once recipients start receiving messages the send cannot be undone; a send in progress can be stopped with cancel_campaign_send. Track progress with get_campaign_send_job.

This action requires explicit user confirmation. Call the tool normally first; it will fail with instructions for obtaining the user's approval and retrying.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign_send_job',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
      {
        name: 'user_confirmation',
        type: 'string',
        required: false,
        description: `Leave unset. This action requires the user's confirmation; the first call fails with instructions that include the exact value to supply here once the user has approved.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_subscribe_profile_to_marketing',
    description: `Subscribe a profile to marketing for a given channel. If a profile doesn't already exist, it will be created. Returns 'Success' if successful.`,
    params: [
      {
        name: 'channels',
        type: 'array',
        required: true,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "email", "sms". Example: ["email", "sms"]`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'emailAddress',
        type: 'string',
        required: false,
        description: `The email address of the profile to subscribe. Required if email channel is included.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `The ID of the list to subscribe the profile to if provided.`,
      },
      {
        name: 'phoneNumber',
        type: 'string',
        required: false,
        description: `The phone number of the profile to subscribe. Required if sms channel is included.`,
      },
      {
        name: 'profileId',
        type: 'string',
        required: false,
        description: `The ID of the profile to subscribe if the profile already exists and has an ID.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_tag_campaigns',
    description: `Associate a tag with one or more campaigns. Any campaign cannot be associated with more than **100** tags.


Use the request body to pass in the ID(s) of the campaign(s) that will be associated with the tag.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_tag_flows',
    description: `Associate a tag with one or more flows. Any flow cannot be associated with more than **100** tags.


Use the request body to pass in the ID(s) of the flow(s) that will be associated with the tag.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_tag_lists',
    description: `Associate a tag with one or more lists. Any list cannot be associated with more than **100** tags.


Use the request body to pass in the ID(s) of the lists(s) that will be associated with the tag.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_tag_segments',
    description: `Associate a tag with one or more segments. Any segment cannot be associated with more than **100** tags.


Use the request body to pass in the ID(s) of the segments(s) that will be associated with the tag.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_unsubscribe_profile_from_marketing',
    description: `Unsubscribe a profile from marketing for a given channel. Returns 'Success' if successful.`,
    params: [
      {
        name: 'channels',
        type: 'array',
        required: true,
        description: `Array of strings to include in the response. Pass as a JSON array. Accepted values: "email", "sms". Example: ["email", "sms"]`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'emailAddress',
        type: 'string',
        required: false,
        description: `The email address of the profile to unsubscribe. Required if email channel is included.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `The ID of the list to unsubscribe the profile to if provided.`,
      },
      {
        name: 'phoneNumber',
        type: 'string',
        required: false,
        description: `The phone number of the profile to unsubscribe. Required if sms channel is included.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_agent_knowledge',
    description: `Patches editable fields on an Agent Knowledge item.

For snippets, you can update \`\`title\`\` and \`\`content\`\`. Re-
indexing on content change is automatic.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_knowledge',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_agent_skill',
    description: `Patches one or more fields on an existing skill: \`\`display_name\`\`,
\`\`description\`\`, \`\`instructions\`\`, \`\`status\`\`, \`\`handoff\`\`, and the
\`\`agent-tools\`\` relationship or named \`\`references\`\` used as \`\`{{tool
ref=<name>}}\`\` in instructions.

Send \`\`instructions\`\` and \`\`references\`\` together when changing either
one. They form one replacement document and are validated together.
To rebind tools, send a new
\`\`agent-tools\`\` relationship list; this is a full replacement, not
merged. Skills are looked up by prefixed \`\`id\`\`. Use
\`\`status: draft\`\` to pause a custom skill.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_skill',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_agent_tool',
    description: `Patches the tool's config in place: protocol, templated request
configuration, variables, auth, and referenced secrets.

All skills bound to this tool pick up the new behavior
immediately on next call.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_agent_tool',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_brand_button',
    description: `Update the brand button with the given ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The ID of the brand button.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_button',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_brand_color',
    description: `Update the brand color group with the given ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand color group.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_color',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_brand_email_default',
    description: `Partial update of the brand email defaults for the authenticated account.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand email defaults (must equal the account ID).`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_email_default',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_brand_logo',
    description: `Update the brand logo with the given ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The ID of the brand logo.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_logo',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_brand_social_group',
    description: `Update the brand social group with the given ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the brand social group.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_social_group',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_brand_voice',
    description: `Update the brand voice for the authenticated company.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company ID. Must match the authenticated account.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_brand_voice',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_campaign',
    description: `Update a campaign with the given campaign ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The campaign ID to be retrieved`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_campaign_message',
    description: `Update a campaign message`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The message ID to be retrieved` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_campaign_message',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_catalog_category',
    description: `Update a catalog category with the given category ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog category ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_category',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_catalog_item',
    description: `Update a catalog item with the given item ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog item ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_item',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_catalog_variant',
    description: `Update a catalog item variant with the given variant ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog variant ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_catalog_variant',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_categories_for_catalog_item',
    description: `Update catalog category relationships for the given item ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog item ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_coupon',
    description: `*Rate limits*:<br>Burst: \`3/s\`<br>Steady: \`60/m\``,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The internal id of a Coupon is equivalent to its external id stored within an integration.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_coupon_code',
    description: `Updates a coupon code specified by the given identifier synchronously. We allow updating the 'status' and
'expires_at' of coupon codes.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id of a coupon code is a combination of its unique code and the id of the coupon it is associated with.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_coupon_code',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_custom_metric',
    description: `Update a custom metric with the given custom metric ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The ID of the custom metric` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_custom_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_customer_agent',
    description: `Patches the Customer Agent resource for the calling company.

The request body \`\`data.id\`\` must match the path parameter.
Supports \`\`name\`\`, \`\`tone_of_voice\`\`, \`\`escalation_rules\`\`, and
\`\`communication_styles\`\`. For tone, provide
\`\`tone_of_voice.preset\`\` from the supported enum, or
\`\`preset: "custom"\`\` together with \`\`custom_instruction\`\`. For
\`\`escalation_rules\`\` and \`\`communication_styles\`\`, the supplied
array replaces the existing list; omit the field to leave the
existing list unchanged. Takes effect on the next turn.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_customer_agent_conversation',
    description: `Close a Customer Agent conversation.

\`\`status\`\` is the only updatable attribute and only \`\`closed\`\`
is accepted (the DTO's \`\`Literal\`\` constraint enforces this
before this handler runs).`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_customer_agent_conversation',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_dnd_email_template',
    description: `Update an existing drag-and-drop (DND) email template. Provide any combination of name, definition, or text to update. The definition fully replaces the existing one — partial updates to individual sections/blocks are not supported. To update a DND template, first retrieve it with get_email_template, modify the definition, then pass the full definition here.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The ID of template` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_template',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'definition'`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_email_template',
    description: `Update an existing HTML email template (CODE or USER_DRAGGABLE editor type). For drag-and-drop (SYSTEM_DRAGGABLE) templates, use update_dnd_email_template instead — passing html to a DND template will return a 400. Provide any combination of name, html, or text to update; only provided fields change. The template's editor type cannot be changed.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The ID of template` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'additional_fields_template',
        type: 'string',
        required: false,
        description: `Request additional fields not included by default in the response. Supported values: 'definition'`,
      },
      {
        name: 'fields_template',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_flow',
    description: `Update the status of a flow with the given flow ID, and all actions in that flow.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the Flow to update. Ex: XVTP5Q`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_flow_action',
    description: `Update a flow action.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_flow_action',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_image',
    description: `Update the image with the given image ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The ID of the image` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_image',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_image_for_campaign_message',
    description: `Update the image associated with a campaign message. Provide the ID of an existing image — e.g. one uploaded with upload_image_from_url.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_items_for_catalog_category',
    description: `Update item relationships for the given category ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The catalog category ID is a compound ID (string), with format: \`{integration}:::{catalog}:::{external_id}\`. Currently, the only supported integration type is \`$custom\`, and the only supported catalog is \`$default\`.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_list',
    description: `Update the name of a list with the given list ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Primary key that uniquely identifies this list. Generated by Klaviyo.`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_list',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_mapped_metric',
    description: `Update the mapped metric with the given ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The type of mapping.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_mapped_metric',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_profile',
    description: `Update the profile with the given profile ID. You can view and edit a profile in the Klaviyo UI at https://www.klaviyo.com/profile/{PROFILE_ID}`,
    params: [
      { name: 'input', type: 'object', required: true, description: `ProfilePartialUpdateQuery` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_review',
    description: `Update a review.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id of the review (review ID).`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_review',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_segment',
    description: `Update a segment with the given segment ID.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `No description.` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_segment',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_tag',
    description: `Update the tag with the given tag ID.

Only a tag's \`name\` can be changed. A tag cannot be moved from one tag group to another.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_tag_group',
    description: `Update the tag group with the given tag group ID.

Only a tag group's \`name\` can be changed. A tag group's \`exclusive\` or \`default\` value cannot be changed.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      { name: 'id', type: 'string', required: true, description: `The Tag Group ID` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_translation',
    description: `Update a translation's settings and/or import translation values. All attributes are optional — only provided fields are updated. To import values, first call get_translation with includeValues=true, then provide the values array with updated translations. Each value has an 'id' (composite key like 'scheduled_message::abc::subject') and a 'translations' object mapping locale codes to translated text.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'translationId',
        type: 'string',
        required: true,
        description: `The ID of the translation to update`,
      },
      {
        name: 'fallbackLocale',
        type: 'string',
        required: false,
        description: `Updated fallback locale`,
      },
      {
        name: 'sourceLocale',
        type: 'string',
        required: false,
        description: `Updated source locale`,
      },
      {
        name: 'targetLocales',
        type: 'array',
        required: false,
        description: `Updated target locales. Pass as a JSON array of values.`,
      },
      {
        name: 'values',
        type: 'array',
        required: false,
        description: `Translation values to import. Pass as a JSON array of values.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_update_universal_content',
    description: `Update universal content. The \`definition\` field can only be updated on the following block types at this time: \`button\`, \`drop_shadow\`, \`horizontal_rule\`, \`html\`, \`image\`, \`spacer\`, and \`text\`.`,
    params: [
      { name: 'body', type: 'object', required: true, description: `No description.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the template universal content`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name and version of the LLM currently using the tool, as specifically as known.`,
      },
      {
        name: 'fields_template_universal_content',
        type: 'string',
        required: false,
        description: `Return only a subset of fields in the response.`,
      },
      {
        name: 'prompt_intent',
        type: 'string',
        required: false,
        description: `User's goal for this request in one sentence (the why, not the arguments), under 200 chars. Exclude PII and customer-specific values; refer to entities generically; omit if you can't.`,
      },
    ],
  },
  {
    name: 'klaviyomcp_upload_image_from_url',
    description: `Upload an image from a URL or data URI.`,
    params: [
      {
        name: 'imageURL',
        type: 'string',
        required: true,
        description: `The URL of the image to upload`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The name of the LLM currently using the tool.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A name for the image. Defaults to the filename if omitted.`,
      },
    ],
  },
]
