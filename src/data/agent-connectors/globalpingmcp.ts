import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'globalpingmcp_authstatus',
    description: `Check the current authentication status with Globalping. Use this tool to verify if the user is logged in and has a valid OAuth token for executing measurements.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_comparelocations',
    description: `Get a guide on how to run comparison tests using the exact same probes as a previous measurement. Use this tool when you need to benchmark different targets from the same vantage points for a fair comparison.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_dns',
    description: `Resolve DNS records (A, AAAA, MX, etc.) for a domain from global locations. Use this tool to verify DNS propagation, troubleshoot resolution failures, or check if users in different regions are seeing the correct records. Note: Only public endpoints are supported.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `Public domain name to resolve (e.g., 'google.com'). Private domains, localhost, and link-local addresses are not supported.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of probes to use (default: 3, max: 100).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Locations to run the DNS lookup from. Supports Globalping magic field syntax: 'world', country codes like 'US', city names like 'London+UK', ASNs like 'AS13335'.`,
      },
      {
        name: 'queryType',
        type: 'string',
        required: false,
        description: `DNS record type to query (default: A).`,
      },
      {
        name: 'resolver',
        type: 'string',
        required: false,
        description: `Custom DNS resolver IP to use (e.g., '1.1.1.1', '8.8.8.8'). Defaults to the probe's system resolver.`,
      },
      {
        name: 'trace',
        type: 'boolean',
        required: false,
        description: `Trace the full delegation path from root DNS servers (default: false).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_get_more_tools',
    description: `Check for additional Globalping tools whenever your task might benefit from specialized capabilities — even if existing tools could work as a fallback.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `A description of your goal and what kind of tool would help accomplish it.`,
      },
    ],
  },
  {
    name: 'globalpingmcp_getmeasurement',
    description: `Retrieve the full details of a past measurement using its ID. Use this tool to access raw JSON data, individual probe results, or cached measurements when the initial summary from a measurement tool is insufficient.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of a previously run measurement (e.g., '01HT4DGF5ZS7B2M93QP5ZTS3DN').`,
      },
    ],
  },
  {
    name: 'globalpingmcp_help',
    description: `Get a comprehensive guide to the Globalping MCP server. Use this tool to learn about available tools, understand location formatting (magic fields), or see example usage patterns.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_http',
    description: `Send HTTP/HTTPS requests (GET, HEAD, or OPTIONS) to a URL from global locations. Use this tool to check website uptime, verify response status codes, analyze timing (TTFB, download), and debug CDN or caching issues. Note: Only public endpoints are supported. Private networks cannot be tested.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `Public domain name or IP address to test (e.g., 'example.com'). Private IPs (RFC1918), localhost, and link-local addresses are not supported.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of probes to use (default: 3, max: 100).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Locations to run the test from. Supports Globalping magic field syntax: 'world', country codes like 'US', city names like 'London+UK', ASNs like 'AS13335'.`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `HTTP method to use (default: GET). Supported: GET, HEAD, OPTIONS.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `URL path component (e.g., '/api/v1/status').`,
      },
      {
        name: 'port',
        type: 'number',
        required: false,
        description: `Port number (default: 443 for HTTPS, 80 for HTTP).`,
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: `Protocol to use: HTTP or HTTPS (default: HTTPS).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Query string to append to the URL (e.g., 'param=value&another=123').`,
      },
    ],
  },
  {
    name: 'globalpingmcp_limits',
    description: `Check current API rate limits and remaining credits for the Globalping account. Use this tool to monitor your usage quota and verify if you can perform additional measurements.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_locations',
    description: `Retrieve the list of available Globalping probe locations. Use this to find specific countries, cities, or ASNs for the 'locations' argument in measurement tools. Avoid using this unless necessary — the location field in measurement tools auto-selects probes intelligently.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_mtr',
    description: `Run an MTR (My Traceroute) diagnostic, which combines Ping and Traceroute. Use this tool to analyze packet loss and latency trends at every hop in the network path over time, helpful for spotting intermittent issues. Note: Only public endpoints are supported. Private networks cannot be tested.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `Public destination hostname or IP address to run the MTR against. Private IPs (RFC1918), localhost, and link-local addresses are not supported.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of probes to use (default: 3, max: 100).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Locations to run the test from. Supports Globalping magic field syntax: 'world', country codes like 'US', city names like 'London+UK', ASNs like 'AS13335'.`,
      },
      {
        name: 'packets',
        type: 'number',
        required: false,
        description: `Number of packets to send to each hop (default: 3).`,
      },
      {
        name: 'port',
        type: 'number',
        required: false,
        description: `Port number for TCP/UDP MTR (default: 80).`,
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: `Protocol to use for MTR (default: ICMP).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_ping',
    description: `Measure network latency, packet loss, and reachability to a target (domain or IP) from globally distributed probes. Use this tool to check if a server is online, debug connection issues, or assess global performance. Note: Only public endpoints are supported. Private networks cannot be tested.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `Public domain name or IP address to test (e.g., 'google.com', '1.1.1.1'). Private IPs (RFC1918), localhost, and link-local addresses are not supported.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of probes to use (default: 3, max: 100).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Locations to run the test from. Supports Globalping magic field syntax: 'world', country codes like 'US', city names like 'London+UK', ASNs like 'AS13335', or cloud regions like 'Amazon+Germany'. Can also be a previous measurement ID to compare from the same probes.`,
      },
      {
        name: 'packets',
        type: 'number',
        required: false,
        description: `Number of packets to send (default: 3).`,
      },
    ],
  },
  {
    name: 'globalpingmcp_traceroute',
    description: `Trace the network path to a target (domain or IP) from global locations. Use this tool to identify where packets are being dropped, analyze routing paths, or pinpoint latency sources in the network. Note: Only public endpoints are supported. Private networks cannot be tested.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Explain why you are calling this tool and how it fits into the user's overall goal. Used for analytics and intent tracking (15-25 words, third-person perspective).`,
      },
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `Public domain name or IP address to test (e.g., 'cloudflare.com', '1.1.1.1'). Private IPs (RFC1918), localhost, and link-local addresses are not supported.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of probes to use (default: 3, max: 100).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Locations to run the test from. Supports Globalping magic field syntax: 'world', country codes like 'US', city names like 'London+UK', ASNs like 'AS13335', or cloud regions like 'Amazon+Germany'. Can also be a previous measurement ID.`,
      },
      {
        name: 'port',
        type: 'number',
        required: false,
        description: `Port number for TCP/UDP traceroute (default: 80).`,
      },
      {
        name: 'protocol',
        type: 'string',
        required: false,
        description: `Protocol to use for the traceroute (default: ICMP).`,
      },
    ],
  },
]
