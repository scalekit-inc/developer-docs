import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'youtube_analytics_group_create',
    description: `Create a YouTube Analytics group to organize videos, playlists, channels, or assets for collective analytics reporting.`,
    params: [
      {
        name: 'item_type',
        type: 'string',
        required: true,
        description: `Type of items the group will contain`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the analytics group`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID. For content partners only.`,
      },
    ],
  },
  {
    name: 'youtube_analytics_group_item_insert',
    description: `Add a video, playlist, or channel to a YouTube Analytics group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the Analytics group to add the item to`,
      },
      {
        name: 'resource_id',
        type: 'string',
        required: true,
        description: `ID of the resource (video ID, channel ID, or playlist ID)`,
      },
      {
        name: 'resource_kind',
        type: 'string',
        required: true,
        description: `Type of the resource`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID. For content partners only.`,
      },
    ],
  },
  {
    name: 'youtube_analytics_group_items_delete',
    description: `Remove an item (video, channel, or playlist) from a YouTube Analytics group.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the group item to remove` },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
    ],
  },
  {
    name: 'youtube_analytics_group_items_list',
    description: `Retrieve a list of items (videos, playlists, channels, or assets) that belong to a YouTube Analytics group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group whose items to retrieve`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
    ],
  },
  {
    name: 'youtube_analytics_groups_delete',
    description: `Delete a YouTube Analytics group. This removes the group but does not delete the videos, channels, or playlists within it.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the Analytics group to delete`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
    ],
  },
  {
    name: 'youtube_analytics_groups_list',
    description: `Retrieve a list of YouTube Analytics groups for a channel or content owner. Specify either id or mine to filter results.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of group IDs to retrieve`,
      },
      {
        name: 'mine',
        type: 'boolean',
        required: false,
        description: `If true, return only groups owned by the authenticated user. Required if id is not set.`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'youtube_analytics_groups_update',
    description: `Update the title of an existing YouTube Analytics group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the Analytics group to update`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `New title for the Analytics group`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID. For content partners only.`,
      },
    ],
  },
  {
    name: 'youtube_analytics_query',
    description: `Query YouTube Analytics data to retrieve metrics like views, watch time, subscribers, revenue, etc. for channels or content owners.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date for the analytics report in YYYY-MM-DD format`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Channel or content owner ID. Format: channel==CHANNEL_ID or contentOwner==CONTENT_OWNER_ID`,
      },
      {
        name: 'metrics',
        type: 'string',
        required: true,
        description: `Comma-separated list of metrics to retrieve (e.g., views,estimatedMinutesWatched,likes,subscribersGained)`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date for the analytics report in YYYY-MM-DD format`,
      },
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `Currency for monetary metrics (ISO 4217 code, e.g., USD)`,
      },
      {
        name: 'dimensions',
        type: 'string',
        required: false,
        description: `Comma-separated list of dimensions to group results by (e.g., day,country,video)`,
      },
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results (e.g., country==US, video==VIDEO_ID)`,
      },
      {
        name: 'include_historical_channel_data',
        type: 'boolean',
        required: false,
        description: `Include historical channel data recorded before the channel was linked to a content owner`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return in the response (maximum value: 200)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Comma-separated list of columns to sort by. Prefix with - for descending order (e.g., -views)`,
      },
      {
        name: 'start_index',
        type: 'integer',
        required: false,
        description: `1-based index of the first row to return (for pagination)`,
      },
    ],
  },
  {
    name: 'youtube_captions_list',
    description: `Retrieve a list of caption tracks for a YouTube video. The part parameter is fixed to 'snippet'. Requires youtube.force-ssl scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `ID of the video to list captions for`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of caption track IDs to filter results`,
      },
    ],
  },
  {
    name: 'youtube_channels_list',
    description: `Retrieve information about one or more YouTube channels including subscriber count, video count, and channel metadata. You must provide exactly one filter: id, mine, for_handle, for_username, or managed_by_me. Requires a valid YouTube OAuth2 connection.`,
    params: [
      {
        name: 'part',
        type: 'string',
        required: true,
        description: `Comma-separated list of channel resource parts to include in the response`,
      },
      {
        name: 'for_handle',
        type: 'string',
        required: false,
        description: `YouTube channel handle to look up (e.g., @MrBeast). Use instead of id, mine, or for_username.`,
      },
      {
        name: 'for_username',
        type: 'string',
        required: false,
        description: `YouTube username of the channel to look up (legacy). Use instead of id, mine, or for_handle.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of YouTube channel IDs. Use instead of mine, for_handle, or for_username.`,
      },
      {
        name: 'managed_by_me',
        type: 'boolean',
        required: false,
        description: `Return channels managed by the authenticated user (content partners only). Use instead of id, mine, for_handle, or for_username.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (0-50, default: 5)`,
      },
      {
        name: 'mine',
        type: 'boolean',
        required: false,
        description: `Return the authenticated user's channel. Use instead of id, for_handle, or for_username.`,
      },
      { name: 'page_token', type: 'string', required: false, description: `Token for pagination` },
    ],
  },
  {
    name: 'youtube_comment_threads_insert',
    description: `Post a new top-level comment on a YouTube video. Requires youtube.force-ssl scope.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `Text of the comment` },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `ID of the video to comment on`,
      },
    ],
  },
  {
    name: 'youtube_comment_threads_list',
    description: `Retrieve top-level comment threads for a YouTube video or channel. You must provide exactly one filter: video_id, all_threads_related_to_channel_id, or id. Each thread includes the top-level comment and optionally its replies. Requires a valid YouTube OAuth2 connection.`,
    params: [
      {
        name: 'part',
        type: 'string',
        required: true,
        description: `Comma-separated list of comment thread resource parts to include`,
      },
      {
        name: 'all_threads_related_to_channel_id',
        type: 'string',
        required: false,
        description: `Return all comment threads associated with a specific channel. Use instead of video_id or id.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of comment thread IDs to retrieve. Use instead of video_id or all_threads_related_to_channel_id.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of comment threads to return (1-100, default: 20)`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order for comment threads`,
      },
      { name: 'page_token', type: 'string', required: false, description: `Token for pagination` },
      {
        name: 'search_terms',
        type: 'string',
        required: false,
        description: `Limit results to comments containing these search terms`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: false,
        description: `YouTube video ID to fetch comment threads for. Use instead of all_threads_related_to_channel_id or id.`,
      },
    ],
  },
  {
    name: 'youtube_comments_list',
    description: `Retrieve a list of replies to a specific YouTube comment thread. You must provide exactly one filter: parent_id or id. The part parameter is fixed to 'snippet'. Requires youtube.readonly scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of comment IDs to retrieve. Use instead of parent_id.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of replies to return (1-100, default: 20). Cannot be used with id filter.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for pagination to retrieve the next page of replies. Cannot be used with id filter.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of the comment thread (top-level comment) to list replies for. Use instead of id.`,
      },
      {
        name: 'text_format',
        type: 'string',
        required: false,
        description: `Format of the comment text in the response`,
      },
    ],
  },
  {
    name: 'youtube_playlist_delete',
    description: `Permanently delete a YouTube playlist. This action cannot be undone. Requires youtube scope.`,
    params: [
      {
        name: 'playlist_id',
        type: 'string',
        required: true,
        description: `ID of the playlist to delete`,
      },
    ],
  },
  {
    name: 'youtube_playlist_insert',
    description: `Create a new YouTube playlist for the authenticated user. Requires youtube scope.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Playlist title` },
      {
        name: 'default_language',
        type: 'string',
        required: false,
        description: `Default language of the playlist`,
      },
      { name: 'description', type: 'string', required: false, description: `Playlist description` },
      { name: 'privacy_status', type: 'string', required: false, description: `Privacy setting` },
      { name: 'tags', type: 'array', required: false, description: `Tags for the playlist` },
    ],
  },
  {
    name: 'youtube_playlist_items_delete',
    description: `Remove a video from a YouTube playlist by its playlist item ID. Requires youtube scope.`,
    params: [
      {
        name: 'playlist_item_id',
        type: 'string',
        required: true,
        description: `ID of the playlist item to remove (not the video ID)`,
      },
    ],
  },
  {
    name: 'youtube_playlist_items_insert',
    description: `Add a video to a YouTube playlist at an optional position. Requires youtube scope.`,
    params: [
      {
        name: 'playlist_id',
        type: 'string',
        required: true,
        description: `Playlist to add the video to`,
      },
      { name: 'video_id', type: 'string', required: true, description: `YouTube video ID to add` },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `Optional note for this playlist item`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Zero-based position in the playlist. Omit to add at end.`,
      },
    ],
  },
  {
    name: 'youtube_playlist_items_list',
    description: `Retrieve a list of videos in a YouTube playlist. Returns playlist items with video details, positions, and metadata. Requires a valid YouTube OAuth2 connection.`,
    params: [
      {
        name: 'part',
        type: 'string',
        required: true,
        description: `Comma-separated list of playlist item resource parts to include`,
      },
      {
        name: 'playlist_id',
        type: 'string',
        required: true,
        description: `YouTube playlist ID to retrieve items from`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of playlist items to return (0-50, default: 5)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for pagination to retrieve the next page`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: false,
        description: `Filter results to items containing a specific video`,
      },
    ],
  },
  {
    name: 'youtube_playlist_update',
    description: `Update an existing YouTube playlist's title, description, privacy status, or default language. Requires youtube scope.`,
    params: [
      {
        name: 'playlist_id',
        type: 'string',
        required: true,
        description: `ID of the playlist to update`,
      },
      {
        name: 'default_language',
        type: 'string',
        required: false,
        description: `Language of the playlist`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New playlist description`,
      },
      {
        name: 'privacy_status',
        type: 'string',
        required: false,
        description: `New privacy setting`,
      },
      { name: 'title', type: 'string', required: false, description: `New playlist title` },
    ],
  },
  {
    name: 'youtube_playlists_list',
    description: `Retrieve a list of YouTube playlists for a channel or the authenticated user. You must provide exactly one filter: channel_id, id, or mine. Requires a valid YouTube OAuth2 connection.`,
    params: [
      {
        name: 'part',
        type: 'string',
        required: true,
        description: `Comma-separated list of playlist resource parts to include`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Return playlists for a specific channel. Use instead of id or mine.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of playlist IDs to retrieve. Use instead of channel_id or mine.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of playlists to return (0-50, default: 5)`,
      },
      {
        name: 'mine',
        type: 'boolean',
        required: false,
        description: `Return playlists owned by the authenticated user. Use instead of channel_id or id.`,
      },
      { name: 'page_token', type: 'string', required: false, description: `Token for pagination` },
    ],
  },
  {
    name: 'youtube_reporting_create_job',
    description: `Create a YouTube reporting job to schedule daily generation of a specific report type. Once created, YouTube will generate the report daily.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Human-readable name for the reporting job`,
      },
      {
        name: 'report_type_id',
        type: 'string',
        required: true,
        description: `ID of the report type to generate (e.g., channel_basic_a2, channel_demographics_a1)`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the job is being created`,
      },
    ],
  },
  {
    name: 'youtube_reporting_jobs_delete',
    description: `Delete a scheduled YouTube Reporting API job. Stopping a job means new reports will no longer be generated.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `ID of the reporting job to delete`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
    ],
  },
  {
    name: 'youtube_reporting_list_jobs',
    description: `List all YouTube Reporting API jobs scheduled for a channel or content owner.`,
    params: [
      {
        name: 'include_system_managed',
        type: 'boolean',
        required: false,
        description: `If true, include system-managed reporting jobs in the response`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of jobs to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'youtube_reporting_list_report_types',
    description: `List all YouTube Reporting API report types available for a channel or content owner (e.g., channel_basic_a2, channel_demographics_a1).`,
    params: [
      {
        name: 'include_system_managed',
        type: 'boolean',
        required: false,
        description: `If true, include system-managed report types in the response`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of report types to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'youtube_reporting_list_reports',
    description: `List reports that have been generated for a YouTube reporting job. Each report is a downloadable CSV file.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `ID of the reporting job whose reports to list`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Only return reports created after this timestamp (RFC3339 format, e.g., 2024-01-01T00:00:00Z)`,
      },
      {
        name: 'on_behalf_of_content_owner',
        type: 'string',
        required: false,
        description: `Content owner ID on whose behalf the request is being made`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of reports to return per page`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
      {
        name: 'start_time_at_or_after',
        type: 'string',
        required: false,
        description: `Only return reports whose data start time is at or after this timestamp (RFC3339 format)`,
      },
      {
        name: 'start_time_before',
        type: 'string',
        required: false,
        description: `Only return reports whose data start time is before this timestamp (RFC3339 format)`,
      },
    ],
  },
  {
    name: 'youtube_search',
    description: `Search for videos, channels, and playlists on YouTube. Returns a list of resources matching the search query. The part parameter is fixed to 'snippet'. Requires a valid YouTube OAuth2 connection.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Restrict search results to a specific channel`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (0-50, default: 10)`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order for search results`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for pagination to retrieve the next page of results`,
      },
      {
        name: 'published_after',
        type: 'string',
        required: false,
        description: `Filter results to resources published after this date (RFC 3339 format)`,
      },
      {
        name: 'published_before',
        type: 'string',
        required: false,
        description: `Filter results to resources published before this date (RFC 3339 format)`,
      },
      { name: 'q', type: 'string', required: false, description: `Search query keywords` },
      {
        name: 'safe_search',
        type: 'string',
        required: false,
        description: `Safe search filter level`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Restrict results to a specific resource type`,
      },
      {
        name: 'video_duration',
        type: 'string',
        required: false,
        description: `Filter videos by duration (only applies when type is 'video')`,
      },
    ],
  },
  {
    name: 'youtube_subscriptions_delete',
    description: `Unsubscribe the authenticated user from a YouTube channel using the subscription ID. Requires youtube scope.`,
    params: [
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `ID of the subscription to delete`,
      },
    ],
  },
  {
    name: 'youtube_subscriptions_insert',
    description: `Subscribe the authenticated user to a YouTube channel. Requires youtube scope.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `ID of the YouTube channel to subscribe to`,
      },
    ],
  },
  {
    name: 'youtube_subscriptions_list',
    description: `Retrieve a list of YouTube channel subscriptions for the authenticated user or a specific channel. You must provide exactly one filter: channel_id, id, mine, my_recent_subscribers, or my_subscribers. Requires a valid YouTube OAuth2 connection with youtube.readonly scope.`,
    params: [
      {
        name: 'part',
        type: 'string',
        required: true,
        description: `Comma-separated list of subscription resource parts to include`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Return subscriptions for a specific channel. Use instead of id, mine, my_recent_subscribers, or my_subscribers.`,
      },
      {
        name: 'for_channel_id',
        type: 'string',
        required: false,
        description: `Filter subscriptions to specific channels (comma-separated channel IDs)`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of subscription IDs to retrieve. Use instead of channel_id, mine, my_recent_subscribers, or my_subscribers.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of subscriptions to return (0-50, default: 5)`,
      },
      {
        name: 'mine',
        type: 'boolean',
        required: false,
        description: `Return subscriptions for the authenticated user. Use instead of channel_id, id, my_recent_subscribers, or my_subscribers.`,
      },
      {
        name: 'my_recent_subscribers',
        type: 'boolean',
        required: false,
        description: `Return the authenticated user's recent subscribers. Use instead of channel_id, id, mine, or my_subscribers.`,
      },
      {
        name: 'my_subscribers',
        type: 'boolean',
        required: false,
        description: `Return the authenticated user's subscribers. Use instead of channel_id, id, mine, or my_recent_subscribers.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order for subscriptions`,
      },
      { name: 'page_token', type: 'string', required: false, description: `Token for pagination` },
    ],
  },
  {
    name: 'youtube_video_categories_list',
    description: `Retrieve a list of YouTube video categories available in a given region or by ID. You must provide exactly one filter: id or region_code. The part parameter is fixed to 'snippet'. Useful for setting the category when updating a video. Requires youtube.readonly scope.`,
    params: [
      {
        name: 'hl',
        type: 'string',
        required: false,
        description: `Language for the category names in the response (BCP-47)`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of category IDs to retrieve. Use instead of region_code.`,
      },
      {
        name: 'region_code',
        type: 'string',
        required: false,
        description: `ISO 3166-1 alpha-2 country code to retrieve categories available in that region. Use instead of id.`,
      },
    ],
  },
  {
    name: 'youtube_videos_delete',
    description: `Permanently delete a YouTube video. This action cannot be undone. Requires youtube scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `ID of the video to delete`,
      },
    ],
  },
  {
    name: 'youtube_videos_get_rating',
    description: `Retrieve the authenticated user's rating (like, dislike, or none) for one or more YouTube videos. The part parameter is fixed to 'id'. Requires youtube.readonly scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Comma-separated list of YouTube video IDs to get ratings for`,
      },
    ],
  },
  {
    name: 'youtube_videos_list',
    description: `Retrieve detailed information about one or more YouTube videos including statistics, snippet, content details, and status. You must provide exactly one filter: id, chart, or my_rating. Requires a valid YouTube OAuth2 connection.`,
    params: [
      {
        name: 'part',
        type: 'string',
        required: true,
        description: `Comma-separated list of video resource parts to include in the response`,
      },
      {
        name: 'chart',
        type: 'string',
        required: false,
        description: `Retrieve a chart of the most popular videos. Use instead of id or my_rating.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of YouTube video IDs. Use instead of chart or my_rating.`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return when using chart filter (1-50, default: 5)`,
      },
      {
        name: 'my_rating',
        type: 'string',
        required: false,
        description: `Filter videos by the authenticated user's rating. Use instead of id or chart.`,
      },
      { name: 'page_token', type: 'string', required: false, description: `Token for pagination` },
      {
        name: 'region_code',
        type: 'string',
        required: false,
        description: `ISO 3166-1 alpha-2 country code to filter trending videos by region`,
      },
      {
        name: 'video_category_id',
        type: 'string',
        required: false,
        description: `Filter most popular videos by category ID`,
      },
    ],
  },
  {
    name: 'youtube_videos_rate',
    description: `Like, dislike, or remove a rating from a YouTube video on behalf of the authenticated user. Requires youtube scope with youtube.force-ssl.`,
    params: [
      {
        name: 'rating',
        type: 'string',
        required: true,
        description: `Rating to apply to the video`,
      },
      { name: 'video_id', type: 'string', required: true, description: `YouTube video ID to rate` },
    ],
  },
  {
    name: 'youtube_videos_update',
    description: `Update metadata for an existing YouTube video. When updating snippet, both title and category_id are required together. Requires youtube scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `ID of the video to update`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `YouTube video category ID. Required together with title when updating snippet.`,
      },
      {
        name: 'default_language',
        type: 'string',
        required: false,
        description: `Language of the video`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New video description`,
      },
      {
        name: 'embeddable',
        type: 'boolean',
        required: false,
        description: `Whether the video can be embedded`,
      },
      { name: 'license', type: 'string', required: false, description: `Video license` },
      {
        name: 'privacy_status',
        type: 'string',
        required: false,
        description: `New privacy setting`,
      },
      {
        name: 'public_stats_viewable',
        type: 'boolean',
        required: false,
        description: `Whether stats are publicly visible`,
      },
      { name: 'tags', type: 'array', required: false, description: `Video tags` },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New video title. Required together with category_id when updating snippet.`,
      },
    ],
  },
]
