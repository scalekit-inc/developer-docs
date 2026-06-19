import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'quicknodemcp_create-endpoint',
    description: `Create a new web3 RPC endpoint for a given blockchain and network under the user's QuickNode account.`,
    params: [
      { name: 'chain', type: 'string', required: true, description: `The blockchain chain (e.g., 'ethereum', 'polygon', 'arbitrum')` },
      { name: 'network', type: 'string', required: true, description: `The specific network within the chain (e.g., 'mainnet', 'testnet')` },
    ],
  },
  {
    name: 'quicknodemcp_create-endpoint-method-rate-limit',
    description: `Create a method-specific rate limit for a QuickNode endpoint, restricting how often specific RPC methods can be called.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'interval', type: 'string', required: true, description: `The time interval for the rate limit` },
      { name: 'methods', type: 'array', required: true, description: `Array of method names to apply the rate limit to. NOTE: method matching is case-insensitive. Method names are lowercased server-side and compared against the lowercased limiter (e.g. a limiter on "eth_getBalance" is stored as "eth_getbalance" and matches incoming "eth_getBalance" traffic). The case you use when entering method names has no effect.` },
      { name: 'rate', type: 'number', required: true, description: `Maximum number of requests allowed within the specified interval` },
    ],
  },
  {
    name: 'quicknodemcp_create-security-rule',
    description: `Create a security rule (IP allowlist, JWT, referrer, domain mask, or token) for a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'type', type: 'string', required: true, description: `The type of security rule` },
      { name: 'domain_mask', type: 'string', required: false, description: `The domain mask (required when type is "domain_mask")` },
      { name: 'ip', type: 'string', required: false, description: `The IP address (required when type is "ip")` },
      { name: 'kid', type: 'string', required: false, description: `The key identifier for JWT (required when type is "jwt")` },
      { name: 'name', type: 'string', required: false, description: `A human-readable name for the JWT config (required when type is "jwt")` },
      { name: 'public_key', type: 'string', required: false, description: `The public key for JWT verification (required when type is "jwt"). Must be a PEM-encoded RSA or EC public key with matching "-----BEGIN [RSA |EC ]PUBLIC KEY-----" / "-----END …-----" headers; malformed keys are rejected before the upstream call.` },
      { name: 'referrer', type: 'string', required: false, description: `The allowed referrer URL (required when type is "referrer")` },
      { name: 'token', type: 'string', required: false, description: `The authentication token (required when type is "token")` },
    ],
  },
  {
    name: 'quicknodemcp_delete-endpoint',
    description: `Archive a QuickNode endpoint by ID, making it inactive.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
    ],
  },
  {
    name: 'quicknodemcp_delete-endpoint-method-rate-limit',
    description: `Permanently delete a method-specific rate limit from a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'method_rate_limit_id', type: 'string', required: true, description: `The unique identifier of the rate limiter to delete. This can be found in the output of the list-endpoint-method-rate-limits tool` },
    ],
  },
  {
    name: 'quicknodemcp_delete-security-rule',
    description: `Permanently delete a security rule from a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'rule_id', type: 'string', required: true, description: `The unique identifier of the security rule to delete` },
      { name: 'type', type: 'string', required: true, description: `The type of security rule` },
    ],
  },
  {
    name: 'quicknodemcp_get-billing',
    description: `Retrieve billing data (invoices or payments) for the user's QuickNode account.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `The type of billing data to retrieve: "invoices" or "payments"` },
    ],
  },
  {
    name: 'quicknodemcp_get-endpoint',
    description: `Retrieve details for a specific QuickNode endpoint by ID.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
    ],
  },
  {
    name: 'quicknodemcp_get-endpoint-log-details',
    description: `Retrieve the full request payload and response for a specific endpoint log entry.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'request_id', type: 'string', required: true, description: `The UUID of the log entry to get detailed information for` },
    ],
  },
  {
    name: 'quicknodemcp_get-endpoint-metrics',
    description: `Retrieve performance metrics (method calls, response status, latency) for a QuickNode endpoint over a given period.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'metric', type: 'string', required: true, description: `The type of metric to retrieve` },
      { name: 'period', type: 'string', required: true, description: `The time period for which the data is to be retrieved` },
      { name: 'percentile', type: 'integer', required: false, description: `Percentile (1-100) for response-time metrics. REQUIRED when metric is "method_response_time_max" (e.g. 50, 95, 99); ignored for other metrics` },
    ],
  },
  {
    name: 'quicknodemcp_get-rpc-usage',
    description: `Retrieve RPC usage data for the account, optionally broken down by endpoint, method, or chain.`,
    params: [
      { name: 'end_time', type: 'string', required: true, description: `The end time of the time range (ISO 8601 format)` },
      { name: 'start_time', type: 'string', required: true, description: `The start time of the time range (ISO 8601 format)` },
      { name: 'breakdown_by', type: 'string', required: false, description: `How to break down usage data: "none" for aggregate, "endpoint" by endpoint, "method" by RPC method, "chain" by chain` },
    ],
  },
  {
    name: 'quicknodemcp_list-chains',
    description: `List all blockchains and networks supported by QuickNode.`,
    params: [
    ],
  },
  {
    name: 'quicknodemcp_list-endpoint-logs',
    description: `List request and response logs for a QuickNode endpoint within a time range.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'from', type: 'string', required: true, description: `The start timestamp for logs (ISO 8601 format)` },
      { name: 'to', type: 'string', required: true, description: `The end timestamp for logs (ISO 8601 format)` },
      { name: 'include_details', type: 'boolean', required: false, description: `Include request/response details in logs` },
      { name: 'limit', type: 'number', required: false, description: `Number of logs to retrieve (1-100, default: 20)` },
      { name: 'next_at', type: 'string', required: false, description: `Pagination token from previous response` },
    ],
  },
  {
    name: 'quicknodemcp_list-endpoint-method-rate-limits',
    description: `List all method-specific rate limits configured for a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
    ],
  },
  {
    name: 'quicknodemcp_list-endpoint-security',
    description: `List all security options and rules configured for a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
    ],
  },
  {
    name: 'quicknodemcp_list-endpoints',
    description: `List all web3 RPC endpoints in the user's QuickNode account with optional pagination.`,
    params: [
      { name: 'limit', type: 'number', required: false, description: `Number of endpoints to retrieve (1-250, default: 50)` },
      { name: 'offset', type: 'number', required: false, description: `Number of endpoints to skip for pagination (default: 0)` },
    ],
  },
  {
    name: 'quicknodemcp_update-endpoint-method-rate-limit',
    description: `Update the rate, interval, or status of an existing method-specific rate limit on a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'method_rate_limit_id', type: 'string', required: true, description: `The unique identifier for the rate limiter` },
      { name: 'methods', type: 'array', required: true, description: `Array of method names to apply the rate limit to. NOTE: method matching is case-insensitive. Method names are lowercased server-side and compared against the lowercased limiter (e.g. a limiter on "eth_getBalance" is stored as "eth_getbalance" and matches incoming "eth_getBalance" traffic). The case you use when entering method names has no effect.` },
      { name: 'rate', type: 'number', required: true, description: `Maximum number of requests allowed within the specified interval` },
      { name: 'status', type: 'string', required: true, description: `If the rate limiter should be enabled or disabled` },
    ],
  },
  {
    name: 'quicknodemcp_update-endpoint-rate-limits',
    description: `Update the general rate limits (requests per second, minute, or day) for a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'rpd', type: 'integer', required: false, description: `Maximum requests per day. Pass -1 to remove an existing user override and fall back to the plan default; if no override exists, the bucket is skipped.` },
      { name: 'rpm', type: 'integer', required: false, description: `Maximum requests per minute. Pass -1 to remove an existing user override and fall back to the plan default; if no override exists, the bucket is skipped.` },
      { name: 'rps', type: 'integer', required: false, description: `Maximum requests per second. Pass -1 to remove an existing user override and fall back to the plan default; if no override exists, the bucket is skipped.` },
    ],
  },
  {
    name: 'quicknodemcp_update-endpoint-security-options',
    description: `Update security settings (CORS, HSTS, IP allowlists, JWT, tokens, referrers, domain masks) for a QuickNode endpoint.`,
    params: [
      { name: 'endpoint_id', type: 'string', required: true, description: `The unique identifier of the Quicknode endpoint` },
      { name: 'cors', type: 'string', required: false, description: `Configures Cross-Origin Resource Sharing (CORS) policies to control how resources can be accessed by external domains` },
      { name: 'domainMasks', type: 'string', required: false, description: `Configures the masking or restriction of specific domains` },
      { name: 'hsts', type: 'string', required: false, description: `The HTTP Strict Transport Security (HSTS)` },
      { name: 'ips', type: 'string', required: false, description: `Specifies IP address-based restrictions or permissions` },
      { name: 'jwts', type: 'string', required: false, description: `Configures JSON Web Tokens (JWTs) for secure authentication and authorization` },
      { name: 'referrers', type: 'string', required: false, description: `The URL or domain that is allowed to access the specific API endpoint` },
      { name: 'tokens', type: 'string', required: false, description: `Controls the token-based authentication mechanism` },
    ],
  },
]
