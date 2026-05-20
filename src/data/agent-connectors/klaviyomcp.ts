import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
