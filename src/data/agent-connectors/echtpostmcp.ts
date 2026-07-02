import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'echtpostmcp_cancel_card',
    description: `Cancel a scheduled postcard. Only cards where "cancelable" is true can be cancelled. Cancellation is asynchronous and may take a few minutes.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `UUID of the card to cancel.` },
    ],
  },
  {
    name: 'echtpostmcp_create_card',
    description: `Create a postcard with custom message and font. Validates that text fits on the card. Use preview_fit first to check if your message fits. Specify recipients via existing contact IDs, group IDs, or inline recipient objects (combinable). For simpler creation from a saved template, use create_card_from_template instead.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `Main message text to print on the postcard.` },
      { name: 'deliver_at', type: 'string', required: true, description: `Delivery date. Accepted values: today, tomorrow, YYYY-MM-DD, or N-days-from-now.` },
      { name: 'motive_id', type: 'integer', required: true, description: `Numeric ID of the motive (front image design) to use on the card.` },
      { name: 'content_ps', type: 'string', required: false, description: `Optional postscript line printed after the main message (P.S.).` },
      { name: 'content_vertical', type: 'string', required: false, description: `Optional text printed in the vertical side panel of the card.` },
      { name: 'font_color', type: 'string', required: false, description: `Font color for the card text. Accepted values: black, blue.` },
      { name: 'font_family', type: 'string', required: false, description: `Font family for the card text. Accepted values: architects_daughter, reenie_beanie, special_elite.` },
      { name: 'font_size', type: 'integer', required: false, description: `Font size in pt. Allowed ranges: architects_daughter 12–14, reenie_beanie 15–17, special_elite 11–13.` },
      { name: 'group_ids', type: 'array', required: false, description: `Array of contact group IDs. All members of each group receive the card.` },
      { name: 'notification_email', type: 'string', required: false, description: `Email address to receive delivery notifications.` },
      { name: 'notification_send_on', type: 'string', required: false, description: `Date to send the notification (ISO 8601, YYYY-MM-DD). Defaults to the delivery date.` },
      { name: 'notification_type', type: 'string', required: false, description: `When to send a delivery notification. Accepted values: before_send, after_sent.` },
      { name: 'qr_code_url', type: 'string', required: false, description: `URL to encode as a QR code printed on the card.` },
      { name: 'recipient_ids', type: 'array', required: false, description: `Array of existing contact IDs to send the card to.` },
      { name: 'recipients', type: 'array', required: false, description: `Array of inline recipient objects. Each requires last_name, street, zip, city, and country_code.` },
    ],
  },
  {
    name: 'echtpostmcp_create_card_from_template',
    description: `Create a postcard from an existing template. The template provides the message, font, and motive. Specify recipients via existing contact IDs, group IDs, or inline recipient objects (combinable). Use list_templates to find templates.`,
    params: [
      { name: 'deliver_at', type: 'string', required: true, description: `Delivery date. Accepted values: today, tomorrow, YYYY-MM-DD, or N-days-from-now.` },
      { name: 'template_id', type: 'integer', required: true, description: `Numeric ID of the template to use for this card.` },
      { name: 'group_ids', type: 'array', required: false, description: `Array of contact group IDs. All members of each group receive the card.` },
      { name: 'recipient_ids', type: 'array', required: false, description: `Array of existing contact IDs to send the card to.` },
      { name: 'recipients', type: 'array', required: false, description: `Array of inline recipient objects. Each requires last_name, street, zip, city, and country_code.` },
    ],
  },
  {
    name: 'echtpostmcp_create_contact',
    description: `Create a new contact for the account. At minimum, provide last_name and a postal address (street, zip, city, country_code). Optionally assign to groups via group_ids or group_names (group_names auto-creates groups if they do not exist).`,
    params: [
      { name: 'city', type: 'string', required: true, description: `City for the recipient's postal address.` },
      { name: 'country_code', type: 'string', required: true, description: `ISO 3166-1 alpha-2 country code (e.g. DE for Germany).` },
      { name: 'last_name', type: 'string', required: true, description: `Recipient's last name.` },
      { name: 'street', type: 'string', required: true, description: `Street name and house number.` },
      { name: 'zip', type: 'string', required: true, description: `Postal code for the recipient's address.` },
      { name: 'birthdate', type: 'string', required: false, description: `Contact's birthdate in ISO 8601 format (YYYY-MM-DD).` },
      { name: 'company_name', type: 'string', required: false, description: `Company name for the recipient.` },
      { name: 'custom_salutation', type: 'string', required: false, description: `Custom greeting line. Use when greeting_style is set to custom.` },
      { name: 'department', type: 'string', required: false, description: `Department within the company.` },
      { name: 'external_id', type: 'string', required: false, description: `Your own reference ID for this record.` },
      { name: 'first_name', type: 'string', required: false, description: `Recipient's first name.` },
      { name: 'gender', type: 'string', required: false, description: `Gender identifier. Accepted values: male_user, female_user, diverse_user.` },
      { name: 'greeting_style', type: 'string', required: false, description: `Greeting style for the card. Accepted values: formal, informal, custom.` },
      { name: 'group_ids', type: 'array', required: false, description: `Array of contact group IDs. All members of each group receive the card.` },
      { name: 'group_names', type: 'array', required: false, description: `Array of group names. Groups are created automatically if they do not exist.` },
      { name: 'state_code', type: 'string', required: false, description: `State or province code (e.g. BY for Bavaria).` },
      { name: 'title', type: 'string', required: false, description: `Academic or professional title (e.g. Dr., Prof.).` },
    ],
  },
  {
    name: 'echtpostmcp_create_group',
    description: `Create a new contact group. Provide a name; optionally an external_id for your own reference.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Group name.` },
      { name: 'external_id', type: 'string', required: false, description: `Your own reference ID for this record.` },
    ],
  },
  {
    name: 'echtpostmcp_delete_contact',
    description: `Delete a contact by ID. This is permanent and cannot be undone.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the contact to delete.` },
    ],
  },
  {
    name: 'echtpostmcp_delete_group',
    description: `Delete a contact group. Fails if the group has attached workflows.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the group to delete.` },
    ],
  },
  {
    name: 'echtpostmcp_get_card',
    description: `Get details of a specific postcard by its ID. Returns status, content, font, delivery date, and whether the card is cancelable.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `UUID of the card to retrieve.` },
    ],
  },
  {
    name: 'echtpostmcp_get_contact',
    description: `Get details of a specific contact by their ID. Returns all fields including first_name, last_name, greeting, address, and group_ids.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the contact to retrieve.` },
    ],
  },
  {
    name: 'echtpostmcp_get_group',
    description: `Get details of a specific contact group by ID. Returns name, external_id, and recipient count.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the group to retrieve.` },
    ],
  },
  {
    name: 'echtpostmcp_get_me',
    description: `Get account info, user email, API key metadata, and current credit balance. Use this to verify the connection and check available credits.`,
    params: [
    ],
  },
  {
    name: 'echtpostmcp_get_motive',
    description: `Get details of a specific motive (postcard design) by its ID.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the motive (postcard design) to retrieve.` },
    ],
  },
  {
    name: 'echtpostmcp_get_template',
    description: `Get details of a specific template by ID. Returns content, font, motive, and QR code URL.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the template to retrieve.` },
    ],
  },
  {
    name: 'echtpostmcp_list_cards',
    description: `List postcards for the account. Returns id, status (pending/scheduled/sent/canceled), content, font, delivery date, and whether the card is cancelable. Supports status filter.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for paginated results. Defaults to 1.` },
      { name: 'per_page', type: 'integer', required: false, description: `Number of results per page. Defaults to 50, maximum 100.` },
      { name: 'status', type: 'string', required: false, description: `Filter cards by status. Accepted values: pending, scheduled, sent, canceled.` },
    ],
  },
  {
    name: 'echtpostmcp_list_contacts',
    description: `List contacts for the account. Returns id, first_name, last_name, address, greeting, and other fields. Supports search and pagination (50 per page).`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for paginated results. Defaults to 1.` },
      { name: 'per_page', type: 'integer', required: false, description: `Number of results per page. Defaults to 50, maximum 100.` },
      { name: 'search', type: 'string', required: false, description: `Search term to filter results by name or company.` },
    ],
  },
  {
    name: 'echtpostmcp_list_credits',
    description: `Show the current credit balance, how many local/foreign postcards can be sent, and the price per card in EUR.`,
    params: [
    ],
  },
  {
    name: 'echtpostmcp_list_groups',
    description: `List contact groups for the account. Groups can be used as recipients when creating cards.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for paginated results. Defaults to 1.` },
      { name: 'per_page', type: 'integer', required: false, description: `Number of results per page. Defaults to 50, maximum 100.` },
    ],
  },
  {
    name: 'echtpostmcp_list_motives',
    description: `List available postcard motives (designs). Returns id, name, orientation, and feature flags. Supports search by name/description. Use the motive id when creating cards.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for paginated results. Defaults to 1.` },
      { name: 'per_page', type: 'integer', required: false, description: `Number of results per page. Defaults to 50, maximum 100.` },
      { name: 'search', type: 'string', required: false, description: `Search term to filter results by name or company.` },
    ],
  },
  {
    name: 'echtpostmcp_list_templates',
    description: `List available card templates for the account. Templates contain pre-configured message, font, and motive — use create_card_from_template to send one.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number for paginated results. Defaults to 1.` },
      { name: 'per_page', type: 'integer', required: false, description: `Number of results per page. Defaults to 50, maximum 100.` },
    ],
  },
  {
    name: 'echtpostmcp_preview_fit',
    description: `Check if a message fits on a postcard with the given font settings. Returns fits (true/false), lines used, max lines, and a suggested smaller font size if it overflows. Use this before create_card to iterate on message length.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `Message text to check for fit on the postcard.` },
      { name: 'font_family', type: 'string', required: false, description: `Font family for the card text. Accepted values: architects_daughter, reenie_beanie, special_elite.` },
      { name: 'font_size', type: 'integer', required: false, description: `Font size in pt. Allowed ranges: architects_daughter 12–14, reenie_beanie 15–17, special_elite 11–13.` },
      { name: 'sample_greeting', type: 'string', required: false, description: `Sample greeting string used to expand the {anrede} placeholder when checking fit.` },
    ],
  },
  {
    name: 'echtpostmcp_update_contact',
    description: `Update one or more fields on an existing contact. Optional fields not provided are left unchanged. To clear an optional field, pass an empty string. group_ids replaces all memberships; group_names additively assigns groups (auto-creating).`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the contact to update.` },
      { name: 'birthdate', type: 'string', required: false, description: `Contact's birthdate in ISO 8601 format (YYYY-MM-DD).` },
      { name: 'city', type: 'string', required: false, description: `City for the recipient's postal address.` },
      { name: 'company_name', type: 'string', required: false, description: `Company name for the recipient.` },
      { name: 'country_code', type: 'string', required: false, description: `ISO 3166-1 alpha-2 country code (e.g. DE for Germany).` },
      { name: 'custom_salutation', type: 'string', required: false, description: `Custom greeting line. Use when greeting_style is set to custom.` },
      { name: 'department', type: 'string', required: false, description: `Department within the company.` },
      { name: 'external_id', type: 'string', required: false, description: `Your own reference ID for this record.` },
      { name: 'first_name', type: 'string', required: false, description: `Recipient's first name.` },
      { name: 'gender', type: 'string', required: false, description: `Gender identifier. Accepted values: male_user, female_user, diverse_user.` },
      { name: 'greeting_style', type: 'string', required: false, description: `Greeting style for the card. Accepted values: formal, informal, custom.` },
      { name: 'group_ids', type: 'array', required: false, description: `Array of contact group IDs. All members of each group receive the card.` },
      { name: 'group_names', type: 'array', required: false, description: `Array of group names. Groups are created automatically if they do not exist.` },
      { name: 'last_name', type: 'string', required: false, description: `Recipient's last name.` },
      { name: 'state_code', type: 'string', required: false, description: `State or province code (e.g. BY for Bavaria).` },
      { name: 'street', type: 'string', required: false, description: `Street name and house number.` },
      { name: 'title', type: 'string', required: false, description: `Academic or professional title (e.g. Dr., Prof.).` },
      { name: 'zip', type: 'string', required: false, description: `Postal code for the recipient's address.` },
    ],
  },
  {
    name: 'echtpostmcp_update_group',
    description: `Update a contact group. Only provided fields are changed.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Numeric ID of the group to update.` },
      { name: 'external_id', type: 'string', required: false, description: `Your own reference ID for this record.` },
      { name: 'name', type: 'string', required: false, description: `Group name.` },
    ],
  },
]
