import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'netlifymcp_get_netlify_coding_context',
    description: `ALWAYS call when writing code. Required step before creating or editing any type of Netlify functions, SDK/library usage, etc. Returns up-to-date code patterns and guidance for the selected creation type.`,
    params: [
      {
        name: 'creationType',
        type: 'string',
        required: true,
        description: `The type of Netlify feature to get coding context for.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_deploy_services_reader',
    description: `Read Netlify deploy information. Supports operations: get-deploy (retrieve a deploy by ID), get-deploy-for-site (retrieve a specific deploy for a site).`,
    params: [
      {
        name: 'selectSchema',
        type: 'string',
        required: true,
        description: `Operation selector. Choose 'get-deploy' to retrieve a deploy by ID, or 'get-deploy-for-site' to retrieve a deploy for a specific site.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_deploy_services_updater',
    description: `Write operations for Netlify deployments. Supports operation: deploy-site (trigger a new deploy for an existing Netlify site).`,
    params: [
      {
        name: 'selectSchema',
        type: 'object',
        required: true,
        description: `Operation selector. Use operation='deploy-site' with a siteId to trigger a deploy.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_extension_services_reader',
    description: `Read Netlify extension information. Supports operations: get-extensions (list all available Netlify extensions), get-full-extension-details (retrieve detailed information about a specific extension for a team).`,
    params: [
      {
        name: 'selectSchema',
        type: 'string',
        required: true,
        description: `Operation selector. Use 'get-extensions' to list all extensions, or 'get-full-extension-details' with extensionSlug and teamId to get details for a specific extension.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_extension_services_updater',
    description: `Write operations for Netlify extensions. Supports operations: change-extension-installation (install or uninstall a Netlify extension for a team or site), initialize-database (initialize the Netlify database extension).`,
    params: [
      {
        name: 'selectSchema',
        type: 'string',
        required: true,
        description: `Operation selector. Use 'change-extension-installation' to install or uninstall an extension, or 'initialize-database' to set up the Netlify database extension.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_project_services_reader',
    description: `Read Netlify project/site information. Supports operations: get-project (get a site by ID), get-projects (list sites, optionally filtered by team or name), get-forms-for-project (get forms for a site).`,
    params: [
      {
        name: 'selectSchema',
        type: 'string',
        required: true,
        description: `Operation selector. Choose 'get-project', 'get-projects', or 'get-forms-for-project'.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_project_services_updater',
    description: `Write operations for Netlify projects/sites. Supports operations: update-visitor-access-controls (set password or SSO login requirements), update-forms (enable or disable Netlify Forms), manage-form-submissions (list or delete form submissions), update-project-name (rename a site), manage-env-vars (get, set, or delete environment variables), create-new-project (create a new Netlify site).`,
    params: [
      {
        name: 'selectSchema',
        type: 'string',
        required: true,
        description: `Operation selector. Choose one of: update-visitor-access-controls, update-forms, manage-form-submissions, update-project-name, manage-env-vars, create-new-project.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_team_services_reader',
    description: `Read Netlify team information. Supports operations: get-teams (list all teams for the current user), get-team (retrieve a specific team by ID).`,
    params: [
      {
        name: 'selectSchema',
        type: 'string',
        required: true,
        description: `Operation selector. Use 'get-teams' to list all teams, or 'get-team' with a teamId to get a specific team.`,
      },
    ],
  },
  {
    name: 'netlifymcp_netlify_user_services_reader',
    description: `Read Netlify user information. Supports operation: get-user (returns the currently authenticated user's profile).`,
    params: [
      {
        name: 'selectSchema',
        type: 'object',
        required: true,
        description: `Operation selector. Set operation to 'get-user' to retrieve the current user's profile.`,
      },
    ],
  },
]
