import type { RegistryTool } from '@scalekit/agentkit'
import { classifyQuery, type TopicSlug } from '../lib/classify-query.js'
import { fetchCustomSet } from '../lib/fetch-custom-set.js'

export const searchDocsTool: RegistryTool = {
  definition: {
    name: 'search_docs',
    description:
      'Use this tool to search Scalekit documentation and answer questions. ' +
      'Always call this tool before answering any question about Scalekit products ' +
      '(FSA, SSO, SCIM, Agent Auth, MCP, M2M, SDK). ' +
      'Returns the relevant documentation content as context.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The user question to search for in the docs',
        },
        topic: {
          type: 'string',
          enum: ['fsa', 'sso', 'scim', 'agent-auth', 'mcp', 'm2m', 'sdk', 'quickstart'],
          description:
            'Optional topic override. If omitted, the topic is auto-detected from the query.',
        },
      },
      required: ['query'],
    },
  },
  execute: async (args) => {
    const { query, topic } = args as { query: string; topic?: TopicSlug }
    const resolvedTopic = topic ?? classifyQuery(query)
    const content = await fetchCustomSet(resolvedTopic)
    return content
  },
  requiresConfirmation: false,
}
