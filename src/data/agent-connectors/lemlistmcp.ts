import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'lemlistmcp_add_contacts_to_list',
    description: `Add existing CRM contacts to a contact list by list ID.`,
    params: [
      {
        name: 'contactIds',
        type: 'array',
        required: true,
        description: `Contact IDs to add to the list (max 1,000)`,
      },
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Target contact list ID in clt_xxx format. Get valid IDs from get_contact_lists.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_add_leads_to_campaign',
    description: `Add one or more leads (max 100) to a campaign. Each lead requires at least one identifying field such as email, first name, last name, or company name.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (starts with cam_)`,
      },
      {
        name: 'leads',
        type: 'array',
        required: true,
        description: `Leads to add (1..100). Each lead must have at least one identifying field.`,
      },
      {
        name: 'deduplicate',
        type: 'boolean',
        required: false,
        description: `Avoid duplicates across campaigns (default: false). When true, existing leads in OTHER campaigns are reported as outcome="skippedDuplicateCrossCampaign".`,
      },
      {
        name: 'findEmail',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS per lead: Find email address from other lead data (LinkedIn, name, company)`,
      },
      {
        name: 'findPhone',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS per lead: Find phone number from other lead data`,
      },
      {
        name: 'linkedinEnrichment',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS per lead: Enrich each lead with LinkedIn profile data (job title, company info, etc.)`,
      },
      {
        name: 'verifyEmail',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS per lead: Verify if the email address is valid and deliverable`,
      },
    ],
  },
  {
    name: 'lemlistmcp_add_sequence_step',
    description: `Add a step to an existing campaign sequence. Use only for modifying already-created campaigns — not for initial campaign creation.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `Campaign ID (cam_xxx)` },
      {
        name: 'delay',
        type: 'number',
        required: true,
        description: `Days to wait after previous step. Must be 0 for "sendToAnotherCampaign" (the lemlist API does not accept a delay for this type, transfer is immediate).`,
      },
      { name: 'sequenceId', type: 'string', required: true, description: `Sequence ID (seq_xxx)` },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: true,
        description: `Must be true after user confirms`,
      },
      {
        name: 'altMessage',
        type: 'string',
        required: false,
        description: `Alternative message variation for "linkedinSend" steps (used as second-attempt content when applicable).`,
      },
      {
        name: 'conditionKey',
        type: 'string',
        required: false,
        description: `Condition to check (REQUIRED when type is "conditional"). E.g. emailsOpened, linkedinInviteAccepted.`,
      },
      {
        name: 'delayType',
        type: 'string',
        required: false,
        description: `REQUIRED for all conditional steps. "within" = must happen within delay days, "waitUntil" = wait indefinitely. For field-check conditions (hasEmailAddress, hasLinkedinUrl, etc.), use "within" with delay 0.`,
      },
      {
        name: 'emailStatusFilter',
        type: 'array',
        required: false,
        description: `Only for hasEmailAddress condition. Filter by email verification status. E.g. ["deliverable"] to only match leads with deliverable email. Omit to check if any email exists.`,
      },
      {
        name: 'index',
        type: 'number',
        required: false,
        description: `Zero-based position where to insert the step (0 = first). Omit to append at the end. Use to insert warm-up steps before an existing step (e.g. Like + Comment before an Invite).`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Message content (REQUIRED when type is "email", "linkedinSend", "whatsappMessage" or "sms"; OPTIONAL but recommended for "linkedinInvite"). For emails: the HTML body. For LinkedIn/WhatsApp/SMS/tasks: the message text.`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `REQUIRED when type="api". HTTP method (GET or POST) used by the webhook call. Limited to GET/POST to stay iso with the lemlist UI editor.`,
      },
      {
        name: 'recordMode',
        type: 'string',
        required: false,
        description: `linkedinVoiceNote only: "ai" generates audio from text via ElevenLabs (user adds the text after); "manual" (default) requires user-recorded audio after step creation.`,
      },
      {
        name: 'scoreComparator',
        type: 'string',
        required: false,
        description: `Only for hasScore condition. "$gte" = score is above or equal to threshold, "$lt" = score is below threshold. Defaults to "$gte".`,
      },
      {
        name: 'scoreThreshold',
        type: 'number',
        required: false,
        description: `Only for hasScore condition. Score threshold value (0-100). Defaults to 80.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Email subject line. Required for the first email; omit for follow-ups to send as reply thread. Supports Liquid syntax: {{ firstName }}, {% if condition %}...{% endif %}`,
      },
      {
        name: 'targetCampaignId',
        type: 'string',
        required: false,
        description: `REQUIRED when type is "sendToAnotherCampaign". Target campaign ID (cam_xxx) the lead is moved to. Must belong to the same team as the parent campaign and not be archived. Avoid cycles (A -> B -> A).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Task title (for manual/phone steps). Short label displayed in the review UI.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of step. Use "conditional" for branching based on lead behavior, "sendToAnotherCampaign" to move a lead to another campaign, "api" to fire an outbound HTTP webhook (provide method and url).`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `REQUIRED when type="api". Webhook URL fired during sequence execution. Supports Liquid templating against lead variables (e.g. https://example.com/leads/{{ _id }}). For POST, the request body is automatically the lead data; custom bodies and custom headers are not supported.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_add_unsubscribe',
    description: `Add email to unsubscribe blocklist. Blocks all future campaign sends. Use delete_unsubscribe to reverse.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address to add to the unsubscribe list`,
      },
    ],
  },
  {
    name: 'lemlistmcp_bulk_enrich_data',
    description: `Enrich up to 500 contacts with additional data in a single call. Returns a dataRef for polling results asynchronously.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of enrichment items (max 500)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_bulk_get_enrichment_results',
    description: `Poll the results of one or more enrichment jobs. Provide a dataRef from bulk_enrich_data or a nextPollRef from a previous poll.`,
    params: [
      {
        name: 'dataRef',
        type: 'string',
        required: false,
        description: `dataRef from bulk_enrich_data (first poll) OR nextPollRef from a previous poll result (subsequent polls). Mutually exclusive with enrichmentIds.`,
      },
      {
        name: 'enrichmentIds',
        type: 'array',
        required: false,
        description: `Array of enrichment IDs to poll (1-500, enr_xxx format). Mutually exclusive with dataRef.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_calculate_infrastructure',
    description: `Compute cold-email infrastructure sizing from campaign inputs.

Returns:
- Peak daily volume + injection rate
- Mailbox count (raw and with safety buffer)
- ESP split (Google / Microsoft / SMTP)
- Domains needed per seat (cap: 3 mailboxes per domain)
- Warmup timeline (rampup + 14-day stabilization)
- Lemlist slot cost (included + extras at $9/month)
- Brand-consistent domain name suggestions
- Mailbox naming proposals per SDR (when sdrs provided), with SDR userId echoed back in \`sdrPlans[].userId\` if it was passed in

All math is deterministic — pure domain function, no LLM math.

Use in Step 2 of the outreach-infra skill, after gathering campaign inputs via ask_question.`,
    params: [
      { name: 'companyDomain', type: 'string', required: true, description: `Team company domain` },
      {
        name: 'delayDays',
        type: 'integer',
        required: true,
        description: `Days between sequence steps`,
      },
      { name: 'espChoice', type: 'string', required: true, description: `ESP matching strategy` },
      {
        name: 'leads',
        type: 'integer',
        required: true,
        description: `Total leads over the timeline`,
      },
      {
        name: 'rampupIncrement',
        type: 'integer',
        required: true,
        description: `Lemwarm daily rampup increment`,
      },
      { name: 'seats', type: 'integer', required: true, description: `SDR seats` },
      {
        name: 'sequenceSteps',
        type: 'integer',
        required: true,
        description: `Steps in the sequence`,
      },
      {
        name: 'timelineDays',
        type: 'integer',
        required: true,
        description: `Campaign duration in days`,
      },
      {
        name: 'domainSuggestionsCount',
        type: 'integer',
        required: false,
        description: `Domain suggestions to return (default 10)`,
      },
      {
        name: 'sdrs',
        type: 'array',
        required: false,
        description: `Optional SDR identities for mailbox naming. Each entry may include the SDR lemlist userId — when provided, it is echoed back in \`sdrPlans[].userId\` so the caller can wire \`assignToUser\` in provision_mailboxes without name matching.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_call_api',
    description: `Make a direct call to the Lemlist API using a specified endpoint and method. Requires load_skill('api-reference') to be called first in the session.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `API endpoint path starting with /api/`,
      },
      { name: 'method', type: 'string', required: true, description: `HTTP method` },
      {
        name: 'body',
        type: 'object',
        required: false,
        description: `Request body for POST/PUT/PATCH (optional)`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Set to true after user confirms a write/delete action`,
      },
    ],
  },
  {
    name: 'lemlistmcp_check_domain_health',
    description: `Check DNS health for email sending domains (MX, SPF, DMARC, blacklists). Returns score (0-100), per-check status, and DNS fix records.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Domain to check (e.g. example.com). If omitted, checks domains from team members.`,
      },
      {
        name: 'mailboxId',
        type: 'string',
        required: false,
        description: `Mailbox ID to check DNS for.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Check scope: user (current user) or team (all members). Default: team.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_configure_domain_dns',
    description: `Write DNS records for a team-owned domain.

Two modes:
- Provide **records**: replaces the domain's full record set (SPF / DMARC / MX / CNAME etc.).
- Provide **dkimRecord**: appends the DKIM TXT record only (after mailbox provisioning).

Use in Step 4 (initial SPF/DMARC/MX) and Step 6 (DKIM after Google/M365 gives the public key) of the outreach-infra skill.`,
    params: [
      { name: 'domainId', type: 'string', required: true, description: `Domain ID (dom_xxx)` },
      { name: 'dkimRecord', type: 'string', required: false, description: `DKIM record to append` },
      {
        name: 'records',
        type: 'array',
        required: false,
        description: `Full DNS record set to write`,
      },
    ],
  },
  {
    name: 'lemlistmcp_connect_email_account',
    description: `Connect a custom SMTP/IMAP email account for sending and receiving emails in Lemlist campaigns.`,
    params: [
      {
        name: 'imap_host',
        type: 'string',
        required: true,
        description: `IMAP server hostname (e.g., "imap.company.com")`,
      },
      {
        name: 'imap_login',
        type: 'string',
        required: true,
        description: `IMAP authentication login (usually the email address)`,
      },
      {
        name: 'imap_password',
        type: 'string',
        required: true,
        description: `IMAP authentication password or app password`,
      },
      {
        name: 'imap_port',
        type: 'number',
        required: true,
        description: `IMAP server port (typically 993 for TLS)`,
      },
      {
        name: 'sender_email',
        type: 'string',
        required: true,
        description: `Email address to send from (e.g., "john@company.com")`,
      },
      {
        name: 'sender_name',
        type: 'string',
        required: true,
        description: `Display name for the sender (e.g., "John Doe")`,
      },
      {
        name: 'smtp_host',
        type: 'string',
        required: true,
        description: `SMTP server hostname (e.g., "smtp.company.com")`,
      },
      {
        name: 'smtp_login',
        type: 'string',
        required: true,
        description: `SMTP authentication login (usually the email address)`,
      },
      {
        name: 'smtp_password',
        type: 'string',
        required: true,
        description: `SMTP authentication password or app password`,
      },
      {
        name: 'smtp_port',
        type: 'number',
        required: true,
        description: `SMTP server port (typically 587 for TLS or 465 for SSL)`,
      },
      {
        name: 'imap_secure',
        type: 'boolean',
        required: false,
        description: `Optional: Use TLS for IMAP connection (default: true)`,
      },
      {
        name: 'smtp_secure',
        type: 'boolean',
        required: false,
        description: `Optional: Use TLS for SMTP connection (default: true)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_copy_campaign_leads',
    description: `Copy every lead from one campaign into another, in a single call, with FULL fidelity.

Prefer this over composing search_campaign_leads + add_leads_to_campaign whenever the user wants to copy / recreate / move / duplicate the leads of a whole campaign into another campaign (e.g. "copy the leads from campaign A into campaign B", "put everyone from the old campaign into the rebuilt one"). Composing the two other tools drops fields (Sales Nav URL, phone, custom variables) and creates new empty contacts — this tool does not.

Use when the user asks about:
- Copying/recreating a whole campaign's leads into another campaign
- Repopulating a freshly duplicated campaign (duplication never copies leads) from the original

Contract rules reproduced by the backend:
- Works by lead id server-side: it reuses each lead's existing CRM contact (no empty duplicate) and copies every variable (linkedinUrlSalesNav, phone, custom fields).
- Both campaigns must belong to the current team; sourceCampaignId and targetCampaignId must be different.
- ADDS to the target (source campaign is left untouched). Leads already in the target follow the same dedup rules as a manual push.`,
    params: [
      {
        name: 'sourceCampaignId',
        type: 'string',
        required: true,
        description: `Campaign (cam_xxx) to copy leads FROM. Every non-deleted lead in it is copied. Get it from get_campaigns.`,
      },
      {
        name: 'targetCampaignId',
        type: 'string',
        required: true,
        description: `Campaign (cam_xxx) to copy leads INTO. Must be different from sourceCampaignId. Get it from get_campaigns, or create one first.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_ai_variable_prompt',
    description: `Create a NEW AI variable column (an AI-generated column in the Leads table: icebreaker, opener, company research, etc.) on a campaign.

Provide the column name, the AI-generation prompt, and optionally the model. The column is created team-owned and editable, wired into the campaign so it shows up in the Leads table and generates for leads. Use {{variable}} placeholders in the prompt to reference existing fields or columns.

The variable name must be unique on the campaign — creating a duplicate is rejected. To edit an existing column's prompt instead, use update_ai_variable_prompt; to read existing columns, use get_ai_variable_prompts.

Creating the column only sets it up — it does NOT generate values. Values are generated per lead later (from the Leads table UI or on import) and that is what consumes credits, not this call. Pass autofill:true to turn the column's auto-generate toggle on, so every lead added or imported to the campaign afterwards (CSV import, CRM sync, manual add) generates it automatically; it stays off by default. To scrape LinkedIn profiles for the column, pass tools:["enrich-linkedin"] AND reference {{linkedinUrl}} in the prompt; enabling any tool forces the premium lemlist model and lemlist-credit billing (per lead, at generation).

Use when the user asks to:
- Add a new AI column / AI variable to a campaign's leads
- Generate a new piece of AI content (research, icebreaker, summary) per lead
- Have an AI column filled automatically for every lead imported into a campaign

This mutates campaign configuration, so confirm the column name and prompt with the user before calling.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `Campaign ID (cam_xxx format) the new AI variable column is added to`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The AI-generation prompt for the new column. Use {{variable}} placeholders (e.g. {{firstName}}) to reference fields or other existing columns.`,
      },
      {
        name: 'variableName',
        type: 'string',
        required: true,
        description: `Name of the new AI variable column to create (e.g. "companyNews"). Must be unique on the campaign and a valid identifier (letters, digits, underscores, starting with a letter). The "variables." prefix is optional.`,
      },
      {
        name: 'autofill',
        type: 'boolean',
        required: false,
        description: `Sets the column's "auto-generate" toggle. When true, this AI variable is generated for every lead added or imported to the campaign afterwards (CSV import, CRM sync, manual add). Defaults to false, leaving generation to be triggered from the Leads table. ⚠️ COSTS CREDITS: with it on, every newly added lead consumes one generation.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Optional AI model id powering the column (e.g. "gpt-5.4", "claude-sonnet-4-6", "sonar-pro"). Omit to use the team default model. Use a web-search model (e.g. Perplexity "sonar-pro") for columns that research live data. Ignored when tools are set (tools force the premium lemlist model).`,
      },
      {
        name: 'tools',
        type: 'array',
        required: false,
        description: `Optional AI tools the column may use while generating each value. "enrich-linkedin" scrapes the lead's LinkedIn profile (the prompt MUST reference {{linkedinUrl}} or {{linkedinUrlSalesNav}}, otherwise the tool never fires and the column stays empty); "scrape-website" reads a URL; "web-search" searches the live web. ⚠️ COSTS CREDITS: enabling ANY tool forces the premium lemlist model and switches billing to lemlist credits, charged per lead at generation time (not now). Omit for a plain text column.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_campaign_folder',
    description: `Create one or more campaign folders that share the same parent, in a single call.

Use when the user asks about:
- Adding one or several folders at the same level (pass them all in \`names\`).
- Creating sub-folders under an existing folder (pass its \`parentId\`).

For a nested chain (A > B > C) call once per level instead, threading each returned folderId as the next \`parentId\`.

Contract rules reproduced by the backend:
- Each name must be unique among folders that share the same parent.
- Depth is capped at 15 levels, 50 folders per level, 500 folders per team.
- Best-effort: valid names are created even if others fail; the response lists \`created\` and \`failed\` (with a per-name reason).`,
    params: [
      {
        name: 'names',
        type: 'array',
        required: true,
        description: `Names of the folders to create under the SAME parent (1-50). Pass every sibling folder in one call rather than calling repeatedly. Each name must be unique among folders sharing that parent. (To build a nested chain instead, call once per level, threading each returned folderId as the next parentId.)`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Optional color (hex) applied to every folder created. Omit for no color.`,
      },
      {
        name: 'parentId',
        type: 'string',
        required: false,
        description: `Parent folder ID (cfo_xxx) all the new folders are nested under. Omit to create them at the root.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_campaign_from_proposal',
    description: `[STALE: upstream tool 'create_campaign_from_proposal' no longer appears in the lemlist MCP server's live tools/list as of 2026-08-19; likely superseded by propose_sequence + create_campaign_with_sequence. Kept for reference, not for active use.] Create a campaign from a previously validated sequence proposal. Requires a proposal ID generated by propose_sequence.`,
    params: [
      {
        name: 'sequenceItemId',
        type: 'string',
        required: true,
        description: `Workspace item id of the validated sequence (from propose_sequence)`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: true,
        description: `Must be true after the user explicitly approves campaign creation`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `Optional emoji for the campaign`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Campaign name (defaults to the sequence proposal name)`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the campaign (e.g. Europe/Paris)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_campaign_with_sequence',
    description: `Create campaign. If subject AND body are provided, creates the first email step. If omitted, creates an empty sequence (use add_sequence_step to add a condition or any step type as the first step). Call add_sequence_step for each additional step. Supports Liquid syntax.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the campaign` },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `Email body content for the first email (supports Liquid syntax). Omit both subject and body to create campaign without a first step.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `Optional emoji for the campaign (e.g., 🚀, 💎, 🔥)`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Subject line for the first email (supports Liquid syntax). Omit both subject and body to create campaign without a first step (e.g. when first step is a condition).`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the campaign (e.g., Europe/Paris, America/New_York)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_contact_list',
    description: `Create a new static contact list in the CRM to organize and group contacts.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the contact list to create (max 200 characters)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_or_update_company',
    description: `Create a new company in the user's Lemlist company database, or update an existing one (upsert). Requires both a name AND a domain. If a company with the same domain, LinkedIn URL, or Sales Navigator URL already exists, it will be updated instead of creating a duplicate. Returns the company data and whether it was created or updated.`,
    params: [
      { name: 'domain', type: 'string', required: true, description: `Company domain (required)` },
      { name: 'name', type: 'string', required: true, description: `Company name (required)` },
      {
        name: 'companyOwner',
        type: 'string',
        required: false,
        description: `Company owner email or user ID (usr_xxx format)`,
      },
      { name: 'industry', type: 'string', required: false, description: `Company industry` },
      {
        name: 'linkedinUrl',
        type: 'string',
        required: false,
        description: `Company LinkedIn profile URL`,
      },
      {
        name: 'linkedinUrlSalesNav',
        type: 'string',
        required: false,
        description: `Company LinkedIn Sales Navigator URL (used as an additional matching key for upsert)`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Company location or address`,
      },
      { name: 'picture', type: 'string', required: false, description: `Company logo URL` },
    ],
  },
  {
    name: 'lemlistmcp_create_or_update_contact',
    description: `Create a new contact in the user's Lemlist contact database, or update an existing one (upsert). Requires at least an email OR linkedinUrl as identifier. If a contact with the same email or LinkedIn URL already exists, it will be updated instead of creating a duplicate. Returns the contact data and whether it was created or updated. Use search_contacts first to check if the contact already exists.`,
    params: [
      {
        name: 'companyDomain',
        type: 'string',
        required: false,
        description: `Company domain to link the contact to a company (alternative to companyId)`,
      },
      {
        name: 'companyId',
        type: 'string',
        required: false,
        description: `Company ID to associate the contact with`,
      },
      {
        name: 'companyLinkedinUrl',
        type: 'string',
        required: false,
        description: `Company LinkedIn URL to link the contact to a company (alternative to companyId)`,
      },
      {
        name: 'contactOwner',
        type: 'string',
        required: false,
        description: `Contact owner email or user ID (usr_xxx format)`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Contact email address (required if linkedinUrl is not provided)`,
      },
      { name: 'firstName', type: 'string', required: false, description: `Contact first name` },
      {
        name: 'jobDescription',
        type: 'string',
        required: false,
        description: `Contact job description`,
      },
      { name: 'jobTitle', type: 'string', required: false, description: `Contact job title` },
      { name: 'lastName', type: 'string', required: false, description: `Contact last name` },
      {
        name: 'linkedinUrl',
        type: 'string',
        required: false,
        description: `Contact LinkedIn profile URL (required if email is not provided)`,
      },
      { name: 'phone', type: 'string', required: false, description: `Contact phone number` },
      {
        name: 'picture',
        type: 'string',
        required: false,
        description: `Contact profile picture URL`,
      },
      {
        name: 'salesnavUrl',
        type: 'string',
        required: false,
        description: `Contact LinkedIn Sales Navigator URL (used as an additional matching key for upsert)`,
      },
      { name: 'timezone', type: 'string', required: false, description: `Contact timezone` },
    ],
  },
  {
    name: 'lemlistmcp_create_people_database_persona',
    description: `Create a People Database persona for the current team.

Use when the user asks about:
- Saving a set of People Database filters as a reusable audience
- Defining an ICP / persona to reuse later

Contract rules reproduced by the backend:
- name must be non-empty and unique within the team (duplicates are rejected)
- mode must be "leads": company personas are not supported yet
- every filterId must be an exact id from the People Database filter catalog
  (GET /api/database/filters)
- filters gated by a plan the team does not have are silently dropped

Returns the created persona id (pdp_xxx).`,
    params: [
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `People Database filters defining the persona`,
      },
      {
        name: 'mode',
        type: 'string',
        required: true,
        description: `Search mode the filters target. Only "leads" is accepted today.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Persona display name (non-empty, unique per team)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_upload_url',
    description: `Get a presigned URL to upload a file from the user's machine to lemlist storage, then reference it by key.

Use this to AVOID retyping large file contents through the conversation. Flow:
1. Call this tool with purpose, fileName, and the EXACT fileSize in bytes.
2. Upload the raw file to the returned uploadUrl with an HTTP PUT, e.g.:
   curl -T leads.csv -H "Content-Type: <contentType>" "<uploadUrl>"
3. Pass the returned uploadKey to the tool that consumes it:
   - purpose="leadsCsv" → import_leads_to_campaign
   - purpose="contactsCsv" → import_contacts_from_csv
   - purpose="companiesCsv" → import_companies_from_csv
   - purpose="csvData" → read_uploaded_csv

The URL is short-lived (expiresInSeconds). fileSize MUST be the real byte size of the
file — it is signed into the URL, so a mismatch makes the upload fail, and a size above
the limit is rejected up front.`,
    params: [
      {
        name: 'fileName',
        type: 'string',
        required: true,
        description: `Original file name (e.g., "leads.csv"). Used to derive the extension and MIME type.`,
      },
      {
        name: 'fileSize',
        type: 'number',
        required: true,
        description: `EXACT file size in bytes. Signed into the URL — the upload fails on mismatch and the call is rejected above the limit.`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: true,
        description: `What the file is for. "leadsCsv" → import_leads_to_campaign, "contactsCsv" → import_contacts_from_csv, "companiesCsv" → import_companies_from_csv, "csvData" → read_uploaded_csv.`,
      },
      {
        name: 'contentType',
        type: 'string',
        required: false,
        description: `MIME type override. Defaults to the type inferred from the file extension.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_watch_list',
    description: `Create a new watch list for the current team.

Use when the user asks about:
- Starting to monitor a new signal type
- Setting up a watch list end-to-end (create + configure + activate)
- Creating a draft watch list that the user will configure later in the UI

Contract rules reproduced by the backend:
- activate=true ⇒ segmentType AND signalProcessingType must be set
- signalProcessingType="create_opportunity" ⇒ signalOpportunityTemplate required (and forbidden otherwise)
- personaId is accepted ONLY on a company watch list with signalProcessingType="push_to_campaign" (any other config is rejected), and only for teams in the personas beta
- personaId is optional there: without it the signals are still recorded, they simply source no contact, so nothing reaches the campaign
- get a personaId from list_people_database_personas (or create_people_database_persona); never invent one
- Only segmentType="all" is accepted via API (CRM lists and CSV imports are not)`,
    params: [
      {
        name: 'activate',
        type: 'boolean',
        required: true,
        description: `When true, activates the watch list immediately (advances to VALIDATED step, triggers billing and external watcher setup). Requires segmentType and signalProcessingType to be set.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `Configuration filters as an array of { filterId, in[], out[] } objects`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Watch list display name (non-empty)`,
      },
      {
        name: 'segmentType',
        type: 'string',
        required: true,
        description: `Segment type to monitor. Only "all" is supported via API. Required together with signalProcessingType when activate=true.`,
      },
      {
        name: 'signalProcessingType',
        type: 'string',
        required: true,
        description: `How signals are processed once the watch list runs. Required together with segmentType when activate=true. When set to "create_opportunity", signalOpportunityTemplate is required (and forbidden for the other types).`,
      },
      { name: 'type', type: 'string', required: true, description: `Watch list signal type` },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `Optional emoji for the watch list (a random one is picked if omitted)`,
      },
      {
        name: 'personaId',
        type: 'string',
        required: false,
        description: `Persona (pdp_xxx) used to source contacts from the People Database. Used by a company watch list with signalProcessingType = "push_to_campaign": company signals carry no contact, so the persona is the only way to know who to reach. Optional — without it the signals are still recorded, they simply source no contact, so nothing reaches the campaign. Rejected on any other configuration.`,
      },
      {
        name: 'signalOpportunityTemplate',
        type: 'object',
        required: false,
        description: `Opportunity template payload, required when signalProcessingType = "create_opportunity"`,
      },
    ],
  },
  {
    name: 'lemlistmcp_create_webhook',
    description: `Create a webhook for real-time campaign activity notifications. Max 200 per account, no duplicate URLs. Filter by activity type (emailsSent, emailsOpened, emailsReplied, etc.) and/or campaignId.`,
    params: [
      {
        name: 'targetUrl',
        type: 'string',
        required: true,
        description: `The webhook URL to call (must start with http:// or https://)`,
      },
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Optional: Filter to call webhook only for specific campaign (e.g., "cam_xxx")`,
      },
      {
        name: 'isFirst',
        type: 'boolean',
        required: false,
        description: `Optional: Call webhook only for first activity of this type`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Optional: Filter to call webhook only for specific activity types (e.g., "emailsReplied", "emailsSent")`,
      },
      {
        name: 'zapId',
        type: 'string',
        required: false,
        description: `Optional: Zapier integration ID`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_campaign_folder',
    description: `Delete one or more campaign folders. Campaigns are NEVER deleted — each folder's campaigns and sub-folders move up one level (to the parent folder, or to the root if the folder was at the top).

Use when the user asks about:
- Removing one or several folders while keeping their campaigns (pass them all in \`folderIds\`).

Contract rules reproduced by the backend:
- Deleting a folder is blocked if a sub-folder would collide, by name, with a folder already present in the parent — rename the conflicting sub-folder first.
- Best-effort: each id is handled independently; the response lists \`deleted\` and \`failed\` (with a per-id reason).`,
    params: [
      {
        name: 'folderIds',
        type: 'array',
        required: true,
        description: `Folder IDs (cfo_xxx) to delete (1-100). Pass every folder in one call rather than deleting one at a time.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_campaign_leads',
    description: `Permanently delete leads from ONE campaign in a single bulk call. Irreversible: it also removes each lead's activity and task history in that campaign.

Use when the user asks about:
- Removing a specific set of leads from a campaign at once (e.g. after moving or segmenting them elsewhere)
- Cleaning leads out of a campaign without calling the unitary delete endpoint one lead at a time

Two-phase confirmation flow (mandatory):
1. First call WITHOUT confirmed (or confirmed=false): returns the count and a sample of the exact leads that will be deleted, with status="awaiting_confirmation". Show these to the user and get explicit approval via ask_question.
2. Once the user has approved, call again with confirmed=true to actually delete.

Contract rules reproduced by the backend:
- Scoped to a SINGLE campaignId; a lead id is unique to one campaign (campaignId + email).
- Every leadId MUST belong to campaignId. Ids from another campaign (or already deleted) are rejected with an error, not silently skipped. Re-fetch the ids via search_campaign_leads on the target campaign.
- At most 1000 lead ids per call.
- Never call with confirmed=true without explicit user approval.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign (cam_xxx) to remove leads from. A single campaign only, never a list of campaigns.`,
      },
      {
        name: 'leadIds',
        type: 'array',
        required: true,
        description: `Lead ids (lea_xxx) to permanently delete from this campaign. Every id MUST belong to campaignId (a lead id is unique to one campaign). Max 1000 per call. Get the ids from search_campaign_leads run on this same campaign.`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Two-phase safety gate. Omit it (or pass false) on the first call to preview exactly what will be deleted; only pass true after the user has explicitly approved the deletion.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_company',
    description: `Permanently delete a company record from Lemlist. Only removes the Lemlist record — does not affect any connected CRM.`,
    params: [
      {
        name: 'companyId',
        type: 'string',
        required: true,
        description: `Lemlist company ID to delete (cpn_xxx).`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: true,
        description: `REQUIRED: Must be true. Confirms user explicitly approved this deletion. Only set to true after user says yes.`,
      },
      {
        name: 'force',
        type: 'boolean',
        required: false,
        description: `When true, detaches any attached contacts (unsets their companyId) before deleting the company.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_contact',
    description: `REQUIRES CONFIRMATION: Delete a lemlist contact by its ID (ctc_xxx) or email. Only the lemlist record is removed — no CRM-side propagation. Deletion cascades to the contact's leads, opportunities, list memberships, inbox conversations and activities. REQUIRES userConfirmed=true. Fails with CONTACT_DELETE_BLOCKED when the contact cannot be deleted right now (e.g. an enrichment is still running — retry once it finishes).`,
    params: [
      {
        name: 'idOrEmail',
        type: 'string',
        required: true,
        description: `Lemlist contact ID (ctc_xxx) or the contact email address to delete.`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: true,
        description: `REQUIRED: Must be true. Confirms user explicitly approved this deletion. Only set to true after user says yes.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_memory',
    description: `Delete a stored memory entry by topic so it is no longer recalled in future conversations.`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `The topic key to delete (e.g. "preferred_tone")`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Scope: "user" (default) or "team"`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_people_database_persona',
    description: `Delete a People Database persona of the current team. The deletion is permanent.

Use when the user asks about:
- Removing a persona they no longer need
- Cleaning up duplicate or outdated personas

Important:
- Ask the user to confirm before calling this tool; there is no undo.
- Use list_people_database_personas to resolve a persona name into its id.
- An unknown id, another team's persona, and the auto-generated system persona
  all fail the same way (not found) — none of them can be deleted here.`,
    params: [
      {
        name: 'personaId',
        type: 'string',
        required: true,
        description: `The persona id to delete (pdp_xxx format)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_sequence_step',
    description: `Delete a step from a campaign sequence. Use only when removing a step added by mistake — requires user confirmation.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (required for status verification)`,
      },
      {
        name: 'sequenceId',
        type: 'string',
        required: true,
        description: `The sequence ID (starts with seq_)`,
      },
      {
        name: 'stepId',
        type: 'string',
        required: true,
        description: `The step ID to delete (starts with stp_)`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: true,
        description: `REQUIRED: Must be true. Confirms user explicitly approved this deletion. Only set to true after user says yes.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_unsubscribe',
    description: `Remove an email address from the unsubscribe list, allowing it to be contacted again in future campaigns.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address to remove from the unsubscribe list`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `NEVER set this to true on first call. Only set to true after the user has explicitly confirmed the action (e.g. via ask_question).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_watch_list',
    description: `Delete a watch list and immediately stop processing signals for it.`,
    params: [
      {
        name: 'watchListId',
        type: 'string',
        required: true,
        description: `The watch list ID to delete (wat_xxx format)`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Set to true only after the user has explicitly confirmed the deletion (e.g. via ask_question).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_delete_webhook',
    description: `Delete a webhook from your Lemlist account, stopping all notifications to that endpoint immediately.`,
    params: [
      {
        name: 'webhookId',
        type: 'string',
        required: true,
        description: `The webhook ID to delete (starts with hoo_)`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Set to true only after the user has explicitly confirmed the deletion (e.g. via ask_question).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_disconnect_email_account',
    description: `Disconnect email account. Stops sending immediately. Cannot be undone. Use get_user_channels to find account ID.`,
    params: [
      {
        name: 'emailAccountId',
        type: 'string',
        required: true,
        description: `The email account ID to disconnect (starts with usm_)`,
      },
      {
        name: 'confirmed',
        type: 'boolean',
        required: false,
        description: `Set to true only after the user has explicitly confirmed the disconnection (e.g. via ask_question).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_display_leads',
    description: `Show leads in an interactive workspace table. Users can select, filter, and push to campaigns.

For the two-step pattern (lemleads_search in companies mode with \`description\` -> display_leads), you MUST pass the returned \`dataRef\` to this tool. The server resolves it to the full company set server-side and injects a \`currentCompanyByIds\` filter so the leads table queries leads at those companies. This persists in the workspace item (no 30-min TTL concern). Do NOT copy the \`companyIds\` array into a \`currentCompanyByIds\` filter inline — emitting hundreds of IDs inline risks truncation; pass them via the \`companyIds\` field instead and the server builds the filter for you.

FOLLOW-UP TURNS over an existing companies table ("find CEOs of those companies", "now show me leads from this list", "and the marketing directors"): the workspace already holds the company set, so DO NOT re-run lemleads_search. Recovery order:
1. If the companies-mode lemleads_search \`dataRef\` from earlier is still in your context AND was issued in the last ~30 minutes, pass it as \`dataRef\`.
2. Otherwise, call \`get_workspace_items({ itemType: "companies" })\`, read \`data.companyIds\` from the workspace_companies item, and pass that array via the \`companyIds\` field on this tool. The server builds \`currentCompanyByIds\` for you (no truncation risk).
Re-running lemleads_search to "re-verify the count" loses the curated set and is what produces the bad / off-topic lead lists.

Otherwise (no prior companies table involved), call display_leads directly with filters only — the table loads data dynamically. Pass any combination of \`filters\`, \`dataRef\`, and \`companyIds\` together; they are AND-combined server-side.

To modify an existing LEADS search: get_workspace_items -> display_leads with updated filters + replaceItemId.
Only pass replaceItemId when the target item is itself a leads table — never to convert a companies/messages/other item into leads. To show a different artifact type alongside, omit replaceItemId so a new item is appended.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title for the table tab (e.g. "CFOs in France", "SaaS Founders")`,
      },
      {
        name: 'columns',
        type: 'array',
        required: false,
        description: `Optional column keys to display as a string[] (e.g. ["name","title","company"]). Pass the key strings, not column-descriptor objects. Defaults to name, title, company, etc.`,
      },
      {
        name: 'companyIds',
        type: 'array',
        required: false,
        description: `Company IDs to scope the leads to. The server builds a currentCompanyByIds filter from these. Accepts both People-Database company IDs (numeric — the recovery path when a prior companies dataRef is expired but the workspace_companies item still holds them: get_workspace_items -> data.companyIds) and lemlist CRM company IDs (cpn_… from search_companies), which the server resolves to People-Database IDs via coreSignalId/domain. When some CRM IDs cannot be resolved, the result reports how many; report that to the user and do NOT claim success on a resultCount of 0. Avoids LLM-side truncation that you would get by inlining a long currentCompanyByIds filter.`,
      },
      {
        name: 'dataRef',
        type: 'string',
        required: false,
        description: `Reference to a previous lemleads_search result. For a people-mode search, the server REPLAYS the exact verified filter set, so passing this dataRef guarantees the displayed table matches the totalCount you just verified (no filter drift, no retyping). For a companies-mode (vector) search, the server injects a currentCompanyByIds filter from the resolved company set. Preferred over retyping filters or inlining IDs (avoids LLM truncation and search/display drift).`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `People Database filters (PREFERRED). Use filters from get_lemleads_filters. Each needs filterId, in, out arrays.`,
      },
      {
        name: 'leadIds',
        type: 'array',
        required: false,
        description: `Specific lead IDs to display. Only use for small known lists (<50). For results from lemleads_search, pass dataRef instead — it avoids truncating large arrays in the tool call arguments.`,
      },
      {
        name: 'replaceItemId',
        type: 'string',
        required: false,
        description: `ID of an existing workspace leads item to replace (use for modifications instead of creating a new item)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_display_leads_page',
    description: `Fetch one page of People Database leads for the workspace-leads table.

App-only: called by the leads grid iframe (pagination, select-all), not by the agent. Returns the raw Elastic hits the iframe transforms into rows, the total count, and the already-in-campaign / already-in-contacts maps.`,
    params: [
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `Resolved People Database filters (filterId/in/out) for the search`,
      },
      {
        name: 'page',
        type: 'number',
        required: true,
        description: `0-based page index (the usage:"ui" API contract)`,
      },
      {
        name: 'size',
        type: 'number',
        required: true,
        description: `Results per page (default 25, max 100)`,
      },
      {
        name: 'seed',
        type: 'string',
        required: false,
        description: `Optional ordering seed for stable pagination`,
      },
    ],
  },
  {
    name: 'lemlistmcp_display_table',
    description: `Display a data table in the workspace panel.

CRITICAL RULES — follow exactly or the table will be empty:
1. dataRef: If the source tool returned a dataRef string, pass it as dataRef (preferred — avoids large data transfer). The rows will be resolved automatically from the stored reference.
2. rows: Only if no dataRef is available. Pass the ORIGINAL data array from the tool result AS-IS. NEVER construct row objects manually or map/transform the array.
3. columns: Use suggestedColumns from the source tool result directly when available. NEVER invent column keys — they must match actual property names in the row objects.

PREFERRED: dataRef=result.dataRef, columns=result.suggestedColumns, groupKey=result.groupKey, tableType=result.tableType
FALLBACK: rows=result.campaigns, columns=result.suggestedColumns
WRONG: rows=result.campaigns.map(c => ({sentCount: c.stats.sentCount})) — this strips data

Always forward groupKey and tableType from the source tool when available.`,
    params: [
      {
        name: 'columns',
        type: 'array',
        required: true,
        description: `Column definitions — use suggestedColumns from source tool if available`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Table title (shown in workspace tab)`,
      },
      {
        name: 'appendToItemId',
        type: 'string',
        required: false,
        description: `Workspace item ID of an existing table to append rows to instead of creating a new tab. Use get_workspace_items to find the ID, then pass it here when loading more data.`,
      },
      {
        name: 'dataRef',
        type: 'string',
        required: false,
        description: `Reference ID from a source tool (e.g. search_campaign_leads). When provided, rows are resolved automatically from the stored data. Preferred over passing rows directly.`,
      },
      {
        name: 'groupKey',
        type: 'string',
        required: false,
        description: `Grouping key for auto-appending rows. Tables with the same groupKey merge into one tab. Use the source tool result value (e.g. campaignId for leads). Required when paginating.`,
      },
      {
        name: 'rows',
        type: 'array',
        required: false,
        description: `Fallback: the ORIGINAL data array from the source tool result, passed as-is. Only use when dataRef is not available.`,
      },
      {
        name: 'tableType',
        type: 'string',
        required: false,
        description: `Type of table data. Both values render an "Export as CSV" button for the user: "campaign_leads" for leads coming from search_campaign_leads (server-side export), and "generic" for any other table (the displayed columns and rows are exported client-side). Forward the value from the source tool result when there is one; for a custom table you assembled yourself (e.g. an enriched inbox analysis), set "generic" so the user gets the export button.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_enrich_lead',
    description: `Enrich existing campaign lead. ASYNC — poll with bulk_get_enrichment_results (pass enrichmentIds: [id]). For non-campaign contacts use bulk_enrich_data. ALL options COST CREDITS.`,
    params: [
      {
        name: 'leadId',
        type: 'string',
        required: true,
        description: `The lead ID to enrich (starts with lea_)`,
      },
      {
        name: 'findEmail',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS: Find email from lead data`,
      },
      {
        name: 'findPhone',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS: Find phone number`,
      },
      {
        name: 'linkedinEnrichment',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS: Enrich with LinkedIn data`,
      },
      {
        name: 'verifyEmail',
        type: 'boolean',
        required: false,
        description: `⚠️ COSTS CREDITS: Verify lead email`,
      },
    ],
  },
  {
    name: 'lemlistmcp_find_watch_list_linkedin_urls',
    description: `Find real, validated LinkedIn URLs to monitor for a watch list type.

Returns LinkedIn URLs (person /in/ or company /company/ depending on the type),
sourced and validated from live web search and grounded in the team's business
context (AI Context Center).

Use when the user asks about:
- Pre-filling the LinkedIn URLs for a linkedinPeopleProfile, linkedinCompanyProfile,
  competitorConnections or competitorReactions watch list
- Discovering relevant LinkedIn profiles or company pages to watch

Important:
- Only the 4 LinkedIn signal types are accepted; any other type is rejected.
- Pass an optional "focus" to steer the search; otherwise it falls back to the type's name.
- Returns an empty list when no relevant URLs are found.
- Rate-limited per user per day (a limited number of calls).`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Watch list type to find LinkedIn URLs for. Only the 4 LinkedIn signal types are supported: linkedinPeopleProfile (returns /in/ person profiles), linkedinCompanyProfile, competitorConnections, competitorReactions (return /company/ company pages).`,
      },
      {
        name: 'focus',
        type: 'string',
        required: false,
        description: `Optional free-text focus to steer the search (e.g. "HR SaaS in France"). Defaults to the type's feature name when omitted.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_generate_campaign_for_watch_list',
    description: `Generate an AI-powered outreach campaign for an existing watch list.

Builds a campaign from a predefined sequence template, writes every step's copy with
AI (steered by copyStyle and the watch list's signal), links it to the watch list, and
returns the campaign with its generated sequences.

Use when the user asks about:
- Turning a watch list's signals into a ready-to-run outreach campaign
- Auto-generating a sequence + AI copy targeted at what the watch list monitors

Flow:
- Run it on an existing watch list, or create one first (create_watch_list), then call
  this tool to generate its campaign.
- autoLaunch=true launches the campaign immediately; false leaves it in draft.

Important:
- The watch list (watchListId) must exist for the current team.
- reviewBeforeSend only applies when autoLaunch=true.`,
    params: [
      {
        name: 'autoLaunch',
        type: 'boolean',
        required: true,
        description: `Launch the campaign immediately; false creates it in draft`,
      },
      {
        name: 'autoRun',
        type: 'boolean',
        required: true,
        description: `Generate an icebreaker AI variable automatically for each new lead`,
      },
      {
        name: 'copyStyle',
        type: 'string',
        required: true,
        description: `Tone of the AI-generated copy: direct | conversational | insight_led`,
      },
      {
        name: 'reviewBeforeSend',
        type: 'boolean',
        required: true,
        description: `Route leads to Review before the first step (ignored when autoLaunch=false)`,
      },
      {
        name: 'sequenceType',
        type: 'string',
        required: true,
        description: `Predefined sequence recipe: email | linkedin | multichannel`,
      },
      {
        name: 'watchListId',
        type: 'string',
        required: true,
        description: `Source watch list ID (wat_xxx) to build the campaign from`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_ai_variable_prompts',
    description: `Read the AI-generation prompts of a campaign's AI variable columns (the AI-generated columns in the Leads table: icebreakers, openers, contextual openers, etc.).

Returns one entry per AI variable: its variable name, the prompt used to generate it, and the AI model. Prompts come back verbatim, with raw {{variable}} placeholders (e.g. {{firstName}}) left unresolved, since a prompt is a template applied across all leads (there is no single lead to resolve against).

Use when the user asks to:
- See how an AI column (icebreaker, opener, ...) is generated for a campaign
- Review or audit the prompt behind a campaign's AI variables before editing it

Read-only: no credits consumed, nothing is changed. To edit a prompt, use update_ai_variable_prompt; to add a new column, use create_ai_variable_prompt.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `Campaign ID (cam_xxx format) whose AI variable prompts to read`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_business_context',
    description: `Return the published business context for the current team — markdown describing
the company, its value propositions, ICP, products, etc., generated from the team's website.

Use BEFORE:
- crafting any messaging, sequence step, or persona suggestion
- recommending watch list types (so the AI knows what the team sells and to whom)
- onboarding flows that need to reference the team's business

Response shape:
- data: null  → no business context generated yet (suggest running the onboarding generation)
- data: { markdown, sourceUrl, generatedAt, lastEditedAt, updatedAt }`,
    params: [],
  },
  {
    name: 'lemlistmcp_get_call_activities',
    description: `List call activities from the lemlist dialer (cold calls), with filtering and pagination.

Use when the user asks about:
- Calls made or received through the lemlist dialer
- Filtering calls by campaign, lead, contact, user, status/disposition, direction, or date range
- Reviewing call outcomes, durations, or which leads were called

Each call includes direction, duration, status/disposition, phone provider, whether a recording exists,
the AI transcript summary, and the associated lead/contact/campaign/user IDs.
Use get_call_details with an activityId to fetch the recording URL and full transcript for a single call.`,
    params: [
      {
        name: 'callStatus',
        type: 'string',
        required: false,
        description: `Filter by call status/disposition key (e.g. "interested", "no-answer"). The status keys returned by get_call_activities are the valid values.`,
      },
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Filter calls by campaign ID (cam_xxx)`,
      },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `Filter calls by contact ID (ctc_xxx)`,
      },
      {
        name: 'dateFrom',
        type: 'string',
        required: false,
        description: `Include calls created on/after this ISO 8601 datetime (e.g. "2026-01-01T00:00:00Z")`,
      },
      {
        name: 'dateTo',
        type: 'string',
        required: false,
        description: `Include calls created on/before this ISO 8601 datetime`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Filter by call direction (inbound or outbound)`,
      },
      {
        name: 'leadId',
        type: 'string',
        required: false,
        description: `Filter calls by lead ID (lea_xxx)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max calls per page (default 50, max 100)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number (1-based, default 1)`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Filter by the lemlist user who made or received the call (usr_xxx)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_call_details',
    description: `Get full details for ONE dialer call by its activity ID, including the recording URL and transcript.

Use when the user asks about:
- The recording or transcript of a specific call
- The full context of a call (lead, contact, company, campaign, call note, disposition)

Returns call metadata, the associated lead/contact/company/campaign/user, the manual call note (if any),
and — unless includeRecording is false — a temporary recording URL plus the full transcript.
Use get_call_activities first to find the activityId.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The call activity ID (act_xxx) — from get_call_activities`,
      },
      {
        name: 'includeRecording',
        type: 'boolean',
        required: false,
        description: `When true (default), also fetch the recording URL and full transcript. Set false to return only call metadata (faster, no recording fetch).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_call_statuses',
    description: `List this team's configured call statuses (dispositions) — the valid KEYS for update_call_status.

Use when:
- BEFORE update_call_status, to pick a valid status key for this team (keys are team-specific: defaults plus any custom statuses)
- The user asks which call dispositions / statuses exist

Returns each status with its key (what update_call_status expects), label, and side effects:
whether it marks the lead answered / positive / negative and whether it pauses campaigns.`,
    params: [],
  },
  {
    name: 'lemlistmcp_get_campaign_details',
    description: `Get configuration and settings for ONE campaign (timezone, emoji, labels, senders, sequences). For metrics use get_campaigns_stats, for email content use get_campaign_sequences.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (cam_xxx format)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_campaign_sequences',
    description: `Get the email sequences and their content (subject, body) for a specific campaign. Useful for reviewing copywriting and email flow.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (cam_xxx format)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_campaigns',
    description: `List campaigns with optional search, filtering by labels, and sorting.`,
    params: [
      {
        name: 'createdBy',
        type: 'string',
        required: false,
        description: `Filter by creator user ID (usr_xxx format). Use your own user ID from Context to find campaigns you created.`,
      },
      {
        name: 'labels',
        type: 'array',
        required: false,
        description: `Filter by labels/tags. OR semantics: returns campaigns matching at least one. Accepts label names ("q2") or IDs ("lab_xxx") — both can be mixed.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of campaigns to return (default: 20)`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of campaigns to skip for pagination (default: 0). Use with limit to paginate through all campaigns.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search campaigns by name (case-insensitive)`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `Sort by creation date (default: newest first)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status. OMIT this parameter to get ALL campaigns regardless of status.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_campaigns_reports',
    description: `Get lifetime stats for MULTIPLE campaigns in one call. Returns metadata, sender info, and 65+ metrics per campaign. No date filtering - for time-based analysis use get_campaigns_stats.`,
    params: [
      {
        name: 'campaignIds',
        type: 'array',
        required: true,
        description: `Array of campaign IDs to get reports for (e.g., ["cam_xxx", "cam_yyy"])`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_campaigns_stats',
    description: `Get detailed stats for one or more campaigns including lead funnel metrics, message counts, and per-step breakdowns.`,
    params: [
      {
        name: 'campaignIds',
        type: 'array',
        required: true,
        description: `Array of campaign IDs (cam_xxx format)`,
      },
      {
        name: 'ABSelected',
        type: 'string',
        required: false,
        description: `Optional: Filter by A/B test variant`,
      },
      {
        name: 'channels',
        type: 'array',
        required: false,
        description: `Optional: Filter stats by channels (mirrors the UI dropdown filter). When provided, both top-level totals and messageMetrics.perChannel are restricted to the requested channels. Omit to get the full breakdown across all 5 channels.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date. Either a calendar day "YYYY-MM-DD" (interpreted as end-of-day in the resolved timezone) or a full ISO 8601 datetime with offset (used as-is). Omit for all-time stats.`,
      },
      {
        name: 'sendUser',
        type: 'string',
        required: false,
        description: `Optional: Filter by send user (format: usr_xxx|email@example.com)`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date. Either a calendar day "YYYY-MM-DD" (interpreted as start-of-day in the resolved timezone) or a full ISO 8601 datetime with offset like "2026-04-01T00:00:00+05:30" / "2026-04-01T00:00:00Z" (used as-is, the timezone arg is ignored for that bound). Omit for all-time stats.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone (e.g. "Asia/Kolkata", "America/New_York") used to interpret startDate/endDate ONLY when they are calendar days (YYYY-MM-DD). Ignored for full ISO 8601 datetimes. If omitted, falls back to the calling user's profile.timezone (if set), then to Europe/Paris. To exactly mirror what the Lemlist UI displays, prefer passing the same ISO 8601 strings the UI uses (capture from the campaignReportsTimePeriod session).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_contact_fields_schema',
    description: `Get the list of available fields and relations on a contact (lead) or a company.

Returns:
- standardFields: scalar fields always present on the entity (email, firstName, … / name, domain, …)
- customFields: team-specific scalar fields defined by the user
- relations: one-to-many relations available as 'include' on search_campaign_leads (contact only)
- csvImportTargets: the field keys a CSV column can be mapped to for this entity

Use this BEFORE calling search_campaign_leads to know which 'fields' (scalar) and 'include' (relations)
values are valid, and BEFORE import_contacts_from_csv / import_companies_from_csv to build columnMapping.`,
    params: [
      {
        name: 'entity',
        type: 'string',
        required: true,
        description: `Entity type to describe: 'contact' (default) or 'company'.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_contact_lists',
    description: `Retrieve available CRM contact lists with optional search filtering.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter lists by name (case-insensitive)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_domain_dns',
    description: `Read the current DNS records for a domain (MX, SPF, DMARC, DKIM, CNAME, A…).

Use in Step 4 of the outreach-infra skill to audit DNS state before writing new records, and to confirm the apex A record is healthy.`,
    params: [
      { name: 'domainId', type: 'string', required: true, description: `Domain ID (dom_xxx)` },
    ],
  },
  {
    name: 'lemlistmcp_get_inbox_conversation',
    description: `Get the full conversation thread for a specific contact across all channels (email, LinkedIn, WhatsApp, SMS).`,
    params: [
      {
        name: 'contactId',
        type: 'string',
        required: true,
        description: `The contact ID (ctc_xxx format) to get the conversation thread for. Do not use leadId or any other ID type.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of activities per page (default: 20, max: 50)`,
      },
      {
        name: 'markAsRead',
        type: 'boolean',
        required: false,
        description: `Whether to mark the conversation as read (default: false). Note: this mutates state.`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for pagination (default: 1)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_inbox_conversations',
    description: `List inbox conversations with contact info and last message preview, with optional filtering by list type.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of conversations per page (default: 20, max: 50)`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Which inbox list to fetch: myConversations (default), unRead, favorites, snoozed, archived, sentOnly, teamConversations`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for pagination (default: 1)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query to filter conversations by contact name or email`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `The user ID (usr_xxx format). Optional — defaults to the current authenticated user if omitted.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_inbox_placement_result',
    description: `Read the result of an inbox placement test started with run_inbox_placement_test.

The test is asynchronous, so call this with the testId until state is "completed". When completed, it returns the per-provider breakdown (Google / Microsoft / SMTP) of where the email landed (inbox / promotions / spam / unreceived percentages), the overall split, and a deterministic \`pattern\` — trust this field, do not re-derive the thresholds:
- "content_borderline": Google/Microsoft inbox but SMTP in spam → fix content, not infra
- "deeper_issue": Google/Microsoft also failing → warmup, blacklist, or egregious copy
- "all_clean": no content issue, look elsewhere
- "mixed": no single dominant pattern; report the per-provider numbers`,
    params: [
      {
        name: 'testId',
        type: 'string',
        required: true,
        description: `Inbox placement test ID (ipt_xxx) returned by run_inbox_placement_test`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_lemleads_filters',
    description: `Get available filters for People Database searches. Call this FIRST before lemleads_search or display_leads/display_companies. Returns filter IDs with valid values.`,
    params: [],
  },
  {
    name: 'lemlistmcp_get_settings',
    description: `Retrieve settings for a campaign or warmup mailbox entity.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of settings to retrieve.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Entity ID. Required for "campaign" (cam_xxx) and "lemwarm" (usm_xxx). Ignored for "sending" and "team".`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_statistics',
    description: `Retrieve statistics for one or more entities of the same type (lemwarm, campaign, lead, etc.).`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `For "lemwarm": mailbox IDs (usm_xxx) — same ids used with get_settings type="lemwarm". 1-20 items.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of statistics to retrieve. Only "lemwarm" is supported for now.`,
      },
      {
        name: 'days',
        type: 'number',
        required: false,
        description: `Lookback window in days (1-60). Defaults to 30. Applied to every id.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_task_content',
    description: `Load the effective message content (subject + body) of a message-based task (opportunity) — the exact content the Focus-mode editor would show and that send_task would send.

Use when the user asks about:
- Previewing what an email / LinkedIn / WhatsApp task will actually send
- Checking whether a task already has content before sending or editing it

Where the content comes from:
- The per-lead draft override if one exists, otherwise the task's template. This is the real outgoing body — NOT the 'content'/'text' fields from get_tasks, which are null for message tasks and must NOT be read as "empty".

What it returns:
- 'subject'/'message': the effective content ('subject' only for email tasks).
- 'hasContent': false ONLY when the body is genuinely empty (the real "no content" case).
- 'sendable': true when the content is ready for an immediate send_task (message-based, NON-manual task with a body — and a subject for email). Status, contact and sender are still validated by send_task itself.
- 'schedulable': true when the task is a manual campaign step of a message type — it cannot be sent immediately, but send_task will schedule it via the campaign and mark it done ("Schedule & mark done"). A message task is either sendable or schedulable, never both.

Read-only: it never edits or sends. Only email / linkedinSend / whatsappMessage tasks carry content; other types return empty content and sendable=false.`,
    params: [
      {
        name: 'opportunityId',
        type: 'string',
        required: true,
        description: `The task (opportunity) ID to read (opp_xxx format).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_tasks',
    description: `List the team's pending tasks (call/phone, manual, LinkedIn, email tasks...) from the Tasks page.

Use when the user asks about:
- Their pending or upcoming tasks ("what tasks do I have", "my call tasks this week")
- Counting tasks by priority ("how many high-priority tasks")
- Tasks for a specific campaign, assignee, type, or due-date range

Filters:
- 'type' filters by task type (call/phone, manual, email, linkedin*, sms, whatsappMessage)
- 'assignedTo' (usr_xxx) restricts to one user. Omit for the whole team.
- 'dueDateFrom'/'dueDateTo' (ISO 8601) bound the due date.
- 'campaignId' / 'campaignState' filter by source campaign.
- 'priority' (none/low/medium/high) is applied in the handler (the API has no server-side priority filter).

The response always includes 'priorityCounts' (distribution over the fetched tasks) so you can answer "how many high-priority tasks". Only pending tasks that are due or upcoming are returned. Tasks are scanned up to a page cap; when 'truncated' is true, counts and totals are partial — narrow with filters for complete results.

To show the tasks in a table, call display_table with dataRef=result.dataRef, columns=result.suggestedColumns, tableType=result.tableType. Pass the dataRef — do NOT pass result.tasks as rows: 'tasks' is a truncated preview for your reasoning only, and the full rows are resolved from dataRef (this keeps the table call small and fast). The table surfaces each task's title in a clickable Task column (opens Focus Mode) so the user can reference and open an opportunity.

IMPORTANT — 'content'/'text' are NOT the outgoing message body for email / linkedinSend / whatsappMessage tasks: they are usually null here because the real subject/body lives in the task's template (loaded lazily at send time). A null 'content' here does NOT mean the task is empty. To preview what will be sent, call get_task_content; to send, call send_task (it loads the existing content automatically). The 'content'/'text' fields are only meaningful for manual tasks.`,
    params: [
      {
        name: 'assignedTo',
        type: 'string',
        required: false,
        description: `Restrict to one user (usr_xxx). Omit to return the whole team's tasks.`,
      },
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Filter by source campaign (cam_xxx)`,
      },
      {
        name: 'campaignState',
        type: 'array',
        required: false,
        description: `Filter by source campaign state (e.g. running, paused, ended)`,
      },
      {
        name: 'dueDateFrom',
        type: 'string',
        required: false,
        description: `Only tasks due on/after this date (ISO 8601, e.g. 2026-06-01)`,
      },
      {
        name: 'dueDateTo',
        type: 'string',
        required: false,
        description: `Only tasks due on/before this date (ISO 8601, e.g. 2026-06-30)`,
      },
      {
        name: 'priority',
        type: 'array',
        required: false,
        description: `Filter by priority label(s): none, low, medium, high (applied after fetch)`,
      },
      {
        name: 'type',
        type: 'array',
        required: false,
        description: `Filter by task type(s): call/phone, manual, email, linkedin variants, sms, whatsappMessage`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_team_info',
    description: `Get basic team info (ID, name, plan, credits remaining) and minimal identity of the caller (current user id + email). For full user details call get_users with userIds: ["me"] for the caller, userIds: ["all"] for the full member list, or userIds: ["usr_xxx", ...] for one or more team members.`,
    params: [],
  },
  {
    name: 'lemlistmcp_get_team_overview',
    description: `Account summary: campaign count by status. Use get_campaigns for the full list with names and details.`,
    params: [],
  },
  {
    name: 'lemlistmcp_get_unsubscribes',
    description: `List unsubscribed emails with pagination. Use delete_unsubscribe to re-enable.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of unsubscribes to return`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of unsubscribes to skip (for pagination)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_user_channels',
    description: `Check connected sending channels (email, LinkedIn, WhatsApp). Returns connection status, plan availability, and accounts. WhatsApp requires separate addon purchase. Use show_connect_channel to guide setup (one channel at a time).`,
    params: [],
  },
  {
    name: 'lemlistmcp_get_users',
    description: `Retrieve team member details by user IDs, or pass 'all' to fetch all team members.`,
    params: [
      {
        name: 'userIds',
        type: 'array',
        required: true,
        description: `List of userIds to fetch. Each item is "all" (every team member, lightweight), "me" (caller, full profile), or a usr_xxx id (full profile). 1-20 items.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_watch_list_filter_value',
    description: `Resolve the valid values for one or more watch list filterIds.

ALWAYS call this tool to get correctly formatted values before passing them
to create_watch_list or update_watch_list. Do not guess or hardcode values.

filterId MUST come from list_watch_list_filters — call it first to discover
which filterIds are valid for the signal type you are configuring.

BATCH your lookups: pass every value you need across every filterId in a single
call via "requests" (one entry per filterId, with all its queries grouped in
"queries"). Do NOT call this tool repeatedly one value at a time.

The backend automatically picks the right resolution strategy for each filter.
Pass query strings when searching for specific values (e.g. job titles,
companies, locations).

Each filterId returns the deduplicated union of its queries' matches. An empty
results array means no match — do not invent values.

The returned matches are candidates, not a selection: a single query can resolve
to many values. Do NOT pass all of them back — keep only the ones that actually
fit the watch list you are configuring, and drop the rest.

If an entry comes back with a non-empty "error" and results null, fix what it
describes (e.g. provide a query) and call this tool once more for that filterId.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `One entry per filterId, each grouping every value to resolve for it. Batch ALL the lookups you need into this single call — do not call the tool repeatedly one value at a time.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_get_webhooks',
    description: `List all configured webhooks. Returns array with _id, targetUrl, createdAt, type, campaignId, isFirst.`,
    params: [],
  },
  {
    name: 'lemlistmcp_import_companies_from_csv',
    description: `Import companies into a company list from an uploaded CSV.

Use when the user asks about:
- Loading a CSV/spreadsheet of companies or accounts into a company list
- Bulk-adding companies to the CRM

Company columns are mapped to their bare keys here (name, domain, industry, …) —
the company-prefixed form belongs to a contact CSV.

Flow (3 steps, in order):
1. create_upload_url → get an uploadUrl + uploadKey
2. PUT the raw CSV to uploadUrl
3. this tool with the uploadKey

Contract rules reproduced by the backend:
- the list must exist, hold this entity type, and not be dynamic (filter-driven lists are filled by their own sync)
- uploadKey must come from create_upload_url; a made-up key is rejected
- at least one column must be mapped, and no mapping may target a reserved key (_id, teamId, …)
- a "customField" target only lands if that custom field already exists on the team
- every imported entity — created, updated or unchanged — is added to the list

A target that matches no field is re-resolved server-side from the header and a sample
value (so an export header like companyWebsite still fills companyDomain). Whatever it
corrects comes back as repairedColumns; anything it cannot place comes back as
ignoredColumns — those columns were NOT imported, so check them before reporting success.`,
    params: [
      {
        name: 'columnMapping',
        type: 'object',
        required: true,
        description: `Maps each CSV header to the field it fills: { "CSV header": "fieldKey" }. Valid fieldKeys come from get_contact_fields_schema (csvImportTargets). Use "customField" to store a column in the custom field named after that header. Columns left out of the map are not imported.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Target list ID (clt_xxx format). Get it from get_contact_lists.`,
      },
      {
        name: 'uploadKey',
        type: 'string',
        required: true,
        description: `uploadKey returned by create_upload_url. The CSV must already be uploaded.`,
      },
      {
        name: 'upsertMode',
        type: 'string',
        required: false,
        description: `How existing entities are handled: "createAndUpdate" (default) creates new ones and updates matches, "createOnly" skips matches, "updateOnly" only updates and creates nothing.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_import_contacts_from_csv',
    description: `Import contacts into a contact list from an uploaded CSV.

Use when the user asks about:
- Loading a CSV/spreadsheet of people into a contact list
- Bulk-adding contacts to the CRM without starting a campaign
(To put leads into a campaign instead, use import_leads_to_campaign.)

A contact CSV can also carry the company columns: map them to the company-prefixed
keys (companyName, companyDomain, …) and the company is created and linked in the
same pass.

Flow (3 steps, in order):
1. create_upload_url → get an uploadUrl + uploadKey
2. PUT the raw CSV to uploadUrl
3. this tool with the uploadKey

Contract rules reproduced by the backend:
- the list must exist, hold this entity type, and not be dynamic (filter-driven lists are filled by their own sync)
- uploadKey must come from create_upload_url; a made-up key is rejected
- at least one column must be mapped, and no mapping may target a reserved key (_id, teamId, …)
- a "customField" target only lands if that custom field already exists on the team
- every imported entity — created, updated or unchanged — is added to the list

A target that matches no field is re-resolved server-side from the header and a sample
value (so an export header like companyWebsite still fills companyDomain). Whatever it
corrects comes back as repairedColumns; anything it cannot place comes back as
ignoredColumns — those columns were NOT imported, so check them before reporting success.`,
    params: [
      {
        name: 'columnMapping',
        type: 'object',
        required: true,
        description: `Maps each CSV header to the field it fills: { "CSV header": "fieldKey" }. Valid fieldKeys come from get_contact_fields_schema (csvImportTargets). Use "customField" to store a column in the custom field named after that header. Columns left out of the map are not imported.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Target list ID (clt_xxx format). Get it from get_contact_lists.`,
      },
      {
        name: 'uploadKey',
        type: 'string',
        required: true,
        description: `uploadKey returned by create_upload_url. The CSV must already be uploaded.`,
      },
      {
        name: 'upsertMode',
        type: 'string',
        required: false,
        description: `How existing entities are handled: "createAndUpdate" (default) creates new ones and updates matches, "createOnly" skips matches, "updateOnly" only updates and creates nothing.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_import_leads_to_campaign',
    description: `Import leads into a campaign from a CSV uploaded with create_upload_url — the fast path for
files of hundreds/thousands of leads (no lead data passes through the conversation).

Flow:
1. create_upload_url({ purpose: "leadsCsv", fileName, fileSize }) → uploadUrl + uploadKey
2. PUT the file to uploadUrl (curl -T)
3. import_leads_to_campaign({ campaignId, uploadKey, columnMapping })

columnMapping maps each CSV header to a lead field (read the file's header row to build it).
The server downloads, parses, dedups, optionally enriches, and bulk-inserts in one pass, then
returns compact counters ({ total, added, updated, skipped, failed }) plus a capped list of failure
rows — NOT the full list of imported leads.

⚠️ Credit cost, charged only on success — a lookup that returns nothing costs 0: findEmail 5 per email found, linkedinEnrichment 1 per profile enriched, findPhone 20 per phone number found, verifyEmail 1 per email verified.
Multiply by the number of imported rows to quote a maximum before enabling them.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (starts with cam_)`,
      },
      {
        name: 'columnMapping',
        type: 'object',
        required: true,
        description: `CSV header → target lead field, e.g. {"Email pro":"email","LinkedIn":"linkedinUrl"}. Targets: built-in fields, any custom variable name, or "customField". Unmapped columns are ignored.`,
      },
      {
        name: 'uploadKey',
        type: 'string',
        required: true,
        description: `Storage key returned by create_upload_url (purpose="leadsCsv").`,
      },
      {
        name: 'deduplicate',
        type: 'boolean',
        required: false,
        description: `Avoid duplicates across campaigns (default: false).`,
      },
      {
        name: 'findEmail',
        type: 'boolean',
        required: false,
        description: `COSTS CREDITS: Find email address from other lead data.`,
      },
      {
        name: 'findPhone',
        type: 'boolean',
        required: false,
        description: `COSTS CREDITS: Find phone number from other lead data.`,
      },
      {
        name: 'linkedinEnrichment',
        type: 'boolean',
        required: false,
        description: `COSTS CREDITS: Enrich each lead with LinkedIn profile data.`,
      },
      {
        name: 'maxRows',
        type: 'number',
        required: false,
        description: `Max rows to import (default 10000, capped at 40000).`,
      },
      {
        name: 'verifyEmail',
        type: 'boolean',
        required: false,
        description: `COSTS CREDITS: Verify the email address is valid.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_lemleads_search',
    description: `Search the People Database (450M+ B2B contacts) by people or company. Returns results with total count and pagination.`,
    params: [
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `Array of filter objects from get_lemleads_filters. Each filter MUST have filterId, in (array), and out (array).`,
      },
      {
        name: 'mode',
        type: 'string',
        required: true,
        description: `MUST be "people" for contacts or "companies" for organizations. Do NOT use "leads".`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Prose describing the target company as if you were writing ITS "About us" section (companies mode only, max 1000 chars per string). MUST be 2-4 full sentences each, NOT a keyword list. The embedding index was built on real company descriptions, so keyword-stacked strings ("SaaS treasury cash management tool") score poorly. Write complete sentences: who they are, who they serve, what they do, how. GOOD: "We build treasury management software for mid-market finance teams. Our platform helps CFOs and treasurers automate cash forecasting, consolidate bank accounts, and optimize liquidity across entities." BAD: "SaaS software solution for treasury management cash management". Accepts (a) a single string for the simple case, or (b) an array of up to 3 strings covering different angles (e.g. anchor + product + customer/problem). Multi-angle triggers parallel vector searches with RRF fusion — recommended for niche verticals where one phrasing risks missing matches. Combine with keywords (grouped) and country/headcount filters for narrowing.`,
      },
      {
        name: 'excludes',
        type: 'array',
        required: false,
        description: `Fields to exclude from results`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Optional hybrid BM25 + vector terms (companies mode only). Pass as GROUPS whenever possible — each group is a category of signal, and the document must match at least one term per group (AND-of-ORs). Grouping is how you force "editor, not consultancy": one group for the domain, one for the product-type marker. Example for "French SaaS treasury editors": [["treasury management", "cash forecasting", "gestion de trésorerie", "prévisions de trésorerie"], ["software", "SaaS", "logiciel", "platform", "plateforme"]]. A flat string[] is still accepted as a single implicit group (all terms OR-matched, any one hit passes). Keep groups small (2-5 terms each), max 5 groups.`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `1-based page index (default: 1)`,
      },
      {
        name: 'seed',
        type: 'string',
        required: false,
        description: `Random seed for consistent ordering. Must be a STRING like "abc123", not a number.`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Results per page (default: 10, max: 100)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_list_campaign_folders',
    description: `List all campaign folders for the current team, with their hierarchy (parentId).

Use when the user asks about:
- Seeing their campaign folder structure.
- Finding a folder's ID before renaming / moving / deleting it, or before filing campaigns into it.

The hierarchy is expressed by \`parentId\` (absent = root-level folder).`,
    params: [],
  },
  {
    name: 'lemlistmcp_list_domains',
    description: `List all domains owned by the team (registrar, status, mailbox count).

Use to audit the team's existing sending surface before proposing new purchases in the outreach-infra skill.`,
    params: [],
  },
  {
    name: 'lemlistmcp_list_mailboxes',
    description: `List the team's mailboxes with their IDs (dem_xxx), email, status, and currently assigned SDR (assignedToUserId). Optionally filter by domainId.

Use to audit which user owns each mailbox — and as the discovery step before \`update_mailbox\` when the user wants to re-assign mailboxes (e.g. when an outreach infrastructure was provisioned without per-SDR \`assignToUser\` and every mailbox ended up on the API key owner).

Each mailbox also carries a deterministic \`ageDays\` (no date math needed), and the response includes a \`providerMix\` summary { google, microsoft, smtp, total, smtpSharePct, smtpHeavy } where \`smtpHeavy\` is true when SMTP > 70% (structurally disadvantaged). Trust these computed fields.`,
    params: [
      {
        name: 'domainId',
        type: 'string',
        required: false,
        description: `Optional domain ID (dom_xxx) to scope the listing to one domain`,
      },
    ],
  },
  {
    name: 'lemlistmcp_list_people_database_personas',
    description: `List the People Database personas saved by the current team.

A persona is a named, reusable set of People Database filters (an audience
definition). Call this FIRST whenever a persona id is needed — a persona id
(pdp_xxx) can only be obtained from this tool or from create_people_database_persona.

Use when the user asks about:
- Which personas / saved audiences the team has
- Applying "our ICP" or a persona by name (resolve the name to its id here)
- Picking the persona to attach to another resource

Each entry returns _id, name, mode, filters, createdAt and updatedAt.`,
    params: [
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Restrict to personas of one mode. Omit to return every persona of the team.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_list_voice_profiles',
    description: `List the AI voice profiles available for LinkedIn AI voice note steps (recordMode="ai"): lemlist default voices and the team's own cloned voices.

Use this BEFORE setting a voice on a linkedinVoiceNote step. Pass the returned \`voiceId\` to add_sequence_step (or in a propose_sequence step) together with recordMode="ai" and the script in \`message\`. Only ids returned here are accepted; a voiceId from another team is rejected.`,
    params: [],
  },
  {
    name: 'lemlistmcp_list_watch_list_filters',
    description: `Return, for each watch list type, the filters is allowed to set.
Each filter entry includes:
- filterId (e.g. "title", "companyIndustries", "location")
- name (human-readable label)
- properties: which sides (in / out) the form exposes for this filter
- required (optional): sides that must be non-empty for the watch list to be valid
- requiresQuery (optional): when true, get_watch_list_filter_value MUST be called
  with a query for this filter; when absent/false, omit the query to get the full set

Use BEFORE create_watch_list or update_watch_list to pick valid filterId values
and to know which "in"/"out" sides to populate. Omit "type" to get the matrix for all types.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Restrict to a single signal type. Omit to return filters for all types.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_list_watch_list_library',
    description: `List the catalog of watch list signal types available on the platform.

Use BEFORE create_watch_list to:
- know which "type" values are valid (e.g. "companyIsHiring", "jobChange", "linkedinKeywords")
- understand what each type monitors (title, description)

Each entry includes type, title and description.`,
    params: [],
  },
  {
    name: 'lemlistmcp_list_watch_list_signals',
    description: `List the signals captured by watch lists for the current team, with filtering and pagination.

Use when the user asks about:
- Reviewing newly received signals
- Filtering signals by type, status, watch list, or date range
- Paginating through historical signals

Each signal includes its watch list, type, computed status, received date, and the enriched entity (contact or company).`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max signals per page (default 50, max 100)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number (1-based, default 1)`,
      },
      {
        name: 'receivedAtFrom',
        type: 'string',
        required: false,
        description: `Include signals received on/after this ISO 8601 datetime (with timezone offset)`,
      },
      {
        name: 'receivedAtTo',
        type: 'string',
        required: false,
        description: `Include signals received on/before this ISO 8601 datetime (with timezone offset)`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort by (default: receivedAt)`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Comma-separated list of computed statuses to filter. Accepted values: new, old, handled, ignored.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Comma-separated list of signal types to filter (e.g. "companyIsHiring,jobChange"). Accepted values: companyIsHiring, companyRaisedFunds, jobChange, newHire, companyEmployeeVisitedMyWebsite, linkedinProfile, linkedinTopic, customSignals, competitorConnections, technologyChange, linkedinPeopleProfile, linkedinCompanyProfile, mergersAcquisitions, promotion, linkedinKeywords, externalSignalContact, externalSignalCompany.`,
      },
      {
        name: 'watchListId',
        type: 'string',
        required: false,
        description: `Scope results to a single watch list (wat_xxx format)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_list_watch_lists',
    description: `List watch lists for the current team with optional type, status, and pagination filters.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max watch lists per page (default 50, max 100)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number (1-based, default 1)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Comma-separated list of statuses to filter. Accepted values: active, inactive, draft, insufficient_credits, empty_crm_lists, error. Excludes soft-deleted by default.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Comma-separated list of watch list types (e.g. "companyIsHiring,jobChange")`,
      },
    ],
  },
  {
    name: 'lemlistmcp_load_skill',
    description: `Load specialized guidance for a specific domain (e.g. campaign-builder, api-reference) to assist with complex tasks.`,
    params: [
      {
        name: 'skillName',
        type: 'string',
        required: true,
        description: `Name of the skill to load`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Optional: specific reference section to load`,
      },
    ],
  },
  {
    name: 'lemlistmcp_move_campaign_folder',
    description: `Move a campaign folder (and its whole subtree) under a different parent folder, or to the root.

Use when the user asks about:
- Reorganizing their folder hierarchy.
- Moving a folder out of its current parent (omit newParentId for the root).

Contract rules reproduced by the backend:
- A folder cannot be moved into itself or one of its own sub-folders.
- The resulting depth must stay within 15 levels, and the target level within 50 folders.
- The folder name must stay unique at the target level.`,
    params: [
      {
        name: 'folderId',
        type: 'string',
        required: true,
        description: `Folder ID (cfo_xxx) to move.`,
      },
      {
        name: 'newParentId',
        type: 'string',
        required: false,
        description: `Target parent folder ID (cfo_xxx). Omit to move the folder to the root.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_move_campaigns_to_folder',
    description: `Move one or more campaigns into a folder, or out to the root (the drag-and-drop equivalent).

Use when the user asks about:
- Filing campaigns into a folder.
- Taking campaigns out of a folder (omit folderId to move them to the root).

Contract rules reproduced by the backend:
- Only campaigns owned by the current team are moved; unknown ids are skipped.`,
    params: [
      {
        name: 'campaignIds',
        type: 'array',
        required: true,
        description: `Campaign IDs (cam_xxx) to move (1-100). Pass every campaign in one call.`,
      },
      {
        name: 'folderId',
        type: 'string',
        required: false,
        description: `Target folder ID (cfo_xxx) to file the campaigns into. Omit to move them out to the root.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_people_database_search_count',
    description: `Use ONLY in the People Database scope.
  
Return the exact number of People Database documents (leads or companies) that match a set of filters, without returning the documents themselves.

Use it when:
- The user asks how many people or companies match a set of criteria.
- To refine a set of filters after people_database_nl_to_filters.
- To size an audience before running a full search or building a campaign.
- To compare how restrictive two filter sets are.

Every filterId must be an exact id returned by people_database_nl_to_filters.`,
    params: [
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `The People Database query — the same "filters" array people_database_nl_to_filters returns. Each filter needs at least one in/out value.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: true,
        description: `Search mode: 'leads' for people/contacts, 'companies' for companies. Must match the mode the filters were built for.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_preview_email',
    description: `Preview how an email step renders for a SPECIFIC lead.

Compiles a sequence step's subject + body for one lead: the lead's {{variables}} are substituted and Liquid conditionals ({% if jobTitle contains "Founder" %}...{% endif %}) are evaluated, exactly like the lemlist UI email preview.

Use when the user asks to:
- See the final email a given lead will receive
- Check how variables / Liquid resolve for a real lead
- Spot empty variables or broken Liquid before sending

Read-only: no credits consumed, nothing is sent. The lead's campaign is inferred from the lead unless campaignId is passed to override it.`,
    params: [
      {
        name: 'leadId',
        type: 'string',
        required: true,
        description: `The lead ID (lea_xxx format) whose variables are used to compile the email`,
      },
      {
        name: 'stepId',
        type: 'string',
        required: true,
        description: `The sequence step ID (stp_xxx format) whose subject + message are compiled`,
      },
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Optional campaign ID (cam_xxx format). Defaults to the lead's own campaign; only pass it to override.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_preview_sequence_update',
    description: `SAFE READ-ONLY: Preview what would change in an email sequence step before applying modifications. Shows current vs proposed content and campaign status. Must call this before update_sequence_step.`,
    params: [
      { name: 'campaignId', type: 'string', required: true, description: `Campaign ID (cam_xxx)` },
      { name: 'sequenceId', type: 'string', required: true, description: `Sequence ID (seq_xxx)` },
      { name: 'stepId', type: 'string', required: true, description: `Step ID (stp_xxx)` },
      {
        name: 'newMessage',
        type: 'string',
        required: false,
        description: `Proposed new message body`,
      },
      {
        name: 'newSubject',
        type: 'string',
        required: false,
        description: `Proposed new subject line`,
      },
    ],
  },
  {
    name: 'lemlistmcp_propose_sequence',
    description: `Propose a sequence with full tree structure for user review. Displays visual tree in workspace. To update an existing sequence: get_workspace_items → propose_sequence with replaceItemId.

Format: provide an array of sequences. The main sequence contains the root steps. Conditional steps reference sub-sequences by ID via their "conditions" array.

Example with condition:
- sequences: [
    { _id: "seq_main", steps: [{ _id: "s1", type: "email", delay: 0, name: "Initial email" }, { _id: "s2", type: "conditional", delay: 3, delayType: "within", conditions: [{ sequenceId: "seq_yes", key: "emailsOpened", label: "Opened" }, { sequenceId: "seq_no", fallback: true, label: "Not opened" }] }] },
    { _id: "seq_yes", steps: [{ _id: "s3", type: "linkedinSend", delay: 2, name: "LinkedIn follow-up" }] },
    { _id: "seq_no", steps: [{ _id: "s4", type: "email", delay: 3, name: "Reminder email", subject: "Following up" }] }
  ]
- mainSequenceId: "seq_main"

CRITICAL RULES:
- TREE STRUCTURE ONLY: each sub-sequence must be referenced by exactly ONE condition branch. NEVER reuse the same sequenceId in multiple conditions. If two branches need similar steps, duplicate the sub-sequence with different IDs (e.g. "seq_breakup_1", "seq_breakup_2").
- BRANCH CONVERGENCE: to converge multiple branches on a common closing step (e.g. an "Email Breakup"), place that step AFTER the conditional in the PARENT sequence — do NOT duplicate it in every branch. The engine resumes the lead at the parent's next step when a sub-sequence ends. Example: seq_main = [email, conditional(YES->seq_engaged, NO->seq_breakup), email "Final goodbye"] — the final email runs for both branches.
- Max 10 levels of nested conditions (a conditional inside a sub-sequence of another conditional, chained up to 10 deep). Nest as deep as the campaign logic genuinely needs within that ceiling; prefer a flatter structure when it expresses the same flow.

EDITING AN EXISTING CAMPAIGN (desired-state): when the user asks to review/edit a campaign you already have context for, the proposal must be the FULL intended sequence — describe what the campaign should look like AFTER the edit:
- Keep a step: include it with \`existing: true\` and \`sourceStepId\` set to its real id (the "id:" shown in get_campaign_context). Do NOT recompose its message — its content is preserved automatically.
- Replace a step: same \`existing: true\` + \`sourceStepId\`, plus the new content (bind a messageId via compose_messages) and/or a changed \`delay\`.
- Add a step: include it with NO \`existing\` flag (a brand-new step), at the position you want.
- Remove a step: simply OMIT it from the proposal (any live step you don't reference is deleted).

On a DRAFT campaign with no launched leads, the full set of edits above is applied. On a RUNNING/PAUSED or lead-populated campaign, only non-destructive edits are accepted: you may replace a step's content and APPEND new steps after the last existing step, but you must keep every existing step (reference each with \`existing: true\` + \`sourceStepId\`) and may NOT insert a step between existing ones or remove one — for those, use add_sequence_step (with an explicit index) or delete_sequence_step.

Condition types — every conditional step ALWAYS requires \`delay\`, \`delayType\` and a non-fallback branch with \`key\`:
- Field-check (hasEmailAddress, hasLinkedinUrl, hasPhoneNumber): check lead data instantly. Use \`delayType: "within"\` and \`delay: 0\`.
- Action (hasScore, emailsOpened, emailsClicked, emailsUnsubscribed, meetingBooked, linkedinInviteAccepted, linkedinOpened, aircallDone): track lead behavior over time. Use \`delayType: "within"\` (must occur within \`delay\` days) or \`delayType: "waitUntil"\` (wait indefinitely).
- Async (linkedinNetworkCheck, hasWhatsappAccount): external API check. Use \`delayType: "within"\` and \`delay: 0\`.

Step types: email (needs subject), linkedinVisit, linkedinFollow, linkedinInvite, linkedinLikeLastPost, linkedinCommentLastPost (AI-generated comment on the lead's last LinkedIn post; user reviews via Opportunity before publish), linkedinSend, linkedinEndorse, linkedinVoiceNote (LinkedIn voice message. recordMode = how the audio is produced, manual = the "Mark as manual" toggle, independent of each other. recordMode="ai" generates the audio from a composed script via ElevenLabs (also set a voiceId via list_voice_profiles). When no AI voice is available, set \`manual: true\` so the step becomes a per-lead recording task and the campaign stays launchable - do NOT compose a script or set a voiceId for it), phone, sms, whatsappMessage, manual, conditional, enrichment (⚠️ COSTS CREDITS: automatically enriches leads at this step; provide workflowIds, e.g. ["find_email_01", "find_phone_01"]; requires MULTI plan).`,
    params: [
      {
        name: 'mainSequenceId',
        type: 'string',
        required: true,
        description: `ID of the root/main sequence`,
      },
      {
        name: 'sequences',
        type: 'array',
        required: true,
        description: `All sequences. Main sequence + sub-sequences for conditional branches.`,
      },
      { name: 'name', type: 'string', required: false, description: `Name for this sequence` },
      {
        name: 'replaceItemId',
        type: 'string',
        required: false,
        description: `ID of an existing sequence item to update (from get_workspace_items). Reuse it to modify a sequence instead of creating a new tab.`,
      },
      {
        name: 'skipPlan',
        type: 'boolean',
        required: false,
        description: `Set to true ONLY when the user explicitly asked to skip the campaign plan and go straight to the sequence. It waives the plan-first requirement for a brand-new campaign. Leave unset otherwise — the default flow presents a display_document strategy brief first.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_provision_mailboxes',
    description: `Create mailbox orders on a team-owned domain. Call this IMMEDIATELY after purchase_domain for each domain — do not wait for the domain to become Active first.

The mailbox type is locked by the domain's provider (set at purchase and irreversible):
- "google" domain → Google Workspace mailboxes only
- "m365" domain → Microsoft 365 mailboxes only
- "infraforge" domain → SMTP mailboxes only

Both domain and mailbox orders are processed asynchronously by background cron jobs
(Ordered → Paid → Registered → Pending → Active). This can take minutes to hours
(M365: up to 2 days). After calling this tool, tell the user to wait until their
domains show as Active before proceeding with DNS configuration.

**DESTRUCTIVE — IRREVERSIBLE CHARGE.** Creates real mailbox orders and bills the team.
Only call after the user has explicitly confirmed the full infrastructure plan.

Returns \`{ added, mailboxes: [{ _id, email, assignToUser }] }\` — keep the \`_id\` (\`dem_xxx\`) of each created mailbox if any later \`update_mailbox\` call is anticipated (e.g. recovery, re-assignment).`,
    params: [
      { name: 'domainId', type: 'string', required: true, description: `Domain ID (dom_xxx)` },
      { name: 'emails', type: 'array', required: true, description: `Mailboxes to create` },
    ],
  },
  {
    name: 'lemlistmcp_purchase_domain',
    description: `Purchase (or transfer) a domain at the registrar. Charges the team via Stripe.

**DESTRUCTIVE — IRREVERSIBLE CHARGE.** Only call after the user has explicitly
confirmed the full infrastructure plan (Step 7 of the outreach-infra skill).
The plan must include price, provider, and any pre-set DNS records.

**CRITICAL: The provider locks the mailbox type for this domain permanently.**
A domain purchased with "google" can ONLY have Google Workspace mailboxes.
A domain purchased with "m365" can ONLY have Microsoft 365 mailboxes.
A domain purchased with "infraforge" can ONLY have SMTP mailboxes.
This choice is irreversible — you cannot change the provider after purchase.
Choose carefully based on the ESP split from calculate_infrastructure.

**Registrant contact:** the registrar requires a billing/registrant contact.
On the team's FIRST purchase, pass \`billingContact\` (collected from the user).
It is stored on the team and reused for later domains, so omit it once set.
Purchasing without a contact (and none stored) fails with a clear error.`,
    params: [
      { name: 'domain', type: 'string', required: true, description: `Domain to purchase` },
      {
        name: 'provider',
        type: 'string',
        required: true,
        description: `Locks the mailbox type permanently: "google" = Google Workspace only, "m365" = Microsoft 365 only, "infraforge" = SMTP only. Irreversible.`,
      },
      {
        name: 'authCode',
        type: 'string',
        required: false,
        description: `Transfer auth code (if isTransfer)`,
      },
      {
        name: 'billingContact',
        type: 'object',
        required: false,
        description: `Domain registrant/billing contact. Required on the team's first purchase (the registrar needs it); stored and reused afterwards, so omit it once set. Providing it overwrites the existing contact.`,
      },
      {
        name: 'dnsRecords',
        type: 'array',
        required: false,
        description: `Optional initial DNS records`,
      },
      {
        name: 'isTransfer',
        type: 'boolean',
        required: false,
        description: `Transfer an existing domain instead of registering`,
      },
    ],
  },
  {
    name: 'lemlistmcp_push_leads_to_contacts',
    description: `Push leads from the People Database into your CRM contacts, optionally adding them to a contact list.`,
    params: [
      {
        name: 'profileIds',
        type: 'array',
        required: true,
        description: `People Database lead IDs to push to contacts (max 1,000)`,
      },
      {
        name: 'enrichFeatures',
        type: 'array',
        required: false,
        description: `⚠️ COSTS CREDITS: Enrichment features to apply when pushing leads`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Target contact list ID in clt_xxx format. Omit to push to "all contacts". Get valid IDs from get_contact_lists — never invent or pass aliases like "all".`,
      },
    ],
  },
  {
    name: 'lemlistmcp_recall_memory',
    description: `Retrieve stored memories from previous conversations to restore context about user preferences or past decisions.`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Exact topic key to retrieve (e.g. "preferred_tone"). Omit to retrieve all memories.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_remove_contacts_from_list',
    description: `Remove existing CRM contacts from a contact list.

**When to use:**
- User wants to take contacts out of a list (e.g. clean up duplicates, drop a wrong segment)
- After searching a list with search_contacts (listId filter), user wants to remove a subset

**Parameters:**
- contactIds: Contact IDs in ctc_xxx format (required, max 1,000)
- listId: Contact list ID in clt_xxx format to remove them from (required)

**IMPORTANT:**
- This removes list membership ONLY. It does NOT delete the contacts themselves.
- To get the contacts currently in a list, call search_contacts with that listId, then keep
  the ones to remove (e.g. those without a LinkedIn URL) and pass their ids here.
- To get a valid listId, call get_contact_lists first — never invent or guess a list ID.
- Contacts that are not in the list are silently skipped (no error).
- The list must be a static contact list; you cannot manually remove from a dynamic list.

**Example:**
{
  "contactIds": ["ctc_abc123", "ctc_def456"],
  "listId": "clt_xyz789"
}`,
    params: [
      {
        name: 'contactIds',
        type: 'array',
        required: true,
        description: `Contact IDs to remove from the list (max 1,000)`,
      },
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Contact list ID in clt_xxx format to remove the contacts from. Get valid IDs from get_contact_lists.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_rename_campaign_folder',
    description: `Rename a campaign folder and/or change its color.

Use when the user asks about:
- Renaming a folder.
- Changing a folder's color.

Contract rules reproduced by the backend:
- The new name must be unique among folders that share the same parent.`,
    params: [
      {
        name: 'folderId',
        type: 'string',
        required: true,
        description: `Folder ID (cfo_xxx) to update.`,
      },
      { name: 'color', type: 'string', required: false, description: `New folder color (hex).` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New folder name. Must stay unique among folders sharing the same parent.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_report_unsupported_case',
    description: `Report a feature request or unsupported use case to the product team. Use this ONLY when the user's request is something lemlist should support but the copilot cannot do yet, AND the user has agreed to have their feedback reported. Do NOT use for off-topic requests unrelated to lemlist. Always provide inputs in English, translate if needed.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `What the user asked for that is not supported yet (MUST be in English)`,
      },
      {
        name: 'conversationContext',
        type: 'string',
        required: false,
        description: `Brief summary of the conversation context leading to this request (MUST be in English)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_run_deliverability_audit',
    description: `Run the full deliverability audit for the current team and return the complete structured report (header, every phase, verdict). This IS the deliverability playbook — the same deterministic engine the lemgod audit page runs, so both surfaces always agree on the same account.

Use when the user wants to:
- Audit an account's deliverability, or diagnose why open/reply rates dropped or emails land in spam (the deliverability-audit skill)
- Get a health check of a sending setup (DNS, warmup, sending volume, content, targeting)

The report is READ-ONLY: it never modifies a mailbox, domain, or campaign, and sends nothing. It contains:
- header: team, mailbox/domain/campaign counts, account age, lemwarm usage
- phases: one result per phase (triage, technical, sending stats, campaign settings, content, warmup), each with a status (ok / minor / broken / skipped) and concrete findings
- verdict: root cause, ranked actions, optional recovery plan, and a prose summary

Contract rules reproduced by the backend:
- All phases always run (no early bail-out); a phase that cannot run returns status "skipped" with a reason — never fabricate data for it.
- The verdict's root cause, severity, ranked actions, and recovery plan are computed deterministically; trust them and present them, do not re-derive the thresholds.
- Phase 6 (inbox placement) is NOT part of this tool — it sends a real email and is a separate, explicitly-confirmed action (run_inbox_placement_test).`,
    params: [],
  },
  {
    name: 'lemlistmcp_run_inbox_placement_test',
    description: `Run an inbox placement (spam) test: send one email from a mailbox to ~25 seed inboxes across Google, Microsoft, and SMTP, to measure where it lands (inbox / promotions / spam) per provider.

Use when the user wants to:
- Test whether a campaign's content lands in spam (Phase 6 of the deliverability-audit skill)
- Compare placement of two campaigns to quantify a content change
- Diagnose a "Google fine but SMTP spam" content issue

This SENDS A REAL EMAIL and consumes 100 credits. Confirm with the user first. Pull the real campaign subject + body (get_campaign_sequences / preview_email) so the test mirrors production content.

The test is asynchronous: this returns a testId with state "pending". Poll get_inbox_placement_result with that testId until it reports "completed" to read the per-provider breakdown.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Email body to test (use the real campaign content)`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `Subject line to test (use the real campaign subject)`,
      },
      {
        name: 'userMailboxId',
        type: 'string',
        required: true,
        description: `Sender mailbox (usm_xxx) the test email is sent from — its reputation is what gets measured`,
      },
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Optional campaign (cam_xxx) this test is linked to, for reporting`,
      },
      {
        name: 'stepId',
        type: 'string',
        required: false,
        description: `Optional sequence step (stp_xxx) the content comes from`,
      },
    ],
  },
  {
    name: 'lemlistmcp_save_business_context',
    description: `Save the user business context for future conversations. Use this after collecting company information from the user to remember it across conversations.`,
    params: [
      { name: 'companyName', type: 'string', required: true, description: `Company name` },
      {
        name: 'mainActivity',
        type: 'string',
        required: false,
        description: `What the company does`,
      },
      {
        name: 'painPointsSolved',
        type: 'array',
        required: false,
        description: `Pain points the company solves for customers`,
      },
      {
        name: 'shortDescription',
        type: 'string',
        required: false,
        description: `Company and offering summary`,
      },
      {
        name: 'targetCompanySizes',
        type: 'array',
        required: false,
        description: `Target sizes (1-10, 11-50, etc.)`,
      },
      {
        name: 'targetIndustries',
        type: 'array',
        required: false,
        description: `Target industries`,
      },
      { name: 'targetJobTitles', type: 'array', required: false, description: `Target job titles` },
      {
        name: 'valueProposition',
        type: 'string',
        required: false,
        description: `Main value proposition of the company`,
      },
      { name: 'websiteUrl', type: 'string', required: false, description: `Website URL` },
    ],
  },
  {
    name: 'lemlistmcp_save_memory',
    description: `Save a piece of information to persistent memory so it can be recalled in future conversations.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The information to remember (max 5000 chars, in the user language)`,
      },
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `Unique topic key in snake_case english (e.g. "preferred_tone", "icp_details", "campaign_naming")`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Scope: "user" (default, personal) or "team" (shared with all team members)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_search_campaign_leads',
    description: `Find leads in your campaigns by email, lead ID, or by listing all leads in a campaign.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Campaign ID. Required when listing all leads (no email/id). Optional filter when searching by email/id.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Lead email address to search for`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Lead ID to search for (alternative to email)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max leads to return (default: 50, max: 100).`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Pagination offset (default: 0). Use nextOffset from a previous result to load more.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_search_companies',
    description: `Search your team's Lemlist companies. Returns a paginated list with each company's id, domain, name, owner, and a curated \`crmSync\` block describing how the record is synced to your active CRM (Hubspot, Salesforce, or Pipedrive). Use the \`crmSyncStatus\` filter to find companies in a specific sync state — most notably \`unique_index_error_company\` to list lemlist companies blocked from syncing because another lemlist company already occupies their CRM record. For each result in that state, look at \`crmSync.errors[].metadata.alreadyExistingCompanyId\` — that is the canonical lemlist company you should remap contacts to before deleting the duplicate (see \`search_contacts\` with companyId, then \`delete_company\`).`,
    params: [
      {
        name: 'crmSyncStatus',
        type: 'string',
        required: false,
        description: `Filter by CRM sync status. Requires a CRM (Hubspot, Salesforce, Pipedrive) to be connected on the team — otherwise the call returns NO_CRM_CONNECTED.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max companies per page (1-100, default 100).`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number (1-based, default 1).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Free-text search on the company name (case insensitive, accent insensitive).`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Sort field (default \`createdAt\`).`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `Sort direction (default \`desc\`).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_search_contacts',
    description: `Search or list your team's Lemlist contacts by name, email, contact list, or attached company. Returns matching contacts with their details (ID, name, email, phone, job title, company, campaign count). All filters are optional — calling the tool without any filter returns the paginated list of all contacts of the team (useful for discovery, e.g. obtaining a Record ID before associating it with another resource). Use this to find if a contact already exists in Lemlist before creating a new one. You can filter by a specific contact list using listId (get valid IDs from get_contact_lists first). Use notInAnyCampaign=true to find contacts that are not part of any campaign (orphan contacts). To list contacts attached to a given company, use companyId (cpn_xxx) or one of companyDomain / companyLinkedinUrl / companySalesnavUrl — only one company* filter at a time. URL/domain filters return an empty list if no company matches. For searching leads WITHIN campaigns, use search_campaign_leads instead. For prospecting NEW leads from the People Database, use lemleads_search instead.`,
    params: [
      {
        name: 'companyDomain',
        type: 'string',
        required: false,
        description: `Filter contacts by their company's website domain (resolved to a companyId). Empty list if no company matches.`,
      },
      {
        name: 'companyId',
        type: 'string',
        required: false,
        description: `Filter contacts by attached lemlist company ID (cpn_xxx). Mutually exclusive with companyDomain/companyLinkedinUrl/companySalesnavUrl.`,
      },
      {
        name: 'companyLinkedinUrl',
        type: 'string',
        required: false,
        description: `Filter contacts by their company's LinkedIn URL (resolved to a companyId). Empty list if no company matches.`,
      },
      {
        name: 'companySalesnavUrl',
        type: 'string',
        required: false,
        description: `Filter contacts by their company's LinkedIn Sales Navigator URL (resolved to a companyId). Empty list if no company matches.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Exact email address to search for (takes priority over search parameter)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of contacts to return (1-100, default: 20)`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Filter by contact list ID (clt_xxx format). Can be combined with search/email, or used alone to list all contacts in a list. Get valid IDs from get_contact_lists.`,
      },
      {
        name: 'notInAnyCampaign',
        type: 'boolean',
        required: false,
        description: `When true, only returns contacts that are not part of any campaign. Can be used alone or combined with other filters.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of contacts to skip for pagination (default: 0)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Free-text search: matches against contact full name or email address (min 2 chars, case-insensitive)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_search_domains',
    description: `Check availability of a domain at the registrar (and optionally return suggestions).

Use in Step 3 of the outreach-infra skill — after calculate_infrastructure has produced a shortlist of brand-consistent candidates, call this tool for each candidate to confirm availability + pricing before presenting the plan to the user.`,
    params: [
      {
        name: 'base',
        type: 'string',
        required: true,
        description: `Base domain (e.g. "getacme.com")`,
      },
      {
        name: 'includeSuggestions',
        type: 'boolean',
        required: false,
        description: `Include alternative suggestions from the registrar`,
      },
    ],
  },
  {
    name: 'lemlistmcp_search_help_center',
    description: `Search the lemlist help center for official documentation and guides. Use this when you need to provide guidance on how to do something in lemlist that you cannot do directly via tools. Returns relevant help center articles with content excerpts and links. Do NOT use this for questions you can answer from context or tools.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query in English using 1-3 keywords (e.g., "inbox rotation", "email provider", "signals")`,
      },
    ],
  },
  {
    name: 'lemlistmcp_send_message',
    description: `Send a message to a contact or lead via email, LinkedIn, WhatsApp, or SMS from the Lemlist inbox.`,
    params: [
      { name: 'channel', type: 'string', required: true, description: `Channel to send through.` },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Message content (channel-specific format).`,
      },
      {
        name: 'sendUserId',
        type: 'string',
        required: true,
        description: `User ID sending the message (usr_xxx format).`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `channel="email": optional list of CC email addresses.`,
      },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `Contact ID to send to. Required if leadId is not provided.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `channel="sms": sender phone number.`,
      },
      {
        name: 'leadId',
        type: 'string',
        required: false,
        description: `Lead ID to send to. Alternative to contactId.`,
      },
      {
        name: 'sendUserEmail',
        type: 'string',
        required: false,
        description: `channel="email": email address to send from.`,
      },
      {
        name: 'sendUserMailboxId',
        type: 'string',
        required: false,
        description: `channel="email": mailbox ID (usm_xxx) to use for sending.`,
      },
      {
        name: 'sendUserWhatsappAccountId',
        type: 'string',
        required: false,
        description: `channel="whatsapp": WhatsApp account ID (uwa_xxx) to use for sending.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `channel="email": email subject line.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_send_task',
    description: `Send one OR many message-based tasks now, OR — for a manual campaign step — schedule it via the campaign and mark it done (the "Send & mark done" / "Schedule & mark done" actions on the Tasks / Focus page).

Use when the user asks to actually SEND an email, LinkedIn message or WhatsApp message task (not merely close it), or to schedule/complete a manual campaign step.

Pass opportunityId as a single task ID or an array of task IDs. The same sender is applied to every task; the result is always the aggregate { total, succeeded, failed, results[] } — each entry carries channel/sent/scheduled or an error code, and a bad task fails on its own without failing the others. With an array this contacts MULTIPLE leads at once — only call it after the user has approved sending to all of them.

What it sends:
- The task's current content: the per-lead draft override if one exists, otherwise the task's template. Edit it first with update_task_content if needed.

Contract rules reproduced by the backend:
- Regular (non-manual) email, linkedinSend and whatsappMessage tasks are sent immediately; this requires the per-channel sender fields, a contact and non-empty content (email needs a subject). Returns sent=true, scheduled=false.
- A manual campaign step is NOT sent immediately: it is handed back to the campaign to send at its scheduled time and marked done. Sender fields, contact and content are NOT required (the campaign step's own content is used at send time). Returns sent=false, scheduled=true.
- Still only email, linkedinSend and whatsappMessage types are handled; phone, SMS, generic manual and other types are rejected — close those with update_task status="done".
- The task must be open (due/upcoming); paused or already-closed tasks are rejected.
- Sender details for a direct send: email needs sendUserEmail + sendUserMailboxId; whatsapp needs sendUserWhatsappAccountId; linkedin needs only sendUserId. Discover valid sender ids/mailboxes with get_users / get_user_channels.
- This actually contacts the lead (now, or at the scheduled time) — only call it after the user has approved sending.`,
    params: [
      {
        name: 'opportunityId',
        type: 'string',
        required: true,
        description: `A single task ID (opp_xxx) or an array of task IDs. The same change is applied to every task; results are returned per task (partial success — a bad task fails on its own without failing the others).`,
      },
      {
        name: 'sendUserId',
        type: 'string',
        required: true,
        description: `User ID (usr_xxx) sending the message. Required for every channel. Ignored for a manual campaign step (scheduling uses the campaign step's own sender).`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `CC email addresses (email tasks only).`,
      },
      {
        name: 'sendUserEmail',
        type: 'string',
        required: false,
        description: `Sending email address. REQUIRED for email tasks; ignored otherwise.`,
      },
      {
        name: 'sendUserMailboxId',
        type: 'string',
        required: false,
        description: `Mailbox ID (usm_xxx) to send from. REQUIRED for email tasks; ignored otherwise.`,
      },
      {
        name: 'sendUserWhatsappAccountId',
        type: 'string',
        required: false,
        description: `WhatsApp account ID (uwa_xxx). REQUIRED for WhatsApp tasks; ignored otherwise.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_set_ab_variant',
    description: `Set or update the A/B test variant B (subject and/or body) of an EMAIL sequence step.

Use when the user asks to:
- A/B test an email step (two subjects, two bodies, or both)
- Add or edit the variant B of an email step

Behaviour:
- If the step has no A/B test yet, this enables it: variant B starts as a copy of variant A (same subject, body, CC), then the fields you pass are applied on top. Fields you omit stay inherited from A.
- If a variant B already exists, only the fields you pass are changed; the rest of B is left untouched.
- Pass no field to just enable A/B with variant B identical to A.

Scope: this tool covers email steps only, which is NOT the same as "A/B testing is email-only".
- LinkedIn invitation (e.g. variant A with a note vs variant B without), LinkedIn chat message, LinkedIn InMail, SMS and WhatsApp chat message steps all support A/B testing in the product; no tool exposes it yet.
- For those channels, answer that it is possible and hand over the manual path: open the campaign in the sequence editor, select the step, turn on its A/B test, then edit variant B there.
- Never tell the user that a non-email step cannot be A/B tested.

Contract rules reproduced by the backend:
- Calling this tool on a step that is not an email step is rejected (SEQUENCE_AB_ONLY_EMAIL). The public REST A/B endpoint carries the same limit.
- A running campaign can reject edits to steps that have already launched: pause it first.`,
    params: [
      {
        name: 'sequenceId',
        type: 'string',
        required: true,
        description: `Sequence ID (seq_xxx) that contains the email step.`,
      },
      {
        name: 'stepId',
        type: 'string',
        required: true,
        description: `Email step ID (stp_xxx) to set variant B on.`,
      },
      {
        name: 'altMessage',
        type: 'string',
        required: false,
        description: `Variant-B plain-text alternative body. Rarely needed; omit to inherit from A or keep B unchanged.`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `Variant-B CC recipients (email addresses or {{variables}}). Omit to inherit from A or keep B unchanged.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Variant-B email body as HTML. Omit to inherit variant A's body (on creation) or keep B unchanged (on update).`,
      },
      {
        name: 'plainText',
        type: 'boolean',
        required: false,
        description: `Send variant B as plain text instead of HTML. Omit to inherit from A or keep B unchanged.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Variant-B subject line. Omit to inherit variant A's subject (on creation) or keep B unchanged (on update).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_set_campaign_sender_strategy',
    description: `Set the sender-assignment strategy for a campaign — the algorithm that decides which sender (user) is attached to each lead at launch. Keywords: sender strategy, dynamic sender assignment, round-robin sender, contact owner sender, custom variable sender, per-lead sender routing.

Use when the user asks about:
- Configuring HOW senders are assigned to leads (as opposed to WHICH users are in the send pool — that is set_campaign_senders).
- Routing sends by a per-lead custom variable (e.g. "send from the account manager listed on each lead").
- Using the CRM contact owner as the sender.
- Using the user who imported the lead as the sender.
- Switching between random / round-robin and any of the dynamic strategies above.

This tool decides HOW senders are picked. To change WHO is in the eligible pool, use set_campaign_senders.

Contract rules:
- "customField:<fieldName>" requires the field to exist as a team custom field of type "user", AND each lead must have variables.<fieldName> populated with a valid userId. Leads missing that value are silently dropped from launch with a "noAssignment" diagnostic (they will not be sent to).
- Changing the strategy on a running campaign does NOT reassign already-resolved leads; it only applies to leads reviewed/launched after the change.
- No user confirmation required.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `Campaign ID (cam_xxx) to update.`,
      },
      {
        name: 'senderStrategy',
        type: 'string',
        required: true,
        description: `How senders are picked for each lead at launch. One of: "random" (round-robin over the campaign send pool), "contactOwner" (use each lead's CRM contact owner), "leadImporter" (use the user who imported the lead), or "customField:<fieldName>" (read the sender userId from lead.variables.<fieldName>).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_set_campaign_senders',
    description: `Assign team members as senders for a campaign's outreach messages.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `Campaign ID (cam_xxx format)`,
      },
      {
        name: 'senderIds',
        type: 'array',
        required: true,
        description: `Array of user IDs (usr_xxx format) to assign as senders. Get IDs from get_users (userIds: ["all"]).`,
      },
    ],
  },
  {
    name: 'lemlistmcp_set_campaign_state',
    description: `Start, pause, archive, or unarchive a campaign to change its running state.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `"start" to launch the campaign, "pause" to pause a running campaign, "archive" to archive a campaign, "unarchive" to restore an archived campaign`,
      },
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (cam_xxx format)`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: false,
        description: `REQUIRED for action="start" and action="archive": Must be true. Confirms user explicitly approved the action. Not required for pause or unarchive.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_suggest_watch_lists',
    description: `Generate AI-suggested watch lists for the current team.

Returns scored, ready-to-create watch list configurations — each with a relevance
score, a reason and an estimated monthly signal volume — tailored to the team's ICP.

Use when the user asks about:
- Recommendations on which signals / watch lists to set up
- Discovering the most relevant watch list types for their business

Important:
- Requires the team's business context (AI Context Center) to be set, otherwise it errors.
- Consumes one daily AI suggestion session (the team has a limited daily quota).
- Returns suggestions only; creating or activating them is a separate step (create_watch_list).`,
    params: [],
  },
  {
    name: 'lemlistmcp_test_email_account',
    description: `Test SMTP/IMAP connectivity of an email account. No actual email sent. Use get_user_channels to find account ID.`,
    params: [
      {
        name: 'emailAccountId',
        type: 'string',
        required: true,
        description: `The email account ID to test (starts with usm_)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_transfer_campaign_leads_to_list',
    description: `Add every lead of a campaign to a CRM contact list, in one call.

Each campaign lead is backed by a CRM contact; this resolves those contacts server-side and adds them to the list. You do NOT need to fetch or enumerate lead/contact IDs first.

**When to use:**
- User wants to move/copy a whole campaign's leads into a contact list (e.g. "add everyone in campaign X to my 'Hot leads' list")
- After identifying a campaign and a target list, to populate the list from the campaign

**Parameters:**
- campaignId: Campaign ID in cam_xxx format (required). Get it from get_campaigns.
- listId: Target contact list ID in clt_xxx format (required). Get it from get_contact_lists, or create one with create_contact_list. Never invent or guess a list ID.

**IMPORTANT:**
- This ADDS (copies) contacts to the list; it does not remove leads from the campaign or move them off any other list.
- Contacts already in the list are silently skipped (idempotent, no duplicates).
- The target list must be a static contact list; dynamic lists are rejected.
- Leads that have no associated contact are skipped.

**Example:**
{
  "campaignId": "cam_abc123def456",
  "listId": "clt_xyz789"
}`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `Source campaign ID in cam_xxx format. Every lead in this campaign is transferred. Get valid IDs from get_campaigns.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Target contact list ID in clt_xxx format. Must be a static contact list. Get valid IDs from get_contact_lists; never invent or guess a list ID.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_ai_variable_prompt',
    description: `Edit the AI-generation prompt of ONE AI variable column on a campaign (icebreaker, opener, contextual opener, etc.).

Replaces the existing prompt entirely with the provided one. Use get_ai_variable_prompts first to read the current prompt and the exact variable names. Keep the {{variable}} placeholders (e.g. {{firstName}}) in the new prompt, and only reference variables or AI columns that already exist on the campaign.

Only prompts owned by your team (the per-campaign copy) can be edited. Shared lemlist/system prompts are read-only and will be rejected.

Pass tools to change the column's tools (e.g. tools:["enrich-linkedin"] to scrape LinkedIn — the prompt must reference {{linkedinUrl}}). Enabling any tool forces the premium lemlist model and lemlist-credit billing. Pass an empty array ([]) to remove all tools; the column reverts to your team's default model and billing (still charged in lemlist credits if your team has no own AI provider key, otherwise billed via your own API key). Omitting tools leaves the existing tools untouched and only replaces the prompt.

Pass autofill to switch the column's auto-generate toggle: true fills this AI variable for every lead added or imported to the campaign afterwards (CSV import, CRM sync, manual add), false turns that off. Omitting autofill leaves the toggle as it is.

Use when the user asks to:
- Change how an AI column is generated for a campaign
- Tweak / rewrite an icebreaker or opener prompt
- Turn auto-generation on new/imported leads on or off for an AI column

This mutates campaign configuration, so confirm the change with the user before calling.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `Campaign ID (cam_xxx format) that owns the AI variable`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The new AI-generation prompt. Replaces the existing prompt entirely. Keep {{variable}} placeholders for the fields/columns it should reference.`,
      },
      {
        name: 'variableName',
        type: 'string',
        required: true,
        description: `Name of the AI variable column to edit (e.g. "icebreaker"). The "variables." prefix is optional.`,
      },
      {
        name: 'autofill',
        type: 'boolean',
        required: false,
        description: `Switches the column's "auto-generate" toggle: true generates this AI variable for every lead added or imported to the campaign afterwards (CSV import, CRM sync, manual add), false turns that off. Omit to leave the current setting untouched. ⚠️ COSTS CREDITS: with it on, every newly added lead consumes one generation.`,
      },
      {
        name: 'tools',
        type: 'array',
        required: false,
        description: `Optional AI tools the column may use while generating each value. "enrich-linkedin" scrapes the lead's LinkedIn profile (the prompt MUST reference {{linkedinUrl}} or {{linkedinUrlSalesNav}}, otherwise the tool never fires and the column stays empty); "scrape-website" reads a URL; "web-search" searches the live web. ⚠️ COSTS CREDITS: enabling ANY tool forces the premium lemlist model and switches billing to lemlist credits, charged per lead at generation time (not now). Omit for a plain text column.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_call_status',
    description: `Set the disposition (call status) on a single dialer call activity.

Use when the user asks to:
- Log or correct the outcome of a call (e.g. after reading its transcript)
- Back-fill a missing status on a call that was dialed but never dispositioned

Typical flow: get_call_activities (find calls, spot empty statuses) → get_call_details
(read the transcript) → get_call_statuses (get the valid keys) → update_call_status (set the key).

Setting a status is NOT cosmetic: depending on how the team configured that status, it can
mark the lead interested / not-interested and pause campaigns, and it syncs to the connected
CRM — exactly like a rep clicking it in the UI.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The call activity ID (act_xxx) — from get_call_activities or get_call_details`,
      },
      {
        name: 'callStatus',
        type: 'string',
        required: true,
        description: `The call status KEY to set (e.g. "left-voicemail", "connected-positive"). Must be one of the team's configured status keys — call get_call_statuses first to get them. An invalid key returns the list of valid keys so you can retry.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_lead',
    description: `Update standard fields on an existing lead (firstName, lastName, jobTitle, companyName, email, phone, linkedinUrl, picture, timezone, jobDescription, companyDomain). Requires leadId + at least one field to update. For custom variables, use update_lead_variables instead.`,
    params: [
      {
        name: 'leadId',
        type: 'string',
        required: true,
        description: `The lead ID (starts with lea_)`,
      },
      {
        name: 'companyDomain',
        type: 'string',
        required: false,
        description: `Lead company domain`,
      },
      { name: 'companyName', type: 'string', required: false, description: `Lead company name` },
      { name: 'email', type: 'string', required: false, description: `Lead email address` },
      { name: 'firstName', type: 'string', required: false, description: `Lead first name` },
      {
        name: 'jobDescription',
        type: 'string',
        required: false,
        description: `Lead job description`,
      },
      { name: 'jobTitle', type: 'string', required: false, description: `Lead job title` },
      { name: 'lastName', type: 'string', required: false, description: `Lead last name` },
      {
        name: 'linkedinUrl',
        type: 'string',
        required: false,
        description: `Lead LinkedIn profile URL`,
      },
      { name: 'phone', type: 'string', required: false, description: `Lead phone number` },
      { name: 'picture', type: 'string', required: false, description: `Lead profile picture URL` },
      { name: 'timezone', type: 'string', required: false, description: `Lead timezone` },
    ],
  },
  {
    name: 'lemlistmcp_update_lead_variables',
    description: `Set custom variables on an existing lead (upsert). Requires leadId + variables (key-value pairs of non-empty strings). Automatically handles both updating existing variables and adding new ones. IMPORTANT: Do NOT pass standard lead fields as variables — the following keys are FORBIDDEN and will be rejected: email, firstName, lastName, picture, phone, linkedinUrl, timezone, jobTitle, jobDescription, companyName, companyDomain. To update these fields, use the update_lead tool instead. Empty string values are rejected — omit the variable instead.`,
    params: [
      {
        name: 'leadId',
        type: 'string',
        required: true,
        description: `The lead ID (starts with lea_)`,
      },
      {
        name: 'variables',
        type: 'object',
        required: true,
        description: `Custom variables as key-value pairs to set (e.g., {"comicFrame": "panel_3", "tone": "friendly"}). Values must be non-empty strings — omit the variable rather than passing an empty string.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_mailbox',
    description: `Update a team mailbox. Currently supports assignment to a specific SDR (lemlist user); the schema is extensible for future updates (settings, status, …). Idempotent — re-applying the same update is safe.

Use in Step 5 of the outreach-infra skill once mailboxes have been provisioned, to wire each mailbox to its intended SDR before warmup starts.`,
    params: [
      {
        name: 'assignToUserId',
        type: 'string',
        required: true,
        description: `lemlist userId (usr_xxx) to assign the mailbox to`,
      },
      {
        name: 'mailboxId',
        type: 'string',
        required: true,
        description: `Domain mailbox ID (dem_xxx)`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_sequence_step',
    description: `Update a step in an existing campaign sequence. Requires user confirmation for email or content step changes.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: true,
        description: `The campaign ID (required for status verification)`,
      },
      {
        name: 'sequenceId',
        type: 'string',
        required: true,
        description: `The sequence ID (starts with seq_)`,
      },
      {
        name: 'stepId',
        type: 'string',
        required: true,
        description: `The step ID to update (starts with stp_)`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: true,
        description: `REQUIRED: Must be true. Confirms user explicitly approved this change after seeing the preview. Only set to true after user says yes.`,
      },
      {
        name: 'conditionKey',
        type: 'string',
        required: false,
        description: `New condition key (for conditional steps only)`,
      },
      { name: 'delay', type: 'number', required: false, description: `New delay value in days` },
      {
        name: 'delayType',
        type: 'string',
        required: false,
        description: `New delay type for conditional steps. "within" = must happen within delay days, "waitUntil" = wait indefinitely. For field-check conditions, use "within" with delay 0.`,
      },
      {
        name: 'emailStatusFilter',
        type: 'array',
        required: false,
        description: `Only for hasEmailAddress condition. Filter by email status: ["deliverable","risky","undeliverable","unverified"].`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `New email body content (for email steps, supports Liquid syntax)`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `New HTTP method for "api" (webhook) steps. Limited to GET/POST to stay iso with the lemlist UI editor. Ignored on non-api steps.`,
      },
      {
        name: 'scoreComparator',
        type: 'string',
        required: false,
        description: `Only for hasScore condition. "$gte" = score above or equal, "$lt" = score below.`,
      },
      {
        name: 'scoreThreshold',
        type: 'number',
        required: false,
        description: `Only for hasScore condition. Score threshold (0-100).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New subject line (supports Liquid syntax: {{ firstName }}, {% if condition %}...{% endif %})`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New task title (for manual/phone steps). Short label displayed in the review UI.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `New webhook URL for "api" steps. Supports Liquid templating against lead variables (e.g. https://example.com/leads/{{ _id }}). Ignored on non-api steps.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_settings',
    description: `Update settings for a campaign or warmup mailbox entity.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Entity ID. For "lemwarm": the mailbox ID (usm_xxx) — the same id used with get_settings type="lemwarm".`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of settings to update. Only "lemwarm" is supported for now.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Optional state change. "start" activates warmup, "pause" stops it. Omit when only updating settings.`,
      },
      {
        name: 'internalCommunicationPercent',
        type: 'number',
        required: false,
        description: `Percentage of warmup emails sent to internal participants (0-100). Only applied when the team has the lemwarmInternalCommunication beta.`,
      },
      {
        name: 'userConfirmed',
        type: 'boolean',
        required: false,
        description: `REQUIRED when action="start": must be true after user confirms activating warmup.`,
      },
      {
        name: 'warmEmailMax',
        type: 'number',
        required: false,
        description: `Daily warmup email target (0-40). Server enforces 1-40 unless the team has the lemwarm0limit beta.`,
      },
      {
        name: 'warmEmailRampup',
        type: 'number',
        required: false,
        description: `Ramp-up increment per day (0-40). Server enforces 1-40 unless the team has the lemwarm0limit beta.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_task',
    description: `Update a single editable field on one OR many tasks (opportunities) on the Tasks / Focus page.

Use when the user asks about:
- Reassigning a task to a teammate (or unassigning it)
- Changing a task's priority (none/low/medium/high)
- Snoozing a task to a later date
- Marking a task done or ignored
- Marking a task read or unread

Pass opportunityId as a single task ID or an array of task IDs. The same field/value is applied to every task; the result is always the aggregate { field, total, succeeded, failed, results[] } — each entry carries updated or an error code, and a bad task fails on its own without failing the others.

Contract rules reproduced by the backend:
- Exactly ONE of assignedTo / priority / dueDate / status / read must be provided per call (applied to every task).
- assignedTo must be a teammate of the current team, or "unassign".
- A paused task cannot be marked "done" (use "ignored"); it also cannot be snoozed (resume it first).
- dueDate must be a future ISO 8601 date.
- status="done" ONLY marks the task complete — it does NOT send the message. For an email/LinkedIn/WhatsApp task where the message should actually be sent to the lead, use send_task (which sends the content AND marks done). Use status="done" here only to close a task without sending (the "mark as done only" action). For a manual campaign step, send_task schedules-and-marks-done (same end state as status="done"), so both paths converge.
- To edit a task's subject or body, use update_task_content instead.`,
    params: [
      {
        name: 'opportunityId',
        type: 'string',
        required: true,
        description: `A single task ID (opp_xxx) or an array of task IDs. The same change is applied to every task; results are returned per task (partial success — a bad task fails on its own without failing the others).`,
      },
      {
        name: 'assignedTo',
        type: 'string',
        required: false,
        description: `Reassign the task: a teammate user ID (usr_xxx), or "unassign" to clear the assignee. The user must belong to the current team.`,
      },
      {
        name: 'dueDate',
        type: 'string',
        required: false,
        description: `Snooze the task until this ISO 8601 date/time (e.g. "2026-07-10T09:00:00Z"). Must be in the future.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Task priority. "none" clears the priority.`,
      },
      {
        name: 'read',
        type: 'boolean',
        required: false,
        description: `Mark the task read (true) or unread (false).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Close the task: "done" (completed) or "ignored" (skipped). Paused tasks cannot be marked "done" — use "ignored".`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_task_content',
    description: `Update the message content (subject and/or body) of a message-based task (opportunity).

Use when the user asks about:
- Rewriting or tweaking the body of an email, LinkedIn or WhatsApp task
- Changing the subject line of an email task

Contract rules reproduced by the backend:
- Only message-based task types are supported: email, linkedinSend, whatsappMessage.
- subject is only allowed on email tasks.
- Provide at least one of subject or message; the untouched field is preserved.
- Pass the task's type so the body is formatted for its channel (email body kept as HTML, LinkedIn/WhatsApp as plain text).
- For campaign-step tasks the edit is stored as a per-lead override (the shared campaign template is untouched); standalone tasks edit their own template.`,
    params: [
      {
        name: 'opportunityId',
        type: 'string',
        required: true,
        description: `The task (opportunity) ID to update (opp_xxx format).`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The task type — must match the task's actual type (from get_tasks or get_task_content). Used to format the body for its channel: email is HTML (newlines become <br>), LinkedIn and WhatsApp are plain text.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `New message body / content (email body, LinkedIn or WhatsApp message).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New email subject. Only valid for email tasks; rejected for other types.`,
      },
    ],
  },
  {
    name: 'lemlistmcp_update_watch_list',
    description: `Update an existing watch list.

Use when the user asks about:
- Renaming or changing the emoji of a watch list
- Adjusting filters of a watch list
- Changing how signals are processed (manual, create_opportunity, push_to_campaign)

Contract rules reproduced by the backend:
- personaId is accepted ONLY on a company watch list with signalProcessingType="push_to_campaign" (any other config is rejected), and only for teams in the personas beta
- personaId is optional there: without it the signals are still recorded, they simply source no contact, so nothing reaches the campaign
- get a personaId from list_people_database_personas (or create_people_database_persona); never invent one`,
    params: [
      {
        name: 'activate',
        type: 'boolean',
        required: true,
        description: `When true, activates the watch list immediately (advances to VALIDATED step, triggers billing and external watcher setup). Requires segmentType and signalProcessingType to be set.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: true,
        description: `Configuration filters as an array of { filterId, in[], out[] } objects`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New watch list name (non-empty)`,
      },
      {
        name: 'signalProcessingType',
        type: 'string',
        required: true,
        description: `New signal processing type`,
      },
      {
        name: 'watchListId',
        type: 'string',
        required: true,
        description: `The watch list ID to update (wat_xxx format)`,
      },
      { name: 'emoji', type: 'string', required: false, description: `New emoji` },
      {
        name: 'personaId',
        type: 'string',
        required: false,
        description: `Persona (pdp_xxx) used to source contacts from the People Database. Used by a company watch list with signalProcessingType = "push_to_campaign": company signals carry no contact, so the persona is the only way to know who to reach. Optional — without it the signals are still recorded, they simply source no contact, so nothing reaches the campaign. Rejected on any other configuration.`,
      },
      {
        name: 'signalOpportunityTemplate',
        type: 'object',
        required: false,
        description: `Opportunity template payload, required when signalProcessingType = "create_opportunity"`,
      },
    ],
  },
  {
    name: 'lemlistmcp_validate_campaign_readiness',
    description: `Validate that a campaign is ready to launch by checking step content, sender configuration, DNS health, and daily limits.`,
    params: [
      {
        name: 'campaignId',
        type: 'string',
        required: false,
        description: `Campaign ID (cam_xxx format). Provide this or campaignName.`,
      },
      {
        name: 'campaignName',
        type: 'string',
        required: false,
        description: `Campaign name to search for. Provide this or campaignId.`,
      },
    ],
  },
]
