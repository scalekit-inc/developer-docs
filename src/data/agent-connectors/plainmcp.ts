import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'plainmcp_addgeneratedreply',
    description: `Add an AI-generated reply to a thread in Plain.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_addlabels',
    description: `Add one or more labels to a thread.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_archivelabeltype',
    description: `Archive a label type so it can no longer be applied to threads.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_assignthread',
    description: `Assign a thread to a user or machine user.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_bulkupsertthreadfields',
    description: `Create or update multiple thread field values in a single call.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_changethreadpriority',
    description: `Update the priority of a thread. Valid priorities are 0 (urgent) through 3 (low).`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_createlabeltype',
    description: `Create a new label type that can be applied to threads.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_createnote',
    description: `Add an internal note to a thread, visible only to workspace members.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_createthread',
    description: `Open a new support thread for an existing customer. Does not send a message — follow up with replyToThread if needed.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_createthreadfieldschema',
    description: `Create a new custom thread field schema for the workspace.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_deletethreadfieldschema',
    description: `Permanently delete a custom thread field schema by key.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_getcustomerdetails',
    description: `Fetch a customer's full profile including email, assignment, company, and timestamps.`,
    params: [
      { name: 'customerId', type: 'string', required: true, description: `Plain customer ID (starts with c_). Get it from getCustomers or getCustomerDetails.` },
    ],
  },
  {
    name: 'plainmcp_getcustomers',
    description: `Return a paginated list of all customers in the workspace.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_getcustomerthreads',
    description: `Return all threads belonging to a specific customer, with optional status filtering.`,
    params: [
      { name: 'customerId', type: 'string', required: true, description: `Plain customer ID (starts with c_). Get it from getCustomers or getCustomerDetails.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
      { name: 'statusDetails', type: 'array', required: false, description: `Filter by status detail. Accepted values: CREATED, NEW_REPLY, WAITING_FOR_CUSTOMER, IN_PROGRESS.` },
      { name: 'statuses', type: 'array', required: false, description: `Filter by thread status. Accepted values: TODO, SNOOZED, DONE.` },
    ],
  },
  {
    name: 'plainmcp_gethelpcenterarticle',
    description: `Fetch a single Help Center article by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Unique identifier of the resource.` },
    ],
  },
  {
    name: 'plainmcp_gethelpcenterarticlebyslug',
    description: `Fetch a Help Center article by its URL slug.`,
    params: [
      { name: 'helpCenterId', type: 'string', required: true, description: `Plain Help Center ID (starts with hc_). Get it from getHelpCenters.` },
      { name: 'slug', type: 'string', required: true, description: `URL slug of the Help Center article.` },
    ],
  },
  {
    name: 'plainmcp_gethelpcenterarticlegroups',
    description: `Return all article groups for a Help Center.`,
    params: [
      { name: 'helpCenterId', type: 'string', required: true, description: `Plain Help Center ID (starts with hc_). Get it from getHelpCenters.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_gethelpcenterarticles',
    description: `Return a paginated list of articles in a Help Center.`,
    params: [
      { name: 'helpCenterId', type: 'string', required: true, description: `Plain Help Center ID (starts with hc_). Get it from getHelpCenters.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_gethelpcenters',
    description: `Return all Help Centers in the workspace.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_getlabels',
    description: `Return all label types available in the workspace.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_getmyassignedthreads',
    description: `Return threads assigned to the authenticated user, with optional status and priority filters.`,
    params: [
      { name: 'userId', type: 'string', required: true, description: `Plain user ID (starts with u_). Get it from getUserByEmail or getMyUser.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
      { name: 'priorities', type: 'array', required: false, description: `Filter by priority: 0 = urgent, 1 = high, 2 = normal, 3 = low.` },
      { name: 'statusDetails', type: 'array', required: false, description: `Filter by status detail. Accepted values: CREATED, NEW_REPLY, WAITING_FOR_CUSTOMER, IN_PROGRESS.` },
      { name: 'statuses', type: 'array', required: false, description: `Filter by thread status. Accepted values: TODO, SNOOZED, DONE.` },
    ],
  },
  {
    name: 'plainmcp_getmyuser',
    description: `Return the profile of the currently authenticated workspace user.`,
    params: [
    ],
  },
  {
    name: 'plainmcp_getmyworkspace',
    description: `Return details about the current workspace including its ID and name.`,
    params: [
    ],
  },
  {
    name: 'plainmcp_gettenantdetails',
    description: `Fetch full details for a specific tenant by its ID.`,
    params: [
      { name: 'tenantId', type: 'string', required: true, description: `Plain tenant ID (starts with t_). Get it from getCustomers.` },
    ],
  },
  {
    name: 'plainmcp_gettenants',
    description: `Return a paginated list of all tenants in the workspace.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_getthreaddetails',
    description: `Fetch a thread's full details and timeline entries by thread ID.`,
    params: [
      { name: 'threadId', type: 'string', required: true, description: `Plain thread ID (starts with th_). Get it from getThreads or searchThreads.` },
      { name: 'timelineCursor', type: 'string', required: false, description: `Pagination cursor for the thread timeline from the previous pageInfo.endCursor.` },
      { name: 'timelineFirst', type: 'number', required: false, description: `Number of timeline entries to return per page.` },
    ],
  },
  {
    name: 'plainmcp_getthreadfieldschemas',
    description: `Return all custom thread field schemas defined in the workspace.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_getthreads',
    description: `Return threads with flexible filtering by status, priority, assignee, customer, labels, or date range.`,
    params: [
      { name: 'assignedToUser', type: 'array', required: false, description: `Filter threads assigned to these user IDs (start with u_).` },
      { name: 'createdAtAfter', type: 'string', required: false, description: `Return only threads created after this ISO 8601 timestamp.` },
      { name: 'createdAtBefore', type: 'string', required: false, description: `Return only threads created before this ISO 8601 timestamp.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'customerIds', type: 'array', required: false, description: `Filter by these Plain customer IDs (start with c_).` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
      { name: 'isAssigned', type: 'boolean', required: false, description: `Pass true for assigned threads, false for unassigned, or omit for all.` },
      { name: 'labelTypeIds', type: 'array', required: false, description: `Filter by these label type IDs (start with lt_). Get them from getLabels.` },
      { name: 'priorities', type: 'array', required: false, description: `Filter by priority: 0 = urgent, 1 = high, 2 = normal, 3 = low.` },
      { name: 'statusDetails', type: 'array', required: false, description: `Filter by status detail. Accepted values: CREATED, NEW_REPLY, WAITING_FOR_CUSTOMER, IN_PROGRESS.` },
      { name: 'statuses', type: 'array', required: false, description: `Filter by thread status. Accepted values: TODO, SNOOZED, DONE.` },
    ],
  },
  {
    name: 'plainmcp_getuserbyemail',
    description: `Look up a workspace user by their email address.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Email address of the user.` },
    ],
  },
  {
    name: 'plainmcp_markthreadasdone',
    description: `Mark a thread as done, moving it out of the active queue.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_markthreadastodo',
    description: `Mark a thread as todo, returning it to the active queue.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_movelabeltype',
    description: `Reorder a label type within the workspace label list.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_removelabels',
    description: `Remove one or more labels from a thread.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_reorderthreadfieldschemas',
    description: `Change the display order of custom thread field schemas.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_replytothread',
    description: `Send a reply to the last message in a thread via email, Slack, or chat.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_searchcustomers',
    description: `Search customers by name or email and return a paginated list of matches.`,
    params: [
      { name: 'search', type: 'string', required: true, description: `Search query to filter results by text.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_searchtenants',
    description: `Search tenants by name and return matching results.`,
    params: [
      { name: 'searchTerm', type: 'string', required: true, description: `Search text to filter tenant results.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
    ],
  },
  {
    name: 'plainmcp_searchthreads',
    description: `Search threads by text with optional filters for status, priority, assignee, customer, and labels.`,
    params: [
      { name: 'searchQuery', type: 'string', required: true, description: `Search text to match against thread title, description, or messages.` },
      { name: 'assignedToUser', type: 'array', required: false, description: `Filter threads assigned to these user IDs (start with u_).` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response's pageInfo.endCursor.` },
      { name: 'customerIds', type: 'array', required: false, description: `Filter by these Plain customer IDs (start with c_).` },
      { name: 'first', type: 'number', required: false, description: `Number of results to return per page. Defaults to 10.` },
      { name: 'labelTypeIds', type: 'array', required: false, description: `Filter by these label type IDs (start with lt_). Get them from getLabels.` },
      { name: 'priorities', type: 'array', required: false, description: `Filter by priority: 0 = urgent, 1 = high, 2 = normal, 3 = low.` },
      { name: 'statusDetails', type: 'array', required: false, description: `Filter by status detail. Accepted values: CREATED, NEW_REPLY, WAITING_FOR_CUSTOMER, IN_PROGRESS.` },
      { name: 'statuses', type: 'array', required: false, description: `Filter by thread status. Accepted values: TODO, SNOOZED, DONE.` },
    ],
  },
  {
    name: 'plainmcp_snoozethread',
    description: `Snooze a thread until a specified date and time.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_unarchivelabeltype',
    description: `Restore an archived label type so it can be applied to threads again.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_unassignthread',
    description: `Remove the current assignee from a thread.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_updatelabeltype',
    description: `Update the name or color of an existing label type.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_updatethreadfieldschema',
    description: `Update the label or options of an existing thread field schema.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_updatethreadtitle',
    description: `Update the title of an existing thread.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_upsertcustomer',
    description: `Create or update a customer by external ID, email, or customer ID.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_upserthelpcenterarticle',
    description: `Create or update a Help Center article by slug.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_upserttenant',
    description: `Create or update a tenant by external ID or tenant ID.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_upserttenantfield',
    description: `Set or update a custom field value on a tenant.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'plainmcp_upsertthreadfield',
    description: `Set or update a custom field value on a thread.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `No description.` },
    ],
  },
]
