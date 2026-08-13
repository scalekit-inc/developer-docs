import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googleforms_batch_update_form',
    description: `Apply a batch of update requests to a Google Form in a single atomic call. This is the only way to add, edit, move, or delete questions and other items on a form. Returns a reply for each request in the same order they were submitted.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form to update`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Ordered list of update requests to apply. Each item is a Forms API Request object, e.g. {"createItem": {...}} or {"updateFormInfo": {...}}`,
      },
      {
        name: 'include_form_in_response',
        type: 'boolean',
        required: false,
        description: `Whether the response should include the updated form, including its full item list`,
      },
      {
        name: 'required_revision_id',
        type: 'string',
        required: false,
        description: `If set, the update is rejected unless the form's current revision ID matches this value, protecting against concurrent edits`,
      },
    ],
  },
  {
    name: 'googleforms_create_form',
    description: `Create a new Google Form with a title and optional document title. Returns the new form's ID and metadata.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the form shown to respondents`,
      },
      {
        name: 'document_title',
        type: 'string',
        required: false,
        description: `The title of the document shown in Google Drive (defaults to the form title if not provided)`,
      },
    ],
  },
  {
    name: 'googleforms_create_watch',
    description: `Create a watch on a Google Form that publishes a Cloud Pub/Sub notification when the form's schema changes or a new response is submitted. Watches expire seven days after creation unless renewed, and a form allows at most one watch per event type per project.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The type of form event that triggers a notification. One of: 'SCHEMA' (form content/settings changes) or 'RESPONSES' (a new response is submitted).`,
      },
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form to watch`,
      },
      {
        name: 'topic_name',
        type: 'string',
        required: true,
        description: `The fully qualified name of the Cloud Pub/Sub topic to publish notifications to`,
      },
      {
        name: 'watch_id',
        type: 'string',
        required: false,
        description: `Optional ID to assign to the new watch (4-63 lowercase letters, digits, or hyphens). If omitted, one is auto-generated.`,
      },
    ],
  },
  {
    name: 'googleforms_delete_watch',
    description: `Delete a watch from a Google Form, immediately stopping Pub/Sub notifications for that event type. This cannot be undone; a new watch would need to be created to resume notifications.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form the watch belongs to`,
      },
      {
        name: 'watch_id',
        type: 'string',
        required: true,
        description: `The ID of the watch to delete`,
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
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form to list responses for`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter responses by submission time. Format: timestamp > 2026-01-01T00:00:00Z`,
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
  {
    name: 'googleforms_list_watches',
    description: `List the watches configured on a Google Form. A form can have at most one active watch per event type (SCHEMA or RESPONSES) per project.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form whose watches to list`,
      },
    ],
  },
  {
    name: 'googleforms_renew_watch',
    description: `Renew an existing watch on a Google Form for another seven days from now. Watches expire seven days after creation (or after the last renewal) unless renewed again.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form the watch belongs to`,
      },
      {
        name: 'watch_id',
        type: 'string',
        required: true,
        description: `The ID of the watch to renew`,
      },
    ],
  },
  {
    name: 'googleforms_set_publish_settings',
    description: `Update a Google Form's publish settings: whether the form is published and whether it is currently accepting responses. Legacy forms created before publish settings existed are not supported.`,
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Form to update`,
      },
      {
        name: 'is_published',
        type: 'boolean',
        required: true,
        description: `Whether the form is published and viewable by anyone with the link`,
      },
      {
        name: 'is_accepting_responses',
        type: 'boolean',
        required: false,
        description: `Whether the form is currently accepting responses. Can only be true if the form is published.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: false,
        description: `Optional field mask limiting which publishSettings fields to update, e.g. 'publishState'. If omitted, all provided fields are updated.`,
      },
    ],
  },
]
