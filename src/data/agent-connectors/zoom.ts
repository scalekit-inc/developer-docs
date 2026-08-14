import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'zoom_chat_channel_create',
    description: `Create a new Team Chat channel.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the channel` },
      {
        name: 'members',
        type: 'array',
        required: false,
        description: `List of member objects with email field to add to the channel`,
      },
      {
        name: 'type',
        type: 'integer',
        required: false,
        description: `Channel type: 1=private, 2=private with external users, 3=public, 4=new external`,
      },
    ],
  },
  {
    name: 'zoom_chat_channel_delete',
    description: `Delete a Team Chat channel.`,
    params: [{ name: 'channel_id', type: 'string', required: true, description: `The channel ID` }],
  },
  {
    name: 'zoom_chat_channel_get',
    description: `Get details of a specific Team Chat channel.`,
    params: [{ name: 'channel_id', type: 'string', required: true, description: `The channel ID` }],
  },
  {
    name: 'zoom_chat_channel_member_invite',
    description: `Invite one or more members to a Team Chat channel.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The channel ID` },
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `Array of member objects with email field`,
      },
    ],
  },
  {
    name: 'zoom_chat_channel_member_remove',
    description: `Remove a member from a Team Chat channel.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The channel ID` },
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `The member ID or email to remove`,
      },
    ],
  },
  {
    name: 'zoom_chat_channel_members_list',
    description: `List members of a Team Chat channel.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The channel ID` },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page of results`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of members per page (max 50)`,
      },
    ],
  },
  {
    name: 'zoom_chat_channel_messages_list',
    description: `List messages in a Zoom Team Chat channel.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The channel ID to list messages from`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The user ID or 'me' for the authenticated user`,
      },
      {
        name: 'date',
        type: 'string',
        required: false,
        description: `Date to retrieve messages for (yyyy-MM-dd). Defaults to today.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of messages per page (max 50)`,
      },
    ],
  },
  {
    name: 'zoom_chat_channel_update',
    description: `Update the name or settings of a Team Chat channel.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The channel ID` },
      { name: 'name', type: 'string', required: false, description: `New name for the channel` },
    ],
  },
  {
    name: 'zoom_chat_channels_list',
    description: `List all Zoom Team Chat channels the authenticated user belongs to.`,
    params: [
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of channels per page (max 50)`,
      },
    ],
  },
  {
    name: 'zoom_chat_message_send',
    description: `Send a message in a Zoom Team Chat channel or to a user.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `The message text to send` },
      { name: 'user_id', type: 'string', required: true, description: `Sender's user ID or 'me'` },
      {
        name: 'to_channel',
        type: 'string',
        required: false,
        description: `Channel ID to send the message to`,
      },
      {
        name: 'to_jid',
        type: 'string',
        required: false,
        description: `JID of the user to send a direct message to`,
      },
    ],
  },
  {
    name: 'zoom_group_create',
    description: `Create a new user group in the Zoom account.`,
    params: [{ name: 'name', type: 'string', required: true, description: `Name of the group` }],
  },
  {
    name: 'zoom_group_delete',
    description: `Delete a Zoom group.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The group ID to delete` },
    ],
  },
  {
    name: 'zoom_group_get',
    description: `Get the details of a specific Zoom group.`,
    params: [{ name: 'group_id', type: 'string', required: true, description: `The group ID` }],
  },
  {
    name: 'zoom_group_update',
    description: `Rename an existing Zoom group.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The group ID to update` },
      { name: 'name', type: 'string', required: true, description: `New name for the group` },
    ],
  },
  {
    name: 'zoom_groups_list',
    description: `List all groups in the Zoom account.`,
    params: [],
  },
  {
    name: 'zoom_meeting_create',
    description: `Schedule a new Zoom meeting for a user.`,
    params: [
      { name: 'topic', type: 'string', required: true, description: `Meeting topic/title` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
      {
        name: 'agenda',
        type: 'string',
        required: false,
        description: `Meeting description or agenda`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Meeting duration in minutes`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Meeting passcode (max 10 chars)`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Meeting start time in ISO 8601 UTC format`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the meeting (e.g. America/New_York)`,
      },
      {
        name: 'type',
        type: 'integer',
        required: false,
        description: `1=Instant, 2=Scheduled, 3=Recurring no fixed time, 8=Recurring fixed time`,
      },
    ],
  },
  {
    name: 'zoom_meeting_delete',
    description: `Delete a Zoom meeting.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The meeting ID to delete`,
      },
      {
        name: 'occurrence_id',
        type: 'string',
        required: false,
        description: `Occurrence ID for recurring meeting instances`,
      },
    ],
  },
  {
    name: 'zoom_meeting_get',
    description: `Retrieve details of a specific Zoom meeting.`,
    params: [{ name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` }],
  },
  {
    name: 'zoom_meeting_invitation_get',
    description: `Retrieve the invitation text for a Zoom meeting.`,
    params: [{ name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` }],
  },
  {
    name: 'zoom_meeting_poll_create',
    description: `Create a poll for a scheduled Zoom meeting.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` },
      {
        name: 'questions',
        type: 'array',
        required: true,
        description: `Array of poll question objects`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the poll` },
      {
        name: 'anonymous',
        type: 'boolean',
        required: false,
        description: `Whether to keep the poll anonymous`,
      },
      {
        name: 'poll_type',
        type: 'integer',
        required: false,
        description: `1 = classic Poll, 2 = Advanced Poll (enables rating/matching/rank order/short-long answer question types)`,
      },
    ],
  },
  {
    name: 'zoom_meeting_poll_get',
    description: `Get the details of a specific Zoom meeting poll.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` },
      { name: 'poll_id', type: 'string', required: true, description: `The poll ID` },
    ],
  },
  {
    name: 'zoom_meeting_polls_list',
    description: `List all polls created for a Zoom meeting.`,
    params: [{ name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` }],
  },
  {
    name: 'zoom_meeting_recordings_delete',
    description: `Delete all cloud recordings for a specific meeting.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID or UUID` },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `trash (move to trash, default) or delete (permanent)`,
      },
    ],
  },
  {
    name: 'zoom_meeting_recordings_get',
    description: `Retrieve all cloud recordings for a specific meeting.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID or UUID` },
    ],
  },
  {
    name: 'zoom_meeting_registrant_add',
    description: `Register a participant for a Zoom meeting.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Registrant's email address` },
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `Registrant's first name`,
      },
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` },
      { name: 'last_name', type: 'string', required: false, description: `Registrant's last name` },
      {
        name: 'occurrence_ids',
        type: 'string',
        required: false,
        description: `Comma-separated occurrence IDs for recurring meetings`,
      },
    ],
  },
  {
    name: 'zoom_meeting_registrant_status_update',
    description: `Approve, deny, or cancel one or more registrants for a Zoom meeting.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to take on the given registrants`,
      },
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` },
      {
        name: 'registrants',
        type: 'array',
        required: true,
        description: `Array of registrant objects to update, each with id and/or email`,
      },
      {
        name: 'occurrence_id',
        type: 'string',
        required: false,
        description: `Occurrence ID for recurring meetings`,
      },
    ],
  },
  {
    name: 'zoom_meeting_registrants_list',
    description: `List all registrants for a Zoom meeting.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'occurrence_id',
        type: 'string',
        required: false,
        description: `Occurrence ID for recurring meetings`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: pending, approved, denied`,
      },
    ],
  },
  {
    name: 'zoom_meeting_status_update',
    description: `Update the status of a Zoom meeting (e.g., end a meeting in progress).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: 'end' to end the meeting`,
      },
      { name: 'meeting_id', type: 'string', required: true, description: `The meeting ID` },
    ],
  },
  {
    name: 'zoom_meeting_update',
    description: `Update an existing Zoom meeting's details.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The meeting ID to update`,
      },
      { name: 'agenda', type: 'string', required: false, description: `New meeting agenda` },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `New duration in minutes`,
      },
      { name: 'password', type: 'string', required: false, description: `New meeting passcode` },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `New start time in ISO 8601 UTC format`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the meeting`,
      },
      { name: 'topic', type: 'string', required: false, description: `New meeting topic` },
    ],
  },
  {
    name: 'zoom_meetings_list',
    description: `List all meetings scheduled by a user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page of results`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter: scheduled, live, upcoming, upcoming_meetings, previous_meetings`,
      },
    ],
  },
  {
    name: 'zoom_past_meeting_get',
    description: `Retrieve details of an ended Zoom meeting.`,
    params: [
      {
        name: 'meeting_uuid',
        type: 'string',
        required: true,
        description: `The meeting UUID (double-encode if contains / or //)`,
      },
    ],
  },
  {
    name: 'zoom_phone_call_logs_list',
    description: `Retrieve account-level Zoom Phone call logs within a date range, including caller, callee, duration, and call result. Requires a Zoom Phone license and phone:read:admin scope.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start date of the range in yyyy-MM-dd format`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End date of the range in yyyy-MM-dd format`,
      },
      { name: 'type', type: 'string', required: false, description: `Filter by call type` },
    ],
  },
  {
    name: 'zoom_phone_users_list',
    description: `List all users enabled with a Zoom Phone license on the account, including their extension and phone numbers. Requires a Zoom Phone license and phone:read:admin scope.`,
    params: [
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 100)`,
      },
      {
        name: 'site_id',
        type: 'string',
        required: false,
        description: `Filter users by a specific Zoom Phone site`,
      },
    ],
  },
  {
    name: 'zoom_recordings_list',
    description: `List all cloud recordings for a user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start date in yyyy-MM-dd format (default: current date minus 1 month)`,
      },
      {
        name: 'mc',
        type: 'string',
        required: false,
        description: `Set to true to retrieve recordings from Zoom Room`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End date in yyyy-MM-dd format (max 1 month range)`,
      },
      {
        name: 'trash',
        type: 'boolean',
        required: false,
        description: `Set to true to list trashed recordings`,
      },
    ],
  },
  {
    name: 'zoom_report_daily_usage',
    description: `Retrieve the account-level daily usage report showing new users, meetings, participants, and meeting minutes for each day of a given month. Requires owner or admin privileges and report:read scope.`,
    params: [
      {
        name: 'month',
        type: 'integer',
        required: true,
        description: `Month to retrieve the report for (1-12)`,
      },
      {
        name: 'year',
        type: 'integer',
        required: true,
        description: `Year to retrieve the report for`,
      },
    ],
  },
  {
    name: 'zoom_report_meeting_participants',
    description: `Retrieve a report of participants who attended a past Zoom meeting, including join/leave times. Requires a Pro or higher plan and report:read scope.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The meeting ID or UUID to retrieve the participants report for`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
    ],
  },
  {
    name: 'zoom_report_user_meetings',
    description: `Retrieve a report of meetings hosted by a Zoom user within a date range, including duration and participant counts. Requires a Pro or higher plan and report:read scope.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Start date of the report range in yyyy-MM-dd format`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `End date of the report range in yyyy-MM-dd format`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of meetings to include: past, pastOne, or live`,
      },
    ],
  },
  {
    name: 'zoom_report_webinar_participants',
    description: `Retrieve a report of participants who attended a past Zoom webinar, including join/leave times. Requires a Pro or higher plan and report:read scope.`,
    params: [
      {
        name: 'webinar_id',
        type: 'string',
        required: true,
        description: `The webinar ID or UUID to retrieve the participants report for`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
    ],
  },
  {
    name: 'zoom_tracking_field_create',
    description: `Create a custom tracking field for meetings and webinars.`,
    params: [
      { name: 'field', type: 'string', required: true, description: `Name of the tracking field` },
      {
        name: 'field_required',
        type: 'boolean',
        required: false,
        description: `Whether this tracking field is required when scheduling a meeting or webinar. Maps to Zoom's 'required' field.`,
      },
      {
        name: 'recommended_values',
        type: 'array',
        required: false,
        description: `Suggested values for this tracking field`,
      },
      {
        name: 'visible',
        type: 'boolean',
        required: false,
        description: `Whether this tracking field is visible when scheduling a meeting or webinar`,
      },
    ],
  },
  {
    name: 'zoom_tracking_field_delete',
    description: `Delete a custom tracking field.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The tracking field ID to delete`,
      },
    ],
  },
  {
    name: 'zoom_tracking_field_get',
    description: `Get the details of a specific tracking field.`,
    params: [
      { name: 'field_id', type: 'string', required: true, description: `The tracking field ID` },
    ],
  },
  {
    name: 'zoom_tracking_field_update',
    description: `Update a custom tracking field.`,
    params: [
      {
        name: 'field_id',
        type: 'string',
        required: true,
        description: `The tracking field ID to update`,
      },
      {
        name: 'field',
        type: 'string',
        required: false,
        description: `New name of the tracking field`,
      },
      {
        name: 'field_required',
        type: 'boolean',
        required: false,
        description: `Whether this tracking field is required when scheduling a meeting or webinar. Maps to Zoom's 'required' field.`,
      },
      {
        name: 'recommended_values',
        type: 'array',
        required: false,
        description: `Suggested values for this tracking field`,
      },
      {
        name: 'visible',
        type: 'boolean',
        required: false,
        description: `Whether this tracking field is visible when scheduling a meeting or webinar`,
      },
    ],
  },
  {
    name: 'zoom_tracking_fields_list',
    description: `List the account's custom tracking fields used for meetings and webinars.`,
    params: [],
  },
  {
    name: 'zoom_user_delete',
    description: `Disassociate or permanently delete a Zoom user.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `The user ID to delete` },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `disassociate (default) or delete`,
      },
      {
        name: 'transfer_email',
        type: 'string',
        required: false,
        description: `Email to transfer data to before deletion`,
      },
    ],
  },
  {
    name: 'zoom_user_get',
    description: `Retrieve details of a specific Zoom user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
    ],
  },
  {
    name: 'zoom_user_permissions_get',
    description: `Retrieve permissions for a Zoom user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
    ],
  },
  {
    name: 'zoom_user_settings_get',
    description: `Retrieve settings for a Zoom user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
    ],
  },
  {
    name: 'zoom_user_update',
    description: `Update a Zoom user's profile information.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
      { name: 'company', type: 'string', required: false, description: `User's company name` },
      { name: 'display_name', type: 'string', required: false, description: `New display name` },
      { name: 'first_name', type: 'string', required: false, description: `New first name` },
      { name: 'job_title', type: 'string', required: false, description: `User's job title` },
      { name: 'last_name', type: 'string', required: false, description: `New last name` },
      { name: 'location', type: 'string', required: false, description: `User's location` },
      { name: 'phone_number', type: 'string', required: false, description: `User's phone number` },
    ],
  },
  {
    name: 'zoom_users_list',
    description: `List all users on a Zoom account.`,
    params: [
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      { name: 'role_id', type: 'string', required: false, description: `Filter users by role ID` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by status: active, inactive, pending`,
      },
    ],
  },
  {
    name: 'zoom_webinar_create',
    description: `Schedule a new Zoom webinar for a user. Requires a Zoom account with a webinar license.`,
    params: [
      { name: 'topic', type: 'string', required: true, description: `Webinar topic/title` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user who will host the webinar`,
      },
      {
        name: 'agenda',
        type: 'string',
        required: false,
        description: `Webinar description or agenda`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Webinar duration in minutes`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Webinar start time in ISO 8601 UTC format`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Timezone for the webinar (e.g. America/New_York)`,
      },
      {
        name: 'type',
        type: 'integer',
        required: false,
        description: `Webinar type: 5=Webinar, 6=Recurring webinar with no fixed time, 9=Recurring webinar with fixed time`,
      },
    ],
  },
  {
    name: 'zoom_webinar_delete',
    description: `Permanently delete a scheduled Zoom webinar. This action is irreversible and cancels the webinar for all registrants.`,
    params: [
      {
        name: 'webinar_id',
        type: 'string',
        required: true,
        description: `The webinar ID to delete`,
      },
      {
        name: 'occurrence_id',
        type: 'string',
        required: false,
        description: `Occurrence ID to delete a single occurrence of a recurring webinar`,
      },
    ],
  },
  {
    name: 'zoom_webinar_get',
    description: `Retrieve details of a scheduled Zoom webinar, including its settings, agenda, and occurrence information.`,
    params: [
      {
        name: 'webinar_id',
        type: 'string',
        required: true,
        description: `The webinar ID to retrieve`,
      },
      {
        name: 'occurrence_id',
        type: 'string',
        required: false,
        description: `Occurrence ID for a recurring webinar`,
      },
    ],
  },
  {
    name: 'zoom_webinar_panelist_add',
    description: `Add one or more panelists to a Zoom webinar.`,
    params: [
      {
        name: 'panelists',
        type: 'array',
        required: true,
        description: `Array of panelist objects, each with name and email`,
      },
      { name: 'webinar_id', type: 'string', required: true, description: `The webinar ID` },
    ],
  },
  {
    name: 'zoom_webinar_registrant_add',
    description: `Register a new attendee for a Zoom webinar. Returns a join URL for the registrant.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Registrant's email address` },
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `Registrant's first name`,
      },
      {
        name: 'webinar_id',
        type: 'string',
        required: true,
        description: `The webinar ID to register the attendee for`,
      },
      { name: 'last_name', type: 'string', required: false, description: `Registrant's last name` },
    ],
  },
  {
    name: 'zoom_webinar_registrant_status_update',
    description: `Approve, deny, or cancel one or more registrants for a Zoom webinar.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to take on the given registrants`,
      },
      {
        name: 'registrants',
        type: 'array',
        required: true,
        description: `Array of registrant objects to update, each with id and/or email`,
      },
      { name: 'webinar_id', type: 'string', required: true, description: `The webinar ID` },
      {
        name: 'occurrence_id',
        type: 'string',
        required: false,
        description: `Occurrence ID for recurring webinars`,
      },
    ],
  },
  {
    name: 'zoom_webinar_registrants_list',
    description: `List all registrants for a Zoom webinar.`,
    params: [
      {
        name: 'webinar_id',
        type: 'string',
        required: true,
        description: `The webinar ID to list registrants for`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by registrant status: pending, approved, denied`,
      },
    ],
  },
  {
    name: 'zoom_webinar_update',
    description: `Update an existing Zoom webinar's topic, schedule, or agenda. Only the fields you provide are changed.`,
    params: [
      {
        name: 'webinar_id',
        type: 'string',
        required: true,
        description: `The webinar ID to update`,
      },
      { name: 'agenda', type: 'string', required: false, description: `New webinar agenda` },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `New duration in minutes`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `New start time in ISO 8601 UTC format`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `New timezone for the webinar`,
      },
      { name: 'topic', type: 'string', required: false, description: `New webinar topic` },
    ],
  },
  {
    name: 'zoom_webinars_list',
    description: `List all scheduled webinars for a Zoom user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `User ID or 'me' for the authenticated user`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Token for next page`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page (max 300)`,
      },
    ],
  },
]
