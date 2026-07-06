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
    description: `Three modes: plan (pass intent only to get guidance), copy (pass sourceShareId to copy an existing doc), and create (pass html to publish a new document). If intent is passed without html or sourceShareId, returns tailored guidance — call CreateDocument again with html to actually publish. When sourceShareId is provided, the new document starts as an exact copy; do not also pass html. The html field must be a complete, self-contained HTML document starting with <!DOCTYPE html>, using no external dependencies, pure CSS and vanilla JS only, with sections wrapped in <section>, fully responsive and mobile-first, images referenced as <img src="asset:{fileId}">, all links with target="_blank" rel="noopener noreferrer", and icons as <i data-lucide="name"></i>.`,
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
    name: 'sendmcp_editdocument',
    description: `Edit an existing Send document via deterministic string replacement. Requires at least one entry in edits — instruction alone does nothing. If you don't have the document's current HTML, call GetDocument first. Edits apply sequentially; if any edit fails, none are persisted. Use when the user asks to change, tweak, fix, reword, restyle, add to, or remove anything from an existing document.`,
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
    name: 'sendmcp_get_guidelines',
    description: `Fetches Send guidelines by ID, or lists all available guidelines. With id, returns a single guideline including its full content. Without id, returns a list of all available guidelines (name and description only). Call only when the user explicitly references a guideline by name or asks to apply or browse guidelines — do not call proactively when creating or editing documents.`,
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
    name: 'sendmcp_getdocument',
    description: `Fetch an existing Send document by share URL or share ID. Returns the full HTML source and metadata. Call this before EditDocument when you need the document's current HTML bytes.`,
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
    description: `Create, update, or delete a user-defined Send guideline. Call only when the user explicitly asks to create, edit, or delete a guideline — not during document creation. Actions: create (provide name, description, content), update (provide id and the fields to change), delete (provide id). Destructive for the delete action.`,
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
]
