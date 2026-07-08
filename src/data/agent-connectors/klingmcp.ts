import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'klingmcp_kling_extend_video',
    description: `Extend an existing video with additional content.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Description of what should happen in the extended portion of the video.`,
      },
      {
        name: 'video_id',
        type: 'string',
        required: true,
        description: `ID of the video to extend.`,
      },
      {
        name: 'cfg_scale',
        type: 'number',
        required: false,
        description: `Classifier-free guidance scale controlling prompt adherence.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Generation mode controlling quality and resolution.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Kling model to use for the extension.`,
      },
      {
        name: 'negative_prompt',
        type: 'string',
        required: false,
        description: `Things to avoid in the extended video.`,
      },
    ],
  },
  {
    name: 'klingmcp_kling_generate_motion',
    description: `Transfer motion from a reference video to a character image.`,
    params: [
      {
        name: 'image_url',
        type: 'string',
        required: true,
        description: `URL of the character image to animate.`,
      },
      {
        name: 'video_url',
        type: 'string',
        required: true,
        description: `URL of the reference video providing the motion to transfer.`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL to receive task completion notifications.`,
      },
      {
        name: 'character_orientation',
        type: 'string',
        required: false,
        description: `Orientation source for the character.`,
      },
      {
        name: 'keep_original_sound',
        type: 'string',
        required: false,
        description: `Whether to keep the original sound from the reference video ('yes' or 'no').`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Generation mode controlling quality and resolution.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Optional text description to guide the motion transfer.`,
      },
    ],
  },
  {
    name: 'klingmcp_kling_generate_video',
    description: `Generate AI video from a text prompt using Kling.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Description of the video to generate.`,
      },
      { name: 'aspect_ratio', type: 'string', required: false, description: `Video aspect ratio.` },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL to receive task completion notifications.`,
      },
      {
        name: 'camera_control',
        type: 'string',
        required: false,
        description: `Camera control parameters as a JSON string.`,
      },
      {
        name: 'cfg_scale',
        type: 'number',
        required: false,
        description: `Classifier-free guidance scale controlling prompt adherence.`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Video duration in seconds.`,
      },
      {
        name: 'generate_audio',
        type: 'boolean',
        required: false,
        description: `Whether to generate audio synchronously alongside the video.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Generation mode controlling quality and resolution.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Kling model to use for video generation.`,
      },
      {
        name: 'negative_prompt',
        type: 'string',
        required: false,
        description: `Things to avoid in the generated video.`,
      },
    ],
  },
  {
    name: 'klingmcp_kling_generate_video_from_image',
    description: `Generate AI video using reference images as start and/or end frames.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Description of the video motion and content.`,
      },
      { name: 'aspect_ratio', type: 'string', required: false, description: `Video aspect ratio.` },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Webhook URL to receive task completion notifications.`,
      },
      {
        name: 'cfg_scale',
        type: 'number',
        required: false,
        description: `Classifier-free guidance scale controlling prompt adherence.`,
      },
      {
        name: 'duration',
        type: 'integer',
        required: false,
        description: `Video duration in seconds.`,
      },
      {
        name: 'end_image_url',
        type: 'string',
        required: false,
        description: `URL of the image to use as the last frame of the video.`,
      },
      {
        name: 'generate_audio',
        type: 'boolean',
        required: false,
        description: `Whether to generate audio synchronously alongside the video.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Generation mode controlling quality and resolution.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Kling model to use for video generation.`,
      },
      {
        name: 'negative_prompt',
        type: 'string',
        required: false,
        description: `Things to avoid in the generated video.`,
      },
      {
        name: 'start_image_url',
        type: 'string',
        required: false,
        description: `URL of the image to use as the first frame of the video.`,
      },
    ],
  },
  {
    name: 'klingmcp_kling_get_task',
    description: `Query the status and result of a video generation task.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task ID returned from a generation request.`,
      },
    ],
  },
  {
    name: 'klingmcp_kling_get_tasks_batch',
    description: `Query multiple video generation tasks at once.`,
    params: [
      {
        name: 'task_ids',
        type: 'array',
        required: true,
        description: `List of task IDs to query. Maximum recommended batch size is 50 tasks.`,
      },
    ],
  },
  {
    name: 'klingmcp_kling_list_actions',
    description: `List all available Kling API actions and corresponding tools.`,
    params: [],
  },
  {
    name: 'klingmcp_kling_list_models',
    description: `List all available Kling models for video generation.`,
    params: [],
  },
]
