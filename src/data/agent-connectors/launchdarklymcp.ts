import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'launchdarklymcp_apply_approval_request',
    description: `Apply an approved change request, executing the flag changes it contains.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the approval request applies.`,
      },
      {
        name: 'featureFlagKey',
        type: 'string',
        required: true,
        description: `The feature flag key associated with the approval request.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the approval request to apply.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the approval request resides.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment to include when applying the approval request.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: false,
        description: `Alias for featureFlagKey.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_archive_flag',
    description: `Archive a feature flag, marking it as retired. Archived flags are hidden from the default list but can be restored.`,
    params: [
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag to archive.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the flag resides.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_check_removal_readiness',
    description: `Check whether a feature flag is ready to be permanently removed from code. Analyzes SDK evaluations to confirm the flag is no longer in use.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key to check flag removal readiness in.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag to check for removal readiness.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the flag resides.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_clone_ai_config_variation',
    description: `Clone an existing AI Config variation to create a new variation with the same settings.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config that contains the variation to clone.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
      {
        name: 'variationId',
        type: 'string',
        required: true,
        description: `The ID of the variation to clone.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name for the new cloned variation.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_copy_flag_config',
    description: `Copy a flag's targeting configuration from one environment to another environment within the same project.`,
    params: [
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag whose configuration will be copied.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the flag resides.`,
      },
      {
        name: 'source',
        type: 'object',
        required: true,
        description: `The source environment to copy the flag configuration from.`,
      },
      {
        name: 'target',
        type: 'object',
        required: true,
        description: `The target environment to copy the flag configuration to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_agent_graph',
    description: `Create a new agent graph definition for multi-step AI workflows.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the agent graph.` },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description of the agent graph.`,
      },
      {
        name: 'edges',
        type: 'array',
        required: false,
        description: `The edges connecting nodes in the agent graph.`,
      },
      {
        name: 'nodes',
        type: 'array',
        required: false,
        description: `The nodes in the agent graph, each representing a step in the workflow.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_ai_config',
    description: `Create a new AI Config in a project. An AI Config manages AI model configurations with feature flag-style targeting and experimentation.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `A unique key for the AI Config.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the AI Config.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the AI Config will be created.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description for the AI Config.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional list of tags to associate with the AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_ai_config_variation',
    description: `Create a new variation for an AI Config with specific model, prompt, and parameter settings.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to create a new variation for.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name for the new variation.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
      {
        name: 'model',
        type: 'object',
        required: false,
        description: `Model settings for the new variation such as model name and parameters.`,
      },
      {
        name: 'prompt',
        type: 'array',
        required: false,
        description: `Prompt messages array for the new variation.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_ai_tool',
    description: `Create a new AI tool definition for use in AI Config variations.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the AI tool.` },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description of the AI tool.`,
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `The parameters schema for the AI tool.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_approval_request',
    description: `Create an approval request for a proposed flag change. The change will not take effect until approved and applied.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `A description of the proposed change and reason for the approval request.`,
      },
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the proposed change would apply.`,
      },
      {
        name: 'featureFlagKey',
        type: 'string',
        required: true,
        description: `The feature flag key that the approval request targets.`,
      },
      {
        name: 'instructions',
        type: 'array',
        required: true,
        description: `The semantic patch instructions describing the proposed flag changes.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the approval request will be created.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment to include with the approval request.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: false,
        description: `Alias for featureFlagKey.`,
      },
      {
        name: 'notifyMemberIds',
        type: 'array',
        required: false,
        description: `List of member IDs to notify about the approval request.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_flag',
    description: `Create a new feature flag in a project. The flag is created across all environments with default targeting off.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique key identifier for the new feature flag.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Human-readable display name for the new feature flag.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the flag will be created.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new feature flag.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional array of tags to associate with the new flag.`,
      },
      {
        name: 'temporary',
        type: 'boolean',
        required: false,
        description: `Whether the flag is temporary (short-lived) or permanent.`,
      },
      {
        name: 'variations',
        type: 'array',
        required: false,
        description: `Optional array of variation objects defining the flag's possible values.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_playground',
    description: `Create a new AI playground for testing prompts and AI configurations.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the AI playground.` },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key to associate this playground with.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the AI playground.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_create_prompt_snippet',
    description: `Create a new reusable prompt snippet.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `A unique key for the prompt snippet.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the prompt snippet.`,
      },
      { name: 'projectKey', type: 'string', required: true, description: `The project key.` },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text content of the prompt snippet.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the prompt snippet.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to categorize the prompt snippet.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_createdashboard',
    description: `Create a new observability dashboard with custom panels and metrics.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the dashboard.` },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to create the dashboard in.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description for the dashboard.`,
      },
      {
        name: 'panels',
        type: 'array',
        required: false,
        description: `An array of panel definitions for the dashboard.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_createdataset',
    description: `Create a new offline dataset for AI evaluation. Provide the filename and format (csv, json, or jsonl). The dataset is created in pending status and must be uploaded separately. Returns the dataset ID and upload URL.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The filename for the dataset including extension (e.g. data.csv).`,
      },
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `The format of the dataset file. One of: csv, json, or jsonl.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to create the dataset in.`,
      },
      {
        name: 'checksum',
        type: 'string',
        required: false,
        description: `A checksum hash of the dataset file for integrity validation.`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `The size of the dataset file in bytes.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_createevaluation',
    description: `Create a new AI evaluation definition. An evaluation defines a comparison between AI Config variations using a dataset and judge criteria. After creation, use run-evaluation to start an evaluation run.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the evaluation.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to create the evaluation in.`,
      },
      {
        name: 'configKey',
        type: 'string',
        required: false,
        description: `The key of the AI Config to evaluate.`,
      },
      {
        name: 'datasetId',
        type: 'string',
        required: false,
        description: `The ID of the offline dataset to use for this evaluation.`,
      },
      {
        name: 'variationKeys',
        type: 'array',
        required: false,
        description: `Array of variation keys from the AI Config to include in the evaluation.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_createexperiment',
    description: `Create a new experiment in a project environment. An experiment measures the impact of flag variations on metrics.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment will run.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key that this experiment is based on.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name for the new experiment.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project to create the experiment in.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description for the experiment.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Array of metric objects to assign to the experiment.`,
      },
      {
        name: 'randomizationUnit',
        type: 'string',
        required: false,
        description: `The unit of randomization for the experiment (e.g. user, request).`,
      },
      {
        name: 'treatments',
        type: 'array',
        required: false,
        description: `Array of treatment objects defining the flag variations to include in the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_creategraph',
    description: `Create a new agent graph definition. An agent graph defines a multi-step AI workflow with nodes and edges.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the agent graph.` },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to create the graph in.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description for the agent graph.`,
      },
      {
        name: 'edges',
        type: 'array',
        required: false,
        description: `An array of edge definitions connecting nodes in the graph.`,
      },
      {
        name: 'nodes',
        type: 'array',
        required: false,
        description: `An array of node definitions for the graph.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_createmetric',
    description: `Create a new metric for use in experiments. Metrics define what to measure (click events, conversions, revenue, etc.) and how to analyze results.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `No description.` },
      { name: 'measureType', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'projectKey', type: 'string', required: true, description: `No description.` },
      { name: 'successCriteria', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'eventKey', type: 'string', required: false, description: `No description.` },
      { name: 'kind', type: 'string', required: false, description: `No description.` },
      {
        name: 'randomizationUnits',
        type: 'array',
        required: false,
        description: `No description.`,
      },
      { name: 'tags', type: 'array', required: false, description: `No description.` },
      { name: 'unit', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'launchdarklymcp_createproject',
    description: `Create a new LaunchDarkly project. Projects are top-level containers for feature flags and environments.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `A unique key for the new project. Used in API calls and SDK configuration.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A human-readable name for the project.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional list of tags to categorize the project.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_delete_ai_config',
    description: `Permanently delete an AI Config and all its variations. This is irreversible.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to permanently delete.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config to delete.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_delete_ai_config_variation',
    description: `Delete a variation from an AI Config. This is permanent and cannot be undone.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config that contains the variation to delete.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
      {
        name: 'variationId',
        type: 'string',
        required: true,
        description: `The ID of the variation to permanently delete.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_delete_flag',
    description: `Permanently delete a feature flag and all its targeting rules across all environments. This is irreversible.`,
    params: [
      {
        name: 'confirm',
        type: 'boolean',
        required: true,
        description: `Must be set to true to confirm permanent deletion of the flag.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag to permanently delete.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the flag resides.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_delete_prompt_snippet',
    description: `Delete an existing prompt snippet permanently.`,
    params: [
      {
        name: 'snippetId',
        type: 'string',
        required: true,
        description: `The ID of the prompt snippet to delete.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_deleteagentgraph',
    description: `Permanently delete an agent graph definition. This cannot be undone.`,
    params: [
      {
        name: 'graphId',
        type: 'string',
        required: true,
        description: `The ID of the agent graph to permanently delete.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project that contains the agent graph.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_deletedataset',
    description: `Permanently delete an offline dataset and its associated metadata. THIS IS IRREVERSIBLE. Requires confirm=true to execute.`,
    params: [
      {
        name: 'confirm',
        type: 'boolean',
        required: true,
        description: `Must be set to true to confirm the irreversible deletion of the dataset.`,
      },
      {
        name: 'datasetId',
        type: 'string',
        required: true,
        description: `The unique identifier of the dataset to permanently delete.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the dataset belongs to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_find_members',
    description: `Search for organization members by email, name, or role.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of members to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter members by email, name, or role.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_find_stale_flags',
    description: `Find feature flags that haven't been evaluated recently and may be candidates for cleanup. Returns flags with their last evaluation time and staleness indicators.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key to check flag evaluation staleness in.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to search for stale flags.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of stale flags to return.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_agent_graph',
    description: `Get details about a specific agent graph definition.`,
    params: [
      {
        name: 'graphId',
        type: 'string',
        required: true,
        description: `The unique identifier of the agent graph.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_ai_config',
    description: `Get details about a specific AI Config including its variations and metadata.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the AI Config resides.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_ai_config_health',
    description: `Get the health status of an AI Config including latency, error rates, and evaluation metrics.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to retrieve health status for.`,
      },
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to retrieve health metrics from.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_ai_config_status_across_envs',
    description: `Get the status of an AI Config across all environments in a project.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to retrieve status across all environments.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_ai_config_targeting',
    description: `Get the targeting rules and rollout configuration for an AI Config in a specific environment.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to retrieve targeting rules for.`,
      },
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key to retrieve targeting configuration from.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_ai_tool',
    description: `Get details about a specific AI tool definition.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'toolId',
        type: 'string',
        required: true,
        description: `The unique identifier of the AI tool.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_flag',
    description: `Get full details about a specific feature flag including all variations, targeting rules across environments, and metadata.`,
    params: [
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to retrieve full details for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
      {
        name: 'env',
        type: 'string',
        required: false,
        description: `Optional environment key to scope the flag details to a specific environment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_flag_health',
    description: `Get health indicators for a feature flag including evaluation counts, error rates, and usage patterns.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key to check flag health in.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to retrieve health indicators for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_flag_status_across_envs',
    description: `Get the on/off status and targeting summary for a feature flag across all environments in a project.`,
    params: [
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to get status for across all environments.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_member_self',
    description: `Get the profile of the currently authenticated member, including their role and permissions.`,
    params: [],
  },
  {
    name: 'launchdarklymcp_get_playground',
    description: `Retrieve a single AI playground by ID.`,
    params: [
      {
        name: 'playgroundId',
        type: 'string',
        required: true,
        description: `The ID of the AI playground to retrieve.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_get_prompt_snippet',
    description: `Retrieve a single prompt snippet by ID.`,
    params: [
      {
        name: 'snippetId',
        type: 'string',
        required: true,
        description: `The ID of the prompt snippet to retrieve.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getdashboard',
    description: `Get a specific observability dashboard by ID, including its panels and configuration.`,
    params: [
      {
        name: 'dashboardId',
        type: 'string',
        required: true,
        description: `The unique identifier of the dashboard to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the dashboard belongs to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getdataset',
    description: `Get details about a specific offline dataset by ID, including its processing status and row count.`,
    params: [
      {
        name: 'datasetId',
        type: 'string',
        required: true,
        description: `The unique identifier of the dataset to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the dataset belongs to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getenvironment',
    description: `Get details about a specific environment in a project, including its keys and settings.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The key of the environment to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project that contains the environment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getevaluation',
    description: `Get details about a specific evaluation definition, including its configuration and last run status.`,
    params: [
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The unique identifier of the evaluation definition to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the evaluation belongs to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getevaluationrunsummary',
    description: `Get the summary results of a completed evaluation run, including pass/fail counts and aggregate scores.`,
    params: [
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The unique identifier of the evaluation definition.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the evaluation belongs to.`,
      },
      {
        name: 'runId',
        type: 'string',
        required: true,
        description: `The unique identifier of the evaluation run to retrieve the summary for.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getexperiment',
    description: `Get details about a specific experiment including its configuration, current iteration status, and metric assignments.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment exists.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getexperimentmetricresults',
    description: `Get the metric results for a specific metric in an experiment iteration. Returns statistical analysis including p-values, confidence intervals, and improvement percentages for each treatment variation compared to the control.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment is running.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment.`,
      },
      {
        name: 'iterationId',
        type: 'string',
        required: true,
        description: `The iteration ID for the experiment iteration to retrieve metric results from.`,
      },
      {
        name: 'metricKey',
        type: 'string',
        required: true,
        description: `The metric key identifying the specific metric to retrieve results for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getexperimentresults',
    description: `Get the results for all metrics in an experiment iteration.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment is running.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment.`,
      },
      {
        name: 'iterationId',
        type: 'string',
        required: true,
        description: `The iteration ID for the experiment iteration to retrieve results from.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getkeys',
    description: `Get the client-side SDK key, mobile key, and server-side SDK key for a specific environment. Use this to retrieve SDK initialization keys for a project environment.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key identifying the environment to retrieve SDK keys for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project to retrieve SDK keys for.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getmetric',
    description: `Get details about a specific metric including its configuration and associated experiments.`,
    params: [
      {
        name: 'metricKey',
        type: 'string',
        required: true,
        description: `The key of the metric to retrieve.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project that contains the metric.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getproject',
    description: `Get details about a specific LaunchDarkly project, including its environments and settings.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project to retrieve.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_getsdkactive',
    description: `Check whether an SDK is actively connected and sending events for a specific environment. Returns the connection status and last seen time.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The key of the environment to check SDK activity in.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project to check SDK activity for.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_invite_members',
    description: `Invite new members to the LaunchDarkly organization by email address.`,
    params: [
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `List of members to invite, each with an email and optional role.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_list_agent_graphs',
    description: `List all agent graph definitions in a project.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of agent graphs to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
    ],
  },
  {
    name: 'launchdarklymcp_list_ai_configs',
    description: `List all AI Configs in a project with their current status and variation count.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key to list AI Configs from.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of AI Configs to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter AI Configs by name or key.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_list_ai_tools',
    description: `List all AI tool definitions in a project.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of AI tools to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
    ],
  },
  {
    name: 'launchdarklymcp_list_approval_requests',
    description: `List pending and historical approval requests for flag changes in a project environment.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key to filter approval requests for.`,
      },
      {
        name: 'featureFlagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to filter approval requests for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key to list approval requests from.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: false,
        description: `Alias for featureFlagKey.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of approval requests to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
    ],
  },
  {
    name: 'launchdarklymcp_list_playgrounds',
    description: `List all AI playgrounds in the account.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of playgrounds to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
      {
        name: 'projectKey',
        type: 'string',
        required: false,
        description: `The project key to filter playgrounds by.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_list_prompt_snippets',
    description: `List all reusable prompt snippets.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of prompt snippets to return per page.`,
      },
      { name: 'offset', type: 'number', required: false, description: `Offset for pagination.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search query to filter prompt snippets.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listdashboards',
    description: `List observability dashboards in a project.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project's dashboards to list.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of dashboards to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listdatasets',
    description: `List offline datasets for a project. Returns id, name, status, row count, and creation info for each dataset.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to list datasets for.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of datasets to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listevaluations',
    description: `List AI Config evaluations in a project. Returns evaluation definitions with their names, associated config keys, and last run info.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to list evaluations for.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of evaluations to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter evaluations by name.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listexperiments',
    description: `List experiments in a project environment. Returns experiment configurations with their current iteration status.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the experiment list to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project whose experiments to list.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of experiments to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listflags',
    description: `Search and browse feature flags in a project. Returns a paginated list scoped to a single environment.

Filtering:
- \`query\`: search by flag name or key (case-insensitive)
- \`tags\`: array of tags (all must match)
- \`state\`: lifecycle state — \`live\`, \`deprecated\`, or \`archived\`. Defaults to \`live\`
- \`type\`: \`temporary\` or \`permanent\`
- \`maintainerId\`: member ID of the flag maintainer (use get-member-self or find-members to resolve)
- \`maintainerTeamKey\`: team key of the maintaining team
- \`sdkAvailability\`: one of \`client\`, \`mobile\`, \`anyClient\`, \`server\`
Sorting: use \`sort\` with \`creationDate\` or \`name\`; prefix with \`-\` for descending. Defaults to \`-creationDate\`.

Pagination: responses include \`totalCount\` and \`pageInfo.offset\`. To get the next page, set \`offset\` to the current offset + limit.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project's flags to list.`,
      },
      {
        name: 'env',
        type: 'string',
        required: false,
        description: `The environment key to scope the flag list to.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of flags to return per page.`,
      },
      {
        name: 'maintainerId',
        type: 'string',
        required: false,
        description: `Member ID of the flag maintainer. Use get-member-self or find-members to resolve.`,
      },
      {
        name: 'maintainerTeamKey',
        type: 'string',
        required: false,
        description: `Team key of the maintaining team.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search by flag name or key (case-insensitive).`,
      },
      {
        name: 'sdkAvailability',
        type: 'string',
        required: false,
        description: `Filter by SDK availability: client, mobile, anyClient, or server.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort flags by creationDate or name. Prefix with - for descending. Defaults to -creationDate.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Lifecycle state filter: live, deprecated, or archived. Defaults to live.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to filter by. All specified tags must match.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by flag type: temporary or permanent.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listmetricevents',
    description: `List metric event types available in a project. Metric events are the raw events tracked for custom metrics.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project to list metric events for.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of metric events to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listmetrics',
    description: `List metrics in a project. Returns metric configurations for use in experiments.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project to list metrics for.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of metrics to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_listreleasepolicies',
    description: `List release policies for a project. Release policies define automated release pipeline stages.`,
    params: [
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project to list release policies for.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of release policies to return per page.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination. Set to current offset + limit to get the next page.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_manage_expiring_targets',
    description: `Add or update expiring user targets on a flag — targets that will be automatically removed after a specified date.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the expiring targets apply.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag to manage expiring targets on.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key where the flag resides.`,
      },
      {
        name: 'targets',
        type: 'array',
        required: false,
        description: `Array of expiring target objects specifying users and their expiration dates.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_previewgraph',
    description: `Preview how an agent graph would execute for a given input without persisting any state. Returns the execution trace.`,
    params: [
      {
        name: 'graphId',
        type: 'string',
        required: true,
        description: `The ID of the agent graph to preview.`,
      },
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `The input object to pass to the graph for preview execution.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_query_change_history',
    description: `Query the audit log to find what changed in a LaunchDarkly account.`,
    params: [
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End date for the audit log query (ISO 8601 format).`,
      },
      {
        name: 'env',
        type: 'string',
        required: false,
        description: `The environment key to scope the query to.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of audit log entries to return.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: false,
        description: `The project key to scope the audit log query to.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search query to filter audit log entries.`,
      },
      {
        name: 'resourceKey',
        type: 'string',
        required: false,
        description: `The key of the specific resource to filter audit log entries for.`,
      },
      {
        name: 'resourceKind',
        type: 'string',
        required: false,
        description: `The kind of resource to filter audit log entries for (e.g. flag, segment).`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date for the audit log query (ISO 8601 format).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to filter audit log entries by.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_queryaggregations',
    description: `Query aggregated metric data for custom metrics in a project environment.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the aggregations query to.`,
      },
      {
        name: 'metricKey',
        type: 'string',
        required: true,
        description: `The metric key identifying which custom metric to query aggregations for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query aggregations for.`,
      },
      {
        name: 'aggregationType',
        type: 'string',
        required: false,
        description: `The type of aggregation to apply to the metric data.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_queryerrorgroups',
    description: `Query error groups for a project environment to identify recurring errors.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the error groups query to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query error groups for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of error groups to return.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_queryflagevaluations',
    description: `Query flag evaluation events for observability. Returns counts and details of flag evaluations over a time window.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the flag evaluation query to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query flag evaluations for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: false,
        description: `The flag key to filter evaluations for a specific flag.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of evaluation events to return.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_querylogs',
    description: `Query log events for a project environment for debugging and observability.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the logs query to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query logs for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of log events to return.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `A search query string to filter log events.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_querysessions',
    description: `Query session replay data for user sessions in a project.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the sessions query to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query session data for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of sessions to return.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_querytimelineevents',
    description: `Query timeline events for a project environment, such as flag changes, deployments, and other notable events.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the timeline events query to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query timeline events for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of timeline events to return.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_querytraces',
    description: `Query distributed traces for a project environment for observability and debugging.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to scope the traces query to.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to query traces for.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `The end of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of traces to return.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `The start of the time window for the query (ISO 8601 format).`,
      },
      {
        name: 'traceId',
        type: 'string',
        required: false,
        description: `Filter traces by a specific trace ID.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_runevaluation',
    description: `Start a new run of an AI evaluation. This executes the evaluation against the configured dataset and judge criteria. Returns the run ID and status.`,
    params: [
      {
        name: 'evaluationId',
        type: 'string',
        required: true,
        description: `The unique identifier of the evaluation to run.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the evaluation belongs to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_saveandstartexperimentiteration',
    description: `Update an experiment's configuration and immediately start a new iteration. Combines update-experiment and start-experiment-iteration into one step.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment will run.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment to update and start.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Array of metric objects to assign to the experiment iteration.`,
      },
      {
        name: 'treatments',
        type: 'array',
        required: false,
        description: `Array of treatment objects defining the flag variations to include in the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_setup_ai_config',
    description: `Initialize an AI Config with its first variation and targeting setup in one step.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to initialize.`,
      },
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key to set up the AI Config in.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project to set up the AI Config in.`,
      },
      {
        name: 'model',
        type: 'object',
        required: false,
        description: `Model settings for the initial variation.`,
      },
      {
        name: 'prompt',
        type: 'array',
        required: false,
        description: `Prompt messages for the initial variation.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_startexperimentiteration',
    description: `Start a new iteration for an experiment. The experiment must be configured with metrics and treatments.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment will run.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment to start a new iteration for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_startguardedrollout',
    description: `Start a guarded rollout on a flag's default rule. A guarded rollout progressively increases traffic to the test variation while monitoring metrics for regressions.`,
    params: [
      {
        name: 'controlVariationId',
        type: 'string',
        required: true,
        description: `The ID of the control variation to compare against during the rollout.`,
      },
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the guarded rollout will be started.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag to start a guarded rollout on.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Array of metric configurations to monitor for regressions during the rollout.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the flag belongs to.`,
      },
      {
        name: 'randomizationUnit',
        type: 'string',
        required: true,
        description: `The context kind used to randomize traffic between variations (e.g. user, organization).`,
      },
      {
        name: 'stages',
        type: 'array',
        required: true,
        description: `Array of rollout stage configurations defining traffic percentages and hold durations.`,
      },
      {
        name: 'testVariationId',
        type: 'string',
        required: true,
        description: `The ID of the variation to progressively roll out as the test variation.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `An optional comment explaining the purpose of this guarded rollout.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_stopexperimentiteration',
    description: `Stop the currently running iteration of an experiment. This ends data collection for the iteration.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment is running.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment whose iteration should be stopped.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_stopguardedrollout',
    description: `Stop an active guarded rollout on a flag's default rule. This immediately halts the progressive rollout.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the guarded rollout is active.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The key of the feature flag with an active guarded rollout.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project the flag belongs to.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `An optional comment explaining why the rollout is being stopped.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_toggle_flag',
    description: `Turn a feature flag on or off in a specific environment. When off, all users receive the off variation.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the flag should be toggled.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to toggle on or off.`,
      },
      {
        name: 'on',
        type: 'boolean',
        required: true,
        description: `Set to true to turn the flag on, or false to turn it off.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment describing why the flag was toggled.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_ai_config',
    description: `Update the metadata for an AI Config such as name, description, and tags.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to update.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The updated description for the AI Config.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated display name for the AI Config.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of tags to associate with the AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_ai_config_individual_targets',
    description: `Update the individual user targeting for an AI Config in a specific environment.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to update.`,
      },
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the AI Config targeting will be updated.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'targets',
        type: 'array',
        required: false,
        description: `The individual user targets to set for this AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_ai_config_rollout',
    description: `Update the rollout percentages for an AI Config's default rule in a specific environment.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to update.`,
      },
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the rollout will be updated.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key for the LaunchDarkly project.`,
      },
      {
        name: 'rollout',
        type: 'object',
        required: false,
        description: `The rollout configuration defining percentage splits across variations.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_ai_config_targeting_rules',
    description: `Update the targeting rules for an AI Config in a specific environment.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config to update targeting rules for.`,
      },
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where targeting rules will be updated.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
      {
        name: 'rules',
        type: 'array',
        required: false,
        description: `Array of targeting rule objects to apply to the AI Config.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_ai_config_variation',
    description: `Update a specific variation of an AI Config, including its prompt, model settings, and parameters.`,
    params: [
      {
        name: 'configKey',
        type: 'string',
        required: true,
        description: `The key of the AI Config that contains the variation to update.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the AI Config.`,
      },
      {
        name: 'variationId',
        type: 'string',
        required: true,
        description: `The ID of the variation to update.`,
      },
      {
        name: 'model',
        type: 'object',
        required: false,
        description: `Model settings for this variation such as model name and parameters.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated name for the variation.`,
      },
      {
        name: 'prompt',
        type: 'array',
        required: false,
        description: `Prompt messages array for this variation.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_flag_settings',
    description: `Update a feature flag's global settings such as name, description, tags, temporary status, and maintainer.`,
    params: [
      { name: 'flagKey', type: 'string', required: true, description: `No description.` },
      { name: 'instructions', type: 'array', required: true, description: `No description.` },
      { name: 'projectKey', type: 'string', required: true, description: `No description.` },
      { name: 'comment', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'launchdarklymcp_update_individual_targets',
    description: `Update the individual user targets for a flag variation in a specific environment. Add or remove specific user keys from a variation's target list.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the individual targets should be updated.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to update individual targets for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
      {
        name: 'targets',
        type: 'array',
        required: false,
        description: `Array of target objects specifying user keys and their assigned variations.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_playground',
    description: `Update an existing AI playground configuration.`,
    params: [
      {
        name: 'playgroundId',
        type: 'string',
        required: true,
        description: `The ID of the AI playground to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the AI playground.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the AI playground.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: false,
        description: `The project key the playground belongs to.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_prerequisites',
    description: `Update the prerequisite flags for a feature flag in a specific environment. Prerequisite flags must be in a specific variation before the dependent flag serves its variations.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the prerequisites should be updated.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to update prerequisites for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
      {
        name: 'prerequisites',
        type: 'array',
        required: false,
        description: `Array of prerequisite flag objects, each with a key and required variation index.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_prompt_snippet',
    description: `Update an existing prompt snippet.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The updated content of the prompt snippet.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The updated name of the prompt snippet.`,
      },
      {
        name: 'snippetId',
        type: 'string',
        required: true,
        description: `The ID of the prompt snippet to update.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Updated array of tags for the prompt snippet.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_rollout',
    description: `Update the default rule (fallthrough) rollout percentages for a flag in a specific environment.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the rollout should be updated.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to update rollout for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
      {
        name: 'rollout',
        type: 'object',
        required: false,
        description: `Rollout configuration object specifying variation weights for the default rule.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_update_targeting_rules',
    description: `Update the targeting rules for a feature flag in a specific environment. Rules determine which users see which variation based on user attributes.`,
    params: [
      {
        name: 'env',
        type: 'string',
        required: true,
        description: `The environment key where the targeting rules should be updated.`,
      },
      {
        name: 'flagKey',
        type: 'string',
        required: true,
        description: `The feature flag key to update targeting rules for.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying which project contains the flag.`,
      },
      {
        name: 'rules',
        type: 'array',
        required: false,
        description: `Array of targeting rule objects defining conditions and variation assignments.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_updateagentgraph',
    description: `Update an existing agent graph definition, modifying its nodes, edges, or metadata.`,
    params: [
      {
        name: 'graphId',
        type: 'string',
        required: true,
        description: `The ID of the agent graph to update.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The key of the project that contains the agent graph.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A new description for the agent graph.`,
      },
      {
        name: 'edges',
        type: 'array',
        required: false,
        description: `Updated list of edge definitions connecting nodes in the agent graph.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A new display name for the agent graph.`,
      },
      {
        name: 'nodes',
        type: 'array',
        required: false,
        description: `Updated list of node definitions for the agent graph.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_updateexperiment',
    description: `Update an existing experiment's configuration including name, description, metrics, treatments, and randomization unit.`,
    params: [
      {
        name: 'environmentKey',
        type: 'string',
        required: true,
        description: `The environment key where the experiment exists.`,
      },
      {
        name: 'experimentKey',
        type: 'string',
        required: true,
        description: `The experiment key identifying the experiment to update.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: true,
        description: `The project key identifying the project containing the experiment.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The updated description for the experiment.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Updated array of metric objects to assign to the experiment.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The updated display name for the experiment.`,
      },
      {
        name: 'treatments',
        type: 'array',
        required: false,
        description: `Updated array of treatment objects defining the flag variations to include.`,
      },
    ],
  },
  {
    name: 'launchdarklymcp_vent',
    description: `Report a missing capability, bug, parameter gap, or unclear error encountered while using LaunchDarkly MCP tools. This feedback is collected and triaged to improve the toolset. Use this when a tool is missing, returns an unexpected error, or lacks a needed parameter.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category of the issue being reported.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `A description of the issue or missing capability.`,
      },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `Additional context about the situation when the issue occurred.`,
      },
      {
        name: 'errorMessage',
        type: 'string',
        required: false,
        description: `The error message received, if any.`,
      },
      {
        name: 'toolName',
        type: 'string',
        required: false,
        description: `The name of the tool that has the issue, if applicable.`,
      },
    ],
  },
]
