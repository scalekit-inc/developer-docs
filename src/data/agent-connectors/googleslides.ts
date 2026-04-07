import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
