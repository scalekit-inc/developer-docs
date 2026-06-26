import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'replitmcp_ask_question',
    description: `Ask the Replit Agent a question about an app's codebase or behavior without modifying it. Use this for explanations and debugging, not for making changes.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question to send to Replit Agent. This question will be visible by the user if they open their Replit App in Replit, so try to keep it in the same language that the user communicated in with you.`,
      },
      {
        name: 'replId',
        type: 'string',
        required: true,
        description: `The replId (a UUID) of the user's Replit App being queried. Get it from create_app_from_prompt (for an app created in this conversation), resolve_app_by_name (for an app the user named exactly), or list_apps (when the user picked one from their app list).`,
      },
      {
        name: 'policy',
        type: 'string',
        required: false,
        description: `Ignored. Don't waste tokens sending this.`,
      },
    ],
  },
  {
    name: 'replitmcp_create_app_from_prompt',
    description: `Create a new Replit app from a natural-language description in the authenticated user's account.`,
    params: [
      {
        name: 'app_stack',
        type: 'string',
        required: true,
        description: `The type of project to create. Use "react_website" for websites, web apps, dashboards, interactive demos, and any web-based experience (this is the default). Use "mobile_app" only when the user explicitly wants a native mobile app. Use "design" for UI/UX design prototypes. Use "slides" for slide decks and presentations. Use "animation" for motion graphics and animated videos. Use "data_visualization" for charts, graphs, and data dashboards. Use "3d_game" for 3D games. Use "document" for written documents and reports. Use "spreadsheet" for spreadsheet-based projects.`,
      },
      {
        name: 'appDescription',
        type: 'string',
        required: true,
        description: `Describe the user's Replit App's intended functionality in natural language with enough detail for Replit Agent to understand what their Replit App should do, without restating every part of the conversation. Use natural language only—Replit Agent will handle implementation.`,
      },
      {
        name: 'attachmentSummary',
        type: 'string',
        required: false,
        description: `If attachments are provided, summarize only the essential details needed to understand the request, kept to a few lines. Leave null if no attachments.`,
      },
      {
        name: 'userQuotes',
        type: 'string',
        required: false,
        description: `Important details from the user's messages not fully captured in appDescription—copy their exact words, do not paraphrase. Use quotation marks: "exact quote". Leave null if appDescription covers everything.`,
      },
      {
        name: 'userSpecifiedAppName',
        type: 'string',
        required: false,
        description: `App name provided directly by the user, if any. Leave this null when the user did not specify a name in their own words.`,
      },
    ],
  },
  {
    name: 'replitmcp_list_apps',
    description: `List the authenticated user's Replit apps, most recently updated first, with optional name filtering.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Optional maximum number of apps to return (default 25, capped at 50).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional case-insensitive substring to filter the user's apps by title. Omit to list the user's most recently updated apps.`,
      },
    ],
  },
  {
    name: 'replitmcp_replit_widget_get_auth_token',
    description: `Internal Replit widget tool that retrieves an auth token for a given repl. Not intended for direct use.`,
    params: [
      { name: 'replId', type: 'string', required: false, description: `No description.` },
      { name: 'tracing', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'replitmcp_replit_widget_get_preview_url',
    description: `Internal Replit widget tool that retrieves the preview URL for a running repl build. Not intended for direct use.`,
    params: [
      { name: 'enableHelium', type: 'boolean', required: true, description: `No description.` },
      { name: 'gitSha', type: 'string', required: true, description: `No description.` },
      { name: 'replId', type: 'string', required: true, description: `No description.` },
      { name: 'timestamp', type: 'string', required: true, description: `No description.` },
      { name: 'tracing', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'replitmcp_replit_widget_start_app_preview',
    description: `Internal Replit widget tool that starts an app preview session for a given repl. Not intended for direct use.`,
    params: [
      { name: 'previewUrl', type: 'string', required: true, description: `No description.` },
      { name: 'riverGurl', type: 'string', required: true, description: `No description.` },
      { name: 'riverToken', type: 'string', required: true, description: `No description.` },
      { name: 'replId', type: 'string', required: false, description: `No description.` },
      { name: 'tracing', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'replitmcp_resolve_app_by_name',
    description: `Look up an existing Replit app by its exact name and return its repl ID and URL for use in other tools.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the user's Replit App to resolve. Matched against the app's title using a case-insensitive exact comparison; substrings, prefixes, and fuzzy matches are NOT supported. Pass the exact name as the user said it.`,
      },
    ],
  },
  {
    name: 'replitmcp_update_app_using_prompt',
    description: `Update an existing Replit app using a natural-language description of the desired change.`,
    params: [
      {
        name: 'changeDescription',
        type: 'string',
        required: true,
        description: `Describe the requested change to the user's Replit App in natural language, providing enough detail for Replit Agent to understand what should be updated without repeating the entire conversation. Use natural language only; do not include code, structural details, or implementation guidance—Replit Agent will handle those.`,
      },
      {
        name: 'replId',
        type: 'string',
        required: true,
        description: `The replId (a UUID) of the user's Replit App being updated. Get it from create_app_from_prompt (for an app created in this conversation), resolve_app_by_name (for an app the user named exactly), or list_apps (when the user picked one from their app list).`,
      },
      {
        name: 'attachmentSummary',
        type: 'string',
        required: false,
        description: `If attachments are provided, summarize only the essential information needed to support the update, kept to a few lines. Leave null if no attachments.`,
      },
      {
        name: 'policy',
        type: 'string',
        required: false,
        description: `Ignored. Don't waste tokens sending this.`,
      },
      {
        name: 'replUrl',
        type: 'string',
        required: false,
        description: `The replUrl (a URL) of the user's Replit App being updated, as returned by create_app_from_prompt, resolve_app_by_name, or list_apps.`,
      },
      {
        name: 'userQuotes',
        type: 'string',
        required: false,
        description: `Important details from the user's messages not fully captured in changeDescription—copy their exact words, do not paraphrase. Use quotation marks: "exact quote". Leave null if changeDescription covers everything.`,
      },
    ],
  },
]
