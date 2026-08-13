import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googleslides_batch_update_presentation',
    description: `Apply a batch of update requests to a Google Slides presentation in a single atomic call, such as inserting a slide, inserting text into a shape, creating a table, replacing text, or deleting an object. Returns the presentation ID and one reply per request, in the same order they were submitted.`,
    params: [
      {
        name: 'presentation_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Slides presentation to update`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Ordered list of update requests to apply. Each item is a Slides API Request object, e.g. {"createSlide": {...}} or {"insertText": {...}}`,
      },
      {
        name: 'required_revision_id',
        type: 'string',
        required: false,
        description: `If set, the update is rejected unless the presentation's current revision ID matches this value, protecting against concurrent edits`,
      },
    ],
  },
  {
    name: 'googleslides_create_presentation',
    description: `Create a new Google Slides presentation with an optional title.`,
    params: [
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the new presentation`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googleslides_get_page',
    description: `Get the latest version of a single page (slide) within a Google Slides presentation, including its page elements, layout properties, and notes.`,
    params: [
      {
        name: 'page_object_id',
        type: 'string',
        required: true,
        description: `The object ID of the page (slide) to retrieve`,
      },
      {
        name: 'presentation_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Slides presentation containing the page`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Fields to include in the response`,
      },
    ],
  },
  {
    name: 'googleslides_get_page_thumbnail',
    description: `Generate and retrieve a thumbnail image URL for a single page (slide) in a Google Slides presentation. The returned content URL is temporary, valid for about 30 minutes.`,
    params: [
      {
        name: 'page_object_id',
        type: 'string',
        required: true,
        description: `The object ID of the page (slide) to generate a thumbnail for`,
      },
      {
        name: 'presentation_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Slides presentation containing the page`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: false,
        description: `The image format of the thumbnail`,
      },
      {
        name: 'thumbnail_size',
        type: 'string',
        required: false,
        description: `The requested thumbnail image size`,
      },
    ],
  },
  {
    name: 'googleslides_read_presentation',
    description: `Read the complete structure and content of a Google Slides presentation including slides, text, images, shapes, and metadata.`,
    params: [
      {
        name: 'presentation_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Slides presentation to read`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Fields to include in the response`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
]
