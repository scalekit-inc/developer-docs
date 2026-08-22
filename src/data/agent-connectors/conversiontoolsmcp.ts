import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'conversiontoolsmcp_auth_login',
    description: `Login to ConversionTools using OAuth. Opens a browser window for authentication.`,
    params: [
      {
        name: 'force',
        type: 'boolean',
        required: false,
        description: `Force re-authentication even if already logged in`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_auth_logout',
    description: `Logout from ConversionTools. Clears stored credentials.`,
    params: [],
  },
  {
    name: 'conversiontoolsmcp_auth_status',
    description: `Check authentication status and account info.`,
    params: [],
  },
  {
    name: 'conversiontoolsmcp_convert_file',
    description: `Convert a file between 140+ supported formats including documents, images, audio, video, and data files. Returns a download URL for the converted file.`,
    params: [
      {
        name: 'input_path',
        type: 'string',
        required: true,
        description: `Local path to the input file, used for filename and format detection.`,
      },
      {
        name: 'output_path',
        type: 'string',
        required: true,
        description: `Local path where the converted file should be saved.`,
      },
      {
        name: 'converter',
        type: 'string',
        required: false,
        description: `Specific converter type to use (e.g., convert.pdf_to_excel). If omitted, the converter is auto-detected from file extensions.`,
      },
      {
        name: 'file_content',
        type: 'string',
        required: false,
        description: `Base64-encoded file content for files 5 MB or smaller.`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: false,
        description: `File ID returned by request_upload_url for files larger than 5 MB.`,
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Converter-specific options as key-value pairs. Call get_converter_info to see which options a converter accepts.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_find_converter',
    description: `Find the best converter for converting between two specific formats.`,
    params: [
      {
        name: 'input_format',
        type: 'string',
        required: true,
        description: `Input file format extension (e.g., pdf, xlsx, png).`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: true,
        description: `Desired output format extension (e.g., csv, json, jpg).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_get_converter_info',
    description: `Get detailed information about a specific converter, including available options and their allowed values.`,
    params: [
      {
        name: 'converter',
        type: 'string',
        required: true,
        description: `Converter type identifier (e.g., convert.pdf_to_excel).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_get_download_url',
    description: `Regenerate a fresh, short-lived download URL for a file already converted by convert_file, using its task_id. Call this if the original download URL expired before you fetched it.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The task_id returned by convert_file.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_list_converters',
    description: `List available file converters. Use this to discover what conversions are supported.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter converters by category.`,
      },
      {
        name: 'input_format',
        type: 'string',
        required: false,
        description: `Filter by input format extension (e.g., pdf, xlsx, png).`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Filter by output format extension (e.g., csv, json, jpg).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_parse_create_schema',
    description: `Create a saved, reusable Parse extraction schema with a named field definition, for extractions that will be run more than once.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `The field definitions. Each: {name (snake_case), type, description?, required?, examples?, aliases?, items?, fields?, validation?}.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Human-readable schema name, e.g. "Supplier invoice".`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `What this schema is for (optional).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_parse_export',
    description: `Turn a completed Parse extraction into a CSV or XLSX spreadsheet, flattening nested lists into rows.`,
    params: [
      {
        name: 'extraction_id',
        type: 'string',
        required: true,
        description: `The completed extraction to export.`,
      },
      { name: 'format', type: 'string', required: true, description: `Spreadsheet format.` },
      {
        name: 'output_path',
        type: 'string',
        required: false,
        description: `Local path to save the file (stdio mode).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_parse_extract',
    description: `Extract structured data from a document (PDF, scan, photo, invoice, receipt, form, statement) using Parse, the AI extraction engine. Submits the document and returns an extraction id immediately; poll parse_extraction_status for the extracted data.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Inline field list for a one-off extraction (ignored when schema_id is set). Each field: {name (snake_case), type: string|number|date|boolean|array|object, description?, required?, examples?, aliases?, items? (for array), fields? (for object / array-of-object), validation?}.`,
      },
      {
        name: 'file_content',
        type: 'string',
        required: false,
        description: `Base64-encoded document bytes (remote/http mode).`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: false,
        description: `File id from a previous Parse upload. Note: wait does not apply to this path - submit, then poll.`,
      },
      {
        name: 'file_path',
        type: 'string',
        required: false,
        description: `Path to the document (local/stdio mode), or a filename label in remote mode.`,
      },
      {
        name: 'no_cache',
        type: 'boolean',
        required: false,
        description: `Force a fresh extraction instead of reusing a stored result for an identical document + fields.`,
      },
      {
        name: 'output_format',
        type: 'string',
        required: false,
        description: `Start a spreadsheet export automatically once the extraction completes. Collect it with parse_export.`,
      },
      {
        name: 'schema_id',
        type: 'string',
        required: false,
        description: `Id of a saved schema to extract with (from parse_list_schemas / parse_create_schema).`,
      },
      {
        name: 'wait',
        type: 'number',
        required: false,
        description: `Seconds to hold the request open waiting for the result (max 120). Upload path only. Omit to get the id back immediately and poll.`,
      },
      {
        name: 'webhook_url',
        type: 'string',
        required: false,
        description: `Public http(s) URL notified when the extraction reaches a terminal state. Carries the id and status only, never the extracted data.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_parse_extraction_status',
    description: `Poll a document extraction submitted with parse_extract. Returns processing while the extraction runs, or completed/failed with the extracted data or error once finished.`,
    params: [
      {
        name: 'extraction_id',
        type: 'string',
        required: true,
        description: `The extraction id returned by parse_extract.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_parse_list_schemas',
    description: `List the saved Parse extraction schemas on this account, including each schema's fields and usage count.`,
    params: [],
  },
  {
    name: 'conversiontoolsmcp_parse_usage',
    description: `Show this account's Parse usage for the current billing month: plan, pages used, page limit, pages remaining, and reset date.`,
    params: [],
  },
  {
    name: 'conversiontoolsmcp_request_upload_url',
    description: `Get a signed URL for uploading large files (over 5 MB). After uploading to the URL, pass the returned file_id to convert_file.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Name of the file to upload, including its extension.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_attach_file',
    description: `Attach a new input file to an existing built AI Studio converter so it can be re-run on fresh data without rebuilding.`,
    params: [
      {
        name: 'converter_id',
        type: 'string',
        required: true,
        description: `The existing converter to reuse.`,
      },
      {
        name: 'file_content',
        type: 'string',
        required: false,
        description: `Base64-encoded file content (remote/http mode).`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: false,
        description: `File ID from a previous upload (large files, via request_upload_url).`,
      },
      {
        name: 'file_path',
        type: 'string',
        required: false,
        description: `Path to the new input file (local/stdio mode).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_chat',
    description: `Send a plain-language build instruction to the AI Studio planner for a converter created with studio_create_converter. The planner may ask a clarifying question or propose a ready-to-run converter.`,
    params: [
      {
        name: 'converter_id',
        type: 'string',
        required: true,
        description: `The converter_id from studio_create_converter.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Plain-language build instruction or answer to the planner.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_create_converter',
    description: `Start building a new custom converter with AI Studio, for conversions that need engines not available locally, large or sensitive files, multi-step transformations, or a durable reusable converter. Optionally attaches the input file in the same call.`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: false,
        description: `Base64-encoded file content (remote/http mode).`,
      },
      {
        name: 'file_id',
        type: 'string',
        required: false,
        description: `File ID from a previous upload (use request_upload_url for large files).`,
      },
      {
        name: 'file_path',
        type: 'string',
        required: false,
        description: `Path to the input file (local/stdio mode), or a filename label in remote mode.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional name for the converter.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_download_result',
    description: `Download the result of a successful AI Studio converter run, using the result_file_id from studio_run_status.`,
    params: [
      {
        name: 'result_file_id',
        type: 'string',
        required: true,
        description: `The result_file_id from studio_run_status SUCCESS.`,
      },
      {
        name: 'output_path',
        type: 'string',
        required: false,
        description: `Local path to save the file (stdio mode).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_get_converter',
    description: `Get a custom AI Studio converter's details and current status, including its input/output shape and the file currently attached.`,
    params: [
      {
        name: 'converter_id',
        type: 'string',
        required: true,
        description: `The converter_id (from studio_list_converters or studio_create_converter).`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_list_converters',
    description: `List the custom converters previously built in AI Studio for the signed-in account, so an existing converter can be reused instead of rebuilding one. Returns up to 10 results, most recent first.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional filter by name/description.`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_run',
    description: `Run a built AI Studio converter on its attached file. Runs asynchronously; poll studio_run_status for the result.`,
    params: [
      {
        name: 'converter_id',
        type: 'string',
        required: true,
        description: `The converter_id to run.`,
      },
      {
        name: 'data_source',
        type: 'string',
        required: false,
        description: `"uploaded" (the user's file, default) or "sample".`,
      },
    ],
  },
  {
    name: 'conversiontoolsmcp_studio_run_status',
    description: `Poll the status of an AI Studio converter run started with studio_run. Returns RUNNING, SUCCESS (with a result file), or ERROR.`,
    params: [
      {
        name: 'converter_id',
        type: 'string',
        required: true,
        description: `The converter_id whose run to poll.`,
      },
    ],
  },
]
