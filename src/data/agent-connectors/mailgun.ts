import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mailgun_account_add_sandbox_recipient',
    description: `Add an authorized email recipient for your Mailgun sandbox domain. Sandbox domains can only send to explicitly authorized recipients (max 5), and the recipient must accept an invite email before they can receive test messages. Returns a 'Only 5 sandbox recipients are allowed' error if the limit has been reached.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address of the new authorized sandbox recipient, e.g. alice@example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_account_get_signing_key',
    description: `Get the HTTP webhook signing key currently saved on your Mailgun account. This key is used to verify that incoming webhook payloads genuinely originated from Mailgun by checking their signature.`,
    params: [],
  },
  {
    name: 'mailgun_account_ip_allowlist_create',
    description: `Add an IP address to the account's IP allowlist, restricting API key and SMTP credential usage to allowlisted IPs. This is a separate, account-security feature from the domain-level sender/recipient allowlist (mailgun_allowlist_* tools).`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The IP address to allowlist for account/API/SMTP access.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional human-readable description for this allowlist entry. Defaults to an empty string if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_account_ip_allowlist_delete',
    description: `Remove an IP address from the account's IP allowlist. If this removes the last remaining entry, API key and SMTP credential usage is no longer restricted by IP.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The allowlisted IP address to remove.`,
      },
    ],
  },
  {
    name: 'mailgun_account_ip_allowlist_list',
    description: `List the IP addresses allowlisted for this Mailgun account. When at least one entry exists, API key and SMTP credential usage is restricted to only these IP addresses — an added security layer so a leaked key/credential can't be used from an unrecognized location. This is a separate, account-security feature from the domain-level sender/recipient allowlist (mailgun_allowlist_* tools, which control suppression bypass for specific addresses).`,
    params: [],
  },
  {
    name: 'mailgun_account_ip_allowlist_update',
    description: `Update the description of an existing entry on the account's IP allowlist. The IP address itself identifies which entry to update; it is not changed by this call — remove and re-add the entry to change the IP itself.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The already-allowlisted IP address whose description should be updated.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description for this entry. Defaults to an empty string if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_account_limits_delete',
    description: `Delete the custom sending limit configured on the Mailgun account, reverting the account to Mailgun's default sending limit behavior.`,
    params: [],
  },
  {
    name: 'mailgun_account_limits_enable',
    description: `Re-enable a Mailgun account that was automatically disabled for exceeding its custom sending limit, restoring the account's ability to send messages.`,
    params: [],
  },
  {
    name: 'mailgun_account_limits_get',
    description: `Retrieve the current custom sending limit configured on the Mailgun account, including the limit value, how many messages have already been sent in the current period, and the period unit (m=months, d=days, h=hours). Returns a 404 if no custom limit is set.`,
    params: [],
  },
  {
    name: 'mailgun_account_limits_update',
    description: `Set (create or overwrite) a custom monthly sending limit for the Mailgun account, overriding the account's default limit. The limit value is passed as a query parameter and must be at least 1000, per Mailgun's own validation.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: true,
        description: `The custom monthly sending limit to set for the account. Must be at least 1000 (Mailgun rejects lower values with a 400).`,
      },
    ],
  },
  {
    name: 'mailgun_account_list_sandbox_recipients',
    description: `Get the list of authorized email recipients for your Mailgun sandbox domain, including whether each has activated (accepted the invite) yet.`,
    params: [],
  },
  {
    name: 'mailgun_account_regenerate_signing_key',
    description: `Create (if none exists) or regenerate the HTTP webhook signing key on your Mailgun account. Any previously issued signing key is invalidated, so webhook consumers verifying signatures must be updated with the new key returned by this call.`,
    params: [],
  },
  {
    name: 'mailgun_account_remove_sandbox_recipient',
    description: `Remove an authorized email recipient from your Mailgun sandbox domain, so it can no longer receive test messages sent from the sandbox. Returns an 'Invalid email address' error if the address isn't a valid email.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address of the authorized sandbox recipient to remove, e.g. alice@example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_account_resend_activation_email',
    description: `Resend the account activation email to the Mailgun account owner. Use this if the original activation email wasn't received or expired.`,
    params: [],
  },
  {
    name: 'mailgun_account_tags_delete',
    description: `Permanently delete a tag (and its associated analytics data) from the account.`,
    params: [
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The name of the tag to delete.`,
      },
    ],
  },
  {
    name: 'mailgun_account_tags_get_limits',
    description: `Get the account's tag limit and the current number of unique tags in use, so you can tell whether you're approaching the account's tag cap.`,
    params: [],
  },
  {
    name: 'mailgun_account_tags_search',
    description: `List all tags for the account, or search for tags by name/prefix, optionally including per-tag usage metrics and data from subaccounts. Supports sorting and pagination via the pagination object.`,
    params: [
      {
        name: 'include_metrics',
        type: 'boolean',
        required: false,
        description: `Whether to include usage metrics for each tag. Default false. When true, the maximum limit (in pagination) is 20.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Whether to include tag data from all subaccounts under this account. Default false.`,
      },
      {
        name: 'pagination',
        type: 'object',
        required: false,
        description: `Pagination and sorting options for the tag list/search. Example: {"sort": "lastseen:desc", "limit": 10}.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `A tag name or tag prefix to filter/search for. Omit to list all tags.`,
      },
    ],
  },
  {
    name: 'mailgun_account_tags_update',
    description: `Update the description of an existing account tag.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `The new description to set for this tag.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The name of the tag to update.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_clear',
    description: `Delete ALL account-level templates and all of their versions. This is irreversible, affects every account-level template across all domains on the account, and takes no parameters -- there is no way to scope or undo this call.`,
    params: [],
  },
  {
    name: 'mailgun_account_templates_copy',
    description: `Copy an existing account-level template into one or more new templates, each with a provided name and target account ID (and optionally a target domain). Provide 'requests' as a JSON array of {account_id, name, domain?} objects.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `List of copy requests. Each item must include account_id and name, and may include an optional domain to copy into a different target domain. Example: [{"account_id":"account-id-1","name":"new-template-name-1"},{"account_id":"account-id-2","name":"new-template-name-2","domain":"target-domain"}]`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `The name of the source account-level template to copy.`,
      },
      {
        name: 'source_versions',
        type: 'array',
        required: false,
        description: `Specific version tags to copy from the source template. If omitted or empty, all versions are copied.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_copy_version',
    description: `Copy an existing account-level template version into a new version with the provided name. Fails if the new version name already exists on the template.`,
    params: [
      {
        name: 'new_version_name',
        type: 'string',
        required: true,
        description: `The name for the new (copied) version. If a version with this name already exists, the copy fails.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name the version is stored under.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the source version to copy.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Comment to be used for the new version.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_create',
    description: `Create a new account-level template that is available across all domains on the account, storing its name, description, and (optionally) initial template content. If content is provided via the 'template' field, a new version is automatically created and becomes the active version. Note: binary attachments and inline file content are not supported by this tool; provide the template body as inline text/HTML/handlebars via the 'template' field only.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the account-level template being stored. Supports UTF-8 characters; the name is stored down-cased.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Version comment. Only valid if a new version is being created (i.e. 'template' is provided).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the template being stored.`,
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: `JSON-encoded object of MIME headers to store with the template. Only the keys From, Subject, and Reply-To are currently supported; they are inserted into the MIME at delivery time and message-level headers override template-level ones.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Initial tag of the created version. If 'template' is provided and tag is omitted, the default value 'initial' is used.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `Content of the template (HTML/text/handlebars). If provided, an initial version is automatically created and becomes active. Binary attachments and inline file content are not supported; use inline text/HTML only.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_create_version',
    description: `Add a new version to an existing account-level template. If the template has no other versions, the first version becomes active automatically. A template can store up to 40 versions. Note: binary attachments and inline file content are not supported by this tool; provide the version content as inline text/HTML/handlebars via the 'template' field only.`,
    params: [
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `Tag of the version being created. Must be unique within the template.`,
      },
      {
        name: 'template',
        type: 'string',
        required: true,
        description: `Content of the new template version (HTML/text/handlebars). Binary attachments and inline file content are not supported; use inline text/HTML only.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Name of the existing account-level template to create the new version for.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `If set to 'yes', this version becomes the active version immediately.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Comment related to the version that is being created.`,
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: `JSON-encoded object of MIME headers to store with this version. Only the keys From, Subject, and Reply-To are currently supported.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_delete',
    description: `Delete a specific account-level template. This deletes ALL versions of the specified template and is irreversible.`,
    params: [
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name to be deleted.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_delete_version',
    description: `Delete a specific version of an account-level template. This is irreversible; other versions of the template are unaffected.`,
    params: [
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name the version is stored under.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the version of the template to be deleted.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_get',
    description: `Retrieve metadata about a stored account-level template. If 'active' is set to yes, the content of the active version is included in the response.`,
    params: [
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name to fetch.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `If set to 'yes', the active version of the template (including its content) is included in the response.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_get_version',
    description: `Retrieve the information and content of a specific version of an account-level template.`,
    params: [
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name the version belongs to.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the version of the template to fetch.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_list',
    description: `List account-level templates, with cursor-based pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of templates to retrieve. Default and max limit is 100.`,
      },
      {
        name: 'p',
        type: 'string',
        required: false,
        description: `Pivot value used to retrieve the next/previous page of templates, taken from the 'paging' links of a prior response.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Name of the page to retrieve relative to the pivot ('p'). Defaults to 'first'.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_list_versions',
    description: `Return a paginated list of versions for a specific account-level template.`,
    params: [
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name to fetch the versions for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of versions to retrieve. Default and max limit is 100.`,
      },
      {
        name: 'p',
        type: 'string',
        required: false,
        description: `Pivot value used to retrieve the next/previous page of versions, taken from the 'paging' links of a prior response.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Name of the page to retrieve relative to the pivot ('p'). Defaults to 'first'.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_rename',
    description: `Rename an existing account-level template. Fails if a template with the new name already exists.`,
    params: [
      {
        name: 'new_template_name',
        type: 'string',
        required: true,
        description: `The name for the new (renamed) template. Fails if this name is already in use.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `The current name of the account-level template.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_update',
    description: `Update the description of an existing account-level template. This endpoint only updates template-level metadata (its description); to change content, create or update a version instead.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Updated description of the template.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `The name of the account-level template to update.`,
      },
    ],
  },
  {
    name: 'mailgun_account_templates_update_version',
    description: `Update information or content of a specific account-level template version. Existing fields not included in the request are left unchanged. Note: binary attachments and inline file content are not supported by this tool; provide replacement content as inline text/HTML/handlebars via the 'template' field only.`,
    params: [
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Account-level template name the version is stored under.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the version of the template to be updated.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `If set to 'yes', this version becomes the active version.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Updated comment related to the version.`,
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: `JSON-encoded object of MIME headers to store with this version. Only the keys From, Subject, and Reply-To are currently supported.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `New content of the template version (HTML/text/handlebars). Binary attachments and inline file content are not supported; use inline text/HTML only. Leave blank to keep the existing content.`,
      },
    ],
  },
  {
    name: 'mailgun_account_update_feature',
    description: `Update an account-level feature flag on your Mailgun account. Each feature value must be a JSON object encoded as a string. At least one of Webhooks Redact PII or AI Insights must be provided; Mailgun returns a 'No valid updates provided' error if both are left blank.`,
    params: [
      {
        name: 'ai_insights',
        type: 'string',
        required: false,
        description: `JSON object (encoded as a string) configuring the AI Insights feature, e.g. '{"enabled": false}'. Only required if this is the feature you're updating; leave blank otherwise.`,
      },
      {
        name: 'webhooks_redact_pii',
        type: 'string',
        required: false,
        description: `JSON object (encoded as a string) configuring PII redaction in webhook payloads, e.g. '{"enabled": false}'. Only required if this is the feature you're updating; leave blank otherwise.`,
      },
    ],
  },
  {
    name: 'mailgun_account_update_settings',
    description: `Update variable account-level settings on your Mailgun account: organization name, login session timeout periods, and the post-logout redirect URL. At least one of Name, Inactive Session Timeout, Absolute Session Timeout, or Logout Redirect URL must be provided, or Mailgun returns a 'must be provided to update account info' error.`,
    params: [
      {
        name: 'absolute_session_timeout',
        type: 'integer',
        required: false,
        description: `The absolute login session timeout period limit (in seconds), regardless of activity. Leave blank if not updating this setting.`,
      },
      {
        name: 'inactive_session_timeout',
        type: 'integer',
        required: false,
        description: `The login session timeout period (in seconds) for inactivity. Leave blank if not updating this setting.`,
      },
      {
        name: 'logout_redirect_url',
        type: 'string',
        required: false,
        description: `The URL to redirect users to upon logout. Leave blank if not updating this setting.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new account organization name. Leave blank if not updating this setting.`,
      },
    ],
  },
  {
    name: 'mailgun_account_webhooks_create',
    description: `Create an account-level webhook that receives Mailgun's POST callbacks for the given event type(s) across every domain on the account. Webhook URLs are deduplicated by event type across account- and domain-level webhooks, so this won't double-send to a URL already registered at the domain level for the same event. Note: configuration changes can take up to 10 minutes to take effect due to caching.`,
    params: [
      {
        name: 'event_types',
        type: 'array',
        required: true,
        description: `One or more event types this webhook should fire for. Provide each as a separate array element; Mailgun's API accepts this parameter repeated (event_types=opened&event_types=clicked), not as a single comma-joined value.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The destination URL that will receive Mailgun's POST callback.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A human-readable description of what this webhook is for.`,
      },
    ],
  },
  {
    name: 'mailgun_account_webhooks_delete',
    description: `Delete a single account-level webhook by its webhook ID. Note: this can take up to 10 minutes to take effect due to caching.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the account-level webhook to delete.`,
      },
    ],
  },
  {
    name: 'mailgun_account_webhooks_delete_all',
    description: `Delete multiple account-level webhooks at once by ID, or every account-level webhook on the account. Provide webhook_ids for a targeted deletion, or set delete_all to true to remove all of them — not both. Note: this can take up to 10 minutes to take effect due to caching.`,
    params: [
      {
        name: 'delete_all',
        type: 'boolean',
        required: false,
        description: `If true, deletes every account-level webhook on the account, ignoring webhook_ids. Defaults to false.`,
      },
      {
        name: 'webhook_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of webhook IDs to delete. Required unless delete_all is true.`,
      },
    ],
  },
  {
    name: 'mailgun_account_webhooks_get',
    description: `Retrieve a single account-level webhook by its webhook ID, including its URL, description, and subscribed event types.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the account-level webhook to retrieve.`,
      },
    ],
  },
  {
    name: 'mailgun_account_webhooks_list',
    description: `List account-level webhooks, which receive Mailgun's POST callbacks for the given event type across every domain on the account (as opposed to domain-level webhooks, which apply to a single domain). Optionally filter to a specific set of webhook IDs.`,
    params: [
      {
        name: 'webhook_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of webhook IDs to filter results to. Omit to return all account-level webhooks.`,
      },
    ],
  },
  {
    name: 'mailgun_account_webhooks_update',
    description: `Replace an existing account-level webhook's URL, subscribed event types, and description. This fully replaces the webhook's configuration rather than merging with the previous values. Note: configuration changes can take up to 10 minutes to take effect due to caching.`,
    params: [
      {
        name: 'event_types',
        type: 'array',
        required: true,
        description: `The new set of event types this webhook should fire for, replacing the previous set. Provide each as a separate array element; Mailgun's API accepts this parameter repeated (event_types=opened&event_types=clicked), not as a single comma-joined value.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The new destination URL that will receive Mailgun's POST callback.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the account-level webhook to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A human-readable description of what this webhook is for. Omit to clear it.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_create_alert',
    description: `Create a new Mailgun Alerts settings record, configuring a notification (via webhook, Slack, or email) that fires when a specific tracked event occurs (e.g. ip_listed, ip_delisted). Use mailgun_alerts_list_events to see the current set of valid event_type values. Note: when adding a webhook alert, Mailgun validates the URL is reachable via a GET request before saving; if it doesn't return 200, the request is rejected.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `The delivery method for the alert: email, webhook, or slack.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The type of event to alert on, e.g. ip_listed or ip_delisted. Use mailgun_alerts_list_events to fetch the current valid set of event types for your account.`,
      },
      {
        name: 'settings',
        type: 'object',
        required: true,
        description: `Channel-specific settings object; its shape depends on the channel value. For channel=webhook use {"url": "https://yourwebhookurl.com"}. For channel=email use {"emails": ["recipient@example.com"]}. For channel=slack use {"channel_ids": ["C0123"]}.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_delete_alert',
    description: `Delete an existing Mailgun Alerts settings record by its ID, stopping future notifications for that alert configuration. Use mailgun_alerts_list_alerts to find the settings ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the alert settings record to delete. Obtain this from mailgun_alerts_list_alerts.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_delete_slack_settings',
    description: `Delete the Slack integration settings and any Slack-channel alert event settings for the Mailgun account. To also revoke the underlying Slack OAuth access token use mailgun_alerts_revoke_slack_oauth; to fully remove the Mailgun app from the Slack workspace, do so from Slack's own app configuration screen.`,
    params: [],
  },
  {
    name: 'mailgun_alerts_get_slack_channel',
    description: `Retrieve details (ID, name, archived status) for a specific Slack channel connected to Mailgun Alerts, looked up by its Slack channel ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Slack channel ID to look up, e.g. C012AB3CD. Use mailgun_alerts_list_slack_channels to find channel IDs.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_list_alerts',
    description: `List all configured Mailgun Alerts settings records for the account, including each alert's event type, delivery channel, and channel-specific settings, plus the account's webhook signing key and Slack integration info.`,
    params: [],
  },
  {
    name: 'mailgun_alerts_list_events',
    description: `List the current set of event types that Mailgun Alerts can notify on (e.g. ip_listed, ip_delisted). Use one of the returned values as the event_type when creating or updating an alert.`,
    params: [],
  },
  {
    name: 'mailgun_alerts_list_slack_channels',
    description: `List the Slack channels visible to the Slack workspace connected to Mailgun Alerts, with cursor-based pagination.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of Slack channels to return in this request.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Encoded paging cursor, taken from the 'next' or 'first' link of a previous response. Omit to fetch the first page.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_reset_webhook_signing_key',
    description: `Reset (rotate) the HMAC signing key used to verify the authenticity of Mailgun Alerts webhook payloads. The response contains the new signing key; existing webhook consumers must be updated to use it, since the old key is invalidated immediately.`,
    params: [],
  },
  {
    name: 'mailgun_alerts_revoke_slack_oauth',
    description: `Revoke the Slack OAuth access token connected to this Mailgun account and delete the associated Slack settings and Slack-channel alert event settings. Note: all Mailgun accounts connected to the same Slack workspace share the same token, so this affects all of them. To fully remove the app from Slack, do so from Slack's own app configuration screen.`,
    params: [],
  },
  {
    name: 'mailgun_alerts_test_email',
    description: `Send a test Mailgun Alerts email notification containing dummy data to the given list of email addresses, to verify the email alert channel is configured correctly.`,
    params: [
      {
        name: 'emails',
        type: 'array',
        required: true,
        description: `List of email addresses to send the test alert to.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The event type to simulate in the test alert message (e.g. ip_listed). Any valid event type can be used, it does not need an actual configured alert.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_test_slack',
    description: `Send a test Mailgun Alerts Slack notification containing dummy data, to verify the Slack alert channel is configured correctly.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The event type to simulate in the test alert message (e.g. ip_listed). Any valid event type can be used, it does not need an actual configured alert.`,
      },
      {
        name: 'channel_ids',
        type: 'array',
        required: false,
        description: `Slack channel IDs to send the test message to. If omitted, the channel IDs already configured on this event's alert settings are used instead.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_test_webhook',
    description: `Send a test Mailgun Alerts webhook POST request containing dummy data to the given URL, to verify the webhook alert channel is configured correctly and reachable.`,
    params: [
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The event type to simulate in the test alert message (e.g. ip_listed). Any valid event type can be used, it does not need an actual configured alert.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The webhook URL to send the test POST request to.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_update_alert',
    description: `Update an existing Mailgun Alerts settings record by ID, changing its event type, delivery channel, and/or channel-specific settings. Note: when updating to a webhook alert, Mailgun validates the URL is reachable via a GET request before saving; if it doesn't return 200, the update is rejected with a 400.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `The delivery method for the alert: email, webhook, or slack.`,
      },
      {
        name: 'event_type',
        type: 'string',
        required: true,
        description: `The type of event to alert on, e.g. ip_listed or ip_delisted. Use mailgun_alerts_list_events to fetch the current valid set of event types for your account.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the alert settings record to update. Obtain this from mailgun_alerts_list_alerts.`,
      },
      {
        name: 'settings',
        type: 'object',
        required: true,
        description: `Channel-specific settings object; its shape depends on the channel value. For channel=webhook use {"url": "https://yourwebhookurl.com"}. For channel=email use {"emails": ["recipient@example.com"]}. For channel=slack use {"channel_ids": ["C0123"]}.`,
      },
    ],
  },
  {
    name: 'mailgun_alerts_update_slack_settings',
    description: `Update the Slack integration settings for Mailgun Alerts, including the OAuth token, team ID, team name, and granted OAuth scope. Note: these values are normally set automatically by Mailgun's Slack OAuth connect flow rather than entered manually.`,
    params: [
      {
        name: 'token',
        type: 'string',
        required: true,
        description: `The Slack bot OAuth token (begins with xoxb-) used to authenticate Mailgun's calls to the Slack API.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Comma-separated list of OAuth scopes granted to this Slack token.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `The Slack workspace (team) ID this token belongs to.`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `The Slack workspace (team) display name this token belongs to.`,
      },
    ],
  },
  {
    name: 'mailgun_allowlist_clear',
    description: `Delete the entire allowlist (all allowlisted addresses and domains) for a Mailgun domain. This is irreversible and removes every entry in one call.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The domain whose entire allowlist should be cleared.`,
      },
    ],
  },
  {
    name: 'mailgun_allowlist_create',
    description: `Add an email address or an entire domain to a Mailgun domain's allowlist table so messages from it skip spam filtering. Provide either address or domain (address takes priority if both are given). No file attachments are involved in this endpoint.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun domain to add the allowlist entry to, e.g. example.com.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Valid email address to add to the allowlist. Either address or domain must be supplied; if both are provided, address takes priority over domain (per Mailgun's API).`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Valid domain name to allowlist in its entirety. Either address or domain must be supplied; ignored if address is also given.`,
      },
    ],
  },
  {
    name: 'mailgun_allowlist_delete',
    description: `Remove a single address or domain entry from a Mailgun domain's allowlist. Known limitation (live-confirmed): the underlying REST executor substitutes 'value' into the URL path without percent-encoding it, so a bare domain value (e.g. 'example.com') works correctly, but an email-address value containing '@' currently fails with a generic, non-JSON 404 from Mailgun's own router rather than actually deleting the entry. Use mailgun_allowlist_clear to remove all entries (including email addresses) for a domain until this is fixed.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The domain to remove the allowlist entry from.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The address or domain value to remove from the allowlist, e.g. alice@example.com or example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_allowlist_get',
    description: `Fetch a single allowlist record for a domain to check whether a given email address or domain is present on the allowlist. Known limitation (live-confirmed): the underlying REST executor substitutes 'value' into the URL path without percent-encoding it, so a bare domain value (e.g. 'example.com') works correctly, but an email-address value containing '@' currently fails with a generic, non-JSON 404 from Mailgun's own router rather than a normal not-found response. Use mailgun_allowlist_list (optionally with a search term) to look up email-address entries until this is fixed.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain to look up the allowlist entry from.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The address or domain value to search for in the allowlist, e.g. alice@example.com or example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_allowlist_list',
    description: `Paginate over all allowlist records (allowlisted addresses and domains) for a Mailgun domain, optionally filtering by a search term or paging via an address cursor.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain to list allowlist entries for.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Address serving as a pagination divider between pages. Optional in practice — omit it to fetch the first page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return per page. Optional, default 100, max 1000.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Page direction relative to the address parameter. One of next, previous, or last. If empty, returns the first page.`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Filter records to those whose address starts with the specified substring. Optional.`,
      },
    ],
  },
  {
    name: 'mailgun_api_keys_create',
    description: `Create a new Mailgun API key. A role is always required. Depending on the key kind, a domain_name (for 'domain' kind) or user_id/email (for 'web' kind) should also be provided. The response includes the key's secret value exactly once, at creation time.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Key role, which determines the permissions granted to the key. 'admin' grants full account access, 'basic' grants analyst-level (read-mostly) access, 'sending' grants domain-scoped sending access (use only with kind='domain'), and 'developer' grants developer-level access.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text description of the key's purpose.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: false,
        description: `Web domain to associate with the key. Required in practice when kind is 'domain'.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `API key user's email address. Should be provided for all keys of kind 'web'.`,
      },
      {
        name: 'expiration',
        type: 'integer',
        required: false,
        description: `Key lifetime in seconds. Must be greater than 0 if set. If omitted, the key does not expire (unless kind is 'web', which has a maximum 1-day validity regardless).`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Type of API key to create. Defaults to 'user' if not provided. 'web' keys are not subject to IP allowlisting and have a maximum validity of 1 day.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `API key user's string user ID. Should be provided for all keys of kind 'web'.`,
      },
      {
        name: 'user_name',
        type: 'string',
        required: false,
        description: `API key user's display name.`,
      },
    ],
  },
  {
    name: 'mailgun_api_keys_delete',
    description: `Delete a Mailgun API key by its key ID. This permanently revokes the key; any integration using it will immediately lose access.`,
    params: [
      {
        name: 'key_id',
        type: 'string',
        required: true,
        description: `The Key ID generated by Mailgun on key creation, to delete.`,
      },
    ],
  },
  {
    name: 'mailgun_api_keys_list',
    description: `List Mailgun API keys on your account. Supports filtering by domain name (for domain keys) or by key kind (domain, user, or web).`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: false,
        description: `Filter results to domain keys belonging to this domain.`,
      },
      { name: 'kind', type: 'string', required: false, description: `Filter results by key kind.` },
    ],
  },
  {
    name: 'mailgun_api_keys_regenerate_public_key',
    description: `Regenerate the account's public API key. This invalidates the previous public key immediately; any integration relying on the old public key must be updated with the new value returned in the response.`,
    params: [],
  },
  {
    name: 'mailgun_bounce_classification_list_bounce_logs',
    description: `List bounce classification event logs for a sending domain. Deprecated by Mailgun: live-confirmed the endpoint now unconditionally rejects requests with "Deprecated: use POST /v1/analytics/logs" — use mailgun_logs_query instead. Kept here only for schema completeness / backward reference.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The sender domain name to list bounce classification event logs for.`,
      },
      {
        name: 'entity_id',
        type: 'string',
        required: false,
        description: `The entity ID (Email Service Entity or Spam Filter / Blocklist) to filter events by, e.g. gmail.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Limits the number of items returned in the response.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Encoded paging information, provided via the 'next'/'previous' links of a prior response.`,
      },
      {
        name: 'rule_id',
        type: 'string',
        required: false,
        description: `The bounce classification rule ID to filter events by. Optional if the page cursor is passed (i.e. required to start the first query, optional for subsequent paged requests).`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field and order. Default is '@timestamp:asc'.`,
      },
    ],
  },
  {
    name: 'mailgun_bounce_classification_list_domain_stats',
    description: `List bounce classification statistics per sending domain across the account. Deprecated by Mailgun in favor of POST /v2/bounce-classification/metrics, but still available.`,
    params: [
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Whether to include stats from subaccounts.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Limits the number of items returned in the response.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Query filter, e.g.: 'domain.name:example.com'.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Skips N items in the response, for pagination.`,
      },
    ],
  },
  {
    name: 'mailgun_bounce_classification_list_entities',
    description: `List the bounce classification entities (email service providers and spam filters/blocklists) known to Mailgun's bounce classification config. Takes no parameters. Deprecated by Mailgun in favor of POST /v2/bounce-classification/metrics, but still available.`,
    params: [],
  },
  {
    name: 'mailgun_bounce_classification_list_entity_stats',
    description: `List bounce classification statistics broken down per entity (email service provider or spam filter/blocklist) for a specific sending domain. Deprecated by Mailgun in favor of POST /v2/bounce-classification/metrics, but still available.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The sender domain name to list per-entity bounce statistics for.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Whether to include stats from subaccounts.`,
      },
    ],
  },
  {
    name: 'mailgun_bounce_classification_list_rule_stats',
    description: `List bounce classification statistics broken down per bounce-classification rule for a specific domain and entity (e.g. Gmail). Deprecated by Mailgun in favor of POST /v2/bounce-classification/metrics, but still available.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The sender domain name to list per-rule bounce statistics for.`,
      },
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The entity ID (Email Service Entity or Spam Filter / Blocklist), e.g. gmail.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Whether to include stats from subaccounts.`,
      },
    ],
  },
  {
    name: 'mailgun_bounce_classification_list_rules',
    description: `List the bounce classification rules configured in Mailgun's bounce classification engine. Takes no parameters. Deprecated by Mailgun in favor of GET /v2/bounce-classification/config/groups/{group-id}, but still available.`,
    params: [],
  },
  {
    name: 'mailgun_bounce_classification_list_stats',
    description: `List bounce classification statistics ordered by total bounces, optionally grouped by subaccount, domain, entity, or rule. Deprecated by Mailgun in favor of POST /v2/bounce-classification/metrics, but still available.`,
    params: [
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `Group response by fields: subaccount.id, domain.name, entity-id, or rule-id.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Whether to include stats from subaccounts.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Limits the number of items returned in the response.`,
      },
    ],
  },
  {
    name: 'mailgun_bounce_classification_query_stats_v2',
    description: `Query Mailgun's bounce classification metrics (v2), returning bounce/delay counts and rates grouped by the requested dimensions (e.g. domain, entity, tag) over a time window, with optional filtering and pagination. Items with zero bounces and zero delays are not returned.`,
    params: [
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Dimensions to group/break down the returned metrics by. Valid values: entity-name, domain.name, envelope.sending-ip, account.name, envelope.i-ip-pool-name, tags, tag, recipient-domain, group-id, criticality, severity, category, timestamp. Mailgun enforces an undocumented (not in the OpenAPI spec) maximum of 4 dimensions per request, rejecting 5+ with 'too many dimensions' regardless of which ones are chosen.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration in the format '48h', '60m', or '30s'. If provided, it is calculated from the end date and overwrites the start date.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `An end timestamp in RFC 2822 format (e.g. 'Mon, 02 Jan 2006 22:04:05 UTC'). Defaults to the current time if omitted.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Advanced filter expression narrowing results. Shape: {"AND": [{"attribute": <dimension or field name>, "comparator": "=", "values": [{"value": "..."}]}]}. Example: {"AND": [{"attribute": "domain.name", "comparator": "=", "values": [{"value": "example.com"}]}]}.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Include stats from all subaccounts. Omitted from the request entirely if not set.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Metrics to return. Known values include: critical_bounce_count, non_critical_bounce_count, critical_delay_count, non_critical_delay_count, delivered_smtp_count, classified_failures_count, critical_bounce_rate, non_critical_bounce_rate, critical_delay_rate, non_critical_delay_rate.`,
      },
      {
        name: 'pagination_limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items returned in the response. Maximum 50, default 10.`,
      },
      {
        name: 'pagination_skip',
        type: 'integer',
        required: false,
        description: `The number of items to skip over when satisfying the request. Set to zero for the first page, then increment by the limit for subsequent calls.`,
      },
      {
        name: 'pagination_sort',
        type: 'string',
        required: false,
        description: `Colon-separated value indicating the column name and sort direction for pagination, e.g. 'entity-name:asc'.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Resolution of the metrics: 'day' or 'hour'.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `A start timestamp in RFC 2822 format (e.g. 'Sun, 01 Jan 2006 22:04:05 UTC'). Defaults to 7 days before the current time if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_bounces_clear',
    description: `Delete all bounce (suppression) records for a Mailgun domain in a single call. Delivery to every previously bounced address resumes immediately. This is a destructive, irreversible bulk operation affecting the entire domain — use mailgun_bounces_delete to remove a single address instead.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to clear all bounce records from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_bounces_create',
    description: `Add one or more bounce (hard-bounce suppression) records to a Mailgun domain's bounce list, stopping delivery to the listed addresses. Accepts up to 1000 bounce records per call as a JSON array; each record requires an address and may optionally include the SMTP error code, error message, and the bounce event's timestamp in RFC2822 format. Note: field names for this bulk JSON endpoint use Mailgun's legacy wire format (createdat, no underscore) which differs from the created_at field returned by the lookup/list endpoints.`,
    params: [
      {
        name: 'bounces',
        type: 'array',
        required: true,
        description: `Array of bounce records to add (max 1000 per call). Each item requires an address; code (SMTP error code, e.g. "550"), error (SMTP error message), and createdat (RFC2822 timestamp) are optional and default on Mailgun's side when omitted. Example: [{"address": "alice@example.com", "code": "550", "error": "Bounced", "createdat": "Thu, 11 Dec 2025 01:49:40 UTC"}]`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to add the bounce records to, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_bounces_delete',
    description: `Remove a single email address from a Mailgun domain's bounce (suppression) list. Delivery to that address resumes until it bounces again. Returns a 404 if the address is not currently present in the bounces table.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to remove from the domain's bounce list.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to remove the bounce from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_bounces_get',
    description: `Fetch a single bounce (suppression) record for a specific email address on a Mailgun domain, returning the SMTP error code, error message, and creation timestamp if that address is currently suppressed due to a bounce. Returns a 404 if the address is not present in the bounces table.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to search for in the domain's bounce list.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to retrieve the bounce record from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_bounces_list',
    description: `Paginate through the bounce (suppression) list for a Mailgun domain. Supports limiting the page size, moving through pages via a page direction cursor, and filtering to addresses that start with a given substring.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to list bounces for, e.g. mg.example.com.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of bounce records to return per page. Max 1000, default 100.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Page direction relative to the current cursor: next, previous, or last. Leave empty to return the first page.`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Filter records to addresses that start with this substring.`,
      },
    ],
  },
  {
    name: 'mailgun_complaints_clear',
    description: `Delete all spam complaint (suppression) records for a Mailgun domain in a single call. Delivery to every previously complained-about address resumes immediately. This is a destructive, irreversible bulk operation affecting the entire domain — use mailgun_complaints_delete to remove a single address instead.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to clear all complaint records from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_complaints_create',
    description: `Add one or more spam complaint records to a Mailgun domain's complaint (suppression) list. Accepts up to 1000 complaint records per call as a JSON array; each record requires an address and may optionally include the complaint event's timestamp in RFC2822 format. Note: field names for this bulk JSON endpoint use Mailgun's legacy wire format (createdat, no underscore) which differs from the created_at field returned by the lookup/list endpoints.`,
    params: [
      {
        name: 'complaints',
        type: 'array',
        required: true,
        description: `Array of complaint records to add (max 1000 per call). Each item requires an address; createdat (RFC2822 timestamp) is optional and defaults to the current time on Mailgun's side when omitted. Example: [{"address": "alice@example.com", "createdat": "Thu, 11 Dec 2025 01:49:40 UTC"}]`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to add the complaint records to, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_complaints_delete',
    description: `Remove a single email address from a Mailgun domain's spam complaint (suppression) list. Delivery to that address resumes until there is another complaint. Returns a 404 if no complaint is found for the address.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to remove from the domain's complaint list.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to remove the complaint from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_complaints_get',
    description: `Fetch a single complaint (suppression) record for a specific email address on a Mailgun domain, checking whether that address is currently present in the complaints list and returning its creation timestamp if so. Returns a 404 if no complaint is found for the address.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to search for in the domain's complaint list.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to retrieve the complaint record from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_complaints_list',
    description: `Paginate through the spam complaint (suppression) list for a Mailgun domain. Supports limiting the page size, moving through pages via a page direction cursor and an address divider, and filtering to addresses that start with a given substring.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to list complaints for, e.g. mg.example.com.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Address serving as a divider between pages, used together with the page parameter to move forward/backward through results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of complaint records to return per page. Max 1000, default 100.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Page direction relative to the address divider: next, previous, or last. Leave empty to return the first page.`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Filter records to addresses that start with this substring.`,
      },
    ],
  },
  {
    name: 'mailgun_dkim_security_rotate_key',
    description: `Immediately rotate the Automatic Sender Security DKIM key for a domain. This triggers a rotation even if auto-rotation is disabled on the domain. The domain must be in the 'enabled' state (fully verified) for rotation to succeed.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The domain name whose DKIM key should be rotated. Must be a domain already added to your Mailgun account, in the 'enabled' state.`,
      },
    ],
  },
  {
    name: 'mailgun_dkim_security_update_rotation_policy',
    description: `Update the Automatic Sender Security DKIM key rotation policy for a domain: enable or disable auto-rotation, and optionally set the rotation interval (minimum allowed interval is 5 days, e.g. '5d').`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The domain name whose DKIM rotation policy should be updated.`,
      },
      {
        name: 'rotation_enabled',
        type: 'boolean',
        required: true,
        description: `If true, enables DKIM auto-rotation for the domain. If false, disables it.`,
      },
      {
        name: 'rotation_interval',
        type: 'string',
        required: false,
        description: `The interval at which to rotate keys, e.g. '5d' for five days. Minimum allowed interval is 5 days. Only allowed when rotation_enabled is true.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_activate_key',
    description: `Activate a DKIM domain key so it will be used to sign outgoing email for the given domain authority and selector. Note: the DNS records for the key must already be valid before it can be activated.`,
    params: [
      {
        name: 'authority_name',
        type: 'string',
        required: true,
        description: `The domain authority name to activate the key for. Must be a valid domain.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `The DKIM selector of the key to activate. Must be a valid dot atom.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_create_key',
    description: `Create a new DKIM domain key for a signing domain. Optionally set the key size (bits) or import an existing RSA private key by pasting its PEM text (PKCS #1, ASN.1 DER format) into the pem field. Note: uploading the private key as a binary file attachment is not supported by this tool; only the form-string 'pem' parameter is available. Once created or imported, private keys are never exported by Mailgun.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `Selector to identify the new domain key. Must be unique per domain.`,
      },
      {
        name: 'signing_domain',
        type: 'string',
        required: true,
        description: `Signing domain to associate the new domain key with.`,
      },
      {
        name: 'bits',
        type: 'integer',
        required: false,
        description: `Key size in bits for a newly generated key. Valid values: 1024 or 2048. Ignored when importing via 'pem'.`,
      },
      {
        name: 'pem',
        type: 'string',
        required: false,
        description: `Existing RSA private key to import, as PEM text (PKCS #1, ASN.1 DER format). Note: only pasted PEM text is supported here, not a binary file upload.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_deactivate_key',
    description: `Deactivate a DKIM domain key for the given domain authority and selector so it will no longer be used to sign outgoing email, even if it is still valid.`,
    params: [
      {
        name: 'authority_name',
        type: 'string',
        required: true,
        description: `The domain authority name to deactivate the key for. Must be a valid domain.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `The DKIM selector of the key to deactivate. Must be a valid dot atom.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_delete_key',
    description: `Permanently delete a DKIM domain key identified by its signing domain and selector. Domain keys are not recoverable after deletion, and a domain must always have at least one active domain key.`,
    params: [
      {
        name: 'selector',
        type: 'string',
        required: true,
        description: `Selector of the domain key to delete.`,
      },
      {
        name: 'signing_domain',
        type: 'string',
        required: true,
        description: `Signing domain that owns the domain key to delete.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_list_all_keys',
    description: `List DKIM domain keys across all domains on your Mailgun account, optionally filtered by signing domain or selector. Results are paginated; use the 'page' cursor returned in a previous response's paging links to navigate pages (omit it to start from the first page). Note: Mailgun's OpenAPI spec attaches a request body to this GET endpoint, but this tool sends these fields as query parameters instead, matching how the API actually expects them. Performance note (live-confirmed): calling this without 'signing_domain' scans all domains on the account and can take 10+ seconds or time out on accounts with many domains/keys; the same call scoped to a single 'signing_domain' returns in ~2 seconds. Prefer passing 'signing_domain' whenever you know it.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of domain keys to return per page. Default 10, max 100.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Encoded paging cursor copied from the 'next' or 'previous' link in a prior response's paging object. Omit on the first call to start from the first page.`,
      },
      {
        name: 'selector',
        type: 'string',
        required: false,
        description: `Filter results to domain keys with this selector.`,
      },
      {
        name: 'signing_domain',
        type: 'string',
        required: false,
        description: `Filter results to domain keys belonging to this signing domain.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_list_domain_keys',
    description: `List all DKIM domain keys for a specific domain authority, including active/inactive and valid/invalid keys.`,
    params: [
      {
        name: 'authority_name',
        type: 'string',
        required: true,
        description: `The domain authority name to list domain keys for. Must be a valid domain.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_update_authority',
    description: `Change the DKIM authority for a domain. A domain's DKIM authority determines whose domain keys are used to sign its email; by default a domain is its own authority. Set self to true to make the domain its own DKIM authority even if a root domain is registered on the same account, or false to delegate authority to that root domain.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to update the DKIM authority for.`,
      },
      {
        name: 'self',
        type: 'boolean',
        required: false,
        description: `If true, the domain becomes the DKIM authority for itself. If false, the domain uses the same DKIM authority as the root domain registered on the same Mailgun account.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_keys_update_selector',
    description: `Update the DKIM selector for a domain. The selector uniquely identifies a domain key and must be different from any of the domain's other key selectors. If omitted, no change is committed.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to update the DKIM selector for.`,
      },
      {
        name: 'dkim_selector',
        type: 'string',
        required: false,
        description: `New DKIM selector for the domain. Must be unique among the domain's key selectors. If omitted, no change is made.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_clear',
    description: `Delete ALL templates and all of their versions for a domain. This is irreversible and affects every template stored under the domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name whose templates will all be deleted. Example: mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_copy',
    description: `Copy an existing template into one or more new templates, each with a provided name and target account ID (and optionally a different target domain). Provide 'requests' as a JSON array of {account_id, name, domain?} objects.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the source template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `List of copy requests. Each item must include account_id and name, and may include an optional domain to copy into a different target domain. Example: [{"account_id":"account-id-1","name":"new-template-name-1"},{"account_id":"account-id-2","name":"new-template-name-2","domain":"target-domain"}]`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `The name of the source template to copy.`,
      },
      {
        name: 'source_versions',
        type: 'array',
        required: false,
        description: `Specific version tags to copy from the source template. If omitted or empty, all versions are copied.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_copy_version',
    description: `Copy an existing template version into a new version with the provided name. Fails if the new version name already exists on the template.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'new_version_name',
        type: 'string',
        required: true,
        description: `The name for the new (copied) version. If a version with this name already exists, the copy fails.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name the version is stored under.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the source version to copy.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Comment to be used for the new version.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_create',
    description: `Create a new template under a Mailgun domain, storing its name, description, and (optionally) initial template content. If content is provided via the 'template' field, a new version is automatically created and becomes the active version. Note: binary attachments and inline file content are not supported by this tool; provide the template body as inline text/HTML/handlebars via the 'template' field only.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template will be created under. Example: mg.example.com.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the template being stored. Supports UTF-8 characters; the name is stored down-cased.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Version comment. Only valid if a new version is being created (i.e. 'template' is provided).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the template being stored.`,
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: `JSON-encoded object of MIME headers to store with the template. Only the keys From, Subject, and Reply-To are currently supported; they are inserted into the MIME at delivery time and message-level headers override template-level ones.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Initial tag of the created version. If 'template' is provided and tag is omitted, the default value 'initial' is used.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `Content of the template (HTML/text/handlebars). If provided, an initial version is automatically created and becomes active. Binary attachments and inline file content are not supported; use inline text/HTML only.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_create_version',
    description: `Add a new version to an existing template. If the template has no other versions, the first version becomes active automatically. A template can store up to 40 versions. Note: binary attachments and inline file content are not supported by this tool; provide the version content as inline text/HTML/handlebars via the 'template' field only.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `Tag of the version being created. Must be unique within the template.`,
      },
      {
        name: 'template',
        type: 'string',
        required: true,
        description: `Content of the new template version (HTML/text/handlebars). Binary attachments and inline file content are not supported; use inline text/HTML only.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Name of the existing template to create the new version for.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `If set to 'yes', this version becomes the active version immediately.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Comment related to the version that is being created.`,
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: `JSON-encoded object of MIME headers to store with this version. Only the keys From, Subject, and Reply-To are currently supported.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_delete',
    description: `Delete a specific template. This deletes ALL versions of the specified template and is irreversible.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name to be deleted.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_delete_version',
    description: `Delete a specific version of a template. This is irreversible; other versions of the template are unaffected.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name the version is stored under.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the version of the template to be deleted.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_get',
    description: `Retrieve metadata about a stored template. If 'active' is set to yes, the content of the active version is included in the response. By default the version field is omitted; to browse other versions use the List Template Versions tool.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is stored under. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name to fetch.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `If set to 'yes', the active version of the template (including its content) is included in the response.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_get_version',
    description: `Retrieve the information and content of a specific version of a template.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is stored under. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name the version belongs to.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the version of the template to fetch.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_list',
    description: `List templates stored for a domain, with cursor-based pagination.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name to fetch the templates for. Example: mg.example.com.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of templates to retrieve. Default and max limit is 100.`,
      },
      {
        name: 'p',
        type: 'string',
        required: false,
        description: `Pivot value used to retrieve the next/previous page of templates, taken from the 'paging' links of a prior response.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Name of the page to retrieve relative to the pivot ('p'). Defaults to 'first'.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_list_versions',
    description: `Return a paginated list of versions for a specific template.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name to fetch the template versions for. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name to fetch the versions for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of versions to retrieve. Default and max limit is 100.`,
      },
      {
        name: 'p',
        type: 'string',
        required: false,
        description: `Pivot value used to retrieve the next/previous page of versions, taken from the 'paging' links of a prior response.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Name of the page to retrieve relative to the pivot ('p'). Defaults to 'first'.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_rename',
    description: `Rename an existing template. Fails if a template with the new name already exists under the domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'new_template_name',
        type: 'string',
        required: true,
        description: `The name for the new (renamed) template. Fails if this name is already in use.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `The current name of the template.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_update',
    description: `Update the description of an existing template. This endpoint only updates template-level metadata (its description); to change content, create or update a version instead.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Updated description of the template.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `The name of the template to update.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_templates_update_version',
    description: `Update information or content of a specific template version. Existing fields not included in the request are left unchanged. Note: binary attachments and inline file content are not supported by this tool; provide replacement content as inline text/HTML/handlebars via the 'template' field only.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name the template is associated with. Example: mg.example.com.`,
      },
      {
        name: 'template_name',
        type: 'string',
        required: true,
        description: `Template name the version is stored under.`,
      },
      {
        name: 'version_name',
        type: 'string',
        required: true,
        description: `Tag of the version of the template to be updated.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `If set to 'yes', this version becomes the active version.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Updated comment related to the version.`,
      },
      {
        name: 'headers',
        type: 'string',
        required: false,
        description: `JSON-encoded object of MIME headers to store with this version. Only the keys From, Subject, and Reply-To are currently supported.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `New content of the template version (HTML/text/handlebars). Binary attachments and inline file content are not supported; use inline text/HTML only. Leave blank to keep the existing content.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_generate_certificate',
    description: `Initiate generation of a TLS (x509) certificate for a click/open tracking domain as a background task. The response includes a 'location' field pointing at the status endpoint you can poll to check for completion.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The tracking domain to generate a TLS certificate for, formatted as web_prefix.domain_name (web_prefix is configured in your domain's settings).`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_get_certificate_status',
    description: `Get the TLS (x509) certificate and its status for a click/open tracking domain. Status can be processing, active, expired, or error.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The tracking domain of the TLS certificate, formatted as web_prefix.domain_name (web_prefix is configured in your domain's tracking settings).`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_get_settings',
    description: `Get a domain's open, click, and unsubscribe tracking settings, including whether each is active and the web tracking scheme.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to fetch tracking settings for.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_regenerate_certificate',
    description: `Initiate regeneration of an expired TLS (x509) certificate for a click/open tracking domain as a background task. Does not regenerate a certificate that is still valid. The response includes a 'location' field pointing at the status endpoint you can poll to check for completion.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The tracking domain whose expired TLS certificate should be regenerated, formatted as web_prefix.domain_name (web_prefix is configured in your domain's settings).`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_update_click_tracking',
    description: `Turn click tracking on or off for a domain. Click tracking is considered active when set to 'htmlonly' or 'true'.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to update click tracking for.`,
      },
      {
        name: 'active',
        type: 'string',
        required: false,
        description: `Click tracking state: 'htmlonly' (track clicks in HTML body only), 'true' (track in HTML and plain text), or 'false' (disabled). Omit to make no change.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_update_open_tracking',
    description: `Turn open tracking on or off for a domain, and optionally control whether the open-tracking pixel is placed at the top of the HTML body.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to update open tracking for.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Set true or false to toggle open tracking's active status. Omit to make no change.`,
      },
      {
        name: 'place_at_the_top',
        type: 'boolean',
        required: false,
        description: `If true, the open-tracking pixel is placed at the top of the HTML body when inserted into the email MIME. Omit to keep the current setting.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_tracking_update_unsubscribe_tracking',
    description: `Turn unsubscribe tracking on or off for a domain, and optionally customize the HTML and plain-text unsubscribe link footers inserted into outgoing emails.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to update unsubscribe tracking for.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Toggle the active status of unsubscribe tracking on the domain. Omit to make no change.`,
      },
      {
        name: 'html_footer',
        type: 'string',
        required: false,
        description: `HTML footer containing the unsubscribe link, inserted into the HTML part of outgoing email MIME. Use %unsubscribe_url% as the link placeholder.`,
      },
      {
        name: 'text_footer',
        type: 'string',
        required: false,
        description: `Plain-text footer containing the unsubscribe link, inserted into the plain-text part of outgoing email MIME. Use %unsubscribe_url% as the link placeholder.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_webhooks_create',
    description: `Register one or more URLs to receive Mailgun's POST callbacks whenever the given event type occurs for a domain (e.g. a message is delivered, opened, or bounces permanently). Up to 3 URLs are allowed per event type; webhook URLs are deduplicated by event type across both account-level and domain-level webhooks, so a URL already registered at the account level won't be double-notified. Fails if the event type already has URLs configured — use mailgun_domain_webhooks_update to replace them.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain to create the webhook on.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `One or more URLs to receive the POST callback for this event type (max 3). Provide each URL as a separate array element; Mailgun's API accepts this parameter repeated (url=https://a&url=https://b), not as a single comma-joined value.`,
      },
      {
        name: 'webhook_name',
        type: 'string',
        required: true,
        description: `The event type this webhook fires for.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_webhooks_delete',
    description: `Remove all URL(s) registered for a single webhook event type on a domain, effectively disabling callbacks for that event type on this domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain the webhook is configured on.`,
      },
      {
        name: 'webhook_name',
        type: 'string',
        required: true,
        description: `The event type whose webhook URL(s) to remove.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_webhooks_get',
    description: `Retrieve the URL(s) currently registered for a single webhook event type on a domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain the webhook is configured on.`,
      },
      {
        name: 'webhook_name',
        type: 'string',
        required: true,
        description: `The webhook event type to look up.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_webhooks_list',
    description: `Return every webhook event type Mailgun supports for a domain and the URL(s) currently registered for each: accepted, delivered, opened, clicked, unsubscribed, complained, temporary_fail, permanent_fail. Event types with nothing configured are returned with an empty URL list. This is the classic per-domain webhook resource (v3); it is separate from account-level webhooks, which apply across every domain on the account.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain to list configured webhooks for.`,
      },
    ],
  },
  {
    name: 'mailgun_domain_webhooks_update',
    description: `Replace the URL(s) registered for a webhook event type on a domain. This fully replaces the existing set of URLs for that event type (up to 3) rather than appending to it.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain the webhook is configured on.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `The new set of URLs for this event type (max 3), replacing whatever was previously configured. Provide each URL as a separate array element; Mailgun's API accepts this parameter repeated (url=https://a&url=https://b), not as a single comma-joined value.`,
      },
      {
        name: 'webhook_name',
        type: 'string',
        required: true,
        description: `The event type whose webhook URL(s) to replace.`,
      },
    ],
  },
  {
    name: 'mailgun_domains_create',
    description: `Create a new sending domain on your Mailgun account. Configures DKIM/DNS authority options, SMTP credentials, spam filtering, tracking (open/click/unsubscribe) URL settings, and IP pool assignment. Note: this endpoint is multipart/form-data in Mailgun's API, but it has no binary file fields, so all options are exposed here as regular text/boolean inputs.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new domain to create.`,
      },
      {
        name: 'archive_to',
        type: 'string',
        required: false,
        description: `If set to a URL, each successfully delivered message is also submitted as an HTTP POST (Content-Type application/mime) to this URL, with the body being exactly what the recipient SMTP server received.`,
      },
      {
        name: 'dkim_host_name',
        type: 'string',
        required: false,
        description: `Set the DKIM host name for the domain being created. Must be a valid domain name (the domain being created or its root domain). Cannot be used together with force_dkim_authority or force_root_dkim_host.`,
      },
      {
        name: 'dkim_key_size',
        type: 'string',
        required: false,
        description: `The size of the new domain's DKIM key. Must be either 1024 or 2048.`,
      },
      {
        name: 'dkim_selector',
        type: 'string',
        required: false,
        description: `Explicitly set the DKIM selector for the domain being created. If the domain key does not already exist, one will be created. Must be a valid RFC 2822 atom (no dots), e.g. 'foobar' is valid but 'foo.bar' is not.`,
      },
      {
        name: 'encrypt_incoming_message',
        type: 'boolean',
        required: false,
        description: `Enable encrypting incoming messages for this domain. Cannot be altered via API after being set, for security purposes; contact Mailgun Support to disable. Defaults to false.`,
      },
      {
        name: 'force_dkim_authority',
        type: 'boolean',
        required: false,
        description: `If true, the domain is its own DKIM authority even if its root domain is registered on the same Mailgun account. If false, the domain shares the root domain's DKIM authority. Defaults to false.`,
      },
      {
        name: 'force_root_dkim_host',
        type: 'boolean',
        required: false,
        description: `If true, the root domain becomes the DKIM host for the domain being created even if the root domain itself is not registered with Mailgun. Verification still requires valid SPF for this domain and a valid DKIM record for the root domain; the SMTP mail-from host stays the domain being created.`,
      },
      {
        name: 'ips',
        type: 'string',
        required: false,
        description: `An optional comma-separated list of IP addresses to assign to this domain. If not specified, all dedicated IP addresses on the account are assigned. Returns a 400 if a requested IP isn't assigned to the account.`,
      },
      {
        name: 'message_ttl',
        type: 'integer',
        required: false,
        description: `Time-to-live (TTL) in seconds for retrieving both incoming and outgoing messages. The maximum allowed TTL depends on your Mailgun subscription plan.`,
      },
      {
        name: 'pool_id',
        type: 'string',
        required: false,
        description: `Requested IP pool to be assigned to the domain at creation time.`,
      },
      {
        name: 'require_tls',
        type: 'boolean',
        required: false,
        description: `If true, messages for this domain may only be sent over a TLS connection; if a TLS connection can't be established, Mailgun will not deliver the message. If false, Mailgun still tries to upgrade the connection but falls back to plaintext SMTP. Defaults to false.`,
      },
      {
        name: 'skip_verification',
        type: 'boolean',
        required: false,
        description: `If true, the certificate and hostname are not verified when establishing a TLS connection, and Mailgun accepts any certificate during delivery. If false, Mailgun verifies the certificate and hostname and will not establish a TLS connection if either fails. Defaults to false.`,
      },
      {
        name: 'smtp_password',
        type: 'string',
        required: false,
        description: `Password to use for SMTP authentication on this domain. If not provided, Mailgun generates one.`,
      },
      {
        name: 'spam_action',
        type: 'string',
        required: false,
        description: `How to handle inbound spam: 'disabled' (no spam filtering), 'block' (spam messages aren't delivered), or 'tag' (messages are tagged with a spam header). Defaults to disabled.`,
      },
      {
        name: 'use_automatic_sender_security',
        type: 'boolean',
        required: false,
        description: `Enable Automatic Sender Security. Requires setting DNS CNAME entries for DKIM keys instead of a TXT record. Defaults to false.`,
      },
      {
        name: 'web_prefix',
        type: 'string',
        required: false,
        description: `Sets the subdomain prefix used for open/click/unsubscribe tracking URLs, e.g. <web_scheme>://<web_prefix>.<domain_name>/... Defaults to 'email'.`,
      },
      {
        name: 'web_scheme',
        type: 'string',
        required: false,
        description: `Sets the scheme (http or https) used for open/click/unsubscribe tracking URLs. https requires a valid TLS certificate for the domain's tracking host. Defaults to http.`,
      },
      {
        name: 'webhooks_redact_pii',
        type: 'boolean',
        required: false,
        description: `If true, Personally Identifiable Information (PII) is redacted from the payload of any webhook posted for this domain.`,
      },
      {
        name: 'wildcard',
        type: 'boolean',
        required: false,
        description: `Allows the domain to accept inbound messages received on subdomains that have MX records pointed to Mailgun. Defaults to false.`,
      },
    ],
  },
  {
    name: 'mailgun_domains_delete',
    description: `Permanently delete a Mailgun domain. The domain must not be disabled or used as the DKIM authority for another domain, and sandbox domains cannot be deleted. Deletion happens in the background after the call returns.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to delete.`,
      },
    ],
  },
  {
    name: 'mailgun_domains_get',
    description: `Fetch details for a single Mailgun domain, including its state, settings, and receiving/sending DNS record verification status.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to fetch.`,
      },
    ],
  },
  {
    name: 'mailgun_domains_list',
    description: `List domains on your Mailgun account. Supports filtering by state (active, unverified, disabled) or authority, partial name search, sorting, and pagination (max 1000 items per page).`,
    params: [
      {
        name: 'authority',
        type: 'string',
        required: false,
        description: `Filter domains by a specific authority (root domain that owns/manages the DNS). Ignored if state is also specified.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Include domains belonging to any subaccounts under this account.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of domains to return. Max 1000, default 100.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search domains by partial or complete name. Does not support wildcards.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of domains to skip before starting to return results. Default 0.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order. Valid values: name, name:asc, name:desc. If not specified, domains are returned in reverse creation date order.`,
      },
      { name: 'state', type: 'string', required: false, description: `Filter domains by state.` },
    ],
  },
  {
    name: 'mailgun_domains_update',
    description: `Update configuration for an existing Mailgun domain, such as SMTP credentials, spam action, wildcard, automatic sender security, or tracking web scheme/prefix. Only the fields you supply are changed; any field left unset keeps its current value. Note: this endpoint is multipart/form-data in Mailgun's API, but it has no binary file fields, so all options are exposed here as regular text/boolean inputs.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to update.`,
      },
      {
        name: 'archive_to',
        type: 'string',
        required: false,
        description: `If set to a URL, each successfully delivered message is also submitted as an HTTP POST (Content-Type application/mime) to this URL, with the body being exactly what the recipient SMTP server received. Leave unset to keep the current value.`,
      },
      {
        name: 'mailfrom_host',
        type: 'string',
        required: false,
        description: `The mail-from hostname to update to. Must be lower case. Leave unset to keep the current value.`,
      },
      {
        name: 'message_ttl',
        type: 'integer',
        required: false,
        description: `Time-to-live (TTL) in seconds for retrieving both incoming and outgoing messages. Maximum allowed value depends on your subscription plan. Leave unset to keep the current value.`,
      },
      {
        name: 'require_tls',
        type: 'boolean',
        required: false,
        description: `If true, messages for this domain may only be sent over a TLS connection; if a TLS connection can't be established, Mailgun will not deliver the message. If false, Mailgun still tries to upgrade the connection but falls back to plaintext SMTP. Leave unset to keep the current value.`,
      },
      {
        name: 'skip_verification',
        type: 'boolean',
        required: false,
        description: `If true, certificate and hostname are not verified when establishing a TLS connection and Mailgun accepts any certificate during delivery. If false, Mailgun verifies the certificate and hostname and won't establish a TLS connection if either fails. Leave unset to keep the current value.`,
      },
      {
        name: 'smtp_password',
        type: 'string',
        required: false,
        description: `Updates the domain's SMTP credentials to this password. Leave unset to keep the current value.`,
      },
      {
        name: 'spam_action',
        type: 'string',
        required: false,
        description: `Updates the domain's spam action. Valid values are 'disabled', 'tag', and 'block'. Leave unset to keep the current value.`,
      },
      {
        name: 'use_automatic_sender_security',
        type: 'boolean',
        required: false,
        description: `Enable or disable Automatic Sender Security. If enabled, requires setting DNS CNAME entries for DKIM keys instead of a TXT record. The domain must be re-verified after changing this field. Leave unset to keep the current value.`,
      },
      {
        name: 'web_prefix',
        type: 'string',
        required: false,
        description: `Updates the subdomain prefix used for the domain's open/click/unsubscribe tracking features. Must be a valid atom. Updating this also requires creating a matching CNAME record in the domain's DNS zone (e.g. prefix 'zed' on my-domain.com needs a CNAME for zed.my-domain.com). Leave unset to keep the current value.`,
      },
      {
        name: 'web_scheme',
        type: 'string',
        required: false,
        description: `Updates the scheme (http or https) used for open/click/unsubscribe tracking URLs. https requires a valid TLS certificate for the domain's tracking host. Leave unset to keep the current value.`,
      },
      {
        name: 'webhooks_redact_pii',
        type: 'boolean',
        required: false,
        description: `If true, Personally Identifiable Information (PII) is redacted from the payload of any webhook posted for this domain. Leave unset to keep the current value.`,
      },
      {
        name: 'wildcard',
        type: 'boolean',
        required: false,
        description: `Updates the domain's wildcard status, i.e. whether it accepts inbound messages received on subdomains that have MX records pointed to Mailgun. Leave unset to keep the current value.`,
      },
    ],
  },
  {
    name: 'mailgun_domains_verify',
    description: `Trigger Mailgun to (re-)verify a domain's DNS records (A, CNAME, SPF, DKIM, and MX) to confirm the domain is ready and able to send/receive mail.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the domain to verify.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_add_ip_to_pool',
    description: `Add a dedicated IP address to a Mailgun Dynamic IP Pool. The IP must already be a dedicated IP belonging to this account.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The dedicated IP address to add to the given Dynamic IP Pool. Must already belong to the account.`,
      },
      {
        name: 'pool_name',
        type: 'string',
        required: true,
        description: `Name of the Dynamic IP Pool to add the IP to.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_enroll_all_domains',
    description: `Begin an asynchronous background job that assigns all domains on the Mailgun account to Dynamic IP Pools, optionally including subaccount domains. Dynamic IP Pools must be enabled for the account, and this must be called by a parent account user.`,
    params: [
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: true,
        description: `If true, domains belonging to subaccounts will also be enrolled in Dynamic IP Pools.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_enroll_domain',
    description: `Enroll a single domain in the Dynamic IP Pools feature. The domain will be assigned an IP pool based on reputation. The Dynamic IP Pools feature must be enabled and configured before enrolling domains.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to enroll in Dynamic IP Pools.`,
      },
      {
        name: 'replacement_ip',
        type: 'string',
        required: true,
        description: `A valid dedicated IP address or the string 'shared' to assign to the domain while it is being enrolled.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_get_domain_history',
    description: `Retrieve a domain's Dynamic IP Pool history records, showing when and why the domain moved between pools (e.g. dynamic_good, dynamic_poor).`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to retrieve Dynamic IP Pool history for.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_init_all_pools',
    description: `Replace the full membership of all Dynamic IP Pools (good_reputation, poor_reputation, new_senders) in one call. All IPs must be dedicated IPs belonging to the account, and each pool must retain at least 1 IP that is not currently warming.`,
    params: [
      {
        name: 'good_reputation',
        type: 'string',
        required: true,
        description: `Comma-separated list of dedicated IP(s) to place in the good_reputation (dynamic_good) pool.`,
      },
      {
        name: 'new_senders',
        type: 'string',
        required: true,
        description: `Comma-separated list of dedicated IP(s) to place in the new_senders (dynamic_new) pool.`,
      },
      {
        name: 'poor_reputation',
        type: 'string',
        required: true,
        description: `Comma-separated list of dedicated IP(s) to place in the poor_reputation (dynamic_poor) pool.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_list_account_history',
    description: `Retrieve Dynamic IP Pool history records for all domains across the parent account and, optionally, its subaccounts. Supports filtering by domain, time range, and which pool a domain moved to/from.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Filter events emitted after a given timestamp. Format: 'Mon, 02 Jan 2006 15:04:05 MST'.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Filter events emitted before a given timestamp. Format: 'Mon, 02 Jan 2006 15:04:05 MST'.`,
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Filter history events by domain name.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `If true, includes history events from all subaccounts in addition to the parent account.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of history events to return (1-100).`,
      },
      {
        name: 'moved_from',
        type: 'string',
        required: false,
        description: `Filter events by which Dynamic IP Pool a domain was moved from (e.g. dynamic_good, dynamic_poor).`,
      },
      {
        name: 'moved_to',
        type: 'string',
        required: false,
        description: `Filter events by which Dynamic IP Pool a domain was moved to (e.g. dynamic_good, dynamic_poor).`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_list_assignable_domains',
    description: `List all domains on the account (or a given subaccount) that are not yet enrolled in Dynamic IP Pools and are therefore eligible for enrollment.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Regex search term to filter assignable domains by name.`,
      },
      {
        name: 'subaccount_id',
        type: 'string',
        required: false,
        description: `If provided, lists assignable domains belonging to this subaccount instead of the parent account. Must be a valid account ID.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_list_domains',
    description: `Retrieve all domains currently enrolled in Dynamic IP Pools across the parent account and its subaccounts, with sorting and filtering by account or pool.`,
    params: [
      {
        name: 'account',
        type: 'array',
        required: false,
        description: `Filter domains by account ID. Can be specified multiple times to filter by multiple accounts.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of domains to return (1-100).`,
      },
      {
        name: 'pool',
        type: 'array',
        required: false,
        description: `Filter domains to specific Dynamic IP Pool(s). Can be specified multiple times.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort domains by.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction for the sort_by field.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_list_pools',
    description: `Return the list of IPs belonging to each of the account's Dynamic IP Pools (good_reputation, poor_reputation, new_senders), along with each pool's configuration.`,
    params: [],
  },
  {
    name: 'mailgun_dynamic_ip_pools_override_domain_assignment',
    description: `Override a domain's Dynamic IP Pool assignment to a specific pool. While an override is present, the domain's pool will not be changed automatically by health checks.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name whose Dynamic IP Pool assignment should be overridden.`,
      },
      {
        name: 'pool',
        type: 'string',
        required: true,
        description: `Name of the Dynamic IP Pool to assign to the domain (e.g. dynamic_good, dynamic_new).`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_preview_domain_assignment',
    description: `Run a health check on a domain and return which Dynamic IP Pool it would be placed in, without actually enrolling the domain or changing its current pool assignment.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to preview a Dynamic IP Pool assignment for.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_remove_all_pools',
    description: `Remove all Dynamic IP Pools from the account. All domains on the account (and any subaccounts) must first be removed from Dynamic IP Pools before the pools themselves can be removed. Standard dedicated IP pools are not affected.`,
    params: [],
  },
  {
    name: 'mailgun_dynamic_ip_pools_remove_domain',
    description: `Remove a domain from Dynamic IP Pools. Exactly one of Replacement IP or Replacement Pool ID must be provided to determine what IP(s)/pool the domain falls back to: Replacement IP assigns the given dedicated IP(s) (or 'shared' for a shared IP), while Replacement Pool ID assigns a dedicated IP pool. Do not provide both.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to remove from Dynamic IP Pools.`,
      },
      {
        name: 'replacement_ip',
        type: 'array',
        required: false,
        description: `Dedicated IP address(es) (or 'shared') to assign to the domain instead. Can be specified multiple times. Cannot be provided together with replacement_pool_id.`,
      },
      {
        name: 'replacement_pool_id',
        type: 'string',
        required: false,
        description: `A valid dedicated IP pool ID to assign to the domain instead. Cannot be provided together with replacement_ip.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_remove_domain_override',
    description: `Remove any Dynamic IP Pool override for a domain. After removal, the domain's pool assignment will again be managed automatically by health checks.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name whose Dynamic IP Pool override should be removed.`,
      },
    ],
  },
  {
    name: 'mailgun_dynamic_ip_pools_update_pool_ips',
    description: `Add and/or remove dedicated IP addresses from a specific Dynamic IP Pool. At least one of Add IP(s) or Remove IP(s) must be provided. A pool must always retain at least 1 IP that is not currently warming, and a single IP cannot belong to multiple Dynamic IP Pools.`,
    params: [
      {
        name: 'pool_name',
        type: 'string',
        required: true,
        description: `Name of the Dynamic IP Pool to update.`,
      },
      {
        name: 'add_ip',
        type: 'string',
        required: false,
        description: `Comma-separated dedicated IP(s) to add to the pool. Provide this and/or remove_ip.`,
      },
      {
        name: 'remove_ip',
        type: 'string',
        required: false,
        description: `Comma-separated dedicated IP(s) to remove from the pool. Provide this and/or add_ip.`,
      },
    ],
  },
  {
    name: 'mailgun_events_list',
    description: `Retrieve a paginated list of inbound and outbound message events for a domain (e.g. accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored). Mailgun retains event data for at least 3 days. Supports filtering by time range, event type, recipient, sender, subject, tags, attachment name, message size, and failure severity.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The sending domain to retrieve events for.`,
      },
      {
        name: 'ascending',
        type: 'string',
        required: false,
        description: `Sort direction by time: 'yes' sorts ascending, 'no' sorts descending. Must be provided if 'end' is not specified. Live-confirmed: 'begin'/'end' must point the right direction for the chosen sort — for 'yes' (ascending), 'begin' must be the earlier timestamp and 'end' the later one; for 'no' (descending), it's the reverse ('begin' later, 'end' earlier). Mixing them up returns a clean 'Inconsistent range' error from Mailgun rather than silently sorting wrong.`,
      },
      {
        name: 'attachment',
        type: 'string',
        required: false,
        description: `Filter by the name of an attached file.`,
      },
      {
        name: 'begin',
        type: 'string',
        required: false,
        description: `Beginning of the search time range, in epoch seconds.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End of the search time range, in epoch seconds.`,
      },
      {
        name: 'event',
        type: 'string',
        required: false,
        description: `Filter by event type (e.g. accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored, rejected).`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Filter by the email address in the message's From MIME header.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of entries to return per page. Maximum 300.`,
      },
      {
        name: 'list',
        type: 'string',
        required: false,
        description: `Filter by the mailing list email address the message was originally sent to.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: false,
        description: `Filter by the Mailgun message id returned by the Messages API.`,
      },
      {
        name: 'recipient',
        type: 'string',
        required: false,
        description: `Filter by the email address of a single recipient tracked by the event.`,
      },
      {
        name: 'recipients',
        type: 'string',
        required: false,
        description: `For stored events, filter by any of the message's potential recipients.`,
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: `Filter failed events by severity: 'temporary' (Mailgun will retry delivery) or 'permanent' (Mailgun will not retry).`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Filter by message size in bytes. Mostly intended for use with range filtering expressions.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Filter by the message's subject line.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Filter by user-defined tags applied to the message.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Filter by the email address in the message's To MIME header.`,
      },
    ],
  },
  {
    name: 'mailgun_forwards_create',
    description: `Create a Mailgun forward (routing) rule. The rule matches incoming recipient addresses against a wildcard expression ('match', where '*' matches any sequence of characters) and, when matched, forwards the mail. Provide 'match' plus at least one forwarding action: forward_recipient (forward to one or more email addresses, up to 5), forward_url (POST the message to one or more URLs, up to 3), and/or forward_store (a URL to notify with a retrieval link when mail arrives). These three action fields are not mutually exclusive at the API level but at least one must be supplied for the rule to do anything.`,
    params: [
      {
        name: 'match',
        type: 'string',
        required: true,
        description: `A wildcard expression matching the recipient address to forward. Case-insensitive. Only '*' (matches any sequence of characters) or literal characters are supported — not a full regex. Example: 'a.*@example.com' matches addresses starting with 'a.', not addresses starting with 'a'.`,
      },
      {
        name: 'forward_recipient',
        type: 'array',
        required: false,
        description: `One or more email addresses to forward matching mail to (up to 5). At least one of forward_recipient, forward_url, or forward_store must be provided.`,
      },
      {
        name: 'forward_store',
        type: 'string',
        required: false,
        description: `A URL which will be notified when a matching email arrives, along with a URL you can use to retrieve the stored message. Must be a valid URL that resolves. At least one of forward_recipient, forward_url, or forward_store must be provided.`,
      },
      {
        name: 'forward_url',
        type: 'array',
        required: false,
        description: `One or more URLs to forward matching mail to via HTTP POST (up to 3). Each must be a valid URL that resolves. At least one of forward_recipient, forward_url, or forward_store must be provided.`,
      },
    ],
  },
  {
    name: 'mailgun_forwards_delete',
    description: `Delete a single Mailgun forward (routing) rule by ID. By default this is scoped to the entire account; pass domain_name to scope the deletion to a specific domain — if the rule is not defined for that domain, the call returns 404.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the forward rule to delete.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: false,
        description: `Scope the deletion to this domain. If provided and the rule is not defined for this domain, the call returns 404 Not Found.`,
      },
    ],
  },
  {
    name: 'mailgun_forwards_get',
    description: `Retrieve a single Mailgun forward (routing) rule by its ID, including its match expression, forwarding action(s), and timestamps.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the forward rule to retrieve.`,
      },
    ],
  },
  {
    name: 'mailgun_forwards_list',
    description: `List Mailgun forward (routing) rules on the account. By default lists all rules on the account; scope to a single domain with domain_name. Supports cursor-based pagination via the opaque 'page' token returned in the response's 'next'/'previous' links.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: false,
        description: `Scope the listing to forward rules defined on this domain only.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of forward rules to return per page. Default 100.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Encoded paging cursor, taken from the 'next' or 'previous' links in a prior response. Omit to fetch the first page.`,
      },
    ],
  },
  {
    name: 'mailgun_forwards_update',
    description: `Update a single Mailgun forward (routing) rule by ID. All fields are optional — only the fields you provide are changed; the rest keep their current values. Use match to change the wildcard recipient-matching expression, and forward_recipient/forward_url/forward_store to change the forwarding action(s).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the forward rule to update.`,
      },
      {
        name: 'forward_recipient',
        type: 'array',
        required: false,
        description: `New set of email addresses to forward matching mail to (up to 5), replacing any existing recipients. Leave unset to keep the current recipients.`,
      },
      {
        name: 'forward_store',
        type: 'string',
        required: false,
        description: `New URL to notify (with a retrieval link) when matching mail arrives and is stored. Leave unset to keep the current value.`,
      },
      {
        name: 'forward_url',
        type: 'array',
        required: false,
        description: `New set of URLs to forward matching mail to via HTTP POST (up to 3), replacing any existing URLs. Leave unset to keep the current URLs.`,
      },
      {
        name: 'match',
        type: 'string',
        required: false,
        description: `New wildcard expression matching the recipient address to forward. Case-insensitive; only '*' or literal characters are supported (not a full regex). Leave unset to keep the current match expression.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_add_ip',
    description: `Add a single dedicated IP address to a Dedicated IP Pool (DIPP) by pool ID and IP address. The account must have the DIPPs feature enabled; the IP must be a dedicated IP owned by the account and must not already belong to another pool. Domains linked to the pool (and any subaccounts it's delegated to) are updated asynchronously after this call returns.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The dedicated IP address to add to the pool. Must be a dedicated IP already owned by the account and not currently assigned to a different pool.`,
      },
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to add the IP to.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_bulk_add_ips',
    description: `Add multiple dedicated IP addresses to a Dedicated IP Pool (DIPP) in a single call. The account must have the DIPPs feature enabled; all IPs must be dedicated, owned by the account, and not already assigned to another pool. Domains linked to the pool (and any subaccounts it's delegated to) are updated asynchronously after this call returns.`,
    params: [
      {
        name: 'ips',
        type: 'array',
        required: true,
        description: `List of dedicated IP addresses to add to the pool. Each must already be a dedicated IP owned by the account and not currently assigned to a different pool. Example: ["1.2.3.4", "5.6.7.8"].`,
      },
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to add the IPs to.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_create_pool',
    description: `Create a new Dedicated IP Pool (DIPP) on the account, with a short name, a longer description, and optionally one or more dedicated IPs to seed the pool with. The account must have the DIPPs feature enabled. Returns the ID of the newly created pool.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Longer, human-readable description of the new DIPP.`,
      },
      { name: 'name', type: 'string', required: true, description: `Short name of the new DIPP.` },
      {
        name: 'ip',
        type: 'array',
        required: false,
        description: `One or more dedicated IP addresses to add to the pool at creation time. Each must already be a dedicated IP owned by the account and not currently assigned to a different pool. Provide each IP as a separate array element — Mailgun's API accepts this parameter repeated (ip=1.2.3.4&ip=5.6.7.8), not as a single comma-joined value.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_delegate_to_subaccount',
    description: `Delegate a Dedicated IP Pool (DIPP) from the parent account to a specified subaccount, making the pool available for that subaccount to use. Unlike legacy endpoints, this supports accounts with multiple delegated DIPPs.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to delegate.`,
      },
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to delegate the pool to.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_delete_pool',
    description: `Delete a Dedicated IP Pool (DIPP) by ID. The account must have the DIPPs feature enabled, and you cannot delete a pool inherited from the parent account. If domains are linked to the pool, you must supply either replacement_pool_id (to relink those domains to another pool, which must contain at least one IP) or replacement_ip (a dedicated IP, or the special value "shared" if the account is eligible for shared IPs) to reassign them; both may be omitted only if the pool being deleted has no IPs. Affected domains and subaccounts are updated asynchronously after this call returns.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to delete.`,
      },
      {
        name: 'replacement_ip',
        type: 'string',
        required: false,
        description: `Replacement IP to assign to domains previously linked to the deleted pool, or the special value "shared" to use shared IPs. Required unless replacement_pool_id is given or the pool contains no IPs.`,
      },
      {
        name: 'replacement_pool_id',
        type: 'string',
        required: false,
        description: `ID of a replacement dedicated IP pool to relink domains to after this pool is deleted. The replacement pool must contain at least one IP. Required unless replacement_ip is given or the pool contains no IPs.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_get_pool',
    description: `Retrieve details about a single Dedicated IP Pool (DIPP) by ID, including its name, description, list of IPs, and whether it is currently linked to any domains. If linked, the response's is_linked flag is true and linked_domains lists those domains.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to retrieve.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_list_pool_domains',
    description: `Retrieve a paginated list of domains linked to a Dedicated IP Pool (DIPP), by pool ID. Supports cursor-based pagination via the page and limit parameters.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to list linked domains for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of records to return, between 10 and 500. Defaults to 10.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Encoded page identifier retrieved from a previous call's paging.next or paging.first URL, used to continue pagination.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_list_pools',
    description: `List all Dedicated IP Pools (DIPPs) on the account. For each pool, returns its basic properties (name, description, list of IPs) and indicates whether it's linked to any domains and whether it's inherited from a parent account. Takes no parameters.`,
    params: [],
  },
  {
    name: 'mailgun_ip_pools_remove_ip',
    description: `Remove a dedicated IP address from a Dedicated IP Pool (DIPP) by pool ID and IP address. You cannot edit a pool inherited from a parent account. If the pool is linked to domains, those domains are updated asynchronously after this call returns.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The dedicated IP address to remove from the pool.`,
      },
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to remove the IP from.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_revoke_delegation',
    description: `Revoke delegation of a Dedicated IP Pool (DIPP) from a specified subaccount. The pool will no longer be available to that subaccount. Unlike legacy endpoints, this supports accounts with multiple delegated DIPPs.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to revoke delegation for.`,
      },
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to revoke the pool from.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_pools_update_pool',
    description: `Edit an existing Dedicated IP Pool (DIPP) by ID: rename it, change its description, add or remove dedicated IPs, or link/unlink domains. You cannot edit a pool inherited from a parent account, and IPs being added must be dedicated IPs owned by the account. At least one field must be provided or the API returns an error. If the pool's IPs change and it's linked to domains, those domains are updated asynchronously after this call returns.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to edit.`,
      },
      {
        name: 'add_ip',
        type: 'array',
        required: false,
        description: `One or more dedicated IP addresses to add to the pool. Each must already be a dedicated IP owned by the account and not currently assigned to a different pool. Provide each IP as a separate array element — Mailgun's API accepts this parameter repeated (add_ip=1.2.3.4&add_ip=5.6.7.8), not as a single comma-joined value.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New longer description for the DIPP.`,
      },
      {
        name: 'link_domain',
        type: 'array',
        required: false,
        description: `One or more domain IDs to link to this DIPP. Provide each domain ID as a separate array element — Mailgun's API accepts this parameter repeated, not as a single comma-joined value.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New short name for the DIPP.`,
      },
      {
        name: 'remove_ip',
        type: 'array',
        required: false,
        description: `One or more dedicated IP addresses to remove from the pool. Provide each IP as a separate array element — Mailgun's API accepts this parameter repeated, not as a single comma-joined value.`,
      },
      {
        name: 'unlink_domain',
        type: 'array',
        required: false,
        description: `One or more domain IDs to unlink from this DIPP. Provide each domain ID as a separate array element — Mailgun's API accepts this parameter repeated, not as a single comma-joined value.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_warmup_cancel_warmup_plan',
    description: `Cancel the in-flight warmup plan for a dedicated IP address by its address. The IP must be a dedicated IP owned by the account.`,
    params: [
      {
        name: 'addr',
        type: 'string',
        required: true,
        description: `The dedicated IP address whose warmup plan should be cancelled.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_warmup_create_warmup_plan',
    description: `Create a new warmup plan for a dedicated IP address, gradually ramping up sending volume on that IP over time. The IP must be a dedicated IP owned by the account.`,
    params: [
      {
        name: 'addr',
        type: 'string',
        required: true,
        description: `The dedicated IP address to create a warmup plan for.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_warmup_get',
    description: `Retrieve the status of an in-flight warmup plan for a dedicated IP address, including its current stage, throttle percentage, volume sent within the current stage, and stage history. The IP must be a dedicated IP owned by the account.`,
    params: [
      {
        name: 'addr',
        type: 'string',
        required: true,
        description: `The dedicated IP address to retrieve the warmup status for.`,
      },
    ],
  },
  {
    name: 'mailgun_ip_warmup_list',
    description: `Retrieve a list of in-flight warmup statuses for all dedicated IP addresses owned by the account, with pagination support via page and limit.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `The number of results to return per page. Defaults to 10 if not specified.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Encoded page identifier retrieved from a previous call's paging.next or paging.first URL. If omitted, the first page is returned.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_assign_ip_to_all_domains',
    description: `Assign a dedicated IP to every domain on your Mailgun account. The IP must already belong to the account. This starts an asynchronous background operation on Mailgun's side; the response returns a message and a reference_id you can use to track completion (Mailgun does not expose a status-lookup endpoint for reference_id in this API version).`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The IP address to assign to all account domains. Must belong to the account.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_get',
    description: `Get details about a specific IP address on your Mailgun account, including whether it is dedicated or shared, and its reverse DNS (rDNS) entry.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The IP address to get details about.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_get_available_ip_count',
    description: `Return the number of additional IPs (dedicated and shared) available to the account per its current billing plan. Note: this endpoint is kept for backwards compatibility only per Mailgun's docs; the 'shared' field in the response is deprecated and should not be relied upon.`,
    params: [],
  },
  {
    name: 'mailgun_ips_get_domain_spillover_pool',
    description: `Get the DIPP (dedicated IP pool) spillover settings for a specific domain — i.e. which dedicated IP pool is used to handle overflow sending volume for this domain.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain's INTERNAL ID (a Mongo ObjectID, e.g. 6a709fac9163aa838dac9844) — NOT the domain's DNS name. Live-confirmed: this endpoint rejects a DNS-style name with 'parsing domain id: the provided hex string is not a valid ObjectID'. Get the internal ID from mailgun_domains_get's or mailgun_domains_list's response (the 'id' field on the domain object).`,
      },
    ],
  },
  {
    name: 'mailgun_ips_get_spillover_settings',
    description: `Get the account-level DIPP (dedicated IP pool) spillover settings — the pool used to handle overflow sending volume across all domains under the account.`,
    params: [],
  },
  {
    name: 'mailgun_ips_list',
    description: `List IPs belonging to the account. Optionally filter to only dedicated IPs or only enabled IPs. Returns the list of IP addresses (and, if the account has the DIPPs feature enabled, a list of IPs assignable to dedicated IP pools).`,
    params: [
      {
        name: 'dedicated',
        type: 'boolean',
        required: false,
        description: `If true, return only dedicated IPs. If omitted, both dedicated and shared IPs are returned.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `If true, return only enabled IPs. If omitted, both enabled and disabled IPs are returned.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_list_detailed',
    description: `List detailed information about IPs belonging to the account and its subaccounts (an additional record is returned per subaccount an IP is linked to). Supports filtering by pool, domain, subaccount, or partial IP match, plus sorting and pagination. The detailed IP view feature must be enabled for the account.`,
    params: [
      {
        name: 'domain_id',
        type: 'string',
        required: false,
        description: `Filter IPs linked to a domain. Value can be a specific domain ID, 'any', or 'none'.`,
      },
      {
        name: 'ip',
        type: 'string',
        required: false,
        description: `Search for IPs containing this text (supports partial matching).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return. Minimum 10, maximum 100, default 10.`,
      },
      {
        name: 'pool_id',
        type: 'string',
        required: false,
        description: `Filter IPs linked to a pool. Value can be a specific pool ID, 'any', or 'none'.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of records to skip before starting to return results. Default 0.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Name of the field to sort results by.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort results 'descending' or 'ascending'. Defaults to 'ascending'.`,
      },
      {
        name: 'subaccount_id',
        type: 'string',
        required: false,
        description: `Filter IPs linked to a subaccount. Value can be a specific subaccount ID, 'any', or 'none'.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_list_ip_domains',
    description: `Get all domains on the account where a specific IP is assigned. Matching domains are ordered by increasing id, then limit/skip are applied. If search is provided, it is split into words and results matching any word (logical OR) are returned. Note: Mailgun's OpenAPI spec marks limit, search, and skip as required query parameters for this endpoint, but the accompanying prose documents search as conditional ('if present') — this tool treats all three as optional with sensible defaults to match documented behavior.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The IP address to filter on. Must belong to the account.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of domains to return. Default 100.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query that returned domain names must match (split into words, matched with logical OR). If omitted, no name filter is applied.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `The number of matching domains to skip in the response. Default 0.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_remove_ip_from_all_domains',
    description: `Remove an IP from every domain on the account, replacing it with a given alternative IP on all of those domains. The IP must belong to the account. This starts an asynchronous background operation; the response returns a message and a reference_id. Live-confirmed: despite the prose documentation describing 'alternative' as present-if-needed, Mailgun's API actually rejects the call outright ('alternative' is missing) when it's omitted, matching the OpenAPI schema's formal 'required' marking rather than the prose — so this field is required.`,
    params: [
      {
        name: 'alternative',
        type: 'string',
        required: true,
        description: `The IP that will replace the removed IP on all domains. Required — Mailgun rejects the request if this is omitted, despite the prose documentation suggesting it's optional.`,
      },
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `The IP address to remove from all account domains. Must belong to the account.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_remove_ip_from_domain',
    description: `Remove an IP from a domain's IP pool, unlink a dedicated IP pool (DIPP) from a domain, or remove the domain's entire pool — behavior depends on the 'ip' path value: a valid IP address removes that IP; the special value 'all' removes the entire domain pool (the domain will no longer exist as far as the system is concerned); the special value 'ip_pool' unlinks the DIPP currently linked to the domain (requires the DIPPs feature). It is not possible to alter domain IPs while a DIPP is linked to the domain. If the account is not eligible for shared IPs, removing the last IP is not allowed. When unlinking a DIPP, specify exactly one of Replacement IP or Replacement Pool ID (not both); use the special value 'shared' as the replacement IP only if the account is eligible for shared IPs.`,
    params: [
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `One of: a valid IP address to remove, the special value 'all' to remove the entire domain pool, or the special value 'ip_pool' to unlink the DIPP currently linked to the domain.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain name to remove the IP/pool from. Converted internally to the domain's ID.`,
      },
      {
        name: 'replacement_ip',
        type: 'string',
        required: false,
        description: `Replacement IP to assign, or the special value 'shared' (only valid if the account is eligible for shared IPs). Used when unlinking a DIPP; mutually exclusive with replacement_pool_id.`,
      },
      {
        name: 'replacement_pool_id',
        type: 'string',
        required: false,
        description: `Replacement DIPP (dedicated IP pool) ID to link in place of the unlinked one. Mutually exclusive with replacement_ip.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_request_new_ip',
    description: `Request that Mailgun add a new dedicated IP to the account. A new IP can be assigned only if the account's billing plan and limits allow it.`,
    params: [],
  },
  {
    name: 'mailgun_ips_set_ip_band',
    description: `Place an account IP into a dedicated IP band. The 'Dedicated IP Bands' feature must be enabled for the account, and the IP must be a dedicated IP belonging to the account.`,
    params: [
      {
        name: 'addr',
        type: 'string',
        required: true,
        description: `The dedicated IP address to place into a band. Must belong to the account.`,
      },
      {
        name: 'ip_band',
        type: 'string',
        required: true,
        description: `The dedicated IP band to place the IP address into.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_update_domain_spillover_pool',
    description: `Set or modify the dedicated IP pool (DIPP) used for spillover for a specific domain. The pool must contain at least one fully warmed IP address to be valid. To disable DIPP spillover for the domain, set Pool ID to an empty string.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The domain's INTERNAL ID (a Mongo ObjectID, e.g. 6a709fac9163aa838dac9844) — NOT the domain's DNS name. Live-confirmed: this endpoint rejects a DNS-style name with 'parsing domain id: the provided hex string is not a valid ObjectID'. Get the internal ID from mailgun_domains_get's or mailgun_domains_list's response (the 'id' field on the domain object).`,
      },
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool that spillover IPs are assigned to. Set to an empty string to disable DIPP spillover for this domain.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_update_spillover_settings',
    description: `Set or modify the account-level dedicated IP pool (DIPP) used for IP spillover. This value applies to all domains under the account. The pool must contain at least one fully warmed IP address to be valid. To disable DIPP spillover for the account, set Pool ID to an empty string.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool that spillover IPs are assigned to, applied account-wide. Set to an empty string to disable DIPP spillover for the account.`,
      },
    ],
  },
  {
    name: 'mailgun_ips_update_subaccount_assignments',
    description: `Link and/or unlink dedicated IPs to/from one or more subaccounts in a single operation. IPs linked to subaccounts can then be linked to subaccount domains and placed in subaccount IP pools. The account must have the centralized IP assignment feature enabled. Either subaccount_id (one or more) or all_subaccounts=true must be specified, but not both. When all_subaccounts is true or over 100 subaccounts are specified, the operation is applied to every subaccount asynchronously and the response contains 'queued' instead of 'success'. To link an IP: it must be a dedicated IP belonging to the parent account and must not be assigned to a Dynamic IP Pool on the parent account. To unlink an IP: it must not be assigned to any IP pools or domains on the subaccount. Note: Mailgun's OpenAPI spec does not formally declare a requestBody or query parameters for this operation, but its prose description documents these fields as form-encoded request parameters — this tool models them accordingly.`,
    params: [
      {
        name: 'all_subaccounts',
        type: 'boolean',
        required: false,
        description: `When true, applies the operation to every subaccount of the parent account asynchronously. Cannot be combined with subaccount_id.`,
      },
      {
        name: 'link_ip',
        type: 'array',
        required: false,
        description: `Dedicated IP address(es) to link to the given subaccount(s). May be specified as an array with multiple values.`,
      },
      {
        name: 'subaccount_id',
        type: 'array',
        required: false,
        description: `One or more subaccount IDs to update. Required unless all_subaccounts is true. May be specified as an array with multiple values.`,
      },
      {
        name: 'unlink_ip',
        type: 'array',
        required: false,
        description: `Dedicated IP address(es) to unlink from the given subaccount(s). May be specified as an array with multiple values.`,
      },
    ],
  },
  {
    name: 'mailgun_limits_create',
    description: `Create a limit threshold for a Mailgun account. Limit thresholds track internal usage metrics (email preview or seed test counts) and record when the configured limit is reached. Requires name, metric, comparator, limit, and dimension; filters, period, and description are optional.`,
    params: [
      {
        name: 'comparator',
        type: 'string',
        required: true,
        description: `The comparison operator used to evaluate the metric against the limit value.`,
      },
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The dimension the metric is aggregated by (e.g. subaccount, domain, ip, ip_pool, recipient_provider).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: true,
        description: `The threshold limit value to compare the metric against. For limits this is typically a count, e.g. "2100".`,
      },
      {
        name: 'metric',
        type: 'string',
        required: true,
        description: `The metric being monitored. For limit thresholds this tracks internal usage counts: email_preview_success_count (successful email previews) or seed_test_count (inbox placement tests).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A user-friendly name for the limit threshold.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A free-text description of what this limit does.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional list of filters to scope this limit to specific dimension values (e.g. only certain domains or subaccounts).`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The time period for the metric aggregation, in the format '1h', '1d', '1M', etc.`,
      },
    ],
  },
  {
    name: 'mailgun_limits_delete',
    description: `Delete a limit threshold from a Mailgun account by its name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A user-friendly name that identifies this limit threshold. Used as the path identifier for get/update/delete operations.`,
      },
    ],
  },
  {
    name: 'mailgun_limits_get',
    description: `Get the details of a single limit threshold for a Mailgun account by its name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A user-friendly name that identifies this limit threshold. Used as the path identifier for get/update/delete operations.`,
      },
    ],
  },
  {
    name: 'mailgun_limits_list',
    description: `List all limit thresholds configured for a Mailgun account.`,
    params: [],
  },
  {
    name: 'mailgun_limits_update',
    description: `Update (full replacement) an existing limit threshold for a Mailgun account. This is a PUT — fetch the current limit via Get Limit Threshold first and resend all its fields, changing only what you want to change, since omitted attributes may be reset or cause validation errors.`,
    params: [
      {
        name: 'comparator',
        type: 'string',
        required: true,
        description: `The comparison operator used to evaluate the metric against the limit value.`,
      },
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The dimension the metric is aggregated by (e.g. subaccount, domain, ip, ip_pool, recipient_provider).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: true,
        description: `The threshold limit value to compare the metric against. For limits this is typically a count, e.g. "2100".`,
      },
      {
        name: 'metric',
        type: 'string',
        required: true,
        description: `The metric being monitored. For limit thresholds this tracks internal usage counts: email_preview_success_count (successful email previews) or seed_test_count (inbox placement tests).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the existing limit threshold to update (used as the path identifier). This endpoint performs a full replacement, so it is also sent back as the resource's name in the update payload.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A free-text description of what this limit does.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional list of filters to scope this limit to specific dimension values (e.g. only certain domains or subaccounts).`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The time period for the metric aggregation, in the format '1h', '1d', '1M', etc.`,
      },
    ],
  },
  {
    name: 'mailgun_logs_query',
    description: `Query Mailgun's customer event logs for an account over a time window, optionally filtered by event type(s) and an advanced filter expression, with cursor-based pagination. Returns individual log entries (not aggregated metrics). Note: the API spec marks 'duration' as required, but Mailgun's own documented behavior is that start defaults to 1 day before the current time and end defaults to the current time when omitted — duration is only needed when you want to derive the window from 'end' instead of specifying 'start' directly. All date fields are optional here for that reason.`,
    params: [
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration such as '1d' or '2h'. If provided, it is calculated from the end date and overwrites the start date.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End date/time for the query window, in RFC 2822 format. Defaults to the current time if omitted.`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `Restrict results to these event types.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Advanced filter expression narrowing results. Shape: {"AND": [{"attribute": <field name, e.g. 'domain', 'recipient', 'tag'>, "comparator": "=", "values": [{"label": "...", "value": "..."}]}]}. Example: {"AND": [{"attribute": "domain", "comparator": "=", "values": [{"label": "example.com", "value": "example.com"}]}]}.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Include logs from all subaccounts under this account.`,
      },
      {
        name: 'include_totals',
        type: 'boolean',
        required: false,
        description: `Include the total number of matching log entries in the response.`,
      },
      {
        name: 'metric_events',
        type: 'array',
        required: false,
        description: `Optional set of higher-level analytics metric events; these are converted internally into the corresponding raw events.`,
      },
      {
        name: 'pagination_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of log entries to return (100 max).`,
      },
      {
        name: 'pagination_sort',
        type: 'string',
        required: false,
        description: `Colon-separated column name and sort direction, e.g. 'timestamp:asc'.`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Opaque pagination token from a prior response, used to fetch the next page.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start date/time for the query window, in RFC 2822 format. Defaults to 1 day before the current time if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_bulk_add_members_json',
    description: `Bulk-add up to 1000 members to a Mailgun mailing list in a single call by providing a JSON-encoded array of member addresses or member objects. If the array contains more than 100 entries, Mailgun processes the upload asynchronously in the background and returns a task ID.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list to add members to, e.g. developers@mailgun.net.`,
      },
      {
        name: 'members',
        type: 'string',
        required: true,
        description: `Members to add, as a JSON-encoded array (passed as text). Provide either an array of plain email address strings, e.g. ["alice@example.com","bob@example.com"], or an array of member objects with fields address (required), name, vars (object of custom fields), and subscribed (boolean), e.g. [{"address":"alice@example.com","name":"Alice","subscribed":true}]. Up to 1000 members per call.`,
      },
      {
        name: 'upsert',
        type: 'boolean',
        required: false,
        description: `If true, an existing member matching an address will be updated instead of causing an error. Defaults to false.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_create',
    description: `Create a new mailing list on your Mailgun account, identified by a unique email address. Optionally set a display name, description, access level (who can post to the list), and where replies should be routed.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `A valid email address for the new mailing list, e.g. developers@mailgun.net. May also include a display name, e.g. "Developers <devs@mg.net>".`,
      },
      {
        name: 'access_level',
        type: 'string',
        required: false,
        description: `List access level: readonly (only admins can post), members (only list members can post), or everyone (anyone can post). Defaults to readonly.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A free-text description of the mailing list.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the mailing list, e.g. Developers.`,
      },
      {
        name: 'reply_preference',
        type: 'string',
        required: false,
        description: `Where replies to messages sent to this list should go: list (back to the mailing list) or sender (directly to the original sender). Defaults to list.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_create_member',
    description: `Add a new member to an existing Mailgun mailing list. Requires the list's address and the new member's email address. Optionally set a display name, custom variables (as a JSON object), whether the member starts subscribed, and whether to upsert (update instead of error) if the member already exists. For adding many members at once, use the bulk JSON upload tool instead.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `Valid email address of the member to add.`,
      },
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list to add the member to, e.g. developers@mailgun.net.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `An optional display name for the member.`,
      },
      {
        name: 'subscribed',
        type: 'boolean',
        required: false,
        description: `Whether the member is subscribed. Defaults to true.`,
      },
      {
        name: 'upsert',
        type: 'boolean',
        required: false,
        description: `If true, update the member if one with the same address already exists; if false, raise an error on a duplicate. Defaults to false.`,
      },
      {
        name: 'vars',
        type: 'string',
        required: false,
        description: `Optional custom variables for this member, as a JSON-ENCODED STRING (not a raw JSON object) of arbitrary key/value pairs, e.g. "{\\"gender\\":\\"female\\",\\"age\\":27}". Must be pre-serialized to a JSON string before passing it in — Mailgun's API only accepts this field as a string; a raw object value is silently dropped.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_delete',
    description: `Permanently delete a Mailgun mailing list and all of its members. This action cannot be undone.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list to delete, e.g. developers@mailgun.net.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_delete_member',
    description: `Permanently remove a single member from a Mailgun mailing list. This action cannot be undone.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list the member belongs to, e.g. developers@mailgun.net.`,
      },
      {
        name: 'member_address',
        type: 'string',
        required: true,
        description: `The email address of the member to remove from the list.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_get',
    description: `Retrieve details for a single Mailgun mailing list by its address, including name, description, access level, reply preference, creation timestamp, and member count.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list to retrieve, e.g. developers@mailgun.net.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_get_member',
    description: `Retrieve details for a single member of a Mailgun mailing list, including their address, name, custom variables, and subscription status.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list the member belongs to, e.g. developers@mailgun.net.`,
      },
      {
        name: 'member_address',
        type: 'string',
        required: true,
        description: `The email address of the member to retrieve.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_list',
    description: `List mailing lists on your Mailgun account, with optional pagination (limit/skip) and filtering by a specific address.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Filter mailing lists matching a specific address.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of mailing lists to return. Defaults to 100.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of mailing lists to skip before starting to return results. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_list_by_page',
    description: `Paginate over mailing lists on your Mailgun account. The response includes cursor-style paging links (first/last/next/previous) for walking through all lists.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of mailing lists to return per page. Defaults to 100.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_list_members',
    description: `List members of a Mailgun mailing list, with optional filtering by address or subscription status, and pagination (limit/skip).`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list whose members should be listed, e.g. developers@mailgun.net.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Filter results to a member matching this valid email address.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return. Max is 100. Defaults to 100.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of members to skip before starting to return results. Defaults to 0.`,
      },
      {
        name: 'subscribed',
        type: 'boolean',
        required: false,
        description: `Filter members by whether they are subscribed or not.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_list_members_by_page',
    description: `Paginate over the members of a Mailgun mailing list in ascending order, using cursor-style paging (first/last/next/prev) and an optional address pivot, with optional filtering by subscription status.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list whose members should be paginated, e.g. developers@mailgun.net.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `Email address to use as the pivot point for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Set the maximum number of members to return per page. Defaults to 100.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Which page to fetch relative to the pivot address: first, last, next, or prev.`,
      },
      {
        name: 'subscribed',
        type: 'boolean',
        required: false,
        description: `Filter members by whether they are subscribed or not.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_update',
    description: `Update properties of an existing Mailgun mailing list, such as its address, name, description, access level, or reply routing preference. Only include the fields you want to change — fields left blank are not sent and the list's existing values for them are preserved.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The current address of the mailing list to update, e.g. developers@mailgun.net.`,
      },
      {
        name: 'access_level',
        type: 'string',
        required: false,
        description: `New access level for the list: readonly, members, or everyone. Leave unset to keep the current value (API default when creating is readonly).`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The new mailing list address, if you want to rename/change the list's address. Leave unset to keep the current address.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the mailing list. Leave unset to keep the current description.`,
      },
      {
        name: 'list_id',
        type: 'string',
        required: false,
        description: `Optional advanced List-Id override for the mailing list. Rarely needed; leave unset unless you specifically need to change this.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the mailing list. Leave unset to keep the current name.`,
      },
      {
        name: 'reply_reference',
        type: 'string',
        required: false,
        description: `Where replies to messages sent to this list should go: list (back to the mailing list) or sender (directly to the original sender). Leave unset to keep the current value.`,
      },
    ],
  },
  {
    name: 'mailgun_mailing_lists_update_member',
    description: `Update properties of an existing member of a Mailgun mailing list, such as their address, name, custom variables, or subscription status. Existing properties not included in the request are left unchanged.`,
    params: [
      {
        name: 'list_address',
        type: 'string',
        required: true,
        description: `The address of the mailing list the member belongs to, e.g. developers@mailgun.net.`,
      },
      {
        name: 'member_address',
        type: 'string',
        required: true,
        description: `The current email address of the member to update.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `New email address for the member, if you want to change it. Leave unset to keep the current address.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the member. Leave unset to keep the current name.`,
      },
      {
        name: 'subscribed',
        type: 'boolean',
        required: false,
        description: `Whether the member should be subscribed or not. Leave unset to keep the current subscription status.`,
      },
      {
        name: 'vars',
        type: 'string',
        required: false,
        description: `New custom variables for this member, as a JSON-ENCODED STRING (not a raw JSON object) of arbitrary key/value pairs, e.g. "{\\"gender\\":\\"female\\",\\"age\\":27}". Must be pre-serialized to a JSON string before passing it in — Mailgun's API only accepts this field as a string; a raw object value is silently dropped. Leave unset to keep the current values.`,
      },
    ],
  },
  {
    name: 'mailgun_messages_delete_scheduled',
    description: `Delete all scheduled and undelivered mail from a domain's message queue. Known limitation (live-confirmed): this endpoint does not live on the account's regular api.mailgun.net/api.eu.mailgun.net host — Mailgun returns 405 Method Not Allowed there. It must be called on the specific storage API host matching where the mail was actually queued (storage-us-east4, storage-us-west1, or storage-europe-west1.api.mailgun.net), and the Scalekit REST executor has no mechanism for a single tool call to target a host other than the connection's configured one. This tool is hardcoded to storage-us-east4.api.mailgun.net (Mailgun's default/most common storage region). If your domain's scheduled mail is actually queued in a different storage region, this call will return success but find nothing to delete — it is not a destructive risk in that case, just a silent no-op.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The name of the domain to delete scheduled/undelivered mail from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_messages_get_queue_status',
    description: `Get the current sending queue status for a Mailgun domain, covering both the regular (immediate) queue and the scheduled-message queue. Each queue reports whether sending is currently disabled and, if so, the reason and until when.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The name of the domain to get sending queue status for, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_messages_get_stored_message',
    description: `Retrieve a stored email that was previously accepted/delivered by Mailgun, using the storage key from that email's associated events (e.g. the Accepted or Delivered event's \`storage.key\` field). Returns the message headers, plain-text and HTML bodies, stripped signature, and any Mailgun template metadata. Storage keys are only available for the duration of the domain's message retention policy.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name that was used to send the email, e.g. mg.example.com.`,
      },
      {
        name: 'storage_key',
        type: 'string',
        required: true,
        description: `Storage key from the email's associated events (e.g. an Accepted or Delivered event's \`storage.key\` field). Only available for the duration of the domain's message retention policy.`,
      },
    ],
  },
  {
    name: 'mailgun_messages_resend_stored_message',
    description: `Resend a previously stored email (identified by its storage key) to one or more recipients. Note: binary attachments and inline file content are not supported by this tool; the resend uses the originally stored message content as-is.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name that was used to send the original email, e.g. mg.example.com.`,
      },
      {
        name: 'storage_key',
        type: 'string',
        required: true,
        description: `Storage key from the email's associated events (e.g. an Accepted or Delivered event's \`storage.key\` field). Only available for the duration of the domain's message retention policy.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `Email address of the recipient(s) to resend the stored message to. Supports friendly name format, e.g. "Bob <bob@host.com>". Use commas to separate multiple recipients.`,
      },
    ],
  },
  {
    name: 'mailgun_messages_send',
    description: `Send an email through Mailgun. Provide the components of the message (from, to, subject, and a body) and Mailgun builds the MIME representation and sends it; at least one of text, html, amp-html, or template is required for the body. Supports CC/BCC, scheduled/optimized delivery, per-message DKIM and TLS overrides, click/open tracking controls, tagging, template rendering with variables, a Reply-To header, and batch personalization via recipient-variables. To/CC/BCC each take a single string value — comma-separate multiple addresses within that one field (e.g. "bob@host.com,alice@host.com"); do not pass a JSON array. Send options (o:, h:, t:, v: prefixed parameters) are limited to 16KB total. Note: binary attachments and inline file content are not supported by this tool — send text/HTML/template-based email only. Mailgun's generic per-message custom headers (h:*) and custom variables (v:*) beyond the dedicated Reply-To field are also not supported, since they require dynamically-named fields that this tool's fixed input schema cannot represent; use Recipient Variables for per-recipient custom data instead.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `Domain name to send the email through, e.g. mg.example.com.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `Email address(es) of the recipient(s). For multiple recipients, separate addresses with a comma in this single value, e.g. "bob@host.com,alice@host.com" — do NOT pass a JSON array (Mailgun's form-encoded API expects one comma-joined value here, not repeated/indexed keys). Supports friendly name format, e.g. "Bob <bob@host.com>". Duplicate addresses are automatically ignored.`,
      },
      {
        name: 'amp_html',
        type: 'string',
        required: false,
        description: `AMP part of the message. Follow Google's AMP for Email guidelines when composing this content.`,
      },
      {
        name: 'bcc',
        type: 'string',
        required: false,
        description: `Same as \`to\` but for blind carbon copy recipients. For multiple BCC recipients, separate addresses with a comma in this single value — do NOT pass a JSON array. Supports friendly name format.`,
      },
      {
        name: 'cc',
        type: 'string',
        required: false,
        description: `Same as \`to\` but for carbon copy recipients. For multiple CC recipients, separate addresses with a comma in this single value — do NOT pass a JSON array. Supports friendly name format.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Email address for the From header. Can include a friendly name, e.g. "Excited User <mailgun@example.com>". Not required if sending with a template that has a pre-set From header (in which case this overrides it if provided); otherwise required.`,
      },
      {
        name: 'html',
        type: 'string',
        required: false,
        description: `Body of the message (HTML version). At least one of text, html, amp-html, or template is required.`,
      },
      {
        name: 'o_archive_to',
        type: 'string',
        required: false,
        description: `Sends a copy of the successfully delivered message as an HTTP POST (Content-Type application/mime) to this URL, containing exactly what the recipient's SMTP server received. Billed as a delivered message.`,
      },
      {
        name: 'o_deliver_within',
        type: 'string',
        required: false,
        description: `Maximum time window for delivering the message, in \`[0-9]+h[0-9]+m\` format (e.g. \`1h30m\`, \`30m\`, \`24h\`), minimum 5m, maximum 24h. For scheduled messages, the window starts from the scheduled time.`,
      },
      {
        name: 'o_deliverytime',
        type: 'string',
        required: false,
        description: `Schedules delivery for a future time, in RFC-2822 format. Depending on your plan you can schedule up to 3 or 7 days in advance (or your domain's custom message_ttl).`,
      },
      {
        name: 'o_deliverytime_optimize_period',
        type: 'string',
        required: false,
        description: `Toggles Send Time Optimization (STO) per message. Set to the number of hours in \`[0-9]+h\` format, min 24h, max 72h. Only available on certain plans.`,
      },
      {
        name: 'o_dkim',
        type: 'string',
        required: false,
        description: `Enables or disables DKIM signatures on a per-message basis, overriding the domain-level DKIM setting for this message.`,
      },
      {
        name: 'o_require_tls',
        type: 'string',
        required: false,
        description: `If 'yes', requires the message to be sent only over a TLS connection; if TLS can't be established the message is not delivered. If 'no' (default), Mailgun attempts TLS but falls back to plaintext SMTP.`,
      },
      {
        name: 'o_secondary_dkim',
        type: 'string',
        required: false,
        description: `Specify a second domain key to sign the email with, formatted as \`signing_domain/selector\` (e.g. \`example.com/s1\`). The domain key must already exist and be activated.`,
      },
      {
        name: 'o_secondary_dkim_public',
        type: 'string',
        required: false,
        description: `Alias of the domain key specified in Secondary DKIM, formatted as \`public_signing_domain/selector\`. Secondary DKIM must also be provided.`,
      },
      {
        name: 'o_sending_ip',
        type: 'string',
        required: false,
        description: `Specify a dedicated IP address (owned by your account) to send this message from.`,
      },
      {
        name: 'o_sending_ip_pool',
        type: 'string',
        required: false,
        description: `If provided, the email is delivered using an IP from this IP Pool ID.`,
      },
      {
        name: 'o_skip_verification',
        type: 'string',
        required: false,
        description: `If 'yes', the certificate and hostname of the resolved MX host are not verified when establishing TLS. If 'no' (default), Mailgun verifies them and won't establish a TLS connection if verification fails.`,
      },
      {
        name: 'o_suppress_headers',
        type: 'string',
        required: false,
        description: `Removes specified X-Mailgun headers from the delivered message. Comma-separated header names, or 'all' to remove all X-Mailgun headers. Note: X-Mailgun-Sid is used to process complaints from feedback loops.`,
      },
      {
        name: 'o_tag',
        type: 'array',
        required: false,
        description: `Tag string(s) to attach to the message for tracking/analytics purposes. Up to 3 tags per message.`,
      },
      {
        name: 'o_testmode',
        type: 'string',
        required: false,
        description: `Enables sending in test mode: the message is processed normally but not actually delivered to recipients. Set to 'yes' to enable.`,
      },
      {
        name: 'o_time_zone_localize',
        type: 'string',
        required: false,
        description: `Toggles Timezone Optimization (TZO) per message. Set to the preferred delivery time in \`HH:mm\` (24h) or \`hh:mmaa\` (12h with AM/PM) format. Only available on certain plans.`,
      },
      {
        name: 'o_tracking',
        type: 'string',
        required: false,
        description: `Toggles both click and open tracking on a per-message basis, overriding the domain-level setting.`,
      },
      {
        name: 'o_tracking_clicks',
        type: 'string',
        required: false,
        description: `Toggles click tracking on a per-message basis, overriding the domain-level click-tracking setting. 'htmlonly' rewrites links only in the HTML part.`,
      },
      {
        name: 'o_tracking_opens',
        type: 'string',
        required: false,
        description: `Toggles open tracking on a per-message basis. Has higher priority than the domain-level setting.`,
      },
      {
        name: 'o_tracking_pixel_location_top',
        type: 'string',
        required: false,
        description: `Places the open-tracking pixel at the top of the email instead of the bottom. Useful for long emails that may be truncated or have rendering issues.`,
      },
      {
        name: 'recipient_variables',
        type: 'string',
        required: false,
        description: `A JSON-encoded dictionary for batch sending with personalized variables per recipient. Each key is a recipient email address; each value is a dictionary of variables for that recipient, referenced in the message as %recipient.variablename%. Maximum 1,000 recipients per batch.`,
      },
      {
        name: 'reply_to',
        type: 'string',
        required: false,
        description: `Sets a Reply-To header on the message via Mailgun's custom-header mechanism (sent as the \`h:Reply-To\` form field). This is the only individually-addressable custom header exposed by this tool; Mailgun's general h:<Header-Name> mechanism for arbitrary custom headers is not otherwise supported because it requires a dynamic field name that this tool's fixed set of inputs can't represent.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Message subject. Not required if sending with a template that has a pre-set Subject header (in which case this overrides it if provided); otherwise a subject or a template with a preset subject is expected.`,
      },
      {
        name: 't_text',
        type: 'string',
        required: false,
        description: `Generates a plain-text version of the template alongside the HTML version. Set to 'yes' to have Mailgun create a text/plain MIME part from the template content, improving deliverability/accessibility.`,
      },
      {
        name: 't_variables',
        type: 'string',
        required: false,
        description: `A valid JSON-encoded dictionary used as input for template variable expansion.`,
      },
      {
        name: 't_version',
        type: 'string',
        required: false,
        description: `Render a specific version of the given template instead of the latest version. The \`template\` field must also be provided.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `Name of a template stored via the Templates API to use to render the email body. If provided, text/html/amp-html are optional.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Body of the message (plain-text version). At least one of text, html, amp-html, or template is required.`,
      },
    ],
  },
  {
    name: 'mailgun_metrics_query_account_metrics',
    description: `Query aggregated Mailgun account metrics (e.g. accepted_count, delivered_count, clicked_rate) over a time window, optionally broken down by dimensions (e.g. domain, tag, time) and narrowed by an advanced filter expression. Unlike Query Logs, this returns aggregated statistics rather than individual log entries.`,
    params: [
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Attributes to break the metric data down by, e.g. 'domain' or 'time'.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration such as '1d', '2h', or '2m'. If provided, it is calculated from the end date and overwrites the start date.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End date/time for the query window, in RFC 2822 format. Defaults to the current time if omitted.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Advanced filter expression narrowing results. Shape: {"AND": [{"attribute": <field name, e.g. 'domain', 'tag', 'subaccount'>, "comparator": "=", "values": [{"label": "...", "value": "..."}]}]}. Example: {"AND": [{"attribute": "domain", "comparator": "=", "values": [{"label": "example.com", "value": "example.com"}]}]}.`,
      },
      {
        name: 'include_aggregates',
        type: 'boolean',
        required: false,
        description: `Include top-level aggregate metrics in addition to the dimensioned breakdown.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Include stats from all subaccounts under this account.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Names of the metrics to return, e.g. 'accepted_count', 'delivered_count', 'clicked_rate'. Provide at least one metric to get meaningful results.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time bucket resolution for the returned metrics, e.g. 'day', 'hour', or 'month'. Defaults to 'day' if omitted.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start date/time for the query window, in RFC 2822 format. Defaults to 7 days before the current time if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_metrics_query_usage_metrics',
    description: `Query aggregated Mailgun account usage metrics (e.g. email_validation_count, seed_test_count, archived_count) over a time window, optionally broken down by dimensions ('subaccount' or 'time') and narrowed by an advanced filter expression. This covers feature usage (validation, previews, monitoring, etc.), distinct from the delivery/engagement metrics returned by Query Account Metrics.`,
    params: [
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Attributes to break the usage metric data down by: 'subaccount' or 'time'.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration such as '1d', '2h', or '2m'. If provided, it is calculated from the end date and overwrites the start date.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End date/time for the query window, in RFC 2822 format. Defaults to the current time if omitted.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Advanced filter expression narrowing results. Shape: {"AND": [{"attribute": <field name, e.g. 'subaccount'>, "comparator": "=", "values": [{"label": "...", "value": "..."}]}]}. Example: {"AND": [{"attribute": "subaccount", "comparator": "=", "values": [{"label": "12345", "value": "12345"}]}]}.`,
      },
      {
        name: 'include_aggregates',
        type: 'boolean',
        required: false,
        description: `Include top-level aggregate usage metrics in addition to the dimensioned breakdown.`,
      },
      {
        name: 'include_subaccounts',
        type: 'boolean',
        required: false,
        description: `Include usage stats from all subaccounts under this account.`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: false,
        description: `Names of the usage metrics to return, e.g. 'email_validation_count', 'seed_test_count'. Provide at least one metric to get meaningful results.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time bucket resolution for the returned metrics, e.g. 'day', 'hour', or 'month'. Defaults to 'day' if omitted.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start date/time for the query window, in RFC 2822 format. Defaults to 7 days before the current time if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_routes_create',
    description: `Add a new route to the Mailgun account. Routes are account-wide (not per-domain) rules that match incoming email against an expression and execute one or more actions (forward, store, stop, etc.) when it matches.`,
    params: [
      {
        name: 'expression',
        type: 'string',
        required: true,
        description: `The filtering rule that determines when this route's actions fire, written using Mailgun's route-expression syntax (e.g. match_recipient, match_header, catch_all).`,
      },
      {
        name: 'action',
        type: 'array',
        required: false,
        description: `One or more actions to execute when the expression evaluates to true, e.g. forward("url"), store(), stop(). You can pass multiple actions.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An arbitrary human-readable description for this route.`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Smaller number indicates higher priority; higher-priority routes are evaluated first. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'mailgun_routes_delete',
    description: `Permanently remove a route from the account by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the route to delete.` },
    ],
  },
  {
    name: 'mailgun_routes_get',
    description: `Retrieve a detailed view of a single route by its ID, including its priority, description, filter expression, actions, and creation time.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the route to retrieve.`,
      },
    ],
  },
  {
    name: 'mailgun_routes_list',
    description: `Get the list of routes configured on the account. Routes are defined globally per account, not per domain, and are evaluated in priority order against incoming mail.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return. Defaults to 100; cannot be larger than 1000.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of records to skip, for pagination. Defaults to 0.`,
      },
    ],
  },
  {
    name: 'mailgun_routes_match',
    description: `Check whether a given email address matches at least one configured route, and return the first matching route's details.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to test against the account's configured routes.`,
      },
    ],
  },
  {
    name: 'mailgun_routes_update',
    description: `Update an existing route. All fields are optional — only the fields you provide are changed, everything else is left unchanged.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the route to update.` },
      {
        name: 'action',
        type: 'array',
        required: false,
        description: `One or more actions to execute when the expression evaluates to true. Only updates this field if provided.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An arbitrary human-readable description for this route. Only updates this field if provided.`,
      },
      {
        name: 'expression',
        type: 'string',
        required: false,
        description: `The filtering rule that determines when this route's actions fire. Only updates this field if provided.`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Smaller number indicates higher priority; higher-priority routes are evaluated first. Only updates this field if provided.`,
      },
    ],
  },
  {
    name: 'mailgun_send_alerts_create',
    description: `Create a send alert for a Mailgun account. Send alerts monitor sending health metrics (hard bounce rate, temporary fail rate, delivered rate, complained rate) and notify configured channels when a threshold is crossed. Requires name, metric, comparator, limit, and dimension; alert_channels, filters, period, and description are optional.`,
    params: [
      {
        name: 'comparator',
        type: 'string',
        required: true,
        description: `The comparison operator used to evaluate the metric against the limit value.`,
      },
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The dimension the metric is aggregated by (e.g. subaccount, domain, ip, ip_pool, recipient_provider).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: true,
        description: `The threshold limit value to compare the metric against. For send alerts this is typically a rate between 0 and 1, e.g. ".99".`,
      },
      {
        name: 'metric',
        type: 'string',
        required: true,
        description: `The metric being monitored.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A user-friendly name for the send alert.`,
      },
      {
        name: 'alert_channels',
        type: 'array',
        required: false,
        description: `A list of channels to notify when the alert triggers.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A free-text description of what this alert does.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional list of filters to scope this alert to specific dimension values (e.g. only certain domains or subaccounts).`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The time period for the metric aggregation, in the format '1h', '1d', '1M', etc.`,
      },
    ],
  },
  {
    name: 'mailgun_send_alerts_delete',
    description: `Delete a send alert from a Mailgun account by its name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A user-friendly name that identifies this send alert. Used as the path identifier for get/update/delete operations.`,
      },
    ],
  },
  {
    name: 'mailgun_send_alerts_get',
    description: `Get the details of a single send alert for a Mailgun account by its name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A user-friendly name that identifies this send alert. Used as the path identifier for get/update/delete operations.`,
      },
    ],
  },
  {
    name: 'mailgun_send_alerts_list',
    description: `List all send alerts configured for a Mailgun account.`,
    params: [],
  },
  {
    name: 'mailgun_send_alerts_list_hits',
    description: `List account hits — the history of times a configured limit threshold or send alert was triggered for a Mailgun account, including whether each is currently triggered and its latest observed value.`,
    params: [],
  },
  {
    name: 'mailgun_send_alerts_update',
    description: `Update (full replacement) an existing send alert for a Mailgun account. This is a PUT — fetch the current alert via Get Send Alert first and resend all its fields, changing only what you want to change (e.g. alert_channels), since omitted attributes may be reset or cause validation errors.`,
    params: [
      {
        name: 'comparator',
        type: 'string',
        required: true,
        description: `The comparison operator used to evaluate the metric against the limit value.`,
      },
      {
        name: 'dimension',
        type: 'string',
        required: true,
        description: `The dimension the metric is aggregated by (e.g. subaccount, domain, ip, ip_pool, recipient_provider).`,
      },
      {
        name: 'limit',
        type: 'string',
        required: true,
        description: `The threshold limit value to compare the metric against. For send alerts this is typically a rate between 0 and 1, e.g. ".98".`,
      },
      {
        name: 'metric',
        type: 'string',
        required: true,
        description: `The metric being monitored.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the existing send alert to update (used as the path identifier). This endpoint performs a full replacement, so it is also sent back as the resource's name in the update payload.`,
      },
      {
        name: 'alert_channels',
        type: 'array',
        required: false,
        description: `A list of channels to notify when the alert triggers.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A free-text description of what this alert does.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional list of filters to scope this alert to specific dimension values (e.g. only certain domains or subaccounts).`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `The time period for the metric aggregation, in the format '1h', '1d', '1M', etc.`,
      },
    ],
  },
  {
    name: 'mailgun_smtp_credentials_clear',
    description: `Delete ALL Mailgun SMTP credentials for a given domain. This is irreversible — any applications authenticating via SMTP with these credentials will lose access immediately.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain whose SMTP credentials should all be deleted.`,
      },
    ],
  },
  {
    name: 'mailgun_smtp_credentials_create',
    description: `Create Mailgun SMTP credentials for a given sending domain. Supply one or more login (or mailbox) email addresses to create credentials for; passwords are auto-generated by Mailgun unless you supply your own via the single 'password' value for this call. To assign distinct custom passwords per login, call this tool once per login.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to create SMTP credentials on.`,
      },
      {
        name: 'login',
        type: 'array',
        required: false,
        description: `Email address(es) of the SMTP credential user to create. Accepts multiple values to create several credentials in one call — provide each address as a separate array element; Mailgun's API accepts this parameter repeated (login=a@x.com&login=b@x.com), not as a single comma-joined value. Either login or mailbox must be provided.`,
      },
      {
        name: 'mailbox',
        type: 'array',
        required: false,
        description: `Email address(es) of the SMTP credential user, usable in place of login. Accepts multiple values — provide each address as a separate array element; Mailgun's API accepts this parameter repeated, not as a single comma-joined value. Either login or mailbox must be provided.`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Desired password for the new credential(s), if you prefer to set your own rather than have Mailgun generate one. This applies as a single value to the call — it is intentionally not a per-login list (Mailgun's own positional-matching contract for multiple distinct passwords in one call is ambiguous and this field is not sent as a query/URL parameter for security reasons, unlike login/mailbox). To assign distinct custom passwords to multiple logins, call this tool once per login. Omit entirely to let Mailgun auto-generate a password for each credential.`,
      },
      {
        name: 'system',
        type: 'boolean',
        required: false,
        description: `Whether these are system account credentials. Defaults to false.`,
      },
    ],
  },
  {
    name: 'mailgun_smtp_credentials_delete',
    description: `Delete a single Mailgun SMTP credential for a given domain and SMTP login (identified by its email-address 'spec'). This is irreversible.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain the credential belongs to.`,
      },
      {
        name: 'login_spec',
        type: 'string',
        required: true,
        description: `The login specification (email address) of the SMTP credential to delete.`,
      },
    ],
  },
  {
    name: 'mailgun_smtp_credentials_list',
    description: `List Mailgun SMTP credential metadata (login names, creation dates — never passwords) for a given sending domain, with pagination.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to list SMTP credentials for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of credentials to return. Default 100.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination. Default 0.`,
      },
    ],
  },
  {
    name: 'mailgun_smtp_credentials_update',
    description: `Update the password of an existing Mailgun SMTP credential for a given domain and SMTP login (identified by its email-address 'spec').`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain the credential belongs to.`,
      },
      {
        name: 'login_spec',
        type: 'string',
        required: true,
        description: `The login specification (email address) of the SMTP credential to update.`,
      },
      {
        name: 'password',
        type: 'string',
        required: true,
        description: `The new password to set for this SMTP credential.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_get_account_totals',
    description: `Get email event stat totals for the entire Mailgun account (accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored), optionally filtered by date range and time resolution. At least one event type must be specified.`,
    params: [
      {
        name: 'event',
        type: 'array',
        required: true,
        description: `Event type(s) to include. Multiple values are allowed and are sent as repeated 'event' query parameters. Supported values: accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration expression (e.g. 7d, 1m) used to calculate 'start' from 'end'; when provided it overwrites the 'start' value.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to the current time if omitted.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time resolution to bucket the stats by: hour, day, or month. Defaults to day.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to 7 days before now if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_get_country_aggregates',
    description: `Get aggregate delivery/engagement event counts broken down by recipient country (e.g. US, RU) for a Mailgun sending domain. Returns counts of accepted, opened, clicked, unique_clicked, and unsubscribed events grouped by ISO country code.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_get_device_aggregates',
    description: `Get aggregate delivery/engagement event counts broken down by the device type that triggered them ('desktop', 'mobile', 'tablet', 'unknown') for a Mailgun sending domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_get_domain_totals',
    description: `Get email event stat totals for an entire Mailgun sending domain (accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored), optionally filtered by date range and time resolution. At least one event type must be specified.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'event',
        type: 'array',
        required: true,
        description: `Event type(s) to include. Multiple values are allowed and are sent as repeated 'event' query parameters. Supported values: accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration expression (e.g. 7d, 1m) used to calculate 'start' from 'end'; when provided it overwrites the 'start' value.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to the current time if omitted.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time resolution to bucket the stats by: hour, day, or month. Defaults to day.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to 7 days before now if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_get_filtered_totals',
    description: `Get filtered and grouped email event stat totals for the entire Mailgun account. Supports filtering by a metric expression (e.g. by domain) and grouping the results by a chosen key such as domain, ip, provider, tag, or country. At least one event type must be specified.`,
    params: [
      {
        name: 'event',
        type: 'array',
        required: true,
        description: `Event type(s) to include. Multiple values are allowed and are sent as repeated 'event' query parameters. Supported values: accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration expression (e.g. 7d, 1m) used to calculate 'start' from 'end'; when provided it overwrites the 'start' value.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to the current time if omitted.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `A filter expression for account-level metrics, e.g. 'domain:my.example.com'.`,
      },
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `The key to group metrics by. Must be one of: total, time, day, month, domain, ip, provider, tag, country.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time resolution to bucket the stats by: hour, day, or month. Defaults to day.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to 7 days before now if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_get_provider_aggregates',
    description: `Get aggregate delivery/engagement event counts broken down by email service provider (ESP), such as gmail.com or yahoo.com, for a Mailgun sending domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_stats_list_domain_totals',
    description: `Get email event stat totals for all domains in the account, for a single time resolution period. At least one event type and a timestamp are required.`,
    params: [
      {
        name: 'event',
        type: 'array',
        required: true,
        description: `Event type(s) to include. Multiple values are allowed and are sent as repeated 'event' query parameters. Supported values: accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `The date/time of the resolution period to retrieve totals for, in RFC 2822 format or Unix epoch seconds.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Number of domains to skip; used to page through large numbers of domains.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time resolution to bucket the stats by: hour, day, or month. Defaults to day.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_create',
    description: `Create a new Mailgun subaccount under your parent account. Subaccounts let you isolate sending, domains, and stats for different customers or projects while billing rolls up to the parent account. Requires only a name; the newly created subaccount is returned with its id and status (initially 'open').`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the subaccount to create. This is a display name and does not need to be unique.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_delegate_ip_pool',
    description: `Initiate delegation of a dedicated IP pool (DIPP) to a subaccount. If the subaccount already has a DIPP delegated to it, that DIPP is replaced. A 200 response only means the process started asynchronously (a saga) — it can still fail midway. Not usable for subaccounts with multiple inherited DIPPs. Note: Mailgun documents pool_id as a required form-encoded field for this endpoint even though it is missing from the endpoint's formal OpenAPI parameter list — it is included here as a required field to make the tool functional.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to delegate to the subaccount. Documented in Mailgun's endpoint description as a required form field, sent as application/x-www-form-urlencoded.`,
      },
      {
        name: 'subaccountId',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to delegate the DIPP to.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_delete',
    description: `Permanently delete a subaccount. The subaccount to delete is identified via the X-Mailgun-On-Behalf-Of request header (per Mailgun's spec for this endpoint), not a path or query parameter. This action is irreversible. Live-confirmed behavior (reproduced 3 times, immediately after other calls succeeded with a genuinely active connection): calling this against a subaccount_id that does not actually exist returns a generic '{"message":"Invalid private key"}' 401 from Mailgun, not a specific not-found error. This appears to be Mailgun's own on-behalf-of authorization layer failing closed when the target subaccount can't be resolved, rather than a credentials problem or a defect in this tool's request shape — every other tool in this connector gets a clean, specific not-found/plan-gate message for a nonexistent placeholder ID, so this is a distinctive exception worth knowing about. Could not be fully confirmed against a real subaccount (this account has none available); if this still returns 'Invalid private key' against a subaccount_id you know to be real and valid, that would indicate an actual auth/request-shape defect worth re-investigating.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to delete. Sent as the X-Mailgun-On-Behalf-Of request header.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_delete_custom_limit',
    description: `Delete the custom monthly sending limit set on a subaccount, reverting it to the account's default limit behavior.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount whose custom monthly sending limit should be deleted.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_disable',
    description: `Disable a subaccount, suspending its ability to send email or use other Mailgun features. Optionally provide a reason and a note explaining why it was disabled. Returns 400 if the subaccount is already disabled.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to disable.`,
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        description: `An optional free-text note attached to the subaccount when disabling it.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `The reason for disabling the subaccount. Optional, stored for audit/reference purposes.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_enable',
    description: `Re-enable a previously disabled subaccount, restoring its ability to send email. Returns 400 if the parent account has reached its allotted child (subaccount) limit.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to enable.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_get',
    description: `Fetch the details of a single subaccount by ID, including its name, status (open or disabled), and creation/update timestamps.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to fetch.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_get_custom_limit',
    description: `Fetch the current custom monthly sending limit configured on a subaccount, including the limit value, current usage, and the period (e.g. '1m'). Returns 404 if no custom threshold has been set for the account.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount whose custom monthly sending limit should be fetched.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_list',
    description: `Fetch all subaccounts under the parent account, with optional sorting by name, name filtering, pagination, and filtering by enabled/closed status.`,
    params: [
      {
        name: 'closed',
        type: 'boolean',
        required: false,
        description: `Include closed subaccounts (true) or exclude closed subaccounts (false). Leave unset to allow either, depending on other parameters provided.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Include enabled subaccounts (true) or disabled subaccounts (false). Leave unset to allow either, depending on other parameters provided.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Name of the subaccount to filter by (partial or complete match).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of subaccounts to return. Between 1 and 1000, default 10.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of subaccounts to skip for pagination. Default 0.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order by name: 'asc' for ascending, 'desc' for descending.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_list_delegated_ip_pools',
    description: `List all dedicated IP pools (DIPPs) that the parent account has delegated to its subaccounts, returning each pool_id/subaccount_id pairing and the total count. Takes no input parameters.`,
    params: [],
  },
  {
    name: 'mailgun_subaccounts_revoke_ip_pool',
    description: `Initiate revocation of a dedicated IP pool (DIPP) delegated to a subaccount. All domains linked to the DIPP will be unlinked. A 200 response only means the process started asynchronously (a saga) — it can still fail midway. Not usable for subaccounts with multiple inherited DIPPs.`,
    params: [
      {
        name: 'pool_id',
        type: 'string',
        required: true,
        description: `The ID of the dedicated IP pool (DIPP) to revoke from the subaccount.`,
      },
      {
        name: 'subaccountId',
        type: 'string',
        required: true,
        description: `The ID of the subaccount to revoke the DIPP from.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_update_custom_limit',
    description: `Set (or overwrite) a custom monthly sending limit on a subaccount, overriding the account's default limit behavior.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: true,
        description: `The custom monthly sending limit to set for this subaccount, as a number of messages.`,
      },
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount whose custom monthly sending limit should be set.`,
      },
    ],
  },
  {
    name: 'mailgun_subaccounts_update_feature',
    description: `Update one or more feature toggles on a subaccount (email preview, inbox placement, sending, validations, bulk validations). Each feature field is a JSON object (e.g. {"enabled": true}) encoded as a JSON string, sent as an application/x-www-form-urlencoded field. Provide only the feature(s) you want to change; omit the rest.`,
    params: [
      {
        name: 'subaccount_id',
        type: 'string',
        required: true,
        description: `The ID of the subaccount whose feature(s) should be updated.`,
      },
      {
        name: 'email_preview',
        type: 'string',
        required: false,
        description: `JSON object (as a string) toggling the email preview feature for this subaccount, e.g. '{"enabled": false}'.`,
      },
      {
        name: 'inbox_placement',
        type: 'string',
        required: false,
        description: `JSON object (as a string) toggling the inbox placement feature for this subaccount, e.g. '{"enabled": false}'.`,
      },
      {
        name: 'sending',
        type: 'string',
        required: false,
        description: `JSON object (as a string) toggling the sending feature for this subaccount, e.g. '{"enabled": false}'.`,
      },
      {
        name: 'validations',
        type: 'string',
        required: false,
        description: `JSON object (as a string) toggling the email validations feature for this subaccount, e.g. '{"enabled": false}'.`,
      },
      {
        name: 'validations_bulk',
        type: 'string',
        required: false,
        description: `JSON object (as a string) toggling the bulk email validations feature for this subaccount, e.g. '{"enabled": false}'.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_delete',
    description: `Delete a tag associated with a Mailgun sending domain. Note: per Mailgun's API spec the 'tag' query parameter is not marked strictly required, but you should always provide it to ensure the correct tag is deleted.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `The name of the tag, used to identify which tag to operate on. The Mailgun API does not mark this as strictly required, but omitting it may not target a specific tag as expected — always provide it to delete a specific tag.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_get',
    description: `Get details for a single tag associated with a Mailgun sending domain, including its description and first/last-seen timestamps.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The name of the tag. Required to identify which tag to operate on.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_get_aggregate_stats',
    description: `Get aggregate stat counts for a tag on a Mailgun sending domain, broken down by country, device, or ESP provider (choose which via the Aggregate Type field).`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The name of the tag. Required to identify which tag to operate on.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of aggregate breakdown to return for the tag: country, device, or provider.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_get_stats',
    description: `Get email event stat totals for a specific tag on a Mailgun sending domain, optionally filtered by date range, resolution, ESP provider, device, and country. At least one event type is required.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'event',
        type: 'array',
        required: true,
        description: `Event type(s) to include. Multiple values are allowed and are sent as repeated 'event' query parameters. Supported values: accepted, delivered, failed, opened, clicked, unsubscribed, complained, stored.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The name of the tag. Required to identify which tag to operate on.`,
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: `Filter stats to this country value; see the List Supported Tag Countries tool for possible values.`,
      },
      {
        name: 'device',
        type: 'string',
        required: false,
        description: `Filter stats to this device value; see the List Supported Tag Devices tool for possible values.`,
      },
      {
        name: 'duration',
        type: 'string',
        required: false,
        description: `A duration expression (e.g. 7d, 1m) used to calculate 'start' from 'end'; when provided it overwrites the 'start' value.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to the current time if omitted.`,
      },
      {
        name: 'provider',
        type: 'string',
        required: false,
        description: `Filter stats to this ESP provider value; see the List Supported Tag Providers tool for possible values.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Time resolution to bucket the stats by: hour, day, or month. Defaults to day.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start of the date range, in RFC 2822 format or Unix epoch seconds. Defaults to 7 days before now if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_get_tag_limits',
    description: `Get the tag limit and current tag count for a Mailgun sending domain (how many unique tags may be created, and how many currently exist).`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_list',
    description: `List all tags associated with a Mailgun sending domain, with cursor-based pagination and optional prefix filtering.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of tags to return in this request.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `The page direction to navigate, relative to the 'tag' cursor parameter. Valid values: first, last, next, prev.`,
      },
      {
        name: 'prefix',
        type: 'string',
        required: false,
        description: `Only list tags that begin with this prefix.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `The name of the tag, used to identify which tag to operate on. Used as the pagination cursor marking the end of the current page.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_list_supported_countries',
    description: `List the country codes that Mailgun's tag stats currently support for aggregation and filtering, for a given sending domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_list_supported_devices',
    description: `List the device types (e.g. desktop, mobile, tablet, unknown) that Mailgun's tag stats currently support for aggregation and filtering, for a given sending domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_list_supported_providers',
    description: `List the email service providers (e.g. gmail.com, yahoo.com) that Mailgun's tag stats currently support for aggregation and filtering, for a given sending domain.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
    ],
  },
  {
    name: 'mailgun_tags_update',
    description: `Update the description of a tag associated with a Mailgun sending domain. Sent as query parameters, matching Mailgun's API for this endpoint.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to scope this request to (e.g. mg.example.com). This is the email-sending domain, not the account's API region domain configured on the connection.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: true,
        description: `The name of the tag. Required to identify which tag to operate on.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description text to set for the tag.`,
      },
    ],
  },
  {
    name: 'mailgun_unsubscribes_clear',
    description: `Clear (delete) every unsubscribe email address recorded for a Mailgun domain. After this, delivery to those previously-unsubscribed addresses is no longer suppressed. This is destructive and cannot be undone.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun domain to clear all unsubscribes for, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_unsubscribes_create',
    description: `Add an email address to a Mailgun domain's unsubscribe (suppression) list, so future deliveries to it are suppressed for the given tag (or all of the domain's mail if no tag is given). Sends the record as a JSON payload to Mailgun's Unsubscribe API. This tool adds one address per call; Mailgun's underlying endpoint can accept up to 1000 records in a single JSON array, but only single-record submission is exposed here.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to unsubscribe, e.g. alice@example.com.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun sending domain to add the unsubscribe record to, e.g. mg.example.com.`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `Timestamp of the unsubscribe event in RFC2822 format, e.g. 'Thu, 11 Dec 2025 01:49:40 UTC'. Defaults to the current time if omitted.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Comma-separated list of tags to unsubscribe this address from, e.g. 'newsletter,promo'. If omitted, defaults to '*' which unsubscribes the address from all of the domain's correspondence.`,
      },
    ],
  },
  {
    name: 'mailgun_unsubscribes_delete',
    description: `Remove a single email address from a Mailgun domain's unsubscribe (suppression) list. Delivery to the address resumes until it unsubscribes again.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to remove from the unsubscribe list, e.g. alice@example.com.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun domain to remove the unsubscribe record from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_unsubscribes_get',
    description: `Look up a single unsubscribe record for a Mailgun domain, to check whether a given email address is present in that domain's unsubscribe (suppression) list. Returns the address, any tags it's unsubscribed from, and when the unsubscribe was recorded. If the address isn't found, Mailgun returns an error message indicating it's not in the unsubscribers table.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to search for, e.g. alice@example.com.`,
      },
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun domain to retrieve the unsubscribe record from, e.g. mg.example.com.`,
      },
    ],
  },
  {
    name: 'mailgun_unsubscribes_list',
    description: `Paginate over the list of unsubscribed (suppressed) email addresses for a Mailgun domain. Supports limiting the page size, filtering addresses that start with a substring, and cursor-based paging using an anchor address. Returns each unsubscribe's address, tags, and creation time, plus paging links for next/previous/first/last pages.`,
    params: [
      {
        name: 'domain_name',
        type: 'string',
        required: true,
        description: `The Mailgun domain to retrieve unsubscribes from, e.g. mg.example.com.`,
      },
      {
        name: 'address',
        type: 'string',
        required: false,
        description: `The address that serves as a 'divider' (cursor) between pages, used together with Page Direction. Leave blank to start from the first page. Note: Mailgun's spec marks this as required, but it is only needed for paging past the first page in practice.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of unsubscribe records to return per page. Optional, default 100, max 1000.`,
      },
      {
        name: 'page',
        type: 'string',
        required: false,
        description: `Page direction relative to the 'address' cursor: 'next', 'previous', or 'last'. If omitted, the first page is returned.`,
      },
      {
        name: 'term',
        type: 'string',
        required: false,
        description: `Filter records to addresses that start with this substring. Leave blank to return all unsubscribes. Note: Mailgun's spec marks this as required, but it is optional in practice.`,
      },
    ],
  },
  {
    name: 'mailgun_users_get',
    description: `Get details for a specific user on your Mailgun account by user ID, including name, email, role, activation/disabled status, two-factor auth status, and preferences. Returns a 'No such user exists' error message if the ID doesn't match any user.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user on the account to retrieve, e.g. '123'.`,
      },
    ],
  },
  {
    name: 'mailgun_users_get_current_user',
    description: `Get the account's own user details for the API key used to authenticate this request, including name, email, role, activation/disabled status, two-factor auth status, and preferences. Requires an API key that has a \`user_id\` saved on it (typically a 'web'-kind key); otherwise Mailgun returns an 'Incompatible key for this endpoint' error.`,
    params: [],
  },
  {
    name: 'mailgun_users_list',
    description: `Get the users on your Mailgun account, with optional filtering by role and pagination. Returns each user's name, email, role, activation/disabled status, and other profile details, plus the total user count.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of users to return. Leave blank to use Mailgun's default page size.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Filter users by role. Valid values: basic (== analyst), billing, support, developer, admin. Leave blank to return users of all roles.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `The number of users to skip before returning results, for pagination. Leave blank to start from the beginning.`,
      },
    ],
  },
  {
    name: 'mailgun_validate_address',
    description: `Validate a single email address using Mailgun's Validate service: checks syntax, DNS/mailbox deliverability signals, and flags disposable or role-based addresses. The response's 'result' and 'risk' fields are the primary signals — e.g. a 'deliverable' result generally means the recipient's mail server should accept the message. Requires the account to have email validation enabled.`,
    params: [
      {
        name: 'address',
        type: 'string',
        required: true,
        description: `The email address to validate.`,
      },
      {
        name: 'provider_lookup',
        type: 'boolean',
        required: false,
        description: `Whether to perform a mailbox provider lookup as part of validation. Defaults to true on Mailgun's side if omitted.`,
      },
    ],
  },
  {
    name: 'mailgun_validate_cancel_job',
    description: `Cancel a bulk email-address validation job by its list ID, stopping further processing.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the bulk validation job to cancel.`,
      },
    ],
  },
  {
    name: 'mailgun_validate_get_job',
    description: `Get the status and results summary of a single bulk email-address validation job by its list ID, including quantity processed, a pass/fail summary, and (once finished) a download_url for the full results.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the bulk validation job to look up.`,
      },
    ],
  },
  {
    name: 'mailgun_validate_list_jobs',
    description: `List bulk email-address validation jobs previously submitted on this account, with their status (e.g. uploading, preprocessing, running, finished) and result summary. Supports Mailgun's standard limit/skip pagination — page forward by increasing skip by the value of limit until fewer than limit items come back.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of jobs to return per page.`,
      },
      {
        name: 'skip',
        type: 'integer',
        required: false,
        description: `Number of jobs to skip before starting to return results, for pagination.`,
      },
    ],
  },
]
