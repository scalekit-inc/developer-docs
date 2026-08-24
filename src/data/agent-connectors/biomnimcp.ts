import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'biomnimcp_create_project',
    description: `Create a new Biomni project in the caller's current workspace. A project is a persistent container with its own file drive where tasks and uploaded files live. Only create a project when the user explicitly asks for a new one; call list_projects first to check if a suitable one already exists.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Human-readable project name. Required.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of the project.`,
      },
      {
        name: 'metadata',
        type: 'string',
        required: false,
        description: `Optional arbitrary key-value pairs stored alongside the project for your own use (e.g. external system IDs).`,
      },
    ],
  },
  {
    name: 'biomnimcp_list_files',
    description: `List the input files already uploaded to a project. Returns the files a user added through the Biomni web app's project files panel (or earlier via upload_file) — the same files the agent can read during any task in that project. This is how you discover the file_id of an already-uploaded file: files are NOT attached to a task automatically, so pass the returned file_id values in the file_ids argument of start_new_task or send_message to attach them. Only input files are listed here — result files the agent produced are listed by list_result_files(task_id) instead.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The project whose files to list. Required.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max files to return (1-100, default 50). When the result has has_more: true the project holds more files than were returned; raise limit to see them.`,
      },
    ],
  },
  {
    name: 'biomnimcp_list_projects',
    description: `List the caller's projects in the active workspace. Always call this before asking the user to pick a project, rather than asking them to type a project ID from memory. Optionally includes per-project task activity counts.`,
    params: [
      {
        name: 'include_activity',
        type: 'boolean',
        required: false,
        description: `If true, fetch per-project task counts in parallel and add running_tasks_count and total_tasks_count fields. Costs N extra list_tasks calls (one per project), so defaults to false. Use when the user explicitly asks about activity or in-flight work.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of projects to return. Defaults to 50.`,
      },
    ],
  },
  {
    name: 'biomnimcp_list_result_files',
    description: `List the names and metadata of output files produced by an agent task. Returns file name, size, and MIME type for each result file, but does not provide direct download links — direct the user to the Biomni web app to download files.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task (session) whose output files to list. Obtain this from start_new_task or send_message. Values look like sess_… — treat them as opaque IDs.`,
      },
    ],
  },
  {
    name: 'biomnimcp_list_tasks',
    description: `List tasks in a project. Returns the tasks belonging to the specified project, up to an optional limit. Use this to discover existing tasks before continuing or reviewing work.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The project to list tasks from. Required. Values look like opaque IDs — use list_projects to find the right project_id.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of tasks to return. Defaults to 20.`,
      },
    ],
  },
  {
    name: 'biomnimcp_list_workspaces',
    description: `List the workspaces (orgs) the caller belongs to and show which one is currently active. Use this when the user cannot find a project — it may be in another workspace. Returns a list of {id, name, type, is_active} entries plus active_workspace_id.`,
    params: [],
  },
  {
    name: 'biomnimcp_request_review',
    description: `Run a Scientific Review of a completed task — same as the "Review" button in the Biomni web app. A reviewer agent re-reads the finished task and checks it for scientific accuracy, correct use of the data/materials, unsupported claims (hallucinations), and stated limitations. Only worth running on a task the agent has already completed — a review of an idle or still-running task has nothing to look at yet. The review runs as a background job and returns immediately with status "running" — it does NOT return the review itself. When it finishes, the review is shown on the task's page in the Biomni web app; point the user to the returned biomni_url to read it there. wait_for_next_update is not the way to fetch it. Calling this while a review is already running is a no-op; calling it again after one finished starts a fresh review that replaces the previous one.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task (session) to review — the conversation handle from start_new_task / send_message.`,
      },
    ],
  },
  {
    name: 'biomnimcp_send_message',
    description: `Send a user message to an existing Biomni task and trigger AI agent execution. Optionally attach uploaded files. To stream the agent's output, call wait_for_next_update a few times after this returns.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `User message text to send to the agent.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `Target task id — get one from start_new_task. Values look like sess_…; treat them as opaque ids.`,
      },
      {
        name: 'file_ids',
        type: 'string',
        required: false,
        description: `Optional list of input file ids to attach to this message. Pass file_id values returned by upload_file.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Optional project id — used to build the returned biomni_url deep link if the adapter response doesn't already carry one. Omit if you don't need a clickable link; the API call itself does not need it.`,
      },
    ],
  },
  {
    name: 'biomnimcp_start_new_task',
    description: `Auto-create a Biomni task in a project and send the first message in a single call, triggering AI agent execution. Returns both a task_id (for follow-up send_message / wait_for_next_update calls) and a message_id for the agent's first reply. If files were uploaded with upload_file, their file_ids must be passed here explicitly — they are not auto-attached.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `User message text to send as the first message of the new task.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The project to start the conversation in. Required.`,
      },
      {
        name: 'auto_mode',
        type: 'boolean',
        required: false,
        description: `Run the task in Auto mode (default False). In Auto mode the agent never pauses to ask the user mid-run: the interaction gates it would normally block on — clarifying questions, plan approval, and Skill-load confirmations — resolve automatically so the task goes from start to finish unattended. Set True when the user wants a hands-off / autonomous run, or is not available to answer follow-ups. Auto mode only skips these user-input gates — it does not change auth, billing, or safety.`,
      },
      {
        name: 'file_ids',
        type: 'string',
        required: false,
        description: `Optional list of input file ids to attach. Pass the file_id values returned by upload_file here so the agent can see those files — they are not attached automatically.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Optional model tier for the new task — 'standard', 'fast', or 'max' (Max mode, the highest-capability model). Omit to use the account default (standard). Pass 'max' only when the user asked for the strongest model / Max mode.`,
      },
      {
        name: 'task_name',
        type: 'string',
        required: false,
        description: `Optional human-readable name for the new task. When set, it is used verbatim as the task title and bypasses the automatic naming from the first message. Omit to let Biomni auto-generate a title from message.`,
      },
    ],
  },
  {
    name: 'biomnimcp_switch_workspace',
    description: `Switch the caller's active workspace so that subsequent calls (list_projects, create_project, task operations) act in the new workspace. Get workspace ids from list_workspaces. Note: switching only takes effect on OAuth-connected sessions; static API-key connections are bound to a single workspace and cannot switch.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `The workspace (org) id to switch to — obtain from list_workspaces.`,
      },
    ],
  },
  {
    name: 'biomnimcp_upload_file',
    description: `Upload a small text file (VCF, CSV, TSV, JSON, or code) to a project's drive by passing its content inline as a UTF-8 string. Returns a file_id that can be passed to start_new_task or send_message so the agent treats the file as explicit input. Hard cap of 25 MB on inline content.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `File content as a UTF-8 string. Multi-line is fine. Hard cap of 25 MB.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Name the file will appear under in the project drive (e.g. variants.vcf).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Target project id — use list_projects to find it.`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: false,
        description: `Optional MIME type for the file. Common values: text/csv, application/json, text/tab-separated-values, application/x-vcard (for VCF). Defaults to text/plain.`,
      },
    ],
  },
  {
    name: 'biomnimcp_wait_for_next_update',
    description: `Long-poll for the next batch of progress on the agent's current reply, returning only newly-added content blocks since the last call. Call at most ~3 times per turn to stream incremental output; if the task is still running after that, point the user to the Biomni web URL rather than polling indefinitely.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task_id (conversation handle) returned by start_new_task or send_message. The server resolves it to the latest assistant reply automatically.`,
      },
      {
        name: 'max_wait_seconds',
        type: 'integer',
        required: false,
        description: `How long the server should hold the connection open waiting for new blocks. Defaults to 15. Clamped to [0, 30] by the server.`,
      },
      {
        name: 'since_block_index',
        type: 'integer',
        required: false,
        description: `Index of the first content block to return. Pass 0 on the first call; on subsequent calls pass res["cursor"] from the previous response to receive only newly-added blocks.`,
      },
    ],
  },
]
