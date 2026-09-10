import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'pendomcp_accountmetadataschema',
    description: `Return the set of metadata fields available for accounts.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_acquisitiontrend',
    description: `Count new visitors or accounts per period - users whose first-ever interaction with the app (scope='app'), a specific page or feature (scope='page' or 'feature'), or a track event (scope='trackEvent') falls within the analysis window. 'New' means firstTime within the window; this measures acquisition, not retention. The window is the most recent periodCount periods of size periodType (e.g. the last 6 months). Cohorts are returned oldest to newest.

USE FOR: Growth and acquisition questions - e.g. 'how many new accounts did we gain last month?', 'what's our new visitor trend?'.

EXAMPLES:
- How many new accounts did we gain last month?
- What's our new visitor trend over the last 6 months?
- How many new users signed up this quarter?
- Show me account acquisition for this feature over the last 8 weeks

RETURNS:
- scope, entityId, unit, periodType: echoed query parameters
- acquisition: list of {cohortLabel, newCount} per period, sorted oldest to newest
- summary: {totalNew, peakCohort, peakCount}`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application ID to scope the request.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'entityId',
        type: 'string',
        required: false,
        description: `Pendo entity id. Required when scope is 'page', 'feature', or 'trackEvent'; ignored for 'app'.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include anonymous visitors. Defaults to false.`,
      },
      {
        name: 'periodCount',
        type: 'number',
        required: false,
        description: `Number of periods in the analysis window. Defaults to 6. The window may not exceed ~1 year: max 366 for 'day', 52 for 'week', 12 for 'month'.`,
      },
      {
        name: 'periodType',
        type: 'string',
        required: false,
        description: `Period granularity. Defaults to 'month'.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `'app' for app-level acquisition, or 'page', 'feature', or 'trackEvent' for entity-level. Defaults to 'app'.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `Count individual visitors or accounts. Defaults to 'visitor'.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_agentanalyticsconversationanalysis',
    description: `Lists and ranks individual AI agent conversations with per-conversation metrics. Returns one row per conversation with: conversationId, visitorId, accountId, startTime, numRagePrompts, numErrors, and firstPromptContent. Supports filtering to a specific set of conversations and sorting by rage prompt count, error count, or date.

USE FOR: Drilling down from aggregate metrics to individual conversation-level investigation - surfacing which specific conversations are driving a metric such as a high rage-prompt rate. When conversationIds are provided, the list is narrowed to a specific cluster (e.g. conversations associated with a detected issue or a use case).

EXAMPLES:
- Show me the conversations with the most rage prompts for my chat agent
- Which conversations had the most errors this week?
- List the most recent conversations for agent X
- Show me these specific conversations: [id1, id2, id3]

NOT FOR: Aggregate volume metrics for an agent. Diagnosing an issue cluster (explanations, tools invoked, response patterns). Discovering or clustering use cases.

RETURNS:
- [conversations]: one row per conversation with conversationId, visitorId, accountId, startTime, numRagePrompts, numErrors, firstPromptContent.

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID. Used to scope the lookup to the correct agent.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application ID to scope the request.`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'conversationIds',
        type: 'array',
        required: false,
        description: `Optional list of conversation IDs to filter to. When provided, only these conversations are returned - use to scope to a specific cluster of related conversations.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of conversations to return. Range: 1-500. Default: 50.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort conversations by (descending). ragePromptCount: most rage prompts first. errorCount: most errors first. first: most recent conversations first (by conversation start time).`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_agentanalyticsissueanalysis',
    description: `Requires startDate and endDate (YYYY-MM-DD); there is no default range. Returns issue diagnoses, flagged response tool/model usage, and user prompt content for the events of a specific detected issue cluster in AI Agent Analytics. Executes a single aggregation with two parallel spawn branches: (1) agenticConversationEvents filtered by conversationIds - deduplicated visitorIds/accountIds and sampled explanations; (2) agenticEvents - tools/models from flagged response eventIds, and prompt content from issue conversationIds.

USE FOR: Diagnosing a specific detected issue cluster when agentId, conversationIds, and eventIds are already known. Use when the user wants to understand why conversations were flagged, see patterns in user prompts that triggered the issue, or identify which tools and models were involved in the flagged responses.

EXAMPLES:
- What patterns exist among instances of the 'incorrect answers' issue?
- Which tools were called in instances of the 'timeout error' issue?
- Show me what users said in conversations flagged as the 'authentication failure' issue
- Why does the 'formatting problem' issue keep occurring in my agent?

NOT FOR: Discovering or listing issue clusters (this tool diagnoses a cluster whose conversationIds and eventIds are already provided). Aggregate volume metrics for an agent. Topic analysis or use-case clustering of conversations (this tool is scoped to a single detected issue, not to open-ended topic modeling).

RETURNS:
- Four labeled CSV sections:
- [issue_instances]: visitorIds, accountIds - one summary row with deduplicated lists.
- [explanations]: explanation - one row per sampled issue explanation (capped for MCP size).
- [flagged_response_events]: issueToolsUsed, issueModelsUsed - one summary row with deduplicated lists.
- [user_prompts]: content - one row per sampled user prompt message (capped for MCP size).

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID. Used to scope the lookup to the correct agent.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application ID to scope the request.`,
      },
      {
        name: 'conversationIds',
        type: 'array',
        required: true,
        description: `List of conversation IDs belonging to the issue cluster to diagnose.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `Query end date in YYYY-MM-DD format (e.g., '2025-01-31'). Inclusive.`,
      },
      {
        name: 'eventIds',
        type: 'array',
        required: true,
        description: `List of event IDs belonging to the issue cluster to diagnose - the agent response event IDs flagged as instances of this issue.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Query start date in YYYY-MM-DD format (e.g., '2025-01-01'). Inclusive.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_agentanalyticskeymetrics',
    description: `Returns key aggregate metrics for AI agent conversations with period-over-period comparison. Includes: conversations, visitors, accounts, prompts, rage prompt rates (per-prompt and per-conversation), visitorIds, accountIds, and visitor retention. All metrics include previous-period equivalents for trend analysis.

USE FOR: Getting a high-level summary of AI agent usage and engagement. Use when the user asks about overall agent performance, conversation volume, visitor engagement, rage prompt rates, or retention for a specific agent.

EXAMPLES:
- How many conversations has my ABC agent had in the last 30 days?
- What is the rage prompt rate for Acme agent this month?
- Show me key metrics and trends for my chat agent over the past 2 weeks.
- How many unique visitors have used my chat agent recently?

NOT FOR: Use listUseCases for topic/cluster analysis. Use listAiAgentIssues for issue detection. Use listAiAgents to get agent IDs and names first when the user has not specified an agent.

RETURNS:
- Current period: numConversations, numPrompts, numVisitors, numAccounts, numRagePrompts, ragePromptsRate, ragePromptsConversationRate, retention (retentionRate, retained, visitors), visitorIds, and accountIds.
- Previous period (same duration, immediately prior): prevNumConversations, prevNumPrompts, prevNumVisitors, prevNumAccounts, prevNumRagePrompts, prevRagePromptsRate, prevRagePromptsConversationRate, prevRetention.
- Also includes conversationsWithRagePrompts and prevConversationsWithRagePrompts.

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `Required. The AI agent ID to get metrics for (from listAiAgents).`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `Query end date in YYYY-MM-DD format (e.g., '2025-01-31'). Inclusive.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Query start date in YYYY-MM-DD format (e.g., '2025-01-01'). Inclusive.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_agentanalyticstrackedissueanalysis',
    description: `Deep-dives into a single tracked issue in AI Agent Analytics for a specific AI agent, surfacing the visitors and accounts, sampled issue explanations from detected issue clusters, the tools and models the agent invoked, and a sample of the user prompts associated with the tracked issue.

USE FOR: Deep-diving into a specific tracked issue - call directly if agentId is known and conversationIds, eventIds, and trackedIssueId are passed. Use when the user wants to understand what prompts users sent for a tracked problem, which tools and models the agent invoked, or which visitors and accounts are associated with a tracked issue.

EXAMPLES:
- What are users actually saying when they hit the 'incorrect answer' tracked issue?
- Which tools does my agent use when the 'timeout error' tracked issue occurs?
- Who are the visitors affected by this tracked issue?
- Show me sample prompts from this tracked issue.

NOT FOR: Aggregate volume metrics, or diagnosing detected (auto-clustered) issues rather than a specific tracked issue.

RETURNS:
- Four labeled CSV sections:
- [tracked_issue_summary]: visitorIds, accountIds - one summary row with deduplicated lists.
- [explanations]: explanation - one row per sampled issue explanation from detected issue clusters (capped for MCP size).
- [tools_used]: toolsUsed, modelsUsed - one summary row with deduplicated lists.
- [prompt_samples]: content - one row per sampled user prompt message (capped for MCP size).

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID. Used to scope the lookup to the correct agent.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application ID to scope the request.`,
      },
      {
        name: 'conversationIds',
        type: 'array',
        required: true,
        description: `List of conversation IDs for the tracked issue.`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'eventIds',
        type: 'array',
        required: true,
        description: `List of event IDs for the tracked issue (prompt-type events).`,
      },
      { name: 'name', type: 'string', required: true, description: `The tracked issue name.` },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'trackedIssueId',
        type: 'string',
        required: true,
        description: `The tracked issue ID to analyze.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_agentanalyticstrackedusecaseanalysis',
    description: `Deep-dives into a single tracked use case in AI Agent Analytics for a specific AI agent, surfacing the visitors and accounts, the tools and models the agent invoked, sampled explanations, and a sample of the user prompts associated with the tracked use case.

USE FOR: Deep-diving into a specific tracked use case - call directly if agentId is known and conversationIds, eventIds, and trackedUseCaseId are passed. Use when the user wants to understand what prompts users sent for a tracked topic, which tools and models the agent invoked, or which visitors and accounts are associated with a tracked use case.

EXAMPLES:
- What are users actually asking in the 'dashboard help' tracked use case?
- Which tools does my agent use when handling this tracked use case?
- Who are the visitors in this tracked use case?
- Show me sample prompts from this tracked use case.

NOT FOR: Aggregate volume metrics across use cases, or issue diagnosis - this tool deep-dives a single tracked use case.

