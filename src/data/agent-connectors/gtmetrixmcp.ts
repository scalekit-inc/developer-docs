import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gtmetrixmcp_get_account_status',
    description: `Returns the current GTmetrix account status including plan type, remaining API credits, next refill date, and feature access flags.`,
    params: [],
  },
  {
    name: 'gtmetrixmcp_get_catalog',
    description: `Fetch a GTmetrix lookup catalog in JSON format for resolving names to IDs. Available catalogs: browsers, locations, simulated-devices, throttle-connections, lighthouse-audits.`,
    params: [
      {
        name: 'catalog_id',
        type: 'string',
        required: true,
        description: `The catalog to retrieve.`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_get_guide',
    description: `Fetch a GTmetrix documentation guide in markdown format. Available guides: har-analysis, test-options, report-analysis, general-test-error, lighthouse-error.`,
    params: [
      {
        name: 'guide_id',
        type: 'string',
        required: true,
        description: `The identifier of the guide to fetch.`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_get_report',
    description: `Retrieve the report data using the report ID. Contains GTmetrix scores, Core Web Vitals, top Lighthouse issues, resource summary, and download URLs.`,
    params: [
      {
        name: 'report_id',
        type: 'string',
        required: true,
        description: `The 8-character report ID to retrieve.`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_get_report_har',
    description: `Fetch the raw HAR (net.har) for a completed GTmetrix report and return it inline. Use when direct download of the HAR URL is not possible.`,
    params: [
      {
        name: 'report_slug',
        type: 'string',
        required: true,
        description: `The 8-character report slug identifying the report.`,
      },
      {
        name: 'force',
        type: 'boolean',
        required: false,
        description: `If true, re-fetches the HAR even if already cached. Defaults to false.`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_get_report_history',
    description: `Fetch historical performance data for a GTmetrix page. Returns all reports in reverse chronological order for trend analysis.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of historical reports to return (1–500).`,
      },
      {
        name: 'page_slug',
        type: 'string',
        required: false,
        description: `8-character alphanumeric slug identifying the GTmetrix page whose history to fetch.`,
      },
      {
        name: 'report_slug',
        type: 'string',
        required: false,
        description: `8-character alphanumeric slug identifying a specific report to start history from.`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_get_test',
    description: `Get the current status of a started GTmetrix test. Long-polls server-side until the test completes or budget expires.`,
    params: [
      {
        name: 'test_id',
        type: 'string',
        required: true,
        description: `The 8-character test ID returned by gtmetrix_start_test.`,
      },
      {
        name: 'wait_seconds',
        type: 'integer',
        required: false,
        description: `Number of seconds to wait for the test to complete (0–30). If omitted, returns immediately with current status.`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_list_pages',
    description: `List GTmetrix pages for the authenticated account. A page is a URL and test-settings combination. Returns pages with latest scores, Core Web Vitals, and monitoring status.`,
    params: [
      {
        name: 'browser',
        type: 'string',
        required: false,
        description: `Filter pages by browser name or ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of pages to return (1–2000).`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter pages by test location name or ID.`,
      },
      {
        name: 'monitoring',
        type: 'string',
        required: false,
        description: `Filter pages by monitoring frequency.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Filter pages by URL (partial match supported).`,
      },
    ],
  },
  {
    name: 'gtmetrixmcp_start_test',
    description: `Start a new GTmetrix page performance test for a URL.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The fully qualified URL of the page to test.`,
      },
    ],
  },
]
