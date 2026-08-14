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
    name: 'vimeo_category_get',
    description: `Retrieve details about a specific top-level Vimeo content category, including its name, description, and links. Requires public scope.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `Category name/slug as used in Vimeo's category URIs`,
      },
    ],
  },
  {
    name: 'vimeo_category_videos_list',
    description: `Retrieve videos published under a specific top-level Vimeo content category. Requires public scope.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `Category name/slug to list videos from`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
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
        description: `Search query to filter videos by title within the category`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for results` },
    ],
  },
  {
    name: 'vimeo_channel_get',
    description: `Retrieve detailed information about a specific Vimeo channel including its name, description, and stats. Requires public scope.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `Vimeo channel ID or name`,
      },
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
    name: 'vimeo_comment_delete',
    description: `Permanently delete a comment from a Vimeo video. This action is irreversible and requires delete scope and ownership of the comment or video.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to delete`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID the comment belongs to`,
      },
    ],
  },
  {
    name: 'vimeo_comment_replies_list',
    description: `Retrieve all replies posted to a specific comment on a Vimeo video. Requires public scope.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to list replies for`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID the comment belongs to`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of replies per page`,
      },
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
    name: 'vimeo_folder_delete',
    description: `Permanently delete a folder (project) from the authenticated user's Vimeo account. Videos inside the folder are not deleted, only the folder organization. Requires delete scope.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `Vimeo folder (project) ID to delete`,
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
    name: 'vimeo_group_create',
    description: `Create a new Vimeo group that members can join to share videos and discuss a common topic. Requires create scope.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new group` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the group's topic or purpose`,
      },
    ],
  },
  {
    name: 'vimeo_group_delete',
    description: `Permanently delete a Vimeo group. This action is irreversible and requires delete scope and ownership of the group.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `Vimeo group ID to delete` },
    ],
  },
  {
    name: 'vimeo_group_get',
    description: `Retrieve detailed information about a specific Vimeo group including its name, description, stats, and privacy settings. Requires public scope.`,
    params: [{ name: 'group_id', type: 'string', required: true, description: `Vimeo group ID` }],
  },
  {
    name: 'vimeo_group_users_list',
    description: `Retrieve the list of users who have joined a specific Vimeo group. Requires public scope.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `Vimeo group ID to list members from`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of members per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter members by name`,
      },
    ],
  },
  {
    name: 'vimeo_group_video_add',
    description: `Share an existing video to a Vimeo group. Requires edit scope and membership in the group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `Vimeo group ID to add the video to`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Video ID to share to the group`,
      },
    ],
  },
  {
    name: 'vimeo_group_videos_list',
    description: `Retrieve all videos that have been shared to a specific Vimeo group. Requires public scope.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `Vimeo group ID to list videos from`,
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
        description: `Search query to filter videos by title`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for results` },
    ],
  },
  {
    name: 'vimeo_groups_list',
    description: `Retrieve a list of Vimeo groups, optionally filtered by a search query. Requires public scope.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of groups per page`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter groups by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for results` },
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
    name: 'vimeo_user_followers_list',
    description: `List the followers of a Vimeo user — the inverse of List Following. Requires public scope.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Vimeo user ID whose followers to list`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
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
        description: `Number of items to show per page, up to a maximum of 100`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter the followers list by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for the results` },
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
    name: 'vimeo_user_unfollow',
    description: `Stop following a Vimeo user on behalf of the authenticated user. Requires interact scope.`,
    params: [
      {
        name: 'follow_user_id',
        type: 'string',
        required: true,
        description: `Vimeo user ID to unfollow`,
      },
    ],
  },
  {
    name: 'vimeo_user_update',
    description: `Edit the authenticated Vimeo user's account profile: bio, display name, location, custom URL, content rating filters, default password for password-protected videos, and default upload privacy settings. Requires edit scope; only the authenticated user's own profile can be edited.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Vimeo user ID to edit (must be the authenticated user)`,
      },
      { name: 'bio', type: 'string', required: false, description: `New bio text for the user` },
      {
        name: 'content_filter',
        type: 'array',
        required: false,
        description: `List of content rating values describing the content in this user's videos. See the /contentratings endpoint for the full list.`,
      },
      {
        name: 'custom_url',
        type: 'string',
        required: false,
        description: `The user's custom Vimeo URL slug`,
      },
      {
        name: 'default_privacy_add',
        type: 'boolean',
        required: false,
        description: `Default setting for whether others can add this user's future videos to albums, channels, or groups`,
      },
      {
        name: 'default_privacy_comments',
        type: 'string',
        required: false,
        description: `Default setting for who can comment on this user's future videos`,
      },
      {
        name: 'default_privacy_download',
        type: 'boolean',
        required: false,
        description: `Default setting for whether this user's future videos can be downloaded`,
      },
      {
        name: 'default_privacy_embed',
        type: 'string',
        required: false,
        description: `Default embed privacy for this user's future videos`,
      },
      {
        name: 'default_privacy_view',
        type: 'string',
        required: false,
        description: `Default view privacy for this user's future videos`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `New location text for the user`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the user`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Default password for future videos uploaded with password-protected view privacy`,
      },
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
    name: 'vimeo_users_search',
    description: `Search for Vimeo users by name or other keywords. Per Vimeo's API reference this is served by GET /users with a query parameter (there is no separate /users/search path). Requires public scope; the API may return a 503 if search is temporarily disabled.`,
    params: [
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Sort direction for results`,
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
        description: `Number of items to show per page, up to a maximum of 100`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter users by name`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order for the results` },
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
    name: 'vimeo_video_comment_update',
    description: `Edit the text of an existing comment on a Vimeo video. Requires edit scope and that the authenticated user wrote the comment.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment to edit`,
      },
      { name: 'text', type: 'string', required: true, description: `The new comment text` },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID the comment belongs to`,
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
    name: 'vimeo_video_create',
    description: `Create a new Vimeo video by having Vimeo pull the source file from a publicly accessible URL. This is the simplest upload approach and does not require chunked/binary transfer. Requires create and upload scopes.`,
    params: [
      {
        name: 'file_link',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the video file for Vimeo to pull and transcode`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the new video`,
      },
      { name: 'name', type: 'string', required: false, description: `Title for the new video` },
      {
        name: 'privacy_view',
        type: 'string',
        required: false,
        description: `Who can view the video once created`,
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
    name: 'vimeo_video_likes_list',
    description: `Retrieve the list of users who have liked a specific Vimeo video. Requires public scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to list likes from`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number of results` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of users per page`,
      },
    ],
  },
  {
    name: 'vimeo_video_picture_create',
    description: `Add a new thumbnail image resource to a Vimeo video. Pass 'time' to have Vimeo auto-generate the thumbnail from that timestamp in the video (fully self-contained). If 'time' is omitted, Vimeo creates an empty picture resource and returns an upload link for a custom image, which must be uploaded in a separate follow-up step outside this tool. Requires upload scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to add a thumbnail to`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the thumbnail created from 'time' should become the video's default thumbnail`,
      },
      {
        name: 'time',
        type: 'number',
        required: false,
        description: `Time offset (in seconds) into the video to capture as the thumbnail image`,
      },
    ],
  },
  {
    name: 'vimeo_video_pictures_list',
    description: `List the thumbnail images available for a Vimeo video. Requires public scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to list pictures from`,
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
        description: `Number of items to show per page, up to a maximum of 100`,
      },
    ],
  },
  {
    name: 'vimeo_video_tag_remove',
    description: `Remove a specific tag from a Vimeo video. Requires edit scope.`,
    params: [
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The tag word to remove from the video`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to remove the tag from`,
      },
    ],
  },
  {
    name: 'vimeo_video_tags_add',
    description: `Add one or more tags to a Vimeo video in a single batch call. The total number of tags on a video cannot exceed 20. Requires edit scope. Note: per Vimeo's API reference, this operation is a PUT to the tags collection (not POST).`,
    params: [
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `List of tag names to add to the video.`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to add tags to`,
      },
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
    name: 'vimeo_video_texttrack_create',
    description: `Add a caption/subtitle text track resource to a Vimeo video, specifying its language, name, and type. This creates the text track's metadata; the response includes a link used to upload the actual caption file (VTT) content in a separate follow-up step. Requires upload scope.`,
    params: [
      {
        name: 'language',
        type: 'string',
        required: true,
        description: `Language of the text track. Use the /languages?filter=texttracks endpoint for the full list of supported codes.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the text track` },
      { name: 'type', type: 'string', required: true, description: `Type of the text track` },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to add the text track to`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether this text track is the active one shown in the player. Only one text track per language and type can be active.`,
      },
    ],
  },
  {
    name: 'vimeo_video_texttrack_delete',
    description: `Remove a caption/subtitle text track from a Vimeo video.`,
    params: [
      {
        name: 'texttrack_id',
        type: 'string',
        required: true,
        description: `ID of the text track to delete`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID the text track belongs to`,
      },
    ],
  },
  {
    name: 'vimeo_video_texttracks_list',
    description: `List the caption/subtitle text tracks on a Vimeo video. Requires public scope.`,
    params: [
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `Vimeo video ID to list text tracks from`,
      },
    ],
  },
  {
    name: 'vimeo_video_unlike',
    description: `Remove the authenticated user's like from a Vimeo video. Use DELETE /me/likes/{video_id} to unlike. Requires interact scope.`,
    params: [
      { name: 'video_id', type: 'string', required: true, description: `Vimeo video ID to unlike` },
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
