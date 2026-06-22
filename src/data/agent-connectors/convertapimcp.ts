import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'convertapimcp_convert',
    description: `Convert a file from one format to another using ConvertAPI. Call 'get_conversion_parameters' first to discover supported parameters, then submit a conversion request with the source format, target format, and any additional parameters.`,
    params: [
      { name: 'clientRequest', type: 'object', required: true, description: `No description.` },
    ],
  },
  {
    name: 'convertapimcp_get_conversion_parameters',
    description: `Retrieve all available parameters, types, and constraints for a specific format conversion. Call this before 'convert' to understand which parameters are supported for your source and target formats.`,
    params: [
      { name: 'fromFormat', type: 'string', required: true, description: `Source file format to convert from.` },
      { name: 'toFormat', type: 'string', required: true, description: `Target file format to convert to.` },
    ],
  },
  {
    name: 'convertapimcp_get_converters_by_tags',
    description: `Retrieve a list of available ConvertAPI converters that match all specified tags. Returns only converters associated with every tag provided.`,
    params: [
      { name: 'tags', type: 'array', required: true, description: `List of tags to filter converters by. Only converters matching all specified tags are returned.` },
    ],
  },
  {
    name: 'convertapimcp_request_upload_url',
    description: `Generate a curl command to upload a local file to ConvertAPI and obtain a FileId. Use this when the file is not publicly accessible via URL; for public URLs pass the URL directly to the 'convert' tool instead.`,
    params: [
      { name: 'filePath', type: 'string', required: true, description: `Absolute or relative path to the file to upload.` },
    ],
  },
  {
    name: 'convertapimcp_search_converters',
    description: `Search for available ConvertAPI converters that match the specified search terms. Each term is matched against converter metadata, and results include converters relevant to all provided terms.`,
    params: [
      { name: 'terms', type: 'array', required: true, description: `List of search terms to filter converters by. Each term is matched against converter metadata.` },
    ],
  },
]
