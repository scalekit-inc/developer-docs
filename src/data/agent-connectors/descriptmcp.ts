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
    name: 'descriptmcp_export_timeline',
    description: `Export a project composition as a timeline file (AAF, SESX, EDL, FCPXML, Premiere XML, or DaVinci Resolve XML) for import into another DAW/NLE.`,
    params: [
      { name: 'format', type: 'string', required: true, description: `Timeline file format.` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project to export from.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL for job completion.`,
      },
      {
        name: 'composition_id',
        type: 'string',
        required: false,
        description: `UUID of a specific composition. Omit to use the first composition.`,
      },
      {
        name: 'create_track_per_file',
        type: 'boolean',
        required: false,
        description: `Generate one EDL/XML track per source media file rather than per script. Defaults to false. Not supported for fcp (FCPXML); rejected when true.`,
      },
      {
        name: 'include_markers',
        type: 'boolean',
        required: false,
        description: `Include markers in formats that support them (EDL, SESX). Defaults to the format-specific default (true for EDL/SESX/FCP/Premiere/DaVinci, false for AAF).`,
      },
      {
        name: 'snap_frame_rates',
        type: 'boolean',
        required: false,
        description: `Premiere / DaVinci Resolve only. When true, snaps to standard broadcast frame rates (24, 25, 30, 50, 60 + NTSC variants). When false, uses the source frame rate. Defaults to true. Rejected when false for other formats.`,
      },
      {
        name: 'strip_spaces',
        type: 'boolean',
        required: false,
        description: `AAF only. Strip spaces from media filenames for Logic Pro compatibility. Defaults to false. Rejected when true for other formats.`,
      },
    ],
  },
  {
    name: 'descriptmcp_export_transcript',
    description: `Export a project composition as a transcript document in txt, markdown, HTML, RTF, or SRT format.`,
    params: [
      { name: 'format', type: 'string', required: true, description: `Transcript format.` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project to export from.`,
      },
      {
        name: 'composition_id',
        type: 'string',
        required: false,
        description: `UUID of a specific composition. Omit to use the first composition.`,
      },
      {
        name: 'include_markers',
        type: 'boolean',
        required: false,
        description: `Include markers in transcript.`,
      },
      {
        name: 'include_speaker_labels',
        type: 'string',
        required: false,
        description: `Speaker label mode. off=none, changes=on speaker change, every_paragraph=every paragraph. Defaults to changes.`,
      },
      {
        name: 'timecodes',
        type: 'object',
        required: false,
        description: `Timecode options. When provided, timecodes are included in the output.`,
      },
    ],
  },
  {
    name: 'descriptmcp_get_drive_info',
    description: `Return the Descript drive (workspace) connected to the current session, including its ID and name.`,
    params: [],
  },
  {
    name: 'descriptmcp_get_project',
    description: `Retrieve detailed information about a Descript project, including its media files and compositions.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `UUID of the project.` },
    ],
  },
  {
    name: 'descriptmcp_import_drive_media',
    description: `Import media files into the Descript drive media library (not a project) via URLs or direct file upload.`,
    params: [
      {
        name: 'add_media',
        type: 'object',
        required: true,
        description: `Map of display name → media entry. Keys can include folder paths (e.g. "Recordings/intro.mp4"). Each entry is either a URL import (provide "url") or a direct upload (provide "content_type" and "file_size"). URL imports and direct uploads accept an optional "language" for transcription.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL to receive job completion notification.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Target folder ID in the drive media library.`,
      },
    ],
  },
  {
    name: 'descriptmcp_import_media',
    description: `Import media into a Descript project from URLs (Google Drive, Dropbox, direct links) or direct file upload.`,
    params: [
      {
        name: 'add_media',
        type: 'object',
        required: true,
        description: `Map of display name → media entry. Keys can include folder paths (e.g. "Recordings/intro.mp4") to organize media into folders in the project. Each entry is one of: a URL import (provide "url"), a direct upload (provide "content_type" and "file_size"), or a multitrack sequence (provide "tracks" array). Use exactly one variant per entry. URL imports and direct uploads accept an optional "language" for transcription.`,
      },
      {
        name: 'add_compositions',
        type: 'array',
        required: false,
        description: `Compositions (timelines) to create from the imported media. Include this when creating a new project so media appears on the timeline. Omit when importing into an existing project unless the user asks to add to the timeline.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL for job completion.`,
      },
      {
        name: 'folder_name',
        type: 'string',
        required: false,
        description: `Folder path to place the new project in (e.g. "Clients/Acme/Videos"). Use "/" to separate nested folders. Only valid when creating a new project (no project_id). Existing folders along the path are reused; missing segments are created automatically. Requires team_access to be set to "edit", "comment", or "view" — projects in folders must be accessible to drive members.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `UUID of an existing project. Mutually exclusive with project_name.`,
      },
      {
        name: 'project_name',
        type: 'string',
        required: false,
        description: `Name for a new project. Mutually exclusive with project_id.`,
      },
      {
        name: 'team_access',
        type: 'string',
        required: false,
        description: `Team access for new projects.`,
      },
      {
        name: 'update_compositions',
        type: 'array',
        required: false,
        description: `Append clips to existing compositions in the target project. Requires project_id.`,
      },
      {
        name: 'workspace_name',
        type: 'string',
        required: false,
        description: `Workspace to create the new project in, matched by name (case-insensitive). Only valid when creating a new project (no project_id). Reserved names: "Personal" (private space, requires team_access "none" or omitted) and "General" (shared drive workspace). "General" and custom workspaces require a shared team_access ("edit", "comment", or "view"); defaults to "view" when omitted. Custom workspaces require the caller to be a workspace member.`,
      },
    ],
  },
  {
    name: 'descriptmcp_list_folders',
    description: `List folders in the Descript drive, optionally scoped to a parent folder.`,
    params: [
      {
        name: 'parent_path',
        type: 'string',
        required: false,
        description: `Parent folder path (e.g. "Clients/Acme"). Returns child folders of this folder. Omit to list root-level folders.`,
      },
    ],
  },
  {
    name: 'descriptmcp_list_jobs',
    description: `List recent Descript jobs with optional filtering by project or job type.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Filter by project UUID.`,
      },
      { name: 'type', type: 'string', required: false, description: `Filter by job type.` },
    ],
  },
  {
    name: 'descriptmcp_list_projects',
    description: `List Descript projects accessible to the authenticated user, with optional filtering and sorting.`,
    params: [
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Filter projects created after this ISO 8601 timestamp.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Filter projects created before this ISO 8601 timestamp.`,
      },
      {
        name: 'created_by',
        type: 'string',
        required: false,
        description: `Filter projects created by this user UUID. Pass \`me\` to filter by the authenticated user.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's next_cursor.`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction (default: desc).`,
      },
      {
        name: 'folder_path',
        type: 'string',
        required: false,
        description: `Filter projects by folder path (e.g. "Clients/Acme/Videos"). Use "/" to separate nested folders. Returns only projects directly inside the deepest folder.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of projects per page (1-100, default 20).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter projects whose name contains this string (case-insensitive).`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field (default: created_at).`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Filter projects updated after this ISO 8601 timestamp.`,
      },
      {
        name: 'updated_before',
        type: 'string',
        required: false,
        description: `Filter projects updated before this ISO 8601 timestamp.`,
      },
    ],
  },
  {
    name: 'descriptmcp_prompt_project_agent',
    description: `Use Descript's AI agent to query, create, or edit a project using a natural language prompt.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Natural language instructions for the agent.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL for job completion.`,
      },
      {
        name: 'composition_id',
        type: 'string',
        required: false,
        description: `Composition to target. Accepts a full UUID, a 5-character short ID from the project's Descript URL, or the project's full Descript URL (e.g. https://web.descript.com/{project_id}/{short_id}). Use get_project to find available composition IDs for this project. Omit to target the whole project.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `AI model override. Omit for default.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `UUID of an existing project to edit. Provide either project_id or project_name, not both.`,
      },
      {
        name: 'project_name',
        type: 'string',
        required: false,
        description: `Name for a new project to create. Provide either project_id or project_name, not both.`,
      },
    ],
  },
  {
    name: 'descriptmcp_publish_project',
    description: `Publish a Descript project composition as video or audio and return a shareable URL.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project to publish.`,
      },
      {
        name: 'access_level',
        type: 'string',
        required: false,
        description: `Desired access level for the published share page. Defaults to the drive default. Fails with 403 if the requested level is not permitted by the drive publish settings.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL for job completion.`,
      },
      {
        name: 'composition_id',
        type: 'string',
        required: false,
        description: `Composition to publish. Accepts a full UUID, a 5-character short ID from the project's Descript URL, or the project's full Descript URL (e.g. https://web.descript.com/{project_id}/{short_id}). Use get_project to find available composition IDs for this project. Defaults to the first composition if omitted.`,
      },
      {
        name: 'media_type',
        type: 'string',
        required: false,
        description: `Media type of the published output (default "Video").`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Resolution for the published output (default determined by project).`,
      },
    ],
  },
  {
    name: 'descriptmcp_report_upload_status',
    description: `Report that a direct upload failed, was aborted, or was abandoned so the import job stops waiting on that file.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `ID of the import job that owns the upload.`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: true,
        description: `Media key (from the import request's add_media / upload_urls) to report.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `failed = the PUT errored; aborted = cancelled in flight; abandoned = never attempted.`,
      },
      {
        name: 'detail',
        type: 'string',
        required: false,
        description: `Optional free-text context (e.g. "HTTP 403 from storage").`,
      },
    ],
  },
  {
    name: 'descriptmcp_wait_for_job',
    description: `Poll a Descript job until it completes, streaming progress updates, with an optional timeout.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The job_id returned by import_media, prompt_project_agent, publish_project, or export_timeline.`,
      },
      {
        name: 'wait_seconds',
        type: 'number',
        required: false,
        description: `Seconds to poll for completion (default 300, max 300). Set 0 to return immediately.`,
      },
    ],
  },
]
