import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cloudflare_access_application_create',
    description: `Create a new Zero Trust Access application to protect a domain behind Cloudflare Access authentication policies.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Cloudflare account`,
      },
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain (and optional path) this application protects`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the application`,
      },
      {
        name: 'session_duration',
        type: 'string',
        required: false,
        description: `How long an authenticated session stays valid before re-authentication is required`,
      },
      { name: 'type', type: 'string', required: false, description: `Type of Access application` },
    ],
  },
  {
    name: 'cloudflare_access_application_delete',
    description: `Permanently delete a Zero Trust Access application and its policies. The protected domain becomes unprotected by Access. This cannot be undone.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Cloudflare account`,
      },
      {
        name: 'app_id',
        type: 'string',
        required: true,
        description: `The ID of the Access application to delete`,
      },
    ],
  },
  {
    name: 'cloudflare_access_application_get',
    description: `Retrieve details of a single Zero Trust Access application by ID. Use List Access Applications to find an application ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Cloudflare account`,
      },
      {
        name: 'app_id',
        type: 'string',
        required: true,
        description: `The ID of the Access application to retrieve`,
      },
    ],
  },
  {
    name: 'cloudflare_access_application_list',
    description: `List all Zero Trust Access applications configured in a Cloudflare account, with optional filtering by name or domain.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the Cloudflare account`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Filter applications by domain`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter applications by name` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'cloudflare_account_list',
    description: `List all Cloudflare accounts the current authenticated user has access to, with optional filtering by account name.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter accounts by name (partial match supported)`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'cloudflare_dns_record_create',
    description: `Create a new DNS record in a Cloudflare zone.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `DNS record content/value` },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `DNS record name (the subdomain or root domain)`,
      },
      { name: 'type', type: 'string', required: true, description: `DNS record type` },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to create the record in`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority for MX or SRV records`,
      },
      {
        name: 'proxied',
        type: 'boolean',
        required: false,
        description: `Whether the record is proxied through Cloudflare (orange-clouded)`,
      },
      {
        name: 'ttl',
        type: 'integer',
        required: false,
        description: `Time to live in seconds. 1 means automatic.`,
      },
    ],
  },
  {
    name: 'cloudflare_dns_record_delete',
    description: `Permanently delete a DNS record from a Cloudflare zone. This cannot be undone.`,
    params: [
      {
        name: 'dns_record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS record to delete`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone the record belongs to`,
      },
    ],
  },
  {
    name: 'cloudflare_dns_record_get',
    description: `Retrieve details of a single DNS record by ID. Use List DNS Records to find a record ID.`,
    params: [
      {
        name: 'dns_record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS record to retrieve`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone the record belongs to`,
      },
    ],
  },
  {
    name: 'cloudflare_dns_record_list',
    description: `List, search, sort, and filter DNS records for a Cloudflare zone. Supports filtering by record type, name, and content.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to list DNS records from`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Filter DNS records by content/value`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction (asc or desc)`,
      },
      {
        name: 'match',
        type: 'string',
        required: false,
        description: `Whether to match all or any filter conditions`,
      },
      { name: 'name', type: 'string', required: false, description: `Filter DNS records by name` },
      { name: 'order', type: 'string', required: false, description: `Field to order results by` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default 20, max 100)`,
      },
      { name: 'type', type: 'string', required: false, description: `Filter DNS records by type` },
    ],
  },
  {
    name: 'cloudflare_dns_record_update',
    description: `Replace an existing DNS record's type, name, and content. This is a full update — provide all fields you want the record to have, not just the ones changing.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `DNS record content/value` },
      {
        name: 'dns_record_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS record to update`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `DNS record name (the subdomain or root domain)`,
      },
      { name: 'type', type: 'string', required: true, description: `DNS record type` },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone the record belongs to`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority for MX or SRV records`,
      },
      {
        name: 'proxied',
        type: 'boolean',
        required: false,
        description: `Whether the record is proxied through Cloudflare (orange-clouded)`,
      },
      {
        name: 'ttl',
        type: 'integer',
        required: false,
        description: `Time to live in seconds. 1 means automatic.`,
      },
    ],
  },
  {
    name: 'cloudflare_firewall_rule_create',
    description: `Create a firewall rule on a Cloudflare zone that takes an action (block, challenge, allow, log, etc.) on requests matching a filter expression.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to take when a request matches the expression`,
      },
      {
        name: 'expression',
        type: 'string',
        required: true,
        description: `Cloudflare filter expression that requests must match to trigger this rule`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to create the rule in`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the firewall rule`,
      },
      {
        name: 'paused',
        type: 'boolean',
        required: false,
        description: `Whether the rule is paused (inactive) on creation`,
      },
    ],
  },
  {
    name: 'cloudflare_firewall_rule_list',
    description: `List the firewall rules configured on a Cloudflare zone, including their filter expressions and actions.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to list firewall rules from`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default 20, max 100)`,
      },
    ],
  },
  {
    name: 'cloudflare_load_balancer_create',
    description: `Create a new Load Balancer on a Cloudflare zone, distributing traffic for a hostname across one or more origin pools.`,
    params: [
      {
        name: 'default_pools',
        type: 'array',
        required: true,
        description: `Ordered list of pool IDs ordinarily used to load balance traffic`,
      },
      {
        name: 'fallback_pool',
        type: 'string',
        required: true,
        description: `Pool ID used when all default_pools are unhealthy`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The DNS hostname this load balancer will respond on`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to create the load balancer in`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of this load balancer`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the load balancer is enabled`,
      },
      {
        name: 'proxied',
        type: 'boolean',
        required: false,
        description: `Whether the hostname should be proxied through Cloudflare`,
      },
      {
        name: 'session_affinity',
        type: 'string',
        required: false,
        description: `Session affinity method used to bind a client to a origin`,
      },
      {
        name: 'steering_policy',
        type: 'string',
        required: false,
        description: `How traffic is steered across default_pools`,
      },
      {
        name: 'ttl',
        type: 'integer',
        required: false,
        description: `DNS TTL in seconds for this load balancer's hostname`,
      },
    ],
  },
  {
    name: 'cloudflare_load_balancer_list',
    description: `List the Load Balancers configured on a Cloudflare zone.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to list load balancers from`,
      },
    ],
  },
  {
    name: 'cloudflare_page_rule_create',
    description: `Create a page rule on a Cloudflare zone that applies one or more settings to requests matching a URL pattern.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `JSON array of {id, value} action objects to apply, e.g. cache_level, forwarding_url, always_use_https`,
      },
      {
        name: 'url_pattern',
        type: 'string',
        required: true,
        description: `URL pattern that requests must match to trigger this rule`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to create the page rule in`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority order when multiple page rules match the same request. Higher numbers take precedence.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Whether the page rule is active immediately`,
      },
    ],
  },
  {
    name: 'cloudflare_page_rule_list',
    description: `List the page rules configured on a Cloudflare zone, including their URL targets, actions, and status.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to list page rules from`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter page rules by status`,
      },
    ],
  },
  {
    name: 'cloudflare_pages_project_list',
    description: `List Cloudflare Pages projects in an account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Cloudflare account identifier`,
      },
    ],
  },
  {
    name: 'cloudflare_ruleset_entrypoint_update',
    description: `Deploy or update the active ruleset for a phase (e.g. http_request_firewall_custom for WAF custom rules) on a Cloudflare zone. This replaces the entire set of rules for that phase, so include every rule you want active, not just the ones you're changing.`,
    params: [
      {
        name: 'phase_name',
        type: 'string',
        required: true,
        description: `The ruleset phase to deploy to`,
      },
      {
        name: 'rules',
        type: 'array',
        required: true,
        description: `Array of rule objects to make up this phase's ruleset`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone whose ruleset phase to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for this ruleset`,
      },
    ],
  },
  {
    name: 'cloudflare_user_get',
    description: `Retrieve the profile details of the currently authenticated Cloudflare user, including name, email, and account memberships.`,
    params: [],
  },
  {
    name: 'cloudflare_worker_route_create',
    description: `Create a Worker route on a Cloudflare zone that dispatches matching requests to a Worker script. Use List Worker Scripts to find a script name first.`,
    params: [
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `URL pattern that triggers this route`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to create the route in`,
      },
      {
        name: 'script',
        type: 'string',
        required: false,
        description: `Name of the Worker script to dispatch matching requests to`,
      },
    ],
  },
  {
    name: 'cloudflare_worker_route_list',
    description: `List the Worker routes configured on a Cloudflare zone, showing which URL patterns dispatch to which Worker script.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to list routes from`,
      },
    ],
  },
  {
    name: 'cloudflare_worker_script_delete',
    description: `Permanently delete a Cloudflare Worker script by name. Any routes or triggers bound to it stop working. This cannot be undone.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Cloudflare account identifier`,
      },
      {
        name: 'script_name',
        type: 'string',
        required: true,
        description: `The name of the Worker script to delete`,
      },
    ],
  },
  {
    name: 'cloudflare_worker_script_get',
    description: `Download the raw JavaScript source of a Cloudflare Worker script by name. Use List Worker Scripts to find a script name.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Cloudflare account identifier`,
      },
      {
        name: 'script_name',
        type: 'string',
        required: true,
        description: `The name of the Worker script to retrieve`,
      },
    ],
  },
  {
    name: 'cloudflare_worker_script_list',
    description: `Fetch a list of all uploaded Worker scripts in a Cloudflare account. Returns script names, creation dates, and modification timestamps.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Cloudflare account identifier`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_analytics_dashboard',
    description: `Retrieve aggregate traffic analytics for a Cloudflare zone: requests, bandwidth, threats, and cache statistics over a time window.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to fetch analytics for`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Start of the analytics window (ISO 8601). Defaults to 6 hours ago.`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `End of the analytics window (ISO 8601). Defaults to now.`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_create',
    description: `Add a new domain (zone) to a Cloudflare account. After creation, update your domain's name servers to the ones Cloudflare returns to activate it.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Cloudflare account to create the zone under`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to add as a zone`,
      },
      {
        name: 'jump_start',
        type: 'boolean',
        required: false,
        description: `Automatically scan for existing DNS records when the zone is created`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Whether Cloudflare hosts the full zone or only a partial (CNAME setup) zone`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_get',
    description: `Retrieve details of a single Cloudflare zone by ID, including status, name servers, and plan information. Use List Zones to find a zone ID.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone to retrieve`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_list',
    description: `List, search, sort, and filter all zones in the Cloudflare account. Returns zone details including status, name servers, and plan information.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction (asc or desc)`,
      },
      {
        name: 'match',
        type: 'string',
        required: false,
        description: `Whether to match all or any filter conditions`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter zones by domain name (exact match)`,
      },
      { name: 'order', type: 'string', required: false, description: `Field to order results by` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (default 20, max 50)`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter zones by status` },
    ],
  },
  {
    name: 'cloudflare_zone_purge_cache',
    description: `Purge cached content for a Cloudflare zone. Purge everything, or scope the purge to specific file URLs, cache tags, or hostnames. Provide at most one of files, tags, or hosts when not purging everything.`,
    params: [
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone whose cache to purge`,
      },
      {
        name: 'files',
        type: 'array',
        required: false,
        description: `JSON array of exact file URLs to purge from cache`,
      },
      {
        name: 'hosts',
        type: 'array',
        required: false,
        description: `JSON array of hostnames to purge all cached content for`,
      },
      {
        name: 'purge_everything',
        type: 'boolean',
        required: false,
        description: `Purge all cached content for the zone`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `JSON array of Cache-Tag values to purge`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_setting_get',
    description: `Retrieve the current value of a single zone setting, such as ssl, always_use_https, min_tls_version, security_level, or cache_level.`,
    params: [
      {
        name: 'setting_name',
        type: 'string',
        required: true,
        description: `The name of the setting to retrieve`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone whose setting to retrieve`,
      },
    ],
  },
  {
    name: 'cloudflare_zone_setting_update',
    description: `Change the value of a single zone setting, such as ssl, always_use_https, min_tls_version, security_level, or cache_level. Use Get Zone Setting first to see the current value and accepted options.`,
    params: [
      {
        name: 'setting_name',
        type: 'string',
        required: true,
        description: `The name of the setting to update`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The new value for the setting. Most Cloudflare settings take a string such as 'on', 'off', 'strict', or 'full'.`,
      },
      {
        name: 'zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier for the zone whose setting to update`,
      },
    ],
  },
]
