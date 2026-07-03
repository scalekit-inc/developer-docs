import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'claymcp_add_company_data_points',
    description: `Add data points to companies in an existing search. Supports enriching ALL companies or specific companies via entityIds. Use for tech stack, funding, headcount, competitors, or any custom research question about companies.`,
    params: [
      {
        name: 'dataPoints',
        type: 'array',
        required: true,
        description: `The data points to apply to the company`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The task ID identifying the search to add company data points to`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: false,
        description: `Optional. Array of entityIds to enrich. When omitted, enriches all companies.`,
      },
    ],
  },
  {
    name: 'claymcp_add_contact_data_points',
    description: `Add data points to contacts in an existing search. Supports enriching ALL contacts or specific contacts via entityIds. Use for emails, phone numbers, work history, thought leadership, or any custom research question about contacts.`,
    params: [
      {
        name: 'dataPoints',
        type: 'array',
        required: true,
        description: `The data points to apply to the contacts`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The task ID identifying the search to add contact data points to`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: false,
        description: `Optional. Array of entityIds to enrich. When omitted, enriches all contacts.`,
      },
    ],
  },
  {
    name: 'claymcp_ask_question_about_accounts',
    description: `Ask a natural language question about one or more accounts available in Clay Audiences. An AI agent analyzes account data including contacts, opportunities, Gong calls, and emails to answer the question.`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `Account IDs to analyze (1-10)`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `Natural language question about the accounts`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'claymcp_find_and_enrich_company',
    description: `Find and enrich a single company by domain or LinkedIn URL. Use for prospecting publicly available company info (funding, competitors, tech stack, etc.). Returns a taskId for follow-up enrichment.`,
    params: [
      {
        name: 'companyIdentifier',
        type: 'string',
        required: true,
        description: `Company identifier (domain like "clay.com" or LinkedIn URL like "https://www.linkedin.com/company/grow-with-clay")`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'companyDataPoints',
        type: 'array',
        required: false,
        description: `Optional data points to enrich during search creation`,
      },
    ],
  },
  {
    name: 'claymcp_find_and_enrich_contacts_at_company',
    description: `Search for contacts at a company by role, title, name, or department. Supports filtering by job title keywords, locations, tenure, certifications, languages, and more. Returns a taskId for follow-up enrichment.`,
    params: [
      {
        name: 'companyIdentifier',
        type: 'string',
        required: true,
        description: `The company identifier to search for company and contacts. Either a domain (e.g. "clay.com") or a LinkedIn URL (e.g. "https://www.linkedin.com/company/grow-with-clay").`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      { name: 'contactFilters', type: 'object', required: false, description: `No description.` },
      {
        name: 'dataPoints',
        type: 'object',
        required: false,
        description: `Optional data points to enrich during search creation`,
      },
    ],
  },
  {
    name: 'claymcp_find_and_enrich_list_of_contacts',
    description: `Find and enrich specific named contacts at their companies. Use when you have a list of specific people by name (e.g. "John Smith at OpenAI"). Returns a taskId for follow-up enrichment.`,
    params: [
      {
        name: 'contactIdentifiers',
        type: 'array',
        required: true,
        description: `Array of contact identifiers to find and enrich, with their company identifiers`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'dataPoints',
        type: 'object',
        required: false,
        description: `Optional data points to enrich during search creation`,
      },
    ],
  },
  {
    name: 'claymcp_get_credits_available',
    description: `Check if credits are available for the workspace. Returns hasWorkspaceCredits, hasSalesRepCredits, and (when credit budgets are enabled) hasBudgetCredits.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'claymcp_get_subroutine_input_options',
    description: `Fetch the available dropdown options for a subroutine input that has a configured options source.`,
    params: [
      {
        name: 'inputName',
        type: 'string',
        required: true,
        description: `The name of the input whose options to fetch.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'subroutine_id',
        type: 'string',
        required: true,
        description: `The ID of the subroutine.`,
      },
    ],
  },
  {
    name: 'claymcp_get_task',
    description: `Get task status and results by task ID. Handles all task types (search, direct) and returns the current state. Accepts universal mcp-task-* IDs and legacy cgas-search-id-* IDs.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The task ID to retrieve (mcp-task-* or legacy cgas-search-id-*)`,
      },
    ],
  },
  {
    name: 'claymcp_get_task_context',
    description: `Retrieve the current state of a task — all entities, enrichment values, and statuses. Call this to get actual enrichment results (emails, phone numbers, work history, custom data points) after a search or enrichment operation.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The task ID to retrieve (mcp-task-* or legacy cgas-search-id-*)`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: false,
        description: `Optional. Pass specific entity IDs to retrieve only those entities. Leave empty or omit to retrieve all entities for the task.`,
      },
    ],
  },
  {
    name: 'claymcp_list_subroutines',
    description: `List available custom functions in the workspace. Call this to see their required inputs before using run_subroutine.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'claymcp_query_objects',
    description: `Query audience accounts, contacts, or deals using natural language. Translates plain language descriptions into structured filters and returns matching entities with field values from Clay Audiences.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language description of what to filter, e.g. "tech companies with 500+ employees"`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'audienceName',
        type: 'string',
        required: false,
        description: `Name of a saved audience segment to scope results to`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max rows to return (default 50)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset (default 0)`,
      },
      {
        name: 'onlyMine',
        type: 'boolean',
        required: false,
        description: `When true, restrict account results to the caller's Salesforce-owned accounts`,
      },
    ],
  },
  {
    name: 'claymcp_run_subroutine',
    description: `Execute a custom function on contacts/companies from an existing search. Use when you have a taskId from a previous search and want to run a subroutine on all or specific contacts. Requires fieldMapping to map entity fields to subroutine inputs.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'subroutine_id',
        type: 'string',
        required: true,
        description: `The ID of the subroutine to execute. Get this from list_subroutines.`,
      },
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `Required. The taskId from the existing search task to add results to.`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: false,
        description: `Optional. Array of entityIds to run on. When omitted with fieldMapping, runs on all contacts.`,
      },
      {
        name: 'fieldMapping',
        type: 'object',
        required: false,
        description: `Required for batch mode. Format: { "entityField": "subroutineInput" }. KEY = entity field name, VALUE = subroutine input name.`,
      },
    ],
  },
  {
    name: 'claymcp_run_subroutine_direct',
    description: `Execute a custom function directly with provided inputs, without needing an existing task or entityIds. Use when the user provides specific input values (LinkedIn URL, name, email, etc.) and wants to run a function on that data directly.`,
    params: [
      {
        name: 'inputs',
        type: 'object',
        required: true,
        description: `The actual input values for the subroutine. Keys must match the input names from list_subroutines.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'subroutine_id',
        type: 'string',
        required: true,
        description: `The ID of the subroutine to execute. Get this from list_subroutines.`,
      },
    ],
  },
  {
    name: 'claymcp_run_subroutine_no_mapping',
    description: `Run a custom subroutine on search entities. The backend automatically generates the field mapping. Requires a subroutine_id and taskId from an existing search.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'subroutine_id',
        type: 'string',
        required: true,
        description: `The ID of the subroutine to execute.`,
      },
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The taskId from the existing search.`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: false,
        description: `Optional. Array of entityIds to run on. When omitted, runs on all entities.`,
      },
      {
        name: 'inputs',
        type: 'object',
        required: false,
        description: `Optional. Explicit values for inputs the user selected (e.g. dropdown pickers), keyed by input name.`,
      },
    ],
  },
  {
    name: 'claymcp_track_event',
    description: `Track an analytics event with optional properties.`,
    params: [
      {
        name: 'eventName',
        type: 'string',
        required: true,
        description: `The name of the event to track`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Additional properties to include with the event`,
      },
    ],
  },
]
