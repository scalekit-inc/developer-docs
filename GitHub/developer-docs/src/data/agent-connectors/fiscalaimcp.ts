import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fiscalaimcp_api_docs',
    description: `Retrieve Fiscal.ai API documentation with TypeScript type definitions for all available functions.`,
    params: [],
  },
  {
    name: 'fiscalaimcp_execute_code',
    description: `Execute JavaScript code in a secure sandbox to call Fiscal.ai API functions via the codemode namespace and return results via console.log.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `Async arrow function to execute. Must be in async () => { ... } format using codemode.<function>() calls and console.log() for output.`,
      },
    ],
  },
]
