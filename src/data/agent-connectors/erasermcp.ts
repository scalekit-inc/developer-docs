import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'erasermcp_add_or_remove_template_or_reference',
    description: `Attach or detach an EXISTING file as a template (style anchor) or reference (terminology/concept anchor) of a preset.

Use this tool when:
  - the user has an existing workspace they want to promote into a preset (e.g. 'use this file as a template for the System Design preset'),
  - you need to detach a file from a preset,
  - or you just created a template via \`create_template_or_reference\` WITHOUT a \`presetId\` and need to attach it now.

To create a NEW template/reference file and attach it in a single call, use \`create_template_or_reference\` with \`presetId\` set — that avoids leaving a detached file in the team. When removing a file leaves it orphaned from all presets, the file is archived automatically.

Templates and references are inherently team-scoped (no private/personal templates exist); the preset choice is the only scoping decision.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'kind', type: 'string', required: true, description: `No description.` },
      { name: 'operation', type: 'string', required: true, description: `No description.` },
      { name: 'presetId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_create_diagram',
    description: `PREFERRED for creating a diagram from a natural-language prompt — Eraser's AI picks the diagram type, generates the DSL, and renders it.

DO NOT pre-classify the user's request into a diagram type yourself. Pass \`text\` only (plus destination params) and LEAVE \`diagramType\` UNSET unless the user EXPLICITLY named a type (e.g. 'make this a sequence diagram', 'use a cloud architecture diagram'). Eraser's render service has type-specific heuristics and will pick a better type from the prompt than your guess will, especially on ambiguous asks like 'show how X works' or 'diagram the architecture'.

BEFORE calling this tool, if the user has not already specified the destination, ASK them these questions (skip any the user has already answered):
  1. 'Should I create a new file for this diagram, or add it to an existing file?' — if existing, ask which fileId (or use one they just referenced).
  2. If NEW file: 'Should the file be private (just for you) or shared with your team in a folder?'
  3. If shared in a folder: 'Which folder?' (or offer to place it at the team root).
Do NOT call list_folders or get_folder to invent a destination yourself — ask the user. Pick destination params based on the answers:
  - Existing file → pass targetFileId
  - New private file → omit targetFileId, omit folderId, do NOT set isTeamFile
  - New shared file at team root → omit targetFileId, omit folderId, set isTeamFile: true
  - New shared file in a folder → omit targetFileId, pass folderId (this implies shared)

