import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlesearchconsole_add_site',
    description: `Adds a site (property) to the set of the authorized user's sites in Search Console. The site is added with the caller as owner if verification is already established, otherwise it is added as an unverified site pending verification. Requires the webmasters (full-access) scope. NOTE: this API requires siteUrl as a single percent-encoded path segment — Scalekit does not auto-encode path values, so you must pass siteUrl already percent-encoded (replace ':' with %3A and every '/' with %2F). Returns an empty response on success.`,
    params: [
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URL of the site to add, e.g. 'https://www.example.com/' percent-encoded to 'https%3A%2F%2Fwww.example.com%2F', or 'sc-domain:example.com' percent-encoded to 'sc-domain%3Aexample.com'.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_delete_site',
    description: `Removes a site (property) from the set of the authorized user's Search Console sites. This only removes the site from this user's Search Console account — it does NOT affect the site itself, its verification status for other users, or Google's crawling/indexing of it. Requires the webmasters (full-access) scope. NOTE: this API requires siteUrl as a single percent-encoded path segment — Scalekit does not auto-encode path values, so you must pass siteUrl already percent-encoded (replace ':' with %3A and every '/' with %2F). Returns an empty response on success.`,
    params: [
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property to remove, as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_delete_sitemap',
    description: `Removes a sitemap from the Sitemaps report for a site. This does NOT stop Google from crawling the sitemap or the URLs that were previously discovered through it — it only removes the sitemap entry from Search Console's report. Requires the webmasters (full-access) scope. NOTE: both siteUrl and feedpath must be single percent-encoded path segments — Scalekit does not auto-encode path values, so pass both already percent-encoded (replace ':' with %3A and every '/' with %2F). Returns an empty response on success.`,
    params: [
      {
        name: 'feedpath',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URL of the sitemap to remove, e.g. 'http://www.example.com/sitemap.xml' percent-encoded to 'http%3A%2F%2Fwww.example.com%2Fsitemap.xml'. Get the raw value from the List Sitemaps tool's \`path\` field, then percent-encode it the same way as siteUrl.`,
      },
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_get_site',
    description: `Retrieves the caller's permission level (SITE_OWNER, SITE_FULL_USER, SITE_RESTRICTED_USER, or SITE_UNVERIFIED_USER) for one specific Search Console property. Requires the webmasters or webmasters.readonly scope. NOTE: this API requires siteUrl as a single percent-encoded path segment — Scalekit does not auto-encode path values, so you must pass siteUrl already percent-encoded (replace ':' with %3A and every '/' with %2F).`,
    params: [
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_get_sitemap',
    description: `Retrieves information about one specific sitemap submitted for a site — its type, whether it is a sitemap index, processing status (pending/downloaded), and error/warning counts. Requires the webmasters or webmasters.readonly scope. NOTE: both siteUrl and feedpath must be single percent-encoded path segments — Scalekit does not auto-encode path values, so pass both already percent-encoded (replace ':' with %3A and every '/' with %2F).`,
    params: [
      {
        name: 'feedpath',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URL of the sitemap, e.g. 'http://www.example.com/sitemap.xml' percent-encoded to 'http%3A%2F%2Fwww.example.com%2Fsitemap.xml'. Get the raw value from the List Sitemaps tool's \`path\` field, then percent-encode it the same way as siteUrl.`,
      },
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_inspect_url',
    description: `Runs a Google index inspection for a single URL and reports its Google Search index status — whether and when it was last crawled and indexed, the canonical URL Google selected, mobile-usability/rich-result summary info, and any indexing issues. This is the API equivalent of the URL Inspection tool in the Search Console UI. The inspectionUrl must belong to the property identified by siteUrl. Requires the webmasters or webmasters.readonly scope.`,
    params: [
      {
        name: 'inspectionUrl',
        type: 'string',
        required: true,
        description: `Required. The URL to inspect. Must be under the property specified in siteUrl.`,
      },
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The URL of the property as defined in Search Console that owns inspectionUrl. Examples: \`https://www.example.com/\` for a URL-prefix property, or \`sc-domain:example.com\` for a Domain property.`,
      },
      {
        name: 'languageCode',
        type: 'string',
        required: false,
        description: `Optional. An IETF BCP-47 language code for translated issue messages, e.g. "en-US" or "de-CH". Defaults to "en-US" if not specified.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_list_sitemaps',
    description: `Lists the sitemap entries submitted for a site, or the entries included in a specific sitemap index file when sitemapIndex is provided. Returns each sitemap's path, type, processing status, and error/warning counts. Requires the webmasters or webmasters.readonly scope. NOTE: siteUrl must be a single percent-encoded path segment — Scalekit does not auto-encode path values, so pass siteUrl already percent-encoded (replace ':' with %3A and every '/' with %2F). sitemapIndex, in contrast, is a query parameter and should be passed as a normal (non-encoded) URL — Scalekit encodes query values automatically.`,
    params: [
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
      {
        name: 'sitemapIndex',
        type: 'string',
        required: false,
        description: `Optional. A URL of a site's sitemap index file, e.g. 'http://www.example.com/sitemapindex.xml'. When set, lists the sitemaps contained in that index instead of the site's top-level submitted sitemaps. Pass the plain (not percent-encoded) URL — this is a query parameter and is encoded automatically.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_list_sites',
    description: `Lists the user's Search Console sites (properties) along with the caller's permission level for each — SITE_OWNER, SITE_FULL_USER, SITE_RESTRICTED_USER, or SITE_UNVERIFIED_USER. Use this to discover the exact siteUrl values (e.g. \`https://www.example.com/\` or \`sc-domain:example.com\`) needed by every other tool in this connector. Requires the webmasters or webmasters.readonly scope.`,
    params: [],
  },
  {
    name: 'googlesearchconsole_query_search_analytics',
    description: `Queries Google Search performance data (clicks, impressions, CTR, position) for a site, filtered and grouped by the dimensions you define. Returns zero or more rows grouped by the row keys you specify via \`dimensions\`. You must supply a date range (startDate/endDate) of one or more days. When \`DATE\` is one of the group-by dimensions, days without data are omitted from the results. Requires the webmasters or webmasters.readonly scope. NOTE: siteUrl must be a single percent-encoded path segment — Scalekit does not auto-encode path values, so pass siteUrl already percent-encoded (replace ':' with %3A and every '/' with %2F).`,
    params: [
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `Required. End date of the requested date range, in YYYY-MM-DD format, in PST time (UTC-8:00). Must be >= startDate. Inclusive.`,
      },
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Required. Start date of the requested date range, in YYYY-MM-DD format, in PST time (UTC-8:00). Must be <= endDate. Inclusive.`,
      },
      {
        name: 'aggregationType',
        type: 'string',
        required: false,
        description: `Optional; default AUTO. How data is aggregated — AUTO, BY_PROPERTY, or BY_PAGE (BY_NEWS_SHOWCASE_PANEL for News Showcase reporting). If you filter or group by PAGE, you must use AUTO. An invalid combination returns an API error rather than silently changing your request.`,
      },
      {
        name: 'dataState',
        type: 'string',
        required: false,
        description: `Optional. The data freshness to include — FINAL (final data only, the default behavior when omitted), ALL (final + partial/fresh data), or HOURLY_ALL (hourly partial + full data; required when dimensions includes HOUR).`,
      },
      {
        name: 'dimensionFilterGroups',
        type: 'array',
        required: false,
        description: `Optional. Zero or more filter groups to apply to the dimension values, e.g. 'query contains "buy"'. You can filter by a dimension without grouping by it. All filter groups are AND'ed together; filters within a group follow the group's groupType.`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Optional. Zero or more dimensions to group results by — DATE, QUERY, PAGE, COUNTRY, DEVICE, SEARCH_APPEARANCE, or HOUR (HOUR requires dataState=HOURLY_ALL and data is only available for the last 10 days). Results are grouped in the order supplied.`,
      },
      {
        name: 'rowLimit',
        type: 'integer',
        required: false,
        description: `Optional; default 1000. The maximum number of rows to return. Must be from 1 to 25000 (inclusive).`,
      },
      {
        name: 'startRow',
        type: 'integer',
        required: false,
        description: `Optional; default 0. Zero-based index of the first row to return, for paging through results beyond rowLimit.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Optional; default WEB. The Search type to report on — WEB, IMAGE, VIDEO, NEWS, DISCOVER, or GOOGLE_NEWS.`,
      },
    ],
  },
  {
    name: 'googlesearchconsole_submit_sitemap',
    description: `Submits a sitemap for a site so Google will fetch and process it. Requires the webmasters (full-access) scope. NOTE: both siteUrl and feedpath must be single percent-encoded path segments — Scalekit does not auto-encode path values, so pass both already percent-encoded (replace ':' with %3A and every '/' with %2F). Returns an empty response on success.`,
    params: [
      {
        name: 'feedpath',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URL of the sitemap to submit, e.g. 'http://www.example.com/sitemap.xml' percent-encoded to 'http%3A%2F%2Fwww.example.com%2Fsitemap.xml'.`,
      },
      {
        name: 'siteUrl',
        type: 'string',
        required: true,
        description: `Required. The percent-encoded URI of the property as defined in Search Console. Get the raw value from the List Sites tool, then percent-encode it: 'https://www.example.com/' becomes 'https%3A%2F%2Fwww.example.com%2F'; 'sc-domain:example.com' becomes 'sc-domain%3Aexample.com'.`,
      },
    ],
  },
]
