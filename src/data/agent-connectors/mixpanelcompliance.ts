import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mixpanelcompliance_gdpr_deletion_cancel',
    description: `Cancel a pending GDPR/CCPA data deletion request before Mixpanel begins permanently erasing the data. Returns no content on success. Cancellation can fail once the deletion has already progressed too far to stop — check 'mixpanelcompliance_gdpr_deletion_status' first if you're unsure, and be prepared for this call to be rejected once a deletion is underway.`,
    params: [
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview), identifying which project this request applies to. Sent as the 'token' query parameter. This is distinct from the GDPR Compliance Token used to authenticate this connection.`,
      },
      {
        name: 'tracking_id',
        type: 'string',
        required: true,
        description: `The tracking ID returned by 'mixpanelcompliance_gdpr_deletion_create' when the deletion request was created.`,
      },
    ],
  },
  {
    name: 'mixpanelcompliance_gdpr_deletion_create',
    description: `Permanently delete ALL data Mixpanel holds for the given distinct_ids — every event and profile property, across all time. This is irreversible once processing completes, and per Mixpanel's GDPR/CCPA documentation it can take up to 30 days to fully propagate through Mixpanel's systems. Only call this to fulfill a genuine right-to-erasure request — never speculatively or for testing. Use 'mixpanelcompliance_gdpr_deletion_status' with the returned tracking_id to monitor progress, and 'mixpanelcompliance_gdpr_deletion_cancel' to attempt to stop it before processing starts.`,
    params: [
      {
        name: 'distinct_ids',
        type: 'array',
        required: true,
        description: `The Mixpanel distinct_ids whose data will be PERMANENTLY deleted. This cannot be undone. Mixpanel accepts at most 1999 distinct_ids per deletion request — split larger batches into multiple calls.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview), identifying which project to run this request against. Sent as the 'token' query parameter. This is distinct from the GDPR Compliance Token used to authenticate this connection.`,
      },
      {
        name: 'compliance_type',
        type: 'string',
        required: false,
        description: `The privacy regulation this request is being made under. Defaults to 'GDPR' when omitted.`,
      },
    ],
  },
  {
    name: 'mixpanelcompliance_gdpr_deletion_status',
    description: `Check the status of a GDPR/CCPA data deletion request previously created with 'mixpanelcompliance_gdpr_deletion_create'. The response's status field is one of: PENDING, STAGING, STARTED, SUCCESS, FAILURE, REVOKED, NOT_FOUND, or UNKNOWN. Deletions can take up to 30 days to reach SUCCESS. While a request is still PENDING or STAGING it may still be cancellable via 'mixpanelcompliance_gdpr_deletion_cancel'.`,
    params: [
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview), identifying which project to check this request against. Sent as the 'token' query parameter. This is distinct from the GDPR Compliance Token used to authenticate this connection.`,
      },
      {
        name: 'tracking_id',
        type: 'string',
        required: true,
        description: `The tracking ID returned by 'mixpanelcompliance_gdpr_deletion_create' when the deletion request was created.`,
      },
    ],
  },
  {
    name: 'mixpanelcompliance_gdpr_retrieval_create',
    description: `Create a GDPR or CCPA Subject Access Request (SAR) for one or more Mixpanel distinct_ids. Mixpanel asynchronously compiles an export of every event and profile property it holds for the given distinct_ids so you can fulfill a data subject's access request. This call only queues the export — use 'mixpanelcompliance_gdpr_retrieval_status' with the returned tracking_id to poll for completion and get the download details.`,
    params: [
      {
        name: 'distinct_ids',
        type: 'array',
        required: true,
        description: `The Mixpanel distinct_ids to retrieve all held data for. Mixpanel accepts at most 2000 distinct_ids per retrieval request — split larger batches into multiple calls.`,
      },
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview), identifying which project to run this request against. Sent as the 'token' query parameter. This is distinct from the GDPR Compliance Token used to authenticate this connection.`,
      },
      {
        name: 'compliance_type',
        type: 'string',
        required: false,
        description: `The privacy regulation this request is being made under. Defaults to 'GDPR' when omitted.`,
      },
      {
        name: 'disclosure_type',
        type: 'string',
        required: false,
        description: `The category of data to disclose. Required by Mixpanel when compliance_type is CCPA; ignored for GDPR requests.`,
      },
    ],
  },
  {
    name: 'mixpanelcompliance_gdpr_retrieval_status',
    description: `Check the status of a GDPR/CCPA data retrieval (Subject Access Request) previously created with 'mixpanelcompliance_gdpr_retrieval_create'. The response's status field is one of: PENDING, STAGING, STARTED, SUCCESS, FAILURE, REVOKED, NOT_FOUND, or UNKNOWN. Poll this until the status reaches SUCCESS (the export is ready), FAILURE, or REVOKED.`,
    params: [
      {
        name: 'project_token',
        type: 'string',
        required: true,
        description: `Your Mixpanel Project Token (Project Settings > Overview), identifying which project to check this request against. Sent as the 'token' query parameter. This is distinct from the GDPR Compliance Token used to authenticate this connection.`,
      },
      {
        name: 'tracking_id',
        type: 'string',
        required: true,
        description: `The tracking ID returned by 'mixpanelcompliance_gdpr_retrieval_create' when the retrieval request was created.`,
      },
    ],
  },
]
