import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'twitteroauth_activity_subscription_create',
    description: `Creates a subscription for a single X activity event type, scoped to exactly one of a user (filter_user_id) or a keyword (filter_keyword) - Twitter rejects requests providing neither or both - delivered to a registered webhook. OAuth2 user-context tokens must hold the scope matching the requested event_type: dm.read for chat.* and dm.* events, like.read for like.* events, mute.read for mute.* events, block.read for block.* events, and tweet.read for all other event types. Mute and block subscriptions are actor-only.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `Activity event type in dot notation`,
      },
      {
        name: 'filter_direction',
        type: 'string',
        required: false,
        description: `Optional direction filter for directional events. Not supported for mute.* or block.* events.`,
      },
      {
        name: 'filter_keyword',
        type: 'string',
        required: false,
        description: `Optional keyword filter`,
      },
      {
        name: 'filter_user_id',
        type: 'string',
        required: false,
        description: `User the subscription is scoped to. For mute.* and block.* events, this must be the authenticated source user.`,
      },
      { name: 'tag', type: 'string', required: false, description: `Optional caller-defined tag` },
      {
        name: 'webhook_id',
        type: 'string',
        required: false,
        description: `Webhook to deliver the subscription events to`,
      },
    ],
  },
  {
    name: 'twitteroauth_activity_subscriptions_list',
    description: `List existing X activity subscriptions for the authenticated app. Complements Create Activity Subscription, which only covers creating new subscriptions on this same resource.`,
    params: [],
  },
  {
    name: 'twitteroauth_article_draft_create',
    description: `Creates a draft X Article (long-form post) with a title and rich-text content, which can later be published with Publish Article. Requires an X Premium subscription on the posting account.`,
    params: [
      {
        name: 'content_state',
        type: 'object',
        required: true,
        description: `DraftJS content structure for the Article body: an object with a 'blocks' array (text blocks with text/type) and an 'entities' array (formatting entities such as links or embeds).`,
      },
      { name: 'title', type: 'string', required: true, description: `Headline of the Article` },
      {
        name: 'cover_media_id',
        type: 'string',
        required: false,
        description: `Media ID to use as the Article's cover image, from a prior media upload`,
      },
    ],
  },
  {
    name: 'twitteroauth_article_publish',
    description: `Publishes a previously created draft X Article, making it publicly visible as a Post. Use Create Article Draft first to get an article_id.`,
    params: [
      {
        name: 'article_id',
        type: 'string',
        required: true,
        description: `ID of the draft Article to publish`,
      },
    ],
  },
  {
    name: 'twitteroauth_blocked_users_get',
    description: `Retrieves the authenticated user's block list. The id parameter must be the authenticated user's ID. Use Get Authenticated User action first to obtain your user ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID — must match the authenticated user`,
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
    name: 'twitteroauth_bookmark_add',
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
    name: 'twitteroauth_bookmark_remove',
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
    name: 'twitteroauth_bookmarks_get',
    description: `Retrieves Tweets bookmarked by the authenticated user. The provided User ID must match the authenticated user's ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
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
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_communities_search',
    description: `Searches for X Communities by keyword, matching against community name and description.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search term to match against Community name/description (1-4096 characters)`,
      },
      {
        name: 'community_fields',
        type: 'string',
        required: false,
        description: `Comma-separated Community fields to include, e.g. access,created_at,description,member_count,name`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Results per page (10-100, default 10)`,
      },
      {
        name: 'next_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous response`,
      },
    ],
  },
  {
    name: 'twitteroauth_community_get',
    description: `Get details of an X Community by its ID: name, description, access type, join policy, and member count.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Community ID to look up` },
      {
        name: 'community_fields',
        type: 'string',
        required: false,
        description: `Comma-separated Community fields to include, e.g. access,created_at,description,member_count,name`,
      },
    ],
  },
  {
    name: 'twitteroauth_dm_block',
    description: `Blocks the specified user from sending Direct Messages to the authenticated user, without fully blocking the account.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `User ID whose Direct Messages should be blocked`,
      },
    ],
  },
  {
    name: 'twitteroauth_dm_conversation_events_get',
    description: `Fetches Direct Message (DM) events for a one-on-one conversation with a specified participant ID, ordered chronologically newest to oldest. Does not support group DMs.`,
    params: [
      {
        name: 'participant_id',
        type: 'string',
        required: true,
        description: `User ID of the DM conversation participant`,
      },
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
    name: 'twitteroauth_dm_conversation_retrieve',
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
    name: 'twitteroauth_dm_conversation_send',
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
    name: 'twitteroauth_dm_delete',
    description: `Permanently deletes a specific Twitter Direct Message (DM) event using its event_id, if the authenticated user sent it. This action is irreversible and does not delete entire conversations.`,
    params: [
      {
        name: 'event_id',
        type: 'string',
        required: true,
        description: `ID of the DM event to delete`,
      },
    ],
  },
  {
    name: 'twitteroauth_dm_event_get',
    description: `Fetches a specific Direct Message (DM) event by its unique ID. Allows optional expansion of related data like users or tweets.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `DM event ID` },
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
    ],
  },
  {
    name: 'twitteroauth_dm_events_get',
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
    name: 'twitteroauth_dm_group_conversation_create',
    description: `Creates a new group Direct Message (DM) conversation on Twitter. The conversation_type must be 'Group'. Include participant_ids and an initial message with text and optional media attachments using media_id (not media_url). Media must be uploaded first.`,
    params: [
      { name: 'message_text', type: 'string', required: true, description: `Initial message text` },
      {
        name: 'participant_ids',
        type: 'array',
        required: true,
        description: `List of Twitter user IDs to include`,
      },
      {
        name: 'message_media_ids',
        type: 'array',
        required: false,
        description: `Media IDs to attach to initial message`,
      },
    ],
  },
  {
    name: 'twitteroauth_dm_send',
    description: `Sends a new Direct Message with text and/or media (media_id for attachments must be pre-uploaded) to a specified Twitter user. Creates a new DM and does not modify existing messages.`,
    params: [
      {
        name: 'participant_id',
        type: 'string',
        required: true,
        description: `Twitter user ID of the DM recipient`,
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
    name: 'twitteroauth_dm_unblock',
    description: `Removes a Direct Message block on the specified user, allowing them to send Direct Messages to the authenticated user again.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `User ID whose Direct Messages should be unblocked`,
      },
    ],
  },
  {
    name: 'twitteroauth_followers_get',
    description: `Retrieves a list of users who follow a specified public Twitter user ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Twitter user ID to get followers for`,
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
    name: 'twitteroauth_following_get',
    description: `Retrieves users followed by a specific Twitter user, allowing pagination and customization of returned user and tweet data fields via expansions.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
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
    name: 'twitteroauth_list_create',
    description: `Creates a new, empty List on X (formerly Twitter). The provided name must be unique for the authenticated user. Accounts are added separately.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Unique name for the new list` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the list`,
      },
      {
        name: 'private',
        type: 'boolean',
        required: false,
        description: `Whether the list should be private`,
      },
    ],
  },
  {
    name: 'twitteroauth_list_delete',
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
    name: 'twitteroauth_list_follow',
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
    name: 'twitteroauth_list_followers_get',
    description: `Fetches a list of users who follow a specific Twitter List, identified by its ID. Ensure the authenticated user has access if the list is private.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
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
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_list_lookup',
    description: `Returns metadata for a specific Twitter List, identified by its ID. Does not return list members. Can expand the owner's User object via the expansions parameter.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
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
    name: 'twitteroauth_list_member_add',
    description: `Adds a user to a specified Twitter List. The list must be owned by the authenticated user.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID of the Twitter List` },
      { name: 'user_id', type: 'string', required: true, description: `ID of the user to add` },
    ],
  },
  {
    name: 'twitteroauth_list_member_remove',
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
    name: 'twitteroauth_list_members_get',
    description: `Fetches members of a specific Twitter List, identified by its unique ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
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
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_list_pin',
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
    name: 'twitteroauth_list_timeline_get',
    description: `Fetches the most recent Tweets posted by members of a specified Twitter List.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter List ID` },
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
    name: 'twitteroauth_list_unfollow',
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
    name: 'twitteroauth_list_unpin',
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
    name: 'twitteroauth_list_update',
    description: `Updates an existing Twitter List's name, description, or privacy status. Requires the List ID and at least one mutable property.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter List ID to update` },
      { name: 'description', type: 'string', required: false, description: `New description` },
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
    name: 'twitteroauth_media_analytics_get',
    description: `Retrieves organic engagement analytics for one or more pieces of media owned by the authenticated user over a time window.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: true,
        description: `ISO 8601 end time for the analytics window`,
      },
      {
        name: 'media_keys',
        type: 'string',
        required: true,
        description: `Comma-separated list of media keys (up to 100)`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: true,
        description: `ISO 8601 start time for the analytics window`,
      },
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Aggregation granularity: hourly, daily, or total`,
      },
      {
        name: 'media_analytics_fields',
        type: 'string',
        required: false,
        description: `Comma-separated media analytics fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_batch_lookup',
    description: `Retrieves details for one or more pieces of media identified by their media keys.`,
    params: [
      {
        name: 'media_keys',
        type: 'string',
        required: true,
        description: `Comma-separated list of media keys (up to 100)`,
      },
      {
        name: 'media_fields',
        type: 'string',
        required: false,
        description: `Comma-separated media fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_lookup',
    description: `Retrieves details for a single piece of media by its media key.`,
    params: [
      { name: 'media_key', type: 'string', required: true, description: `Media key to look up` },
      {
        name: 'media_fields',
        type: 'string',
        required: false,
        description: `Comma-separated media fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_metadata_create',
    description: `Sets metadata, such as accessibility alt text, on a previously uploaded piece of media before it is attached to a Post.`,
    params: [
      {
        name: 'alt_text',
        type: 'string',
        required: true,
        description: `Accessibility alt text describing the media (up to 1000 characters)`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: true,
        description: `The media ID the metadata is attached to`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_subtitles_create',
    description: `Associates a subtitle (closed caption) track with a previously uploaded video.`,
    params: [
      {
        name: 'language_code',
        type: 'string',
        required: true,
        description: `BCP47 language code of the subtitle track`,
      },
      {
        name: 'media_category',
        type: 'string',
        required: true,
        description: `Media category of the target media: AmplifyVideo or TweetVideo`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: true,
        description: `The media ID of the video the subtitles belong to`,
      },
      {
        name: 'subtitle_media_id',
        type: 'string',
        required: true,
        description: `The media ID of the previously uploaded subtitle (.srt/.vtt) file`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `Language name of the subtitle track in a human readable form`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_subtitles_delete',
    description: `Removes a subtitle (closed caption) track of a specific language from a video.`,
    params: [
      {
        name: 'language_code',
        type: 'string',
        required: true,
        description: `The language code of the subtitles to delete`,
      },
      {
        name: 'media_category',
        type: 'string',
        required: true,
        description: `Media category of the target media: AmplifyVideo or TweetVideo`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: true,
        description: `The media ID of the video the subtitles belong to`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_upload',
    description: `Uploads media (images only) to X/Twitter using the v2 API. Only supports images (tweet_image, dm_image) and subtitle files. For GIFs, videos, or any file larger than ~5 MB, use twitter_media_upload_large instead.`,
    params: [
      { name: 'media', type: 'string', required: true, description: `Base64-encoded image data` },
      {
        name: 'media_type',
        type: 'string',
        required: true,
        description: `MIME type, e.g. image/jpeg or image/png`,
      },
      {
        name: 'media_category',
        type: 'string',
        required: false,
        description: `Media category for use context`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_upload_append',
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
    name: 'twitteroauth_media_upload_base64',
    description: `Uploads media to X/Twitter using base64-encoded data. Use when you have media content as a base64 string. Only supports images and subtitle files. For videos or GIFs, use twitter_media_upload_large.`,
    params: [
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
      {
        name: 'media_category',
        type: 'string',
        required: false,
        description: `Media category for use context`,
      },
    ],
  },
  {
    name: 'twitteroauth_media_upload_init',
    description: `Initializes a media upload session for X/Twitter. Returns a media_id for subsequent APPEND and FINALIZE commands. Required for uploading large files or when using the chunked upload workflow.`,
    params: [
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
    ],
  },
  {
    name: 'twitteroauth_media_upload_large',
    description: `Uploads media files to X/Twitter. Automatically uses chunked upload for GIFs, videos, and images larger than 5 MB. Use for videos, GIFs, or any file larger than 5 MB.`,
    params: [
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
    ],
  },
  {
    name: 'twitteroauth_media_upload_status_get',
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
    name: 'twitteroauth_muted_users_get',
    description: `Returns user objects muted by the X user identified by the id path parameter.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
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
    name: 'twitteroauth_post_analytics_get',
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
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Time granularity of the returned analytics data`,
      },
    ],
  },
  {
    name: 'twitteroauth_post_create',
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
    name: 'twitteroauth_post_delete',
    description: `Irreversibly deletes a specific Tweet by its ID. The Tweet may persist in third-party caches after deletion.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the Tweet to delete` },
    ],
  },
  {
    name: 'twitteroauth_post_like',
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
    name: 'twitteroauth_post_likers_get',
    description: `Retrieves users who have liked the Post (Tweet) identified by the provided ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
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
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_post_lookup',
    description: `Fetches comprehensive details for a single Tweet by its unique ID, provided the Tweet exists and is accessible.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
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
    name: 'twitteroauth_post_quotes_get',
    description: `Retrieves Tweets that quote a specified Tweet. Requires a valid Tweet ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
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
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_post_retweet',
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
    name: 'twitteroauth_post_retweeters_get',
    description: `Retrieves users who publicly retweeted a specified public Post ID, excluding Quote Tweets and retweets from private accounts.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
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
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_post_retweets_get',
    description: `Retrieves Tweets that Retweeted a specified public or authenticated-user-accessible Tweet ID. Optionally customize the response with fields and expansions.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Tweet ID` },
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
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_post_unlike',
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
    name: 'twitteroauth_post_unretweet',
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
    name: 'twitteroauth_posts_lookup',
    description: `Retrieves detailed information for one or more Posts (Tweets) identified by their unique IDs. Allows selection of specific fields and expansions.`,
    params: [
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Tweet IDs (up to 100)`,
      },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
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
    name: 'twitteroauth_recent_search',
    description: `Searches Tweets from the last 7 days matching a query using X's search syntax. Ideal for real-time analysis, trend monitoring, or retrieving posts from specific users (e.g., from:username). Note: impression_count returns 0 for other users' tweets — use retweet_count, like_count, or quote_count for engagement filtering instead.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query using X search syntax, e.g. from:username -is:retweet`,
      },
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
    name: 'twitteroauth_recent_tweet_counts',
    description: `Retrieves the count of Tweets matching a specified search query within the last 7 days, aggregated by 'minute', 'hour', or 'day'.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query` },
      { name: 'end_time', type: 'string', required: false, description: `ISO 8601 end time` },
      {
        name: 'granularity',
        type: 'string',
        required: false,
        description: `Aggregation granularity`,
      },
      { name: 'since_id', type: 'string', required: false, description: `Minimum tweet ID` },
      { name: 'start_time', type: 'string', required: false, description: `ISO 8601 start time` },
      { name: 'until_id', type: 'string', required: false, description: `Maximum tweet ID` },
    ],
  },
  {
    name: 'twitteroauth_reply_visibility_set',
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
    name: 'twitteroauth_space_get',
    description: `Retrieves details for a Twitter Space by its ID, allowing for customization and expansion of related data.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter Space ID` },
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
    ],
  },
  {
    name: 'twitteroauth_space_posts_get',
    description: `Retrieves Tweets that were shared/posted during a Twitter Space broadcast. Returns Tweets that participants explicitly shared during the Space session, NOT audio transcripts. Most Spaces have zero associated Tweets — empty results are normal.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter Space ID` },
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
        name: 'tweet_fields',
        type: 'string',
        required: false,
        description: `Comma-separated tweet fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_space_ticket_buyers_get',
    description: `Retrieves a list of users who purchased tickets for a specific, valid, and ticketed Twitter Space.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter Space ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
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
    name: 'twitteroauth_spaces_by_creator_get',
    description: `Retrieves Twitter Spaces created by a list of specified User IDs, with options to customize returned data fields.`,
    params: [
      {
        name: 'user_ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of user IDs to get spaces for`,
      },
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
    ],
  },
  {
    name: 'twitteroauth_spaces_get',
    description: `Fetches detailed information for one or more Twitter Spaces (live, scheduled, or ended) by their unique IDs. At least one Space ID must be provided.`,
    params: [
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Space IDs`,
      },
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
    ],
  },
  {
    name: 'twitteroauth_spaces_search',
    description: `Searches for Twitter Spaces by a textual query. Optionally filter by state (live, scheduled, all) to discover audio conversations.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Text to search for in Space titles`,
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
        name: 'space_fields',
        type: 'string',
        required: false,
        description: `Comma-separated space fields`,
      },
      { name: 'state', type: 'string', required: false, description: `Filter by space state` },
    ],
  },
  {
    name: 'twitteroauth_user_bookmark_folder_create',
    description: `Creates a new Bookmark folder for the authenticated user. The provided User ID must match the authenticated user's ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's Twitter ID`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the Bookmark folder (1-25 characters)`,
      },
    ],
  },
  {
    name: 'twitteroauth_user_bookmark_folders_get',
    description: `Retrieves the authenticated user's Bookmark folders. The provided User ID must match the authenticated user's ID.`,
    params: [
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
    ],
  },
  {
    name: 'twitteroauth_user_bookmarks_by_folder_get',
    description: `Retrieves the Posts bookmarked by the authenticated user within a specific Bookmark folder. The provided User ID must match the authenticated user's ID.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `Bookmark folder ID` },
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
    ],
  },
  {
    name: 'twitteroauth_user_follow',
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
    name: 'twitteroauth_user_followed_lists_get',
    description: `Returns metadata (not Tweets) for lists a specific Twitter user follows. Optionally includes expanded owner details.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
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
    name: 'twitteroauth_user_liked_tweets_get',
    description: `Retrieves Tweets liked by a specified Twitter user, provided their liked tweets are public or accessible.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
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
    name: 'twitteroauth_user_list_memberships_get',
    description: `Retrieves all Twitter Lists a specified user is a member of, including public Lists and private Lists the authenticated user is authorized to view.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
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
    name: 'twitteroauth_user_lookup',
    description: `Retrieves detailed public information for a Twitter user by their ID. Optionally expand related data (e.g., pinned tweets) and specify particular user or tweet fields to return.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
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
    ],
  },
  {
    name: 'twitteroauth_user_lookup_by_username',
    description: `Fetches public profile information for a valid and existing Twitter user by their username. Optionally expands related data like pinned Tweets. Results may be limited for protected profiles not followed by the authenticated user.`,
    params: [
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `Twitter username without the @ symbol, e.g. elonmusk`,
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
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_user_me',
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
    name: 'twitteroauth_user_mentions_get',
    description: `Retrieves Posts (Tweets) that mention the specified user, most recent first.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `User ID whose mentions should be retrieved`,
      },
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
        description: `Max results per page (5-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
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
    name: 'twitteroauth_user_mute',
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
    name: 'twitteroauth_user_owned_lists_get',
    description: `Retrieves Lists created (owned) by a specific Twitter user, not Lists they follow or are subscribed to.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
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
    name: 'twitteroauth_user_pinned_lists_get',
    description: `Retrieves the Lists a specific, existing Twitter user has pinned to their profile to highlight them.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Twitter user ID` },
      {
        name: 'expansions',
        type: 'string',
        required: false,
        description: `Comma-separated expansions`,
      },
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
    name: 'twitteroauth_user_posts_get',
    description: `Retrieves a collection of Posts (Tweets) authored by the specified user, most recent first.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `User ID whose Posts should be retrieved`,
      },
      { name: 'end_time', type: 'string', required: false, description: `ISO 8601 end time` },
      {
        name: 'exclude',
        type: 'string',
        required: false,
        description: `Comma-separated types to exclude: replies,retweets`,
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
        description: `Max results per page (5-100)`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Pagination token for next page`,
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
    name: 'twitteroauth_user_reposts_of_me_get',
    description: `Retrieves the most recent Posts that repost content from the authenticated user.`,
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
        description: `Max results per page (1-100, default 100)`,
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
    name: 'twitteroauth_user_timeline_get',
    description: `Retrieves the home timeline (reverse chronological feed) for the authenticated Twitter user. Returns tweets from accounts the user follows and the user's own tweets. CRITICAL: The id parameter MUST be the authenticated user's own numeric Twitter user ID. Use twitter_user_me to get your ID first. Cannot fetch another user's home timeline.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Authenticated user's own numeric Twitter ID — must be your own ID`,
      },
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
    name: 'twitteroauth_user_unfollow',
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
    name: 'twitteroauth_user_unmute',
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
    name: 'twitteroauth_users_lookup',
    description: `Retrieves detailed information for specified X (formerly Twitter) user IDs. Optionally customize returned fields and expand related entities like pinned tweets.`,
    params: [
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of Twitter user IDs (up to 100)`,
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
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_users_lookup_by_username',
    description: `Retrieves detailed information for 1 to 100 Twitter users by their usernames (each 1-15 alphanumeric characters/underscores). Allows customizable user/tweet fields and expansion of related data like pinned tweets.`,
    params: [
      {
        name: 'usernames',
        type: 'string',
        required: true,
        description: `Comma-separated list of Twitter usernames without @ symbols (up to 100)`,
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
      {
        name: 'user_fields',
        type: 'string',
        required: false,
        description: `Comma-separated user fields`,
      },
    ],
  },
  {
    name: 'twitteroauth_users_search',
    description: `Searches for users matching the provided query string, ranked by relevance.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query (1-50 characters) matching name, username, or bio`,
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
        description: `Max results per page (1-1000, default 100)`,
      },
      { name: 'next_token', type: 'string', required: false, description: `Next page token` },
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
]
