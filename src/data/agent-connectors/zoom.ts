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
]
