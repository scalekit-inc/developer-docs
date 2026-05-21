import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlemeet_create_meet_space',
    description: `Create a new Google Meet meeting space. Optionally configure access type and entry point access restrictions. Returns the meeting URI and space details. Uses OAuth credentials.`,
    params: [
      { name: 'access_type', type: 'string', required: false, description: `Access type for the meeting space. One of: 'OPEN' (anyone with link), 'TRUSTED' (domain users), 'RESTRICTED' (only invited participants).` },
      { name: 'entry_point_access', type: 'string', required: false, description: `Who can use entry points to join. One of: 'ALL' (anyone), 'CREATOR_APP_ONLY' (only the creating app's users).` },
      { name: 'schema_version', type: 'string', required: false, description: `Optional schema version to use for tool execution` },
      { name: 'tool_version', type: 'string', required: false, description: `Optional tool version to use for execution` },
    ],
  },
  {
    name: 'googlemeet_end_meet_conference',
    description: `End the active conference in a Google Meet space, disconnecting all participants. Requires the resource name of the space (e.g., 'spaces/abc123'). Uses OAuth credentials.`,
    params: [
      { name: 'space_name', type: 'string', required: true, description: `Resource name of the Meet space whose active conference to end (e.g., 'spaces/abc123').` },
      { name: 'schema_version', type: 'string', required: false, description: `Optional schema version to use for tool execution` },
      { name: 'tool_version', type: 'string', required: false, description: `Optional tool version to use for execution` },
    ],
  },
  {
    name: 'googlemeet_get_meet_space',
    description: `Retrieve details of a Google Meet meeting space by its resource name (e.g., 'spaces/abc123'), including its meeting URI and configuration. Uses OAuth credentials.`,
    params: [
      { name: 'space_name', type: 'string', required: true, description: `Resource name of the Meet space to retrieve (e.g., 'spaces/abc123').` },
      { name: 'schema_version', type: 'string', required: false, description: `Optional schema version to use for tool execution` },
      { name: 'tool_version', type: 'string', required: false, description: `Optional tool version to use for execution` },
    ],
  },
]
