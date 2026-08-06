import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'facebookadsmcp_ads_account_get_activity_logs',
    description: `Fetches activity log entries for an ad account, showing changes made to campaigns, ad sets, ads, and other ad objects. This mirrors the Ads Manager campaign history page, including Meta system-generated changes.

  ## When to use:
  - Call this tool when the user asks about changes, modifications, or history of their ad account or specific ad objects.
  - Call this tool when the user wants to see what happened in a time range (e.g., "what changed last week?").
  - Call this tool to find out who made specific changes to ad objects.
  - Call this tool to investigate budget, status, targeting, or creative changes.

  ## When NOT to use:
  - Do NOT use for performance metrics or delivery insights — use ads_insights tools instead.
  - Do NOT use for error diagnostics — use ads_get_errors instead.

  ## Response Guidelines:
  1. Present changes in chronological order with actor, event type, and details.
  2. Highlight the most significant changes (status changes, budget modifications).
  3. If extra_data contains old_value/new_value, show what was changed from and to.
  4. Group related changes together when presenting to the user.

  ## Event categories and their event types
  The optional \`event_category\` filter accepts exactly one of these categories. Each category maps to the following \`event_type\` values (these are the values that appear in results):
  - account: ad_review_approved, ad_review_declined, ad_account_set_business_information, ad_account_update_status, ad_account_add_user_to_role, ad_account_remove_user_from_role
  - ad: ad_review_approved, ad_review_declined, add_images, create_ad, edit_images, update_ad_creative, update_ad_friendly_name, update_ad_run_status, update_ad_run_status_to_be_set_after_review
  - ad_set: create_ad_set, update_ad_set_bidding, update_ad_set_bid_strategy, update_ad_set_bid_adjustments, update_ad_set_budget, update_ad_set_duration, update_ad_set_name, update_ad_set_run_status, update_ad_set_target_spec, update_ad_set_ad_keywords, conversion_event_updated, update_campaign_schedule, update_ad_set_learning_stage_status, update_campaign_high_demand_periods, update_campaign_budget_scheduling_state, update_campaign_conversion_goal, update_campaign_value_adjustment_rule
  - audience: create_audience, update_audience, delete_audience, share_audience, receive_audience, unshare_audience, remove_shared_audience, update_adgroup_stop_delivery, ad_account_update_audience_type_url_parameter, adaccount_update_audience_segment
  - bid: update_ad_bid_info, update_ad_bid_type, update_ad_set_bidding, update_ad_set_bid_strategy, update_ad_set_bid_adjustments
  - budget: ad_account_billing_charge, ad_account_billing_chargeback, ad_account_billing_chargeback_reversal, ad_account_billing_decline, ad_account_billing_refund, ad_account_remove_spend_limit, ad_account_reset_spend_limit, ad_account_update_spend_limit, add_funding_source, billing_event, funding_event_initiated, funding_event_successful, remove_funding_source, update_ad_set_budget, update_campaign_budget, update_campaign_group_spend_cap, update_budget_flex_toggle_status
  - campaign: create_campaign_group, update_campaign_name, update_campaign_run_status, update_campaign_group_high_demand_periods, update_campaign_group_budget_scheduling_state
  - date: update_ad_set_duration
  - status: ad_account_update_status, update_ad_run_status, update_ad_run_status_to_be_set_after_review, update_ad_set_run_status, update_campaign_run_status
  - targeting: update_ad_set_target_spec, update_ad_targets_spec
  - ad_keywords: update_ad_set_ad_keywords`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (numeric, without "act_" prefix).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Optional. End time in ISO 8601 format. Defaults to now.`,
      },
      {
        name: 'event_category',
        type: 'string',
        required: false,
        description: `Optional. Filter by event category. Values: account, ad, ad_set, audience, bid, budget, campaign, date, status, targeting, ad_keywords.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Optional. Maximum number of results to return (1-1000). Defaults to 100.`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: false,
        description: `Optional. Filter to a specific ad object ID (campaign, ad set, ad, creative). Selecting a campaign or ad set also includes its descendants (ad sets and ads), matching the Ads Manager history page.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Optional. Start time in ISO 8601 format (e.g., "2025-01-01T00:00:00Z"). Defaults to 3 months ago.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional. Filter by the user who made the change.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_activate_entity',
    description: `Activates a campaign, ad set, or ad by changing its status from PAUSED to ACTIVE, effectively publishing the entity.

  ## When to use:
  - Call this tool ONLY after the user has explicitly confirmed they want to publish/activate.
  - Use after the user has reviewed the entity via ads_create_campaign or ads_update_entity.
  - Supports entity_type values: "campaign", "ad_set", or "ad".

  ## When NOT to use:
  - Do NOT call without explicit user confirmation to publish.
  - Do NOT use for pausing active entities. Use ads_update_entity with status field instead.

  ## Status Hierarchy:
  - Activating a parent does NOT automatically activate its children. Each entity must be activated individually.
  - For ads to deliver, ALL levels in the hierarchy must be ACTIVE (campaign, ad set, and ad).
  - Activating a child entity while its parent is paused will succeed, but the child will NOT deliver until the parent is also activated.
  - After creating a full campaign structure, activate from top to bottom: campaign first, then ad set, then ad.

  ## Response Guidelines:
  1. For live entities, confirm the entity has been activated.
  2. A PUBLISHING status means the draft campaign passed validation and was handed
     to the publisher, which finishes after this call returns. Report it as in
     progress; do NOT tell the user the campaign is live.
  3. If the call is rejected for validation errors, the message lists the offending
     campaign, ad set, or ad and its errors. Nothing was published. Relay the
     errors, fix them with ads_update_entity, then activate again.
  4. Provide the entity ID, entity type, and new status.
  5. If activating a child entity, remind the user that all parent entities must also be active for ads to deliver.

  ## CRITICAL:
  - This action makes the entity live and will start spending budget.
  - Always get explicit user confirmation before calling this tool.

  ## POTENTIAL NEXT STEP — RECOMMEND OPPORTUNITY SCORE:
  After a successful activation, suggest calling \`ads_get_opportunity_score\` to check
  the account's optimization status and get personalized recommendations
  from Meta to maximize ad performance while spending is active.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID that owns the entity.`,
      },
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The entity ID to activate (change from PAUSED to ACTIVE).`,
      },
      {
        name: 'entity_type',
        type: 'string',
        required: true,
        description: `The type of entity to activate. Values: campaign, ad_set, ad.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_boost_ig_post',
    description: `Creates an Instagram ad from an existing IG post. Supports a plan/confirm two-step flow.

  Only 3 fields are required: ad_account_id, ig_account_id, ig_media_id. All other fields are optional with sensible defaults. For simple boosts, just provide the required fields. For full control, override any campaign (L3), ad set (L2), or ad (L1) field.

  ## When to use:
  - Call with confirmed=false FIRST to get a plan showing all resolved settings.
  - Call with confirmed=true ONLY after the user has reviewed and approved the plan.
  - Use after ads_get_ig_accounts and ads_get_ig_media to get the required IDs.

  ## When NOT to use:
  - Do NOT call with confirmed=true without first showing the user the plan.
  - Do NOT use for creating regular (non-IG-boost) ad campaigns — use ads_create_campaign instead.

  ## Response Guidelines:
  1. In plan mode: Show all resolved settings across L3/L2/L1, including defaults.
  2. In creation mode: Return all created entity IDs and confirm PAUSED state.
  3. Remind user they can activate with ads_activate_entity when ready.

  ## CRITICAL:
  - All entities are created in PAUSED state. Budget is NOT spent until activated.
  - Always show the plan first and get explicit user confirmation before creating.
  - The ig_account_id must be linked to the ad_account_id and the app must have \`instagram_basic\` permission for it. Use ads_get_ig_accounts to find eligible accounts.
  - Defaults: roughly the $5 USD/day-equivalent in the ad account's local currency for 6 days, OUTCOME_TRAFFIC objective, INSTAGRAM_PROFILE destination, US targeting, IMPRESSIONS billing, LOWEST_COST_WITHOUT_CAP bidding.
  - All budget amounts are in the smallest unit of the ad account's currency (e.g. cents for USD, whole yen for JPY). The plan output includes a \`currency\` field — present budgets in that currency, never assume USD.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to create the boost under. Format: numeric ID.`,
      },
      {
        name: 'ig_account_id',
        type: 'string',
        required: true,
        description: `The IG account ID that owns the media to boost.`,
      },
      {
        name: 'ig_media_id',
        type: 'string',
        required: true,
        description: `The numeric id field from ads_get_ig_media output. Do NOT decode or transform the permalink URL shortcode — use the id value exactly as returned.`,
      },
      {
        name: 'ad_name',
        type: 'string',
        required: false,
        description: `Name for the ad. Default: "Instagram post: {caption}" derived from the IG post.`,
      },
      {
        name: 'ad_set_name',
        type: 'string',
        required: false,
        description: `Name for the ad set. Default: "Instagram post: {caption}" derived from the IG post.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'bid_amount',
        type: 'integer',
        required: false,
        description: `Bid cap in the smallest unit of the ad account currency (e.g. cents for USD, whole yen for JPY). Used with LOWEST_COST_WITH_BID_CAP bid strategy.`,
      },
      {
        name: 'bid_strategy',
        type: 'string',
        required: false,
        description: `Ad set bid strategy. Default: LOWEST_COST_WITHOUT_CAP. Values: LOWEST_COST_WITHOUT_CAP, LOWEST_COST_WITH_BID_CAP, COST_CAP.`,
      },
      {
        name: 'billing_event',
        type: 'string',
        required: false,
        description: `Ad set billing event. Default: IMPRESSIONS. Values: IMPRESSIONS, LINK_CLICKS, POST_ENGAGEMENT, VIDEO_VIEWS.`,
      },
      {
        name: 'buying_type',
        type: 'string',
        required: false,
        description: `Campaign buying type. Default: AUCTION. Values: AUCTION, RESERVED.`,
      },
      {
        name: 'call_to_action',
        type: 'string',
        required: false,
        description: `Call-to-action for the ad creative.`,
      },
      {
        name: 'campaign_bid_strategy',
        type: 'string',
        required: false,
        description: `Campaign-level bid strategy. Values: LOWEST_COST_WITHOUT_CAP, LOWEST_COST_WITH_BID_CAP, COST_CAP.`,
      },
      {
        name: 'campaign_daily_budget',
        type: 'integer',
        required: false,
        description: `Campaign-level daily budget in the smallest unit of the ad account currency (e.g. cents for USD, whole yen for JPY). Mutually exclusive with campaign_lifetime_budget.`,
      },
      {
        name: 'campaign_lifetime_budget',
        type: 'integer',
        required: false,
        description: `Campaign-level lifetime budget in the smallest unit of the ad account currency (e.g. cents for USD, whole yen for JPY). Mutually exclusive with campaign_daily_budget.`,
      },
      {
        name: 'campaign_name',
        type: 'string',
        required: false,
        description: `Name for the campaign. Default: "Instagram post: {caption}" derived from the IG post.`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Set to true to create the ad. Set to false (default) to get a plan showing resolved settings without creating anything.`,
      },
      {
        name: 'daily_budget',
        type: 'integer',
        required: false,
        description: `Daily budget in the smallest unit of the ad account currency (e.g. cents for USD, whole yen for JPY). Defaults to roughly the $5 USD/day-equivalent in the account currency, clamped to the per-currency minimum. Mutually exclusive with lifetime_budget.`,
      },
      {
        name: 'destination_type',
        type: 'string',
        required: false,
        description: `Ad set destination type. Default: INSTAGRAM_PROFILE. Values: INSTAGRAM_PROFILE, WEBSITE, ON_AD, INSTAGRAM_DIRECT, MESSENGER, WHATSAPP, FACEBOOK, SHOP_AUTOMATIC.`,
      },
      {
        name: 'duration_days',
        type: 'integer',
        required: false,
        description: `Number of days to run the ad. Default: 6.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Ad set end time in ISO 8601 format. Default: computed from duration_days.`,
      },
      {
        name: 'lifetime_budget',
        type: 'integer',
        required: false,
        description: `Ad set lifetime budget in the smallest unit of the ad account currency (e.g. cents for USD, whole yen for JPY). Mutually exclusive with daily_budget. Requires end_time.`,
      },
      {
        name: 'objective',
        type: 'string',
        required: false,
        description: `Campaign objective. Default: OUTCOME_TRAFFIC. Only ODAX outcome values are accepted: OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_APP_PROMOTION.`,
      },
      {
        name: 'optimization_goal',
        type: 'string',
        required: false,
        description: `Ad set optimization goal. Default: VISIT_INSTAGRAM_PROFILE. Values: VISIT_INSTAGRAM_PROFILE, LINK_CLICKS, POST_ENGAGEMENT, CONVERSATIONS, LEAD_GENERATION, OFFSITE_CONVERSIONS, REACH, IMPRESSIONS, LANDING_PAGE_VIEWS.`,
      },
      {
        name: 'promoted_object',
        type: 'string',
        required: false,
        description: `JSON promoted object spec for conversion tracking. Required for OUTCOME_SALES/OUTCOME_LEADS. Example: {"pixel_id":"123456","custom_event_type":"PURCHASE"}.`,
      },
      {
        name: 'special_ad_categories',
        type: 'string',
        required: false,
        description: `JSON array of special ad categories. Default: []. Values: CREDIT, EMPLOYMENT, HOUSING, ISSUES_ELECTIONS_POLITICS.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Ad set start time in ISO 8601 format. Default: immediate.`,
      },
      { name: 'targeting', type: 'string', required: false, description: `JSON targeting spec.` },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_create',
    description: `Creates a new product catalog for a business and uploads product data in one step, using a feed URL, inline batch items, or a direct file upload.

## Always Required (the call fails without these):
- \`catalog_name\`: the name for the new catalog. If the user has not given a name, ask them for one before calling this tool — do NOT invent a placeholder and do NOT call without it.
- \`business_id\`: the Meta Business Manager ID that will own the catalog. This must be a Business Manager ID, NOT an ad account ID and NOT a Page ID. If you only have an ad account ID or are unsure, call ads_catalog_get_catalogs (or ask the user) to find the correct Business Manager ID first — passing the wrong ID type fails with "not a valid business_id".

This tool ALWAYS uploads product data as part of catalog creation — it cannot create an empty catalog. In addition to the two always-required arguments above, you MUST provide exactly one data source (feed_url, items, or feed_file_content); the call fails if you provide none, or more than one.

## IMPORTANT — One Catalog Guidance:
Before calling this tool, ALWAYS call ads_catalog_get_catalogs with the business_id to check for existing catalogs. Businesses should use a single catalog for all advertising and commerce objectives. Creating duplicate catalogs with overlapping items causes:
- Signal fragmentation (up to 14% lower ROAS)
- Selection liquidity loss (up to 18% higher CPA)
- Cold start problems (up to 21% performance reduction)
- Metadata fragmentation across catalogs
If the business already has catalogs, strongly recommend using the existing catalog instead. Only proceed with creation after confirming with the user that a new catalog with distinct items is needed.

## When to use:
- User wants to create a new catalog and upload product data from scratch.
- User says "set up a new catalog", "onboard my products", or "create a catalog with my feed."
- User has a feed URL (CSV/TSV/XML) or product items to upload.

## When NOT to use:
- Do NOT call this tool to modify an existing catalog or add a feed to an existing catalog.
- Do NOT call this tool if the user just wants to list or inspect catalogs — use ads_catalog_get_catalogs or ads_catalog_get_details instead.
- Do NOT call this tool without first checking for existing catalogs via ads_catalog_get_catalogs.

## Data Upload Methods (exactly one required):
1. **Feed URL**: Provide feed_url (+ optional feed_name, schedule). Meta fetches data from the URL.
2. **Batch items**: Provide items array with product data inline. Items are uploaded via Batch API.
3. **File upload**: Provide feed_file_content (base64-encoded file, + feed_file_name and optional feed_file_type). Meta ingests the uploaded file directly.

## Input Requirements:
- \`business_id\` (always required): The Meta Business Manager ID to create the catalog under. Must be a Business Manager ID, not an ad account ID or Page ID.
- \`catalog_name\` (always required): Name for the new catalog. Ask the user if it was not provided.
- \`vertical\` (optional): Catalog vertical, defaults to "commerce".
- \`feed_name\` (optional): Name for the feed. Required when using feed_url.
- \`feed_url\` (optional): URL of the product data file (CSV/TSV/XML). Mutually exclusive with items and feed_file_content.
- \`schedule\` (optional): Feed schedule when using feed_url. Object with interval, hour, minute, timezone, day_of_week.
- \`items\` (optional): Array of product items for Batch API upload. Mutually exclusive with feed_url and feed_file_content.
- \`feed_file_content\` (optional): Base64-encoded file content for direct upload. Mutually exclusive with feed_url and items. Requires feed_file_name.
- \`feed_file_name\` (optional): Original filename for the uploaded file (e.g., "products.csv"). Required when feed_file_content is provided.
- \`feed_file_type\` (optional): MIME type of the uploaded file. Defaults to "text/csv".

## Output Format:
JSON with catalog_id, catalog_name, upload_method ("feed" or "batch"), and conditionally feed_id/feed_name (feed path) or batch_handles (batch path).`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `Always required. The Meta Business Manager ID to create the catalog under. This must be a Business Manager ID, NOT an ad account ID and NOT a Page ID. Look it up with ads_catalog_get_catalogs or in Meta Business Settings if unknown.`,
      },
      {
        name: 'catalog_name',
        type: 'string',
        required: true,
        description: `Always required. Name for the new catalog. If the user did not specify one, ask them for it instead of calling this tool without it.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'feed_file_content',
        type: 'string',
        required: false,
        description: `Base64-encoded file content for direct file upload. Mutually exclusive with feed_url and items. Practical limit ~10MB before encoding.`,
      },
      {
        name: 'feed_file_name',
        type: 'string',
        required: false,
        description: `Original filename for the uploaded file (e.g., "products.csv"). Required when feed_file_content is provided.`,
      },
      {
        name: 'feed_file_type',
        type: 'string',
        required: false,
        description: `MIME type of the uploaded file. Defaults to "text/csv". Examples: "text/csv", "text/tab-separated-values", "application/xml".`,
      },
      {
        name: 'feed_name',
        type: 'string',
        required: false,
        description: `Name for the product feed. Required when using feed_url.`,
      },
      {
        name: 'feed_password',
        type: 'string',
        required: false,
        description: `Password for authenticated feed URL access (HTTP basic auth or SFTP). Only used with feed_url.`,
      },
      {
        name: 'feed_url',
        type: 'string',
        required: false,
        description: `URL of the product data file (CSV/TSV/XML). Mutually exclusive with items and feed_file_content.`,
      },
      {
        name: 'feed_username',
        type: 'string',
        required: false,
        description: `Username for authenticated feed URL access (HTTP basic auth or SFTP). Only used with feed_url.`,
      },
      {
        name: 'items',
        type: 'array',
        required: false,
        description: `Product items for Batch API upload. Mutually exclusive with feed_url and feed_file_content.`,
      },
      {
        name: 'schedule',
        type: 'object',
        required: false,
        description: `Feed schedule configuration. Only used with feed_url.`,
      },
      {
        name: 'update_only',
        type: 'boolean',
        required: false,
        description: `If true, the upload only updates existing items instead of creating new ones. Defaults to false.`,
      },
      {
        name: 'vertical',
        type: 'string',
        required: false,
        description: `Catalog vertical (e.g., commerce, vehicles, hotels). Defaults to commerce.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_create_feed_rule',
    description: `Create a new transformation rule on a product feed. Feed rules map or transform attributes during ingestion to fix common feed schema mismatches without the advertiser editing their source file.

When to use:
- The advertiser's feed column name does not match a Meta product attribute (use mapping_rule, e.g. params={"map_from": "desc"} on attribute="description").
- A specific value needs translation (use value_mapping_rule, e.g. map "yes"/"no" availability values to "in stock"/"out of stock").
- Letter case needs normalization (use letter_case_rule with type=to_upper|to_lower|capitalize_all|capitalize_first).
- A default value should be filled in when the feed leaves a column empty (use fallback_rule with user_default_value).
- A regex find/replace is needed on values (use regex_replace_rule).

When NOT to use:
- To inspect existing rules on a feed (use ads_catalog_get_feed_rules).
- To upload or modify feed data itself (use the catalog ingestion endpoints).
- To create a catalog, feed, or product set (use ads_catalog_create for a catalog, ads_catalog_create_product_feed for a feed, ads_catalog_create_product_set for a product set).

Notes:
- params is a JSON-encoded object of string-to-string key-value pairs, e.g. {"map_from": "desc"}.
- Both attribute and rule_type are immutable after creation; only params can be updated later via a separate endpoint.
- The combination (product_feed_id, rule_type, attribute) must be unique. Re-creating the same combination returns a duplicate error.`,
    params: [
      {
        name: 'attribute',
        type: 'string',
        required: true,
        description: `The catalog attribute the rule transforms (e.g., "description", "availability", "title", "price"). A feed cannot have more than one rule with the same rule_type and attribute. Immutable once created.`,
      },
      {
        name: 'product_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the product feed to attach this rule to (numeric string).`,
      },
      {
        name: 'rule_type',
        type: 'string',
        required: true,
        description: `The type of rule. One of: "mapping_rule" (map a source column to a catalog attribute, e.g. params={"map_from": "desc"}); "value_mapping_rule" (map raw input values to catalog values for a specific attribute); "letter_case_rule" (transform letter case; params={"type": "to_upper|to_lower|capitalize_all|capitalize_first"}); "fallback_rule" (use params={"user_default_value": "..."} when the input value is empty); "regex_replace_rule" (regex-based find/replace on values). Immutable once created.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'params',
        type: 'string',
        required: false,
        description: `Optional JSON-encoded object of string-to-string key-value parameters for the rule, e.g. {"map_from": "desc"} for a mapping_rule or {"type": "to_lower"} for a letter_case_rule. Common keys: "map_from" (mapping_rule source column), "type" (letter_case_rule mode), "user_default_value" (fallback_rule default), "dependent_field_name", "dependent_field_value", "map_mode" (COPY|MOVE). String values are stored verbatim (whitespace preserved). If omitted, defaults to an empty object.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_create_product_feed',
    description: `Create a new product feed (a "data source") under a catalog. A product feed is the entry point for ingesting product data into a catalog, either by uploading a file or by pointing Meta at a URL to fetch on a recurring schedule. This complements ads_catalog_create, which creates the catalog itself.

When to use:
- The advertiser wants to add a new source of products to an existing catalog.
- The advertiser wants Meta to fetch a feed file (CSV/TSV/XML) from a URL on a recurring schedule (pass the schedule object).
- Setting up a feed before uploading items or attaching feed rules.

When NOT to use:
- To create the catalog itself (use ads_catalog_create).
- To upload items into an existing feed right now (use the catalog ingestion / upload-session endpoints).
- To add transformation rules to an existing feed (use ads_catalog_create_feed_rule).
- To inspect existing feeds (use ads_catalog_get_product_feed_details).

Notes:
- schedule is optional. When omitted, the feed is created with no automatic fetch schedule. When provided, it is a structured object; "interval" and "url" are required and (S)FTP URLs additionally require "username"/"password".
- If the feed is created successfully but the schedule fails to attach, use ads_catalog_update_product_feed with replace_schedule to add the schedule to the existing feed. Do not create a duplicate feed.
- The feed is created under the catalog identified by catalog_id; the output id is the new feed's Meta-assigned ID.
- Requires EDIT_PRODUCT_CATALOG permission on the catalog.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The ID of the catalog to create the product feed under (numeric string).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the product feed (e.g. "Summer 2026 Catalog Feed").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Optional ISO 3166-1 alpha-2 country code for the feed (e.g. "US", "GB"). Defaults to "US" when omitted.`,
      },
      {
        name: 'default_currency',
        type: 'string',
        required: false,
        description: `Optional ISO 4217 currency code used for items in the feed that do not specify their own currency (e.g. "USD", "GBP"). Defaults to "USD" when omitted.`,
      },
      {
        name: 'feed_type',
        type: 'string',
        required: false,
        description: `Optional feed type. Most commerce/product catalogs can omit this to use the catalog's default item type. Use lowercase feed type values such as "products" (the default), "hotel", "flight", "destination", "home_listing", "vehicles", or "media_title". Uppercase aliases are accepted and normalized. Must be valid for the catalog's vertical.`,
      },
      {
        name: 'schedule',
        type: 'object',
        required: false,
        description: `Optional recurring schedule for fetching the feed from a URL. Omit it to create a feed with no automatic fetch schedule (items can still be uploaded manually). When provided, "interval" and "url" are required, and (S)FTP URLs additionally require "username"/"password".`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_create_product_feed_upload_session',
    description: `Triggers a new upload session on an existing product feed, forcing an immediate refresh from the configured remote source URL. Use this when an agent or advertiser needs to pull the latest products without waiting for the next scheduled run. Returns the new upload session ID so the caller can poll for status via \`ads_catalog_get_product_feed_upload_sessions\`.

This tool only works for feeds that have a remote fetch URL configured. Before calling it, check the feed's configuration with \`ads_catalog_get_product_feed_details\` — if the feed has no source URL, this tool cannot start an upload session.

## When to use:
- The user wants to refresh / re-pull / re-ingest products from an existing remote feed without waiting for the next scheduled run.
- The user is debugging ingestion and wants to force a fresh fetch (e.g., after fixing the source file at the merchant URL).
- The user has updated their hosted feed file and wants the catalog to reflect the change immediately.

## When NOT to use:
- The feed has no configured source URL (i.e., the catalog was populated by manual file upload or batch API only) — verify this first with \`ads_catalog_get_product_feed_details\`, then use \`ads_catalog_update_product_feed\` with \`replace_schedule\` to add a fetch schedule and source URL before triggering an upload.
- The user wants to create a new feed — use \`ads_catalog_create_product_feed\` instead.
- The user wants to inspect previous upload runs — use \`ads_catalog_get_product_feed_upload_sessions\`.
- The user wants to change the feed's schedule, URL, or credentials — use \`ads_catalog_update_product_feed\` instead.

## Input Requirements:
- \`product_feed_id\` (required): The ID of the product feed to refresh.

## Output Format:
JSON with:
- \`upload_session_id\` — the newly created session ID.
- \`product_feed_id\` — echo of the input feed ID.
- \`source_url\` — the URL the upload will fetch from (no credentials).

## Errors:
- If the feed has no configured source URL, the tool fails because there is nothing to fetch from. Check the feed with \`ads_catalog_get_product_feed_details\` first; a feed without a source URL cannot trigger an upload session.
- If another upload for the same feed is already running, the tool fails with an "upload already in progress" error. Concurrent uploads are not supported — do NOT retry immediately. Wait for the current session to finish (poll with \`ads_catalog_get_product_feed_upload_sessions\`) or inform the user that an upload is already underway.`,
    params: [
      {
        name: 'product_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the product feed to refresh. The feed must be a remote feed with a configured source URL.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_create_product_set',
    description: `Creates a dynamic product set in a catalog from a structured filter rule (see **Filter spec** below) and returns the new set's ID, name, filter, and the number of products that match. Always preview the filter first with \`ads_catalog_search_product\` and confirm with the user before calling this tool — set creation mutates the catalog and there is no undo via this tool.

## When to use:
- The user has explicitly confirmed they want to create a product set from a filter you've already previewed via \`ads_catalog_search_product\`.
- The user wants to materialize a catalog segment that the structured product-set creation flows do not support (compound AND/OR/NOT, range queries on custom fields).

## When NOT to use:
- The user has not yet confirmed the filter — call \`ads_catalog_search_product\` first and surface the sample products + total_count.
- The user wants to create a static set of explicit product IDs — out of scope for v1; tell the user this is not yet supported.
- The user wants to update an existing set — use \`ads_catalog_update_product_set\` instead.

## Input:
- \`catalog_id\` (required): the product catalog ID to create the set under.
- \`title\` (required): display name for the new set. Trimmed; must be non-empty.
- \`filter\` (required): a JSON-encoded rule selecting which products belong to the set. Same operators, same field list, same vertical/item-type validation as \`ads_catalog_search_product\`. See the **Filter spec** section below for the full operator catalog and examples.
- \`retailer_id\` (optional): a merchant-assigned identifier for the set. Only pass when the user provides one explicitly.

## Returns:
JSON with the same shape as a single entry from \`ads_catalog_get_product_sets\`:
- \`product_set_id\`, \`catalog_id\`, \`name\`, \`product_count\` (matched-item count at creation time), \`retailer_id\`, \`filter_rule\`, \`product_set_type\`, \`visibility\`, \`creation_time\`.

## Errors:
- Malformed filter JSON, or a filter that references a field not valid for the catalog's vertical, is rejected before any mutation with an actionable error.
- Duplicate sets (same catalog + same filter) are rejected — the error includes the existing set's ID so the agent can point the user at it.
- Invalid \`catalog_id\` (wrong entity type or not visible to the viewer) is rejected with an actionable error.

## Examples:
- Create a set of all in-stock Acme items in catalog 123:
  - First: \`ads_catalog_search_product\` with \`catalog_id=123\`, \`filter={"and":[{"brand":{"eq":"Acme"}},{"availability":{"eq":"in stock"}}]}\` → confirm sample products + total_count with the user.
  - Then: \`ads_catalog_create_product_set\` with \`catalog_id=123\`, \`title="Acme — In Stock"\`, \`filter={"and":[{"brand":{"eq":"Acme"}},{"availability":{"eq":"in stock"}}]}\`.

## Filter spec:
**Shape:**
- Leaf rule: \`{<field>: {<op>: <value>}}\`
- Compound rule: \`{<combinator>: [<rule>, ...]}\`

**Logical combinators:**
- \`and\` — match ALL of the nested rules. Example: \`{"and":[{"availability":{"eq":"in stock"}},{"brand":{"eq":"Acme"}}]}\` returns items that are in stock AND Acme-branded.
- \`or\` — match ANY of the nested rules. Example: \`{"or":[{"category":{"contains":"shoe"}},{"category":{"contains":"sneaker"}}]}\` returns items whose category contains either "shoe" or "sneaker".
- \`not\` — invert a single rule. Example: \`{"not":{"brand":{"eq":"Acme"}}}\` returns items whose brand is NOT exactly "Acme". Wraps one rule, not an array.

**Comparison operators:**
- \`eq\` — exact match. Example: \`{"brand":{"eq":"Instagram"}}\` matches only items with brand exactly "Instagram".
- \`neq\` — does NOT exactly match. Example: \`{"brand":{"neq":"Instagram"}}\` matches items whose brand is anything other than "Instagram".
- \`lt\`, \`lte\` — numeric less-than (strict / inclusive). Example: \`{"priority":{"lt":3}}\` matches items with priority < 3.
- \`gt\`, \`gte\` — numeric greater-than (strict / inclusive). Example: \`{"priority":{"gte":3}}\` matches items with priority >= 3.

**String operators:**
- \`contains\` — substring match. Example: \`{"category":{"contains":"running shoe"}}\` matches items whose category contains the substring, e.g. "red running shoe", "blue running shoe", "running shoe for kids".
- \`not_contains\` — substring excludes. Example: \`{"category":{"not_contains":"running shoe"}}\` matches items whose category does NOT contain the substring, e.g. "red walking shoe", "sandals", "boots".
- \`starts_with\` — prefix match. Example: \`{"category":{"starts_with":"small"}}\` matches "small sandals", "small t-shirt", etc. **Note:** only valid for the product category field; for other fields use \`contains\`.

**Set operators:** (right-hand side is an array)
- \`is_any\` — match if value is any one of the listed. Example: \`{"color":{"is_any":["black","blue","brown"]}}\` matches items in any of those colors.
- \`is_not_any\` — match if value is none of the listed. Example: \`{"color":{"is_not_any":["black","blue","brown"]}}\` matches items NOT in any of those colors (e.g. "red", "yellow", "green").

**Supported fields (commerce vertical only):**

- \`age_group\` — string enum, one of: \`adult\`, \`infant\`, \`kids\`, \`newborn\`, \`toddler\`. Use \`eq\` / \`is_any\`.
- \`availability\` — string enum, one of: \`available for order\`, \`in stock\`, \`preorder\`, \`out of stock\`. Use \`eq\` / \`neq\` / \`is_any\` / \`is_not_any\`.
- \`brand\` — string. Brand name from the feed. String operators apply.
- \`category\` — string. Free-form merchant category from the feed (e.g. \`"running shoe"\`). String operators apply (including \`starts_with\`).
- \`color\` — string. String operators apply.
- \`condition\` — string enum, one of: \`new\`, \`refurbished\`, \`used\`. Use \`eq\` / \`neq\` / \`is_any\` / \`is_not_any\`.
- \`currency\` — string ISO-4217 currency code (e.g. \`"USD"\`, \`"GBP"\`). Use \`eq\` / \`is_any\`.
- \`custom_label_0\`, \`custom_label_1\`, \`custom_label_2\`, \`custom_label_3\`, \`custom_label_4\` — string. Free-form merchant labels from the feed. String operators apply.
- \`gender\` — string enum, one of: \`female\`, \`male\`, \`unisex\`. Use \`eq\` / \`is_any\`.
- \`images_fetch_status\` — string. Fetch status of the product's images. Common values: \`fetched\`, \`direct_upload\`, \`fetch_failed\`, \`outdated\`, \`partial_fetch\`, \`not_fetched\`. Use \`eq\` / \`is_any\` (e.g. find products with broken images: \`{"images_fetch_status":{"eq":"fetch_failed"}}\`). Note: the filter field is plural \`images_fetch_status\`, even though the returned response field is singular \`image_fetch_status\`.
- \`material\` — string. String operators apply.
- \`name\` — string. Product name/title from the feed. String operators apply.
- \`pattern\` — string (e.g. \`"striped"\`, \`"polka dot"\`). String operators apply.
- \`price_amount\` — integer; the price multiplied by 100, for all currencies (e.g. \`$4.90 USD\` → \`490\`, \`¥490 JPY\` → \`49000\`). Use numeric operators (\`eq\`, \`lt\`, \`lte\`, \`gt\`, \`gte\`). Note: the field is \`price_amount\`, not \`price\`.
- \`product_expiration_time\` — date/time when the product is no longer available.
- \`product_feed_id\` — integer. The ID for the product feed. Use \`eq\` / \`is_any\`.
- \`product_group_id\` — integer. ID grouping product variants (e.g. all sizes/colors of one shirt share a \`product_group_id\`). Use \`eq\` / \`is_any\`.
- \`product_item_id\` — integer. Meta-assigned numeric product item ID. Use \`eq\` / \`is_any\` for exact lookup.
- \`product_type\` — string. Merchant-defined taxonomy (e.g. \`"Apparel & Accessories > Shoes"\`). String operators apply.
- \`region_id\` — integer. The region ID for the location for a product item. Use \`eq\` / \`is_any\`.
- \`retailer_id\` — string. The merchant-provided unique identifier (SKU). Use \`eq\`, \`is_any\`, etc. for exact matches.
- \`retailer_product_group_id\` — string. The merchant-provided identifier for the product group the item belongs to (the retailer's item group ID). Use \`eq\`, \`is_any\`, etc. for exact matches.
- \`sale_price_amount\` — integer; same format as \`price_amount\` (price × 100). Numeric operators apply. Note: the field is \`sale_price_amount\`, not \`sale_price\`.
- \`size\` — string. String operators apply.
- \`tags\` — string. Tags for product organization. String operators apply.
- \`videos_fetch_status\` — string. The fetch status of associated videos. Use \`eq\` / \`is_any\`.
- \`visibility\` — string enum, one of: \`published\`, \`staging\`, \`hidden\`, \`whitelist_only\`. Items in \`staging\` are not visible to buyers and are not available in dynamic ads. Use \`eq\` / \`is_any\`.

**Notes:**
- Only the commerce vertical is supported. Field names not in the list above will be rejected.
- Use \`eq\` (not \`contains\`) for enum-typed fields (\`age_group\`, \`availability\`, \`condition\`, \`gender\`, \`visibility\`).
- Value matching is case-insensitive: \`{"brand":{"eq":"acme"}}\` and \`{"brand":{"eq":"Acme"}}\` return the same items. Do not bother trying multiple casings of the same value to "broaden" matches.
- \`price_amount\` and \`sale_price_amount\` are integers — the price multiplied by 100. \`{"price_amount":{"lt":"5000"}}\` means "less than $50.00", not "less than $5000". Bare \`price\` / \`sale_price\` are not valid filter fields for product items (they apply to other verticals only).

**Common wrong field name aliases:**
- \`title\`, \`product_name\` → use \`name\` (the product title/name field).
- \`price\`, \`sale_price\`, \`current_price\` → use \`price_amount\` / \`sale_price_amount\` (integers, price × 100).
- \`item_group_id\` → use \`product_group_id\`.
- \`product_id\` → use \`product_item_id\` (Meta-assigned numeric ID).
- \`image_fetch_status\` (singular) → use \`images_fetch_status\` (plural).
- \`link\`, \`description\`, \`sku\` → not supported filter fields. Use \`retailer_id\` for SKU lookups.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID to create the set under.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: true,
        description: `JSON-encoded rule that selects which products from the catalog belong to this set. Shape: a leaf rule is \`{"<field>":{"<op>":<value>}}\` (e.g. \`{"availability":{"eq":"in stock"}}\`); combine leaves with \`{"and":[...]}\` / \`{"or":[...]}\` / \`{"not":{...}}\` (e.g. \`{"and":[{"brand":{"eq":"Acme"}},{"availability":{"eq":"in stock"}}]}\`). See the **Filter spec** section in this tool's description for the full operator and field catalog. Validated against the catalog's vertical and item type before creation; invalid filters are rejected with an actionable error. Strongly recommend calling \`ads_catalog_search_product\` with the same \`catalog_id\` + \`filter\` first to preview matched products and confirm with the user before committing.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `REQUIRED. Human-readable display name for the new product set (e.g. "Summer Sale — In Stock"). Must be a non-empty string after trimming whitespace — always set it, even when the user only describes the filter.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'retailer_id',
        type: 'string',
        required: false,
        description: `Optional merchant-assigned identifier (SKU-like) for the product set. Only set when the user explicitly provides one.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_delete_product',
    description: `Delete a product item from a catalog. The item is removed from the catalog and immediately stops appearing in ads and on Meta surfaces.

When to use:
- A merchant wants to remove a product item from their catalog.
- You already know the product item ID (from ads_catalog_search_product or ads_catalog_get_product_details).
- The item should no longer appear in ads or on any Meta surface.

When NOT to use:
- To hide a product without permanently removing it — use ads_catalog_update_product with visibility="hidden" instead. Hidden products stop appearing to buyers and in dynamic ads but can be made visible again by setting visibility="published". Prefer this whenever the merchant might want the product back.
- To mark a product as out of stock — use ads_catalog_update_product with availability="out of stock" instead.
- To delete a product set — use ads_catalog_product_set_delete.
- To delete an entire catalog — not supported via MCP; the advertiser must use Commerce Manager.

Notes:
- This action cannot be undone through the API. Treat it as permanent: a deleted product cannot be restored, and recreating it requires re-supplying the product's details. If you only need to stop a product from showing, hide it via ads_catalog_update_product (visibility="hidden") rather than deleting it.
- Mirrors the Graph API endpoint DELETE /{product_item_id}.`,
    params: [
      {
        name: 'product_id',
        type: 'string',
        required: true,
        description: `The ID of the product item to delete (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_event_source_connect',
    description: `Connect an event source to a product catalog so its signals can be matched against the catalog's products (for dynamic ads and Advantage+ catalog ads). Event sources are also commonly called "pixels"; the source can be a PIXEL (data from the seller's website), an APP (data from the seller's app), or an OFFLINE_CONVERSION_DATA_SET (data from in-store transactions). The Conversions API (CAPI) is an enhancement that augments PIXEL or APP data — it is not a standalone event source type.

When to use:
- The advertiser wants to connect a pixel / event source to a catalog (e.g. after ads_catalog_event_source_get shows an expected source is missing).
- To fix product-matching gaps where a catalog is not receiving a source's events.

When NOT to use:
- To list the event sources already connected to a catalog (use ads_catalog_event_source_get).
- To check event-source match rate or setup issues (use ads_catalog_event_source_get_health).
- To find which catalogs an event source is connected to (use ads_catalog_event_source_get_catalogs).

Notes:
- The operation is idempotent: connecting an already-connected source succeeds and returns already_connected=true without making a change.
- The catalog and event source must belong to the same business.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID to connect the event source to (numeric string).`,
      },
      {
        name: 'event_source_id',
        type: 'string',
        required: true,
        description: `The event source ID to connect: a pixel, Conversions API (CAPI) app, or offline conversion data set ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_event_source_disconnect',
    description: `Disconnect an event source from a product catalog, removing the link so the source's signals are no longer matched against the catalog's products. Event sources are also commonly called "pixels"; the source can be a PIXEL (data from the seller's website), an APP (data from the seller's app), or an OFFLINE_CONVERSION_DATA_SET (data from in-store transactions). The Conversions API (CAPI) is an enhancement that augments PIXEL or APP data — it is not a standalone event source type.

When to use:
- The advertiser wants to disconnect / unlink / remove a pixel or event source from a catalog.
- To stop a source's events from being matched against a catalog's products.

When NOT to use:
- To connect an event source to a catalog (use ads_catalog_event_source_connect).
- To list the event sources connected to a catalog (use ads_catalog_event_source_get).
- To check event-source match rate or setup issues (use ads_catalog_event_source_get_health).

Notes:
- The operation is idempotent: disconnecting a source that is not connected succeeds and returns was_connected=false without making a change.
- This is a destructive change that can reduce product matching for dynamic / Advantage+ catalog ads; it is blocked when the catalog has active ad spend (Agent Controls).
- The catalog and event source must belong to the same business.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID to disconnect the event source from (numeric string).`,
      },
      {
        name: 'event_source_id',
        type: 'string',
        required: true,
        description: `The event source ID to disconnect: a pixel, Conversions API (CAPI) app, or offline conversion data set ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_event_source_get',
    description: `List the event sources connected to a product catalog. Event sources are also commonly called "pixels"; this tool returns ALL connected source types and labels each with its source_type: PIXEL (data from the seller's website), APP (data from the seller's app), or OFFLINE_CONVERSION_DATA_SET (data from in-store transactions). The Conversions API (CAPI) is an enhancement that augments PIXEL or APP data — it is not a standalone event source type. Treat a user request about the "pixels connected to the catalog" as a request for this tool unless they explicitly restrict to a specific source type.

When to use:
- To see which pixels / event sources are connected to a catalog
- As a first step before checking event-source match rate or setup issues (then use ads_catalog_event_source_get_health)

When NOT to use:
- To get match rate or setup issues for an event source (use ads_catalog_event_source_get_health)
- To check feed-level catalog health and diagnostics (use ads_catalog_get_diagnostics)`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of event sources to return (default: 20, max: 100).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_event_source_get_catalogs',
    description: `Get the product catalogs connected to a given event source (pixel, CAPI app, or offline conversion data set).

## When to use:
- Step 1 when answering "how will this pixel event be matched?" — call this tool with the pixel/event source ID, then call ads_catalog_search_product on each returned catalog_id with filter={"retailer_id":{"eq":"<content_id>"}} (the pixel content ID) to find which products would be matched.
- When the advertiser wants to know which of their product catalogs are linked to a specific pixel or event source.

## When NOT to use:
- To search for a specific product directly — use ads_catalog_search_product with a known catalog_id.
- When you already know the catalog ID — skip this tool and call ads_catalog_search_product directly. Note that if the catalog is not connected to the event source, the event won't be matched against the catalog unless the catalog ID is specified in the event

## Pixel-matching workflow:
1. Call ads_catalog_event_source_get_catalogs with the pixel/event source ID.
2. For each returned catalog_id, call ads_catalog_search_product with filter={"retailer_id":{"eq":"<content_id>"}} where <content_id> is the content ID from the pixel event.
3. Products found in step 2 are the ones that would be matched by that pixel event.

## Errors:
- If the event source does not exist or the viewer cannot access it, the tool returns an \`Invalid Params\` error.`,
    params: [
      {
        name: 'event_source_id',
        type: 'string',
        required: true,
        description: `The pixel or event source ID (numeric string) whose connected catalogs to list.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_event_source_get_health',
    description: `Report the match rate and setup issues for the event sources connected to a product catalog. "Match rate" is the percentage of conversion events (e.g. Purchase, AddToCart) whose content IDs matched a product in the catalog — higher match rates mean better ad targeting and measurement.

Each event source has a source_type: PIXEL (data from the seller's website), APP (data from the seller's app), or OFFLINE_CONVERSION_DATA_SET (data from in-store transactions); the Conversions API (CAPI) is an enhancement that augments PIXEL or APP data, not a standalone source type.

This tool returns the latest overall match rate (match_rate) AND the historical per-date, per-event-type match rate stats over the past 28 days (match_rate_stats). The historical data is useful to detect trends, regressions, or sudden changes in match quality over time. It also returns a list of setup issues (each with a type, description, and severity). This is the same measurement-layer data Commerce Manager surfaces in its "Events" tab.

When to use:
- To diagnose why catalog products are not matching signals / events ("low match rate", "events not matching products")
- To detect match rate trends or regressions over the past month
- To list the setup issues for a pixel / event source connected to a catalog
- To report match quality for one event source (pass event_source_id) or all connected sources (omit it)

When NOT to use:
- To just list which event sources are connected, without health data (use ads_catalog_event_source_get)
- To check feed-level catalog diagnostics like broken images or missing fields (use ads_catalog_get_diagnostics)
- To run Dynamic Ads integration health checks (use ads_catalog_get_dynamic_ads_health)`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'event_source_id',
        type: 'string',
        required: false,
        description: `Optional event source ID (pixel / app / offline data set) to scope the report to a single connected source. Omit to report on all event sources connected to the catalog.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of event sources to report on when event_source_id is omitted (default: 20, max: 100).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_event_source_get_recommendations',
    description: `Recommend the event sources (pixels) to connect to a product catalog. Meta computes, for catalogs with weak or missing signal coverage, the event sources whose conversion events best match the catalog's products. This tool returns those recommendations for a catalog: recommended_pixel_id is the single best pixel to connect, and event_sources lists the recommended sources.

Each event source has a source_type: PIXEL (data from the seller's website), APP (data from the seller's app), or OFFLINE_CONVERSION_DATA_SET (data from in-store transactions); the Conversions API (CAPI) is an enhancement that augments PIXEL or APP data, not a standalone source type.

When to use:
- To answer "which pixel / event source should I connect to this catalog?"
- During catalog setup, to proactively suggest the best signal source to connect

When NOT to use:
- To list the event sources ALREADY connected to a catalog (use ads_catalog_event_source_get)
- To get match rate / setup issues for an already-connected source (use ads_catalog_event_source_get_health)
- To check feed-level catalog diagnostics like broken images or missing fields (use ads_catalog_get_diagnostics)`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_catalogs',
    description: `Gets the catalogs associated with the authenticated user (up to 100).

## When to use:
- Call this tool when the user asks to see their catalogs or list available catalogs.
- Use when the user wants to browse or find a catalog before drilling into its products or product sets.

## When NOT to use:
- Do NOT call this tool for fetching details about a specific catalog (use ads_catalog_get_details for catalog details, or ads_catalog_get_product_sets to browse a catalog's product sets).
- Do NOT call this tool for fetching individual product items (use ads_catalog_get_product_details instead).

## Input Parameters:
All parameters are optional; omit them all to list every catalog for the authenticated user/token. Catalogs belong to a Business, not an ad account. To scope to a business, pass business_id. If you only have an ad account, pass ad_account_id and it will be resolved to its owning business (business_id takes precedence if both are provided).

## Response Guidelines:
1. Present the list of catalogs including their ID, name, and vertical.
2. If no catalogs are found, inform the user that they may not have any catalogs associated with their account.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: false,
        description: `Filter catalogs by ad account ID. The ad account is resolved to its owning business and only catalogs owned by that business are returned. Ignored if business_id is also provided. Use this when you have an ad account but not its business ID.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'business_id',
        type: 'string',
        required: false,
        description: `Filter catalogs by business ID. Only returns catalogs owned by this business.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page. Set this to the EXACT value of \`page_info.after_cursor\` from the previous response — copy the raw string as-is. Do NOT invent a cursor or use placeholder text. Omit entirely to start from page 1.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of catalogs to return (default: 20, max: 100).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter catalogs by name (case-insensitive, diacritic-insensitive substring match).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_data_sources',
    description: `List ALL data sources connected to a catalog — not just product feeds, but also Batch API, Graph API, partner integrations (Shopify, WooCommerce, SFCC), smart pixel, website crawling, and FB/IG post sourcing. Each data source reports its type, name, the number of products it has ingested, when it last updated, and its latest update status. This matches what the advertiser sees on the "Data Sources" tab in Commerce Manager.

## When to use:
- The user asks what data sources, feeds, or integrations are connected to their catalog ("what are my data sources?", "is my Shopify connected?", "how are my products coming in?").
- The user asks about the status of their products or catalog and you need to know every way data flows into it before answering.
- The user wants a complete inventory of ingestion methods, not just file/URL feeds.

## When NOT to use:
- The user wants the upload history of one specific feed — use \`ads_catalog_get_product_feed_upload_sessions\`.
- The user wants the configuration (schedule, URL) of one specific feed — use \`ads_catalog_get_product_feed_details\`.
- The user wants to inspect products directly — use \`ads_catalog_search_product\`.
- The user wants overall catalog metadata (name, vertical, counts) — use \`ads_catalog_get_details\`.

## Input Requirements:
- \`catalog_id\` (required): The product catalog ID.
- \`limit\` (optional): Maximum number of data sources to return.
- \`cursor\` (optional): Pagination cursor from a previous response.

## Output Format:
JSON with:
- \`catalog_id\` — echo of the input catalog ID.
- \`data_sources\` — list of data sources (most recent first) with id, name, type, product_count, last_update_time, and status.
- \`total_count\` — total number of data sources connected to the catalog, across all pages.
- \`has_more\` — whether more data sources exist beyond this page.
- \`next_cursor\` — cursor to fetch the next page, or null.

## Errors:
- If the catalog does not exist or the viewer cannot see it, the tool returns an \`Invalid Params\` error.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID (numeric string) whose data sources to list.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of data sources. Set this to the EXACT value of next_cursor from the previous response. Omit to start from the most recent source.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of data sources to return, most recent first. Defaults to 20, capped at 100.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_details',
    description: `Get catalog details including name, vertical, product/product set counts, business info, and optionally a paginated list of feeds.

When to use:
- To inspect a catalog's metadata and configuration
- To list feeds associated with a catalog (optionally filtered by feed_ingestion_source_type or override_type)
- As a first step before drilling into products or diagnostics

When NOT to use:
- To list products in a catalog (use ads_catalog_search_product)
- To check catalog health (use ads_catalog_get_diagnostics)
- To list catalogs for a business (use ads_catalog_get_catalogs)
- To list ALL of a catalog's data sources (the \`feeds\` field here covers file/URL product feeds only; use ads_catalog_get_data_sources for Batch API, partner integrations like Shopify/WooCommerce, smart pixel, website crawling, and Graph API)

Response Guidelines:
- If \`product_sets_with_items_blocked_in_ads\` is non-empty, the listed actively-advertised product sets have items blocked from appearing, with a per-set count. Call this out to the user (cite per-set counts; do not sum them into a catalog-wide total, since a product can belong to multiple sets) and follow up with ads_catalog_get_diagnostics (using this catalog_id) to surface and fix the specific issues.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'feed_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of feeds.`,
      },
      {
        name: 'feed_ingestion_source_type',
        type: 'string',
        required: false,
        description: `Optional filter to return only feeds of this role: primary_feed (owns items) or supplementary_feed (only enriches items owned by a primary feed). Omit to return feeds of all roles.`,
      },
      {
        name: 'feed_limit',
        type: 'integer',
        required: false,
        description: `Number of feeds to return. Omit to exclude feeds from the response. Defaults to 25 when feed_cursor is provided without feed_limit. If explicitly set to 0, feeds are always excluded.`,
      },
      {
        name: 'override_type',
        type: 'string',
        required: false,
        description: `Optional filter to return only override (localization) feeds of this type: language, country, version, catalog_segment_customize_default, language_and_country, batch_api_language_or_country, smart_pixel_language_or_country, local. Omit to return feeds regardless of override type.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_diagnostics',
    description: `Fetches diagnostic issues for a product catalog, including errors and warnings that may affect ad delivery.

## When to use:
- Call this tool when the user reports issues with their catalog or products not showing in ads.
- Use when the user asks about catalog errors, warnings, or quality issues (including broken images, missing fields, policy violations).
- Use to diagnose why products may not be eligible for certain ad surfaces.
- Use when the user asks about broken or failed product images at the catalog level. Note: for per-product image status, also check the \`image_fetch_status\` field from \`ads_catalog_search_product\`.

## When NOT to use:
- Do NOT call this tool for individual product details — use ads_catalog_search_product instead.
- Do NOT call this tool for feed rules, feed transformations, or why product data looks different from the feed file — use ads_catalog_get_feed_rules instead.

## Response Guidelines:
1. Prioritize MUST_FIX severity issues over OPPORTUNITY (should_fix) issues.
2. For each diagnostic, explain what it means and suggest corrective actions.
3. Group related diagnostics if multiple exist.
4. number_of_affected_items counts affected VARIANTS/SKUs, not deduplicated products. Always describe it to the advertiser as the number of affected items/variants (e.g. "34 affected items"). Do NOT present it as a count of "products", do NOT build a products-vs-variants comparison from it, and do NOT infer how many distinct products are affected or whether products have single/multiple variants — that grouped product count is not available from this tool.
5. When affected_channels is non-empty, clearly state the issue only affects those specific channels — do NOT say it blocks all ad delivery. An empty affected_channels list means the issue applies broadly. Channel name mapping: "mini_shops" = Facebook/Instagram Shops, "da" = Dynamic Ads, "marketplace" = Facebook Marketplace, "ig_shopping" = Instagram Shopping, "whatsapp" = WhatsApp catalog.
6. Do NOT overstate severity: not all MUST_FIX issues block all ads. Some only affect specific surfaces (e.g., mini_shops). Report the scope accurately based on affected_channels.
7. Note that affected item counts may overlap across issues — a single product can have multiple issues. Do NOT sum counts to estimate total affected products.
8. To see which specific products are affected by an issue, you can try \`ads_catalog_search_product\` with its \`error_type\` parameter. Not every diagnostic type is filterable, so treat this as best-effort: if the filter returns no products, fall back to reporting the issue and its affected-item count rather than claiming there are none.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of diagnostics to return (default: 20, max: 100).`,
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: `Filter diagnostics by severity (case-sensitive): must_fix, opportunity, or should_fix. If omitted, returns all.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_dynamic_ads_health',
    description: `Run Dynamic Ads (DA) integration health checks for either a product catalog OR a single product set. Each check returns pass/fail.

## Scope (catalog vs product set):
- Provide \`catalog_id\` to run catalog-level checks: pixel/event source setup, match rate, eligible product count, and common DA configuration issues.
- Provide \`product_set_id\` to run product-set-level checks: these are creative-quality checks (e.g. slideshow/video quality) for the set, NOT the catalog-wide DA-setup family above. The owning catalog is resolved automatically — you do not need to pass catalog_id as well.
- At least one of \`catalog_id\` / \`product_set_id\` is required. If both are given, \`product_set_id\` takes precedence and \`catalog_id\` is ignored.
- The response echoes \`scope\` ("catalog" or "product_set") so you can confirm which checks ran.

This tool is different from ads_catalog_get_diagnostics: that tool reports item-level product data quality issues (missing images, feed errors, policy violations with affected-product counts). This tool checks DA / creative-quality health rather than per-item data quality.

## When to use:
- When the user asks about Dynamic Ads setup health or readiness for a catalog (pass catalog_id).
- When the user reports that their Dynamic Ads are not delivering or have poor performance.
- When the user asks about pixel setup, event source configuration, or match rate issues.
- When the user wants to check the creative quality of a specific product set for Dynamic Ads (pass product_set_id).
- When the user asks "why are my Dynamic Ads not working?" or "is my catalog set up for DA?"

## When NOT to use:
- Do NOT use for item-level catalog diagnostics (feed errors, policy violations, broken images, affected product counts) — use ads_catalog_get_diagnostics instead.
- Do NOT use for individual product details — use ads_catalog_get_product_details instead.
- Do NOT use for feed rules or feed transformations — use ads_catalog_get_feed_rules instead.
- Do NOT use for product set membership — use ads_catalog_get_product_set_products instead.

## Response Guidelines:
1. Prioritize failed checks — these indicate issues blocking or degrading DA performance.
2. For each failed check, explain what the issue means and suggest corrective actions.
3. Group related checks if multiple exist (e.g. multiple pixel-related failures).
4. The severity field indicates urgency: MUST_FIX issues should be addressed first.
5. If all checks pass, confirm that the catalog or product set is healthy.
6. Use the action_uri when available to point the user to the relevant Commerce Manager page.
7. If the user also has item-level product issues, suggest running ads_catalog_get_diagnostics separately.`,
    params: [
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'catalog_id',
        type: 'string',
        required: false,
        description: `The product catalog ID (numeric string). Required unless product_set_id is provided.`,
      },
      {
        name: 'checks',
        type: 'array',
        required: false,
        description: `Filter to specific check keys. If omitted, all checks for the scope are run. Catalog example keys: catalog_has_feed_upload_errors, pixel_has_low_event_source_match_rate. Product set example keys: product_set_has_low_quality_for_slideshow, product_set_has_low_quality_with_video.`,
      },
      {
        name: 'product_set_id',
        type: 'string',
        required: false,
        description: `The product set ID (numeric string). Required unless catalog_id is provided. Takes precedence over catalog_id when both are supplied (catalog_id is ignored in that case). The owning catalog is resolved automatically from the product set.`,
      },
      {
        name: 'with_issue_only',
        type: 'boolean',
        required: false,
        description: `When true (default), only return checks that have issues (failed). When false, return all checks including passed ones.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_feed_rules',
    description: `Gets the data transformation rules applied to a product data feed during ingestion, with cursor-based pagination.

Feed rules (also called "data feed rules", "feed transformation rules", or "supplementary data rules") control how product data from a feed file is modified, remapped, or enriched before it is stored in the catalog. Advertisers create these rules in Commerce Manager under Data Sources > Feed > Rules to fix data quality issues or adapt their feed format to Meta's required product fields.

## Rule Types:
- **mapping_rule** — Renames or maps a column from the feed file to a Meta product field. For example, mapping a column named "product_name" to the standard "title" field. Use this when the user asks about column mappings, field mappings, renaming columns, or mapping feed columns.
- **value_mapping_rule** — Transforms specific values in a field to different values. For example, changing "yes"/"no" availability values to "in stock"/"out of stock". Use this when the user asks about value mappings, value transformations, or how values are being changed.
- **letter_case_rule** — Changes the letter case (capitalization) of a field's values. For example, converting product titles to title case or descriptions to lowercase. Use this when the user asks about capitalization, letter case, or case transformations.
- **fallback_rule** — Sets a default value for a product field when the feed does not provide one. For example, setting a default availability of "in stock" for products missing that field. Use this when the user asks about default values, fallback values, or missing field defaults.
- **regex_replace_rule** — Applies a regular expression find-and-replace on a field's values. For example, stripping HTML tags from descriptions or reformatting price strings. Use this when the user asks about regex rules, pattern replacements, or text find-and-replace transformations.

## When to use:
- Call this tool when the user asks about feed rules, feed transformations, data transformation rules, or how their feed data is being modified — including questions about column/field mappings, value mappings, letter case, default/fallback values, or regex replacements (each maps to a rule type in the Rule Types section above).
- Use when the user asks "what rules are on my feed?", "how is my feed data being modified?", "why is my product data being changed during upload?", or "what transformations are applied to my feed?"
- Use when the user mentions "supplementary data rules" or "feed data manipulation."
- Use when debugging why product data in the catalog looks different from the original feed file.

## When NOT to use:
- Do NOT call this tool for feed upload status, upload errors, schedule, or ingestion progress — use ads_catalog_get_product_feed_details instead.
- Do NOT call this tool for fetching products or product sets — use ads_catalog_search_product or ads_catalog_get_product_sets instead.
- Do NOT call this tool for catalog-level details — use ads_catalog_get_details instead.
- Do NOT call this tool for catalog diagnostics or quality issues — use ads_catalog_get_diagnostics instead.

## Response Guidelines:
1. Present the list of rules including their ID, attribute (the product field being transformed), rule type, and parameters.
2. Explain each rule in plain language based on its rule type (see Rule Types above) and its parameters — e.g. which column maps to which Meta field, which values are converted, or what pattern is replaced.
3. If the feed is not found, inform the user that the feed ID may be invalid.
4. If page_info.has_next_page is true (and page_info.after_cursor is present), inform the user that more rules are available.`,
    params: [
      {
        name: 'feed_id',
        type: 'string',
        required: true,
        description: `The ID of the product feed to list rules from.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page. Set this to the EXACT value of \`page_info.after_cursor\` from the previous response — copy the raw string as-is. Do NOT invent a cursor or use placeholder text. Omit entirely to start from page 1.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rules to return (default: 20, max: 100).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_details',
    description: `Fetches a product item from the catalog by its Meta-assigned product item ID (FBID).

## Identifier types — read carefully before calling:
- \`product_id\` (this tool's input): Meta's internal canonical ID for a product item. **Numeric string only**, typically 15-19 digits, e.g., "26322317764065686". Globally unique across Meta. Assigned by Meta when the product is created/ingested.
- \`retailer_id\` (NOT accepted by this tool): The merchant-supplied SKU. **Alphanumeric**, may contain letters, digits, dashes, underscores — e.g., "ABC-001", "100MCaf198", "SKU-WIDGET-BLUE-L". Unique only within a single catalog. To look up a product by \`retailer_id\`, use \`ads_catalog_search_product\` with its JSON filter argument (e.g., {"retailer_id":{"eq":"ABC-001"}}).

## When to use:
- The user provides a purely numeric ID (e.g., "26322317764065686") and asks for details about that product item.
- You already obtained a numeric \`product_id\` from a prior tool call (e.g., from \`ads_catalog_search_product\`) and need to fetch its full details.

## When NOT to use:
- Do NOT call this tool when the user provides an alphanumeric identifier (anything containing letters, dashes, or that does not look like a long numeric FBID) — that is a \`retailer_id\`/SKU. Use \`ads_catalog_search_product\` with its JSON filter (e.g., {"retailer_id":{"eq":"ABC-001"}}) instead.
- Do NOT call this tool for listing or searching multiple products — use \`ads_catalog_search_product\`.
- Do NOT call this tool if you do not have a specific numeric product item ID.

## Response Guidelines:
1. Present the product item details including ID, catalog ID, retailer ID, name, description, URL, price, availability, and image URL. When \`product_group_id\` (or \`retailer_product_group_id\`) is non-null, the item is a variant — present the product group ID so the user can see how variants are grouped.
2. If the user previously specified a catalog, verify the response's \`catalog_id\` matches before presenting the product — a mismatch means the \`product_item_id\` belongs to a different catalog and you should call this out instead of treating the result as authoritative for the user's catalog.
3. If the call fails because the input was not a positive numeric string, the user likely supplied a retailer ID (SKU). Retry with \`ads_catalog_search_product\` using its JSON filter (e.g., {"retailer_id":{"eq":"<original value>"}}).
4. If the product item is not found despite a valid numeric ID, inform the user that the ID may be invalid or no longer exists in the catalog.`,
    params: [
      {
        name: 'product_id',
        type: 'string',
        required: true,
        description: `Meta-assigned product item ID (FBID). Must be a positive numeric string only (e.g., "26322317764065686"). This is NOT the merchant's retailer_id/SKU — alphanumeric values like "ABC-001" or "100MCaf198" are retailer IDs and must be looked up via ads_catalog_search_product with its JSON filter (e.g., {"retailer_id":{"eq":"ABC-001"}}) instead.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_feed_details',
    description: `Fetches details about a product feed, including its name, schedule configuration, product count, and upload session status.

## When to use:
- Call this tool when the user asks about a product feed's configuration, schedule, or status.
- Use when the user wants to know how a feed is set up (e.g., upload frequency, source URL, timezone).
- Use when the user asks about feed ingestion source type (primary vs supplementary feed).
- Use when the user asks which feeds supplement a given feed.
- Use when the user asks about feed upload status, upload errors, or upload progress.
- Use when the user asks "is my feed upload still running?" or "did my last upload succeed?"

## When NOT to use:
- Do NOT call this tool for feed rules, feed transformations, column mappings, value mappings, letter case changes, default/fallback values, or regex replacements — use ads_catalog_get_feed_rules instead. This tool only covers feed metadata and upload status, NOT data transformation rules.
- Do NOT call this tool to list a catalog's feeds or for a catalog-level overview — it needs a known feed_id and returns a single feed. Use ads_catalog_get_details (with feed_limit) or ads_catalog_get_data_sources instead.
- Do NOT call this tool for individual product details (use ads_catalog_search_product instead).
- Do NOT call this tool for catalog diagnostics or errors (use ads_catalog_get_diagnostics instead).

## Input Requirements:
- **feed_id** must be a numeric string (e.g., "123456789")
- User must have access to the feed's catalog

## Response Guidelines:
1. Present the feed details in a clear, structured format.
2. Clearly indicate if the feed has a schedule and what the upload frequency is.
3. If schedule is null, explain that the feed does not have an automatic upload schedule.
4. Distinguish between the replace schedule (full upload) and update schedule (incremental update) if both exist.
5. For upload sessions, highlight the result status (succeeded, failed, in_progress, etc.).
6. If there are errors or warnings in the upload, call them out prominently.
7. If an upload is in progress, indicate this clearly and show current progress counts.

## Response Fields:
The JSON response includes:
- **feed_id**, **name**, **created_time** — feed identification
- **product_count** — number of items in this feed
- **ingestion_source_type** — "primary_feed" or "supplementary_feed"
- **override_type** — localization/override applied on top of a base feed (country, language, language_and_country, version, local), or null for a regular (non-override) feed
- **override_value** — the market/locale the override targets (e.g. "US" for a country feed, "fr_XX" for a language feed), or null when this is not an override feed
- **deletion_enabled** — whether missing items are deleted on upload
- **schedules** — array of upload schedules; each entry has type ("replace" for full upload or "update" for incremental update), interval, interval_count, hour, minute, day_of_week, timezone, url
- **latest_upload** — most recent upload session: feed_upload_session_id, result, is_in_progress, item counts (detected, persisted, invalid, deleted), error_count, warning_count
- **supplementary_feeds** — feeds that supplement this feed (each {feed_id, name, override_type, override_value}); populated only when this is a primary feed, empty otherwise
- **primary_feeds** — primary feeds this feed is attached to (each {feed_id, name, override_type, override_value}); populated only when this is a supplementary feed, empty otherwise`,
    params: [
      {
        name: 'feed_id',
        type: 'string',
        required: true,
        description: `The product feed ID (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_feed_upload_sessions',
    description: `List recent upload sessions for a product feed, most recent first. Each session reports its outcome (status), timing (start/end), item counts (detected / persisted / invalid / deleted), and error/warning counts. Use this to debug feed ingestion — explain why products are missing or stale, when the last successful pull happened, or whether the most recent run failed.

## When to use:
- The user asks why products from a feed are missing, stale, or were removed.
- The user wants to know when the feed last pulled successfully, or whether the latest run succeeded, partially uploaded, or failed.
- The user is debugging ingestion and wants the history of recent upload runs with their item counts and error/warning counts.

## When NOT to use:
- The user wants to trigger a new refresh / re-pull of the feed — use \`ads_catalog_create_product_feed_upload_session\` instead.
- The user wants the feed's configuration (schedule, URL, source type) — use \`ads_catalog_get_product_feed_details\` instead.
- The user wants to inspect products directly — use \`ads_catalog_search_product\`.

## Input Requirements:
- \`product_feed_id\` (required): The ID of the product feed.
- \`limit\` (optional): Maximum number of sessions to return.
- \`cursor\` (optional): Pagination cursor from a previous response.

## Output Format:
JSON with:
- \`product_feed_id\` — echo of the input feed ID.
- \`sessions\` — list of upload sessions (most recent first) with status, timing, item counts, and error/warning counts.
- \`total_sessions\` — total number of upload sessions that exist for the feed, across all pages.
- \`has_more_sessions\` — whether more sessions exist beyond this page.
- \`next_session_cursor\` — cursor to fetch the next page, or null.

## Errors:
- If the feed does not exist or the viewer cannot see it, the tool returns a \`feed_not_found\` error.
- A malformed (non-numeric) \`product_feed_id\` is rejected as an \`Invalid Params\` error before execution.`,
    params: [
      {
        name: 'product_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the product feed whose upload sessions to list.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of upload sessions. Set this to the EXACT value of next_session_cursor from the previous response. Omit to start from the most recent session.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of upload sessions to return, most recent first. Defaults to 20, capped at 100.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_product_sets',
    description: `List the product sets that contain a given product item, with cursor-based pagination. Useful for understanding which sets (and downstream Advantage+ / DPA campaigns) a specific product appears in.

When to use:
- To find which product sets include a specific product item
- To understand which campaigns might be affected by changes to a product
- To debug why a product appears or doesn't appear in certain product sets
- Use the page_info.after_cursor from the response to retrieve subsequent pages

When NOT to use:
- To list all product sets in a catalog (use ads_catalog_get_product_sets)
- To get details about a specific product set (use ads_catalog_get_product_set_details)
- To list products within a product set (use ads_catalog_get_product_set_products)`,
    params: [
      {
        name: 'product_id',
        type: 'string',
        required: true,
        description: `The ID of the product item to look up. Returns all product sets that contain this product.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page. Set this to the EXACT value of \`page_info.after_cursor\` from the previous response — copy the raw string as-is. Do NOT invent a cursor or use placeholder text. Omit entirely to start from page 1.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of product sets to return (default: 20).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional. Case-insensitive substring match on product set name.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_set_details',
    description: `Fetch details for a single product set by its ID, including name, filter rule, product count, type, visibility, and creation time.

The product_set_id must be obtained from a prior ads_catalog_get_product_sets or ads_catalog_create_product_set call — do not guess or fabricate IDs.

When to use:
- To inspect a specific product set's configuration and metadata
- To check the filter rule that defines which products belong to a set
- To verify product count, visibility, or type for a known product set ID
- After using ads_catalog_get_product_product_sets to drill into a specific set

When NOT to use:
- To list all product sets in a catalog (use ads_catalog_get_product_sets)
- To list products within a product set (use ads_catalog_get_product_set_products)
- To find which product sets a product belongs to (use ads_catalog_get_product_product_sets)`,
    params: [
      {
        name: 'product_set_id',
        type: 'string',
        required: true,
        description: `The ID of the product set to fetch details for. Must be obtained from a prior ads_catalog_get_product_sets or ads_catalog_create_product_set call — do not guess or fabricate IDs.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_set_products',
    description: `Gets the products/items in a product set with cursor-based pagination and optional filters.

## When to use:
- Call this tool when the user asks to see the products within a specific product set.
- Use when the user provides a product set ID and wants to list or browse the items in it.
- Use the page_info.after_cursor from the response to retrieve subsequent pages.
- Use the filter parameters (availability, retailer_id, brand, category, condition, product_type, price_min, price_max) to narrow the results within the product set. Filters are AND'd with the product set's defining rule.

## When NOT to use:
- Do NOT call this tool for fetching details about a single product item (use ads_catalog_get_product_details instead).
- Do NOT call this tool for listing product sets in a catalog (use ads_catalog_get_product_sets instead).
- Do NOT call this tool if the user does not have a product set ID.
- Do NOT call this tool to delete products from a product set — it only lists products. To change which products belong to a set, update the product set filter rule with ads_catalog_update_product_set.

## Response Guidelines:
1. Present the list of products using the fields returned in the response.
2. If a product includes \`catalog_id\`, verify it matches the catalog the user asked about before presenting results.
3. If the product set is not found, inform the user that the product set ID may be invalid.
4. If page_info.after_cursor is present, inform the user that more products are available.`,
    params: [
      {
        name: 'product_set_id',
        type: 'string',
        required: true,
        description: `The ID of the product set to list products from.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'availability',
        type: 'string',
        required: false,
        description: `Filter by availability status: in stock, out of stock, preorder, available for order, discontinued, pending, , mark_as_sold, mark_as_expired.`,
      },
      { name: 'brand', type: 'string', required: false, description: `Filter by brand name.` },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter by product category.`,
      },
      {
        name: 'condition',
        type: 'string',
        required: false,
        description: `Filter by condition: new, refurbished, used.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page. Set this to the EXACT value of \`page_info.after_cursor\` from the previous response — copy the raw string as-is. Do NOT invent a cursor or use placeholder text. Omit entirely to start from page 1.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Optional top-level product fields to return. Omit or pass an empty array for the default fields: product_id, retailer_id, name, availability, price. If provided, only product_id plus the requested fields are returned. Supported values: product_id, catalog_id, retailer_id, product_group_id, retailer_product_group_id, name, description, url, price, sale_price, brand, category, color, condition, gender, material, pattern, size, availability, image_url, image_fetch_status, videos_fetch_status, visibility.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of products to return (default: 20, max: 100).`,
      },
      {
        name: 'price_max',
        type: 'string',
        required: false,
        description: `Filter by maximum price.`,
      },
      {
        name: 'price_min',
        type: 'string',
        required: false,
        description: `Filter by minimum price.`,
      },
      {
        name: 'product_type',
        type: 'string',
        required: false,
        description: `Filter by product type.`,
      },
      {
        name: 'retailer_id',
        type: 'string',
        required: false,
        description: `Filter by exact retailer ID (SKU) match. The retailer ID is the merchant-assigned alphanumeric identifier (e.g., "ABC-001", "100MCaf198", "SKU-WIDGET-BLUE-L") — not Meta's numeric product item ID. Match is case-sensitive. Use this filter when the user provides any non-numeric product identifier.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_get_product_sets',
    description: `Gets a list of product sets in a catalog with cursor-based pagination.

## When to use:
- Call this tool when the user asks to see the product sets within a catalog.
- Use when the user provides a catalog ID and wants to list or browse product sets.
- Use the page_info.after_cursor from the response to retrieve subsequent pages.

## When NOT to use:
- Do NOT call this tool to count product sets (e.g., "how many product sets do I have") — use \`ads_catalog_get_details\` which returns \`product_set_count\` directly without enumerating the sets.
- Do NOT call this tool for fetching details about a specific product item.
- Do NOT call this tool if the user does not have a catalog ID.

## Response Guidelines:
1. Present the list of product sets including their ID, name, product count, retailer ID, filter rule, type, visibility, and creation time.
2. If the catalog is not found, inform the user that the catalog ID may be invalid.
3. If page_info.has_next_page is true, inform the user that more product sets are available.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The ID of the catalog to list product sets from.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page. Set this to the EXACT value of \`page_info.after_cursor\` from the previous response — copy the raw string as-is. Do NOT invent a cursor or use placeholder text. Omit entirely to start from page 1.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of product sets to return (default: 20, max: 100).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional. Case-insensitive substring match on product set name. Combined with other filters via AND.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_product_create',
    description: `Create a single catalog item. The item's vertical is determined by the target catalog: a commerce/products catalog gets a product item, a hotels catalog gets a hotel item, and so on.

When to use:
- A merchant wants to add one item to an existing catalog by supplying its details.
- You already know the catalog ID (from ads_catalog_get_catalogs or ads_catalog_get_details).

When NOT to use:
- To bulk-create a catalog and many items at once — use ads_catalog_create.
- To change an existing item — use ads_catalog_update_product (match on retailer_id).
- To create a product set (a saved filter) — use ads_catalog_create_product_set.

Input Requirements:
- catalog_id (required): the owning catalog. Its vertical decides what kind of item is created.
- retailer_id (required): the merchant-unique SKU/content ID for the item. If an item with this retailer_id already exists it will be updated.
- name (required): the item's title/name.
- Other common product fields (description, url, image_url, price, sale_price, currency, availability, condition, brand, visibility) are optional but recommended for product/commerce catalogs; pair price with currency.
- properties (optional): a key->string map for any field not exposed as a dedicated key above — advanced/checkout product fields (e.g. checkout_url, quantity_to_sell_on_facebook, gtin, google_product_category, shipping, custom_label_0) and, for non-commerce catalogs, that vertical's fields. Keys use canonical feed field names. Do not duplicate a field already supplied via a dedicated key.

Notes:
- Returns the retailer_id and catalog_id; use ads_catalog_search_product to look up the resulting item ID.
- For product (commerce) catalogs, mirrors the Graph API endpoint POST /{catalog_id}/products (single-product create).`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The ID of the catalog to add the product to (numeric string).`,
      },
      { name: 'name', type: 'string', required: true, description: `The item title/name.` },
      {
        name: 'retailer_id',
        type: 'string',
        required: true,
        description: `The merchant-defined unique ID (SKU / content ID) for the new product.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'availability',
        type: 'string',
        required: false,
        description: `Stock availability (e.g. "in stock", "out of stock", "preorder").`,
      },
      { name: 'brand', type: 'string', required: false, description: `The product brand.` },
      {
        name: 'condition',
        type: 'string',
        required: false,
        description: `Product condition (e.g. "new", "refurbished", "used").`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `The ISO currency code for price/sale_price (e.g. "USD").`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The product description.`,
      },
      { name: 'image_url', type: 'string', required: false, description: `The product image URL.` },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: `The product price amount (e.g. "9.99"). Pair with currency.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Additional item fields as a key->string map, using canonical feed field names (e.g. checkout_url, quantity_to_sell_on_facebook, gtin, google_product_category, shipping, custom_label_0, size, color). Use this for advanced/checkout fields not exposed as dedicated keys above, and for the vertical-specific fields when the target catalog is not a commerce/products catalog. Do NOT duplicate a field already provided via a dedicated key.`,
      },
      {
        name: 'sale_price',
        type: 'string',
        required: false,
        description: `The product sale price amount (e.g. "7.99").`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The product landing-page URL.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Product visibility ("published" to show, "staging" to hide).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_product_feed_delete',
    description: `Delete a product feed (data source) from a catalog. The feed and its schedule are removed, and the products it ingested are deleted from the catalog as well (items also supplied by another data source are kept). Product removal happens asynchronously.

When to use:
- A merchant wants to remove a feed data source and the products it brought into the catalog.
- You already know the feed ID (from ads_catalog_get_data_sources or ads_catalog_get_product_feed_details).

When NOT to use:
- To stop/pause/turn off a feed's automatic refreshing without removing the feed — this is NOT a deletion. Use ads_catalog_update_product_feed with clear_replace_schedule (and/or clear_update_schedule) to stop the schedule; the feed and its products are kept.
- To delete a single product rather than the whole feed — use ads_catalog_delete_product.
- To delete an entire catalog — needs to be done from Commerce Manager.

Notes:
- This action cannot be undone through the API. Treat it as permanent.
- Product removal is asynchronous, so catalog item counts may take a little while to update.`,
    params: [
      {
        name: 'product_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the product feed (data source) to delete (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_product_feed_delete_rule',
    description: `Permanently delete a transformation rule from a product feed. This action is irreversible — the rule is removed and no longer applied to future feed ingestions. The feed and its products are not affected; only the transformation rule is removed.

When to use:
- To remove a feed rule that is no longer needed
- To clean up a feed rule created in error or with the wrong configuration (attribute and rule_type are immutable, so a misconfigured rule must be deleted and recreated)

When NOT to use:
- To change a rule's parameters — update the rule instead (its params can be modified without deleting it)
- To inspect existing rules on a feed (use ads_catalog_get_feed_rules)
- To delete a product set, product, feed, or entire catalog — use the dedicated tools.

Notes:
- Only the transformation rule is deleted; feed data and products are left unchanged.`,
    params: [
      {
        name: 'feed_rule_id',
        type: 'string',
        required: true,
        description: `The ID of the feed rule to delete.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_product_set_delete',
    description: `Permanently delete a product set from a catalog. This action is irreversible — the product set and its filter rule are removed. Products themselves are not deleted; only the set that groups them.

When to use:
- To remove a product set that is no longer needed
- To clean up product sets created in error

When NOT to use:
- To change which products a dynamic set contains — adjust its filter rule (use ads_catalog_update_product_set)
- To rename a product set (use ads_catalog_update_product_set)
- To delete one or more products or entire catalog — use the dedicated tools.

Notes:
- Only leaf product sets can be deleted. A set that has child sets cannot be deleted until its child sets are removed first.
- A product set that is in use by an active usage (e.g. a live ad) cannot be deleted until that usage is deactivated or detached. This tool does not modify ads or other usages.`,
    params: [
      {
        name: 'product_set_id',
        type: 'string',
        required: true,
        description: `The ID of the product set to delete.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_search_product',
    description: `Searches or lists products in a catalog using a structured filter rule (see **Filter spec** below) and returns sample matching products plus the **total** number of products that match. Use this for all catalog product listing, searching, and filtering — including lookups by retailer_id/SKU, availability, brand, category, price range, and custom labels — and BEFORE creating a product set with \`ads_catalog_create_product_set\` to preview which products the candidate filter resolves to.

## Identifier types — read carefully before calling:
- \`retailer_id\`: The merchant-supplied SKU. **Alphanumeric**, may contain letters, digits, dashes, underscores — e.g., "ABC-001", "100MCaf198", "SKU-WIDGET-BLUE-L". Unique within a single catalog. Use \`{"retailer_id":{"eq":"ABC-001"}}\`. **If the user supplies any non-numeric identifier (contains letters, dashes, etc.), treat it as a \`retailer_id\`.**
- Meta's numeric \`product_id\` (FBID, e.g., "26322317764065686") is returned in the response as the \`product_id\` field. To fetch a product by its numeric FBID directly, use \`ads_catalog_get_product_details\` instead.

## When to use:
- The user wants to list, browse, or search products in their catalog (with or without filters).
- The user wants to know how many products match a candidate filter before creating a product set ("how many in-stock Acme items are there?").
- The user wants to see sample products matching a filter to sanity-check the filter is correct.
- The user wants to list (or count) the products ingested by a specific feed / data source ("show me products from my main feed", "which items did feed 1234567890 add?", "how many products came from this data feed?") — filter by \`product_feed_id\` and read \`page_info.total_count\` for the count.
- Looking up a specific product by retailer_id/SKU. As a fallback when \`ads_catalog_get_product_details\` rejects an input as not a positive numeric string — the input was likely a retailer_id; retry here.
- Debugging product-level issues (missing fields, incorrect prices, availability, broken images via \`image_fetch_status\`).

## When NOT to use:
- Fetching a specific product by Meta numeric FBID — use \`ads_catalog_get_product_details\`. This applies to ANY purely-numeric identifier the user provides as a "product ID" or "product item ID", regardless of length (FBIDs may appear short like "12345" or long like "26322317764065686").
- Fetching products in an existing product set — use \`ads_catalog_get_product_set_products\`.
- Catalog diagnostics — use \`ads_catalog_get_diagnostics\`.
- Catalog overview — use \`ads_catalog_get_details\`.
- There is no query text-search parameter — use the structured filter rule instead (e.g. \`{"name":{"contains":"red dress"}}\`).

## Input:
- \`catalog_id\` (required): the product catalog ID.
- \`filter\` (required): a JSON-encoded rule that matches products by their attributes. See the **Filter spec** section below for the full operator catalog and examples.
- \`limit\` (optional, default 20, max 100): number of sample products to return.
- \`cursor\` (optional): pagination cursor from the previous response.
- \`fields\` (optional): product fields to return. Omit or pass [] for default fields; explicit values return \`product_id\` plus requested fields.
- \`error_type\` (optional): a catalog diagnostic error type (e.g. \`PRODUCT_NOT_APPROVED\`) to return only products currently affected by that error. This is a SEPARATE parameter — do NOT place \`error_type\` inside the \`filter\` JSON. When both \`filter\` and \`error_type\` are supplied, they are combined with AND.

## Filter spec:
**Shape:**
- Leaf rule: \`{<field>: {<op>: <value>}}\`
- Compound rule: \`{<combinator>: [<rule>, ...]}\`

**Logical combinators:**
- \`and\` — match ALL of the nested rules. Example: \`{"and":[{"availability":{"eq":"in stock"}},{"brand":{"eq":"Acme"}}]}\` returns items that are in stock AND Acme-branded.
- \`or\` — match ANY of the nested rules. Example: \`{"or":[{"category":{"contains":"shoe"}},{"category":{"contains":"sneaker"}}]}\` returns items whose category contains either "shoe" or "sneaker".
- \`not\` — invert a single rule. Example: \`{"not":{"brand":{"eq":"Acme"}}}\` returns items whose brand is NOT exactly "Acme". Wraps one rule, not an array.

**Comparison operators:**
- \`eq\` — exact match. Example: \`{"brand":{"eq":"Instagram"}}\` matches only items with brand exactly "Instagram".
- \`neq\` — does NOT exactly match. Example: \`{"brand":{"neq":"Instagram"}}\` matches items whose brand is anything other than "Instagram".
- \`lt\`, \`lte\` — numeric less-than (strict / inclusive). Example: \`{"priority":{"lt":3}}\` matches items with priority < 3.
- \`gt\`, \`gte\` — numeric greater-than (strict / inclusive). Example: \`{"priority":{"gte":3}}\` matches items with priority >= 3.

**String operators:**
- \`contains\` — substring match. Example: \`{"category":{"contains":"running shoe"}}\` matches items whose category contains the substring, e.g. "red running shoe", "blue running shoe", "running shoe for kids".
- \`not_contains\` — substring excludes. Example: \`{"category":{"not_contains":"running shoe"}}\` matches items whose category does NOT contain the substring, e.g. "red walking shoe", "sandals", "boots".
- \`starts_with\` — prefix match. Example: \`{"category":{"starts_with":"small"}}\` matches "small sandals", "small t-shirt", etc. **Note:** only valid for the product category field; for other fields use \`contains\`.

**Set operators:** (right-hand side is an array)
- \`is_any\` — match if value is any one of the listed. Example: \`{"color":{"is_any":["black","blue","brown"]}}\` matches items in any of those colors.
- \`is_not_any\` — match if value is none of the listed. Example: \`{"color":{"is_not_any":["black","blue","brown"]}}\` matches items NOT in any of those colors (e.g. "red", "yellow", "green").

**Supported fields (commerce vertical only):**

- \`age_group\` — string enum, one of: \`adult\`, \`infant\`, \`kids\`, \`newborn\`, \`toddler\`. Use \`eq\` / \`is_any\`.
- \`availability\` — string enum, one of: \`available for order\`, \`in stock\`, \`preorder\`, \`out of stock\`. Use \`eq\` / \`neq\` / \`is_any\` / \`is_not_any\`.
- \`brand\` — string. Brand name from the feed. String operators apply.
- \`category\` — string. Free-form merchant category from the feed (e.g. \`"running shoe"\`). String operators apply (including \`starts_with\`).
- \`color\` — string. String operators apply.
- \`condition\` — string enum, one of: \`new\`, \`refurbished\`, \`used\`. Use \`eq\` / \`neq\` / \`is_any\` / \`is_not_any\`.
- \`currency\` — string ISO-4217 currency code (e.g. \`"USD"\`, \`"GBP"\`). Use \`eq\` / \`is_any\`.
- \`custom_label_0\`, \`custom_label_1\`, \`custom_label_2\`, \`custom_label_3\`, \`custom_label_4\` — string. Free-form merchant labels from the feed. String operators apply.
- \`gender\` — string enum, one of: \`female\`, \`male\`, \`unisex\`. Use \`eq\` / \`is_any\`.
- \`images_fetch_status\` — string. Fetch status of the product's images. Common values: \`fetched\`, \`direct_upload\`, \`fetch_failed\`, \`outdated\`, \`partial_fetch\`, \`not_fetched\`. Use \`eq\` / \`is_any\` (e.g. find products with broken images: \`{"images_fetch_status":{"eq":"fetch_failed"}}\`). Note: the filter field is plural \`images_fetch_status\`, even though the returned response field is singular \`image_fetch_status\`.
- \`material\` — string. String operators apply.
- \`name\` — string. Product name/title from the feed. String operators apply.
- \`pattern\` — string (e.g. \`"striped"\`, \`"polka dot"\`). String operators apply.
- \`price_amount\` — integer; the price multiplied by 100, for all currencies (e.g. \`$4.90 USD\` → \`490\`, \`¥490 JPY\` → \`49000\`). Use numeric operators (\`eq\`, \`lt\`, \`lte\`, \`gt\`, \`gte\`). Note: the field is \`price_amount\`, not \`price\`.
- \`product_expiration_time\` — date/time when the product is no longer available.
- \`product_feed_id\` — integer. The ID for the product feed. Use \`eq\` / \`is_any\`.
- \`product_group_id\` — integer. ID grouping product variants (e.g. all sizes/colors of one shirt share a \`product_group_id\`). Use \`eq\` / \`is_any\`.
- \`product_item_id\` — integer. Meta-assigned numeric product item ID. Use \`eq\` / \`is_any\` for exact lookup.
- \`product_type\` — string. Merchant-defined taxonomy (e.g. \`"Apparel & Accessories > Shoes"\`). String operators apply.
- \`region_id\` — integer. The region ID for the location for a product item. Use \`eq\` / \`is_any\`.
- \`retailer_id\` — string. The merchant-provided unique identifier (SKU). Use \`eq\`, \`is_any\`, etc. for exact matches.
- \`retailer_product_group_id\` — string. The merchant-provided identifier for the product group the item belongs to (the retailer's item group ID). Use \`eq\`, \`is_any\`, etc. for exact matches.
- \`sale_price_amount\` — integer; same format as \`price_amount\` (price × 100). Numeric operators apply. Note: the field is \`sale_price_amount\`, not \`sale_price\`.
- \`size\` — string. String operators apply.
- \`tags\` — string. Tags for product organization. String operators apply.
- \`videos_fetch_status\` — string. The fetch status of associated videos. Use \`eq\` / \`is_any\`.
- \`visibility\` — string enum, one of: \`published\`, \`staging\`, \`hidden\`, \`whitelist_only\`. Items in \`staging\` are not visible to buyers and are not available in dynamic ads. Use \`eq\` / \`is_any\`.

**Notes:**
- Only the commerce vertical is supported. Field names not in the list above will be rejected.
- Use \`eq\` (not \`contains\`) for enum-typed fields (\`age_group\`, \`availability\`, \`condition\`, \`gender\`, \`visibility\`).
- Value matching is case-insensitive: \`{"brand":{"eq":"acme"}}\` and \`{"brand":{"eq":"Acme"}}\` return the same items. Do not bother trying multiple casings of the same value to "broaden" matches.
- \`price_amount\` and \`sale_price_amount\` are integers — the price multiplied by 100. \`{"price_amount":{"lt":"5000"}}\` means "less than $50.00", not "less than $5000". Bare \`price\` / \`sale_price\` are not valid filter fields for product items (they apply to other verticals only).

**Common wrong field name aliases:**
- \`title\`, \`product_name\` → use \`name\` (the product title/name field).
- \`price\`, \`sale_price\`, \`current_price\` → use \`price_amount\` / \`sale_price_amount\` (integers, price × 100).
- \`item_group_id\` → use \`product_group_id\`.
- \`product_id\` → use \`product_item_id\` (Meta-assigned numeric ID).
- \`image_fetch_status\` (singular) → use \`images_fetch_status\` (plural).
- \`link\`, \`description\`, \`sku\` → not supported filter fields. Use \`retailer_id\` for SKU lookups.

## Returns:
JSON with:
- \`products\`: array [{product_id, catalog_id, name, price, availability, brand, retailer_id, ...}] — a SAMPLE of matching products. \`product_id\` is Meta's numeric product item FBID. If \`catalog_id\` is returned, it echoes the request \`catalog_id\` so you can confirm the result is scoped to the catalog you asked about. When \`fields\` is provided, products include only \`product_id\` plus requested fields.
- \`page_info\`: object with \`after_cursor\` (string), \`has_next_page\` (bool), and \`total_count\` (int — the total number of products matching the filter, NOT just the count in this page).

## Pagination:
To fetch the next page of samples, call this tool again with the SAME \`catalog_id\` and \`filter\`, and set \`cursor\` to the value of \`page_info.after_cursor\` from the previous response. Only paginate while \`page_info.has_next_page\` is \`true\`.

## Examples:
- "What products are in my catalog?" → filter=\`{}\` (empty filter returns all products).
- "List out-of-stock products" → filter=\`{"availability":{"eq":"out of stock"}}\`.
- "Find product ABC-001" → filter=\`{"retailer_id":{"eq":"ABC-001"}}\`.
- "Fetch description of product item 100MCaf198" → filter=\`{"retailer_id":{"eq":"100MCaf198"}}\` (alphanumeric → SKU, not FBID).
- "How many in-stock items in catalog 123?" → filter=\`{"availability":{"eq":"in stock"}}\`, then read \`page_info.total_count\`.
- "List products ingested by feed 1234567890" → filter=\`{"product_feed_id":{"eq":1234567890}}\` (numeric feed ID; read \`page_info.total_count\` for "how many products did this feed ingest?").
- "Show in-stock products from feed 1234567890" → filter=\`{"and":[{"product_feed_id":{"eq":1234567890}},{"availability":{"eq":"in stock"}}]}\`.
- "Show me 10 sample shoes priced under $50" → filter=\`{"and":[{"category":{"contains":"shoe"}},{"price_amount":{"lt":5000}}]}\`, limit=10.
- "Which products have broken/failed images?" → filter=\`{"images_fetch_status":{"eq":"fetch_failed"}}\`.
- "Which products are not approved?" → filter=\`{}\`, error_type=\`PRODUCT_NOT_APPROVED\` (pass error_type as its own argument, not inside filter).
- "List in-stock products that are not approved" → filter=\`{"availability":{"eq":"in stock"}}\`, error_type=\`PRODUCT_NOT_APPROVED\`.

## Pixel event matching workflow:
When the user asks "how will this pixel event be matched?" or "which products will match this pixel fire?" given a pixel content ID:
1. Call \`ads_catalog_event_source_get_catalogs\` with the pixel (event source) ID to retrieve the catalog IDs connected to that pixel.
2. For each returned \`catalog_id\`, call \`ads_catalog_search_product\` with \`filter={"retailer_id":{"eq":"<content_id>"}}\` — the pixel \`content_id\` maps to \`retailer_id\` in the catalog.
The products found across all connected catalogs are the ones that would be matched when the pixel fires with that content ID.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The product catalog ID.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: true,
        description: `Required. JSON filter rule — pass {} (empty object) to list all products. See the **Filter spec** section in this tool's description for supported operators and fields.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page. Set this to the EXACT value of \`page_info.after_cursor\` from the previous response — copy the raw string as-is. Do NOT invent a cursor or use placeholder text. Omit entirely to start from page 1.`,
      },
      {
        name: 'error_type',
        type: 'string',
        required: false,
        description: `Optional diagnostic error type to filter products by (e.g. \`PRODUCT_NOT_APPROVED\`). Returns only products currently affected by the given diagnostic error. Use the \`type\` value reported by \`ads_catalog_get_diagnostics\`. Note: not every diagnostic type is filterable here — an unfilterable value is rejected with an error rather than silently ignored. This is a separate parameter from \`filter\` — it is NOT a product-set filter field, so do not put \`error_type\` inside the \`filter\` JSON. Combined with \`filter\` using AND when both are provided.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Optional top-level product fields to return. Omit or pass an empty array for the default fields: product_id, retailer_id, name, availability, price. If provided, only product_id plus the requested fields are returned. Supported values: product_id, catalog_id, retailer_id, product_group_id, retailer_product_group_id, name, description, url, price, sale_price, brand, category, color, condition, gender, material, pattern, size, availability, image_url, image_fetch_status, videos_fetch_status, visibility.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of sample products to return (default: 20, max: 100).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_update_catalog',
    description: `Update an existing catalog's settings. At least one field besides catalog_id must be provided.

When to use:
- To rename a catalog

When NOT to use:
- To create a new catalog (use ads_catalog_create)
- To view catalog details without changing anything (use ads_catalog_get_details)
- To delete a catalog — not supported via MCP`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The ID of the catalog to update.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the catalog.` },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_update_product',
    description: `Update one or more fields on an existing product item (catalog product). Only the fields you provide are changed; omitted fields are left untouched.

When to use:
- A merchant wants to correct or change a product's name, description, landing-page URL, image URL, brand, availability, condition, price, sale price, or visibility.
- A merchant wants to hide a product (without permanently deleting it) — set visibility="hidden" (and visibility="published" to make it visible again).
- You already know the product item ID (from ads_catalog_search_product or ads_catalog_get_product_details).

When NOT to use:
- To create a new product (this tool only updates existing items).
- To inspect a product's current values (use ads_catalog_get_product_details).
- To edit product sets, feeds, or the catalog itself (use the dedicated tools).

Notes:
- price and sale_price are decimal amount strings in major currency units (e.g. "19.99"), NOT cents, and require currency (ISO-4217, e.g. "USD") to be set in the same call.
- availability must be one of: "in stock", "out of stock", "preorder", "available for order", "discontinued".
- condition must be one of: "new", "refurbished", "used", "used_like_new", "used_good", "used_fair", "cpo", "open_box_new".
- visibility must be one of: "published", "hidden". A "hidden" item is not visible to buyers and not eligible for dynamic ads — this is the reversible way to hide a product instead of deleting it; set it back to "published" to restore it.
- At least one updatable field must be provided.
- Mirrors the Graph API endpoint POST /{product_item_id}.`,
    params: [
      {
        name: 'product_id',
        type: 'string',
        required: true,
        description: `The ID of the product item to update (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'availability',
        type: 'string',
        required: false,
        description: `New availability status. One of: "in stock", "out of stock", "preorder", "available for order", "discontinued". Omit to leave it unchanged.`,
      },
      {
        name: 'brand',
        type: 'string',
        required: false,
        description: `New brand name. Omit to leave the current brand unchanged.`,
      },
      {
        name: 'condition',
        type: 'string',
        required: false,
        description: `New item condition. One of: "new", "refurbished", "used", "used_like_new", "used_good", "used_fair", "cpo", "open_box_new". Omit to leave it unchanged.`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `ISO-4217 currency code (e.g. "USD", "GBP") for price and sale_price. Required when price or sale_price is provided; ignored otherwise.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New product description. Omit to leave the current description unchanged.`,
      },
      {
        name: 'image_url',
        type: 'string',
        required: false,
        description: `New primary image URL for the product. Omit to leave it unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New product name/title. Omit to leave the current name unchanged.`,
      },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: `New price as a decimal amount in major currency units (e.g. "19.99"), NOT cents. Requires currency to be set in the same call. Omit to leave the price unchanged.`,
      },
      {
        name: 'sale_price',
        type: 'string',
        required: false,
        description: `New sale price as a decimal amount in major currency units (e.g. "14.99"), NOT cents. Requires currency to be set in the same call. Omit to leave the sale price unchanged.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `New product landing-page URL (the link buyers open). Omit to leave it unchanged.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `New visibility status. One of: "published" (visible to buyers and eligible for ads) or "hidden" (not visible to buyers and not eligible for dynamic ads). Set "hidden" to hide a product without deleting it, and "published" to make it visible again. Omit to leave it unchanged.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_update_product_feed',
    description: `Update settings on an existing product feed (a "data source") under a catalog. This is the "edit feed" counterpart to ads_catalog_create_product_feed. Only the fields you provide are changed; omitted fields are left as-is.

When to use:
- The advertiser wants to rename a feed.
- The advertiser wants to change feed parsing/format settings (delimiter, encoding, quoted_fields_mode) or the default currency.
- The advertiser wants to change the recurring fetch schedule or source URL (pass replace_schedule), or the incremental update schedule (pass update_schedule).
- The advertiser wants to stop/pause/turn off a feed's automatic refreshing WITHOUT deleting the feed: set clear_replace_schedule (recurring fetch) and/or clear_update_schedule (incremental update). The feed and its already-ingested products are kept. Do NOT use ads_catalog_product_feed_delete for this — deleting removes the whole feed.

When NOT to use:
- To create a new feed (use ads_catalog_create_product_feed).
- To trigger an immediate refresh / re-pull of the feed now (use ads_catalog_create_product_feed_upload_session).
- To add transformation rules to a feed (use ads_catalog_create_feed_rule).
- To inspect a feed without changing anything (use ads_catalog_get_product_feed_details).

Notes:
- Only the fields you pass change. Passing replace_schedule replaces the feed's recurring fetch schedule; passing update_schedule replaces its incremental update schedule. The two are independent.
- Within a schedule object, "interval" is required but "url" is optional: omit "url" to keep the existing schedule's URL and change only timing. (S)FTP URLs require "username"/"password".
- To stop a schedule entirely, set clear_replace_schedule and/or clear_update_schedule to true instead of passing a schedule object. Clearing a schedule that does not exist is a safe no-op. clear_replace_schedule cannot be combined with replace_schedule (and likewise clear_update_schedule with update_schedule).`,
    params: [
      {
        name: 'product_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the product feed to update (numeric string).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'clear_replace_schedule',
        type: 'boolean',
        required: false,
        description: `Set to true to stop the feed's recurring fetch: clears the REPLACE fetch schedule so the feed no longer refreshes on a timer. The feed and its already-ingested products are kept. Use this (not ads_catalog_product_feed_delete) when the advertiser wants to pause/stop/turn off automatic refreshing. Mutually exclusive with "replace_schedule".`,
      },
      {
        name: 'clear_update_schedule',
        type: 'boolean',
        required: false,
        description: `Set to true to clear the incremental UPDATE schedule so the feed no longer runs incremental updates on a timer, independent of the recurring fetch. The feed and its products are kept. Mutually exclusive with "update_schedule".`,
      },
      {
        name: 'default_currency',
        type: 'string',
        required: false,
        description: `New ISO 4217 currency code used for items in the feed that do not specify their own currency (e.g. "USD", "GBP"). Omit to leave the default currency unchanged.`,
      },
      {
        name: 'delimiter',
        type: 'string',
        required: false,
        description: `Column delimiter used when parsing CSV/TSV feed files. Use "autodetect" to let Meta infer it. Omit to leave the delimiter unchanged.`,
      },
      {
        name: 'encoding',
        type: 'string',
        required: false,
        description: `Character encoding used when parsing the feed file (e.g. "UTF-8"). Use "autodetect" to let Meta infer it. Omit to leave the encoding unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New human-readable name for the product feed (e.g. "Summer 2026 Catalog Feed"). Omit to leave the name unchanged.`,
      },
      {
        name: 'quoted_fields_mode',
        type: 'string',
        required: false,
        description: `Whether feed fields are wrapped in quotes: "on", "off", or "autodetect". Omit to leave this setting unchanged.`,
      },
      {
        name: 'replace_schedule',
        type: 'object',
        required: false,
        description: `New recurring schedule for fully re-fetching the feed from a URL (REPLACE). When provided, it replaces the feed's existing fetch schedule. "interval" is required; omit "url" to keep the current source URL and change only the timing. Omit the whole object to leave the fetch schedule unchanged.`,
      },
      {
        name: 'update_schedule',
        type: 'object',
        required: false,
        description: `New recurring schedule for incrementally updating the feed from a URL (UPDATE), independent of "replace_schedule". Same structure: "interval" is required; omit "url" to keep the current source URL. Omit the whole object to leave the update schedule unchanged.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_catalog_update_product_set',
    description: `Update an existing product set's name, filter rules, visibility, retailer ID, or parent. At least one field besides product_set_id must be provided.

When to use:
- To rename a product set
- To change the filter rule that defines which products belong to a set
- To change a product set's visibility (visible or hidden)
- To update the retailer ID or parent set in a hierarchy

When NOT to use:
- To create a new product set (use ads_catalog_create_product_set)
- To view product set details without changing anything (use ads_catalog_get_product_set_details)
- To delete a product set (use ads_catalog_product_set_delete)
- To add or remove individual products from a set — product membership is controlled by the filter rule`,
    params: [
      {
        name: 'product_set_id',
        type: 'string',
        required: true,
        description: `The ID of the product set to update.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `A JSON-encoded filter rule defining which products belong to this set. Max length 500 KiB. Uses the same filter syntax as ads_catalog_create_product_set.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the product set.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Parent product set ID in the hierarchy, if any.`,
      },
      {
        name: 'retailer_id',
        type: 'string',
        required: false,
        description: `External product set retailer ID.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility of the product set. One of: visible, hidden.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_create_ad',
    description: `Creates a single ad under an existing ad set in PAUSED state.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID. Format: numeric ID without "act_" prefix.`,
      },
      { name: 'ad_name', type: 'string', required: true, description: `Name for the ad.` },
      {
        name: 'ad_set_id',
        type: 'string',
        required: true,
        description: `The ad set ID to create the ad under.`,
      },
      {
        name: 'ad_schedule_end_time',
        type: 'string',
        required: false,
        description: `Optional. Ad schedule end time in ISO 8601 format.`,
      },
      {
        name: 'ad_schedule_start_time',
        type: 'string',
        required: false,
        description: `Optional. Ad schedule start time in ISO 8601 format.`,
      },
      {
        name: 'adlabels',
        type: 'string',
        required: false,
        description: `Optional. JSON array of ad label specs. Example: [{"name":"My Label"}]`,
      },
      {
        name: 'adset_spec',
        type: 'string',
        required: false,
        description: `Optional. JSON string of inline ad set spec for creating both ad and ad set at once.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'bid_amount',
        type: 'integer',
        required: false,
        description: `Optional. Bid amount in cents.`,
      },
      {
        name: 'conversion_domain',
        type: 'string',
        required: false,
        description: `Optional. Domain for aggregated event measurement.`,
      },
      {
        name: 'creative',
        type: 'string',
        required: false,
        description: `JSON string of creative spec. Optional ONLY when source_ad_id is provided to duplicate an existing ad (in draft mode the source ad's creative is copied automatically); otherwise required. When set it MUST include exactly one creative source: (a) creative_id — reuse an existing creative entity; (b) object_story_id — promote an existing post, format "pageID_postID"; (c) object_story_spec — inline creative; the spec MUST contain page_id (use ads_get_pages_for_business to find valid Page IDs) plus one of link_data, video_data, photo_data, or template_data. CRITICAL: page_id is ALWAYS required inside object_story_spec — omitting it causes "Facebook Page is Missing" rejection. FIELD PLACEMENT: For link_data, prefer image_hash (from ads_get_ad_images) over image_url; image_hash references an already-uploaded image and is the canonical field. If you have only an image URL, place it at the creative top level (not inside link_data). For video_data, the platform auto-generates a thumbnail from the first frame when image_hash/image_url is omitted. Minimal example: {"object_story_spec":{"page_id":"<PAGE_ID>","link_data":{"link":"https://example.com","image_hash":"<HASH>","message":"Check this out"}}}`,
      },
      {
        name: 'display_sequence',
        type: 'integer',
        required: false,
        description: `Optional. Display sequence for ordering.`,
      },
      {
        name: 'engagement_audience',
        type: 'boolean',
        required: false,
        description: `Optional. Whether to use engagement audience.`,
      },
      {
        name: 'source_ad_id',
        type: 'string',
        required: false,
        description: `Optional. ID of an existing ad to duplicate. In draft mode the source ad's creative (image, page, post, CTA) is copied into the new draft ad, so you may omit creative when duplicating.`,
      },
      {
        name: 'tracking_specs',
        type: 'string',
        required: false,
        description: `Optional. JSON string of tracking spec for conversion tracking.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_create_ad_set',
    description: `Creates a single ad set under an existing campaign in PAUSED state.

  BEFORE CALLING: The \`ads_create_campaign\` response includes \`valid_optimization_goals\` and \`recommended_optimization_goal\` for the campaign's objective. Use ONLY values from that list for \`optimization_goal\`; an invalid goal is auto-corrected to the recommended default at the server.

  TARGETING — AGE: Advantage+ Audience is enabled by default for new ad sets. With A+A enabled, \`age_min\`/\`age_max\` are treated as audience suggestions, not hard caps — the tool moves them under \`targeting_automation.advantage_audience\` automatically. If you need a hard age cap, set \`targeting_automation.advantage_audience\` = 0 explicitly.

  TARGETING — INTERESTS: Do NOT invent interest IDs. Omit interests and use broad targeting via \`geo_locations\` (recommended); only include interest IDs the user has explicitly provided.

  LEAD ADS: When \`optimization_goal\` is \`LEAD_GENERATION\` or \`QUALITY_LEAD\`, the Page in \`promoted_object.page_id\` must have \`leadgen_tos_accepted=true\` — check the page list returned by \`ads_get_ad_account_pages\`. If the user's page has not accepted ToS, instruct them to do so at https://www.facebook.com/legal/leadgen/tos before creating the ad set.

  MESSAGING DESTINATIONS: When \`destination_type\` is \`WHATSAPP\`, \`MESSENGER\`, or \`INSTAGRAM_DIRECT\`, \`promoted_object.page_id\` is required. If omitted, the tool auto-infers it from the ad account's primary promoted Page.

  PROFILE VISIT ADS: pair \`OUTCOME_TRAFFIC\` with \`optimization_goal=PROFILE_VISIT\` or \`OUTCOME_ENGAGEMENT\` with \`optimization_goal=PROFILE_AND_PAGE_ENGAGEMENT\`. Set \`destination_type\` to \`INSTAGRAM_PROFILE\` or \`FACEBOOK_PAGE\` for single-destination, or \`INSTAGRAM_PROFILE_AND_FACEBOOK_PAGE\` for multi-destination.

  EU / DSA: When \`geo_locations.countries\` includes any EU country, \`dsa_beneficiary\` and \`dsa_payor\` are required for Digital Services Act compliance. If omitted, both are auto-filled from the ad account's business name; provide them explicitly to override.

  BUDGET: Read \`min_daily_budget_cents\` from \`ads_get_ad_accounts\` before setting \`daily_budget\` — budgets below the per-currency minimum are rejected. All budget values are in the smallest unit of the ad account's \`currency\` (e.g., cents for USD).`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID. Format: numeric ID without "act_" prefix.`,
      },
      { name: 'ad_set_name', type: 'string', required: true, description: `Name for the ad set.` },
      {
        name: 'billing_event',
        type: 'string',
        required: true,
        description: `What the advertiser is charged for. Values: IMPRESSIONS, LINK_CLICKS, POST_ENGAGEMENT, VIDEO_VIEWS.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The campaign ID to create the ad set under.`,
      },
      {
        name: 'optimization_goal',
        type: 'string',
        required: true,
        description: `What the ad set is optimized for. Pick the value whose human label matches the user's intent — do NOT guess. Supported values: REACH (Reach), IMPRESSIONS (Impressions), LINK_CLICKS (Link Clicks), LANDING_PAGE_VIEWS (Landing Page Views), ENGAGED_PAGE_VIEWS (Engaged Page Views — users who stay on the landing page), POST_ENGAGEMENT (Post Engagement), PAGE_LIKES (Page Likes), EVENT_RESPONSES (Event Responses), OFFSITE_CONVERSIONS (Conversions / Purchases / Add to Cart), VALUE (Conversion Value / ROAS), LEAD_GENERATION (Leads), QUALITY_LEAD (Conversion Leads), CONVERSATIONS (Conversations), MESSAGING_PURCHASE_CONVERSION (Messaging Purchases — optimize for purchases in messaging conversations; pair with a messaging destination_type such as MESSENGER, WHATSAPP, or INSTAGRAM_DIRECT), QUALITY_CALL (Calls), MEANINGFUL_CALL_ATTEMPT (Meaningful Calls — optimize for call attempts initiated through messaging), APP_INSTALLS (App Installs), IN_APP_VALUE (In-App Value — optimize for in-app purchase value in app promotion campaigns), VIDEO_VIEWS (Video Views), THRUPLAY (ThruPlay), TWO_SECOND_CONTINUOUS_VIDEO_VIEWS (2-second continuous video plays), VISIT_INSTAGRAM_PROFILE (Instagram profile visits — pair with destination_type=INSTAGRAM_PROFILE), PROFILE_VISIT (profile visits — pair with destination_type=FACEBOOK_PAGE for "Maximize Facebook Page visits" or destination_type=INSTAGRAM_PROFILE for IG profile visits), PROFILE_AND_PAGE_ENGAGEMENT (Profile and Page Engagement — unified profile/page visit optimization; pair with destination_type=INSTAGRAM_PROFILE, FACEBOOK_PAGE, or INSTAGRAM_PROFILE_AND_FACEBOOK_PAGE), REMINDERS_SET (Reminders set), AD_RECALL_LIFT (Ad Recall Lift). Some goals are gated per-account (e.g. MESSAGING_PURCHASE_CONVERSION, MEANINGFUL_CALL_ATTEMPT, IN_APP_VALUE, ENGAGED_PAGE_VIEWS) — the Marketing API returns an error if the account is not eligible. Compatibility with the parent campaign's objective is enforced by the Marketing API. 

  OBJECTIVE → COMPATIBLE optimization_goal VALUES (default listed first; pick from this list based on the parent campaign's objective — values outside the list are rejected with "Performance goal isn't available with this objective"): OUTCOME_AWARENESS → REACH (default), IMPRESSIONS, AD_RECALL_LIFT, THRUPLAY, TWO_SECOND_CONTINUOUS_VIDEO_VIEWS. OUTCOME_TRAFFIC → LINK_CLICKS (default), LANDING_PAGE_VIEWS, OFFSITE_CONVERSIONS, IMPRESSIONS, POST_ENGAGEMENT, REACH, CONVERSATIONS, THRUPLAY, VISIT_INSTAGRAM_PROFILE, PROFILE_VISIT, QUALITY_CALL, REMINDERS_SET. OUTCOME_ENGAGEMENT → THRUPLAY (default), POST_ENGAGEMENT, EVENT_RESPONSES, PAGE_LIKES, IMPRESSIONS, REACH, TWO_SECOND_CONTINUOUS_VIDEO_VIEWS, VIDEO_VIEWS, LINK_CLICKS, CONVERSATIONS, OFFSITE_CONVERSIONS, LANDING_PAGE_VIEWS, QUALITY_CALL. OUTCOME_LEADS → OFFSITE_CONVERSIONS (default), LEAD_GENERATION, QUALITY_LEAD, LANDING_PAGE_VIEWS, LINK_CLICKS, IMPRESSIONS, REACH, VALUE, CONVERSATIONS, QUALITY_CALL. OUTCOME_SALES → OFFSITE_CONVERSIONS (default), VALUE, LANDING_PAGE_VIEWS, IMPRESSIONS, POST_ENGAGEMENT, REACH, LINK_CLICKS, CONVERSATIONS. OUTCOME_APP_PROMOTION → APP_INSTALLS (default), OFFSITE_CONVERSIONS, IMPRESSIONS, LINK_CLICKS, REACH, VALUE, VIDEO_VIEWS. Account-gated goals that may also be valid for specific objectives: ENGAGED_PAGE_VIEWS (Traffic), MEANINGFUL_CALL_ATTEMPT (Traffic, Engagement), MESSAGING_PURCHASE_CONVERSION (Engagement, Sales — messaging destinations only), IN_APP_VALUE (App Promotion). When in doubt, pick the default (first value listed).`,
      },
      {
        name: 'targeting',
        type: 'string',
        required: true,
        description: `JSON string of targeting spec. IMPORTANT: Do NOT invent interest IDs — interest targeting requires real numeric IDs from the Facebook Targeting Search API (typically 13–16 digit numbers like "6003139266461"). If you do not have valid interest IDs, use geo_locations-only broad targeting instead. Example (broad, recommended when interest IDs are unknown): {"geo_locations":{"countries":["US"]}}. Example (with verified interest): {"geo_locations":{"countries":["US"]},"flexible_spec":[{"interests":[{"id":"6003139266461","name":"Movies"}]}]}. Never use placeholder IDs like "000" or "123" — they will be rejected.`,
      },
      {
        name: 'adjust_lookalikes',
        type: 'boolean',
        required: false,
        description: `Optional. Whether to adjust lookalike audiences.`,
      },
      {
        name: 'adlabels',
        type: 'string',
        required: false,
        description: `Optional. JSON array of ad label specs. Example: [{"name":"My Label"}]`,
      },
      {
        name: 'adset_schedule',
        type: 'string',
        required: false,
        description: `Optional. JSON array of day-parting schedule objects. Example: [{"start_minute":0,"end_minute":1440,"days":[0,1,2,3,4,5,6]}]`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'attribution_spec',
        type: 'string',
        required: false,
        description: `Optional. JSON array of attribution spec for conversion tracking. RECOMMENDED: omit this field unless the advertiser explicitly requests a specific window. Default: 7-day click-through + 1-day view-through. Override example (7-day click only): [{"event_type":"CLICK_THROUGH","window_days":7}]. Valid event_types: CLICK_THROUGH, VIEW_THROUGH, ENGAGED_VIDEO_VIEW.`,
      },
      {
        name: 'automatic_manual_state',
        type: 'string',
        required: false,
        description: `Optional. Automatic/manual state. Values: UNSET, AUTOMATIC, MANUAL.`,
      },
      {
        name: 'bid_amount',
        type: 'integer',
        required: false,
        description: `ABO ONLY — do NOT pass under a CBO parent. Bid cap or cost target in cents. REQUIRED when bid_strategy is LOWEST_COST_WITH_BID_CAP or COST_CAP. Not needed for LOWEST_COST_WITHOUT_CAP (autobid).`,
      },
      {
        name: 'bid_constraints',
        type: 'string',
        required: false,
        description: `ABO ONLY — do NOT pass under a CBO parent (bidding lives on the campaign in that case). REQUIRED when bid_strategy is LOWEST_COST_WITH_MIN_ROAS. JSON object with roas_average_floor (minimum ROAS as percentage, e.g. {"roas_average_floor":200} = 2.00x). Not needed for other bid strategies.`,
      },
      {
        name: 'bid_strategy',
        type: 'string',
        required: false,
        description: `ABO ONLY — do NOT pass under a CBO parent campaign (one that has campaign_daily_budget or campaign_lifetime_budget set); the campaign-level bid strategy governs all child ad sets and the API rejects ad-set-level bidding with "Must Use Campaign Bid Strategy". Optional. Ad set bid strategy. Values: LOWEST_COST_WITHOUT_CAP (default — automatic bidding, no bid_amount needed), LOWEST_COST_WITH_BID_CAP (REQUIRES bid_amount — sets a maximum bid cap in cents), COST_CAP (REQUIRES bid_amount — sets an average cost-per-result target in cents), LOWEST_COST_WITH_MIN_ROAS (for value optimization — requires bid_constraints with roas_average_floor). If omitted, defaults to LOWEST_COST_WITHOUT_CAP (autobid).`,
      },
      {
        name: 'biz_ai_enabled_state',
        type: 'string',
        required: false,
        description: `Optional. Business AI enabled state. Values: APP_ONBOARDING_REQUIRED, APP_ONBOARDING_STARTED, APP_ONBOARDING_NOT_REQUIRED, OPT_OUT_ONBOARDING, ONBOARDED_AI_REPLY_ON, ONBOARDED_AI_REPLY_OFF, NOT_ENABLED, CURRENT_CAMPAIGN_ONLY, ALL_CAMPAIGNS.`,
      },
      {
        name: 'brand_audience_id',
        type: 'string',
        required: false,
        description: `Optional. Brand audience ID as numeric string.`,
      },
      {
        name: 'brand_safety_config',
        type: 'string',
        required: false,
        description: `Optional. JSON object of brand safety configuration.`,
      },
      {
        name: 'breakdown_effect_eligibility',
        type: 'boolean',
        required: false,
        description: `Optional. Whether breakdown effect is eligible.`,
      },
      {
        name: 'budget_schedule_specs',
        type: 'string',
        required: false,
        description: `Optional. JSON array of budget schedule specs for high demand periods. Each spec has time_start, time_end, budget_value, budget_value_type.`,
      },
      {
        name: 'budget_source',
        type: 'string',
        required: false,
        description: `Optional. Budget source. Values: NONE, RMN.`,
      },
      {
        name: 'budget_split_set_id',
        type: 'string',
        required: false,
        description: `Optional. Budget split set ID as numeric string.`,
      },
      {
        name: 'calling_settings',
        type: 'string',
        required: false,
        description: `Optional. JSON object of calling settings for call-based ads.`,
      },
      {
        name: 'campaign_active_time',
        type: 'integer',
        required: false,
        description: `Optional. Campaign active time as a UNIX timestamp (seconds since epoch).`,
      },
      {
        name: 'campaign_attribution',
        type: 'string',
        required: false,
        description: `Optional. Attribution type for app campaigns. Values: AEM, SKAN.`,
      },
      {
        name: 'campaign_spec',
        type: 'string',
        required: false,
        description: `Optional. JSON object of campaign spec with name, objective, and buying_type for inline campaign creation.`,
      },
      {
        name: 'campaign_targeting_consolidation',
        type: 'string',
        required: false,
        description: `Optional. Campaign targeting consolidation phase. Values: PHASE_1, PHASE_2, PHASE_3.`,
      },
      {
        name: 'contextual_bundling_spec',
        type: 'string',
        required: false,
        description: `Optional. JSON object of contextual bundling spec for ads in Facebook contextual surfaces.`,
      },
      {
        name: 'conversion_goal_id',
        type: 'string',
        required: false,
        description: `Optional. ID of the conversion goal (CSA) as numeric string.`,
      },
      {
        name: 'conversion_locations',
        type: 'string',
        required: false,
        description: `Optional. Where conversions happen. Values: WEBSITE, APP, MESSAGING, PHONE_CALL, SHOP, UNDEFINED.`,
      },
      {
        name: 'conversion_value_expression_spec',
        type: 'string',
        required: false,
        description: `Optional. JSON array of conversion value expression specs.`,
      },
      {
        name: 'cost_bidding_mode',
        type: 'string',
        required: false,
        description: `Optional. Cost bidding mode. Values: VOLUME_FOCUSED, BALANCED, COST_FOCUSED.`,
      },
      {
        name: 'creative_diversity_data',
        type: 'string',
        required: false,
        description: `Optional. JSON object of creative diversity data including scores and labels for creative variation analysis.`,
      },
      {
        name: 'creative_diversity_label',
        type: 'string',
        required: false,
        description: `Optional. Creative diversity label. Values: HIGH, LOW, MEDIUM.`,
      },
      {
        name: 'creative_diversity_score',
        type: 'number',
        required: false,
        description: `Optional. Creative diversity score (0.0-1.0) measuring variation across ad creatives.`,
      },
      {
        name: 'creative_fatigue_prediction_ple',
        type: 'string',
        required: false,
        description: `Optional. JSON object of creative fatigue prediction PLE data.`,
      },
      {
        name: 'creative_sequence',
        type: 'string',
        required: false,
        description: `Optional. JSON array of ad group IDs defining the sequence to show to users.`,
      },
      {
        name: 'daily_budget',
        type: 'integer',
        required: false,
        description: `ONLY WHEN PARENT CAMPAIGN HAS NO BUDGET (ABO mode). Daily budget in cents. Only set this when the parent campaign does NOT use CBO (i.e., has no campaign_daily_budget or campaign_lifetime_budget). Mutually exclusive with lifetime_budget. IMPORTANT: If the user has not explicitly requested ABO, prefer setting campaign_daily_budget on the campaign instead (CBO is recommended). If neither budget is set here and the parent is not CBO, the tool will ask you to choose CBO or ABO explicitly.`,
      },
      {
        name: 'daily_imps',
        type: 'integer',
        required: false,
        description: `Optional. Daily impressions. Only for campaigns with buying_type=FIXED_CPM.`,
      },
      {
        name: 'daily_min_spend_target',
        type: 'integer',
        required: false,
        description: `Optional. Minimum daily spend target in cents.`,
      },
      {
        name: 'daily_spend_cap',
        type: 'integer',
        required: false,
        description: `Optional. Daily spend cap in cents.`,
      },
      {
        name: 'destination_type',
        type: 'string',
        required: false,
        description: `REQUIRED for messaging and profile goals — see below. Where the ad drives people. Values: WEBSITE, APP, MESSENGER, INSTAGRAM_DIRECT, WHATSAPP, PHONE_CALL, ON_AD, ON_EVENT, ON_PAGE, ON_POST, ON_VIDEO, INSTAGRAM_PROFILE, FACEBOOK_PAGE, INSTAGRAM_PROFILE_AND_FACEBOOK_PAGE, LEAD_FORM_MESSENGER. REQUIRED pairings: CONVERSATIONS / MESSAGING_PURCHASE_CONVERSION / MEANINGFUL_CALL_ATTEMPT → MESSENGER, WHATSAPP, or INSTAGRAM_DIRECT. VISIT_INSTAGRAM_PROFILE → INSTAGRAM_PROFILE. PROFILE_VISIT → FACEBOOK_PAGE or INSTAGRAM_PROFILE. PROFILE_AND_PAGE_ENGAGEMENT → INSTAGRAM_PROFILE, FACEBOOK_PAGE, or INSTAGRAM_PROFILE_AND_FACEBOOK_PAGE. WEBSITE is the typical pairing for LANDING_PAGE_VIEWS / OFFSITE_CONVERSIONS / VALUE goals.`,
      },
      {
        name: 'dsa_beneficiary',
        type: 'string',
        required: false,
        description: `Optional. Digital Services Act beneficiary name.`,
      },
      {
        name: 'dsa_payor',
        type: 'string',
        required: false,
        description: `Optional. Digital Services Act payor name.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Optional. Ad set end time in ISO 8601 format. Required when using lifetime_budget.`,
      },
      {
        name: 'existing_customer_budget_percentage',
        type: 'integer',
        required: false,
        description: `Optional. Budget percentage for existing customers (Advantage+ shopping).`,
      },
      {
        name: 'frequency_control_specs',
        type: 'string',
        required: false,
        description: `Optional. JSON array of frequency capping specs.`,
      },
      {
        name: 'guidance_lift_estimate',
        type: 'string',
        required: false,
        description: `Optional. JSON object of lift estimation for each guidance object.`,
      },
      {
        name: 'include_in_ad_study_cell_id',
        type: 'string',
        required: false,
        description: `Optional. Ad study cell ID to include this ad set in, as numeric string.`,
      },
      {
        name: 'include_in_ad_study_id',
        type: 'string',
        required: false,
        description: `Optional. Ad study ID to include this ad set in, as numeric string.`,
      },
      {
        name: 'io_number',
        type: 'integer',
        required: false,
        description: `Optional. Insertion order number for direct deals.`,
      },
      {
        name: 'is_dynamic_creative',
        type: 'boolean',
        required: false,
        description: `Optional. Whether this ad set uses dynamic creative optimization.`,
      },
      {
        name: 'is_dynamic_creative_format_automation',
        type: 'boolean',
        required: false,
        description: `Optional. Whether to use dynamic creative format automation.`,
      },
      {
        name: 'is_dynamic_creative_optimization',
        type: 'boolean',
        required: false,
        description: `Optional. Whether to use dynamic creative optimization. Deprecated in v3.2.`,
      },
      {
        name: 'is_incremental_attribution_enabled',
        type: 'boolean',
        required: false,
        description: `Optional. Whether the campaign should use incremental attribution optimization. Incremental attribution is an attribution model that optimizes ad delivery for incremental conversions. It uses machine learning models that predict whether a conversion is caused by an ad. Supported bid strategies are: LOWEST_COST_WITHOUT_CAP, COST_CAP, and LOWEST_COST_WITH_MIN_ROAS (autobid campaigns are always allowed). Supported optimization goals are: OFFSITE_CONVERSIONS, VALUE, and RETURN_ON_AD_SPEND. Supported promoted object types are: PIXEL, WEBSITE, PRODUCT_SET, WEB_AND_APP, and WEB_AND_SHOP (plus WEBSITE_AND_IN_STORE and WEBSITE_APP_AND_IN_STORE for accounts gated into omni/web-app-instore). For value-optimized goals (VALUE, ROAS), the supported promoted object semantic value types are: VALUE, MARGIN, and LIFETIME_VALUE. When using incremental attribution you should not provide a value for \`attribution_spec\`.`,
      },
      {
        name: 'is_lifetime_flex_with_valid_schedule',
        type: 'boolean',
        required: false,
        description: `Optional. Whether the campaign is lifetime flex with a valid schedule.`,
      },
      {
        name: 'is_message_marketing',
        type: 'boolean',
        required: false,
        description: `Optional. Whether this is message marketing.`,
      },
      {
        name: 'is_sac_cfca_terms_certified',
        type: 'boolean',
        required: false,
        description: `Optional. Whether SAC CFCA terms are certified.`,
      },
      {
        name: 'lifetime_budget',
        type: 'integer',
        required: false,
        description: `ONLY WHEN PARENT CAMPAIGN HAS NO BUDGET (ABO mode). Lifetime budget in cents. Only set this when the parent campaign does NOT use CBO. Mutually exclusive with daily_budget. Requires end_time. Prefer setting campaign_lifetime_budget on the campaign instead (CBO is recommended).`,
      },
      {
        name: 'lifetime_imps',
        type: 'integer',
        required: false,
        description: `Optional. Lifetime impressions. Only for campaigns with buying_type=FIXED_CPM.`,
      },
      {
        name: 'lifetime_min_spend_target',
        type: 'integer',
        required: false,
        description: `Optional. Minimum lifetime spend target in cents.`,
      },
      {
        name: 'lifetime_spend_cap',
        type: 'integer',
        required: false,
        description: `Optional. Lifetime spend cap in cents.`,
      },
      {
        name: 'lightweight_split_test_options',
        type: 'string',
        required: false,
        description: `Optional. JSON object of lightweight A/B split test configuration options.`,
      },
      {
        name: 'low_creative_reach',
        type: 'string',
        required: false,
        description: `Optional. Low creative reach indicator. Values: HIGH, LOW, MEDIUM.`,
      },
      {
        name: 'marketing_goal',
        type: 'string',
        required: false,
        description: `Optional. Marketing goal. Values: NONE, NEW_CUSTOMER_ACQUISITION.`,
      },
      {
        name: 'max_budget_spend_percentage',
        type: 'integer',
        required: false,
        description: `Optional. Maximum budget spend percentage.`,
      },
      {
        name: 'metrics_metadata',
        type: 'string',
        required: false,
        description: `Optional. JSON object of metrics metadata related to this ad set.`,
      },
      {
        name: 'min_budget_spend_percentage',
        type: 'integer',
        required: false,
        description: `Optional. Minimum budget spend percentage.`,
      },
      {
        name: 'multi_event_conversion_attribution_window_seconds',
        type: 'integer',
        required: false,
        description: `Optional. Multi-event conversion attribution window in seconds.`,
      },
      {
        name: 'multi_optimization_goal_weight',
        type: 'string',
        required: false,
        description: `Optional. Weight for multi-optimization goal. Values: UNDEFINED, BALANCED, PREFER_EVENT.`,
      },
      {
        name: 'naming_template_custom_fields',
        type: 'string',
        required: false,
        description: `Optional. JSON object of naming template custom fields for ad set naming conventions.`,
      },
      {
        name: 'optimization_sub_event',
        type: 'string',
        required: false,
        description: `Optional. Sub-event for optimization (e.g., specific app event).`,
      },
      {
        name: 'pacing_type',
        type: 'string',
        required: false,
        description: `Optional. JSON array of pacing type. Values: ["standard"], ["day_parting"], ["no_pacing"].`,
      },
      {
        name: 'partnership_ad_content_lists',
        type: 'string',
        required: false,
        description: `Optional. JSON array of partnership ad content lists.`,
      },
      {
        name: 'placement',
        type: 'string',
        required: false,
        description: `Optional. JSON object of placement spec defining where ads appear (e.g., feeds, stories, reels, audience network).`,
      },
      {
        name: 'placement_soft_opt_out',
        type: 'string',
        required: false,
        description: `Optional. JSON object of placement soft opt-out spec to exclude specific placements without hard constraints.`,
      },
      {
        name: 'promoted_object',
        type: 'string',
        required: false,
        description: `REQUIRED when optimization_goal is OFFSITE_CONVERSIONS, VALUE, LEAD_GENERATION, QUALITY_LEAD, APP_INSTALLS, or IN_APP_VALUE — the Marketing API rejects without it. Optional for other goals (REACH, IMPRESSIONS, LINK_CLICKS, etc.). JSON string of promoted object spec — usually a pixel, app, page, or custom event. REQUIRED for OUTCOME_SALES campaigns with WEBSITE destination: without a promoted_object containing a pixel_id, the Marketing API rejects the create with "Performance goal isn't available" because no optimization goals are valid for that combination. Strongly recommended for conversion-tracking goals (OFFSITE_CONVERSIONS, LANDING_PAGE_VIEWS, VALUE) under OUTCOME_LEADS as well. For OUTCOME_TRAFFIC, promoted_object is optional. Format examples: {"pixel_id":"123"} (website conversions / landing page views), {"pixel_id":"123","custom_event_type":"PURCHASE"} (specific event), {"custom_conversion_id":"123"} (custom conversion), {"application_id":"123","object_store_url":"..."} (app installs), {"page_id":"123"} (page-related goals).`,
      },
      {
        name: 'relative_value',
        type: 'number',
        required: false,
        description: `Optional. Relative value weight (0.0-1.0) for multi-optimization goal balancing.`,
      },
      {
        name: 'reporting_audience',
        type: 'string',
        required: false,
        description: `Optional. JSON object of reporting audience spec for cross-account reporting.`,
      },
      {
        name: 'rf_prediction_id',
        type: 'string',
        required: false,
        description: `Optional. Reach and frequency prediction ID as numeric string.`,
      },
      {
        name: 'saved_audience',
        type: 'string',
        required: false,
        description: `Optional. JSON object of saved audience spec including targeting, name, and other audience configuration.`,
      },
      {
        name: 'saved_audience_id',
        type: 'string',
        required: false,
        description: `Optional. Saved audience ID as numeric string.`,
      },
      {
        name: 'shops_ads_metadata_tags',
        type: 'string',
        required: false,
        description: `Optional. JSON array of shops ads metadata tag integers.`,
      },
      {
        name: 'source_adset_id',
        type: 'string',
        required: false,
        description: `Optional. Source ad set ID to copy from, as numeric string.`,
      },
      {
        name: 'split_test_config_splits_index',
        type: 'integer',
        required: false,
        description: `Optional. Index for the splits vector from split test config on the parent campaign.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Optional. Ad set start time in ISO 8601 format.`,
      },
      {
        name: 'targeting_as_signal',
        type: 'integer',
        required: false,
        description: `Optional. Indicates if campaign is using targeting criteria as a signal.`,
      },
      {
        name: 'time_based_ad_rotation_id_blocks',
        type: 'string',
        required: false,
        description: `Optional. JSON array of arrays of ad group IDs for time-based ad rotation.`,
      },
      {
        name: 'time_based_ad_rotation_intervals',
        type: 'string',
        required: false,
        description: `Optional. JSON array of UNIX timestamps defining date ranges for ad rotation.`,
      },
      {
        name: 'time_start',
        type: 'string',
        required: false,
        description: `Optional. Time start in ISO 8601 format or UNIX timestamp.`,
      },
      {
        name: 'time_stop',
        type: 'string',
        required: false,
        description: `Optional. Time stop in ISO 8601 format or UNIX timestamp.`,
      },
      {
        name: 'time_suggestion',
        type: 'string',
        required: false,
        description: `Optional. JSON object of suggested start/stop time for the ad set based on delivery optimization.`,
      },
      {
        name: 'tune_for_category',
        type: 'string',
        required: false,
        description: `Optional. Special ad category tuning. Values: HOUSING, CREDIT, EMPLOYMENT, ISSUES_ELECTIONS_POLITICS.`,
      },
      {
        name: 'value_rule_set_id',
        type: 'string',
        required: false,
        description: `Optional. Value rule set ID as numeric string.`,
      },
      {
        name: 'value_rules_applied',
        type: 'boolean',
        required: false,
        description: `Optional. Whether value rules are applied.`,
      },
      {
        name: 'value_rules_spec',
        type: 'string',
        required: false,
        description: `Optional. JSON object of value rules spec.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_create_campaign',
    description: `Creates a single campaign (campaign group) in PAUSED state. Use this to create just a campaign without an ad set or ad. 

  BUDGET PLACEMENT — META RECOMMENDS CBO: Unless the user explicitly requests ad-set-level budgeting (ABO), ALWAYS use CBO by setting campaign_daily_budget OR campaign_lifetime_budget on this call. CBO allows Meta's delivery system to automatically optimize budget distribution across ad sets for better performance. 

  CBO (Campaign Budget Optimization): Pass campaign_daily_budget OR campaign_lifetime_budget here. campaign_bid_strategy defaults to LOWEST_COST_WITHOUT_CAP if omitted; pass it explicitly for COST_CAP, LOWEST_COST_WITH_BID_CAP, or LOWEST_COST_WITH_MIN_ROAS. ABO (Ad Set Budget Optimization): Leave campaign_daily_budget, campaign_lifetime_budget, AND campaign_bid_strategy unset on this call, then pass daily_budget / lifetime_budget on the subsequent ads_create_ad_set call. Only use ABO if the user specifically asks to control budget per ad set. Setting any campaign-level budget field implicitly switches the campaign to CBO; if the user asked for ABO, do NOT set them. 

  ENFORCED: ads_create_ad_set pre-validates this and will reject calls that pass daily_budget or lifetime_budget under a CBO parent campaign.

  POTENTIAL NEXT STEP — RECOMMEND OPPORTUNITY SCORE: After creating a campaign successfully, suggest calling \`ads_get_opportunity_score\` with the ad account ID to check whether the account follows Meta best practices and to get personalized recommendations that can improve performance.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID. Format: numeric ID without "act_" prefix.`,
      },
      {
        name: 'buying_type',
        type: 'string',
        required: true,
        description: `Campaign buying type. Values: AUCTION (default), RESERVED.`,
      },
      {
        name: 'campaign_name',
        type: 'string',
        required: true,
        description: `Name for the campaign.`,
      },
      {
        name: 'objective',
        type: 'string',
        required: true,
        description: `Campaign objective. Only ODAX outcome values are accepted: OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_APP_PROMOTION. Legacy objectives (APP_INSTALLS, BRAND_AWARENESS, REACH, LEAD_GENERATION, LINK_CLICKS, VIDEO_VIEWS, etc.) are not supported and the request fails with VALIDATION. Map APP_INSTALLS to OUTCOME_APP_PROMOTION.`,
      },
      {
        name: 'adlabels',
        type: 'string',
        required: false,
        description: `Optional. JSON array of ad label specs. Example: [{"name":"My Label"}]`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'budget_schedule_specs',
        type: 'string',
        required: false,
        description: `Optional. JSON array of budget schedule specs for high-demand periods.`,
      },
      {
        name: 'campaign_bid_strategy',
        type: 'string',
        required: false,
        description: `CBO ONLY. Campaign-level bid strategy. Defaults to LOWEST_COST_WITHOUT_CAP if omitted (recommended for "highest volume" or "lowest cost" strategies). Set explicitly for other strategies. Values: LOWEST_COST_WITHOUT_CAP, LOWEST_COST_WITH_BID_CAP, COST_CAP, LOWEST_COST_WITH_MIN_ROAS. Do NOT set this field for ABO — set the bid strategy on the ad set instead.`,
      },
      {
        name: 'campaign_daily_budget',
        type: 'integer',
        required: false,
        description: `Optional. CBO ONLY. Campaign daily budget in cents. Mutually exclusive with campaign_lifetime_budget. Do NOT set this field for ABO — pass daily_budget on the subsequent ads_create_ad_set call instead.`,
      },
      {
        name: 'campaign_lifetime_budget',
        type: 'integer',
        required: false,
        description: `Optional. CBO ONLY. Campaign lifetime budget in cents. Mutually exclusive with campaign_daily_budget. Do NOT set this field for ABO — pass lifetime_budget on the subsequent ads_create_ad_set call instead.`,
      },
      {
        name: 'campaign_optimization_type',
        type: 'string',
        required: false,
        description: `Optional. Campaign optimization type. Values: NONE, ICO_ONLY.`,
      },
      {
        name: 'campaign_spend_cap',
        type: 'integer',
        required: false,
        description: `Optional. Maximum total spend cap for the campaign in cents.`,
      },
      {
        name: 'campaign_start_time',
        type: 'string',
        required: false,
        description: `Optional. Campaign start time in ISO 8601 format.`,
      },
      {
        name: 'campaign_stop_time',
        type: 'string',
        required: false,
        description: `Optional. Campaign stop time in ISO 8601 format.`,
      },
      {
        name: 'is_skadnetwork_attribution',
        type: 'boolean',
        required: false,
        description: `Optional. Enable SKAdNetwork attribution for iOS app campaigns.`,
      },
      {
        name: 'is_using_l3_schedule',
        type: 'boolean',
        required: false,
        description: `Optional. Whether the campaign uses L3 schedule.`,
      },
      {
        name: 'iterative_split_test_configs',
        type: 'string',
        required: false,
        description: `Optional. JSON array of iterative split test configuration specs.`,
      },
      {
        name: 'promoted_object',
        type: 'string',
        required: false,
        description: `Optional. JSON string of promoted object spec. Required for some objectives (APP_PROMOTION, LEADS, etc.).`,
      },
      {
        name: 'source_campaign_id',
        type: 'string',
        required: false,
        description: `Optional. The source campaign ID to copy settings from.`,
      },
      {
        name: 'special_ad_categories',
        type: 'string',
        required: false,
        description: `JSON array of special ad categories. Defaults to "[]".`,
      },
      {
        name: 'special_ad_category_country',
        type: 'string',
        required: false,
        description: `Optional. JSON array of country codes for special ad categories. Example: ["US","CA"]`,
      },
      {
        name: 'topline_id',
        type: 'string',
        required: false,
        description: `Optional. The topline ID to associate with this campaign.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_create_creative',
    description: `Creates an ad creative on the specified ad account. Supports four formats: single-image, single-video, Advantage+ catalog carousel, and static carousel (manually-specified cards).

  ## Required fields by format:

  **Image ads:**
  - \`ad_account_id\`, \`page_id\`, \`link_url\`
  - One of \`image_hash\` or \`image_url\` (the ad image; never both)

  **Video ads:**
  - \`ad_account_id\`, \`page_id\`, \`video_id\`
  - \`link_url\` — optional (video ads can work without a link)
  - One of \`image_hash\` or \`image_url\` — required; represents the **video thumbnail** (cover image shown before the video plays; never both)

  **Advantage+ catalog carousel ads:**
  - \`ad_account_id\`, \`page_id\`, \`product_set_id\`, \`link_url\`
  - Do not provide \`image_hash\`, \`image_url\`, or \`video_id\` — catalog ads source media from the product catalog automatically.

  **Static carousel ads:**
  - \`ad_account_id\`, \`page_id\`, \`cards\` (2–10 cards)
  - Each card: one of \`image_hash\` or \`image_url\` (an image card), or \`video_id\` for a video card (a thumbnail is optional — if you omit \`image_hash\`/\`image_url\`, the video's default thumbnail is used). Per card you may also set \`link\`, \`headline\` (or \`name\`), \`description\`, and \`call_to_action_type\`.
  - Provide \`cards\` alone — do not combine with \`image_hash\`, \`image_url\`, \`video_id\`, or \`product_set_id\`. Top-level \`link_url\` and \`call_to_action_type\` act as per-card fallbacks; each image card must have a link (its own or the fallback), while video cards may omit the link.

  ## Optional fields (all formats):
  - \`message\` — body text shown above the image, video, or carousel. For carousel ads, may contain template strings like {{product.name}} filled from the catalog at delivery time.
  - \`description\` — short description text shown under the media.
  - \`headline\` — short headline shown under the image, video, or carousel cards.
  - \`call_to_action_type\` — CTA button type (defaults to LEARN_MORE). Must be an exact UPPER_CASE enum value (e.g. SHOP_NOW, LEARN_MORE, BOOK_NOW). See the field description for the full list.
  - \`name\` — name of this ad creative as seen in the ad account's library. Strongly recommended.
  - \`instagram_user_id\` — IG user (Instagram Business Account) ID for IG placement delivery. Omit and the creative will not deliver on Instagram surfaces.
  - \`self_ai_disclosure\` — AI-generated content disclosure. "OPT_IN" declares the creative contains third-party AI-generated/edited media; "OPT_OUT" declares it does not. Omit if unknown. When opted in, Meta may display an "AI info" label on the ad; whether it appears depends on the ad's delivery regions and their AI-transparency requirements.

  ## When to use:
  - The user wants to create a single-image link ad creative from a pre-uploaded image.
  - The user wants to create a single-video ad creative from a pre-uploaded video.
  - The user wants to create an Advantage+ catalog carousel ad creative from a product set.
  - The user wants to create a static carousel ad creative from a list of manually-specified cards.

  ## When NOT to use:
  - Lead-gen, app-install, or branded-content creatives — not supported.
  - The user has not yet uploaded the image or video — no upload tool yet; caller must already have an \`image_hash\`, \`image_url\`, or \`video_id\`.
  - The user wants the creative attached to an ad in the same call — this tool only creates the creative.

  ## Response:
  Returns the new \`creative_id\` plus echoed \`name\` and \`account_id\`. Use \`ads_get_creatives\` afterward to inspect the created creative.

  ## Known limitations:
  - Image hash existence is not validated at creation time — ensure the hash is valid.
  - Duplicate detection: if a creative with identical content already exists and is active on the account, the existing \`creative_id\` is returned instead of creating a new one — your "new" creative may be a reused old one.
  - No support for \`instagram_actor_id\`, \`branded_content\`, \`effective_authorization_category\` (political/issue ads), \`url_tags\`, \`applink_treatment\`, or IG existing post boost.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `Parent ad account ID, numeric (e.g. "123456789").`,
      },
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `Facebook page ID that will own the creative post.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'call_to_action_type',
        type: 'string',
        required: false,
        description: `Call-to-action button type. Defaults to LEARN_MORE if omitted. Pick the UPPER_CASE value whose label matches the user's intent — do NOT guess. CTA destination is auto-set to link_url. Common values by category: — Shopping: SHOP_NOW (Shop Now), BUY_NOW (Buy Now), ORDER_NOW (Order Now), START_ORDER (Start Order), ADD_TO_CART (Add to Cart), SEE_SHOP (See Shop), BROWSE_SHOP (Browse Shop), VIEW_PRODUCT (View Product), BUY (Buy), SELL_NOW (Sell Now), SHOP_WITH_AI (Shop with AI). — General: LEARN_MORE (Learn More), SIGN_UP (Sign Up), OPEN_LINK (Open Link), GET_STARTED (Get Started), SEE_MORE (See More), FIND_OUT_MORE (Find Out More), VISIT_WEBSITE (Visit Website), GET_DETAILS (Get Details), CONFIRM (Confirm), NO_BUTTON (No Button). — Contact: CALL_NOW (Call Now), CALL (Call), CONTACT_US (Contact Us), CONTACT (Contact), GET_QUOTE (Get Quote), GET_A_QUOTE (Get a Quote), MESSAGE_PAGE (Message Page), WHATSAPP_MESSAGE (WhatsApp Message), GET_IN_TOUCH (Get in Touch), AUDIO_CALL (Audio Call), VIDEO_CALL (Video Call), EMAIL_NOW (Email Now), ASK_A_QUESTION (Ask a Question), CHAT_NOW (Chat Now), CHAT_WITH_US (Chat with Us), ASK_FOR_MORE_INFO (Ask for More Info). — Booking: BOOK_NOW (Book Now), BOOK_TRAVEL (Book Travel), REQUEST_TIME (Request Time), MAKE_AN_APPOINTMENT (Make an Appointment), BOOK_A_CONSULTATION (Book a Consultation), GET_SHOWTIMES (Get Showtimes), BUY_TICKETS (Buy Tickets). — App: INSTALL_APP (Install App), INSTALL_MOBILE_APP (Install Mobile App), USE_APP (Use App), USE_MOBILE_APP (Use Mobile App), DOWNLOAD (Download), PLAY_GAME (Play Game), OPEN_INSTANT_APP (Open Instant App), UPDATE_APP (Update App). — Lead Gen: APPLY_NOW (Apply Now), INQUIRE_NOW (Inquire Now), GET_OFFER (Get Offer), GET_DIRECTIONS (Get Directions). — Engagement: SUBSCRIBE (Subscribe), FOLLOW_PAGE (Follow Page), EVENT_RSVP (RSVP), DONATE (Donate), DONATE_NOW (Donate Now), RAISE_MONEY (Raise Money), REFER_FRIENDS (Refer Friends). — Media: WATCH_VIDEO (Watch Video), WATCH_MORE (Watch More), LISTEN_NOW (Listen Now), LISTEN_MUSIC (Listen Music), WATCH_LIVE_VIDEO (Watch Live Video).`,
      },
      {
        name: 'cards',
        type: 'array',
        required: false,
        description: `Cards for a STATIC carousel ad (2–10). Distinct from Advantage+ catalog carousel: do NOT combine cards with product_set_id, image_hash, image_url, or video_id. Each card needs exactly one image (image_hash or image_url); a video card sets video_id and may omit the image, in which case the video's default thumbnail is used. Top-level link_url and call_to_action_type act as per-card fallbacks.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short description text. Maps to link_data.description for image ads, video_data.link_description for video ads, or template_data.description for carousel ads.`,
      },
      {
        name: 'headline',
        type: 'string',
        required: false,
        description: `Short headline shown under the image (link_data.name), video (video_data.title), or carousel cards (template_data.name).`,
      },
      {
        name: 'image_hash',
        type: 'string',
        required: false,
        description: `Hash of a pre-uploaded image asset. For image ads: the ad image (required — exactly one of image_hash or image_url). For video ads: the video thumbnail / cover image shown before the video plays (required — exactly one of image_hash or image_url). Not used for catalog carousel ads.`,
      },
      {
        name: 'image_url',
        type: 'string',
        required: false,
        description: `URL of an image. For image ads: the ad image (required — exactly one of image_hash or image_url). For video ads: the video thumbnail / cover image shown before the video plays (required — exactly one of image_hash or image_url). Not used for catalog carousel ads.`,
      },
      {
        name: 'instagram_user_id',
        type: 'string',
        required: false,
        description: `Instagram User (IG Business Account) ID for IG placement delivery. Omit and the creative will not deliver on Instagram surfaces.`,
      },
      {
        name: 'link_url',
        type: 'string',
        required: false,
        description: `Destination URL the creative clicks to (e.g. "https://example.com/landing"). Required for image and catalog carousel ads; optional for video ads. Always include https:// scheme; if omitted the tool prepends it automatically. For catalog carousel ads, this is the default landing URL; product-specific deep links from the catalog may override it at delivery time.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Body text shown above the image, video, or carousel. For carousel ads, may contain template strings like {{product.name}} filled from the catalog at delivery time.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of this ad creative as seen in the ad account's library. Strongly recommended.`,
      },
      {
        name: 'product_set_id',
        type: 'string',
        required: false,
        description: `ID of a product set from the advertiser's catalog. Required for Advantage+ catalog carousel ads. When provided, creates a carousel creative that dynamically populates card content from the catalog at delivery time. Do not provide image_hash, image_url, or video_id when using product_set_id.`,
      },
      {
        name: 'self_ai_disclosure',
        type: 'string',
        required: false,
        description: `AI-generated content disclosure for the creative. Set to "OPT_IN" to declare that this creative contains media created or edited with a third-party generative AI tool; set to "OPT_OUT" to declare it does not. Omit if unknown. Only these two exact UPPER_CASE values are accepted. When you opt in, Meta may display an "AI info" label on the ad; whether it appears depends on the regions the ad is delivered to and their AI-transparency requirements.`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: false,
        description: `ID of a pre-uploaded video on the ad account. Required for video ads. Not used for catalog carousel ads.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_create_custom_audience',
    description: `Creates a new custom audience under the specified ad account. Supports five audience subtypes: CUSTOM (customer list / DFCA), WEBSITE (WCA), ENGAGEMENT (ECA), MOBILE_APP (MACA), and LOOKALIKE (LAL).

  ## When to use:
  - Call this tool when the user wants to create a new custom audience.
  - For CUSTOM: user says "create customer list", "audience for a csv file", "create DFCA".
  - For WEBSITE: user says "create website audience", "retarget website visitors", "create WCA", "pixel audience".
  - For ENGAGEMENT: user says "create Instagram audience", "retarget Instagram engagers", "create ECA", "people who engaged with my IG profile", "Page followers audience", "people who liked my Page", "Page engagers", "shop visitors", "people who viewed products in my shop", "shopping audience", "people who viewed my Marketplace listings", "Marketplace catalogue viewers", "on-Facebook listings audience", "lead form audience", "people who opened my lead form", "people who submitted my lead form", "lead generation audience", "Instant Experience audience", "people who opened my Instant Experience", "Canvas audience", "people who clicked links in my Instant Experience".
  - For MOBILE_APP: user says "create mobile app audience", "retarget app users", "create MACA", "people who opened my app", "most active app users", "top app spenders", "users by purchase amount".
  - For LOOKALIKE: user says "create lookalike audience", "create LAL", "people similar to my customers", "expand my audience", "lookalike of <existing audience>", "find similar users", "1% lookalike", "broad lookalike".

  ## When NOT to use:
  - Do NOT use for uploading user data to CUSTOM audiences — use ads_update_custom_audience_users after creating the audience.
  - Do NOT use for modifying existing audiences — use ads_update_entity instead.

  ## CRITICAL:
  ### Subtype-specific requirements:

  #### CUSTOM (DFCA - Data File Custom Audience):
  - customer_file_source is REQUIRED.
  - The audience is created empty. You must use ads_update_custom_audience_users to add users after creation.
  - ads_update_custom_audience_users accepts PII either raw or pre-hashed — it normalizes and SHA-256 hashes raw values for you before they reach the API.

  #### WEBSITE (WCA - Website Custom Audience):
  - rule is REQUIRED. Must contain event_sources with type "pixel" and the pixel ID.
  - If the user does not know their pixel ID, use the ads_get_datasets tool to look up pixel IDs for their ad account.
  - The audience auto-populates from pixel events — no manual user upload needed.
  - Three main targeting flows with REQUIRED template field:
    1. All website visitors: use template "ALL_VISITORS" with filter {"field":"url","operator":"i_contains","value":""} (empty value = match all URLs).
    2. People who visited specific pages: use template "VISITORS_BY_URL" with filter {"field":"url","operator":"i_contains","value":"<keyword>"}.
    3. Visitors by time spent: use template "TOP_TIME_SPENDERS" with aggregation {"type":"time_spent","method":"percentile","operator":"in_range","value":{"from":75,"to":100}}.
  - The template field is REQUIRED in each rule. Always include it.
  - You can also filter on specific standard/custom events: "Purchase", "AddToCart", "Lead", "ViewContent", "CompleteRegistration", "InitiateCheckout". Use filter {"field":"event","operator":"eq","value":"<EVENT_NAME>"}.
  - When the user wants multiple rules, ASK whether they want "any" (OR) or "all" (AND) logic. The inclusions operator controls this: "or" means match ANY rule, "and" means match ALL rules. Default is "or".
  - URL rules can be refined by frequency via aggregation {"type":"count","method":"absolute","operator":">=","value":5}.
  - CRITICAL: For "all visitors", use url filter with empty value, NOT event filter with "PageView".
  - Example rule (all visitors, 30 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"pixel","id":"<PIXEL_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"url","operator":"i_contains","value":""}]},"template":"ALL_VISITORS"}]}}
  - Example rule (specific pages by URL): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"pixel","id":"<PIXEL_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"operator":"or","filters":[{"field":"url","operator":"i_contains","value":"nike"}]},{"field":"url","operator":"i_contains","value":""}]},"template":"VISITORS_BY_URL"}]}}
  - Example rule (top 25% time spent): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"pixel","id":"<PIXEL_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"url","operator":"i_contains","value":""}]},"template":"TOP_TIME_SPENDERS","aggregation":{"type":"time_spent","method":"percentile","operator":"in_range","value":{"from":75,"to":100}}}]}}
  - Example rule (Purchase event): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"pixel","id":"<PIXEL_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"Purchase"}]},"template":"VISITORS_BY_URL"}]}}

  #### ENGAGEMENT (ECA - Engagement Custom Audience):
  - Currently supports Instagram engagement audiences only.
  - rule is REQUIRED. Must contain event_sources with type "ig_business" and the Instagram business account ID.
  - The audience auto-populates from Instagram engagement events — no manual user upload needed.
  - retention_seconds controls how long users stay in the audience (e.g., 31536000 for 365 days, 15552000 for 180 days). For "started following" event, use retention_seconds=0 (people who unfollow are automatically removed).
  - Six Instagram engagement event types:
    1. "ig_business_profile_all" — Anyone who visited the profile OR engaged with any post/ad (likes, comments, saves, carousel swipes, button taps, shares).
    2. "INSTAGRAM_PROFILE_FOLLOW" — People who started following this account. Use retention_seconds=0 so unfollowers are removed.
    3. "ig_business_profile_visit" — People who visited the profile, regardless of action taken.
    4. "ig_business_profile_engaged" — People who engaged with a post or ad (likes, comments, saves, carousel swipes, button taps, shares).
    5. "ig_business_profile_user_messaged" — People who sent a message to this account.
    6. "ig_business_profile_ad_saved" — People who saved a post or ad from this account.
  - When the user wants multiple rules, ASK whether they want "any" (OR) or "all" (AND) logic. The inclusions operator controls this.
  - Rules can mix different IG accounts and event types in the same audience.
  - Example rule (all profile engagers, 365 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"ig_business","id":"<IG_ACCOUNT_ID>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"ig_business_profile_all"}]}}]}}
  - Example rule (followers only): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"ig_business","id":"<IG_ACCOUNT_ID>"}],"retention_seconds":0,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"INSTAGRAM_PROFILE_FOLLOW"}]}}]}}
  - Example rule (profile visitors, 180 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"ig_business","id":"<IG_ACCOUNT_ID>"}],"retention_seconds":15552000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"ig_business_profile_visit"}]}}]}}
  - Example rule (mixed — engaged OR saved across accounts): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"ig_business","id":"<IG_ACCOUNT_ID_1>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"ig_business_profile_engaged"}]}},{"event_sources":[{"type":"ig_business","id":"<IG_ACCOUNT_ID_2>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"ig_business_profile_ad_saved"}]}}]}}

  ##### Facebook Page Engagement (event_sources type: "page"):
  - Requires the Facebook Page ID. If the user does not know their Page ID, use the ads_get_ad_account_pages or ads_get_pages_for_business tool to look up Page IDs.
  - The audience auto-populates from Page engagement events — no manual user upload needed.
  - retention_seconds controls how long users stay in the audience. For "page_liked" (current followers), use retention_seconds=0 (people who unlike/unfollow are automatically removed).
  - Seven event types:
    1. "page_liked" — People who currently like or follow your Page. Use retention_seconds=0 so unfollowers are removed.
    2. "page_engaged" — Everyone who engaged with your Page (visited, reacted, shared, commented, clicked links, swiped carousels).
    3. "page_visited" — Anyone who visited your Page, regardless of action taken.
    4. "page_post_interaction" — People who engaged with any post or ad (reactions, shares, comments, link clicks, carousel swipes).
    5. "page_cta_clicked" — People who clicked any call-to-action button on your Page (e.g., "Call", "Message").
    6. "page_messaged" — People who sent a message to your Page.
    7. "page_post_saved" — People who saved a post from your Page.
  - Example rule (current followers): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"page","id":"<PAGE_ID>"}],"retention_seconds":0,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"page_liked"}]}}]}}
  - Example rule (all Page engagers, 365 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"page","id":"<PAGE_ID>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"page_engaged"}]}}]}}
  - Example rule (messaged your Page, 180 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"page","id":"<PAGE_ID>"}],"retention_seconds":15552000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"page_messaged"}]}}]}}

  ##### Shopping Engagement (event_sources type: "shopping_page" or "shopping_ig"):
  - For Facebook Shop engagement, use event_sources type "shopping_page" with the Facebook Page ID. If the user does not know their Page ID, use the ads_get_ad_account_pages or ads_get_pages_for_business tool to look up Page IDs.
  - For Instagram Shop engagement, use event_sources type "shopping_ig" with the Instagram account ID.
  - The audience auto-populates from shopping events — no manual user upload needed.
  - Eight event types:
    1. "VIEW_CONTENT" — People who viewed a product detail page in your shop on Facebook or Instagram.
    2. "PDP_CLICK_TO_OFFSITE" — People who viewed a product detail page and then navigated to your website.
    3. "ADD_TO_WISHLIST" — People who saved a product from your shop.
    4. "SHOPS_PAGE_VIEW" — People who viewed your shop on Facebook or Instagram.
    5. "SHOPS_COLLECTION_VIEW" — People who viewed a collection in your shop.
    6. "ADD_TO_CART" — People who added a product to their basket in your shop or through ads with checkout enabled.
    7. "InitiateCheckout" — People who initiated checkout in your shop or through ads with checkout enabled.
    8. "PURCHASE" — People who purchased a product from your shop or through ads with checkout enabled.
  - Example rule (viewed products, 180 days, Facebook Shop): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"shopping_page","id":"<PAGE_ID>"}],"retention_seconds":15552000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"VIEW_CONTENT"}]}}]}}
  - Example rule (added to cart, Instagram Shop): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"shopping_ig","id":"<IG_ACCOUNT_ID>"}],"retention_seconds":15552000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"ADD_TO_CART"}]}}]}}
  - Example rule (purchased any products): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"shopping_page","id":"<PAGE_ID>"}],"retention_seconds":15552000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"PURCHASE"}]}}]}}

  ##### On-Facebook Listings Engagement (event_sources type: "marketplace_listings"):
  - For people who engaged with products in your Facebook Marketplace catalogue (organic + sponsored traffic).
  - Requires the owning Facebook Page ID — the \`id\` in event_sources is the Page ID, not a separate catalogue ID. If the user does not know their Page ID, use the ads_get_ad_account_pages or ads_get_pages_for_business tool to look up Page IDs.
  - The audience auto-populates from Marketplace listing engagement events — no manual user upload needed.
  - Supported event types:
    1. "ViewContent" — People who viewed a product detail page through your Marketplace catalogue (organic or sponsored). Do not invent other event names for this source — only use values the user explicitly provides or that are listed here.
  - Example rule (viewed Marketplace products, 180 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"marketplace_listings","id":"<PAGE_ID>"}],"retention_seconds":15552000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"ViewContent"}]}}]}}

  ##### Lead Form Engagement (event_sources type: "lead" and/or "ig_lead_generation"):
  - For people who interacted with a Facebook and/or Instagram lead generation form.
  - Requires the lead form ID (as \`id\`) and the owning Facebook Page ID (as \`owner_id\`). If the user does not know the Page ID that owns the form, use the ads_get_ad_account_pages or ads_get_pages_for_business tool to look up Page IDs.
  - Two event_sources types — pair both for the same form to capture engagement on both surfaces:
    - "lead" — Facebook-side engagement with the form.
    - "ig_lead_generation" — Instagram-side engagement with the form.
    - Default behavior: when the user wants to target a form's audience, include BOTH types for the same form_id+owner_id (Meta auto-renders lead forms on both surfaces). Only restrict to one surface if the user explicitly asks.
  - The audience auto-populates from lead-form engagement events — no manual user upload needed.
  - Multiple lead forms can be combined in a single rule by adding more event_sources entries (one per type × form pair). Mix forms across different owning Pages by varying \`owner_id\` between entries.
  - Three event types (only use these; do not invent others):
    1. "lead_generation_opened" — Anyone who opened the lead form.
    2. "lead_generation_dropoff" — People who opened the form but did NOT submit.
    3. "lead_generation_submitted" — People who opened and submitted the form.
  - Example rule (anyone who opened the form, FB + IG, 90 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"lead","id":"<LEAD_FORM_ID>","owner_id":"<PAGE_ID>"},{"type":"ig_lead_generation","id":"<LEAD_FORM_ID>","owner_id":"<PAGE_ID>"}],"retention_seconds":7776000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"lead_generation_opened"}]}}]}}
  - Example rule (opened but did not submit — drop-off retargeting): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"lead","id":"<LEAD_FORM_ID>","owner_id":"<PAGE_ID>"},{"type":"ig_lead_generation","id":"<LEAD_FORM_ID>","owner_id":"<PAGE_ID>"}],"retention_seconds":7776000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"lead_generation_dropoff"}]}}]}}
  - Example rule (submitted across multiple lead forms, FB + IG): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"lead","id":"<LEAD_FORM_ID_1>","owner_id":"<PAGE_ID>"},{"type":"lead","id":"<LEAD_FORM_ID_2>","owner_id":"<PAGE_ID>"},{"type":"ig_lead_generation","id":"<LEAD_FORM_ID_1>","owner_id":"<PAGE_ID>"},{"type":"ig_lead_generation","id":"<LEAD_FORM_ID_2>","owner_id":"<PAGE_ID>"}],"retention_seconds":7776000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"lead_generation_submitted"}]}}]}}

  ##### Instant Experience Engagement (event_sources type: "canvas"):
  - For people who engaged with an Instant Experience (a.k.a. Canvas) on Facebook or Instagram.
  - Requires the Instant Experience ID (as \`id\`, internally called the canvas ID) and the owning Facebook Page ID (as \`owner_id\`). If the user does not know the Page ID that owns the Instant Experience, use the ads_get_ad_account_pages or ads_get_pages_for_business tool to look up Page IDs.
  - The audience auto-populates from Instant Experience engagement events — no manual user upload needed.
  - Multiple Instant Experiences owned by the same Page can be combined in a single rule by adding more event_sources entries (one per canvas ID, same \`owner_id\`). Mix across Pages by varying \`owner_id\` between entries.
  - Two event types (only use these; do not invent others):
    1. "instant_shopping_document_open" — People who opened the Instant Experience.
    2. "instant_shopping_element_click" — People who clicked any link/element inside the Instant Experience.
  - Example rule (anyone who opened the Instant Experience, 365 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"canvas","id":"<INSTANT_EXPERIENCE_ID>","owner_id":"<PAGE_ID>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"instant_shopping_document_open"}]}}]}}
  - Example rule (clicked any link in the Instant Experience): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"canvas","id":"<INSTANT_EXPERIENCE_ID>","owner_id":"<PAGE_ID>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"instant_shopping_element_click"}]}}]}}
  - Example rule (opened across multiple Instant Experiences from the same Page): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"canvas","id":"<INSTANT_EXPERIENCE_ID_1>","owner_id":"<PAGE_ID>"},{"type":"canvas","id":"<INSTANT_EXPERIENCE_ID_2>","owner_id":"<PAGE_ID>"}],"retention_seconds":31536000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"instant_shopping_document_open"}]}}]}}

  #### MOBILE_APP (MACA - Mobile App Custom Audience):
  - rule is REQUIRED. Must contain event_sources with type "app" and the App SDK ID (the numeric ID for an app that has integrated the Facebook App Events SDK / FB SDK and is logging app events). It is NOT the App Store / Play Store package name — it is the Meta-issued numeric app ID for the SDK-integrated app.
  - If the user does not know their App SDK ID, ask them to provide it; it is the same numeric ID used in their Facebook for Developers app dashboard for the app that integrated the SDK.
  - The audience auto-populates from app events logged by that App SDK — no manual user upload needed.
  - retention_seconds controls how long users stay in the audience (e.g., 2592000 for 30 days, 15552000 for 180 days; max is 180 days).
  - Five main targeting flows:
    1. App launchers / "anyone who opened the app": template "MACA_APP_LAUNCHED_USERS", filter on event "fb_mobile_activate_app". NO aggregation.
    2. Most active users: template "MACA_MOST_ACTIVE_USERS" with event "fb_mobile_activate_app" AND aggregation {"type":"count","method":"percentile","operator":"in_range","value":{"from":<lower>,"to":100}} — selects the top N% of app launchers by event count. Only three percentile windows are supported: top 5% (from=95), top 10% (from=90), top 25% (from=75).
    3. Top spenders by purchase amount: template "MACA_TOP_PURCHASE_USERS" with event "fb_mobile_purchase" and aggregation {"type":"sum","field":"_valueToSumInUSD","method":"percentile","operator":"in_range","value":{"from":<lower>,"to":100}}. Only three percentile windows are supported: top 5% (from=95), top 10% (from=90), top 25% (from=75).
    4. Mix of inclusion + exclusion: combine an inclusion rule (e.g., app launchers) with an exclusion rule (e.g., top purchasers) to find "engaged users who haven't yet purchased high value".
    5. Custom in-app events: use any app event the advertiser logs via the FB SDK. The event name is supplied by the advertiser — ask the user for the exact event name they log; do NOT guess or fabricate event names. filter {"field":"event","operator":"eq","value":"<EVENT_NAME>"}. The template field is OPTIONAL for custom advertiser-defined events.
  - The template field is REQUIRED for the MACA_APP_LAUNCHED_USERS, MACA_MOST_ACTIVE_USERS, and MACA_TOP_PURCHASE_USERS flows. It can be omitted for custom advertiser events.
  - When the user wants multiple rules, ASK whether they want "any" (OR) or "all" (AND) logic. The inclusions operator controls this.
  - Different App SDK IDs can be combined in the same audience (multiple event_sources entries or multiple rules).
  - Example rule (anyone who opened the app, 30 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"app","id":"<APP_SDK_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"fb_mobile_activate_app"}]},"template":"MACA_APP_LAUNCHED_USERS"}]}}
  - Example rule (most active app users — top 25% by event count, 30 days): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"app","id":"<APP_SDK_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"fb_mobile_activate_app"}]},"template":"MACA_MOST_ACTIVE_USERS","aggregation":{"type":"count","method":"percentile","operator":"in_range","value":{"from":75,"to":100}}}]}}
  - Example rule (top 25% purchasers): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"app","id":"<APP_SDK_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"fb_mobile_purchase"}]},"template":"MACA_TOP_PURCHASE_USERS","aggregation":{"type":"sum","field":"_valueToSumInUSD","method":"percentile","operator":"in_range","value":{"from":75,"to":100}}}]}}
  - Example rule (app launchers minus top 25% spenders from another app): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"app","id":"<APP_SDK_ID_A>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"fb_mobile_activate_app"}]},"template":"MACA_APP_LAUNCHED_USERS"}]},"exclusions":{"operator":"or","rules":[{"event_sources":[{"type":"app","id":"<APP_SDK_ID_B>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"fb_mobile_purchase"}]},"template":"MACA_TOP_PURCHASE_USERS","aggregation":{"type":"sum","field":"_valueToSumInUSD","method":"percentile","operator":"in_range","value":{"from":75,"to":100}}}]}}
  - Example rule (custom advertiser-defined event — ask user for the event name they log): {"inclusions":{"operator":"or","rules":[{"event_sources":[{"type":"app","id":"<APP_SDK_ID>"}],"retention_seconds":2592000,"filter":{"operator":"and","filters":[{"field":"event","operator":"eq","value":"<ADVERTISER_DEFINED_EVENT_NAME>"}]}}]}}

  #### LOOKALIKE (LAL - Lookalike Audience):
  - A lookalike finds NEW people who are most similar to an existing source audience (the "origin"). Use it to expand reach beyond a known set of users.
  - origin_audience_id is REQUIRED — the ID of an existing custom audience that this lookalike will be modeled on. The origin can be CUSTOM (DFCA), WEBSITE (WCA), ENGAGEMENT (ECA), or MOBILE_APP (MACA) — but NOT another LOOKALIKE. A lookalike of a lookalike is not allowed.
  - If the user does not have an existing source audience, prompt them to first create one (via this same tool with subtype=CUSTOM / WEBSITE / ENGAGEMENT / MOBILE_APP).
  - lookalike_ratio is REQUIRED. Range: 0.01 to 0.20 (i.e. 1% to 20%). Default: 0.01 (1%) — recommend 1% as the most similar/smallest audience; users can broaden by raising the value up to 20%. 1% = closest match; 20% = broadest, largest audience but less similar.
  - DO NOT ask the user for a country, region, or geographic location. The lookalike is always created with allow_international_seeds=true and is_parent_lal=true — Meta handles the geography automatically. Country is NOT a parameter of this tool.
  - rule, customer_file_source, is_value_based, retention_days, prefill, audience_labels are NOT used for LOOKALIKE — do not pass them.
  - The audience auto-builds from Meta's modeling — no manual user upload needed. Building takes time after creation; the audience is unavailable for ad delivery until ready.

  ## Response Guidelines:
  1. Confirm the audience was created and provide the audience_id.
  2. For CUSTOM: Remind the user to upload user data via ads_update_custom_audience_users.
  3. For WEBSITE: Inform the user that the audience will auto-populate from pixel events (no manual upload needed).
  4. For ENGAGEMENT: Inform the user that the audience will auto-populate from engagement events (no manual upload needed).
  5. For MOBILE_APP: Inform the user that the audience will auto-populate from app events (no manual upload needed).
  6. For LOOKALIKE: Inform the user that Meta will build the audience by modeling from the origin; it is unavailable for delivery until ready (typically minutes to hours). Mention the chosen ratio (e.g. "1%" for ratio=0.01) so they know how broad it is.
  7. If is_value_based is true (CUSTOM only), inform the user they can include LOOKALIKE_VALUE in the schema when uploading users.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID. Format: numeric ID without "act_" prefix.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the custom audience.`,
      },
      {
        name: 'subtype',
        type: 'string',
        required: true,
        description: `The type of custom audience to create. Values: CUSTOM (customer list / DFCA — requires customer_file_source), WEBSITE (WCA — requires rule with pixel event_sources), ENGAGEMENT (ECA — requires rule with ig_business/page/shopping_page/shopping_ig/marketplace_listings/lead/ig_lead_generation/canvas event_sources), MOBILE_APP (MACA — requires rule with app event_sources), LOOKALIKE (LAL — requires origin_audience_id and lookalike_ratio; origin must NOT itself be a LOOKALIKE).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'audience_labels',
        type: 'string',
        required: false,
        description: `Optional. For WEBSITE, ENGAGEMENT, and MOBILE_APP subtypes. A single label describing this audience. Labels help find audiences for ads more effectively. Engaged audiences: "qualified_leads", "disqualified_leads", "app_installers", "trial_users", "engaged_users". Customers: "high_value_customers", "low_value_customers", "at_risk", "disengaged", "customer_leads". Ignored for CUSTOM subtype.`,
      },
      {
        name: 'customer_file_source',
        type: 'string',
        required: false,
        description: `Required for CUSTOM subtype only. How the customer data was sourced. Values: USER_PROVIDED_ONLY (advertiser collected directly), PARTNER_PROVIDED_ONLY (from a partner), BOTH_USER_AND_PARTNER_PROVIDED (mixed sources). Ignored for WEBSITE subtype.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the audience.`,
      },
      {
        name: 'is_value_based',
        type: 'boolean',
        required: false,
        description: `Optional. For CUSTOM subtype only. Set to true to create a value-based audience for use with value optimization. Default: false. Ignored for WEBSITE subtype.`,
      },
      {
        name: 'lookalike_ratio',
        type: 'number',
        required: false,
        description: `Required for LOOKALIKE subtype only. The share of the population to match. Range: 0.01 (1%, closest match, smallest audience) to 0.20 (20%, broadest, largest audience). Default: 0.01 (1%). Ignored for non-LOOKALIKE subtypes. DO NOT ask the user for a country — geography is handled automatically (allow_international_seeds=true).`,
      },
      {
        name: 'origin_audience_id',
        type: 'string',
        required: false,
        description: `Required for LOOKALIKE subtype only. The numeric ID of an existing custom audience to model this lookalike on, passed as a string. The origin can be CUSTOM (DFCA), WEBSITE (WCA), ENGAGEMENT (ECA), or MOBILE_APP (MACA), but NOT another LOOKALIKE. Ignored for non-LOOKALIKE subtypes.`,
      },
      {
        name: 'prefill',
        type: 'boolean',
        required: false,
        description: `Optional. For WEBSITE, ENGAGEMENT, and MOBILE_APP subtypes. Whether to backfill the audience with historical data. Default: true. Ignored for CUSTOM subtype.`,
      },
      {
        name: 'retention_days',
        type: 'integer',
        required: false,
        description: `Optional. For CUSTOM subtype only. Number of days to retain audience members. Range: 1-180. Default: 180. For WEBSITE, retention is set via retention_seconds in the rule JSON.`,
      },
      {
        name: 'rule',
        type: 'string',
        required: false,
        description: `Required for WEBSITE, ENGAGEMENT, and MOBILE_APP subtypes. MUST be a JSON-encoded string, NOT a raw JSON object. Pass the rule as a single string value like "{\\"inclusions\\":{...}}", not as a nested object. Top-level structure: {"inclusions":{...}, "exclusions":{...}}. "exclusions" is optional. Each block has: {"operator":"or","rules":[<rule1>, <rule2>, ...]}. Each rule has: {"event_sources":[{"type":"<TYPE>","id":"<ID>"}], "retention_seconds":<SECONDS>, "filter":{"operator":"and","filters":[...]}, "template":"<TEMPLATE>"}. For WEBSITE: event_sources type must be "pixel". Template is REQUIRED. Three targeting flows: (1) All visitors: template "ALL_VISITORS", filter {"field":"url","operator":"i_contains","value":""} (empty value matches all). CRITICAL: do NOT use event/PageView for all visitors — use url/i_contains with empty value. (2) Specific pages: template "VISITORS_BY_URL", filter {"field":"url","operator":"i_contains","value":"<keyword>"}. (3) Time spent: template "TOP_TIME_SPENDERS", aggregation {"type":"time_spent","method":"percentile","operator":"in_range","value":{"from":75,"to":100}}. Standard/custom events: template "VISITORS_BY_URL", filter {"field":"event","operator":"eq","value":"Purchase"/"AddToCart"/"Lead"/etc}. For MOBILE_APP (MACA): event_sources type must be "app". Templates: "MACA_APP_LAUNCHED_USERS" for app launchers (event "fb_mobile_activate_app", NO aggregation); "MACA_MOST_ACTIVE_USERS" for top app users by event count (event "fb_mobile_activate_app" with aggregation {"type":"count","method":"percentile","operator":"in_range","value":{"from":<95|90|75>,"to":100}}); "MACA_TOP_PURCHASE_USERS" for top spenders (event "fb_mobile_purchase" with aggregation {"type":"sum","field":"_valueToSumInUSD","method":"percentile","operator":"in_range","value":{"from":<95|90|75>,"to":100}}). Both percentile-based templates only support top 5%, 10%, 25% windows. Template is OPTIONAL for custom advertiser-defined events; the event name comes from the advertiser (ask the user) and must not be invented. Ignored for CUSTOM subtype.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_creative_delete',
    description: `Delete an existing ad creative by ID.

  After deletion, the creative can no longer be used for new ads.

  ## Required:
  - \`creative_id\` — the numeric ID of the ad creative to delete (e.g. "123456789").

  ## When to use:
  - The user wants to delete/remove a creative — e.g. "delete creative 123456".

  ## When NOT to use:
  - The user wants to rename a creative or change its labels/status (use the update creative tool).
  - The user wants to change the creative's media, copy, link, or call-to-action — those are immutable; create a new creative instead.

  ## Notes:
  - A creative that is still attached to an active ad cannot be deleted; detach or delete those ads first, then retry.
  - A deleted creative no longer appears when listing an account's creatives, but it can still be looked up directly by its ID.

  ## Response:
  Returns the \`creative_id\` and \`success\`.`,
    params: [
      {
        name: 'creative_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the ad creative to delete (e.g. "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_creative_update',
    description: `Update the MAPI-documented writable fields of an existing ad creative by ID.

  ## Editable fields (provide at least one):
  - \`name\` — rename the creative as seen in the ad account's library. Must be non-empty when provided. A deleted creative can still be renamed.
  - \`status\` — set a non-deleted creative's status to \`ACTIVE\`. \`ACTIVE\` is the only accepted value; use the delete creative tool to delete a creative.
  - \`adlabels\` — a JSON array of ad-label specs, each \`{"id":"..."}\` or \`{"name":"..."}\` (e.g. \`[{"name":"Q3 Launch"}]\`).
  - \`adlabels_operation\` — how to apply \`adlabels\`: \`set\` (default; replaces existing labels), \`add\`, or \`remove\`. Requires \`adlabels\`.

  ## When to use:
  - The user wants to rename a creative — e.g. "rename creative 123456 to Summer Sale".
  - The user wants to set a non-deleted creative's status to ACTIVE.
  - The user wants to set, add, or remove ad labels on a creative.

  ## When NOT to use:
  - The user wants to delete a creative (use the delete creative tool).
  - For a deleted creative, only its name can be updated; its status and labels cannot be changed.
  - The user wants to change the creative's media, copy, link, or call-to-action — those are immutable; create a new creative instead.
  - The user wants to update the ad itself (targeting, budget, schedule), not the creative.

  ## Response:
  Returns the \`creative_id\` and \`success\`. Use \`ads_get_creatives\` afterward to inspect the updated creative.`,
    params: [
      {
        name: 'creative_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the ad creative to update (e.g. "123456789").`,
      },
      {
        name: 'adlabels',
        type: 'string',
        required: false,
        description: `JSON array of ad label specs, each {"id":"..."} or {"name":"..."}. Example: [{"name":"My Label"}]`,
      },
      {
        name: 'adlabels_operation',
        type: 'string',
        required: false,
        description: `How to apply adlabels: "set" (default; replaces existing labels), "add", or "remove". Requires adlabels.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the creative as seen in the ad account's library. Must be non-empty when provided.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Set a non-deleted creative's status to "ACTIVE". ACTIVE is the only accepted value; use the delete creative tool to delete a creative. A deleted creative can only be renamed.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_creative_upload_image',
    description: `Upload an image to an advertiser's ad account image library from a publicly accessible URL. The server downloads the image and stores it. Returns the image hash needed to create ad creatives.

  ## When to use:
  - The user wants to upload an image to their ad account from a URL.
  - The user needs an image hash to create an ad creative but hasn't uploaded the image yet.

  ## When NOT to use:
  - The user already has an image hash (no upload needed).
  - The user wants to upload a video (not yet supported).
  - The user wants to list existing images (use ads_get_ad_images instead).

  ## Notes:
  - Supported formats: JPEG, PNG, GIF. Maximum file size: 30 MB.
  - Minimum dimensions: 1x1 pixel.
  - Duplicate images (same content) return the existing image hash without creating a new entry.
  - The \`image_url\` must be a direct, publicly accessible link — the server fetches the image bytes from this URL with no authentication.
  - Google Drive, Dropbox, and similar cloud/share links are NOT supported yet: they require sign-in or return an interstitial HTML page instead of the raw image, so the fetch will fail. Provide a direct image URL (e.g. a CDN link).`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (numeric, without "act_" prefix).`,
      },
      {
        name: 'image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible URL of the image to upload. The server downloads the image from this URL and stores it in the ad account image library.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional name for the image in the account library. If omitted, a name is auto-assigned.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_creative_upload_video',
    description: `Upload a video to an advertiser's ad account video library from a publicly accessible URL. The server downloads the video and stores it. Returns the video_id needed to create video ad creatives.

  ## When to use:
  - The user wants to upload a video to their ad account from a URL.
  - The user needs a video_id to create a video ad creative but hasn't uploaded the video yet.

  ## When NOT to use:
  - The user already has a video_id (no upload needed).
  - The user wants to upload an image (use ads_creative_upload_image instead).
  - The user wants to list existing videos (use ads_get_ad_videos instead).

  ## Notes:
  - The \`video_url\` must be a direct, publicly accessible link — the server fetches the video bytes from this URL with no authentication.
  - Google Drive, Dropbox, and similar cloud/share links are NOT supported yet: they require sign-in or return an interstitial HTML page instead of the raw video, so the fetch will fail. Provide a direct video URL (e.g. a CDN link).
  - Video processing (encoding) is asynchronous. This tool returns immediately with video_status 'processing'; the returned video_id is a durable handle. Poll ads_get_ad_videos with the video_id until status.video_status is 'ready' before using it in a creative.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (numeric, without "act_" prefix).`,
      },
      {
        name: 'video_url',
        type: 'string',
        required: true,
        description: `Publicly accessible URL of the video to upload. The server downloads the video from this URL and stores it in the ad account video library.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional title/name for the video in the account library.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_delete_custom_audience',
    description: `Permanently deletes a custom audience by its ID.

  ## When to use:
  - Call this tool when the user explicitly asks to delete or remove a custom audience.
  - Use when cleaning up unused or outdated audiences.

  ## When NOT to use:
  - Do NOT use to remove users from an audience — use ads_update_custom_audience_users with operation="REMOVE" instead.
  - Do NOT use to pause or deactivate an audience — deletion is permanent and irreversible.
  - Do NOT use on audiences that have active lookalike audiences derived from them — delete the lookalikes first.
  - Do NOT use on system-managed audiences — only user-created custom audiences can be deleted.

  ## CRITICAL:
  - Deletion is PERMANENT and cannot be undone. Always confirm with the user before calling this tool.
  - If the audience has existing lookalike audiences, those must be deleted first. The tool will return an error listing this requirement.
  - Any active ad sets using this audience will be automatically paused before deletion.
  - Audiences with child audiences cannot be deleted — delete the children first.
  - Certain lookalike audiences derived from promoted posts cannot be deleted via this tool — the error message will indicate this limitation.

  ## Response Guidelines:
  1. BEFORE calling this tool, you MUST first call ads_get_custom_audience_adsets to check which ad sets use this audience.
  2. Present the list of ad sets (by name and ID) to the user and warn them about ALL THREE of the following:
     a. Deletion is PERMANENT and cannot be undone.
     b. If the audience has lookalike audiences, those must be deleted first or the call will fail.
     c. The listed ad sets will be automatically paused upon deletion.
     Ask the user to confirm they want to proceed after presenting these warnings.
  3. If the tool returns success, inform the user the audience has been permanently deleted and the listed ad sets have been paused.
  4. If the error mentions lookalike audiences, advise the user to delete those first, then retry.
  5. If the error mentions child audiences, advise the user to delete the children first.`,
    params: [
      {
        name: 'custom_audience_id',
        type: 'string',
        required: true,
        description: `The ID of the custom audience to delete. Format: numeric ID.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_abtest_create_test',
    description: `Create an A/B test (split test). Supports campaign-level (L3), ad-set-level (L2), and creative-level (L1) tests. At least 2 cells are required; the maximum depends on the test type and ad account eligibility. Provide exactly one ad entity ID in each cell. The test runs for a specified duration.

  KPIs: the primary KPI defaults to cost_per_result and determines the test winner. To use a different primary KPI, pass \`primary_kpi\` using one of the supported values below. To also measure additional KPIs that are reported but do NOT affect the winner, pass \`secondary_kpis\` as an array.

  Supported primary_kpi values (most common):
  - "cost_per_result" (default — recommended for most tests)
  - "cpp" (cost per 1000 people reached)
  - "cost_per_action_type:link_click" (cost per link click)
  - "cost_per_action_type:lead" (cost per lead)
  - "cost_per_action_type:omni_purchase" (cost per purchase)
  - "cost_per_action_type:omni_add_to_cart" (cost per add-to-cart)
  - "cost_per_action_type:omni_complete_registration" (cost per registration)
  - "cost_per_action_type:omni_app_install" (cost per app install)
  - "cost_per_action_type:video_view" (cost per video view / ThruPlay)
  - "cost_per_action_type:landing_page_view" (cost per landing page view)
  - "cost_per_action_type:post_engagement" (cost per post engagement)
  - "cost_per_action_type:onsite_conversion.messaging_first_reply" (cost per messaging conversation)
  - "cost_per_estimated_ad_recallers" (cost per estimated ad recall lift)

  Important: Do NOT use shorthand forms like "cost_per_link_click" or "cost_per_lead". Always use the "cost_per_action_type:<action>" format shown above. An unsupported KPI (or a secondary KPI that duplicates the primary or another secondary) is rejected with the list of supported values, so surface that list to the user rather than silently falling back. Omit primary_kpi to default to cost_per_result (recommended for most cases).`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (e.g. "act_123456789").`,
      },
      {
        name: 'cells',
        type: 'array',
        required: true,
        description: `Test cells, with exactly one ad entity ID in each cell. At least 2 cells are required; the maximum depends on the test type and ad account eligibility. The test level (campaign, ad set, or creative) is auto-detected from the entity types.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'budget_percentage',
        type: 'integer',
        required: false,
        description: `Optional lifetime budget percentage for creative tests. Defaults to 20%. Only applies when the parent campaign uses lifetime budget.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Optional end date as a YYYY-MM-DD string (e.g. "2026-05-30"). Do NOT compute Unix timestamps — always use the date string format. Automatically rounded to midnight in the ad account timezone. Defaults to 7 days from start.`,
      },
      {
        name: 'primary_kpi',
        type: 'string',
        required: false,
        description: `Optional primary KPI (success metric) for the test. The primary KPI determines the test winner. For conversion KPIs use the exact format "cost_per_action_type:<action>" (e.g. "cost_per_action_type:link_click", "cost_per_action_type:omni_purchase"). Other valid values: "cost_per_result" (default), "cpp", "cost_per_estimated_ad_recallers". Do NOT use shorthand like "cost_per_link_click". Unsupported values are rejected with the list of supported KPIs. Omit to default to cost_per_result.`,
      },
      {
        name: 'secondary_kpis',
        type: 'array',
        required: false,
        description: `Optional additional KPIs to measure alongside the primary KPI. Each is measured and reported but does NOT affect which variant wins. Each value must be one of the KPIs supported by the winner-calculation pipeline, must differ from primary_kpi, and must not repeat another secondary KPI; unsupported or duplicate values are rejected with the list of supported KPIs. Omit if you only need the primary KPI.`,
      },
      {
        name: 'test_name',
        type: 'string',
        required: false,
        description: `Optional name for the test study.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_abtest_get_test',
    description: `Returns details of a specific A/B test by its study ID—name, status, type, start/end dates, and the cells with their assigned ad entities. Use this when the user asks about a specific test by ID, or to confirm a test's configuration after creating it.

  Only study_id is required — the ad account is automatically resolved from the study, so do not ask the user for it.

  Note: "A/B test" and "split test" are referring to the same thing. You can mirror the user's preferred terminology.

  A/B tests isolate the impact of a single variable (creative, audience, or placement) so advertisers can learn what drives results.
  **When interpreting outcomes, focus on business-outcome metrics like cost per result rather than surface metrics like CPM, and evaluate the winning variant against the advertiser's actual objective.**

  ## Performance metrics (spend, cost per result, etc.):
  This tool does NOT return spend or cost metrics. ONLY when the user asks about performance metrics (spend, cost per result, CPM, etc.) should you call \`ads_get_ad_entities\`. Do NOT call \`ads_get_ad_entities\` for configuration questions — dates, budget, cells, objectives, or winner — answer those from this tool's response alone.

  When metrics ARE requested, call \`ads_get_ad_entities\` scoped to this study:
  - \`level\`: the \`ad_entity_level\` field returned here ("campaign", "adset", or "ad").
  - \`filtering\`: \`[{"field":"id","operator":"IN","value":["<each cell's ad_entity_ids>"]}]\`.
  - \`time_range\`: \`{"since":"<metrics_window_start>","until":"<metrics_window_end>"}\` — both are already \`YYYY-MM-DD\` in the ad account's timezone (the same tz ads_get_ad_entities applies to \`time_range\`) and reflect the window Test & Learn sums over. Use \`metrics_window_*\`, NOT \`start_time\`/\`end_time\` (those are the study schedule).

  Do NOT rely on the default date window — it falls back to the current month (\`this_month\`) and will not match the study period. If \`ad_entity_level\` is null the cells span mixed levels; ask the user rather than guessing the level.

  For creative tests (\`winner_result.is_creative_test\` = true), the configured test-ad budget is returned directly as \`test_ad_daily_budget\` (a fixed daily budget) or \`test_ad_lifetime_budget_percentage\` (a percentage of the existing lifetime budget); answer test-ad budget questions from those without calling \`ads_get_ad_entities\`.

  ## When to use:
  - When the user asks about a specific study by ID
  - When the user wants test results, winner, or high performers
  - After creating a test, to confirm its configuration

  ## When not to use:
  - Do not use this to list or discover tests—use ads_experiment_list_tests instead.`,
    params: [
      {
        name: 'study_id',
        type: 'string',
        required: true,
        description: `The study ID of the split test to fetch.`,
      },
      {
        name: 'ad_account_id',
        type: 'string',
        required: false,
        description: `Do not ask the user for this. Automatically inferred from the study. Only provide if already known.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_abtest_update_test',
    description: `Edits or cancels a running A/B test by study ID. Only the study ID and action are required—the ad account is resolved automatically.

  **Supported actions:**
  - "cancel" stops the test with no results preserved.
  - "end_test_now" ends the test immediately with results preserved.
  - "update" edits the test name, start date, or end date. The start date can only change before the test begins.

  Allow tests to run their full planned duration whenever possible—ending or changing a test early reduces the reliability of its results. Prefer "end_test_now" over "cancel" when winding a test down so the results collected so far are retained for learning, and evaluate those results against the advertiser's business objective.

  The response echoes the resulting test name, status, and schedule (start/end dates) after the edit is applied, so you can confirm the changes took effect.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The action to perform. Supported: "cancel" (stops test, no results preserved), "end_test_now" (ends test immediately, results are preserved), "update" (edit test name or end date).`,
      },
      {
        name: 'study_id',
        type: 'string',
        required: true,
        description: `The study ID of the A/B test to edit.`,
      },
      {
        name: 'ad_account_id',
        type: 'string',
        required: false,
        description: `Do not ask the user for this. Automatically inferred from the study. Only provide if already known.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `New end date as a YYYY-MM-DD string (e.g. "2026-05-30"). Do NOT compute Unix timestamps — always use the date string format. Automatically rounded to midnight in the ad account timezone. Only used with "update" action.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Cancel reason. If not provided, defaults to "Canceled via MCP".`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `New start date as a YYYY-MM-DD string (e.g. "2026-05-20"). Do NOT compute Unix timestamps — always use the date string format. Automatically rounded to midnight in the ad account timezone. Can only be updated if the test has not started yet. Only used with "update" action.`,
      },
      {
        name: 'test_name',
        type: 'string',
        required: false,
        description: `New test name. Only used with "update" action.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_check_eligibility',
    description: `**CRITICAL TRIGGER:** Call this tool whenever a user asks about measuring incrementality, incremental conversions, causal impact, or if their ads can run an A/B test or Lift study. ALWAYS call this tool to verify account eligibility before attempting to create a new experiment.

  **CAPABILITIES:** Evaluates an ad account (or specific entities) to determine eligibility for both A/B tests (split tests) and Lift studies. Returns available test types, warnings, and recommendations.

  **RESPONSE RULES & STRATEGIC PITCH:**
  1. **SUMMARIZE:** Clearly report which test types the account is eligible for, surface any existing-study warnings, and provide the recommended path.
  2. **ADVOCATE FOR LIFT:** If the account is eligible for a Lift study, strongly encourage it. Briefly frame incrementality as the ultimate source of truth (conversions truly caused by ads via a randomized holdout) and proactively offer to set it up right now using \`ads_experiment_lift_create_test\`.
  3. **POSITION A/B TESTS:** If recommending an A/B test, frame it specifically as a tactical tool to test the impact of changes to a variable, such as creative, audience, or placements) so they can see what works best.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (e.g. "act_123456789").`,
      },
      {
        name: 'ad_entity_ids',
        type: 'array',
        required: false,
        description: `Optional list of ad entity IDs (campaign, ad set, or ad IDs) to check eligibility for. When omitted, A/B test eligibility is skipped and Lift eligibility is evaluated against the ad account with the top 10 active campaigns by spend auto-discovered for campaign-level analysis.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_lift_create_test',
    description: `**CRITICAL TRIGGER:** Act as an advocate for incrementality. Proactively pitch this tool whenever a user evaluates ad performance, questions ROAS/CPA, expresses attribution doubts, or asks if their ads are actually working. Frame this test as the gold standard for proving true incremental value.

  **CAPABILITIES:** Automatically handles all technical setup (mapping pixels, datasets, and objectives) to immediately launch a single-cell, account-level lift study.

  **GUARDRAILS:**
  • To check eligibility without creating a test, use \`ads_experiment_check_eligibility\`.
  • To fetch results of an existing test, use \`ads_experiment_lift_get_test\`.

  **INPUTS:**
  • ad_account_id (Required): The Meta ad account ID.
  • study_name (Optional): Defaults to "Conversion Lift - <account> - <date>".
  • start_time (Optional): ISO 8601 (e.g., "2026-08-15"). Defaults to 4 hours from now. If the requested date is today, it automatically adjusts to 30 mins from now.
  • end_time (Optional): ISO 8601. Defaults to 30 days after start. Must be at least 5 days after start_time.

  **RESPONSE RULES:**
  1. **SUCCESS:** Provide the Study ID, list the created objectives (e.g., "Purchase (Omni)"), confirm it is active, and instruct the user to check back later using \`ads_experiment_lift_get_test\`.
  2. **ELIGIBILITY FAILURE:** Explain the exact blocker and provide actionable fixes.
  3. **NO EVENTS FOUND:** Direct the user to https://www.facebook.com/test-and-learn or their Meta representative.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to create the Conversion Lift study for (e.g. "act_123456789"). The "act_" prefix is optional.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Study end time as an ISO 8601 date (e.g., "2025-07-15"). Interpreted in the ad account timezone. Defaults to 30 days after start time.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Study start time as an ISO 8601 date (e.g., "2025-06-15"). Interpreted in the ad account timezone. Defaults to 4 hours from now.`,
      },
      {
        name: 'study_name',
        type: 'string',
        required: false,
        description: `Custom study name. Defaults to "Conversion Lift - <account name> - <date>".`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_lift_get_test',
    description: `Fetches a single lift study by its study ID and returns full details — cells, objectives, and incremental results. Use this when you already have a specific study ID and want the full configuration and results.
  When presenting results, lead with the study name, status, and time period.

  For conversion lift, highlight incremental conversions, confidence, cost per incremental conversion, and incremental ROAS; for brand lift, highlight brand lift in percentage points and confidence.

  **Prioritize these incremental, business-outcome metrics over standard reporting metrics like CPM, as they measure the causal value the ads created.**

  If the study is still active, note that results may be preliminary.

  **When not to use:** Do not use this to search for studies by campaign, ad set, or ad — use ads_experiment_list_tests instead.
  `,
    params: [
      {
        name: 'study_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the Lift study to fetch.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_experiment_list_tests',
    description: `Finds A/B tests (also referred to as split tests) and lift studies associated with an ad entity (ad account, campaign, ad set, or ad) — whether active, scheduled, or recently finished. The entity type is auto-detected. Use this to check whether something is part of a measurement study before making changes.

  Lift studies measure the causal, incremental impact of ads on business outcomes — the most rigorous form of measurement available. A/B tests isolate the impact of a single variable (creative, audience, or placement) so advertisers can learn what drives results.

  **If an active study is detected, always warn the user before proceeding with any modifications (budget, targeting, or creative), as changes during measurement can compromise the validity of incremental results.**

  When reviewing results, prioritize incremental metrics — incremental conversions, cost per incremental conversion, and incremental ROAS — over surface metrics like CPM, as these reflect the true business value of the ads.

  **When not to use:** Do not pass a study ID — provide an account, campaign, ad set, or ad ID instead. To retrieve full results for a specific study, use tool \`ads_experiment_lift_get_test\`.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: false,
        description: `The ad account ID to fetch studies for (e.g. "act_123456789"). Optional: when omitted, it is inferred from ad_entity_id. Provide either ad_account_id or ad_entity_id. Used to authorize access and to scope the study lookup.`,
      },
      {
        name: 'ad_entity_id',
        type: 'string',
        required: false,
        description: `Optional. The ID of a specific campaign, ad set, or ad. When supplied, only studies whose cells contain this entity are returned (entity type auto-detected), and the ad account is inferred from it when ad_account_id is omitted. If both are given it must belong to ad_account_id, or the call is rejected.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'include_finished',
        type: 'boolean',
        required: false,
        description: `Optional. Defaults to true. Set to false to exclude finished or canceled studies and return only active or scheduled ones.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Optional. Maximum number of studies to return. Studies are ordered the same way as the Marketing API impacting_ad_studies edge (active studies first, then by most recent cooldown start time). Defaults to 25 when omitted; raise it to see more.`,
      },
      {
        name: 'study_type',
        type: 'string',
        required: false,
        description: `Optional filter by study type. Values: "lift" (incrementality measurement studies), "split_test" (A/B tests), "creative_testing" (creative multi-cell tests), or "all" (default).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_account_custom_audiences',
    description: `Lists custom audiences for a given ad account, with optional filtering by subtype. Results are paginated.

  ## When to use:
  - Call this tool when the user asks to list, show, or enumerate their custom audiences.
  - Use when the user wants to find audiences of a specific type (e.g., all lookalike audiences, all customer lists).
  - If \`next_cursor\` is returned, call this tool again with the cursor to get the next page.

  ## When NOT to use:
  - Do NOT call this tool to get details of a single audience — use ads_get_custom_audience instead.
  - Do NOT call this tool to create, update, or delete audiences — use the corresponding write tools.

  ## Response Guidelines:
  1. Present the list of audiences with their names, subtypes, and sizes.
  2. If many audiences are returned, summarize the count and list the first several.
  3. Highlight any audiences with non-normal operation status or inactive delivery status.
  4. If \`next_cursor\` is non-null, inform the user there are more audiences and offer to fetch the next page.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to list custom audiences for. Format: numeric ID without "act_" prefix.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call. Use the next_cursor value returned by the previous call. Do NOT hallucinate a cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of audiences to return per page. Defaults to 25 if not set. Maximum 100.`,
      },
      {
        name: 'subtype_filter',
        type: 'string',
        required: false,
        description: `Optional. Filter audiences by subtype. Values: CUSTOM, WEBSITE, LOOKALIKE, APP, ENGAGEMENT, OFFLINE_CONVERSION. If omitted, returns all types.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_account_pages',
    description: `Retrieves the list of Facebook Page IDs associated with (promoted under) a given ad account. Results are paginated; default page size is 50, configurable via limit

  ## When to use:
  - Call this tool when you need to discover available Pages before creating an ad that requires a page_id (e.g., for the creative's object_story_spec).
  - Call this tool when the user asks which Pages are linked to or promoted under a specific ad account.
  - If \`next_cursor\` is returned, call this tool again with the cursor to get the next page of results.

  ## When NOT to use:
  - Do NOT call this tool if you already have the page ID from the client context or a previous call.
  - Do NOT call this tool to list the user's Pages in general — this tool is scoped to a specific ad account.

  ## Response Guidelines:
  1. Present the list of pages to the user, including their names.
  2. If many pages are returned, summarize the count and list the first several.
  3. Each entry in \`pages\` contains \`page_id\` (numeric), \`page_name\`, and \`leadgen_tos_accepted\` (bool).
  4. If \`next_cursor\` is non-null, there are more pages available. Call the tool again with the cursor to retrieve additional pages.

  ## Lead Ads Requirement:
  - Lead Generation campaigns (objective \`OUTCOME_LEADS\` with optimization_goal \`LEAD_GENERATION\` or \`QUALITY_LEAD\`) require the promoted Page to have accepted the Lead Generation Terms of Service.
  - Use the \`leadgen_tos_accepted\` field to filter pages eligible for lead ads BEFORE attempting to create one.
  - If the user picks a page where \`leadgen_tos_accepted\` is false, instruct them to accept the Lead Generation ToS at https://www.facebook.com/legal/leadgen/tos before creating the ad set.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID. Format: numeric ID without "act_" prefix.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of pages to return in one request. Defaults to 50 if not set.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_accounts',
    description: `Retrieves the list of ad account IDs that the current user has access to. Results are paginated in chunks of 50.

  ## When to use:
  - Call this tool when the user asks which ad accounts they have access to.
  - Call this tool when you need to discover the user's ad accounts before performing other operations.
  - Call this tool when the user asks to list, show, or enumerate their ad accounts.
  - If \`next_cursor\` is returned, call this tool again with the cursor to get the next page.

  ## When NOT to use:
  - Do NOT call this tool if you already have the ad account ID from the client context.
  - Do NOT call this tool for fetching ad account details, metrics, or performance data — use other tools for that.

  ## Response Guidelines:
  1. Present the list of ad accounts to the user, including their business associations.
  2. If many accounts are returned, summarize the count and list the first several.
  3. Each entry in \`ad_accounts\` contains \`ad_account_id\` (numeric), \`ad_account_name\`, \`business_id\`, \`business_name\`, and \`is_ads_mcp_enabled\`. The business fields reflect the **owning** business only. Ad accounts shared with ad agencies may have additional businesses with access that are not shown here. An empty string for \`business_id\` or \`business_name\` indicates the account has no owning business. If \`is_ads_mcp_enabled\` is false for an ad account, do NOT use that ad account id or any ad objects under it in subsequent tool calls.
  4. If \`next_cursor\` is non-null, there are more accounts available. Call the tool again with the cursor (the one that was just returned by the previous call) to retrieve additional pages.
  5. \`is_queryable\` shows the ability of account being able to use the \`ads_get_ad_entities\` tool.  If \`is_queryable\` is false, do NOT call \`ads_get_ad_entities\` for that account — instead surface \`not_queryable_reason\` to the user.`,
    params: [
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page of results. Use the result of next_cursor from your previous ads_get_ad_accounts call to populate this field. DO NOT hallucinate a cursor to populate this field.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of ad accounts to return in one request. Defaults to 50 if not set.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_entities',
    description: `WHEN TO USE:
- Use this tool to retrieve ad account data, including entities at levels of ad, adset, campaign, or account. You can specify entity metrics, metric breakdowns, or attributes. Campaign, adset, and ad requests can apply filters and sorting parameters to customize the output. Account-level requests do not support filtering or sorting.

**Workflow**:
1. Pick candidate fields from FIELDS below.
2. Verify them with \`ads_get_field_context\` (see FIELD VERIFICATION).
3. Call ads_get_ad_entities.

**Precondition**:
- If you don't already know whether the target ad account is queryable, call ads_get_ad_accounts first and check \`is_queryable\`. If false, surface \`not_queryable_reason\` to the user instead of calling this tool. Note: \`is_queryable=true\` is best-effort - the call may still fail for transient or input-related reasons.

**Time range (required for metrics, filtering, sorting)**:
- Metric retrieval, filtering on metrics, and sorting on metrics ONLY work when a time range is supplied. Without one, the tool returns attributes only.
- Provide one of:
  - \`date_preset\` (string). Options: today, yesterday, this_month, last_month, this_quarter, last_3d, last_7d, last_14d, last_30d, last_90d, last_week_sun_sat, last_quarter, last_year, this_week_sun_today, this_year, maximum.
  - \`time_range\` (string, JSON): \`'{"since":"YYYY-MM-DD","until":"YYYY-MM-DD"}'\`.
- Do not pass both \`date_preset\` and \`time_range\`.

Limitations:
- Account-level requests do not support \`filtering\` or \`sort\`. Do not pass those parameters when \`level\` is \`ad_account\` or \`account\`.
- This tool has a limit on the total number of ad entities it can return. As a result, it may only return a subset of ad entities that satisfy the criteria, not all of them. To retrieve both the highest and lowest values of a specified metric, you will need to call this tool twice, using opposite sorting directions for each call.
- Do not call the tool repeatedly with the same parameters.
- Only the parameters defined in the tool's **Arguments** section are valid. Do not assume, invent, or use any parameters that are not explicitly listed.

DO NOT:
- Request \`actions\` or \`action_values\` as a standalone field. Check the available fields below.
- Pass any field that is not listed in the FIELDS section for the level you are querying. Fields are level-scoped — a field valid at \`campaign\` may not exist at \`ad\`, and vice versa.
- Pass any operator that is not in \`supported_filter_operators\` for that field.
- Pass any enum value that is not in \`enum_values\` for that field.
- Invent parameter names, field names, operators, or enum values. If it isn't in the catalog or the Arguments section, it is not supported.

VALID FILTERING EXAMPLES (value is always an array of strings):
- {"field":"effective_status","operator":"IN","value":["ACTIVE"]}
- {"field":"name","operator":"CONTAIN","value":["summer"]}
- {"field":"name","operator":"CONTAINS_ANY","value":["summer","spring"]}
- {"field":"amount_spent","operator":"GREATER_THAN","value":["100"]}
- {"field":"impressions","operator":"IN_RANGE","value":["1000","10000"]}

FIELDS (comma separated):

Common to all levels (campaign, adset, ad, ad_account):
actions:comment, actions:like, actions:link_click, actions:omni_purchase, actions:page_engagement, actions:post_reaction, actions:post_save, amount_spent, app_custom_event_fb_mobile_purchase, app_install, average_purchases_conversion_value, clicks, cost_per_2_sec_continuous_video_view, cost_per_action_type, cost_per_conversion, cost_per_lead, cost_per_link_click, cost_per_link_click_result, cost_per_omni_add_to_cart, cost_per_omni_app_install, cost_per_omni_complete_registration, cost_per_omni_initiated_checkout, cost_per_omni_landing_page_view, cost_per_omni_purchase, cost_per_outbound_click, cost_per_thruplay, cost_per_video_view, cpc, cpm, cpp, ctr, frequency, id, impressions, instagram_profile_follow_v2, landing_page_view, lead, media_views, mobile_app_install, mobile_app_purchase_roas, name, offline_conversion_purchase, offsite_conversion_fb_pixel_purchase, offsite_conversion_fb_pixel_purchase_values, omni_add_to_cart, omni_app_install, omni_complete_registration, omni_initiated_checkout, omni_landing_page_view, omni_purchase_values, omni_view_content, onsite_conversion_lead_grouped, onsite_conversion_purchase, outbound_clicks, outbound_clicks_ctr, post_engagement, purchase_roas, reach, result_roas, result_values, results, shop_clicks, unique_link_click, unique_link_clicks_ctr, video_avg_time_watched_actions, video_continuous_2_sec_watched_actions, video_p100_watched_actions, video_p25_watched_actions, video_p50_watched_actions, video_p75_watched_actions, video_p95_watched_actions, video_play_actions, video_thruplay_watched_actions, website_ctr, website_purchase_roas

campaign (additional):
3_second_video_plays, ad_creation_package_config, bid_strategy, buying_type, conversions, cost_per_result, created_time, daily_budget, delivery, effective_status, lifetime_budget, objective, post_shares, start_time, status, stop_time, updated_time

adset (additional):
3_second_video_plays, attribution_setting, bid_strategy, campaign_id, cost_per_result, created_time, daily_budget, delivery, delivery_sub_status, effective_status, end_time, lifetime_budget, optimization_goal, post_shares, start_time, status, stop_time, targeting, updated_time

ad (additional):
adset_id, campaign_id, cost_per_result, created_time, creative_id, delivery, effective_status, objective, status, updated_time

ad_account (additional):
3_second_video_plays, post_shares, timezone_name

FIELD VERIFICATION (required):
Before passing any name in \`fields\`, \`filtering\`, or \`sort\`, call \`ads_get_field_context\` to verify it. Unverified field names will fail. The response is the source of truth for \`levels\`, \`filterable\`, \`sortable\`, \`supported_filter_operators\`, and \`enum_values\`.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to query. This is a numeric ID (e.g., "123456789").`,
      },
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Metrics or attributes of the associated entity_type to fetch. Select the most relevant from the **Field List**. Ensure to include the \`id\` and \`name\` field. Do not select a field_name for the \`fields\` parameter if its corresponding **level** is specified but not included in **fetchable_levels**.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'breakdowns',
        type: 'array',
        required: false,
        description: `Only ONE breakdown per call is supported — if you provide multiple, only the first will be used (the others are ignored and noted in the response). If the result is empty when a breakdown is applied, retry this call without the \`breakdowns\` parameter to retrieve unsegmented data.

  Optional breakdowns for fetching metrics. It helps you understand how different groups or contexts contribute to the fetched metrics. Available options include
      - action_device: The device on which the conversion event you're tracking occurred. For example, Desktop if someone converted on a desktop computer.
  - action_canvas_component_name: Name of a component within a Canvas ad.
  - action_carousel_card_id: The ID of the specific carousel card that people engaged with when they saw your ad.
  - action_carousel_card_name: The specific carousel card that people engaged with when they saw your ad. The cards are identified by their headlines.
  - action_destination: The destination where people go after clicking on your ad. This could be your Facebook Page, an external URL for your conversion pixel or an app configured with the software development kit (SDK).
  - action_reaction: The number of reactions on your ads or boosted posts. The reactions button on an ad allows people to share different reactions on its content: Like, Love, Haha, Wow, Sad or Angry.
  - action_target_id: The ID of destination where people go after clicking on your ad. This could be your Facebook Page, an external URL for your conversion pixel or an app configured with the software development kit (SDK).
  - action_type: The kind of actions taken on your ad, Page, app or event after your ad was served to someone, even if they didn't click on it. Action types include Page likes, app installs, conversions, event responses, and more.
  - action_video_sound: The sound status (on/off) when someone plays your video ad.
  - action_video_type: Video metrics breakdown.
  - ad_format_asset: The ID of the ad format asset involved in impression, click, or action.
  - age: The age range of the people you've reached.
  - app_id: The ID of the application associated with the ad account or campaign requested. The application information, including its ID, is viewable in the App Dashboard. This breakdown is only supported by the total_postbacks field.
  - body_asset: The ID of the body asset involved in impression, click, or action.
  - call_to_action_asset: The ID of the call to action asset involved in impression, click, or action.
  - country: The country where the people you've reached are located. This is based on information, such as a person's hometown, their current city, and the geographical location where they tend to be when they visit Meta.
  - description_asset: The ID of the description asset involved in impression, click, or action.
  - device_platform: The type of device, mobile or desktop, used by people when they viewed or clicked on an ad, as shown in ads reporting.
  - dma: The Designated Market Area (DMA) regions are the 210 geographic areas in the United States in which local television viewing is measured by The Nielsen Company.
  - frequency_value: The number of times an ad in your Reach and Frequency campaign was served to each Meta Account.
  - gender: Gender of people you've reached. People who don't list their gender are shown as 'not specified'.
  - hourly_stats_aggregated_by_advertiser_time_zone: Hourly breakdown aggregated by the time ads were delivered in the advertiser's time zone. For example, if your ads are scheduled to run from 9 AM to 11 AM, but they reach audiences in multiple time zones, they may deliver from 9 AM to 1 PM in the advertiser's time zone. Stats will be aggregated into four groups 9 AM - 10 AM, 10 AM - 11 AM, 11 AM - 12 PM, and 12 PM - 1 PM.
  - hourly_stats_aggregated_by_audience_time_zone: Hourly breakdown aggregated by the time ads were delivered in the audiences' time zone. For example, if your ads are scheduled to run from 9:00 am to 11:00 am, but they reach audiences in multiple time zones, they may deliver from 9:00 am to 1:00 pm in the advertiser's time zone. Stats are aggregated into 2 groups: 9:00 am to 10:00 am and 10:00 am to 11:00 am.
  - image_asset: The ID of the image asset involved in impression, click, or action.
  - impression_device: The device where your last ad was served to someone on Meta. For example iPhone if someone viewed your ad on an iPhone.
  - is_conversion_id_modeled: A boolean flag that indicates whether the conversion_bits are modeled. A 0 indicates conversion_bits aren't modeled, and a 1 indicates that conversion_bits are modeled. This breakdown is only supported by the total_postbacks_detailed field.
  - link_url_asset: The ID of the URL asset involved in impression, click or action.
  - place_page_id: The ID of the place page involved in impression or click. Account-level insights and page_place_id are not compatible with each other, so they cannot be queried together.
  - platform_position: Where your ad was shown within a platform, for example on Facebook desktop Feed, or Instagram Mobile Feed.
  - product_id: The ID of the product involved in impression, click, or action.
  - publisher_platform: Which platform your ad was shown, for example on Facebook, Instagram, or Audience Network.
  - region: The regions where the people you've reached are located. This is based on information such as a person's hometown, their current city and the geographical location where they tend to be when they visit Facebook.
  - skan_campaign_id: The raw campaign ID received as a part of Skan postback from iOS 15+. Note: This breakdown is only supported by the total_postbacks_detailed field.
  - skan_conversion_id: The assigned Conversion ID (also referred to as Priority ID) of the event and/or event bundle configured in the application's SKAdNetwork configuration schema. The app events configuration can be viewed and adjusted in Meta Events Manager. You can learn more about configuring your app events for Apple's SKAdNetwork here. Note: This breakdown is only supported by the total_postbacks field.
  - title_asset: The ID of the title asset involved in impression, click or action.
  - user_segment_key: User segment (ex: new, existing) of Advantage+ Shopping Campaigns (ASC). Existing user is specified by the custom audience in ASC settings.
  - video_asset: The ID of the video asset involved in impression, click or action.`,
      },
      {
        name: 'date_preset',
        type: 'string',
        required: false,
        description: `Date range preset. Options: today, yesterday, this_month, last_month, this_quarter, last_3d, last_7d, last_14d, last_30d, last_90d, last_week_sun_sat, last_quarter, last_year, this_week_sun_today, this_year, maximum.`,
      },
      {
        name: 'filtering',
        type: 'array',
        required: false,
        description: `Refine entity results based on specific criteria. Each filter must contain the following properties. Do not use a field for \`filtering\` if it is marked as unfilterable. You must select the most appropriate **field**, **operator**, and **value** based on the predefined **Field List** Account-level requests do not support filtering or sorting.`,
      },
      {
        name: 'level',
        type: 'string',
        required: false,
        description: `Type of entity to retrieve: 'ad_account', 'campaign', 'adset', or 'ad'. \`account\` is also accepted as an alias.
  - CRITICAL: Always set this when user's language implies scope.
  - If the query mentions my account, entire account, or overall performance and does not mention a specific campaign, ad set, or ad -> use level = ad_account.
  - Account-level requests do not support \`filtering\` or \`sort\`.
  - If uncertain about the level, use \`campaign\` when filtering or sorting is needed; otherwise, set the level to \`ad_account\`.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of entities to retrieve. Maximum allowed is 1000. Apply this parameter only if the user wants a certain number of entities.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Include a sorting metric and a sorting direction (ascending or descending) separated by underscore. Format: impressions_ascending. Do not use a field as a \`sort\` parameter if it is marked as unsortable. Account-level requests do not support filtering or sorting.`,
      },
      {
        name: 'time_increment',
        type: 'string',
        required: false,
        description: `Use this parameter only to control how the results are brokendown within the selected \`time_range\` or \`date_preset\`. Valid values are: string numbers
      from \`1\` to \`90\` (inclusive) representing a time window in days, \`monthly\` or \`all_days\`. If none of these values are appropriate, omit this parameter.`,
      },
      {
        name: 'time_range',
        type: 'string',
        required: false,
        description: `Date range with \`since\` and \`until\` properties in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_images',
    description: `List ad images uploaded to an advertiser's ad account.

  **IMPORTANT — Partial results**: When called without \`hashes\`, this tool returns only \`hash\` and \`name\` for each image. Most fields (status, dimensions, URLs, timestamps) are **omitted** from listing results. If you need any field beyond \`hash\` and \`name\`, you MUST call this tool again with \`hashes\` or the \`fields\` parameter — do NOT assume a field is empty just because it was missing from a previous listing response.

  ## When to use:
  - The user wants to see what images are available in their ad account.
  - The user wants to find an image by name.
  - The user needs image hashes for creating ad creatives.
  - The user asks about specific image fields (e.g. dimensions, URLs, status) — even if images were already listed earlier, re-call this tool with \`hashes\` or \`fields\` to fetch the needed data, because the earlier listing only returned partial fields.

  ## When NOT to use:
  - The user wants to upload a new image (not yet supported).
  - The user wants to list ad creatives (use ads_get_creatives instead).

  ## Fields handling:
  - When the user asks for "details", "info", "full info", "all fields", "everything", or any other generic term indicating they want complete data, do NOT pass those words("details", "info", "full info", "all fields", "everything", etc) through \`fields\`.
  - Only pass \`fields\` when the user explicitly names specific fields they want.

  ## Notes:
  - Returns active images only, ordered by upload time (newest first).
  - The \`hash\` field uniquely identifies an image and is needed when creating ad creatives.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (numeric, without "act_" prefix).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's next_cursor.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Fields to return for each image. When omitted, all fields are returned. The hash field is always included. Supported fields: name, hash, status, width, height, original_width, original_height, url, url_128, permalink_url, created_time, updated_time.`,
      },
      {
        name: 'hashes',
        type: 'array',
        required: false,
        description: `Look up specific images by hash. When provided, ignores name, limit, and cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of images to return (default 25, max 100).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter images by name (case-insensitive substring match).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_preview',
    description: `Generate a visual preview of how an ad creative appears on Facebook, Instagram, Messenger, or other placements. CRITICAL: after this tool returns, you MUST include the returned \`preview_url\` verbatim in your reply to the user as a clickable link — this is the primary way the user opens the preview in their browser. Do NOT summarize the ad without linking \`preview_url\`; do NOT rely on the iframe rendering silently in the host UI. Provide either an ad_id (to preview an existing ad — live or draft) or a creative_id (to preview an existing creative). FALLBACK: if a call with \`ad_id\` errors (e.g. "Ad not found" on a very fresh draft ad that has not fully materialized), immediately retry with the \`creative_id\` you passed to \`ads_create_ad\` — that renders the same creative. The ad_format parameter controls which placement to preview (e.g., MOBILE_FEED_STANDARD for Facebook mobile feed, INSTAGRAM_STANDARD for Instagram feed). The response also includes preview_html (an iframe of the rendered ad), the ad creative image as a separate image content item, and creative details (body text, headline, CTA button).`,
    params: [
      {
        name: 'ad_format',
        type: 'string',
        required: false,
        description: `The placement format to preview. Options: DESKTOP_FEED_STANDARD, MOBILE_FEED_STANDARD, INSTAGRAM_STANDARD, INSTAGRAM_STORY, INSTAGRAM_REELS, RIGHT_COLUMN_STANDARD, MESSENGER_MOBILE_INBOX_MEDIA, THREADS_STREAM. Default: MOBILE_FEED_STANDARD.`,
      },
      {
        name: 'ad_id',
        type: 'string',
        required: false,
        description: `The ad ID to preview. Provide this OR creative_id.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'creative_id',
        type: 'string',
        required: false,
        description: `The creative ID to preview.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ad_videos',
    description: `List ad videos uploaded to an advertiser's ad account.

  **IMPORTANT — Partial results**: When called without \`video_ids\`, this tool returns only \`id\` and \`title\` for each video. Most fields (description, length, permalink_url, picture, timestamps) are **omitted** from listing results. If you need any field beyond \`id\` and \`title\`, you MUST call this tool again with \`video_ids\` or the \`fields\` parameter — do NOT assume a field is empty just because it was missing from a previous listing response.

  ## When to use:
  - The user wants to see what videos are available in their ad account.
  - The user needs video IDs for creating ad creatives.
  - The user asks about specific video fields (e.g. duration, description, permalink) — even if videos were already listed earlier, re-call this tool with \`video_ids\` or \`fields\` to fetch the needed data, because the earlier listing only returned partial fields.

  ## When NOT to use:
  - The user wants to upload a new video (not yet supported).
  - The user wants to list ad creatives (use ads_get_creatives instead).
  - The user wants to list ad images (use ads_get_ad_images instead).

  ## Fields handling:
  - When the user asks for "details", "info", "full info", "all fields", "everything", or any other generic term indicating they want complete data, do NOT pass those words("details", "info", "full info", "all fields", "everything", etc) through \`fields\`.
  - Only pass \`fields\` when the user explicitly names specific fields they want.

  ## Notes:
  - Returns videos with OK status only, ordered by creation time (newest first).
  - The \`id\` field is the video FBID needed when creating video ad creatives.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (numeric, without "act_" prefix).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's next_cursor.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Fields to return for each video. When omitted, all fields are returned. The id field is always included. Supported fields: id, title, description, length, created_time, updated_time, permalink_url, picture, status.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of videos to return (default 25, max 100).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter videos by title (case-insensitive substring match).`,
      },
      {
        name: 'video_ids',
        type: 'array',
        required: false,
        description: `Look up specific videos by ID. When provided, ignores title, limit, and cursor.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_creative_ads',
    description: `Get the ads (adgroups) that use a given ad creative.

  ## When to use:
  - The user wants to know which ads reference a specific creative.

  ## When NOT to use:
  - The user wants to list all ads in an account (use ads_get_ad_entities instead).
  - The user wants creative details (use ads_get_creatives instead).`,
    params: [
      {
        name: 'creative_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the ad creative (e.g. "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous next_cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of adgroups to return (default 25, max 100).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_creatives',
    description: `List ad creatives in an advertiser's ad account.

  **IMPORTANT — Partial results**: When called without \`creative_ids\`, this tool returns only \`id\`, \`name\`, \`account_id\`, and \`status\` for each creative. Most fields (body, title, link_url, image_hash, video_id, call_to_action_type, child_attachments, etc.) are **omitted** from listing results. If you need any field beyond those four, you MUST call this tool again with \`creative_ids\` or the \`fields\` parameter — do NOT assume a field is empty just because it was missing from a previous listing response.

  ## When to use:
  - The user wants to see what creatives exist in their ad account.
  - The user wants to see the details of a specific creative by given ID.
  - The user asks about specific creative fields (e.g. body text, link URL, image hash, CTA type) — even if creatives were already listed earlier, re-call this tool with \`creative_ids\` or \`fields\` to fetch the needed data, because the earlier listing only returned partial fields.

  ## When NOT to use:
  - The user wants to create or modify a creative (this tool is read-only).
  - The user wants to list images (use ads_get_ad_images instead).
  - The user wants to list videos (use ads_get_ad_videos instead).

  ## Fields handling:
  - When the user asks for "details", "info", "full info", "all fields", "everything", or any other generic term indicating they want complete data, do NOT pass those words("details", "info", "full info", "all fields", "everything", etc) through \`fields\`.
  - Only pass \`fields\` when the user explicitly names specific fields they want.

  ## Field naming:
  - Return text fields exactly as stored. Do NOT translate or rename them.
  - \`body\` is the Marketing API field name. It is called "primary text" in Ads Manager — but always return it as \`body\`.
  - \`title\` is the Marketing API field name. It is called "headline" in Ads Manager — but always return it as \`title\`.
  - In \`child_attachments\`, \`name\` is called "headline" in Ads Manager and \`description\` is the card description.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID (numeric, without "act_" prefix).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'creative_ids',
        type: 'array',
        required: false,
        description: `Look up specific creatives by ID. When provided, ignores limit and cursor.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous next_cursor.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Fields to return for each creative. When omitted, all fields are returned. The id field is always included. Supported fields: id, name, status, account_id, object_type, body, title, link_url, image_hash, image_url, video_id, thumbnail_url, call_to_action_type, object_story_id, effective_object_story_id, effective_instagram_media_id, product_set_id, child_attachments.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum creatives to return (default 25, max 100).`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_custom_audience',
    description: `Retrieves details of a specific custom audience by its ID, including size, status, delivery info, and type.

  ## When to use:
  - Call this tool when the user asks for details about a specific custom audience.
  - Use when you need to check audience size, delivery status, operation status, or subtype.
  - Use after creating or updating a custom audience to verify its current state.

  ## When NOT to use:
  - Do NOT call this tool to list all audiences in an ad account — use ads_get_ad_account_custom_audiences instead.
  - Do NOT call this tool to create, update, or delete audiences — use the corresponding write tools.
  - Do NOT call this tool without a specific custom_audience_id.

  ## Response Guidelines:
  1. Present the audience details clearly: name, subtype, size range, delivery status, and operation status.
  2. If operation_status_code is not 200, highlight the issue and explain what it means.
  3. If delivery_status is INACTIVE or INVALID, explain to the user that the audience cannot be used for ad delivery.
  4. Include time_created and time_updated so the user knows how fresh the audience is.`,
    params: [
      {
        name: 'custom_audience_id',
        type: 'string',
        required: true,
        description: `The ID of the custom audience to retrieve. Format: numeric ID.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_custom_audience_adsets',
    description: `Returns ad sets (adgroups) that use a given custom audience in their targeting.

  ## When to use:
  - Call this tool BEFORE calling ads_delete_custom_audience to check which ad sets will be paused.
  - Use when the user wants to know which campaigns or ad sets are using a specific audience.

  ## When NOT to use:
  - Do NOT use to get audience details — use ads_get_custom_audience instead.
  - Do NOT use to list all audiences — use ads_get_ad_account_custom_audiences instead.

  ## Response Guidelines:
  1. If adsets is non-empty, list the ad sets by name and ID and warn the user these will be paused if the audience is deleted.
  2. If adsets is empty, inform the user that no ad sets are currently using this audience.
  3. If total_count exceeds the number of returned adsets, inform the user there are more ad sets not shown.`,
    params: [
      {
        name: 'custom_audience_id',
        type: 'string',
        required: true,
        description: `The ID of the custom audience to check. Format: numeric ID.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of ad sets to return. Defaults to 25 if not set. Maximum 100.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_customconversions',
    description: `Retrieves a paginated list of custom conversions for an ad account, optionally filtered to a specific dataset (pixel or offline conversion data set). Use when discovering which custom conversions exist on an ad account, auditing rules, or looking up conversion IDs before querying stats. Read-only — does not create or modify custom conversions. No metrics fields.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `Required. The ad account to query custom conversions for. Format: Numeric, with or without 'act_' prefix. Example: '123456789'. Find possible values in ads_get_ad_accounts.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's page_info.after_cursor field.`,
      },
      {
        name: 'dataset_id',
        type: 'string',
        required: false,
        description: `Optional. Filter to a single dataset (pixel or offline conversion data set). Format: Numeric. Example: '24502653920889'. Find possible values in ads_get_datasets.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum custom conversions per page. Default: 25. Maximum: 100.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_dataset_details',
    description: `Retrieves identity and configuration metadata for a dataset (also known as pixel or application), including name, status, creation time, business association, and data-use settings. Use when asking about dataset setup, active status, ownership, or configuration. Does not return event volume or signal quality — use ads_get_dataset_stats for event counts, or ads_get_dataset_quality for match quality and freshness. Flag inactive datasets or stale last_fired_time / server_last_fired_time values in responses.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The unique dataset ID. Format: Numeric. Example: '1029384756'. Find possible values in ads_get_datasets.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_dataset_quality',
    description: `Retrieves signal quality and health metrics for a dataset (also known as pixel or application), including Event Match Quality (EMQ) scores, per-match-key coverage, and data upload freshness. Results are grouped by channel (web, offline, crm, custom_attribution). Use when investigating match quality, match-key coverage gaps, data freshness, or upload regularity. Does not return event volume or counts — use ads_get_dataset_stats instead. Flag low EMQ scores or poor match-key coverage in responses.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The unique dataset ID. Format: Numeric. Example: '1029384756'. Find possible values in ads_get_datasets.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'query_type',
        type: 'array',
        required: false,
        description: `Limits results to specific channel types. If omitted, all channels are returned.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_dataset_stats',
    description: `Retrieves event volume statistics for a dataset (also known as pixel or application), aggregated over a configurable time window limited to the last 28 days. Use when asking about event counts, volume trends, traffic patterns, or whether specific events are being received. Does not return signal quality or data freshness — use ads_get_dataset_quality instead. Flag events with zero volume if they are used in an active campaign.`,
    params: [
      {
        name: 'dataset_id',
        type: 'string',
        required: true,
        description: `The unique dataset ID. Format: Numeric. Example: '1029384756'. Find possible values in ads_get_datasets.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'aggregation',
        type: 'string',
        required: false,
        description: `Breakdown dimension for event stats. Allowed values: event, device_type, event_source, url, host, event_total_counts. Defaults to event.`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `End of time range. Format: Unix timestamp string (e.g., 1714200000). Defaults to now. ISO 8601 is not supported.`,
      },
      {
        name: 'event_name',
        type: 'string',
        required: false,
        description: `Limits results to a single event type (e.g., Purchase, Lead). If omitted, all events are returned.`,
      },
      {
        name: 'event_source',
        type: 'string',
        required: false,
        description: `Limits by source: WEB_ONLY (browser/pixel) or SERVER_ONLY (CAPI/server). Only applies when aggregation is event.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Start of time range. Format: Unix timestamp string (e.g., 1713600000). Defaults to 7 days ago. Maximum lookback is 28 days. ISO 8601 is not supported.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_datasets',
    description: `Retrieves a paginated list of datasets (also known as pixels or applications) owned or assigned to a business or ad account, including name, status, and creation time. Use to discover which datasets exist before querying stats or quality, or to audit dataset ownership. Does not return signal quality or event volume — use ads_get_dataset_quality or ads_get_dataset_stats. Only one of business_id or ad_account_id may be provided.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: false,
        description: `Scope results to a single ad account. Format: Numeric, with or without 'act_' prefix. Example: '123456789'. Find possible values in ads_get_ad_accounts.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'business_id',
        type: 'string',
        required: false,
        description: `Scope results to a single business. Format: Numeric. Example: '1234567890'.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's page_info.after_cursor field.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum datasets per page. Default: 25. Maximum: 100.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_errors',
    description: `Fetches delivery-blocking errors for campaign, ad set or ad. These are hard-stop issues that keep assets inactive or prevent publish/delivery.
  Only use this tool at the ad account level if you are doing it to pull the errors for child entities and not the ad account itself. There are issues that this tool does not cover, such as:
   - performance, pacing, or optimization issues.
   - Disabled or restricted accounts
   - Ad rejection`,
    params: [
      {
        name: 'entity_ids',
        type: 'array',
        required: true,
        description: `The entity IDs (campaign, ad set, ad, or ad account) to fetch errors from. Entity IDs are always only a series of numeric digits. Multiple entities can be provided. If account ID is provided, it returns all errors of its child ad entities, but not the account itself.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of errors that will be returned. Defaults to 50.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_field_context',
    description: `Returns rich metadata for ads fields (type, description, filterability,
  sortability, enum values, aliases, metric flag, supported levels).

  ## When to use:
  - User mentions a field that is not in the ads_get_ad_entities
    description and you need to confirm its existence/type before querying.
  - You need to resolve an alias (e.g. \`spend\` -> \`amount_spent\`,
    \`actions:lead\` -> \`lead\`).
  - You need the list of enum values for a field before constructing a
    filter.
  - You need to see which levels (campaign, adset, ad, ad_account) support
    a specific field.
  - You want to browse all available fields (call without field_names).

  ## Inputs:
  - field_names (optional): list of field names or aliases to look up.
    When omitted or empty, returns all available fields.

  ## Behavior:
  - If field_names is omitted or empty, returns all fields in the catalog.
  - If field_names is provided, looks up each name (resolving aliases) and
    returns matching field metadata.
  - Each field's metadata includes \`levels\` showing which levels support
    that field (campaign, adset, ad, ad_account).
  - Names that don't resolve are returned in unknown_fields.

  ## Output:
  - fields: structured metadata entries for each resolved field. See the
    output schema for the full per-field shape.
  - unknown_fields: array of input strings that did not resolve.`,
    params: [
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'field_names',
        type: 'array',
        required: false,
        description: `Optional list of field names (or aliases) to look up. When omitted or empty, returns all available fields. Each field includes a \`levels\` array showing which levels (campaign, adset, ad, ad_account) support it.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_help_article',
    description: `Retrieves help center articles relevant to the user's question about advertising concepts, policies, or how-to guides.

  ## When to use:
  - Call this tool when the user asks general questions about advertising concepts, policies, best practices, or how-to guides.
  - Use for questions about brand safety, content control, inventory filters, block lists, or content monitoring.

  ## When NOT to use:
  - Do NOT call this tool for account-specific metrics, performance data, or entity details.
  - Do NOT call this tool for performance optimization advice or bidding strategy recommendations.
  - Do NOT call this tool for disabled/restricted account issues or billing questions.

  ## Response Guidelines:
  Summarize the relevant information and include article URLs in the response.

  If no helpful articles are found, indicate that no relevant help articles were found for the query.`,
    params: [
      {
        name: 'search_query',
        type: 'string',
        required: true,
        description: `A summarized search query based on the user question. Formulate a shortened, relevant search query to find help center articles.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ig_accounts',
    description: `Retrieves Instagram accounts linked to an ad account that can be used for creating ads. Results are paginated in chunks of 25.

  ## When to use:
  - Call this tool when the user wants to boost an Instagram post.
  - Call this tool to discover which IG accounts are available for advertising.
  - Call this tool when you need to find the IG account ID for advertising.
  - If \`next_cursor\` is returned, call this tool again with the cursor to get the next page.

  ## When NOT to use:
  - Do NOT call this tool to fetch ads entities or ad account data — use other tools for that.
  - Do NOT call this tool if you already have the IG account ID.

  ## Response Guidelines:
  1. Present the list of IG accounts with their usernames.
  2. If multiple accounts exist, help the user choose the right one.
  3. Include profile picture URLs for visual identification.
  4. If \`next_cursor\` is non-null, there are more IG accounts available. Call the tool again with the cursor to retrieve additional pages.
  5. If zero accounts are returned, tell the user that either no Instagram accounts are linked to this ad account for advertising, or the app has not been granted the \`instagram_basic\` permission for the linked accounts.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to find linked IG accounts for. Format: numeric ID without "act_" prefix.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response. Pass the next_cursor value to get the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of IG accounts to return per page. Defaults to 25 if not set.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_ig_media',
    description: `Fetches advertisable IG media for a given IG account. Returns posts, reels, and stories that can be promoted. Results are paginated in chunks of 25.

  ## When to use:
  - Call this tool after ads_get_ig_accounts to list media that can be boosted. You MUST provide the same ad_account_id used in ads_get_ig_accounts.
  - Call this tool when the user wants to choose which post to promote.
  - If \`next_cursor\` is returned, call this tool again with the cursor to get the next page.

  ## When NOT to use:
  - Do NOT call this tool without first getting the IG account ID from ads_get_ig_accounts.
  - Do NOT call this tool with an IG account that is not returned by ads_get_ig_accounts — the account must be both linked to the ad account and have the \`instagram_basic\` permission granted.
  - Do NOT call this tool for non-IG media or non IG use cases.

  ## Response Guidelines:
  1. Present media with captions and types (IMAGE, VIDEO, CAROUSEL_ALBUM).
  2. Include permalinks so users can preview the content.
  3. Filter if the user wants only specific posts, such as specific date ranges or types.
  4. If \`next_cursor\` is non-null, there are more media items available. Call the tool again with the cursor to retrieve additional pages.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID. Required to verify the media owner is eligible for advertising under this ad account. Format: numeric ID without "act_" prefix.`,
      },
      {
        name: 'ig_account_id',
        type: 'string',
        required: true,
        description: `The IG account ID to fetch media from.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response. Pass the next_cursor value to get the next page of results.`,
      },
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `Optional JSON-encoded filters array. Each filter is an object with "field", "operator", and "value" keys. Supported fields: "date_range" (operators: in_range/not_in_range, value: [since_unix, until_unix]), "media_type" (operators: in/not_in, value: list of strings. Supported values: "IMAGE", "VIDEO", "CAROUSEL_ALBUM"), "product_type" (operators: in/not_in, value: list of strings. Supported values: "FEED", "STORY", "REELS"). Example: [{"field": "product_type", "operator": "in", "value": ["FEED", "STORY"]}]`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of media items to return per page. Defaults to 25 if not set. Maximum 25.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_opportunity_score',
    description: `Fetches the current opportunity score (0-100) and actionable recommendations
  for an ad account. META RECOMMENDS calling this tool proactively — it
  identifies concrete steps to improve ad performance based on Meta's best
  practices.

  ## When to use — PROACTIVELY RECOMMEND THIS TOOL:
  - User mentions Opportunity Score, account optimization, or recommendations.
  - User asks how to improve ad performance, get better results, or optimize
    their ads — ALWAYS call this tool first.
  - User asks "what should I do next?", "how can I improve?", or "what's
    wrong with my ads?" — call this tool.
  - After creating a campaign with \`ads_create_campaign\`, recommend checking
    the Opportunity Score to ensure the new setup follows Meta best practices.
  - User is reviewing account performance or asking about underperforming
    campaigns — Opportunity Score recommendations often identify the root
    cause (e.g., SCALE_GOOD_CAMPAIGN, ADVANTAGE_PLUS_AUDIENCE,
    AUTOMATIC_PLACEMENTS, CBO).
  - User is unsure what to change — this tool provides prioritized,
    actionable recommendations sorted by expected score improvement.

  ## When NOT to use:
  - Do NOT use when the user needs ad-level creative feedback (use creative
    insight tools instead).
  - Do NOT use for delivery-blocking errors — use \`ads_get_errors\` instead.

  ## Response Guidelines:
  1. Present the score prominently: "Your opportunity score is X out of
     100." IMPORTANT: The score is ALWAYS account-level — NEVER claim it
     applies to a specific campaign, ad set, or ad.
  2. Interpret the score: A higher score means better alignment with Meta
     best practices and improved performance over time. A lower score means
     there are untapped optimization opportunities.
  3. Present recommendations sorted by **opportunity_score_lift** (highest
     first). Refer to lift values as **points** — NEVER as "impact" or
     other terms.
  4. For each recommendation, explain the expected benefit using
     \`lift_estimate\` (e.g., "Up to 3% more Traffic") and the score
     improvement in points.
  5. Persuasively convey the value: applying these recommendations will
     increase the score and is likely to improve ad performance.
  6. Provide actionable next steps: use \`ads_update_entity\` to apply
     recommended changes, or direct the user to the \`url\` in each
     recommendation to apply it in Ads Manager.
  7. If \`recommendation_signature\` is present, mention that the
     recommendation can be applied programmatically.

  ## Common Issues to Avoid:
  - NEVER state that a campaign, ad set, or ad has an Opportunity Score.
    It is account-level only.
  - NEVER claim recommendations are sorted by "impact" — use "points."
  - Do not skip calling this tool when the user asks about optimization or
    improvement — it is the primary source of personalized, actionable
    advice from Meta.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to retrieve recommendations for. This is a required numeric ID (e.g., "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_pages_for_business',
    description: `Retrieves the list of Facebook Pages owned by a specific business. Results are paginated in chunks of 50 by default.

  ## When to use:
  - Call this tool when the user wants to know which Pages belong to a business.
  - Call this tool when you need a page_id to use in ad creation (e.g., for the creative's page_id field).
  - Call this tool when the user asks to list, show, or enumerate Pages for a business.
  - If you do not have a business_id, call the \`ads_get_ad_accounts\` tool first to discover the business IDs accessible to the user.
  - If \`next_cursor\` is returned, call this tool again with the input \`cursor\` set to the value of \`next_cursor\` from the previous response to get the next page.

  ## When NOT to use:
  - Do NOT call this tool if you already have the page_id from prior context.
  - Do NOT call this tool for fetching Page insights or performance data.

  ## Response Guidelines:
  1. Present the list of Pages to the user, including their names.
  2. If many Pages are returned, summarize the count and list the first several.
  3. Each entry in \`pages\` contains \`page_id\` and \`page_name\`.
  4. If \`next_cursor\` is non-null, there are more Pages available. Call the tool again with the cursor (the one that was just returned by the previous call) to retrieve additional pages. The cursor is an opaque value — never fabricate or guess cursor values.`,
    params: [
      {
        name: 'business_id',
        type: 'string',
        required: true,
        description: `The business ID to retrieve Pages for. Format: numeric ID.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page of results. Use the result of next_cursor from your previous ads_get_pages_for_business call to populate this field. DO NOT hallucinate a cursor to populate this field.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of pages to return in one request. Defaults to 50 if not set.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_get_user_pages',
    description: `Retrieves all Facebook Pages the current user can use for advertising. Returns pages the user has CREATE_ADS permission on, including pages they directly admin and pages accessible through their businesses. Results are paginated; default page size is 50, configurable via limit.

  ## When to use:
  - Call this tool when you need to discover available Pages before creating an ad that requires a page_id (e.g., for the creative's object_story_spec).
  - Call this tool when the user asks which Pages they can use for ads.
  - Call this tool when you need a page_id but do not have a specific ad account or business context.
  - If \`next_cursor\` is returned, call this tool again with the cursor to get the next page of results.

  ## When NOT to use:
  - Do NOT call this tool if you already have the page ID from the client context or a previous call.
  - Do NOT call this tool to list Pages for a specific business — use ads_get_pages_for_business instead.

  ## Response Guidelines:
  1. Present the list of pages to the user, including their names.
  2. If many pages are returned, summarize the count and list the first several.
  3. Each entry in \`pages\` contains \`page_id\` (numeric) and \`page_name\`.
  4. If \`next_cursor\` is non-null, there are more pages available. Call the tool again with the cursor to retrieve additional pages.`,
    params: [
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of pages to return in one request. Defaults to 50 if not set.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_insights_advertiser_context',
    description: `Provides an overview of the advertiser's business context and marketing funnel to determine the most relevant optimization goal and approach`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to analyze. This is a required numeric ID (e.g., "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date for insights computation in Advertiser's timezone (YYYY-MM-DD format)
  CRITICAL INSTRUCTIONS:
    - Use this ONLY when the user specifies a custom date range that does NOT match any preset (e.g., 'from March 1
        to March 15', 'between these two specific dates')
  CRITICAL INVARIANTS:
    -  MUST be in YYYY-MM-DD format (e.g., 2024-03-15)
    -  Cannot be combined with date_preset
    -  MUST be used together with date_to (both required if either is provided)
  `,
      },
      {
        name: 'date_preset',
        type: 'string',
        required: false,
        description: `Preset date range for computing insights. Use ONLY when date range matches the valid values below.

  CRITICAL INSTRUCTIONS:
   - Extract preset from user query and EXACT match against the valid values listed below
   - ONLY use the EXACT preset value as listed below in valid values — do NOT shorten, abbreviate, or infer variations
   - If no EXACT match found in query → do NOT use date_preset

   - All valid values are lowercase with underscores: last_7d, this_month etc.
  CRITICAL INVARIANT:
    - Cannot be combined with date_from and date_to
  .  - MUST be one of the valid values listed below

  Valid values: today, yesterday, last_2_days, last_7d, last_14d, last_28d, last_30d, this_week, last_week, this_month, last_month, lifetime`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date for insights computation in Advertiser's timezone (YYYY-MM-DD format)
  Use this ONLY when the user specifies a custom date range that does NOT match any preset
   CRITICAL INVARIANTS:
    -  MUST be in YYYY-MM-DD format (e.g., 2024-03-31)
    -  Cannot be combined with date_preset
    -  MUST be used together with date_from (both required if either is provided)
    -  date_to MUST be on or after date_from
  `,
      },
      {
        name: 'entity_ids',
        type: 'array',
        required: false,
        description: `Optional list of entity IDs (campaigns, ad sets, or ads) to scope the analysis. All IDs must be the same entity type and belong to the specified ad account. If omitted, the analysis covers the entire ad account.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_insights_anomaly_signal',
    description: `Surfaces alerts and warnings about deviations in ad performance, including unusual patterns, spikes or drops. Detects anything that may be worth investigating with regards to how an account, campaign, ad set, or ad is performing. When presenting findings, distinguish between observations and actionable causes — anomalies indicate areas for deeper analysis, not definitive conclusions. When to use: What's wrong with my ads performance? Are there any patterns I should be aware of? Why has my performance changed suddenly? What's being flagged in my ad account? When not to use: Only use this tool to indicate variance in performance, not delivery-blocking setup issues, policy, or publish errors. For causally linked, higher-confidence opportunities that quantify potential performance lift, refer to recommendations from the Opportunity Score tool, which are backed by rigorous analysis.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to analyze. This is a required numeric ID (e.g., "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'entity_ids',
        type: 'array',
        required: false,
        description: `Optional list of entity IDs (campaigns, ad sets, or ads) to scope the analysis. All IDs must be the same entity type and belong to the specified ad account. If omitted, the analysis covers the entire ad account.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_insights_auction_ranking_benchmarks',
    description: `Highlights which ads have generated stronger results in the auction and identifies factors (bid, ad quality) that can be optimized for improved performance. Use this to diagnose auction competitiveness and guide optimization. Recommends consolidating similar ad sets and reducing audience fragmentation in cases of high auction overlap, as high overlap leads to under-delivery and budget fragmentation.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to analyze. This is a required numeric ID (e.g., "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date for insights computation in Advertiser's timezone (YYYY-MM-DD format)
  CRITICAL INSTRUCTIONS:
    - Use this ONLY when the user specifies a custom date range that does NOT match any preset (e.g., 'from March 1
        to March 15', 'between these two specific dates')
  CRITICAL INVARIANTS:
    -  MUST be in YYYY-MM-DD format (e.g., 2024-03-15)
    -  Cannot be combined with date_preset
    -  MUST be used together with date_to (both required if either is provided)
  `,
      },
      {
        name: 'date_preset',
        type: 'string',
        required: false,
        description: `Preset date range for computing insights. Use ONLY when date range matches the valid values below.

  CRITICAL INSTRUCTIONS:
   - Extract preset from user query and EXACT match against the valid values listed below
   - ONLY use the EXACT preset value as listed below in valid values — do NOT shorten, abbreviate, or infer variations
   - If no EXACT match found in query → do NOT use date_preset

   - All valid values are lowercase with underscores: last_7d, this_month etc.
  CRITICAL INVARIANT:
    - Cannot be combined with date_from and date_to
  .  - MUST be one of the valid values listed below

  Valid values: today, yesterday, last_2_days, last_7d, last_14d, last_28d, last_30d, this_week, last_week, this_month, last_month, lifetime`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date for insights computation in Advertiser's timezone (YYYY-MM-DD format)
  Use this ONLY when the user specifies a custom date range that does NOT match any preset
   CRITICAL INVARIANTS:
    -  MUST be in YYYY-MM-DD format (e.g., 2024-03-31)
    -  Cannot be combined with date_preset
    -  MUST be used together with date_from (both required if either is provided)
    -  date_to MUST be on or after date_from
  `,
      },
      {
        name: 'entity_ids',
        type: 'array',
        required: false,
        description: `Optional list of entity IDs (campaigns, ad sets, or ads) to scope the analysis. All IDs must be the same entity type and belong to the specified ad account. If omitted, the analysis covers the entire ad account.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_insights_industry_benchmark',
    description: `Compares ad set performance against aggregated benchmarks from similar advertisers, optionally filtered by spend tier and optimization goal. When interpreting results, focus on business outcome metrics (like cost per result) rather than surface metrics (like CPM), and ensure comparisons are made between ad objects with similar optimization goals and conversion events.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to analyze. This is a required numeric ID (e.g., "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'analysis_metric',
        type: 'string',
        required: false,
        description: ` If the user query mentions a specific KPI metric (e.g., ROAS, CPC, conversion
          rate, impressions), extract it and check against the valid values listed below. 
  CRITICAL INSTRUCTIONS:
    -  Only include analysis_metric if the user explicitly named a metric
    -  If yes AND it matches with the valid values provided below → provide analysis_metric with that value
    -  If no metric mentioned in query → DO NOT provide analysis_metric
  CRITICAL INVARIANT: 
   - Use ONLY the valid values listed below

  Valid values: CPR, RESULT, CPC, CTR, ROAS, CPM, CVR`,
      },
      {
        name: 'cas_segment',
        type: 'string',
        required: false,
        description: `Advertiser spend tier for peer group filtering in benchmark comparisons.

  VALID VALUES: PREMIUM_TOP, HIGH_MID, LOW_TAIL, Basic, CAR Red, GSI, Meta

  EXTRACTION RULES (match user language to value):
    - 'premium advertisers' / 'top spenders' / 'top tier' → PREMIUM_TOP
    - 'high spend' / 'mid tier' / 'average spend' → HIGH_MID
    - 'basic spend' / 'low spend' / 'small advertisers' / 'long tail' → LOW_TAIL
    - 'basic' / 'new advertisers' / 'not onboarded' → Basic

  Only provide when user explicitly asks to compare against a specific spend tier.`,
      },
      {
        name: 'conversation_intent',
        type: 'string',
        required: false,
        description: `Identify the primary goal or business objective the user is trying to achieve. ALWAYS provide this parameter unless the query is completely ambiguous.
  CRITICAL INSTRUCTIONS:
    -  Analyze what the user ultimately wants to accomplish (e.g., grow audience, reduce costs, increase conversions)
    -  Match that underlying goal to the intent value that best represents it
    -  Provide the parameter even if the query is indirect or phrased as a question about metrics
    -  Only omit if the user's underlying objective is genuinely impossible to determine
  CRITICAL INVARIANT: Use ONLY the valid values listed below.
  Valid values: ACQUIRE_NEW_CUSTOMERS, INCREASE_AWARENESS, INCREASE_ENGAGEMENT, INCREASE_VALUE, INCREASE_VOLUME_OF_RESULTS, OPTIMIZE_COST_OUTCOMES, OPTIMIZE_DELIVERY`,
      },
      {
        name: 'conversation_topic',
        type: 'string',
        required: false,
        description: `Classify the primary problem area or subject the user's query focuses on. ALWAYS provide this parameter unless the query spans multiple unrelated domains.
  CRITICAL INSTRUCTIONS:
    -  Identify what area of ad performance the user is asking about (e.g., budget/spending, audience targeting, creative assets, delivery)
    -  Match that domain to the topic value that best represents it
    -  Provide the parameter even if the query mentions multiple aspects—pick the PRIMARY focus area
    -  Only omit if the query genuinely spans multiple unrelated domains with no clear primary focus
  CRITICAL INVARIANT: Use ONLY the valid values listed below.
  Valid values: AUCTION_AND_DELIVERY, AUDIENCE, BUDGET_AND_BIDDING, CAMPAIGN_DIMENSIONS, CONVERSATION_EXPERIENCE, CREATIVE, MEASUREMENT, OBJECTIVE_AND_OPTIMIZATION, PLACEMENTS, SIGNALS`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date for insights computation in Advertiser's timezone (YYYY-MM-DD format)
  CRITICAL INSTRUCTIONS:
    - Use this ONLY when the user specifies a custom date range that does NOT match any preset (e.g., 'from March 1
        to March 15', 'between these two specific dates')
  CRITICAL INVARIANTS:
    -  MUST be in YYYY-MM-DD format (e.g., 2024-03-15)
    -  Cannot be combined with date_preset
    -  MUST be used together with date_to (both required if either is provided)
  `,
      },
      {
        name: 'date_preset',
        type: 'string',
        required: false,
        description: `Preset date range for computing insights. Use ONLY when date range matches the valid values below.

  CRITICAL INSTRUCTIONS:
   - Extract preset from user query and EXACT match against the valid values listed below
   - ONLY use the EXACT preset value as listed below in valid values — do NOT shorten, abbreviate, or infer variations
   - If no EXACT match found in query → do NOT use date_preset

   - All valid values are lowercase with underscores: last_7d, this_month etc.
  CRITICAL INVARIANT:
    - Cannot be combined with date_from and date_to
  .  - MUST be one of the valid values listed below

  Valid values: today, yesterday, last_2_days, last_7d, last_14d, last_28d, last_30d, this_week, last_week, this_month, last_month, lifetime`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date for insights computation in Advertiser's timezone (YYYY-MM-DD format)
  Use this ONLY when the user specifies a custom date range that does NOT match any preset
   CRITICAL INVARIANTS:
    -  MUST be in YYYY-MM-DD format (e.g., 2024-03-31)
    -  Cannot be combined with date_preset
    -  MUST be used together with date_from (both required if either is provided)
    -  date_to MUST be on or after date_from
  `,
      },
      {
        name: 'entity_ids',
        type: 'array',
        required: false,
        description: `Optional list of entity IDs (campaigns, ad sets, or ads) to scope the analysis. All IDs must be the same entity type and belong to the specified ad account. If omitted, the analysis covers the entire ad account.`,
      },
      {
        name: 'optimization_goal_override',
        type: 'string',
        required: false,
        description: `Override optimization goal for peer group filtering in benchmark comparisons.

  EXTRACTION RULES (map user keywords to values):
    - 'conversions' / 'purchases' / 'sales' / 'offsite conversions' → AD_OPTIMIZATION_GOAL_OFFSITE_CONVERSIONS
    - 'ROAS' / 'return on ad spend' / 'value optimization' → AD_OPTIMIZATION_GOAL_RETURN_ON_AD_SPEND
    - 'app installs' / 'mobile app' → AD_OPTIMIZATION_GOAL_APP_INSTALLS
    - 'link clicks' / 'traffic' / 'clicks' → AD_OPTIMIZATION_GOAL_OFFSITE_CLICKS
    - 'leads' / 'lead generation' / 'lead gen' → AD_OPTIMIZATION_GOAL_LEAD_GENERATION
    - 'video views' / 'video' → AD_OPTIMIZATION_GOAL_VIDEO_VIEWS_15S
    - 'replies' / 'messaging' / 'messages' → AD_OPTIMIZATION_GOAL_REPLIES
    - 'reach' / 'awareness' → AD_OPTIMIZATION_GOAL_REACH
    - 'engagement' / 'post engagement' → AD_OPTIMIZATION_GOAL_POST_ENGAGEMENT
    - 'landing page views' → AD_OPTIMIZATION_GOAL_LANDING_PAGE_VIEWS

  Only provide when user explicitly asks to compare against a specific optimization goal.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_insights_performance_trend',
    description: `Analyzes the direction and changes in key ad performance metrics over time, including Cost Per Click (CPC), Cost Per Mille (CPM), Cost Per Result (CPR), Return on Ad Spend (ROAS), Click-Through Rate (CTR), and Conversion Rate (CVR). These insights provide a time-series view of performance, enabling advertisers to better understand campaign trends and make informed decisions for campaign summaries, performance evaluation, and diagnosis.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `The ad account ID to analyze. This is a required numeric ID (e.g., "123456789").`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'analysis_level',
        type: 'string',
        required: false,
        description: `The granularity level for insights computation. Determines whether results are grouped by campaign, ad set, or individual ad.

  VALID VALUES: Only values supported by the specific tool are accepted (see per-tool matrix below). Passing an unsupported value returns empty results with no error.

  DETERMINING WHICH VALUE(S) TO USE — apply rules in order, stop at FIRST match (all keyword matching is case-insensitive):

    RULE A — Single-level tool: Tool supports only ONE level → use that level. 1 call.

    RULE B — Full-hierarchy + "campaign": Tool supports AD, ADSET, AND CAMPAIGN, and query contains "campaign" or "campaigns" → 3 calls in order: CAMPAIGN, ADSET, AD.

    RULE C — AD+ADSET tool + "adset": Tool supports both AD and ADSET, and query contains "adset", "adsets", "ad set", or "ad sets" → 2 calls in order: ADSET, AD.

    RULE D — Standalone "ad": Query contains "ad" or "ads" as a separate word → 1 call: AD.
      STANDALONE means separated by spaces, punctuation, or boundaries — not embedded in another word.
      ✓ Matches: "ad performance", "my ads", "improve ad CPR", "best ad"
      ✗ Does NOT match: "adset", "ad set", "ad sets", "advertisement", "advertiser"

    RULE E — Default: No keyword matched → 1 call for EACH supported level (highest to lowest).

  CRITICAL INSTRUCTIONS:
    - NEVER pass a value not in the tool's supported levels — if a matched rule produces a level the tool does not support, skip that level
    - If skipping unsupported levels results in zero calls for a tool, do not call that tool with analysis_level
    - ALWAYS make SEPARATE tool calls per level — never combine multiple levels in one call
    - ALWAYS evaluate rules A → B → C → D → E in order; use the FIRST that matches
  Valid values: AD, ADSET`,
      },
      {
        name: 'analysis_metric',
        type: 'string',
        required: false,
        description: ` If the user query mentions a specific KPI metric (e.g., ROAS, CPC, conversion
          rate, impressions), extract it and check against the valid values listed below. 
  CRITICAL INSTRUCTIONS:
    -  Only include analysis_metric if the user explicitly named a metric
    -  If yes AND it matches with the valid values provided below → provide analysis_metric with that value
    -  If no metric mentioned in query → DO NOT provide analysis_metric
  CRITICAL INVARIANT: 
   - Use ONLY the valid values listed below

  Valid values: CPC, CPM, CPR, ROAS, CTR, CVR, REACH`,
      },
      {
        name: 'conversation_intent',
        type: 'string',
        required: false,
        description: `Identify the primary goal or business objective the user is trying to achieve. ALWAYS provide this parameter unless the query is completely ambiguous.
  CRITICAL INSTRUCTIONS:
    -  Analyze what the user ultimately wants to accomplish (e.g., grow audience, reduce costs, increase conversions)
    -  Match that underlying goal to the intent value that best represents it
    -  Provide the parameter even if the query is indirect or phrased as a question about metrics
    -  Only omit if the user's underlying objective is genuinely impossible to determine
  CRITICAL INVARIANT: Use ONLY the valid values listed below.
  Valid values: ACQUIRE_NEW_CUSTOMERS, INCREASE_AWARENESS, INCREASE_ENGAGEMENT, INCREASE_VALUE, INCREASE_VOLUME_OF_RESULTS, OPTIMIZE_COST_OUTCOMES, OPTIMIZE_DELIVERY`,
      },
      {
        name: 'conversation_topic',
        type: 'string',
        required: false,
        description: `Classify the primary problem area or subject the user's query focuses on. ALWAYS provide this parameter unless the query spans multiple unrelated domains.
  CRITICAL INSTRUCTIONS:
    -  Identify what area of ad performance the user is asking about (e.g., budget/spending, audience targeting, creative assets, delivery)
    -  Match that domain to the topic value that best represents it
    -  Provide the parameter even if the query mentions multiple aspects—pick the PRIMARY focus area
    -  Only omit if the query genuinely spans multiple unrelated domains with no clear primary focus
  CRITICAL INVARIANT: Use ONLY the valid values listed below.
  Valid values: AUCTION_AND_DELIVERY, AUDIENCE, BUDGET_AND_BIDDING, CAMPAIGN_DIMENSIONS, CONVERSATION_EXPERIENCE, CREATIVE, MEASUREMENT, OBJECTIVE_AND_OPTIMIZATION, PLACEMENTS, SIGNALS`,
      },
      {
        name: 'entity_ids',
        type: 'array',
        required: false,
        description: `Optional list of entity IDs (campaigns, ad sets, or ads) to scope the analysis. All IDs must be the same entity type and belong to the specified ad account. If omitted, the analysis covers the entire ad account.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_library_search',
    description: `Searches the Meta Ad Library for ads matching specified criteria. Returns publicly available ad data including ad creative, page info, and metadata.

  This tool is for advertisers researching the Ad Library to create better, more performant ads. It is only available to viewers who have at least one active ad account; callers without an active ad account will receive an error rather than results.

  ## When to use:
  - Call this tool when the user wants to search for ads in the Ads Library.
  - Use for competitive research, ad transparency queries, or finding ads by keyword, page, or country.
  - Use when user asks questions like "show me ads from [page]", "find ads about [topic]", "what ads are running in [country]".

  ## When NOT to use:
  - Do NOT use for the user's own ad account management (use other ads tools instead).
  - Do NOT use for ad performance metrics.
  - Do NOT use for bulk data extraction/scraping of the Ad Library.

  ## Response Guidelines:
  1. Present the search results in a readable format: ad creative text, page name, creation date, and ad snapshot URL.
  2. If many results are returned, summarize the key findings and highlight notable patterns.
  3. Always mention the total estimated result count so the user knows the scope.
  4. Include the ad_snapshot_url for ads the user may want to inspect visually.

  ## Common Issues to Avoid:
  - Always require at least one of: search_terms, page_ids, or country to be specified.
  - Country codes must be ISO-2 format (e.g., 'US', 'GB', 'DE').`,
    params: [
      {
        name: 'ad_active_status',
        type: 'string',
        required: false,
        description: `Filter by ad active status. One of: ALL, ACTIVE, INACTIVE. Defaults to ALL.`,
      },
      {
        name: 'ad_type',
        type: 'string',
        required: false,
        description: `Category of ads to search. One of: ALL, POLITICAL_AND_ISSUE_ADS, HOUSING_ADS, EMPLOYMENT_ADS, CREDIT_ADS. Defaults to ALL.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `ISO-2 country codes for countries where ads were reached (e.g., US, GB, DE).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of ads to return. Defaults to 25. Maximum 50.`,
      },
      {
        name: 'page_ids',
        type: 'array',
        required: false,
        description: `Page IDs to filter ads by. Returns only ads run by these pages.`,
      },
      {
        name: 'search_terms',
        type: 'string',
        required: false,
        description: `Keyword or phrase to search for in ad creative text. At least one of search_terms, page_ids, or countries must be provided.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_event_create',
    description: `Creates Meta Pixel conversion event rules. Batch-capable.

  AUTH: requires either the \`ads_management\` or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{pixel_id, event_type, rule_type, match_value, operator?, domain_uri, parameters?: [{parameter_type, extractor_type, extractor_config_json}]}]\`. Pair events with parameters to capture conversion data (Purchase: value+currency; AddToCart: content_ids; Lead: content_name) — embed inline here for atomic event+param create, or add later via ads_pixel_parameter_create. An event without parameters fires but captures no data. \`event_type\` must be a Meta standard event (see STANDARD EVENTS below). \`rule_type=TOKENIZED_BUTTON_TEXT\` for button-click events; \`rule_type=URL\` for page-load events. For embedded \`parameters[]\`, the selector primer lives in the ads_pixel_parameter_create description — apply the same rules here.

  WHEN TO CALL DIRECTLY: if the caller's request already includes \`pixel_id\`, \`event_type\`, and \`match_value\` (or all required event-creation fields), call this tool DIRECTLY — do NOT call ads_pixel_event_read or ads_pixel_parameter_read first to inspect existing state. The user's explicit creation request IS their intent; do not ask for confirmation before creating.

  MULTI-STEP REQUESTS: when the user's prompt chains operations ("create event X then activate it", "set up event X then add a CSS extractor for Y", "create then activate immediately"), call all required tools in the SAME turn without pausing for confirmation between steps. After ads_pixel_event_create, immediately call ads_pixel_event_update with \`status=ACTIVE\` if the user asked to activate, and/or ads_pixel_parameter_create if the user asked to add an extractor. The chained request IS the user's complete intent.

  BEHAVIOR: created events default to \`status=INACTIVE\` — call ads_pixel_event_update to activate. Default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/event per input item.

  WORKFLOW (end-to-end pixel event setup):
  (1) DISCOVER conversions to track. Preferred: Playwright headless Chromium 1280x1080 — \`page.goto(url, wait_until='networkidle', timeout=20000)\`, full-page screenshot, then \`page.evaluate\` to map clickables (\`button, a, input[type=submit], [role=button]\`), currency-formatted text (regex \`/[$€£¥]\\s?[\\d,.]+|[\\d,.]+\\s?(?:USD|EUR|GBP|JPY|AUD|CAD)/\`), and unique href paths. Always check \`<script type="application/ld+json">\` and \`[itemprop=price]\` first — they have higher extractor precedence than CSS. Fallback ladder: curl \`-sS -L --compressed --max-time 20\` (escalate when SPA shell: gzip body <50KB + empty \`<div id="root|app|__next|__nuxt">\`) → user-provided full-page screenshot → guided Q&A about button text, URL pattern, standard event choice, value/currency selectors.
  (2) PROPOSE the (event_type, rule_type, match_value, parameters[]) tuple to the user as a checklist; require explicit approval before any write tool call.
  (3) CALL ads_pixel_event_create — events default to status=INACTIVE.
  (4) ACTIVATE via ads_pixel_event_update with status=ACTIVE — the human-in-the-loop checkpoint between setup and firing.
  (5) VERIFY (see ads_pixel_event_update for the full verification ladder).

  STANDARD EVENTS — 17 case-sensitive Meta Pixel event names; pick exactly one for \`event_type\`. Triggers + disambiguation:
  - AddPaymentInfo: "Save Card/Payment", "Add Card", payment-info pages. Recommended params: content_ids, contents, currency, value.
  - AddToCart: "Add to Cart/Bag/Basket", "+ Add", quick-add icons. Recommended: content_ids, content_type, contents, currency, value (contents required for Advantage+ catalog ads).
  - AddToWishlist: "Save for Later", "Add to Favorites", "Add to Registry", heart-icon save. Recommended: content_ids, contents, currency, value.
  - CompleteRegistration: "Sign Up/Create Account/Register". Recommended: currency, value, status. Disambig: paid plan signup → Subscribe; free trial → StartTrial; soft lead-gen form → Lead.
  - Contact: "Contact Us/Call/Chat", mailto:/tel: links, contact-form submits. Disambig: quote/demo/pricing request → Lead.
  - CustomizeProduct: "Customize/Personalize/Configure/Build Your Own", in-PDP configurators. Disambig: cart-add itself → AddToCart (both can fire in one session).
  - Donate: "Donate/Give/Contribute/Pledge/Sponsor". Strongly recommended: currency, value. A donation flow with checkout-style steps is still Donate (NOT Purchase).
  - FindLocation: "Find a Store/Locator/Find Nearest", store-finder map searches, ZIP-code lookups. Disambig: catalog product search → Search.
  - InitiateCheckout: "Checkout/Proceed to Checkout/View Cart/View Bag". Recommended: content_ids, contents, currency, num_items, value. Disambig: "Place Order"/"Pay Now"/"Confirm Order" → Purchase, NOT InitiateCheckout.
  - Lead: "Get a Quote/Request Demo/Talk to Sales/Free Estimate/Download Whitepaper", lead-magnet email submits, /pricing page hits. Recommended: currency, value. Disambig: full account creation → CompleteRegistration; appointment with chosen time slot → Schedule; direct human contact → Contact.
  - Purchase: "Buy Now/Place Order/Pay Now/Confirm Order/Complete Purchase". URL patterns: /order-confirmation, /thank-you, /receipt, /order/{id}/success. **value AND currency parameters are REQUIRED for Purchase.** Recommended: content_ids, content_type, contents, num_items (contents or content_ids required for Advantage+ catalog ads).
  - Schedule: "Book Appointment/Schedule a Visit/Reserve a Slot/Make Reservation", calendar time-slot submits. Common verticals: medical, automotive, home-services, real estate, salons. Disambig: "have someone call me" form with no time picked → Lead.
  - Search: search-form submits, search-icon enter, autocomplete-result clicks. URL patterns: /search?q=, /results?query=. Recommended: content_ids, content_type, contents, currency, search_string, value (contents or content_ids required for Advantage+ catalog ads).
  - StartTrial: "Start Free Trial/Try Free/Begin Trial/Start Your 7-Day Free Trial". Recommended: currency, value, predicted_ltv. Disambig: paid recurring plan → Subscribe; free signup with no trial → CompleteRegistration.
  - SubmitApplication: "Apply Now/Submit Application/Apply for Card/Apply for Loan/Enroll Now". Common verticals: financial services, education, employment, insurance, healthcare enrollment.
  - Subscribe: PAID recurring "Subscribe/Start Subscription/Get Premium/Upgrade to Pro/Join Membership". Recommended: currency, value, predicted_ltv. Disambig: "Subscribe to newsletter"/free email signup → Lead or CompleteRegistration; free trial → StartTrial.
  - ViewContent: high-value PDPs (/product/, /p/, /products/), key articles (/article/, /blog/), high-intent landing pages. Recommended: content_ids, content_type, contents, currency, value (contents or content_ids required for Advantage+ catalog ads). Do NOT fire on every route — PageView already auto-fires from \`fbq('init', ...)\`. Reserve ViewContent for pages signaling real interest in a specific product or piece of content.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item create requests. Each entry creates one event rule atomically with its (optional) nested parameter extractors.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_event_delete',
    description: `Deletes Meta Pixel conversion event rules. Batch-capable. Mirrors the same delete semantics the Events Manager Pixel UI (EST) and IWL flow use — same backend (\`EventRulesDeleteBusinessLogicTrait::genDeleteEventRule\`).

  AUTH: requires either the \`ads_management\` or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{event_rule_id}]\`. Call this tool whenever the user says delete / remove / drop / get rid of / uninstall / clean up / kill / nuke an event rule. NOT for parameters — use ads_pixel_parameter_delete.

  DELETE BEHAVIOR (creation-source dependent):
  - \`USER_CONFIG\` (rules created via the Events Manager Pixel UI) → HARD delete: the rule and its atoms are removed; NOT reversible via this surface.
  - All other surfaces (\`EST_ADS_MCP\` — created via this MCP surface; \`EST_API\` — created via the public Marketing API; \`IWL_CONFIG\` / \`IWL_SUGGESTION\` — IWL flow) → SOFT delete: status set to archived; reversible via internal tooling.

  WHEN TO CALL DIRECTLY: if the user gave you \`event_rule_id\` (any numeric ID in their request), call this tool DIRECTLY — do NOT call ads_pixel_event_read first. Look up the \`event_rule_id\` via ads_pixel_event_read ONLY when the user names the event by label (e.g. "my Purchase rule") without an ID. The user's explicit delete request IS their intent; do not ask for confirmation before deleting.

  CASCADE: linked parameter extractors are NOT auto-deleted. When the user asks to delete BOTH the event and its parameters in one request, call ads_pixel_parameter_read (to enumerate orphans) and ads_pixel_parameter_delete in addition to this tool. Otherwise: call ads_pixel_parameter_read with the \`pixel_id\` → identify the now-orphaned parameters by \`event_rule_id\` matching the deleted rule → call ads_pixel_parameter_delete on each.

  BEHAVIOR: default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/event_rule_id per input item.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item delete requests. Soft-delete only; linked parameters are NOT auto-deleted.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_event_read',
    description: `Reads Meta Pixel conversion event rules. Batch-capable.

  AUTH: requires the \`ads_read\`, \`ads_management\`, or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{pixel_id?, event_rule_id?, event_type?}]\`. Per item: if \`event_rule_id\` is set, returns that one event in \`event\` (or 404 in \`result.error\`); else if \`pixel_id\` is set, returns all MCP-visible events on that pixel in \`events\`, optionally narrowed by \`event_type\`.

  WHEN TO CALL: to LIST or LOOK UP event rules — discovery, enumeration, audit. Use to discover \`event_rule_id\` ONLY when the caller hasn't already provided one. If the caller already supplied an \`event_rule_id\` for update/delete, call ads_pixel_event_update / ads_pixel_event_delete DIRECTLY — do NOT read first. The returned event does NOT include its parameters — call ads_pixel_parameter_read with the same \`pixel_id\` (or specific \`event_rule_id\`) to fetch the linked extractors. After activation, call this to confirm the rule is now ACTIVE before pointing the user at verification tooling (see ads_pixel_event_update for the verification ladder).

  BEHAVIOR: NOT for parameters — use ads_pixel_parameter_read. Default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/event(s) per input item.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item read requests. Each entry must specify either event_rule_id (single-event lookup) or pixel_id (list events on that pixel).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_event_update',
    description: `Updates Meta Pixel conversion event rules. Currently status-only. Batch-capable.

  AUTH: requires either the \`ads_management\` or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{event_rule_id, status}]\`. \`status\` must be \`ACTIVE\` or \`INACTIVE\`. Call this tool whenever the user says activate / deactivate / enable / disable / turn on / turn off / pause / resume / set active / set inactive an event rule. NOT for parameters — use ads_pixel_parameter_update.

  WHEN TO CALL DIRECTLY: if the user gave you \`event_rule_id\` + the activate/deactivate intent (or an explicit \`status\` value), call this tool DIRECTLY — do NOT call ads_pixel_event_read first to confirm the rule exists. Look up the \`event_rule_id\` via ads_pixel_event_read ONLY when the user names the event by label (e.g. "the Purchase rule") without an ID. The user's explicit activate/deactivate request IS their intent; do not ask for confirmation.

  MULTI-STEP REQUESTS: when called as the second step of a chained request — "show me X and if INACTIVE then activate", "create then activate immediately" — execute without pausing. After ads_pixel_event_read returns INACTIVE status, immediately call this tool with \`status=ACTIVE\` in the SAME turn; after ads_pixel_event_create returns, immediately call this tool with \`status=ACTIVE\` if the user asked to activate. The chained request IS the user's complete intent.

  VERIFICATION: after activating a freshly-created event, walk the user through the VERIFICATION ladder below to confirm the event fires; if verification fails, call this tool again with \`status=INACTIVE\` to turn it off, then fix and re-verify before re-activating.

  BEHAVIOR: default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/event per input item.

  VERIFICATION ladder (after activation; stop at the first tier that works):
  (a) PLAYWRIGHT NETWORK LISTENER on URL regex \`r'https?://(www\\.)?facebook\\.com/tr/?(\\?|$)'\`. ALSO match first-party CNAME proxies (e.g. \`analytics.<domain>/tr/\` for sites using the Conversions API Gateway). The beacon transports across 3 paths — accept ALL: GET via \`new Image()\`, POST via \`fetch()\`, POST via \`sendBeacon\` with FormData. Key form fields: \`id\`=pixel, \`ev\`=event name, \`dl\`=URL, \`cd*\`=custom data fields, \`eid\`=CAPI dedup id, \`o\` carries bit flags (IS_HEADLESS:128, IS_SELENIUM:256).
  (b) FBQ() INTERCEPTION via \`page.add_init_script\` BEFORE \`page.goto\`. Use STUB-MIRROR + SETTER-REDIRECTION pattern, NOT a bare Proxy — fbevents.js replaces window.fbq during init and reads \`.queue\`/\`.callMethod\`/\`.push\`/\`.loaded\`/\`.version\`/\`.agent\`/\`._fbq\`/\`.disablePushState\` as own properties; preserve all of these on both the stub and the wrapper.
  (c) TEST EVENTS TAB in Events Manager: \`https://business.facebook.com/events_manager2/list/dataset/<PIXEL_ID>/test_events\`. Open the page, click "Open Website" to attach identity context, trigger the conversion, watch within seconds. Best human-in-the-loop path. For CAPI verification, set \`test_event_code=TEST<n>\` in the CAPI payload.
  (d) META PIXEL HELPER Chrome extension. Limitations: pre-enrichment data only, no CAPI events, no \`<noscript>\` pixels, EST events do NOT appear here, events LOST on navigation.
  (e) DEVTOOLS NETWORK filtered by \`tr\`. Ad blockers (uBlock Origin, Privacy Badger, EasyPrivacy) and CMP consent gates often block \`/tr\` and \`connect.facebook.net/*/fbevents.js\` — confirm both before assuming pixel broken.
  (f) EVENTS MANAGER OVERVIEW (lowest fidelity, hours of latency).

  NOTE: fbevents.js detects headless browsers (UA regex \`/HeadlessChrome/\`, \`navigator.webdriver\`, \`__webdriver_*\`) but does NOT suppress the \`/tr\` beacon — it just OR's IS_HEADLESS:128 into the \`o=\` field. Override the UA to a real Chrome string for clean fidelity testing.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item update requests. Currently status-only.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_parameter_create',
    description: `Creates Meta Pixel parameter extractors (CSS or CONSTANT_VALUE), linked to an existing event rule. Batch-capable.

  AUTH: requires either the \`ads_management\` or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{pixel_id, domain_uri, event_type, extractor_type, extractor_config_json?, event_rule_id?}]\`. \`extractor_type=CSS\` reads \`element.innerText\` of the matched DOM node — CANNOT read URL fragments, attribute values, or JS state. \`extractor_type=CONSTANT_VALUE\` hardcodes a string. If the value is in the URL/attributes/JS, surface that limitation; do NOT ship a CSS selector that won't match. Set \`event_rule_id\` in nearly all cases — find it via ads_pixel_event_read ONLY when the user hasn't supplied one, or use ads_pixel_event_create with embedded \`parameters\` instead for atomic event+param creation. Standalone parameters (no \`event_rule_id\`) are rare and only useful when re-attaching extractors to a pre-existing rule outside this surface.

  WHEN TO CALL DIRECTLY: if the caller's request already includes \`pixel_id\` + extractor details (\`event_type\`, \`extractor_type\`, and selector/value), call this tool DIRECTLY — do NOT call ads_pixel_event_read or ads_pixel_parameter_read first to inspect existing state. The user's explicit creation request IS their intent; do not ask for confirmation before creating.

  HARDCODE / CONSTANT VALUE: when the user says "hard-code", "set to constant", "always use value X", "force the value", or describes a static value (e.g. "currency to EUR", "content_type to product"), use \`extractor_type=CONSTANT_VALUE\` and set the value via \`extractor_config_json\`. This is a CREATE operation — do NOT call ads_pixel_parameter_read first to check what's there.

  MULTI-STEP REQUESTS: when called as the second step of a chained request ("create event X then add a CSS extractor for Y", "set up event then attach standalone parameter"), execute without pausing. After ads_pixel_event_create returns, immediately call this tool in the SAME turn with the extractor details the user requested. The chained request IS the user's complete intent.

  PARAMETER TYPE DEFAULTS (start here, deviate only with reason):
  - \`currency\` → CONSTANT_VALUE (the store's currency: USD, EUR, …)
  - \`content_type\` → CONSTANT_VALUE (usually 'product' for AddToCart/ViewContent)
  - \`value\` → CSS at the price element (\`.price\`, \`[itemprop="price"]\`)
  - \`content_ids\` → CSS at the SKU/product code on the PDP. NOT a URL pattern — CSS can't read URLs.
  - \`content_name\` → CSS at the product name (e.g. PDP \`<h1>\`)
  - \`num_items\` → CSS at cart count, or CONSTANT_VALUE=1 for single-item flows
  - \`order_id\` → CSS at the order/confirmation number on the post-purchase page
  - \`search_string\` → CSS at the search input or results-header element

  BEHAVIOR: NOT for events — use ads_pixel_event_create. Default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/parameter per input item.

  STANDARD EVENTS (names only — see ads_pixel_event_create description for full triggers + disambiguation): AddPaymentInfo, AddToCart, AddToWishlist, CompleteRegistration, Contact, CustomizeProduct, Donate, FindLocation, InitiateCheckout, Lead, Purchase (value+currency REQUIRED), Schedule, Search, StartTrial, SubmitApplication, Subscribe, ViewContent. All names are case-sensitive.

  SELECTOR PRIMER — applies to \`extractor_config_json.selector\` for \`extractor_type=CSS\`:
  - ROOT TARGET: \`TOKENIZED_BUTTON_TEXT\` rules root the selector at the CLICKED element (NOT document) — to reach an ancestor (e.g. surrounding product card), use \`closest(<sel>)\` then drill back down: \`closest(.product-card) .price\`. Without \`closest\`, descendant selectors only see DESCENDANTS of the click target. \`URL\` rules root at \`document.body\` — descendant selectors search the whole page.
  - WHAT CSS RETURNS: \`element.innerText || textContent\` of the FIRST match. CANNOT read URL fragments (\`?id=42\`, path slugs), HTML attribute values (\`data-sku\`, \`href\`), or JS / dataLayer state. If the value is not visible DOM text, surface the limitation rather than ship a non-matching selector.
  - EXTENSIONS (use inside the selector field, not standard CSS): \`closest(<sel>)\` walks UP the DOM; \`children(<index>, <sel>)\` picks the Nth child matching \`<sel>\`. NEVER emit jQuery \`:contains()\` — querySelector throws on it.
  - SELECTOR PRIORITY (most stable first): (1) stable \`id\` (\`#price\`, \`#grand-total\` — REJECT UUIDs, hex strings, React fiber tokens like \`:r1:\`, high-digit-ratio names like \`#x_42_b1c\`), (2) form \`name\` attr (\`input[name="quantity"]\`), (3) \`[data-testid="..."]\`, (4) other \`data-*\` / microdata (\`[data-product-id]\`, \`[itemprop="price"]\`, \`[itemtype*="schema.org/Product"]\`), (5) role+aria (\`[role="button"][aria-label*="Buy"]\`), (6) tag + domain-word class (\`span.price\`, \`[class*="cart-total"]\` — only if class is a real word). NEVER auto-generated classes (\`.css-1abc23\`, \`.makeStyles-root-42\`, \`.sc-htjRhB-0\`) — they change every webpack/styled-components rebuild.
  - VALIDATION: a good selector returns EXACTLY 1 element on the target page. 0 → broken; 2+ → ambiguous, refine.
  - SCHEMA.ORG / JSON-LD PRECEDENCE: when the page has \`<script type="application/ld+json">\` Product/Offer or \`[itemprop=price]\` markup, prefer SCHEMA_DOT_ORG / JSON_LD extractors over hand-rolled CSS. Per-pixel extractor precedence: CONSTANT_VALUE > CSS > URI > SCHEMA_DOT_ORG > JSON_LD > RDFA > OPEN_GRAPH > GTM > META_TAG > GLOBAL_VARIABLE — a CSS selector you write WINS over schema.org for the same parameter, so don't double-up.
  - EXTRACTOR CHOICE: CONSTANT_VALUE for static values (currency='USD', content_type='product'). CSS for visible DOM text only. If neither fits (e.g. value is in a URL fragment or an HTML attribute), surface the limitation.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item create requests. Each entry creates one parameter extractor, optionally linked to an existing event rule.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_parameter_delete',
    description: `Soft-deletes Meta Pixel parameter extractors. Batch-capable. Mirrors the same delete semantics the Events Manager Pixel UI (EST) and IWL flow use — same backend (\`EntSignalsIWLExtractorMutator::startDeletion\`); status set to archived, reversible via internal tooling.

  AUTH: requires either the \`ads_management\` or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{parameter_id}]\`. Call this tool whenever the user says delete / remove / drop / get rid of / clean up / kill / nuke / uninstall a parameter extractor. Does NOT touch the linked event rule (use ads_pixel_event_delete for that). NOT for events — use ads_pixel_event_delete.

  WHEN TO CALL DIRECTLY: if the user gave you \`parameter_id\`, call this tool DIRECTLY — do NOT call ads_pixel_parameter_read first. Look up \`parameter_id\` via ads_pixel_parameter_read ONLY when the user names the parameter by label without an ID. The user's explicit delete request IS their intent; do not ask for confirmation before deleting.

  BEHAVIOR: default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/parameter_id per input item.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item delete requests. Soft-delete only; the linked event rule is NOT touched.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_parameter_read',
    description: `Reads Meta Pixel parameter extractors. Batch-capable.

  AUTH: requires the \`ads_read\`, \`ads_management\`, or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{pixel_id?, parameter_id?, domain_uri?, event_type?}]\`. Per item: if \`parameter_id\` is set, returns that one parameter in \`parameter\` (or 404 in \`result.error\`); else if \`pixel_id\` is set, returns all MCP-visible parameters on that pixel in \`parameters\`, optionally narrowed by \`domain_uri\` / \`event_type\`.

  WHEN TO CALL: to LIST or LOOK UP parameters; also after ads_pixel_event_delete to enumerate orphaned parameters that need cleanup. Use to discover \`parameter_id\` ONLY when the caller hasn't already provided one. If the caller already supplied \`parameter_id\` for update/delete, call ads_pixel_parameter_update / ads_pixel_parameter_delete DIRECTLY — do NOT read first.

  BEHAVIOR: NOT for events — use ads_pixel_event_read. Default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/parameter(s) per input item.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item read requests. Each entry must specify either parameter_id (single-parameter lookup) or pixel_id (list parameters on that pixel).`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_pixel_parameter_update',
    description: `Patches Meta Pixel parameter extractors. Batch-capable.

  AUTH: requires either the \`ads_management\` or \`business_management\` granular OAuth scope on the caller's token (and the server-level 1P capability gate).

  INPUT: \`items=[{parameter_id, domain_uri?, event_type?, extractor_type?, extractor_config_json?, event_rule_id?}]\`. Omitted fields are unchanged. Call this tool whenever the user says edit / change / modify / swap / patch / fix / update / tweak / adjust a parameter extractor.

  WHEN TO CALL DIRECTLY: if the user gave you \`parameter_id\` + the change details, call this tool DIRECTLY — do NOT call ads_pixel_parameter_read first to inspect current state. Look up \`parameter_id\` via ads_pixel_parameter_read ONLY when the user refers to the parameter by label without an ID. The user's explicit update request IS their intent; do not ask for confirmation.

  MULTI-STEP REQUESTS: when called as the second step of a chained request — "show me parameter X and if it uses wrong selector change it to Y" — execute without pausing. After ads_pixel_parameter_read returns the current state, immediately call this tool in the SAME turn with the user's requested change. The chained request IS the user's complete intent.

  BEHAVIOR: NOT for events — use ads_pixel_event_update. Default fail-fast on first item error; pass \`partial:true\` to collect per-item errors. Returns \`results[]\` with success/error/parameter per input item.

  SELECTOR PRIMER — applies to \`extractor_config_json.selector\` for \`extractor_type=CSS\`:
  - ROOT TARGET: \`TOKENIZED_BUTTON_TEXT\` rules root the selector at the CLICKED element (NOT document) — to reach an ancestor (e.g. surrounding product card), use \`closest(<sel>)\` then drill back down: \`closest(.product-card) .price\`. Without \`closest\`, descendant selectors only see DESCENDANTS of the click target. \`URL\` rules root at \`document.body\` — descendant selectors search the whole page.
  - WHAT CSS RETURNS: \`element.innerText || textContent\` of the FIRST match. CANNOT read URL fragments (\`?id=42\`, path slugs), HTML attribute values (\`data-sku\`, \`href\`), or JS / dataLayer state. If the value is not visible DOM text, surface the limitation rather than ship a non-matching selector.
  - EXTENSIONS (use inside the selector field, not standard CSS): \`closest(<sel>)\` walks UP the DOM; \`children(<index>, <sel>)\` picks the Nth child matching \`<sel>\`. NEVER emit jQuery \`:contains()\` — querySelector throws on it.
  - SELECTOR PRIORITY (most stable first): (1) stable \`id\` (\`#price\`, \`#grand-total\` — REJECT UUIDs, hex strings, React fiber tokens like \`:r1:\`, high-digit-ratio names like \`#x_42_b1c\`), (2) form \`name\` attr (\`input[name="quantity"]\`), (3) \`[data-testid="..."]\`, (4) other \`data-*\` / microdata (\`[data-product-id]\`, \`[itemprop="price"]\`, \`[itemtype*="schema.org/Product"]\`), (5) role+aria (\`[role="button"][aria-label*="Buy"]\`), (6) tag + domain-word class (\`span.price\`, \`[class*="cart-total"]\` — only if class is a real word). NEVER auto-generated classes (\`.css-1abc23\`, \`.makeStyles-root-42\`, \`.sc-htjRhB-0\`) — they change every webpack/styled-components rebuild.
  - VALIDATION: a good selector returns EXACTLY 1 element on the target page. 0 → broken; 2+ → ambiguous, refine.
  - SCHEMA.ORG / JSON-LD PRECEDENCE: when the page has \`<script type="application/ld+json">\` Product/Offer or \`[itemprop=price]\` markup, prefer SCHEMA_DOT_ORG / JSON_LD extractors over hand-rolled CSS. Per-pixel extractor precedence: CONSTANT_VALUE > CSS > URI > SCHEMA_DOT_ORG > JSON_LD > RDFA > OPEN_GRAPH > GTM > META_TAG > GLOBAL_VARIABLE — a CSS selector you write WINS over schema.org for the same parameter, so don't double-up.
  - EXTRACTOR CHOICE: CONSTANT_VALUE for static values (currency='USD', content_type='product'). CSS for visible DOM text only. If neither fits (e.g. value is in a URL fragment or an HTML attribute), surface the limitation.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `List of per-item update requests. Omitted fields are unchanged.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `When false (default), the first item-level error aborts the call. When true, errors are collected per-item in \`results\` and processing continues.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_update_custom_audience',
    description: `Updates an existing custom audience's metadata by its ID. Supports DFCA (customer list) and WCA (website) audiences.

  ## When to use:
  - Call this tool when the user wants to update an existing custom audience's name, description, rule, or labels.
  - For DFCA: user says "rename audience", "update audience description", "add audience label".
  - For WCA: user says "update website audience rule", "change pixel targeting", "modify WCA filters".

  ## When NOT to use:
  - Do NOT use to add or remove users from a DFCA — use ads_update_custom_audience_users instead.
  - Do NOT use to create a new audience — use ads_create_custom_audience instead.
  - Do NOT use to delete an audience — use ads_delete_custom_audience instead.

  ## CRITICAL:
  - You must provide the custom_audience_id of an existing audience.
  - At least one updatable field (name, description, rule, audience_labels) must be provided.
  - For DFCA (REGULAR type): you can update name, description, audience_labels. Retention days cannot be changed for DFCA audiences.
  - For WCA (PLATFORM type): you can update name, description, rule (JSON), audience_labels. Retention is controlled via retention_seconds in the rule JSON.
  - The rule field follows the same JSON format as ads_create_custom_audience's WEBSITE subtype.

  ## Response Guidelines:
  1. Confirm the audience was updated and provide the audience_id.
  2. If the error indicates the audience was not found, suggest the user verify the audience ID.
  3. If the error indicates a permission issue, suggest the user check their access to the ad account.`,
    params: [
      {
        name: 'custom_audience_id',
        type: 'string',
        required: true,
        description: `The ID of the custom audience to update. Format: numeric ID.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'audience_labels',
        type: 'string',
        required: false,
        description: `Optional. A single label describing this audience. Applies to both DFCA (REGULAR) and WCA (PLATFORM) audiences. Labels help find audiences for ads more effectively.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional. New description for the audience.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional. New name for the audience.`,
      },
      {
        name: 'rule',
        type: 'string',
        required: false,
        description: `Optional. For WCA (PLATFORM type) audiences only. Updated rule as a JSON-encoded string. Same format as ads_create_custom_audience WEBSITE subtype rule. Ignored for DFCA (REGULAR type) audiences.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_update_custom_audience_users',
    description: `Adds or removes users in a Data File Custom Audience (DFCA / customer list) by uploading hashed PII rows. Backs the POST /{audience_id}/users API (add) or DELETE /{audience_id}/users API (remove), selected via the \`operation\` field.

  ## When to use:
  - Call this tool when the user wants to add users to an existing customer list / DFCA audience (operation="ADD", default).
  - Call this tool when the user wants to remove users from an existing DFCA audience (operation="REMOVE").
  - Use after creating an audience via ads_create_custom_audience.
  - Use when the user provides a list of customer identifiers (emails, phone numbers, mobile advertiser IDs) to upload.

  ## When NOT to use:
  - Do NOT use to create a new audience — use ads_create_custom_audience first.
  - Do NOT use for WCA/MACA/LAL audiences — those are rule-based or derived, not user-uploaded.

  ## Operation:
  - \`operation="ADD"\` (default): adds the supplied users to the audience.
  - \`operation="REMOVE"\` (also accepts \`"DELETE"\` as a synonym): removes the supplied users from the audience. Removal matches by hashed identifier just like add — supply the same schema/data shape you would use to add the user. The DFCA backend may apply low-reach safety checks: if removing the requested users would shrink the audience below minimum delivery thresholds for active campaigns, the call can be rejected with a VALIDATION error. LOOKALIKE_VALUE is ignored on REMOVE.

  ## PII handling (raw or hashed both accepted):
  - The tool accepts EMAIL, PHONE, FN, LN, ZIP, CT, ST, COUNTRY, DOB*, GEN, MADID values either pre-hashed (SHA-256 hex digest) or raw — whichever is more convenient. The tool normalizes (lowercase/trim email, strip non-digits from phone, etc.) and SHA-256 hashes raw values before they leave this server. Already-hashed values (64 lowercase hex chars) are passed through unchanged.
  - EXTERN_ID and LOOKALIKE_VALUE are NOT hashed; they are passed through as-is.
  - Empty string "" is allowed for missing values in multi-key rows.

  ## Schema field names:
  - Identifiers (raw or hashed accepted): EMAIL, PHONE, MADID, FN, LN, FI, ZIP, CT, ST, COUNTRY, DOBY, DOBM, DOBD, DOB, GEN
  - Pass-through: EXTERN_ID (advertiser-side stable ID, not hashed), LOOKALIKE_VALUE (numeric-string per-row weight, only valid for value-based audiences).
  - Legacy aliases (also accepted, signal "already hashed"): EMAIL_SHA256, PHONE_SHA256. Prefer EMAIL/PHONE — the tool figures out hashing automatically.

  ## Data layout:
  - \`data\` is a 2D array. Each inner array is one user row.
  - Inner array values must be in the same order as \`schema\`.
  - For multi-key matching (better match rate), include several columns per row, e.g. schema=[EMAIL, PHONE], data=[[hashed_email, hashed_phone], ...].

  ## Response Guidelines:
  1. Report num_received and num_invalid_entries so the user knows how many rows were accepted (or removed).
  2. After the call, suggest checking the audience status with ads_get_custom_audience — it may be processing for some minutes.
  3. If error_category is VALIDATION, the most common causes are: schema/data column mismatch, LOOKALIKE_VALUE missing on a value-based audience, invalid PII values that couldn't be normalized (e.g. malformed email format), or (on REMOVE) the deletion would shrink the audience below the low-reach safety threshold.`,
    params: [
      {
        name: 'audience_id',
        type: 'string',
        required: true,
        description: `The ID of the custom audience to upload users to. Must be an existing CUSTOM (DFCA) audience.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Rows of user data. Each inner array is one user; values are in the same order as \`schema\`. PII columns (EMAIL, PHONE, name, address, MADID, etc.) accept either raw values or pre-hashed SHA-256 hex digests — the tool normalizes and hashes raw values server-side before they reach the API. EXTERN_ID and LOOKALIKE_VALUE are passed through unchanged.`,
      },
      {
        name: 'schema',
        type: 'array',
        required: true,
        description: `Ordered list of column names describing each row in \`data\`. Examples: ["EMAIL"], ["EMAIL", "PHONE"], ["EXTERN_ID", "EMAIL", "LOOKALIKE_VALUE"]. See tool description for the full list of valid names.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
      {
        name: 'customer_consent',
        type: 'boolean',
        required: false,
        description: `Optional. Set true if the advertiser has obtained consent from the users being uploaded. Required in some regions.`,
      },
      {
        name: 'debug_identifier',
        type: 'string',
        required: false,
        description: `Optional. Caller-provided identifier echoed in server-side logs to help trace this specific upload batch.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `Optional. Which operation to perform on the audience. Values: "ADD" (default) adds the supplied users to the audience; "REMOVE" (or its synonym "DELETE") removes the supplied users from the audience. Case-insensitive.`,
      },
    ],
  },
  {
    name: 'facebookadsmcp_ads_update_entity',
    description: `Updates fields on an existing campaign, ad set, or ad.

  ## When to use:
  - Call this tool when the user wants to modify an existing ad entity.
  - Use for changing name, budget, targeting, schedule, or other fields.

  ## When NOT to use:
  - Do NOT use for creating new entities. Use ads_create_campaign, ads_create_ad_set, or ads_create_ad instead.
  - Do NOT use for activating/publishing. Use ads_activate_entity instead.
  - Do NOT use to edit an ad's creative content (media, primary text, headline, or call to action). Ad creatives are immutable; instead create a new creative with ads_create_creative, then a new ad with ads_create_ad that references the new creative_id.
  - Do NOT change a campaign's objective to a legacy value. Objective is chosen at creation; if you set it here it must be an ODAX outcome (OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_APP_PROMOTION). Legacy objectives (LINK_CLICKS, APP_INSTALLS, CONVERSIONS, REACH, etc.) are rejected with error_category=VALIDATION.

  ## Field names:
  \`fields\` takes Ads API field names, which are NOT the argument names the ads_create_* tools take. Never carry a create-tool argument name over into an update:
  - campaign: use \`name\`, \`daily_budget\`, \`lifetime_budget\`, \`bid_strategy\`, \`spend_cap\`, \`start_time\`, \`stop_time\` — NOT campaign_name, campaign_daily_budget, campaign_lifetime_budget, campaign_bid_strategy, campaign_spend_cap, campaign_start_time, campaign_stop_time.
  - ad set: use \`name\` — NOT ad_set_name.
  - ad: use \`name\` — NOT ad_name.
  Unrecognized field names are rejected with error_category=VALIDATION, as is any attempt to reparent (campaign_id on an ad set, adset_id on an ad).

  ## Response Guidelines:
  1. Confirm which fields were successfully updated. \`updated_fields\` echoes the request, not the stored state: when \`active_errors\` is present the edit landed on an unpublished draft object, so report the values as applied only if it is empty; when \`active_errors\` is absent the edit went to the live object and is already in effect.
  2. If validation errors occur, explain what needs to be corrected.`,
    params: [
      {
        name: 'ad_account_id',
        type: 'string',
        required: true,
        description: `MUST be the ad account that actually owns the entity. The update is rejected with error_category=VALIDATION when the supplied ID does not match the entity's true owner.`,
      },
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign, ad set, or ad to update.`,
      },
      {
        name: 'entity_type',
        type: 'string',
        required: true,
        description: `Type of entity to update. Values: campaign, ad_set, ad.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `JSON object of Ads API field names to new values. Use the field names from the tool description, NOT the argument names of the ads_create_* tools: a campaign budget is daily_budget / lifetime_budget and a rename is name. Unrecognized field names are rejected. Budget fields (daily_budget, lifetime_budget) must be integers in the ad account currency's minor unit (e.g. cents), so a $50.00 daily budget is 5000. Example: {"name":"New Name","daily_budget":5000}. For a campaign, only set objective if the user explicitly asks to change it, and only to an ODAX outcome (OUTCOME_AWARENESS, OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_APP_PROMOTION); legacy objectives (LINK_CLICKS, APP_INSTALLS, CONVERSIONS, REACH, etc.) are rejected with error_category=VALIDATION.`,
      },
      {
        name: 'advertiser_request',
        type: 'string',
        required: false,
        description: `Capture what the advertiser is actually asking for, in their exact words, quoted from their own messages word for word wherever you can. A question, lookup, or check counts as a real request (for example 'do I have X listed?', 'show me my Y', 'how many Z are left?'), so capture it. Pull their request from anywhere in the conversation, including across multiple turns: if they state a goal or problem early and then approve or narrow an action later (for example a brief 'yes, go ahead'), combine these into one request that keeps the action and its original subject and conditions, and capture that earlier request, not the bare confirmation. If they ask for several things, include every part, not just the one this tool handles. Stay strictly in the advertiser's own vocabulary: do not paraphrase, summarize, or shift their words into a more formal register; do not upgrade their plain words into domain or industry terms; do not phrase the request as the command or operation this tool performs; and do not add metric abbreviations or technical, product, or system field names they did not say themselves. This holds in every language: keep their phrasing in the language they used and never substitute the technical equivalent, translated or not, unless the advertiser used that term themselves. Leave this empty only when the message is pure greeting, small talk, thanks, or acknowledgment with no request of any kind; do not invent or infer a request that was not expressed. Do not include names, contact details, or other personal information.`,
      },
    ],
  },
]
