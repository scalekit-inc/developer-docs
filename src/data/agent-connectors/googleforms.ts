import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googleforms_create_form',
    description: `Create a new Google Form with a title and optional document title. Returns the new form's ID and metadata.`,
    params: [
      {
        name: 'document_title',
        type: 'string',
        required: false,
        description: `The title of the document shown in Google Drive (defaults to the form title if not provided)`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the form shown to respondents`,
      },
    ],
  },
  {
    name: 'googleforms_get_form',
    description: `Get the structure and metadata of a Google Form including its title, description, and all questions.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form to retrieve`,
      },
    ],
  },
  {
    name: 'googleforms_get_response',
    description: `Get a single response submitted to a Google Form by its response ID. Returns the respondent's answers for all questions.`,
    params: [
      { name: 'form_id', type: 'string', required: true, description: `The ID of the Google Form` },
      {
        name: 'response_id',
        type: 'string',
        required: true,
        description: `The ID of the specific response to retrieve`,
      },
    ],
  },
  {
    name: 'googleforms_list_responses',
    description: `List all responses submitted to a Google Form. Returns response IDs, submission timestamps, and answer values for each respondent.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter responses by submission time. Format: timestamp > 2026-01-01T00:00:00Z`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form to list responses for`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of responses to return (max 5000)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
]