RETURNS:
- Four labeled CSV sections:
- [tracked_use_case_summary]: visitorIds, accountIds - one summary row with deduplicated lists.
- [explanations]: explanation - one row per sampled explanation (capped for MCP size).
- [tools_used]: toolsUsed, modelsUsed - one summary row with deduplicated lists.
- [prompt_samples]: content - one row per sampled user prompt message (capped for MCP size).

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID. Used to scope the lookup to the correct agent.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application ID to scope the request.`,
      },
      {
        name: 'conversationIds',
        type: 'array',
        required: true,
        description: `List of conversation IDs for the tracked use case.`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'eventIds',
        type: 'array',
        required: true,
        description: `List of event IDs for the tracked use case (prompt-type events).`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'trackedUseCaseId',
        type: 'string',
        required: true,
        description: `The tracked use case ID to filter subrows.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_aggregateentityusage',
    description: `Rank pages, features, or track events against each other by aggregate usage over a date range. This is a cross-entity ranking tool, not a lookup or single-entity analytics tool: it cannot filter by entity name or ID, and its limited result set may omit a requested named entity even when that entity exists. Where entityUsage returns per-visitor rows for a single known entity, this tool returns one row per entity showing how an entire cohort (optionally scoped by a segment) uses every page, feature, or track event. Each row has entityId, entityName, appId, totalEvents, uniqueVisitors, and uniqueAccounts. totalEvents is the activity count for that entity: page VIEWS for pages, CLICKS for features, and event counts for track events - describe it with the term that matches the entity type. Pages and features also add totalErrorClickCount / totalRageClickCount / totalDeadClickCount; pages also add totalUTurnCount and avgTimePerVisitor. Track events have no frustration data. For features, pageId restricts the ranking to features associated with one known page. By default only entities with activity in the window are returned (sort ascending for least-used among used). Set includeUnused=true to also return entities with zero usage (zero-filled rows) - answering 'which entities get no use at all', or, when a segmentPipeline is supplied, 'which entities get no use from that segment'.
COMPARISON MODE: supply compareToDateRange to rank entities by how their usage CHANGED between two periods - dateRange is the current/recent period, compareToDateRange is the earlier baseline. The headline metrics (totalEvents, uniqueVisitors, uniqueAccounts) are returned as current_<m>, prior_<m>, change_<m> (current - prior) and pctChange_<m>; the remaining metrics (frustration counts, avgTimePerVisitor) are returned as change_<m> only to keep rows compact. Sort by a change_ field (ascending = biggest drop-off, descending = biggest growth). This answers 'which pages dropped off the most' in one call - the ranking is done in the aggregation, so no per-entity cross-referencing is needed. includeUnused is ignored when comparing.

USE FOR: Ranking or comparing entities of one type by usage - e.g. top pages by views, most-clicked features, most-clicked features associated with a page, least-used track events. With includeUnused=true, finding entirely unused entities (dead pages/features), optionally scoped to a segment. With compareToDateRange, ranking entities by period-over-period change - biggest drop-offs or biggest gainers.

EXAMPLES:
- Top 5 features by clicks last month
- Which page had the most views in the last 30 days?
- Which features have the most rage clicks this quarter?
- Which features associated with page X were clicked most in the last 30 days?
- Least-used track events over the last week
- Which pages got no views at all in the last 30 days?
- Which features were never used by visitors in segment X last month?
- Which pages in product area X have zero activity from visitors in segment Y?
- Which pages dropped off in usage the most this month versus last month?
- Which features grew the most in the last 30 days compared to the prior 30 days?

NOT FOR: Questions about the views, clicks, visitors, accounts, or other usage of one entity identified by name, such as 'How many people viewed Page X?'. A named entity missing from this ranked output is not evidence that it does not exist.

WORKFLOW: For usage analytics about one named page, feature, or track event, call listCountables to resolve the name to an entity ID, then use entityUsage with that ID. Use aggregateEntityUsage only when the user asks to rank or compare multiple entities.

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD); meta.compareToDateRange when comparing
- rows: one per entity with entityId, entityName, appId, totalEvents (page views / feature clicks / track-event counts), uniqueVisitors, uniqueAccounts (pages/features also: totalErrorClickCount, totalRageClickCount, totalDeadClickCount; pages also: totalUTurnCount, avgTimePerVisitor). With includeUnused=true, unused entities appear with all-zero metrics. In comparison mode the headline metrics (totalEvents, uniqueVisitors, uniqueAccounts) are split into current_<m>, prior_<m>, change_<m> and pctChange_<m>, while the other metrics (frustration counts, avgTimePerVisitor) carry change_<m> only. Prefer change_ for mover/drop-off rankings (pctChange is noisy on small baselines and null when prior is 0).`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: true,
        description: `The kind of entity: 'page', 'feature', or 'trackEvent'.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'compareToDateRange',
        type: 'object',
        required: false,
        description: `Optional baseline period for a period-over-period comparison. When supplied, dateRange is treated as the current/recent period and this as the earlier baseline; results are ranked by how each entity's usage changed (change = current - prior). Same shape as dateRange. A relative baseline (type='relative', lastNDays) is the N days IMMEDIATELY BEFORE dateRange - not the last N days from today - so type='relative' lastNDays=30 on both ranges means 'last 30 days vs the prior 30 days'. Use absolute dates for a fixed baseline such as the same month last year. Omit for a single-period ranking.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the aggregates. Defaults to true.`,
      },
      {
        name: 'includeUnused',
        type: 'boolean',
        required: false,
        description: `When true, additionally include entities with zero usage in the window. Use to find entirely unused entities - e.g. 'which pages got no views'. When a segmentPipeline is supplied, the segment scopes the usage measured, so a zero row means 'unused by that segment' regardless of other visitors. Defaults to false (only entities with activity). Ignored in comparison mode (compareToDateRange already returns every entity active in either period, including drop-offs to zero and arrivals from zero).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of entity rows to return (1-200, default 10).`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: false,
        description: `Optional page ID. Only valid when entityType='feature'; restricts results to features associated with this page.`,
      },
      {
        name: 'productAreaId',
        type: 'string',
        required: false,
        description: `Optional product area ID for the request.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort results by. All entity types support 'totalEvents' (page views / feature clicks / track-event counts), 'uniqueVisitors', 'uniqueAccounts'. Pages and features also support 'totalErrorClickCount', 'totalRageClickCount', 'totalDeadClickCount'. Pages also support 'totalUTurnCount' and 'avgTimePerVisitor'. Defaults to 'totalEvents'.
In comparison mode (compareToDateRange supplied) sort by a prefixed column instead. The headline metrics (totalEvents, uniqueVisitors, uniqueAccounts) accept 'current_<field>', 'prior_<field>', 'change_<field>', or 'pctChange_<field>' (e.g. 'change_totalEvents', 'current_uniqueVisitors'); the other metrics (frustration counts, avgTimePerVisitor) accept 'change_<field>' only (e.g. 'change_totalRageClickCount'). Combine with sortOrder='asc' for biggest drop-offs or 'desc' for biggest gains. PREFER 'change_<field>' (absolute change) for 'biggest mover / drop-off / gainer' questions: it is self-normalising. Use 'pctChange_<field>' only when the user explicitly asks about percentage/rate of change, and be aware it is noisy on low-traffic entities (a 1->5 page reads as +400%) and is null when the prior period had zero activity (new entities). Default to 'change_totalEvents' when comparing.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first - top/most used) or 'asc' (lowest first - least used).`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_aggregateguidemetrics',
    description: `Rank guides by aggregate usage over a date range, returning one row per guide. Where guideMetrics analyses a single known guide in depth, this tool compares an entire cohort's usage across every guide. Each row has entityId, entityName, appId, totalViews, totalCompletions, totalDismissals, uniqueVisitors, uniqueAccounts, and viewsPerUser. totalViews excludes continue-resumed guideSeen events to match the guide-details UI. Deleted guides surface with entityName "(Deleted Guide)".

USE FOR: Cross-guide ranking - e.g. top guides by views, which guides have the most dismissals, least-used guides.

EXAMPLES:
- Top 10 guides by views last month
- Which guides have the most dismissals?
- Show me the least-completed guides over the last 30 days
- Rank guides by unique visitors this quarter
- Top public tooltips by views
- Compare views for these three guides

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- rows: one per guide with entityId, entityName, appId, totalViews, totalCompletions, totalDismissals, uniqueVisitors, uniqueAccounts, viewsPerUser

FILTERING OPTIONS:
- guideIds: restrict the ranking to specific guide IDs
- status: guide state - public, staged, scheduled, draft, pendingReview, inactive
- guideType: guide type - banner, tooltip, lightbox, walkthrough, whatsnew, building-block, group, training, launcher, mobile-lightbox
- activation: launch method - auto (automatic), api, badge, dom (element click), embed, launcher (resource center), page, feature, form, track
- productAreaIds / guideCategoryIds: guides belonging to those product areas or guide categories
- pageIds: guides whose first step is on one of those pages ("sitewide" matches guides with no page)
- appId, accountId, segmentPipeline: scope the underlying guide activity
- Note: any filter other than guideIds resolves guides from their current metadata, so deleted guides drop out of the results.`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Optional Pendo account ID. When provided, results are restricted to activity from that account. Omit to include all accounts.`,
      },
      {
        name: 'activation',
        type: 'string',
        required: false,
        description: `Optional launch-method filter: 'auto' (shown automatically), 'api' (triggered programmatically), 'badge' (badge icon), 'dom' (element click), 'embed' (embedded inline), 'launcher' (guide or resource center), 'page' (page view, mobile), 'feature' (element click, mobile), 'form' (form interaction), or 'track' (track event). Guides can have several dash-separated launch methods; this matches if the guide's launch method contains the value. Omit to include all activation methods.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'guideCategoryIds',
        type: 'array',
        required: false,
        description: `Optional list of guide category group IDs to filter by. When provided, only guides in one of these categories are ranked. Omit to include guides from all categories.`,
      },
      {
        name: 'guideIds',
        type: 'array',
        required: false,
        description: `Optional list of specific guide IDs to rank (e.g., ["abc123","def456"]). Omit to rank every guide with activity.`,
      },
      {
        name: 'guideType',
        type: 'string',
        required: false,
        description: `Optional guide type filter, derived from the guide's attributes: 'banner', 'tooltip', 'lightbox', 'walkthrough' (multi-step), 'whatsnew' (what's-new announcement), 'building-block', 'group' (guide group), 'training', 'launcher' (resource center), or 'mobile-lightbox' (mobile-only lightbox). Omit to include all types.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the aggregates. Defaults to true.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of guide rows to return (1-200, default 10).`,
      },
      {
        name: 'pageIds',
        type: 'array',
        required: false,
        description: `Optional list of page IDs to filter by. When provided, only guides whose first step is on one of these pages are ranked. Use "sitewide" to match guides with no page association. Omit to include all guides regardless of page.`,
      },
      {
        name: 'productAreaIds',
        type: 'array',
        required: false,
        description: `Optional product area IDs for the request.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort results by: 'totalViews' (default), 'totalCompletions', 'totalDismissals', 'uniqueVisitors', 'uniqueAccounts', or 'viewsPerUser'.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first - top/most used) or 'asc' (lowest first - least used).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional guide state filter: 'public' (live), 'staged' (testing), 'scheduled' (public with a start date still in the future), 'draft' (in progress), 'pendingReview' (awaiting review), or 'inactive' (turned off, stored as 'disabled'). As in the UI, 'public' excludes scheduled guides. Omit to include all states.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_appusage',
    description: `Get per-visitor or per-account app usage metrics for a date range. Returns {summary, rows}: summary has total active visitors/accounts, total events across the selected app scope, average daily time on apps, and totals for the four frustration counts (totalErrorClickCount, totalRageClickCount, totalUTurnCount, totalDeadClickCount); rows are per-visitor or per-account breakdowns with daysActive, totalTime and avgTimePerDay (duration objects {seconds, display}), totalEvents, and the same four frustration totals, sorted and limited. When groupBy="account" each row also includes numVisitors - the count of distinct visitors from that account who were active during the window. Optionally include metadata fields for each returned visitor or account with select. Audience can be scoped via an inline segmentPipeline; scope can also be narrowed to a single app via appId, or to a single product area via productAreaId. When productAreaId is supplied the same summary and rows describe headline usage metrics for that product area, measured over its page, feature, and track-event activity.

USE FOR: Per-visitor or per-account app-level usage (events, time, days active) AND top-N ranking over a window across every app, or one app when appId is supplied, or one product area when productAreaId is supplied (headline usage metrics for that area).

EXAMPLES:
- Who uses our apps the most in the last 30 days?
- Top 50 accounts by app usage last quarter
- Which visitors rage-click the most across our apps last week?
- Top 20 visitors by total time in app X last month
- Headline usage metrics for product area X over the last 30 days
- Top 20 accounts by usage of product area X last quarter
- Show the top 20 accounts by app usage last quarter with their ARR and company size

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- summary: totalNumVisitors or totalNumAccounts, totalNumEvents, avgDailyActiveTime (duration object {seconds, display}), totalErrorClickCount, totalRageClickCount, totalUTurnCount, totalDeadClickCount
- rows: daysActive, totalTime, totalEvents, avgTimePerDay, totalErrorClickCount, totalRageClickCount, totalUTurnCount, totalDeadClickCount per visitor or account; per-account rows also include numVisitors; select adds requested metadata fields`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'groupBy',
        type: 'string',
        required: false,
        description: `'visitor' (default) groups rows by visitorId; 'account' groups by accountId and excludes events with empty accountId.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the summary and rows. Defaults to true.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of rows to return (1-200, default 10). Summary is independent of limit; set limit=1 if you only need totals.`,
      },
      {
        name: 'productAreaId',
        type: 'string',
        required: false,
        description: `Optional product area ID for the request.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'select',
        type: 'array',
        required: false,
        description: `Optional metadata fields to return in addition to usage metrics and the group-by ID. For groupBy='visitor', use exact fields from visitorMetadataSchema (for example, "visitor.custom.role"; "metadata.custom.role" also works). For groupBy='account', use exact fields from accountMetadataSchema (for example, "account.custom.ARR"; "metadata.custom.ARR" also works). If omitted, no metadata fields are returned.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort rows by. 'daysActive', 'totalTime', 'totalEvents', 'avgTimePerDay', 'totalErrorClickCount', 'totalRageClickCount', 'totalUTurnCount', 'totalDeadClickCount' are valid for both groupBy values; 'numVisitors' is valid only when groupBy='account'.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first) or 'asc'.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_appusagetimeseries',
    description: `Get app-level usage metrics over time. Groups events into buckets of the requested period (daily/weekly/monthly) and returns one row per bucket with app-wide totals: active visitors, active accounts, events, average active time (a duration object {seconds, display}), and the four frustration counts (totalErrorClickCount, totalRageClickCount, totalUTurnCount, totalDeadClickCount). The average metric matches the requested period: avgDailyActiveTime, avgWeeklyActiveTime, or avgMonthlyActiveTime. Audience can be scoped via an inline segmentPipeline; scope can also be narrowed to a single app via appId.

USE FOR: Trend questions about whole-app usage over a window - e.g. 'how did active visitors trend over the last 12 weeks?', 'are rage clicks across our apps trending up?'.

EXAMPLES:
- How did active visitors trend over the last 12 weeks?
- Total events per week across all apps over the last quarter
- Are rage clicks across our apps trending up over the last 30 days?

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- meta.period: echoed bucket size (daily|weekly|monthly)
- meta.metrics: list of metric names returned per bucket
- rows: one entry per time period, containing a 'bucket' string (YYYY-MM-DD or YYYY-MM), a startTime (epoch ms), and metric values; numeric metrics zero-fill for empty buckets`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'period',
        type: 'string',
        required: true,
        description: `Bucket granularity. 'daily' for windows up to ~30 days, 'weekly' for longer ranges, 'monthly' for multi-quarter ranges.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Optional Pendo account id to filter the query to. Combines with segmentPipeline.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the metrics. Defaults to true.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_buildpendosegment',
    description: `buildPendoSegment:
    Purpose: Describe one visitor segment by visitor or account ID, activity on Pages, Features, TrackEvents, Guides, the elements inside a
        guide, segment membership, or metadata.
    Input shape: pass definition as an array of rule groups. Top-level groups are ANDed together; rules within
        a group are ORed together. For one ANDed rule, wrap it in a single-item group.

    SINGLE CALL CONTRACT (important):
        The ENTIRE segment, including every AND clause and every OR clause, MUST be built with ONE call to this
        tool. Never split a segment across multiple calls. Combine all clauses into a single definition array and
        pass it once. Calling the tool more than once produces multiple unrelated segments, NOT one combined
        segment, so the AND/OR logic between the calls is lost.

        Mapping a request to a single definition:
            - Split the request into top-level AND clauses.
            - Each AND clause becomes one group (one inner array) in the definition.
            - Inside a clause, every OR alternative becomes one rule object in that group.
            - A clause with no OR is a group containing a single rule object.

        CLAUSE COVERAGE (important):
            Account for EVERY clause in the request. Before returning, count the AND clauses in the request and
            confirm the definition has exactly that many top-level groups, then confirm every OR alternative
            inside each clause is present as a rule object. Never drop, merge, or skip a clause. If the request
            mentions a page rule, a feature rule, and a track event rule joined by AND/OR, all of them must
            appear. A request like "(X OR Y) AND Z" has 2 top-level groups (one for "X OR Y", one for "Z") and
            3 rule objects total; returning fewer groups or rules is wrong.

    Full example (combining AND and OR in one call):
        Request: "(visitors who spent > 15 minutes on page A in May OR have NOT seen page B in the last year)
                  AND triggered track event C on fewer than 5 days in the last 7 days"
        Correct single definition (one tool call):
            [
                [
                    { "entityType": "page", "entityId": "A", "metric": "eventTime", "operator": ">", "threshold": 15, "condition": "between", "first": "2026-05-01", "last": "2026-05-31" },
                    { "entityType": "page", "entityId": "B", "metric": "notseen", "condition": "withinLast", "lookbackAmount": 12, "granularity": "months" }
                ],
                [
                    { "entityType": "trackEvent", "entityId": "C", "metric": "daysActive", "operator": "<", "threshold": 5, "condition": "withinLast", "lookbackAmount": 7, "granularity": "days" }
                ]
            ]
        The first group (the two page rules) is ORed together; that group is then ANDed with the second group
        (the track event rule). This is ONE call, not two.

    REQUIRED FIELDS AND CONDITION CHOICE (important):
        Activity metrics with non-empty supportedConditions MUST include an explicit "condition" field. It is the
        discriminator that selects which time/frequency fields apply, and it is NOT optional for those metrics.
        Always choose condition from the chosen metric's supportedConditions.
        Do NOT rely on the presence of first/last, lookbackAmount/granularity, or date to imply the condition;
        you must still set condition explicitly for activity metrics. For example:
            - first + last present        => you MUST also set condition: "between"
            - lookbackAmount + granularity => you MUST also set condition: "withinLast"
            - date present                 => you MUST also set condition: "since"

        Segment membership metrics are the exception:
            - isMemberOfSegment and isNotMemberOfSegment have supportedConditions: [] by design.
            - For these metrics, omit "condition" entirely. Do NOT add "ever" or infer any default condition.
            - supportedConditions: [] means "no condition field", not "choose a default condition".

	Visitor and account ID rules are conditionless and metricless:
		- Use entityType: "visitor" or "account".
		- Use operator: one of "==", "!=", "contains", "!contains", "empty", "!empty". Omit it to default to "==".
		- Use entityId for the comparison value with "==", "!=", "contains", and "!contains".
		- Use an empty entityId with "empty" and "!empty".
		- Example: { "entityType": "visitor", "entityId": "bob@example.com" }.
		- Example: { "entityType": "visitor", "entityId": "@example.com", "operator": "contains" }.
		- Example: { "entityType": "account", "entityId": "acme-corp" }.

	Metadata rules are also conditionless and metricless:
		- Use entityType: "metadata".
		- Use entityId for the full metadata key, e.g. "visitor.agent.job_role".
		- Use operator: one of "==", "!=", ">=", "<=", "contains", "!contains", "empty", "!empty".
		- Use value for "==", "!=", ">=", "<=", "contains", and "!contains". Omit value for "empty" and "!empty".
		- Time and date metadata values may use ISO 8601, e.g. "2025-12-31T23:59:59Z".
		- Example: { "entityType": "metadata", "entityId": "visitor.agent.job_role", "operator": "==", "value": "Software engineer" }.

	Guide element rules cover clicks on one button, link or close icon inside a guide:
		- Use entityType: "guideElement".
		- Use entityId for the GUIDE id, stepId for the step the element sits on, and elementId for the
		  element's uiElementId, e.g.
		  { "entityType": "guideElement", "entityId": "<guideId>", "stepId": "<guideStepId>",
		    "elementId": "pendo-button-a1b2c3d4", "metric": "eventCount", "operator": ">=", "threshold": 1,
		    "condition": "withinLast", "lookbackAmount": 30, "granularity": "days" }.
		- One getEntity call gives both ids: steps[].stepId and the
		  steps[].elements[].uiElementId nested under it. Never guess either.
		- eventCount is the only supported metric, and it counts clicks on that element in the chosen window:
			- "clicked it"       => operator ">=", threshold 1
			- "did not click it" => operator "==", threshold 0
			- click counts       => any operator, e.g. "clicked it more than 3 times" is operator ">", threshold 3
		- stepId does not narrow the count.
		- Only withinLast and between are available, so a click rule is always scoped to a window.

    Resolution steps
        1. Choose entityType from EntityTypes.
		2. For visitor or account, use entityId + optional operator and stop here.
		3. For metadata, use entityId + operator + optional value and stop here.
        4. For activity and segment entities, choose metric from EntityTypes[entityType].supportedMetrics.
        5. Look up Metrics[metric].
        6. If Metrics[metric].supportedConditions is non-empty, choose condition from that list and look up
           Conditions[condition].
        7. The final rule fields are:
            EntityTypes[entityType].requiredFields
            + Metrics[metric].requiredFields
            + Conditions[condition].requiredFields, only when a condition is required.

    Time phrase resolution examples:
        - "this year" / "so far this year" / "year to date" => condition: "since", date: "2026-01-01"
        - "this month" / "month to date" => condition: "since", date: "2026-06-01"
        - "since 2026-01-01" => condition: "since", date: "2026-01-01"
		- "last year" => condition: "between", first: "2025-01-01", last: "2025-12-31"
		- "in the last year" => condition: "withinLast", lookbackAmount: 12, granularity: "months"
        - "between 2026-01-01 and 2026-06-05" => condition: "between", first: "2026-01-01", last: "2026-06-05"
        - "in March" => condition: "between", first: "2026-03-01", last: "2026-03-31"
		- "last 3 weeks" => condition: "withinLast", lookbackAmount: 3, granularity: "weeks"
		- "last 7 days" => condition: "withinLast", lookbackAmount: 7, granularity: "days"

    CONDITION CHOICE FOR TIME PHRASES (important):
        - Use "since" (set only date) for any open-ended period running from a start date up to now:
          "this year", "this month", "year to date", "so far", "since <date>". Do NOT express these as
          "between ... today".
        - Use "between" (set first + last) ONLY for a closed range whose end is a specific past date or the last
          day of a named calendar period (e.g. "in March", "last year", "between X and Y").
        - Use "withinLast" (set lookbackAmount + granularity) for rolling windows: "last N days/weeks/months".
        - Set ONLY the fields the chosen condition requires. Never combine date with first/last in one rule.

    A segment should be just as valid in a week's time as it is today, so never hardcode today's date as an
    endpoint. For a fixed/named calendar period (e.g. "in March") use "between" spanning the entire period even
    if it has not finished yet. For an open-ended current period (e.g. "this year", "this month") use "since"
    with the period's start date, which stays valid going forward.
EntityTypes:
    visitor:
        requiredFields:
            entityType: "visitor"
            entityId: String
        supportedMetrics:
            []

    account:
        requiredFields:
            entityType: "account"
            entityId: String
        supportedMetrics:
            []

    page:
        requiredFields:
            entityType: "page"
            entityId: String
        supportedMetrics:
            ["eventCount", "deadClicks", "errorClicks", "rageClicks", "daysActive", "uTurns", "eventTime", "seen", "notseen", "lastSeen"]

    feature:
        requiredFields:
            entityType: "feature"
            entityId: String
        supportedMetrics:
            ["eventCount", "deadClicks", "errorClicks", "rageClicks", "daysActive", "used", "notused", "lastused"]

    trackEvent:
        requiredFields:
            entityType: "trackEvent"
            entityId: String
        supportedMetrics:
            ["eventCount", "daysActive", "used", "notused", "lastused"]

    guide:
        requiredFields:
            entityType: "guide"
            entityId: String
        supportedMetrics:
            ["seen", "lastSeen", "notSeen"]

    guideElement:
        requiredFields:
            entityType: "guideElement"
            entityId: String
            stepId: String     // the guide step the element sits on
            elementId: String  // the element's uiElementId, e.g. "pendo-button-a1b2c3d4"
        supportedMetrics:
            ["eventCount"]

    segment:
        requiredFields:
            entityType: "segment"
            entityId: String
        supportedMetrics:
            ["isMemberOfSegment", "isNotMemberOfSegment"]

    metadata:
        requiredFields:
            entityType: "metadata"
            entityId: String
        supportedMetrics:
            []

Metrics:
    eventCount:
        description: Number of events for the selected entity.
        requiredFields:
            metric: "eventCount"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    deadClicks:
        description: Number of dead clicks for the selected page or feature.
        requiredFields:
            metric: "deadClicks"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    errorClicks:
        description: Number of error clicks for the selected page or feature.
        requiredFields:
            metric: "errorClicks"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    rageClicks:
        description: Number of rage clicks for the selected page or feature.
        requiredFields:
            metric: "rageClicks"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    daysActive:
        description: Number of active days for the selected entity.
        requiredFields:
            metric: "daysActive"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    uTurns:
        description: Number of u-turns for the selected page.
        requiredFields:
            metric: "uTurns"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    eventTime:
        description: Time in minutes spent on the selected page.
        requiredFields:
            metric: "eventTime"
            operator: Enum["==", "!=", ">=", "<="]
            threshold: Integer
        supportedConditions:
            ["withinLast", "between"]

    used:
        description: Whether the selected feature or track event was used, optionally with a frequency threshold.
        requiredFields:
            metric: "used"
        supportedConditions:
            ["ever", "since", "withinLast", "atLeast", "atMost"]

    notused:
        description: Whether the selected feature or track event was not used.
        requiredFields:
            metric: "notused"
        supportedConditions:
            ["ever", "since", "withinLast"]

    lastused:
        description: When the selected feature or track event was last used.
        requiredFields:
            metric: "lastused"
        supportedConditions:
            ["since", "withinLast", "between"]

    seen:
        description: Whether the selected page was seen, optionally with a frequency threshold. For checking withinLast
        requiredFields:
            metric: "seen"
        supportedConditions:
            ["ever", "since", "withinLast", "atLeast", "atMost"]

    notseen:
        description: Whether the selected page was not seen.
        requiredFields:
            metric: "notseen"
        supportedConditions:
            ["ever", "since", "withinLast"]

    lastSeen:
        description: When the selected page was last seen.
        requiredFields:
            metric: "lastSeen"
        supportedConditions:
            ["since", "withinLast", "between"]

    isMemberOfSegment:
        description: Whether the visitor is a member of the selected segment.
        requiredFields:
            metric: "isMemberOfSegment"
        supportedConditions:
            []

    isNotMemberOfSegment:
        description: Whether the visitor is not a member of the selected segment.
        requiredFields:
            metric: "isNotMemberOfSegment"
        supportedConditions:
            []

Conditions:
    ever:
        description: The metric happened at any time.
        requiredFields:
            condition: "ever"

    since:
        description: The metric happened on or after a specific date.
        requiredFields:
            condition: "since"
            date: DateString("yyyy-mm-dd")

    withinLast:
        description: The metric happened within a rolling time window.
        requiredFields:
            condition: "withinLast"
            lookbackAmount: Integer
            granularity: Enum["days", "weeks", "months"]

    between:
        description: The metric happened within an inclusive date range.
        requiredFields:
            condition: "between"
            first: DateString("yyyy-mm-dd")
            last: DateString("yyyy-mm-dd")

    atLeast:
        description: The metric happened at least threshold times ever
        requiredFields:
            condition: "atLeast"
            threshold: Integer

    atMost:
        description: The metric happened at most threshold times ever
        requiredFields:
            condition: "atMost"
            threshold: Integer`,
    params: [
      {
        name: 'definition',
        type: 'array',
        required: true,
        description: `The complete segment definition to build in a SINGLE call. The top-level array is ANDed; rules within each nested array are ORed. Include every AND clause and OR alternative here; never split a segment across multiple tool calls.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_cohortretentioncurve',
    description: `Compute a retention curve for an app (scope='app'), a specific page or feature (scope='page' or 'feature'), a track event (scope='trackEvent'), or a whole product area (scope='productArea'). For track events: measures how many accounts/visitors continue firing the event over time. Supports visitor-level or account-level retention (unit) and all vs first cohort modes (cohortMode='all' for all active users, 'first' for first-time users only - best for onboarding effectiveness).

For scope='productArea', a user counts as active in a period if they used any page, feature, or track event in that area; guides in the area are not counted. Omit appId when the entity or area spans multiple applications - passing one restricts the curve to that application.

Call this tool ONCE per question. A single call returns all periods at once - do NOT call it multiple times with different periodCount values. The analysis window is anchored to now() and works backwards.

Do NOT pre-filter for 'new users in the last N days' via segmentPipeline - pass cohortMode='first' instead, which restricts to users whose all-time first interaction falls within the analysis window (truly new users, not returning users re-entering the window).

Period 0 = '< 1 Month' is the % of cohort active more than once in their first period - a real metric, NOT a 100% baseline (typical rates 25-60%). Period N = % of cohort still active N periods later. activeCount at higher periods decreases because users too new to have reached that period are excluded from the denominator (dynamic denominator - correct, not missing data). summary.finalRetentionRate is the most important single number - it represents the durable retained core.

USE FOR: Retention and churn questions - e.g. 'what % of users return after 3 months?', 'show me our retention curve', 'what's our churn rate?'. Not for acquisition questions ('how many new accounts did we gain?') - this tool measures continued activity of existing cohorts, not new-user counts.

EXAMPLES:
- What % of users return after 3 months?
- Show me our retention curve
- What's our account churn rate over the last 6 months?
- How often do accounts that created a dashboard keep creating dashboards?
- How well do we retain first-time users of this feature?
- What's the retention curve for our Onboarding product area?

RETURNS:
- scope, entityId, cohortMode, unit, periodType: echoed query parameters
- retentionCurve: list of {period, periodLabel, activeCount, multiSession, retentionRate} sorted by period
- summary: {totalCohortSize, avgRetentionRate, finalRetentionRate}`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Application ID to scope the request. Required only for scope='app'. For the other scopes it narrows the curve to a single application; omit it to span every application the entity belongs to.`,
      },
      {
        name: 'cohortMode',
        type: 'string',
        required: false,
        description: `'all' = all active visitors regardless of when they first appeared; 'first' = only visitors for whom this is their first use of the app or entity (measures onboarding/acquisition quality). Defaults to 'all'.`,
      },
      {
        name: 'entityId',
        type: 'string',
        required: false,
        description: `Pendo entity id, or the product area id when scope is 'productArea'. Required for every scope except 'app', which ignores it.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include anonymous visitors. Defaults to false, matching Pendo's standard retention report.`,
      },
      {
        name: 'offsetDays',
        type: 'number',
        required: false,
        description: `Days into the period before a user is counted as retained. Defaults to 1/7/30 for day/week/month.`,
      },
      {
        name: 'periodCount',
        type: 'number',
        required: false,
        description: `Number of retention periods to calculate. Defaults to 6. The window may not exceed ~1 year: max 366 for 'day', 52 for 'week', 12 for 'month'.`,
      },
      {
        name: 'periodType',
        type: 'string',
        required: false,
        description: `Period granularity. Defaults to 'month'.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `'app' for retention on any app activity, 'page', 'feature', or 'trackEvent' for entity-level retention, or 'productArea' for retention across every page, feature, and track event in a product area. Defaults to 'app'.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'unit',
        type: 'string',
        required: false,
        description: `'visitor' for visitor-level retention, 'account' for account-level (an account is retained if at least one of its visitors was active in the period). Defaults to 'visitor'.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_entityusage',
    description: `Get usage analytics for one known page, feature, or track event ID over a date range, including page views, feature clicks, event counts, and unique visitor ('people') and account counts. Returns {summary, rows}: summary has total events, unique visitors, unique accounts (and for pages/features, frustration counts; pages also include uTurnCount); rows are per-visitor or per-account breakdowns with events, time on entity, and days active, sorted and limited. Optionally include metadata fields for each returned visitor or account with select. Audience can be scoped via visitorIds OR an inline segmentPipeline (mutually exclusive), and/or filtered to a single accountId.

USE FOR: Scalar 'how many people viewed/clicked/used it' totals and top-N visitor or account questions over a window for one known page, feature, or track event ID.

EXAMPLES:
- How many page views did page X get last month?
- Top 20 visitors by time on page X in the last 30 days
- Top 50 accounts by usage of feature Y last quarter
- How many rage clicks did feature Y have last week?
- Show the top 20 visitors by time on page X last month with their email and role

NOT FOR: Looking up an entity ID from its name, or ranking multiple entities against each other.

WORKFLOW: When the user names a page, feature, or track event but does not provide its ID, call listCountables to resolve the name to an ID, then call entityUsage with that ID. Do not substitute aggregateEntityUsage for this lookup: its limited ranking may omit the named entity.

RETURNS:
- summary: totalNumEvents, totalNumVisitors, totalNumAccounts (pages/features also: totalErrorClickCount, totalRageClickCount, totalDeadClickCount; pages also: totalUTurnCount)
- rows: events, timeOnEntityInMinutes, daysActive per visitor or account (pages/features also: errorClickCount, rageClickCount, deadClickCount; pages also: uTurnCount); per-account rows also include numVisitors; select adds requested metadata fields`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'entityId',
        type: 'string',
        required: true,
        description: `The Pendo page, feature, or track event ID.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: true,
        description: `The kind of entity: 'page', 'feature', or 'trackEvent'.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Optional Pendo account id to filter both summary and rows to. Combines with visitorIds or segmentPipeline.`,
      },
      {
        name: 'groupBy',
        type: 'string',
        required: false,
        description: `'visitor' (default) groups rows by visitorId; 'account' groups by accountId and excludes events with empty accountId.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the summary and rows. Defaults to true.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of rows to return (1-200, default 10). Summary is independent of limit; set limit=1 if you only need totals.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'select',
        type: 'array',
        required: false,
        description: `Optional metadata fields to return in addition to usage metrics and the group-by ID. For groupBy='visitor', use exact fields from visitorMetadataSchema (for example, "visitor.custom.role"; "metadata.custom.role" also works). For groupBy='account', use exact fields from accountMetadataSchema (for example, "account.custom.ARR"; "metadata.custom.ARR" also works). If omitted, no metadata fields are returned.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort rows by. All entity types support 'events' and 'daysActive'. Pages and features also support 'errorClickCount', 'rageClickCount', 'deadClickCount'. Pages also support 'timeOnEntity' and 'uTurnCount'.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first) or 'asc'.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
      {
        name: 'visitorIds',
        type: 'array',
        required: false,
        description: `Optional explicit visitor IDs to scope to (max 500). Mutually exclusive with segmentPipeline.`,
      },
    ],
  },
  {
    name: 'pendomcp_entityusagetimeseries',
    description: `Get usage of a page, feature, or track event over time. Groups events into buckets of the requested period (daily/weekly/monthly) and returns one row per bucket with all available metrics. Pages get the full set (visitors, accounts, events, timeOnEntity, averageTimeOnEntityPerVisitor (duration object {seconds, display}), errorClickCount, rageClickCount, uTurnCount, deadClickCount). Features drop the time-derived metrics and uTurnCount. Track events drop all click-level frustration counts. For whole-app usage over time (not a specific entity), use the appUsageTimeSeries tool instead.

USE FOR: Trend questions over a window - e.g. 'how did feature X usage change over the last 12 weeks?', 'are rage clicks on page X trending up?'.

EXAMPLES:
- How did feature X usage change over the last 12 weeks?
- Are rage clicks on page X trending up over the last 30 days?
- How did visitor counts trend for this account last month?
- Total page views per week across all pages over the last quarter

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- meta.period: echoed bucket size (daily|weekly|monthly)
- meta.metrics: list of metric names returned per bucket
- rows: one entry per time bucket with bucket (YYYY-MM-DD or YYYY-MM), startTime (timestamp object {iso, display}), and metric values; numeric metrics zero-fill and averageTimeOnEntityPerVisitor (duration object {seconds, display}) defaults to 0s for empty buckets`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: true,
        description: `'page', 'feature', or 'trackEvent'.`,
      },
      {
        name: 'period',
        type: 'string',
        required: true,
        description: `Bucket granularity. 'daily' for windows up to ~30 days, 'weekly' for longer ranges, 'monthly' for multi-quarter ranges.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Optional Pendo account id to filter the query to. Combines with segmentPipeline.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID. When provided, the query is scoped to that app. Omit to include all apps. Ignored when entityId is supplied, since an entity already pins its app.`,
      },
      {
        name: 'entityId',
        type: 'string',
        required: false,
        description: `Optional Pendo entity id. When omitted, the query aggregates across every entity of that type.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the metrics. Defaults to true.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_getagentconfig',
    description: `Returns the configuration for a given AI agent: its name, description (a human-authored summary of the agent's role and purpose, not its LLM system prompt), model preset, type, and the tool names and descriptions it has used in the specified date range. The agent config section comes from the stored agent record. The tools section is derived from runtime events in the date range and may be empty if the agent had no activity.

USE FOR: Fetching the static configuration and runtime tool inventory of an AI agent. Use before analyzing issues or generating fix briefs to understand what the agent is configured to do and which tools it calls.

EXAMPLES:
- What is my agent's configured role and purpose?
- Which tools does my agent have access to?
- What model does agent X use?
- Show me the full config for this agent before I debug it

NOT FOR: The agent's actual LLM system prompt - this tool does not have access to that. Aggregated usage metrics, issue clusters, or conversation analysis - use the agent analytics tools for those.

RETURNS:
- Two labeled CSV sections:
- [agent_config]: name, description (human-authored role/purpose summary, not the LLM system prompt), preset (model), type - one row.
- [tools]: toolName, toolDescription - one row per tool seen in the date range; empty section if no activity found.

The maximum time range for this tool is 90 days.`,
    params: [
      { name: 'agentId', type: 'string', required: true, description: `The AI agent ID.` },
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window used to look up the agent's runtime tool inventory from events. Use type='relative' with lastNDays for a rolling window, or type='absolute' with startDate/endDate (YYYY-MM-DD) for a fixed range. Max 90 days.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_getagentcontext',
    description: `Fetches a grounding document that describes the current contents of a Pendo product resource so the LLM can reason about it. Today the only supported resource is a Pendo Space - a collaborative canvas of product artifacts (pages, features, guides, notes, etc.) curated by a team. Pass \`resourceType\` (e.g. "space") and \`resourceId\` (the id of that resource, e.g. a space id) to retrieve the document. Call \`listSpaces\` first if you need to discover a space id. The response is JSON returned by the Spaces service and typically contains a markdown \`body\` plus a \`schema\` describing the resource's contents; do not assume a shape beyond what the response declares. Use \`frameId\` to scope a space's context to a single frame on the canvas (and items whose parent is that frame) - useful when the user's UI is focused on that frame; omit \`frameId\` for the full space.`,
    params: [
      {
        name: 'resourceId',
        type: 'string',
        required: true,
        description: `Opaque id for that resource type (e.g. when resourceType is 'space', the space id).`,
      },
      {
        name: 'resourceType',
        type: 'string',
        required: true,
        description: `Which product resource to load context for. Supported values depend on subscription features; currently includes 'space'.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'frameId',
        type: 'string',
        required: false,
        description: `When resourceType is "space", limits context to one frame (that canvas item id) and items whose parent is that frame. Omit for full-space context.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_guidepollresponses',
    description: `Get per-poll response distribution and per-visitor response rows for a guide's non-NPS polls. Returns {meta, summary, rows}: summary.polls lists each poll with its question and response distribution; rows are visitor-keyed and pivoted - one column per poll, null where a visitor did not respond. limit (default 10, max 200) applies to the pivoted visitor rows after joining across all polls.

USE FOR: Answering questions about how visitors responded to polls in a guide: response distributions, individual visitor answers, and per-poll breakdowns. Not for NPS guide score metrics.

EXAMPLES:
- What were the responses to the poll in the onboarding guide?
- Show me the response distribution for guide X polls
- Which visitors answered 'Yes' to the helpfulness poll?
- What did visitors respond to the polls in guide G last month?

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- summary.polls: array of {pollId, question, distribution: [{response, count}]} for each poll. For free-text polls (open-ended responses), freeText is true and distribution is omitted because every response is unique - refer to the per-visitor rows instead.
- rows: per-visitor with visitorId, browserTime, and one column per pollId (null if no response)`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'guideId',
        type: 'string',
        required: true,
        description: `The guide ID to fetch poll responses for.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Optional Pendo account ID to filter responses to a specific account.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the results. Defaults to true.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of visitor rows to return (default 10, max 200). Applies to pivoted rows after joining across all polls.`,
      },
      {
        name: 'pollIds',
        type: 'array',
        required: false,
        description: `Optional list of poll IDs to restrict results to. Omit to return all non-NPS polls on the guide.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_guideusage',
    description: `Get per-visitor or per-account usage breakdown for a single guide, with time-on-guide and new vs returning viewers. totalViews excludes continue-resumed guideSeen events to match the Pendo guide-details UI. For poll guides, includes per-poll response counts and response rate in summary.

USE FOR: Per-visitor or per-account guide engagement - e.g. top visitors by time on guide, which accounts are completing vs dismissing, new vs returning viewer counts. With includeElements=true, also attributes each step's clicks to the individual buttons/links on it.

EXAMPLES:
- Top 20 visitors by time on guide X in the last 30 days
- Which accounts are dismissing the onboarding guide most?
- How many new vs returning viewers did the walkthrough have this month?
- Show me per-visitor completion data for the tooltip guide
- Is drop-off at step 3 happening via the CTA or by dismissing the guide?
- Which button on the last step of the onboarding guide gets clicked most?

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- summary: totalViews, completions, dismissals, uniqueVisitors, uniqueAccounts, completionRate, dismissalRate, viewsPerUser, avgTimeOnGuide, medianTimeOnGuide (duration objects {seconds, display}), newViewers, returningViewers, isPoll
- summary.polls (poll guides only): per-pollId uniqueResponseCount and totalResponseCount
- rows: per-visitor or per-account rows with views, completions, dismissals, daysActive, lastSeen (timestamp object {iso, display}), timeOnGuide (duration object {seconds, display}) (per-account rows also include uniqueVisitors), sorted and limited
- steps (only when includeSteps or includeElements is true): per-step array in guide step order, each with stepId, name, uniqueVisitors, viewCount. Single-step guides return one entry; step views include continue-resumed views to match the Pendo step funnel.
- steps[].elements (only when includeElements=true): the step's clicked buttons/links, highest clicks first, each with uiElementId, text, type ('Button', 'Close Button', 'Link', 'Task Item', 'Image', 'Swiped Left', 'Swiped Right' or 'Unknown'), actions (what the click does, e.g. 'Next Step', 'Dismiss Guide', 'External URL', 'Go to Step (2)'), clicks, uniqueVisitors, percentOfStepClicks. Compare an element's uniqueVisitors against its step's uniqueVisitors to attribute drop-off. Only clicked elements appear, and elements since removed from the step are still counted.

The maximum time range for this tool is 367 days.`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'guideId',
        type: 'string',
        required: true,
        description: `The exact guide ID to analyze.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Optional Pendo account ID. When provided, results are restricted to activity from that account.`,
      },
      {
        name: 'groupBy',
        type: 'string',
        required: false,
        description: `'visitor' (default) groups rows by visitorId; 'account' groups by accountId and excludes events with empty accountId.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors in the summary and rows. Defaults to true.`,
      },
      {
        name: 'includeElements',
        type: 'boolean',
        required: false,
        description: `Whether to break each step's clicks down by the individual buttons/links on it, as an 'elements' array on every step. Implies includeSteps, so the step's view counts come back alongside its element clicks. Use this to attribute drop-off at a step to a specific element (CTA vs close button). Defaults to false.`,
      },
      {
        name: 'includeSteps',
        type: 'boolean',
        required: false,
        description: `Whether to include a per-step breakdown (uniqueVisitors and viewCount per step) in a top-level 'steps' array. Defaults to false.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of rows to return (1-200, default 10). Summary is independent of limit; set limit=1 if you only need the top row.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort rows by: 'views' (default), 'completions', 'dismissals', 'daysActive', 'lastSeen', 'timeOnGuide'.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first) or 'asc'.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listaccounts',
    description: `List the accounts that match a segment or fuzzy-search account display names or IDs. Segment mode (the default) defines the cohort with a segmentPipeline - either a saved Pendo segment reference or a full inline pipeline produced by the segment-builder tool. Search mode fuzzy-matches both the configured account display-name field and account ID.

USE FOR: Listing the accounts in a segment/cohort, getting the account total, reading account metadata fields for those accounts, or resolving a named account to its ID without an application ID.

EXAMPLES:
- List the accounts in segment X
- Which accounts match these metadata criteria?
- How many accounts are in this segment?
- Show me accounts in segment X with their ARR and company size
- Find the account called Acme Inc

RETURNS:
- summary: numAccounts (the full segment total in segment mode; the number of returned matches in search mode)
- rows in both modes: accountId, name, description when available, and requested fields in a metadata object keyed by metadata path (for example, "metadata.auto.lastvisit"), capped by limit
- Search rows also include relevance. Only sufficiently relevant fuzzy matches are returned; unrelated accounts are omitted`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of account rows to return (1-200, default 10). In segment mode, the summary total is independent of limit; set limit=1 if you only need the count.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `How to choose accounts. "segment" (default) lists accounts matching segmentPipeline. "search" fuzzy-matches account display names and account IDs using search.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Account search query. Required when mode is "search"; not allowed when mode is "segment".`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'select',
        type: 'array',
        required: false,
        description: `List of account metadata fields to return for each account, in either mode. Only exact field names may be used, and should come from the accountMetadataSchema tool (e.g. "account.custom.ARR"; the "metadata.custom.ARR" form also works). If omitted, no metadata fields are returned.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listaiagentissues',
    description: `Lists detected (emergent) issues in AI agent conversations with instance counts and conversation counts. Returns a table of issue name (clusterName), summary, instance count, and conversation count per issue, plus a sample of conversationIds/eventIds for deep-diving via agentAnalyticsIssueAnalysis. It also returns visitorIds and accountIds who experienced the issue.

USE FOR: Finding what problems or issues users encountered when using AI agents (e.g., incorrect answers, refusals, errors). Use when the user asks about common issues, problems, or failures with a specific agent. Refer to an issue by its clusterName, never its numeric clusterId.

EXAMPLES:
- What are the common issues my users are encountering using my ABC agent in the last 30 days?
- What problems have users been encountering when using Acme agent in my Acme application lately?
- Have we seen reduced occurrences of issues with incorrect answers in our fooBar agent since last month?
- What models are most often used when users face problems with the chat agent in ScramCorp app?

NOT FOR: Use listUseCases for topic/cluster analysis of conversations. Use listAiAgents to get agent IDs and names first when the user has not specified an agent.

RETURNS:
- Table of issues: summary, instance count, conversation count, agentId, appId, visitorIds, and accountIds.
- Sorted by conversation count descending. Limited to 500 rows.

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `Required. The AI agent ID to filter by (from listAiAgents). Issues are clustered per agent to match the emergent issues table.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `Query end date in YYYY-MM-DD format (e.g., '2025-01-31'). Inclusive.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Query start date in YYYY-MM-DD format (e.g., '2025-01-01'). Inclusive.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'granularity',
        type: 'number',
        required: false,
        description: `Clustering granularity: higher values yield more, finer-grained clusters. Range: 1-5. Default: 3.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of issue rows to return. Range: 1-500. Default: 100.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listaiagents',
    description: `Lists all AI agents that the user has access to. AI agents are conversational assistants that can be deployed on specific pages or app-wide.

AI agents have the ability to collect conversations, cluster prompts by topics/use cases, and calculate metrics like conversation counts and rage prompt detection.

This tool returns agent ids and names for usage with other related agent tools.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listallapplications',
    description: `Pendo data is split into subscriptions, which share a set of visitors and accounts. Each subscription is split into separate applications. This call returns a list of all
the names and ids of all the subscriptions this user has access to, along with the names and ids of all of the applications in that subscription.

Most tools for this mcp require at least a subscription id; many also require an application id. Application ids are not unique across different subscriptions.`,
    params: [
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listcountables',
    description: `listCountables is a tool to find, search, look up, or list pages, features, or track events by name and return their entity IDs.
	These entities are collectively called "countables" - the tagged elements and custom events that Pendo
	tracks in your application. Use the type parameter to select which kind to list.

	This is the entity lookup tool to use before single-page, single-feature, or single-track-event usage
	analytics when the user provides a name instead of an ID. Relevant analytics questions include page views,
	feature clicks, event counts, unique visitor or "people" counts, unique account counts, time on page,
	frustration clicks, and other entity usage metrics.

	The trackEvent type corresponds to what other tools call trackType or TrackType.

	Supports search via the search param with a searchType selector: "semantic" for natural-language queries
	ranked by meaning, "fuzzy" for keyword matching on names and descriptions, or "substring" for
	case-insensitive containment match on name. Both search and searchType are required together.
	For features, pageId restricts discovery to features associated with one known page.
	Offset is ignored when search is used; use limit to control result count.
	

USE FOR: Resolving a named page, feature, or track event to its ID before calling entityUsage; listing features associated with a page; listing or browsing countables by name; auditing what is tagged in an app; semantic, fuzzy, or substring search for countable entities.

EXAMPLES:
- List all pages
- Show me features for this app
- Which features are associated with page X?
- List track events matching 'checkout'
- Find pages with 'dashboard' in the name
- What track events are defined?
- Find features related to user onboarding
- Search for pages about checkout flow
- Find the ID for 'Page X' before checking how many people viewed it

NOT FOR: Listing guides. Listing product areas. Usage analytics, click counts, visitor counts, or activity rankings.

WORKFLOW: For analytics about one named entity, search here first. Prefer searchType='substring' with the entity name exactly as the user supplied it; if that finds no match, retry with searchType='fuzzy' or 'semantic'. Then pass the matching ID to entityUsage. Do not conclude that the entity does not exist merely because it was absent from an aggregateEntityUsage ranking, which returns only a limited set of ranked entities.

RETURNS:
- Summary info for each matching entity: ID, name, description, and eventPropertyNames (custom property names attached to the countable). Pages also include URL rules and exclude rules. Features include pageId and elementPathRules (CSS selector rules identifying the tagged UI element).
- When search is used: results include a relevance score`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The kind of entity to list: page (tagged URLs), feature (tagged UI elements), or trackEvent (custom events sent via Track API - called trackType in some other tools).`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of matching results to skip before returning. Use with limit to paginate through large result sets.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: false,
        description: `Optional page ID. Only valid when type='feature'; restricts results to features associated with this page.`,
      },
      {
        name: 'productAreaId',
        type: 'string',
        required: false,
        description: `Optional product area ID for the request.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query for finding countables. Behavior depends on searchType: with "semantic", this is a natural-language query ranked by meaning (e.g., "user onboarding flow"); with "fuzzy", this is a keyword query matched against names and descriptions (e.g., "checkout", "dashboard"); with "substring", this is a case-insensitive containment match on name only (e.g., "board" matches "onboarding"). Must be used together with searchType.`,
      },
      {
        name: 'searchType',
        type: 'string',
        required: false,
        description: `How to search. "semantic" ranks results by meaning using embedding similarity - best for natural-language questions. "fuzzy" matches keywords against names and descriptions - best for known terms. "substring" matches entities whose name contains the search string (case-insensitive) - best for exact fragments. Requires search to also be specified.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listcustomobjects',
    description: `List a subscription's designated business OBJECTS - the custom event properties that have been marked as analyzable business entities (e.g. 'dashboardId', 'venueId', 'orderId'). Returns each object's underlying event property name (its field) and kind, which are exactly the objectProperty argument the objectAnalytics* tools take. Objects are NOT pages, features, or track events. Returns property names (e.g. 'dashboardId'), not human display labels.

USE FOR: Discovering which business objects a subscription has, and grounding an ambiguous entity name before an objectAnalytics* call. Use it when a name could mean either a business object or a page/feature (e.g. 'dashboards') to confirm the object exists and get the exact objectProperty.field to pass to objectAnalyticsActiveCount or objectAnalyticsBreakdown.

EXAMPLES:
- What business objects can I analyze in this subscription?
- Is 'dashboard' a business object or a page?
- List the custom objects available for Object Analytics
- Which object property identifies venues?

NOT FOR: Listing pages, features, or track events - use listCountables. Counting or ranking objects, or any per-object metric - use objectAnalyticsActiveCount or objectAnalyticsBreakdown. This returns only the object property definitions, never metrics.

RETURNS:
- One entry per designated object property: field (the event property name to pass as objectProperty.field, e.g. 'dashboardId'), and kind ('event' or 'historical').
- For historical (promoted visitor/account/parentAccount metadata) objects, group and metadataKind are also included.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional case-insensitive substring filter on the object's field name (e.g. 'dash' matches 'dashboardId'). Omit to return all designated objects.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listguidecategories',
    description: `Returns all guide categories for a subscription - their IDs, names, and platform (web or mobile). Each category exists as a paired web+mobile variant with distinct IDs; use the platform filter to narrow results.

USE FOR: Finding a guide category ID to associate a guide with a category, or enumerating which categories exist for a subscription. Pair with listGuides to see which guides belong to each category.

EXAMPLES:
- What guide categories are set up for this subscription?
- List all guide categories
- Show me web guide categories
- Which mobile guide categories exist?
- What are the available guide categories and their IDs?

NOT FOR: Guide analytics or engagement metrics - use guideMetrics or guideUsage instead. To search or list guides themselves, use listGuides.

RETURNS:
- Array of guide categories, each with: id, name, platform (web or mobile)`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter by platform. Values: "web" or "mobile". If omitted, both web and mobile categories are returned (each category exists as two variants with distinct IDs).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional fuzzy search string to search guide categories by name. Results are ranked by match quality. When omitted, all categories are returned.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listguideordering',
    description: `List the guide delivery order ("throttle order") for an app.

	When multiple guides are eligible to show at the same time, the delivery order determines which guide takes precedence. This tool returns the ordered list of guides for the given app. An app with no ordering set returns an empty list.

	Guides are capped by limit (default 50). totalGuides is the full ordering length; offset and returned describe the slice in guides. When returned < totalGuides the result is truncated - tell the user which range they're seeing (e.g. "showing 1-50 of 120") and use offset to page through the rest.

	PRESENTATION (follow exactly):
	For EVERY guide, show ALL SIX of these columns, always in this order:
	  Guide Name | Status | Segment | Page | Guide Category | Product Area
	Show every column even when most guides share a value and even when a column has no values. Segment is the readable segment name (e.g. "Everyone", "Browser: Chrome"). Page is "Sitewide" when the guide targets no specific page.

	Do NOT show the raw guideId to the user. It is for your context only, to reference guides in follow-up tool calls.
	

EXAMPLES:
- What is the guide delivery order for app xxx?
- Which guide shows first when several are eligible?
- Show me the throttle ordering for app xxx

RETURNS:
- appId, appName, totalGuides, offset, returned, and the ordered guides for the app
- totalGuides/offset/returned: the full ordering length and the returned slice - surface the range to the user when truncated
- guides: in delivery order. Always display these six columns per guide: Guide Name, Status, Segment, Page, Guide Category, Product Area
- guideId is context-only - never shown to the user`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application ID to scope the request.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of matching results to skip before returning. Use with limit to paginate through large result sets.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listguides',
    description: `List, filter, and search in-app guides, or fetch a single guide's full content.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'activation',
        type: 'string',
        required: false,
        description: `Filter by launch method: auto (automatic), api (programmatic), badge, dom (element click), embed, launcher (resource center), page (page view), feature (mobile element click), form, track (track event).`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Application ID to filter by. If omitted, returns data across all applications the user can access.`,
      },
      {
        name: 'expand',
        type: 'boolean',
        required: false,
        description: `Set to true for detailed guide metadata (steps, polls, scheduling, recurrence, conversion). Does not include guide content text — use guideId for that.`,
      },
      {
        name: 'expiration',
        type: 'string',
        required: false,
        description: `Filter guides by expiration status. Values:
"active" — guide has no expiration date or has not yet expired,
"expired" — guide's expiration date is in the past.`,
      },
      {
        name: 'guideId',
        type: 'string',
        required: false,
        description: `Fetch a single guide by ID and return its full content (step-by-step text extracted from building blocks). When provided, all filter/pagination params are ignored.`,
      },
      {
        name: 'guideType',
        type: 'string',
        required: false,
        description: `Filter by type: banner, tooltip, lightbox, walkthrough, whatsnew, building-block, group, training, launcher, mobile-lightbox.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of matching results to skip before returning. Use with limit to paginate through large result sets.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query for guide names/descriptions. Use with searchType. Offset is ignored when search is active — use limit to control result count.`,
      },
      {
        name: 'searchType',
        type: 'string',
        required: false,
        description: `Search mode: semantic (natural-language ranked by meaning) or fuzzy (keyword matching on name and description).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter guides by state. Values: "public" (live), "staged" (testing), "draft" (in progress), "_pendingReview_" (awaiting review), "disabled" (turned off).`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listproductareas',
    description: `List all product areas in the subscription with their IDs, names, and descriptions.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of matching results to skip before returning. Use with limit to paginate through large result sets.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional fuzzy search string to filter product areas by name or description. When omitted, all product areas are returned.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listspaces',
    description: `Lists the Pendo Spaces the current user can access in this subscription. A Pendo Space is a collaborative canvas of product artifacts (pages, features, guides, notes, etc.) that a team curates together; think of it as a shared workspace or board inside Pendo. Returns JSON from the Spaces service (opaque shape - field names depend on the Spaces API response). Use this to discover a space id before calling \`getAgentContext\` with \`resourceType\` "space" and that id as \`resourceId\`.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listthemes',
    description: `Returns a list of themes for a subscription. Themes define the visual styling applied to guides and other in-app content. Supports optional filtering by application and fuzzy search.

USE FOR: Listing available themes, finding a theme by name, or getting a theme ID to reference in other tools. Use when the user asks about available themes or visual styles for their guides.

EXAMPLES:
- What themes do we have?
- List all themes for this subscription
- Show me themes for app 12345
- Find a theme named 'Dark Mode'

NOT FOR: Modifying or creating themes. Viewing guide content or guide metrics.

RETURNS:
- Array of themes with: id, name, appId, tags, archive status, buildingBlocks (visual styling properties), cssUrl (supplemental CSS file URL if present)`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Number of matching results to skip before returning. Use with limit to paginate through large result sets.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional fuzzy search string to search themes by name. Results are ranked by match quality. When omitted, all themes are returned.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listtrackedissues',
    description: `Returns tracked (curated) issue definitions and their associated conversation and event IDs for a given AI agent and time window. Tracked issues are user-defined error or failure categories; conversations are attributed to them by LLM classification.

USE FOR: Listing all tracked issues defined for an agent and discovering which conversations belong to each. The returned conversationIds and eventIds can be used to scope a detailed analysis of a specific tracked issue.

EXAMPLES:
- What tracked issues are defined for my agent?
- Which conversations belong to the 'incorrect answer' tracked issue?
- Show me the tracked issues for my agent over the last 30 days.

NOT FOR: Detected (auto-clustered) issues or aggregate volume metrics; this tool returns only user-defined tracked issues.

RETURNS:
- Per tracked issue: id, name, description, severity, status, summary, numConversations, conversationIds, eventIds.

LARGE DATASETS: If this tool returns too much data or times out for a given date range, do NOT simply narrow the overall date range - that silently discards data outside the narrowed window. Instead, split the request into sequential non-overlapping sub-windows (e.g., for 30 days: three ~10-day windows such as days 1-10, 11-20, 21-30). Call the tool once per sub-window, then merge results by summing conversation counts across windows. This preserves the full dataset.

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID to analyze.`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listtrackedusecases',
    description: `Returns tracked (curated) use case definitions and their associated conversation and event IDs for a given AI agent and time window. Tracked use cases are user-defined categories; conversations are attributed to them by LLM classification.

USE FOR: Listing all tracked use cases defined for an agent and discovering which conversations belong to each. Returns conversationIds and eventIds that identify the conversations attributed to each tracked use case for further analysis.

EXAMPLES:
- What tracked use cases are defined for my agent?
- Which conversations belong to the 'billing support' tracked use case?
- Show me the tracked use cases for my agent over the last 30 days.

NOT FOR: Unsupervised clustering of conversations into emergent topics, or aggregate volume metrics - this tool only lists predefined tracked use cases and the conversations attributed to them.

RETURNS:
- Per tracked use case: id, name, summary, numConversations, conversationIds, eventIds.

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID to analyze.`,
      },
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listusecases',
    description: `Get AI agent conversation clustering analysis with comprehensive metrics. Analyzes conversations and prompts, grouping them by semantic topics/use cases.

EXAMPLES:
- What use cases has my AI agent been used for in the last 30 days?
- What are the main topics users are asking my AI agent about?
- Show me prompt clusters for my chat agent over the past 2 weeks.
- Cluster recent conversations for my agent to find common themes.

RETURNS:
- Per-cluster metrics: clusterName, clusterSummary, numConversations, numPrompts, numVisitors, numAccounts, numRagePrompts, numRagePromptsOverNumPrompts, retentionRate, retainedVisitors, totalVisitors, visitorIds, accountIds, conversationIds, and ragePromptConversationIds.

The maximum time range for this tool is 90 days.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The AI agent ID to analyze.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `Query end date in YYYY-MM-DD format (e.g., '2025-01-31'). Inclusive.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Query start date in YYYY-MM-DD format (e.g., '2025-01-01'). Inclusive.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'granularity',
        type: 'number',
        required: false,
        description: `Clustering granularity: higher values yield more, finer-grained clusters. Range: 1-5. Default: 3.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `Optional segment ID for the request.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_listvisitors',
    description: `List the visitors that match a segment and get a summary of the cohort. Returns {summary, rows}: summary has numVisitors and numAccounts (the true segment totals, independent of limit); rows is the list of matched visitors with visitorId and any requested metadata fields, capped by limit. The cohort is defined by a segmentPipeline - either a saved Pendo segment reference or a full inline pipeline produced by the segment-builder tool.

USE FOR: Listing the members of a segment/cohort and getting its visitor and account totals.

EXAMPLES:
- List the visitors in segment X
- Who are the visitors in this cohort?
- How many visitors and accounts are in this segment?
- Show me visitors in segment X with their email and role

RETURNS:
- summary: numVisitors, numAccounts (segment totals, independent of limit)
- rows: visitorId plus requested fields in a metadata object keyed by metadata path (for example, "metadata.auto.lastvisit"), capped by limit`,
    params: [
      {
        name: 'segmentPipeline',
        type: 'string',
        required: true,
        description: `Required inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of visitor rows to return (1-200, default 10). Summary totals are independent of limit; set limit=1 if you only need totals.`,
      },
      {
        name: 'select',
        type: 'array',
        required: false,
        description: `List of visitor metadata fields to return in addition to the visitorId. Only exact field names may be used, and should come from the visitorMetadataSchema tool (e.g. "visitor.custom.role"; the "metadata.custom.role" form also works). If omitted, only visitorId is returned.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_objectanalyticsactivecount',
    description: `Count how many unique business OBJECTS (e.g. dashboards, venues, documents, orders) were active over a date range, where an object is identified by one event property. Returns a single scalar count (distinct object_id) for the chosen property within the window. Use this for questions about a business object - including when a page or feature shares the same name (e.g. count 'dashboards' as the object, not the 'Dashboards' page). An object is a custom event property designated as an analyzable entity, distinct from pages, features, and track events. The aggregation is built by the Pendo analytics gateway, not in this service.

USE FOR: Scalar 'how many unique <objects> were active' questions where <object> is a business object identified by a single event/metadata property over one time window - even if a page or feature shares the object's name. When the object name is ambiguous (could be a page/feature) or you don't know its event property, ground it with listCustomObjects first.

EXAMPLES:
- How many unique venues were active in the last 30 days?
- Count distinct documents touched between 2025-01-01 and 2025-01-31
- How many unique order IDs were active last week?

NOT FOR: Ranking objects (e.g. 'which dashboards had the most visitors') - use objectAnalyticsBreakdown. Per-page, per-feature, or per-track-event usage - use entityUsage. Per-visitor or per-account app usage - use appUsage. Time series, group-by, or comparisons are not supported here.

RETURNS:
- activeCount: the number of distinct objects active in the window
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- meta.objectProperty: the field and kind the count was computed over`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'objectProperty',
        type: 'object',
        required: true,
        description: `The event property that identifies the object to count distinct values of. field (required) is the property name, e.g. 'venueId'. kind (optional, default 'event') is 'event' or 'historical'. group and metadataKind are required ONLY when kind='historical' (metadataKind is 'visitor', 'account', or 'parentAccount').`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'array',
        required: false,
        description: `Applications to scope the query to. Entries are either application ids or a platform type. Pass one id (e.g. ["123456"]) for a single app, or several ids (e.g. ["123456", "789012"]) for multiple apps. To scope to every app of a platform, pass a SINGLE platform token instead: one of "web", "mobile", "extension", "ios", or "android" (e.g. ["web"] for all web apps). A platform token cannot be combined with app ids or another platform token. OMIT this parameter (or pass an empty list) to query across ALL applications in the subscription - that is the correct default for object questions. Do NOT substitute a default app id when the scope is unspecified.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors. Defaults to true.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_objectanalyticsbreakdown',
    description: `Analyze the individual business OBJECTS (e.g. dashboards, venues, documents, orders) of one kind over a date range, where an object is identified by one event property. Use this for questions about a business object - including when a page or feature shares the same name (e.g. treat 'dashboards' as objects, not the 'Dashboards' page). An object is a custom event property designated as an analyzable entity, distinct from pages, features, and track events. Two modes, selected by the 'measures' argument:
(1) RANKING (default, measures omitted or ['uniqueVisitors']): a ranked list of objects by how many unique visitors were active on each - 'which <objects> had the most/least visitors'. Returns one row per object (objectId, objectName, uniqueVisitors), top-N by sortBy, optionally scoped by a segment.
(2) AVERAGES (measures includes 'avgObjectsPerVisitor' and/or 'avgTimePerObject'): a single subscription-wide summary scalar per measure - 'on average how many <objects> does each visitor use', 'average time spent per <object>' - matching the object-details page tiles. These are aggregates across ALL objects, NOT per-object rows, so sortBy/limit do not apply.
The aggregation is built by the Pendo analytics gateway, not in this service.

USE FOR: Ranking the individual objects of one business-object kind by distinct active visitors - e.g. which dashboards had the most visitors, busiest venues, most-visited documents - even if a page or feature shares the object's name. Also the home for per-object AVERAGE and TIME questions about a business object, e.g. 'average time per dashboard' or 'average dashboards per visitor'. When the object name is ambiguous (could be a page/feature) or you don't know its event property, ground it with listCustomObjects first.

EXAMPLES:
- Which dashboards had the most visitors last month?
- Which venues had the most unique visitors in the last 30 days?
- Top 10 documents by distinct visitors between 2025-01-01 and 2025-01-31
- Least-visited order IDs over the last week
- On average, how many distinct dashboards does each visitor interact with over the last 30 days?
- On average, how much time do visitors spend on each dashboard over the last 30 days?

NOT FOR: A single 'how many unique objects' scalar - use objectAnalyticsActiveCount. Per-page, per-feature, or per-track-event usage - use aggregateEntityUsage. Per-visitor or per-account app usage - use appUsage. Page dwell-time or time-on-page - that is page analytics, not a business object; 'time spent on a business object' is this tool, page dwell-time is not.

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD); meta.compareToDateRange when comparing; meta.measures: the requested measures
- meta.objectProperty: the field and kind analyzed
- RANKING mode: rows - one per object with objectId, objectName, uniqueVisitors, ranked by sortBy. In comparison mode uniqueVisitors splits into current_/prior_/change_/pctChange_ columns.
- AVERAGES mode: summary - a single object keyed by the requested average measure(s), e.g. {avgObjectsPerVisitor, avgTimePerObject}; no rows.`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'objectProperty',
        type: 'object',
        required: true,
        description: `The event property that identifies the object to break down by. field (required) is the property name, e.g. 'venueId'. kind (optional, default 'event') is 'event' or 'historical'. group and metadataKind are required ONLY when kind='historical' (metadataKind is 'visitor', 'account', or 'parentAccount').`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'array',
        required: false,
        description: `Applications to scope the query to. Entries are either application ids or a platform type. Pass one id (e.g. ["123456"]) for a single app, or several ids (e.g. ["123456", "789012"]) for multiple apps. To scope to every app of a platform, pass a SINGLE platform token instead: one of "web", "mobile", "extension", "ios", or "android" (e.g. ["web"] for all web apps). A platform token cannot be combined with app ids or another platform token. OMIT this parameter (or pass an empty list) to query across ALL applications in the subscription - that is the correct default for object questions. Do NOT substitute a default app id when the scope is unspecified.`,
      },
      {
        name: 'compareToDateRange',
        type: 'object',
        required: false,
        description: `Optional baseline period for a period-over-period comparison. When supplied, dateRange is treated as the current/recent period and this as the earlier baseline; results are ranked by how each object's unique visitors changed (change = current - prior). Same shape as dateRange. A relative baseline (type='relative', lastNDays) is the N days IMMEDIATELY BEFORE dateRange - not the last N days from today. Use absolute dates for a fixed baseline. Omit for a single-period ranking.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors. Defaults to true.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of object rows to return (1-200, default 10). Also the high-cardinality guard - object properties can have very many distinct values.`,
      },
      {
        name: 'measures',
        type: 'array',
        required: false,
        description: `Which measure(s) to compute. Omit (or ['uniqueVisitors']) for the ranked per-object breakdown. Include 'avgObjectsPerVisitor' (average number of distinct objects of this kind each visitor works with) and/or 'avgTimePerObject' (average time spent per object, in minutes) to get subscription-wide AVERAGES returned as a single summary - these are scalars across all objects (the object-details page tiles), NOT per-object rows, so sortBy, sortOrder, limit and compareToDateRange do not apply when an average is requested.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort the object rows by in the ranked breakdown. Currently 'uniqueVisitors' (distinct active visitors per object). Defaults to 'uniqueVisitors'. Ignored when an average measure is requested (see 'measures').
In comparison mode (compareToDateRange supplied) sort by a prefixed column instead: 'current_uniqueVisitors', 'prior_uniqueVisitors', 'change_uniqueVisitors', or 'pctChange_uniqueVisitors'. PREFER 'change_uniqueVisitors' (absolute change) for 'biggest mover / drop-off / gainer' questions; 'pctChange_uniqueVisitors' is noisy on low-traffic objects and null when the prior period had zero activity. Defaults to 'change_uniqueVisitors' when comparing.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first - most active objects) or 'asc' (lowest first - least active objects).`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_objectanalyticstimeseries',
    description: `Track how engagement with a business OBJECT (e.g. dashboards, venues, documents, orders) changed over time, where an object is identified by one event property. Groups the date range into buckets of the requested period (daily/weekly/monthly) and returns one row per bucket. The 'metric' param chooses what each bucket measures: avgTimePerObject (DEFAULT) = average time spent per object - this is what "engagement" with objects means; numEvents = events on objects ("activity"/event volume); numVisitors = distinct visitors engaging objects; numSubjects = distinct active objects (the time-bucketed form of objectAnalyticsActiveCount). Use this for questions about a business object - including when a page or feature shares the same name (e.g. trend 'dashboards' as the object, not the 'Dashboards' page). An object is a custom event property designated as an analyzable entity, distinct from pages, features, and track events. The aggregation is built by the Pendo analytics gateway, not in this service.

USE FOR: Trend questions about a business object over a window - e.g. 'how has weekly engagement with dashboards changed over the last 3 months?' (engagement -> avgTimePerObject, the default), 'event volume per venue by month' (-> numEvents), 'daily distinct visitors on documents over the last 30 days' (-> numVisitors), 'active order IDs per week' (-> numSubjects) - even if a page or feature shares the object's name. When the object name is ambiguous (could be a page/feature) or you don't know its event property, ground it with listCustomObjects first.

EXAMPLES:
- How has weekly engagement with dashboards changed over the last 3 months?
- Monthly event volume per venue over the last year
- Daily distinct visitors engaging documents over the last 30 days
- Active order IDs per week over the last quarter

NOT FOR: A single scalar for one window - use objectAnalyticsActiveCount. Ranking individual objects - use objectAnalyticsBreakdown. Per-page, per-feature, or per-track-event usage over time - use entityUsageTimeSeries. Whole-app usage over time - use appUsageTimeSeries.

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- meta.objectProperty: the field and kind the series was computed over
- period: echoed bucket size (daily|weekly|monthly)
- metrics: the metric name returned per bucket (avgTimePerObject, numEvents, numVisitors, or numSubjects)
- rows: one entry per time bucket with bucket (YYYY-MM-DD or YYYY-MM), startTime (timestamp object {iso, display}), and the metric value; buckets zero-fill empty periods`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'objectProperty',
        type: 'object',
        required: true,
        description: `The event property that identifies the object to trend over time. field (required) is the property name, e.g. 'venueId'. kind (optional, default 'event') is 'event' or 'historical'. group and metadataKind are required ONLY when kind='historical' (metadataKind is 'visitor', 'account', or 'parentAccount').`,
      },
      {
        name: 'period',
        type: 'string',
        required: true,
        description: `Bucket granularity. 'daily' for windows up to ~30 days, 'weekly' for longer ranges, 'monthly' for multi-quarter ranges.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'array',
        required: false,
        description: `Applications to scope the query to. Entries are either application ids or a platform type. Pass one id (e.g. ["123456"]) for a single app, or several ids (e.g. ["123456", "789012"]) for multiple apps. To scope to every app of a platform, pass a SINGLE platform token instead: one of "web", "mobile", "extension", "ios", or "android" (e.g. ["web"] for all web apps). A platform token cannot be combined with app ids or another platform token. OMIT this parameter (or pass an empty list) to query across ALL applications in the subscription - that is the correct default for object questions. Do NOT substitute a default app id when the scope is unspecified.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors. Defaults to true.`,
      },
      {
        name: 'metric',
        type: 'string',
        required: false,
        description: `Which metric to plot per bucket. Defaults to 'avgTimePerObject'. 'avgTimePerObject' = average time spent per object in the bucket - this is what "engagement" with objects means, so use it for "how has engagement with <objects> changed over time". 'numEvents' = number of events on objects in the bucket - use it for "activity"/event-volume questions. 'numVisitors' = distinct visitors engaging objects in the bucket. 'numSubjects' = distinct objects active in the bucket (the count-distinct measure of objectAnalyticsActiveCount).`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_objecteventbreakdown',
    description: `Rank or trend the events/actions on one kind of business OBJECT (e.g. dashboards, venues, documents, orders) over a date range - the event types (pages, features, track events) fired while the object's identifying property is present. Two modes: (1) default - rank those events by count for 'what are the most common actions/events on a <object>'; (2) set trend='up' or 'down' - rank which events are TRENDING up or down on the object, comparing the requested window against the equal-length window immediately before it (rows carry currentPeriodEvents, previousPeriodEvents, pctChange, ranked by pctChange). This is THE tool for 'which events are trending up/down across my <objects>' - it scopes to the object and computes the period-over-period change for you; do not hand-compute a trend by pulling two windows of unscoped track events from another tool. An object is a custom event property designated as an analyzable entity (distinct from pages, features, and track events), including when a page or feature shares the object's name. Returns one row per event type. The aggregation is built by the Pendo analytics gateway, not in this service.

USE FOR: The events/actions on a business object - either the most common ('the most common actions taken on dashboards this month', 'top interactions on a document') or, with trend='up'/'down', which are TRENDING ('which events are trending up across dashboards', 'what actions on venues are trending down vs the previous period'). When the object name is ambiguous (could be a page/feature) or you don't know its event property, ground it with listCustomObjects first.

EXAMPLES:
- What are the most common actions taken on dashboards this month?
- Top 10 event types on venues in the last 30 days
- Which actions were performed most on documents between 2025-01-01 and 2025-01-31?
- Which events are trending up across dashboards in the last 30 days?
- What actions on venues are trending down compared with the previous period?

NOT FOR: How many unique objects were active - use objectAnalyticsActiveCount. Ranking the objects themselves by visitors (which dashboards had the most visitors) or per-object averages/time - use objectAnalyticsBreakdown. Per-page, per-feature, or per-track-event usage NOT scoped to a business object - use aggregateEntityUsage. Do NOT answer 'which events are trending on <objects>' by comparing two windows of aggregateEntityUsage/entityUsage yourself - that counts ALL events unscoped to the object; set trend on this tool instead.

RETURNS:
- meta.dateRange: resolved startDate and endDate (YYYY-MM-DD)
- meta.objectProperty: the field and kind analyzed
- meta.trend: the trending direction, when trend mode is requested
- meta.compareToDateRange: the previous equal-length window (startDate, endDate) the trend compares against, when trend mode is requested
- rows (default): one per event type performed on the object, each with eventId, eventName, eventKind (page/feature/track type) and numEvents, ranked by numEvents
- rows (trend mode): one per event type, each with eventId, eventName, eventKind, currentPeriodEvents, previousPeriodEvents and pctChange, ranked by pctChange`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'objectProperty',
        type: 'object',
        required: true,
        description: `The event property that identifies the object whose actions to break down. field (required) is the property name, e.g. 'venueId'. kind (optional, default 'event') is 'event' or 'historical'. group and metadataKind are required ONLY when kind='historical' (metadataKind is 'visitor', 'account', or 'parentAccount').`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'array',
        required: false,
        description: `Applications to scope the query to. Entries are either application ids or a platform type. Pass one id (e.g. ["123456"]) for a single app, or several ids (e.g. ["123456", "789012"]) for multiple apps. To scope to every app of a platform, pass a SINGLE platform token instead: one of "web", "mobile", "extension", "ios", or "android" (e.g. ["web"] for all web apps). A platform token cannot be combined with app ids or another platform token. OMIT this parameter (or pass an empty list) to query across ALL applications in the subscription - that is the correct default for object questions. Do NOT substitute a default app id when the scope is unspecified.`,
      },
      {
        name: 'includeAnonymous',
        type: 'boolean',
        required: false,
        description: `Whether to include unidentified visitors. Defaults to true.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of event-type rows to return (1-200, default 10).`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Field to sort the event rows by. Currently 'numEvents' (number of events of that type fired on the object). Defaults to 'numEvents'. Ignored when trend is set (trend rows are ranked by pctChange).`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `'desc' (default, highest first - most common actions) or 'asc' (lowest first - least common actions). Ignored when trend is set (direction is controlled by trend).`,
      },
      {
        name: 'trend',
        type: 'string',
        required: false,
        description: `Optional trending mode. 'up' ranks the actions on the object whose activity increased the most; 'down' ranks the largest decreases - comparing the requested date range against the equal-length window immediately before it. When set, each row carries currentPeriodEvents, previousPeriodEvents and pctChange (ranked by pctChange), event types with no prior-period activity are excluded, and sortBy/sortOrder are ignored. Omit for the default ranked breakdown by numEvents.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_productareamemberactivity',
    description: `Return all pages, features, or track types in a product area including those with zero activity.`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `The time period to query. Use 'relative' with lastNDays or 'custom' with explicit dates.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: true,
        description: `The entity type to query. Must be a direct product area type: page, feature, or trackType.`,
      },
      {
        name: 'productAreaId',
        type: 'string',
        required: true,
        description: `The ID of the product area whose members to return.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Application ID of the app to query (defaults to -323232 if not specified)`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of rows to return. Range: 1-1000. Default: 1000.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `Aggregation period: dayRange (default), day, week, month. Controls how date ranges are bucketed in results.`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `filter the results by the specified segment id. If not provided, no segment filtering is applied.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `The fields to sort by. Prepending the field with a + (ascending) or - (descending) determines the sort direction.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_productengagementscore',
    description: `Calculate the Product Engagement Score for an application over a date range, returning adoption, stickiness, and growth metrics.`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application id of the app to query`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: true,
        description: `Query end date in YYYY-MM-DD format (e.g., '2025-01-31'). Inclusive.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: true,
        description: `Query start date in YYYY-MM-DD format (e.g., '2025-01-01'). Inclusive.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Filter results to a specific account. REQUIRED when the user mentions or references a specific account. Use the exact account ID string`,
      },
      {
        name: 'adoptionUserBase',
        type: 'string',
        required: false,
        description: `The user base for the adoption score.`,
      },
      {
        name: 'blacklist',
        type: 'string',
        required: false,
        description: `Blacklist behavior: 'apply' (use blacklist, normal behavior), 'ignore' (do not use blacklist), 'only' (invert blacklist, return only blacklisted activity)`,
      },
      {
        name: 'excludeWeekends',
        type: 'boolean',
        required: false,
        description: `Whether to exclude weekends in the stickiness score calculation.`,
      },
      {
        name: 'featureIds',
        type: 'array',
        required: false,
        description: `Array of the featureIds to include in the adoption score calculation. If this, pageIds, and trackEventIds are empty, default core events are included.`,
      },
      {
        name: 'growthUserBase',
        type: 'string',
        required: false,
        description: `The user base for the growth score.`,
      },
      {
        name: 'pageIds',
        type: 'array',
        required: false,
        description: `Array of the pageIds to include in the adoption score calculation. If this, featureIds, and trackEventIds are empty, default core events are included.`,
      },
      {
        name: 'scores',
        type: 'array',
        required: false,
        description: `Array of the scores to return. If empty, only PES is returned`,
      },
      {
        name: 'segmentId',
        type: 'string',
        required: false,
        description: `filter the results by the specified segment id. If not provided, no segment filtering is applied.`,
      },
      {
        name: 'stickinessDenominator',
        type: 'string',
        required: false,
        description: `The denominator time range for the stickiness score. If denominator is provided, numerator must also be provided. Numerator cannot equal denominator.`,
      },
      {
        name: 'stickinessNumerator',
        type: 'string',
        required: false,
        description: `The numerator time range for the stickiness score. If numerator is provided, denominator must also be provided. Numerator cannot equal denominator.`,
      },
      {
        name: 'stickinessUserBase',
        type: 'string',
        required: false,
        description: `The user base for the stickiness score.`,
      },
      {
        name: 'trackEventIds',
        type: 'array',
        required: false,
        description: `Array of the trackEventIds to include in the adoption score calculation. If this, pageIds, and featureIds are empty, default core events are included.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_queryfunnel',
    description: `Run a unique-visitor funnel and return conversion and timing metrics for an ordered sequence of 2-3 steps. Each visitor counts toward step N only if they completed every prior step in order. Use ONLY for sequence questions where ordering matters - the user is asking about visitors who did one thing and then went on to do another. Do NOT use for unordered set-overlap questions like 'how many visitors did both X and Y?' - those are answered by building a segment instead.

USE FOR: Ordered funnel questions: 'of visitors who viewed page A, how many went on to click feature B?', 'of visitors who saw guide G, how many reached page B?', drop-off analysis, time-to-completion between steps.

EXAMPLES:
- Show me the funnel from page A to feature B
- What is the drop-off between step 1 and step 2?
- How long does it take visitors to go from page X to track event Y?
- Funnel of A -> B -> C with conversion rates
- Show me the drop-off from seeing guide G to page B
- Of visitors who dismissed guide G, how many still clicked feature F?

RETURNS:
- meta.dateRange: resolved startDate and endDate for the query window
- summary.totalVisitorsEnteringStep1: visitors who completed step 1
- summary.visitorsCompletingFunnel: visitors who completed all steps
- summary.overallConversion: fraction (0-1) who completed the funnel
- summary.steps: per-step array of index, kind, id, visitors, conversionFromStart, dropOffFromPrevious, plus eventType on guide steps
- summary.averageTimeToCompletion: average time from step 1 to last step as a duration object {seconds, display} (null when no completions)
- summary.medianTimeToCompletion: median time from step 1 to last step as a duration object {seconds, display} (null when no completions)`,
    params: [
      {
        name: 'dateRange',
        type: 'object',
        required: true,
        description: `Time window. For a rolling window use type='relative' with lastNDays. For a fixed calendar range use type='absolute' with startDate and endDate in YYYY-MM-DD.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: true,
        description: `Ordered list of funnel steps (2-3 items). Each step is an object with 'kind' (one of 'page', 'feature', 'trackEvent', 'guide') and 'id' (the Pendo entity ID). Guide steps additionally accept 'eventType' ("guideSeen", the default, or "guideDismissed") and match the guide as a whole - any step of the guide counts, individual guide steps are not addressable. Steps may belong to different apps within the subscription.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `Optional application ID to filter by. If omitted, includes all applications the user can access.`,
      },
      {
        name: 'segmentPipeline',
        type: 'string',
        required: false,
        description: `Optional inline segment scope that yields visitorId rows. Accepted string shapes:
1. A saved segment ID string, embedded as {id: <segmentId>}.
2. A JSON string containing a full inline pipeline produced by the buildPendoSegment tool, you must not attempt to make this field up, only pass the result of the buildPendoSegment tool. You can pass the entire \`pipeline\` VERBATIM from the buildPendoSegment tool.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_searchentities',
    description: `Search for product entities such as pages, features, track types, guides, accounts, and segments.`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Application id of the app to query`,
      },
      {
        name: 'itemType',
        type: 'array',
        required: true,
        description: `The types of items to search for. Case-sensitive.`,
      },
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'itemIds',
        type: 'array',
        required: false,
        description: `Fetch specific entities by ID. Requires exactly one itemType. Cannot be combined with search or search_fallback.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return at most this many items for each itemType.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `The semantic search query (e.g., "Bridgeway Logistics", "onboarding features"). Use natural phrases, not meta-instructions.
		Must always be specified together with search_fallback.
	`,
      },
      {
        name: 'search_fallback',
        type: 'array',
        required: false,
        description: `Fuzzy fallback search terms. Must be provided together with search for search mode. Not allowed with itemIds.`,
      },
      {
        name: 'starredItemTypes',
        type: 'array',
        required: false,
        description: `Return only entities starred by the current user for these types. Combine multiple types in one call (e.g. ["Guide", "SessionRecording"]).`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_segmentlist',
    description: `List all segments in the subscription with their IDs, names, and optional feature flag names.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'substring',
        type: 'string',
        required: false,
        description: `Only return segments whose name contains this value; matching is case insensitive`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
  {
    name: 'pendomcp_visitormetadataschema',
    description: `Return the set of metadata fields available for visitors.`,
    params: [
      {
        name: 'subId',
        type: 'string',
        required: true,
        description: `Subscription ID that owns the data. Required for all queries.`,
      },
      {
        name: 'userQuery',
        type: 'string',
        required: false,
        description: `The original user query or question that triggered this tool call.`,
      },
    ],
  },
]
