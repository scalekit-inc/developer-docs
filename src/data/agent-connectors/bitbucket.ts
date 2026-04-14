import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'bitbucket_branch_create',
    description: `Creates a new branch in a Bitbucket repository from a specified commit hash or branch.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new branch.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'target_hash',
        type: 'string',
        required: true,
        description: `The commit hash to create the branch from.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_delete',
    description: `Deletes a branch from a Bitbucket repository.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The branch name to delete.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_get',
    description: `Returns details of a specific branch in a Bitbucket repository.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The branch name.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_restriction_create',
    description: `Creates a branch permission rule for a repository.`,
    params: [
      {
        name: 'kind',
        type: 'string',
        required: true,
        description: `Restriction type: require_tasks_to_be_completed, require_approvals_to_merge, require_default_reviewer_approvals_to_merge, require_no_changes_requested, require_commits_behind, require_passing_builds_to_merge, reset_pullrequest_approvals_on_change, push, restrict_merges, force, delete, enforce_merge_checks.`,
      },
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `Branch name or glob pattern to restrict, e.g. 'main' or 'release/*'.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'groups',
        type: 'string',
        required: false,
        description: `List of group slugs to exempt from the restriction.`,
      },
      {
        name: 'users',
        type: 'string',
        required: false,
        description: `List of user account IDs to exempt from the restriction.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Numeric value for count-based restrictions (e.g. required approvals).`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_restriction_delete',
    description: `Deletes a branch permission rule.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the branch restriction.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_restriction_get',
    description: `Returns a specific branch permission rule by ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the branch restriction.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_restriction_update',
    description: `Updates a branch permission rule.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the branch restriction.`,
      },
      {
        name: 'kind',
        type: 'string',
        required: true,
        description: `Restriction type (see Create Branch Restriction for valid values).`,
      },
      {
        name: 'pattern',
        type: 'string',
        required: true,
        description: `Branch name or glob pattern.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Numeric value for count-based restrictions.`,
      },
    ],
  },
  {
    name: 'bitbucket_branch_restrictions_list',
    description: `Lists branch permission rules for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branches_list',
    description: `Returns all branches in a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Query to filter branches, e.g. name~"feature".`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field, e.g. -target.date for newest first.`,
      },
    ],
  },
  {
    name: 'bitbucket_branching_model_get',
    description: `Returns the effective branching model for a repository (e.g. Gitflow config).`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branching_model_settings_get',
    description: `Returns the branching model configuration settings for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_branching_model_settings_update',
    description: `Updates the branching model configuration settings for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'development_branch',
        type: 'string',
        required: false,
        description: `Name of the development branch.`,
      },
      {
        name: 'production_branch',
        type: 'string',
        required: false,
        description: `Name of the production branch.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_approve',
    description: `Approves a specific commit in a Bitbucket repository.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_build_status_create',
    description: `Creates or updates a build status for a specific commit (used to report CI/CD results).`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique identifier for the build (e.g. CI pipeline name).`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'state',
        type: 'string',
        required: true,
        description: `Build state: SUCCESSFUL, FAILED, INPROGRESS, STOPPED.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL linking to the build result.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the build result.`,
      },
      { name: 'name', type: 'string', required: false, description: `Display name for the build.` },
    ],
  },
  {
    name: 'bitbucket_commit_build_status_get',
    description: `Returns the build status for a specific commit and build key.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique identifier for the build.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_build_status_update',
    description: `Updates an existing build status for a specific commit and key.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique identifier for the build.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'state',
        type: 'string',
        required: true,
        description: `Build state: SUCCESSFUL, FAILED, INPROGRESS, STOPPED.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL linking to the build result.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the build result.`,
      },
      { name: 'name', type: 'string', required: false, description: `Display name for the build.` },
    ],
  },
  {
    name: 'bitbucket_commit_comment_create',
    description: `Creates a new comment on a specific commit in a Bitbucket repository.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The comment text (Markdown supported).`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_comment_delete',
    description: `Deletes a specific comment on a commit.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the comment.`,
      },
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_comment_get',
    description: `Returns a specific comment on a commit.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the comment.`,
      },
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_comment_update',
    description: `Updates an existing comment on a commit.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the comment.`,
      },
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Updated comment text (Markdown supported).`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_comments_list',
    description: `Lists all comments on a specific commit in a Bitbucket repository.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_get',
    description: `Returns details of a specific commit including author, message, date, and diff stats.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_statuses_list',
    description: `Lists all statuses (build results) for a specific commit.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commit_unapprove',
    description: `Removes an approval from a specific commit.`,
    params: [
      { name: 'commit', type: 'string', required: true, description: `The commit hash.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_commits_list',
    description: `Returns a list of commits for a repository, optionally filtered by branch.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Branch or tag name to list commits for.`,
      },
    ],
  },
  {
    name: 'bitbucket_component_get',
    description: `Returns a specific component by ID from the issue tracker.`,
    params: [
      {
        name: 'component_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the component.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_components_list',
    description: `Lists all components defined for a repository's issue tracker.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_default_reviewer_add',
    description: `Adds a user as a default reviewer for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The user's account ID or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_default_reviewer_get',
    description: `Checks if a user is a default reviewer for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The user's account ID or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_default_reviewer_remove',
    description: `Removes a user from the default reviewers for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The user's account ID or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_default_reviewers_list',
    description: `Lists all default reviewers for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deploy_key_create',
    description: `Adds a new deploy key (SSH public key) to a Bitbucket repository for read-only or read-write access.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `The SSH public key string.` },
      {
        name: 'label',
        type: 'string',
        required: true,
        description: `A human-readable label for the deploy key.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deploy_key_delete',
    description: `Removes a deploy key from a Bitbucket repository.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The integer ID of the deploy key to delete.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deploy_keys_list',
    description: `Returns a list of deploy keys (SSH keys) configured on a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deployment_get',
    description: `Returns a specific deployment by UUID.`,
    params: [
      {
        name: 'deployment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the deployment.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deployment_variable_create',
    description: `Creates a new variable for a deployment environment.`,
    params: [
      {
        name: 'environment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the environment.`,
      },
      { name: 'key', type: 'string', required: true, description: `Variable name.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'value', type: 'string', required: true, description: `Variable value.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'secured',
        type: 'string',
        required: false,
        description: `Whether the variable is secret (masked in logs).`,
      },
    ],
  },
  {
    name: 'bitbucket_deployment_variable_delete',
    description: `Deletes a variable from a deployment environment.`,
    params: [
      {
        name: 'environment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the environment.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the variable.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deployment_variable_update',
    description: `Updates an existing variable for a deployment environment.`,
    params: [
      {
        name: 'environment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the environment.`,
      },
      { name: 'key', type: 'string', required: true, description: `Variable name.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'value', type: 'string', required: true, description: `Variable value.` },
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the variable.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'secured',
        type: 'string',
        required: false,
        description: `Whether the variable is secret.`,
      },
    ],
  },
  {
    name: 'bitbucket_deployment_variables_list',
    description: `Lists all variables for a deployment environment.`,
    params: [
      {
        name: 'environment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the environment.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_deployments_list',
    description: `Lists all deployments for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_diff_get',
    description: `Returns a JSON summary of file changes (diffstat) for a given commit spec (e.g. commit hash, branch..branch). Shows which files were added, modified, or deleted with line counts.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'spec',
        type: 'string',
        required: true,
        description: `Diff spec in the form of 'hash1..hash2' or 'branch1..branch2'.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Limit diff to a specific file path.`,
      },
    ],
  },
  {
    name: 'bitbucket_diffstat_get',
    description: `Returns the diff stats between two commits or a branch/commit spec in a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'spec',
        type: 'string',
        required: true,
        description: `Revision spec e.g. 'main..feature' or commit SHA.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_download_delete',
    description: `Deletes a specific download artifact from a repository.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The filename of the download artifact.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_downloads_list',
    description: `Lists all download artifacts for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_environment_create',
    description: `Creates a new deployment environment for a repository.`,
    params: [
      {
        name: 'environment_type',
        type: 'string',
        required: true,
        description: `Type: Test, Staging, or Production.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the environment.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_environment_delete',
    description: `Deletes a deployment environment by UUID.`,
    params: [
      {
        name: 'environment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the environment.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_environment_get',
    description: `Returns a specific deployment environment by UUID.`,
    params: [
      {
        name: 'environment_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the environment.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_environments_list',
    description: `Lists all deployment environments for a repository (e.g. Test, Staging, Production).`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_file_history_list',
    description: `Lists the commits that modified a specific file path.`,
    params: [
      {
        name: 'commit',
        type: 'string',
        required: true,
        description: `The commit hash or branch name.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `Path to the file in the repository.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_comment_create',
    description: `Posts a new comment on a Bitbucket issue.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The comment text (Markdown supported).`,
      },
      {
        name: 'issue_id',
        type: 'integer',
        required: true,
        description: `The issue ID to comment on.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_comment_delete',
    description: `Deletes a specific comment on an issue.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the comment.`,
      },
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_comment_update',
    description: `Updates an existing comment on an issue.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the comment.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Updated comment text (Markdown).`,
      },
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_comments_list',
    description: `Returns all comments on a Bitbucket issue.`,
    params: [
      { name: 'issue_id', type: 'integer', required: true, description: `The issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_create',
    description: `Creates a new issue in a Bitbucket repository's issue tracker.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'title', type: 'string', required: true, description: `Title of the issue.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'assignee_account_id',
        type: 'string',
        required: false,
        description: `Account ID of the assignee.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Description/body of the issue (Markdown supported).`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Issue kind: bug, enhancement, proposal, or task.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority: trivial, minor, major, critical, or blocker.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_delete',
    description: `Deletes an issue from a Bitbucket repository's issue tracker.`,
    params: [
      { name: 'issue_id', type: 'integer', required: true, description: `The issue ID to delete.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_get',
    description: `Returns details of a specific issue in a Bitbucket repository.`,
    params: [
      { name: 'issue_id', type: 'integer', required: true, description: `The issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_unvote',
    description: `Removes a vote from an issue.`,
    params: [
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_unwatch',
    description: `Stops watching an issue.`,
    params: [
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_update',
    description: `Updates an existing issue in a Bitbucket repository.`,
    params: [
      { name: 'issue_id', type: 'integer', required: true, description: `The issue ID to update.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New content/body for the issue.`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Issue kind: bug, enhancement, proposal, or task.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority: trivial, minor, major, critical, or blocker.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Issue status: new, open, resolved, on hold, invalid, duplicate, or wontfix.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the issue.` },
    ],
  },
  {
    name: 'bitbucket_issue_vote',
    description: `Casts a vote for an issue.`,
    params: [
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_vote_get',
    description: `Checks if the authenticated user has voted for an issue.`,
    params: [
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_watch',
    description: `Starts watching an issue to receive notifications.`,
    params: [
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issue_watch_get',
    description: `Checks if the authenticated user is watching an issue.`,
    params: [
      { name: 'issue_id', type: 'string', required: true, description: `The numeric issue ID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_issues_list',
    description: `Returns all issues in a Bitbucket repository's issue tracker.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Filter query, e.g. status="open" AND priority="major".`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field, e.g. -updated_on.`,
      },
    ],
  },
  {
    name: 'bitbucket_merge_base_get',
    description: `Returns the common ancestor (merge base) between two commits.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'revspec',
        type: 'string',
        required: true,
        description: `Two commits separated by '..', e.g. 'abc123..def456'.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_milestone_get',
    description: `Returns a specific milestone by ID from the issue tracker.`,
    params: [
      {
        name: 'milestone_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the milestone.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_milestones_list',
    description: `Lists all milestones defined for a repository's issue tracker.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_get',
    description: `Returns details of a specific Bitbucket pipeline run by its UUID.`,
    params: [
      { name: 'pipeline_uuid', type: 'string', required: true, description: `The pipeline UUID.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_schedule_create',
    description: `Creates a new pipeline schedule for a repository.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `Branch to run the pipeline on.`,
      },
      {
        name: 'cron_expression',
        type: 'string',
        required: true,
        description: `Cron schedule expression (e.g. '0 0 * * *' for daily midnight).`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'enabled',
        type: 'string',
        required: false,
        description: `Whether the schedule is active.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_schedule_delete',
    description: `Deletes a pipeline schedule.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'schedule_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the schedule.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_schedule_get',
    description: `Returns a specific pipeline schedule by UUID.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'schedule_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the schedule.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_schedule_update',
    description: `Updates a pipeline schedule.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'schedule_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the schedule.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'cron_expression',
        type: 'string',
        required: false,
        description: `Updated cron expression.`,
      },
      {
        name: 'enabled',
        type: 'string',
        required: false,
        description: `Whether the schedule is active.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_schedules_list',
    description: `Lists all pipeline schedules for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_step_log_get',
    description: `Retrieves the log output for a specific step of a Bitbucket pipeline run.`,
    params: [
      {
        name: 'pipeline_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'step_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline step.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_steps_list',
    description: `Returns a list of steps for a specific Bitbucket pipeline run.`,
    params: [
      {
        name: 'pipeline_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_stop',
    description: `Stops a running Bitbucket pipeline by sending a stop request to the specified pipeline UUID.`,
    params: [
      {
        name: 'pipeline_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline to stop.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_trigger',
    description: `Triggers a new Bitbucket pipeline run for a specific branch, tag, or commit.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Branch name to run the pipeline on.`,
      },
      {
        name: 'commit_hash',
        type: 'string',
        required: false,
        description: `Specific commit hash to run the pipeline on.`,
      },
      {
        name: 'pipeline_name',
        type: 'string',
        required: false,
        description: `Custom pipeline name defined in bitbucket-pipelines.yml.`,
      },
      {
        name: 'variables',
        type: 'string',
        required: false,
        description: `JSON array of pipeline variables, e.g. [{"key":"ENV","value":"prod"}].`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_variable_create',
    description: `Creates a new pipeline variable for a Bitbucket repository.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `The variable name/key.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'value', type: 'string', required: true, description: `The variable value.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'secured',
        type: 'boolean',
        required: false,
        description: `If true, the variable value is masked in logs.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_variable_delete',
    description: `Deletes a pipeline variable from a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline variable to delete.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_variable_update',
    description: `Updates an existing pipeline variable for a Bitbucket repository.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `The new variable name/key.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'value', type: 'string', required: true, description: `The new variable value.` },
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline variable to update.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'secured',
        type: 'boolean',
        required: false,
        description: `If true, the variable value is masked in logs.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipeline_variables_list',
    description: `Returns a list of pipeline variables defined for the repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pipelines_list',
    description: `Returns pipeline runs for a Bitbucket repository, optionally filtered by status or branch.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field, e.g. -created_on for newest first.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_activity_list',
    description: `Lists all activity (comments, approvals, updates) for a specific pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_approve',
    description: `Approves a pull request on behalf of the authenticated user.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID to approve.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_comment_create',
    description: `Posts a new comment on a pull request.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The comment text (Markdown supported).`,
      },
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_comment_delete',
    description: `Deletes a comment from a pull request.`,
    params: [
      {
        name: 'comment_id',
        type: 'integer',
        required: true,
        description: `The comment ID to delete.`,
      },
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_comments_list',
    description: `Returns all comments on a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_commits_list',
    description: `Returns all commits included in a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_create',
    description: `Creates a new pull request in a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'source_branch', type: 'string', required: true, description: `Source branch name.` },
      { name: 'title', type: 'string', required: true, description: `Title of the pull request.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'close_source_branch',
        type: 'boolean',
        required: false,
        description: `Whether to close the source branch after merge.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the pull request.`,
      },
      {
        name: 'destination_branch',
        type: 'string',
        required: false,
        description: `Destination branch to merge into.`,
      },
      {
        name: 'reviewers',
        type: 'string',
        required: false,
        description: `JSON array of reviewer account UUIDs, e.g. [{"uuid":"{account-uuid}"}].`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_decline',
    description: `Declines (rejects) an open pull request in a Bitbucket repository.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID to decline.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_diffstat_get',
    description: `Returns a JSON diffstat for a pull request given the source and destination commit hashes. Get these from bitbucket_pull_request_get (source.commit.hash and destination.commit.hash).`,
    params: [
      {
        name: 'dest_commit',
        type: 'string',
        required: true,
        description: `Destination commit hash from the pull request (destination.commit.hash).`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'source_commit',
        type: 'string',
        required: true,
        description: `Source commit hash from the pull request (source.commit.hash).`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'pull_request_id',
        type: 'string',
        required: false,
        description: `The numeric pull request ID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_get',
    description: `Returns details of a specific pull request including title, description, source/destination branches, state, and reviewers.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_merge',
    description: `Merges a pull request in a Bitbucket repository.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID to merge.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'close_source_branch',
        type: 'boolean',
        required: false,
        description: `Whether to close the source branch after merge.`,
      },
      {
        name: 'merge_strategy',
        type: 'string',
        required: false,
        description: `Merge strategy: merge_commit, squash, or fast_forward.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Custom commit message for the merge commit.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_remove_request_changes',
    description: `Removes a change request from a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_request_changes',
    description: `Requests changes on a pull request, blocking it from merging until changes are addressed.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_statuses_list',
    description: `Lists all commit statuses for the commits in a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_task_create',
    description: `Creates a new task on a pull request.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `The task description.` },
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'pending',
        type: 'string',
        required: false,
        description: `Whether the task is pending (true) or resolved (false).`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_task_delete',
    description: `Deletes a task from a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'task_id', type: 'string', required: true, description: `The numeric task ID.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_task_get',
    description: `Returns a specific task on a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'task_id', type: 'string', required: true, description: `The numeric task ID.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_task_update',
    description: `Updates a task on a pull request (e.g. resolve/reopen or change content).`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'task_id', type: 'string', required: true, description: `The numeric task ID.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Updated task description.`,
      },
      {
        name: 'pending',
        type: 'string',
        required: false,
        description: `Set to false to resolve the task, true to reopen.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_tasks_list',
    description: `Lists all tasks on a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'string',
        required: true,
        description: `The numeric pull request ID.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_unapprove',
    description: `Removes the authenticated user's approval from a pull request.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID to unapprove.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_request_update',
    description: `Updates a pull request's title, description, reviewers, or destination branch.`,
    params: [
      {
        name: 'pull_request_id',
        type: 'integer',
        required: true,
        description: `The pull request ID to update.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the pull request.`,
      },
      {
        name: 'destination_branch',
        type: 'string',
        required: false,
        description: `New destination branch.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the pull request.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_requests_activity_list',
    description: `Lists overall activity for all pull requests in a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_pull_requests_list',
    description: `Returns pull requests for a Bitbucket repository, filterable by state.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      { name: 'q', type: 'string', required: false, description: `Query to filter pull requests.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field for pull requests.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter by state: OPEN, MERGED, DECLINED, SUPERSEDED.`,
      },
    ],
  },
  {
    name: 'bitbucket_refs_list',
    description: `Lists all branches and tags (refs) for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repositories_list',
    description: `Returns all repositories in a Bitbucket workspace.`,
    params: [
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Query to filter repositories, e.g. name~"my-repo".`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field, e.g. -updated_on for newest first.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_create',
    description: `Creates a new Bitbucket repository in the specified workspace.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The slug for the new repository.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description for the repository.`,
      },
      {
        name: 'has_issues',
        type: 'boolean',
        required: false,
        description: `Enable the issue tracker for this repository.`,
      },
      {
        name: 'has_wiki',
        type: 'boolean',
        required: false,
        description: `Enable the wiki for this repository.`,
      },
      {
        name: 'is_private',
        type: 'boolean',
        required: false,
        description: `Whether the repository is private. Default is true.`,
      },
      {
        name: 'project_key',
        type: 'string',
        required: false,
        description: `Key of the project to associate the repository with.`,
      },
      {
        name: 'scm',
        type: 'string',
        required: false,
        description: `Source control type: git or hg. Default is git.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_delete',
    description: `Permanently deletes a Bitbucket repository and all its data.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_fork',
    description: `Forks a Bitbucket repository into the authenticated user's workspace or a specified workspace.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug to fork.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug of the source repository.`,
      },
      {
        name: 'is_private',
        type: 'boolean',
        required: false,
        description: `Whether the fork should be private.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name for the forked repository. Defaults to the source name.`,
      },
      {
        name: 'workspace_destination',
        type: 'string',
        required: false,
        description: `Workspace to fork into. Defaults to the authenticated user's workspace.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_get',
    description: `Returns details of a specific Bitbucket repository including description, language, size, and clone URLs.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permission_group_delete',
    description: `Removes a group's explicit permission from a repository.`,
    params: [
      { name: 'group_slug', type: 'string', required: true, description: `The group slug.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permission_group_get',
    description: `Returns the explicit repository permission for a specific group.`,
    params: [
      { name: 'group_slug', type: 'string', required: true, description: `The group slug.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permission_group_update',
    description: `Sets the explicit permission for a group on a repository.`,
    params: [
      { name: 'group_slug', type: 'string', required: true, description: `The group slug.` },
      {
        name: 'permission',
        type: 'string',
        required: true,
        description: `Permission level: read, write, or admin.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permission_user_delete',
    description: `Removes a user's explicit permission from a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The user's account ID or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permission_user_get',
    description: `Returns the explicit repository permission for a specific user.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The user's account ID or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permission_user_update',
    description: `Sets the explicit permission for a user on a repository.`,
    params: [
      {
        name: 'permission',
        type: 'string',
        required: true,
        description: `Permission level: read, write, or admin.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The user's account ID or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permissions_groups_list',
    description: `Lists all explicit group permissions for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_permissions_users_list',
    description: `Lists all explicit user permissions for a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_update',
    description: `Updates a Bitbucket repository's description, privacy, or other settings.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the repository.`,
      },
      {
        name: 'has_issues',
        type: 'boolean',
        required: false,
        description: `Enable or disable the issue tracker.`,
      },
      {
        name: 'has_wiki',
        type: 'boolean',
        required: false,
        description: `Enable or disable the wiki.`,
      },
      {
        name: 'is_private',
        type: 'boolean',
        required: false,
        description: `Whether the repository should be private.`,
      },
    ],
  },
  {
    name: 'bitbucket_repository_watchers_list',
    description: `Lists all users watching a repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_src_get',
    description: `Retrieves metadata (size, type, mimetype, last commit) for a file or directory in a Bitbucket repository at a specific commit. Returns JSON metadata via format=meta.`,
    params: [
      {
        name: 'commit',
        type: 'string',
        required: true,
        description: `Branch name, tag, or commit hash.`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Path to the file or directory within the repository.`,
      },
    ],
  },
  {
    name: 'bitbucket_tag_create',
    description: `Creates a new tag in a Bitbucket repository pointing to a specific commit.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new tag.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'target_hash',
        type: 'string',
        required: true,
        description: `The commit hash to tag.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Optional message for an annotated tag.`,
      },
    ],
  },
  {
    name: 'bitbucket_tag_delete',
    description: `Deletes a tag from a Bitbucket repository.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The tag name to delete.` },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_tags_list',
    description: `Returns all tags in a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      { name: 'q', type: 'string', required: false, description: `Filter query for tags.` },
      { name: 'sort', type: 'string', required: false, description: `Sort field.` },
    ],
  },
  {
    name: 'bitbucket_user_emails_list',
    description: `Returns all email addresses associated with the authenticated Bitbucket user.`,
    params: [],
  },
  {
    name: 'bitbucket_user_get',
    description: `Returns the authenticated user's Bitbucket profile including display name, account ID, and account links.`,
    params: [],
  },
  {
    name: 'bitbucket_version_get',
    description: `Returns a specific version by ID from the issue tracker.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'version_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the version.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_versions_list',
    description: `Lists all versions defined for a repository's issue tracker.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_webhook_create',
    description: `Creates a new webhook on a Bitbucket repository to receive event notifications at a specified URL.`,
    params: [
      {
        name: 'events',
        type: 'string',
        required: true,
        description: `JSON array of event types to subscribe to, e.g. ["repo:push","pullrequest:created"].`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to receive webhook payloads.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is active.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A human-readable description of the webhook.`,
      },
      {
        name: 'secret',
        type: 'string',
        required: false,
        description: `Secret string used to compute the HMAC signature of webhook payloads.`,
      },
    ],
  },
  {
    name: 'bitbucket_webhook_delete',
    description: `Deletes a webhook from a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The UID of the webhook to delete.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_webhook_get',
    description: `Returns the details of a specific webhook installed on a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      { name: 'uid', type: 'string', required: true, description: `The UID of the webhook.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_webhook_update',
    description: `Updates an existing webhook on a Bitbucket repository, including its URL, events, and active status.`,
    params: [
      {
        name: 'events',
        type: 'string',
        required: true,
        description: `JSON array of event types to subscribe to, e.g. ["repo:push","pullrequest:created"].`,
      },
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The UID of the webhook to update.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The new URL to receive webhook payloads.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is active.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A human-readable description of the webhook.`,
      },
    ],
  },
  {
    name: 'bitbucket_webhooks_list',
    description: `Returns a list of webhooks installed on a Bitbucket repository.`,
    params: [
      {
        name: 'repo_slug',
        type: 'string',
        required: true,
        description: `The repository slug or UUID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_get',
    description: `Returns details of a specific Bitbucket workspace by its slug.`,
    params: [
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_members_list',
    description: `Returns all members of a Bitbucket workspace.`,
    params: [
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_pipeline_variable_create',
    description: `Creates a new pipeline variable at the workspace level.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `Variable name.` },
      { name: 'value', type: 'string', required: true, description: `Variable value.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'secured',
        type: 'string',
        required: false,
        description: `Whether the variable is secret (masked in logs).`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_pipeline_variable_delete',
    description: `Deletes a workspace pipeline variable.`,
    params: [
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the variable.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_pipeline_variable_get',
    description: `Returns a specific workspace pipeline variable by UUID.`,
    params: [
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the variable.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_pipeline_variable_update',
    description: `Updates a workspace pipeline variable.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `Variable name.` },
      { name: 'value', type: 'string', required: true, description: `Variable value.` },
      {
        name: 'variable_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the variable.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'secured',
        type: 'string',
        required: false,
        description: `Whether the variable is secret.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_pipeline_variables_list',
    description: `Lists all pipeline variables defined at the workspace level.`,
    params: [
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_project_create',
    description: `Creates a new project in a workspace.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique key for the project (uppercase letters/numbers).`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the project.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the project.`,
      },
      {
        name: 'is_private',
        type: 'string',
        required: false,
        description: `Whether the project is private.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_project_delete',
    description: `Deletes a project from a workspace.`,
    params: [
      { name: 'project_key', type: 'string', required: true, description: `The project key.` },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_project_get',
    description: `Returns a specific project from a workspace by project key.`,
    params: [
      {
        name: 'project_key',
        type: 'string',
        required: true,
        description: `The project key (e.g. PROJ).`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_project_update',
    description: `Updates an existing project in a workspace.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `Updated project key.` },
      { name: 'name', type: 'string', required: true, description: `Updated name of the project.` },
      {
        name: 'project_key',
        type: 'string',
        required: true,
        description: `The project key (e.g. PROJ).`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      { name: 'description', type: 'string', required: false, description: `Updated description.` },
      {
        name: 'is_private',
        type: 'string',
        required: false,
        description: `Whether the project is private.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_projects_list',
    description: `Lists all projects in a workspace.`,
    params: [
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
    ],
  },
  {
    name: 'bitbucket_workspace_search_code',
    description: `Searches for code across all repositories in a workspace.`,
    params: [
      {
        name: 'search_query',
        type: 'string',
        required: true,
        description: `Code search query string.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace slug or UUID.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'pagelen',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
]
