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
    name: 'magicpatternsmcp_create_design_system',
    description: `Creates a new, blank design system owned by the authenticated user and returns its ID plus editor URL. Seeds an empty initial version so files can be written into it immediately via write_design_system_files. This creates a BLANK design system; forking from an existing one is not supported.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new design system, e.g. 'Acme Design System'.`,
      },
      {
        name: 'logo',
        type: 'string',
        required: false,
        description: `Optional logo URL for the design system. Defaults to a placeholder image if omitted.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_create_inspiration_document',
    description: `Creates a Magic Patterns inspiration document and returns a shareable magicpatterns.com/inspiration/<id> link that renders 1-8 design concepts side by side. Concepts can be declared as placeholders (name/description only) and filled in later with inspiration_add_variant, or published fully in one call by including html inline for each concept.`,
    params: [
      {
        name: 'files',
        type: 'array',
        required: true,
        description: `The 1-8 concepts to publish or declare. Each entry is {"name": "...", "description": "...", "html": "..."}; omit html to declare a placeholder concept to fill later via inspiration_add_variant.`,
      },
      {
        name: 'baseline',
        type: 'object',
        required: false,
        description: `Optional baseline the variants diverge from: a faithful recreation of the current UI plus pinned invariants. Shape: {"html": "...", "focus": "...", "sharedCopy": "...", "baselineStyle": "..."}. Only html is required.`,
      },
      {
        name: 'repositoryUrl',
        type: 'string',
        required: false,
        description: `Optional GitHub repository URL the concepts were generated from, kept for context.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional short label for what the concepts explore, e.g. 'Projects list empty state'.`,
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
        description: `A short title for this version, phrased as the change about to be made (e.g. 'Swap hero CTA to solid variant'). Shown in the design timeline and versions dropdown.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional longer note on what is about to change and why, shown above the version in chat. Prefer describing what actually shipped via publish_artifact's description instead; use this for a session that may not reach publish.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_create_slide_deck',
    description: `Creates a new Magic Patterns slide deck and kicks off AI generation. A slide deck is a 16:9, full-bleed, one-slide-at-a-time React presentation where each slide maps to a screen in the canvas. A prompt is required; generation is long-running, so poll get_design_status rather than waiting synchronously.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Natural language description of the slide deck to generate, e.g. 'A 10-slide startup pitch deck for a fintech company'.`,
      },
      {
        name: 'designSystem',
        type: 'string',
        required: false,
        description: `Optional design system name (e.g. 'Shadcn', 'MUI'). Resolved case-insensitively. designSystemId takes precedence if both are provided.`,
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
        description: `Optional image URLs as visual references.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional name for the slide deck. Defaults to 'Untitled'.`,
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
    name: 'magicpatternsmcp_get_design_system',
    description: `Resolves a design system's active artifact and lists its files. Design systems are collaborative, so the active artifact ID can change between calls; always call this first rather than reusing a cached artifact ID. Returns the artifactId (to pass as baseArtifactId to write_design_system_files), the persisted files, and whether there are unpublished changes.`,
    params: [
      {
        name: 'designSystemId',
        type: 'string',
        required: true,
        description: `The design system ID (ds-...). Use list_design_systems to discover available design systems.`,
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
    name: 'magicpatternsmcp_get_inspiration_document',
    description: `Loads a Magic Patterns inspiration document by its ID. An inspiration document is a set of design concepts (variants), each a self-contained HTML sketch of a UI direction. Use this to check whether concepts are ready, or to fetch a concept's current html before revising it with inspiration_update_variant.`,
    params: [
      {
        name: 'inspirationId',
        type: 'string',
        required: true,
        description: `The Magic Patterns inspiration document ID (the <id> in magicpatterns.com/inspiration/<id>).`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_inspiration_add_variant',
    description: `Fills in one concept of an existing Magic Patterns inspiration document with its self-contained HTML. Use after create_inspiration_document to stream concepts in one at a time: the concept renders live on the shared page as soon as its html arrives, and the document flips to 'ready' once every concept is filled.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `The full, self-contained HTML document (non-empty).`,
      },
      {
        name: 'inspirationId',
        type: 'string',
        required: true,
        description: `The inspiration document ID returned by create_inspiration_document.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional update to the concept's design direction.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional update to the concept's name.`,
      },
      {
        name: 'variantId',
        type: 'string',
        required: false,
        description: `The concept ID to fill, from create_inspiration_document. Omit to fill the first still-empty concept.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_inspiration_clear_variants',
    description: `Resets every concept of an existing Magic Patterns inspiration document back to an empty placeholder, dropping each concept's html and its pre-created 'Iterate' room. Use this to replace all concepts: clear the document, then stream fresh concepts back in with inspiration_add_variant targeting the returned concept IDs.`,
    params: [
      {
        name: 'inspirationId',
        type: 'string',
        required: true,
        description: `The inspiration document ID returned by create_inspiration_document.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_inspiration_update_variant',
    description: `Revises a single already-filled concept of a Magic Patterns inspiration document in place, replacing its html (and optionally its name/description). Use to update a subset of concepts without touching the others; the concept's 'Iterate in Magic Patterns' room is refreshed so it builds from the new html.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: true,
        description: `The full, self-contained HTML document (non-empty).`,
      },
      {
        name: 'inspirationId',
        type: 'string',
        required: true,
        description: `The inspiration document ID.`,
      },
      {
        name: 'variantId',
        type: 'string',
        required: true,
        description: `The concept ID to revise, from get_inspiration_document. Targets an existing filled concept (unlike inspiration_add_variant, which fills empty placeholders).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional update to the concept's design direction.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional update to the concept's name.`,
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
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A summary of what changed in this version, written like a commit message in the past tense describing what actually shipped, e.g. 'Swapped the hero CTA to the solid Button variant and dropped the legacy grid'. Always provide this: collaborators open the design without having seen the session, and this is the only prose explaining what changed.`,
      },
    ],
  },
  {
    name: 'magicpatternsmcp_publish_design_system',
    description: `Publishes the design system's active artifact as a new immutable version. Strict: refuses if the active artifact has validation errors from write_design_system_files; clear all validationErrors first. Returns the new version (major.minor) and whether it is backwards-compatible with the previously published version (a breaking change, such as a removed component or prop, bumps the major version).`,
    params: [
      {
        name: 'designSystemId',
        type: 'string',
        required: true,
        description: `The design system ID (ds-...).`,
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
    name: 'magicpatternsmcp_read_design_system_files',
    description: `Reads the contents of one or more files from a design system's active artifact, such as components/<Name>/index.tsx, index.css, tailwind.config.js, or rules/<slug>.md. Call get_design_system first to discover available file names, and always read before editing.`,
    params: [
      {
        name: 'designSystemId',
        type: 'string',
        required: true,
        description: `The design system ID (ds-...).`,
      },
      {
        name: 'fileNames',
        type: 'array',
        required: true,
        description: `Array of file names/paths to read, as listed by get_design_system. Example: ["components/Button/index.tsx", "index.css"].`,
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
  {
    name: 'magicpatternsmcp_write_design_system_files',
    description: `Creates or overwrites files in a design system. Incoming files are validated, merged onto the existing artifact (existing files are preserved), compiled, and activated immediately. Components must use the complete trio: components/<Name>/index.tsx, components/<Name>/<Name>.previews.tsx, and components/<Name>/Context.md. Pass the artifactId from get_design_system as baseArtifactId to detect drift; a 409 means someone else changed the design system in the meantime.`,
    params: [
      {
        name: 'designSystemId',
        type: 'string',
        required: true,
        description: `The design system ID (ds-...).`,
      },
      {
        name: 'files',
        type: 'array',
        required: true,
        description: `Array of files to create or overwrite, e.g. [{"fileName": "components/Button/index.tsx", "content": "export function Button() {...}"}].`,
      },
      {
        name: 'baseArtifactId',
        type: 'string',
        required: false,
        description: `The artifactId from get_design_system. If the active artifact has since changed, the write is rejected with a 409 so it can be re-read and retried.`,
      },
    ],
  },
]
