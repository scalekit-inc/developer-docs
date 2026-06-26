import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'liltmcp_check_job_status',
    description: `Checks the status of a verified translation job.`,
    params: [{ name: 'job_id', type: 'integer', required: true, description: `No description.` }],
  },
  {
    name: 'liltmcp_create_trained_model',
    description: `Creates a new trained translation model for a specific language pair.`,
    params: [
      { name: 'src_lang', type: 'string', required: true, description: `No description.` },
      { name: 'trg_lang', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'liltmcp_download_job',
    description: `Triggers a job export and returns a download link for the completed translation job.`,
    params: [{ name: 'job_id', type: 'integer', required: true, description: `No description.` }],
  },
  {
    name: 'liltmcp_get_credit_balance_information',
    description: `Retrieves all available credit balances for the authenticated user.`,
    params: [],
  },
  {
    name: 'liltmcp_list_resources',
    description: `Lists and filters LILT jobs or translation models.`,
    params: [
      {
        name: 'resource_type',
        type: 'string',
        required: true,
        description: `Type of resource to list. Use "job" for translation jobs or "model" for trained translation models.`,
      },
      { name: 'archived', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'liltmcp_translate_files_with_verification',
    description: `Create a verified translation job assigned to professional LILT linguists for file translation.`,
    params: [
      { name: 'file_ids', type: 'array', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'src_lang', type: 'string', required: true, description: `No description.` },
      { name: 'trg_langs', type: 'array', required: true, description: `No description.` },
      { name: 'user_confirmed', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'liltmcp_translate_text',
    description: `Translates text using LILT's instant translate API.`,
    params: [
      { name: 'src_lang', type: 'string', required: true, description: `No description.` },
      { name: 'text', type: 'string', required: true, description: `No description.` },
      { name: 'trg_lang', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'liltmcp_upload_file',
    description: `Upload a file to LILT for translation.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `No description.` },
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'content_type', type: 'string', required: false, description: `No description.` },
    ],
  },
]
