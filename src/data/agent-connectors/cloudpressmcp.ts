import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'cloudpressmcp_activate_shield',
    description: `Activate Shield (WAF/security) for a Cloudpress site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to activate Shield for.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_check_domain_availability',
    description: `Check if a domain name is available for registration.`,
    params: [{ name: 'domain', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_create_access_list',
    description: `Create an IP access list (allowlist or blocklist) for a Cloudpress site.`,
    params: [
      {
        name: 'ips',
        type: 'array',
        required: true,
        description: `Array of IP addresses or CIDR ranges to include in the list.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the access list.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to create the access list for.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Whether this list allows or blocks the specified IPs.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the access list purpose.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_create_dns_record',
    description: `Create a new DNS record in a zone.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'type', type: 'string', required: true, description: `No description.` },
      { name: 'zoneId', type: 'string', required: true, description: `No description.` },
      { name: 'priority', type: 'integer', required: false, description: `No description.` },
      { name: 'ttl', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_create_dns_zone',
    description: `Create a new DNS zone. Requires dns:write scope.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name for the new DNS zone.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `Client-generated UUID for idempotency. Reuse the same UUID to safely retry without creating duplicate zones.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_create_edge_rule',
    description: `Create a new edge rule for a site.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The action the edge rule performs, e.g. redirect, block, or rewrite.`,
      },
      {
        name: 'conditions',
        type: 'array',
        required: true,
        description: `Array of condition objects that determine when the rule fires.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the edge rule.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site to create the edge rule on.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the edge rule.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the rule is active immediately after creation. Defaults to true.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_create_rate_limit',
    description: `Create a rate limiting rule for a Cloudpress site to throttle or block excessive requests.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to take when the rate limit threshold is exceeded.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the rate limit rule.`,
      },
      {
        name: 'period',
        type: 'integer',
        required: true,
        description: `Time window in seconds over which requests are counted.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to create the rate limit rule for.`,
      },
      {
        name: 'threshold',
        type: 'integer',
        required: true,
        description: `Maximum number of requests allowed within the rate limit period.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description explaining the purpose of this rate limit rule.`,
      },
      {
        name: 'match',
        type: 'object',
        required: false,
        description: `Optional URL/method match criteria to scope the rate limit to specific requests.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_create_waf_custom_rule',
    description: `Create a custom WAF firewall rule for a Cloudpress site with a filter expression and action.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The action to take when the rule expression matches a request.`,
      },
      {
        name: 'expression',
        type: 'string',
        required: true,
        description: `Firewall rule expression that defines which requests this rule matches.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the WAF custom rule.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to create the WAF rule for.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description explaining the purpose of this WAF rule.`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Rule evaluation priority. Lower numbers are evaluated first.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_deactivate_shield',
    description: `Deactivate Shield (WAF/security) for a Cloudpress site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to deactivate Shield for.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_delete_access_list',
    description: `Permanently delete an IP access list from a Cloudpress site.`,
    params: [
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `The unique identifier of the access list to delete.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site that owns the access list.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_delete_dns_record',
    description: `Delete a DNS record.`,
    params: [
      { name: 'recordId', type: 'string', required: true, description: `No description.` },
      { name: 'zoneId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_delete_dns_zone',
    description: `Delete a DNS zone. This action is destructive and cannot be undone. Requires dns:write scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS zone to delete.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `Client-generated UUID for idempotency. Reuse the same UUID to safely retry without triggering multiple deletions.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_delete_edge_rule',
    description: `Permanently delete an edge rule from a site.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The ID of the edge rule to delete.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site that owns the edge rule.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_delete_rate_limit',
    description: `Permanently delete a rate limit rule from a Cloudpress site.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The unique identifier of the rate limit rule to delete.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site that owns the rate limit rule.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_delete_waf_custom_rule',
    description: `Permanently delete a custom WAF rule from a Cloudpress site.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The unique identifier of the WAF custom rule to delete.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site that owns the WAF rule.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_cache_status',
    description: `Get cache status and hit-rate for a site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_cdn_caching',
    description: `Get CDN caching configuration for a site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_cdn_logs',
    description: `Get CDN access logs for a site over an optional date range.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start datetime for the log range in ISO 8601 format.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of log entries per page.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End datetime for the log range in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_cdn_logs_summary',
    description: `Get a summary of CDN logs for a site over an optional date range.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start datetime for the summary range in ISO 8601 format.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End datetime for the summary range in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_cdn_metrics',
    description: `Get CDN performance metrics for a site over an optional date range.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start datetime for the metrics range in ISO 8601 format.`,
      },
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Time granularity for the metrics data.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End datetime for the metrics range in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_cdn_status',
    description: `Get the CDN status for a site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_dns_metrics',
    description: `Get metrics for a DNS zone over an optional date range. Requires dns:read scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS zone.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `Start date for the metrics range in ISO 8601 format (YYYY-MM-DD).`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `End date for the metrics range in ISO 8601 format (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_dns_record',
    description: `Get a single DNS record from a DNS zone. Requires dns:read scope.`,
    params: [
      {
        name: 'dns_zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS zone containing the record.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS record.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_dns_zone',
    description: `Get details for a single DNS zone. Requires dns:read scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS zone.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_domain',
    description: `Get details of a specific domain.`,
    params: [{ name: 'domainId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_get_domain_contact',
    description: `Get a specific domain contact.`,
    params: [{ name: 'contactId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_get_domain_registration',
    description: `Get a specific domain registration.`,
    params: [
      { name: 'registrationId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_get_order',
    description: `Get details of a specific billing order.`,
    params: [
      {
        name: 'orderId',
        type: 'string',
        required: true,
        description: `The ID of the billing order to retrieve.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_origin_logs',
    description: `Get origin server logs for a site over an optional date range.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start datetime for the log range in ISO 8601 format.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of log entries per page.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End datetime for the log range in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_resource_metrics',
    description: `Get resource usage metrics for a site over an optional date range.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start datetime for the metrics range in ISO 8601 format.`,
      },
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Time granularity for the metrics data.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End datetime for the metrics range in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_shield_events',
    description: `Get recent security events detected by Shield.`,
    params: [
      { name: 'siteId', type: 'string', required: true, description: `No description.` },
      { name: 'from', type: 'string', required: false, description: `No description.` },
      { name: 'page', type: 'integer', required: false, description: `No description.` },
      { name: 'per_page', type: 'integer', required: false, description: `No description.` },
      { name: 'to', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_get_shield_metrics',
    description: `Get Shield/WAF performance metrics for a site.`,
    params: [
      { name: 'siteId', type: 'string', required: true, description: `No description.` },
      { name: 'from', type: 'string', required: false, description: `No description.` },
      { name: 'granularity', type: 'string', required: false, description: `No description.` },
      { name: 'to', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_get_shield_status',
    description: `Get the Shield (WAF/security) status for a site.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_get_site',
    description: `Get full details for a single Cloudpress site. Requires sites:read scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Cloudpress site.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_get_subscription',
    description: `Get details of a specific subscription.`,
    params: [
      { name: 'subscriptionId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_get_waf_config',
    description: `Get the WAF configuration for a site.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_list_access_lists',
    description: `List access lists (IP allowlists/blocklists) for a site.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_list_curated_access_lists',
    description: `List Cloudpress-managed curated access lists.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_list_dns_records',
    description: `List all DNS records in a DNS zone. Requires dns:read scope.`,
    params: [
      {
        name: 'dns_zone_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the DNS zone whose records to list.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_list_dns_zones',
    description: `List all DNS zones in the Cloudpress account. Requires dns:read scope.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_list_domain_contacts',
    description: `List domain contacts.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `No description.` },
      { name: 'per_page', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_list_domain_registrations',
    description: `List domain registrations.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `No description.` },
      { name: 'per_page', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_list_domains',
    description: `List all domains in the workspace.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `No description.` },
      { name: 'per_page', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_list_edge_rules',
    description: `List all edge rules configured for a site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site to list edge rules for.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_list_orders',
    description: `List billing orders in the workspace.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number to retrieve (1-based). Defaults to 1.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of orders to return per page. Defaults to 20.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter orders by status. Omit to return orders of all statuses.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_list_rate_limits',
    description: `List rate limit rules for a site.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_list_sites',
    description: `Returns all active sites in the Cloudpress account.`,
    params: [],
  },
  {
    name: 'cloudpressmcp_list_subscriptions',
    description: `List active subscriptions in the workspace.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number to retrieve (1-based). Defaults to 1.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of subscriptions to return per page. Defaults to 20.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_list_waf_custom_rules',
    description: `List custom WAF rules for a site.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_list_waf_managed_rules',
    description: `List managed WAF rules available for a site.`,
    params: [{ name: 'siteId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'cloudpressmcp_purge_cdn_cache',
    description: `Purge the CDN cache for a site. Omit urls to purge the entire cache.`,
    params: [
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `A unique identifier for this purge request, used for idempotency.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site whose CDN cache should be purged.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: false,
        description: `Specific URLs to purge. If omitted, the entire site cache is purged.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_rename_site',
    description: `Rename a Cloudpress site's display name. Requires sites:write scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Cloudpress site to rename.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The new display name for the site.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `Client-generated UUID for idempotency. Reuse the same UUID to safely retry without duplicate operations.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_restart_site',
    description: `Asynchronously restart a Cloudpress site's container. Requires sites:write scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Cloudpress site to restart.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `Client-generated UUID for idempotency. Reuse the same UUID to safely retry without triggering multiple restarts.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_search_domains',
    description: `Search for domain names matching a keyword.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search keyword to find matching domain names.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for paginated results.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'tlds',
        type: 'array',
        required: false,
        description: `Filter results by specific top-level domains (e.g. ["com", "net"]).`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_suggest_domains',
    description: `Get domain name suggestions based on a keyword.`,
    params: [
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The keyword to base domain name suggestions on.`,
      },
      {
        name: 'tlds',
        type: 'array',
        required: false,
        description: `Filter suggestions by specific top-level domains (e.g. ["com", "net"]).`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_toggle_edge_rule',
    description: `Enable or disable an edge rule without deleting it.`,
    params: [
      {
        name: 'enabled',
        type: 'boolean',
        required: true,
        description: `Set to true to enable the rule or false to disable it.`,
      },
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The ID of the edge rule to enable or disable.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site that owns the edge rule.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_access_list',
    description: `Update an existing IP access list for a Cloudpress site. Only provided fields are changed.`,
    params: [
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `The unique identifier of the access list to update.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site that owns the access list.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the access list.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the access list is active.`,
      },
      {
        name: 'ips',
        type: 'array',
        required: false,
        description: `Updated array of IP addresses or CIDR ranges for the list.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated human-readable name for the access list.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_bot_detection',
    description: `Update bot detection settings for a Cloudpress site, including enabling/disabling detection and the enforcement mode.`,
    params: [
      {
        name: 'enabled',
        type: 'boolean',
        required: true,
        description: `Whether bot detection is enabled for the site.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to update bot detection settings for.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `The enforcement mode for detected bots: block, challenge, or log.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_cdn_caching',
    description: `Update CDN caching configuration for a site.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site to update CDN caching settings for.`,
      },
      {
        name: 'browser_cache_ttl',
        type: 'integer',
        required: false,
        description: `Browser cache TTL in seconds. Omit to keep the current setting.`,
      },
      {
        name: 'cache_level',
        type: 'string',
        required: false,
        description: `Cache aggressiveness level: bypass, basic, or aggressive. Omit to keep the current setting.`,
      },
      {
        name: 'edge_cache_ttl',
        type: 'integer',
        required: false,
        description: `Edge cache TTL in seconds. Omit to keep the current setting.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_curated_access_list',
    description: `Enable or disable a Cloudpress-managed curated access list for a site.`,
    params: [
      {
        name: 'enabled',
        type: 'boolean',
        required: true,
        description: `Whether to enable or disable this curated access list for the site.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `The unique identifier of the Cloudpress-managed curated access list.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to update the curated access list for.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_dns_record',
    description: `Update an existing DNS record.`,
    params: [
      { name: 'recordId', type: 'string', required: true, description: `No description.` },
      { name: 'zoneId', type: 'string', required: true, description: `No description.` },
      { name: 'content', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'priority', type: 'integer', required: false, description: `No description.` },
      { name: 'ttl', type: 'integer', required: false, description: `No description.` },
      { name: 'type', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'cloudpressmcp_update_edge_rule',
    description: `Update an existing edge rule for a site.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The ID of the edge rule to update.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the site that owns the edge rule.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Updated action for the rule. Omit to keep the current action.`,
      },
      {
        name: 'conditions',
        type: 'array',
        required: false,
        description: `Updated conditions array. Omit to keep the current conditions.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the rule. Omit to keep the current description.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Updated enabled state. Omit to keep the current state.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the rule. Omit to keep the current name.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_rate_limit',
    description: `Update an existing rate limit rule for a Cloudpress site. Only provided fields are changed.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The unique identifier of the rate limit rule to update.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site that owns the rate limit rule.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Updated action to take when threshold is exceeded.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the rate limit rule is active.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated human-readable name for the rate limit rule.`,
      },
      {
        name: 'period',
        type: 'integer',
        required: false,
        description: `Updated time window in seconds for request counting.`,
      },
      {
        name: 'threshold',
        type: 'integer',
        required: false,
        description: `Updated maximum number of requests allowed within the period.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_shield',
    description: `Update Shield configuration for a Cloudpress site, including sensitivity level, challenge TTL, and browser integrity check.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site to update Shield configuration for.`,
      },
      {
        name: 'browser_integrity_check',
        type: 'boolean',
        required: false,
        description: `Whether to enable browser integrity checking to block requests from suspicious clients.`,
      },
      {
        name: 'challenge_ttl',
        type: 'integer',
        required: false,
        description: `Duration in seconds that a passed challenge remains valid before re-challenging.`,
      },
      {
        name: 'sensitivity',
        type: 'string',
        required: false,
        description: `The Shield sensitivity level. Controls how aggressively traffic is filtered.`,
      },
    ],
  },
  {
    name: 'cloudpressmcp_update_waf_custom_rule',
    description: `Update an existing custom WAF rule for a Cloudpress site. Only provided fields are changed.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `The unique identifier of the WAF custom rule to update.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the site that owns the WAF rule.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Updated action to take when the rule matches.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the WAF rule.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the rule is active.`,
      },
      {
        name: 'expression',
        type: 'string',
        required: false,
        description: `Updated firewall rule expression.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated human-readable name for the WAF rule.`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Updated rule evaluation priority.`,
      },
    ],
  },
]
