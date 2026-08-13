import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'chorus_conversation_get',
    description: `Retrieve a single Chorus conversation by ID, including transcript, tracker matches, participants, linked CRM account/deal, recording details, and engagement metrics.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the conversation.`,
      },
    ],
  },
  {
    name: 'chorus_conversations_list',
    description: `List or search Chorus conversations (calls and meetings), with optional date range, participant, team, and tracker filters.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End of the date-time range for filtering conversations (ISO 8601).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'participant_email',
        type: 'string',
        required: false,
        description: `Filter conversations by participant email address.`,
      },
      { name: 'q', type: 'string', required: false, description: `Free-text search query.` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start of the date-time range for filtering conversations (ISO 8601).`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter conversations by team ID.`,
      },
      {
        name: 'tracker_name',
        type: 'string',
        required: false,
        description: `Filter conversations by tracker name.`,
      },
    ],
  },
  {
    name: 'chorus_engagement_get',
    description: `Retrieve a single Chorus engagement by ID, including type, date, participants, duration, and outcome.`,
    params: [
      {
        name: 'engagement_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the engagement.`,
      },
    ],
  },
  {
    name: 'chorus_engagements_filter',
    description: `Search Chorus engagements (calls, meetings, and dialer activity) matching the given type, participant, outcome, and date-range criteria.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End of the date-time range for filtering engagements (ISO 8601).`,
      },
      {
        name: 'outcome',
        type: 'string',
        required: false,
        description: `Filter engagements by outcome.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      {
        name: 'participant_emails',
        type: 'array',
        required: false,
        description: `Array of participant email addresses to filter by.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start of the date-time range for filtering engagements (ISO 8601).`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter engagements by type, e.g. MEETING or CALL.`,
      },
    ],
  },
  {
    name: 'chorus_team_get',
    description: `Retrieve a single Chorus team by ID, including its member list.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the team.`,
      },
    ],
  },
  {
    name: 'chorus_teams_list',
    description: `List teams configured in the Chorus account.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
  {
    name: 'chorus_user_get',
    description: `Retrieve a single Chorus user by ID.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the user.`,
      },
    ],
  },
  {
    name: 'chorus_users_list',
    description: `List users in the Chorus account, with optional team or role filters.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
      { name: 'role', type: 'string', required: false, description: `Filter users by role.` },
      { name: 'team_id', type: 'string', required: false, description: `Filter users by team ID.` },
    ],
  },
  {
    name: 'chorus_users_search',
    description: `Search Chorus users by free-text query, e.g. matching name or email.`,
    params: [
      { name: 'q', type: 'string', required: true, description: `Free-text search query.` },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results per page.`,
      },
    ],
  },
]
