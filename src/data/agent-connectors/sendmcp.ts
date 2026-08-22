import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sendmcp_complete_upload',
    description: `Confirms a direct-to-storage upload completed successfully. Call this after uploading to the presigned URL returned by create_presigned_upload. Returns the registered file ID that can be referenced in documents as <img src="asset:{fileId}">. This is step two of the two-step image upload flow.`,
    params: [
      {
        name: 'bucket',
        type: 'string',
        required: true,
        description: `The storage bucket used for the upload. Returned as part of the presigned upload response from create_presigned_upload.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The original filename of the uploaded file. Must match what was passed to create_presigned_upload. Example: 'hero-image.png'.`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The storage key (path) used for the upload. Returned as part of the presigned upload response from create_presigned_upload.`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: true,
        description: `The MIME type of the uploaded file. Must match what was passed to create_presigned_upload. Example: 'image/png'.`,
      },
      {
        name: 'size',
        type: 'number',
        required: true,
        description: `The final file size in bytes after the upload completed.`,
      },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `Image height in pixels. Provide when the uploaded file is an image. Pass null for non-image files.`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `Image width in pixels. Provide when the uploaded file is an image. Pass null for non-image files.`,
      },
    ],
  },
  {
    name: 'sendmcp_create_presigned_upload',
    description: `Creates a presigned upload target URL so files can be uploaded directly to storage. This is step one of the two-step image upload flow. Call this first to get the presigned URL, upload the file directly to that URL, then call complete_upload to confirm the upload and register the file.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The original filename of the file to upload. Example: 'hero-image.png'.`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: true,
        description: `The MIME type of the file. Example: 'image/png', 'image/jpeg', 'image/webp'.`,
      },
    ],
  },
  {
    name: 'sendmcp_createdocument',
    description: `[STALE - upstream renamed "CreateDocument" to "CreateSite" (see sendmcp_createsite); this tool no longer exists on the upstream MCP server and will fail if invoked] Three modes: plan (pass intent only to get guidance), copy (pass sourceShareId to copy an existing doc), and create (pass html to publish a new document). If intent is passed without html or sourceShareId, returns tailored guidance — call CreateDocument again with html to actually publish. When sourceShareId is provided, the new document starts as an exact copy; do not also pass html. The html field must be a complete, self-contained HTML document starting with <!DOCTYPE html>, using no external dependencies, pure CSS and vanilla JS only, with sections wrapped in <section>, fully responsive and mobile-first, images referenced as <img src="asset:{fileId}">, all links with target="_blank" rel="noopener noreferrer", and icons as <i data-lucide="name"></i>.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `The complete, self-contained HTML document to publish. Must start with <!DOCTYPE html>. Single file: body then style then script. No external dependencies — pure CSS and vanilla JS only. Wrap each section in <section>. Fully responsive, mobile-first. Reference images as <img src="asset:{fileId}">. Every <a href> uses target="_blank" rel="noopener noreferrer". For icons, use <i data-lucide="name"></i>. Do not pass this when sourceShareId is provided.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `One-sentence description of what the user wants to make (max 256 characters). If passed without html or sourceShareId, the tool returns tailored guidance — call CreateDocument again with html to actually create the document.`,
      },
      {
        name: 'sourceShareId',
        type: 'string',
        required: false,
        description: `Share ID or full URL of an existing Send document to copy. When provided, the new document starts as an exact copy. Do not also pass html when using this field.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the document to create or copy.`,
      },
    ],
  },
  {
    name: 'sendmcp_createsite',
    description: `Creates a Send site or document — a shareable HTML page. Making one takes two calls. First call — intent only. One line on what the user is making and why. Nothing is created. Returns any skills this workspace expects you to follow — brand rules, layouts, tone — and an intentId. Second call — html plus that intentId. See the html field for format requirements. To copy an existing site instead of writing one, pass sourceShareId (share ID or URL) with no html.`,
    params: [
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `The complete, self-contained HTML document to publish. Return ONLY raw HTML. No markdown, no code fences, no explanation. Single file: <body> then <style> then <script>. Start with <!DOCTYPE html>, then <html>, <head>, <body>. Zero external dependencies — pure CSS and vanilla JS only. Wrap each section in <section></section>. Fully responsive, mobile-first. Every interactive element must work. Reference images as <img src="asset:{fileId}"> — do not base64-encode. Every <a href> link: use target="_blank" rel="noopener noreferrer". For icons, use <i data-lucide="name"></i>.`,
      },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `One line on what the user is making. ALWAYS send it alone first — no html. Returns any matching skills + an intentId.`,
      },
      {
        name: 'intentId',
        type: 'string',
        required: false,
        description: `ALWAYS pass this back unchanged on the second call. Returned by the first; links the request to what got made.`,
      },
      {
        name: 'sourceShareId',
        type: 'string',
        required: false,
        description: `The share ID or URL of an existing document to copy. When provided, the new document starts as an exact copy of the source — do not pass html.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the document. Something short and simple that describes the document.`,
      },
    ],
  },
  {
    name: 'sendmcp_editdocument',
    description: `[STALE - upstream renamed "EditDocument" to "EditSite" (see sendmcp_editsite); this tool no longer exists on the upstream MCP server and will fail if invoked] Edit an existing Send document via deterministic string replacement. Requires at least one entry in edits — instruction alone does nothing. If you don't have the document's current HTML, call GetDocument first. Edits apply sequentially; if any edit fails, none are persisted. Use when the user asks to change, tweak, fix, reword, restyle, add to, or remove anything from an existing document.`,
    params: [
      {
        name: 'edits',
        type: 'array',
        required: true,
        description: `Array of edit objects. Each object must include old_string (the exact text to replace, with enough surrounding context to be unique) and new_string (replacement text, or empty string to delete). Optionally set replace_all to true to replace every occurrence. Edits apply in order; all-or-nothing — if any fails, none are saved.`,
      },
      {
        name: 'shareIdOrUrl',
        type: 'string',
        required: true,
        description: `The document's share ID (8-char alphanumeric) or full URL (e.g. https://send.co/a/RaU0Kud4). Returned by CreateDocument or GetDocument.`,
      },
      {
        name: 'codeEdit',
        type: 'string',
        required: false,
        description: `Optional raw code edit string.`,
      },
      {
        name: 'instruction',
        type: 'string',
        required: false,
        description: `Optional brief description of the intended change. Recorded for analytics only — does NOT perform the edit. You must still provide edits.`,
      },
    ],
  },
  {
    name: 'sendmcp_editsite',
    description: `Modifies a Send site or document the user previously created or shared with Send. Use whenever the user asks to change, tweak, fix, reword, restyle, add to, or remove anything from an existing site or document — even when they don't name Send or say the word 'edit'. Edits via deterministic string replacement. Requires at least one entry in edits — instruction alone does nothing. If you don't already have the site's current bytes, call GetSite first. Edits apply sequentially against an in-memory copy; if any edit fails, none are persisted. As a last resort after repeated edit failures, fullHtml replaces the whole site while keeping the same share URL — prefer it over recreating with CreateSite, which forks a new share URL.`,
    params: [
      {
        name: 'shareIdOrUrl',
        type: 'string',
        required: true,
        description: `The site's share ID (8-character alphanumeric string) or full URL. Returned by CreateSite or GetSite.`,
      },
      {
        name: 'codeEdit',
        type: 'string',
        required: false,
        description: `Optional raw code edit string.`,
      },
      {
        name: 'edits',
        type: 'array',
        required: false,
        description: `Edits to apply, in order. Each subsequent edit sees the result of the prior. Atomic: if any edit fails, none are persisted. Each object must include old_string (exact text to replace, with enough surrounding context to be unique, byte-for-byte) and new_string (replacement text, or empty string to delete). Optionally set replace_all to true to replace every occurrence.`,
      },
      {
        name: 'fullHtml',
        type: 'string',
        required: false,
        description: `Last resort. Replaces the entire document with this HTML while keeping the same share URL. Only use after edits has failed repeatedly and you cannot construct a matching old_string — prefer targeted edits; regenerating a document from memory can silently drop content. Do not pass together with edits.`,
      },
      {
        name: 'instruction',
        type: 'string',
        required: false,
        description: `Optional brief description of the intended change. Recorded for analytics only — does NOT perform the edit on its own. You must still pass edits.`,
      },
    ],
  },
  {
    name: 'sendmcp_get_guidelines',
    description: `[STALE - upstream renamed "get_guidelines" to "get_skills" (guidelines are now called skills; see sendmcp_get_skills); this tool no longer exists on the upstream MCP server and will fail if invoked] Fetches Send guidelines by ID, or lists all available guidelines. With id, returns a single guideline including its full content. Without id, returns a list of all available guidelines (name and description only). Call only when the user explicitly references a guideline by name or asks to apply or browse guidelines — do not call proactively when creating or editing documents.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `ID of the guideline to load. Omit to list all available guidelines (name and description only). Only call with an ID when the user has explicitly named or requested a specific guideline.`,
      },
    ],
  },
  {
    name: 'sendmcp_get_image_gallery',
    description: `Returns all workspace images with proxy URLs for display in the gallery UI. Each item includes an optional description for model context (not shown in the UI). No parameters required.`,
    params: [],
  },
  {
    name: 'sendmcp_get_skills',
    description: `Fetches skills by ID, lists available skills, or semantically searches them. Skills were previously called 'guidelines', and users may also say 'template' — when the user mentions making, editing, searching, or using a Send skill, guideline, or template, they mean these. Skills shape how sites are created — brand systems, layout patterns, doc-type playbooks. Workspace skills (created by this team) outrank Send skills (official, send/* ids) when both fit. With id: returns the skill including its full content — pass an array of ids to load several in one call. With query: semantic search — describe what the user is making and get the best-matching skills grouped by source with similarity scores. Neither: returns a list of all available skills (name and description only), workspace skills first.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `ID of the skill to load, or an array of IDs to load several at once. Returns full content.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Natural-language description of what the user is making. Returns the best-matching skills ranked by similarity. Ignored when id is provided.`,
      },
    ],
  },
  {
    name: 'sendmcp_getdocument',
    description: `[STALE - upstream renamed "GetDocument" to "GetSite" (see sendmcp_getsite); this tool no longer exists on the upstream MCP server and will fail if invoked] Fetch an existing Send document by share URL or share ID. Returns the full HTML source and metadata. Call this before EditDocument when you need the document's current HTML bytes.`,
    params: [
      {
        name: 'shareIdOrUrl',
        type: 'string',
        required: true,
        description: `The document's share ID (8-char alphanumeric string), slug (e.g. 'my-proposal-RaU0Kud4'), or full URL (e.g. 'https://send.co/a/RaU0Kud4').`,
      },
    ],
  },
  {
    name: 'sendmcp_getsite',
    description: `Fetch an existing Send site or document by share URL or share ID. Returns the full HTML source and metadata; the response includes shareId for EditSite or CreateSite (copy mode).`,
    params: [
      {
        name: 'shareIdOrUrl',
        type: 'string',
        required: true,
        description: `The document's share ID (8-char alphanumeric string), slug (e.g. 'my-proposal-RaU0Kud4'), or full URL (e.g. 'https://send.co/a/RaU0Kud4').`,
      },
    ],
  },
  {
    name: 'sendmcp_manage_guideline',
    description: `[STALE - upstream renamed "manage_guideline" to "manage_skill" (guidelines are now called skills; see sendmcp_manage_skill); this tool no longer exists on the upstream MCP server and will fail if invoked] Create, update, or delete a user-defined Send guideline. Call only when the user explicitly asks to create, edit, or delete a guideline — not during document creation. Actions: create (provide name, description, content), update (provide id and the fields to change), delete (provide id). Destructive for the delete action.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform on the guideline. 'create' creates a new guideline (requires name, description, content). 'update' modifies an existing guideline (requires id). 'delete' removes a guideline permanently (requires id).`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Full guideline content — includes instructions, code samples, asset references, example document URLs. Required when action is 'create'. Optional for 'update'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short description of the guideline's purpose. Displayed in the guidelines list.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Guideline ID. Required for 'update' and 'delete' actions. Omit when creating a new guideline.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Guideline name. Required when action is 'create'. Optional for 'update'.`,
      },
    ],
  },
  {
    name: 'sendmcp_manage_images',
    description: `Unified image management tool. Controls what the user sees (upload area, image gallery) and what image data is fetched. Pass ids to fetch specific images by ID; omit ids to fetch all recent images; pass an empty array [] to skip fetching (UI-only mode). Use showUpload to display a drag-and-drop upload area. Use showGallery to control gallery visibility.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Which images to fetch. Omit to fetch all recent images. Pass specific IDs to fetch only those images. Pass an empty array [] to skip fetching entirely (UI-only mode).`,
      },
      {
        name: 'showGallery',
        type: 'boolean',
        required: false,
        description: `Show the image gallery. Defaults to true when fetching images (ids is omitted or has values), false when ids is an empty array [].`,
      },
      {
        name: 'showUpload',
        type: 'boolean',
        required: false,
        description: `Show the drag-and-drop upload area for the user to upload new images. Default is false.`,
      },
    ],
  },
  {
    name: 'sendmcp_manage_sites',
    description: `Read or change the settings of an existing site or document made with Send that the user owns, given its share id or URL. Actions: 'documentation' returns the current contract — every supported setting, usage guidance, and a token required for updates; 'get' returns the site's current settings; 'update' applies the settings passed in changes. Call action 'documentation' for a site before your first update to it in a conversation, and include the returned token in update calls. The set of supported settings is defined by the documentation, not by this description.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `What to do. Start with 'documentation' before the first update to a site in a conversation.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Send share id (8-char alphanumeric) or full /a/ URL of the site or document.`,
      },
      {
        name: 'changes',
        type: 'object',
        required: false,
        description: `For 'update': the settings to change, as described by the documentation action. Pass only the keys you want to change.`,
      },
      {
        name: 'docsToken',
        type: 'string',
        required: false,
        description: `For 'update': the token returned by the documentation action for this site.`,
      },
    ],
  },
  {
    name: 'sendmcp_manage_skill',
    description: `Create, update, delete, or pin a user-defined skill for this workspace. Skills were previously called 'guidelines', and users may also say 'template' — a user asking to create, edit, delete, or pin a guideline or template means this tool. Call this only when the user explicitly asks for it — not during document creation. create: provide name, description, and content. update: provide id and any fields to change. delete: provide id. pin/unpin: provide id — a pinned skill is returned for every site this workspace makes, not only the ones a search matches; limited to workspace owners and admins.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. Only call this tool when the user has explicitly asked to create, edit, delete, or pin a skill — never as part of creating or editing a document.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Full skill content — instructions, code samples, asset refs, example doc URLs.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short description of the skill's purpose`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Skill ID (required for update and delete).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Skill name (required for create).`,
      },
    ],
  },
  {
    name: 'sendmcp_showcontent',
    description: `Embeds Send-managed content inline in the chat. Pass type 'doc' with the shareId to render a published HTML document inline so the user can view it. Call this after CreateDocument or EditDocument when the user should see the result. Requires the user to be signed in to Send.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Send share ID (8-char alphanumeric string) or full /a/ URL of the document to display. Returned by CreateDocument. Example: 'RaU0Kud4' or 'https://send.co/a/RaU0Kud4'.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Component type to embed. Only 'doc' is currently supported — renders a published Send HTML document inline in the chat.`,
      },
    ],
  },
  {
    name: 'sendmcp_submit_feedback',
    description: `Sends feedback about Send itself to the team that builds it. Call it when the session produces something the team would genuinely want to know: the user explicitly asks to send feedback or report a problem, aims praise or frustration at Send, Send can't do something the user wants and it matters to them, or you form a strong opinion worth volunteering. Most sessions produce none — ordinary friction is not signal. When you do call it, context is the entire value: what the user was making, what they expected, and what happened instead. Not for feedback about Claude, or about anything that isn't Send. Only include detail the user is ok with sharing as feedback.`,
    params: [
      {
        name: 'feedback',
        type: 'string',
        required: true,
        description: `What the Send team should know. Be specific: what broke, what confused, or what worked well.`,
      },
      {
        name: 'sentiment',
        type: 'string',
        required: true,
        description: `Whether this is praise, a problem, or both. Praise is signal too — send it.`,
      },
      {
        name: 'area',
        type: 'string',
        required: false,
        description: `Which part of Send this is about, if it's clear.`,
      },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `What was being made and what was expected. The concrete details are what make this actionable.`,
      },
      {
        name: 'shareId',
        type: 'string',
        required: false,
        description: `Optional. Share ID of the site involved, if any — a new user may not have one, and that's fine.`,
      },
    ],
  },
]
