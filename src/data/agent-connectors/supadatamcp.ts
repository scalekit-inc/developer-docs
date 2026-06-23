import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'supadatamcp_supadata_check_crawl_status',
    description: `Check crawl job status and retrieve results. Returns status: scraping, completed, failed, or cancelled.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The job ID returned by supadata_crawl when the crawl job was created.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_check_extract_status',
    description: `Check extract job status and retrieve results. Returns status: queued, active, completed, or failed.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The job ID returned by supadata_extract when the extraction job was created.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_check_transcript_status',
    description: `Check transcript job status and retrieve results. Returns status: queued, active, completed, or failed.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The job ID returned by supadata_transcript for a large file transcription job.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_crawl',
    description: `Create a crawl job to extract content from all pages on a website. Returns a jobId - use supadata_check_crawl_status with that jobId to poll for results.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The full URL of the website to crawl.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of pages to crawl. Optional.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_extract',
    description: `Extract structured data from a video URL using AI. Provide a prompt for what to extract, a JSON Schema for the output format, or both. Returns a jobId for async processing.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The full URL of the video to extract structured data from.` },
      { name: 'prompt', type: 'string', required: false, description: `Natural language prompt describing what to extract from the video. Optional if schema is provided.` },
      { name: 'schema', type: 'object', required: false, description: `JSON Schema defining the structure of the extracted output. Optional if prompt is provided.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_map',
    description: `Discover URLs on a website`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The full URL of the website to map.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_metadata',
    description: `Fetch metadata from a media URL (YouTube, TikTok, Instagram, Twitter). Returns platform info, title, description, author details, engagement stats, media details, tags, and creation date.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The full URL of the media content to fetch metadata for.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_scrape',
    description: `Scrape a single web page and return its content. Fetches and extracts the text content from the specified URL, with optional link removal and language filtering.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The full URL of the web page to scrape.` },
      { name: 'lang', type: 'string', required: false, description: `Language code to filter or request content in (e.g. 'en', 'fr'). Optional.` },
      { name: 'noLinks', type: 'boolean', required: false, description: `When true, strips all hyperlinks from the scraped content. Optional, defaults to false.` },
    ],
  },
  {
    name: 'supadatamcp_supadata_transcript',
    description: `Extract transcript from a video or file URL. For large files, returns a jobId instead of the transcript directly - use supadata_check_transcript_status with that jobId to poll for results.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The full URL of the video or file to transcribe.` },
      { name: 'chunkSize', type: 'number', required: false, description: `Size of text chunks to split the transcript into. Optional.` },
      { name: 'lang', type: 'string', required: false, description: `Language code for the transcript (e.g. 'en', 'fr'). Optional.` },
      { name: 'mode', type: 'string', required: false, description: `Transcription mode to use. Optional.` },
      { name: 'text', type: 'boolean', required: false, description: `When true, returns plain text instead of structured transcript data. Optional.` },
    ],
  },
]
