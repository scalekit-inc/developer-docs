import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'phantombuster_agent_delete',
    description: `Permanently delete a PhantomBuster agent and all its associated data. This action is irreversible.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The unique identifier of the agent to permanently delete.`,
      },
    ],
  },
  {
    name: 'phantombuster_agent_fetch',
    description: `Retrieve details of a specific PhantomBuster agent by its ID. Returns agent name, script, schedule, launch type, argument configuration, and current status.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The unique identifier of the agent to retrieve.`,
      },
    ],
  },
  {
    name: 'phantombuster_agent_fetch_output',
    description: `Get the output of the most recent container of an agent. Designed for incremental data retrieval — use fromOutputPos to fetch only new output since the last call.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the agent to fetch output from.`,
      },
      {
        name: 'fromOutputPos',
        type: 'number',
        required: false,
        description: `Start output from this byte position (for incremental fetching).`,
      },
      {
        name: 'prevContainerId',
        type: 'string',
        required: false,
        description: `Retrieve output from the container after this previous container ID.`,
      },
      {
        name: 'prevRuntimeEventIndex',
        type: 'number',
        required: false,
        description: `Return runtime events starting from this index.`,
      },
      {
        name: 'prevStatus',
        type: 'string',
        required: false,
        description: `Previously retrieved status from user-side (for delta detection).`,
      },
    ],
  },
  {
    name: 'phantombuster_agent_launch',
    description: `Launch a PhantomBuster automation agent asynchronously. Starts the agent execution immediately and returns a container ID to track progress. Use the Get Container Output or Get Container Result tools to retrieve results.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The unique identifier of the agent to launch.`,
      },
      {
        name: 'arguments',
        type: 'object',
        required: false,
        description: `JSON object of input arguments to pass to the agent for this execution.`,
      },
      {
        name: 'output',
        type: 'string',
        required: false,
        description: `Output mode for the launch response.`,
      },
      {
        name: 'saveArguments',
        type: 'boolean',
        required: false,
        description: `Whether to persist the provided arguments as the agent's default arguments for future launches.`,
      },
    ],
  },
  {
    name: 'phantombuster_agent_launch_soon',
    description: `Schedule a PhantomBuster agent to launch within a specified number of minutes. Useful for delayed execution without setting up a full recurring schedule.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the agent to schedule.` },
      {
        name: 'minutes',
        type: 'integer',
        required: true,
        description: `Number of minutes from now after which the agent will launch.`,
      },
      {
        name: 'argument',
        type: 'object',
        required: false,
        description: `Input arguments to pass to the agent for this execution (object or JSON string).`,
      },
      {
        name: 'saveArgument',
        type: 'boolean',
        required: false,
        description: `If true, saves the provided argument as the agent's default for future launches.`,
      },
    ],
  },
  {
    name: 'phantombuster_agent_save',
    description: `Create a new PhantomBuster agent or update an existing one. Supports configuring the script, schedule, proxy, notifications, execution limits, and launch arguments. Pass an ID to update; omit to create.`,
    params: [
      {
        name: 'argument',
        type: 'object',
        required: false,
        description: `Default launch argument for the agent (object or JSON string).`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Script branch to use (e.g., main, staging).`,
      },
      {
        name: 'executionTimeLimit',
        type: 'number',
        required: false,
        description: `Maximum execution time in seconds before the agent is killed.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `ID of the agent to update. Omit to create a new agent.`,
      },
      {
        name: 'launchType',
        type: 'string',
        required: false,
        description: `How the agent is launched.`,
      },
      {
        name: 'maxParallelism',
        type: 'number',
        required: false,
        description: `Maximum number of concurrent executions allowed for this agent.`,
      },
      {
        name: 'maxRetryNumber',
        type: 'number',
        required: false,
        description: `Maximum number of retries before aborting on failure.`,
      },
      { name: 'name', type: 'string', required: false, description: `Display name for the agent.` },
      {
        name: 'proxyAddress',
        type: 'string',
        required: false,
        description: `HTTP proxy address or proxy pool name.`,
      },
      {
        name: 'proxyPassword',
        type: 'string',
        required: false,
        description: `Proxy authentication password.`,
      },
      {
        name: 'proxyType',
        type: 'string',
        required: false,
        description: `Proxy configuration type.`,
      },
      {
        name: 'proxyUsername',
        type: 'string',
        required: false,
        description: `Proxy authentication username.`,
      },
      {
        name: 'script',
        type: 'string',
        required: false,
        description: `Script slug or name to assign to this agent.`,
      },
    ],
  },
  {
    name: 'phantombuster_agent_stop',
    description: `Stop a currently running PhantomBuster agent execution. Gracefully halts the agent and saves any partial results collected up to that point.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The unique identifier of the agent to stop.`,
      },
    ],
  },
  {
    name: 'phantombuster_agents_fetch_all',
    description: `Retrieve all automation agents in the PhantomBuster organization. Returns agent IDs, names, associated scripts, schedules, and current status.`,
    params: [],
  },
  {
    name: 'phantombuster_agents_fetch_deleted',
    description: `Retrieve all deleted agents in the PhantomBuster organization. Returns agent IDs, names, creation timestamps, deletion timestamps, and who deleted each agent.`,
    params: [],
  },
  {
    name: 'phantombuster_agents_unschedule_all',
    description: `Disable automatic launch for ALL agents in the current PhantomBuster organization. Agents will remain but will only run when launched manually.`,
    params: [],
  },
  {
    name: 'phantombuster_ai_completions',
    description: `Get an AI text completion from PhantomBuster's AI service. Supports multiple models including GPT-4o and GPT-4.1-mini. Optionally request structured JSON output via a response schema.`,
    params: [
      {
        name: 'messages',
        type: 'array',
        required: true,
        description: `Array of conversation messages. Each must have a role (system, assistant, or user) and content string.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `AI model to use for the completion.`,
      },
      {
        name: 'temperature',
        type: 'number',
        required: false,
        description: `Sampling temperature (0–2). Lower = more deterministic, higher = more creative.`,
      },
    ],
  },
  {
    name: 'phantombuster_branch_create',
    description: `Create a new script branch in the current PhantomBuster organization.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the new branch. Only letters, numbers, underscores, and hyphens allowed. Max 50 characters.`,
      },
    ],
  },
  {
    name: 'phantombuster_branch_delete',
    description: `Permanently delete a branch by ID from the current PhantomBuster organization.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the branch to delete.` },
    ],
  },
  {
    name: 'phantombuster_branch_release',
    description: `Release (promote to production) specified scripts on a branch in the current PhantomBuster organization.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the branch to release.`,
      },
      {
        name: 'scriptIds',
        type: 'array',
        required: true,
        description: `Array of script IDs to release on this branch.`,
      },
    ],
  },
  {
    name: 'phantombuster_branches_fetch_all',
    description: `Retrieve all branches associated with the current PhantomBuster organization.`,
    params: [],
  },
  {
    name: 'phantombuster_container_attach',
    description: `Attach to a running PhantomBuster container and stream its console output in real-time. Returns a live stream of log lines as the agent executes.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `ID of the running container to attach to.`,
      },
    ],
  },
  {
    name: 'phantombuster_container_fetch',
    description: `Retrieve a single PhantomBuster container by its ID. Returns status, timestamps, launch type, exit code, and optionally the full output, result object, and runtime events.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the container to fetch.` },
      {
        name: 'withNewerAndOlderContainerId',
        type: 'boolean',
        required: false,
        description: `Set to true to include the IDs of the next and previous containers for this agent.`,
      },
      {
        name: 'withOutput',
        type: 'boolean',
        required: false,
        description: `Set to true to include the container's console output.`,
      },
      {
        name: 'withResultObject',
        type: 'boolean',
        required: false,
        description: `Set to true to include the container's result object.`,
      },
      {
        name: 'withRuntimeEvents',
        type: 'boolean',
        required: false,
        description: `Set to true to include runtime events (progress, notifications, etc.).`,
      },
    ],
  },
  {
    name: 'phantombuster_container_fetch_output',
    description: `Retrieve the console output and execution logs of a specific PhantomBuster container (agent run). Useful for monitoring execution progress, debugging errors, and viewing step-by-step agent activity.`,
    params: [
      {
        name: 'containerId',
        type: 'string',
        required: true,
        description: `The unique identifier of the container whose output to retrieve.`,
      },
    ],
  },
  {
    name: 'phantombuster_container_fetch_result',
    description: `Retrieve the final result object of a completed PhantomBuster container (agent run). Returns the structured data extracted or produced by the agent, such as scraped profiles, leads, or exported records.`,
    params: [
      {
        name: 'containerId',
        type: 'string',
        required: true,
        description: `The unique identifier of the container whose result to retrieve.`,
      },
    ],
  },
  {
    name: 'phantombuster_containers_fetch_all',
    description: `Retrieve all execution containers (past runs) for a specific PhantomBuster agent. Returns container IDs, status, launch type, exit codes, timestamps, and runtime events for each execution.`,
    params: [
      {
        name: 'agentId',
        type: 'string',
        required: true,
        description: `The unique identifier of the agent whose containers to retrieve.`,
      },
    ],
  },
  {
    name: 'phantombuster_leads_delete_many',
    description: `Permanently delete multiple leads from PhantomBuster organization storage by their IDs.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `Array of lead IDs to delete.` },
    ],
  },
  {
    name: 'phantombuster_leads_fetch_by_list',
    description: `Fetch paginated leads belonging to a specific lead list in PhantomBuster organization storage.`,
    params: [
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `ID of the lead list to fetch leads from.`,
      },
      {
        name: 'includeTotalCount',
        type: 'boolean',
        required: false,
        description: `Include the total count of leads in the response.`,
      },
      {
        name: 'paginationOffset',
        type: 'integer',
        required: false,
        description: `Offset for pagination.`,
      },
      {
        name: 'paginationOrder',
        type: 'string',
        required: false,
        description: `Sort order for pagination.`,
      },
      {
        name: 'paginationSize',
        type: 'integer',
        required: false,
        description: `Number of leads per page.`,
      },
    ],
  },
  {
    name: 'phantombuster_leads_save',
    description: `Save a single lead to PhantomBuster organization storage.`,
    params: [
      { name: 'lead', type: 'object', required: true, description: `Lead data object to save.` },
    ],
  },
  {
    name: 'phantombuster_leads_save_many',
    description: `Save multiple leads at once to PhantomBuster organization storage.`,
    params: [
      {
        name: 'leads',
        type: 'array',
        required: true,
        description: `Array of lead objects to save.`,
      },
    ],
  },
  {
    name: 'phantombuster_list_delete',
    description: `Permanently delete a lead list from PhantomBuster organization storage by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the lead list to delete.` },
    ],
  },
  {
    name: 'phantombuster_list_fetch',
    description: `Retrieve a specific lead list from PhantomBuster organization storage by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the lead list to fetch.` },
    ],
  },
  {
    name: 'phantombuster_lists_fetch_all',
    description: `Retrieve all lead lists in the PhantomBuster organization's storage.`,
    params: [],
  },
  {
    name: 'phantombuster_location_ip',
    description: `Retrieve the country associated with an IPv4 or IPv6 address using PhantomBuster's geolocation service.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `IPv4 or IPv6 address to look up.`,
      },
    ],
  },
  {
    name: 'phantombuster_org_export_agent_usage',
    description: `Export a CSV file containing agent usage metrics for the current PhantomBuster organization over a specified number of days (max 6 months).`,
    params: [
      {
        name: 'days',
        type: 'string',
        required: true,
        description: `Number of days of usage data to export. Maximum is ~180 days (6 months).`,
      },
    ],
  },
  {
    name: 'phantombuster_org_export_container_usage',
    description: `Export a CSV file containing container usage metrics for the current PhantomBuster organization. Optionally filter to a specific agent.`,
    params: [
      {
        name: 'days',
        type: 'string',
        required: true,
        description: `Number of days of usage data to export. Maximum is ~180 days (6 months).`,
      },
      {
        name: 'agentId',
        type: 'string',
        required: false,
        description: `Filter the export to a specific agent ID.`,
      },
    ],
  },
  {
    name: 'phantombuster_org_fetch',
    description: `Retrieve details of the current PhantomBuster organization including plan, billing, timezone, proxy config, and CRM integrations.`,
    params: [
      {
        name: 'withCrmIntegrations',
        type: 'boolean',
        required: false,
        description: `Include the organization's CRM integrations.`,
      },
      {
        name: 'withCustomPrompts',
        type: 'boolean',
        required: false,
        description: `Include the organization's custom prompts.`,
      },
      {
        name: 'withGlobalObject',
        type: 'boolean',
        required: false,
        description: `Include the organization's global object in the response.`,
      },
      {
        name: 'withProxies',
        type: 'boolean',
        required: false,
        description: `Include the organization's proxy pool configuration.`,
      },
    ],
  },
  {
    name: 'phantombuster_org_fetch_agent_groups',
    description: `Retrieve the agent groups and their ordering for the current PhantomBuster organization.`,
    params: [],
  },
  {
    name: 'phantombuster_org_fetch_resources',
    description: `Retrieve the current PhantomBuster organization's resource usage and limits. Returns daily and monthly usage for execution time, mail, captcha, AI credits, SERP credits, storage, and agent count.`,
    params: [],
  },
  {
    name: 'phantombuster_org_fetch_running_containers',
    description: `List all currently executing containers across the PhantomBuster organization. Returns container IDs, associated agent IDs/names, creation timestamps, launch types, and script slugs.`,
    params: [],
  },
  {
    name: 'phantombuster_org_save_agent_groups',
    description: `Update the agent groups and their ordering for the current PhantomBuster organization. The order of groups and agents within groups is preserved as provided.`,
    params: [
      {
        name: 'agentGroups',
        type: 'array',
        required: true,
        description: `Array of agent groups. Each item is either an agent ID string or an object with id, name, and agents array.`,
      },
    ],
  },
  {
    name: 'phantombuster_org_save_crm_contact',
    description: `Save a new contact to the organization's connected CRM (HubSpot). Requires a CRM integration to be configured in the PhantomBuster organization settings.`,
    params: [
      {
        name: 'crmName',
        type: 'string',
        required: true,
        description: `The CRM to save the contact to.`,
      },
      { name: 'firstname', type: 'string', required: true, description: `Contact's first name.` },
      { name: 'lastname', type: 'string', required: true, description: `Contact's last name.` },
      {
        name: 'pb_linkedin_profile_url',
        type: 'string',
        required: true,
        description: `LinkedIn profile URL of the contact.`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company the contact works at.`,
      },
      { name: 'email', type: 'string', required: false, description: `Contact's email address.` },
      { name: 'jobtitle', type: 'string', required: false, description: `Contact's job title.` },
      { name: 'phone', type: 'string', required: false, description: `Contact's phone number.` },
    ],
  },
  {
    name: 'phantombuster_script_fetch',
    description: `Retrieve a specific PhantomBuster script by ID including its manifest, argument schema, output types, and optionally the full source code.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the script to fetch.` },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Branch of the script to fetch.`,
      },
      {
        name: 'withCode',
        type: 'boolean',
        required: false,
        description: `Set to true to include the script's source code in the response.`,
      },
    ],
  },
  {
    name: 'phantombuster_scripts_fetch_all',
    description: `Retrieve all scripts associated with the current PhantomBuster user. Returns script IDs, names, slugs, descriptions, branches, and manifest details.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Filter scripts by branch name.`,
      },
      {
        name: 'exclude',
        type: 'string',
        required: false,
        description: `Exclude modules or non-modules from results.`,
      },
      {
        name: 'org',
        type: 'string',
        required: false,
        description: `Filter scripts by organization.`,
      },
    ],
  },
]
