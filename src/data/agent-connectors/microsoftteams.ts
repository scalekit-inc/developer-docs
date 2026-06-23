import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'microsoftteams_add_team_member',
    description: `Add a user to a Microsoft Teams team as a member or owner. Requires the team ID and the Azure AD user ID of the person to add. The user must exist in the same tenant. Returns the new conversationMember resource on success (HTTP 201).`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to add the member to.` },
      { name: 'user_id', type: 'string', required: true, description: `The Azure AD object ID of the user to add to the team. This is the user's unique identifier in Microsoft Entra ID, not their email address.` },
      { name: 'role', type: 'string', required: false, description: `The role to assign to the added user. Valid values: 'member' (standard member) or 'owner' (team owner with admin privileges). Defaults to 'member'.` },
    ],
  },
  {
    name: 'microsoftteams_approve_time_off_request',
    description: `Approve a pending time-off request in a Microsoft Teams team schedule. Requires the team ID and request ID. Optionally include a manager note to send with the approval. Returns HTTP 204 No Content on success.`,
    params: [
      { name: 'request_id', type: 'string', required: true, description: `The unique identifier of the time-off request to approve. Obtain from the list time-off requests API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the time-off request.` },
      { name: 'message', type: 'string', required: false, description: `Optional message from the manager to include with the approval decision. Example: 'Approved, enjoy your vacation!'` },
    ],
  },
  {
    name: 'microsoftteams_archive_channel',
    description: `Archive a channel in a Microsoft Teams team, making it read-only for members. Archiving is reversible — the channel can be unarchived later. Optionally sets the associated SharePoint site to read-only.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to archive.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel to archive.` },
      { name: 'set_spo_site_readonly', type: 'boolean', required: false, description: `If true, the SharePoint Online (SPO) site associated with the channel will also be set to read-only when the channel is archived. Defaults to false.` },
    ],
  },
  {
    name: 'microsoftteams_archive_team',
    description: `Archive a Microsoft Teams team, making it read-only. The team is archived asynchronously (HTTP 202). Optionally set the SharePoint site associated with the team to read-only as well. To restore a team, use the unarchive endpoint.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to archive.` },
      { name: 'should_set_spo_site_read_only_for_members', type: 'boolean', required: false, description: `If true, sets the SharePoint Online site associated with the team to read-only for members. Defaults to false.` },
    ],
  },
  {
    name: 'microsoftteams_clear_user_presence',
    description: `Clear a previously set presence override for the signed-in user in Microsoft Teams for a specific application session. Provide the same session ID used when calling setPresence. After clearing, Teams reverts to the user's actual computed presence. Requires the Presence.ReadWrite scope.`,
    params: [
      { name: 'session_id', type: 'string', required: true, description: `The GUID of the application session whose presence override should be cleared. Must match the session ID passed to the setPresence call. Example: '22553876-f5ab-4529-bffb-cfe50aa89f87'.` },
    ],
  },
  {
    name: 'microsoftteams_clone_team',
    description: `Clone an existing Microsoft Teams team into a new team, copying selected parts such as apps, tabs, settings, channels, and/or members. The clone operation is asynchronous (HTTP 202). Required: team_id, display_name, parts_to_clone.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name for the new cloned team.` },
      { name: 'parts_to_clone', type: 'string', required: true, description: `Comma-separated list of team parts to clone. Valid parts: apps, tabs, settings, channels, members. Example: 'apps,tabs,settings,channels,members'.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to clone.` },
      { name: 'classification', type: 'string', required: false, description: `Classification label for the cloned team (organization-defined, e.g., 'Confidential', 'Internal'). Optional.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the cloned team.` },
      { name: 'mail_nickname', type: 'string', required: false, description: `The mail alias (nickname) for the new team's Microsoft 365 Group. Must be unique in the tenant and contain only alphanumeric characters and hyphens.` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility of the cloned team. Valid values: 'public' (anyone in org can join), 'private' (owner must invite). Defaults to 'private'.` },
    ],
  },
  {
    name: 'microsoftteams_create_channel',
    description: `Create a new channel in a Microsoft Teams team. Supports standard, private, and shared channel membership types. Requires the team ID and a display name for the new channel.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name of the new channel. Must be unique within the team and cannot contain special characters like #, &, :, <, >, *, ?.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team in which to create the channel.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new channel (plain text, up to 1024 characters).` },
      { name: 'membership_type', type: 'string', required: false, description: `The membership type of the channel: 'standard' (visible to all team members), 'private' (invite-only subset of team members), or 'shared' (shared with people outside the team). Defaults to 'standard'.` },
    ],
  },
  {
    name: 'microsoftteams_create_online_meeting',
    description: `Create a new Microsoft Teams online meeting for the signed-in user. Requires a subject, start time, and end time in ISO 8601 format. Optionally invite attendees by UPN (email) and control who can present.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `The end date and time of the meeting in ISO 8601 UTC format. Example: '2024-07-15T10:00:00Z'.` },
      { name: 'start_date_time', type: 'string', required: true, description: `The start date and time of the meeting in ISO 8601 UTC format. Example: '2024-07-15T09:00:00Z'.` },
      { name: 'subject', type: 'string', required: true, description: `The subject/title of the online meeting. Displayed to all participants in the meeting invite and join page.` },
      { name: 'allowed_presenters', type: 'string', required: false, description: `Who can present in the meeting. 'everyone' allows all participants, 'organization' restricts to org members, 'roleIsPresenter' limits to assigned presenters, 'organizer' restricts to the meeting organizer only. Defaults to 'organization'.` },
      { name: 'attendee_upns', type: 'array', required: false, description: `Array of UPN (User Principal Name / email address) strings for meeting attendees. Example: ["alice@contoso.com", "bob@contoso.com"]. Each UPN is mapped to an attendee object in the participants block.` },
    ],
  },
  {
    name: 'microsoftteams_create_shift',
    description: `Create a new shift in a Microsoft Teams team schedule. Requires team ID, user ID, scheduling group ID, and start/end date times in ISO 8601 format. Optionally set a display name, notes, and theme color for the shift.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `The end date and time of the shift in ISO 8601 UTC format. Example: '2024-07-15T17:00:00Z'.` },
      { name: 'scheduling_group_id', type: 'string', required: true, description: `The unique identifier of the scheduling group (team member group) to assign the shift to. Obtain from the scheduling groups API.` },
      { name: 'start_date_time', type: 'string', required: true, description: `The start date and time of the shift in ISO 8601 UTC format. Example: '2024-07-15T09:00:00Z'.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule to create the shift in.` },
      { name: 'user_id', type: 'string', required: true, description: `The unique identifier (object ID) of the user to assign the shift to. Obtain from the Microsoft Entra user object or list users API.` },
      { name: 'display_name', type: 'string', required: false, description: `Optional display name for the shift, shown on the schedule. Example: 'Morning Shift'.` },
      { name: 'notes', type: 'string', required: false, description: `Optional notes or instructions for the shift, visible to the assigned user. Example: 'Please cover the front desk.'.` },
      { name: 'theme', type: 'string', required: false, description: `Color theme for the shift block on the schedule view. Valid values: white, blue, green, purple, pink, yellow, gray, darkBlue, darkGreen, darkPurple, darkPink, darkYellow. Defaults to 'blue'.` },
    ],
  },
  {
    name: 'microsoftteams_create_shift_swap_request',
    description: `Create a shift swap request in a Microsoft Teams team schedule, proposing that two employees exchange their shifts. Requires the team ID, both employees' user IDs and their respective shift IDs. Optionally include a message from the requester.`,
    params: [
      { name: 'recipient_shift_id', type: 'string', required: true, description: `The unique identifier of the shift belonging to the recipient (the employee whose shift the sender wants to take). Obtain from the list shifts API.` },
      { name: 'recipient_user_id', type: 'string', required: true, description: `The Azure AD object ID of the employee being asked to swap their shift.` },
      { name: 'sender_shift_id', type: 'string', required: true, description: `The unique identifier of the shift belonging to the sender (the employee initiating the swap). Obtain from the list shifts API.` },
      { name: 'sender_user_id', type: 'string', required: true, description: `The Azure AD object ID of the employee initiating the shift swap request.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule the shift swap request belongs to.` },
      { name: 'sender_message', type: 'string', required: false, description: `Optional message from the requesting employee explaining why they want to swap. Example: 'I have a doctor's appointment during my shift.'` },
    ],
  },
  {
    name: 'microsoftteams_create_team',
    description: `Create a new Microsoft Teams team from a template. The team is created asynchronously (HTTP 202); poll the returned operation URL for completion. Required: display_name. Optional: description and template (defaults to 'standard').`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name of the new team. Must be unique within the tenant.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new team (plain text, up to 1024 characters).` },
      { name: 'template', type: 'string', required: false, description: `The Teams template to use when creating the team. Valid values: 'standard', 'educationClass', 'educationStaff', 'educationProfessionalLearningCommunity', 'healthcareWard', 'healthcareTeam'. Defaults to 'standard'.` },
    ],
  },
  {
    name: 'microsoftteams_create_time_off_request',
    description: `Submit a time-off request in a Microsoft Teams team schedule. Requires the team ID, the sender's user ID, start and end date-times in ISO 8601 UTC format, and the time-off reason ID. Optionally include a message from the sender to the manager.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `The end date and time of the time-off period in ISO 8601 UTC format. Example: '2024-08-02T17:00:00Z'.` },
      { name: 'sender_user_id', type: 'string', required: true, description: `The Azure AD object ID of the employee submitting the time-off request. Obtain from the Microsoft Entra user object or list users API.` },
      { name: 'start_date_time', type: 'string', required: true, description: `The start date and time of the time-off period in ISO 8601 UTC format. Example: '2024-07-29T00:00:00Z'.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule the request belongs to.` },
      { name: 'time_off_reason_id', type: 'string', required: true, description: `The ID of the time-off reason (e.g., vacation, sick leave) defined in the team schedule. Obtain from the team's timeOffReasons API.` },
      { name: 'sender_message', type: 'string', required: false, description: `Optional message from the employee to the manager accompanying the time-off request. Example: 'Family vacation.'` },
    ],
  },
  {
    name: 'microsoftteams_decline_time_off_request',
    description: `Decline a pending time-off request in a Microsoft Teams team schedule. Requires the team ID and request ID. Optionally include a manager message explaining the decision. Returns HTTP 204 No Content on success.`,
    params: [
      { name: 'request_id', type: 'string', required: true, description: `The unique identifier of the time-off request to decline. Obtain from the list time-off requests API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the time-off request.` },
      { name: 'message', type: 'string', required: false, description: `Optional message from the manager to include with the decline decision. Example: 'Insufficient coverage during that period.'` },
    ],
  },
  {
    name: 'microsoftteams_delete_channel',
    description: `Permanently delete a channel from a Microsoft Teams team. The General channel of a team cannot be deleted. This action is irreversible and removes all messages and content within the channel.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to delete. The General channel cannot be deleted.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel to delete.` },
    ],
  },
  {
    name: 'microsoftteams_delete_channel_message',
    description: `Soft-delete a Microsoft Teams channel message. The message is retracted and replaced with a tombstone indicating it was deleted.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message to delete.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the channel message to soft-delete.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_delete_online_meeting',
    description: `Permanently delete a Microsoft Teams online meeting by meeting ID. This action cannot be undone and removes the meeting for all participants.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The unique identifier of the online meeting to delete. Obtain from the create meeting response or list meetings API.` },
    ],
  },
  {
    name: 'microsoftteams_delete_shift',
    description: `Permanently delete a shift from a Microsoft Teams team schedule. Requires both the team ID and the shift ID. This action cannot be undone.`,
    params: [
      { name: 'shift_id', type: 'string', required: true, description: `The unique identifier of the shift to delete. Obtain from the create shift response or list shifts API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the shift to delete.` },
    ],
  },
  {
    name: 'microsoftteams_delete_team',
    description: `Permanently delete a Microsoft Teams team by deleting the underlying Microsoft 365 Group. This action is irreversible. The team and all its channels, messages, and files will be permanently removed. Returns HTTP 204 with no body on success.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team (Group ID) to permanently delete.` },
    ],
  },
  {
    name: 'microsoftteams_get_channel',
    description: `Retrieve the properties and metadata of a specific channel in a Microsoft Teams team, including its display name, description, membership type, and web URL.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to retrieve.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_get_channel_message',
    description: `Retrieve a single message from a Microsoft Teams channel by its ID, including body content, sender info, attachments, reactions, and metadata.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams channel message to retrieve.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_get_chat_message',
    description: `Retrieve a single message from a Microsoft Teams chat by its ID, including body content, sender info, attachments, reactions, and metadata.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat that contains the message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams chat message to retrieve.` },
    ],
  },
  {
    name: 'microsoftteams_get_online_meeting',
    description: `Retrieve details of a specific Microsoft Teams online meeting by meeting ID. Returns meeting properties including subject, join URL, start/end times, participants, and meeting options.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The unique identifier of the online meeting to retrieve. Obtain from the create meeting response or list meetings API.` },
    ],
  },
  {
    name: 'microsoftteams_get_team',
    description: `Retrieve the properties and relationships of a Microsoft Teams team by its team ID. Returns team details including display name, description, visibility, member settings, and guest settings.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to retrieve.` },
    ],
  },
  {
    name: 'microsoftteams_list_channel_message_replies',
    description: `List all replies in a Microsoft Teams channel message thread. Returns replies to the specified parent message with support for pagination.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message thread.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the parent channel message whose replies to list.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of replies to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of replies to return per page. Use to control page size.` },
    ],
  },
  {
    name: 'microsoftteams_list_channel_messages',
    description: `List messages in a Microsoft Teams channel with support for pagination. Returns up to 20 messages by default (max 50 per page).`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to list messages from.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of messages to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Number of channel messages to return per page (1–50, default: 20). Microsoft Graph caps this at 50 for channel messages.` },
    ],
  },
  {
    name: 'microsoftteams_list_channel_tabs',
    description: `List all tabs pinned to a Microsoft Teams channel. By default expands the teamsApp relationship to include app details for each tab.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel whose tabs to list.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: '$expand', type: 'string', required: false, description: `OData $expand expression to include related resources. Defaults to 'teamsApp' which includes the app details for each tab. Set to null to suppress expansion.` },
    ],
  },
  {
    name: 'microsoftteams_list_channels',
    description: `List all channels in a Microsoft Teams team. Supports OData filtering (e.g., by membershipType) and field selection to reduce response size.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose channels to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "membershipType eq 'standard'" or "displayName eq 'General'".` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of channel properties to return. Example: 'id,displayName,membershipType,webUrl'. Reduces response payload size.` },
    ],
  },
  {
    name: 'microsoftteams_list_chat_messages',
    description: `List messages in a Microsoft Teams chat (1:1, group, or meeting chat) with support for pagination and ordering. Returns up to 50 messages per page ordered by creation time descending by default.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat to list messages from. Obtain from the list chats API or Teams URL.` },
      { name: '$orderby', type: 'string', required: false, description: `OData orderby expression for sorting messages. Default is 'createdDateTime desc' (newest first). Example: 'createdDateTime asc' for oldest first.` },
      { name: '$top', type: 'integer', required: false, description: `Number of chat messages to return per page (1–50, default: 50). Microsoft Graph caps this at 50 for chat messages.` },
    ],
  },
  {
    name: 'microsoftteams_list_shift_swap_requests',
    description: `List shift swap change requests in a Microsoft Teams team schedule. Supports OData $filter (e.g., filter by state) and $top to control the number of results returned.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule shift swap requests to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow shift swap request results. Example: "state eq 'pending'" to fetch only pending swap requests.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of shift swap requests to return. Use to limit the response size. Example: 25.` },
    ],
  },
  {
    name: 'microsoftteams_list_shifts',
    description: `List shifts in a Microsoft Teams team schedule. Supports OData $filter (e.g., filter by start date) and $top to control the number of results returned.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule shifts to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow shift results. Example: "sharedShift/startDateTime ge 2024-07-01T00:00:00Z" to fetch shifts starting on or after July 1, 2024.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of shifts to return. Use to limit the response size. Example: 25.` },
    ],
  },
  {
    name: 'microsoftteams_list_team_members',
    description: `List all members (including owners) of a Microsoft Teams team. Returns conversationMember resources with membership IDs, user details, and roles. Supports OData filtering and field selection.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose members to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "roles/any(r:r eq 'owner')" to list only owners.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of member properties to return. Example: 'id,displayName,roles,email'. Reduces response payload size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of members to return per page. Use for pagination.` },
    ],
  },
  {
    name: 'microsoftteams_list_teams',
    description: `List all Microsoft Teams teams that the signed-in user has joined. Supports OData query options for filtering, field selection, and pagination.`,
    params: [
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "displayName eq 'Engineering'".` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of team properties to return. Example: 'id,displayName,description,visibility'. Reduces response payload size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of teams to return per page. Use for pagination.` },
    ],
  },
  {
    name: 'microsoftteams_list_time_off_requests',
    description: `List time-off requests in a Microsoft Teams team schedule. Supports OData $filter (e.g., filter by status or date range) and $top to control the number of results returned.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule time-off requests to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow time-off request results. Example: "state eq 'pending'" to fetch only pending requests.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of time-off requests to return. Use to limit the response size. Example: 25.` },
    ],
  },
  {
    name: 'microsoftteams_pin_channel_message',
    description: `Pin a message in a Microsoft Teams channel so it appears in the channel's pinned messages list. Requires the team ID, channel ID, and message ID.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel that contains the message to pin.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams channel message to pin.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_provision_channel_email',
    description: `Provision an email address for a Microsoft Teams channel, enabling users to send emails directly to the channel. Returns the provisioned email address. If an email has already been provisioned, returns the existing address.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel for which to provision an email address.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_remove_channel_email',
    description: `Remove the email address provisioned for a Microsoft Teams channel. After removal, emails can no longer be sent to the channel via that email address.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel from which to remove the provisioned email address.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_remove_team_member',
    description: `Remove a member from a Microsoft Teams team. Requires the team ID and the conversationMember ID (not the Azure AD user ID). The membership_id is the ID returned by the list team members or add team member APIs. Returns HTTP 204 with no body on success.`,
    params: [
      { name: 'membership_id', type: 'string', required: true, description: `The conversationMember ID of the membership to remove. This is the unique ID of the member's team membership, returned by the list team members or add member APIs — it is NOT the Azure AD user ID.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team from which to remove the member.` },
    ],
  },
  {
    name: 'microsoftteams_reply_to_channel_message',
    description: `Post a reply to an existing Microsoft Teams channel message thread. Supports plain text or HTML content, an optional subject, and importance levels.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message to reply to.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the reply message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the channel message to reply to.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the reply content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
      { name: 'importance', type: 'string', required: false, description: `The importance of the reply message. Valid values: 'normal', 'high', 'urgent'.` },
      { name: 'subject', type: 'string', required: false, description: `Optional subject line for the reply (appears as a headline above the body).` },
    ],
  },
  {
    name: 'microsoftteams_reply_to_chat_message',
    description: `Send a reply to an existing message in a Microsoft Teams chat thread. Supports plain text or HTML content. This endpoint is available on the Microsoft Graph beta API.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat that contains the message to reply to.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the reply message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams chat message to reply to.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the reply content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
    ],
  },
  {
    name: 'microsoftteams_search_messages',
    description: `Search Microsoft Teams chat messages across all chats and channels accessible to the signed-in user using the Microsoft Search API. Supports pagination via from/size parameters. Returns up to 25 results by default.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query string to find matching Teams messages. Supports keyword search and KQL (Keyword Query Language). Example: 'project kickoff' or 'from:alice@example.com subject:budget'.` },
      { name: 'from', type: 'integer', required: false, description: `Zero-based index of the first result to return, used for pagination. Default is 0 (start from the first result).` },
      { name: 'size', type: 'integer', required: false, description: `Number of results to return per page. Default is 25, maximum is 200.` },
    ],
  },
  {
    name: 'microsoftteams_send_channel_message',
    description: `Send a new message to a Microsoft Teams channel. Supports plain text or HTML content, an optional subject line, and importance levels (normal, high, urgent).`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to send the message to.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the message to send.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the message content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
      { name: 'importance', type: 'string', required: false, description: `The importance of the message. Valid values: 'normal', 'high', 'urgent'. Defaults to normal if omitted.` },
      { name: 'subject', type: 'string', required: false, description: `Optional subject line for the channel message (appears as a headline above the body).` },
    ],
  },
  {
    name: 'microsoftteams_send_chat_message',
    description: `Send a new message to a Microsoft Teams chat (1:1, group, or meeting chat). Supports plain text or HTML content. Requires Chat.ReadWrite scope.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat to send the message to. Obtain from the list chats API or Teams client URL.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the message to send to the chat.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the message content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
    ],
  },
  {
    name: 'microsoftteams_set_preferred_presence',
    description: `Set the preferred presence status for the signed-in user in Microsoft Teams. Unlike setPresence (which is session-scoped), this persists a user-level preferred status that overrides the computed presence. Requires availability and activity values. Optionally specify an expiration duration in ISO 8601 format (e.g., PT1H). Requires the Presence.ReadWrite scope.`,
    params: [
      { name: 'activity', type: 'string', required: true, description: `The preferred activity of the user. Must be consistent with the chosen availability. Valid values: Available, Busy, InACall, InAConferenceCall, InAMeeting, Presenting, Away, DoNotDisturb, UrgentInterruptionsOnly, OffWork.` },
      { name: 'availability', type: 'string', required: true, description: `The preferred presence state of the user at the user level (not session-scoped). Valid values: Available, Busy, DoNotDisturb, BeRightBack, Away, Offline.` },
      { name: 'expiration_duration', type: 'string', required: false, description: `How long the preferred presence override should remain active, expressed as an ISO 8601 duration. Example: 'PT1H' for 1 hour, 'PT4H' for 4 hours. If omitted, the preference persists until explicitly cleared via clearUserPreferredPresence.` },
    ],
  },
  {
    name: 'microsoftteams_set_user_presence',
    description: `Set the presence status of the signed-in user in Microsoft Teams for a specific application session. Requires a session ID (a stable GUID representing the calling app), an availability value (e.g., Available, Busy, DoNotDisturb), and an activity value. Optionally specify an expiration duration in ISO 8601 duration format (e.g., PT1H). Requires the Presence.ReadWrite scope.`,
    params: [
      { name: 'activity', type: 'string', required: true, description: `The current activity of the user. Must be consistent with the chosen availability. Valid values: Available, Busy, InACall, InAConferenceCall, InAMeeting, Presenting, Away, DoNotDisturb, UrgentInterruptionsOnly, OffWork.` },
      { name: 'availability', type: 'string', required: true, description: `The base presence state of the user. Valid values: Available, Busy, DoNotDisturb, BeRightBack, Away, Offline.` },
      { name: 'session_id', type: 'string', required: true, description: `A stable GUID identifying the calling application session. Use a consistent GUID per application so multiple calls from the same app update the same session. Example: '22553876-f5ab-4529-bffb-cfe50aa89f87'.` },
      { name: 'expiration_duration', type: 'string', required: false, description: `How long the presence override should remain active, expressed as an ISO 8601 duration. Example: 'PT1H' for 1 hour, 'PT30M' for 30 minutes. If omitted, the presence persists until explicitly cleared.` },
    ],
  },
  {
    name: 'microsoftteams_unpin_channel_message',
    description: `Unpin a previously pinned message in a Microsoft Teams channel. The message remains in the channel history but is removed from the pinned messages list.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel that contains the pinned message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams channel message to unpin.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoftteams_update_channel',
    description: `Update the properties of an existing Microsoft Teams channel, such as its display name or description. At least one of display_name or description must be provided.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to update.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel to update.` },
      { name: 'description', type: 'string', required: false, description: `New description for the channel. Optional. At least one of display_name or description must be provided.` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the channel. Cannot contain special characters like #, &, :, <, >, *, ?. At least one of display_name or description must be provided.` },
    ],
  },
  {
    name: 'microsoftteams_update_channel_message',
    description: `Update the body content of an existing Microsoft Teams channel message. Only the message body can be edited after posting.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message to update.` },
      { name: 'content', type: 'string', required: true, description: `The new text or HTML content to replace the existing message body with.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the channel message to update.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the updated content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
    ],
  },
  {
    name: 'microsoftteams_update_online_meeting',
    description: `Update an existing Microsoft Teams online meeting by meeting ID. Any combination of subject, start time, end time, and allowed presenters can be updated in a single call.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The unique identifier of the online meeting to update. Obtain from the ID field returned when creating or listing meetings.` },
      { name: 'allowed_presenters', type: 'string', required: false, description: `Updated setting for who can present in the meeting. Valid values: 'everyone', 'organization', 'roleIsPresenter', 'organizer'.` },
      { name: 'end_date_time', type: 'string', required: false, description: `Updated end date and time for the meeting in ISO 8601 UTC format. Example: '2024-07-15T11:00:00Z'. Leave blank to keep the existing end time.` },
      { name: 'start_date_time', type: 'string', required: false, description: `Updated start date and time for the meeting in ISO 8601 UTC format. Example: '2024-07-15T10:00:00Z'. Leave blank to keep the existing start time.` },
      { name: 'subject', type: 'string', required: false, description: `Updated subject/title for the online meeting. Leave blank to keep the existing subject.` },
    ],
  },
  {
    name: 'microsoftteams_update_shift',
    description: `Update an existing shift in a Microsoft Teams team schedule by shift ID. Replaces the shift with the provided fields. Requires team ID and shift ID. The sharedShift block fields (start/end time, display name, notes, theme) are built conditionally from optional inputs.`,
    params: [
      { name: 'shift_id', type: 'string', required: true, description: `The unique identifier of the shift to update. Obtain from the create shift response or list shifts API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the shift.` },
      { name: 'display_name', type: 'string', required: false, description: `Updated display name for the shift shown on the schedule. Leave blank to keep the existing display name.` },
      { name: 'end_date_time', type: 'string', required: false, description: `Updated end date and time for the shift in ISO 8601 UTC format. Example: '2024-07-15T18:00:00Z'. Leave blank to keep the existing end time.` },
      { name: 'notes', type: 'string', required: false, description: `Updated notes for the shift visible to the assigned employee. Leave blank to keep the existing notes.` },
      { name: 'scheduling_group_id', type: 'string', required: false, description: `Updated scheduling group ID for the shift. Leave blank to keep the existing scheduling group.` },
      { name: 'start_date_time', type: 'string', required: false, description: `Updated start date and time for the shift in ISO 8601 UTC format. Example: '2024-07-15T10:00:00Z'. Leave blank to keep the existing start time.` },
      { name: 'theme', type: 'string', required: false, description: `Updated color theme for the shift block on the schedule view. Valid values: white, blue, green, purple, pink, yellow, gray, darkBlue, darkGreen, darkPurple, darkPink, darkYellow.` },
      { name: 'user_id', type: 'string', required: false, description: `Updated user ID (Azure AD object ID) to reassign the shift to. Leave blank to keep the existing assignment.` },
    ],
  },
  {
    name: 'microsoftteams_update_team',
    description: `Update the properties of an existing Microsoft Teams team. Requires team_id. At least one of display_name, description, or visibility must be provided. Returns HTTP 204 with no body on success.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to update.` },
      { name: 'description', type: 'string', required: false, description: `New description for the team (plain text, up to 1024 characters).` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the team.` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility of the team. Valid values: 'public' (anyone in org can join), 'private' (owner must invite). Note: changing from private to public is allowed; changing back may be restricted.` },
    ],
  },
  {
    name: 'microsoftteams_update_team_member',
    description: `Update the role of an existing member in a Microsoft Teams team, promoting them to owner or demoting them to member. Requires the team ID, the conversationMember ID (membership_id), and the new role. Returns the updated conversationMember resource (HTTP 200).`,
    params: [
      { name: 'membership_id', type: 'string', required: true, description: `The conversationMember ID of the membership to update. This is the unique ID of the member's team membership returned by the list team members or add member APIs — it is NOT the Azure AD user ID.` },
      { name: 'role', type: 'string', required: true, description: `The new role to assign to the team member. Valid values: 'member' (standard member) or 'owner' (team owner with admin privileges).` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team containing the member to update.` },
    ],
  },
]
