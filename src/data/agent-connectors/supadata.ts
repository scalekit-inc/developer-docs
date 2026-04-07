import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'supadata_metadata_get',
    description: `Retrieve unified metadata for a video or media URL including title, description, author info, engagement stats, media details, and creation date. Supports YouTube, TikTok, Instagram, X (Twitter), Facebook, and more.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the video or media to retrieve metadata for.`,
      },
    ],
  },
  {
    name: 'supadata_transcript_get',
    description: `Extract transcripts from YouTube, TikTok, Instagram, X (Twitter), Facebook, or direct file URLs. Supports native captions, auto-generated captions, or AI-generated transcripts. Returns timestamped segments with speaker labels.`,
    params: [
      {
        name: 'chunkSize',
        type: 'integer',
        required: false,
        description: `Maximum number of characters per transcript segment chunk.`,
      },
      {
        name: 'lang',
        type: 'string',
        required: false,
        description: `ISO 639-1 language code for the transcript (e.g., en, fr, de). Defaults to the video's original language.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Transcript generation mode: native (use existing captions, 1 credit), auto (native with AI fallback), or generate (AI-generated, 2 credits/minute).`,
      },
      {
        name: 'text',
        type: 'boolean',
        required: false,
        description: `Return plain text instead of timestamped segments. Defaults to false.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the video or media file to transcribe. Supports YouTube, TikTok, Instagram, X, Facebook, or direct video/audio file URLs.`,
      },
    ],
  },
  {
    name: 'supadata_web_map',
    description: `Discover and return all URLs found on a website. Useful for site structure analysis, link auditing, and building crawl lists. Costs 1 credit per request.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Base URL of the website to map.`,
      },
    ],
  },
  {
    name: 'supadata_web_scrape',
    description: `Scrape a web page and return its content as clean Markdown. Ideal for extracting readable content from any URL while stripping away navigation and ads.`,
    params: [
      {
        name: 'lang',
        type: 'string',
        required: false,
        description: `ISO 639-1 language code to request content in a specific language (e.g., en, fr, de).`,
      },
      {
        name: 'noLinks',
        type: 'boolean',
        required: false,
        description: `Strip all hyperlinks from the Markdown output. Defaults to false.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the web page to scrape.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_channel_get',
    description: `Retrieve metadata for a YouTube channel including name, description, subscriber count, video count, and thumbnails.`,
    params: [
      {
        name: 'channelId',
        type: 'string',
        required: true,
        description: `YouTube channel ID, handle (@username), or full channel URL.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_playlist_get',
    description: `Retrieve metadata and video list for a YouTube playlist including title, description, video count, and individual video details.`,
    params: [
      {
        name: 'playlistId',
        type: 'string',
        required: true,
        description: `YouTube playlist ID or full playlist URL.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_search',
    description: `Search YouTube for videos, channels, or playlists. Returns results with titles, IDs, descriptions, thumbnails, and metadata.`,
    params: [
      {
        name: 'lang',
        type: 'string',
        required: false,
        description: `ISO 639-1 language code to filter results by language (e.g., en, fr).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to find videos, channels, or playlists on YouTube.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of results to return: video, channel, or playlist.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_transcript_get',
    description: `Retrieve the transcript for a YouTube video by video ID or URL. Returns timestamped segments with text content.`,
    params: [
      {
        name: 'lang',
        type: 'string',
        required: false,
        description: `ISO 639-1 language code for the transcript (e.g., en, fr, de).`,
      },
      {
        name: 'text',
        type: 'boolean',
        required: false,
        description: `Return plain text instead of timestamped segments. Defaults to false.`,
      },
      {
        name: 'videoId',
        type: 'string',
        required: true,
        description: `YouTube video ID or full YouTube URL to retrieve the transcript for.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_transcript_translate',
    description: `Retrieve and translate a YouTube video transcript into a target language. Returns translated timestamped segments.`,
    params: [
      {
        name: 'lang',
        type: 'string',
        required: true,
        description: `ISO 639-1 language code to translate the transcript into (e.g., en, fr, es).`,
      },
      {
        name: 'text',
        type: 'boolean',
        required: false,
        description: `Return plain text instead of timestamped segments. Defaults to false.`,
      },
      {
        name: 'videoId',
        type: 'string',
        required: true,
        description: `YouTube video ID or full YouTube URL to translate the transcript for.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_video_get',
    description: `Retrieve detailed metadata for a YouTube video including title, description, view count, like count, duration, tags, thumbnails, and channel info.`,
    params: [
      {
        name: 'videoId',
        type: 'string',
        required: true,
        description: `YouTube video ID or full YouTube URL.`,
      },
    ],
  },
]
