import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'supadata_account_get',
    description: `Retrieve organization details, plan information, and credit usage for the connected Supadata account. Use this to check remaining credits before running credit-consuming operations.`,
    params: [],
  },
  {
    name: 'supadata_extract',
    description: `Use AI to analyze a video or media URL and extract structured data from it, guided by a natural-language prompt and/or a JSON schema. Returns a jobId — poll Get Extract Results with it until extraction finishes.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the video or media to extract structured data from.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Natural-language instructions describing what data to extract.`,
      },
      {
        name: 'schema',
        type: 'object',
        required: false,
        description: `JSON schema describing the exact shape of the structured data to extract.`,
      },
    ],
  },
  {
    name: 'supadata_extract_get',
    description: `Check the status of an AI structured-data extraction job and retrieve its results once complete. Use the jobId returned by Extract Structured Data.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `ID of the extraction job to check, returned by Extract Structured Data.`,
      },
    ],
  },
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
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the video or media file to transcribe. Supports YouTube, TikTok, Instagram, X, Facebook, or direct video/audio file URLs.`,
      },
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
    ],
  },
  {
    name: 'supadata_transcript_job_get',
    description: `Poll the status and result of an asynchronous transcript job. supadata_transcript_get switches to async mode (returning a 202 with a jobId) for videos longer than roughly 20 minutes; use this tool to poll that jobId until status is completed or failed. Recommended poll interval is 1 second; results remain available for 1 hour after completion.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `ID of the transcript job to check, returned by Get Transcript when it responds asynchronously.`,
      },
    ],
  },
  {
    name: 'supadata_web_crawl_get',
    description: `Check the status of a web crawl job and retrieve its results once complete. Use the jobId returned by Start Web Crawl.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `ID of the crawl job to check, returned by Start Web Crawl.`,
      },
    ],
  },
  {
    name: 'supadata_web_crawl_start',
    description: `Start an asynchronous crawl job that extracts content from all pages on a website, following internal links up to the given page limit. Returns a jobId — poll Get Web Crawl Results with it until the crawl finishes.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Base URL of the website to crawl.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of pages to crawl.`,
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
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the web page to scrape.`,
      },
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
    ],
  },
  {
    name: 'supadata_youtube_batch_get',
    description: `Check the status of a YouTube batch job (transcripts or video metadata) and retrieve its results once complete. Use the jobId returned by Batch Get YouTube Transcripts or Batch Get YouTube Video Metadata.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `ID of the batch job to check.`,
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
    name: 'supadata_youtube_channel_videos',
    description: `Retrieve the video IDs published by a YouTube channel. Use Get YouTube Channel first to resolve a handle to a channel ID if needed.`,
    params: [
      {
        name: 'channelId',
        type: 'string',
        required: true,
        description: `YouTube channel ID, handle (@username), or full channel URL.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of video IDs to return.`,
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
    name: 'supadata_youtube_playlist_videos',
    description: `Retrieve the video IDs contained in a YouTube playlist, in playlist order.`,
    params: [
      {
        name: 'playlistId',
        type: 'string',
        required: true,
        description: `YouTube playlist ID or full playlist URL.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of video IDs to return.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_search',
    description: `Search YouTube for videos, channels, or playlists. Returns results with titles, IDs, descriptions, thumbnails, and metadata.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to find videos, channels, or playlists on YouTube.`,
      },
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
        name: 'type',
        type: 'string',
        required: false,
        description: `Type of results to return: video, channel, or playlist.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_transcript_batch',
    description: `Start an asynchronous batch job that fetches transcripts for multiple YouTube videos in one call. Returns a jobId — poll Get YouTube Batch Results with it until the batch finishes.`,
    params: [
      {
        name: 'videoIds',
        type: 'array',
        required: true,
        description: `JSON array of YouTube video IDs or URLs to fetch transcripts for.`,
      },
      {
        name: 'lang',
        type: 'string',
        required: false,
        description: `ISO 639-1 language code for the transcripts (e.g., en, fr, de). Defaults to each video's original language.`,
      },
      {
        name: 'text',
        type: 'boolean',
        required: false,
        description: `Return plain text instead of timestamped segments for each video. Defaults to false.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_transcript_get',
    description: `Retrieve the transcript for a YouTube video by video ID or URL. Returns timestamped segments with text content.`,
    params: [
      {
        name: 'videoId',
        type: 'string',
        required: true,
        description: `YouTube video ID or full YouTube URL to retrieve the transcript for.`,
      },
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
        name: 'videoId',
        type: 'string',
        required: true,
        description: `YouTube video ID or full YouTube URL to translate the transcript for.`,
      },
      {
        name: 'text',
        type: 'boolean',
        required: false,
        description: `Return plain text instead of timestamped segments. Defaults to false.`,
      },
    ],
  },
  {
    name: 'supadata_youtube_video_batch',
    description: `Start an asynchronous batch job that fetches metadata for multiple YouTube videos in one call. Returns a jobId — poll Get YouTube Batch Results with it until the batch finishes.`,
    params: [
      {
        name: 'videoIds',
        type: 'array',
        required: true,
        description: `JSON array of YouTube video IDs or URLs to fetch metadata for.`,
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
