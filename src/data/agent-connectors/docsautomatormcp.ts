import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'docsautomatormcp_cancel_esign_session',
    description: `Cancel an in-progress signing session. Cannot cancel already completed sessions. Optionally provide a cancellation reason.`,
    params: [
      { name: 'sessionId', type: 'string', required: true, description: `The unique ID of the signing session to act on.` },
      { name: 'reason', type: 'string', required: false, description: `Optional reason for cancelling the signing session.` },
    ],
  },
  {
    name: 'docsautomatormcp_create_automation',
    description: `Create a new automation with the specified data source. Returns the new automation ID and configuration.`,
    params: [
      { name: 'dataSourceName', type: 'string', required: true, description: `The data source type to connect to this automation.` },
      { name: 'title', type: 'string', required: true, description: `Display name for the new automation.` },
      { name: 'docTemplateLink', type: 'string', required: false, description: `URL of the Google Doc template to use as the document template.` },
    ],
  },
  {
    name: 'docsautomatormcp_create_document',
    description: `Generate a document from a DocsAutomator automation. Supports various data sources including Airtable, Google Sheets, SmartSuite, ClickUp, and direct API data. Returns PDF URL and optionally Google Doc URL.

**E-SIGNATURES**: If the automation has e-signing enabled in its output settings, creating a document will AUTOMATICALLY start the signing workflow. The response will include:
- signingSessionId: The e-sign session ID
- signingLinks: Array of signing URLs for each signer (if delivery method is "link")
- signingStatus: "created" or "queued"

You do NOT need to create e-sign sessions separately - they are triggered automatically when generating documents from automations configured with e-signing. To check if an automation has e-signing enabled, use get_automation first.

For nested line items (up to 2 levels), use the "children" key to nest items:
{
  "line_items_1": [
    {
      "product": "Service A",
      "price": "$100",
      "children": [
        {
          "task": "Task 1",
          "children": [
            {"detail": "Detail 1"}
          ]
        }
      ]
    }
  ]
}`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
      { name: 'async', type: 'boolean', required: false, description: `When true, returns a jobId immediately instead of waiting for document generation to complete.` },
      { name: 'data', type: 'object', required: false, description: `Placeholder key-value pairs for API data sources. Use arrays for line items and the 'children' key for nested line items (up to 2 levels).` },
      { name: 'documentName', type: 'string', required: false, description: `Optional custom name for the generated document.` },
      { name: 'recId', type: 'string', required: false, description: `Record ID for Airtable data sources.` },
      { name: 'rowNumber', type: 'number', required: false, description: `Row number for Google Sheets data sources.` },
    ],
  },
  {
    name: 'docsautomatormcp_delete_automation',
    description: `Permanently delete an automation. This action cannot be undone.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
    ],
  },
  {
    name: 'docsautomatormcp_duplicate_automation',
    description: `Create a copy of an existing automation with ' COPY' appended to the title. Returns the new automation ID.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
    ],
  },
  {
    name: 'docsautomatormcp_duplicate_template',
    description: `Create a copy of the Google Doc template associated with an automation. Returns the new template ID and URL.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
      { name: 'newTemplateName', type: 'string', required: false, description: `Optional name for the new template copy. Defaults to the original name with ' COPY' appended.` },
    ],
  },
  {
    name: 'docsautomatormcp_get_automation',
    description: `Get detailed information about a specific automation including data source config, output settings, field mappings, and e-signature configuration. Check the 'esignature' field to see if e-signing is enabled - if so, creating a document will automatically start a signing workflow.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
    ],
  },
  {
    name: 'docsautomatormcp_get_esign_audit',
    description: `Get the complete audit trail for a signing session including all events like invites, views, signatures, and completions.`,
    params: [
      { name: 'sessionId', type: 'string', required: true, description: `The unique ID of the signing session to act on.` },
    ],
  },
  {
    name: 'docsautomatormcp_get_esign_session',
    description: `Get detailed information about a signing session including signers, fields, document URLs, and current status.`,
    params: [
      { name: 'sessionId', type: 'string', required: true, description: `The unique ID of the signing session to act on.` },
    ],
  },
  {
    name: 'docsautomatormcp_get_job_status',
    description: `Get the current status of a queued document generation job. Returns status (waiting, active, completed, failed), progress percentage, and result when complete.`,
    params: [
      { name: 'jobId', type: 'string', required: true, description: `The job ID returned from async document creation.` },
    ],
  },
  {
    name: 'docsautomatormcp_get_queue_stats',
    description: `Get statistics about the document generation queue including counts of waiting, active, completed, failed, and delayed jobs.`,
    params: [
    ],
  },
  {
    name: 'docsautomatormcp_get_signing_links',
    description: `Get signing links for all signers in a session. Useful for manual delivery mode or resending links.`,
    params: [
      { name: 'sessionId', type: 'string', required: true, description: `The unique ID of the signing session to act on.` },
    ],
  },
  {
    name: 'docsautomatormcp_list_automations',
    description: `List all automations in the workspace with their basic configuration including title, data source, and active status.`,
    params: [
    ],
  },
  {
    name: 'docsautomatormcp_list_esign_sessions',
    description: `List e-signature sessions with optional filtering by status or signer email. Returns paginated results with session summaries.`,
    params: [
      { name: 'email', type: 'string', required: false, description: `Filter e-signature sessions by signer email address (partial match).` },
      { name: 'limit', type: 'number', required: false, description: `Number of results per page.` },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination.` },
      { name: 'status', type: 'string', required: false, description: `Filter sessions by their current status.` },
    ],
  },
  {
    name: 'docsautomatormcp_list_placeholders',
    description: `Extract all placeholders from a Google Doc template. Returns main placeholders and line item placeholders separately. Useful for understanding what data fields are available.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
    ],
  },
  {
    name: 'docsautomatormcp_poll_job_until_complete',
    description: `Poll a job until it completes or times out. Uses exponential backoff for efficient polling. Returns the final result including PDF URL when successful.`,
    params: [
      { name: 'jobId', type: 'string', required: true, description: `The job ID returned from async document creation.` },
      { name: 'pollIntervalMs', type: 'number', required: false, description: `Initial interval between polling requests in milliseconds. The tool uses exponential backoff.` },
      { name: 'timeoutMs', type: 'number', required: false, description: `Maximum time to wait in milliseconds before giving up.` },
    ],
  },
  {
    name: 'docsautomatormcp_resend_esign_invite',
    description: `Resend the signing invitation email to a specific signer. Useful when original email was missed or expired.`,
    params: [
      { name: 'sessionId', type: 'string', required: true, description: `The unique ID of the signing session to act on.` },
      { name: 'signerIndex', type: 'number', required: true, description: `1-based index identifying which signer to resend the invitation to.` },
    ],
  },
  {
    name: 'docsautomatormcp_send_test_email',
    description: `Send a test email with a sample PDF to verify email configuration. Rate limited to 5 emails per hour per workspace.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
      { name: 'recipient', type: 'string', required: true, description: `Email address to receive the test email.` },
    ],
  },
  {
    name: 'docsautomatormcp_update_automation',
    description: `Update an existing automation's basic settings (title, template link, active flag, locale, save destination, document-name field). For e-signature configuration, use update_automation_esignature instead.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
      { name: 'updates', type: 'object', required: true, description: `Fields to update on the automation. Only the fields you include are changed.` },
    ],
  },
  {
    name: 'docsautomatormcp_update_automation_esignature',
    description: `Update the e-signature configuration of an automation: enable/disable signing, set signers, customize email templates and language, configure save-to-Drive. Call get_automation first to see the current esignature state before editing. Arrays (signers, notificationRecipients) and Maps (fieldConfigs, esignFieldMappings) are FULL REPLACE — send the complete value, not a diff. In-flight signing sessions snapshot their email config at creation time, so editing the automation does NOT retroactively change sessions already sent out.`,
    params: [
      { name: 'automationId', type: 'string', required: true, description: `The unique ID of the automation to use.` },
      { name: 'esignature', type: 'object', required: true, description: `Partial e-signature configuration to apply. Only included fields are written; omitted fields stay unchanged.` },
    ],
  },
]
