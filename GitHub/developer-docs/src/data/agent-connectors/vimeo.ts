import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'vimeo_categories_list',
    description: `Retrieve all top-level Vimeo content categories (e.g., Animation, Documentary, Music). Requires public scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of categories per page`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for categories` },
    ],
  },
  {
    name: 'vimeo_channel_videos_list',
    description: `Retrieve all videos in a specific Vimeo channel. Requires public scope.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `Vimeo channel ID or slug`,
      },
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'filter', type: 'string', required: false, description: `Filter videos by type` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter channel videos`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for videos` },
    ],
  },
  {
    name: 'vimeo_channels_list',
    description: `Retrieve a list of Vimeo channels. Can list all public channels or channels the authenticated user follows/manages. Requires public scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'filter', type: 'string', required: false, description: `Filter channels by type` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of channels per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter channels by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for channels` },
    ],
  },
  {
    name: 'vimeo_folder_create',
    description: `Create a new folder (project) in the authenticated user's Vimeo account for organizing private video content. Requires create scope.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new folder` },
      {
        name: 'parent_folder_uri',
        type: 'string',
        required: false,
        description: `URI of the parent folder to nest this folder inside`,
      },
    ],
  },
  {
    name: 'vimeo_folder_video_add',
    description: `Move or add a video into a Vimeo folder (project). Requires edit scope.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `Folder (project) ID to add the video to`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Video ID to add to the folder`,
      },
    ],
  },
  {
    name: 'vimeo_folder_videos_list',
    description: `Retrieve all videos inside a specific Vimeo folder (project). Requires private scope.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `Folder (project) ID to list videos from`,
      },
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'filter', type: 'string', required: false, description: `Filter videos by type` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter videos by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for videos` },
    ],
  },
  {
    name: 'vimeo_folders_list',
    description: `Retrieve all folders (projects) owned by the authenticated Vimeo user for organizing private video libraries. Requires private scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of folders per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter folders by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for folders` },
    ],
  },
  {
    name: 'vimeo_following_list',
    description: `Retrieve a list of Vimeo users that the authenticated user is following. Requires private scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter following list by type`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of users per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter following list by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order` },
    ],
  },
  {
    name: 'vimeo_liked_videos_list',
    description: `Retrieve all videos liked by the authenticated Vimeo user. Requires private scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter liked videos by type`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for liked videos` },
    ],
  },
  {
    name: 'vimeo_me_get',
    description: `Retrieve the authenticated Vimeo user's profile including account type, bio, location, stats, and links. Requires a valid Vimeo OAuth2 connection.`,
    params: [],
  },
  {
    name: 'vimeo_my_videos_list',
    description: `Retrieve all videos uploaded by the authenticated Vimeo user. Supports filtering, sorting, and pagination. Requires private scope.`,
    params: [
      {
        name: 'containing_uri',
        type: 'string',
        required: false,
        description: `Filter videos that contain a specific URI`,
      },
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'filter', type: 'string', required: false, description: `Filter videos by type` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter videos by title or description`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for video results`,
      },
    ],
  },
  {
    name: 'vimeo_showcase_create',
    description: `Create a new showcase (album) on Vimeo for organizing videos. Supports privacy, password protection, branding, and embed settings. Requires create scope.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name/title of the showcase` },
      {
        name: 'brand_color',
        type: 'string',
        required: false,
        description: `Hex color code for showcase branding`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the showcase`,
      },
      {
        name: 'hide_nav',
        type: 'boolean',
        required: false,
        description: `Whether to hide Vimeo navigation in the showcase`,
      },
      {
        name: 'hide_upcoming',
        type: 'boolean',
        required: false,
        description: `Whether to hide upcoming live events in the showcase`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password for the showcase when privacy is set to 'password'`,
      },
      {
        name: 'privacy',
        type: 'string',
        required: false,
        description: `Privacy setting for the showcase`,
      },
      {
        name: 'review_mode',
        type: 'boolean',
        required: false,
        description: `Enable review mode for the showcase`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Default sort for videos in the showcase`,
      },
    ],
  },
  {
    name: 'vimeo_showcase_video_add',
    description: `Add a video to a Vimeo showcase. Requires edit scope and ownership of both the showcase and the video.`,
    params: [
      {
        name: 'album_id',
        type: 'string',
        required: true,
        description: `Showcase (album) ID to add the video to`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Video ID to add to the showcase`,
      },
    ],
  },
  {
    name: 'vimeo_showcase_videos_list',
    description: `Retrieve all videos in a specific Vimeo showcase. Requires private scope.`,
    params: [
      { name: 'album_id', type: 'string', required: true, description: `Showcase (album) ID` },
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for videos` },
    ],
  },
  {
    name: 'vimeo_showcases_list',
    description: `Retrieve all showcases (formerly albums) owned by the authenticated Vimeo user. Requires private scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of showcases per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter showcases by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for showcases` },
    ],
  },
  {
    name: 'vimeo_user_follow',
    description: `Follow a Vimeo user on behalf of the authenticated user. Requires interact scope.`,
    params: [
      {
        name: 'follow_user_id',
        type: 'string',
        required: true,
        description: `Vimeo user ID to follow`,
      },
    ],
  },
  {
    name: 'vimeo_user_get',
    description: `Retrieve public profile information for any Vimeo user by their user ID or username. Requires public scope.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `Vimeo user ID or username` },
    ],
  },
  {
    name: 'vimeo_user_videos_list',
    description: `Retrieve all public videos uploaded by a specific Vimeo user. Supports filtering and pagination. Requires public scope.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `Vimeo user ID or username` },
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter results by video type`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter videos`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for video results`,
      },
    ],
  },
  {
    name: 'vimeo_video_comment_add',
    description: `Post a comment on a Vimeo video on behalf of the authenticated user. Requires interact scope.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `Comment text to post` },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to comment on`,
      },
    ],
  },
  {
    name: 'vimeo_video_comments_list',
    description: `Retrieve all comments posted on a specific Vimeo video. Requires public scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to list comments from`,
      },
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of comments per page`,
      },
    ],
  },
  {
    name: 'vimeo_video_delete',
    description: `Permanently delete a Vimeo video. This action is irreversible. Requires delete scope and ownership of the video.`,
    params: [
      { name: 'video_id', type: 'string', required: true, description: `Vimeo video ID to delete` },
    ],
  },
  {
    name: 'vimeo_video_edit',
    description: `Update the metadata of an existing Vimeo video including title, description, privacy settings, tags, and content rating. Requires edit scope.`,
    params: [
      { name: 'video_id', type: 'string', required: true, description: `Vimeo video ID to edit` },
      {
        name: 'content_rating',
        type: 'string',
        required: false,
        description: `Content rating of the video`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the video`,
      },
      {
        name: 'license',
        type: 'string',
        required: false,
        description: `Creative Commons license to apply`,
      },
      { name: 'name', type: 'string', required: false, description: `New title for the video` },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password for the video when privacy view is set to 'password'`,
      },
      {
        name: 'privacy_add',
        type: 'boolean',
        required: false,
        description: `Whether users can add the video to their showcases or channels`,
      },
      {
        name: 'privacy_comments',
        type: 'string',
        required: false,
        description: `Who can comment on the video`,
      },
      {
        name: 'privacy_download',
        type: 'boolean',
        required: false,
        description: `Whether users can download the video`,
      },
      {
        name: 'privacy_embed',
        type: 'string',
        required: false,
        description: `Who can embed the video`,
      },
      {
        name: 'privacy_view',
        type: 'string',
        required: false,
        description: `Who can view the video`,
      },
    ],
  },
  {
    name: 'vimeo_video_get',
    description: `Retrieve detailed information about a specific Vimeo video including metadata, privacy settings, stats, and embed details. Requires a valid Vimeo OAuth2 connection.`,
    params: [{ name: 'video_id', type: 'string', required: true, description: `Vimeo video ID` }],
  },
  {
    name: 'vimeo_video_like',
    description: `Like a Vimeo video on behalf of the authenticated user. Use PUT /me/likes/{video_id} to like. Requires interact scope.`,
    params: [
      { name: 'video_id', type: 'string', required: true, description: `Vimeo video ID to like` },
    ],
  },
  {
    name: 'vimeo_video_tags_list',
    description: `Retrieve all tags applied to a specific Vimeo video. Requires public scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to list tags from`,
      },
    ],
  },
  {
    name: 'vimeo_videos_search',
    description: `Search for public videos on Vimeo using keywords and filters. Returns paginated video results with metadata. Requires a valid Vimeo OAuth2 connection with public scope.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query keywords` },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter results by video type`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results to return per page`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for search results`,
      },
    ],
  },
  {
    name: 'vimeo_watchlater_add',
    description: `Add a video to the authenticated user's Vimeo Watch Later queue. Requires interact scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to add to Watch Later`,
      },
    ],
  },
  {
    name: 'vimeo_watchlater_list',
    description: `Retrieve all videos in the authenticated user's Vimeo Watch Later queue. Requires private scope.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction` },
      { name: 'filter', type: 'string', required: false, description: `Filter by video type` },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of videos per page`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for watch later videos`,
      },
    ],
  },
  {
    name: 'vimeo_webhook_create',
    description: `Register a new webhook endpoint to receive real-time Vimeo event notifications. Supports events for video uploads, transcoding, privacy changes, and comments. Requires private scope.`,
    params: [
      {
        name: 'event_types',
        type: 'array',
        required: true,
        description: `List of event types that will trigger this webhook`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `HTTPS URL that Vimeo will send webhook POST requests to`,
      },
    ],
  },
  {
    name: 'vimeo_webhook_delete',
    description: `Delete a registered Vimeo webhook endpoint so it no longer receives event notifications. Requires private scope.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `Webhook ID to delete` },
    ],
  },
  {
    name: 'vimeo_webhooks_list',
    description: `Retrieve all webhooks registered for the authenticated Vimeo application. Requires private scope.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of webhooks per page`,
      },
    ],
  },
]
