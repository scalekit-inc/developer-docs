import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'lemlistmcp_add_contacts_to_list',
    description: `Add existing CRM contacts to a contact list by list ID.`,
    params: [
      { name: 'contactIds', type: 'array', required: true, description: `Contact IDs to add to the list (max 1,000)` },
      { name: 'listId', type: 'string', required: true, description: `Target contact list ID in clt_xxx format. Get valid IDs from get_contact_lists.` },
    ],
  },
  {
    name: 'lemlistmcp_add_leads_to_campaign',
    description: `Add one or more leads (max 100) to a campaign. Each lead requires at least one identifying field such as email, first name, last name, or company name.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `The campaign ID (starts with cam_)` },
      { name: 'leads', type: 'array', required: true, description: `Leads to add (1..100). Each lead must have at least one identifying field.` },
      { name: 'deduplicate', type: 'boolean', required: false, description: `Avoid duplicates across campaigns (default: false). When true, existing leads in OTHER campaigns are reported as outcome="skippedDuplicateCrossCampaign".` },
      { name: 'findEmail', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS per lead: Find email address from other lead data (LinkedIn, name, company)` },
      { name: 'findPhone', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS per lead: Find phone number from other lead data` },
      { name: 'linkedinEnrichment', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS per lead: Enrich each lead with LinkedIn profile data (job title, company info, etc.)` },
      { name: 'verifyEmail', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS per lead: Verify if the email address is valid and deliverable` },
    ],
  },
  {
    name: 'lemlistmcp_add_sequence_step',
    description: `Add a step to an existing campaign sequence. Use only for modifying already-created campaigns — not for initial campaign creation.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `Campaign ID (cam_xxx)` },
      { name: 'delay', type: 'number', required: true, description: `Days to wait after previous step. Must be 0 for "sendToAnotherCampaign" (the lemlist API does not accept a delay for this type, transfer is immediate).` },
      { name: 'sequenceId', type: 'string', required: true, description: `Sequence ID (seq_xxx)` },
      { name: 'userConfirmed', type: 'boolean', required: true, description: `Must be true after user confirms` },
      { name: 'altMessage', type: 'string', required: false, description: `Alternative message variation for "linkedinSend" steps (used as second-attempt content when applicable).` },
      { name: 'conditionKey', type: 'string', required: false, description: `Condition to check (REQUIRED when type is "conditional"). E.g. emailsOpened, linkedinInviteAccepted.` },
      { name: 'delayType', type: 'string', required: false, description: `REQUIRED for all conditional steps. "within" = must happen within delay days, "waitUntil" = wait indefinitely. For field-check conditions (hasEmailAddress, hasLinkedinUrl, etc.), use "within" with delay 0.` },
      { name: 'emailStatusFilter', type: 'array', required: false, description: `Only for hasEmailAddress condition. Filter by email verification status. E.g. ["deliverable"] to only match leads with deliverable email. Omit to check if any email exists.` },
      { name: 'index', type: 'number', required: false, description: `Zero-based position where to insert the step (0 = first). Omit to append at the end. Use to insert warm-up steps before an existing step (e.g. Like + Comment before an Invite).` },
      { name: 'message', type: 'string', required: false, description: `Message content (REQUIRED when type is "email", "linkedinSend", "whatsappMessage" or "sms"; OPTIONAL but recommended for "linkedinInvite"). For emails: the HTML body. For LinkedIn/WhatsApp/SMS/tasks: the message text.` },
      { name: 'method', type: 'string', required: false, description: `REQUIRED when type="api". HTTP method (GET or POST) used by the webhook call. Limited to GET/POST to stay iso with the lemlist UI editor.` },
      { name: 'recordMode', type: 'string', required: false, description: `linkedinVoiceNote only: "ai" generates audio from text via ElevenLabs (user adds the text after); "manual" (default) requires user-recorded audio after step creation.` },
      { name: 'scoreComparator', type: 'string', required: false, description: `Only for hasScore condition. "$gte" = score is above or equal to threshold, "$lt" = score is below threshold. Defaults to "$gte".` },
      { name: 'scoreThreshold', type: 'number', required: false, description: `Only for hasScore condition. Score threshold value (0-100). Defaults to 80.` },
      { name: 'subject', type: 'string', required: false, description: `Email subject line. Required for the first email; omit for follow-ups to send as reply thread. Supports Liquid syntax: {{ firstName }}, {% if condition %}...{% endif %}` },
      { name: 'targetCampaignId', type: 'string', required: false, description: `REQUIRED when type is "sendToAnotherCampaign". Target campaign ID (cam_xxx) the lead is moved to. Must belong to the same team as the parent campaign and not be archived. Avoid cycles (A -> B -> A).` },
      { name: 'title', type: 'string', required: false, description: `Task title (for manual/phone steps). Short label displayed in the review UI.` },
      { name: 'type', type: 'string', required: false, description: `Type of step. Use "conditional" for branching based on lead behavior, "sendToAnotherCampaign" to move a lead to another campaign, "api" to fire an outbound HTTP webhook (provide method and url).` },
      { name: 'url', type: 'string', required: false, description: `REQUIRED when type="api". Webhook URL fired during sequence execution. Supports Liquid templating against lead variables (e.g. https://example.com/leads/{{ _id }}). For POST, the request body is automatically the lead data; custom bodies and custom headers are not supported.` },
    ],
  },
  {
    name: 'lemlistmcp_add_unsubscribe',
    description: `Add email to unsubscribe blocklist. Blocks all future campaign sends. Use delete_unsubscribe to reverse.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `The email address to add to the unsubscribe list` },
    ],
  },
  {
    name: 'lemlistmcp_bulk_enrich_data',
    description: `Enrich up to 500 contacts with additional data in a single call. Returns a dataRef for polling results asynchronously.`,
    params: [
      { name: 'items', type: 'array', required: true, description: `Array of enrichment items (max 500)` },
    ],
  },
  {
    name: 'lemlistmcp_bulk_get_enrichment_results',
    description: `Poll the results of one or more enrichment jobs. Provide a dataRef from bulk_enrich_data or a nextPollRef from a previous poll.`,
    params: [
      { name: 'dataRef', type: 'string', required: false, description: `dataRef from bulk_enrich_data (first poll) OR nextPollRef from a previous poll result (subsequent polls). Mutually exclusive with enrichmentIds.` },
      { name: 'enrichmentIds', type: 'array', required: false, description: `Array of enrichment IDs to poll (1-500, enr_xxx format). Mutually exclusive with dataRef.` },
    ],
  },
  {
    name: 'lemlistmcp_call_api',
    description: `Make a direct call to the Lemlist API using a specified endpoint and method. Requires load_skill('api-reference') to be called first in the session.`,
    params: [
      { name: 'endpoint', type: 'string', required: true, description: `API endpoint path starting with /api/` },
      { name: 'method', type: 'string', required: true, description: `HTTP method` },
      { name: 'body', type: 'object', required: false, description: `Request body for POST/PUT/PATCH (optional)` },
      { name: 'confirmed', type: 'boolean', required: false, description: `Set to true after user confirms a write/delete action` },
    ],
  },
  {
    name: 'lemlistmcp_check_domain_health',
    description: `Check DNS health for email sending domains (MX, SPF, DMARC, blacklists). Returns score (0-100), per-check status, and DNS fix records.`,
    params: [
      { name: 'domain', type: 'string', required: false, description: `Domain to check (e.g. example.com). If omitted, checks domains from team members.` },
      { name: 'mailboxId', type: 'string', required: false, description: `Mailbox ID to check DNS for.` },
      { name: 'scope', type: 'string', required: false, description: `Check scope: user (current user) or team (all members). Default: team.` },
    ],
  },
  {
    name: 'lemlistmcp_connect_email_account',
    description: `Connect a custom SMTP/IMAP email account for sending and receiving emails in Lemlist campaigns.`,
    params: [
      { name: 'imap_host', type: 'string', required: true, description: `IMAP server hostname (e.g., "imap.company.com")` },
      { name: 'imap_login', type: 'string', required: true, description: `IMAP authentication login (usually the email address)` },
      { name: 'imap_password', type: 'string', required: true, description: `IMAP authentication password or app password` },
      { name: 'imap_port', type: 'number', required: true, description: `IMAP server port (typically 993 for TLS)` },
      { name: 'sender_email', type: 'string', required: true, description: `Email address to send from (e.g., "john@company.com")` },
      { name: 'sender_name', type: 'string', required: true, description: `Display name for the sender (e.g., "John Doe")` },
      { name: 'smtp_host', type: 'string', required: true, description: `SMTP server hostname (e.g., "smtp.company.com")` },
      { name: 'smtp_login', type: 'string', required: true, description: `SMTP authentication login (usually the email address)` },
      { name: 'smtp_password', type: 'string', required: true, description: `SMTP authentication password or app password` },
      { name: 'smtp_port', type: 'number', required: true, description: `SMTP server port (typically 587 for TLS or 465 for SSL)` },
      { name: 'imap_secure', type: 'boolean', required: false, description: `Optional: Use TLS for IMAP connection (default: true)` },
      { name: 'smtp_secure', type: 'boolean', required: false, description: `Optional: Use TLS for SMTP connection (default: true)` },
    ],
  },
  {
    name: 'lemlistmcp_create_campaign_from_proposal',
    description: `Create a campaign from a previously validated sequence proposal. Requires a proposal ID generated by propose_sequence.`,
    params: [
      { name: 'sequenceItemId', type: 'string', required: true, description: `Workspace item id of the validated sequence (from propose_sequence)` },
      { name: 'userConfirmed', type: 'boolean', required: true, description: `Must be true after the user explicitly approves campaign creation` },
      { name: 'emoji', type: 'string', required: false, description: `Optional emoji for the campaign` },
      { name: 'name', type: 'string', required: false, description: `Campaign name (defaults to the sequence proposal name)` },
      { name: 'timezone', type: 'string', required: false, description: `Timezone for the campaign (e.g. Europe/Paris)` },
    ],
  },
  {
    name: 'lemlistmcp_create_campaign_with_sequence',
    description: `Create campaign. If subject AND body are provided, creates the first email step. If omitted, creates an empty sequence (use add_sequence_step to add a condition or any step type as the first step). Call add_sequence_step for each additional step. Supports Liquid syntax.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the campaign` },
      { name: 'body', type: 'string', required: false, description: `Email body content for the first email (supports Liquid syntax). Omit both subject and body to create campaign without a first step.` },
      { name: 'emoji', type: 'string', required: false, description: `Optional emoji for the campaign (e.g., 🚀, 💎, 🔥)` },
      { name: 'subject', type: 'string', required: false, description: `Subject line for the first email (supports Liquid syntax). Omit both subject and body to create campaign without a first step (e.g. when first step is a condition).` },
      { name: 'timezone', type: 'string', required: false, description: `Timezone for the campaign (e.g., Europe/Paris, America/New_York)` },
    ],
  },
  {
    name: 'lemlistmcp_create_contact_list',
    description: `Create a new static contact list in the CRM to organize and group contacts.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the contact list to create (max 200 characters)` },
    ],
  },
  {
    name: 'lemlistmcp_create_or_update_company',
    description: `Create a new company in the user's Lemlist company database, or update an existing one (upsert). Requires both a name AND a domain. If a company with the same domain, LinkedIn URL, or Sales Navigator URL already exists, it will be updated instead of creating a duplicate. Returns the company data and whether it was created or updated.`,
    params: [
      { name: 'domain', type: 'string', required: true, description: `Company domain (required)` },
      { name: 'name', type: 'string', required: true, description: `Company name (required)` },
      { name: 'companyOwner', type: 'string', required: false, description: `Company owner email or user ID (usr_xxx format)` },
      { name: 'industry', type: 'string', required: false, description: `Company industry` },
      { name: 'linkedinUrl', type: 'string', required: false, description: `Company LinkedIn profile URL` },
      { name: 'linkedinUrlSalesNav', type: 'string', required: false, description: `Company LinkedIn Sales Navigator URL (used as an additional matching key for upsert)` },
      { name: 'location', type: 'string', required: false, description: `Company location or address` },
      { name: 'picture', type: 'string', required: false, description: `Company logo URL` },
    ],
  },
  {
    name: 'lemlistmcp_create_or_update_contact',
    description: `Create a new contact in the user's Lemlist contact database, or update an existing one (upsert). Requires at least an email OR linkedinUrl as identifier. If a contact with the same email or LinkedIn URL already exists, it will be updated instead of creating a duplicate. Returns the contact data and whether it was created or updated. Use search_contacts first to check if the contact already exists.`,
    params: [
      { name: 'companyDomain', type: 'string', required: false, description: `Company domain to link the contact to a company (alternative to companyId)` },
      { name: 'companyId', type: 'string', required: false, description: `Company ID to associate the contact with` },
      { name: 'companyLinkedinUrl', type: 'string', required: false, description: `Company LinkedIn URL to link the contact to a company (alternative to companyId)` },
      { name: 'contactOwner', type: 'string', required: false, description: `Contact owner email or user ID (usr_xxx format)` },
      { name: 'email', type: 'string', required: false, description: `Contact email address (required if linkedinUrl is not provided)` },
      { name: 'firstName', type: 'string', required: false, description: `Contact first name` },
      { name: 'jobDescription', type: 'string', required: false, description: `Contact job description` },
      { name: 'jobTitle', type: 'string', required: false, description: `Contact job title` },
      { name: 'lastName', type: 'string', required: false, description: `Contact last name` },
      { name: 'linkedinUrl', type: 'string', required: false, description: `Contact LinkedIn profile URL (required if email is not provided)` },
      { name: 'phone', type: 'string', required: false, description: `Contact phone number` },
      { name: 'picture', type: 'string', required: false, description: `Contact profile picture URL` },
      { name: 'salesnavUrl', type: 'string', required: false, description: `Contact LinkedIn Sales Navigator URL (used as an additional matching key for upsert)` },
      { name: 'timezone', type: 'string', required: false, description: `Contact timezone` },
    ],
  },
  {
    name: 'lemlistmcp_create_webhook',
    description: `Create a webhook for real-time campaign activity notifications. Max 200 per account, no duplicate URLs. Filter by activity type (emailsSent, emailsOpened, emailsReplied, etc.) and/or campaignId.`,
    params: [
      { name: 'targetUrl', type: 'string', required: true, description: `The webhook URL to call (must start with http:// or https://)` },
      { name: 'campaignId', type: 'string', required: false, description: `Optional: Filter to call webhook only for specific campaign (e.g., "cam_xxx")` },
      { name: 'isFirst', type: 'boolean', required: false, description: `Optional: Call webhook only for first activity of this type` },
      { name: 'type', type: 'string', required: false, description: `Optional: Filter to call webhook only for specific activity types (e.g., "emailsReplied", "emailsSent")` },
      { name: 'zapId', type: 'string', required: false, description: `Optional: Zapier integration ID` },
    ],
  },
  {
    name: 'lemlistmcp_delete_company',
    description: `Permanently delete a company record from Lemlist. Only removes the Lemlist record — does not affect any connected CRM.`,
    params: [
      { name: 'companyId', type: 'string', required: true, description: `Lemlist company ID to delete (cpn_xxx).` },
      { name: 'userConfirmed', type: 'boolean', required: true, description: `REQUIRED: Must be true. Confirms user explicitly approved this deletion. Only set to true after user says yes.` },
      { name: 'force', type: 'boolean', required: false, description: `When true, detaches any attached contacts (unsets their companyId) before deleting the company.` },
    ],
  },
  {
    name: 'lemlistmcp_delete_memory',
    description: `Delete a stored memory entry by topic so it is no longer recalled in future conversations.`,
    params: [
      { name: 'topic', type: 'string', required: true, description: `The topic key to delete (e.g. "preferred_tone")` },
      { name: 'scope', type: 'string', required: false, description: `Scope: "user" (default) or "team"` },
    ],
  },
  {
    name: 'lemlistmcp_delete_sequence_step',
    description: `Delete a step from a campaign sequence. Use only when removing a step added by mistake — requires user confirmation.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `The campaign ID (required for status verification)` },
      { name: 'sequenceId', type: 'string', required: true, description: `The sequence ID (starts with seq_)` },
      { name: 'stepId', type: 'string', required: true, description: `The step ID to delete (starts with stp_)` },
      { name: 'userConfirmed', type: 'boolean', required: true, description: `REQUIRED: Must be true. Confirms user explicitly approved this deletion. Only set to true after user says yes.` },
    ],
  },
  {
    name: 'lemlistmcp_delete_unsubscribe',
    description: `Remove an email address from the unsubscribe list, allowing it to be contacted again in future campaigns.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `The email address to remove from the unsubscribe list` },
      { name: 'confirmed', type: 'boolean', required: false, description: `NEVER set this to true on first call. Only set to true after the user has explicitly confirmed the action (e.g. via ask_question).` },
    ],
  },
  {
    name: 'lemlistmcp_delete_watch_list',
    description: `Delete a watch list and immediately stop processing signals for it.`,
    params: [
      { name: 'watchListId', type: 'string', required: true, description: `The watch list ID to delete (wat_xxx format)` },
      { name: 'confirmed', type: 'boolean', required: false, description: `Set to true only after the user has explicitly confirmed the deletion (e.g. via ask_question).` },
    ],
  },
  {
    name: 'lemlistmcp_delete_webhook',
    description: `Delete a webhook from your Lemlist account, stopping all notifications to that endpoint immediately.`,
    params: [
      { name: 'webhookId', type: 'string', required: true, description: `The webhook ID to delete (starts with hoo_)` },
      { name: 'confirmed', type: 'boolean', required: false, description: `Set to true only after the user has explicitly confirmed the deletion (e.g. via ask_question).` },
    ],
  },
  {
    name: 'lemlistmcp_disconnect_email_account',
    description: `Disconnect email account. Stops sending immediately. Cannot be undone. Use get_user_channels to find account ID.`,
    params: [
      { name: 'emailAccountId', type: 'string', required: true, description: `The email account ID to disconnect (starts with usm_)` },
      { name: 'confirmed', type: 'boolean', required: false, description: `Set to true only after the user has explicitly confirmed the disconnection (e.g. via ask_question).` },
    ],
  },
  {
    name: 'lemlistmcp_enrich_lead',
    description: `Enrich existing campaign lead. ASYNC — poll with bulk_get_enrichment_results (pass enrichmentIds: [id]). For non-campaign contacts use bulk_enrich_data. ALL options COST CREDITS.`,
    params: [
      { name: 'leadId', type: 'string', required: true, description: `The lead ID to enrich (starts with lea_)` },
      { name: 'findEmail', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS: Find email from lead data` },
      { name: 'findPhone', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS: Find phone number` },
      { name: 'linkedinEnrichment', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS: Enrich with LinkedIn data` },
      { name: 'verifyEmail', type: 'boolean', required: false, description: `⚠️ COSTS CREDITS: Verify lead email` },
    ],
  },
  {
    name: 'lemlistmcp_get_campaign_details',
    description: `Get configuration and settings for ONE campaign (timezone, emoji, labels, senders, sequences). For metrics use get_campaigns_stats, for email content use get_campaign_sequences.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `The campaign ID (cam_xxx format)` },
    ],
  },
  {
    name: 'lemlistmcp_get_campaign_sequences',
    description: `Get the email sequences and their content (subject, body) for a specific campaign. Useful for reviewing copywriting and email flow.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `The campaign ID (cam_xxx format)` },
    ],
  },
  {
    name: 'lemlistmcp_get_campaigns',
    description: `List campaigns with optional search, filtering by labels, and sorting.`,
    params: [
      { name: 'createdBy', type: 'string', required: false, description: `Filter by creator user ID (usr_xxx format). Use your own user ID from Context to find campaigns you created.` },
      { name: 'labels', type: 'array', required: false, description: `Filter by labels/tags. OR semantics: returns campaigns matching at least one. Accepts label names ("q2") or IDs ("lab_xxx") — both can be mixed.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of campaigns to return (default: 20)` },
      { name: 'offset', type: 'number', required: false, description: `Number of campaigns to skip for pagination (default: 0). Use with limit to paginate through all campaigns.` },
      { name: 'search', type: 'string', required: false, description: `Search campaigns by name (case-insensitive)` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort by creation date (default: newest first)` },
      { name: 'status', type: 'string', required: false, description: `Filter by status. OMIT this parameter to get ALL campaigns regardless of status.` },
    ],
  },
  {
    name: 'lemlistmcp_get_campaigns_reports',
    description: `Get lifetime stats for MULTIPLE campaigns in one call. Returns metadata, sender info, and 65+ metrics per campaign. No date filtering - for time-based analysis use get_campaigns_stats.`,
    params: [
      { name: 'campaignIds', type: 'array', required: true, description: `Array of campaign IDs to get reports for (e.g., ["cam_xxx", "cam_yyy"])` },
    ],
  },
  {
    name: 'lemlistmcp_get_campaigns_stats',
    description: `Get detailed stats for one or more campaigns including lead funnel metrics, message counts, and per-step breakdowns.`,
    params: [
      { name: 'campaignIds', type: 'array', required: true, description: `Array of campaign IDs (cam_xxx format)` },
      { name: 'ABSelected', type: 'string', required: false, description: `Optional: Filter by A/B test variant` },
      { name: 'channels', type: 'array', required: false, description: `Optional: Filter stats by channels (mirrors the UI dropdown filter). When provided, both top-level totals and messageMetrics.perChannel are restricted to the requested channels. Omit to get the full breakdown across all 5 channels.` },
      { name: 'endDate', type: 'string', required: false, description: `End date. Either a calendar day "YYYY-MM-DD" (interpreted as end-of-day in the resolved timezone) or a full ISO 8601 datetime with offset (used as-is). Omit for all-time stats.` },
      { name: 'sendUser', type: 'string', required: false, description: `Optional: Filter by send user (format: usr_xxx|email@example.com)` },
      { name: 'startDate', type: 'string', required: false, description: `Start date. Either a calendar day "YYYY-MM-DD" (interpreted as start-of-day in the resolved timezone) or a full ISO 8601 datetime with offset like "2026-04-01T00:00:00+05:30" / "2026-04-01T00:00:00Z" (used as-is, the timezone arg is ignored for that bound). Omit for all-time stats.` },
      { name: 'timezone', type: 'string', required: false, description: `IANA timezone (e.g. "Asia/Kolkata", "America/New_York") used to interpret startDate/endDate ONLY when they are calendar days (YYYY-MM-DD). Ignored for full ISO 8601 datetimes. If omitted, falls back to the calling user's profile.timezone (if set), then to Europe/Paris. To exactly mirror what the Lemlist UI displays, prefer passing the same ISO 8601 strings the UI uses (capture from the campaignReportsTimePeriod session).` },
    ],
  },
  {
    name: 'lemlistmcp_get_contact_lists',
    description: `Retrieve available CRM contact lists with optional search filtering.`,
    params: [
      { name: 'search', type: 'string', required: false, description: `Filter lists by name (case-insensitive)` },
    ],
  },
  {
    name: 'lemlistmcp_get_inbox_conversation',
    description: `Get the full conversation thread for a specific contact across all channels (email, LinkedIn, WhatsApp, SMS).`,
    params: [
      { name: 'contactId', type: 'string', required: true, description: `The contact ID (ctc_xxx format) to get the conversation thread for. Do not use leadId or any other ID type.` },
      { name: 'limit', type: 'number', required: false, description: `Number of activities per page (default: 20, max: 50)` },
      { name: 'markAsRead', type: 'boolean', required: false, description: `Whether to mark the conversation as read (default: false). Note: this mutates state.` },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination (default: 1)` },
    ],
  },
  {
    name: 'lemlistmcp_get_inbox_conversations',
    description: `List inbox conversations with contact info and last message preview, with optional filtering by list type.`,
    params: [
      { name: 'limit', type: 'number', required: false, description: `Number of conversations per page (default: 20, max: 50)` },
      { name: 'listId', type: 'string', required: false, description: `Which inbox list to fetch: myConversations (default), unRead, favorites, snoozed, archived, sentOnly, teamConversations` },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination (default: 1)` },
      { name: 'search', type: 'string', required: false, description: `Search query to filter conversations by contact name or email` },
      { name: 'userId', type: 'string', required: false, description: `The user ID (usr_xxx format). Optional — defaults to the current authenticated user if omitted.` },
    ],
  },
  {
    name: 'lemlistmcp_get_lemleads_filters',
    description: `Get available filters for People Database searches. Call this FIRST before lemleads_search or display_leads/display_companies. Returns filter IDs with valid values.`,
    params: [
    ],
  },
  {
    name: 'lemlistmcp_get_settings',
    description: `Retrieve settings for a campaign or warmup mailbox entity.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `The type of settings to retrieve.` },
      { name: 'id', type: 'string', required: false, description: `Entity ID. Required for "campaign" (cam_xxx) and "lemwarm" (usm_xxx). Ignored for "sending" and "team".` },
    ],
  },
  {
    name: 'lemlistmcp_get_statistics',
    description: `Retrieve statistics for one or more entities of the same type (lemwarm, campaign, lead, etc.).`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `For "lemwarm": mailbox IDs (usm_xxx) — same ids used with get_settings type="lemwarm". 1-20 items.` },
      { name: 'type', type: 'string', required: true, description: `The type of statistics to retrieve. Only "lemwarm" is supported for now.` },
      { name: 'days', type: 'number', required: false, description: `Lookback window in days (1-60). Defaults to 30. Applied to every id.` },
    ],
  },
  {
    name: 'lemlistmcp_get_team_info',
    description: `Get basic team info (ID, name, plan, credits remaining) and minimal identity of the caller (current user id + email). For full user details call get_users with userIds: ["me"] for the caller, userIds: ["all"] for the full member list, or userIds: ["usr_xxx", ...] for one or more team members.`,
    params: [
    ],
  },
  {
    name: 'lemlistmcp_get_team_overview',
    description: `Account summary: campaign count by status. Use get_campaigns for the full list with names and details.`,
    params: [
    ],
  },
  {
    name: 'lemlistmcp_get_unsubscribes',
    description: `List unsubscribed emails with pagination. Use delete_unsubscribe to re-enable.`,
    params: [
      { name: 'limit', type: 'number', required: false, description: `Maximum number of unsubscribes to return` },
      { name: 'offset', type: 'number', required: false, description: `Number of unsubscribes to skip (for pagination)` },
    ],
  },
  {
    name: 'lemlistmcp_get_user_channels',
    description: `Check connected sending channels (email, LinkedIn, WhatsApp). Returns connection status, plan availability, and accounts. WhatsApp requires separate addon purchase. Use show_connect_channel to guide setup (one channel at a time).`,
    params: [
    ],
  },
  {
    name: 'lemlistmcp_get_users',
    description: `Retrieve team member details by user IDs, or pass 'all' to fetch all team members.`,
    params: [
      { name: 'userIds', type: 'array', required: true, description: `List of userIds to fetch. Each item is "all" (every team member, lightweight), "me" (caller, full profile), or a usr_xxx id (full profile). 1-20 items.` },
    ],
  },
  {
    name: 'lemlistmcp_get_webhooks',
    description: `List all configured webhooks. Returns array with _id, targetUrl, createdAt, type, campaignId, isFirst.`,
    params: [
    ],
  },
  {
    name: 'lemlistmcp_lemleads_search',
    description: `Search the People Database (450M+ B2B contacts) by people or company. Returns results with total count and pagination.`,
    params: [
      { name: 'filters', type: 'array', required: true, description: `Array of filter objects from get_lemleads_filters. Each filter MUST have filterId, in (array), and out (array).` },
      { name: 'mode', type: 'string', required: true, description: `MUST be "people" for contacts or "companies" for organizations. Do NOT use "leads".` },
      { name: 'description', type: 'string', required: false, description: `Prose describing the target company as if you were writing ITS "About us" section (companies mode only, max 1000 chars per string). MUST be 2-4 full sentences each, NOT a keyword list. The embedding index was built on real company descriptions, so keyword-stacked strings ("SaaS treasury cash management tool") score poorly. Write complete sentences: who they are, who they serve, what they do, how. GOOD: "We build treasury management software for mid-market finance teams. Our platform helps CFOs and treasurers automate cash forecasting, consolidate bank accounts, and optimize liquidity across entities." BAD: "SaaS software solution for treasury management cash management". Accepts (a) a single string for the simple case, or (b) an array of up to 3 strings covering different angles (e.g. anchor + product + customer/problem). Multi-angle triggers parallel vector searches with RRF fusion — recommended for niche verticals where one phrasing risks missing matches. Combine with keywords (grouped) and country/headcount filters for narrowing.` },
      { name: 'excludes', type: 'array', required: false, description: `Fields to exclude from results` },
      { name: 'keywords', type: 'string', required: false, description: `Optional hybrid BM25 + vector terms (companies mode only). Pass as GROUPS whenever possible — each group is a category of signal, and the document must match at least one term per group (AND-of-ORs). Grouping is how you force "editor, not consultancy": one group for the domain, one for the product-type marker. Example for "French SaaS treasury editors": [["treasury management", "cash forecasting", "gestion de trésorerie", "prévisions de trésorerie"], ["software", "SaaS", "logiciel", "platform", "plateforme"]]. A flat string[] is still accepted as a single implicit group (all terms OR-matched, any one hit passes). Keep groups small (2-5 terms each), max 5 groups.` },
      { name: 'page', type: 'number', required: false, description: `1-based page index (default: 1)` },
      { name: 'seed', type: 'string', required: false, description: `Random seed for consistent ordering. Must be a STRING like "abc123", not a number.` },
      { name: 'size', type: 'number', required: false, description: `Results per page (default: 10, max: 100)` },
    ],
  },
  {
    name: 'lemlistmcp_list_watch_lists',
    description: `List watch lists for the current team with optional type, status, and pagination filters.`,
    params: [
      { name: 'limit', type: 'integer', required: false, description: `Max watch lists per page (default 50, max 100)` },
      { name: 'page', type: 'integer', required: false, description: `Page number (1-based, default 1)` },
      { name: 'status', type: 'string', required: false, description: `Comma-separated list of statuses to filter. Accepted values: active, inactive, draft, insufficient_credits, empty_crm_lists, error. Excludes soft-deleted by default.` },
      { name: 'type', type: 'string', required: false, description: `Comma-separated list of watch list types (e.g. "companyIsHiring,jobChange")` },
    ],
  },
  {
    name: 'lemlistmcp_load_skill',
    description: `Load specialized guidance for a specific domain (e.g. campaign-builder, api-reference) to assist with complex tasks.`,
    params: [
      { name: 'skillName', type: 'string', required: true, description: `Name of the skill to load` },
      { name: 'section', type: 'string', required: false, description: `Optional: specific reference section to load` },
    ],
  },
  {
    name: 'lemlistmcp_preview_sequence_update',
    description: `SAFE READ-ONLY: Preview what would change in an email sequence step before applying modifications. Shows current vs proposed content and campaign status. Must call this before update_sequence_step.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `Campaign ID (cam_xxx)` },
      { name: 'sequenceId', type: 'string', required: true, description: `Sequence ID (seq_xxx)` },
      { name: 'stepId', type: 'string', required: true, description: `Step ID (stp_xxx)` },
      { name: 'newMessage', type: 'string', required: false, description: `Proposed new message body` },
      { name: 'newSubject', type: 'string', required: false, description: `Proposed new subject line` },
    ],
  },
  {
    name: 'lemlistmcp_push_leads_to_contacts',
    description: `Push leads from the People Database into your CRM contacts, optionally adding them to a contact list.`,
    params: [
      { name: 'profileIds', type: 'array', required: true, description: `People Database lead IDs to push to contacts (max 1,000)` },
      { name: 'enrichFeatures', type: 'array', required: false, description: `⚠️ COSTS CREDITS: Enrichment features to apply when pushing leads` },
      { name: 'listId', type: 'string', required: false, description: `Target contact list ID in clt_xxx format. Omit to push to "all contacts". Get valid IDs from get_contact_lists — never invent or pass aliases like "all".` },
    ],
  },
  {
    name: 'lemlistmcp_recall_memory',
    description: `Retrieve stored memories from previous conversations to restore context about user preferences or past decisions.`,
    params: [
      { name: 'topic', type: 'string', required: false, description: `Exact topic key to retrieve (e.g. "preferred_tone"). Omit to retrieve all memories.` },
    ],
  },
  {
    name: 'lemlistmcp_report_unsupported_case',
    description: `Report a feature request or unsupported use case to the product team. Use this ONLY when the user's request is something lemlist should support but the copilot cannot do yet, AND the user has agreed to have their feedback reported. Do NOT use for off-topic requests unrelated to lemlist. Always provide inputs in English, translate if needed.`,
    params: [
      { name: 'description', type: 'string', required: true, description: `What the user asked for that is not supported yet (MUST be in English)` },
      { name: 'conversationContext', type: 'string', required: false, description: `Brief summary of the conversation context leading to this request (MUST be in English)` },
    ],
  },
  {
    name: 'lemlistmcp_save_business_context',
    description: `Save the user business context for future conversations. Use this after collecting company information from the user to remember it across conversations.`,
    params: [
      { name: 'companyName', type: 'string', required: true, description: `Company name` },
      { name: 'mainActivity', type: 'string', required: false, description: `What the company does` },
      { name: 'painPointsSolved', type: 'array', required: false, description: `Pain points the company solves for customers` },
      { name: 'shortDescription', type: 'string', required: false, description: `Company and offering summary` },
      { name: 'targetCompanySizes', type: 'array', required: false, description: `Target sizes (1-10, 11-50, etc.)` },
      { name: 'targetIndustries', type: 'array', required: false, description: `Target industries` },
      { name: 'targetJobTitles', type: 'array', required: false, description: `Target job titles` },
      { name: 'valueProposition', type: 'string', required: false, description: `Main value proposition of the company` },
      { name: 'websiteUrl', type: 'string', required: false, description: `Website URL` },
    ],
  },
  {
    name: 'lemlistmcp_save_memory',
    description: `Save a piece of information to persistent memory so it can be recalled in future conversations.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `The information to remember (max 5000 chars, in the user language)` },
      { name: 'topic', type: 'string', required: true, description: `Unique topic key in snake_case english (e.g. "preferred_tone", "icp_details", "campaign_naming")` },
      { name: 'scope', type: 'string', required: false, description: `Scope: "user" (default, personal) or "team" (shared with all team members)` },
    ],
  },
  {
    name: 'lemlistmcp_search_campaign_leads',
    description: `Find leads in your campaigns by email, lead ID, or by listing all leads in a campaign.`,
    params: [
      { name: 'campaignId', type: 'string', required: false, description: `Campaign ID. Required when listing all leads (no email/id). Optional filter when searching by email/id.` },
      { name: 'email', type: 'string', required: false, description: `Lead email address to search for` },
      { name: 'id', type: 'string', required: false, description: `Lead ID to search for (alternative to email)` },
      { name: 'limit', type: 'number', required: false, description: `Max leads to return (default: 50, max: 100).` },
      { name: 'offset', type: 'number', required: false, description: `Pagination offset (default: 0). Use nextOffset from a previous result to load more.` },
    ],
  },
  {
    name: 'lemlistmcp_search_companies',
    description: `Search your team's Lemlist companies. Returns a paginated list with each company's id, domain, name, owner, and a curated \`crmSync\` block describing how the record is synced to your active CRM (Hubspot, Salesforce, or Pipedrive). Use the \`crmSyncStatus\` filter to find companies in a specific sync state — most notably \`unique_index_error_company\` to list lemlist companies blocked from syncing because another lemlist company already occupies their CRM record. For each result in that state, look at \`crmSync.errors[].metadata.alreadyExistingCompanyId\` — that is the canonical lemlist company you should remap contacts to before deleting the duplicate (see \`search_contacts\` with companyId, then \`delete_company\`).`,
    params: [
      { name: 'crmSyncStatus', type: 'string', required: false, description: `Filter by CRM sync status. Requires a CRM (Hubspot, Salesforce, Pipedrive) to be connected on the team — otherwise the call returns NO_CRM_CONNECTED.` },
      { name: 'limit', type: 'number', required: false, description: `Max companies per page (1-100, default 100).` },
      { name: 'page', type: 'number', required: false, description: `Page number (1-based, default 1).` },
      { name: 'search', type: 'string', required: false, description: `Free-text search on the company name (case insensitive, accent insensitive).` },
      { name: 'sortBy', type: 'string', required: false, description: `Sort field (default \`createdAt\`).` },
      { name: 'sortOrder', type: 'string', required: false, description: `Sort direction (default \`desc\`).` },
    ],
  },
  {
    name: 'lemlistmcp_search_contacts',
    description: `Search or list your team's Lemlist contacts by name, email, contact list, or attached company. Returns matching contacts with their details (ID, name, email, phone, job title, company, campaign count). All filters are optional — calling the tool without any filter returns the paginated list of all contacts of the team (useful for discovery, e.g. obtaining a Record ID before associating it with another resource). Use this to find if a contact already exists in Lemlist before creating a new one. You can filter by a specific contact list using listId (get valid IDs from get_contact_lists first). Use notInAnyCampaign=true to find contacts that are not part of any campaign (orphan contacts). To list contacts attached to a given company, use companyId (cpn_xxx) or one of companyDomain / companyLinkedinUrl / companySalesnavUrl — only one company* filter at a time. URL/domain filters return an empty list if no company matches. For searching leads WITHIN campaigns, use search_campaign_leads instead. For prospecting NEW leads from the People Database, use lemleads_search instead.`,
    params: [
      { name: 'companyDomain', type: 'string', required: false, description: `Filter contacts by their company's website domain (resolved to a companyId). Empty list if no company matches.` },
      { name: 'companyId', type: 'string', required: false, description: `Filter contacts by attached lemlist company ID (cpn_xxx). Mutually exclusive with companyDomain/companyLinkedinUrl/companySalesnavUrl.` },
      { name: 'companyLinkedinUrl', type: 'string', required: false, description: `Filter contacts by their company's LinkedIn URL (resolved to a companyId). Empty list if no company matches.` },
      { name: 'companySalesnavUrl', type: 'string', required: false, description: `Filter contacts by their company's LinkedIn Sales Navigator URL (resolved to a companyId). Empty list if no company matches.` },
      { name: 'email', type: 'string', required: false, description: `Exact email address to search for (takes priority over search parameter)` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of contacts to return (1-100, default: 20)` },
      { name: 'listId', type: 'string', required: false, description: `Filter by contact list ID (clt_xxx format). Can be combined with search/email, or used alone to list all contacts in a list. Get valid IDs from get_contact_lists.` },
      { name: 'notInAnyCampaign', type: 'boolean', required: false, description: `When true, only returns contacts that are not part of any campaign. Can be used alone or combined with other filters.` },
      { name: 'offset', type: 'number', required: false, description: `Number of contacts to skip for pagination (default: 0)` },
      { name: 'search', type: 'string', required: false, description: `Free-text search: matches against contact full name or email address (min 2 chars, case-insensitive)` },
    ],
  },
  {
    name: 'lemlistmcp_search_help_center',
    description: `Search the lemlist help center for official documentation and guides. Use this when you need to provide guidance on how to do something in lemlist that you cannot do directly via tools. Returns relevant help center articles with content excerpts and links. Do NOT use this for questions you can answer from context or tools.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query in English using 1-3 keywords (e.g., "inbox rotation", "email provider", "signals")` },
    ],
  },
  {
    name: 'lemlistmcp_send_message',
    description: `Send a message to a contact or lead via email, LinkedIn, WhatsApp, or SMS from the Lemlist inbox.`,
    params: [
      { name: 'channel', type: 'string', required: true, description: `Channel to send through.` },
      { name: 'message', type: 'string', required: true, description: `Message content (channel-specific format).` },
      { name: 'sendUserId', type: 'string', required: true, description: `User ID sending the message (usr_xxx format).` },
      { name: 'cc', type: 'array', required: false, description: `channel="email": optional list of CC email addresses.` },
      { name: 'contactId', type: 'string', required: false, description: `Contact ID to send to. Required if leadId is not provided.` },
      { name: 'from', type: 'string', required: false, description: `channel="sms": sender phone number.` },
      { name: 'leadId', type: 'string', required: false, description: `Lead ID to send to. Alternative to contactId.` },
      { name: 'sendUserEmail', type: 'string', required: false, description: `channel="email": email address to send from.` },
      { name: 'sendUserMailboxId', type: 'string', required: false, description: `channel="email": mailbox ID (usm_xxx) to use for sending.` },
      { name: 'sendUserWhatsappAccountId', type: 'string', required: false, description: `channel="whatsapp": WhatsApp account ID (uwa_xxx) to use for sending.` },
      { name: 'subject', type: 'string', required: false, description: `channel="email": email subject line.` },
    ],
  },
  {
    name: 'lemlistmcp_set_campaign_senders',
    description: `Assign team members as senders for a campaign's outreach messages.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `Campaign ID (cam_xxx format)` },
      { name: 'senderIds', type: 'array', required: true, description: `Array of user IDs (usr_xxx format) to assign as senders. Get IDs from get_users (userIds: ["all"]).` },
    ],
  },
  {
    name: 'lemlistmcp_set_campaign_state',
    description: `Start, pause, archive, or unarchive a campaign to change its running state.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `"start" to launch the campaign, "pause" to pause a running campaign, "archive" to archive a campaign, "unarchive" to restore an archived campaign` },
      { name: 'campaignId', type: 'string', required: true, description: `The campaign ID (cam_xxx format)` },
      { name: 'userConfirmed', type: 'boolean', required: false, description: `REQUIRED for action="start" and action="archive": Must be true. Confirms user explicitly approved the action. Not required for pause or unarchive.` },
    ],
  },
  {
    name: 'lemlistmcp_test_email_account',
    description: `Test SMTP/IMAP connectivity of an email account. No actual email sent. Use get_user_channels to find account ID.`,
    params: [
      { name: 'emailAccountId', type: 'string', required: true, description: `The email account ID to test (starts with usm_)` },
    ],
  },
  {
    name: 'lemlistmcp_update_lead',
    description: `Update standard fields on an existing lead (firstName, lastName, jobTitle, companyName, email, phone, linkedinUrl, picture, timezone, jobDescription, companyDomain). Requires leadId + at least one field to update. For custom variables, use update_lead_variables instead.`,
    params: [
      { name: 'leadId', type: 'string', required: true, description: `The lead ID (starts with lea_)` },
      { name: 'companyDomain', type: 'string', required: false, description: `Lead company domain` },
      { name: 'companyName', type: 'string', required: false, description: `Lead company name` },
      { name: 'email', type: 'string', required: false, description: `Lead email address` },
      { name: 'firstName', type: 'string', required: false, description: `Lead first name` },
      { name: 'jobDescription', type: 'string', required: false, description: `Lead job description` },
      { name: 'jobTitle', type: 'string', required: false, description: `Lead job title` },
      { name: 'lastName', type: 'string', required: false, description: `Lead last name` },
      { name: 'linkedinUrl', type: 'string', required: false, description: `Lead LinkedIn profile URL` },
      { name: 'phone', type: 'string', required: false, description: `Lead phone number` },
      { name: 'picture', type: 'string', required: false, description: `Lead profile picture URL` },
      { name: 'timezone', type: 'string', required: false, description: `Lead timezone` },
    ],
  },
  {
    name: 'lemlistmcp_update_lead_variables',
    description: `Set custom variables on an existing lead (upsert). Requires leadId + variables (key-value pairs of non-empty strings). Automatically handles both updating existing variables and adding new ones. IMPORTANT: Do NOT pass standard lead fields as variables — the following keys are FORBIDDEN and will be rejected: email, firstName, lastName, picture, phone, linkedinUrl, timezone, jobTitle, jobDescription, companyName, companyDomain. To update these fields, use the update_lead tool instead. Empty string values are rejected — omit the variable instead.`,
    params: [
      { name: 'leadId', type: 'string', required: true, description: `The lead ID (starts with lea_)` },
      { name: 'variables', type: 'object', required: true, description: `Custom variables as key-value pairs to set (e.g., {"comicFrame": "panel_3", "tone": "friendly"}). Values must be non-empty strings — omit the variable rather than passing an empty string.` },
    ],
  },
  {
    name: 'lemlistmcp_update_sequence_step',
    description: `Update a step in an existing campaign sequence. Requires user confirmation for email or content step changes.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `The campaign ID (required for status verification)` },
      { name: 'sequenceId', type: 'string', required: true, description: `The sequence ID (starts with seq_)` },
      { name: 'stepId', type: 'string', required: true, description: `The step ID to update (starts with stp_)` },
      { name: 'userConfirmed', type: 'boolean', required: true, description: `REQUIRED: Must be true. Confirms user explicitly approved this change after seeing the preview. Only set to true after user says yes.` },
      { name: 'conditionKey', type: 'string', required: false, description: `New condition key (for conditional steps only)` },
      { name: 'delay', type: 'number', required: false, description: `New delay value in days` },
      { name: 'delayType', type: 'string', required: false, description: `New delay type for conditional steps. "within" = must happen within delay days, "waitUntil" = wait indefinitely. For field-check conditions, use "within" with delay 0.` },
      { name: 'emailStatusFilter', type: 'array', required: false, description: `Only for hasEmailAddress condition. Filter by email status: ["deliverable","risky","undeliverable","unverified"].` },
      { name: 'message', type: 'string', required: false, description: `New email body content (for email steps, supports Liquid syntax)` },
      { name: 'method', type: 'string', required: false, description: `New HTTP method for "api" (webhook) steps. Limited to GET/POST to stay iso with the lemlist UI editor. Ignored on non-api steps.` },
      { name: 'scoreComparator', type: 'string', required: false, description: `Only for hasScore condition. "$gte" = score above or equal, "$lt" = score below.` },
      { name: 'scoreThreshold', type: 'number', required: false, description: `Only for hasScore condition. Score threshold (0-100).` },
      { name: 'subject', type: 'string', required: false, description: `New subject line (supports Liquid syntax: {{ firstName }}, {% if condition %}...{% endif %})` },
      { name: 'title', type: 'string', required: false, description: `New task title (for manual/phone steps). Short label displayed in the review UI.` },
      { name: 'url', type: 'string', required: false, description: `New webhook URL for "api" steps. Supports Liquid templating against lead variables (e.g. https://example.com/leads/{{ _id }}). Ignored on non-api steps.` },
    ],
  },
  {
    name: 'lemlistmcp_update_settings',
    description: `Update settings for a campaign or warmup mailbox entity.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Entity ID. For "lemwarm": the mailbox ID (usm_xxx) — the same id used with get_settings type="lemwarm".` },
      { name: 'type', type: 'string', required: true, description: `The type of settings to update. Only "lemwarm" is supported for now.` },
      { name: 'action', type: 'string', required: false, description: `Optional state change. "start" activates warmup, "pause" stops it. Omit when only updating settings.` },
      { name: 'internalCommunicationPercent', type: 'number', required: false, description: `Percentage of warmup emails sent to internal participants (0-100). Only applied when the team has the lemwarmInternalCommunication beta.` },
      { name: 'userConfirmed', type: 'boolean', required: false, description: `REQUIRED when action="start": must be true after user confirms activating warmup.` },
      { name: 'warmEmailMax', type: 'number', required: false, description: `Daily warmup email target (0-40). Server enforces 1-40 unless the team has the lemwarm0limit beta.` },
      { name: 'warmEmailRampup', type: 'number', required: false, description: `Ramp-up increment per day (0-40). Server enforces 1-40 unless the team has the lemwarm0limit beta.` },
    ],
  },
  {
    name: 'lemlistmcp_validate_campaign_readiness',
    description: `Validate that a campaign is ready to launch by checking step content, sender configuration, DNS health, and daily limits.`,
    params: [
      { name: 'campaignId', type: 'string', required: false, description: `Campaign ID (cam_xxx format). Provide this or campaignName.` },
      { name: 'campaignName', type: 'string', required: false, description: `Campaign name to search for. Provide this or campaignId.` },
    ],
  },
]
