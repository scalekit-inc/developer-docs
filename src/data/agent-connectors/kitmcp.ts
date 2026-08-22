import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'kitmcp_add_subscriber_to_form',
    description: `Subscribe a single email address to a Kit form. Creates the subscriber if they do not exist; returns the subscriber record.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `Subscriber's email address (required)`,
      },
      {
        name: 'form_id',
        type: 'integer',
        required: true,
        description: `The form ID (required). Use list_forms to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_add_subscriber_to_sequence',
    description: `Enroll a single subscriber (by email) into a Kit email sequence. Use list_sequences to find the sequence ID.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `Subscriber's email address (required)`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_add_subscribers_to_form',
    description: `[STALE — upstream renamed 'bulk_add_subscribers_to_form' to 'bulk_add_subscribers_to_forms'; kept for compatibility, no longer exposed by upstream MCP server] Subscribe multiple existing subscribers to one or more forms in a single request. Batches over 100 are processed asynchronously.`,
    params: [
      {
        name: 'additions',
        type: 'array',
        required: true,
        description: `Form subscriptions to create (required). Each item must include \`form_id\` and \`subscriber_id\`.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_add_subscribers_to_forms',
    description: `[Forms] Subscribe multiple existing subscribers to one or more forms in a single call, triggering the form's confirmation or incentive email for each. Use this instead of calling add_subscriber_to_form repeatedly for onboarding or lead-import workflows.

Subscribers must already exist. Each entry in \`additions\` requires a \`form_id\` and \`subscriber_id\`; \`referrer\` is optional. Use list_forms to find form IDs and list_subscribers or filter_subscribers to find subscriber IDs.

Batches of 100 or fewer are processed synchronously (200). Larger batches are queued asynchronously (202) — supply \`callback_url\` to receive results when processing completes.

Returns: \`subscribers\` (successfully added, each with id, first_name, email_address, created_at, added_at, referrer, referrer_utm_parameters) and \`failures\` (with error details per entry).`,
    params: [
      {
        name: 'additions',
        type: 'array',
        required: true,
        description: `Form subscriptions to create (required). Each item must include \`form_id\` and \`subscriber_id\`.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_create_custom_fields',
    description: `Create multiple custom subscriber fields in one request. Use list_custom_fields to view existing fields.`,
    params: [
      {
        name: 'custom_fields',
        type: 'array',
        required: true,
        description: `Custom field definitions to create (required). Each item must include \`label\`.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_create_subscribers',
    description: `Create or update multiple subscribers in one request. Batches over 100 are processed asynchronously.`,
    params: [
      {
        name: 'subscribers',
        type: 'array',
        required: true,
        description: `Subscribers to upsert (required). Each item must include \`email_address\`; \`first_name\` and \`state\` are optional.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_create_tags',
    description: `Create multiple tags in one request. Returns created tag records.`,
    params: [
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Tags to create (required). Each item must include \`name\`.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_delete_tags',
    description: `[Tags] Delete multiple tags in a single call by ID. Use this to clean up a tag taxonomy or remove tags in bulk.

Each entry in \`tags\` requires an \`id\`. Deleting a tag removes it from all subscribers (soft delete). Partial failures are reported per-entry; the batch does not fail because one entry errors (e.g. a tag id that no longer exists).

Batches of 100 or fewer are processed synchronously (200). Larger batches are queued asynchronously (202) — supply \`callback_url\` to receive results when processing completes.

Use list_tags to find tag IDs.
Returns: \`failures\` (one entry per id that could not be deleted, with error details; an empty array means all deletions succeeded).`,
    params: [
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Tags to delete (required). Each item must include \`id\`.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_remove_tags_from_subscribers',
    description: `[Tags] Remove a tag from multiple subscribers in a single call. Prefer this over repeated remove_tag_from_subscriber calls when untagging more than a handful of subscribers.

Each entry in \`taggings\` requires a \`tag_id\` and \`subscriber_id\`. Partial failures are reported per-subscriber; the batch does not fail because one entry errors.

Batches of 100 or fewer are processed synchronously (200). Larger batches are queued asynchronously (202) — supply \`callback_url\` to receive results when processing completes.

Use list_tags to find tag IDs and list_subscribers or filter_subscribers to find subscriber IDs.
Returns: \`failures\` (with error details per entry; empty array means all removals succeeded).`,
    params: [
      {
        name: 'taggings',
        type: 'array',
        required: true,
        description: `Tag-subscriber pairs to remove (required). Each item must include \`tag_id\` (integer) and \`subscriber_id\` (integer).`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_tag_subscribers',
    description: `Apply a tag to multiple subscribers in one request. Batches over 100 are processed asynchronously.`,
    params: [
      {
        name: 'taggings',
        type: 'array',
        required: true,
        description: `Tag-subscriber pairs to apply (required). Each item must include \`tag_id\` (integer) and \`subscriber_id\` (integer).`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_untag_subscribers',
    description: `[STALE — upstream renamed 'bulk_untag_subscribers' to 'bulk_remove_tags_from_subscribers'; kept for compatibility, no longer exposed by upstream MCP server] Remove a tag from multiple subscribers in one request. Batches over 100 are processed asynchronously.`,
    params: [
      {
        name: 'taggings',
        type: 'array',
        required: true,
        description: `Tag-subscriber pairs to remove (required). Each item must include \`tag_id\` (integer) and \`subscriber_id\` (integer).`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_bulk_update_subscriber_custom_field_values',
    description: `Update custom field values for multiple subscribers in one request.`,
    params: [
      {
        name: 'custom_field_values',
        type: 'array',
        required: true,
        description: `Custom field updates to apply (required). Each item must include \`subscriber_id\`, \`subscriber_custom_field_id\`, and \`value\`.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `URL to POST results to when the batch is processed asynchronously (batches > 100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_broadcast',
    description: `Create a draft email broadcast in Kit. The broadcast is saved as a draft; scheduling and sending happen from the Kit UI.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Email body content in HTML (required)`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Email subject line (required)`,
      },
      {
        name: 'allow_starting_point',
        type: 'boolean',
        required: false,
        description: `Set to true when posting adapted content from a Starting-point template (in combination with \`email_template_id\` set to that template's id and \`content\` set to the adapted body). Required only for the Starting-point + content combination; omit otherwise.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Internal description for organizing broadcasts`,
      },
      {
        name: 'email_template_id',
        type: 'integer',
        required: false,
        description: `Email template ID. Use list_email_templates to find IDs.`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Preview text shown in email clients`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether to publish on the creator's profile page`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'subscriber_filter',
        type: 'array',
        required: false,
        description: `Target audience filter. A single-element array wrapping one filter group (all/any/none). Example: [{ "all": [{ "type": "tag", "ids": [1, 2] }] }]. Only one filter group (all, any, or none) may be populated per request. Filter types allowed: 'tag' or 'segment'. Omit to target all subscribers.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_custom_field',
    description: `Create a new custom subscriber field. Returns the created field record with its key.`,
    params: [
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `Field label (required), e.g. 'Company' or 'Website'`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_landing_page',
    description: `[Beta] [Landing Pages] Create a landing page from a Kit-JSON content tree. This is an early release that intentionally supports creation only — there is no update or read-back path yet, and the set of supported blocks will grow over time. The page is created as an unpublished draft; after it returns, point the creator at Kit's editor to review, tweak, and publish.

Build \`content_tree\` as an array of \`section\` blocks. A section contains either rows (a row holds 1-4 columns) or text blocks (heading/paragraph) directly. Text is an array of leaves with optional inline marks (bold/italic/underline/strikethrough/color/highlight). Colors are 6-digit hex (#RRGGBB). Omit attributes to accept the editor's defaults. Call \`get_landing_page_schema\` for the exact block shapes and allowed values, then build \`content_tree\` to match.

Optionally set \`theme\` to control the page's default typography and colors per element type (headings, paragraph, links, buttons, etc.). It's a sibling to \`content_tree\`; send only the keys you want to change — anything omitted falls back to the default theme.

If a subscribe form collects a custom field or applies tags, resolve the real ids first: call \`list_custom_fields\` / \`list_tags\`, then pass the resolved custom-field \`key\` and Tag \`id\`s into the form's fields. These reference existing account data — never invent a key or id.

Optionally set \`built_with_badge\` (also a sibling) to control the "Built with Kit" branding badge; hiding it requires a paid plan.

Returns: the landing page (\`id\`, \`name\`, \`public_url\`). The page is an unpublished draft, so \`public_url\` won't load until the creator publishes it — don't share it as a working link; point them to the editor to review and publish.`,
    params: [
      {
        name: 'content_tree',
        type: 'array',
        required: true,
        description: `The page content as a Kit-JSON content tree: an array of \`section\` blocks. Call get_landing_page_schema for the full block schema and allowed values, then build this to match. It's validated on submit — an invalid tree returns a 422 explaining what's wrong.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Internal name for the landing page (required).`,
      },
      {
        name: 'built_with_badge',
        type: 'object',
        required: false,
        description: `Control over the "Built with Kit" branding badge that renders at the bottom of the page. A sibling to content_tree/theme. Hiding it (show: false) requires a paid plan; on accounts without that entitlement the badge stays visible regardless of this setting.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'theme',
        type: 'object',
        required: false,
        description: `Optional page-level theme: default typography and colors per element type (headings, paragraph, links, buttons, etc.). See get_landing_page_schema for the exact shape; send only the keys you want to change.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_product',
    description: `[Products] Create a Commerce product the creator can sell — a digital download, an external URL, a paid newsletter, or a tip jar.

Prerequisites: the account needs a verified domain for the product page (its default verified domain is used unless \`domain_id\` says otherwise; creating fails with a clear error if there is none). Stripe doesn't need to be connected to create the product, but the creator must connect it in Kit before the product can take payments — mention that if they haven't. Coupons and upsells aren't available here; the creator adds those in Kit.

See \`pricing\` for the supported pricing models and each one's plan shape. Amounts are strings in the major currency unit (e.g. "5.00").

Before calling: prices and the billing model must come from the creator — ask, don't assume. Derive \`path\` from the product name and tell the creator the resulting public URL.

Returns: the created product in the same shape as list_products entries — \`id\`, \`name\`, \`currency\`, \`product_type\`, \`pricing_type\`, \`published\`, \`prices\`, \`max_quantity\`, \`tax_product_type\`, \`tax_code_id\`, \`file_name\`, \`edit_url\` and the public page \`url\`.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Product name (required).` },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `URL slug for the product's checkout/landing page, e.g. 'my-ebook' (required). Must be unique within the domain.`,
      },
      {
        name: 'pricing',
        type: 'object',
        required: true,
        description: `Pricing for the product (required). An object with \`pricing_type\` and \`plans\`.

- 'standard': a single plan with an \`amount\`.
- 'recurring' (a subscription): each plan needs \`amount\`, \`interval\` (always "month"), and \`interval_count\`; set the frequency via \`interval_count\` (1 = monthly, 3 = quarterly, 12 = yearly) and pass multiple plans to offer several.
- 'tipjar': a single plan whose \`amount\` is the suggested tip (minimum "1.00"); use with product_type 'tipjar'.
- 'pay_what_you_want': a single plan whose \`amount\` is the minimum the buyer must pay ("0.00" for no minimum, otherwise at least "1.00"); add an optional \`suggested_amount\` for the pre-filled default.
- 'installments': a single plan whose \`amount\` is the total, split into \`installments\` equal charges (2 or more) billed monthly (\`interval\` "month", \`interval_count\` 1); each charge (amount / installments) must be at least "1.00".`,
      },
      {
        name: 'product_type',
        type: 'string',
        required: true,
        description: `Fulfillment type (required). One of: 'download' (a hosted file — requires file_url and file_name), 'url' (an external URL — requires fulfillment_url), 'newsletter' (a paid newsletter subscription — no file or URL needed), 'something_else' (no specific fulfillment), 'tipjar' (a tip jar — use together with pricing_type 'tipjar').`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `ISO currency code for the product, e.g. 'USD'. Defaults to USD.`,
      },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `ID of the verified domain that hosts the product page. Omit to use the account's default verified domain; pass one only to choose a specific domain — find the options with list_domains.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `Display name of the delivered file. Required when product_type is 'download'.`,
      },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `URL of the hosted file to deliver. Required when product_type is 'download'.`,
      },
      {
        name: 'fulfillment_url',
        type: 'string',
        required: false,
        description: `External URL the buyer is sent to after purchase. Required when product_type is 'url'.`,
      },
      {
        name: 'max_quantity',
        type: 'integer',
        required: false,
        description: `Optional maximum quantity a buyer can purchase in one order. Only settable for standard pricing; must stay 1 for every other pricing type. 0 = unlimited.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'tax_code_id',
        type: 'integer',
        required: false,
        description: `ID of the Kit tax code classifying this product for tax rates. Required (together with tax_product_type) only when the account has tax/VAT collection enabled. Use list_tax_codes to look up the available codes and pass the matching code's \`id\`.`,
      },
      {
        name: 'tax_product_type',
        type: 'string',
        required: false,
        description: `Tax classification of the product: 'good' or 'service'. Required (together with tax_code_id) only when the account has tax/VAT collection enabled — creation fails with a tax-configuration error otherwise. Leave out for accounts not collecting tax.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_sequence',
    description: `Create a new email sequence. Returns the sequence record including its ID.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Sequence name (required)` },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: `From email address to use for this sequence`,
      },
      {
        name: 'email_template_id',
        type: 'integer',
        required: false,
        description: `Email template ID. Use list_email_templates to find IDs.`,
      },
      {
        name: 'repeat',
        type: 'boolean',
        required: false,
        description: `Whether the sequence repeats for subscribers`,
      },
      {
        name: 'send_days',
        type: 'array',
        required: false,
        description: `Days to send on (e.g. ['monday', 'wednesday', 'friday'])`,
      },
      {
        name: 'send_hour',
        type: 'integer',
        required: false,
        description: `Hour of day to send (0-23)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Timezone for send scheduling (e.g. 'America/New_York')`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_sequence_email',
    description: `Add a new email to an existing sequence at a specified position and delay.`,
    params: [
      {
        name: 'delay_unit',
        type: 'string',
        required: true,
        description: `'days' or 'hours' (required)`,
      },
      {
        name: 'delay_value',
        type: 'integer',
        required: true,
        description: `Number of days or hours to wait before sending this email (required). Unit is controlled by delay_unit.`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Email subject line (required)`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Email body content in HTML`,
      },
      {
        name: 'email_template_id',
        type: 'integer',
        required: false,
        description: `Layout template ID. Use list_email_templates to find IDs.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `0-based position in the sequence. Defaults to the end.`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Preview text shown in email clients`,
      },
      {
        name: 'published',
        type: 'boolean',
        required: false,
        description: `Publish the email immediately (default: false)`,
      },
      {
        name: 'send_days',
        type: 'array',
        required: false,
        description: `Days of the week this email may send. Omit or pass null to allow all days (inherits the sequence schedule).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_snippet',
    description: `Create a reusable content snippet (inline or block) for use in broadcasts and sequences.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Snippet name (required). Used to auto-generate the key.`,
      },
      {
        name: 'snippet_type',
        type: 'string',
        required: true,
        description: `'inline' or 'block' (required). Cannot be changed after creation.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Text/Liquid content for inline snippets (required when snippet_type is 'inline')`,
      },
      {
        name: 'document_attributes',
        type: 'object',
        required: false,
        description: `Rich HTML content for block snippets (required when snippet_type is 'block')`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_subscriber',
    description: `Create or update a single subscriber by email address (upsert). Returns the subscriber record.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `Subscriber's email address (required)`,
      },
      {
        name: 'fields',
        type: 'object',
        required: false,
        description: `Custom field values as key-value pairs`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `Subscriber's first name`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Subscriber state (default: active)`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_tag',
    description: `Create a new tag. Returns the tag record with its ID.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Tag name (required)` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_create_webhook',
    description: `Register a webhook endpoint to receive Kit events. Returns the created webhook record.`,
    params: [
      {
        name: 'event',
        type: 'object',
        required: true,
        description: `Event configuration (required). Must include 'name' and optional filter IDs.`,
      },
      {
        name: 'target_url',
        type: 'string',
        required: true,
        description: `URL to receive webhook POST requests (required)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_delete_broadcast',
    description: `Delete a draft broadcast by ID. Only draft broadcasts can be deleted.`,
    params: [
      {
        name: 'broadcast_id',
        type: 'integer',
        required: true,
        description: `The broadcast ID to delete (required). Use list_broadcasts to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_delete_custom_field',
    description: `Delete a custom subscriber field by ID.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'integer',
        required: true,
        description: `The custom field ID to delete (required). Use list_custom_fields to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_delete_sequence',
    description: `Delete a sequence and all its emails by ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The sequence ID to delete (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_delete_sequence_email',
    description: `Delete a single email from a sequence by email ID and sequence ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The email ID to delete (required). Use list_sequence_emails to find IDs.`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_delete_webhook',
    description: `Delete a registered webhook by ID.`,
    params: [
      {
        name: 'webhook_id',
        type: 'integer',
        required: true,
        description: `The webhook ID to delete (required). Use list_webhooks to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_filter_subscribers',
    description: `Search and filter subscribers by engagement events (opens, clicks, sends, deliveries) or sign-up date. Returns paginated results.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page. Use \`pagination.end_cursor\` from a previous response. Distinct from per-filter date ranges in \`all[].after\`.`,
      },
      {
        name: 'all',
        type: 'array',
        required: false,
        description: `Array of filter conditions, AND-ed together. Each item filters by one event type (opens, clicks, sent, delivered) or by sign-up date (subscribed). Omit to match all subscribers.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Pagination cursor for the previous page. Use \`pagination.start_cursor\` from a previous response. Distinct from per-filter date ranges in \`all[].before\`.`,
      },
      {
        name: 'include_total_count',
        type: 'boolean',
        required: false,
        description: `If true, include \`pagination.total_count\` in the response (slower).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100).`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Field to sort by. Defaults to \`id\` (recommended for stable cursor pagination).`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc).`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_account',
    description: `[STALE — upstream renamed 'get_account' to 'get_current_account'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve the Kit account details for the authenticated user.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_account_colors',
    description: `[STALE — upstream renamed 'get_account_colors' to 'list_colors'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve the custom brand color palette for the Kit account.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_broadcast',
    description: `Retrieve a single broadcast record by ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The broadcast ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_broadcast_clicks',
    description: `[STALE — upstream renamed 'get_broadcast_clicks' to 'get_link_clicks_for_a_broadcast'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve click data for a specific broadcast, paginated by cursor.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The broadcast ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_broadcast_stats',
    description: `[STALE — upstream renamed 'get_broadcast_stats' to 'get_stats_for_a_broadcast'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve performance statistics (opens, clicks, etc.) for a specific broadcast.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The broadcast ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_broadcasts_stats',
    description: `[STALE — upstream renamed 'get_broadcasts_stats' to 'get_stats_for_a_list_of_broadcasts'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve aggregated performance statistics for multiple broadcasts, with optional date and status filters.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'sent_after',
        type: 'string',
        required: false,
        description: `ISO 8601 date or datetime (e.g. \`2026-01-15\` or \`2026-01-15T10:00:00Z\`). Only include broadcasts with \`send_at >= sent_after\`.`,
      },
      {
        name: 'sent_before',
        type: 'string',
        required: false,
        description: `ISO 8601 date or datetime (e.g. \`2026-01-15\` or \`2026-01-15T10:00:00Z\`). Only include broadcasts with \`send_at < sent_before\`.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter to broadcasts in this state. Omit to return all states.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_creator_profile',
    description: `Retrieve the creator profile linked to the authenticated Kit account.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_current_account',
    description: `[Account] Get details for the authenticated Kit account.

Returns: top-level \`user\` (id and email of the authenticated user) and \`account\` with name, plan_type, primary_email_address, created_at, sending_addresses (each with email_address, from_name, status, is_default, is_verified, is_dmarc_configured), and a structured timezone (name, friendly_name, utc_offset).
Call this only when the user asks about their account details, plan, or profile. It is not a prerequisite for subscriber, broadcast, or other work, so don't call it as a preamble.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_email_stats',
    description: `Retrieve overall email performance statistics for the Kit account.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_email_template',
    description: `Retrieve a single email template by ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The email template ID (required). Use list_email_templates to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_growth_stats',
    description: `Retrieve subscriber growth statistics for a specified date range.`,
    params: [
      {
        name: 'ending',
        type: 'string',
        required: false,
        description: `End date (YYYY-MM-DD). Defaults to today.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'starting',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD). Defaults to 90 days ago.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_landing_page',
    description: `[Beta] [Landing Pages] Read an existing landing page. For pages built with the current (v2) editor this returns the page content as Kit-JSON: a \`content_tree\` in the same format \`create_landing_page\` accepts, with the page-level \`theme\` and \`built_with_badge\` as siblings — use it to inspect a page or as the starting point for a new one.

Check \`editor_version\` first: "v2" pages include content; "v1" pages (built with the older editor) return metadata only — their content can't be read via the API, so hand the creator the editor link (\`confirm_url\`) for those.

Reads never lose content silently. \`is_clean: true\` means \`content_tree\` fully represents the stored page. When it is false, \`warnings\` lists exactly what couldn't be expressed in Kit-JSON (e.g. \`unknown_block\` for a block type this format doesn't cover, \`dropped_prop\` for styling it can't express). A page re-created from a non-clean read would lose the flagged parts — tell the creator before building on it.

A page with \`last_published_at: null\` is an unpublished draft; its \`public_url\` won't load until the creator publishes it.

Returns: \`id\`, \`root_page_id\`, \`name\`, \`editor_version\`, \`created_at\`, \`public_url\`, \`last_published_at\`; for v2 pages also \`content_tree\`, \`theme\` (the full document-level theme), \`built_with_badge\`, \`warnings\`, and \`is_clean\`.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The landing page ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_landing_page_schema',
    description: `[Beta] [Landing Pages] Return the Kit-JSON schemas for a landing page's \`content_tree\` and \`theme\` — the exact shapes create_landing_page and update_landing_page accept. Call this first when building or editing a page, then construct \`content_tree\` (and optionally \`theme\`) to match, before calling create/update.

Returns: \`content_tree\` (a JSON Schema for the array of \`section\` blocks, with every block definition and its allowed values) and \`theme\` (a JSON Schema for the page-level typography/color theme). These are reference schemas, not account data — the same for every account.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_link_clicks_for_a_broadcast',
    description: `[Broadcasts] Get click data for a specific broadcast.

Returns: list of clicked URLs and ids with click counts.
Useful for understanding which links in a broadcast perform best.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The broadcast ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_post',
    description: `Retrieve a single Kit post (newsletter issue) by ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The post ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_product',
    description: `[Products] Fetch a single Commerce product by ID.

Returns the \`product\` in the same shape as list_products entries — \`id\`, \`name\`, \`currency\`, \`product_type\`, \`pricing_type\`, \`published\`, \`prices\`, \`max_quantity\`, \`tax_product_type\`, \`tax_code_id\`, \`file_name\`, \`edit_url\` and the public page \`url\`.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `ID of the product to fetch (required). Find it with list_products, or use the id returned by create_product / update_product.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_purchase',
    description: `Retrieve a single purchase record by ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The purchase ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_sequence',
    description: `Retrieve a single sequence record by ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The sequence ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_sequence_email',
    description: `Retrieve a single email within a sequence by email ID and sequence ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The email ID (required). Use list_sequence_emails to find IDs.`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_snippet',
    description: `Retrieve a single content snippet by ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The snippet ID (required). Use list_snippets to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_stats_for_a_broadcast',
    description: `[Broadcasts] Get performance statistics for a single broadcast by ID. Requires a broadcast ID; use list_broadcasts first to find IDs. For stats across many broadcasts at once, use get_stats_for_a_list_of_broadcasts.

Returns: recipients, open rate, click rate, unsubscribe count, and bounce count.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The broadcast ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_stats_for_a_list_of_broadcasts',
    description: `[Broadcasts] Performance analytics across many broadcasts at once. Use this when the goal is performance analysis or building a stats leaderboard across multiple sends. This is not the listing tool: to browse or find broadcasts, use list_broadcasts. For the stats of a single broadcast, use get_stats_for_a_broadcast after finding its ID with list_broadcasts.

Returns: paginated array of broadcasts, each with \`id\`, \`subject\`, \`send_at\`, and \`stats\` (recipients, open rate, click rate, unsubscribes, total clicks, \`status\`, etc.). Supports cursor pagination, an optional date-range filter on \`send_at\`, and a \`status\` filter (each broadcast's \`stats.status\` is one of \`draft | scheduled | sending | completed | aborted\`).`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'sent_after',
        type: 'string',
        required: false,
        description: `ISO 8601 date or datetime (e.g. \`2026-01-15\` or \`2026-01-15T10:00:00Z\`). Only include broadcasts with \`send_at >= sent_after\`.`,
      },
      {
        name: 'sent_before',
        type: 'string',
        required: false,
        description: `ISO 8601 date or datetime (e.g. \`2026-01-15\` or \`2026-01-15T10:00:00Z\`). Only include broadcasts with \`send_at < sent_before\`.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter to broadcasts in this state. Omit to return all states.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_subscriber',
    description: `Retrieve a single subscriber record by ID, including their custom fields.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The subscriber ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_subscriber_stats',
    description: `[STALE — upstream renamed 'get_subscriber_stats' to 'list_stats_for_a_subscriber'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve engagement statistics for a single subscriber.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The subscriber ID` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_get_subscriber_tags',
    description: `[STALE — upstream renamed 'get_subscriber_tags' to 'list_tags_for_a_subscriber'; kept for compatibility, no longer exposed by upstream MCP server] Retrieve all tags applied to a specific subscriber, paginated.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The subscriber ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_broadcasts',
    description: `List all broadcasts with optional status filter and cursor pagination.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra fields to include per broadcast. \`content\` adds the full HTML body (can be large — only request when needed).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter to broadcasts in this state. Omit to return all states.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_colors',
    description: `[Account] Get the brand color palette for this Kit account.

Returns: array of hex color strings (e.g. ["#FF6900", "#FCB900"]).
Useful for understanding the creator's brand identity.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_custom_fields',
    description: `List all custom subscriber fields in the account.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_domains',
    description: `[Domains] List the account's domains.

Returns: \`domains\` — each with \`id\`, \`domain\` (the hostname) and \`verified\`. Only verified domains can host pages (landing pages, product pages); an unverified domain must finish verification in Kit before it can be used. Accounts typically have one or two domains. An empty list means the account has no domains yet and needs to add one in Kit.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_email_templates',
    description: `List all email templates in the account.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_form_subscribers',
    description: `[STALE — upstream renamed 'list_form_subscribers' to 'list_subscribers_for_form'; kept for compatibility, no longer exposed by upstream MCP server] List all subscribers on a specific form, paginated.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The form ID. Use list_forms to find IDs.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_forms',
    description: `List all forms in the account with optional status filter.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Form status (default: active)`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_landing_pages',
    description: `[Beta] [Landing Pages] List the account's landing pages (both the classic builder and the current v2 editor), newest first.

Returns a slim array — metadata only per page: \`id\`, \`root_page_id\`, \`name\`, \`editor_version\`, \`created_at\`, \`last_published_at\`. No page content and no \`public_url\` (fetch those per page with get_landing_page), to keep the list fast. \`editor_version\` tells you which pages are v2 — those are readable and editable here: call get_landing_page for a page's content, then update_landing_page to change it. Classic (v1) pages are listed but can't be read or edited via the API.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_posts',
    description: `List all Kit newsletter posts with optional cursor pagination.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include_content',
        type: 'boolean',
        required: false,
        description: `Set to true to include the full HTML body of each post. Omit (or set false) for a slim response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_products',
    description: `[Products] List the account's Commerce products — everything the creator sells, including tip jars.

Returns: paginated \`products\`, each with \`id\`, \`name\`, \`currency\`, \`product_type\`, \`pricing_type\`, \`published\` (whether the product can take purchases — false for every product until the creator connects Stripe, so don't read it as the creator having unpublished anything), \`prices\` (each plan's \`amount\` as a string in the major currency unit — for installment plans this is the total split across the plan — plus \`interval\`/\`interval_count\` for recurring and installment pricing, \`installments\` (the number of charges) for installment plans, and \`suggested_amount\` for pay-what-you-want plans), \`max_quantity\` (0 = unlimited; only settable for standard pricing), \`tax_product_type\` and \`tax_code_id\` (null unless the creator configured tax — resolve the id to a name with list_tax_codes), \`file_name\` (the attached file for download products, null otherwise; the file's location is never returned), \`edit_url\` (the product's management page in Kit — share it when the creator wants to customize or configure a product) and \`url\` (the public storefront page — the link to share with the creator's audience).`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_prompt_suggestions',
    description: `Retrieve suggested prompts to help the user get started with Kit via AI.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_purchases',
    description: `List all purchase records in the account, paginated.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_segments',
    description: `List all subscriber segments in the account.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_sequence_emails',
    description: `List all emails in a specific sequence.`,
    params: [
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include_content',
        type: 'boolean',
        required: false,
        description: `Include HTML content in each email (default: false)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_sequence_subscribers',
    description: `[STALE — upstream renamed 'list_sequence_subscribers' to 'list_subscribers_for_sequence'; kept for compatibility, no longer exposed by upstream MCP server] List all subscribers enrolled in a specific sequence.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The sequence ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_sequences',
    description: `List all email sequences in the account.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_snippets',
    description: `List all content snippets in the account with optional type and archive filters.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `true to list archived snippets, false (default) for active ones`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include_content',
        type: 'boolean',
        required: false,
        description: `Include content and document fields in each snippet (default: false)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'snippet_type',
        type: 'string',
        required: false,
        description: `Filter by type: 'inline' or 'block'`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_stats_for_a_subscriber',
    description: `[Subscribers] Get engagement statistics for a specific subscriber by ID. Returns (under \`subscriber.stats\`): \`sent\`, \`opened\`, \`clicked\`, \`bounced\`, \`open_rate\`, \`click_rate\`, \`last_sent\`, \`last_opened\`, \`last_clicked\`, \`sends_since_last_open\`, \`sends_since_last_click\`. Use \`email_sent_after\`/\`email_sent_before\` (YYYY-MM-DD) to scope to a date range.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The subscriber ID` },
      {
        name: 'email_sent_after',
        type: 'string',
        required: false,
        description: `ISO 8601 date (YYYY-MM-DD). Scope stats to emails sent on or after this date. Must be on or after 2024-12-31 (the event floor) or the API returns 400.`,
      },
      {
        name: 'email_sent_before',
        type: 'string',
        required: false,
        description: `ISO 8601 date (YYYY-MM-DD). Scope stats to emails sent on or before this date.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_subscribers',
    description: `List all subscribers with optional status, sort, and cursor pagination.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses). \`canceled_at\` requires \`status\` set to \`cancelled\` (otherwise the API returns 422).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Sort by \`id\` (default, recommended for stable cursor pagination), \`created_at\`, or \`updated_at\`.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by subscriber state. Defaults to active when omitted. Use \`all\` to include every state.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_subscribers_for_form',
    description: `[Forms] List subscribers who signed up through a specific form.

By default returns a slim response: id, email_address, first_name, state, created_at, added_at — no custom fields. Add \`"fields"\` to \`include\` only when you need custom field values.

Use list_forms first to find the form ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The form ID. Use list_forms to find IDs.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses).`,
      },
      {
        name: 'include_total_count',
        type: 'boolean',
        required: false,
        description: `If true, include \`pagination.total_count\` in the response (slower).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_subscribers_for_sequence',
    description: `[Sequences] List subscribers in a specific sequence.

By default returns a slim response: id, email_address, first_name, state, created_at, added_at — no custom fields. Add \`"fields"\` to \`include\` only when you need custom field values.

Use list_sequences first to find the sequence ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The sequence ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses).`,
      },
      {
        name: 'include_total_count',
        type: 'boolean',
        required: false,
        description: `If true, include \`pagination.total_count\` in the response (slower).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_subscribers_for_tag',
    description: `[Tags] List all subscribers who have a specific tag.

By default returns a slim response: id, email_address, first_name, state, created_at, tagged_at — no custom fields. Add \`"fields"\` to \`include\` only when you need custom field values.

Use list_tags first to find the tag ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The tag ID. Use list_tags to find IDs.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses).`,
      },
      {
        name: 'include_total_count',
        type: 'boolean',
        required: false,
        description: `If true, include \`pagination.total_count\` in the response (slower).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_tag_subscribers',
    description: `[STALE — upstream renamed 'list_tag_subscribers' to 'list_subscribers_for_tag'; kept for compatibility, no longer exposed by upstream MCP server] List all subscribers who have a specific tag applied.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The tag ID. Use list_tags to find IDs.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Extra data to include per subscriber. \`fields\` adds custom field values (omit for slim responses).`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_tags',
    description: `List all tags in the account.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_tags_for_a_subscriber',
    description: `[Subscribers] List all tags applied to a specific subscriber.

Returns: array of tags with IDs and names.
Useful for understanding how a subscriber is categorized.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The subscriber ID` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_tax_codes',
    description: `[Products] List the Kit tax codes used to classify a product's tax category, i.e. to choose a product's \`tax_code_id\` when creating or updating a product.

Returns: \`tax_collection_enabled\` — whether this account collects tax (VAT, GST, or US sales tax) — and \`tax_codes\`, each with \`id\`, \`name\`, and \`description\`. When \`tax_collection_enabled\` is false the account doesn't collect tax, \`tax_codes\` is empty, and products don't need a \`tax_code_id\`. When true, match the product to a code by its \`name\`/\`description\` and pass that code's \`id\`.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_list_webhooks',
    description: `List all registered webhooks in the account.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Cursor for next page. Use \`pagination.end_cursor\` from a previous response.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Cursor for previous page. Use \`pagination.start_cursor\` from a previous response.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-100)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_remove_tag_from_subscriber',
    description: `[Tags] Remove a tag from a subscriber. For removing a tag from more than one subscriber at once, use bulk_remove_tags_from_subscribers instead.

Use list_tags to find tag IDs, and list_subscribers_for_tag or get_subscriber to find subscriber IDs.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'integer',
        required: true,
        description: `The subscriber ID (required)`,
      },
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The tag ID (required). Use list_tags to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_tag_subscriber',
    description: `Apply a tag to a subscriber identified by email address.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `Subscriber's email address (required)`,
      },
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The tag ID (required). Use list_tags to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_unsubscribe',
    description: `Cancel a subscriber's subscription by subscriber ID.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'integer',
        required: true,
        description: `The subscriber ID (required). Use list_subscribers or get_subscriber to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_untag_subscriber',
    description: `[STALE — upstream renamed 'untag_subscriber' to 'remove_tag_from_subscriber'; kept for compatibility, no longer exposed by upstream MCP server] Remove a tag from a subscriber by subscriber ID and tag ID.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'integer',
        required: true,
        description: `The subscriber ID (required)`,
      },
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The tag ID (required). Use list_tags to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_account_colors',
    description: `[STALE — upstream renamed 'update_account_colors' to 'update_colors'; kept for compatibility, no longer exposed by upstream MCP server] Update the custom brand color palette for the Kit account.`,
    params: [
      {
        name: 'colors',
        type: 'array',
        required: true,
        description: `Array of up to 10 hex color codes (e.g. ["#FF6900", "#FCB900"]). Replaces the existing palette entirely.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_broadcast',
    description: `Update a draft broadcast's subject, content, or audience filter.`,
    params: [
      {
        name: 'broadcast_id',
        type: 'integer',
        required: true,
        description: `The broadcast ID (required). Use list_broadcasts to find IDs.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Email body content in HTML`,
      },
      { name: 'description', type: 'string', required: false, description: `Internal description` },
      {
        name: 'email_template_id',
        type: 'integer',
        required: false,
        description: `Email template ID`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Preview text shown in email clients`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether to publish on the creator's profile page`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      { name: 'subject', type: 'string', required: false, description: `Email subject line` },
      {
        name: 'subscriber_filter',
        type: 'array',
        required: false,
        description: `Target audience filter. A single-element array wrapping one filter group (all/any/none). Example: [{ "all": [{ "type": "tag", "ids": [1, 2] }] }]. Only one filter group (all, any, or none) may be populated per request. Filter types allowed: 'tag' or 'segment'. Omit to leave current filter unchanged.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_colors',
    description: `[Account] Replace the brand color palette for this Kit account.

Accepts up to 10 hex color codes (e.g. ["#FF6900", "#FCB900"]).
Overwrites the existing palette entirely, so include every color you want to keep.
Use list_colors first to fetch the current palette before editing.`,
    params: [
      {
        name: 'colors',
        type: 'array',
        required: true,
        description: `Array of up to 10 hex color codes (e.g. ["#FF6900", "#FCB900"]). Replaces the existing palette entirely.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_custom_field',
    description: `Rename a custom subscriber field by ID.`,
    params: [
      {
        name: 'custom_field_id',
        type: 'integer',
        required: true,
        description: `The custom field ID (required). Use list_custom_fields to find IDs.`,
      },
      { name: 'label', type: 'string', required: true, description: `New field label (required)` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_landing_page',
    description: `[Beta] [Landing Pages] Replace the content of an existing landing page. Only pages built with the current (v2) editor can be updated — check \`editor_version\` from get_landing_page first; v1 pages can't be edited via the API.

The page's content becomes exactly the \`content_tree\` you send (a full replace, not a merge). \`theme\` and \`built_with_badge\` are gentler: omitted keys keep the page's current values, so only send what you want to change. The intended workflow is read-edit-write: call get_landing_page, edit the returned \`content_tree\`, then call this tool.

If the stored page contains content that can't be expressed as Kit-JSON (get_landing_page returned \`is_clean: false\`), a full replace would permanently lose the flagged parts, so the update is rejected with a conflict listing the warnings. Show the creator what would be lost, and only retry with \`allow_content_loss: true\` after they explicitly accept it. Never set it pre-emptively.

Updating never publishes: a published page keeps serving its previous version until the creator republishes from the editor, and a draft stays a draft. Share the \`confirm_url\` so they can review and publish. If the creator has this page open in Kit's editor, tell them to reload it after the update — the editor doesn't pick up API changes on its own, and saving from a stale tab would overwrite them.

Same content rules as create_landing_page: build \`content_tree\` as an array of \`section\` blocks, omit attributes to accept the editor's defaults, and resolve real tag ids / custom-field keys via list_tags / list_custom_fields — never invent them.

Returns the updated page's metadata. To confirm the stored result, call get_landing_page again.`,
    params: [
      {
        name: 'content_tree',
        type: 'array',
        required: true,
        description: `The page content as a Kit-JSON content tree: an array of \`section\` blocks. Call get_landing_page_schema for the full block schema and allowed values, then build this to match. It's validated on submit — an invalid tree returns a 422 explaining what's wrong.`,
      },
      { name: 'id', type: 'integer', required: true, description: `The landing page ID` },
      {
        name: 'allow_content_loss',
        type: 'boolean',
        required: false,
        description: `Confirm replacing a page whose stored content can't be fully expressed as Kit-JSON, permanently discarding the parts listed in the conflict warnings. Only set true after the creator has seen what would be lost and explicitly accepted it.`,
      },
      {
        name: 'built_with_badge',
        type: 'object',
        required: false,
        description: `Control over the "Built with Kit" branding badge that renders at the bottom of the page. A sibling to content_tree/theme; omitted keys keep the page's current badge settings. Hiding it (show: false) requires a paid plan.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New internal name for the landing page. Omit to keep the current name.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'theme',
        type: 'object',
        required: false,
        description: `Optional page-level theme: default typography and colors per element type (headings, paragraph, links, buttons, etc.). See get_landing_page_schema for the exact shape; send only the keys you want to change.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_product',
    description: `[Products] Update a Commerce product. Only the fields you pass change — everything else keeps its current value, so to rename a product just send \`name\`. Omit any field you don't want to change.

Fixed at creation and not updatable here: the pricing model (one-time vs subscription vs tip jar), the currency, and the fulfillment type (download vs URL vs newsletter) — for those, share the product's \`edit_url\` so the creator can change them in Kit. When you pass \`pricing\`, its \`plans\` replace the product's plans wholesale, so include every plan the product should end up with.

Monetary amounts are strings in the major currency unit (e.g. "5.00" for $5.00).

Before calling: price changes must come from the creator — never assume amounts. Changing \`path\` or \`domain_id\` changes the product's public URL; mention the new URL.

Returns: the updated product in the same shape as list_products entries — \`id\`, \`name\`, \`currency\`, \`product_type\`, \`pricing_type\`, \`published\`, \`prices\`, \`max_quantity\`, \`tax_product_type\`, \`tax_code_id\`, \`file_name\`, \`edit_url\` and the public page \`url\`.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `ID of the product to update (required). Find it with list_products.`,
      },
      {
        name: 'domain_id',
        type: 'integer',
        required: false,
        description: `ID of the verified domain that hosts the product page. Pass it to move the page to another of the account's verified domains — find the options with list_domains.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `New display name of the delivered file. Only applies to 'download' products.`,
      },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `New URL of the hosted file to deliver. Only applies to 'download' products.`,
      },
      {
        name: 'fulfillment_url',
        type: 'string',
        required: false,
        description: `New URL the buyer is sent to after purchase. Only applies to 'url' products.`,
      },
      {
        name: 'max_quantity',
        type: 'integer',
        required: false,
        description: `New maximum quantity a buyer can purchase in one order. Only settable for standard pricing; must stay 1 for every other pricing type. 0 = unlimited.`,
      },
      { name: 'name', type: 'string', required: false, description: `New product name.` },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `New URL slug for the product's checkout/landing page, e.g. 'my-ebook'. Must be unique within the domain.`,
      },
      {
        name: 'pricing',
        type: 'object',
        required: false,
        description: `Replacement plans — they replace all current plans, and the pricing model can't change, so match the product's existing type.

- 'standard': a single plan with an \`amount\`.
- 'recurring' (a subscription): each plan needs \`amount\`, \`interval\` (always "month"), and \`interval_count\`; set the frequency via \`interval_count\` (1 = monthly, 3 = quarterly, 12 = yearly) and pass multiple plans for several.
- 'tipjar': a single plan whose \`amount\` is the suggested tip.
- 'pay_what_you_want': a single plan whose \`amount\` is the minimum ("0.00" for no minimum, otherwise at least "1.00"); add an optional \`suggested_amount\` for the pre-filled default.
- 'installments': a single plan whose \`amount\` is the total, split into \`installments\` equal charges (2 or more) billed monthly (\`interval\` "month", \`interval_count\` 1); each charge (amount / installments) must be at least "1.00".`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'tax_code_id',
        type: 'integer',
        required: false,
        description: `ID of the Kit tax code classifying this product for tax rates. Only relevant when the account has tax/VAT collection enabled. Use list_tax_codes to look up the available codes and pass the matching code's \`id\`.`,
      },
      {
        name: 'tax_product_type',
        type: 'string',
        required: false,
        description: `Tax classification of the product: 'good' or 'service'. Only relevant when the account has tax/VAT collection enabled.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_sequence',
    description: `Update sequence settings such as name, send days, or active state.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the sequence is active`,
      },
      { name: 'email_address', type: 'string', required: false, description: `From email address` },
      {
        name: 'email_template_id',
        type: 'integer',
        required: false,
        description: `Email template ID`,
      },
      {
        name: 'hold',
        type: 'boolean',
        required: false,
        description: `Whether the sequence is on hold`,
      },
      { name: 'name', type: 'string', required: false, description: `New sequence name` },
      {
        name: 'repeat',
        type: 'boolean',
        required: false,
        description: `Whether the sequence repeats`,
      },
      { name: 'send_days', type: 'array', required: false, description: `Days to send on` },
      {
        name: 'send_hour',
        type: 'integer',
        required: false,
        description: `Hour of day to send (0-23)`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Timezone for send scheduling`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_sequence_email',
    description: `Update an existing sequence email's subject, content, delay, or position.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The email ID (required). Use list_sequence_emails to find IDs.`,
      },
      {
        name: 'sequence_id',
        type: 'integer',
        required: true,
        description: `The sequence ID (required). Use list_sequences to find IDs.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Email body content in HTML`,
      },
      { name: 'delay_unit', type: 'string', required: false, description: `'days' or 'hours'` },
      {
        name: 'delay_value',
        type: 'integer',
        required: false,
        description: `Number of days or hours to wait before sending this email. Unit is controlled by delay_unit.`,
      },
      {
        name: 'email_template_id',
        type: 'integer',
        required: false,
        description: `Layout template ID. Use list_email_templates to find IDs.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `0-based position in the sequence`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Preview text shown in email clients`,
      },
      {
        name: 'published',
        type: 'boolean',
        required: false,
        description: `Publish or unpublish the email`,
      },
      {
        name: 'send_days',
        type: 'array',
        required: false,
        description: `Days of the week this email may send. To reset to the full weekly schedule, pass all 7 values explicitly.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      { name: 'subject', type: 'string', required: false, description: `Email subject line` },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_snippet',
    description: `Update a content snippet's name, content, or archived state.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The snippet ID (required). Use list_snippets to find IDs.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `true to archive, false to restore`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New text/Liquid content (inline snippets only)`,
      },
      {
        name: 'document_attributes',
        type: 'object',
        required: false,
        description: `New HTML content (block snippets only)`,
      },
      { name: 'name', type: 'string', required: false, description: `New snippet name` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_subscriber',
    description: `Update a subscriber's email, name, or custom field values by subscriber ID.`,
    params: [
      {
        name: 'subscriber_id',
        type: 'integer',
        required: true,
        description: `The subscriber ID (required). Use list_subscribers or filter_subscribers to find IDs.`,
      },
      { name: 'email_address', type: 'string', required: false, description: `New email address` },
      {
        name: 'fields',
        type: 'object',
        required: false,
        description: `Custom field values to update as key-value pairs`,
      },
      { name: 'first_name', type: 'string', required: false, description: `New first name` },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_tag',
    description: `[STALE — upstream renamed 'update_tag' to 'update_tag_name'; kept for compatibility, no longer exposed by upstream MCP server] Rename a tag by ID.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `New tag name (required)` },
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The tag ID (required). Use list_tags to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
  {
    name: 'kitmcp_update_tag_name',
    description: `[Tags] Rename an existing tag.

Use list_tags to find the tag ID. Returns: the updated tag record.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `New tag name (required)` },
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The tag ID (required). Use list_tags to find IDs.`,
      },
      {
        name: 'session_id',
        type: 'string',
        required: false,
        description: `UUID v4 identifier for grouping tool calls in the same conversation. Generate once at the start of the session and reuse it on every call.`,
      },
      {
        name: 'user_goal',
        type: 'string',
        required: false,
        description: `What the creator is trying to accomplish with this tool call. Pick the closest match; use 'unknown' only when no category fits.`,
      },
    ],
  },
]
