import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'latchbiomcp_get_execution',
    description: `Fetch the status, task nodes, and results for a workflow execution. If a workflow errors, use get_task_logs to retrieve logs for failed tasks. Supports paginating through execution nodes and map-task shards.`,
    params: [
      {
        name: 'execution_id',
        type: 'integer',
        required: true,
        description: `Latch execution id returned by launch_workflow.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'execution_node_cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor from execution_nodes.next_cursor.`,
      },
      {
        name: 'execution_node_limit',
        type: 'integer',
        required: false,
        description: `Max execution nodes to return, from 1 to 500. Default 100.`,
      },
      {
        name: 'map_task_cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor from a previous map-task page. Requires map_task_execution_node_id.`,
      },
      {
        name: 'map_task_execution_node_id',
        type: 'string',
        required: false,
        description: `Optional execution node id whose map-task shard list should be paginated with map_task_cursor.`,
      },
      {
        name: 'map_task_limit',
        type: 'integer',
        required: false,
        description: `Max map-task shards to return per map execution node, from 1 to 500. Default 100.`,
      },
      {
        name: 'result_cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous results.next_cursor.`,
      },
      {
        name: 'result_limit',
        type: 'integer',
        required: false,
        description: `Max result files to return, from 1 to 100. Default 25.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_get_file',
    description: `Return access information for a file stored in Latch Data. Returns either a Latch Console link or a presigned download URL depending on the access mode.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `Latch Data URL, for example \`latch://3800.account/results/output.csv\`.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `\`console\` returns a Console link. \`download\` returns a presigned file download URL.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_get_task_logs',
    description: `Fetch or share logs for a workflow task execution. Returns bounded inline log lines by default, or a presigned download URL for full logs when mode is download_url.`,
    params: [
      { name: 'execution_id', type: 'integer', required: true, description: `Latch execution id.` },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'array_attempt',
        type: 'string',
        required: false,
        description: `Optional array task retry attempt.`,
      },
      {
        name: 'array_index',
        type: 'string',
        required: false,
        description: `Optional array task index.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `\`inline\` returns bounded log lines. \`download_url\` returns a presigned URL for downloading the full task log when available.`,
      },
      {
        name: 'task_attempt',
        type: 'string',
        required: false,
        description: `Optional task retry attempt.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: false,
        description: `Optional workflow task/node id. Required for mode='download_url' and usually available for standard tasks.`,
      },
      {
        name: 'task_run_id',
        type: 'string',
        required: false,
        description: `Optional process-style task run id.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_get_workflow_schema',
    description: `Fetch the launch metadata and parameter schema for a workflow. Use this before launching a workflow to understand what parameters are required and their types.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      { name: 'workflow_id', type: 'integer', required: true, description: `Latch workflow id.` },
    ],
  },
  {
    name: 'latchbiomcp_launch_workflow',
    description: `Launch a bioinformatics workflow on Latch. Use get_workflow_schema first to discover required parameters. Returns an execution ID for monitoring progress with list_executions and get_execution.`,
    params: [
      {
        name: 'parameters',
        type: 'object',
        required: true,
        description: `Parameter values matching the workflow schema from get_workflow_schema.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'workflow_id',
        type: 'integer',
        required: true,
        description: `Workflow id to launch.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `AWS region for workflow runtime placement. Options: us-west-2, us-east-1, eu-central-1, eu-west-1.`,
      },
      {
        name: 'src_execution_id',
        type: 'string',
        required: false,
        description: `Optional previous execution id to relaunch from. Use only when intentionally reusing the previous execution's runtime storage/intermediate state. Omit for a normal fresh run.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace/account id that should own the execution. Defaults to the user's default workspace. Leave null unless the user asks to use a specific workspace.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_list_executions',
    description: `List workflow executions in a Latch workspace. Supports filtering by workflow IDs, execution status, and name. Use get_execution for full details on a specific execution.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max executions to return, from 1 to 100. Default 25.`,
      },
      {
        name: 'name_filter',
        type: 'string',
        required: false,
        description: `Optional display-name substring filter.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for pagination. Default 0.`,
      },
      {
        name: 'statuses',
        type: 'string',
        required: false,
        description: `Optional execution statuses to restrict results to.`,
      },
      {
        name: 'workflow_ids',
        type: 'string',
        required: false,
        description: `Optional workflow ids to restrict results to.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace/account id whose executions should be listed. Defaults to the user's default workspace. Leave null unless the user asks to use a specific workspace.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_list_files',
    description: `List the immediate contents of a directory in Latch Data (ldata). Returns children only — does not recurse. Hidden and removed nodes are filtered out, matching what users see in the Latch console. Supports cursor-based pagination.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `Latch Data URL, for example \`latch://3800.account/dir1/foo\`.`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's \`next_cursor\`.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max entries to return per call (1-1000). Default 100.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_list_workflows',
    description: `Discover available bioinformatics workflows on Latch. Lists workspace-specific workflows first, followed by public workflows. Supports text search and cursor-based pagination.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's \`next_cursor\`.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max workflows to return, from 1 to 100. Default 25.`,
      },
      {
        name: 'search_term',
        type: 'string',
        required: false,
        description: `Optional case-insensitive display-name substring filter.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Optional workspace/account id. Defaults to the user's default workspace when omitted. Leave null unless the user asks to use a specific workspace.`,
      },
    ],
  },
  {
    name: 'latchbiomcp_list_workspaces',
    description: `Lists Latch workspaces the current user can access. Returns the default workspace ID and a list of all accessible workspaces with their IDs and display names. If default_workspace_id is null, the user has not finished account setup.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
]
