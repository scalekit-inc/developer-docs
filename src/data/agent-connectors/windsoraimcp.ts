import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'windsoraimcp_contact_windsor',
    description: `Windsor.ai: Send feedback, a support request, or a feature request.

Reports a problem, shares feedback, or suggests a feature. Returns a
reference ID the user can share with Windsor.ai support.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `Type of inquiry: "feedback" for general impressions or complaints, "support" for technical issues or unexpected behavior, "feature_request" for new features or improvements.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Full message body. Include all relevant context, for example: which tools were called and in what order; connector IDs (e.g. "facebook", "google_ads"); field names and account IDs; date ranges or presets used; what you were trying to achieve; actions that did not work or were missing; what went wrong — error messages, missing or unexpected data, wrong numbers; expected vs actual behavior; steps to reproduce; or, for feature requests, the use case and the desired outcome.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Short one-line title describing the inquiry.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_create_custom_field',
    description: `Windsor.ai: Create a custom (formula) field on a connector.

A custom field is a user-defined metric or dimension computed from a
connector's existing fields; once created it behaves like a normal field in
get_fields, get_data and scheduled exports. Useful for recreating
calculated fields when migrating from another platform.

Call get_fields first for the connector's valid source field ids, and
get_custom_fields to avoid creating a duplicate. This stores configuration
in the user's Windsor.ai account — confirm the field with the user before
creating it.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector id the field belongs to, e.g. "facebook" for Meta Ads. The field is added to this connector's fields for the user's team.`,
      },
      {
        name: 'field_name',
        type: 'string',
        required: true,
        description: `Display name of the new field, e.g. "Adjusted spend". A field_id is derived from it automatically.`,
      },
      {
        name: 'field_type',
        type: 'string',
        required: true,
        description: `NUMERIC for values used in calculations (spend, CPA, ROAS, ...); TEXT for labels used to group or tag rows.`,
      },
      {
        name: 'formula',
        type: 'string',
        required: true,
        description: `Formula computing the value from the connector's existing field ids, e.g. "to_float(spend) * 1.2" or "spend / nullif(clicks, 0)". Reference source fields by their id from get_fields (call it first, do not guess). Spreadsheet-like functions are supported, including to_float, to_int, coalesce, nullif, if, lookup, replace, regexp_extract and split_string.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_create_destination_task',
    description: `Windsor.ai: Create a scheduled export of connector data to a destination.

Call get_destinations and get_destination_setup_info first for the
destination_type, its target fields and a credential_id, and get_fields
for the source field ids.

This creates recurring external state — confirm the source, destination
target, and schedule with the user before calling. Only works when the
destination's create_in_chat is true; otherwise use its setup_url. Never put
secrets in config; the user enters those in the dashboard form.`,
    params: [
      {
        name: 'config',
        type: 'string',
        required: true,
        description: `Destination target fields from get_destination_setup_info, e.g. {"gcp_project": "...", "bq_dataset": "...", "bq_table": "..."}. Never include secrets.`,
      },
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Source connector id whose data is exported, e.g. "facebook" for Meta Ads.`,
      },
      {
        name: 'destination_type',
        type: 'string',
        required: true,
        description: `Destination id from get_destinations, e.g. "big_query". Must have create_in_chat=true.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `Field ids to export, e.g. ["campaign", "date", "spend"]. Must come from get_fields — call it first, do not guess.`,
      },
      {
        name: 'accounts',
        type: 'string',
        required: false,
        description: `Optional source account ids. Default: all accounts.`,
      },
      {
        name: 'alias',
        type: 'string',
        required: false,
        description: `Optional display name for the task.`,
      },
      {
        name: 'columns_to_match',
        type: 'string',
        required: false,
        description: `Optional comma-separated key columns to upsert on, e.g. "date".`,
      },
      {
        name: 'credential_id',
        type: 'string',
        required: false,
        description: `Reusable credential_id from get_destinations / get_destination_setup_info (existing_credentials) — an OAuth connection or a stored service account. Required. If several exist, ask the user which to use.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date, e.g. "2025-09-01".`,
      },
      {
        name: 'date_preset',
        type: 'string',
        required: false,
        description: `Rolling range kept fresh on each run, e.g. "last_7d". Prefer this over fixed dates for recurring exports.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date, e.g. "2025-09-07".`,
      },
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `Optional source filter conditions, same shape as get_data's filters. May also be passed as a single JSON-encoded string of the same structure — required for clients that cannot send nested arrays (e.g. Microsoft Copilot Studio / PowerFx).`,
      },
      {
        name: 'refresh_period',
        type: 'string',
        required: false,
        description: `Interval in hours for hourly schedules, e.g. "24".`,
      },
      {
        name: 'schedule',
        type: 'string',
        required: false,
        description: `Time of day for daily schedules, "HH:MM" 24h, e.g. "08:00".`,
      },
      {
        name: 'schedule_type',
        type: 'string',
        required: false,
        description: `How often to run, from get_destination_setup_info.schedule_types. Default: "daily".`,
      },
    ],
  },
  {
    name: 'windsoraimcp_execute_action',
    description: `Windsor.ai: Execute a write action on a connector account.

Runs an action id from list_actions against an account id from
get_connectors, with params matching the action's JSON schema. This
modifies external platform state — confirm intent with the user before
invoking.`,
    params: [
      {
        name: 'account',
        type: 'string',
        required: true,
        description: `Account ID to run the action against, as returned by get_connectors.`,
      },
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action ID as returned by list_actions — call it first to get the id and params schema.`,
      },
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector ID, e.g. "facebook" for Meta Ads (Facebook & Instagram Ads), "google_ads" for Google Ads.`,
      },
      {
        name: 'params',
        type: 'string',
        required: false,
        description: `Object matching the action's JSON schema from list_actions. Omit for actions whose schema has no required params.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_connector_authorization_url',
    description: `Get the URL to connect or authorize a Windsor.ai connector.

Always call get_connectors(include_not_yet_connected=True) first to obtain the
correct connector ID. Returns a URL the user can open in their browser to set up
the connector. For OAuth connectors the link jumps straight into the provider
consent flow; for manual connectors it opens the connector's credentials form.
Use this for any request to connect, grant access to, authorize, add, replace,
or reconnect a connector account, including adding another account to an
already-connected connector.

The user opens the URL in their browser and is signed in by their existing
Windsor.ai session; if that has expired they are asked to sign in first. For
richer guidance — the auth type and, for manual connectors, the exact credential
fields required — use get_connector_connect_info instead. Do not substitute prose
dashboard navigation steps for this link.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector ID as returned by get_connectors(include_not_yet_connected=True) — do not guess it.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_connector_connect_info',
    description: `Describe how the user can grant access to a connector, to guide it in chat.

Always call get_connectors(include_not_yet_connected=True) first to obtain the
correct connector ID. Returns:
- auth_type: "oauth" if the connector needs provider consent in the browser,
  or "manual" if it is connected with credentials (e.g. an API key);
- connect_url: a link the user opens in their browser to grant access, signed
  in by their existing Windsor.ai session (or asked to sign in first if it has
  expired). For OAuth it jumps straight into the provider consent screen; for
  manual connectors it opens the credentials form prefilled for that connector;
- fields: for manual connectors, the credential fields the user must provide
  (name, type, whether required, and whether the value is sensitive). Empty for
  OAuth connectors.

Use this to answer "how do I connect/grant access to X": for OAuth, hand the
user the connect_url and tell them to authorize; for manual connectors, tell
them which fields are needed and give them the connect_url to enter them.
Sensitive fields (API keys, tokens, passwords) must be entered by the user in
that form — never ask them to paste secrets into the chat. Afterwards, confirm
the connection by calling get_connectors and reporting the new account.
Use this for any request to connect, grant access to, authorize, add, replace,
or reconnect a connector account, including adding another account to an
already-connected connector. Do not substitute prose dashboard navigation steps
for the connect_url.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `ID of the connector as returned by get_connectors(include_not_yet_connected=True). Always call that first to get the correct ID — never guess it.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_connectors',
    description: `Windsor.ai: List connectors, their accounts, write actions, and options.

By default returns only connectors that have connected accounts; pass
include_not_yet_connected=True for every available connector. Accounts carry
an id and, when available, a name. Connectors that support write actions
carry an \`actions\` list of action ids for execute_action. Connectors that
expose read options carry an \`options\` list of option ids that change what a
get_data read returns (call get_options for their meaning and values).

Covers 350+ sources: advertising (Meta Ads, Google Ads, TikTok Ads,
LinkedIn Ads), analytics (Google Analytics 4), CRM and e-commerce (HubSpot,
Shopify), payments (Stripe), warehouses (BigQuery, Snowflake), and more.

Supported connector slugs (357 total): activecampaign, adalyser, adform, adjust, adobe, adobe2, adroll, adtraction, aha, ahrefs, aimwel, aircall, airtable, all, alpha_vantage, amazon_ads, amazon_dsp, amazon_s3, amazon_sp, amazon_sqs, amazon_vendor, amplitude, apify_dataset, appfollow, apple_search_ads, applovin, appnexus, appsflyer, apsis_one, ashby, attentive, auth0, awin, aws_cloudtrail, azure_table, babelforce, bamboo_hr, basis_dsp, big_query, bigcommerce, bing, bing_webmaster, bling, boxcast, braintree, branch, braze, breezometer, callrail, captain_data, cart, chargebee, chargify, chartmogul, cj, clickmagick, clickup_api, clockify, close_com, cm360, coda, coin_api, coinmarketcap, commercetools, commissionfactory, configcat, confluence, contractors_cloud, convertkit, convex, copper, courier, criteo, currency_conversion, customer_io, daisycon, datadog, datamediq, datascope, delighted, digistorm, dixa, dockerhub, dragonmetrics, dremio, drift, dv360, dynamics365, emailoctopus, everflow, everhour, exchange_rates, exoclick, facebook, facebook_leads, facebook_organic, faker, fastbill, fauna, file, firebolt, firstpromoter, flashtalking, flexport, freshcaller, freshdesk, freshsales, freshservice, fullstory, gainsight_px, gemius, genesys, getlago, github, gitlab, glassfrog, gmailcsv, gnews, gocardless, gohighlevel, gong, google_ad_manager, google_ads, google_merchant, google_my_business, google_pagespeed, google_search_ads, google_webfonts, google_workspace_admin_reports, googleanalytics, googleanalytics4, googlesheets, gravity_forms, greenhouse, gridly, harness, harvest, hawk_dsp, hellobaton, hubplanner, hubspot, idealo, impact, incomeaccess, insightly, instagram, instagram_public, instatus, intercom, intruder, ip2whois, iterable, jira, k6cloud, klarna, klaus_api, klaviyo, kommo, kustomer_singer, kyriba, kyve, launchdarkly, leadinfo, lemlist, lever_hiring, line, line_ads, linkedin, linkedin_organic, linnworks, lokalise, looker, magento, mailchimp, mailerlite, mailersend, mailgun, mailjet_mail, mailjet_sms, matomo, mediago, merge, metabase, metricool, microsoft_clarity, microsoft_dataverse, microsoft_teams, mixpanel, mntn, monday, mongodb, my_hours, mysql, n8n, nasa, netsuite, news_api, nextdoor, notion, nytimes, okta, omnisend, onesignal, openai_ads, openweather, opsgenie, orb, orbit, oura, outbrain, outreach, pagerduty, pardot, partnerize, partnerstack, paypal_transaction, paystack, pendo, persistiq, pexels_api, pinterest, pinterest_organic, pipedrive, pivotal_tracker, plaid, plausible, pocket, pokeapi, polygon_stock_api, postgresql, posthog, prestashop, primetric, productive, profitwell, punk_api, pypi, qonto, qualaroo, quickbooks, quora, railz, rakuten_advertising, rd_station_marketing, readpeak, recharge, recreation, recruitee, recurly, reddit, redshift, reply_io, retently, rki_covid, rocket_chat, rss, rtbhouse, salesforce, salesforce_marketing, salesloft, sap_fieldglass, search_metrics, searchconsole, secoda, semrush, sendgrid, sendinblue, senseforce, sentry, serpstat, sftp, sftp_bulk, shareasale, shiphero, shopify, shortio, similarweb, simplifi, slack, smaily, smartengage, smartsheets, snapchat, snowflake, sonar_cloud, spotify, sproutsocial, square, stackadapt, statuspage, strava, stripe, supabase, survey_sparrow, surveycto, surveymonkey, taboola, teads, tempo, the_guardian_api, threads, ticimax, tiktok, tiktok_organic, tiktok_shop, timely, tmdb, todoist, toggl, tradedesk, tradedoubler, trafficjunky, trello, triplewhale, trustpilot, tvmaze_schedule, twilio, twilio_taskrouter, twinred, twitter, typeform, unleash, us_census, vantage, vibe, visma_economic, vitally, waiteraid, walmart, weatherstack, webflow, wikipedia_pageviews, woocommerce, wordpress, workable, workramp, wrike, x_organic, xero, yahoo_finance_price, yahoo_japan, yandex_metrica, yotpo, yougov_brandindex, younium, youtube, zapier_supported_storage, zendesk_chat, zendesk_sell, zendesk_sunshine, zendesk_support, zendesk_talk, zenefits, zenloop, zoho, zoom, zuora.`,
    params: [
      {
        name: 'include_actions',
        type: 'boolean',
        required: false,
        description: `Default True: include each connector's write-action ids. False skips the per-connector actions fetch when only account info is needed.`,
      },
      {
        name: 'include_not_yet_connected',
        type: 'boolean',
        required: false,
        description: `Default False: only connectors with connected accounts. True: every available connector.`,
      },
      {
        name: 'include_options',
        type: 'boolean',
        required: false,
        description: `Default True: include each connector's read-option ids (controls that change what a get_data read returns). False skips the per-connector options fetch when only account info is needed.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_current_user',
    description: `Windsor.ai: Get the authenticated user's username, email and plan.

\`plan_id\`, \`plan_name\` and \`is_paid\` come from the live Windsor.ai
profile; they are null when the profile lookup fails, which means the
plan is unknown — not that the user is on a free plan.`,
    params: [],
  },
  {
    name: 'windsoraimcp_get_custom_fields',
    description: `Windsor.ai: List the user's custom (formula) fields across connectors.

A custom field is a user-defined metric or dimension computed from a
connector's existing fields with a formula (for example spend times a
margin, or a CPA). Each entry reports the connector it belongs to, its
field_name, the generated field_id used in get_data/get_fields, its type
(NUMERIC or TEXT), and the formula.

Call this before create_custom_field to see which fields already exist and
avoid creating duplicates.`,
    params: [],
  },
  {
    name: 'windsoraimcp_get_data',
    description: `Windsor.ai: Retrieve data from a connector.

Call get_fields first — field IDs must come from it.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector ID, e.g. "facebook" for Meta Ads (Facebook & Instagram Ads), "google_ads" for Google Ads. Call get_connectors if unsure or on error.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `Field IDs to retrieve, e.g. ["campaign", "date", "spend"]. Must come from get_fields — call it first, do not guess field names.`,
      },
      {
        name: 'accounts',
        type: 'string',
        required: false,
        description: `Optional account IDs, e.g. ["1234567890"]. Default: all accounts. Pass a subset to keep the response small.`,
      },
      {
        name: 'date_filters',
        type: 'string',
        required: false,
        description: `Per-table date columns used instead of the defaults, e.g. {"orders": "created_at"}. Required for warehouse connectors (mysql, postgresql, redshift, mongodb, snowflake, big_query) when filtering by date.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date, e.g. "2025-09-01".`,
      },
      {
        name: 'date_preset',
        type: 'string',
        required: false,
        description: `Predefined range: "last_Xd", "last_Xw", "last_Xm", "last_Xy" (last X days/weeks/months/years), "last_year", "last_2years", "this_month", "this_year". Append "T" to include today — valid only as "last_XdT", "last_yearT", "last_2yearsT", "this_monthT", "this_yearT". E.g. "last_7d", "this_monthT".`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date, e.g. "2025-09-07".`,
      },
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `Filter conditions. A condition is ["<field>", "<operator>", <value>] or the equivalent dict {"field": ..., "operation": ..., "value": ...}; combine with "and"/"or" strings; nesting allowed. Operators: eq, neq, gt, gte, lt, lte, contains, ncontains, null, notnull, in (value is a JSON-array-encoded string of exact alternatives, e.g. ["campaign", "in", "[\\"Summer\\",\\"Autumn\\"]"]). E.g. [["spend", "gt", 100]], [{"field": "spend", "operation": "gt", "value": 100}] or [[["campaign", "eq", "Summer"], "or", ["spend", "eq", 10]], "and", ["clicks", "notnull", null]]. May also be passed as a single JSON-encoded string of the same structure — required for clients that cannot send nested arrays (e.g. Microsoft Copilot Studio / PowerFx): "[[\\"spend\\", \\"gt\\", 100]]".`,
      },
      {
        name: 'options',
        type: 'string',
        required: false,
        description: `Connector options, e.g. {"attribution_window": "7d_view,1d_click"}.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_destination_setup_info',
    description: `Windsor.ai: Describe how to set up a scheduled export to a destination.

Always call get_destinations first to get the correct destination id.
Returns the auth type, the target fields describing where data is written,
the allowed schedules, reusable credentials (OAuth or service account), and
a setup_url link to the dashboard form.

Sensitive fields (service accounts, passwords, keys) are entered by the user
in the setup_url form — never ask them to paste secrets into chat. When
create_in_chat is true, collect the non-sensitive target fields and call
create_destination_task; otherwise hand the user the setup_url.`,
    params: [
      {
        name: 'destination_type',
        type: 'string',
        required: true,
        description: `Destination id as returned by get_destinations, e.g. "big_query" or "googlesheets". Call get_destinations first — never guess it.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_destination_tasks',
    description: `Windsor.ai: List the scheduled export tasks the user has created.

A destination task is a recurring export of a connector's data to a
destination. Each entry reports its id, destination type and name, alias,
source connector, schedule, and status (active, paused, or deactivated),
plus a manage_url to open it in the dashboard.

Use this when the user asks what exports, syncs, or destination tasks they
already have, or before creating one to avoid duplicates.`,
    params: [],
  },
  {
    name: 'windsoraimcp_get_destinations',
    description: `Windsor.ai: List destinations that can receive scheduled data exports.

A destination is where Windsor.ai repeatedly writes a connector's data on a
schedule — BigQuery, Google Sheets, Snowflake, a database, or cloud storage.
Each entry reports its type, whether a task can be created here
(create_in_chat), and any reusable credentials the user already has (an
OAuth connection or a stored service account).

Call this first when the user wants to export, send, sync, or schedule
connector data, then get_destination_setup_info for the chosen destination.`,
    params: [],
  },
  {
    name: 'windsoraimcp_get_fields',
    description: `Windsor.ai: Discover valid field IDs for a connector.

Returns field IDs with descriptions, types, and tables. Omit "fields" to
list all. Required before get_data: field IDs passed to get_data must come
from this tool — do not guess field names.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector ID, e.g. "facebook" for Meta Ads (Facebook & Instagram Ads), "google_ads" for Google Ads. Call get_connectors if unsure or on error.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Field IDs to describe, e.g. ["campaign", "spend"]. Omit to list all valid field IDs.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_options',
    description: `Windsor.ai: Get fields, date-filter columns, and options for a connector.

Returns available field IDs, per-table date-filter columns, and
connector-specific options for the given connector and accounts.`,
    params: [
      {
        name: 'accounts',
        type: 'string',
        required: true,
        description: `Account IDs, e.g. ["1234567890"].`,
      },
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector ID, e.g. "facebook" for Meta Ads (Facebook & Instagram Ads), "google_ads" for Google Ads. Call get_connectors if unsure or on error.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_subscription_url',
    description: `Get a one-click Markdown link to the Windsor.ai pricing page.

Returns a clickable link to the Windsor.ai pricing page, or to a specific
plan's upgrade page when target_plan is given. The user
completes any checkout themselves in their browser; the tool only returns
the link and does not take payment or change the plan.`,
    params: [
      {
        name: 'target_plan',
        type: 'string',
        required: false,
        description: `Optional plan to pre-select on the upgrade page. Omit to send the user to the general pricing page.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_get_windsor_login_url',
    description: `Windsor.ai: Get a URL into the Windsor.ai dashboard.

The user opens it in their browser and is signed in by their existing
Windsor.ai session; if that has expired they are asked to sign in first.
next_path optionally deep-links to a specific page.`,
    params: [
      {
        name: 'next_path',
        type: 'string',
        required: false,
        description: `Optional post-login path, e.g. "/app/facebook", "/destinations", "/billing". Omit for the dashboard home.`,
      },
    ],
  },
  {
    name: 'windsoraimcp_list_actions',
    description: `Windsor.ai: List a connector's write actions with their param JSON schemas.

Meta Ads ("facebook"): create/pause/enable campaigns, ad sets, and ads;
set campaign and ad set budgets; boost an organic post. Google Ads
("google_ads"): create campaigns, ad groups, and responsive search ads;
pause/enable campaigns, ad groups, and ads; set campaign budget, bidding
strategy, target CPA, max CPC, and CPC bid ceiling; push negative keywords.
TikTok Ads ("tiktok"): pause/enable campaigns, ad groups, and ads; set
campaign and ad group budgets. LinkedIn Ads ("linkedin"): pause/enable
campaign groups, campaigns, and creatives; set campaign group and campaign
budgets. Microsoft Ads / Bing ("bing"): pause/enable campaigns and ad
groups; set campaign budget. Instagram ("instagram"): create an image post.
Other connectors return an empty list. The actual set is whatever this tool
returns — do not assume an action exists. Inspect an action's schema
before execute_action.`,
    params: [
      {
        name: 'connector',
        type: 'string',
        required: true,
        description: `Connector ID, e.g. "facebook" for Meta Ads (Facebook & Instagram Ads), "google_ads" for Google Ads. Call get_connectors if unsure.`,
      },
    ],
  },
]
