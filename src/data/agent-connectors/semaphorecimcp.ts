import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'semaphorecimcp_artifact_job_logs',
    description: `Fetch a signed URL for full artifact-backed job logs in Semaphore CI.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The UUID of the job whose artifact logs to fetch.`,
      },
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The UUID of the Semaphore CI organization.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_artifacts_list',
    description: `List artifacts for a project, workflow, or job scope in Semaphore CI.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The UUID of the Semaphore CI organization.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope level at which to list artifacts.`,
      },
      {
        name: 'scope_id',
        type: 'string',
        required: true,
        description: `The UUID of the scoped resource (project ID, workflow ID, or job ID).`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Optional path prefix to filter artifacts.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Optional project UUID for additional context filtering.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_artifacts_signed_url',
    description: `Generate a signed URL for a single artifact file in Semaphore CI.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The UUID of the Semaphore CI organization.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The artifact file path to generate a signed URL for.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The scope level of the artifact.`,
      },
      {
        name: 'scope_id',
        type: 'string',
        required: true,
        description: `The UUID of the scoped resource (project, workflow, or job).`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `HTTP method for the signed URL (GET or HEAD).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `Optional project UUID for additional filtering context.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_docs_search',
    description: `Search Semaphore CI documentation for guides, references, and API details.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query string to look up in Semaphore documentation.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (1–30).`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `Optional documentation version to scope the search.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_get_test_results',
    description: `Fetch aggregated test results for a specific Semaphore CI job or pipeline.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Whether to fetch test results for a job or a pipeline.`,
      },
      {
        name: 'job_id',
        type: 'string',
        required: false,
        description: `The UUID of the job to fetch test results for (required when scope is 'job').`,
      },
      {
        name: 'pipeline_id',
        type: 'string',
        required: false,
        description: `The UUID of the pipeline to fetch test results for (required when scope is 'pipeline').`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_jobs_describe',
    description: `Get detailed information about a specific Semaphore CI job including its status, timestamps, and configuration.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The UUID of the job to describe.`,
      },
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The UUID of the Semaphore CI organization.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to return for the job.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_jobs_logs',
    description: `Retrieve the execution logs for a Semaphore CI job.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The UUID of the job whose logs to retrieve.`,
      },
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The UUID of the Semaphore CI organization.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_organizations_list',
    description: `List Semaphore CI organizations the authenticated user has access to.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of organizations to return.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_pipeline_jobs',
    description: `List all jobs in a Semaphore CI pipeline.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The UUID of the Semaphore CI organization.`,
      },
      {
        name: 'pipeline_id',
        type: 'string',
        required: true,
        description: `The UUID of the pipeline whose jobs to list.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_pipelines_list',
    description: `List pipelines associated with a Semaphore CI workflow, most recent first.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization that owns the workflow.`,
      },
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `UUID of the workflow to list pipelines for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of pipelines to return (1-100).`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to include in the response.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `UUID of the project to filter pipelines by, or empty string for no filter.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_projects_list',
    description: `List projects that belong to a Semaphore CI organization.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization to list projects for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of projects to return (1-200).`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to include in the response.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_projects_search',
    description: `Search Semaphore CI projects by name, repository URL, or description.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization to search projects in.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of projects to return (1-50).`,
      },
      {
        name: 'max_pages',
        type: 'number',
        required: false,
        description: `Maximum number of pages to fetch when searching across paginated results (1-10).`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to include in the response.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text query to filter projects by name or description.`,
      },
      {
        name: 'repository_url',
        type: 'string',
        required: false,
        description: `Filter projects by their linked repository URL.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_tasks_describe',
    description: `Get detailed information about a Semaphore CI scheduled task (periodic).`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization that owns the project.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project that owns the task.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `UUID of the scheduled task to describe.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to include in the response.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_tasks_list',
    description: `List scheduled tasks (periodics) for a Semaphore CI project.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization that owns the project.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project to list tasks for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of tasks to return (1-100).`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to include in the response.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_tasks_run',
    description: `Trigger a Semaphore CI scheduled task to run immediately.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization that owns the project.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project that owns the task.`,
      },
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `UUID of the scheduled task to trigger.`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Git branch to run the task against, overriding the task's default branch.`,
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Key-value pairs of pipeline parameters to pass to the task run.`,
      },
      {
        name: 'pipeline_file',
        type: 'string',
        required: false,
        description: `Path to the pipeline YAML file to use, overriding the task's default.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_workflows_rerun',
    description: `Rerun an existing Semaphore CI workflow.`,
    params: [
      {
        name: 'workflow_id',
        type: 'string',
        required: true,
        description: `ID of the workflow to rerun.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_workflows_run',
    description: `Schedule a new Semaphore CI workflow run for a project.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization that owns the project.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project to run the workflow for.`,
      },
      {
        name: 'reference',
        type: 'string',
        required: true,
        description: `Git reference to run the workflow against (e.g., refs/heads/main).`,
      },
      {
        name: 'commit_sha',
        type: 'string',
        required: false,
        description: `Specific git commit SHA to run the workflow at.`,
      },
      {
        name: 'parameters',
        type: 'object',
        required: false,
        description: `Key-value pairs of pipeline parameters to pass to the workflow run.`,
      },
      {
        name: 'pipeline_file',
        type: 'string',
        required: false,
        description: `Path to the pipeline YAML file to use for this workflow run.`,
      },
    ],
  },
  {
    name: 'semaphorecimcp_workflows_search',
    description: `Search recent Semaphore CI workflows for a project, most recent first.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `UUID of the organization that owns the project.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `UUID of the project to search workflows for.`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Filter workflows by git branch name.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching the next page of results.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of workflows to return (1-100).`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Level of detail to include in the response.`,
      },
      {
        name: 'my_workflows_only',
        type: 'boolean',
        required: false,
        description: `If true, return only workflows triggered by the authenticated user.`,
      },
      {
        name: 'requester',
        type: 'string',
        required: false,
        description: `Filter workflows by the username of the user who triggered them.`,
      },
    ],
  },
]
