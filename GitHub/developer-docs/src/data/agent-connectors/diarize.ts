import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'diarize_create_transcription_job',
    description: `Submit a new transcription and diarization job for an audio or video URL (YouTube, X, Instagram, TikTok). Returns a job ID that can be used to check status and download results.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the audio or video content to transcribe (e.g. YouTube, X, Instagram, TikTok link)`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Language code for transcription (e.g. 'en', 'es', 'fr'). Defaults to auto-detection if not provided.`,
      },
      {
        name: 'num_speakers',
        type: 'integer',
        required: false,
        description: `Expected number of speakers in the audio. Helps improve diarization accuracy.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'diarize_download_transcript',
    description: `Download the transcript output for a completed transcription job in JSON, TXT, SRT, or VTT format, including speaker diarization, segments, and word-level timestamps.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The unique ID of the completed transcription job`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Output format for the transcript. Supported formats: 'json', 'txt', 'srt', 'vtt'.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'diarize_get_job_status',
    description: `Retrieve the current status of a transcription job by its job ID. Returns job state (pending, processing, completed, failed), metadata, and an estimatedTime field (in seconds) indicating how long processing is expected to take. Use estimatedTime to determine polling frequency and max wait duration — for example, a 49-minute episode may have an estimatedTime of ~891s (~15 mins), so the agent should wait at least that long before giving up.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The unique ID of the transcription job to check`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
]
