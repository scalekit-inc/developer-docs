import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'chilipipermcp_availability-slots',
    description: `Returns available meeting slots for any attendee mix (round-robin, manual, team-assigned, additional).`,
    params: [
      { name: 'attendees', type: 'array', required: true, description: `No description.` },
      { name: 'expectedHost', type: 'string', required: true, description: `No description.` },
      { name: 'interval', type: 'string', required: true, description: `No description.` },
      { name: 'meetingTypeRef', type: 'string', required: true, description: `No description.` },
      { name: 'meetingTypeOverride', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_concierge-list-routers',
    description: `Returns all concierge routers in the workspace.`,
    params: [
      { name: 'workspaceId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_concierge-logs',
    description: `Returns logs of concierge routing activity for a given time range.`,
    params: [
      { name: 'end', type: 'string', required: true, description: `No description.` },
      { name: 'routerId', type: 'string', required: true, description: `No description.` },
      { name: 'start', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_concierge-route',
    description: `Executes routing logic without an explicit router slug — the router is resolved from the request body. Identical to concierge-route-by-slug once resolved; optionally returns available slots when interval is provided.`,
    params: [
      { name: 'form', type: 'string', required: true, description: `No description.` },
      { name: 'interval', type: 'string', required: false, description: `No description.` },
      { name: 'options', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_concierge-route-by-slug',
    description: `Executes routing logic for a specific router identified by its slug. Optionally returns available slots for scheduling when an interval is provided.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'routerSlug', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_concierge-schedule',
    description: `Schedules a meeting through a concierge routing session using the routingId returned by concierge-route or concierge-route-by-slug.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'routingId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_crm-activity',
    description: `Resolves the ChiliPiper meeting linked to a CRM event ID and returns its admin UI deep-link URL. Accepts 15- or 18-character Salesforce IDs.`,
    params: [
      { name: 'crmEventId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_crm-cancel',
    description: `Resolves the ChiliPiper meeting linked to a CRM event ID and permanently cancels it. Irreversible — may email attendees. Accepts 15- or 18-character Salesforce IDs.`,
    params: [
      { name: 'crmEventId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_crm-get',
    description: `Resolves the ChiliPiper meeting linked to a CRM event ID and returns its full record including status, attendees, and scheduled time. Accepts 15- or 18-character Salesforce IDs.`,
    params: [
      { name: 'crmEventId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_crm-noshow',
    description: `Resolves the ChiliPiper meeting linked to a CRM event ID and marks it as a no-show. Not reversible via API. Accepts 15- or 18-character Salesforce IDs.`,
    params: [
      { name: 'crmEventId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_distribution-adjust-v3',
    description: `Merges adjustments (weights, manual calibration) into an existing distribution and publishes immediately. Uses v3 API — adjustments are additive, not replacements.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'distributionId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_distribution-create',
    description: `Creates and immediately publishes a new distribution with the specified assignment type, team, and weights.`,
    params: [
      { name: 'assignmentTypeConfig', type: 'string', required: true, description: `No description.` },
      { name: 'teamId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'capping', type: 'string', required: false, description: `No description.` },
      { name: 'manualCalibration', type: 'array', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'weights', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_distribution-delete',
    description: `Permanently deletes a distribution by its ID.`,
    params: [
      { name: 'distributionId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_distribution-list-put',
    description: `Returns a paginated list of distributions with optional filters.`,
    params: [
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
      { name: 'workspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_distribution-update-v3',
    description: `Replaces an existing distribution configuration by its ID and publishes immediately. Uses v3 API.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'distributionId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_handoff-init',
    description: `Phase 1 of 2: initializes a handoff flow — launches workspace routers, evaluates assignee availability, and returns routing paths with available slots. Must be followed by handoff-schedule to complete booking.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'userId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_handoff-schedule',
    description: `Phase 2 of 2: completes a handoff by booking a meeting on a chosen path and slot. Creates calendar events, sends confirmations, and requires the routingId and pathId returned by handoff-init.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'pathId', type: 'string', required: true, description: `No description.` },
      { name: 'routerId', type: 'string', required: true, description: `No description.` },
      { name: 'routingId', type: 'string', required: true, description: `No description.` },
      { name: 'userId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_health-ping',
    description: `Checks the health of the ChiliPiper MCP server.`,
    params: [
    ],
  },
  {
    name: 'chilipipermcp_meeting-activity',
    description: `Returns the admin UI deep-link URL for a meeting's activity page.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_meeting-cancel',
    description: `Permanently cancels a meeting by its ID. Irreversible — may update calendar/CRM and email attendees.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_meeting-export-v2-put',
    description: `Exports meetings in a time range with optional filters.`,
    params: [
      { name: 'end', type: 'string', required: true, description: `No description.` },
      { name: 'start', type: 'string', required: true, description: `No description.` },
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
      { name: 'workspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_meeting-get',
    description: `Returns details of a meeting by its ID.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_meeting-list-put',
    description: `Returns paginated meetings in a time range with optional filters.`,
    params: [
      { name: 'end', type: 'string', required: true, description: `No description.` },
      { name: 'start', type: 'string', required: true, description: `No description.` },
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
      { name: 'workspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_meeting-noshow',
    description: `Marks a meeting as a no-show by its ID. May trigger CRM and notification workflows.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_resource-scheduler-run',
    description: `Runs a resource scheduler on demand: executes its configured query and dispatches matched records to the linked executing flow.`,
    params: [
      { name: 'resourceSchedulerId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_rule-create',
    description: `Creates a new routing rule and activates it immediately. Returns the created rule with its assigned ID and revision.`,
    params: [
      { name: 'dto', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_rule-delete',
    description: `Deletes a routing rule by its ID and revision.`,
    params: [
      { name: 'revision', type: 'integer', required: true, description: `No description.` },
      { name: 'ruleId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_rule-get',
    description: `Returns details of a routing rule by its ID.`,
    params: [
      { name: 'ruleId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_rule-list',
    description: `Returns a paginated list of routing rules with optional filters.`,
    params: [
      { name: 'filter', type: 'string', required: false, description: `No description.` },
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_rule-modify',
    description: `Modifies an existing routing rule by its ID. Requires the current revision for optimistic locking.`,
    params: [
      { name: 'dto', type: 'string', required: true, description: `No description.` },
      { name: 'revision', type: 'integer', required: true, description: `No description.` },
      { name: 'ruleId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-init',
    description: `Phase 1 of 2: initializes a scheduling session from a link — fetches link metadata, queries attendee availability, and returns available slots. Must be followed by scheduling-link-schedule.`,
    params: [
      { name: 'interval', type: 'string', required: true, description: `No description.` },
      { name: 'link', type: 'string', required: true, description: `No description.` },
      { name: 'bookerId', type: 'string', required: false, description: `No description.` },
      { name: 'guestEmail', type: 'string', required: false, description: `No description.` },
      { name: 'meetingTypeId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-list-admin-one-on-one',
    description: `Returns all admin one-on-one scheduling links.`,
    params: [
      { name: 'filterLinkSlugs', type: 'array', required: false, description: `No description.` },
      { name: 'filterMeetingTypeId', type: 'array', required: false, description: `No description.` },
      { name: 'filterWorkspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-list-group',
    description: `Returns all group scheduling links.`,
    params: [
      { name: 'filterLinkSlugs', type: 'array', required: false, description: `No description.` },
      { name: 'filterMeetingTypeId', type: 'array', required: false, description: `No description.` },
      { name: 'filterWorkspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-list-ownership',
    description: `Returns scheduling links owned by the current user.`,
    params: [
      { name: 'filterDistributionIds', type: 'array', required: false, description: `No description.` },
      { name: 'filterLinkSlugs', type: 'array', required: false, description: `No description.` },
      { name: 'filterMeetingTypeId', type: 'array', required: false, description: `No description.` },
      { name: 'filterWorkspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-list-personal',
    description: `Returns personal scheduling links for a given user.`,
    params: [
      { name: 'userId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-list-round-robin',
    description: `Returns all round-robin scheduling links.`,
    params: [
      { name: 'filterDistributionIds', type: 'array', required: false, description: `No description.` },
      { name: 'filterLinkSlugs', type: 'array', required: false, description: `No description.` },
      { name: 'filterMeetingTypeId', type: 'array', required: false, description: `No description.` },
      { name: 'filterWorkspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_scheduling-link-schedule',
    description: `Phase 2 of 2: books a meeting on a chosen slot from a scheduling link session. Requires the routeId returned by scheduling-link-init.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `No description.` },
      { name: 'routeId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_team-add-users',
    description: `Adds one or more users to a team.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `No description.` },
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_team-list-put',
    description: `Returns a paginated list of teams.`,
    params: [
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
      { name: 'workspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_team-remove-users',
    description: `Removes one or more users from a specific team.`,
    params: [
      { name: 'teamId', type: 'string', required: true, description: `No description.` },
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_team-remove-users-all',
    description: `Removes all specified users from every team they belong to.`,
    params: [
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
      { name: 'workspaceIds', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_tenant-get',
    description: `Returns details of the current tenant.`,
    params: [
    ],
  },
  {
    name: 'chilipipermcp_user-find',
    description: `Searches for users by a query string with pagination.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_user-find-by-filter',
    description: `Returns a paginated list of users matching the specified filter.`,
    params: [
      { name: 'filter', type: 'string', required: true, description: `No description.` },
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_user-find-by-ids',
    description: `Returns users matching a list of user IDs.`,
    params: [
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_user-invite',
    description: `Invites a new user to ChiliPiper by email.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `No description.` },
      { name: 'licenses', type: 'array', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'roles', type: 'array', required: false, description: `No description.` },
      { name: 'salesforceId', type: 'string', required: false, description: `No description.` },
      { name: 'workspaces', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_user-read',
    description: `Returns details of a user by their ID.`,
    params: [
      { name: 'userId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_user-update-licenses',
    description: `Updates the license assignments for a user, replacing the current license set.`,
    params: [
      { name: 'update', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_workspace-add-users',
    description: `Adds one or more users to a workspace.`,
    params: [
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_workspace-list',
    description: `Returns a paginated list of workspaces.`,
    params: [
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_workspace-list-users',
    description: `Returns a paginated list of users in a workspace.`,
    params: [
      { name: 'pagination', type: 'string', required: false, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_workspace-remove-users',
    description: `Removes one or more users from a specific workspace.`,
    params: [
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'chilipipermcp_workspace-remove-users-all',
    description: `Removes all specified users from every workspace they belong to.`,
    params: [
      { name: 'userIds', type: 'array', required: true, description: `No description.` },
    ],
  },
]
