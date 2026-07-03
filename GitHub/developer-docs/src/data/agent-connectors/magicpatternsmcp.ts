import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'magicpatternsmcp_create_design',
    description: `Creates a new Magic Patterns design. With a prompt, kicks off AI generation (poll get_design_status to track progress). Without a prompt, creates a blank design with scaffold files instantly. Optionally fork an existing design via templateId, and specify a design system by name or ID.`,
    params: [
      {
        name: 'designSystem',
        type: 'string',
        required: false,
        description: `Optional design system name (e.g. 'Shadcn', 'MUI'). Resolved case-insensitively. designSystemId takes precedence if both provided.`,
      },
      {
        name: 'designSystemId',
        type: 'string',
        required: false,
        description: `Optional design system ID. Use list_design_systems to discover IDs.`,
      },
      {
        name: 'imageUrls',
        type: 'array',
        required: false,
        description: `Optional image URLs as visual references (only used with prompt).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional name for the design. Defaults to 'Untitled'.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Optional natural language prompt for AI generation. If omitted, a blank design with scaffold files is created instantly.`,
      },
      {
        name: 'templateId',
        type: 'string',
        required: false,
        description: `Optional editor ID of an existing design to fork as a template. Get the ID from the design URL or via get_editor_id_from_url.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_create_new_artifact',
    description: `Creates a new artifact by cloning an existing artifact, setting it as the active artifact for the design. Use this before making file changes with write_artifact_files so the user can revert to the previous artifact. Always get the current active artifact ID from get_design_status or get_artifact first.`,
    params: [
      {
        name: 'artifactId',
        type: 'string',
        required: true,
        description: `The artifact ID to clone from (typically the active artifact from get_artifact or get_design_status).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A name for this artifact version (shown in the design timeline).`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_get_artifact',
    description: `Gets the active artifact for a design, including its ID and list of files. Always call this (or get_design_status) to get the latest active artifact before reading files or creating a new artifact branch.`,
    params: [
      {
        name: 'editorId',
        type: 'string',
        required: true,
        description: `The editor ID of the design to retrieve the active artifact for.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_get_design_status',
    description: `Gets the current status of a design: whether AI generation is active, the active artifact ID, and available files. Call this before starting new work on an existing design, and to poll for completion after create_design (with prompt) or send_prompt. Returns isGenerating, activeArtifactId, and availableFiles.`,
    params: [
      {
        name: 'editorId',
        type: 'string',
        required: true,
        description: `The editor ID from create_design or get_editor_id_from_url. Use this to identify which design to check status for.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_get_editor_id_from_url',
    description: `Resolves a Magic Patterns URL to an editor ID. Use this when the user shares a Magic Patterns link and you need the editorId for subsequent operations like send_prompt or get_design_status. Supported formats: "magicpatterns.com/c/<id>", "https://www.magicpatterns.com/c/<id>", "project-<slug>.magicpatterns.app", "magicpatterns.com/s/<canvasId>?nodeIds=<nodeId>".`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The Magic Patterns URL to resolve to an editor ID. Supported formats: magicpatterns.com/c/<id>, https://www.magicpatterns.com/c/<id>, project-<slug>.magicpatterns.app, magicpatterns.com/s/<canvasId>?nodeIds=<nodeId>.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_list_design_systems',
    description: `Lists the design systems available to the authenticated user, including built-in presets (Base, Shadcn, MUI) and any custom design systems. Use this to resolve a design system name to its ID before calling create_design.`,
    params: [],
  },
  {
    name: 'magicpatternsmcp_list_version_history',
    description: `Lists the artifact version history for a design, returning the most recent 20 versions with their artifact IDs, version labels, and titles. Use skip to paginate backwards. Each version corresponds to a snapshot of the design's code at a point in time.`,
    params: [
      {
        name: 'editorId',
        type: 'string',
        required: true,
        description: `The editor ID of the design whose version history to list.`,
      },
      {
        name: 'skip',
        type: 'number',
        required: false,
        description: `Number of recent versions to skip for pagination. Defaults to 0 (most recent). Increment by 20 to paginate backwards through version history.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_publish_artifact',
    description: `Compiles an artifact's source files and sets it as the active artifact for the design. This is the final step in the code-first workflow — it bundles files for preview, updates the active artifact in the editor, and adds a version entry to the design timeline.`,
    params: [
      {
        name: 'artifactId',
        type: 'string',
        required: true,
        description: `The artifact ID to compile and publish.`,
      },
      {
        name: 'editorId',
        type: 'string',
        required: true,
        description: `The editor ID of the design this artifact belongs to.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_read_artifact_files',
    description: `Reads the contents of one or more files from an artifact. Always read files before making changes with write_artifact_files. The code is meant as a starting point and should be adapted to the user's project style, frameworks, and conventions.`,
    params: [
      {
        name: 'artifactId',
        type: 'string',
        required: true,
        description: `The artifact ID to read files from. Obtain this from get_artifact or get_design_status.`,
      },
      {
        name: 'fileNames',
        type: 'array',
        required: true,
        description: `Array of file names or paths to read from the artifact. Example: ["App.tsx", "components/Button.tsx"].`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_read_recent_message_history',
    description: `Reads the recent chat item history for a design, returning the last 10 chat items (user prompts, AI responses, artifact versions, edits). Use the skip parameter to paginate backwards. Code contents are omitted; use read_artifact_files for full file contents.`,
    params: [
      {
        name: 'editorId',
        type: 'string',
        required: true,
        description: `The editor ID of the design to read chat history from.`,
      },
      {
        name: 'skip',
        type: 'number',
        required: false,
        description: `Number of recent items to skip for pagination. Defaults to 0 (most recent). Increment by 10 to paginate backwards through history.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_send_prompt',
    description: `Sends a natural language prompt to the Magic Patterns AI for an existing design. The AI generates or updates code and returns immediately with a requestId. Call get_design_status to poll until isGenerating is false. Generation typically takes 2-10 minutes; poll no more than once every 60 seconds.`,
    params: [
      {
        name: 'editorId',
        type: 'string',
        required: true,
        description: `The editor ID of the design to update.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `A natural language description of what to create or change.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_write_artifact_files',
    description: `Creates or overwrites one or more files in an artifact. If a file exists it will be replaced; if it does not exist it will be created. This only saves source files — call publish_artifact after finishing all file changes to compile and activate the artifact.`,
    params: [
      {
        name: 'artifactId',
        type: 'string',
        required: true,
        description: `The artifact ID to write files to.`,
      },
      { name: 'files', type: 'array', required: true, description: `Array of files to write.` },
    ],
  },
]
