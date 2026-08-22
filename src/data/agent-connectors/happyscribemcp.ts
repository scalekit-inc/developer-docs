import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'happyscribemcp_create_folder',
    description: `Create a new folder. Specify a parent via parent_folder_id; if omitted, the folder is created at the root of the workspace, or in your private folder when the workspace ("team folders") is disabled for the organization. Use list_transcriptions or get_folder_hierarchy to look up the parent folder ID first.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Folder name` },
      {
        name: 'parent_folder_id',
        type: 'integer',
        required: false,
        description: `Parent folder ID. Omit to create at the default location (workspace root, or your private folder when team folders are disabled).`,
      },
    ],
  },
  {
    name: 'happyscribemcp_create_summary_template',
    description: `Create a new meeting summary template. The body is markdown where each ## heading becomes a section in the generated summary. Optionally include meeting context to give the AI additional instructions about the type of meeting.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Template body in markdown. Use ## headings to define sections (e.g. "## Key Points\\n\\nCapture main topics\\n\\n## Action Items\\n\\nList next steps")`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Template name (max 100 characters)`,
      },
      {
        name: 'meeting_context',
        type: 'string',
        required: false,
        description: `Optional context about the meeting type, sent to the AI alongside the template (e.g. "This is a weekly engineering standup")`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Who can see and use this template: "private" (only you, default) or "workspace" (all team members)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_create_transcription',
    description: `Creates a transcription or subtitles from a publicly accessible media file URL (e.g., a direct link to an audio/video file, a YouTube or Vimeo link, or a public cloud storage share link). The file is imported and processed in the background - check progress and retrieve the result with list_transcriptions or get_transcription. To transcribe local files, direct the user to upload them at https://www.happyscribe.com.`,
    params: [
      {
        name: 'language',
        type: 'string',
        required: true,
        description: `Language code (e.g., en-US, es-ES, fr-FR) or "auto" for automatic language detection. For best results, specify the language when known.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of a publicly accessible media file to transcribe (e.g., https://example.com/video.mp4 or a YouTube link).`,
      },
      {
        name: 'folder_id',
        type: 'integer',
        required: false,
        description: `ID of the folder to place the transcription in. Uses default folder if not provided. Use folder_path instead if you want to specify a folder by path.`,
      },
      {
        name: 'folder_path',
        type: 'string',
        required: false,
        description: `Path to the folder to place the transcription in (e.g., "/All files/My Folder/Subfolder"). Uses default folder if not provided.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `Type of operation: transcription or subtitles (default: transcription)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_delete_folder',
    description: `Soft-delete a folder. The folder must be empty (no kept files or subfolders) — to delete a non-empty folder, first move or delete its contents using move_transcriptions or delete_transcriptions.`,
    params: [{ name: 'id', type: 'integer', required: true, description: `Folder ID to delete` }],
  },
  {
    name: 'happyscribemcp_delete_summary_template',
    description: `Delete a summary template. Only the template creator or a workspace admin can delete it. The template is soft-deleted and can be recovered within 10 days.`,
    params: [{ name: 'id', type: 'integer', required: true, description: `Template ID to delete` }],
  },
  {
    name: 'happyscribemcp_delete_transcriptions',
    description: `Soft-delete one or more transcriptions (move to trash, restorable by the user). Accepts up to 50 transcription IDs per call. Authorization is checked per transcription; if any fails, no transcriptions are deleted. Permanent deletion is not exposed via this connector.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of transcription IDs (hashed_id) to soft-delete (max 50)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_conversation',
    description: `Get the full content of an AI conversation, including all messages and responses.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `Conversation ID (from list_conversations)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_folder_hierarchy',
    description: `Get the folder hierarchy with transcription counts. Shows accessible folders organized by location (Team, Private, Shared with me). USE THIS when list_transcriptions returns more results than you can effectively browse and you need to understand how transcriptions are organized. Then use list_transcriptions with folder_path to browse specific folders.`,
    params: [
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Optional. Filter by location: workspace (team folders), private (your personal folders), or shared (folders shared with you by others).`,
      },
      {
        name: 'max_depth',
        type: 'integer',
        required: false,
        description: `Optional. Maximum folder depth to return (default: unlimited). Depth 1 = immediate children only, 2 = children and grandchildren, etc.`,
      },
      {
        name: 'root_path',
        type: 'string',
        required: false,
        description: `Optional. Start from this folder path instead of root (e.g., "/Projects/2024"). Only returns folders under this path. When set, output is flat (not grouped by location).`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_glossary',
    description: `Get the full contents of a glossary, including all custom terms and their definitions.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `Glossary ID (from list_glossaries)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_helpdesk_article',
    description: `Get the full content of a HappyScribe help article by ID. Use search_helpdesk first to find relevant article IDs.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Help article ID (from search_helpdesk results)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_meeting_diagnostics',
    description: `Get technical diagnostics for a meeting recording: Notetaker join status, recording state, processing errors, and timeline events. Use this when a meeting recording is missing or has issues.`,
    params: [
      {
        name: 'calendar_event_id',
        type: 'integer',
        required: true,
        description: `Calendar event ID (from list_calendar_events)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_project',
    description: `Get details of a specific project: name, instructions, notes, files, and members. Use list_projects first to find the project ID.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The project ID (from list_projects)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_summary_template',
    description: `Get the full details of a summary template by ID (for user/workspace templates) or slug (for system templates). Returns the name, markdown body, sections, meeting context, and visibility.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Template ID (for user or workspace templates)`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `Template slug (for system templates, e.g. "general_meeting_notes")`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_transcription',
    description: `Get detailed information about a specific transcription`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The transcription ID (hashed_id)`,
      },
      {
        name: 'display_mode',
        type: 'string',
        required: false,
        description: `Display mode: full_text (default, complete transcription), summary (AI-generated summary), or metadata_only (no content).`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_transcriptions',
    description: `Get detailed information about multiple transcriptions at once. Use this after listing transcriptions to get full content/summaries for multiple files efficiently.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of transcription IDs (hashed_id) to retrieve (max 5)`,
      },
      {
        name: 'display_mode',
        type: 'string',
        required: false,
        description: `Display mode: full_text (default, complete transcription), summary (AI-generated summary), or metadata_only (no content).`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_video_frames',
    description: `Extract visual frames (screenshots) from a video recording at specific timestamps. Use this when the conversation references something visual — a screen share, presentation, diagram, or UI — and you need to see what was on screen. Returns the frames as images. Only works for video recordings (meetings, screen recordings); audio-only files have no frames.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The transcription ID (hashed_id)`,
      },
      {
        name: 'timestamps',
        type: 'array',
        required: true,
        description: `Timestamps in seconds to extract frames from (max 3). Use timestamps from the transcription content to target moments of interest.`,
      },
      {
        name: 'skip_cache',
        type: 'boolean',
        required: false,
        description: `Skip cached results and force a fresh extraction. Use only if a previous result was wrong.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_get_workspace',
    description: `Get information about the current workspace: name, plan, member count, storage usage, and feature flags.`,
    params: [],
  },
  {
    name: 'happyscribemcp_list_calendar_events',
    description: `List calendar events (scheduled meetings) with their recording status. Use this to see what meetings are scheduled, which will be recorded, and prepare for upcoming meetings. Supports date filtering to find meetings in specific time ranges (past, present, or future). Can filter by series_ids to get all instances of recurring meeting series.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default: 20, max: 100)`,
      },
      {
        name: 'series_ids',
        type: 'array',
        required: false,
        description: `Filter by meeting series IDs (ical_uid) to get all instances of specific recurring meetings`,
      },
      {
        name: 'start_time_after',
        type: 'string',
        required: false,
        description: `Return only events starting on or after this ISO-8601 date-time (e.g., "2025-01-01" or "-P7D" for last 7 days)`,
      },
      {
        name: 'start_time_before',
        type: 'string',
        required: false,
        description: `Return only events starting before this ISO-8601 date-time`,
      },
    ],
  },
  {
    name: 'happyscribemcp_list_conversations',
    description: `List AI conversations in a project. Conversations are threaded AI chat sessions within a project context, used to analyze and query transcriptions.`,
    params: [
      {
        name: 'project_id',
        type: 'integer',
        required: true,
        description: `Project ID (from list_projects) to list conversations for`,
      },
    ],
  },
  {
    name: 'happyscribemcp_list_glossaries',
    description: `List custom glossaries in the workspace. Glossaries define custom vocabulary (names, jargon, technical terms) that improve transcription accuracy.`,
    params: [],
  },
  {
    name: 'happyscribemcp_list_projects',
    description: `List projects in the workspace. Projects group transcriptions, instructions, and AI conversations around a specific goal (e.g., a research study, client engagement, story).`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results (default: 20, max: 100)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: active, completed, archived, or all (default: active)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_list_read_files',
    description: `List files already read this month and show remaining quota. Some plans have a monthly limit on how many unique files can be read with display_mode: "full_text" — once a file has been read, re-reading it is always free. Summaries and metadata are also always free.`,
    params: [],
  },
  {
    name: 'happyscribemcp_list_summary_templates',
    description: `List meeting summary templates available in the workspace. Returns your private templates, shared workspace templates created by teammates, and built-in system templates. Templates define the structure and sections of AI-generated meeting summaries.`,
    params: [],
  },
  {
    name: 'happyscribemcp_list_transcriptions',
    description: `List transcriptions accessible to the user with optional filtering. Returns results ordered by creation date (newest first). START HERE to see recent transcriptions. When the user asks about THEIR OWN transcriptions (e.g. "my files", "my meetings", "what have I been working on") ALWAYS pass scope: 'mine'. Without scope: 'mine', this tool returns every file the user can technically access via folder permissions, which is usually NOT what "my files" means. Supports filtering by folder, location, date range, person, company, and pagination.`,
    params: [
      {
        name: 'company_domain',
        type: 'string',
        required: false,
        description: `Filter by company domain (e.g., "acme.com").`,
      },
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Filter by company name. Returns transcriptions where anyone from that company was involved.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Return only transcriptions created on or after this ISO-8601 date-time`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Return only transcriptions created before this ISO-8601 date-time`,
      },
      {
        name: 'file_origin',
        type: 'string',
        required: false,
        description: `Filter by file origin: 'recording' (captured live) or 'upload' (user-uploaded file).`,
      },
      {
        name: 'folder_id',
        type: 'integer',
        required: false,
        description: `Filter by folder ID. Returns transcriptions in this folder only.`,
      },
      {
        name: 'folder_path',
        type: 'string',
        required: false,
        description: `Filter by folder path (e.g., "/My Folder/Subfolder"). Returns transcriptions in this folder only.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default: 20, max: 250)`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter by location: workspace (team files), private (your personal files), or shared (files shared with you by others).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination (default: 0)`,
      },
      {
        name: 'person_email',
        type: 'string',
        required: false,
        description: `Filter by person email (matches primary and secondary emails).`,
      },
      {
        name: 'person_name',
        type: 'string',
        required: false,
        description: `Filter by person name. Returns transcriptions where this person was involved.`,
      },
      {
        name: 'preview_mode',
        type: 'string',
        required: false,
        description: `Preview mode: none (default), summary (AI-generated summary), or beginning (first ~500 words).`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Use scope: 'mine' to return only transcriptions associated with the current user — files they own, participated in, or that were directly shared with them.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_move_transcriptions',
    description: `Move one or more transcriptions to a different folder in the same organization. Accepts up to 50 transcription IDs per call. Use list_transcriptions or get_folder_hierarchy to look up the destination folder ID first. Cross-organization moves are not supported. Authorization is checked per transcription and on the destination folder; if any check fails, no transcriptions are moved.`,
    params: [
      {
        name: 'folder_id',
        type: 'integer',
        required: true,
        description: `Target folder ID. Use get_folder_hierarchy to find folder IDs.`,
      },
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `Array of transcription IDs (hashed_id) to move (max 50)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_reassign_speakers',
    description: `Reassign speakers for one or more time ranges in a transcription. The server splits affected paragraphs at word boundaries and assigns the given speaker label to all words in each range. Adjacent paragraphs with the same speaker are merged automatically. Use this to fix diarization errors where paragraphs contain speech from multiple people. Returns the resulting speaker timeline so you can verify the changes.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Transcription ID (hashed_id).` },
      {
        name: 'segments',
        type: 'array',
        required: true,
        description: `Time ranges to reassign. Each segment specifies a time range and the speaker to assign.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_regenerate_summary',
    description: `Regenerate the meeting summary for a transcription. Optionally specify a template to use — otherwise the existing template (or the default from the resolution chain) is used. The summary is generated asynchronously; use get_transcription to check the result.`,
    params: [
      {
        name: 'transcription_id',
        type: 'string',
        required: true,
        description: `Transcription ID (hashed_id)`,
      },
      {
        name: 'template_id',
        type: 'integer',
        required: false,
        description: `Template ID to use (for user/workspace templates). Omit to keep the current template.`,
      },
      {
        name: 'template_slug',
        type: 'string',
        required: false,
        description: `Template slug to use (for system templates, e.g. "discovery_call"). Omit to keep the current template.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_rename_folder',
    description: `Rename a folder. The folder ID can be found using get_folder_hierarchy.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Folder ID to rename` },
      { name: 'name', type: 'string', required: true, description: `New folder name` },
    ],
  },
  {
    name: 'happyscribemcp_rename_speakers',
    description: `Rename one or more speakers in a transcription. Pass a mapping of current speaker label -> new speaker label. All paragraphs whose speaker matches a key are updated. Match is exact (case-sensitive). Use get_transcription first to see the current speaker labels.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Transcription ID (hashed_id).` },
      {
        name: 'mapping',
        type: 'object',
        required: true,
        description: `Mapping from current speaker label to new speaker label. Keys must match speaker labels exactly (case-sensitive). Values are the new labels.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_rename_transcription',
    description: `Rename a transcription file. Updates the display name shown in the dashboard and folder listings.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Transcription ID (hashed_id)` },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New display name for the transcription`,
      },
    ],
  },
  {
    name: 'happyscribemcp_replace_text_in_transcript',
    description: `Find and replace exact text in a transcription. Replaces every occurrence of \`find\` with \`replace\` across all paragraphs. Optionally constrain to a time window with \`from_seconds\` and \`to_seconds\` — only occurrences whose word-level timestamps intersect that window are replaced. Use this to fix consistent typos, names, or product mentions. For speaker label changes, use rename_speakers instead.`,
    params: [
      {
        name: 'find',
        type: 'string',
        required: true,
        description: `Exact text to find (case-sensitive). Cannot be empty.`,
      },
      { name: 'id', type: 'string', required: true, description: `Transcription ID (hashed_id).` },
      {
        name: 'replace',
        type: 'string',
        required: true,
        description: `Replacement text. Can be empty (deletes the matched text).`,
      },
      {
        name: 'from_seconds',
        type: 'number',
        required: false,
        description: `Optional lower bound (in seconds) of the time window.`,
      },
      {
        name: 'to_seconds',
        type: 'number',
        required: false,
        description: `Optional upper bound (in seconds) of the time window.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_retranscribe',
    description: `Re-runs automatic transcription (ASR) on the existing media of a transcription already in the workspace, replacing the current transcript in place (the transcription keeps its ID). Use this to fix a file that was transcribed in the wrong language, or to re-process it after its settings changed. Only finished automatic transcriptions with their media still available can be retranscribed. Retranscription runs in the background - poll with get_transcription (display_mode: metadata_only) until the state is "done".`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The transcription ID (hashed_id) of the file to retranscribe.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Language code to transcribe in (e.g., en-US, es-ES, fr-FR). Defaults to the transcription's current language when omitted.`,
      },
    ],
  },
  {
    name: 'happyscribemcp_search_helpdesk',
    description: `Search HappyScribe helpdesk articles to answer questions about product features, policies, and how-to guides. Use this when the user asks about how HappyScribe works, product documentation, feature explanations, pricing details, data policies (e.g. "how long are files stored?", "is my data used for training?"), account settings, troubleshooting, or any question that might be answered in help documentation. This searches published help center articles and returns relevant excerpts with links to the full articles.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query for helpdesk articles (e.g., "how long are files stored", "data training policy", "export formats")`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default: 5, max: 10)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_search_transcriptions',
    description: `Search for exact text/keywords within transcription content (like grep). Use this to find specific names, product names, or exact phrases. For browsing by topic, date, or category, use get_folder_hierarchy + list_transcriptions instead.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query to find in transcription content`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Return only transcriptions created on or after this ISO-8601 date-time`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Return only transcriptions created before this ISO-8601 date-time`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default: 20)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip for pagination (default: 0)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_set_meeting_template',
    description: `Configure which summary template to use for future meetings. With scope "meeting": sets the template on a calendar event (and all upcoming instances if recurring). With scope "default": sets the template as your personal default for all future meetings.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `"meeting" to set on this meeting/series, "default" to set as your personal default`,
      },
      {
        name: 'calendar_event_id',
        type: 'integer',
        required: false,
        description: `Calendar event ID (required when scope is "meeting", get from list_calendar_events)`,
      },
      {
        name: 'template_id',
        type: 'integer',
        required: false,
        description: `Template ID (for user/workspace templates)`,
      },
      {
        name: 'template_slug',
        type: 'string',
        required: false,
        description: `Template slug (for system templates)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_update_project_notes',
    description: `Update the AI memory for a project. Use this to persist key findings, decisions, and patterns discovered across conversations. Keep notes concise, structured, and factual. Only use when you discover something important that should persist across conversations.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `The project ID` },
      {
        name: 'notes',
        type: 'string',
        required: true,
        description: `The updated AI memory content (replaces existing memory entirely)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_update_summary_template',
    description: `Update an existing summary template. Only the template creator can edit it. Pass only the fields you want to change — omitted fields are left unchanged.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Template ID` },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `New template body in markdown`,
      },
      {
        name: 'meeting_context',
        type: 'string',
        required: false,
        description: `New meeting context (pass empty string to clear)`,
      },
      { name: 'name', type: 'string', required: false, description: `New template name` },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `New visibility setting`,
      },
    ],
  },
  {
    name: 'happyscribemcp_upload_file',
    description: `Upload an audio or video file to HappyScribe for transcription. Supports direct file upload (base64) or transcription from a public URL. Returns the transcription ID which can be used with get_transcription to check status and retrieve results.`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: false,
        description: `Base64-encoded file content (mutually exclusive with url)`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `Filename with extension (e.g. "meeting.mp4"). Required when using file_content.`,
      },
      {
        name: 'folder_id',
        type: 'integer',
        required: false,
        description: `Folder ID to place the transcription in. Defaults to the user's root folder.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Language code (e.g. "en", "fr", "es"). Defaults to workspace default if omitted.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the transcription. Defaults to the filename.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Public URL of the audio/video file to transcribe (mutually exclusive with file_content)`,
      },
    ],
  },
  {
    name: 'happyscribemcp_verify_quotes',
    description: `REQUIRED for quote extraction: Verifies quote text against the actual transcription content and returns precise timestamps and working links to each quote in the editor. This is the ONLY reliable way to get accurate quote positions — never generate links or timestamps from memory as they will be incorrect. Always call this tool immediately after identifying quotes to extract. Counts as a file read (same quota as get_transcription with full_text).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The transcription ID (hashed_id)`,
      },
      {
        name: 'quotes',
        type: 'array',
        required: true,
        description: `Array of quotes to verify (max 20 per request)`,
      },
    ],
  },
]
