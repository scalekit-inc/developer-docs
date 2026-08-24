import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'deepwikimcp_ask_question',
    description: `Ask any question about a GitHub repository and get an AI-powered, context-grounded response.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The question to ask about the repository.`,
      },
      {
        name: 'repoName',
        type: 'string',
        required: true,
        description: `GitHub repository or list of repositories (max 10) in owner/repo format.`,
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
        description: `Optional tool version to use for tool execution`,
      },
    ],
  },
  {
    name: 'deepwikimcp_read_wiki_contents',
    description: `View documentation about a GitHub repository.`,
    params: [
      {
        name: 'repoName',
        type: 'string',
        required: true,
        description: `GitHub repository in owner/repo format (e.g. "facebook/react").`,
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
        description: `Optional tool version to use for tool execution`,
      },
    ],
  },
  {
    name: 'deepwikimcp_read_wiki_structure',
    description: `Get a list of documentation topics for a GitHub repository.`,
    params: [
      {
        name: 'repoName',
        type: 'string',
        required: true,
        description: `GitHub repository in owner/repo format (e.g. "facebook/react").`,
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
        description: `Optional tool version to use for tool execution`,
      },
    ],
  },
]
