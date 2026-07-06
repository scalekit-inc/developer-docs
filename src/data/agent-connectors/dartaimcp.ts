import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'dartaimcp_add_task_attachment_from_url',
    description: `Attach a file from a provided URL to a task.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task.` },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the file to attach.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional display name for the attachment.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_add_task_comment',
    description: `Record a new comment that the user intends to add to a given task.`,
    params: [
      { name: 'item', type: 'object', required: true, description: `Comment details.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_add_task_time_tracking',
    description: `Record an additional time tracking entry on a task.`,
    params: [
      {
        name: 'finishedAt',
        type: 'string',
        required: true,
        description: `ISO 8601 end datetime of the time tracking entry.`,
      },
      { name: 'id', type: 'string', required: true, description: `The ID of the task.` },
      {
        name: 'startedAt',
        type: 'string',
        required: true,
        description: `ISO 8601 start datetime of the time tracking entry.`,
      },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The identifier (email) of the user logging time.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_create_agent',
    description: `Create a new agent in the workspace with a name and optional description or instructions.`,
    params: [
      {
        name: 'item_name',
        type: 'string',
        required: true,
        description: `The display name of the new agent.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'item_executionMode',
        type: 'string',
        required: false,
        description: `How the agent runs when triggered.`,
      },
      {
        name: 'item_forwarding_body',
        type: 'string',
        required: false,
        description: `Custom request body template for the forwarding webhook.`,
      },
      {
        name: 'item_forwarding_responseKey',
        type: 'string',
        required: false,
        description: `Key in the webhook response to extract as the agent's output.`,
      },
      {
        name: 'item_forwarding_url',
        type: 'string',
        required: false,
        description: `Webhook URL to forward tasks to (used when executionMode is Forwarding).`,
      },
      {
        name: 'item_instructions_markdown',
        type: 'string',
        required: false,
        description: `Markdown instructions for the agent (used when executionMode is Instructions).`,
      },
      {
        name: 'item_instructions_model',
        type: 'string',
        required: false,
        description: `LLM model to use for the agent's instructions.`,
      },
      {
        name: 'item_instructions_thinkingLevel',
        type: 'string',
        required: false,
        description: `Thinking depth level for the agent's LLM.`,
      },
      {
        name: 'item_instructions_webEnabled',
        type: 'boolean',
        required: false,
        description: `Whether the agent can browse the web.`,
      },
      {
        name: 'item_local_agent',
        type: 'string',
        required: false,
        description: `Local CLI agent to use when executionMode is Local.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_create_doc',
    description: `Record a new doc that the user intends to write down.`,
    params: [
      { name: 'item_title', type: 'string', required: true, description: `The title of the doc.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'item_dartboardDuid',
        type: 'string',
        required: false,
        description: `The ID of the dartboard to place the doc in.`,
      },
      {
        name: 'item_text',
        type: 'string',
        required: false,
        description: `The doc content in markdown format.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_create_task',
    description: `Record a new task that the user intends to do.`,
    params: [
      { name: 'item', type: 'object', required: true, description: `The task object to create.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_delete_agent',
    description: `Delete an agent by its ID.`,
    params: [
      {
        name: 'duid',
        type: 'string',
        required: true,
        description: `The ID of the agent to delete.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_delete_doc',
    description: `Move an existing doc to the trash.`,
    params: [
      { name: 'duid', type: 'string', required: true, description: `The ID of the doc to delete.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_delete_task',
    description: `Move an existing task to the trash.`,
    params: [
      {
        name: 'duid',
        type: 'string',
        required: true,
        description: `The ID of the task to delete.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_agent',
    description: `Retrieve an existing agent by its ID, including its name and current description.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the agent.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_config',
    description: `Get information about the user's space, including all possible values.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_dartboard',
    description: `Retrieve an existing dartboard.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the dartboard.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_doc',
    description: `Retrieve an existing doc.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the doc.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_folder',
    description: `Retrieve an existing folder by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the folder.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_task',
    description: `Retrieve an existing task by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_get_view',
    description: `Retrieve an existing view by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the view.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_list_agents',
    description: `List all agents in the workspace.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_list_comments',
    description: `List comments for a task with filtering options.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max number of comments to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of comments to skip.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_list_docs',
    description: `List docs with filtering and search capabilities.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'dartboardDuid',
        type: 'string',
        required: false,
        description: `Filter by dartboard ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max number of docs to return.`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Number of docs to skip.` },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
      { name: 'text', type: 'string', required: false, description: `Search text.` },
    ],
  },
  {
    name: 'dartaimcp_list_help_center_articles',
    description: `Search for up to two help center articles by semantic similarity to a query.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `The search query text.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_list_tasks',
    description: `List tasks with powerful filtering options.`,
    params: [
      {
        name: 'assigneeDuid',
        type: 'string',
        required: false,
        description: `Filter by assignee user ID.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'dartboardDuid',
        type: 'string',
        required: false,
        description: `Filter by dartboard ID.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max number of tasks.` },
      { name: 'offset', type: 'integer', required: false, description: `Number of tasks to skip.` },
      { name: 'priority', type: 'string', required: false, description: `Filter by priority.` },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
      { name: 'statusDuid', type: 'string', required: false, description: `Filter by status ID.` },
      { name: 'text', type: 'string', required: false, description: `Search text.` },
    ],
  },
  {
    name: 'dartaimcp_move_task',
    description: `Move a task to a specific position by placing it before or after another task. Exactly one of beforeTaskId or afterTaskId must be provided.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task to move.` },
      {
        name: 'afterTaskId',
        type: 'string',
        required: false,
        description: `Move this task immediately after the task with this ID.`,
      },
      {
        name: 'beforeTaskId',
        type: 'string',
        required: false,
        description: `Move this task immediately before the task with this ID.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_report_issue',
    description: `Create a concise markdown issue report for Dart Support. Provide the full report as markdown text in the item.text field.`,
    params: [
      {
        name: 'item',
        type: 'object',
        required: true,
        description: `The issue report in markdown format.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_retrieve_skill_by_title',
    description: `Retrieve a skill by its title.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the skill to retrieve.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_update_agent',
    description: `Update an agent's name and/or description. Only the fields provided will be changed.`,
    params: [
      {
        name: 'duid',
        type: 'string',
        required: true,
        description: `The ID of the agent to update.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'item_executionMode',
        type: 'string',
        required: false,
        description: `How the agent runs when triggered.`,
      },
      {
        name: 'item_forwarding_body',
        type: 'string',
        required: false,
        description: `Updated custom request body for the forwarding webhook.`,
      },
      {
        name: 'item_forwarding_responseKey',
        type: 'string',
        required: false,
        description: `Updated key in the webhook response to extract.`,
      },
      {
        name: 'item_forwarding_url',
        type: 'string',
        required: false,
        description: `Updated webhook URL for forwarding mode.`,
      },
      {
        name: 'item_instructions_markdown',
        type: 'string',
        required: false,
        description: `Updated markdown instructions for the agent.`,
      },
      {
        name: 'item_instructions_model',
        type: 'string',
        required: false,
        description: `Updated LLM model for the agent.`,
      },
      {
        name: 'item_instructions_thinkingLevel',
        type: 'string',
        required: false,
        description: `Updated thinking depth level for the agent's LLM.`,
      },
      {
        name: 'item_instructions_webEnabled',
        type: 'boolean',
        required: false,
        description: `Whether the agent can browse the web.`,
      },
      {
        name: 'item_local_agent',
        type: 'string',
        required: false,
        description: `Updated local CLI agent for Local execution mode.`,
      },
      {
        name: 'item_name',
        type: 'string',
        required: false,
        description: `New display name for the agent.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_update_doc',
    description: `Update certain properties of an existing doc.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the doc to update.` },
      { name: 'item', type: 'object', required: true, description: `The doc fields to update.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_update_doc_text',
    description: `Apply targeted text updates to a doc's content.`,
    params: [
      { name: 'duid', type: 'string', required: true, description: `The ID of the doc.` },
      {
        name: 'operations',
        type: 'array',
        required: true,
        description: `List of text update operations to apply.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_update_task',
    description: `Update properties of an existing task.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the task to update.` },
      { name: 'item', type: 'object', required: true, description: `The task fields to update.` },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dartaimcp_update_task_description',
    description: `Apply targeted text updates to a task's description.`,
    params: [
      { name: 'duid', type: 'string', required: true, description: `The ID of the task.` },
      {
        name: 'operations',
        type: 'array',
        required: true,
        description: `List of text update operations.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
]
