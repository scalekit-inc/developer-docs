import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jotformmcp_analyze_submissions',
    description: `Perform AI-powered analysis on one or more forms' submissions using a natural-language query.`,
    params: [
      {
        name: 'analysisQuery',
        type: 'string',
        required: true,
        description: `A natural-language query describing the desired analysis. Examples: "What are the most common responses?", "Show submission trends by month", "Analyze sentiment in feedback", "Give me a statistical breakdown of all answers".`,
      },
      {
        name: 'formIDs',
        type: 'array',
        required: true,
        description: `Form IDs whose submissions will be analyzed. Provide a single form ID by default. Only supply more than one ID when the user explicitly requests cross-form comparison or combined analysis. Use the search_asset tool first if you need to find the form ID.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: true,
        description: `Maximum number of submissions to include in the analysis. Higher values provide more comprehensive results but increase processing time.`,
      },
    ],
  },
  {
    name: 'jotformmcp_assign_form',
    description: `Assign a form to a user by email address with an optional message.`,
    params: [
      {
        name: 'assignee_email',
        type: 'string',
        required: true,
        description: `The email address to assign the form to`,
      },
      {
        name: 'assignee_message',
        type: 'string',
        required: true,
        description: `The message to assign the form to. This will be used in the email that will be sent to the assignee.`,
      },
      {
        name: 'assignee_name',
        type: 'string',
        required: true,
        description: `The name of the assignee. This will be used in the email that will be sent to the assignee.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to assign`,
      },
    ],
  },
  {
    name: 'jotformmcp_create_form',
    description: `Create a new Jotform form based on a natural-language description.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of the form to create`,
      },
    ],
  },
  {
    name: 'jotformmcp_edit_form',
    description: `Edit an existing form using a natural-language instruction.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `High-level natural-language instruction describing what to change (e.g., add/move/rename questions). Avoid specifying internal types or identifiers; another agent will infer the appropriate field types.`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to edit`,
      },
    ],
  },
  {
    name: 'jotformmcp_fetch',
    description: `Fetch metadata and information for a Jotform form by its ID or URL.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The form id or the submission id to fetch information and metadata from`,
      },
    ],
  },
  {
    name: 'jotformmcp_get_submissions',
    description: `List submission IDs for a form with optional filters.`,
    params: [
      { name: 'filter', type: 'object', required: true, description: `No description.` },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the form to list submissions from`,
      },
    ],
  },
  {
    name: 'jotformmcp_search',
    description: `Search Jotform assets by query with optional filters, ordering, and limit.`,
    params: [
      { name: 'filter', type: 'object', required: true, description: `No description.` },
      {
        name: 'limit',
        type: 'number',
        required: true,
        description: `Maximum items fetched per underlying request (default: 20).`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: true,
        description: `Sort order for the results. The default value is "last_activity", only use another option if a sorting is really needed.`,
      },
      {
        name: 'user_query',
        type: 'string',
        required: true,
        description: `A natural-language instruction describing what the user wants to find and list from assets.`,
      },
    ],
  },
]
