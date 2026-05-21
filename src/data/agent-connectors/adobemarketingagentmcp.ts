import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'adobemarketingagentmcp_adobe-marketing-agent-mcp-widget',
    description: `Send a natural-language query to the Adobe Marketing AI assistant to analyze audiences, troubleshoot journeys, and retrieve marketing insights.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The natural-language request to send to the assistant (e.g. "What are my top audience segments this month?").`,
      },
      {
        name: 'execution_mode',
        type: 'string',
        required: false,
        description: `Controls how the task runs. Use "async" for long-running operations; "sync" (default) for immediate responses. Accepted values: sync, async.`,
      },
      {
        name: 'chat_id',
        type: 'string',
        required: false,
        description: `Optional identifier to correlate this request with a chat or conversation context.`,
      },
      {
        name: 'async',
        type: 'boolean',
        required: false,
        description: `Compatibility flag; set to true to request async execution.`,
      },
      {
        name: 'long_running',
        type: 'boolean',
        required: false,
        description: `Compatibility flag; set to true to request async execution for long-running tasks.`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-context-management-widget',
    description: `Display and manage the current organization, sandbox, and dataview context, allowing the user to switch between them.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional context for the widget, such as which sandbox or dataview to display.`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-feedback-widget',
    description: `Show an interactive feedback form with thumbs up/down and rating categories; falls back to text-based feedback if widgets are not supported.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional initial feedback message to pre-populate the feedback form.`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-get_task',
    description: `Retrieve the status and events for an async task by ID; use the cursor to poll only for new events since the last fetch.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the async task to retrieve. Returned by tools that support async execution.`,
      },
      {
        name: 'cursor',
        type: 'integer',
        required: false,
        description: `Offset cursor from the previous response; use 0 to fetch all events from the beginning.`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-list_tasks',
    description: `List all async tasks associated with the current conversation context.`,
    params: [],
  },
  {
    name: 'adobemarketingagentmcp_core-plan_completion_decision',
    description: `Submit the user's approval or rejection for a pending plan before it is executed.`,
    params: [
      {
        name: 'decision',
        type: 'string',
        required: true,
        description: `The user's approval decision. Accepted values: Approve (execute the proposed plan), Reject (cancel it).`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-provide_feedback',
    description: `Submit user feedback about the AI assistant experience; automatically classifies sentiment and calls the feedback API.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `The user's feedback message; used in text mode when the feedback widget is not available.`,
      },
      {
        name: 'sentiment',
        type: 'string',
        required: false,
        description: `The user's overall sentiment rating. Accepted values: like, dislike.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional free-text comment to accompany the feedback.`,
      },
      {
        name: 'flagged',
        type: 'boolean',
        required: false,
        description: `Set to true if the feedback reports harmful content; triggers the flag API instead of sentiment feedback.`,
      },
      {
        name: 'flagCategories',
        type: 'array',
        required: false,
        description: `Categories of harmful content being reported. Accepted values: biased, harm, offensive, trademark-violation, other.`,
      },
      {
        name: 'pickList',
        type: 'array',
        required: false,
        description: `Selected feedback option labels chosen from the widget's predefined list (e.g. ["Incorrect info", "Not helpful"]).`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-set_dataview',
    description: `Set the active Customer Journey Analytics dataview for the current session.`,
    params: [
      {
        name: 'dataviewName',
        type: 'string',
        required: true,
        description: `The name of the Customer Journey Analytics dataview to set as the active context (e.g. "My Analytics View").`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-set_sandbox',
    description: `Set the active Adobe Experience Platform sandbox for the current session.`,
    params: [
      {
        name: 'sandboxName',
        type: 'string',
        required: true,
        description: `The technical name (one word) of the Adobe Experience Platform sandbox to activate (e.g. "prod").`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-switch_org',
    description: `Switch to a different Adobe organization by exchanging the current IMS token.`,
    params: [
      {
        name: 'org_name',
        type: 'string',
        required: true,
        description: `The display name or IMS Org ID of the Adobe organization to switch to (e.g. "CJM Stage" or "8D9582BC6A017FDB0A495E5F@AdobeOrg").`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-switch_sandbox_dataview',
    description: `Update the active sandbox and/or dataview for the session in a single call.`,
    params: [
      {
        name: 'sandboxName',
        type: 'string',
        required: false,
        description: `The technical name (one word) of the sandbox to activate. Omit to leave the sandbox unchanged.`,
      },
      {
        name: 'dataviewName',
        type: 'string',
        required: false,
        description: `The name of the Customer Journey Analytics dataview to activate. Omit to leave the dataview unchanged.`,
      },
    ],
  },
  {
    name: 'adobemarketingagentmcp_core-user_preferences',
    description: `Read or clear the user's persisted preferences including sandbox, dataview, org, and region settings.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Action to perform. Accepted values: get (returns current saved preferences), clear (deletes all saved preferences). Defaults to get.`,
      },
    ],
  },
]
