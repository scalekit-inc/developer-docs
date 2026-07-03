import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'surveymonkeymcp_add_page',
    description: `Add a new page to a survey at the specified position. Only needed for multi-page surveys — new surveys already have a default page from create_survey. Blocked on surveys with existing responses.`,
    params: [
      {
        name: 'page',
        type: 'object',
        required: true,
        description: `Page object describing the new page. May include fields such as 'title', 'description', and 'questions'. Example: {"title": "Section 2", "description": "Follow-up questions"}.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: true,
        description: `1-based position at which to insert the new page within the survey. Use 1 to insert before all existing pages. Example: 2 to insert as the second page.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey to add a page to. Returned by create_survey. Accepts string or integer. Example: '123456789'.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_add_question',
    description: `Add a question to a survey page. Requires survey_id, page_id, position, and a question object specifying family, subtype, headings, and answers. Blocked on surveys with existing responses.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `ID of the page within the survey to add the question to. Use the default_page_id returned by create_survey or a page_id returned by add_page. Accepts string or integer.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: true,
        description: `1-based position of the question on the page. Example: 1 to place the question first on the page.`,
      },
      {
        name: 'question',
        type: 'object',
        required: true,
        description: `Question definition object. Must include 'family' (e.g. 'single_choice', 'open_ended', 'rating'), 'subtype', 'headings' (array with 'heading' text), and 'answers' (rows/choices). Example: {"family": "single_choice", "subtype": "vertical", "headings": [{"heading": "How satisfied are you?"}], "answers": {"choices": [{"text": "Very satisfied"}, {"text": "Satisfied"}]}}.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey to add the question to. Returned by create_survey. Accepts string or integer. Example: '123456789'.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_create_survey',
    description: `Create a new empty survey with the given title. Returns the survey ID and default_page_id. Use add_question with the default_page_id to add questions.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the new survey. This is displayed to respondents at the top of the survey. Example: 'Customer Satisfaction Survey Q3 2025'.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_create_weblink_collector',
    description: `Create a weblink collector for a survey, generating a public URL respondents can use to submit responses. The link is open and ready to collect responses immediately.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the collector (used internally to identify this link). Example: 'Web Link 1' or 'Customer Portal Link'.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey to create a shareable link for. Returned by create_survey. Accepts string or integer. Example: '123456789'.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_delete_question',
    description: `Permanently delete a question from a survey page. Requires survey_id, page_id, and question_id. Blocked on surveys with existing responses.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `ID of the page containing the question to delete. Accepts string or integer. Example: '987654321'.`,
      },
      {
        name: 'question_id',
        type: 'string',
        required: true,
        description: `ID of the question to permanently delete. Accepts string or integer. Example: '456789123'. This action cannot be undone.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey containing the question to delete. Accepts string or integer. Example: '123456789'.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_edit_question',
    description: `Edit a single question's text, required status, answer choices, position, or move it to a different page. Blocked on surveys with existing responses.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `ID of the page currently containing the question. Accepts string or integer. Example: '987654321'.`,
      },
      {
        name: 'question_id',
        type: 'string',
        required: true,
        description: `ID of the question to edit. Accepts string or integer. Example: '456789123'.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey containing the question to edit. Accepts string or integer. Example: '123456789'.`,
      },
      {
        name: 'answers',
        type: 'object',
        required: false,
        description: `Updated answers object containing choices, rows, or other answer structures appropriate to the question family. Omit to leave unchanged. Example: {"choices": [{"text": "Very satisfied"}, {"text": "Satisfied"}]}.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `New 1-based position of the question on its page. Omit to leave unchanged. Example: 2 to move the question to second position.`,
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
        description: `Whether the question is required for respondents to answer. Set to true to make it mandatory, false to make it optional. Omit to leave unchanged.`,
      },
      {
        name: 'target_page_id',
        type: 'string',
        required: false,
        description: `ID of a different page to move the question to. Omit to keep it on its current page. Accepts string or integer. Example: '111222333'.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New question heading text. Omit to leave unchanged. Example: 'How satisfied are you with our service?'.`,
      },
      {
        name: 'validation',
        type: 'object',
        required: false,
        description: `Validation rules for the question (e.g. min/max values for open-ended questions). Omit to leave unchanged. Example: {"type": "integer", "min": 1, "max": 10}.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_generate_survey_plan',
    description: `Generate an AI-powered survey plan from a natural language description. Returns a suggested title and list of questions. The plan is NOT persisted — use create_survey and add_question to build the actual survey.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Natural language description of the survey you want to create. The AI uses this to generate a suggested title and question list. Example: 'A customer satisfaction survey for a software product with questions about ease of use and support quality.'`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_page',
    description: `Get details about a specific page in a survey. Requires both survey_id and page_id.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the page to retrieve. Can be a string or integer. Use get_pages to find a page_id.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey containing the page. Can be a string or integer. Use search_surveys to find a survey_id.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_pages',
    description: `Get all pages in a survey. Use page IDs returned here with get_questions and other page-level tools.`,
    params: [
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey whose pages to list. Can be a string or integer. Use search_surveys to find a survey_id.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Defaults to 1.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of pages to return per result page. Defaults to 50.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_question',
    description: `Get details about a specific question. Requires survey_id, page_id (from get_pages), and question_id (from get_questions).`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the page containing the question. Can be a string or integer. Use get_pages to find page IDs.`,
      },
      {
        name: 'question_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the question to retrieve. Can be a string or integer. Use get_questions to find question IDs.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey containing the question. Can be a string or integer. Use search_surveys to find a survey_id.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_question_types',
    description: `Get available SurveyMonkey question types and their schemas. Use this to discover valid question families and subtypes before calling add_question.`,
    params: [],
  },
  {
    name: 'surveymonkeymcp_get_questions',
    description: `Get all questions for a specific page in a survey. Both survey_id and page_id are required. Use get_pages first to find page IDs.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the page whose questions to list. Can be a string or integer. Use get_pages to find page IDs.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey. Can be a string or integer. Use search_surveys to find a survey_id.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Defaults to 1.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of questions to return per result page. Defaults to 50.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_response_count',
    description: `Get the total number of responses received for a survey. Useful for determining if a survey has collected data or can still be modified.`,
    params: [
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey whose response count to retrieve. Can be a string or integer. Use search_surveys to find a survey_id.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_responses',
    description: `Retrieve paginated survey responses with full answer details including question headings and choice text. Requires responses_read and responses_read_detail scopes.`,
    params: [
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey whose responses to retrieve. Can be a string or integer. Use search_surveys to find a survey_id.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Defaults to 1.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of responses to return per page. Defaults to 10.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_get_server_info',
    description: `Returns information about the SurveyMonkey MCP server.`,
    params: [],
  },
  {
    name: 'surveymonkeymcp_get_survey',
    description: `Get details about a specific survey including title, dates, language, and question count. Use search_surveys to find a survey_id first.`,
    params: [
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the survey to retrieve. Can be a string or integer. Use search_surveys to find the survey_id.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_reorder_questions',
    description: `Bulk reorder all questions on a survey page. Requires the complete list of all question IDs in the desired order. Use get_questions first to get the current list. Blocked on surveys with existing responses.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `ID of the page whose questions should be reordered. Accepts string or integer. Example: '987654321'.`,
      },
      {
        name: 'question_order',
        type: 'array',
        required: true,
        description: `Complete ordered list of all question IDs on the page in the desired sequence. Must include every question ID currently on the page — omitting any ID may cause an error. Use get_questions first to retrieve the current question IDs. Each element accepts string or integer. Example: ['456789123', '456789124', '456789125'].`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey containing the page to reorder. Accepts string or integer. Example: '123456789'.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_search_surveys',
    description: `Get a paginated list of surveys for the authenticated user. Supports text search, sorting, and filter criteria to narrow results.`,
    params: [
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional key-value filter criteria to narrow survey results (e.g. by status or category). Omit to apply no additional filters.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Defaults to 1.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of surveys to return per page. Defaults to 10.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to search for within survey titles and metadata. Omit to return all surveys.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort results by (e.g. 'date_created', 'date_modified', 'title'). Omit to use the API default sort.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: 'asc' for ascending or 'desc' for descending. Omit to use the API default.`,
      },
    ],
  },
  {
    name: 'surveymonkeymcp_update_survey',
    description: `Update survey properties such as title or nickname. Blocked on surveys with existing responses.`,
    params: [
      {
        name: 'patch',
        type: 'object',
        required: true,
        description: `Object containing the survey properties to update. Supported fields include 'title' (string) and 'nickname' (string). Example: {"title": "Updated Survey Title"}.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `ID of the survey to update. Accepts string or integer. Example: '123456789'.`,
      },
    ],
  },
]
