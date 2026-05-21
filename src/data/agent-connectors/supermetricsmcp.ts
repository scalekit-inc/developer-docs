import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'supermetricsmcp_accounts_discovery',
    description: `List connected ad accounts and profiles for a marketing or advertising data source.`,
    params: [
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'compress', type: 'string', required: false, description: `Whether to compress the response payload.` },
      { name: 'filter', type: 'string', required: false, description: `Text filter to narrow discovery results.` },
    ],
  },
  {
    name: 'supermetricsmcp_campaign_and_resource_get',
    description: `Retrieve campaign details, performance metrics, or related resources from an advertising platform.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Ad account or profile ID for the selected data source.` },
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'max_rows', type: 'string', required: false, description: `Maximum number of rows to return.` },
      { name: 'params', type: 'string', required: false, description: `Resource-type-specific parameters. See ResourceParams for which fields apply to each resource_type.` },
      { name: 'resource_type', type: 'string', required: false, description: `Type of resource to retrieve (e.g. \`CAMPAIGN\`, \`AD_GROUP\`).` },
    ],
  },
  {
    name: 'supermetricsmcp_campaign_create',
    description: `Create a new advertising campaign on Google Ads, Facebook Ads, TikTok Ads, LinkedIn Ads, or Microsoft Advertising.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Ad account or profile ID for the selected data source.` },
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'name', type: 'string', required: true, description: `Display name for the campaign.` },
      { name: 'ad_groups', type: 'string', required: false, description: `Ad groups (AW/AC) or ad sets (FA/TIK) to create with the campaign.` },
      { name: 'bidding_strategy', type: 'string', required: false, description: `Bidding strategy. Also accepted inside platform_settings. AW: MANUAL_CPC, MAXIMIZE_CLICKS, MAXIMIZE_CONVERSIONS, TARGET_CPA, MAXIMIZE_CONVERSION_VALUE, TARGET_ROAS. For TARGET_ROAS, set the target value via platform_settings.bidding_config.target_roas (float multiplier, e.g. 3.5 = 350% ROAS). Without it, optimizes for max value with no target. For TARGET_CPA, set target via platform_settings.bidding_config.target_cpa (float in account currency, e.g. 5.0 = $5). AC: MAX_CLICKS, MAX_CONVERSIONS, MANUAL_CPC, ENHANCED_CPC, TARGET_CPA, TARGET_ROAS, MAXIMIZE_CONVERSION_VALUE. FA: LOWEST_COST_WITHOUT_CAP (default), LOWEST_COST_WITH_BID_CAP, COST_CAP. FA also accepts TARGET_ROAS — use bidding_config.target_roas to set the target. Auto-sets OUTCOME_SALES objective, VALUE optimization, and pixel if not specified.` },
      { name: 'budget_amount', type: 'string', required: false, description: `Daily or lifetime budget amount in the account currency.` },
      { name: 'budget_type', type: 'string', required: false, description: `Budget type: DAILY or LIFETIME. LIA: only LIFETIME at campaign level. AC: LIFETIME only works on AUDIENCE campaigns.` },
      { name: 'end_date', type: 'string', required: false, description: `End of the data range (YYYY-MM-DD).` },
      { name: 'extensions', type: 'string', required: false, description: `Ad extensions (AW/AC — sitelinks, callouts, snippets; AW also supports image extensions). Ignored on FA/TIK.` },
      { name: 'platform_settings', type: 'string', required: false, description: `Platform-specific settings. AW: {campaign_type (SEARCH, DISPLAY, PERFORMANCE_MAX, SHOPPING, VIDEO, DEMAND_GEN), bidding_strategy, bidding_config (see below), network_settings}. bidding_config (AW/AC/FA): {target_roas (float multiplier, e.g. 3.5 = 350% ROAS — used with TARGET_ROAS), target_cpa (float in account currency, e.g. 5.0 = $5 — used with TARGET_CPA)}. Works the same on all platforms. AC: {campaign_type (SEARCH, AUDIENCE, SHOPPING, DYNAMIC_SEARCH, PERFORMANCE_MAX), bidding_strategy (MAX_CLICKS, MAX_CONVERSIONS, MANUAL_CPC, TARGET_CPA, TARGET_ROAS, MAXIMIZE_CONVERSION_VALUE, ENHANCED_CPC)}. FA: {objective (OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_SALES, OUTCOME_AWARENESS, OUTCOME_APP_PROMOTION), special_ad_categories, buying_type, campaign_budget_optimization (true=CBO on, budget at campaign level; false=CBO off, budget per ad set)}. TIK: {objective_type (TRAFFIC, LEAD_GENERATION, REACH, VIDEO_VIEWS, CONVERSIONS, APP_INSTALL), promotion_type (WEBSITE, APP, SHOP — defaults to WEBSITE), placement_type (PLACEMENT_TYPE_AUTOMATIC default)}.LIA: campaign-level platform_settings are optional. Ad group platform_settings are where LIA-specific options go (campaign_type, cost_type, objective_type, daily_budget).` },
      { name: 'start_date', type: 'string', required: false, description: `Start of the data range (YYYY-MM-DD).` },
      { name: 'status', type: 'string', required: false, description: `Campaign status (e.g. \`ENABLED\`, \`PAUSED\`).` },
      { name: 'targeting', type: 'string', required: false, description: `Campaign-level targeting defaults inherited by all ad groups` },
      { name: 'url_tags', type: 'string', required: false, description: `Campaign-level URL tracking parameters appended to ad links` },
    ],
  },
  {
    name: 'supermetricsmcp_campaign_update',
    description: `Update an existing advertising campaign by its ID on a supported ad platform.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Ad account or profile ID for the selected data source.` },
      { name: 'campaign_id', type: 'string', required: true, description: `Unique identifier of the campaign to update.` },
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'ad_groups', type: 'string', required: false, description: `Ad groups to create (no id) or update (with id). Only provided fields change on update.` },
      { name: 'bidding_strategy', type: 'string', required: false, description: `New bidding strategy. AW: MANUAL_CPC, MAXIMIZE_CLICKS, MAXIMIZE_CONVERSIONS, TARGET_CPA, MAXIMIZE_CONVERSION_VALUE, TARGET_ROAS. For TARGET_ROAS, set the target value via platform_settings.bidding_config.target_roas (float multiplier, e.g. 3.5 = 350% ROAS). Without it, optimizes for max value with no target. For TARGET_CPA, set target via platform_settings.bidding_config.target_cpa (float in account currency, e.g. 5.0 = $5). AC: MAX_CLICKS, MAX_CONVERSIONS, MANUAL_CPC, ENHANCED_CPC, TARGET_CPA, TARGET_ROAS, MAXIMIZE_CONVERSION_VALUE. FA: LOWEST_COST_WITHOUT_CAP, LOWEST_COST_WITH_BID_CAP, COST_CAP. FA also accepts TARGET_ROAS — use bidding_config.target_roas to set the target. IMPORTANT: FA bid strategy changes require the campaign to have a budget. CBO-off campaigns (budget at ad set level) cannot have their bid strategy changed. LOWEST_COST_WITH_BID_CAP requires bid_amount on each ad set.` },
      { name: 'budget_amount', type: 'string', required: false, description: `Daily or lifetime budget amount in the account currency.` },
      { name: 'budget_type', type: 'string', required: false, description: `New budget type: DAILY or LIFETIME. LIA: only LIFETIME at campaign level. AC: LIFETIME only works on AUDIENCE campaigns.` },
      { name: 'end_date', type: 'string', required: false, description: `End of the data range (YYYY-MM-DD).` },
      { name: 'extensions', type: 'string', required: false, description: `Replace extensions (removes old, adds new) — AW/AC. Ignored on FA/TIK.` },
      { name: 'name', type: 'string', required: false, description: `Display name for the campaign.` },
      { name: 'platform_settings', type: 'string', required: false, description: `Platform-specific settings to update. AW/AC/FA: {bidding_config: {target_roas (float, e.g. 3.5 = 350%), target_cpa (float, e.g. 5.0 = $5)}}. AW: {ad_schedule, bid_adjustments}. FA: {campaign_budget_optimization (true=CBO on, false=CBO off)}.` },
      { name: 'remove_ad_group_ids', type: 'string', required: false, description: `Ad group / ad set IDs to remove` },
      { name: 'remove_ad_ids', type: 'string', required: false, description: `Ad IDs to remove` },
      { name: 'start_date', type: 'string', required: false, description: `Start of the data range (YYYY-MM-DD).` },
      { name: 'status', type: 'string', required: false, description: `Campaign status (e.g. \`ENABLED\`, \`PAUSED\`).` },
      { name: 'targeting', type: 'string', required: false, description: `Replace campaign targeting (removes old, adds new)` },
      { name: 'url_tags', type: 'string', required: false, description: `Campaign-level URL tracking parameters appended to ad links` },
    ],
  },
  {
    name: 'supermetricsmcp_contact_supermetrics',
    description: `Send product feedback, create a support ticket, or submit a sales enquiry to Supermetrics.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `Detailed description. Include relevant context: tools used, errors encountered, data sources involved, trace IDs` },
      { name: 'subject', type: 'string', required: true, description: `Brief summary of the feedback or issue` },
      { name: 'type', type: 'string', required: true, description: `Type of contact: 'feedback' for product feedback/feature requests, 'support' for technical issues, 'sales' for sales enquiries and demo requests` },
      { name: 'category', type: 'string', required: false, description: `Support ticket category. Only used when type is 'support'` },
      { name: 'company', type: 'string', required: false, description: `Contact's company name. Required when type is 'sales'` },
      { name: 'country', type: 'string', required: false, description: `Contact's country. Required when type is 'sales'` },
      { name: 'ds_id', type: 'string', required: false, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'firstname', type: 'string', required: false, description: `Contact's first name. Required when type is 'sales'` },
      { name: 'industry', type: 'string', required: false, description: `Contact's industry. Used when type is 'sales'` },
      { name: 'lastname', type: 'string', required: false, description: `Contact's last name. Required when type is 'sales'` },
    ],
  },
  {
    name: 'supermetricsmcp_data_query',
    description: `Query marketing analytics data from any connected data source, with optional date ranges, field selection, and filters.`,
    params: [
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'compare_end_date', type: 'string', required: false, description: `End of the comparison period (YYYY-MM-DD). Required when \`compare_type\` is \`custom\`.` },
      { name: 'compare_show', type: 'string', required: false, description: `How to display the comparison:
- 'perc_change': percentage change (default)
- 'abs_change': absolute change
- 'value': raw value from the comparison period` },
      { name: 'compare_start_date', type: 'string', required: false, description: `Start of the comparison period (YYYY-MM-DD). Required when \`compare_type\` is \`custom\`.` },
      { name: 'compare_type', type: 'string', required: false, description: `Select how to compare results to an earlier period:
- 'prev_range': previous period of the same length
- 'prev_year': same period in the previous year
- 'prev_year_weekday': same weekdays in the previous year
- 'custom': user-defined period (requires compare_start_date and compare_end_date)` },
      { name: 'date_range_type', type: 'string', required: false, description: `Preset date range (e.g. \`last_30_days\`, \`last_month\`). Use instead of \`start_date\`/\`end_date\`.` },
      { name: 'ds_accounts', type: 'string', required: false, description: `List of account IDs to query data from.` },
      { name: 'end_date', type: 'string', required: false, description: `End of the data range (YYYY-MM-DD).` },
      { name: 'fields', type: 'string', required: false, description: `List of metric and dimension field names to include. Use \`field_discovery\` to find valid field names.` },
      { name: 'filters', type: 'string', required: false, description: `List of field filters to narrow the query results.` },
      { name: 'max_rows', type: 'string', required: false, description: `Maximum number of rows to return.` },
      { name: 'settings', type: 'string', required: false, description: `All data source-specific settings from data_source_discovery config mode. Pass as a JSON object. IMPORTANT: Every setting_id from data_source_discovery (report_type, common_settings, report-type-specific settings) MUST be passed inside this object — do NOT pass them as separate root-level parameters. Example: {"report_type": "TopIosApps", "country": "US", "list_type": "top-free"}` },
      { name: 'start_date', type: 'string', required: false, description: `Start of the data range (YYYY-MM-DD).` },
      { name: 'timezone', type: 'string', required: false, description: `Timezone for date calculations (e.g. \`America/New_York\`).` },
    ],
  },
  {
    name: 'supermetricsmcp_data_source_discovery',
    description: `List all available marketing and advertising data sources supported by Supermetrics.`,
    params: [
      { name: 'compress', type: 'string', required: false, description: `Whether to compress the response payload.` },
      { name: 'ds_id', type: 'string', required: false, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
    ],
  },
  {
    name: 'supermetricsmcp_field_discovery',
    description: `List available metrics and dimensions for a specific data source. Returns field names usable in \`data_query\`.`,
    params: [
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'compress', type: 'string', required: false, description: `Whether to compress the response payload.` },
      { name: 'filter', type: 'string', required: false, description: `Text filter to narrow discovery results.` },
    ],
  },
  {
    name: 'supermetricsmcp_get_async_query_results',
    description: `Retrieve results of an async \`data_query\` using the schedule ID returned by that query.`,
    params: [
      { name: 'schedule_id', type: 'string', required: true, description: `Schedule ID returned by \`data_query\` for async result retrieval.` },
      { name: 'compress', type: 'string', required: false, description: `Whether to compress the response payload.` },
    ],
  },
  {
    name: 'supermetricsmcp_get_today',
    description: `Get the current UTC date and time. Use before \`data_query\` to resolve relative date references.`,
    params: [
    ],
  },
  {
    name: 'supermetricsmcp_resources_manage',
    description: `Open the visual media picker or manage ad creative assets for a supported platform.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Ad account or profile ID for the selected data source.` },
      { name: 'ds_id', type: 'string', required: true, description: `Data source identifier (e.g. \`GA4\`, \`FA\`, \`ADWORDS\`). Use \`data_source_discovery\` to list available IDs.` },
      { name: 'action', type: 'string', required: false, description: `Action to perform on the resource (e.g. \`browse_assets\`).` },
      { name: 'asset_type', type: 'string', required: false, description: `Type of creative asset to manage (e.g. \`IMAGE\`, \`VIDEO\`).` },
      { name: 'params', type: 'string', required: false, description: `Internal action-specific parameters (used by the picker UI).` },
    ],
  },
  {
    name: 'supermetricsmcp_user_info',
    description: `Retrieve the authenticated Supermetrics user's profile information.`,
    params: [
    ],
  },
]
