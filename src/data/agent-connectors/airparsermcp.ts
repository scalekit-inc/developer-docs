import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'airparsermcp_create_inbox',
    description: `Create a new Airparser inbox with the selected LLM engine.`,
    params: [
      {
        name: 'llm_engine',
        type: 'string',
        required: true,
        description: `Parsing engine: 'text' for text-based documents, 'vision' for image-based documents.`,
      },
      { name: 'name', type: 'string', required: true, description: `Human-friendly inbox name.` },
    ],
  },
  {
    name: 'airparsermcp_generate_schema_from_document',
    description: `Generate an Airparser extraction schema proposal from an existing document in an inbox.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Existing document id inside that inbox.`,
      },
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_get_document',
    description: `Get one Airparser document with parsed JSON for the authenticated user.`,
    params: [
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Airparser document id.`,
      },
    ],
  },
  {
    name: 'airparsermcp_get_extraction_schema',
    description: `Get the current extraction schema configured for an Airparser inbox.`,
    params: [
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_get_extraction_schema_format_guide',
    description: `Get a compact guide to the native Airparser extraction schema format, including field types and examples.`,
    params: [],
  },
  {
    name: 'airparsermcp_get_inbox',
    description: `Get a single Airparser inbox, including extraction schema details.`,
    params: [
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_get_postprocessing',
    description: `Get the current Airparser post-processing configuration for an inbox, including whether it is enabled and the saved Python code.`,
    params: [
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_get_postprocessing_runtime_rules',
    description: `Get the runtime constraints and allowed imports for Airparser post-processing Python code.`,
    params: [],
  },
  {
    name: 'airparsermcp_list_documents',
    description: `List documents inside an Airparser inbox, including recent parsed results and pagination metadata.`,
    params: [
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start date filter in YYYY-MM-DD format.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `1-based page number for pagination.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End date filter in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'airparsermcp_list_inboxes',
    description: `List active Airparser inboxes available to the authenticated user.`,
    params: [],
  },
  {
    name: 'airparsermcp_save_postprocessing_code',
    description: `Save Airparser post-processing Python code for an inbox without changing whether it is enabled.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `Python function body to save.`,
      },
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_set_postprocessing_enabled',
    description: `Enable or disable the saved Airparser post-processing step for an inbox.`,
    params: [
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
      {
        name: 'is_enabled',
        type: 'boolean',
        required: true,
        description: `Whether post-processing should be enabled.`,
      },
    ],
  },
  {
    name: 'airparsermcp_test_postprocessing_code',
    description: `Run Airparser post-processing Python code against an existing parsed document without saving it.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `Python function body to run inside the restricted Airparser post-processing wrapper.`,
      },
      {
        name: 'document_id',
        type: 'string',
        required: true,
        description: `Parsed Airparser document id.`,
      },
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_update_extraction_schema',
    description: `Create or update the extraction schema for an Airparser inbox using the native validated schema format.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Extraction schema fields in Airparser native format. Each field object must use "name" (not "key") as the field identifier.`,
      },
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_update_extraction_schema_from_json_schema',
    description: `Convert an OpenAI-style schema description into the native Airparser extraction schema format and save it to an inbox.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `OpenAI-style field definitions to convert. Each item has name, description, type, and optional attributes.`,
      },
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_update_fields_meta',
    description: `Enable or disable per-document output metadata fields for an Airparser inbox. Only passed fields are changed; omitted fields keep their current value.`,
    params: [
      {
        name: 'fields_meta',
        type: 'object',
        required: true,
        description: `Partial set of metadata fields to enable/disable. Optional boolean properties: from, from_name, original_recipient, to, cc, bcc, reply_to, subject, received_at_datetime, received_at_date, received_at_time, attachments_nb, doc_id, doc_url, content_type, content, content_plaintext, content_plaintext_md, download_url, parent_id, parent_data, name, filename, credits, pages, confidence.`,
      },
      { name: 'inbox_id', type: 'string', required: true, description: `Airparser inbox id.` },
    ],
  },
  {
    name: 'airparsermcp_upload_document_sync',
    description: `Upload one document to an Airparser inbox and wait for the parsed result. File content must be base64 encoded.`,
    params: [
      {
        name: 'content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded file contents.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: true,
        description: `MIME type of the document.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Original filename including extension.`,
      },
      {
        name: 'inbox_id',
        type: 'string',
        required: true,
        description: `Target Airparser inbox id.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional metadata key-value pairs to attach.`,
      },
    ],
  },
]
