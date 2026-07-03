import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'tallymcp_apply_logic',
    description: `Create or update conditional logic rules on form blocks using DSL syntax.`,
    params: [{ name: 'operations', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_configure_blocks',
    description: `Update block properties such as visibility, required state, and other settings.`,
    params: [{ name: 'updates', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_create_blocks',
    description: `Add new question blocks or content blocks to the current form.`,
    params: [{ name: 'groups', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_create_new_form',
    description: `Create a new blank form with the specified title and optional branding.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'coverImageUrl', type: 'string', required: false, description: `No description.` },
      { name: 'logoUrl', type: 'string', required: false, description: `No description.` },
      { name: 'submitButtonText', type: 'string', required: false, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_extract_brand',
    description: `Extract brand colors, fonts, and images from a website URL to apply to the form.`,
    params: [{ name: 'url', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_fetch_insights',
    description: `Fetch analytics metrics for a form such as views, completions, and conversion rate.`,
    params: [
      { name: 'formId', type: 'string', required: true, description: `No description.` },
      { name: 'period', type: 'string', required: true, description: `No description.` },
      { name: 'include', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_fetch_submissions',
    description: `Retrieve paginated form submissions with question labels and response values.`,
    params: [
      { name: 'formId', type: 'string', required: true, description: `No description.` },
      { name: 'filter', type: 'object', required: false, description: `No description.` },
      { name: 'limit', type: 'number', required: false, description: `No description.` },
      { name: 'page', type: 'number', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_inspect_custom_css',
    description: `Return the current custom CSS and available CSS selectors for the form.`,
    params: [],
  },
  {
    name: 'tallymcp_list_blocks',
    description: `Retrieve the current form structure as a block ledger showing all blocks with their UUIDs and types.`,
    params: [],
  },
  {
    name: 'tallymcp_list_forms',
    description: `List forms the user has access to, with optional filtering and pagination.`,
    params: [
      { name: 'filter', type: 'object', required: false, description: `No description.` },
      { name: 'limit', type: 'number', required: false, description: `No description.` },
      { name: 'page', type: 'number', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_list_workspaces',
    description: `List all workspaces the user can access.`,
    params: [],
  },
  {
    name: 'tallymcp_load_form',
    description: `Load an existing form by ID to prepare it for editing.`,
    params: [{ name: 'formId', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_move_blocks',
    description: `Move one or more blocks to a new position in the form.`,
    params: [
      { name: 'blockUuids', type: 'array', required: true, description: `No description.` },
      {
        name: 'insertAfterBlockUuid',
        type: 'string',
        required: true,
        description: `No description.`,
      },
    ],
  },
  {
    name: 'tallymcp_remove_blocks',
    description: `Remove specific blocks from the form by their UUIDs.`,
    params: [{ name: 'blockUuids', type: 'array', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_remove_pages',
    description: `Remove entire pages from the form by page number.`,
    params: [
      { name: 'pageNumbers', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_remove_questions',
    description: `Remove entire questions from the form by their UUIDs.`,
    params: [
      { name: 'questionUuids', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_reposition_pages',
    description: `Move, swap, or reorder pages using a command (move, swap, reorder).`,
    params: [
      { name: 'command', type: 'string', required: true, description: `No description.` },
      {
        name: 'currentPageNumber',
        type: 'number',
        required: false,
        description: `No description.`,
      },
      { name: 'newPageNumber', type: 'number', required: false, description: `No description.` },
      { name: 'order', type: 'array', required: false, description: `No description.` },
      { name: 'pageNumberA', type: 'number', required: false, description: `No description.` },
      { name: 'pageNumberB', type: 'number', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_reposition_questions',
    description: `Move or swap questions using a command (move, swap).`,
    params: [
      { name: 'command', type: 'string', required: true, description: `No description.` },
      { name: 'afterBlockUuid', type: 'string', required: false, description: `No description.` },
      { name: 'questionUuidA', type: 'string', required: false, description: `No description.` },
      { name: 'questionUuidB', type: 'string', required: false, description: `No description.` },
      { name: 'questionUuids', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_save_form',
    description: `Save the current form changes and optionally publish or unpublish the form.`,
    params: [
      { name: 'formId', type: 'string', required: false, description: `No description.` },
      { name: 'status', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_set_column_layout',
    description: `Organize blocks into a side-by-side column layout.`,
    params: [{ name: 'layout', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_set_form_title',
    description: `Set or update the form title that appears at the top of the form.`,
    params: [{ name: 'title', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'tallymcp_update_custom_css',
    description: `Apply custom CSS to the form as a last-resort override for styling not supported by update_styling.`,
    params: [
      { name: 'css', type: 'string', required: true, description: `No description.` },
      { name: 'reason', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_update_settings',
    description: `Update form settings including submission limits, notifications, redirects, and metadata.`,
    params: [
      { name: 'closeAt', type: 'string', required: false, description: `No description.` },
      { name: 'closeMessage', type: 'string', required: false, description: `No description.` },
      {
        name: 'hasPartialSubmissions',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'hasProgressBar', type: 'boolean', required: false, description: `No description.` },
      { name: 'isClosed', type: 'boolean', required: false, description: `No description.` },
      { name: 'language', type: 'string', required: false, description: `No description.` },
      { name: 'metaDescription', type: 'string', required: false, description: `No description.` },
      { name: 'metaImageUrl', type: 'string', required: false, description: `No description.` },
      {
        name: 'metaSiteFaviconUrl',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'metaSiteName', type: 'string', required: false, description: `No description.` },
      { name: 'metaTitle', type: 'string', required: false, description: `No description.` },
      { name: 'pageAutoJump', type: 'boolean', required: false, description: `No description.` },
      { name: 'password', type: 'string', required: false, description: `No description.` },
      {
        name: 'redirectOnCompletionUrl',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'respondentEmail', type: 'string', required: false, description: `No description.` },
      { name: 'saveForLater', type: 'boolean', required: false, description: `No description.` },
      { name: 'selfEmail', type: 'string', required: false, description: `No description.` },
      {
        name: 'submissionsDataRetention',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'submissionsLimit', type: 'string', required: false, description: `No description.` },
      {
        name: 'uniqueSubmissionKey',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'verifyEmail', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_update_styling',
    description: `Update form appearance and advanced styling in a single call.`,
    params: [
      { name: 'advanced', type: 'object', required: false, description: `No description.` },
      { name: 'appearance', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'tallymcp_update_text',
    description: `Update the HTML text content of blocks in the form.`,
    params: [{ name: 'updates', type: 'array', required: true, description: `No description.` }],
  },
]
