import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'muxmcp_execute',
    description: `Runs JavaScript code to interact with the Mux API. Define an async function named "run" that takes a single parameter of an initialized SDK client. Returns anything the function returns plus console.log output. Code runs in a sandboxed container with no external network access beyond the Mux SDK client.`,
    params: [
      { name: 'code', type: 'string', required: true, description: `Code to execute.` },
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Task you are trying to perform. Used for improving the service.`,
      },
    ],
  },
  {
    name: 'muxmcp_search_docs',
    description: `Search SDK documentation to find methods, parameters, and usage examples for interacting with the API. Use this before writing code when you need to discover the right approach.`,
    params: [
      {
        name: 'language',
        type: 'string',
        required: true,
        description: `The language for the SDK to search for.`,
      },
      { name: 'query', type: 'string', required: true, description: `The query to search for.` },
      {
        name: 'detail',
        type: 'string',
        required: false,
        description: `The amount of detail to return.`,
      },
    ],
  },
]
