import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'heyreach_add_leads_to_campaign',
    description: `Add up to 100 leads to an existing HeyReach campaign. The campaign must be in an ACTIVE state (IN_PROGRESS), or use resumeFinishedCampaign / resumePausedCampaign to auto-resume. Each lead is bound to a specific LinkedIn sender account (linkedInAccountId) that will send the outreach. Use heyreach_get_campaign_by_id to find the campaign's sender accounts (campaignAccountIds). Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'accountLeadPairs',
        type: 'array',
        required: true,
        description: `Array of lead + sender account pairs to add to the campaign (max 100). Each pair binds a lead to the LinkedIn sender account that will reach out. Minimum required per lead: profileUrl.`,
      },
      {
        name: 'campaignId',
        type: 'integer',
        required: true,
        description: `The ID of the HeyReach campaign to add leads to. Get campaign IDs from heyreach_get_all_campaigns.`,
      },
      {
        name: 'resumeFinishedCampaign',
        type: 'boolean',
        required: false,
        description: `If true and the target campaign is in FINISHED state, HeyReach will resume it so the new leads can be processed. Defaults to false.`,
      },
      {
        name: 'resumePausedCampaign',
        type: 'boolean',
        required: false,
        description: `If true and the target campaign is in PAUSED state, HeyReach will resume it so the new leads can be processed. Defaults to false.`,
      },
    ],
  },
  {
    name: 'heyreach_check_api_key',
    description: `Verify that your HeyReach API key is valid and the connection is working. Returns HTTP 200 with empty body on success. Use this to validate a connection before making other API calls.`,
    params: [],
  },
  {
    name: 'heyreach_get_all_campaigns',
    description: `List all LinkedIn outreach campaigns in your HeyReach account with pagination. Returns campaign metadata including status (DRAFT, IN_PROGRESS, PAUSED, FINISHED, FAILED), progress stats, associated lead list, and campaignAccountIds (LinkedIn sender account IDs needed for heyreach_get_overall_stats). Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of campaigns to return. Defaults to 10.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'heyreach_get_all_linkedin_accounts',
    description: `List the LinkedIn sender accounts (connected LinkedIn profiles) in your HeyReach workspace with pagination. Returns each account's ID, name, profile URL, and status. Use the returned account IDs as linkedInAccountId when calling heyreach_add_leads_to_campaign, or as AccountIds in heyreach_get_overall_stats. Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Optional search keyword to filter accounts by name.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of LinkedIn accounts to return. Max 100. Defaults to 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'heyreach_get_all_lists',
    description: `List all lead lists in your HeyReach account with pagination. Returns list metadata including name, total lead count, list type, creation date, and associated campaign IDs. Use list IDs with heyreach_get_leads_from_list to retrieve leads. Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of lists to return. Defaults to 10.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'heyreach_get_campaign_by_id',
    description: `Retrieve detailed information about a specific HeyReach campaign by its ID. Returns campaign status, progress stats (total users, in progress, finished, failed), associated lead list, and LinkedIn sender accounts. Use get_all_campaigns first to find campaign IDs.`,
    params: [
      {
        name: 'campaignId',
        type: 'integer',
        required: true,
        description: `The unique ID of the campaign to retrieve. Get campaign IDs from heyreach_get_all_campaigns.`,
      },
    ],
  },
  {
    name: 'heyreach_get_conversations',
    description: `List LinkedIn inbox conversations across your HeyReach sender accounts with pagination and filters. Returns conversation metadata: participants, last message, seen/unseen status, associated campaign and account. Filter by LinkedIn account IDs, campaign IDs, lead profile URL, tags, search string, or seen status. Useful to monitor replies to outreach sent via heyreach_add_leads_to_campaign. Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'campaignIds',
        type: 'array',
        required: false,
        description: `Filter conversations to these campaign IDs. Get campaign IDs from heyreach_get_all_campaigns.`,
      },
      {
        name: 'leadLinkedInId',
        type: 'string',
        required: false,
        description: `Filter to conversations with a specific lead by their LinkedIn internal ID.`,
      },
      {
        name: 'leadProfileUrl',
        type: 'string',
        required: false,
        description: `Filter to conversations with a specific lead by their LinkedIn profile URL.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of conversations to return (1-100). Defaults to 10 — a client-side cap applied in the jsonnet template to protect LLM context, since the HeyReach API's own default (~100) can return 400KB+ payloads. Pass a larger value explicitly if you need more.`,
      },
      {
        name: 'linkedInAccountIds',
        type: 'array',
        required: false,
        description: `Filter conversations to these LinkedIn sender account IDs. Get account IDs from heyreach_get_all_linkedin_accounts.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination. Defaults to 0.`,
      },
      {
        name: 'searchString',
        type: 'string',
        required: false,
        description: `Free-text search across conversation content and participant names.`,
      },
      {
        name: 'seen',
        type: 'boolean',
        required: false,
        description: `Filter by seen status. true = only seen conversations, false = only unseen. Omit to return both.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Filter conversations by lead tags.`,
      },
    ],
  },
  {
    name: 'heyreach_get_lead',
    description: `Retrieve detailed information about a single HeyReach lead by their LinkedIn profile URL. Returns the lead's profile data (name, headline, location, company, position), email addresses (emailAddress, enrichedEmailAddress, customEmailAddress), tags, and custom fields. Useful to verify a lead exists in HeyReach before or after adding them to a campaign. Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'profileUrl',
        type: 'string',
        required: true,
        description: `The public LinkedIn profile URL of the lead to look up. Example: https://www.linkedin.com/in/janedoe`,
      },
    ],
  },
  {
    name: 'heyreach_get_leads_from_list',
    description: `Retrieve leads from a specific HeyReach lead list with pagination. Returns detailed lead profiles including LinkedIn URL, name, headline, location, company, position, tags, and email addresses. Use heyreach_get_all_lists to find list IDs. Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'listId',
        type: 'integer',
        required: true,
        description: `The unique ID of the lead list to retrieve leads from. Get list IDs from heyreach_get_all_lists.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of leads to return. Defaults to 10 — a client-side cap applied in the jsonnet template to protect LLM context, since lists can hold thousands of leads (observed: 4,054). Pass a larger value explicitly if you need more.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'heyreach_get_overall_stats',
    description: `Retrieve overall performance statistics for specific LinkedIn sender accounts and campaigns. Returns aggregate metrics including connection requests sent and accepted, messages sent and replied, InMail stats, and calculated rates (connection acceptance rate, message reply rate). Rate limit: 300 requests/minute.`,
    params: [
      {
        name: 'AccountIds',
        type: 'array',
        required: true,
        description: `IDs of the LinkedIn sender accounts (connected LinkedIn profiles) assigned to run this campaign. Each campaign has one or more sender accounts.`,
      },
      {
        name: 'CampaignIds',
        type: 'array',
        required: true,
        description: `Array of campaign IDs to retrieve stats for. Get campaign IDs from heyreach_get_all_campaigns.`,
      },
    ],
  },
]