Returns the new diagram's id in the \`diagrams[].id\` field so a follow-up update_diagram/manually_update_diagram call does NOT need a list_diagrams round-trip. Prefer over manually_create_diagram unless you already have hand-written DSL/JSON.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `No description.` },
      { name: 'attachments', type: 'array', required: false, description: `No description.` },
      { name: 'background', type: 'boolean', required: false, description: `No description.` },
      { name: 'colorMode', type: 'string', required: false, description: `No description.` },
      { name: 'diagramType', type: 'string', required: false, description: `OPTIONAL — LEAVE THIS EMPTY by default. Only set it when the user EXPLICITLY names a diagram type (e.g. 'make this a sequence diagram', 'use a cloud architecture diagram', 'turn it into an ERD'). When omitted, Eraser's render service picks the diagram type from the prompt text using diagram-type-specific heuristics and (if applicable) the preset/template in scope — that selection is usually better than guessing from the prompt yourself. Do NOT pre-classify the user's request into a diagram type just because the value is available in your schema; spurious type-locking produces worse diagrams than letting Eraser choose, especially on ambiguous prompts ('show how X works', 'diagram the architecture'). On update_diagram, leave this empty as well — the existing diagram's type is preserved by default.` },
      { name: 'direction', type: 'string', required: false, description: `No description.` },
      { name: 'folderId', type: 'string', required: false, description: `OPTIONAL — leave this empty by default. Only set it when the user EXPLICITLY names a folder to place the new file in (e.g. "put it in the Engineering folder"). Do NOT call list_folders or get_folder to "pick a sensible folder" — when omitted, the file is created at the team root and the user can move it themselves. Spurious folder discovery wastes tokens and produces unexpected file placement.` },
      { name: 'format', type: 'string', required: false, description: `No description.` },
      { name: 'gitContexts', type: 'array', required: false, description: `No description.` },
      { name: 'imageQuality', type: 'string', required: false, description: `No description.` },
      { name: 'includeImage', type: 'boolean', required: false, description: `Set true only when you need a PNG URL to embed elsewhere. Not needed for in-app viewing — prefer the returned fileUrl/diagramUrl. Omitted from the response by default.` },
      { name: 'isTeamFile', type: 'boolean', required: false, description: `Only honored by create_diagram when a NEW file is being created (i.e. targetFileId is omitted). When true, the new file is shared with the team (non-private); when false, the new file is private to the caller. Required on plans that don't support private files. Ignored by update_diagram, and ignored on create_diagram when targetFileId is set (because no new file is created).` },
      { name: 'presetId', type: 'string', required: false, description: `No description.` },
      { name: 'priorRequestId', type: 'string', required: false, description: `No description.` },
      { name: 'styleMode', type: 'string', required: false, description: `No description.` },
      { name: 'targetFileId', type: 'string', required: false, description: `No description.` },
      { name: 'templateId', type: 'string', required: false, description: `No description.` },
      { name: 'theme', type: 'string', required: false, description: `No description.` },
      { name: 'title', type: 'string', required: false, description: `No description.` },
      { name: 'typeface', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_create_document',
    description: `PREFERRED for populating a document from a natural-language prompt — Eraser's AI generates the markdown. Only callable on a file with an empty document body; if the file already has content, this returns an error and you should call update_document (for natural-language edits) or manually_update_document (to replace verbatim) instead. Prefer over manually_create_document unless you have pre-written markdown to insert verbatim.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'text', type: 'string', required: true, description: `No description.` },
      { name: 'presetId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_create_file',
    description: `Create an empty file, or duplicate an existing file when sourceFileId is provided. Never populates content from a prompt — use create_document/create_diagram for AI generation.

BEFORE calling this tool, if the user has not specified destination, ASK:
  1. 'Should the file be private (just for you) or shared with your team in a folder?'
  2. If shared in a folder: 'Which folder?' (or offer to place it at the team root).
Do NOT call list_folders to invent a destination — ask the user. Pick params:
  - Private file → omit folderId, do NOT set isTeamFile
  - Shared at team root → omit folderId, set isTeamFile: true
  - Shared in a folder → pass folderId (this implies shared)`,
    params: [
      { name: 'folderId', type: 'string', required: false, description: `OPTIONAL — omit unless the user EXPLICITLY names a folder. When omitted, the file is created at the team root. Do NOT call list_folders to "pick a folder".` },
      { name: 'isTeamFile', type: 'boolean', required: false, description: `When true, the file is shared with the team (non-private). Required on plans that do not support private files.` },
      { name: 'linkAccess', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'sourceFileId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_create_folder',
    description: `Create a new folder.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'order', type: 'number', required: false, description: `No description.` },
      { name: 'parentFolderId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_create_preset',
    description: `Create a new preset (the team-level container for AI styling: templates, references, and rules). After creating, the typical next steps to make the preset useful are:
  1. Add example files as templates/references via \`add_or_remove_template_or_reference\` (or \`create_template_or_reference\` to spin up a fresh template file from a prompt). Templates anchor the visual style; references anchor terminology and concepts.
  2. Set the preset's rules via \`update_rules\` (e.g. 'always use dark backgrounds', 'prefer sequence diagrams for auth flows').
  3. Optionally mark the preset as the team default by calling \`update_preset\` with \`isDefault: true\`.
This tool only creates the empty preset shell; an agent that stops here will produce a preset with no styling power. Chain the steps above unless the user explicitly only wanted the shell.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'isDefault', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_create_template_or_reference',
    description: `Create a new template (style anchor) or reference (terminology/concept anchor) file and, when \`presetId\` is provided, attach it to that preset in a single call. Auto-publishes the file's first version.

Templates and references are ALWAYS team-scoped resources under AI Presets — there is no concept of a private/personal template or reference. DO NOT ask the user 'team template or private template?' — that is not a real choice. The only sharing question is which preset to attach it to.

Typical use:
  - User says 'make this a template under <preset>' → pass \`presetId\` so the file is attached immediately.
  - User says 'make a template from this file' without naming a preset → ASK them which preset before calling (or list_presets to show options). DO NOT silently omit \`presetId\`; an unattached template is invisible to AI generation and almost never what the user wanted.
  - User says 'duplicate this file as a template' → pass \`sourceFileId\` (and \`presetId\`).

When \`presetId\` is omitted the response includes a warning that the file is detached; treat that as a signal to follow up with \`add_or_remove_template_or_reference\` rather than leaving it dangling.`,
    params: [
      { name: 'kind', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'presetId', type: 'string', required: false, description: `No description.` },
      { name: 'sourceFileId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_delete_diagram',
    description: `Delete a diagram from a file.`,
    params: [
      { name: 'diagramId', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_delete_document',
    description: `Clear a file's document body to an empty markdown document.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_delete_file',
    description: `Archive a file.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_delete_folder',
    description: `Delete a folder. Rejects when the folder is not empty.`,
    params: [
      { name: 'folderId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_delete_preset',
    description: `Delete a preset. Rejects when the preset has any rules, templates, or references.`,
    params: [
      { name: 'presetId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_export_diagram',
    description: `Render a canvas diagram to PNG or JPEG and return a temporary image URL. Tell the user to download it from the returned imageUrl.`,
    params: [
      { name: 'diagramId', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'background', type: 'boolean', required: false, description: `No description.` },
      { name: 'format', type: 'string', required: false, description: `No description.` },
      { name: 'imageQuality', type: 'string', required: false, description: `No description.` },
      { name: 'theme', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_export_document',
    description: `Export a file's markdown document body as a downloadable artifact.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'returnAs', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_export_file',
    description: `Returns the Eraser file URL for PDF export. NOTE: programmatic PDF export is not yet available via MCP — this returns a link for the user to export from the Eraser app's export menu, not a downloadable PDF. For a diagram image, use export_diagram; for the document body as markdown, use export_document.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'area', type: 'string', required: false, description: `No description.` },
      { name: 'pageOrientation', type: 'string', required: false, description: `No description.` },
      { name: 'pageSize', type: 'string', required: false, description: `No description.` },
      { name: 'returnAs', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_get_diagram',
    description: `Fetch a diagram's metadata and DSL/JSON code. For freeform diagrams, set includeFreeformDefinition: true to get the full scene structure (elements, connections, titles). Need a PNG image of the diagram? Use export_diagram instead.`,
    params: [
      { name: 'diagramId', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'includeFreeformDefinition', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_get_document',
    description: `Fetch the full markdown body of a file's document.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_get_file',
    description: `Fetch a file's metadata, document outline (headers), and the list of diagrams in it.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_get_folder',
    description: `Fetch a folder by id.`,
    params: [
      { name: 'folderId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_get_me',
    description: `Fetch the current user, active team, and team memberships.`,
    params: [
    ],
  },
  {
    name: 'erasermcp_get_preset',
    description: `Fetch a preset including its rules, templates, and references.`,
    params: [
      { name: 'presetId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_get_template_or_reference',
    description: `Fetch a template/reference's metadata, document outline, and diagram list.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_list_diagrams',
    description: `List the diagrams contained in a file.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_list_files',
    description: `List files in the team workspace, optionally scoped to a folder.`,
    params: [
      { name: 'author', type: 'string', required: false, description: `No description.` },
      { name: 'cursor', type: 'string', required: false, description: `No description.` },
      { name: 'folderId', type: 'string', required: false, description: `No description.` },
      { name: 'limit', type: 'number', required: false, description: `No description.` },
      { name: 'sort', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_list_folders',
    description: `List folders. Pass \`parentFolderId\` to scope to direct children of a folder (or \`null\` for top-level only). Pass \`nameContains\` to resolve a folder the user names by string (e.g. 'the Engineering folder') without paging through the entire tree. Combining the two narrows further (e.g. top-level folders containing 'eng').`,
    params: [
      { name: 'nameContains', type: 'string', required: false, description: `No description.` },
      { name: 'parentFolderId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_list_presets',
    description: `List the team's presets. Pass \`nameContains\` to resolve a preset the user names by string (e.g. 'the Marketing preset') without scanning the full list — much cheaper in context tokens.`,
    params: [
      { name: 'nameContains', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_list_teams',
    description: `List the teams the current user belongs to (OAuth only).`,
    params: [
    ],
  },
  {
    name: 'erasermcp_manually_create_diagram',
    description: `ADVANCED — most callers should use create_diagram instead. This tool writes a caller-supplied diagram definition VERBATIM into a new diagram; no AI runs.

For DSL diagrams (flowchart-dsl, sequence-dsl, etc.) pass the DSL source as \`code\`. For freeform diagrams pass a freeform definition as \`code\` — either JSON ({"title"?: string, "elements": [ ... ]}) or the equivalent JSX; it is parsed and laid out through the freeform render pass (text measurement, connection routing, etc.).

Use ONLY WHEN: the user gave you a literal diagram definition to paste, you are converting from a non-Eraser source (other tool's export, programmatic generation), or you need byte-exact output for a reason the AI path cannot satisfy. For any natural-language description of what the diagram should contain (e.g. 'a sequence diagram showing checkout'), use create_diagram — it picks the diagram type, generates the definition, and renders it for a fraction of the output tokens of composing it yourself.`,
    params: [
      { name: 'code', type: 'string', required: true, description: `No description.` },
      { name: 'diagramType', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_manually_create_document',
    description: `ADVANCED — most callers should use create_document instead. This tool populates an empty file's document body with caller-supplied markdown VERBATIM; no AI runs and the bytes you pass are exactly what gets stored.

Only callable on a file with an empty document body; if the file already has content, call manually_update_document (verbatim overwrite) or update_document (targeted AI edit) instead.

USE ONLY WHEN: the user gave you literal markdown to paste, you are converting from another format (HTML, Confluence export, programmatic generation), or you need byte-exact output. For any natural-language description of what the document should say, use create_document.`,
    params: [
      { name: 'document', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_manually_update_diagram',
    description: `ADVANCED — most callers should use update_diagram instead. This tool writes a diagram's complete DSL/JSON (or freeform edits) VERBATIM; no AI runs and the bytes you pass are exactly what gets stored.

USE ONLY WHEN:
  - the user gave you literal DSL/JSON they want pasted as-is,
  - you are converting from a non-Eraser source (other tool's export, programmatic generation),
  - or you need byte-exact output for a reason an AI refinement cannot satisfy.

DO NOT use this tool just because the current diagram code happens to be in your context (e.g. you just called create_diagram and want to apply a small refinement). For ANY user request phrased as a natural-language edit ('remove the X group', 'add a step', 'change the color', 'rename Y to Z') — even when you already have the full DSL in front of you — call update_diagram instead. Re-emitting the entire DSL here to apply a conceptual edit costs the user large amounts of output tokens, risks accidental edits to unrelated parts, and gives a worse UX than letting Eraser apply the targeted change.`,
    params: [
      { name: 'diagramId', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'code', type: 'string', required: false, description: `No description.` },
      { name: 'freeformEdits', type: 'array', required: false, description: `No description.` },
      { name: 'targetFileId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_manually_update_document',
    description: `ADVANCED — most callers should use update_document instead. This tool replaces a file's document body with caller-supplied markdown VERBATIM; no AI runs and the WHOLE body is overwritten (no targeted block edits, no preservation of unrelated sections beyond what you re-emit).

USE ONLY WHEN:
  - the user gave you literal markdown they want pasted as-is,
  - you are converting from a non-Eraser source (HTML, Confluence export, programmatic generation),
  - or you need byte-exact output for a reason an AI refinement cannot satisfy.

DO NOT use this tool just because the current document markdown happens to be in your context. For ANY user request phrased as a natural-language edit ('add a section', 'fix the wording', 'remove that paragraph') — even when you already have the full body in front of you — call update_document instead. Re-emitting the entire body here to apply a conceptual edit costs the user large amounts of output tokens, risks accidental edits to unrelated sections, and gives a worse UX than letting Eraser apply targeted block edits.`,
    params: [
      { name: 'document', type: 'string', required: true, description: `No description.` },
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_manually_update_file',
    description: `Replace a file's document markdown and/or diagram code in one call. No AI — caller supplies exact markdown/DSL/JSON.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'diagrams', type: 'array', required: false, description: `No description.` },
      { name: 'document', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_publish_template_or_reference',
    description: `Publish a new version of a template/reference file.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_search',
    description: `Full-text and semantic search across files or diagrams. Omit 'kind' for content search (finds matching blocks). Use kind: 'file' only to look up a file by name (no block content returned). Use kind: 'diagram' to search within diagram code/titles.`,
    params: [
      { name: 'kind', type: 'string', required: false, description: `Controls what is searched and how results are grouped. Omit (default) for full-content search — finds any text across all files and returns individual matching blocks with their file context. Use kind: 'file' ONLY to find a file by name — results are grouped by file with no per-block content. DO NOT use kind: 'file' if you want to find content within files; it will not return the content you need. Use kind: 'diagram' to search within diagram code/titles only.` },
      { name: 'limit', type: 'number', required: false, description: `No description.` },
      { name: 'offset', type: 'number', required: false, description: `No description.` },
      { name: 'queries', type: 'array', required: false, description: `Submit up to 5 related query variants in one call. Results are merged and de-duplicated server-side, returning a single ranked list. Prefer this over making multiple separate search tool calls for related terms. When provided, the top-level \`query\` field is ignored.` },
      { name: 'query', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_select_team',
    description: `Set the active team for the session when the user belongs to multiple teams (OAuth only).`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_diagram',
    description: `USE THIS for any user request that describes the change in natural language — verbs like 'add', 'remove', 'change', 'rename', 'recolor', 'make it more X', etc. Eraser's AI applies the change to the existing diagram in place; you only send the short instruction (e.g. \`text: "remove the External Integrations group"\`), NOT the full new DSL.

IMPORTANT: pick this tool even when the full diagram code is already in your context (e.g. from the previous create_diagram or get_diagram response). Re-emitting the entire DSL via manually_update_diagram to apply a one-line conceptual edit is the WRONG default — it wastes a large number of output tokens, increases the chance of accidental edits/typos, and gives a worse UX than letting Eraser apply a targeted change.

Only fall back to manually_update_diagram when the user gave you literal code to paste, you are converting from a non-Eraser format, or you need byte-exact output that the AI rewrite path cannot guarantee.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'text', type: 'string', required: true, description: `No description.` },
      { name: 'attachments', type: 'array', required: false, description: `No description.` },
      { name: 'background', type: 'boolean', required: false, description: `No description.` },
      { name: 'colorMode', type: 'string', required: false, description: `No description.` },
      { name: 'diagramId', type: 'string', required: false, description: `No description.` },
      { name: 'diagramType', type: 'string', required: false, description: `OPTIONAL — LEAVE THIS EMPTY by default. Only set it when the user EXPLICITLY names a diagram type (e.g. 'make this a sequence diagram', 'use a cloud architecture diagram', 'turn it into an ERD'). When omitted, Eraser's render service picks the diagram type from the prompt text using diagram-type-specific heuristics and (if applicable) the preset/template in scope — that selection is usually better than guessing from the prompt yourself. Do NOT pre-classify the user's request into a diagram type just because the value is available in your schema; spurious type-locking produces worse diagrams than letting Eraser choose, especially on ambiguous prompts ('show how X works', 'diagram the architecture'). On update_diagram, leave this empty as well — the existing diagram's type is preserved by default.` },
      { name: 'direction', type: 'string', required: false, description: `No description.` },
      { name: 'folderId', type: 'string', required: false, description: `OPTIONAL — leave this empty by default. Only set it when the user EXPLICITLY names a folder to place the new file in (e.g. "put it in the Engineering folder"). Do NOT call list_folders or get_folder to "pick a sensible folder" — when omitted, the file is created at the team root and the user can move it themselves. Spurious folder discovery wastes tokens and produces unexpected file placement.` },
      { name: 'format', type: 'string', required: false, description: `No description.` },
      { name: 'gitContexts', type: 'array', required: false, description: `No description.` },
      { name: 'imageQuality', type: 'string', required: false, description: `No description.` },
      { name: 'includeImage', type: 'boolean', required: false, description: `Set true only when you need a PNG URL to embed elsewhere. Not needed for in-app viewing — prefer the returned fileUrl/diagramUrl. Omitted from the response by default.` },
      { name: 'isTeamFile', type: 'boolean', required: false, description: `Only honored by create_diagram when a NEW file is being created (i.e. targetFileId is omitted). When true, the new file is shared with the team (non-private); when false, the new file is private to the caller. Required on plans that don't support private files. Ignored by update_diagram, and ignored on create_diagram when targetFileId is set (because no new file is created).` },
      { name: 'presetId', type: 'string', required: false, description: `No description.` },
      { name: 'priorRequestId', type: 'string', required: false, description: `No description.` },
      { name: 'styleMode', type: 'string', required: false, description: `No description.` },
      { name: 'templateId', type: 'string', required: false, description: `No description.` },
      { name: 'theme', type: 'string', required: false, description: `No description.` },
      { name: 'title', type: 'string', required: false, description: `No description.` },
      { name: 'typeface', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_document',
    description: `USE THIS for any user request that describes the change in natural language — verbs like 'add a section', 'rewrite the intro', 'fix the typo', 'remove the deprecated paragraph', etc. Eraser's AI applies targeted block-level edits to the existing markdown; you only send the short instruction, NOT the full rewritten document.

IMPORTANT: pick this tool even when the full document markdown is already in your context (e.g. from a previous create_document or get_file response). Re-emitting the entire body via manually_update_document to apply a conceptual edit is the WRONG default — it wastes large amounts of output tokens, risks accidental edits/typos in unrelated sections, and gives a worse UX than letting Eraser apply a targeted change.

Only fall back to manually_update_document when the user gave you literal markdown to paste, you are converting from another format, or you need byte-exact output the AI rewrite path cannot guarantee.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'text', type: 'string', required: true, description: `No description.` },
      { name: 'presetId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_file',
    description: `Update file metadata (title, folder, sharing). When applyTemplate is provided, AI fills the file's document and diagrams from a preset template.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'applyTemplate', type: 'object', required: false, description: `No description.` },
      { name: 'folderId', type: 'string', required: false, description: `No description.` },
      { name: 'isTeamFile', type: 'boolean', required: false, description: `No description.` },
      { name: 'linkAccess', type: 'string', required: false, description: `No description.` },
      { name: 'title', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_folder',
    description: `Rename or move a folder, or bulk-apply a link-sharing setting to every file inside it (recursively). Note: folders do not store linkAccess themselves — to change sharing you MUST pass both \`linkAccess\` and \`applySharingToDescendantFiles: true\` together.`,
    params: [
      { name: 'folderId', type: 'string', required: true, description: `No description.` },
      { name: 'applySharingToDescendantFiles', type: 'boolean', required: false, description: `Required (set to true) when supplying \`linkAccess\`. Rewrites the linkAccess setting on every file in this folder and all subfolders recursively.` },
      { name: 'linkAccess', type: 'string', required: false, description: `Link-sharing setting to apply to every file under this folder. Folders themselves do not store linkAccess, so this MUST be paired with \`applySharingToDescendantFiles: true\`; passing linkAccess alone is rejected with an invalid-params error.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'parentFolderId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_preset',
    description: `Rename a preset or update its metadata (\`name\`, \`description\`, \`isDefault\`). Does NOT modify rules or templates/references — use \`update_rules\` and \`add_or_remove_template_or_reference\` for those.`,
    params: [
      { name: 'presetId', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'isDefault', type: 'boolean', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_rules',
    description: `Add, update, or remove rules on a preset in a single batched call. Rules are natural-language instructions the AI will follow when generating diagrams/documents under this preset (e.g. 'use dark theme', 'all auth flows should be sequence diagrams'). Typically called as step 3 of the create-preset chain (after \`create_preset\` and \`add_or_remove_template_or_reference\`), but can be called any time to tune an existing preset.`,
    params: [
      { name: 'operations', type: 'array', required: true, description: `No description.` },
      { name: 'presetId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'erasermcp_update_template_or_reference',
    description: `Rename a template or reference file.`,
    params: [
      { name: 'fileId', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
    ],
  },
]
