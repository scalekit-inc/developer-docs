import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gitlab_branch_create',
    description: `Create a new branch in a GitLab repository.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The name of the new branch.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `The source branch, tag, or commit SHA to branch from.`,
      },
    ],
  },
  {
    name: 'gitlab_branch_delete',
    description: `Delete a branch from a GitLab repository.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The name of the branch to delete.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_branch_get',
    description: `Get details of a specific branch in a GitLab repository.`,
    params: [
      { name: 'branch', type: 'string', required: true, description: `The name of the branch.` },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_branch_protect',
    description: `Protects a repository branch, restricting who can push to or merge into it (legacy API — prefer Protected Branches for fine-grained access levels).`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The name of the branch to protect.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'developers_can_merge',
        type: 'boolean',
        required: false,
        description: `Whether developers are allowed to merge into the protected branch.`,
      },
      {
        name: 'developers_can_push',
        type: 'boolean',
        required: false,
        description: `Whether developers are allowed to push directly to the protected branch.`,
      },
    ],
  },
  {
    name: 'gitlab_branch_unprotect',
    description: `Removes protection from a repository branch, allowing any member with write access to push and merge freely.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The name of the branch to unprotect.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_branches_list',
    description: `List repository branches for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'search', type: 'string', required: false, description: `Filter branches by name.` },
    ],
  },
  {
    name: 'gitlab_commit_comment_create',
    description: `Add a comment to a specific commit.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'note', type: 'string', required: true, description: `The comment text.` },
      { name: 'sha', type: 'string', required: true, description: `The commit SHA.` },
      {
        name: 'line',
        type: 'integer',
        required: false,
        description: `Line number for an inline comment.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `File path for an inline comment.`,
      },
    ],
  },
  {
    name: 'gitlab_commit_comments_list',
    description: `List comments on a specific commit.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'sha', type: 'string', required: true, description: `The commit SHA.` },
    ],
  },
  {
    name: 'gitlab_commit_create',
    description: `Creates a new commit on a branch by combining one or more file actions (create, update, delete, move, or chmod) in a single atomic commit. Can also create the target branch from a starting ref.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `List of file actions to include in the commit. Each action has action (create/update/delete/move/chmod), file_path, and content (for create/update).`,
      },
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The branch name to commit to. Created from start_branch/start_sha if it does not yet exist.`,
      },
      {
        name: 'commit_message',
        type: 'string',
        required: true,
        description: `The commit message.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'author_email',
        type: 'string',
        required: false,
        description: `Email address to attribute the commit to.`,
      },
      {
        name: 'author_name',
        type: 'string',
        required: false,
        description: `Name to attribute the commit to.`,
      },
      {
        name: 'start_branch',
        type: 'string',
        required: false,
        description: `The branch to start the new commit from, if branch does not already exist.`,
      },
    ],
  },
  {
    name: 'gitlab_commit_diff_get',
    description: `Get the diff of a specific commit.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'sha', type: 'string', required: true, description: `The commit SHA.` },
    ],
  },
  {
    name: 'gitlab_commit_get',
    description: `Get details of a specific commit by its SHA.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'sha', type: 'string', required: true, description: `The commit SHA.` },
    ],
  },
  {
    name: 'gitlab_commit_merge_requests_list',
    description: `Lists all merge requests associated with a specific commit SHA.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'sha',
        type: 'string',
        required: true,
        description: `The commit SHA, or a branch/tag name, to find merge requests for.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_commits_list',
    description: `List repository commits for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'author',
        type: 'string',
        required: false,
        description: `Filter commits by author name or email.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Filter commits by file path.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'ref_name',
        type: 'string',
        required: false,
        description: `The branch or tag name to list commits from.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Only commits after this date are returned (ISO 8601 format).`,
      },
      {
        name: 'until',
        type: 'string',
        required: false,
        description: `Only commits before this date are returned (ISO 8601 format).`,
      },
    ],
  },
  {
    name: 'gitlab_compare_refs',
    description: `Compare two refs (branches, tags, or commits) in a GitLab repository.`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `The source branch, tag, or commit SHA to compare from.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The target branch, tag, or commit SHA to compare to.`,
      },
      {
        name: 'straight',
        type: 'string',
        required: false,
        description: `Comparison method: 'true' for straight diff, 'false' for merge base.`,
      },
    ],
  },
  {
    name: 'gitlab_current_user_get',
    description: `Get the currently authenticated user's profile.`,
    params: [],
  },
  {
    name: 'gitlab_current_user_ssh_keys_list',
    description: `List SSH keys for the currently authenticated user.`,
    params: [],
  },
  {
    name: 'gitlab_deploy_key_create',
    description: `Create a new deploy key for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'key', type: 'string', required: true, description: `The SSH public key content.` },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `A descriptive title for the deploy key.`,
      },
      {
        name: 'can_push',
        type: 'string',
        required: false,
        description: `If 'true', the deploy key has write access.`,
      },
    ],
  },
  {
    name: 'gitlab_deploy_key_delete',
    description: `Delete a deploy key from a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the deploy key to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_deploy_keys_list',
    description: `List deploy keys for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_file_create',
    description: `Create a new file in a GitLab repository.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The branch to create the file on.`,
      },
      {
        name: 'commit_message',
        type: 'string',
        required: true,
        description: `The commit message for creating this file.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The file content (plain text or base64 encoded).`,
      },
      {
        name: 'file_path',
        type: 'string',
        required: true,
        description: `URL-encoded file path in the repository.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'author_email',
        type: 'string',
        required: false,
        description: `The author's email for the commit.`,
      },
      {
        name: 'author_name',
        type: 'string',
        required: false,
        description: `The author's name for the commit.`,
      },
      {
        name: 'encoding',
        type: 'string',
        required: false,
        description: `The encoding type: 'text' or 'base64'.`,
      },
    ],
  },
  {
    name: 'gitlab_file_delete',
    description: `Delete a file from a GitLab repository.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The branch to delete the file from.`,
      },
      {
        name: 'commit_message',
        type: 'string',
        required: true,
        description: `The commit message for deleting this file.`,
      },
      {
        name: 'file_path',
        type: 'string',
        required: true,
        description: `URL-encoded file path in the repository.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_file_get',
    description: `Get a file's content and metadata from a GitLab repository.`,
    params: [
      {
        name: 'file_path',
        type: 'string',
        required: true,
        description: `URL-encoded file path in the repository.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `The branch, tag, or commit SHA to get the file from.`,
      },
    ],
  },
  {
    name: 'gitlab_file_update',
    description: `Update an existing file in a GitLab repository.`,
    params: [
      {
        name: 'branch',
        type: 'string',
        required: true,
        description: `The branch to update the file on.`,
      },
      {
        name: 'commit_message',
        type: 'string',
        required: true,
        description: `The commit message for updating this file.`,
      },
      { name: 'content', type: 'string', required: true, description: `The new file content.` },
      {
        name: 'file_path',
        type: 'string',
        required: true,
        description: `URL-encoded file path in the repository.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'last_commit_id',
        type: 'string',
        required: false,
        description: `Last known file commit ID (for conflict detection).`,
      },
    ],
  },
  {
    name: 'gitlab_global_search',
    description: `Search globally across GitLab for projects, issues, merge requests, and more.`,
    params: [
      { name: 'scope', type: 'string', required: true, description: `The scope to search in.` },
      { name: 'search', type: 'string', required: true, description: `The search query string.` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_group_create',
    description: `Create a new GitLab group or subgroup.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the group.` },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `URL-friendly path slug for the group.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional group description.`,
      },
      {
        name: 'parent_id',
        type: 'integer',
        required: false,
        description: `ID of the parent group (for subgroups).`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_group_delete',
    description: `Delete a GitLab group. This is an asynchronous operation (returns 202 Accepted).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_group_get',
    description: `Get a specific group by numeric ID or URL-encoded path.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_group_member_add',
    description: `Add a member to a GitLab group.`,
    params: [
      {
        name: 'access_level',
        type: 'integer',
        required: true,
        description: `Access level for the member. 10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the user to add.`,
      },
    ],
  },
  {
    name: 'gitlab_group_member_remove',
    description: `Remove a member from a GitLab group.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the user to remove.`,
      },
    ],
  },
  {
    name: 'gitlab_group_members_list',
    description: `List members of a GitLab group.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'query', type: 'string', required: false, description: `Filter members by name.` },
    ],
  },
  {
    name: 'gitlab_group_packages_list',
    description: `Lists all packages published across all projects within a group's package registries.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or URL-encoded path of the group.`,
      },
      {
        name: 'exclude_subgroups',
        type: 'boolean',
        required: false,
        description: `Whether to exclude packages from subgroups.`,
      },
      {
        name: 'package_name',
        type: 'string',
        required: false,
        description: `Filter packages by exact name.`,
      },
      {
        name: 'package_type',
        type: 'string',
        required: false,
        description: `Filter packages by format/type.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_group_projects_list',
    description: `List projects belonging to a GitLab group.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'search', type: 'string', required: false, description: `Filter projects by name.` },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Filter by visibility level: public, internal, or private.`,
      },
    ],
  },
  {
    name: 'gitlab_group_subgroups_list',
    description: `Lists all subgroups nested directly or indirectly under a specified group.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or URL-encoded path of the parent group.`,
      },
      {
        name: 'all_available',
        type: 'boolean',
        required: false,
        description: `When true, returns all accessible groups; when false, only groups the user is a member of.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search for a specific subgroup by name.`,
      },
    ],
  },
  {
    name: 'gitlab_group_transfer',
    description: `Transfers a group to another parent group, or promotes a subgroup to a top-level group when no target is given.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID or URL-encoded path of the group to transfer.`,
      },
      {
        name: 'group_id',
        type: 'integer',
        required: false,
        description: `The ID of the destination parent group. Omit to promote this group to top-level.`,
      },
    ],
  },
  {
    name: 'gitlab_group_update',
    description: `Update a GitLab group's settings.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The group ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated group description.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the group.` },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `New visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_groups_list',
    description: `List groups accessible to the authenticated user.`,
    params: [
      {
        name: 'min_access_level',
        type: 'integer',
        required: false,
        description: `Minimum access level filter (10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner).`,
      },
      {
        name: 'owned',
        type: 'string',
        required: false,
        description: `If 'true', limits to groups explicitly owned by the current user.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'search', type: 'string', required: false, description: `Search groups by name.` },
    ],
  },
  {
    name: 'gitlab_issue_create',
    description: `Create a new issue in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the issue.` },
      {
        name: 'assignee_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs to assign.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the issue (Markdown supported).`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for the issue in YYYY-MM-DD format.`,
      },
      {
        name: 'labels',
        type: 'string',
        required: false,
        description: `Comma-separated list of label names to apply.`,
      },
      {
        name: 'milestone_id',
        type: 'integer',
        required: false,
        description: `The ID of the milestone to assign.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_delete',
    description: `Delete an issue from a GitLab project (admin only).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue within the project.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_get',
    description: `Get a specific issue by its internal ID (IID).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue within the project.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_labels_list',
    description: `List labels for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_issue_link_create',
    description: `Creates a two-way relationship (relates_to, blocks, or is_blocked_by) between two issues. The user must be able to update both issues.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the source issue.`,
      },
      {
        name: 'target_issue_iid',
        type: 'string',
        required: true,
        description: `The internal ID of the target issue to link to.`,
      },
      {
        name: 'target_project_id',
        type: 'string',
        required: true,
        description: `The ID of the project containing the target issue.`,
      },
      {
        name: 'link_type',
        type: 'string',
        required: false,
        description: `The type of relation: relates_to, blocks, or is_blocked_by. Defaults to relates_to.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_link_delete',
    description: `Deletes a specified issue link, removing the two-way relationship between the two issues.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
      {
        name: 'issue_link_id',
        type: 'integer',
        required: true,
        description: `The ID of the issue link to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_links_list',
    description: `Lists all issues linked to a specified issue, sorted by relationship creation time.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_move',
    description: `Moves an issue to a different project. Fails if the target project is the same as the source, or if the user lacks sufficient permissions.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue to move.`,
      },
      {
        name: 'to_project_id',
        type: 'integer',
        required: true,
        description: `The ID of the destination project.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_note_create',
    description: `Add a comment to a specific issue.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The comment text (Markdown supported).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_note_delete',
    description: `Delete a comment on a specific issue.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
      {
        name: 'note_id',
        type: 'integer',
        required: true,
        description: `The ID of the note to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_note_update',
    description: `Update a comment on a specific issue.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The updated comment text (Markdown supported).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
      {
        name: 'note_id',
        type: 'integer',
        required: true,
        description: `The ID of the note to update.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_notes_list',
    description: `List comments (notes) on a specific issue.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_issue_subscribe',
    description: `Subscribes the currently authenticated user to an issue so they receive notifications on future changes.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_time_estimate_set',
    description: `Sets an estimated amount of work for an issue, using GitLab's human-readable duration format (e.g. 3h30m).`,
    params: [
      {
        name: 'duration',
        type: 'string',
        required: true,
        description: `The estimated duration in human-readable format, e.g. 3h30m.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_time_stats_get',
    description: `Retrieves time tracking statistics for an issue, including time estimate and total time spent, in both seconds and human-readable format.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_unsubscribe',
    description: `Unsubscribes the currently authenticated user from an issue, stopping future change notifications.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue.`,
      },
    ],
  },
  {
    name: 'gitlab_issue_update',
    description: `Update an existing issue in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'issue_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the issue within the project.`,
      },
      {
        name: 'assignee_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs to assign.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the issue.`,
      },
      {
        name: 'labels',
        type: 'string',
        required: false,
        description: `Comma-separated list of label names.`,
      },
      {
        name: 'state_event',
        type: 'string',
        required: false,
        description: `State transition: 'close' to close, 'reopen' to reopen.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the issue.` },
    ],
  },
  {
    name: 'gitlab_issues_list',
    description: `List issues for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'assignee_id',
        type: 'integer',
        required: false,
        description: `Filter issues by assignee user ID.`,
      },
      {
        name: 'labels',
        type: 'string',
        required: false,
        description: `Filter issues by comma-separated label names.`,
      },
      {
        name: 'milestone',
        type: 'string',
        required: false,
        description: `Filter issues by milestone title.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Order issues by field (created_at, updated_at, priority).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search issues by title or description.`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter issues by state: opened, closed, or all.`,
      },
    ],
  },
  {
    name: 'gitlab_job_artifacts_download',
    description: `Download the artifacts archive of a specific CI/CD job.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the job.`,
      },
    ],
  },
  {
    name: 'gitlab_job_artifacts_keep',
    description: `Marks a job's artifacts to be retained indefinitely, preventing them from being automatically deleted when they reach their expiration date.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The ID of the job whose artifacts should be retained.`,
      },
    ],
  },
  {
    name: 'gitlab_job_cancel',
    description: `Cancel a specific CI/CD job.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the job to cancel.`,
      },
    ],
  },
  {
    name: 'gitlab_job_erase',
    description: `Erases a job, permanently removing its artifacts and job log. This cannot be undone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The ID of the job to erase.`,
      },
    ],
  },
  {
    name: 'gitlab_job_get',
    description: `Get details of a specific CI/CD job.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the job.`,
      },
    ],
  },
  {
    name: 'gitlab_job_log_get',
    description: `Get the log (trace) output of a specific CI/CD job.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the job.`,
      },
    ],
  },
  {
    name: 'gitlab_job_play',
    description: `Triggers a job that is in the manual status, starting its execution.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The ID of the manual job to run.`,
      },
    ],
  },
  {
    name: 'gitlab_job_retry',
    description: `Retry a specific CI/CD job.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'job_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the job to retry.`,
      },
    ],
  },
  {
    name: 'gitlab_jobs_list',
    description: `List all jobs for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Filter jobs by scope/status.`,
      },
    ],
  },
  {
    name: 'gitlab_label_create',
    description: `Create a new label in a GitLab project.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `The color for the label in hex format (e.g. #FF0000).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the label.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the label.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_approvals_get',
    description: `Get the approval state of a specific merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_approve',
    description: `Approve a merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_changes_get',
    description: `Retrieves the file changes (diff) for a merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'unidiff',
        type: 'boolean',
        required: false,
        description: `Return the diff in Unified diff format instead of GitLab's default format.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_closes_issues_list',
    description: `Lists all issues that will be closed automatically when a merge request is merged.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_commits_list',
    description: `List commits in a specific merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_create',
    description: `Create a new merge request in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'source_branch',
        type: 'string',
        required: true,
        description: `The source branch name.`,
      },
      {
        name: 'target_branch',
        type: 'string',
        required: true,
        description: `The target branch name.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the merge request.`,
      },
      {
        name: 'assignee_id',
        type: 'integer',
        required: false,
        description: `The numeric ID of the user to assign.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the merge request (Markdown supported).`,
      },
      {
        name: 'labels',
        type: 'string',
        required: false,
        description: `Comma-separated list of label names.`,
      },
      {
        name: 'remove_source_branch',
        type: 'string',
        required: false,
        description: `If 'true', removes the source branch after merging.`,
      },
      {
        name: 'squash',
        type: 'string',
        required: false,
        description: `If 'true', squashes all commits into one on merge.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_delete',
    description: `Deletes a merge request. Restricted to administrators and project Owners.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_diff_get',
    description: `Get the diffs of a specific merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_discussion_resolve',
    description: `Resolve or reopen an entire merge-request review thread — a common code-review action with no equivalent among existing note/approval tools.`,
    params: [
      {
        name: 'discussion_id',
        type: 'string',
        required: true,
        description: `The ID of the discussion (thread) to resolve or reopen.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: true,
        description: `If true, resolves the discussion. If false, reopens it.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_discussions_list',
    description: `List threaded discussions on a merge request via the Discussions API, including each thread's individual_note flag and note-level resolvable/resolved state. Existing tools (gitlab_merge_request_notes_list) only cover flat notes, not this threaded structure.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_get',
    description: `Get a specific merge request by its internal ID (IID).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request within the project.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_merge',
    description: `Merge an approved merge request in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'merge_commit_message',
        type: 'string',
        required: false,
        description: `Custom merge commit message.`,
      },
      {
        name: 'should_remove_source_branch',
        type: 'string',
        required: false,
        description: `If 'true', removes the source branch after merging.`,
      },
      {
        name: 'squash',
        type: 'string',
        required: false,
        description: `If 'true', squashes all commits into one.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_note_create',
    description: `Add a comment to a specific merge request.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The comment text (Markdown supported).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_notes_list',
    description: `List comments on a specific merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_pipelines_list',
    description: `Lists all CI/CD pipelines that have run for a merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_rebase',
    description: `Automatically rebases the source branch of a merge request against its target branch. This is an asynchronous operation.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'skip_ci',
        type: 'boolean',
        required: false,
        description: `Set to true to rebase without creating a new CI pipeline.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_reviewers_list',
    description: `Retrieves the reviewers assigned to a merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_subscribe',
    description: `Subscribes the currently authenticated user to a merge request so they receive notifications on future changes.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_time_estimate_set',
    description: `Sets an estimated amount of work for a merge request, using GitLab's human-readable duration format.`,
    params: [
      {
        name: 'duration',
        type: 'string',
        required: true,
        description: `The estimated duration in human-readable format, e.g. 3h30m.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_time_stats_get',
    description: `Retrieves time tracking statistics for a merge request, including time estimate and total time spent.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_unapprove',
    description: `Removes the currently authenticated user's approval from a merge request.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_unsubscribe',
    description: `Unsubscribes the currently authenticated user from a merge request, stopping future change notifications.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_request_update',
    description: `Update an existing merge request in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'merge_request_iid',
        type: 'integer',
        required: true,
        description: `The internal ID of the merge request.`,
      },
      {
        name: 'assignee_id',
        type: 'integer',
        required: false,
        description: `The numeric ID of the user to assign.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the merge request.`,
      },
      {
        name: 'labels',
        type: 'string',
        required: false,
        description: `Comma-separated list of label names.`,
      },
      {
        name: 'state_event',
        type: 'string',
        required: false,
        description: `State transition: 'close' to close, 'reopen' to reopen.`,
      },
      {
        name: 'target_branch',
        type: 'string',
        required: false,
        description: `New target branch name.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the merge request.`,
      },
    ],
  },
  {
    name: 'gitlab_merge_requests_list',
    description: `List merge requests for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'labels',
        type: 'string',
        required: false,
        description: `Filter by comma-separated label names.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Order MRs by field (created_at, updated_at, title).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search MRs by title or description.`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order: asc or desc.` },
      {
        name: 'source_branch',
        type: 'string',
        required: false,
        description: `Filter by source branch name.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter by state: opened, closed, locked, merged, or all.`,
      },
      {
        name: 'target_branch',
        type: 'string',
        required: false,
        description: `Filter by target branch name.`,
      },
    ],
  },
  {
    name: 'gitlab_milestone_create',
    description: `Create a new milestone in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the milestone.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the milestone.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for the milestone in YYYY-MM-DD format.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for the milestone in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'gitlab_milestone_delete',
    description: `Delete a milestone from a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'milestone_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the milestone.`,
      },
    ],
  },
  {
    name: 'gitlab_milestone_get',
    description: `Get a specific project milestone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'milestone_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the milestone.`,
      },
    ],
  },
  {
    name: 'gitlab_milestone_update',
    description: `Update an existing milestone in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'milestone_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the milestone.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description for the milestone.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Updated due date in YYYY-MM-DD format.`,
      },
      {
        name: 'state_event',
        type: 'string',
        required: false,
        description: `State transition: 'close' to close, 'activate' to reopen.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the milestone.`,
      },
    ],
  },
  {
    name: 'gitlab_milestones_list',
    description: `List milestones for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter milestones by title.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter milestones by state: active or closed.`,
      },
    ],
  },
  {
    name: 'gitlab_namespaces_list',
    description: `List namespaces available to the current user (personal namespaces and groups).`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter namespaces by name.`,
      },
    ],
  },
  {
    name: 'gitlab_package_pipelines_list',
    description: `Lists the CI/CD pipelines that published a specific package, sorted by pipeline ID descending.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'package_id',
        type: 'integer',
        required: true,
        description: `The ID of the package.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_cancel',
    description: `Cancel a running pipeline.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the pipeline to cancel.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_create',
    description: `Trigger a new CI/CD pipeline for a specific branch or tag. Note: GitLab.com requires identity verification on the account before pipelines can be triggered via API. Ensure the authenticated user has verified their identity at gitlab.com/-/profile/verify.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `The branch or tag name to run the pipeline on.`,
      },
      {
        name: 'variables',
        type: 'string',
        required: false,
        description: `JSON array of pipeline variables, each with 'key' and 'value' fields.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_delete',
    description: `Delete a pipeline from a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the pipeline to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_get',
    description: `Get details of a specific pipeline.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the pipeline.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_jobs_list',
    description: `List jobs for a specific pipeline.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the pipeline.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'scope', type: 'string', required: false, description: `Filter jobs by scope.` },
    ],
  },
  {
    name: 'gitlab_pipeline_latest_get',
    description: `Retrieves the most recent pipeline for a given ref (branch or tag). Uses the project's default branch if no ref is specified.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `The branch or tag to find the latest pipeline for. Defaults to the project's default branch.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_retry',
    description: `Retry a failed pipeline.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the pipeline to retry.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_schedule_create',
    description: `Creates a scheduled pipeline that runs automatically on a cron-style schedule against a given branch or tag.`,
    params: [
      {
        name: 'cron',
        type: 'string',
        required: true,
        description: `A cron expression describing when the pipeline should run.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `A description of the pipeline schedule.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `The branch or tag name the scheduled pipeline runs against.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the pipeline schedule is active.`,
      },
      {
        name: 'cron_timezone',
        type: 'string',
        required: false,
        description: `The timezone the cron expression is evaluated in.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_schedule_delete',
    description: `Deletes a pipeline schedule from a project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_schedule_id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline schedule to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_schedule_get',
    description: `Retrieves the details of a specific pipeline schedule.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_schedule_id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline schedule.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_schedule_update',
    description: `Updates an existing pipeline schedule. The schedule is automatically re-registered with the new cron settings after the update.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_schedule_id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline schedule to update.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the pipeline schedule is active.`,
      },
      {
        name: 'cron',
        type: 'string',
        required: false,
        description: `A cron expression describing when the pipeline should run.`,
      },
      {
        name: 'cron_timezone',
        type: 'string',
        required: false,
        description: `The timezone the cron expression is evaluated in.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the pipeline schedule.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `The branch or tag name the scheduled pipeline runs against.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_schedules_list',
    description: `Lists all scheduled (cron-triggered) pipelines configured for a project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_test_report_get',
    description: `Retrieves the full JUnit test report for a pipeline, including individual test case results.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline.`,
      },
    ],
  },
  {
    name: 'gitlab_pipeline_test_report_summary_get',
    description: `Retrieves a summarized test report for a pipeline, including pass/fail/error counts without full test case detail.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'pipeline_id',
        type: 'integer',
        required: true,
        description: `The ID of the pipeline.`,
      },
    ],
  },
  {
    name: 'gitlab_pipelines_list',
    description: `List pipelines for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `Filter pipelines by branch or tag name.`,
      },
      {
        name: 'sha',
        type: 'string',
        required: false,
        description: `Filter pipelines by commit SHA.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by pipeline status.`,
      },
    ],
  },
  {
    name: 'gitlab_project_access_token_create',
    description: `Create a project access token with specified scopes, access level, and expiry — for provisioning CI or automation credentials. The token secret is only returned once, in the create response.`,
    params: [
      {
        name: 'expires_at',
        type: 'string',
        required: true,
        description: `Expiration date of the token in ISO format (YYYY-MM-DD).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the access token.` },
      {
        name: 'scopes',
        type: 'array',
        required: true,
        description: `List of scopes granted to the token.`,
      },
      {
        name: 'access_level',
        type: 'integer',
        required: false,
        description: `Access level for the token. 10=Guest, 15=Planner, 20=Reporter, 25=Reporter+, 30=Developer, 40=Maintainer, 50=Owner. Defaults to 40.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the token, up to 255 characters.`,
      },
    ],
  },
  {
    name: 'gitlab_project_access_tokens_list',
    description: `List existing project access tokens, with filters for state, search, expiry/creation/last-used windows, and sort order. Never returns token secrets — those are only shown once, at creation.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Only return tokens created after this datetime (ISO 8601).`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Only return tokens created before this datetime (ISO 8601).`,
      },
      {
        name: 'expires_after',
        type: 'string',
        required: false,
        description: `Only return tokens expiring after this date (ISO 8601).`,
      },
      {
        name: 'expires_before',
        type: 'string',
        required: false,
        description: `Only return tokens expiring before this date (ISO 8601).`,
      },
      {
        name: 'last_used_after',
        type: 'string',
        required: false,
        description: `Only return tokens last used after this datetime (ISO 8601).`,
      },
      {
        name: 'last_used_before',
        type: 'string',
        required: false,
        description: `Only return tokens last used before this datetime (ISO 8601).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'revoked',
        type: 'boolean',
        required: false,
        description: `Filter by whether the token has been revoked.`,
      },
      { name: 'search', type: 'string', required: false, description: `Search by token name.` },
      { name: 'sort', type: 'string', required: false, description: `Sort order for the results.` },
      { name: 'state', type: 'string', required: false, description: `Filter tokens by state.` },
    ],
  },
  {
    name: 'gitlab_project_archive',
    description: `Archives a project, making it read-only throughout the UI and API. Requires the Owner role or administrator access.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_create',
    description: `Create a new GitLab project.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the project.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A short description of the project.`,
      },
      {
        name: 'initialize_with_readme',
        type: 'string',
        required: false,
        description: `If 'true', initializes the repository with a README.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility level: private, internal, or public. Defaults to private.`,
      },
    ],
  },
  {
    name: 'gitlab_project_delete',
    description: `Delete a GitLab project. This is an asynchronous operation (returns 202 Accepted).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path (e.g. 'namespace%2Fproject').`,
      },
    ],
  },
  {
    name: 'gitlab_project_fork',
    description: `Fork a GitLab project into a namespace.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path to fork.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name for the forked project.`,
      },
      {
        name: 'namespace_id',
        type: 'integer',
        required: false,
        description: `The ID of the namespace to fork the project into.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `The URL path (slug) for the forked project. Must be unique in the target namespace. If omitted, GitLab uses the source project path which may already be taken.`,
      },
    ],
  },
  {
    name: 'gitlab_project_forks_list',
    description: `List forks of a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_project_get',
    description: `Get a specific project by numeric ID or URL-encoded namespace/project path.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path (e.g. 'namespace%2Fproject').`,
      },
    ],
  },
  {
    name: 'gitlab_project_languages_get',
    description: `Retrieves the programming languages used in a project's repository, along with the percentage of the codebase each language represents.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_member_add',
    description: `Add a member to a GitLab project with a specified access level.`,
    params: [
      {
        name: 'access_level',
        type: 'integer',
        required: true,
        description: `Access level for the member. 10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the user to add.`,
      },
    ],
  },
  {
    name: 'gitlab_project_member_remove',
    description: `Remove a member from a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the user to remove.`,
      },
    ],
  },
  {
    name: 'gitlab_project_members_list',
    description: `List members of a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'query', type: 'string', required: false, description: `Filter members by name.` },
    ],
  },
  {
    name: 'gitlab_project_package_delete',
    description: `Deletes a package and all of its files from a project's package registry.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'package_id',
        type: 'integer',
        required: true,
        description: `The ID of the package to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_project_package_get',
    description: `Retrieves a specific package published to a project's package registry.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'package_id',
        type: 'integer',
        required: true,
        description: `The ID of the package.`,
      },
    ],
  },
  {
    name: 'gitlab_project_packages_list',
    description: `Lists all packages published to a project's package registry, across all package formats.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field to order results by: created_at, name, version, or type.`,
      },
      {
        name: 'package_name',
        type: 'string',
        required: false,
        description: `Filter packages by exact name.`,
      },
      {
        name: 'package_type',
        type: 'string',
        required: false,
        description: `Filter packages by format/type.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
  {
    name: 'gitlab_project_search',
    description: `Search within a specific GitLab project for issues, merge requests, commits, code, and more.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope to search in within the project.`,
      },
      { name: 'search', type: 'string', required: true, description: `The search query string.` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `The branch or tag name to search (for blobs or commits scope).`,
      },
    ],
  },
  {
    name: 'gitlab_project_snippet_create',
    description: `Create a new snippet in a GitLab project.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The content of the snippet.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The filename for the snippet.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the snippet.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the snippet.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_project_snippet_delete',
    description: `Deletes a project snippet.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'snippet_id',
        type: 'integer',
        required: true,
        description: `The ID of the project snippet to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_project_snippet_get',
    description: `Get a specific snippet from a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'snippet_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the snippet.`,
      },
    ],
  },
  {
    name: 'gitlab_project_snippet_update',
    description: `Updates an existing project snippet's title, description, visibility, or content.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'snippet_id',
        type: 'integer',
        required: true,
        description: `The ID of the project snippet to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The content of the snippet.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the snippet.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `The filename for the snippet.`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the snippet.` },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_project_snippets_list',
    description: `List all snippets in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_project_star',
    description: `Star a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_transfer',
    description: `Transfers a project to a different namespace (user or group).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'namespace',
        type: 'string',
        required: true,
        description: `The ID or path of the destination namespace.`,
      },
    ],
  },
  {
    name: 'gitlab_project_unarchive',
    description: `Unarchives a previously-archived project, restoring normal read/write access. Requires the Owner role or administrator access.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_unstar',
    description: `Unstar a GitLab project. Returns 200 with project data if successfully unstarred, or 304 if the project was not starred.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_update',
    description: `Update an existing GitLab project's settings.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path (e.g. 'namespace%2Fproject').`,
      },
      {
        name: 'default_branch',
        type: 'string',
        required: false,
        description: `The default branch name for the project.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A short description of the project.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the project.` },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `New visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_project_variable_create',
    description: `Create a new CI/CD variable for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'key', type: 'string', required: true, description: `The variable key name.` },
      { name: 'value', type: 'string', required: true, description: `The value of the variable.` },
      {
        name: 'environment_scope',
        type: 'string',
        required: false,
        description: `The environment scope for this variable (default '*').`,
      },
      {
        name: 'masked',
        type: 'string',
        required: false,
        description: `If 'true', masks the variable in job logs.`,
      },
      {
        name: 'protected',
        type: 'string',
        required: false,
        description: `If 'true', the variable is only available on protected branches/tags.`,
      },
      {
        name: 'variable_type',
        type: 'string',
        required: false,
        description: `The variable type: env_var (default) or file.`,
      },
    ],
  },
  {
    name: 'gitlab_project_variable_delete',
    description: `Delete a CI/CD variable from a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The variable key name to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_project_variable_get',
    description: `Get a specific CI/CD variable for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'key', type: 'string', required: true, description: `The variable key name.` },
    ],
  },
  {
    name: 'gitlab_project_variable_update',
    description: `Update an existing CI/CD variable for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The variable key name to update.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The new value of the variable.`,
      },
      {
        name: 'masked',
        type: 'string',
        required: false,
        description: `If 'true', masks the variable in job logs.`,
      },
      {
        name: 'protected',
        type: 'string',
        required: false,
        description: `If 'true', the variable is only available on protected branches/tags.`,
      },
    ],
  },
  {
    name: 'gitlab_project_variables_list',
    description: `List all CI/CD variables for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_webhook_create',
    description: `Create a new webhook for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL to send webhook payloads to.`,
      },
      {
        name: 'issues_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger the webhook on issue events.`,
      },
      {
        name: 'merge_requests_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger on merge request events.`,
      },
      {
        name: 'pipeline_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger on pipeline events.`,
      },
      {
        name: 'push_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger the webhook on push events.`,
      },
      {
        name: 'token',
        type: 'string',
        required: false,
        description: `Secret token to validate webhook payloads.`,
      },
    ],
  },
  {
    name: 'gitlab_project_webhook_delete',
    description: `Delete a webhook from a GitLab project.`,
    params: [
      {
        name: 'hook_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the webhook to delete.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_webhook_get',
    description: `Get a specific webhook for a GitLab project.`,
    params: [
      {
        name: 'hook_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the webhook.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_project_webhook_update',
    description: `Update an existing webhook for a GitLab project.`,
    params: [
      {
        name: 'hook_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the webhook to update.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The new URL to send webhook payloads to.`,
      },
      {
        name: 'merge_requests_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger on merge request events.`,
      },
      {
        name: 'pipeline_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger on pipeline events.`,
      },
      {
        name: 'push_events',
        type: 'string',
        required: false,
        description: `If 'true', trigger on push events.`,
      },
    ],
  },
  {
    name: 'gitlab_project_webhooks_list',
    description: `List all webhooks configured for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
    ],
  },
  {
    name: 'gitlab_projects_list',
    description: `List all projects accessible to the authenticated user. Supports filtering by search, ownership, membership, and visibility.`,
    params: [
      {
        name: 'membership',
        type: 'string',
        required: false,
        description: `If 'true', limits by projects where the user is a member.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Order projects by a field (e.g. id, name, created_at).`,
      },
      {
        name: 'owned',
        type: 'string',
        required: false,
        description: `If 'true', limits by projects explicitly owned by the current user.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query to filter projects by name.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order: 'asc' or 'desc'.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Filter by visibility level: public, internal, or private.`,
      },
    ],
  },
  {
    name: 'gitlab_protected_branch_create',
    description: `Protect a branch or wildcard pattern via the modern Protected Branches API, with fine-grained push/merge/unprotect access levels. Distinct from gitlab_branch_protect, which only supports the legacy developers_can_push/developers_can_merge toggle.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name or wildcard pattern of the branch to protect.`,
      },
      {
        name: 'allow_force_push',
        type: 'boolean',
        required: false,
        description: `If true, members allowed to push to this branch can also force push. Defaults to false.`,
      },
      {
        name: 'allowed_to_merge',
        type: 'array',
        required: false,
        description: `Array of access descriptors granting merge access, each an object with exactly one of user_id, group_id, member_role_id, or access_level.`,
      },
      {
        name: 'allowed_to_push',
        type: 'array',
        required: false,
        description: `Array of access descriptors granting push access, each an object with exactly one of user_id, group_id, member_role_id, deploy_key_id, or access_level.`,
      },
      {
        name: 'allowed_to_unprotect',
        type: 'array',
        required: false,
        description: `Array of access descriptors granting unprotect access, each an object with exactly one of user_id, group_id, member_role_id, or access_level.`,
      },
      {
        name: 'code_owner_approval_required',
        type: 'boolean',
        required: false,
        description: `If true, merges into this branch require approval from a matching CODEOWNERS entry. Defaults to false.`,
      },
      {
        name: 'merge_access_level',
        type: 'integer',
        required: false,
        description: `Access level allowed to merge into the branch. 0=No access, 30=Developer, 40=Maintainer, 60=Admin. Defaults to 40.`,
      },
      {
        name: 'push_access_level',
        type: 'integer',
        required: false,
        description: `Access level allowed to push to the branch. 0=No access, 30=Developer, 40=Maintainer, 60=Admin. Defaults to 40.`,
      },
      {
        name: 'unprotect_access_level',
        type: 'integer',
        required: false,
        description: `Access level allowed to unprotect the branch. 0=No access, 30=Developer, 40=Maintainer, 60=Admin. Defaults to 40.`,
      },
    ],
  },
  {
    name: 'gitlab_protected_branch_delete',
    description: `Remove a protected-branch rule created via the modern Protected Branches API (unprotects the branch or wildcard pattern entirely).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name or wildcard pattern of the protected branch rule to remove.`,
      },
    ],
  },
  {
    name: 'gitlab_protected_branches_list',
    description: `List protected branches for a project via the modern Protected Branches API, including each branch's push/merge/unprotect access levels. Distinct from gitlab_branch_protect/gitlab_branch_unprotect, which use the legacy protect toggle and don't expose per-role access levels.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Name or part of the name of protected branches to search for.`,
      },
    ],
  },
  {
    name: 'gitlab_registry_repositories_list',
    description: `List container registry repositories for a project. The entire Container Registry API is otherwise uncovered by existing tools.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'tags',
        type: 'boolean',
        required: false,
        description: `If true, each repository includes an array of its tags in the response.`,
      },
      {
        name: 'tags_count',
        type: 'boolean',
        required: false,
        description: `If true, each repository includes a tags_count field in the response.`,
      },
    ],
  },
  {
    name: 'gitlab_registry_repository_tags_list',
    description: `List image tags in a project's container registry repository. Use gitlab_registry_repositories_list first to find the repository_id.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'repository_id',
        type: 'integer',
        required: true,
        description: `The ID of the registry repository.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_release_create',
    description: `Create a new release in a GitLab project.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Release notes in Markdown format.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'name', type: 'string', required: true, description: `The release name.` },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag name for the release.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `The branch or commit to create the tag from (only if tag does not exist).`,
      },
    ],
  },
  {
    name: 'gitlab_release_delete',
    description: `Delete a release from a GitLab project. Returns the deleted release object.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag name of the release to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_release_get',
    description: `Get a specific release by tag name.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag name for the release.`,
      },
    ],
  },
  {
    name: 'gitlab_release_link_create',
    description: `Creates an asset link (a downloadable file or external URL) attached to a release.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the link. Must be unique within the release.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag associated with the release.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the link. Must be unique within the release.`,
      },
      {
        name: 'direct_asset_path',
        type: 'string',
        required: false,
        description: `Optional path used to build a direct, permanent asset URL.`,
      },
      {
        name: 'link_type',
        type: 'string',
        required: false,
        description: `The type of the link: other, runbook, image, or package. Defaults to other.`,
      },
    ],
  },
  {
    name: 'gitlab_release_link_delete',
    description: `Deletes an asset link from a release.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'link_id',
        type: 'integer',
        required: true,
        description: `The ID of the release link to delete.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag associated with the release.`,
      },
    ],
  },
  {
    name: 'gitlab_release_link_get',
    description: `Retrieves a specific asset link from a release.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'link_id',
        type: 'integer',
        required: true,
        description: `The ID of the release link.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag associated with the release.`,
      },
    ],
  },
  {
    name: 'gitlab_release_link_update',
    description: `Updates the name, URL, or type of an existing release asset link.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'link_id',
        type: 'integer',
        required: true,
        description: `The ID of the release link to update.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag associated with the release.`,
      },
      {
        name: 'link_type',
        type: 'string',
        required: false,
        description: `The type of the link: other, runbook, image, or package.`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the link.` },
      { name: 'url', type: 'string', required: false, description: `The URL of the link.` },
    ],
  },
  {
    name: 'gitlab_release_links_list',
    description: `Lists all asset links attached to a release.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag associated with the release.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_release_update',
    description: `Update an existing release in a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The tag name of the release to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated release notes in Markdown format.`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated release name.` },
    ],
  },
  {
    name: 'gitlab_releases_list',
    description: `List releases for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_repository_tree_list',
    description: `List files and directories in a GitLab repository.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Folder path to list files from.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'recursive',
        type: 'string',
        required: false,
        description: `If 'true', lists files recursively.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `The branch, tag, or commit SHA to list files from.`,
      },
    ],
  },
  {
    name: 'gitlab_snippet_create',
    description: `Creates a personal snippet, not tied to any project, owned by the currently authenticated user.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The content of the snippet.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The filename for the snippet.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the snippet.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the snippet.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_snippet_delete',
    description: `Deletes a personal snippet.`,
    params: [
      {
        name: 'snippet_id',
        type: 'integer',
        required: true,
        description: `The ID of the snippet to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_snippet_get',
    description: `Retrieves a personal snippet by ID.`,
    params: [
      {
        name: 'snippet_id',
        type: 'integer',
        required: true,
        description: `The ID of the snippet to retrieve.`,
      },
    ],
  },
  {
    name: 'gitlab_snippet_update',
    description: `Updates an existing personal snippet's title, description, visibility, or content.`,
    params: [
      {
        name: 'snippet_id',
        type: 'integer',
        required: true,
        description: `The ID of the snippet to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The content of the snippet.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the snippet.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `The filename for the snippet.`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the snippet.` },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility level: private, internal, or public.`,
      },
    ],
  },
  {
    name: 'gitlab_snippets_list',
    description: `Lists all personal snippets owned by the currently authenticated user.`,
    params: [
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Only return snippets created after this timestamp.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Only return snippets created before this timestamp.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_ssh_key_add',
    description: `Add an SSH key for the currently authenticated user.`,
    params: [
      { name: 'key', type: 'string', required: true, description: `The SSH public key content.` },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `A descriptive title for the SSH key.`,
      },
    ],
  },
  {
    name: 'gitlab_tag_create',
    description: `Create a new tag in a GitLab repository.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `The commit SHA, branch name, or another tag name to create the tag from.`,
      },
      { name: 'tag_name', type: 'string', required: true, description: `The name of the new tag.` },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Message for an annotated tag.`,
      },
      {
        name: 'release_description',
        type: 'string',
        required: false,
        description: `Release notes for the tag.`,
      },
    ],
  },
  {
    name: 'gitlab_tag_delete',
    description: `Delete a tag from a GitLab repository.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `The name of the tag to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_tag_get',
    description: `Get details of a specific repository tag.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'tag_name', type: 'string', required: true, description: `The name of the tag.` },
    ],
  },
  {
    name: 'gitlab_tags_list',
    description: `List repository tags for a GitLab project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Order tags by field (name, updated, version).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'search', type: 'string', required: false, description: `Filter tags by name.` },
      { name: 'sort', type: 'string', required: false, description: `Sort order: asc or desc.` },
    ],
  },
  {
    name: 'gitlab_todo_mark_done',
    description: `Mark a single pending to-do item as done.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The ID of the to-do item to mark as done.`,
      },
    ],
  },
  {
    name: 'gitlab_todos_list',
    description: `List the authenticated user's GitLab to-do items, with filters for action/author/project/group/state/type.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter by the action that generated the to-do.`,
      },
      {
        name: 'author_id',
        type: 'integer',
        required: false,
        description: `Filter by the numeric ID of the user who triggered the to-do.`,
      },
      {
        name: 'group_id',
        type: 'integer',
        required: false,
        description: `Filter by the numeric ID of the group associated with the to-do.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'project_id',
        type: 'integer',
        required: false,
        description: `Filter by the numeric ID of the project associated with the to-do.`,
      },
      { name: 'state', type: 'string', required: false, description: `Filter by to-do state.` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by the type of resource the to-do is about.`,
      },
    ],
  },
  {
    name: 'gitlab_user_block',
    description: `Blocks a user account, preventing them from signing in. Administrators only.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The ID of the user to block.`,
      },
    ],
  },
  {
    name: 'gitlab_user_create',
    description: `Creates a new user account. Administrators only.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address of the new user.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the new user.`,
      },
      {
        name: 'username',
        type: 'string',
        required: true,
        description: `The username of the new user.`,
      },
      {
        name: 'admin',
        type: 'boolean',
        required: false,
        description: `Whether the new user should be a GitLab administrator.`,
      },
      {
        name: 'bio',
        type: 'string',
        required: false,
        description: `A short biography for the user's profile.`,
      },
      {
        name: 'can_create_group',
        type: 'boolean',
        required: false,
        description: `Whether the user can create top-level groups.`,
      },
      {
        name: 'external',
        type: 'boolean',
        required: false,
        description: `Whether the user is marked as an external user with restricted internal visibility.`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `The password for the new user.`,
      },
      {
        name: 'projects_limit',
        type: 'integer',
        required: false,
        description: `The maximum number of projects this user can create.`,
      },
      {
        name: 'reset_password',
        type: 'boolean',
        required: false,
        description: `Whether to send the user a password-reset token by email instead of setting a password.`,
      },
      {
        name: 'skip_confirmation',
        type: 'boolean',
        required: false,
        description: `Whether to mark the account as confirmed immediately, skipping the email confirmation step.`,
      },
    ],
  },
  {
    name: 'gitlab_user_delete',
    description: `Deletes a user account. Administrators only.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The ID of the user to delete.`,
      },
      {
        name: 'hard_delete',
        type: 'boolean',
        required: false,
        description: `Whether to also remove all of the user's contributions (issues, comments, etc).`,
      },
    ],
  },
  {
    name: 'gitlab_user_get',
    description: `Get a specific user by ID.`,
    params: [{ name: 'id', type: 'integer', required: true, description: `The ID of the user.` }],
  },
  {
    name: 'gitlab_user_projects_list',
    description: `List projects owned by a specific user.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the user whose projects to list.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
    ],
  },
  {
    name: 'gitlab_user_status_get',
    description: `Retrieves the status message and emoji of a user. Does not require authentication.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID or username of the user.`,
      },
    ],
  },
  {
    name: 'gitlab_user_unblock',
    description: `Unblocks a previously-blocked user account, restoring their ability to sign in. Administrators only.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The ID of the user to unblock.`,
      },
    ],
  },
  {
    name: 'gitlab_user_update',
    description: `Updates the details of an existing user account. Administrators only.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The ID of the user to update.`,
      },
      {
        name: 'admin',
        type: 'boolean',
        required: false,
        description: `Whether the user should be a GitLab administrator.`,
      },
      {
        name: 'bio',
        type: 'string',
        required: false,
        description: `A short biography for the user's profile.`,
      },
      {
        name: 'can_create_group',
        type: 'boolean',
        required: false,
        description: `Whether the user can create top-level groups.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The email address of the user.`,
      },
      {
        name: 'external',
        type: 'boolean',
        required: false,
        description: `Whether the user is marked as an external user with restricted internal visibility.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The display name of the user.`,
      },
      {
        name: 'projects_limit',
        type: 'integer',
        required: false,
        description: `The maximum number of projects this user can create.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `The username of the user.`,
      },
    ],
  },
  {
    name: 'gitlab_users_list',
    description: `List users. Supports filtering by search term, username, and active status.`,
    params: [
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `Filter by active status. Use 'true' or 'false'.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search users by name or email.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Filter by exact username.`,
      },
    ],
  },
  {
    name: 'gitlab_wiki_page_create',
    description: `Creates a new wiki page for a project.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The content of the wiki page.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the wiki page.` },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `The markup format of the wiki page. One of markdown, rdoc, asciidoc, or org.`,
      },
    ],
  },
  {
    name: 'gitlab_wiki_page_delete',
    description: `Deletes a wiki page from a project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The slug of the wiki page to delete.`,
      },
    ],
  },
  {
    name: 'gitlab_wiki_page_get',
    description: `Retrieves a specific wiki page for a project by its slug.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The slug of the wiki page to retrieve.`,
      },
      {
        name: 'render_html',
        type: 'boolean',
        required: false,
        description: `Whether to render the page content to HTML in the response.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `A specific version hash of the wiki page to retrieve.`,
      },
    ],
  },
  {
    name: 'gitlab_wiki_page_update',
    description: `Updates the title, content, or format of an existing wiki page.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The slug of the wiki page to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The content of the wiki page.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `The markup format of the wiki page.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the wiki page.`,
      },
    ],
  },
  {
    name: 'gitlab_wiki_pages_list',
    description: `Lists all wiki pages for a project.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The project ID (numeric) or URL-encoded path.`,
      },
      {
        name: 'with_content',
        type: 'boolean',
        required: false,
        description: `Whether to include each page's rendered content in the response.`,
      },
    ],
  },
]
