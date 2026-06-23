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
]
