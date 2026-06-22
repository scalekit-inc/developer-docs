import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'descriptmcp_cancel_job',
    description: `Cancel a queued or running Descript job by its ID.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `UUID of the job to cancel.` },
    ],
  },
  {
    name: 'descriptmcp_export_transcript',
    description: `Export a project composition as a transcript document in txt, markdown, HTML, or RTF format.`,
    params: [
      { name: 'format', type: 'string', required: true, description: `Transcript format.` },
      { name: 'project_id', type: 'string', required: true, description: `UUID of the project to export from.` },
      { name: 'composition_id', type: 'string', required: false, description: `UUID of a specific composition. Omit to use the first composition.` },
      { name: 'include_markers', type: 'boolean', required: false, description: `Include markers in transcript.` },
      { name: 'include_speaker_labels', type: 'string', required: false, description: `Speaker label mode. off=none, changes=on speaker change, every_paragraph=every paragraph. Defaults to changes.` },
      { name: 'timecodes', type: 'object', required: false, description: `Timecode options. When provided, timecodes are included in the output.` },
    ],
  },
  {
    name: 'descriptmcp_get_project',
    description: `Retrieve detailed information about a Descript project, including its media files and compositions.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `UUID of the project.` },
    ],
  },
  {
    name: 'descriptmcp_import_media',
    description: `Import media into a Descript project from URLs (Google Drive, Dropbox, direct links) or direct file upload.`,
    params: [
      { name: 'add_media', type: 'object', required: true, description: `Map of display name → media entry. Keys can include folder paths (e.g. "Recordings/intro.mp4") to organize media into folders in the project. Each entry is one of: a URL import (provide "url"), a direct upload (provide "content_type" and "file_size"), or a multitrack sequence (provide "tracks" array). Use exactly one variant per entry. URL imports and direct uploads accept an optional "language" for transcription.` },
      { name: 'add_compositions', type: 'array', required: false, description: `Compositions (timelines) to create from the imported media. Include this when creating a new project so media appears on the timeline. Omit when importing into an existing project unless the user asks to add to the timeline.` },
      { name: 'callback_url', type: 'string', required: false, description: `Webhook URL for job completion.` },
      { name: 'folder_name', type: 'string', required: false, description: `Folder path to place the new project in (e.g. "Clients/Acme/Videos"). Use "/" to separate nested folders. Only valid when creating a new project (no project_id). Existing folders along the path are reused; missing segments are created automatically. Requires team_access to be set to "edit", "comment", or "view" — projects in folders must be accessible to drive members.` },
      { name: 'project_id', type: 'string', required: false, description: `UUID of an existing project. Mutually exclusive with project_name.` },
      { name: 'project_name', type: 'string', required: false, description: `Name for a new project. Mutually exclusive with project_id.` },
      { name: 'team_access', type: 'string', required: false, description: `Team access for new projects.` },
    ],
  },
  {
    name: 'descriptmcp_list_jobs',
    description: `List recent Descript jobs with optional filtering by project or job type.`,
    params: [
      { name: 'project_id', type: 'string', required: false, description: `Filter by project UUID.` },
      { name: 'type', type: 'string', required: false, description: `Filter by job type.` },
    ],
  },
  {
    name: 'descriptmcp_list_projects',
    description: `List Descript projects accessible to the authenticated user, with optional filtering and sorting.`,
    params: [
      { name: 'created_after', type: 'string', required: false, description: `Filter projects created after this ISO 8601 timestamp.` },
      { name: 'created_before', type: 'string', required: false, description: `Filter projects created before this ISO 8601 timestamp.` },
      { name: 'created_by', type: 'string', required: false, description: `Filter projects created by this user UUID. Pass \`me\` to filter by the authenticated user.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from a previous response's next_cursor.` },
      { name: 'direction', type: 'string', required: false, description: `Sort direction (default: desc).` },
      { name: 'folder_path', type: 'string', required: false, description: `Filter projects by folder path (e.g. "Clients/Acme/Videos"). Use "/" to separate nested folders. Returns only projects directly inside the deepest folder.` },
      { name: 'limit', type: 'number', required: false, description: `Number of projects per page (1-100, default 20).` },
      { name: 'name', type: 'string', required: false, description: `Filter projects whose name contains this string (case-insensitive).` },
      { name: 'sort', type: 'string', required: false, description: `Sort field (default: created_at).` },
      { name: 'updated_after', type: 'string', required: false, description: `Filter projects updated after this ISO 8601 timestamp.` },
      { name: 'updated_before', type: 'string', required: false, description: `Filter projects updated before this ISO 8601 timestamp.` },
    ],
  },
  {
    name: 'descriptmcp_prompt_project_agent',
    description: `Use Descript's AI agent to query, create, or edit a project using a natural language prompt.`,
    params: [
      { name: 'prompt', type: 'string', required: true, description: `Natural language instructions for the agent.` },
      { name: 'callback_url', type: 'string', required: false, description: `Webhook URL for job completion.` },
      { name: 'composition_id', type: 'string', required: false, description: `Composition to target. Accepts a full UUID, a 5-character short ID from the project's Descript URL, or the project's full Descript URL (e.g. https://web.descript.com/{project_id}/{short_id}). Use get_project to find available composition IDs for this project. Omit to target the whole project.` },
      { name: 'conversation_id', type: 'string', required: false, description: `Conversation ID (UUID) from a previous agent job to continue that conversation. Omit to start a new conversation. The conversation_id is returned in the job result.` },
      { name: 'model', type: 'string', required: false, description: `AI model override. Omit for default.` },
      { name: 'project_id', type: 'string', required: false, description: `UUID of an existing project to edit. Provide either project_id or project_name, not both.` },
      { name: 'project_name', type: 'string', required: false, description: `Name for a new project to create. Provide either project_id or project_name, not both.` },
    ],
  },
  {
    name: 'descriptmcp_publish_project',
    description: `Publish a Descript project composition as video or audio and return a shareable URL.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `UUID of the project to publish.` },
      { name: 'access_level', type: 'string', required: false, description: `Desired access level for the published share page. Defaults to the drive default. Fails with 403 if the requested level is not permitted by the drive publish settings.` },
      { name: 'callback_url', type: 'string', required: false, description: `Webhook URL for job completion.` },
      { name: 'composition_id', type: 'string', required: false, description: `Composition to publish. Accepts a full UUID, a 5-character short ID from the project's Descript URL, or the project's full Descript URL (e.g. https://web.descript.com/{project_id}/{short_id}). Use get_project to find available composition IDs for this project. Defaults to the first composition if omitted.` },
      { name: 'media_type', type: 'string', required: false, description: `Media type of the published output (default "Video").` },
      { name: 'resolution', type: 'string', required: false, description: `Resolution for the published output (default determined by project).` },
    ],
  },
  {
    name: 'descriptmcp_wait_for_job',
    description: `Poll a Descript job until it completes, streaming progress updates, with an optional timeout.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `The job_id returned by import_media, prompt_project_agent, or publish_project.` },
      { name: 'wait_seconds', type: 'number', required: false, description: `Seconds to poll for completion (default 300, max 300). Set 0 to return immediately.` },
    ],
  },
]
