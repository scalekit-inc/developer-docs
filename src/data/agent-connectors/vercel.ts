import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'vercel_alias_create',
    description: `Assigns an alias (custom domain) to a Vercel deployment.`,
    params: [
      {
        name: 'alias',
        type: 'string',
        required: true,
        description: `The alias hostname to assign.`,
      },
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to assign the alias to.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_alias_delete',
    description: `Removes an alias from a Vercel deployment.`,
    params: [
      {
        name: 'alias_or_id',
        type: 'string',
        required: true,
        description: `The alias hostname or ID to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the alias belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_alias_get',
    description: `Returns information about a specific alias by its ID or hostname.`,
    params: [
      {
        name: 'alias_or_id',
        type: 'string',
        required: true,
        description: `The alias hostname or ID.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the alias belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_aliases_list',
    description: `Returns all aliases for the authenticated user or team, with optional domain and deployment filtering.`,
    params: [
      { name: 'domain', type: 'string', required: false, description: `Filter aliases by domain.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of aliases to return.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `Timestamp in ms for pagination.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to list aliases for.`,
      },
    ],
  },
  {
    name: 'vercel_check_create',
    description: `Creates a new check on a Vercel deployment. Used by integrations to report status of external checks like test suites or audits.`,
    params: [
      {
        name: 'blocking',
        type: 'boolean',
        required: true,
        description: `If true, this check must pass before deployment is considered ready.`,
      },
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to create a check for.`,
      },
      { name: 'name', type: 'string', required: true, description: `Display name for the check.` },
      {
        name: 'detailsUrl',
        type: 'string',
        required: false,
        description: `URL where users can view check details.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_check_update',
    description: `Updates the status and conclusion of a deployment check. Used to report check results back to Vercel.`,
    params: [
      { name: 'check_id', type: 'string', required: true, description: `The check ID to update.` },
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID the check belongs to.`,
      },
      {
        name: 'conclusion',
        type: 'string',
        required: false,
        description: `Check conclusion: succeeded, failed, skipped, canceled.`,
      },
      {
        name: 'detailsUrl',
        type: 'string',
        required: false,
        description: `URL where users can view check details.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Check status: running, completed.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_checks_list',
    description: `Returns all checks attached to a Vercel deployment (e.g. from third-party integrations).`,
    params: [
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to list checks for.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_deployment_aliases_list',
    description: `Returns all aliases assigned to a specific Vercel deployment.`,
    params: [
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to get aliases for.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_deployment_cancel',
    description: `Cancels a Vercel deployment that is currently building or queued.`,
    params: [
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to cancel.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_deployment_create',
    description: `Creates a new Vercel deployment for a project, optionally from a Git ref or with inline files.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The project name to deploy.` },
      {
        name: 'git_source',
        type: 'string',
        required: false,
        description: `JSON object with Git source info, e.g. {"type":"github","ref":"main","repoId":"123"}.`,
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: `Deployment target: production or preview. Default is preview.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if deploying to a team project.`,
      },
    ],
  },
  {
    name: 'vercel_deployment_delete',
    description: `Deletes a Vercel deployment by its ID.`,
    params: [
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_deployment_events_list',
    description: `Returns build log events for a Vercel deployment. Useful for debugging build errors.`,
    params: [
      {
        name: 'deployment_id',
        type: 'string',
        required: true,
        description: `The deployment ID to get events for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of log events to return.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `Timestamp in ms to fetch events after.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_deployment_get',
    description: `Returns details of a specific Vercel deployment by its ID or URL, including build status, target, and metadata.`,
    params: [
      {
        name: 'id_or_url',
        type: 'string',
        required: true,
        description: `The deployment ID (dpl_xxx) or deployment URL.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the deployment belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_deployments_list',
    description: `Returns a list of deployments for the authenticated user or a specific project/team, with filtering and pagination.`,
    params: [
      {
        name: 'from',
        type: 'integer',
        required: false,
        description: `Timestamp in ms for pagination cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of deployments to return.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Filter deployments by project ID or name.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter by deployment state: BUILDING, ERROR, INITIALIZING, QUEUED, READY, CANCELED.`,
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: `Filter by target environment: production or preview.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Filter deployments by team ID.`,
      },
    ],
  },
  {
    name: 'vercel_dns_record_create',
    description: `Creates a new DNS record for a domain managed by Vercel. Supports A, AAAA, CNAME, TXT, MX, SRV, and CAA records.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain to create the DNS record for.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Subdomain name, or empty string for root domain.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Record type: A, AAAA, CNAME, TXT, MX, SRV, CAA.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The record value (IP address, hostname, text, etc.).`,
      },
      {
        name: 'mx_priority',
        type: 'integer',
        required: false,
        description: `Priority for MX records.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the domain belongs to a team.`,
      },
      {
        name: 'ttl',
        type: 'integer',
        required: false,
        description: `Time-to-live in seconds. Default is 60.`,
      },
    ],
  },
  {
    name: 'vercel_dns_record_delete',
    description: `Deletes a DNS record from a domain managed by Vercel.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain the DNS record belongs to.`,
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: `The ID of the DNS record to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the domain belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_dns_records_list',
    description: `Returns all DNS records for a domain managed by Vercel.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain to list DNS records for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `Timestamp in ms for pagination.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the domain belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_domain_add',
    description: `Adds a domain to the authenticated user or team's Vercel account.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The domain name to add.` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to add the domain to.`,
      },
    ],
  },
  {
    name: 'vercel_domain_delete',
    description: `Removes a domain from the authenticated user or team's Vercel account.`,
    params: [
      { name: 'domain', type: 'string', required: true, description: `The domain name to delete.` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the domain belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_domain_get',
    description: `Returns information about a specific domain including verification status, nameservers, and registrar.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain name to look up.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the domain belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_domains_list',
    description: `Returns all domains registered or added to the authenticated user or team's Vercel account.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of domains to return.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `Timestamp in ms for pagination.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to list domains for.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_create',
    description: `Creates a new Edge Config store for storing read-only configuration data close to users at the edge.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `A unique slug for the Edge Config store.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to create the Edge Config under.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_delete',
    description: `Permanently deletes an Edge Config store and all its items.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_get',
    description: `Returns details of a specific Edge Config store by its ID.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_item_get',
    description: `Returns the value of a specific item from an Edge Config store by key.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'item_key',
        type: 'string',
        required: true,
        description: `The key of the item to retrieve.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_items_list',
    description: `Returns all key-value items stored in an Edge Config store.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_items_update',
    description: `Creates, updates, or deletes items in an Edge Config store using a list of patch operations.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'items',
        type: 'string',
        required: true,
        description: `JSON array of patch operations. Each item has 'operation' (create/update/upsert/delete), 'key', and optionally 'value'.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_token_create',
    description: `Creates a new read token for an Edge Config store to be used in application code.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `A descriptive label for the token.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_tokens_delete',
    description: `Deletes one or more read tokens from an Edge Config store.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'tokens',
        type: 'string',
        required: true,
        description: `JSON array of token IDs to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_config_tokens_list',
    description: `Returns all read tokens for an Edge Config store.`,
    params: [
      {
        name: 'edge_config_id',
        type: 'string',
        required: true,
        description: `The Edge Config store ID.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the Edge Config belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_edge_configs_list',
    description: `Returns all Edge Config stores for the authenticated user or team.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to list Edge Configs for.`,
      },
    ],
  },
  {
    name: 'vercel_env_var_create',
    description: `Creates a new environment variable for a Vercel project with the specified key, value, and target environments.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      { name: 'key', type: 'string', required: true, description: `The environment variable key.` },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The environment variable value.`,
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: `JSON array of targets: production, preview, development. Defaults to all.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Variable type: plain or secret. Default is plain.`,
      },
    ],
  },
  {
    name: 'vercel_env_var_delete',
    description: `Deletes an environment variable from a Vercel project.`,
    params: [
      {
        name: 'env_id',
        type: 'string',
        required: true,
        description: `The environment variable ID to delete.`,
      },
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_env_var_update',
    description: `Updates an existing environment variable for a Vercel project.`,
    params: [
      {
        name: 'env_id',
        type: 'string',
        required: true,
        description: `The environment variable ID to update.`,
      },
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'target',
        type: 'string',
        required: false,
        description: `JSON array of new targets: production, preview, development.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `New value for the environment variable.`,
      },
    ],
  },
  {
    name: 'vercel_env_vars_list',
    description: `Returns all environment variables for a Vercel project, including their targets (production, preview, development) and encryption status.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'decrypt',
        type: 'boolean',
        required: false,
        description: `If true, returns decrypted values for sensitive variables.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_project_create',
    description: `Creates a new Vercel project with a given name, framework, and optional Git repository.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the project.` },
      {
        name: 'framework',
        type: 'string',
        required: false,
        description: `Framework preset, e.g. nextjs, vite, gatsby, nuxtjs, create-react-app.`,
      },
      {
        name: 'git_repository',
        type: 'string',
        required: false,
        description: `JSON object with 'type' (github/gitlab/bitbucket) and 'repo' (owner/name) fields.`,
      },
      {
        name: 'root_directory',
        type: 'string',
        required: false,
        description: `Root directory of the project within the repository.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to create the project under.`,
      },
    ],
  },
  {
    name: 'vercel_project_delete',
    description: `Permanently deletes a Vercel project and all its deployments, domains, and environment variables.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_project_domain_add',
    description: `Assigns a domain to a Vercel project with an optional redirect target.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to assign to the project.`,
      },
      {
        name: 'git_branch',
        type: 'string',
        required: false,
        description: `Git branch to associate this domain with for preview deployments.`,
      },
      {
        name: 'redirect',
        type: 'string',
        required: false,
        description: `Redirect target domain if this domain should redirect.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_project_domain_delete',
    description: `Removes a domain assignment from a Vercel project.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain name to remove from the project.`,
      },
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_project_domains_list',
    description: `Returns all domains assigned to a specific Vercel project.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'production',
        type: 'boolean',
        required: false,
        description: `Filter to production domains only.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_project_get',
    description: `Returns details of a specific Vercel project including its framework, Git repository, environment variables summary, and domains.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_project_update',
    description: `Updates a Vercel project's name, framework, build command, output directory, or other settings.`,
    params: [
      {
        name: 'id_or_name',
        type: 'string',
        required: true,
        description: `The project ID or name to update.`,
      },
      {
        name: 'build_command',
        type: 'string',
        required: false,
        description: `Custom build command override.`,
      },
      {
        name: 'framework',
        type: 'string',
        required: false,
        description: `Framework preset to apply.`,
      },
      {
        name: 'install_command',
        type: 'string',
        required: false,
        description: `Custom install command override.`,
      },
      { name: 'name', type: 'string', required: false, description: `New project name.` },
      {
        name: 'output_directory',
        type: 'string',
        required: false,
        description: `Custom output directory override.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the project belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_projects_list',
    description: `Returns all projects for the authenticated user or team, with optional search and pagination.`,
    params: [
      {
        name: 'from',
        type: 'integer',
        required: false,
        description: `Timestamp in ms for pagination cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of projects to return.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter projects by name search query.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to list projects for. Omit for personal projects.`,
      },
    ],
  },
  {
    name: 'vercel_team_create',
    description: `Creates a new Vercel team with the specified slug and optional name.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `A unique URL-friendly identifier for the team.`,
      },
      { name: 'name', type: 'string', required: false, description: `Display name for the team.` },
    ],
  },
  {
    name: 'vercel_team_delete',
    description: `Permanently deletes a Vercel team and all its associated resources.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The team ID or slug to delete.`,
      },
    ],
  },
  {
    name: 'vercel_team_get',
    description: `Returns details of a specific Vercel team by its ID or slug.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The team ID or slug.` },
    ],
  },
  {
    name: 'vercel_team_member_invite',
    description: `Invites a user to a Vercel team by email address with a specified role.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address of the user to invite.`,
      },
      { name: 'team_id', type: 'string', required: true, description: `The team ID or slug.` },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Role to assign: OWNER, MEMBER, VIEWER, DEVELOPER, BILLING.`,
      },
    ],
  },
  {
    name: 'vercel_team_member_remove',
    description: `Removes a member from a Vercel team by their user ID.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The team ID or slug.` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The user ID of the member to remove.`,
      },
    ],
  },
  {
    name: 'vercel_team_members_list',
    description: `Returns all members of a Vercel team including their roles and join dates.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The team ID or slug.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Filter by role: OWNER, MEMBER, VIEWER, DEVELOPER, BILLING.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `Timestamp in ms to fetch members joined after this time.`,
      },
    ],
  },
  {
    name: 'vercel_team_update',
    description: `Updates a Vercel team's name, slug, description, or other settings.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `The team ID or slug to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the team.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the team.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `New URL-friendly slug for the team.`,
      },
    ],
  },
  {
    name: 'vercel_teams_list',
    description: `Returns all teams the authenticated user belongs to, with pagination support.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of teams to return.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `Timestamp in milliseconds to fetch teams created after this time.`,
      },
      {
        name: 'until',
        type: 'integer',
        required: false,
        description: `Timestamp in milliseconds to fetch teams created before this time.`,
      },
    ],
  },
  {
    name: 'vercel_user_get',
    description: `Returns the authenticated user's profile including name, email, username, and account details.`,
    params: [],
  },
  {
    name: 'vercel_webhook_create',
    description: `Creates a new webhook that sends event notifications to the specified URL for Vercel deployment and project events.`,
    params: [
      {
        name: 'events',
        type: 'string',
        required: true,
        description: `JSON array of event types to subscribe to, e.g. ["deployment.created","deployment.succeeded"].`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS endpoint URL to receive webhook payloads.`,
      },
      {
        name: 'project_ids',
        type: 'string',
        required: false,
        description: `JSON array of project IDs to scope this webhook to. Omit for all projects.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to create the webhook for.`,
      },
    ],
  },
  {
    name: 'vercel_webhook_delete',
    description: `Permanently deletes a Vercel webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The webhook ID to delete.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the webhook belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_webhook_get',
    description: `Returns details of a specific Vercel webhook by its ID.`,
    params: [
      { name: 'webhook_id', type: 'string', required: true, description: `The webhook ID.` },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID if the webhook belongs to a team.`,
      },
    ],
  },
  {
    name: 'vercel_webhooks_list',
    description: `Returns all webhooks configured for the authenticated user or team.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to list webhooks for.`,
      },
    ],
  },
]
