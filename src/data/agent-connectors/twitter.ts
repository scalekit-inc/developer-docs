import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'twitter_activity_subscription_create',
    description: `Creates a subscription for an X activity event. Use when you need to monitor specific user activities like profile updates, follows, or spaces events.`,
    params: [
      {
        name: 'event_types',
        type: 'array',
        required: true,
        description: `List of event types to subscribe to, e.g. profile.updated, follows, spaces`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Twitter user ID to subscribe to activities for`,
      },
    ],
  },
  {
    name: 'twitter_blocked_users_get',
    description: `Retrieves the authenticated user's block list. The id parameter must be the authenticated user's ID. Use Get Authenticated User action first to obtain your user ID.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID — must match the authenticated user`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-1000)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_bookmark_add',
    description: `Adds a specified, existing, and accessible Tweet to a user's bookmarks. Success is indicated by the 'bookmarked' field in the response.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'tweet_id',
        type: 'string',
        required: true,
        description: `ID of the Tweet to bookmark`,
      },
    ],
  },
  {
    name: 'twitter_bookmark_remove',
    description: `Removes a Tweet from the authenticated user's bookmarks. The Tweet must have been previously bookmarked by the user for the action to have an effect.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'tweet_id',
        type: 'string',
        required: true,
        description: `ID of the bookmarked tweet to remove`,
      },
    ],
  },
  {
    name: 'twitter_bookmarks_get',
    description: `Retrieves Tweets bookmarked by the authenticated user. The provided User ID must match the authenticated user's ID.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitter_compliance_job_create',
    description: `Creates a new compliance job to check the status of Tweet or user IDs. Upload IDs as a plain text file (one ID per line) to the upload_url received in the response.`,
    params: [
      {
        name: 'resumable',
        type: 'boolean',
        required: false,
        description: `Whether the job should be resumable`,
      },
      { name: 'type', type: 'string', required: true, description: `Type of compliance job` },
    ],
  },
  {
    name: 'twitter_compliance_job_get',
    description: `Retrieves status, download/upload URLs, and other details for an existing Twitter compliance job specified by its unique ID.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Compliance job ID` }],
  },
  {
    name: 'twitter_compliance_jobs_list',
    description: `Returns a list of recent compliance jobs, filtered by type (tweets or users) and optionally by status.`,
    params: [
      { name: 'status', type: 'string', required: false, description: `Filter by job status` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of compliance jobs to list`,
      },
    ],
  },
  {
    name: 'twitter_dm_conversation_events_get',
    description: `Fetches Direct Message (DM) events for a one-on-one conversation with a specified participant ID, ordered chronologically newest to oldest. Does not support group DMs.`,
    params: [
      {
        name: 'dm_event_fields',
        type: 'string',
        required: false,
        description: `Comma-separated DM event fields`,
      },
      {
        name: 'event_types',
        type: 'string',
        required: false,
        description: `Filter by event types`,
      },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'participant_id',
        type: 'string',
        required: true,
        description: `User ID of the DM conversation participant`,
      },
    ],
  },
  {
    name: 'twitter_dm_conversation_retrieve',
    description: `Retrieves Direct Message (DM) events for a specific conversation ID on Twitter. Useful for analyzing messages and participant activities.`,
    params: [
      {
        name: 'dm_conversation_id',
        type: 'string',
        required: true,
        description: `DM conversation ID`,
      },
      {
        name: 'dm_event_fields',
        type: 'string',
        required: false,
        description: `Comma-separated DM event fields`,
      },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
    ],
  },
  {
    name: 'twitter_dm_conversation_send',
    description: `Sends a message with optional text and/or media attachments (using pre-uploaded media_ids) to a specified Twitter Direct Message conversation.`,
    params: [
      {
        name: 'dm_conversation_id',
        type: 'string',
        required: true,
        description: `DM conversation ID to send the message to`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: false,
        description: `Pre-uploaded media ID to attach`,
      },
      { name: 'text', type: 'string', required: false, description: `Message text` },
    ],
  },
  {
    name: 'twitter_dm_delete',
    description: `Permanently deletes a specific Twitter Direct Message (DM) event using its event_id, if the authenticated user sent it. This action is irreversible and does not delete entire conversations.`,
    params: [
      {
        name: 'event_id',
        type: 'string',
        required: true,
        description: `ID of the DM event to delete`,
      },
      {
        name: 'participant_id',
        type: 'string',
        required: true,
        description: `User ID of the DM conversation participant`,
      },
    ],
  },
  {
    name: 'twitter_dm_event_get',
    description: `Fetches a specific Direct Message (DM) event by its unique ID. Allows optional expansion of related data like users or tweets.`,
    params: [
      {
        name: 'dm_event_fields',
        type: 'string',
        required: false,
        description: `Comma-separated DM event fields`,
      },
      { name: 'event_id', type: 'string', required: true, description: `DM event ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
    ],
  },
  {
    name: 'twitter_dm_events_get',
    description: `Returns recent Direct Message events for the authenticated user, such as new messages or changes in conversation participants.`,
    params: [
      {
        name: 'dm_event_fields',
        type: 'string',
        required: false,
        description: `Comma-separated DM event fields`,
      },
      {
        name: 'event_types',
        type: 'string',
        required: false,
        description: `Filter by event types`,
      },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
    ],
  },
  {
    name: 'twitter_dm_group_conversation_create',
    description: `Creates a new group Direct Message (DM) conversation on Twitter. The conversation_type must be 'Group'. Include participant_ids and an initial message with text and optional media attachments using media_id (not media_url). Media must be uploaded first.`,
    params: [
      {
        name: 'message_media_ids',
        type: 'array',
        required: false,
        description: `Media IDs to attach to initial message`,
      },
      { name: 'message_text', type: 'string', required: true, description: `Initial message text` },
      {
        name: 'participant_ids',
        type: 'array',
        required: true,
        description: `List of Twitter user IDs to include`,
      },
    ],
  },
  {
    name: 'twitter_dm_send',
    description: `Sends a new Direct Message with text and/or media (media_id for attachments must be pre-uploaded) to a specified Twitter user. Creates a new DM and does not modify existing messages.`,
    params: [
      {
        name: 'media_id',
        type: 'string',
        required: false,
        description: `Pre-uploaded media ID to attach`,
      },
      {
        name: 'participant_id',
        type: 'string',
        required: true,
        description: `Twitter user ID of the DM recipient`,
      },
      { name: 'text', type: 'string', required: false, description: `Message text` },
    ],
  },
  {
    name: 'twitter_followers_get',
    description: `Retrieves a list of users who follow a specified public Twitter user ID.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Twitter user ID to get followers for`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-1000)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_following_get',
    description: `Retrieves users followed by a specific Twitter user, allowing pagination and customization of returned user and tweet data fields via expansions.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-1000)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_full_archive_search',
    description: `Searches the full archive of public Tweets from March 2006 onwards. Use start_time and end_time together for a defined time window. Requires Academic Research access.`,
    params: [
      { name: 'end_time', type: 'string', required: false, description: `ISO 8601 end time` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (10-500)`,
      },
      { name: 'next_token', type: 'string', required: false, description: `Next page token` },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query using X search syntax`,
      },
      { name: 'since_id', type: 'string', required: false, description: `Minimum tweet ID` },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `ISO 8601 start time e.g. 2021-01-01T00:00:00Z`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      { name: 'until_id', type: 'string', required: false, description: `Maximum tweet ID` },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_full_archive_search_counts',
    description: `Returns a count of Tweets from the full archive that match a specified query, aggregated by day, hour, or minute. start_time must be before end_time if both are provided. since_id/until_id cannot be used with start_time/end_time.`,
    params: [
      { name: 'end_time', type: 'string', required: false, description: `ISO 8601 end time` },
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Aggregation granularity`,
      },
      { name: 'next_token', type: 'string', required: false, description: `Next page token` },
      { name: 'query', type: 'string', required: true, description: `Search query` },
      { name: 'since_id', type: 'string', required: false, description: `Minimum tweet ID` },
      { name: 'start_time', type: 'string', required: false, description: `ISO 8601 start time` },
      { name: 'until_id', type: 'string', required: false, description: `Maximum tweet ID` },
    ],
  },
  {
    name: 'twitter_list_create',
    description: `Creates a new, empty List on X (formerly Twitter). The provided name must be unique for the authenticated user. Accounts are added separately.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the list`,
      },
      { name: 'name', type: 'string', required: true, description: `Unique name for the new list` },
      {
        name: 'private',
        type: 'boolean',
        required: false,
        description: `Whether the list should be private`,
      },
    ],
  },
  {
    name: 'twitter_list_delete',
    description: `Permanently deletes a specified Twitter List using its ID. The list must be owned by the authenticated user. This action is irreversible.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the Twitter List to delete`,
      },
    ],
  },
  {
    name: 'twitter_list_follow',
    description: `Allows the authenticated user to follow a specific Twitter List they are permitted to access, subscribing them to the list's timeline. This does not automatically follow individual list members.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      { name: 'list_id', type: 'string', required: true, description: `ID of the list to follow` },
    ],
  },
  {
    name: 'twitter_list_followers_get',
    description: `Fetches a list of users who follow a specific Twitter List, identified by its ID. Ensure the authenticated user has access if the list is private.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_list_lookup',
    description: `Returns metadata for a specific Twitter List, identified by its ID. Does not return list members. Can expand the owner's User object via the expansions parameter.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
      {
        name: 'list_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_list_member_add',
    description: `Adds a user to a specified Twitter List. The list must be owned by the authenticated user.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID of the Twitter List` },
      { name: 'user_id', type: 'string', required: true, description: `ID of the user to add` },
    ],
  },
  {
    name: 'twitter_list_member_remove',
    description: `Removes a user from a Twitter List. The response is_member field will be false if removal was successful or the user was not a member. The updated list of members is not returned.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `ID of the user to remove from the list`,
      },
    ],
  },
  {
    name: 'twitter_list_members_get',
    description: `Fetches members of a specific Twitter List, identified by its unique ID.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_list_pin',
    description: `Pins a specified List to the authenticated user's profile. The List must exist, the user must have access rights, and the pin limit (typically 5 Lists) must not be exceeded.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      { name: 'list_id', type: 'string', required: true, description: `ID of the list to pin` },
    ],
  },
  {
    name: 'twitter_list_timeline_get',
    description: `Fetches the most recent Tweets posted by members of a specified Twitter List.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_list_unfollow',
    description: `Enables a user to unfollow a specific Twitter List, which removes its tweets from their timeline and stops related notifications. Reports following: false on success, even if the user was not initially following the list.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `ID of the list to unfollow`,
      },
    ],
  },
  {
    name: 'twitter_list_unpin',
    description: `Unpins a List from the authenticated user's profile. The user ID is automatically retrieved if not provided.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      { name: 'list_id', type: 'string', required: true, description: `ID of the list to unpin` },
    ],
  },
  {
    name: 'twitter_list_update',
    description: `Updates an existing Twitter List's name, description, or privacy status. Requires the List ID and at least one mutable property.`,
    params: [
      { name: 'description', type: 'string', required: false, description: `New description` },
      { name: 'id', type: 'string', required: true, description: `Twitter List ID to update` },
      { name: 'name', type: 'string', required: false, description: `New name for the list` },
      {
        name: 'private',
        type: 'boolean',
        required: false,
        description: `Set to true to make private, false for public`,
      },
    ],
  },
  {
    name: 'twitter_media_upload',
    description: `Uploads media (images only) to X/Twitter using the v2 API. Only supports images (tweet_image, dm_image) and subtitle files. For GIFs, videos, or any file larger than ~5 MB, use twitter_media_upload_large instead.`,
    params: [
      { name: 'media', type: 'string', required: true, description: `Base64-encoded image data` },
      {
        name: 'media_category',
        type: 'string',
        required: false,
        description: `Media category for use context`,
      },
      {
        name: 'media_type',
        type: 'string',
        required: true,
        description: `MIME type, e.g. image/jpeg or image/png`,
      },
    ],
  },
  {
    name: 'twitter_media_upload_append',
    description: `Appends a data chunk to an ongoing media upload session on X/Twitter. Use during chunked media uploads to append each segment of media data in sequence.`,
    params: [
      {
        name: 'media_data',
        type: 'string',
        required: true,
        description: `Base64-encoded chunk data`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: true,
        description: `Media ID from the INIT step`,
      },
      {
        name: 'segment_index',
        type: 'integer',
        required: true,
        description: `Zero-based index of the chunk segment`,
      },
    ],
  },
  {
    name: 'twitter_media_upload_base64',
    description: `Uploads media to X/Twitter using base64-encoded data. Use when you have media content as a base64 string. Only supports images and subtitle files. For videos or GIFs, use twitter_media_upload_large.`,
    params: [
      {
        name: 'media_category',
        type: 'string',
        required: false,
        description: `Media category for use context`,
      },
      {
        name: 'media_data',
        type: 'string',
        required: true,
        description: `Base64-encoded media data`,
      },
      {
        name: 'media_type',
        type: 'string',
        required: true,
        description: `MIME type, e.g. image/jpeg`,
      },
    ],
  },
  {
    name: 'twitter_media_upload_init',
    description: `Initializes a media upload session for X/Twitter. Returns a media_id for subsequent APPEND and FINALIZE commands. Required for uploading large files or when using the chunked upload workflow.`,
    params: [
      {
        name: 'additional_owners',
        type: 'string',
        required: false,
        description: `Comma-separated user IDs to also own the media`,
      },
      {
        name: 'media_category',
        type: 'string',
        required: false,
        description: `Media category for use context`,
      },
      {
        name: 'media_type',
        type: 'string',
        required: true,
        description: `MIME type, e.g. video/mp4 or image/gif`,
      },
      {
        name: 'total_bytes',
        type: 'integer',
        required: true,
        description: `Total size of the media file in bytes`,
      },
    ],
  },
  {
    name: 'twitter_media_upload_large',
    description: `Uploads media files to X/Twitter. Automatically uses chunked upload for GIFs, videos, and images larger than 5 MB. Use for videos, GIFs, or any file larger than 5 MB.`,
    params: [
      {
        name: 'additional_owners',
        type: 'string',
        required: false,
        description: `Comma-separated user IDs to also own the media`,
      },
      {
        name: 'media_category',
        type: 'string',
        required: false,
        description: `Media category for use context`,
      },
      {
        name: 'media_data',
        type: 'string',
        required: true,
        description: `Base64-encoded media file data`,
      },
      {
        name: 'media_type',
        type: 'string',
        required: true,
        description: `MIME type, e.g. video/mp4 or image/gif`,
      },
      {
        name: 'total_bytes',
        type: 'integer',
        required: true,
        description: `Total size of the file in bytes`,
      },
    ],
  },
  {
    name: 'twitter_media_upload_status_get',
    description: `Gets the status of a media upload for X/Twitter. Use to check the processing status of uploaded media, especially for videos and GIFs. Only needed if the FINALIZE command returned processing_info.`,
    params: [
      {
        name: 'media_id',
        type: 'string',
        required: true,
        description: `Media ID from the upload INIT step`,
      },
    ],
  },
  {
    name: 'twitter_muted_users_get',
    description: `Returns user objects muted by the X user identified by the id path parameter.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-1000)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_openapi_spec_get',
    description: `Fetches the OpenAPI specification (JSON) for Twitter's API v2. Used to programmatically understand the API's structure for developing client libraries or tools.`,
    params: [],
  },
  {
    name: 'twitter_post_analytics_get',
    description: `Retrieves analytics data for specified Posts within a defined time range. Returns engagement metrics, impressions, and other analytics. Requires OAuth 2.0 with tweet.read and users.read scopes.`,
    params: [
      { name: 'end_time', type: 'string', required: true, description: `ISO 8601 end time` },
      { name: 'start_time', type: 'string', required: true, description: `ISO 8601 start time` },
      {
        name: 'tweet_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Tweet IDs`,
      },
    ],
  },
  {
    name: 'twitter_post_create',
    description: `Creates a Tweet on Twitter. The \`text\` field is required unless card_uri, media_media_ids, poll_options, or quote_tweet_id is provided. Supports media, polls, geo, and reply targeting.`,
    params: [
      {
        name: 'geo_place_id',
        type: 'string',
        required: false,
        description: `Place ID for geo tag`,
      },
      {
        name: 'media_media_ids',
        type: 'array',
        required: false,
        description: `Media IDs to attach`,
      },
      {
        name: 'poll_duration_minutes',
        type: 'integer',
        required: false,
        description: `Duration of poll in minutes`,
      },
      { name: 'poll_options', type: 'array', required: false, description: `Up to 4 poll options` },
      {
        name: 'quote_tweet_id',
        type: 'string',
        required: false,
        description: `ID of the tweet to quote`,
      },
      {
        name: 'reply_in_reply_to_tweet_id',
        type: 'string',
        required: false,
        description: `ID of the tweet to reply to`,
      },
      { name: 'text', type: 'string', required: false, description: `Text content of the tweet` },
    ],
  },
  {
    name: 'twitter_post_delete',
    description: `Irreversibly deletes a specific Tweet by its ID. The Tweet may persist in third-party caches after deletion.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the Tweet to delete` },
    ],
  },
  {
    name: 'twitter_post_like',
    description: `Allows the authenticated user to like a specific, accessible Tweet. The authenticated user's ID is automatically determined from the OAuth token — you only need to provide the tweet_id.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      { name: 'tweet_id', type: 'string', required: true, description: `ID of the Tweet to like` },
    ],
  },
  {
    name: 'twitter_post_likers_get',
    description: `Retrieves users who have liked the Post (Tweet) identified by the provided ID.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_post_lookup',
    description: `Fetches comprehensive details for a single Tweet by its unique ID, provided the Tweet exists and is accessible.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
      {
        name: 'media_fields',
        type: 'string',
        required: false,
        description: `Comma-separated media fields`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_post_quotes_get',
    description: `Retrieves Tweets that quote a specified Tweet. Requires a valid Tweet ID.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitter_post_retweet',
    description: `Retweets a Tweet for the authenticated user. The user ID is automatically fetched from the authenticated session — you only need to provide the tweet_id.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'tweet_id',
        type: 'string',
        required: true,
        description: `ID of the Tweet to retweet`,
      },
    ],
  },
  {
    name: 'twitter_post_retweeters_get',
    description: `Retrieves users who publicly retweeted a specified public Post ID, excluding Quote Tweets and retweets from private accounts.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_post_retweets_get',
    description: `Retrieves Tweets that Retweeted a specified public or authenticated-user-accessible Tweet ID. Optionally customize the response with fields and expansions.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitter_post_unlike',
    description: `Allows an authenticated user to remove their like from a specific post. The action is idempotent and completes successfully even if the post was not liked.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'tweet_id',
        type: 'string',
        required: true,
        description: `ID of the Tweet to unlike`,
      },
    ],
  },
  {
    name: 'twitter_post_unretweet',
    description: `Removes a user's retweet of a specified Post, if the user had previously retweeted it.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'source_tweet_id',
        type: 'string',
        required: true,
        description: `ID of the Tweet to unretweet`,
      },
    ],
  },
  {
    name: 'twitter_posts_lookup',
    description: `Retrieves detailed information for one or more Posts (Tweets) identified by their unique IDs. Allows selection of specific fields and expansions.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Tweet IDs (up to 100)`,
      },
      {
        name: 'media_fields',
        type: 'string',
        required: false,
        description: `Comma-separated media fields`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_recent_search',
    description: `Searches Tweets from the last 7 days matching a query using X's search syntax. Ideal for real-time analysis, trend monitoring, or retrieving posts from specific users (e.g., from:username). Note: impression_count returns 0 for other users' tweets — use retweet_count, like_count, or quote_count for engagement filtering instead.`,
    params: [
      { name: 'end_time', type: 'string', required: false, description: `ISO 8601 end time` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (10-100)`,
      },
      {
        name: 'media_fields',
        type: 'string',
        required: false,
        description: `Comma-separated media fields`,
      },
      { name: 'next_token', type: 'string', required: false, description: `Next page token` },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query using X search syntax, e.g. from:username -is:retweet`,
      },
      { name: 'since_id', type: 'string', required: false, description: `Minimum tweet ID` },
      { name: 'start_time', type: 'string', required: false, description: `ISO 8601 start time` },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      { name: 'until_id', type: 'string', required: false, description: `Maximum tweet ID` },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_recent_tweet_counts',
    description: `Retrieves the count of Tweets matching a specified search query within the last 7 days, aggregated by 'minute', 'hour', or 'day'.`,
    params: [
      { name: 'end_time', type: 'string', required: false, description: `ISO 8601 end time` },
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Aggregation granularity`,
      },
      { name: 'query', type: 'string', required: true, description: `Search query` },
      { name: 'since_id', type: 'string', required: false, description: `Minimum tweet ID` },
      { name: 'start_time', type: 'string', required: false, description: `ISO 8601 start time` },
      { name: 'until_id', type: 'string', required: false, description: `Maximum tweet ID` },
    ],
  },
  {
    name: 'twitter_reply_visibility_set',
    description: `Hides or unhides an existing reply Tweet. Allows the authenticated user to hide or unhide a reply to a conversation they own. You can only hide replies to posts you authored. Requires tweet.moderate.write OAuth scope.`,
    params: [
      {
        name: 'hidden',
        type: 'boolean',
        required: true,
        description: `true to hide, false to unhide`,
      },
      {
        name: 'tweet_id',
        type: 'string',
        required: true,
        description: `ID of the reply tweet to hide or unhide`,
      },
    ],
  },
  {
    name: 'twitter_space_get',
    description: `Retrieves details for a Twitter Space by its ID, allowing for customization and expansion of related data.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter Space ID` },
      {
        name: 'space_fields',
        type: 'string',
        required: false,
        description: `Comma-separated space fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_space_posts_get',
    description: `Retrieves Tweets that were shared/posted during a Twitter Space broadcast. Returns Tweets that participants explicitly shared during the Space session, NOT audio transcripts. Most Spaces have zero associated Tweets — empty results are normal.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter Space ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitter_space_ticket_buyers_get',
    description: `Retrieves a list of users who purchased tickets for a specific, valid, and ticketed Twitter Space.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter Space ID` },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_spaces_by_creator_get',
    description: `Retrieves Twitter Spaces created by a list of specified User IDs, with options to customize returned data fields.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'space_fields',
        type: 'string',
        required: false,
        description: `Comma-separated space fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
      {
        name: 'user_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of user IDs to get spaces for`,
      },
    ],
  },
  {
    name: 'twitter_spaces_get',
    description: `Fetches detailed information for one or more Twitter Spaces (live, scheduled, or ended) by their unique IDs. At least one Space ID must be provided.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Space IDs`,
      },
      {
        name: 'space_fields',
        type: 'string',
        required: false,
        description: `Comma-separated space fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_spaces_search',
    description: `Searches for Twitter Spaces by a textual query. Optionally filter by state (live, scheduled, all) to discover audio conversations.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Text to search for in Space titles`,
      },
      {
        name: 'space_fields',
        type: 'string',
        required: false,
        description: `Comma-separated space fields`,
      },
      { name: 'state', type: 'string', required: false, description: `Filter by space state` },
    ],
  },
  {
    name: 'twitter_tweet_label_stream',
    description: `Stream real-time Tweet label events (apply/remove). Requires Enterprise access and App-Only OAuth 2.0 auth. Returns PublicTweetNotice or PublicTweetUnviewable events. 403 errors indicate missing Enterprise access or wrong auth type.`,
    params: [
      {
        name: 'backfill_minutes',
        type: 'integer',
        required: false,
        description: `Minutes of backfill to stream on reconnect (0-5)`,
      },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitter_tweet_usage_get',
    description: `Fetches Tweet usage statistics for a Project (e.g., consumption, caps, daily breakdowns for Project and Client Apps) to monitor API limits. Data can be retrieved for 1 to 90 days.`,
    params: [
      {
        name: 'days',
        type: 'integer',
        required: false,
        description: `Number of days to retrieve usage data for, default 7`,
      },
      {
        name: 'usage_fields',
        type: 'string',
        required: false,
        description: `Comma-separated usage fields to include`,
      },
    ],
  },
  {
    name: 'twitter_user_follow',
    description: `Allows an authenticated user to follow another user. Results in a pending request if the target user's tweets are protected.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'target_user_id',
        type: 'string',
        required: true,
        description: `ID of the user to follow`,
      },
    ],
  },
  {
    name: 'twitter_user_followed_lists_get',
    description: `Returns metadata (not Tweets) for lists a specific Twitter user follows. Optionally includes expanded owner details.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'list_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list fields`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_liked_tweets_get',
    description: `Retrieves Tweets liked by a specified Twitter user, provided their liked tweets are public or accessible.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (5-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_list_memberships_get',
    description: `Retrieves all Twitter Lists a specified user is a member of, including public Lists and private Lists the authenticated user is authorized to view.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'list_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list fields`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_lookup',
    description: `Retrieves detailed public information for a Twitter user by their ID. Optionally expand related data (e.g., pinned tweets) and specify particular user or tweet fields to return.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_lookup_by_username',
    description: `Fetches public profile information for a valid and existing Twitter user by their username. Optionally expands related data like pinned Tweets. Results may be limited for protected profiles not followed by the authenticated user.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `Twitter username without the @ symbol, e.g. elonmusk`,
      },
    ],
  },
  {
    name: 'twitter_user_me',
    description: `Returns profile information for the currently authenticated X user. Use this to get the authenticated user's ID before calling endpoints that require it.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields to return, e.g. created_at,description,public_metrics`,
      },
    ],
  },
  {
    name: 'twitter_user_mute',
    description: `Mutes a target user on behalf of an authenticated user, preventing the target's Tweets and Retweets from appearing in the authenticated user's home timeline without notifying the target.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'target_user_id',
        type: 'string',
        required: true,
        description: `ID of the user to mute`,
      },
    ],
  },
  {
    name: 'twitter_user_owned_lists_get',
    description: `Retrieves Lists created (owned) by a specific Twitter user, not Lists they follow or are subscribed to.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'list_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list fields`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_pinned_lists_get',
    description: `Retrieves the Lists a specific, existing Twitter user has pinned to their profile to highlight them.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'list_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_timeline_get',
    description: `Retrieves the home timeline (reverse chronological feed) for the authenticated Twitter user. Returns tweets from accounts the user follows and the user's own tweets. CRITICAL: The id parameter MUST be the authenticated user's own numeric Twitter user ID. Use twitter_user_me to get your ID first. Cannot fetch another user's home timeline.`,
    params: [
      {
        name: 'exclude',
        type: 'string',
        required: false,
        description: `Comma-separated types to exclude: retweets,replies`,
      },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's own numeric Twitter ID — must be your own ID`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_user_unfollow',
    description: `Allows the authenticated user to unfollow an existing Twitter user, which removes the follow relationship. The source user ID is automatically determined from the authenticated session.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'target_user_id',
        type: 'string',
        required: true,
        description: `ID of the user to unfollow`,
      },
    ],
  },
  {
    name: 'twitter_user_unmute',
    description: `Unmutes a target user for the authenticated user, allowing them to see Tweets and notifications from the target user again. The source_user_id is automatically populated from the authenticated user's credentials.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'target_user_id',
        type: 'string',
        required: true,
        description: `ID of the user to unmute`,
      },
    ],
  },
  {
    name: 'twitter_users_lookup',
    description: `Retrieves detailed information for specified X (formerly Twitter) user IDs. Optionally customize returned fields and expand related entities like pinned tweets.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Twitter user IDs (up to 100)`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitter_users_lookup_by_username',
    description: `Retrieves detailed information for 1 to 100 Twitter users by their usernames (each 1-15 alphanumeric characters/underscores). Allows customizable user/tweet fields and expansion of related data like pinned tweets.`,
    params: [
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
      {
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
      {
        name: 'usernames',
        type: 'string',
        required: true,
        description: `Comma-separated list of Twitter usernames without @ symbols (up to 100)`,
      },
    ],
  },
]
