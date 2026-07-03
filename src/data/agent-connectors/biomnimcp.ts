import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'biomnimcp_create_project',
    description: `Create a new Biomni project in the caller's current workspace. A project is a persistent container with its own file drive where tasks and uploaded files live. Only create a project when the user explicitly asks for a new one; call list_projects first to check if a suitable one already exists.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Human-readable project name. Required.` },
      { name: 'description', type: 'string', required: false, description: `Optional free-text description of the project.` },
      { name: 'metadata', type: 'string', required: false, description: `Optional arbitrary key-value pairs stored alongside the project for your own use (e.g. external system IDs).` },
    ],
  },
  {
    name: 'biomnimcp_list_projects',
    description: `List the caller's projects in the active workspace. Always call this before asking the user to pick a project, rather than asking them to type a project ID from memory. Optionally includes per-project task activity counts.`,
    params: [
      { name: 'include_activity', type: 'boolean', required: false, description: `If true, fetch per-project task counts in parallel and add running_tasks_count and total_tasks_count fields. Costs N extra list_tasks calls (one per project), so defaults to false. Use when the user explicitly asks about activity or in-flight work.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of projects to return. Defaults to 50.` },
    ],
  },
  {
    name: 'biomnimcp_list_result_files',
    description: `List the names and metadata of output files produced by an agent task. Returns file name, size, and MIME type for each result file, but does not provide direct download links — direct the user to the Biomni web app to download files.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The task (session) whose output files to list. Obtain this from start_new_task or send_message. Values look like sess_… — treat them as opaque IDs.` },
    ],
  },
  {
    name: 'biomnimcp_list_tasks',
    description: `List tasks in a project. Returns the tasks belonging to the specified project, up to an optional limit. Use this to discover existing tasks before continuing or reviewing work.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `The project to list tasks from. Required. Values look like opaque IDs — use list_projects to find the right project_id.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of tasks to return. Defaults to 20.` },
    ],
  },
  {
    name: 'biomnimcp_list_workspaces',
    description: `List the workspaces (orgs) the caller belongs to and show which one is currently active. Use this when the user cannot find a project — it may be in another workspace. Returns a list of {id, name, type, is_active} entries plus active_workspace_id.`,
    params: [
    ],
  },
  {
    name: 'biomnimcp_send_message',
    description: `Send a user message to an existing Biomni task and trigger AI agent execution. Optionally attach uploaded files and control tool/thinking visibility per message. To stream the agent's output, call wait_for_next_update a few times after this returns.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `User message text to send to the agent.` },
      { name: 'task_id', type: 'string', required: true, description: `Target task id — get one from start_new_task. Values look like sess_…; treat them as opaque ids.` },
      { name: 'background', type: 'boolean', required: false, description: `If true, return immediately with a pending message and stream with wait_for_next_update. If false, wait until completion and return the final message.` },
      { name: 'file_ids', type: 'string', required: false, description: `Optional list of input file ids to attach to this message. Pass file_id values returned by upload_file.` },
      { name: 'project_id', type: 'string', required: false, description: `Optional project id — used to build the returned biomni_url deep link if the adapter response doesn't already carry one. Omit if you don't need a clickable link; the API call itself does not need it.` },
      { name: 'thinking_visibility', type: 'string', required: false, description: `Per-message override of the task's thinking visibility setting. Accepted values: 'none', 'summary', 'full'. Omit to use the task's current setting.` },
      { name: 'tool_visibility', type: 'string', required: false, description: `Per-message override of the task's tool visibility setting. Accepted values: 'none', 'names_only', 'full'. Omit to use the task's current setting.` },
    ],
  },
  {
    name: 'biomnimcp_start_new_task',
    description: `Auto-create a Biomni task in a project and send the first message in a single call, triggering AI agent execution. Returns both a task_id (for follow-up send_message / wait_for_next_update calls) and a message_id for the agent's first reply. If files were uploaded with upload_file, their file_ids must be passed here explicitly — they are not auto-attached.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `User message text to send as the first message of the new task.` },
      { name: 'project_id', type: 'string', required: true, description: `The project to start the conversation in. Required.` },
      { name: 'background', type: 'boolean', required: false, description: `If true, return immediately with a pending message and stream with wait_for_next_update. If false, wait until completion and return the final message.` },
      { name: 'file_ids', type: 'string', required: false, description: `Optional list of input file ids to attach. Pass the file_id values returned by upload_file here so the agent can see those files — they are not attached automatically.` },
      { name: 'plan_mode', type: 'boolean', required: false, description: `If true, the agent enters plan-mode and produces a PLAN.md, blocking on user approval (PlanReview) before executing. Set to true only when the user has explicitly asked to review the plan first.` },
      { name: 'thinking_visibility', type: 'string', required: false, description: `Task-level thinking visibility setting. Accepted values: 'none', 'summary', 'full'. Omit to use the project default.` },
      { name: 'tool_visibility', type: 'string', required: false, description: `Task-level tool visibility setting. Accepted values: 'none', 'names_only', 'full'. Omit to use the project default.` },
    ],
  },
  {
    name: 'biomnimcp_switch_workspace',
    description: `Switch the caller's active workspace so that subsequent calls (list_projects, create_project, task operations) act in the new workspace. Get workspace ids from list_workspaces. Note: switching only takes effect on OAuth-connected sessions; static API-key connections are bound to a single workspace and cannot switch.`,
    params: [
      { name: 'workspace_id', type: 'string', required: true, description: `The workspace (org) id to switch to — obtain from list_workspaces.` },
    ],
  },
  {
    name: 'biomnimcp_upload_file',
    description: `Upload a small text file (VCF, CSV, TSV, JSON, or code) to a project's drive by passing its content inline as a UTF-8 string. Returns a file_id that can be passed to start_new_task or send_message so the agent treats the file as explicit input. Hard cap of 25 MB on inline content.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `File content as a UTF-8 string. Multi-line is fine. Hard cap of 25 MB.` },
      { name: 'filename', type: 'string', required: true, description: `Name the file will appear under in the project drive (e.g. variants.vcf).` },
      { name: 'project_id', type: 'string', required: true, description: `Target project id — use list_projects to find it.` },
      { name: 'mime_type', type: 'string', required: false, description: `Optional MIME type for the file. Common values: text/csv, application/json, text/tab-separated-values, application/x-vcard (for VCF). Defaults to text/plain.` },
      { name: 'purpose', type: 'string', required: false, description: `File purpose: 'input' (default) or 'output'.` },
    ],
  },
  {
    name: 'biomnimcp_wait_for_next_update',
    description: `Long-poll for the next batch of progress on the agent's current reply, returning only newly-added content blocks since the last call. Call at most ~3 times per turn to stream incremental output; if the task is still running after that, point the user to the Biomni web URL rather than polling indefinitely.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The task_id (conversation handle) returned by start_new_task or send_message. The server resolves it to the latest assistant reply automatically.` },
      { name: 'max_wait_seconds', type: 'integer', required: false, description: `How long the server should hold the connection open waiting for new blocks. Defaults to 15. Clamped to [0, 30] by the server.` },
      { name: 'since_block_index', type: 'integer', required: false, description: `Index of the first content block to return. Pass 0 on the first call; on subsequent calls pass res["cursor"] from the previous response to receive only newly-added blocks.` },
    ],
  },
]
