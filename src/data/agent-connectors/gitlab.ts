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
]
