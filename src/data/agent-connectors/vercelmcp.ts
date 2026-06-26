import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'vercelmcp_addtoolbarreaction',
    description: `Add an emoji reaction to a message in a toolbar thread`,
    params: [
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji character to use as the reaction (e.g. '👍', '❤️')`,
      },
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The ID of the message to react to`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread containing the message`,
      },
    ],
  },
  {
    name: 'vercelmcp_changetoolbarthreadresolvestatus',
    description: `Change the resolve status of a toolbar thread`,
    params: [
      {
        name: 'resolved',
        type: 'boolean',
        required: true,
        description: `Set to true to mark the thread as resolved, false to mark it as unresolved`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread to update`,
      },
    ],
  },
  {
    name: 'vercelmcp_checkdomainavailabilityandprice',
    description: `Check if domain names are available for purchase and get pricing information`,
    params: [
      {
        name: 'names',
        type: 'array',
        required: true,
        description: `List of domain names to check for availability and pricing`,
      },
    ],
  },
  {
    name: 'vercelmcp_deploytovercel',
    description: `Deploy the current project to Vercel`,
    params: [],
  },
  {
    name: 'vercelmcp_edittoolbarmessage',
    description: `Edit an existing message in a toolbar thread`,
    params: [
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `The updated message content in Markdown format`,
      },
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The ID of the message to edit`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread containing the message`,
      },
    ],
  },
  {
    name: 'vercelmcp_getaccesstovercelurl',
    description: `Creates a temporary shareable link that bypasses authentication for a Vercel deployment URL`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The Vercel deployment URL to create a temporary shareable access link for`,
      },
    ],
  },
  {
    name: 'vercelmcp_getdeployment',
    description: `Get a specific deployment by ID or URL`,
    params: [
      {
        name: 'idOrUrl',
        type: 'string',
        required: true,
        description: `The deployment ID or URL to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the deployment`,
      },
    ],
  },
  {
    name: 'vercelmcp_getdeploymentbuildlogs',
    description: `Get the build logs of a deployment by deployment ID or URL`,
    params: [
      {
        name: 'idOrUrl',
        type: 'string',
        required: true,
        description: `The deployment ID or URL whose build logs to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the deployment`,
      },
    ],
  },
  {
    name: 'vercelmcp_getproject',
    description: `Get a specific project in Vercel`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the project`,
      },
    ],
  },
  {
    name: 'vercelmcp_getruntimelogs',
    description: `Get runtime logs for a project or deployment`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project whose runtime logs to retrieve`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the project`,
      },
      {
        name: 'deploymentId',
        type: 'string',
        required: false,
        description: `Optional deployment ID to filter runtime logs to a specific deployment`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of log entries to return`,
      },
    ],
  },
  {
    name: 'vercelmcp_gettoolbarthread',
    description: `Get a specific toolbar thread by ID`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread to retrieve`,
      },
    ],
  },
  {
    name: 'vercelmcp_importclaudedesignfromurl',
    description: `Import a design into Vercel from a publicly fetchable URL`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team to import the design into`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The publicly fetchable URL of the design to import`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project to associate the design with (optional)`,
      },
    ],
  },
  {
    name: 'vercelmcp_listdeployments',
    description: `List all deployments for a project`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project whose deployments to list`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the project`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of deployments to return`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter deployments by state (e.g. READY, ERROR, BUILDING, QUEUED, CANCELED)`,
      },
    ],
  },
  {
    name: 'vercelmcp_listprojects',
    description: `List all Vercel projects for a user (with a max of 50)`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team whose projects to list`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of projects to return (max 50)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query to filter projects by name`,
      },
    ],
  },
  {
    name: 'vercelmcp_listteams',
    description: `List the user's teams`,
    params: [],
  },
  {
    name: 'vercelmcp_listtoolbarthreads',
    description: `List Vercel toolbar comment threads for a team`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team whose toolbar threads to list`,
      },
      {
        name: 'deploymentId',
        type: 'string',
        required: false,
        description: `Filter threads by deployment ID (optional)`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `Filter threads by project ID (optional)`,
      },
    ],
  },
  {
    name: 'vercelmcp_replytotoolbarthread',
    description: `Add a reply message to an existing toolbar thread`,
    params: [
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `The reply message content in Markdown format`,
      },
      {
        name: 'teamId',
        type: 'string',
        required: true,
        description: `The ID of the team that owns the thread`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `The ID of the toolbar thread to reply to`,
      },
    ],
  },
  {
    name: 'vercelmcp_searchverceldocumentation',
    description: `Search the Vercel documentation for information about a topic`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `The topic or query to search for in the Vercel documentation`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of documentation results to return`,
      },
    ],
  },
  {
    name: 'vercelmcp_webfetchvercelurl',
    description: `Fetches a Vercel deployment URL and returns the response body`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The Vercel deployment URL to fetch`,
      },
    ],
  },
]
