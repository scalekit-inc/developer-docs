import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'synapsemcp_get_entity',
    description: `Return Synapse entity metadata by ID (projects, folders, files, tables, etc.). Only retrieves metadata information - does not download file content.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID to fetch (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_annotations',
    description: `Return custom annotation key/value pairs for a Synapse entity.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID whose annotations to fetch (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_children',
    description: `List children for Synapse container entities (projects or folders).`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse container entity ID (project or folder) whose children to list (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_provenance',
    description: `Return provenance (activity) metadata for a Synapse entity, including inputs and code executed.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID whose provenance to fetch (for example syn123456).`,
      },
      {
        name: 'version',
        type: 'integer',
        required: false,
        description: `Optional entity version number to scope the provenance to a specific version. Omit for the latest version.`,
      },
    ],
  },
  {
    name: 'synapsemcp_search_synapse',
    description: `Search Synapse entities using keyword queries with optional name/type/parent filters. Results are served by Synapse as data custodian. Attribution and licensing are determined by the original contributors; check the specific entity's annotations or Wiki for details.`,
    params: [
      {
        name: 'entity_type',
        type: 'string',
        required: false,
        description: `Filter results to a single entity type (for example file, folder, project, table).`,
      },
      {
        name: 'entity_types',
        type: 'array',
        required: false,
        description: `Filter results to multiple entity types. Pass as a JSON array of strings via the SDK, not as a string.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter results to entities matching this exact name.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Restrict the search to entities under this parent container ID (for example syn123456).`,
      },
      {
        name: 'query_term',
        type: 'string',
        required: false,
        description: `Free-text keyword query to search Synapse entities.`,
      },
    ],
  },
]
