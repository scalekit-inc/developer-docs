import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jiminny_action_items_get',
    description: `Retrieve the AI-generated action items for a given activity, returning a list of follow-up tasks identified from the conversation.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The UUID of the activity to retrieve action items for.`,
      },
    ],
  },
  {
    name: 'jiminny_activities_list',
    description: `Retrieve completed and processed call and meeting activities with optional date range, update date range, status, and page filters. The time range must be less than six months and you must provide either fromDate/toDate or updatedFrom.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Filter activities that occurred after this UTC date-time (e.g. 2021-10-01 00:00:00). Must be before toDate.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number to return (page size is 500 activities). Default is 1.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter activities by status: in-progress, completed (for calls/meetings), received, sent, delivered (for SMS/Voice dialer).`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `Filter activities that occurred before this UTC date-time (e.g. 2021-11-01 00:00:00). Cannot be a future date.`,
      },
      {
        name: 'updatedFrom',
        type: 'string',
        required: false,
        description: `Filter activities updated after this UTC date-time (e.g. 2021-11-01 00:00:00). Must be before updatedTo.`,
      },
      {
        name: 'updatedTo',
        type: 'string',
        required: false,
        description: `Filter activities updated before this UTC date-time. Cannot be a future date. Defaults to current time.`,
      },
    ],
  },
  {
    name: 'jiminny_activity_upload',
    description: `Upload a call or meeting recording file to Jiminny for transcription and analysis, returning the new activity ID on success.`,
    params: [
      {
        name: 'hostUserEmail',
        type: 'string',
        required: true,
        description: `The email address of the host user. Must belong to the authenticated team.`,
      },
      {
        name: 'language',
        type: 'string',
        required: true,
        description: `The language locale of the activity (e.g. en_GB, en_US, fr_FR).`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the activity (max 250 characters).`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `An optional CRM Account ID to associate with this activity (max 100 characters).`,
      },
      {
        name: 'completedAt',
        type: 'string',
        required: false,
        description: `The date the activity was completed (format: YYYY-MM-DD).`,
      },
      {
        name: 'externalId',
        type: 'string',
        required: false,
        description: `An optional external identifier for this activity (max 191 characters). Must be unique per host user.`,
      },
      {
        name: 'leadId',
        type: 'string',
        required: false,
        description: `An optional CRM Lead ID to associate with this activity (max 180 characters).`,
      },
      {
        name: 'notifyForUploadCompletionByEmail',
        type: 'boolean',
        required: false,
        description: `Whether to notify the host user via email when the upload and processing is complete.`,
      },
      {
        name: 'opportunityId',
        type: 'string',
        required: false,
        description: `An optional CRM Opportunity ID to associate with this activity (max 100 characters).`,
      },
      {
        name: 'skipFullAnalysis',
        type: 'boolean',
        required: false,
        description: `Whether to skip the full AI analysis of the uploaded activity.`,
      },
    ],
  },
  {
    name: 'jiminny_automated_call_scoring_list',
    description: `Retrieve automated call scoring records with optional filters by user and date range, returning scores, activity types, and user details.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Filter scoring records created after this UTC date-time (e.g. 2021-10-01 00:00:00).`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `Filter scoring records created before this UTC date-time (e.g. 2021-11-01 00:00:00). Cannot be a future date.`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Optional UUID of the user to filter automated call scoring results by.`,
      },
    ],
  },
  {
    name: 'jiminny_coaching_feedback_list',
    description: `Retrieve bulk coaching feedback records within a required date range, optionally filtered by coach or coachee, returning scores, activity IDs, and timestamps.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: true,
        description: `Filter coaching feedback records created after this UTC date-time (e.g. 2021-10-01 00:00:00). Must be before toDate.`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: true,
        description: `Filter coaching feedback records created before this UTC date-time (e.g. 2021-11-01 00:00:00). Cannot be a future date.`,
      },
      {
        name: 'coacheeId',
        type: 'string',
        required: false,
        description: `Optional UUID of the coachee (sales rep) to filter coaching feedback by.`,
      },
      {
        name: 'coachId',
        type: 'string',
        required: false,
        description: `Optional UUID of the coach (manager) to filter coaching feedback by.`,
      },
    ],
  },
  {
    name: 'jiminny_comments_list',
    description: `Retrieve activity comment records with optional filters by user and date range, returning comment IDs, activity IDs, user IDs, and creation timestamps.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: false,
        description: `Filter comments created after this UTC date-time (e.g. 2021-10-01 00:00:00). Must be before toDate.`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: false,
        description: `Filter comments created before this UTC date-time (e.g. 2021-11-01 00:00:00). Cannot be a future date.`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Optional UUID of the user to filter comments by.`,
      },
    ],
  },
  {
    name: 'jiminny_listens_list',
    description: `Retrieve listened (played) activity records within a date range, optionally filtered by user, showing who listened to which activities and when.`,
    params: [
      {
        name: 'fromDate',
        type: 'string',
        required: true,
        description: `Filter listened activities that occurred after this UTC date-time (e.g. 2021-10-01 00:00:00). Must be before toDate.`,
      },
      {
        name: 'toDate',
        type: 'string',
        required: true,
        description: `Filter listened activities that occurred before this UTC date-time (e.g. 2021-11-01 00:00:00). Cannot be a future date.`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Optional UUID of the user to filter listened activities by.`,
      },
    ],
  },
  {
    name: 'jiminny_organization_get',
    description: `Return the current authenticated Organization details including name, CRM integration, calendar type, and address.`,
    params: [],
  },
  {
    name: 'jiminny_questions_get',
    description: `Retrieve questions detected in a specific activity, including their timestamps, speaker participant IDs, text, and whether they are engaging or insightful.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The UUID of the activity to retrieve detected questions for.`,
      },
    ],
  },
  {
    name: 'jiminny_summary_get',
    description: `Get the AI-generated conversation summary for a given activity, returning the summary content text.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The UUID of the activity to retrieve the summary for.`,
      },
    ],
  },
  {
    name: 'jiminny_test_tool_xyz',
    description: `Test.`,
    params: [],
  },
  {
    name: 'jiminny_topic_triggers_list',
    description: `Retrieve all topic triggers configured for the authenticated team, returned as a hierarchy of themes, topics, and trigger keywords.`,
    params: [],
  },
  {
    name: 'jiminny_topic_triggers_matched_get',
    description: `Retrieve all topic triggers that were matched within a specific activity, including the theme, topic, trigger keyword, timestamps, and matched text excerpt.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The UUID of the activity to retrieve matched topic triggers for.`,
      },
    ],
  },
  {
    name: 'jiminny_transcript_get',
    description: `Retrieve transcription segments for a given activity, returning an array of timed speech segments with speaker participant IDs.`,
    params: [
      {
        name: 'activityId',
        type: 'string',
        required: true,
        description: `The UUID of the activity to retrieve the transcription for.`,
      },
    ],
  },
  {
    name: 'jiminny_users_list',
    description: `Retrieve all users belonging to the authenticated team, including their IDs, names, emails, statuses, team names, CRM IDs, and roles.`,
    params: [],
  },
  {
    name: 'jiminny_webhook_create',
    description: `Create a webhook subscription that sends event payloads to a destination URL when a specified trigger occurs in Jiminny.`,
    params: [
      {
        name: 'trigger',
        type: 'string',
        required: true,
        description: `The event trigger for the webhook. One of: coaching_feedback_completed, conversation_shared, conversation_exported, conversation_processed, conversation_played.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The destination URL to receive the webhook payload (max 191 characters).`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `An optional external identifier for the webhook (max 191 characters).`,
      },
    ],
  },
  {
    name: 'jiminny_webhook_delete',
    description: `Delete an existing webhook subscription by its UUID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `UUID of the webhook to delete.` },
    ],
  },
  {
    name: 'jiminny_webhook_sample_get',
    description: `Retrieve a sample webhook payload for a given trigger event type to understand the data structure that will be sent.`,
    params: [
      {
        name: 'trigger',
        type: 'string',
        required: true,
        description: `The webhook trigger event type to get a sample payload for.`,
      },
    ],
  },
]
