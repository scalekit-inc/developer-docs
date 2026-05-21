import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'adobemarketingagentmcp_adobe-marketing-agent-mcp-widget',
    description: `Send a natural-language query to the Adobe Marketing AI assistant to analyze audiences, troubleshoot journeys, and retrieve marketing insights.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The natural-language request or feedback message to send to the assistant.` },
      { name: 'async', type: 'boolean', required: false, description: `Compatibility flag; set to true to request async execution.` },
      { name: 'chat_id', type: 'string', required: false, description: `Optional identifier to correlate this request with a chat or conversation context.` },
      { name: 'execution_mode', type: 'string', required: false, description: `Controls how the task runs; use async for long-running polling-based tasks.` },
      { name: 'long_running', type: 'boolean', required: false, description: `Compatibility flag; set to true to request async execution for long-running tasks.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-context-management-widget',
    description: `Display and manage the current organization, sandbox, and dataview context, allowing the user to switch between them.`,
    params: [
      { name: 'query', type: 'string', required: false, description: `The natural-language request or feedback message to send to the assistant.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-feedback-widget',
    description: `Show an interactive feedback form with thumbs up/down and rating categories; falls back to text-based feedback if widgets are not supported.`,
    params: [
      { name: 'query', type: 'string', required: false, description: `The natural-language request or feedback message to send to the assistant.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-get_task',
    description: `Retrieve the status and events for an async task by ID; use the cursor to poll only for new events since the last fetch.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `The unique identifier of the async task to retrieve.` },
      { name: 'cursor', type: 'integer', required: false, description: `Offset cursor from the previous response; use 0 to fetch all events from the beginning.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-list_tasks',
    description: `List all async tasks associated with the current conversation context.`,
    params: [
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-plan_completion_decision',
    description: `Submit the user's approval or rejection for a pending plan before it is executed.`,
    params: [
      { name: 'decision', type: 'string', required: true, description: `The user's approval decision for the pending plan.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-provide_feedback',
    description: `Submit user feedback about the AI assistant experience; automatically classifies sentiment and calls the feedback API.`,
    params: [
      { name: 'comment', type: 'string', required: false, description: `Optional free-text comment to accompany the feedback.` },
      { name: 'flagCategories', type: 'array', required: false, description: `Categories of harmful content being reported; required when flagged is true.` },
      { name: 'flagged', type: 'boolean', required: false, description: `Set to true if the feedback reports harmful content; triggers the flag API instead of sentiment feedback.` },
      { name: 'pickList', type: 'array', required: false, description: `Selected feedback option labels chosen from the widget's predefined list.` },
      { name: 'query', type: 'string', required: false, description: `The natural-language request or feedback message to send to the assistant.` },
      { name: 'sentiment', type: 'string', required: false, description: `The user's overall sentiment rating for the interaction.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-set_dataview',
    description: `Set the active Customer Journey Analytics dataview for the current session.`,
    params: [
      { name: 'dataviewName', type: 'string', required: true, description: `The name of the Customer Journey Analytics dataview to set as the active context.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-set_sandbox',
    description: `Set the active Adobe Experience Platform sandbox for the current session.`,
    params: [
      { name: 'sandboxName', type: 'string', required: true, description: `The technical name (one word) of the Adobe Experience Platform sandbox to set as the active context.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-switch_org',
    description: `Switch to a different Adobe organization by exchanging the current IMS token.`,
    params: [
      { name: 'org_name', type: 'string', required: true, description: `The display name or IMS Org ID of the Adobe organization to switch to.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-switch_sandbox_dataview',
    description: `Update the active sandbox and/or dataview for the session in a single call.`,
    params: [
      { name: 'dataviewName', type: 'string', required: false, description: `The name of the Customer Journey Analytics dataview to set as the active context.` },
      { name: 'sandboxName', type: 'string', required: false, description: `The technical name (one word) of the Adobe Experience Platform sandbox to set as the active context.` },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-user_preferences',
    description: `Read or clear the user's persisted preferences including sandbox, dataview, org, and region settings.`,
    params: [
      { name: 'action', type: 'string', required: false, description: `Action to perform on preferences; get returns current settings, clear removes all saved preferences.` },
    ],
  },
]
