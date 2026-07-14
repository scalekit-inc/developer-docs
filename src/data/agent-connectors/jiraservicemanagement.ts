import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jiraservicemanagement_approval_answer',
    description: `Approve or decline an approval on a customer request. The approval is assumed to be owned by the user making the call. Requires the user to be assigned to the approval request.`,
    params: [
      {
        name: 'approvalId',
        type: 'integer',
        required: true,
        description: `The ID of the approval to be updated.`,
      },
      {
        name: 'decision',
        type: 'string',
        required: true,
        description: `Response to the approval request. Must be either 'approve' or 'decline'.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to be updated.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_approval_get',
    description: `Returns an approval on a customer request. Use this method to determine the status of an approval and the list of approvers. Requires permission to view the customer request.`,
    params: [
      {
        name: 'approvalId',
        type: 'integer',
        required: true,
        description: `The ID of the approval to be returned.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request the approval is on.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_approvals_list',
    description: `Returns all approvals on a customer request. Requires permission to view the customer request. Supports pagination via start and limit.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to be queried for its approvals.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of approvals to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_article_get',
    description: `Retrieve and view a specific knowledge base article by its Confluence page ID. Returns the article content for display in the customer portal.`,
    params: [
      {
        name: 'pageId',
        type: 'integer',
        required: true,
        description: `The Confluence page ID of the knowledge base article to view.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_articles_list',
    description: `Search for knowledge base articles matching a query string across all service desks. Optionally highlight matching terms in the title and excerpt. Requires permission to access the customer portal.`,
    params: [
      {
        name: 'highlight',
        type: 'boolean',
        required: true,
        description: `If set to true, matching query terms in the title and excerpt will be highlighted using the @@@hl@@@term@@@endhl@@@ syntax. Default is false.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The string used to filter the articles. This parameter is required.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pointer to a set of search results, returned as part of the next or prev URL from a previous search call. Use for cursor-based pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of articles to return per page. Default is 50.`,
      },
      {
        name: 'prev',
        type: 'boolean',
        required: false,
        description: `Whether to navigate to the previous page. Defaults to false. Set to true along with the prev URL cursor from a previous search call.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `(Deprecated) The starting index of the returned objects. Base index is 0. Prefer using cursor for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_assets_workspaces_list',
    description: `Returns a paginated list of Assets workspace IDs for the Jira Service Management instance. Use a returned workspace ID to construct paths for the Assets REST APIs. Any authenticated user can call this endpoint.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of workspace IDs to return per page. Default is 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned workspace IDs. Base index is 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_attachment_thumbnail_get',
    description: `Returns the thumbnail image of an attachment on a customer request, identified by issue ID/key and attachment ID. Returns raw binary image content, not JSON. Requires permission to browse the project the issue belongs to (and, if issue-level security applies, permission to view the issue).`,
    params: [
      {
        name: 'attachmentId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the attachment whose thumbnail should be retrieved.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request (issue) the attachment is associated with.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_comment_attachments_list',
    description: `Return the attachments referenced in a specific comment on a customer request, with pagination support. Customers can only view attachments on public comments for requests where they are the reporter or a participant; agents can see both internal and public comments. Requires permission to view the customer request.`,
    params: [
      {
        name: 'commentId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the comment whose attachments should be retrieved.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request that contains the comment.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of attachments to return per page. Default is 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index (0-based) of the returned attachments, for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_comment_with_attachment_create',
    description: `Create a comment on a customer request using one or more attachment files that were previously uploaded via the 'Attach Temporary File' endpoint, with visibility controlled by the public flag. Optionally include additional comment text alongside the attachments.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to which the attachment will be added.`,
      },
      {
        name: 'temporaryAttachmentIds',
        type: 'array',
        required: true,
        description: `List of IDs for the temporary attachments to be added to the customer request. Obtain these IDs from the 'Attach Temporary File' endpoint.`,
      },
      {
        name: 'additionalComment',
        type: 'object',
        required: false,
        description: `Additional content of the comment, as a JSON object, e.g. {"body": "Here are the requested files"}`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Controls whether the comment and its attachments are visible to customers. Defaults to true.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_create',
    description: `Add a new customer to the Jira Service Management instance by providing an email address and display name. The display name does not need to be unique. The customer's identifiers (name and key) are automatically generated. Requires Jira Administrator Global permission.`,
    params: [
      {
        name: 'displayName',
        type: 'string',
        required: true,
        description: `Customer's name for display in the UI.`,
      },
      { name: 'email', type: 'string', required: true, description: `Customer's email address.` },
      {
        name: 'strictConflictStatusCode',
        type: 'boolean',
        required: false,
        description: `Optional boolean flag. When true, the API returns a 409 Conflict status code for a duplicate customer creation request instead of the default behavior.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_invite',
    description: `Invite a customer to a specific service desk by sending them an email invitation, creating a new customer account if one does not already exist. Requires Jira Administrator Global permission and service desk administrator permission.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address to send the invitation to. Used to create the customer account if one does not already exist.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk the new customer should be invited to. This can alternatively be a project identifier.`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Customer's display name to show in the UI. Does not need to be unique.`,
      },
      {
        name: 'strictConflictStatusCode',
        type: 'boolean',
        required: false,
        description: `If true, return a 409 Conflict status when a customer with the same email already exists, instead of succeeding silently.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_portal_access_revoke',
    description: `Revoke portal-only access for a specific user, removing their ability to log in to the Jira Service Management customer portal as a portal-only user. After revocation the user can no longer submit or view requests through the portal. Requires site administration permission (site-admin group membership).`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The account ID of the user whose portal-only access will be revoked. This uniquely identifies the portal-only account.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_request_create',
    description: `Create a customer request in a service desk. Requires the service desk ID and request type ID, plus any Jira fields required by the request type (provided as a JSON map in requestFieldValues). Use the 'Get Request Type Fields' endpoint to discover which fields a request type requires. Optionally raise the request on behalf of another customer, add participants, or attach form answers.`,
    params: [
      {
        name: 'requestTypeId',
        type: 'string',
        required: true,
        description: `ID of the request type for the request.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `ID of the service desk in which to create the request.`,
      },
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `(Experimental) Shows extra information for the request channel, e.g. the UI surface the request was raised from.`,
      },
      {
        name: 'form',
        type: 'object',
        required: false,
        description: `Provides answers to the form associated with the request type, as a JSON object. Omit Jira fields from requestFieldValues if they're linked to form answers. Example: {"answers": {"1": {"text": "Answer text"}}}`,
      },
      {
        name: 'isAdfRequest',
        type: 'boolean',
        required: false,
        description: `(Experimental) Whether to accept rich text fields in Atlassian Document Format (ADF). Set to true if form or field values contain ADF-formatted rich text.`,
      },
      {
        name: 'raiseOnBehalfOf',
        type: 'string',
        required: false,
        description: `The accountId of the customer that the request is being raised on behalf of. Requires manage:servicedesk-customer permission.`,
      },
      {
        name: 'requestFieldValues',
        type: 'object',
        required: false,
        description: `JSON map of Jira field IDs and their values representing the content of the request, e.g. {"summary": "Request help with printer", "description": "My printer is not working"}. Required fields depend on the request type configuration.`,
      },
      {
        name: 'requestParticipants',
        type: 'array',
        required: false,
        description: `List of customers to participate in the request, as a list of accountId values.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_request_get',
    description: `Retrieve a customer request by its ID or key. Customers only see requests they created, were created on their behalf, or are participating in. Note: requestFieldValues does not include hidden fields. Use the expand parameter to include service desk, request type, participant, SLA, status, or attachment details.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or Key of the customer request to be returned.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to expand, where: serviceDesk returns additional service desk details; requestType returns additional customer request type details; participant returns the participant details; sla returns the SLA information; status returns the status transitions; attachment returns request attachments; action returns the actions that can be performed on the request; comment returns comments on the request.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_request_status_list',
    description: `Retrieve the status history of a Jira Service Management customer request, in chronological order with the most recent (current) status first. A status represents the state of the request in its workflow. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to be retrieved.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of statuses to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_requests_list',
    description: `Returns all customer requests for the user executing the query, ordered chronologically by the latest activity on each request (e.g. the latest status transition or comment). Customers only see requests they created, were created on their behalf, or are participating in. Supports filtering by search term, ownership, status, approval status, organization, service desk, and request type.`,
    params: [
      {
        name: 'approvalStatus',
        type: 'string',
        required: false,
        description: `Filters results to customer requests based on their approval status. Valid values: MY_PENDING_APPROVAL (returns customer requests pending the user's approval), MY_HISTORY_APPROVAL (returns customer requests where the user was an approver). Note: only valid when used with requestOwnership=APPROVER.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to expand on each customer request, e.g. serviceDesk, requestType, participant, sla, status, attachment, action, comment. serviceDesk returns additional details for each service desk; requestType returns additional details for each request type; participant returns the participant details, if any, for each customer request.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default: 50.`,
      },
      {
        name: 'organizationId',
        type: 'integer',
        required: false,
        description: `Filters customer requests that belong to a specific organization (the user must be a member of that organization). Note: only valid when used with requestOwnership=ORGANIZATION.`,
      },
      {
        name: 'requestOwnership',
        type: 'string',
        required: false,
        description: `Filters customer requests using the following values: OWNED_REQUESTS (returns customer requests where the user is the creator), PARTICIPATED_REQUESTS (returns customer requests where the user is a participant), ORGANIZATION (returns customer requests for an organization of which the user is a member), APPROVER (returns customer requests where the user is an approver), APPROVER_BEFORE_ACTIVE (returns customer requests where the user was an approver based on the current status).`,
      },
      {
        name: 'requestStatus',
        type: 'string',
        required: false,
        description: `Filters customer requests where the request is closed, open, or either of the two: CLOSED_REQUESTS returns customer requests that are closed; OPEN_REQUESTS returns customer requests that are open; ALL_REQUESTS returns all customer requests.`,
      },
      {
        name: 'requestTypeId',
        type: 'integer',
        required: false,
        description: `Filters customer requests by request type. Note that serviceDeskId must be specified for the service desk in which the request type belongs.`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: false,
        description: `Filters customer requests where the request summary matches the searchTerm. Wildcards can be used in the searchTerm parameter.`,
      },
      {
        name: 'serviceDeskId',
        type: 'integer',
        required: false,
        description: `Filters customer requests by service desk.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_transition_perform',
    description: `Perform a customer workflow transition on a Jira Service Management request, moving it from one status to another. Use the List Customer Transitions tool to find valid transition IDs for the request. An optional comment can be included to explain the reason for the transition. Requires the Transition Issues permission (and Add Comments permission if a comment is supplied).`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to transition.`,
      },
      {
        name: 'transitionId',
        type: 'string',
        required: true,
        description: `The ID of the transition to perform, as returned by the List Customer Transitions tool.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment explaining the reason for the transition. Added as a public comment on the request.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_customer_transitions_list',
    description: `Retrieve the list of workflow transitions that the current user can perform on a Jira Service Management customer request. Use this to determine which actions are available on the request before calling the Perform Customer Transition tool. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request whose transitions will be retrieved.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of transitions to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_feedback_delete',
    description: `Delete the feedback (satisfaction rating and comment) left on a Jira Service Management customer request, identified by request ID or key. The requesting user must be the reporter of the request or an Atlassian Connect app.`,
    params: [
      {
        name: 'requestIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the request whose feedback should be deleted.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_feedback_get',
    description: `Retrieve the feedback (satisfaction rating and comment) left on a Jira Service Management customer request, identified by request ID or key. Requires view request permission.`,
    params: [
      {
        name: 'requestIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the request to retrieve feedback for.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_info_get',
    description: `Retrieve information about the Jira Service Management instance, including software version, build numbers, and related links. No authentication or login is required to call this endpoint.`,
    params: [],
  },
  {
    name: 'jiraservicemanagement_insight_workspaces_list',
    description: `DEPRECATED: This endpoint is deprecated in favor of the Assets Workspaces endpoint (jiraservicemanagement_assets_workspaces_list). Returns a paginated list of Insight workspace IDs for the Jira Service Management instance. Kept for backward compatibility with older integrations.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of workspace IDs to return per page. Default is 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned workspace IDs. Base index is 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_create',
    description: `Create a new organization in the Jira Service Management instance by providing its name. Requires Service Desk administrator or agent permission (Jira administrators can also be granted this via the Organization management feature).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the organization. Must contain 1-200 characters.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_delete',
    description: `Delete a Jira Service Management organization by its ID. The organization is deleted regardless of other associations it may have, such as associations with service desks. Requires Jira administrator permissions.`,
    params: [
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to delete.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_get',
    description: `Retrieve details of a Jira Service Management organization by its ID. Use this to get organization details whenever your application has an organization ID but needs to display other organization details, such as its name.`,
    params: [
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to retrieve.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_property_delete',
    description: `Remove a custom property from a Jira Service Management organization by its property key. Organization properties are a type of entity property available only via the API and not shown in the Jira Service Management UI.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The ID of the organization from which the property will be removed.`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to remove.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_property_get',
    description: `Retrieve the JSON value of a custom property set on a Jira Service Management organization. Organization properties are a type of entity property available only via the API and not shown in the Jira Service Management UI, used for storing custom data against an organization.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The ID of the organization from which the property will be returned.`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to return.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_property_keys_list',
    description: `Get the keys of all custom properties set on a Jira Service Management organization. Organization properties are a type of entity property available only via the API and not shown in the Jira Service Management UI, used for storing custom data against an organization.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The ID of the organization to list property keys for.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_property_set',
    description: `Set or update the value of a custom property on a Jira Service Management organization. Use this to store custom data against an organization. Organization properties are a type of entity property available only via the API and not shown in the Jira Service Management UI. The value must be a valid JSON string.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `The ID of the organization on which the property will be set.`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the organization's property. The maximum length of the key is 255 bytes.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The JSON value to store for the property (as a JSON string).`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_users_add',
    description: `Add one or more customer users to a Jira Service Management organization, specified by their Atlassian account IDs. Requires Service Desk administrator or agent permissions (or Jira administrator, if configured).`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `List of account IDs of the customers to add to the organization. Example: ["5b10ac8d82e05b22cc7d4ef5"]`,
      },
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to add users to.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_users_list',
    description: `Return all customer users associated with a Jira Service Management organization. Use this to list users for an organization or determine if a specific user is associated with it. Requires Service Desk administrator or agent permissions.`,
    params: [
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to list users for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of users to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organization_users_remove',
    description: `Remove one or more customer users from a Jira Service Management organization, specified by their Atlassian account IDs. Requires Service Desk administrator or agent permissions (or Jira administrator, if configured).`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `List of account IDs of the customers to remove from the organization. Example: ["5b10ac8d82e05b22cc7d4ef5"]`,
      },
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to remove users from.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_organizations_list',
    description: `Returns a paginated list of organizations in the Jira Service Management instance. Use this to present a list of organizations or to locate an organization by name. If the caller is a customer, only organizations they are a member of are listed. Fetching organizations by accountId requires a Service Desk agent license.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The account ID of the user, which uniquely identifies the user across all Atlassian products. When provided, filters organizations associated with this user.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of organizations to return per page. Default is 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned organizations. Base index is 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_queue_get',
    description: `Retrieve details of a specific queue in a service desk. To include a customer request count for the queue in the response (the issueCount field), set includeCount to true.`,
    params: [
      {
        name: 'queueId',
        type: 'integer',
        required: true,
        description: `The ID of the queue to retrieve.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk that the queue belongs to. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'includeCount',
        type: 'boolean',
        required: false,
        description: `Whether to include the queue's customer request (issue) count in the response, in the issueCount field. Default: false.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_queue_issues_list',
    description: `Return the customer requests (issues) currently in a specific queue of a service desk. Only fields that the queue is configured to display are returned for each customer request; for example, if a queue is configured to show description and due date, only those two fields are returned.`,
    params: [
      {
        name: 'queueId',
        type: 'integer',
        required: true,
        description: `The ID of the queue whose customer requests will be returned.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk containing the queue to be queried. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0. Used for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_queues_list',
    description: `Return the queues configured for a service desk. Queues group customer requests by shared criteria (e.g. status, assignee). To include a customer request count for each queue in the response (the issueCount field), set includeCount to true.`,
    params: [
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk whose queues will be returned. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'includeCount',
        type: 'boolean',
        required: false,
        description: `Whether to include each queue's customer request (issue) count in the response, in the issueCount field. Default: false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0. Used for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_attachment_content_get',
    description: `Returns the raw binary content of an attachment on a customer request. To return a thumbnail of the attachment instead, use the 'Get Request Attachment Thumbnail' endpoint. Requires Browse Projects permission for the project the issue is in, and if issue-level security applies, permission to see the issue.`,
    params: [
      {
        name: 'attachmentId',
        type: 'integer',
        required: true,
        description: `The ID for the attachment.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key for the customer request the attachment is associated with.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_attachments_list',
    description: `Returns all the attachments for a customer request. Requires permission to view the customer request. Customers will only get a list of public attachments. Supports pagination via start and limit.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request from which the attachments will be listed.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of attachments to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned attachment. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_comment_create',
    description: `Create a public or private (internal) comment on a customer request. The authenticated user is recorded as the comment's author. Customers can only create public comments. Requires Add Comments permission.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Plain-text content of the comment to add to the customer request.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to which the comment will be added.`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether the comment is public (true) or private/internal (false). Customers can only set this to true.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_comment_get',
    description: `Return details of a single comment on a customer request, identified by issue ID/key and comment ID. Customers can only view public comments on requests where they are the reporter or a participant; agents can see both internal and public comments. Requires permission to view the customer request.`,
    params: [
      {
        name: 'commentId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the comment to retrieve.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request that contains the comment.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to expand, e.g. 'attachment' to include attachment details for the comment.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_comments_list',
    description: `Return all comments on a customer request (issue), with optional filtering for public/internal visibility and pagination. Customers only ever see public comments; no error is raised for missing access, an empty list is returned instead. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request whose comments should be retrieved.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to expand on each comment, e.g. 'attachment' to include attachment details for each comment.`,
      },
      {
        name: 'internal',
        type: 'boolean',
        required: false,
        description: `Whether to include internal (private) comments in the results. Defaults to true if not provided.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of comments to return per page. Default is 50.`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether to include public comments in the results. Defaults to true if not provided.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index (0-based) of the returned comments, for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_feedback_add',
    description: `Add customer satisfaction feedback (CSAT) to a Jira Service Management customer request using its request ID or key. Requires a numeric rating from 1 to 5 and supports an optional comment. The caller must be the reporter of the request or an Atlassian Connect app.`,
    params: [
      {
        name: 'rating',
        type: 'integer',
        required: true,
        description: `Numeric CSAT rating for the request, an integer from 1 (worst) to 5 (best).`,
      },
      {
        name: 'requestIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to post feedback on, e.g. HELP-123 or 10001.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment text to accompany the feedback rating.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of feedback being submitted. Currently the only supported value is 'csat'.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_participants_add',
    description: `Add one or more participants to a Jira Service Management customer request, specified by their Atlassian account IDs. Requires permission to manage participants on the customer request. Note: participants can also be added at request creation time via the requestParticipants field.`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `List of Atlassian account IDs of the users to add as participants on the request.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to have participants added.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_participants_list',
    description: `Retrieve a paginated list of all participants on a Jira Service Management customer request. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to be queried for its participants.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of participants to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_participants_remove',
    description: `Remove one or more participants from a customer request, identified by Atlassian account IDs. Requires permission to manage participants on the customer request.`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `List of Atlassian account IDs identifying the users to remove as participants from the request.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to remove participants from.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_subscribe',
    description: `Subscribe the authenticated user to receive notifications from a customer request. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to subscribe to.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_subscription_status_get',
    description: `Return the notification subscription status of the authenticated user for a customer request. Use this to determine whether the current user is subscribed to notifications for the request. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to check subscription status for.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_create',
    description: `Add a customer request type to a service desk, based on an existing issue type. Not all request type fields can be specified on creation: the request type icon defaults to the headset icon, and request type groups are left empty (meaning the new request type will not be visible on the customer portal until added to a group). Requires Jira administrator or project administrator permissions.`,
    params: [
      {
        name: 'issueTypeId',
        type: 'string',
        required: true,
        description: `The ID of the existing Jira issue type to base this new request type on.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the request type as shown to customers on the service desk portal.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk where the customer request type is to be created. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A longer description of the request type shown to customers on the service desk portal.`,
      },
      {
        name: 'helpText',
        type: 'string',
        required: false,
        description: `Additional help text shown to customers when filling out this request type on the portal.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_delete',
    description: `Delete a customer request type from a Jira Service Management service desk, removing it from all customer requests. This only supports classic (team-managed is not supported) projects. Requires service desk administrator permission.`,
    params: [
      {
        name: 'requestTypeId',
        type: 'integer',
        required: true,
        description: `The ID of the request type to delete.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID or project identifier of the service desk that contains the request type.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_fields_list',
    description: `Retrieve the fields for a Jira Service Management service desk's customer request type. The response also indicates whether the current user can raise requests on behalf of other customers (canRaiseOnBehalfOf) and add request participants (canAddRequestParticipants). Requires permission to access the service desk.`,
    params: [
      {
        name: 'requestTypeId',
        type: 'integer',
        required: true,
        description: `The ID of the request type whose fields are to be returned.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk containing the request type whose fields are to be returned. This can alternatively be a project identifier.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Use expand to include additional information in the response. Accepts 'hiddenFields' to return hidden fields associated with the request type.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_get',
    description: `Retrieve a single customer request type from a Jira Service Management service desk by ID. This operation can be accessed anonymously if the service desk allows it; otherwise requires permission to access the service desk.`,
    params: [
      {
        name: 'requestTypeId',
        type: 'string',
        required: true,
        description: `The ID of the customer request type to retrieve.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk whose customer request type is to be returned. This can alternatively be a project identifier.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional details to include in the response.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_groups_list',
    description: `Retrieve a service desk's customer request type groups. Jira Service Management administrators can arrange the customer request type groups in an arbitrary order for display on the customer portal; the groups are returned in this display order. Requires permission to view the service desk.`,
    params: [
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk whose customer request type groups are to be returned. This can alternatively be a project identifier.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of request type groups to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_permissions_check',
    description: `Check whether a user has permission to administer or submit requests for a list of request type IDs on a service desk. Returns the subset of request type IDs the user can administer (canAdminister) and/or submit requests for (canCreateRequest). If accountId is omitted, the check is performed for the currently authenticated user. Invalid request type IDs are ignored; a maximum of 50 request type IDs can be checked per call. Checking permissions for another user requires Administer Jira or Project Administrator permission.`,
    params: [
      {
        name: 'permissions',
        type: 'array',
        required: true,
        description: `List of permissions to check for each request type. Valid values: canCreateRequest (whether the user can submit a request of this type), canAdminister (whether the user can administer this request type).`,
      },
      {
        name: 'requestTypeIds',
        type: 'array',
        required: true,
        description: `List of request type IDs (numeric) to check permissions for. Maximum of 50 IDs per call.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk the request types belong to. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The Atlassian account ID of the user to check permissions for. If omitted, checks permissions for the currently authenticated user. Example: 5b10ac8d82e05b22cc7d4ef5.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_property_delete',
    description: `Remove a custom property from a Jira Service Management request type by its property key. Properties for a request type in next-gen (team-managed) projects are stored as issue type properties, so they can also be deleted via the Jira Cloud Platform Delete issue type property endpoint. Requires Jira project administrator with a Jira Service Management agent license.`,
    params: [
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to remove.`,
      },
      {
        name: 'requestTypeId',
        type: 'integer',
        required: true,
        description: `The ID of the request type for which the property will be removed.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk which contains the request type. This can alternatively be a project identifier.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_property_get',
    description: `Retrieve the JSON value of a custom property set on a Jira Service Management request type. Properties for a request type in next-gen (team-managed) projects are stored as issue type properties, so they are also available via the Jira Cloud Platform Get issue type property endpoint. Requires permission to view the request type.`,
    params: [
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to return.`,
      },
      {
        name: 'requestTypeId',
        type: 'integer',
        required: true,
        description: `The ID of the request type from which the property will be retrieved.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk which contains the request type. This can alternatively be a project identifier.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_property_keys_list',
    description: `Get the keys of all custom properties set on a Jira Service Management request type. Properties for a request type in next-gen (team-managed) projects are stored as issue type properties, so these keys are also available via the Jira Cloud Platform Get issue type property keys endpoint. Requires permission to view the request type.`,
    params: [
      {
        name: 'requestTypeId',
        type: 'integer',
        required: true,
        description: `The ID of the request type for which keys will be retrieved.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk which contains the request type. This can alternatively be a project identifier.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_type_property_set',
    description: `Set or update the value of a custom property on a Jira Service Management request type. Use this to store custom data against a request type. Properties for a request type in next-gen (team-managed) projects are stored as issue type properties, so they can also be set via the Jira Cloud Platform Set issue type property endpoint. The value must be a valid JSON string. Requires Jira project administrator with a Jira Service Management agent license.`,
    params: [
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the request type property. The maximum length of the key is 255 bytes.`,
      },
      {
        name: 'requestTypeId',
        type: 'integer',
        required: true,
        description: `The ID of the request type on which the property will be set.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk which contains the request type. This can alternatively be a project identifier.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The JSON value to store for the property (as a JSON string).`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_types_list',
    description: `List all customer request types configured in the Jira Service Management instance, optionally filtered by a search query, one or more service desk IDs, and restriction status. Use this to discover the request type IDs needed to create customer requests. To list request types for a single service desk, prefer the service-desk-scoped request types endpoint instead.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional details to include in the response for each request type.`,
      },
      {
        name: 'includeHiddenRequestTypesInSearch',
        type: 'boolean',
        required: false,
        description: `Whether to include hidden request types when filtering with searchQuery.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of request types to return per page. Default is 50.`,
      },
      {
        name: 'restrictionStatus',
        type: 'string',
        required: false,
        description: `Filter request types by restriction status. Valid values are 'open' or 'restricted'.`,
      },
      {
        name: 'searchQuery',
        type: 'string',
        required: false,
        description: `String used to filter request types, matched against each request type's name or description.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: false,
        description: `Comma-separated list of service desk IDs to filter request types by. Only request types belonging to these service desks are returned.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects, base index 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_request_unsubscribe',
    description: `Unsubscribe the authenticated user from notifications on a customer request. Requires permission to view the customer request.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request to unsubscribe from.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_articles_list',
    description: `Search knowledge base articles that belong to a specific service desk's linked knowledge base, matching a required search query string. Use this to find help articles related to a particular service desk. Requires permission to access the service desk.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The string used to filter the knowledge base articles by title and content.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk whose linked knowledge base should be searched.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pointer to a set of search results, returned as the next or prev cursor from a previous call, used to page through results.`,
      },
      {
        name: 'highlight',
        type: 'boolean',
        required: false,
        description: `If true, matching query terms in the title and excerpt are wrapped using the @@@hl@@@term@@@endhl@@@ syntax.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of articles to return per page. Default is 50.`,
      },
      {
        name: 'prev',
        type: 'boolean',
        required: false,
        description: `If true, navigate to the previous page of results using the cursor from the previous search call's prev URL.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `(Deprecated) The starting index of the returned objects, base index 0. Prefer cursor-based pagination instead.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_customers_add',
    description: `Add one or more existing customers, specified by Atlassian account IDs, to a service desk. If any listed customer is already associated with the service desk, no change is made for that customer and the call still succeeds. Requires service desk administrator permission.`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `List of Atlassian account IDs identifying the customers to add to the service desk.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk to add the customers to. This can alternatively be a project identifier.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_customers_list',
    description: `List the customers on a specific service desk, optionally filtered by a query string matched against the customer's display name, username, or email. Requires permission to view the service desk's customer list.`,
    params: [
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk to list customers from. This can alternatively be a project identifier.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of customers to return per page. Default is 50.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `String used to filter the customer list, matched against displayName, name, or email.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects, base index 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_customers_remove',
    description: `Remove one or more customers from a service desk, specified by their Atlassian account IDs. The service desk must have closed (restricted) access for this to take effect. If any listed customer is not associated with the service desk, no change is made for that customer and the call still succeeds.`,
    params: [
      {
        name: 'accountIds',
        type: 'array',
        required: true,
        description: `List of Atlassian account IDs identifying the customers to remove from the service desk.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk to remove the customers from. This can alternatively be a project identifier.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_get',
    description: `Retrieve details of a single service desk by its ID (or a project identifier). Use this when you already know the service desk ID and need its details, such as its name and project key.`,
    params: [
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk to return. This can alternatively be a project key or project ID.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_organization_add',
    description: `Add an organization to a service desk, granting members of that organization access to raise and view requests on the service desk's portal. If the organization ID is already associated with the service desk, no change is made and the API still returns success. Requires service desk agent permissions.`,
    params: [
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to add to the service desk.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk to which the organization will be added. This can alternatively be a project identifier (project key or project ID).`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_organization_remove',
    description: `Remove an organization from a service desk. If the organization ID does not match an organization currently associated with the service desk, no change is made and the API still returns success. Requires service desk agent permissions.`,
    params: [
      {
        name: 'organizationId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the organization to remove from the service desk.`,
      },
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk from which the organization will be removed. This can alternatively be a project identifier (project key or project ID).`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_organizations_list',
    description: `Return a list of all organizations associated with a specific service desk. Use this to see which organizations have been granted access to a service desk, as distinct from listing all organizations in the site.`,
    params: [
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk whose associated organizations will be returned. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The account ID of a user, which uniquely identifies the user across all Atlassian products. If supplied, only organizations that user belongs to are returned. Example: 5b10ac8d82e05b22cc7d4ef5.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0. Used for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desk_request_types_list',
    description: `Return all customer request types configured for a single, specific service desk. Filter by groupId to restrict results to a request type group, or by searchQuery to match against a request type's name or description (e.g. 'Install', 'Inst', 'Equi', or 'Equipment' will all match 'Equipment Installation Request'). By default hidden request types are excluded from search results unless includeHiddenRequestTypesInSearch is set. Use jiraservicemanagement_request_types_list instead if you need request types across multiple service desks.`,
    params: [
      {
        name: 'serviceDeskId',
        type: 'string',
        required: true,
        description: `The ID of the service desk whose customer request types are to be returned. This can alternatively be a project identifier (project key or project ID).`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional details about request types to include in the response, e.g. issueTypeIds or fields.`,
      },
      {
        name: 'groupId',
        type: 'integer',
        required: false,
        description: `Filters results to request types belonging to the specified customer request type group.`,
      },
      {
        name: 'includeHiddenRequestTypesInSearch',
        type: 'boolean',
        required: false,
        description: `Whether to include hidden request types when searching with searchQuery. Default: false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default: 50.`,
      },
      {
        name: 'restrictionStatus',
        type: 'string',
        required: false,
        description: `Request type restriction status used to filter the results. Valid values: open, restricted.`,
      },
      {
        name: 'searchQuery',
        type: 'string',
        required: false,
        description: `The string to be used to filter the results by matching against a request type's name or description.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0. Used for pagination.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_service_desks_list',
    description: `List all service desks in the Jira Service Management instance that the current user has permission to access. Use this to discover service desk IDs and names. This can be slow on instances with hundreds of service desks; to fetch a single service desk by ID use the get-service-desk tool instead.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of service desks to return per page. Default is 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects, base index 0.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_sla_information_get',
    description: `Retrieve the details of a single SLA (Service Level Agreement) metric on a Jira Service Management customer request, identified by the SLA metric ID. Requires the caller to be an agent for the service desk and have Browse Projects permission on the containing project.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request whose SLA will be retrieved.`,
      },
      {
        name: 'slaMetricId',
        type: 'integer',
        required: true,
        description: `The ID of the SLA metric to be retrieved.`,
      },
    ],
  },
  {
    name: 'jiraservicemanagement_sla_information_list',
    description: `Retrieve all SLA (Service Level Agreement) records for a Jira Service Management customer request. A request can have zero or more SLAs, and each SLA can have completed and/or an ongoing cycle with start/stop times and breach status. Requires the caller to be an agent for the service desk and have Browse Projects permission on the containing project.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the customer request whose SLAs will be retrieved.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of SLA records to return per page. Default: 50.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `The starting index of the returned objects. Base index: 0.`,
      },
    ],
  },
]
