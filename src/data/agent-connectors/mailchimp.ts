import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mailchimp_account_info',
    description: `Retrieve details about the connected Mailchimp account, including username, contact info, and plan details.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_automation_archive',
    description: `Archive a Mailchimp classic automation. Archived automations cannot be edited or resumed via the API.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The ID of the automation to archive. Get it from \`mailchimp_automations_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_automation_emails_list',
    description: `Get a list of the individual emails (workflow emails) within a Mailchimp classic automation.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The ID of the automation. Get it from \`mailchimp_automations_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_automation_get',
    description: `Retrieve details about a specific classic automation in Mailchimp.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The ID of the automation. Get it from \`mailchimp_automations_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_automation_pause',
    description: `Pause all emails in a Mailchimp classic automation.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The ID of the automation. Get it from \`mailchimp_automations_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_automation_start',
    description: `Start all emails in a Mailchimp classic automation.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `The ID of the automation. Get it from \`mailchimp_automations_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_automations_list',
    description: `Return a summary of all classic automations (Email Series) in the Mailchimp account.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by automation status: \`save\`, \`paused\`, \`sending\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_batch_create',
    description: `Submit a batch of up to 500 API operations to run asynchronously in a single call. Poll the result with \`mailchimp_batch_status_get\` using the returned batch id.`,
    params: [
      {
        name: 'operations_json',
        type: 'string',
        required: true,
        description: `JSON array of operation objects, each with method, path, and optionally params/body/operation_id. body must be a JSON-encoded string.`,
      },
    ],
  },
  {
    name: 'mailchimp_batch_status_get',
    description: `Check the status of a Mailchimp batch operation. Use this to poll the result of a previously submitted batch request.`,
    params: [
      {
        name: 'batch_id',
        type: 'string',
        required: true,
        description: `The ID of the batch operation. Returned when a batch is created via the Mailchimp API.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_content_get',
    description: `Retrieve the content (HTML, plain text, or template) of a Mailchimp campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_content_set',
    description: `Set the HTML or plain text content of a Mailchimp campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `Full HTML content for the campaign.`,
      },
      {
        name: 'plain_text',
        type: 'string',
        required: false,
        description: `Plain text version of the campaign content.`,
      },
      {
        name: 'template_id',
        type: 'string',
        required: false,
        description: `ID of a saved Mailchimp template to use. Get it from \`mailchimp_templates_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_create',
    description: `Create a new Mailchimp campaign (regular, plaintext, A/B split, RSS, or variate).`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience to send to. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Campaign type: \`regular\`, \`plaintext\`, \`absplit\`, \`rss\`, \`variate\`.`,
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: `The 'from' name for the campaign.`,
      },
      {
        name: 'preview_text',
        type: 'string',
        required: false,
        description: `Preview text displayed in the inbox.`,
      },
      {
        name: 'reply_to',
        type: 'string',
        required: false,
        description: `The reply-to email address.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: false,
        description: `ID of a segment to send to (optional). Get it from \`mailchimp_segments_list\`.`,
      },
      {
        name: 'subject_line',
        type: 'string',
        required: false,
        description: `The subject line for the campaign.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The internal title for this campaign (not shown to subscribers).`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_delete',
    description: `Remove a campaign from a Mailchimp account. Only campaigns in draft or removed status can be deleted.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to delete. Get it from \`mailchimp_campaigns_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_get',
    description: `Retrieve details about a specific Mailchimp campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_schedule',
    description: `Schedule a Mailchimp campaign to be sent at a specific time.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to schedule. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'schedule_time',
        type: 'string',
        required: true,
        description: `UTC datetime to send the campaign in ISO 8601 format (e.g., \`2026-05-01T14:00:00+00:00\`).`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_send',
    description: `Send a Mailchimp campaign immediately. The campaign must be in \`save\` status with valid content and recipients.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to send. Get it from \`mailchimp_campaigns_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_test',
    description: `Send a test email for a Mailchimp campaign to one or more email addresses.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'test_emails',
        type: 'string',
        required: true,
        description: `JSON array of email addresses to send the test to.`,
      },
      {
        name: 'send_type',
        type: 'string',
        required: false,
        description: `Email format for the test: \`html\` or \`plaintext\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_unschedule',
    description: `Cancel a scheduled Mailchimp campaign and return it to draft status.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaign_update',
    description: `Update the settings of a Mailchimp campaign that has not yet been sent.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      { name: 'from_name', type: 'string', required: false, description: `Updated 'from' name.` },
      { name: 'list_id', type: 'string', required: false, description: `Updated audience ID.` },
      { name: 'preview_text', type: 'string', required: false, description: `New preview text.` },
      {
        name: 'reply_to',
        type: 'string',
        required: false,
        description: `Updated reply-to email address.`,
      },
      { name: 'subject_line', type: 'string', required: false, description: `New subject line.` },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New internal campaign title.`,
      },
    ],
  },
  {
    name: 'mailchimp_campaigns_list',
    description: `Return a list of all campaigns in the Mailchimp account, with optional filters.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      { name: 'list_id', type: 'string', required: false, description: `Filter by audience ID.` },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: \`ASC\` or \`DESC\`.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Sort field: \`create_time\` or \`send_time\`.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: \`save\`, \`paused\`, \`schedule\`, \`sending\`, \`sent\`.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by campaign type: \`regular\`, \`plaintext\`, \`absplit\`, \`rss\`, \`variate\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_customer_upsert',
    description: `Add a new customer or update an existing customer in a Mailchimp ecommerce store (idempotent upsert).`,
    params: [
      {
        name: 'customer_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the customer, chosen by you.`,
      },
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The customer's email address.`,
      },
      {
        name: 'opt_in_status',
        type: 'boolean',
        required: true,
        description: `Whether the customer is opted in to marketing (true/false).`,
      },
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
      { name: 'company', type: 'string', required: false, description: `The customer's company.` },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `The customer's first name.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `The customer's last name.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_order_create',
    description: `Add an order to a Mailchimp ecommerce store, to drive purchase-based automations and reporting.`,
    params: [
      {
        name: 'currency_code',
        type: 'string',
        required: true,
        description: `Three-letter ISO 4217 currency code for the order.`,
      },
      {
        name: 'customer_json',
        type: 'string',
        required: true,
        description: `JSON object describing the customer who placed the order, e.g. '{"id":"cust-1","email_address":"jane@example.com"}'.`,
      },
      {
        name: 'lines_json',
        type: 'string',
        required: true,
        description: `JSON array of the order's line items, e.g. '[{"id":"line-1","product_id":"prod-001","product_variant_id":"v1","quantity":2,"price":19.99}]'.`,
      },
      {
        name: 'order_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the order, chosen by you.`,
      },
      {
        name: 'order_total',
        type: 'number',
        required: true,
        description: `The total amount for the order.`,
      },
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store to add the order to. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: false,
        description: `The ID of the Mailchimp campaign that drove this order, if any.`,
      },
      {
        name: 'financial_status',
        type: 'string',
        required: false,
        description: `The order's financial status, e.g. 'paid', 'pending', 'refunded'.`,
      },
      {
        name: 'fulfillment_status',
        type: 'string',
        required: false,
        description: `The order's fulfillment status, e.g. 'partial', 'fulfilled'.`,
      },
      { name: 'order_url', type: 'string', required: false, description: `The URL for the order.` },
    ],
  },
  {
    name: 'mailchimp_ecommerce_orders_list',
    description: `Get a list of orders for a Mailchimp ecommerce store.`,
    params: [
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'customer_id',
        type: 'string',
        required: false,
        description: `Filter orders by customer ID.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_product_create',
    description: `Add a product to a Mailchimp ecommerce store. At least one variant is required.`,
    params: [
      {
        name: 'product_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the product, chosen by you.`,
      },
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store to add the product to. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the product.` },
      {
        name: 'variants_json',
        type: 'string',
        required: true,
        description: `JSON array of variant objects. At least one variant is required, e.g. '[{"id":"v1","title":"Small","price":19.99}]'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the product.`,
      },
      {
        name: 'image_url',
        type: 'string',
        required: false,
        description: `The primary image URL for the product.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The URL for the product page.`,
      },
      {
        name: 'vendor',
        type: 'string',
        required: false,
        description: `The vendor for the product.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_product_get',
    description: `Get information about a specific product in a Mailchimp ecommerce store.`,
    params: [
      {
        name: 'product_id',
        type: 'string',
        required: true,
        description: `The ID of the product to retrieve.`,
      },
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_products_list',
    description: `Get a list of products for a Mailchimp ecommerce store.`,
    params: [
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_store_create',
    description: `Add a new ecommerce store to the Mailchimp account, linked to an audience.`,
    params: [
      {
        name: 'currency_code',
        type: 'string',
        required: true,
        description: `Three-letter ISO 4217 currency code the store accepts, e.g. USD.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience associated with the store. Get it from \`mailchimp_lists_list\`.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the store.` },
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `A unique identifier for the store, chosen by you (e.g. your platform's store ID).`,
      },
      { name: 'domain', type: 'string', required: false, description: `The store's domain.` },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: `The email address for the store.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `The ecommerce platform of the store, e.g. Shopify, WooCommerce, Magento.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_store_delete',
    description: `Permanently delete an ecommerce store, including all of its products, orders, and customers. This action cannot be undone.`,
    params: [
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store to delete.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_store_get',
    description: `Get information about a specific ecommerce store.`,
    params: [
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store. Get it from \`mailchimp_ecommerce_stores_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_ecommerce_store_update',
    description: `Update an existing ecommerce store's details.`,
    params: [
      {
        name: 'store_id',
        type: 'string',
        required: true,
        description: `The ID of the store to update.`,
      },
      {
        name: 'currency_code',
        type: 'string',
        required: false,
        description: `New three-letter ISO 4217 currency code the store accepts.`,
      },
      { name: 'domain', type: 'string', required: false, description: `The new store domain.` },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: `The new email address for the store.`,
      },
      { name: 'name', type: 'string', required: false, description: `The new name of the store.` },
    ],
  },
  {
    name: 'mailchimp_ecommerce_stores_list',
    description: `Get information about all ecommerce stores connected to the Mailchimp account.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_landing_page_create',
    description: `Create a new unpublished, contentless Mailchimp landing page. Connect it to an audience via list_id, or set use_default_list to use the account's default audience instead. Add content and publish it separately afterward.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Internal name for the landing page, shown in the Mailchimp UI.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `The ID of the audience to connect this landing page to. Required unless use_default_list is true.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Public-facing title of the landing page, shown to visitors.`,
      },
      {
        name: 'use_default_list',
        type: 'boolean',
        required: false,
        description: `Create the landing page using the account's default audience instead of specifying list_id.`,
      },
    ],
  },
  {
    name: 'mailchimp_landing_pages_list',
    description: `List landing pages in the Mailchimp account.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: \`ASC\` or \`DESC\`.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Field to sort results by: \`created_at\` or \`updated_at\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_create',
    description: `Create a new Mailchimp audience (list). Requires a contact address and campaign defaults.`,
    params: [
      {
        name: 'contact_address',
        type: 'string',
        required: true,
        description: `The street address for the contact address.`,
      },
      {
        name: 'contact_city',
        type: 'string',
        required: true,
        description: `The city for the contact address.`,
      },
      {
        name: 'contact_company',
        type: 'string',
        required: true,
        description: `The company name for the contact address (required by Mailchimp).`,
      },
      {
        name: 'contact_country',
        type: 'string',
        required: true,
        description: `The two-letter ISO country code for the contact address (e.g. \`US\`).`,
      },
      {
        name: 'contact_state',
        type: 'string',
        required: true,
        description: `The state or province for the contact address.`,
      },
      {
        name: 'contact_zip',
        type: 'string',
        required: true,
        description: `The postal/ZIP code for the contact address.`,
      },
      {
        name: 'email_type_option',
        type: 'boolean',
        required: true,
        description: `Whether to allow subscribers to choose email format (HTML or plain text).`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: true,
        description: `The default sender email address for campaigns.`,
      },
      {
        name: 'from_name',
        type: 'string',
        required: true,
        description: `The default display name for the campaign sender.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the audience.` },
      {
        name: 'permission_reminder',
        type: 'string',
        required: true,
        description: `A reminder for subscribers about why they were added.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `The default language for the audience (e.g. \`en\`, \`fr\`).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `The default subject line for campaigns.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_delete',
    description: `Permanently delete a Mailchimp audience and all its members.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience to delete. Get it from \`mailchimp_lists_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_get',
    description: `Retrieve information about a specific Mailchimp audience (list) by its ID.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_interest_categories_list',
    description: `Get a list of interest categories (groups) for a Mailchimp audience, used for subscriber segmentation and signup form preferences.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_interest_category_create',
    description: `Add a new interest category (group) to a Mailchimp audience for subscriber segmentation.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The name of the interest category, shown on signup forms.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `How the interests in this category appear on signup forms: checkboxes, dropdown, radio, or hidden.`,
      },
      {
        name: 'display_order',
        type: 'integer',
        required: false,
        description: `The display order of this category relative to others. Lower numbers display first.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_add',
    description: `Add a new member to a Mailchimp audience.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The member's email address.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `Subscription status: \`subscribed\`, \`unsubscribed\`, \`cleaned\`, \`pending\`.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `Member's first name (stored in FNAME merge field).`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Member's last name (stored in LNAME merge field).`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `JSON array of tag names to apply to the member.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_archive',
    description: `Archive a member in a Mailchimp audience (soft delete). The member's data is preserved but they will not receive campaigns. The \`subscriber_hash\` is the MD5 hash of the lowercase email.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_delete_permanent',
    description: `Permanently delete a member from a Mailchimp audience. This removes all of their data and cannot be undone. Use \`mailchimp_list_member_archive\` for a reversible soft delete.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_get',
    description: `Retrieve information about a specific member in a Mailchimp audience. The \`subscriber_hash\` is the MD5 hash of the member's lowercase email address.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_tags_get',
    description: `Retrieve the tags assigned to a specific member in a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_tags_update',
    description: `Add or remove tags for a specific member in a Mailchimp audience. Provide a JSON array of tag objects with \`name\` and \`status\` (\`active\` to add, \`inactive\` to remove).`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: true,
        description: `JSON array of tag objects. Each has \`name\` (string) and \`status\` (\`active\` to add, \`inactive\` to remove).`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_update',
    description: `Update an existing member's data in a Mailchimp audience. The \`subscriber_hash\` is the MD5 hash of the member's lowercase email address.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: `Updated email address.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `Updated first name (FNAME merge field).`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Updated last name (LNAME merge field).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New subscription status: \`subscribed\`, \`unsubscribed\`, \`cleaned\`, \`pending\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_member_upsert',
    description: `Add a new member or update an existing member in a Mailchimp audience (idempotent). The \`subscriber_hash\` is the MD5 hash of the lowercase email address.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The member's email address.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'status_if_new',
        type: 'string',
        required: true,
        description: `Status for new members: \`subscribed\`, \`unsubscribed\`, \`cleaned\`, \`pending\`.`,
      },
      {
        name: 'subscriber_hash',
        type: 'string',
        required: true,
        description: `MD5 hash of the member's lowercase email address.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name (FNAME merge field).`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Last name (LNAME merge field).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status for existing members.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_members_list',
    description: `Return a list of members in a Mailchimp audience, with optional filters by status.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 1000).`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: \`ASC\` or \`DESC\`.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Field to sort by: \`last_changed\` or \`timestamp_opt\`.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by member status: \`subscribed\`, \`unsubscribed\`, \`cleaned\`, \`pending\`, \`transactional\`, \`archived\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_merge_field_create',
    description: `Add a new merge field (custom audience field, e.g. PHONE, BIRTHDAY) to a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the merge field, shown in the Mailchimp UI.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The field type: text, number, address, phone, date, url, imageurl, radio, dropdown, birthday, zip.`,
      },
      {
        name: 'default_value',
        type: 'string',
        required: false,
        description: `The default value for the merge field if left blank.`,
      },
      {
        name: 'help_text',
        type: 'string',
        required: false,
        description: `Extra text shown to help the subscriber fill out the field on a signup form.`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether the merge field is displayed on the signup form.`,
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
        description: `Whether the merge field is required to import a contact.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `The merge tag used in campaigns, e.g. PHONE. Auto-generated if omitted.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_merge_fields_list',
    description: `Get a list of merge fields (audience fields, e.g. FNAME, PHONE) for a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_tag_search',
    description: `Search for tags used in a Mailchimp audience by name prefix. Returns all tags whose name starts with the given search string.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The search prefix used to filter tags by name.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_update',
    description: `Update an existing Mailchimp audience's name or settings.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'from_email',
        type: 'string',
        required: false,
        description: `Updated sender email address.`,
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: `Updated sender display name.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the audience.` },
      {
        name: 'permission_reminder',
        type: 'string',
        required: false,
        description: `Updated permission reminder.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_webhook_create',
    description: `Create a webhook on a Mailchimp audience for subscribe/unsubscribe/profile-update/cleaned/email-change/campaign-sent events.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL that Mailchimp will send webhook events to.`,
      },
      {
        name: 'event_campaign',
        type: 'boolean',
        required: false,
        description: `Trigger this webhook when a campaign is sent or cancelled.`,
      },
      {
        name: 'event_cleaned',
        type: 'boolean',
        required: false,
        description: `Trigger this webhook when a member is cleaned (removed for bouncing).`,
      },
      {
        name: 'event_profile',
        type: 'boolean',
        required: false,
        description: `Trigger this webhook when a member updates their profile.`,
      },
      {
        name: 'event_subscribe',
        type: 'boolean',
        required: false,
        description: `Trigger this webhook when a new subscriber is added.`,
      },
      {
        name: 'event_unsubscribe',
        type: 'boolean',
        required: false,
        description: `Trigger this webhook when a member unsubscribes.`,
      },
      {
        name: 'event_upemail',
        type: 'boolean',
        required: false,
        description: `Trigger this webhook when a member changes their email address.`,
      },
      {
        name: 'source_admin',
        type: 'boolean',
        required: false,
        description: `Fire the webhook for changes made by an admin in the Mailchimp dashboard.`,
      },
      {
        name: 'source_api',
        type: 'boolean',
        required: false,
        description: `Fire the webhook for changes made via the API.`,
      },
      {
        name: 'source_user',
        type: 'boolean',
        required: false,
        description: `Fire the webhook for changes made by the subscriber themselves.`,
      },
    ],
  },
  {
    name: 'mailchimp_list_webhooks_list',
    description: `List webhooks configured on a Mailchimp audience (list).`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_lists_list',
    description: `Return a list of all Mailchimp audiences (lists) in the account.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records to return per page (max 1000).`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: \`ASC\` or \`DESC\`.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Field to sort results by: \`date_created\` or \`campaign_last_sent\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_member_search',
    description: `Search for members by email or name fragment across every audience in the account, or restrict the search to one audience. Use this when you don't already know the list_id and subscriber_hash that the other member tools require.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search term to match against member email addresses and names.`,
      },
      {
        name: 'exclude_fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to exclude from the response.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `Restrict the search to a single audience. Omit to search across all audiences.`,
      },
    ],
  },
  {
    name: 'mailchimp_ping',
    description: `Check the health of the Mailchimp API. Returns a health status string.`,
    params: [],
  },
  {
    name: 'mailchimp_report_click_details',
    description: `Return click details and statistics for links in a Mailchimp campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_report_email_activity',
    description: `Return per-subscriber email activity for a specific Mailchimp campaign, including opens, clicks, and bounces.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_report_get',
    description: `Retrieve the report summary for a specific Mailchimp campaign, including opens, clicks, bounces, and unsubscribes.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_report_open_details',
    description: `Return a list of members who opened a specific Mailchimp campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_report_unsubscribes',
    description: `Return a list of members who unsubscribed from a specific Mailchimp campaign.`,
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign. Get it from \`mailchimp_campaigns_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_reports_list',
    description: `Return a list of campaign reports in the Mailchimp account.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by campaign type: \`regular\`, \`absplit\`, \`variate\`, \`rss\`, \`plaintext\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_segment_create',
    description: `Create a new static or saved segment in a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the segment.` },
      {
        name: 'options',
        type: 'string',
        required: false,
        description: `JSON object defining conditions for a saved segment. See Mailchimp docs for condition format.`,
      },
      {
        name: 'static_segment',
        type: 'string',
        required: false,
        description: `JSON array of email addresses to add to a static segment.`,
      },
    ],
  },
  {
    name: 'mailchimp_segment_delete',
    description: `Delete a segment from a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment to delete. Get it from \`mailchimp_segments_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_segment_get',
    description: `Retrieve details about a specific segment in a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment. Get it from \`mailchimp_segments_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_segment_members_list',
    description: `Return a list of members in a specific segment of a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment. Get it from \`mailchimp_segments_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
    ],
  },
  {
    name: 'mailchimp_segment_update',
    description: `Update the name or conditions of a segment in a Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'segment_id',
        type: 'string',
        required: true,
        description: `The ID of the segment. Get it from \`mailchimp_segments_list\`.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the segment.` },
      {
        name: 'static_segment',
        type: 'string',
        required: false,
        description: `Updated JSON array of emails for a static segment.`,
      },
    ],
  },
  {
    name: 'mailchimp_segments_list',
    description: `Return a list of segments for a specific Mailchimp audience.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the audience. Get it from \`mailchimp_lists_list\`.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by segment type: \`static\` or \`saved\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_template_create',
    description: `Create a new user-defined HTML template in Mailchimp.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `The HTML content for the template.`,
      },
      { name: 'name', type: 'string', required: true, description: `A name for the template.` },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `ID of a folder to place the template in.`,
      },
    ],
  },
  {
    name: 'mailchimp_template_delete',
    description: `Permanently delete a user-defined template from Mailchimp.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the template to delete. Get it from \`mailchimp_templates_list\`.`,
      },
    ],
  },
  {
    name: 'mailchimp_template_get',
    description: `Retrieve information about a specific template in the Mailchimp account.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the template. Get it from \`mailchimp_templates_list\`.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
    ],
  },
  {
    name: 'mailchimp_template_update',
    description: `Update a user-defined template's name or HTML content in Mailchimp.`,
    params: [
      {
        name: 'template_id',
        type: 'string',
        required: true,
        description: `The ID of the template. Get it from \`mailchimp_templates_list\`.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `New HTML content for the template.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the template.` },
    ],
  },
  {
    name: 'mailchimp_templates_list',
    description: `Return a list of templates in the Mailchimp account, including user-created and Mailchimp base templates.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of records per page.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated fields to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip.`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: \`ASC\` or \`DESC\`.`,
      },
      {
        name: 'sort_field',
        type: 'string',
        required: false,
        description: `Sort field: \`date_created\`.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by template type: \`user\`, \`base\`, \`gallery\`.`,
      },
    ],
  },
]
