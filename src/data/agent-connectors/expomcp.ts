import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'expomcp_add_library',
    description: `Add an Expo library to the project using expo install and attach usage instructions when available.`,
    params: [
      {
        name: 'libraryName',
        type: 'string',
        required: true,
        description: `Name of the Expo library to install`,
      },
      {
        name: 'projectRoot',
        type: 'string',
        required: true,
        description: `Root directory of the Expo project`,
      },
    ],
  },
  {
    name: 'expomcp_appstore_delete_review_response',
    description: `Delete the public developer response on an App Store customer review. No-op-safe — if the review has no response, it reports that nothing was deleted.`,
    params: [
      {
        name: 'reviewId',
        type: 'string',
        required: true,
        description: `The ID of the customer review whose response should be deleted`,
      },
    ],
  },
  {
    name: 'expomcp_appstore_reply_review',
    description: `Post or edit the public developer response to an App Store customer review. The response is visible to everyone on the App Store. Any existing response is replaced.`,
    params: [
      {
        name: 'responseBody',
        type: 'string',
        required: true,
        description: `The response text, posted publicly as the developer response (max 5970 characters)`,
      },
      {
        name: 'reviewId',
        type: 'string',
        required: true,
        description: `The ID of the customer review to respond to (from appstore_reviews)`,
      },
    ],
  },
  {
    name: 'expomcp_appstore_reviews',
    description: `Fetch public App Store customer reviews for an app including rating, title, body, reviewer, and territory. For TestFlight beta feedback use testflight_feedback instead.`,
    params: [
      {
        name: 'bundleId',
        type: 'string',
        required: true,
        description: `The bundle ID of the app e.g. com.example.myapp`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of reviews to return (default: 20, max: 100)`,
      },
    ],
  },
  {
    name: 'expomcp_build_cancel',
    description: `Cancels an EAS build that is queued or in progress. Use build_info to check the current status first.`,
    params: [
      {
        name: 'buildId',
        type: 'string',
        required: true,
        description: `The ID of the build to cancel`,
      },
    ],
  },
  {
    name: 'expomcp_build_info',
    description: `Fetches detailed information about a specific EAS build by ID including status, platform, artifacts, and logs URL.`,
    params: [
      {
        name: 'buildId',
        type: 'string',
        required: true,
        description: `The ID of the build to fetch details for`,
      },
    ],
  },
  {
    name: 'expomcp_build_list',
    description: `Lists recent EAS builds for a project. Provide either appId (from app.json extra.eas.projectId) or appFullName (e.g. @owner/my-app).`,
    params: [
      {
        name: 'appFullName',
        type: 'string',
        required: false,
        description: `The full name of the app e.g. @owner/my-app. Either appId or appFullName is required.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `The Expo project/app ID (UUID). Either appId or appFullName is required.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of builds to return (default: 10, max: 100)`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter builds by platform`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter builds by status` },
    ],
  },
  {
    name: 'expomcp_build_logs',
    description: `Fetches the build logs for a specific EAS build. Returns log output to help debug build failures.`,
    params: [
      {
        name: 'buildId',
        type: 'string',
        required: true,
        description: `The ID of the build to fetch logs for`,
      },
    ],
  },
  {
    name: 'expomcp_build_run',
    description: `Triggers a new EAS build using a build profile from eas.json. Requires a GitHub repository to be connected to the project.`,
    params: [
      {
        name: 'buildProfile',
        type: 'string',
        required: true,
        description: `The build profile name from eas.json e.g. development, preview, production`,
      },
      {
        name: 'gitRef',
        type: 'string',
        required: true,
        description: `Git reference (branch name, tag, or commit SHA) to build from`,
      },
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `The platform to build for (ANDROID or IOS)`,
      },
      {
        name: 'appFullName',
        type: 'string',
        required: false,
        description: `The full name of the app e.g. @owner/my-app. Either appId or appFullName is required.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `The Expo project/app ID (UUID). Either appId or appFullName is required.`,
      },
      {
        name: 'autoSubmit',
        type: 'boolean',
        required: false,
        description: `Whether to automatically submit the build after completion`,
      },
      {
        name: 'baseDirectory',
        type: 'string',
        required: false,
        description: `Base directory for monorepos e.g. apps/mobile`,
      },
      {
        name: 'submitProfile',
        type: 'string',
        required: false,
        description: `Submit profile to use if autoSubmit is true`,
      },
    ],
  },
  {
    name: 'expomcp_build_submit',
    description: `Submits an existing EAS build to the App Store (iOS) or Google Play (Android). Provide appId or appFullName, the buildId, and platform.`,
    params: [
      {
        name: 'buildId',
        type: 'string',
        required: true,
        description: `The ID of the build to submit`,
      },
      {
        name: 'platform',
        type: 'string',
        required: true,
        description: `The platform to submit to (ANDROID or IOS)`,
      },
      {
        name: 'appFullName',
        type: 'string',
        required: false,
        description: `The full name of the app e.g. @owner/my-app. Either appId or appFullName is required.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `The Expo project/app ID (UUID). Either appId or appFullName is required.`,
      },
      {
        name: 'ascAppIdentifier',
        type: 'string',
        required: false,
        description: `For iOS: The App Store Connect app identifier (Apple ID of the app). Required for iOS submissions.`,
      },
      {
        name: 'track',
        type: 'string',
        required: false,
        description: `For Android: The release track (internal, alpha, beta, production). Required for Android submissions.`,
      },
    ],
  },
  {
    name: 'expomcp_learn',
    description: `Learn Expo how-to for a specific topic and remember it for future conversations.`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `The Expo topic to learn about`,
      },
    ],
  },
  {
    name: 'expomcp_playstore_crashes',
    description: `Fetch crash and ANR data from Google Play (Android Vitals). Without issueId, lists recent crash/ANR issues. With issueId, returns the full error report with stack trace.`,
    params: [
      {
        name: 'packageName',
        type: 'string',
        required: true,
        description: `The Android package name of the app e.g. com.example.myapp`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'issueId',
        type: 'string',
        required: false,
        description: `Specific error issue ID to fetch the full report for. If omitted, lists recent issues.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of issues to list (default: 20, max: 100, ignored when issueId is provided)`,
      },
    ],
  },
  {
    name: 'expomcp_playstore_reply_review',
    description: `Post a public developer reply to a Google Play user review, or edit the existing reply. Each review has a single developer reply, so replying again replaces it. Reply text is limited to 350 characters.`,
    params: [
      {
        name: 'packageName',
        type: 'string',
        required: true,
        description: `The Android package name of the app e.g. com.example.myapp`,
      },
      {
        name: 'replyText',
        type: 'string',
        required: true,
        description: `The reply text, posted publicly as the developer reply (max 350 characters)`,
      },
      {
        name: 'reviewId',
        type: 'string',
        required: true,
        description: `The ID of the review to reply to (from playstore_reviews)`,
      },
    ],
  },
  {
    name: 'expomcp_playstore_reviews',
    description: `Fetch user reviews from Google Play including author, star rating, device info, and comment text. Note: Google Play only exposes production reviews with text from approximately the last week.`,
    params: [
      {
        name: 'packageName',
        type: 'string',
        required: true,
        description: `The Android package name of the app e.g. com.example.myapp`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of reviews to return (default: 20, max: 100)`,
      },
    ],
  },
  {
    name: 'expomcp_read_documentation',
    description: `Fetch a single Expo documentation page and return its content as markdown. Returns up to ~5000 tokens per call. Use offset to paginate through long pages.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the Expo documentation page to fetch`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Character offset to start reading from. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'expomcp_testflight_crashes',
    description: `Fetch TestFlight crash data. Without crashId, lists recent crashes. With crashId, returns the full crash log with stack trace.`,
    params: [
      {
        name: 'bundleId',
        type: 'string',
        required: true,
        description: `The bundle ID of the app e.g. com.example.myapp`,
      },
      {
        name: 'crashId',
        type: 'string',
        required: false,
        description: `Specific crash ID to fetch full details for. If omitted, lists recent crashes.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of crashes to list (default: 20, max: 100, ignored when crashId is provided)`,
      },
    ],
  },
  {
    name: 'expomcp_testflight_feedback',
    description: `Fetch screenshot feedback from TestFlight including device info, user comments, and screenshot URLs.`,
    params: [
      {
        name: 'bundleId',
        type: 'string',
        required: true,
        description: `The bundle ID of the app e.g. com.example.myapp`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of feedback submissions to return (default: 20, max: 100)`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_cancel',
    description: `Cancels an EAS workflow run that is queued or in progress.`,
    params: [
      {
        name: 'workflowRunId',
        type: 'string',
        required: true,
        description: `The ID of the workflow run to cancel`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_create',
    description: `Creates a new EAS workflow YAML file for Expo projects or fetches workflow syntax documentation. Use when users want to create CI/CD workflows in .eas/workflows/ or need to learn EAS workflow syntax.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: create to make a new EAS workflow YML file, learn to get syntax documentation`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: false,
        description: `Workflow file name e.g. build-and-deploy.yml (required for create action)`,
      },
      {
        name: 'projectRoot',
        type: 'string',
        required: false,
        description: `Root directory of the project (required for create action)`,
      },
      {
        name: 'workflowYaml',
        type: 'string',
        required: false,
        description: `Complete YAML content for the EAS workflow (required for create action)`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_info',
    description: `Fetches detailed information about a specific EAS workflow run by ID including status, job results, errors, and artifacts.`,
    params: [
      {
        name: 'workflowRunId',
        type: 'string',
        required: true,
        description: `The ID of the workflow run to fetch details for`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_list',
    description: `Lists recent EAS workflow runs for a project. Provide either appId (from app.json extra.eas.projectId) or appFullName (e.g. @owner/my-app).`,
    params: [
      {
        name: 'appFullName',
        type: 'string',
        required: false,
        description: `The full name of the app e.g. @owner/my-app. Either appId or appFullName is required.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `The Expo project/app ID (UUID). Either appId or appFullName is required.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of workflow runs to return (default: 10, max: 100)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter workflow runs by status`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_logs',
    description: `Fetches logs for a specific job in an EAS workflow run. Call without sectionIndex or phase to get a summary of log sections; then call again with sectionIndex or phase to fetch that section.`,
    params: [
      {
        name: 'jobName',
        type: 'string',
        required: true,
        description: `The name of the job to fetch logs for`,
      },
      {
        name: 'workflowRunId',
        type: 'string',
        required: true,
        description: `The ID of the workflow run`,
      },
      {
        name: 'phase',
        type: 'string',
        required: false,
        description: `Phase name to fetch logs for`,
      },
      {
        name: 'sectionIndex',
        type: 'integer',
        required: false,
        description: `Index of the log section to fetch`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_run',
    description: `Triggers an EAS workflow run for a project. Provide either appId (from app.json extra.eas.projectId) or appFullName (e.g. @owner/my-app) and the workflow file name.`,
    params: [
      {
        name: 'workflowFileName',
        type: 'string',
        required: true,
        description: `The workflow file name to run e.g. build-and-deploy.yml`,
      },
      {
        name: 'appFullName',
        type: 'string',
        required: false,
        description: `The full name of the app e.g. @owner/my-app. Either appId or appFullName is required.`,
      },
      {
        name: 'appId',
        type: 'string',
        required: false,
        description: `The Expo project/app ID (UUID). Either appId or appFullName is required.`,
      },
      {
        name: 'gitRef',
        type: 'string',
        required: false,
        description: `Git reference (branch name, tag, or commit SHA) to run the workflow on`,
      },
    ],
  },
  {
    name: 'expomcp_workflow_validate',
    description: `Validates an EAS workflow YAML file for syntax and configuration errors. Use after workflow_create to ensure the workflow is valid before running.`,
    params: [
      {
        name: 'fileName',
        type: 'string',
        required: true,
        description: `Workflow file name to validate e.g. build-and-deploy.yml`,
      },
      {
        name: 'projectRoot',
        type: 'string',
        required: true,
        description: `Root directory of the project`,
      },
    ],
  },
]
