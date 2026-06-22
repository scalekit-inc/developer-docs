import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'devrevmcp_add_comment',
    description: `Add a comment to any DevRev object, with support for markdown formatting and user mentions.`,
    params: [
      { name: 'object', type: 'string', required: true, description: `DON ID of the DevRev object to comment on.` },
      { name: 'body', type: 'string', required: false, description: `The markdown-formatted body of the comment.` },
      { name: 'snap_kit_body', type: 'string', required: false, description: `Optional snap-kit UI component to render with the comment. Accepts a static snap-kit component as a valid JSON object.` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility of the comment: external (default), internal (dev org only), or private (specified users only).` },
    ],
  },
  {
    name: 'devrevmcp_create_object',
    description: `Create a new DevRev object (issue, ticket, etc.) by specifying an action name and field values.`,
    params: [
      { name: 'action_name', type: 'string', required: true, description: `The create action identifier (e.g., create_issue, create_ticket). Must be one of the create actions returned by discover_schema.` },
      { name: 'values', type: 'object', required: true, description: `Key-value pairs of field names and values for the new object. Call discover_schema first to get required and optional fields.` },
      { name: 'subtype', type: 'string', required: false, description: `The subtype of the object to create (e.g., issue, ticket). Omit to create the stock type.` },
    ],
  },
  {
    name: 'devrevmcp_discover_schema',
    description: `Retrieve the input schema for a DevRev action, or list all available actions.`,
    params: [
      { name: 'action_name', type: 'string', required: false, description: `The action name to retrieve the schema for (e.g., create_issue). Omit to list all available actions.` },
      { name: 'subtype', type: 'string', required: false, description: `The subtype to get the schema for. Omit to retrieve the schema for the stock type.` },
    ],
  },
  {
    name: 'devrevmcp_fetch_object_context',
    description: `Fetch contextual information about any DevRev object by its DON ID or display ID.`,
    params: [
      { name: 'object_id', type: 'string', required: true, description: `The DON ID or display ID of the DevRev object to fetch context for.` },
    ],
  },
  {
    name: 'devrevmcp_get_self',
    description: `Retrieve the profile details of the currently authenticated DevRev user.`,
    params: [
    ],
  },
  {
    name: 'devrevmcp_get_sprint',
    description: `Retrieve the details of a specific DevRev sprint by its DON ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The DON ID of the sprint to retrieve.` },
    ],
  },
  {
    name: 'devrevmcp_get_sprint_board',
    description: `Retrieve the details of a specific DevRev sprint board (vista) by its DON ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The DON ID of the sprint board (vista) to retrieve.` },
    ],
  },
  {
    name: 'devrevmcp_get_tool_metadata',
    description: `Retrieve comprehensive metadata about available DevRev MCP tools. Call this first before any other operation.`,
    params: [
    ],
  },
  {
    name: 'devrevmcp_get_valid_stage_transitions',
    description: `Return valid stage transitions for a given DevRev object type and its current stage.`,
    params: [
      { name: 'object_type', type: 'string', required: true, description: `The stock leaf type of the object.` },
      { name: 'stage_id', type: 'string', required: true, description: `The DON ID of the current stage of the object.` },
    ],
  },
  {
    name: 'devrevmcp_hybrid_search',
    description: `Search across DevRev's knowledge graph using natural language to find issues, tickets, articles, and other objects.`,
    params: [
      { name: 'namespace', type: 'string', required: true, description: `Primary namespace to search in.` },
      { name: 'query', type: 'string', required: true, description: `A natural language question to search across DevRev's knowledge graph.` },
      { name: 'reranking_instruction', type: 'string', required: true, description: `A single sentence (≤15 words) guiding document ranking based on the query.` },
      { name: 'allowed_namespaces', type: 'array', required: false, description: `Namespaces to restrict the search to. Leave empty to search all namespaces.` },
      { name: 'ids', type: 'array', required: false, description: `DON IDs to filter search results by.` },
      { name: 'include_comments', type: 'boolean', required: false, description: `Whether to include object comments in results. When true, results are limited to 10 objects.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return.` },
      { name: 'projection_type', type: 'string', required: false, description: `Shape of each returned object: id, id_with_label, or summary.` },
    ],
  },
  {
    name: 'devrevmcp_link_objects',
    description: `Create a link between two DevRev objects using a specified link action.`,
    params: [
      { name: 'action_name', type: 'string', required: true, description: `The link action identifier (e.g., link_ticket_with_issue). Must be one of the link actions returned by discover_schema.` },
      { name: 'source', type: 'string', required: true, description: `The display ID of the source object to link from (e.g., ISS-123, TKT-123).` },
      { name: 'target', type: 'string', required: true, description: `The display ID of the target object to link to (e.g., TKT-456, ISS-456).` },
      { name: 'link_type', type: 'string', required: false, description: `Type of link defining the relationship between the two objects.` },
    ],
  },
  {
    name: 'devrevmcp_list_objects',
    description: `List DevRev objects (issues, tickets, etc.) with optional filters using a specified list action.`,
    params: [
      { name: 'action_name', type: 'string', required: true, description: `The list action identifier (e.g., list_issues, list_tickets). Must be one of the list actions returned by discover_schema.` },
      { name: 'fields', type: 'array', required: false, description: `Field names to include in each returned object. Omit to return all fields.` },
      { name: 'values', type: 'object', required: false, description: `Filter parameters to narrow results. Call discover_schema first to get available filter fields.` },
    ],
  },
  {
    name: 'devrevmcp_update_object',
    description: `Update fields on an existing DevRev object using a specified update action.`,
    params: [
      { name: 'action_name', type: 'string', required: true, description: `The update action identifier (e.g., update_issue, update_ticket). Must be one of the update actions returned by discover_schema.` },
      { name: 'values', type: 'object', required: true, description: `Fields to update including the object ID. Use discover_schema for allowed fields.` },
      { name: 'subtype', type: 'string', required: false, description: `The subtype of the object to update. Omit to update the stock type.` },
    ],
  },
]
