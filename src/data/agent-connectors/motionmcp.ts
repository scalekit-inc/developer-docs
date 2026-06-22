import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'motionmcp_get_auth_context',
    description: `Retrieve the authenticated user's organizations and workspaces. Returns the workspaceId required by all other Motion tools.`,
    params: [
    ],
  },
  {
    name: 'motionmcp_get_brand_by_domain',
    description: `Resolve a brandId from a website domain or URL. Returns null if no brand is found for the given domain.`,
    params: [
      { name: 'brandUrl', type: 'string', required: true, description: `Brand URL or domain, for example \`https://example.com\`` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID for authorization` },
    ],
  },
  {
    name: 'motionmcp_get_creative_insights',
    description: `Retrieve creative performance insights for your own ads in a workspace. Either datePreset or both startDate and endDate must be provided.`,
    params: [
      { name: 'insightType', type: 'string', required: true, description: `Primary metric to sort/rank creatives by` },
      { name: 'organizationId', type: 'string', required: true, description: `The organization ID from get_auth_context` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID from get_auth_context` },
      { name: 'chartKPIs', type: 'array', required: false, description: `Optional KPI fields to include in chart KPI metrics.` },
      { name: 'creativeAssetIds', type: 'array', required: false, description: `Optional creative asset IDs to narrow results.` },
      { name: 'datePreset', type: 'string', required: false, description: `Predefined date range. Omit if using startDate/endDate.` },
      { name: 'endDate', type: 'string', required: false, description: `Custom end date (YYYY-MM-DD). Requires datePreset=CUSTOM.` },
      { name: 'filters', type: 'array', required: false, description: `Nested filter groups to narrow which creatives are returned. Outer array = AND (all groups must pass); inner array = OR (any filter in a group can match). For text fields (campaignName, adsetName, adName): use "value" (singular) for case-insensitive substring match, or "values" (array) for exact match. For metric fields: set "metric": true and use "value" for thresholds or "values" for ranges. Example: [[{"field":"spend","type":"GREATER_THAN","value":"100","metric":true}],[{"field":"campaignName","type":"includes","value":"Prospecting"}]] returns creatives where spend > 100 AND campaign name contains "Prospecting".` },
      { name: 'groupBy', type: 'string', required: false, description: `How to group ranked rows. Options: 'creative' (default — one row per creative asset), 'adId' (one row per ad — for ad-level optimization, comparing same creative across ad sets, deciding which ad to pause/scale), 'name' (by ad name), 'copy' (by ad body text — 'which copy performs best?'), 'headline' (by headline text), 'landingPage' (by destination URL — 'which landing page converts best?').` },
      { name: 'includeEntityCategoryValues', type: 'boolean', required: false, description: `Include the full taxonomy catalog (all possible values) per glossary category. Default false — only the values applied to each creative are returned. Set true when you need to see all available tags for coverage gap analysis.` },
      { name: 'includeGlossary', type: 'boolean', required: false, description: `Include creative taxonomy/glossary tags per creative. Default false to minimize payload. Set true for creative pattern analysis.` },
      { name: 'insightGroups', type: 'array', required: false, description: `Metric groups per creative. Defaults: spendState, performance, motion, click.` },
      { name: 'limit', type: 'integer', required: false, description: `Max number of creatives to return` },
      { name: 'startDate', type: 'string', required: false, description: `Custom start date (YYYY-MM-DD). Requires datePreset=CUSTOM.` },
      { name: 'tableKPIs', type: 'array', required: false, description: `Optional KPI fields to include in table KPI metrics.` },
      { name: 'withAggregatedInsights', type: 'boolean', required: false, description: `Include account-level aggregated metrics` },
    ],
  },
  {
    name: 'motionmcp_get_creative_summary',
    description: `Fetch a compact AI-generated summary for a specific creative asset in a workspace.`,
    params: [
      { name: 'creativeEntityId', type: 'string', required: true, description: `Mongo ObjectId of the creative entity` },
      { name: 'creativeFormat', type: 'string', required: true, description: `Creative format from the source tool. Pass through the source value; \`unknown\` may fail if no compatible summary prompt exists.` },
      { name: 'creativeOrigin', type: 'string', required: true, description: `Source/origin of the creative` },
      { name: 'organizationId', type: 'string', required: true, description: `The organization ID from get_auth_context` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID from get_auth_context` },
    ],
  },
  {
    name: 'motionmcp_get_creative_transcript',
    description: `Fetch the spoken transcript for a video creative by its entity ID and workspace.`,
    params: [
      { name: 'creativeEntityId', type: 'string', required: true, description: `Mongo ObjectId of the creative entity` },
      { name: 'creativeOrigin', type: 'string', required: true, description: `Source/origin of the creative` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID from get_auth_context` },
      { name: 'creativeFormat', type: 'string', required: false, description: `Creative format (video or image). Transcript data is only available for video creatives; image creatives will return empty transcript data.` },
    ],
  },
  {
    name: 'motionmcp_get_demographic_breakdown',
    description: `Return ad performance broken down by age and gender demographics for a workspace.`,
    params: [
      { name: 'organizationId', type: 'string', required: true, description: `The organization ID from get_auth_context` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID from get_auth_context` },
      { name: 'datePreset', type: 'string', required: false, description: `Predefined date range` },
    ],
  },
  {
    name: 'motionmcp_get_glossary_values',
    description: `Return the workspace's glossary taxonomy — categories and their allowed tag values.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID` },
      { name: 'categoryNames', type: 'array', required: false, description: `Optional list of glossary category internal names` },
      { name: 'customOnly', type: 'boolean', required: false, description: `Return only custom glossary categories` },
      { name: 'includeCreativeIds', type: 'boolean', required: false, description: `Include creative IDs in value buckets` },
    ],
  },
  {
    name: 'motionmcp_get_inspo_brand_context',
    description: `Retrieve strategic brand context for an Inspo brand, including positioning, voice, tone, messaging angles, and customer voice analysis.`,
    params: [
      { name: 'brandId', type: 'string', required: true, description: `The brand ID to get Inspo context for` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID for authorization` },
    ],
  },
  {
    name: 'motionmcp_get_inspo_creatives',
    description: `Retrieve Inspo creatives for one or more brands by brand ID, with optional filters for date range, format, and platform.`,
    params: [
      { name: 'brandIds', type: 'array', required: true, description: `One or more brand IDs to fetch Inspo creatives for` },
      { name: 'launchDate', type: 'string', required: false, description: `Optional launch date window. When omitted, returns creatives regardless of launch date. Available: LAST_7_DAYS, LAST_14_DAYS, LAST_30_DAYS, LAST_90_DAYS.` },
      { name: 'limit', type: 'integer', required: false, description: `Max creatives to return. Defaults to 50. For larger pulls, increase up to 1000.` },
      { name: 'sort', type: 'string', required: false, description: `Sort order by launch date` },
      { name: 'status', type: 'string', required: false, description: `Optional ad status filter` },
      { name: 'withGlossary', type: 'boolean', required: false, description: `Include Motion glossary tags for returned creatives` },
    ],
  },
  {
    name: 'motionmcp_get_reports',
    description: `Return saved reports for a workspace. Omit reportId to list all reports; provide reportId to fetch a specific report with full data.`,
    params: [
      { name: 'organizationId', type: 'string', required: true, description: `The organization ID from get_auth_context` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID from get_auth_context` },
      { name: 'reportId', type: 'string', required: false, description: `Specific report ID. Omit to list all reports.` },
      { name: 'reportTypes', type: 'array', required: false, description: `Filter by report type when listing. Omit to include all types.` },
    ],
  },
  {
    name: 'motionmcp_get_workspace_brand',
    description: `Return the workspace's own brand reference ID for use with brand context and competitor tools.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID for authorization` },
    ],
  },
  {
    name: 'motionmcp_get_workspace_competitors',
    description: `List competitor brands the workspace is tracking, with optional filtering by specific brand IDs.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID for authorization` },
      { name: 'brandIds', type: 'array', required: false, description: `Optional competitor brand IDs to fetch. Resolve IDs first when narrowing to a specific competitor set.` },
    ],
  },
  {
    name: 'motionmcp_search_brands',
    description: `Search for brands by name or domain query. Returns matching brands with optional verbose catalog fields.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query (brand name or domain)` },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace ID for authorization` },
      { name: 'verbose', type: 'boolean', required: false, description: `When true, include the full per-brand catalog (visual formats, top landing pages). Defaults to false for lean discovery responses.` },
    ],
  },
  {
    name: 'motionmcp_submit_feedback',
    description: `Submit feedback about this Motion MCP server to the Motion product team.`,
    params: [
      { name: 'category', type: 'string', required: true, description: `Type of feedback: 'bug' for tool errors or incorrect behavior, 'feature_request' for missing capabilities, 'workflow_friction' for flows that are overly complex.` },
      { name: 'comment', type: 'string', required: true, description: `Concise, actionable description. For bugs: what you did, what happened, what you expected. For feature requests: what is missing and why. For workflow friction: what the user tried and how it could be simpler.` },
      { name: 'intent', type: 'string', required: true, description: `Briefly describe the wider context task, and why this tool was chosen. Omit argument values, PII/secrets. Use English.` },
      { name: 'query', type: 'string', required: false, description: `The user's original question or request that led to this feedback. Include enough context for the Motion team to reproduce the issue — e.g. 'Show me top performing creatives for Q1' or 'Compare my hook rates to competitors'. Omit PII.` },
      { name: 'tags', type: 'array', required: false, description: `Optional tags to categorize feedback (e.g. 'ux', 'performance', 'accuracy', 'missing-data').` },
      { name: 'toolName', type: 'string', required: false, description: `The name of the specific Motion MCP tool this feedback is about.` },
    ],
  },
]
