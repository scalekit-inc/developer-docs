import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'vercelmcp_addtoolbarreaction',
    description: `Add an emoji reaction to a message in a toolbar thread`,
    params: [
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji character to use as the reaction (e.g. '👍', '❤️')`,
      },
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The ID of the message to react to`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread containing the message`,
      },
    ],
  },
  {
    name: 'vercelmcp_buyaddon',
    description: `Execute an add-on purchase previously quoted by get_purchase_quote. Requires a prior quote and confirm:true`,
    params: [
      {
        name: 'productAlias',
        type: 'string',
        required: true,
        description: `The add-on to purchase. Only "siem" is available today.`,
      },
      {
        name: 'quantity',
        type: 'integer',
        required: true,
        description: `Number of units to purchase.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `Set true to execute the charge; requires the idempotencyKey from get_purchase_quote.`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `The idempotencyKey returned by get_purchase_quote.`,
      },
    ],
  },
  {
    name: 'vercelmcp_buycredits',
    description: `Execute a credits top-up previously quoted by get_purchase_quote. Requires a prior quote and confirm:true`,
    params: [
      {
        name: 'amount',
        type: 'integer',
        required: true,
        description: `Amount to purchase, in whole US dollars (1-1000).`,
      },
      {
        name: 'creditType',
        type: 'string',
        required: true,
        description: `Which credit balance to top up: v0, gateway (AI Gateway), or agent (Vercel Agent).`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `Set true to execute the charge; requires the idempotencyKey from get_purchase_quote.`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `The idempotencyKey returned by get_purchase_quote.`,
      },
    ],
  },
  {
    name: 'vercelmcp_buydomain',
    description: `Execute a single-domain registration previously quoted by get_purchase_quote (product:domain). Requires a prior quote and confirm:true`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain to register, e.g. "example.com".`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'autoRenew',
        type: 'boolean',
        required: false,
        description: `Whether to auto-renew at the end of the term. Defaults to true.`,
      },
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `Set true to execute the purchase; requires the idempotencyKey from get_purchase_quote.`,
      },
      {
        name: 'contact',
        type: 'object',
        required: false,
        description: `Registrant (WHOIS) contact. Not needed for the quote; REQUIRED on confirm. All fields must be provided.`,
      },
      {
        name: 'expectedPrice',
        type: 'number',
        required: false,
        description: `Required on confirm: the purchasePrice (USD) from the quote. The server rejects the order if it no longer matches the live price.`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `The idempotencyKey returned by get_purchase_quote.`,
      },
      {
        name: 'years',
        type: 'integer',
        required: false,
        description: `Registration term in years. Required on confirm — must match the term shown in the quote.`,
      },
    ],
  },
  {
    name: 'vercelmcp_buypro',
    description: `Execute a Vercel Pro upgrade previously quoted by get_purchase_quote. Requires a prior quote and confirm:true`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `Set true to execute the upgrade; requires the idempotencyKey from get_purchase_quote.`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `The idempotencyKey returned by get_purchase_quote.`,
      },
    ],
  },
  {
    name: 'vercelmcp_changetoolbarthreadresolvestatus',
    description: `Change the resolve status of a toolbar thread`,
    params: [
      {
        name: 'resolved',
        type: 'boolean',
        required: true,
        description: `Set to true to mark the thread as resolved, false to mark it as unresolved`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread to update`,
      },
    ],
  },
  {
    name: 'vercelmcp_checkdomainavailabilityandprice',
    description: `Check if domain names are available for purchase and get pricing information`,
    params: [
      {
        name: 'names',
        type: 'array',
        required: true,
        description: `List of domain names to check for availability and pricing`,
      },
    ],
  },
  {
    name: 'vercelmcp_creategitproject',
    description: `Create (or link) a Vercel project from a Git repository`,
    params: [
      {
        name: 'repo',
        type: 'string',
        required: true,
        description: `Repository as "owner/name", or a repository URL such as https://github.com/owner/name.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'deploy',
        type: 'boolean',
        required: false,
        description: `Whether to create a preview deployment from the linked repository's production branch.`,
      },
      {
        name: 'projectName',
        type: 'string',
        required: false,
        description: `Vercel project to create or reuse. Defaults to the lowercased repository name.`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Git provider to link. Inferred from the repository URL; defaults to "github".`,
      },
      {
        name: 'rootDirectory',
        type: 'string',
        required: false,
        description: `Root-relative directory to build in a monorepo. Only applied when creating the project.`,
      },
    ],
  },
  {
    name: 'vercelmcp_deploytovercel',
    description: `Deploy the current project to Vercel`,
    params: [],
  },
  {
    name: 'vercelmcp_edittoolbarmessage',
    description: `Edit an existing message in a toolbar thread`,
    params: [
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `The updated message content in Markdown format`,
      },
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The ID of the message to edit`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread containing the message`,
      },
    ],
  },
  {
    name: 'vercelmcp_getaccesstovercelurl',
    description: `Creates a temporary shareable link that bypasses authentication for a Vercel deployment URL`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The Vercel deployment URL to create a temporary shareable access link for`,
      },
    ],
  },
  {
    name: 'vercelmcp_getagentrun',
    description: `Get details for a single Agent Run`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'runId',
        type: 'string',
        required: true,
        description: `The Agent Run ID to inspect.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Agent run environment, usually "production" or "preview". Defaults to "production".`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration. Must be used with to.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `Preset time range. Ignored when both from and to are provided.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration, or "now". Must be used with from.`,
      },
    ],
  },
  {
    name: 'vercelmcp_getagentruntrace',
    description: `Get the execution trace for a single Agent Run`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'runId',
        type: 'string',
        required: true,
        description: `The Agent Run ID to inspect.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Agent run environment, usually "production" or "preview". Defaults to "production".`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration. Must be used with to.`,
      },
      {
        name: 'maxFieldLength',
        type: 'number',
        required: false,
        description: `Maximum length for individual string fields in the returned trace. Defaults to 8000; use 0 to disable truncation.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `Preset time range. Ignored when both from and to are provided.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration, or "now". Must be used with from.`,
      },
    ],
  },
  {
    name: 'vercelmcp_getdeployment',
    description: `Get a specific deployment by ID or URL`,
    params: [
      {
        name: 'idOrUrl',
        type: 'string',
        required: true,
        description: `The deployment ID or URL to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the deployment`,
      },
    ],
  },
  {
    name: 'vercelmcp_getdeploymentbuildlogs',
    description: `Get the build logs of a deployment by deployment ID or URL`,
    params: [
      {
        name: 'idOrUrl',
        type: 'string',
        required: true,
        description: `The deployment ID or URL whose build logs to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the deployment`,
      },
    ],
  },
  {
    name: 'vercelmcp_getdomainorder',
    description: `Get the status of a domain purchase order returned by buy_domain, to confirm whether the registration completed`,
    params: [
      {
        name: 'orderId',
        type: 'string',
        required: true,
        description: `The orderId returned by buy_domain.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: false,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
    ],
  },
  {
    name: 'vercelmcp_getproject',
    description: `Get a specific project in Vercel`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the project`,
      },
    ],
  },
  {
    name: 'vercelmcp_getprojectdeploymentprotection',
    description: `Get the effective password protection, Vercel Authentication, and Trusted IP settings for a Vercel project`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
    ],
  },
  {
    name: 'vercelmcp_getpurchasequote',
    description: `Get a signed price quote for a Vercel Pro upgrade, credits top-up, add-on, or domain purchase, before executing it`,
    params: [
      { name: 'product', type: 'string', required: true, description: `Which purchase to quote.` },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'amount',
        type: 'integer',
        required: false,
        description: `Required for product:credits — amount in whole US dollars (1-1000).`,
      },
      {
        name: 'autoRenew',
        type: 'boolean',
        required: false,
        description: `For product:domain — whether to auto-renew at term end. Defaults to true.`,
      },
      {
        name: 'creditType',
        type: 'string',
        required: false,
        description: `Required for product:credits — which credit balance to top up.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Required for product:domain — the domain to register.`,
      },
      {
        name: 'productAlias',
        type: 'string',
        required: false,
        description: `Required for product:addon — the add-on to quote. Only "siem" is available today.`,
      },
      {
        name: 'quantity',
        type: 'integer',
        required: false,
        description: `Required for product:addon — number of units.`,
      },
      {
        name: 'years',
        type: 'integer',
        required: false,
        description: `For product:domain — registration term in years (defaults to the TLD minimum).`,
      },
    ],
  },
  {
    name: 'vercelmcp_getruntimeerrors',
    description: `Get grouped runtime error clusters for a project (error name, occurrence count, affected routes, sample messages, first/last seen)`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'routes',
        type: 'string',
        required: false,
        description: `Comma-separated route paths to filter by.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Start of the window as an ISO date or relative lookback from now. Defaults to 24h ago; max lookback is 7d.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `Optional end of the window as an ISO date, relative lookback, or "now".`,
      },
    ],
  },
  {
    name: 'vercelmcp_getruntimelogs',
    description: `Get runtime logs for a project or deployment`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project whose runtime logs to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the project`,
      },
      {
        name: 'deploymentId',
        type: 'string',
        required: false,
        description: `Optional deployment ID to filter runtime logs to a specific deployment`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of log entries to return`,
      },
    ],
  },
  {
    name: 'vercelmcp_gettoolbarthread',
    description: `Get a specific toolbar thread by ID`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread to retrieve`,
      },
    ],
  },
  {
    name: 'vercelmcp_getwebanalytics',
    description: `Query Web Analytics visits or custom events for a project, as a total count or aggregated by dimension`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'by',
        type: 'array',
        required: false,
        description: `One or two dimensions for aggregate mode (e.g. day, country, deviceType, requestPath).`,
      },
      {
        name: 'dataset',
        type: 'string',
        required: false,
        description: `Data to query: visits for automatically tracked pageviews, or events for custom events sent with track(). Defaults to visits.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `OData filter expression, for example requestPath eq '/pricing' and country eq 'US'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum distinct results in aggregate mode. Remaining values are grouped into Others. Defaults to 10.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Count returns one total. Aggregate returns rows grouped by one or two by dimensions and requires since, until, and by. Defaults to count.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Start of the date range as a date string, ISO 8601 timestamp, or Unix timestamp in milliseconds. Since and until must be provided together.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: false,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `End of the date range as a date string, ISO 8601 timestamp, or Unix timestamp in milliseconds. Since and until must be provided together.`,
      },
    ],
  },
  {
    name: 'vercelmcp_importclaudedesignfromurl',
    description: `Import a design into Vercel from a publicly fetchable URL`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team to import the design into`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The publicly fetchable URL of the design to import`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project to associate the design with (optional)`,
      },
    ],
  },
  {
    name: 'vercelmcp_listagentrunprojects',
    description: `List projects that have Agent Runs, with counts`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Agent run environment, usually "production" or "preview". Defaults to "production".`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration. Must be used with to.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `Preset time range. Ignored when both from and to are provided.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration, or "now". Must be used with from.`,
      },
    ],
  },
  {
    name: 'vercelmcp_listagentruns',
    description: `List Agent Runs for a project`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Agent run environment, usually "production" or "preview". Defaults to "production".`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration. Must be used with to.`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `1-based page number. Defaults to 1.`,
      },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Number of runs per page. The dashboard endpoint caps this at 100.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `Preset time range. Ignored when both from and to are provided.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Server-side title search for Agent Runs.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration, or "now". Must be used with from.`,
      },
    ],
  },
  {
    name: 'vercelmcp_listdeployments',
    description: `List all deployments for a project`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project whose deployments to list`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the project`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of deployments to return`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter deployments by state (e.g. READY, ERROR, BUILDING, QUEUED, CANCELED)`,
      },
    ],
  },
  {
    name: 'vercelmcp_listprojects',
    description: `List all Vercel projects for a user (with a max of 50)`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team whose projects to list`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of projects to return (max 50)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query to filter projects by name`,
      },
    ],
  },
  {
    name: 'vercelmcp_listteams',
    description: `List the user's teams`,
    params: [],
  },
  {
    name: 'vercelmcp_listtoolbarthreads',
    description: `List Vercel toolbar comment threads for a team`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team whose toolbar threads to list`,
      },
      {
        name: 'deploymentId',
        type: 'string',
        required: false,
        description: `Filter threads by deployment ID (optional)`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `Filter threads by project ID (optional)`,
      },
    ],
  },
  {
    name: 'vercelmcp_replytotoolbarthread',
    description: `Add a reply message to an existing toolbar thread`,
    params: [
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `The reply message content in Markdown format`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread to reply to`,
      },
    ],
  },
  {
    name: 'vercelmcp_searchverceldocumentation',
    description: `Search the Vercel documentation for information about a topic`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `The topic or query to search for in the Vercel documentation`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of documentation results to return`,
      },
    ],
  },
  {
    name: 'vercelmcp_updateprojectdeploymentprotection',
    description: `Enable or disable password protection, Vercel Authentication, and Trusted IPs for a Vercel project`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The project ID to scope the request to. Alternatively the project slug can be used.`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The team ID to scope the request to. Alternatively the team slug can be used.`,
      },
      {
        name: 'passwordProtection',
        type: 'string',
        required: false,
        description: `Enable or disable password protection. Omit to preserve the current setting.`,
      },
      {
        name: 'ssoProtection',
        type: 'string',
        required: false,
        description: `Enable or disable Vercel Authentication. Omit to preserve the current setting.`,
      },
      {
        name: 'trustedIps',
        type: 'string',
        required: false,
        description: `Enable or disable Trusted IPs. Omit to preserve the current setting.`,
      },
    ],
  },
  {
    name: 'vercelmcp_webfetchvercelurl',
    description: `Fetches a Vercel deployment URL and returns the response body`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The Vercel deployment URL to fetch`,
      },
    ],
  },
]
