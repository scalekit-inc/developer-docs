import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'lokalise_add_members_to_group',
    description: `Add one or more team members to a user group in a Lokalise team, granting them the group's permissions and project access.
Returns the group's updated details, including its full current list of member user IDs.
Use this after creating a group to populate it with contributors. Use lokalise_remove_members_from_group to take members out of the group instead.
Requires Admin rights in the team.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to add members to.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
      {
        name: 'users',
        type: 'array',
        required: true,
        description: `List of numeric user IDs to add to the group. Find a team member's user ID on the team members page in Lokalise.`,
      },
    ],
  },
  {
    name: 'lokalise_add_projects_to_group',
    description: `Add one or more projects to a user group in a Lokalise team, granting the group's members access to those projects.
Returns the group's updated details, including its full current list of assigned projects.
Use this after creating a group to grant it access to specific projects. Use lokalise_remove_projects_from_group to revoke access instead.
Requires Admin rights in the team.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to add projects to.`,
      },
      {
        name: 'projects',
        type: 'array',
        required: true,
        description: `List of project IDs to add to the group. Use the project ID string shown in each project's settings (e.g. 598901215bexxx43dcba74.xxx), not the project name.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_async_download_files',
    description: `Start an asynchronous export of a Lokalise project's translation files as a downloadable bundle, without waiting for it to finish.
Returns a process_id you can poll with a process-status tool; once complete, that process exposes the bundle's download URL.
Use this instead of the synchronous download tool for large projects, and pair it with a webhook_url or triggers to automate delivery.`,
    params: [
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `File format to export, given as a file extension of a supported format (e.g. json, xml, strings), or ios_sdk / android_sdk for an OTA SDK bundle.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to export files from. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'add_newline_eof',
        type: 'boolean',
        required: false,
        description: `Whether to add a trailing newline at the end of each exported file, if supported by the format.`,
      },
      {
        name: 'all_platforms',
        type: 'boolean',
        required: false,
        description: `Whether to include keys from all platforms. If disabled, only keys associated with the platform implied by the export format are included.`,
      },
      {
        name: 'bundle_structure',
        type: 'string',
        required: false,
        description: `Bundle path/filename structure to use when original_filenames is false. Supports the placeholders %LANG_ISO%, %LANG_NAME%, %FORMAT%, and %PROJECT_NAME%.`,
      },
      {
        name: 'custom_translation_status_ids',
        type: 'array',
        required: false,
        description: `Only export translations attributed to these custom translation status IDs. Leave empty to include translations with any status.`,
      },
      {
        name: 'directory_prefix',
        type: 'string',
        required: false,
        description: `Directory prefix added inside the bundle when original_filenames is true. Supports the %LANG_ISO% placeholder.`,
      },
      {
        name: 'disable_references',
        type: 'boolean',
        required: false,
        description: `Whether to skip automatically resolving key-reference placeholders (e.g. [%key:hello_world%]) into their corresponding translations.`,
      },
      {
        name: 'exclude_tags',
        type: 'array',
        required: false,
        description: `Exclude keys carrying at least one of these tags from the export.`,
      },
      {
        name: 'export_empty_as',
        type: 'string',
        required: false,
        description: `How to render translations that have no value.`,
      },
      {
        name: 'export_sort',
        type: 'string',
        required: false,
        description: `Sort order applied to exported keys.`,
      },
      {
        name: 'filter_data',
        type: 'array',
        required: false,
        description: `Narrow the export to keys/translations matching these data filters.`,
      },
      {
        name: 'filter_filenames',
        type: 'array',
        required: false,
        description: `Only export keys attributed to these filenames. Leave empty to include keys from all files.`,
      },
      {
        name: 'filter_langs',
        type: 'array',
        required: false,
        description: `Languages to include in the export. Omit to export all project languages.`,
      },
      {
        name: 'filter_repositories',
        type: 'array',
        required: false,
        description: `Restrict triggered integration exports to these repositories, in organization/repository format. Leave empty to process all configured repositories for the triggered platforms.`,
      },
      {
        name: 'filter_task_id',
        type: 'number',
        required: false,
        description: `Only export keys attributed to this task. Available only for the offline_xliff format.`,
      },
      {
        name: 'include_comments',
        type: 'boolean',
        required: false,
        description: `Whether to include key comments in the exported file, if supported by the format.`,
      },
      {
        name: 'include_description',
        type: 'boolean',
        required: false,
        description: `Whether to include key descriptions in the exported file, if supported by the format.`,
      },
      {
        name: 'include_pids',
        type: 'array',
        required: false,
        description: `Additional project IDs whose keys should be included alongside this project's export.`,
      },
      {
        name: 'include_tags',
        type: 'array',
        required: false,
        description: `Only export keys carrying at least one of these tags.`,
      },
      {
        name: 'indentation',
        type: 'string',
        required: false,
        description: `Override the default indentation used in supported file formats.`,
      },
      {
        name: 'original_filenames',
        type: 'boolean',
        required: false,
        description: `Whether to export using each key's original filename/format. If false, all keys for a language are exported into a single file per language.`,
      },
      {
        name: 'placeholder_format',
        type: 'string',
        required: false,
        description: `Override the default placeholder syntax used for the export format.`,
      },
      {
        name: 'plural_format',
        type: 'string',
        required: false,
        description: `Override the default plural syntax used for the export format.`,
      },
      {
        name: 'replace_breaks',
        type: 'boolean',
        required: false,
        description: `Whether to replace real line breaks in exported translations with the literal sequence \\n.`,
      },
      {
        name: 'triggers',
        type: 'array',
        required: false,
        description: `Integration exports to trigger as part of this export (must already be configured in project settings).`,
      },
      {
        name: 'webhook_url',
        type: 'string',
        required: false,
        description: `URL to receive an HTTP POST with the generated bundle URL once the export finishes.`,
      },
    ],
  },
  {
    name: 'lokalise_bulk_update_keys',
    description: `Update one or more existing translation keys in a Lokalise project in a single request, including their names, tags, and translations.
Returns the updated keys with their current field values plus a separate errors array for any per-key failures — the call reports success even if every key failed, so check the errors array rather than assuming all requested keys were updated.
Use this to change details on keys that already exist. Use lokalise_create_keys instead to add brand-new keys.`,
    params: [
      {
        name: 'keys',
        type: 'array',
        required: true,
        description: `Array of key objects to update. Each entry must include the key_id of an existing key, plus whichever fields to change: key_name, description, platforms, tags (with merge_tags to combine with existing tags instead of replacing them), filenames per platform, comments, screenshots (base64-encoded), and translations (each with a language_iso and its translation text or plural-form map, plus flags such as is_reviewed and custom_translation_status_ids). A key can also be updated to be is_plural, is_hidden, or is_archived, given a char_limit, or given custom_attributes as a JSON-encoded string. Example: [{"key_id": 331223, "key_name": "index.welcome", "tags": ["main"]}].`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the keys belong to. Example: '3002780358964f9bab5a92.87762498'.`,
      },
      {
        name: 'use_automations',
        type: 'boolean',
        required: false,
        description: `Whether to run the project's translation automations against the updated keys' translations.`,
      },
    ],
  },
  {
    name: 'lokalise_create_billing_details',
    description: `Create billing details for a Lokalise team, providing the billing email, country, and postal code used for invoices and translation orders.
Returns the saved billing details, including billing email, address fields, phone, VAT number, and country code.
Use this to set up billing information for a team that doesn't have it yet. Use lokalise_get_billing_details to check whether billing details already exist first.
If Country Code is set to US, State Code is also required.`,
    params: [
      {
        name: 'billing_email',
        type: 'string',
        required: true,
        description: `Email address invoices and translation-order notifications are sent to.`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `Two-letter ISO 3166-1 alpha-2 country code for the billing address (e.g. US, LV, DE).`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team to create billing details for.`,
      },
      {
        name: 'zip',
        type: 'string',
        required: true,
        description: `Postal or ZIP code for the billing address, valid for the specified country.`,
      },
      {
        name: 'address1',
        type: 'string',
        required: false,
        description: `First line of the billing street address.`,
      },
      {
        name: 'address2',
        type: 'string',
        required: false,
        description: `Second line of the billing street address, e.g. suite or unit number.`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `City for the billing address.`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company name to appear on invoices.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Contact phone number associated with the billing details.`,
      },
      {
        name: 'state_code',
        type: 'string',
        required: false,
        description: `US state code for the billing address. Required only when Country Code is US.`,
      },
      {
        name: 'vatnumber',
        type: 'string',
        required: false,
        description: `VAT registration number to appear on invoices, where applicable.`,
      },
    ],
  },
  {
    name: 'lokalise_create_contributors',
    description: `Create one or more new contributors on a Lokalise project, granting them project access and per-language permissions.
Returns the created contributor object(s) with user ID, admin/reviewer status, and assigned languages. Note (verified live): the returned admin_rights for a given role_id can include extra entries beyond Lokalise's publicly documented role template (e.g. branches_main_modify appearing even when not requested) — treat the response as authoritative rather than assuming it exactly matches the documented template.
Use this to invite team members or grant translators/reviewers access. Use Import Contributors instead to copy existing contributors from another project.`,
    params: [
      {
        name: 'contributors',
        type: 'array',
        required: true,
        description: `Array of contributor objects to add to the project. Each object needs an email address, and either sets is_admin to true (which grants access to every project language, overriding any languages provided) or lists the specific languages the contributor can access, each with a language code and whether they can edit it. You can optionally set a full name (used only when inviting a brand-new Lokalise user whose account does not exist yet), a role_id to apply one of Lokalise's built-in permission templates (Manager, Developer, Content creator, Reviewer, or Translator), or a custom list of admin rights (such as glossary, screenshots, or task access) instead of a role template. Example: [{"email": "translator@example.com", "fullname": "Jane Translator", "is_admin": false, "is_reviewer": true, "languages": [{"lang_iso": "en", "is_writable": false}, {"lang_iso": "ru", "is_writable": true}]}]`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to add contributors to.`,
      },
    ],
  },
  {
    name: 'lokalise_create_custom_status',
    description: `Create a new custom translation status in a Lokalise project.
Returns the created status's ID, title, and hex color.
Use this to add a new workflow stage (e.g. "Reviewed by staff") that translators and reviewers can apply to keys, beyond Lokalise's built-in statuses.`,
    params: [
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Hex color code used to display this status in the Lokalise editor, e.g. #ff9f1a.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to create the custom translation status in.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the new custom translation status, shown to translators and reviewers.`,
      },
    ],
  },
  {
    name: 'lokalise_create_glossary_terms',
    description: `Create one or more new glossary terms in a Lokalise project in a single call.
Returns the created term objects (with their new IDs) along with a count of how many were created, plus any per-term errors.
Use lokalise_update_glossary_terms afterward to modify a term, or lokalise_list_glossary_terms to review existing terms first and avoid duplicates.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to create glossary terms in. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'terms',
        type: 'array',
        required: true,
        description: `Array of glossary term objects to create. Each object requires term (the term text), description, caseSensitive, translatable, and forbidden (booleans), and may optionally include a translations array of {langId, translation, description} entries for per-language overrides, and a tags array of strings. Example: [{"term": "checkout", "description": "The action of completing a purchase.", "caseSensitive": true, "translatable": false, "forbidden": false, "tags": ["ecommerce"]}]`,
      },
    ],
  },
  {
    name: 'lokalise_create_key_comment',
    description: `Add one or more comments to a translation key in a Lokalise project.
Returns the created comment objects, each with its ID, text, author, and timestamps.
Use this to leave notes or feedback for translators on a specific key.`,
    params: [
      {
        name: 'comments',
        type: 'array',
        required: true,
        description: `One or more comments to add to the key. Each entry is an object with a single text field. Example: [{"comment": "Please double-check this translation."}, {"comment": "Looks good to me."}]`,
      },
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key to add comments to.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the key belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_create_keys',
    description: `Create one or more translation keys, with their translations, in a Lokalise project in a single request.
Returns the created keys with their assigned IDs and a separate errors array for any per-key failures (for example, a key name that already exists) — the call reports success even if every key failed, so check the errors array rather than assuming all requested keys were created.
Use this to add new keys and seed their initial translations. Use lokalise_bulk_update_keys instead to modify keys that already exist.
We recommend sending up to 500 keys per request.`,
    params: [
      {
        name: 'keys',
        type: 'array',
        required: true,
        description: `Array of key objects to create. Each key needs a key_name and a platforms list (any of ios, android, web, other). Optional per-key fields let you set a description, per-platform filenames, tags, comments, screenshots (as base64-encoded image data), and translations (each with a language_iso and its translation text, plus flags such as is_reviewed). A key can also be marked is_plural, is_hidden, or is_archived, given a char_limit, or given custom_attributes as a JSON-encoded string. Example: [{"key_name": "index.welcome", "description": "Index app welcome", "platforms": ["web"], "translations": [{"language_iso": "en", "translation": "Welcome"}]}].`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project to add keys to. Example: '3002780358964f9bab5a92.87762498'.`,
      },
      {
        name: 'use_automations',
        type: 'boolean',
        required: false,
        description: `Whether to run the project's translation automations against the new keys' translations.`,
      },
    ],
  },
  {
    name: 'lokalise_create_languages',
    description: `Add one or more languages to a Lokalise project by their system language ISO codes, optionally overriding the language code, name, or plural forms.
Returns the project ID, the newly created language objects (including each new language's assigned ID), and a separate errors array for any languages that failed to add (for example, an unrecognized ISO code) — a successful call can still contain per-language failures, so check the errors array rather than assuming every requested language was added.
Use this to enable additional languages for translation. Use lokalise_list_system_languages to find valid ISO codes first.`,
    params: [
      {
        name: 'languages',
        type: 'array',
        required: true,
        description: `Array of language objects to add. Each object must include lang_iso, the ISO code of one of Lokalise's system languages (see lokalise_list_system_languages). You may optionally add custom_iso to override the stored language/locale code, custom_name to override the display name, and custom_plural_forms (an array of plural form names) to override the supported plural forms.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to add languages to. Find it with lokalise_list_projects.`,
      },
    ],
  },
  {
    name: 'lokalise_create_order',
    description: `Place a translation order for a set of keys in a Lokalise project, sending them to a translation provider such as Gengo, Babble-on, or a professional translator tier.
Returns the created order's ID, status, pricing, and language details, or a price estimate when Dry Run is enabled instead of placing a live order.
Use this to kick off paid translation from a source language into one or more target languages for specific keys.
Requires admin privileges in the target project, and (for credit-card payment) a card ID from the list payment cards tool.`,
    params: [
      {
        name: 'briefing',
        type: 'string',
        required: true,
        description: `Instructions for the translator describing tone, context, or anything else they should know about the content being translated.`,
      },
      {
        name: 'keys',
        type: 'array',
        required: true,
        description: `List of key identifiers from the project to include in this translation order.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the keys to translate.`,
      },
      {
        name: 'provider_slug',
        type: 'string',
        required: true,
        description: `Slug of the translation provider to use for this order, e.g. 'gengo' for Gengo or 'babble-on' for professional human translation.`,
      },
      {
        name: 'source_language_iso',
        type: 'string',
        required: true,
        description: `ISO language code of the source content being translated.`,
      },
      {
        name: 'target_language_isos',
        type: 'array',
        required: true,
        description: `List of ISO language codes to translate the content into. Provide one or more target languages.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the Lokalise team placing the order.`,
      },
      {
        name: 'translation_tier',
        type: 'integer',
        required: true,
        description: `Numeric tier of translation quality/speed to order. Available tiers depend on the chosen provider (for example, Gengo offers tiers such as 1=Standard, 2=Pro, 3=Ultra).`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Name of the project branch to place the order against, for projects with branching enabled. Omit to use the project's default branch.`,
      },
      {
        name: 'card_id',
        type: 'integer',
        required: false,
        description: `Identifier of the saved payment card to charge. Required when Payment Method is 'credit_card' (the default); look up card IDs with the list payment cards tool.`,
      },
      {
        name: 'dry_run',
        type: 'boolean',
        required: false,
        description: `If true, returns a price estimate for this order without actually placing it or charging any payment method. Defaults to false.`,
      },
      {
        name: 'is_saved_to_translation_memory',
        type: 'boolean',
        required: false,
        description: `Whether completed translations from this order are saved to the project's translation memory. Can only be set to false for the 'google' and 'deepl' providers; other providers always save to translation memory. Defaults to true.`,
      },
      {
        name: 'payment_method',
        type: 'string',
        required: false,
        description: `How the order will be paid for: 'credit_card' to charge a saved card, or 'team_credit' to use the team's prepaid credit balance. Defaults to 'credit_card'.`,
      },
      {
        name: 'translation_style',
        type: 'string',
        required: false,
        description: `Tone of the translation. Only applies to the 'gengo' provider, which supports 'formal', 'informal', 'business', or 'friendly'. Defaults to 'friendly'.`,
      },
    ],
  },
  {
    name: 'lokalise_create_payment_card',
    description: `Add a new payment card to your Lokalise account by sending the card number, CVC, expiration month, and expiration year directly to Lokalise's /payment_cards endpoint over TLS.
Returns the created card's id, last4 digits, brand, and creation timestamp; Lokalise (not Scalekit) stores the full card number and CVC after this call.
Use this only when a real billing card must be added to the account — the card number and CVC are transmitted unmasked in the request body, so avoid passing real production card numbers through this tool casually (e.g., in testing or demos); use a well-known test card number instead when just trying the tool out.
Requires an API token scoped with write_payment_cards.`,
    params: [
      {
        name: 'cvc',
        type: 'string',
        required: true,
        description: `3-digit card verification code (CVC/CVV) printed on the back of the card. This value is sent as raw, unmasked text directly to Lokalise's /payment_cards endpoint over TLS; Lokalise (not Scalekit) stores it after this call. Avoid using a real card's CVC just to try this tool out — use a test value such as 123 unless you specifically intend to add a real billing card. Example: "123".`,
      },
      {
        name: 'exp_month',
        type: 'integer',
        required: true,
        description: `Card expiration month as a number from 1 (January) to 12 (December). Example: 5 for May.`,
      },
      {
        name: 'exp_year',
        type: 'integer',
        required: true,
        description: `Card expiration year as a 4-digit number (e.g. 2030). Must be a future year for the card to be valid.`,
      },
      {
        name: 'number',
        type: 'string',
        required: true,
        description: `Full payment card number, digits only, with no spaces or dashes. This value is sent as raw, unmasked text directly to Lokalise's /payment_cards endpoint over TLS; Lokalise (not Scalekit) stores the card afterward. Avoid using a real production card number just to try this tool out — use a well-known test number such as 4242424242424242 unless you specifically intend to add a real billing card. Example: "4242424242424242".`,
      },
    ],
  },
  {
    name: 'lokalise_create_project',
    description: `Create a new Lokalise project, optionally seeding it with one or more languages and a base language.
Returns the created project's ID, name, description, team, base language, and default settings.
Use this to start a new localization project before adding keys and translations. Use lokalise_update_project to change an existing project's name or description instead.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new project. Required. Example: 'TheApp Project'.`,
      },
      {
        name: 'base_lang_iso',
        type: 'string',
        required: false,
        description: `Language/locale code to use as the project's base language. Must be one of the codes supplied in Languages (or its custom_iso override, if set). Example: 'en-us'.`,
      },
      {
        name: 'content_integration',
        type: 'string',
        required: false,
        description: `Content integration identifier to use for this project. Only used, and required, when Project Type is 'content_integration'; must be one of the integrations already available to your team.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of the project, such as its purpose or a link to related documentation.`,
      },
      {
        name: 'is_segmentation_enabled',
        type: 'boolean',
        required: false,
        description: `Whether to enable the Segmentation feature for this project.`,
      },
      {
        name: 'languages',
        type: 'array',
        required: false,
        description: `Languages to add to the project when it is created. Each entry needs a lang_iso (a valid language code in Lokalise's system) and may optionally set custom_iso to override the code/locale shown for that language. Example: [{"lang_iso": "en", "custom_iso": "en-us"}, {"lang_iso": "en_GB", "custom_iso": "en-gb"}].`,
      },
      {
        name: 'project_type',
        type: 'string',
        required: false,
        description: `Type of project to create, which determines available features. 'localization_files' (Web and mobile, supports branching and individual key management), 'paged_documents' (ad hoc document projects, file-based management), 'content_integration' (marketing projects with limited key parameters, file-based management), 'marketing' (automatically translated marketing projects), or 'marketing_integrations' (automatically translated marketing projects with integrations).`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `ID of the team to create the project in, as either a numeric team ID or a team UUID. Leave blank to create the project in the current API token owner's default team.`,
      },
    ],
  },
  {
    name: 'lokalise_create_screenshots',
    description: `Upload one or more screenshots to a Lokalise project as base64-encoded JPG or PNG images. Requires the Manage screenshots admin right.
Returns the created screenshot objects, including their IDs, hosted image URLs, and any translation keys they were attached to.
Use this to add visual context for translators; link a screenshot to specific keys, or enable OCR to have Lokalise auto-detect matching keys from text found in the image.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to upload screenshots into.`,
      },
      {
        name: 'screenshots',
        type: 'array',
        required: true,
        description: `One or more screenshot objects to create. Each object requires a base64-encoded image in data (prefixed with its data URI, e.g. data:image/png;base64,...), and may optionally include a title, description, whether to run OCR key-detection, a list of key IDs to attach it to, and tags. Example: [{"data": "data:image/png;base64,iVBORw0KGgo...", "title": "Onboarding step 2", "ocr": false, "key_ids": [1132290, 1132292], "tags": ["onboarding"]}]`,
      },
    ],
  },
  {
    name: 'lokalise_create_service_jwt',
    description: `Create a short-lived service JWT for a Lokalise project, for use with over-the-air (OTA) updates and mobile SDKs.
Returns the signed JWT string that the SDK or OTA client uses to authenticate.
Use this only for software (localization_files) projects; Documents and Marketing project types are not supported.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise software (localization_files) project to create the token for.`,
      },
      {
        name: 'service',
        type: 'string',
        required: true,
        description: `The service the token is being created for. Currently only 'ota' (over-the-air updates / mobile SDKs) is supported.`,
      },
    ],
  },
  {
    name: 'lokalise_create_snapshot',
    description: `Create a snapshot of a Lokalise project, capturing its current keys, translations, and settings at a point in time.
Returns the project ID and the new snapshot's ID, title, and creation timestamp.
Use this before a risky bulk edit so you can roll back with lokalise_restore_snapshot if something goes wrong.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to snapshot. Find it on the project's settings page or from lokalise_list_projects.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional title for the snapshot, used to identify it later in the project's snapshot list. If omitted, Lokalise assigns a default title.`,
      },
    ],
  },
  {
    name: 'lokalise_create_task',
    description: `Create a new translation, review, or AI-automated task in a Lokalise project, assigning specific keys and languages to translators, reviewers, or an AI engine.
Returns the created task's ID, title, status, assigned languages with their translators, and (for AI task types) any requested languages that were skipped and why.
Use this to kick off translation or review work on a set of keys; use lokalise_update_task to change an existing task's settings instead.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to create the task in.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the task, shown to assigned translators and reviewers.`,
      },
      {
        name: 'apply_ai_tm100_matches',
        type: 'boolean',
        required: false,
        description: `Whether to apply 100% Translation Memory matches instead of AI-translating those segments. Only applies when task_type is automatic_translation.`,
      },
      {
        name: 'auto_close_items',
        type: 'boolean',
        required: false,
        description: `Whether translation task items should be automatically marked complete when edited. Must be true or omitted for the automatic_translation and lqa_by_ai task types.`,
      },
      {
        name: 'auto_close_languages',
        type: 'boolean',
        required: false,
        description: `Whether each language in the task should close automatically once its last item is completed. Must be true or omitted for the automatic_translation and lqa_by_ai task types.`,
      },
      {
        name: 'auto_close_task',
        type: 'boolean',
        required: false,
        description: `Whether the whole task should close automatically once every language is complete. Must be true or omitted for the automatic_translation and lqa_by_ai task types.`,
      },
      {
        name: 'closing_tags',
        type: 'array',
        required: false,
        description: `Tags to add to affected keys once the task closes.`,
      },
      {
        name: 'custom_translation_status_ids',
        type: 'array',
        required: false,
        description: `IDs of custom translation statuses to apply to task items once each item is completed.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Brief description of the task. For automatic_translation and lqa_by_ai task types, this text is also used as instructions for the AI.`,
      },
      {
        name: 'do_lock_translations',
        type: 'boolean',
        required: false,
        description: `If true, locks translations for project members not assigned to this task.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date and time for the task, in "Y-m-d H:i:s" format (project's timezone).`,
      },
      {
        name: 'include_ai_score',
        type: 'boolean',
        required: false,
        description: `Whether to run AI scoring (LQA) on the task's translations once automatic translation finishes. Only applies when task_type is automatic_translation and requires the AI scoring feature on your plan.`,
      },
      {
        name: 'keys',
        type: 'array',
        required: false,
        description: `List of translation key identifiers to include in the task. Required if parent_task_id is not set (a review task with a parent task inherits its keys instead).`,
      },
      {
        name: 'languages',
        type: 'array',
        required: false,
        description: `Languages included in the task, and who should work on each. Each entry needs a language_iso code, and can optionally list user IDs (users) and/or user-group IDs (groups) to assign to that language. For task_type translation and review, this field is effectively required with at least one entry, and that entry must list a non-empty users or groups (verified live: the API rejects translation/review tasks with 'One of users and groups parameters must contain values' if both are empty/omitted) — the schema marks this optional only because it's genuinely optional for automatic_translation/lqa_by_ai. Both users and groups must be omitted for the automatic_translation and lqa_by_ai task types. Unsupported languages for those AI task types are ignored and returned in the response's skipped_languages instead of failing the request. Example: [{"language_iso": "fi", "users": ["421"]}, {"language_iso": "ru", "groups": ["191"]}].`,
      },
      {
        name: 'mark_verified',
        type: 'boolean',
        required: false,
        description: `Whether to mark AI-generated translations as verified. Only applies when task_type is automatic_translation.`,
      },
      {
        name: 'parent_task_id',
        type: 'integer',
        required: false,
        description: `ID of a parent task. Only applicable when task_type is review — this review task opens once its parent task closes.`,
      },
      {
        name: 'save_ai_translation_to_tm',
        type: 'boolean',
        required: false,
        description: `Whether to save AI-generated translations to Translation Memory. Only applies when task_type is automatic_translation.`,
      },
      {
        name: 'source_language_iso',
        type: 'string',
        required: false,
        description: `Source language code translators will translate from. Falls back to the project's base language if not provided.`,
      },
      {
        name: 'task_type',
        type: 'string',
        required: false,
        description: `Type of task to create: translation (default) for human translators, automatic_translation to have Lokalise AI translate automatically, lqa_by_ai to have AI score existing translations, or review for a review pass over already-translated keys.`,
      },
      {
        name: 'translate_all_segments',
        type: 'boolean',
        required: false,
        description: `Whether to re-translate all segments, including ones that already have a translation or TM match, instead of only empty ones. Only applies to automatic_translation tasks in projects with segmentation enabled, and can only be set at creation time.`,
      },
    ],
  },
  {
    name: 'lokalise_create_team_group',
    description: `Create a new user group in a Lokalise team, setting its name and either a permission-template role or explicit admin rights, plus which languages it can view or contribute to.
Returns the created group's ID, name, permissions, and team ID.
Use this to set up a group before granting it project access or adding members with lokalise_add_projects_to_group and lokalise_add_members_to_group. Use lokalise_update_team_group to change an existing group's settings instead.
Requires Admin rights in the team.`,
    params: [
      {
        name: 'is_admin',
        type: 'boolean',
        required: true,
        description: `Whether members of this group have Admin access to assigned projects. Lokalise's own documentation states this should override the languages fields below, but in practice the API still rejects the request without them (verified live) — always supply non-empty Reference and Contributable Languages regardless of this value. Also note (verified live): when role_id is set (or certain admin_rights combinations are used), the response's permissions.is_admin/is_reviewer can come back true even though this field was sent as false — the API appears to derive the effective admin/reviewer status from the resulting permission set rather than echoing back exactly what was submitted. Treat this field as a write-only input, not a value you can read back unchanged from the response.`,
      },
      {
        name: 'is_reviewer',
        type: 'boolean',
        required: true,
        description: `Whether members of this group have reviewer access to assigned projects (legacy permission flag, superseded by role_id/admin_rights on newer Lokalise plans but still required by this endpoint).`,
      },
      {
        name: 'languages_contributable',
        type: 'array',
        required: true,
        description: `Language IDs the group can translate into. Always required by the live API — must be a non-empty array even when Is Admin is true (Lokalise's documentation says Is Admin overrides this, but the API rejects an empty or omitted value regardless; verified live).`,
      },
      {
        name: 'languages_reference',
        type: 'array',
        required: true,
        description: `Language IDs the group can view but not translate into (read-only reference languages). Always required by the live API — must be a non-empty array even when Is Admin is true (Lokalise's documentation says Is Admin overrides this, but the API rejects an empty or omitted value regardless; verified live).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new group, shown in the Lokalise team members list.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team to create the group in.`,
      },
      {
        name: 'admin_rights',
        type: 'array',
        required: false,
        description: `Explicit list of permission strings to grant this group when no role_id template is used. Documented values include activity, contributors, branches_create, branches_main_modify, branches_merge, custom_status_modify, download, glossary, glossary_edit, glossary_delete, keys, manage_languages, review, screenshots, settings, statistics, tasks, and upload. Note (verified live): 'glossary' is accepted by this endpoint's schema but silently dropped from the response — the group's stored admin_rights end up empty when only 'glossary' is requested — so treat glossary-related permissions as unsupported for groups even though they are documented as valid values here.`,
      },
      {
        name: 'role_id',
        type: 'integer',
        required: false,
        description: `Numeric ID of a permission template to copy this group's permissions from. When set, it takes precedence over the Admin Rights field. Valid values: 1=Manager (manage project settings, contributors and tasks), 2=Developer (create keys, upload and download content), 3=Content creator (create, translate and edit keys, manage screenshots), 4=Reviewer (translate keys, control key statuses), 5=Translator (translate keys).`,
      },
    ],
  },
  {
    name: 'lokalise_create_webhook',
    description: `Create a new webhook on a Lokalise project to receive notifications for specific events.
Returns the created webhook's ID, URL, secret, subscribed events, and any per-event language mappings.
Use this to set up a new webhook endpoint; use lokalise_update_webhook to change an existing webhook's settings instead of creating a duplicate.`,
    params: [
      {
        name: 'events',
        type: 'array',
        required: true,
        description: `List of event names to subscribe this webhook to, for example project.translation.updated or project.key.added. Must contain at least one valid event name from the supported list. Note: Lokalise automatically adds a plural alias alongside some singular event names once a webhook is created (e.g. subscribing to project.key.added also shows project.keys.added on read-back) — both forms are accepted here so a list read from lokalise_get_webhook can always be resent as-is.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project to create the webhook in.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `HTTPS endpoint that will receive the webhook's POST payloads. Lokalise validates this URL synchronously at creation time by making a live request to it and requires a 200 response, so it must already be reachable and responding correctly (a placeholder or non-responsive URL will fail creation).`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Limit the webhook to a specific project branch. Omit this to apply the webhook to all branches.`,
      },
      {
        name: 'event_lang_map',
        type: 'array',
        required: false,
        description: `Restricts specific events to only fire for certain languages. Each entry pairs one event name with a list of language ISO codes; only project.translation.updated and project.translation.proofread support this mapping. Omit this to have those events fire for all languages in the project.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_all_contributors',
    description: `Start an asynchronous job that deletes every contributor from a Lokalise project.
Returns a job ID for the deletion job, not the deletion result itself.
Use this to reset project access before re-inviting or re-importing contributors; poll Get Contributor Bulk Deletion Job with the returned job ID to check progress and completion. This action cannot be undone, and only one bulk deletion can run per project at a time.

Known upstream issue (confirmed live, 2026-09-04): Lokalise's API currently rejects every call to this exact, documented endpoint with \`400 Invalid type of contributor_id parameter\` — as if it were routing the request to their singular DELETE /contributors/{contributor_id} endpoint instead, treating the literal path segment 'import' as a contributor_id. Verified by proxying the request directly (bypassing this tool's own request construction) with the identical path/method/body Lokalise's own OpenAPI spec documents. This looks like a bug or route-priority issue on Lokalise's side, not a defect in this tool's request shape — nothing in the request can currently work around it.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to delete all contributors from.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_comment',
    description: `Delete a comment from a translation key in a Lokalise project. You can only delete comments you added yourself.
Returns the project ID and a boolean confirming the comment was deleted.
Use this to remove an outdated or incorrect comment; this action cannot be undone.`,
    params: [
      {
        name: 'comment_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the comment to delete.`,
      },
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key the comment belongs to.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the key belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_contributor',
    description: `Remove a contributor from a Lokalise project, permanently revoking their access.
Returns confirmation that the contributor was deleted, along with the project ID.
Use this to remove a contributor entirely. Use lokalise_update_contributor to change their permissions instead of removing them.
Requires the contributor ID; look it up with lokalise_get_contributor if you don't already have it.`,
    params: [
      {
        name: 'contributor_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the contributor to delete.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the contributor belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_custom_status',
    description: `Delete a custom translation status from a Lokalise project.
Returns confirmation that the status was deleted, along with the project ID.
Use this to permanently remove a status you no longer need. Use lokalise_update_custom_status to rename or recolor a status instead of deleting it.
Requires the status ID; look it up with lokalise_list_custom_statuses if you don't already have it.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the custom translation status belongs to.`,
      },
      {
        name: 'status_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the custom translation status to delete.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_file',
    description: `Permanently delete a file and all of its associated keys from a Lokalise project.
Returns the project ID and a file_deleted confirmation flag.
Use lokalise_list_files first to find the file_id. Only supported for Documents and Marketing/Support project types, not Software (localization_files) projects.`,
    params: [
      {
        name: 'file_id',
        type: 'number',
        required: true,
        description: `The unique identifier of the file to delete, as returned by the List Files tool.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the file. Example: 3002780358964f9bab5a92.87762498.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_glossary_terms',
    description: `Permanently delete one or more glossary terms from a Lokalise project by ID.
Returns counts and IDs of the terms that were deleted, plus any that failed to delete with an error message.
Use lokalise_list_glossary_terms first to find the term IDs you want to remove.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to delete glossary terms from. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'term_ids',
        type: 'string',
        required: true,
        description: `Numeric IDs of the glossary terms to delete, as a comma-separated list (no spaces required). Example: 1234,5678.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_key',
    description: `Delete a single translation key, and all of its translations, from a Lokalise project.
Returns the project ID, whether the key was removed, and the number of keys still locked in the project.
Use this to remove one key. Use lokalise_delete_keys to remove multiple keys in a single bulk call.
Requires a key_id — find one with lokalise_list_keys or lokalise_get_key first.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the key to delete.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the key. Find it with lokalise_list_projects.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_keys',
    description: `Permanently delete one or more translation keys, and their translations, from a Lokalise project.
Returns a confirmation flag and a count of any keys that were locked and could not be removed.
Use this to remove keys you no longer need. Use lokalise_empty_project instead to remove every key in a project at once.
This action cannot be undone.`,
    params: [
      {
        name: 'keys',
        type: 'array',
        required: true,
        description: `List of numeric key IDs to permanently delete from the project. Example: [12345, 12346].`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the keys belong to. Example: '3002780358964f9bab5a92.87762498'.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_language',
    description: `Delete a language from a Lokalise project, permanently removing it and all of its translations.
Returns the project ID and a boolean confirming the language was deleted.
Use this to remove a language no longer needed for translation; this action cannot be undone.
Requires the language's numeric ID, which you can find with a project languages listing tool.`,
    params: [
      {
        name: 'lang_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the language to delete, as assigned by Lokalise (not the ISO code). Find it via a project languages listing tool.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the language belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_payment_card',
    description: `Permanently delete a saved payment card from your Lokalise account by its card ID.
Returns the deleted card's ID and a confirmation flag.
Use this to remove a card you no longer want available for translation orders. This cannot be undone; use the list payment cards tool first to confirm the card ID.`,
    params: [
      {
        name: 'card_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the payment card to delete.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_project',
    description: `Permanently delete a Lokalise project, including all of its keys and translations.
Returns the deleted project's ID and a confirmation flag.
Use this only when the project itself should be removed entirely. Use lokalise_empty_project instead to clear a project's keys and translations while keeping the project.
This action cannot be undone.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project to delete. Example: '3002780358964f9bab5a92.87762498'.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_screenshot',
    description: `Permanently delete a screenshot from a Lokalise project. Requires the Manage screenshots admin right.
Returns a confirmation flag indicating the screenshot was deleted.
Use this to remove a screenshot that is no longer needed; this action cannot be undone, so confirm the screenshot ID with lokalise_list_screenshots or lokalise_get_screenshot first.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the screenshot.`,
      },
      {
        name: 'screenshot_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the screenshot to delete.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_snapshot',
    description: `Permanently delete a snapshot from a Lokalise project.
Returns the project ID and a boolean confirming the snapshot was deleted.
Use this to clean up snapshots you no longer need; deleted snapshots cannot be recovered or restored afterward, so make sure you won't need lokalise_restore_snapshot on it first.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the snapshot belongs to.`,
      },
      {
        name: 'snapshot_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the snapshot to permanently delete. This cannot be undone.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_task',
    description: `Permanently delete a task from a Lokalise project.
Returns the project ID and a boolean confirming the task was deleted.
Use this to remove tasks that are no longer needed; deleted tasks and their language/progress data cannot be recovered afterward.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the task belongs to.`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the task to permanently delete. This cannot be undone.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_team_group',
    description: `Delete a user group from a Lokalise team, permanently removing the group and its project and member assignments.
Returns confirmation that the group was deleted, along with the team ID.
Use this to remove a group you no longer need. The projects and members themselves are not deleted, only the group's association with them.
Requires Admin rights in the team. This action cannot be undone.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to delete.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_team_user',
    description: `Remove a user from a Lokalise team, revoking their access to the team and its projects.
Returns confirmation that the user was deleted.
Use this to offboard a team member; this action cannot be undone. Use lokalise_list_team_users to find the user ID first.
Requires Admin role in the team.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team to remove the user from. Find it via lokalise_list_teams.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the team user to delete. Find it via lokalise_list_team_users.`,
      },
    ],
  },
  {
    name: 'lokalise_delete_webhook',
    description: `Permanently delete a webhook from a Lokalise project.
Returns the project ID and a confirmation flag indicating the webhook was deleted.
Use this to stop event notifications from being sent to a webhook endpoint; this action cannot be undone, so confirm the webhook_id with lokalise_list_webhooks first if unsure.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the webhook belongs to.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'lokalise_download_files',
    description: `Export a Lokalise project's translation files synchronously as a .zip bundle uploaded to Amazon S3.
Returns the project ID and a bundle_url pointing to the generated .zip, available to download for about a month.
Use lokalise_async_download_files instead for large projects (10,000+ key-language pairs), since this endpoint is limited to smaller ones.`,
    params: [
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `File format to export, given as a file extension of a supported format (e.g. json, xml, strings), or ios_sdk / android_sdk for an OTA SDK bundle.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to export files from. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'add_newline_eof',
        type: 'boolean',
        required: false,
        description: `Whether to add a trailing newline at the end of each exported file, if supported by the format.`,
      },
      {
        name: 'all_platforms',
        type: 'boolean',
        required: false,
        description: `Whether to include keys from all platforms. If disabled, only keys associated with the platform implied by the export format are included.`,
      },
      {
        name: 'bundle_structure',
        type: 'string',
        required: false,
        description: `Bundle path/filename structure to use when original_filenames is false. Supports the placeholders %LANG_ISO%, %LANG_NAME%, %FORMAT%, and %PROJECT_NAME%.`,
      },
      {
        name: 'custom_translation_status_ids',
        type: 'array',
        required: false,
        description: `Only export translations attributed to these custom translation status IDs. Leave empty to include translations with any status.`,
      },
      {
        name: 'directory_prefix',
        type: 'string',
        required: false,
        description: `Directory prefix added inside the bundle when original_filenames is true. Supports the %LANG_ISO% placeholder.`,
      },
      {
        name: 'disable_references',
        type: 'boolean',
        required: false,
        description: `Whether to skip automatically resolving key-reference placeholders (e.g. [%key:hello_world%]) into their corresponding translations.`,
      },
      {
        name: 'exclude_tags',
        type: 'array',
        required: false,
        description: `Exclude keys carrying at least one of these tags from the export.`,
      },
      {
        name: 'export_empty_as',
        type: 'string',
        required: false,
        description: `How to render translations that have no value.`,
      },
      {
        name: 'export_sort',
        type: 'string',
        required: false,
        description: `Sort order applied to exported keys.`,
      },
      {
        name: 'filter_data',
        type: 'array',
        required: false,
        description: `Narrow the export to keys/translations matching these data filters.`,
      },
      {
        name: 'filter_filenames',
        type: 'array',
        required: false,
        description: `Only export keys attributed to these filenames. Leave empty to include keys from all files.`,
      },
      {
        name: 'filter_langs',
        type: 'array',
        required: false,
        description: `Languages to include in the export. Omit to export all project languages.`,
      },
      {
        name: 'filter_task_id',
        type: 'number',
        required: false,
        description: `Only export keys attributed to this task. Available only for the offline_xliff format.`,
      },
      {
        name: 'include_comments',
        type: 'boolean',
        required: false,
        description: `Whether to include key comments in the exported file, if supported by the format.`,
      },
      {
        name: 'include_description',
        type: 'boolean',
        required: false,
        description: `Whether to include key descriptions in the exported file, if supported by the format.`,
      },
      {
        name: 'include_tags',
        type: 'array',
        required: false,
        description: `Only export keys carrying at least one of these tags.`,
      },
      {
        name: 'indentation',
        type: 'string',
        required: false,
        description: `Override the default indentation used in supported file formats.`,
      },
      {
        name: 'original_filenames',
        type: 'boolean',
        required: false,
        description: `Whether to export using each key's original filename/format. If false, all keys for a language are exported into a single file per language.`,
      },
      {
        name: 'placeholder_format',
        type: 'string',
        required: false,
        description: `Override the default placeholder syntax used for the export format.`,
      },
      {
        name: 'plural_format',
        type: 'string',
        required: false,
        description: `Override the default plural syntax used for the export format.`,
      },
      {
        name: 'replace_breaks',
        type: 'boolean',
        required: false,
        description: `Whether to replace real line breaks in exported translations with the literal sequence \\n.`,
      },
    ],
  },
  {
    name: 'lokalise_empty_project',
    description: `Delete all keys and translations from a Lokalise project while keeping the project itself.
Returns the project ID and a flag confirming the keys were deleted.
Use this to reset a project's content without deleting the project. Use lokalise_delete_project instead to remove the entire project.
This action cannot be undone.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project to empty. Example: '3002780358964f9bab5a92.87762498'.`,
      },
    ],
  },
  {
    name: 'lokalise_get_billing_details',
    description: `Retrieve the billing details on file for a Lokalise team, used for invoices and translation orders.
Returns the team's billing email, address fields (company, address lines, city, ZIP/postal code, state code for US addresses), phone, VAT number, and country code.
Use this to check a team's current billing information. Use lokalise_create_billing_details to set it up if the team doesn't have billing details yet.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team to look up billing details for.`,
      },
    ],
  },
  {
    name: 'lokalise_get_comment',
    description: `Retrieve a single comment on a translation key in a Lokalise project by its ID.
Returns the comment text, author, and timestamps.
Use this when you already have a comment ID (from List Key Comments or List Project Comments) and need its full details.`,
    params: [
      {
        name: 'comment_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the comment to retrieve.`,
      },
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key the comment belongs to.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the key belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_get_contributor',
    description: `Retrieve a single contributor's details from a Lokalise project by contributor ID.
Returns the contributor's user ID, email, full name, admin/reviewer flags, assigned languages with write access, and admin rights.
Use this to look up one contributor's settings rather than browsing every contributor in the project.
Requires the contributor ID; look it up from the project's contributor listing if you don't already have it.`,
    params: [
      {
        name: 'contributor_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the contributor to retrieve.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the contributor belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_get_contributor_bulk_deletion_job',
    description: `Check the status of a bulk contributor-deletion job in a Lokalise project.
Returns the job's state (queued, running, completed, or failed) along with counts of contributors processed, deleted, failed, and skipped, plus any error reasons and their counts.
Use this to poll an in-progress bulk deletion rather than to look up a single contributor.
Requires the job ID returned when the bulk contributor-deletion job was started.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID v7) of the bulk contributor-deletion job to check, as returned when the job was started.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier (UUID v7) of the Lokalise project the bulk deletion job belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_get_current_contributor',
    description: `Retrieve the contributor profile of the currently authenticated user for a Lokalise project, including permissions inherited from any group membership.
Returns the user's ID, email, full name, admin/reviewer flags, assigned languages with write access, and combined admin rights.
Use this to check the current API token's own effective permissions in a project rather than looking up another contributor by ID.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to check the current user's contributor profile in.`,
      },
    ],
  },
  {
    name: 'lokalise_get_custom_status',
    description: `Retrieve a single custom translation status from a Lokalise project by status ID.
Returns the status's ID, title, and hex color.
Use this to look up one status rather than listing every custom status in the project.
Requires the status ID; look it up with lokalise_list_custom_statuses if you don't already have it.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the custom translation status belongs to.`,
      },
      {
        name: 'status_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the custom translation status to retrieve.`,
      },
    ],
  },
  {
    name: 'lokalise_get_glossary_term',
    description: `Retrieve a single glossary term from a Lokalise project by its term ID.
Returns the term's text, description, case-sensitivity and translatable flags, forbidden flag, its per-language translations, and tags.
Use this when you already know the term ID and need its full details. Use a list glossary terms tool to browse or search terms and find the ID first.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that contains the glossary term. Find this on the project's settings page or from a list projects tool.`,
      },
      {
        name: 'term_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the glossary term to retrieve.`,
      },
    ],
  },
  {
    name: 'lokalise_get_key',
    description: `Retrieve a single translation key from a Lokalise project by its key ID.
Returns the key's name, description, platforms, tags, comments, screenshots, and translations for every project language.
Use this when you already know the key ID. Use lokalise_list_keys instead to browse or filter a project's keys.`,
    params: [
      {
        name: 'key_id',
        type: 'number',
        required: true,
        description: `Unique numeric identifier of the key to retrieve. Example: 222222.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the key belongs to. Example: '3002780358964f9bab5a92.87762498'.`,
      },
      {
        name: 'disable_references',
        type: 'integer',
        required: false,
        description: `Whether to disable key references in the response. Use 1 to disable, or 0 to keep them enabled.`,
      },
    ],
  },
  {
    name: 'lokalise_get_key_segment',
    description: `Retrieve a single translation segment for a specific key, language, and segment number in a Lokalise project.
Returns the segment's translation text, word count, fuzzy/reviewed flags, and who last modified it.
Use this to check one segment's current value before updating it with lokalise_update_key_segment; use lokalise_list_key_segments to find the segment_number first.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key the segment belongs to.`,
      },
      {
        name: 'language_iso',
        type: 'string',
        required: true,
        description: `The ISO language code of the segment (e.g. en, en_US, fr_FR).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the key.`,
      },
      {
        name: 'segment_number',
        type: 'integer',
        required: true,
        description: `The 1-based number identifying which segment to retrieve (a key has more than one segment when it uses plural forms).`,
      },
      {
        name: 'disable_references',
        type: 'integer',
        required: false,
        description: `Whether to disable resolving key references inside the segment text. Use 1 to disable references, or 0 to keep them resolved.`,
      },
    ],
  },
  {
    name: 'lokalise_get_language',
    description: `Retrieve a single language's details from a Lokalise project by its language ID.
Returns the language's ISO code, name, right-to-left flag, and supported plural forms.
Use this to inspect one project language. Use lokalise_list_project_languages to browse all languages in the project.`,
    params: [
      {
        name: 'lang_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the language to retrieve.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the language. Find it with lokalise_list_projects.`,
      },
    ],
  },
  {
    name: 'lokalise_get_order',
    description: `Retrieve a single translation order in a Lokalise team by its order ID.
Returns the order's status, project, source and target languages, keys included, translation provider and tier, briefing, and total cost.
Use this when you already know the order ID. Use the list orders tool to browse orders and find an ID first.`,
    params: [
      {
        name: 'order_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the order to retrieve.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the Lokalise team that placed the order.`,
      },
    ],
  },
  {
    name: 'lokalise_get_payment_card',
    description: `Retrieve a single saved payment card on your Lokalise account by its card ID.
Returns the card's brand and last 4 digits, its creation date, and your user ID — never the full card number.
Use this when you already know the card ID. Use the list payment cards tool to browse cards and find the ID first.`,
    params: [
      {
        name: 'card_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the payment card to retrieve.`,
      },
    ],
  },
  {
    name: 'lokalise_get_process',
    description: `Retrieve the current status and details of a queued background process in a Lokalise project, such as a file import.
Returns the process type, status (queued, running, finished, or failed), who created it, and per-file import results (word and key counts) when applicable.
Use this to poll a long-running operation you started elsewhere (for example a file upload) until its status becomes finished or failed.`,
    params: [
      {
        name: 'process_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the queued process to retrieve, as returned when the process was created (for example, when a file import was triggered).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the process.`,
      },
    ],
  },
  {
    name: 'lokalise_get_project',
    description: `Retrieve a single Lokalise project by its ID.
Returns the project's name, description, type, team, base language, settings, and translation-progress statistics.
Use this to check a project's current details or statistics. Use lokalise_list_projects instead when you don't already have the project ID.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project to retrieve. Example: '3002780358964f9bab5a92.87762498'.`,
      },
    ],
  },
  {
    name: 'lokalise_get_screenshot',
    description: `Retrieve a single screenshot from a Lokalise project by its ID.
Returns the screenshot's hosted image URL, title, description, dimensions, attached key IDs, and tags.
Use this to inspect one screenshot's details; use lokalise_list_screenshots to find its ID first.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the screenshot.`,
      },
      {
        name: 'screenshot_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the screenshot to retrieve.`,
      },
    ],
  },
  {
    name: 'lokalise_get_task',
    description: `Retrieve the full details of a specific task in a Lokalise project by its task ID.
Returns the task's title, description, status, progress, due date, assigned languages with per-language translators and progress, and completion metadata.
Use this to check a task's current state; use lokalise_list_tasks to browse all tasks or find a task ID first.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the task belongs to.`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the task to retrieve.`,
      },
    ],
  },
  {
    name: 'lokalise_get_task_usage_metrics',
    description: `Retrieve usage metrics for a specific task in a Lokalise project, showing how many words it consumed.
Returns the number of processed words attributed to the task.
Use this to track translation usage or costs for a task, especially automatic_translation and lqa_by_ai tasks; data is only available for tasks created from November 3rd 2025 onward.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the task belongs to.`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the task to retrieve usage metrics for.`,
      },
    ],
  },
  {
    name: 'lokalise_get_team',
    description: `Retrieve details for a single Lokalise team by ID.
Returns the team's name, plan, quota usage and limits, creation date, and trial/suspension status.
Use this to check a specific team's plan and usage after finding its ID with lokalise_list_teams.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team to retrieve. Find it via lokalise_list_teams.`,
      },
    ],
  },
  {
    name: 'lokalise_get_team_group',
    description: `Retrieve a single user group's details from a Lokalise team by its group ID.
Returns the group's name, its permissions (admin/reviewer flags, admin rights, and language access), plus the list of projects and members currently assigned to it.
Use this to inspect an existing group before updating its settings or its project/member assignments. Use lokalise_create_team_group to create a new group instead.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to retrieve.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_get_team_user',
    description: `Retrieve details for a single user on a Lokalise team by user ID.
Returns the user's email, full name, role, and creation date.
Use this to check a specific member's role before updating or removing them. Use lokalise_list_team_users to find the user ID first.
Requires Admin role in the team.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the user belongs to. Find it via lokalise_list_teams.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the team user to retrieve. Find it via lokalise_list_team_users.`,
      },
    ],
  },
  {
    name: 'lokalise_get_translation',
    description: `Retrieve a single translation by its ID from a Lokalise project.
Returns the translation's content, language, review/unverified flags, word count, and any custom translation statuses.
Use this to inspect one translation. Use lokalise_list_translations to browse or filter translations across the project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the translation. Find it with lokalise_list_projects.`,
      },
      {
        name: 'translation_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the translation to retrieve.`,
      },
      {
        name: 'disable_references',
        type: 'integer',
        required: false,
        description: `Whether to disable resolving key references inside the translation content. Use 1 to disable references, or 0 to keep them resolved.`,
      },
    ],
  },
  {
    name: 'lokalise_get_translation_provider',
    description: `Retrieve details for a single translation service provider by ID.
Returns the provider's name, pricing tiers, and available source/target language pairs.
Use this to check a specific provider's supported languages and pricing before placing a translation order. Use lokalise_list_translation_providers to find the provider ID first.
Requires a team ID from lokalise_list_teams.`,
    params: [
      {
        name: 'provider_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the translation provider to retrieve. Find it via lokalise_list_translation_providers.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the translation provider belongs to. Find it via lokalise_list_teams.`,
      },
    ],
  },
  {
    name: 'lokalise_get_user',
    description: `Retrieve basic profile data for a single Lokalise user by user ID.
Returns the user's numeric ID, UUID, email address, and full name.
Use this when you already have a user ID and need their basic profile; not available when authenticating via OAuth (server-to-server API token only).`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the user to retrieve. Accepts either the numeric user ID or the user's UUID.`,
      },
    ],
  },
  {
    name: 'lokalise_get_webhook',
    description: `Retrieve the configuration of a single webhook on a Lokalise project.
Returns the webhook's URL, branch scope, secret, subscribed events, and any per-event language mappings.
Use this to inspect one specific webhook by ID; use lokalise_list_webhooks to browse all webhooks on a project first if you don't have the webhook_id.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the webhook belongs to.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the webhook to retrieve.`,
      },
    ],
  },
  {
    name: 'lokalise_import_contributors',
    description: `Copy contributors from another Lokalise project into this one, keeping their roles, permissions, and language assignments.
Returns a per-contributor import summary showing how many were imported versus skipped (e.g. because they already exist in the target project).
Use this to quickly replicate a team's access across projects. Use Create Contributors instead to add brand-new contributors by hand.
Requires Manage Contributors admin rights on this (target) project and read access to the source project.`,
    params: [
      {
        name: 'from_project_uuid',
        type: 'string',
        required: true,
        description: `UUID of the source Lokalise project to copy contributors from.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the target Lokalise project to import contributors into.`,
      },
      {
        name: 'contributor_ids',
        type: 'array',
        required: false,
        description: `Optional list of contributor UUIDs to import from the source project. If omitted or empty, every contributor from the source project is imported.`,
      },
    ],
  },
  {
    name: 'lokalise_list_comments',
    description: `List all comments left on translation keys across a Lokalise project.
Returns each comment's ID, the key it belongs to, comment text, author, and timestamps.
Use this to review project-wide comment activity. Use List Key Comments instead to see comments scoped to one specific key.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list comments from.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_contributors',
    description: `List all contributors on a Lokalise project, including their access level and per-language permissions.
Returns each contributor's user ID, email, name, admin/reviewer status, and the languages they can access (with write permissions).
Use this to audit project access before adding, importing, or removing contributors.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list contributors from.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of contributors to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_custom_status_colors',
    description: `Retrieve the palette of preset colors available for custom translation statuses in a Lokalise project.
Returns an array of hex color codes (for example #61bd4f, #f2d600).
Use this before creating or updating a custom translation status to pick a valid color value.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose custom-translation-status color palette you want to retrieve. Example: 3002780358964f9bab5a92.87762498.`,
      },
    ],
  },
  {
    name: 'lokalise_list_custom_statuses',
    description: `List all custom translation statuses defined in a Lokalise project.
Returns each status's ID, title, and hex color, paginated by page and limit.
Use this to browse existing statuses or look up a status ID before retrieving, updating, or deleting one.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list custom translation statuses for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of statuses to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_files',
    description: `List the files associated with keys in a Lokalise project, including a virtual __unassigned__ entry for keys with no file.
Returns each file's ID, filename, and key count.
Use this to look up a file_id before uploading, downloading, or deleting a specific file.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose files you want to list. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'filter_filename',
        type: 'string',
        required: false,
        description: `Restrict results to files whose filename matches this filter string.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of files to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_glossary_terms',
    description: `List the glossary terms defined in a Lokalise project, using cursor-based pagination.
Returns each term's id, term text, description, translations, and flags (case-sensitive, translatable, forbidden), plus a nextCursor for the next page.
Use this to review existing terminology or look up term IDs before updating or deleting glossary terms.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose glossary terms you want to list. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'cursor',
        type: 'integer',
        required: false,
        description: `Cursor value to resume pagination, taken from the nextCursor field of the previous response's metadata. Omit on the first request.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of glossary terms to return in a single page of results (maximum 500).`,
      },
    ],
  },
  {
    name: 'lokalise_list_key_comments',
    description: `List all comments left on a specific translation key in a Lokalise project.
Returns each comment's ID, comment text, author, and timestamps.
Use this to review discussion on one key. Use List Project Comments instead to see comments across the whole project.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key to list comments for.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the key belongs to.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_key_segments',
    description: `List the translation segments for a specific key and language in a Lokalise project (a key has multiple segments when it uses plural forms).
Returns each segment's number, translation text, word count, and fuzzy/reviewed/QA-issue status.
Use this to see all segments for a key and language before retrieving or updating one with lokalise_get_key_segment or lokalise_update_key_segment.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key whose segments to list.`,
      },
      {
        name: 'language_iso',
        type: 'string',
        required: true,
        description: `The ISO language code of the segments to list (e.g. en, en_US, fr_FR).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the key.`,
      },
      {
        name: 'disable_references',
        type: 'integer',
        required: false,
        description: `Whether to disable resolving key references inside the segment text. Use 1 to disable references, or 0 to keep them resolved.`,
      },
      {
        name: 'filter_is_reviewed',
        type: 'integer',
        required: false,
        description: `Filter segments by whether they have been marked as reviewed. Use 1 to return only reviewed segments, or 0 for only unreviewed ones.`,
      },
      {
        name: 'filter_qa_issues',
        type: 'string',
        required: false,
        description: `Restrict results to segments flagged with one or more specific QA issues, given as a comma-separated list. Valid values include spelling_and_grammar, placeholders, html, url_count, url, email_count, email, brackets, numbers, leading_whitespace, trailing_whitespace, double_space, and special_placeholder.`,
      },
      {
        name: 'filter_untranslated',
        type: 'integer',
        required: false,
        description: `Filter segments by whether they still lack a translation. Use 1 to return only untranslated segments, or 0 for only translated ones.`,
      },
      {
        name: 'filter_unverified',
        type: 'integer',
        required: false,
        description: `Filter segments by their fuzzy (unverified) flag. Use 1 to return only unverified segments, or 0 for only verified ones.`,
      },
    ],
  },
  {
    name: 'lokalise_list_keys',
    description: `List the translation keys in a Lokalise project, with optional filters for tags, filenames, platforms, key names, and translation status.
Returns each key's ID, name, platforms, tags, and (when requested) comments, screenshots, and translations.
Use this to browse or filter a project's keys. Use lokalise_get_key instead when you already know a specific key's ID.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project whose keys should be listed. Example: '3002780358964f9bab5a92.87762498'.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value to resume cursor-based pagination. Lokalise returns the nextCursor value in an HTTP response header, not in the response body — as of this writing, Scalekit's tool-execution runtime does not surface response headers back to the caller, so cursor-based pagination cannot currently be completed end-to-end through this tool. Prefer offset pagination (limit/page) instead; only set this if you have obtained a cursor value some other way.`,
      },
      {
        name: 'disable_references',
        type: 'integer',
        required: false,
        description: `Whether to disable key references in the response. Use 1 to disable, or 0 to keep them enabled.`,
      },
      {
        name: 'filter_archived',
        type: 'string',
        required: false,
        description: `Whether to include, exclude, or return only archived keys.`,
      },
      {
        name: 'filter_filenames',
        type: 'string',
        required: false,
        description: `One or more filenames to filter keys by, separated by commas.`,
      },
      {
        name: 'filter_key_ids',
        type: 'string',
        required: false,
        description: `One or more numeric key IDs to filter by, separated by commas.`,
      },
      {
        name: 'filter_keys',
        type: 'string',
        required: false,
        description: `One or more key names to filter by, separated by commas. When per-platform key names are enabled for the project, the filter matches against any platform's name.`,
      },
      {
        name: 'filter_platforms',
        type: 'string',
        required: false,
        description: `One or more platforms to filter keys by, separated by commas. Valid values are 'ios', 'android', 'web', and 'other'.`,
      },
      {
        name: 'filter_qa_issues',
        type: 'string',
        required: false,
        description: `One or more QA issue types to filter by, separated by commas. Valid values include 'spelling_and_grammar', 'placeholders', 'html', 'url_count', 'url', 'email_count', 'email', 'brackets', 'numbers', 'leading_whitespace', 'trailing_whitespace', 'double_space', 'special_placeholder', and 'unbalanced_brackets'.`,
      },
      {
        name: 'filter_tags',
        type: 'string',
        required: false,
        description: `One or more tags to filter keys by, separated by commas. Only keys carrying at least one of these tags are returned.`,
      },
      {
        name: 'filter_translation_lang_ids',
        type: 'string',
        required: false,
        description: `One or more numeric language IDs to filter translations by, separated by commas. Only translations for these language IDs are included in the response.`,
      },
      {
        name: 'filter_untranslated',
        type: 'integer',
        required: false,
        description: `Whether to return only keys that have no translation yet. Use 1 to filter to untranslated keys, or 0 to include all keys.`,
      },
      {
        name: 'include_comments',
        type: 'integer',
        required: false,
        description: `Whether to include each key's comments in the response. Use 1 to include, or 0 to omit.`,
      },
      {
        name: 'include_screenshots',
        type: 'integer',
        required: false,
        description: `Whether to include URLs to each key's attached screenshots. Use 1 to include, or 0 to omit.`,
      },
      {
        name: 'include_translations',
        type: 'integer',
        required: false,
        description: `Whether to include each key's translations in the response. Use 1 to include, or 0 to omit.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of keys to return in a single page of results (maximum 500).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Only applies when Pagination Type is 'offset'.`,
      },
      {
        name: 'pagination',
        type: 'string',
        required: false,
        description: `Pagination strategy to use. 'offset' (the default) supports page numbers. 'cursor' is optimized for large datasets but only supports paging forward via a returned cursor value.`,
      },
    ],
  },
  {
    name: 'lokalise_list_orders',
    description: `List all translation orders placed within a Lokalise team.
Returns each order's ID, status, project, source and target languages, translation provider, tier, briefing, and total cost.
Use this to review past and in-progress translation orders for a team, or to find an order ID before retrieving full details with the get order tool.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the Lokalise team whose orders should be listed.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of orders to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_payment_cards',
    description: `List the payment cards saved on your Lokalise account.
Returns each card's ID, brand, and last 4 digits, plus your user ID — never the full card number.
Use this to find a card ID before placing a translation order or before deleting a card.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of payment cards to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_permission_templates',
    description: `List all permission templates (roles) defined for a Lokalise team.
Returns each template's ID, name, granted permissions, description, display tag, and whether it enables all read-only languages.
Use this to see the roles available before assigning one to a contributor or a contributor group.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the Lokalise team whose permission templates should be listed.`,
      },
    ],
  },
  {
    name: 'lokalise_list_processes',
    description: `List all queued background processes (such as file imports) for a Lokalise project.
Returns each process's ID, type, status, message, and who created it.
Use this to check whether a long-running operation like a file import has finished, or to find a process ID to inspect further.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose queued processes should be listed.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of processes to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_project_languages',
    description: `List the languages currently enabled in a Lokalise project.
Returns an array of language objects, each with its language ID, ISO code, name, right-to-left flag, and supported plural forms.
Use this to look up a language's ID before running lokalise_get_language, lokalise_update_language, or lokalise_delete_language.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list languages from. Find it with lokalise_list_projects.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of languages to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_projects',
    description: `List all projects accessible to your Lokalise API token, optionally filtered by project name or team.
Returns each project's ID, name, and description, plus (when requested) translation-progress statistics or project settings.
Use this to browse available projects or look up a project ID before running other Lokalise tools that operate on a specific project.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value to resume cursor-based pagination. Lokalise returns the nextCursor value in an HTTP response header, not in the response body — as of this writing, Scalekit's tool-execution runtime does not surface response headers back to the caller, so cursor-based pagination cannot currently be completed end-to-end through this tool. Prefer offset pagination (limit/page) instead; only set this if you have obtained a cursor value some other way.`,
      },
      {
        name: 'filter_names',
        type: 'string',
        required: false,
        description: `One or more project names to filter results by. Provide a single name, or several names separated by commas to match projects with any of those names.`,
      },
      {
        name: 'filter_team_id',
        type: 'integer',
        required: false,
        description: `Limit results to projects that belong to a specific Lokalise team, identified by its numeric team ID.`,
      },
      {
        name: 'include_settings',
        type: 'integer',
        required: false,
        description: `Whether to include each project's settings object (for example QA checks and language mapping) in the response. Use 1 to include settings, or 0 to omit them.`,
      },
      {
        name: 'include_statistics',
        type: 'integer',
        required: false,
        description: `Whether to include per-language translation-progress statistics for each project. Use 1 to include statistics, or 0 to omit them for a faster response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of projects to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Only applies when Pagination Type is 'offset'.`,
      },
      {
        name: 'pagination',
        type: 'string',
        required: false,
        description: `Pagination strategy to use. 'offset' (the default) supports page numbers and total result counts. 'cursor' is optimized for large datasets but only supports paging forward via a returned cursor value.`,
      },
    ],
  },
  {
    name: 'lokalise_list_screenshots',
    description: `List the screenshots uploaded to a Lokalise project.
Returns each screenshot's ID, hosted image URL, dimensions, title, attached key IDs, and tags.
Use this to browse existing screenshots or find a screenshot ID before viewing, updating, or deleting one with lokalise_get_screenshot, lokalise_update_screenshot, or lokalise_delete_screenshot.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list screenshots from.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of screenshots to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_snapshots',
    description: `List the snapshots (saved backups) of a Lokalise project. Requires the Manage settings admin right.
Returns each snapshot's ID, title, creation time, and the user who created it.
Use this to find a snapshot's ID before restoring or comparing it against the project's current state.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list snapshots for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of snapshots to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_system_languages',
    description: `List all languages supported system-wide by Lokalise, independent of any specific project.
Returns an array of language objects, each with its system language ID, ISO code, name, right-to-left flag, and supported plural forms.
Use this to look up a language's ISO code before enabling it in a project with lokalise_create_languages.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of languages to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_tasks',
    description: `List all tasks in a Lokalise project, optionally filtered by title text or task status.
Returns each task's ID, title, type, status, progress, due date, and per-language assignment and progress details.
Use this to browse existing tasks or find a task ID before running lokalise_get_task, lokalise_update_task, or lokalise_delete_task.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose tasks you want to list.`,
      },
      {
        name: 'filter_statuses',
        type: 'string',
        required: false,
        description: `One or more task statuses to filter by, separated by commas if multiple. Valid values are created, queued, in_progress, and completed.`,
      },
      {
        name: 'filter_title',
        type: 'string',
        required: false,
        description: `Only return tasks whose title contains this text.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of tasks to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, starting at 1.`,
      },
    ],
  },
  {
    name: 'lokalise_list_team_groups',
    description: `List all user groups defined in a Lokalise team.
Returns each group's ID, name, permissions (admin/reviewer rights and per-language write access), member IDs, and the projects it's linked to.
Use this to browse a team's groups or find a group ID before assigning translators to a task by group in lokalise_create_task or lokalise_update_task.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the Lokalise team whose user groups you want to list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of groups to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, starting at 1.`,
      },
    ],
  },
  {
    name: 'lokalise_list_team_users',
    description: `List all users belonging to a Lokalise team, with pagination.
Returns each member's user ID, email, full name, role, and creation date.
Use this to browse team membership or find a user ID before viewing, updating, or removing a specific member with the other team user tools.
Requires Admin role in the team and a team ID from lokalise_list_teams.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team whose users you want to list. Find it via lokalise_list_teams.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of team users to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_teams',
    description: `List all Lokalise teams accessible to your API token, with pagination.
Returns each team's ID, name, plan, creation date, and quota usage and limits (users, keys, projects, MAU).
Use this to browse available teams or look up a team ID before running other Lokalise tools that operate on a specific team.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of teams to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_translation_memories',
    description: `List the translation memories enabled for a Lokalise project.
Returns each translation memory's ID and name.
Use this to find a translation memory's ID, or to check which memories are attached to a project before working with its translations.
Requires a project ID from lokalise_list_projects.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose translation memories you want to list. Find it via lokalise_list_projects.`,
      },
    ],
  },
  {
    name: 'lokalise_list_translation_providers',
    description: `List all translation service providers configured for a Lokalise team, with pagination.
Returns each provider's ID, name, and supported pricing tiers.
Use this to browse available providers or find a provider ID before retrieving its full details with lokalise_get_translation_provider.
Requires a team ID from lokalise_list_teams.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team whose translation providers you want to list. Find it via lokalise_list_teams.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of providers to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_list_translations',
    description: `List translation items in a Lokalise project, ungrouped, optionally filtered by language, review or verification status, QA issues, or task.
Returns the project ID and an array of translation objects, each with its translation ID, key ID, language, content, and status flags.
Use this to browse or bulk-inspect translations across a project. Use lokalise_get_translation to fetch a single translation by its ID.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to list translations from. Find it with lokalise_list_projects.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor value to resume cursor-based pagination. Lokalise returns the nextCursor value in an HTTP response header, not in the response body — as of this writing, Scalekit's tool-execution runtime does not surface response headers back to the caller, so cursor-based pagination cannot currently be completed end-to-end through this tool. Prefer offset pagination (limit/page) instead; only set this if you have obtained a cursor value some other way.`,
      },
      {
        name: 'disable_references',
        type: 'integer',
        required: false,
        description: `Whether to disable resolving key references inside translation content. Use 1 to disable references, or 0 to keep them resolved.`,
      },
      {
        name: 'filter_active_task_id',
        type: 'integer',
        required: false,
        description: `Return only translations that are part of the task with this numeric task ID.`,
      },
      {
        name: 'filter_is_reviewed',
        type: 'integer',
        required: false,
        description: `Filter translations by their reviewed flag. Use 1 to return only reviewed translations, or 0 for unreviewed ones.`,
      },
      {
        name: 'filter_lang_id',
        type: 'integer',
        required: false,
        description: `Return translations only for the language with this numeric language ID.`,
      },
      {
        name: 'filter_qa_issues',
        type: 'string',
        required: false,
        description: `Comma-separated list of QA issue types to filter by. Valid values: spelling_and_grammar, placeholders, html, url_count, url, email_count, email, brackets, numbers, leading_whitespace, trailing_whitespace, double_space, special_placeholder, unbalanced_brackets.`,
      },
      {
        name: 'filter_untranslated',
        type: 'integer',
        required: false,
        description: `Filter by whether the key is untranslated for the given language. Use 1 to return only untranslated items, or 0 for translated ones.`,
      },
      {
        name: 'filter_unverified',
        type: 'integer',
        required: false,
        description: `Filter translations by their unverified flag. Use 1 to return only unverified translations, or 0 for verified ones.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of translations to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based). Only applies when Pagination Type is 'offset'.`,
      },
      {
        name: 'pagination',
        type: 'string',
        required: false,
        description: `Pagination strategy to use. 'offset' (the default) supports page numbers and total result counts. 'cursor' is optimized for large datasets but only supports paging forward via a returned cursor value.`,
      },
    ],
  },
  {
    name: 'lokalise_list_webhooks',
    description: `List all webhooks configured on a Lokalise project.
Returns each webhook's ID, URL, branch scope, secret, subscribed events, and any per-event language mappings.
Use this to see what webhooks already exist, or to find a webhook_id before running lokalise_get_webhook, lokalise_update_webhook, or lokalise_delete_webhook.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project whose webhooks should be listed.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of webhooks to return in a single page of results (maximum 5000).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return (1-based).`,
      },
    ],
  },
  {
    name: 'lokalise_regenerate_webhook_secret',
    description: `Regenerate the signing secret for an existing webhook on a Lokalise project.
Returns the project ID and the new webhook secret.
Use this when you suspect a webhook's secret has been compromised or need to rotate it; the previous secret stops working immediately and any signature verification on your endpoint must be updated to use the new one.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the webhook belongs to.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the webhook whose secret should be regenerated.`,
      },
    ],
  },
  {
    name: 'lokalise_remove_members_from_group',
    description: `Remove one or more team members from a user group in a Lokalise team, revoking the group's permissions and project access from them.
Returns the group's updated details, including its remaining member user IDs.
Use this to take contributors out of a group without deleting the group itself. Use lokalise_add_members_to_group to add members instead.
Requires Admin rights in the team.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to remove members from.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
      {
        name: 'users',
        type: 'array',
        required: true,
        description: `List of numeric user IDs to remove from the group. Find a team member's user ID on the team members page in Lokalise.`,
      },
    ],
  },
  {
    name: 'lokalise_remove_projects_from_group',
    description: `Remove one or more projects from a user group in a Lokalise team, revoking the group's members' access to those projects.
Returns the group's updated details, including its remaining assigned projects.
Use this to revoke a group's access to specific projects. Use lokalise_add_projects_to_group to grant access instead.
Requires Admin rights in the team.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to remove projects from.`,
      },
      {
        name: 'projects',
        type: 'array',
        required: true,
        description: `List of project IDs to remove from the group. Use the project ID string shown in each project's settings (e.g. 598901215bexxx43dcba74.xxx), not the project name.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
    ],
  },
  {
    name: 'lokalise_restore_snapshot',
    description: `Restore a Lokalise snapshot into a new project, seeded with the snapshot's saved keys, translations, and settings, inside the same team as the original project.
Returns the newly created project's full details, including its own (different) project ID, name, settings, and translation-progress statistics — this does NOT overwrite the original project in place (confirmed live: the response's project_id differs from the input project_id, and the new project is named "<original name> copy").
Use this to recover a snapshot's content into a fresh project when you don't want to touch the original; then use lokalise_delete_project on the original if you intended a true rollback, or on the new copy if you were just inspecting the snapshot.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the snapshot's original Lokalise project. The restored content is created as a new project alongside this one, not written back into it.`,
      },
      {
        name: 'snapshot_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the snapshot to restore, from lokalise_create_snapshot or the project's snapshot list. Restoring creates a brand-new project (named "<original name> copy") seeded with this snapshot's saved keys, translations, and settings — the original project is left untouched.`,
      },
    ],
  },
  {
    name: 'lokalise_update_billing_details',
    description: `Update the billing and invoicing contact details for a Lokalise team, such as company name, mailing address, and VAT number.
Returns the full billing details object as saved, including billing email, country code, and postal code.
Use this to keep invoicing information current before purchasing translation orders or upgrading a plan.
Requires the team's numeric ID from lokalise_list_teams or lokalise_get_team.`,
    params: [
      {
        name: 'billing_email',
        type: 'string',
        required: true,
        description: `Email address that will receive invoices and translation-order receipts for this team.`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `Country of the billing address, as an ISO 3166-1 alpha-2 code (two letters, e.g. US, LV, DE). If this is US, state_code is also required.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team whose billing details you are updating. Find it via lokalise_list_teams or lokalise_get_team.`,
      },
      {
        name: 'zip',
        type: 'string',
        required: true,
        description: `Postal or ZIP code for the billing address, valid for the given country.`,
      },
      {
        name: 'address1',
        type: 'string',
        required: false,
        description: `First line of the billing street address.`,
      },
      {
        name: 'address2',
        type: 'string',
        required: false,
        description: `Second line of the billing street address (suite, unit, etc.).`,
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: `City for the billing address.`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company or organization name to appear on invoices.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Phone number associated with the billing contact.`,
      },
      {
        name: 'state_code',
        type: 'string',
        required: false,
        description: `State or region code for the billing address. Required when country_code is US (e.g. CA for California); otherwise leave blank.`,
      },
      {
        name: 'vatnumber',
        type: 'string',
        required: false,
        description: `VAT registration number for the company, if applicable.`,
      },
    ],
  },
  {
    name: 'lokalise_update_contributor',
    description: `Update an existing contributor's permission role, language access, and admin rights in a Lokalise project.
Returns the updated contributor object, including their admin/reviewer flags, permission role, assigned languages, and admin rights.
Use this to change what an existing contributor can access. Use lokalise_delete_contributor to remove a contributor instead of adjusting their permissions.
Requires the contributor ID; look it up with lokalise_get_contributor if you don't already have it.`,
    params: [
      {
        name: 'contributor_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the contributor to update.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the contributor belongs to.`,
      },
      {
        name: 'admin_rights',
        type: 'array',
        required: false,
        description: `Custom list of granular permissions to grant the contributor, ignored if role_id is also provided. Valid values: activity, contributors, create_branches, download, glossary, keys, languages, screenshots, settings, statistics, tasks, upload.`,
      },
      {
        name: 'is_admin',
        type: 'boolean',
        required: false,
        description: `Whether the contributor has admin access to the project. Deprecated in favor of role_id/admin_rights, but still accepted for backward compatibility.`,
      },
      {
        name: 'is_reviewer',
        type: 'boolean',
        required: false,
        description: `Whether the contributor has reviewer access to the project. Deprecated in favor of role_id/admin_rights, but still accepted for backward compatibility.`,
      },
      {
        name: 'languages',
        type: 'array',
        required: false,
        description: `Full list of languages the contributor may access, each with a language code and whether they can write to it. Example: [{"lang_iso": "en", "is_writable": true}, {"lang_iso": "ru", "is_writable": false}].`,
      },
      {
        name: 'role_id',
        type: 'integer',
        required: false,
        description: `Permission template ID to derive the contributor's permissions from: 1=Manager, 2=Developer, 3=Content creator, 4=Reviewer, 5=Translator. When set, this takes precedence and admin_rights is ignored.`,
      },
    ],
  },
  {
    name: 'lokalise_update_custom_status',
    description: `Update the title or color of an existing custom translation status in a Lokalise project.
Returns the updated status's ID, title, and hex color.
Use this to rename a status or change its display color rather than creating a new one.
Requires the status ID; look it up with lokalise_list_custom_statuses if you don't already have it.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the custom translation status belongs to.`,
      },
      {
        name: 'status_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the custom translation status to update.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `New hex color code used to display this status in the Lokalise editor, e.g. #ff9f1a.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the custom translation status, shown to translators and reviewers.`,
      },
    ],
  },
  {
    name: 'lokalise_update_glossary_terms',
    description: `Update one or more existing glossary terms in a Lokalise project, changing their text, description, flags, translations, or tags.
Returns the updated term objects along with counts of how many were updated, plus any per-term errors.
Use lokalise_list_glossary_terms first to find each term's id; only the fields you supply for a term are changed.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project whose glossary terms you want to update. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'terms',
        type: 'array',
        required: true,
        description: `Array of glossary term objects to update. Each object must include the existing numeric id, plus any of the fields to change: term (the term text), description, caseSensitive, translatable, and forbidden (all booleans/strings), an optional translations array of {langId, translation, description} entries for per-language overrides, and an optional tags array of strings. Only the fields you include are changed. Example: [{"id": 1234, "term": "checkout", "description": "The action of completing a purchase.", "caseSensitive": true, "translatable": false, "forbidden": false, "tags": ["ecommerce"]}]`,
      },
    ],
  },
  {
    name: 'lokalise_update_key',
    description: `Update an existing translation key's name, description, platform assignment, filenames, tags, or plural/hidden/archived flags in a Lokalise project.
Returns the updated key object, including its metadata and its current translations for every project language.
Use this to change one key's properties. Use lokalise_bulk_update_keys to update several keys in one call, or lokalise_delete_key to remove a key.
Requires a key_id — find one with lokalise_list_keys or lokalise_get_key first.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the key to update.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the key. Find it with lokalise_list_projects.`,
      },
      {
        name: 'char_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of characters allowed in translations for this key.`,
      },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `Optional context string for this key, used by some file formats to disambiguate identical source strings.`,
      },
      {
        name: 'custom_attributes',
        type: 'string',
        required: false,
        description: `JSON-encoded string of custom key attribute values previously defined for this project's custom key attribute schema.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text description of what the key is used for, shown to translators for context.`,
      },
      {
        name: 'filenames',
        type: 'object',
        required: false,
        description: `Per-platform filename overrides for this key, used by some export file formats. Provide any of the ios, android, web, or other attributes you want to set.`,
      },
      {
        name: 'is_archived',
        type: 'boolean',
        required: false,
        description: `Whether this key is archived. Archived keys are excluded from most exports.`,
      },
      {
        name: 'is_hidden',
        type: 'boolean',
        required: false,
        description: `Whether this key is hidden from non-admin translators.`,
      },
      {
        name: 'is_plural',
        type: 'boolean',
        required: false,
        description: `Whether this key has plural translation forms.`,
      },
      {
        name: 'key_name',
        type: 'string',
        required: false,
        description: `New identifier/name for the key. For projects with per-platform key names enabled, pass a JSON-encoded string containing ios, android, web, and other string attributes instead of a plain name.`,
      },
      {
        name: 'merge_tags',
        type: 'boolean',
        required: false,
        description: `When true, the tags provided are merged with the key's current tags instead of replacing them. Only used when tags is also provided.`,
      },
      {
        name: 'platforms',
        type: 'array',
        required: false,
        description: `List of platforms this key is enabled for. Valid values are android, ios, web, and other.`,
      },
      {
        name: 'plural_name',
        type: 'string',
        required: false,
        description: `Custom plural name for this key, used by some file formats. Only meaningful when is_plural is true.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `List of tags to associate with this key. By default this replaces the key's existing tags unless merge_tags is set.`,
      },
    ],
  },
  {
    name: 'lokalise_update_key_segment',
    description: `Update the translation value, fuzzy flag, reviewed flag, or custom status of a specific segment for a key in a Lokalise project.
Returns the updated segment object, including its new translation text and status flags.
Use this to correct or approve one translation segment; use lokalise_list_key_segments to find the segment_number first, and lokalise_get_key_segment to inspect its current value.`,
    params: [
      {
        name: 'key_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the translation key the segment belongs to.`,
      },
      {
        name: 'language_iso',
        type: 'string',
        required: true,
        description: `The ISO language code of the segment to update (e.g. en, en_US, fr_FR).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the key.`,
      },
      {
        name: 'segment_number',
        type: 'integer',
        required: true,
        description: `The 1-based number identifying which segment to update (a key has more than one segment when it uses plural forms).`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The new translation text for this segment. For plural keys, provide the appropriate plural form's text as a plain string for this segment number.`,
      },
      {
        name: 'custom_translation_status_ids',
        type: 'array',
        required: false,
        description: `Custom translation status IDs to assign to this segment's translation. Providing this list replaces any custom statuses currently assigned.`,
      },
      {
        name: 'is_fuzzy',
        type: 'boolean',
        required: false,
        description: `Whether to mark this segment's translation as fuzzy (shown as "Unverified" in the Lokalise editor).`,
      },
      {
        name: 'is_reviewed',
        type: 'boolean',
        required: false,
        description: `Whether to mark this segment's translation as reviewed.`,
      },
    ],
  },
  {
    name: 'lokalise_update_language',
    description: `Update a project language's ISO/locale code, display name, or supported plural forms in a Lokalise project.
Returns the updated language object with its current ISO code, name, and plural forms.
Use this to change one language's settings. Use lokalise_list_project_languages to find its lang_id first, or lokalise_delete_language to remove a language.`,
    params: [
      {
        name: 'lang_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the language to update.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the language. Find it with lokalise_list_projects.`,
      },
      {
        name: 'lang_iso',
        type: 'string',
        required: false,
        description: `New ISO/locale code for this language.`,
      },
      {
        name: 'lang_name',
        type: 'string',
        required: false,
        description: `New display name for this language.`,
      },
      {
        name: 'plural_forms',
        type: 'array',
        required: false,
        description: `New list of supported plural forms for this language, e.g. one, few, many, other.`,
      },
    ],
  },
  {
    name: 'lokalise_update_project',
    description: `Update an existing Lokalise project's name and/or description.
Returns the full updated project object, including its type, team, base language, settings, and statistics.
Use this to rename a project or change its description. Use lokalise_update_project_settings-style tools (if available) or the project's settings UI for other configuration changes.
Requires the project's ID — look it up with lokalise_list_projects or lokalise_get_project first.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the project. Required by the API even when only changing the description. Example: 'TheZapp Project'.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project to update. Example: '3002780358964f9bab5a92.87762498'.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the project. Leave blank to leave the description unchanged.`,
      },
    ],
  },
  {
    name: 'lokalise_update_screenshot',
    description: `Update the title, description, tags, or key associations of an existing screenshot in a Lokalise project. Requires the Manage screenshots admin right.
Returns the updated screenshot object.
Use this to relabel a screenshot or change which translation keys it is attached to; use lokalise_create_screenshots to upload a new screenshot instead.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project that owns the screenshot.`,
      },
      {
        name: 'screenshot_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the screenshot to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description to set for the screenshot.`,
      },
      {
        name: 'key_ids',
        type: 'array',
        required: false,
        description: `Translation key IDs to attach this screenshot to, replacing any keys it was previously linked to.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags to associate with the screenshot, replacing any existing tags.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title to set for the screenshot.`,
      },
    ],
  },
  {
    name: 'lokalise_update_task',
    description: `Update the title, description, due date, language assignments, or closing behavior of an existing task in a Lokalise project.
Returns the updated task's full details, including its status, progress, and assigned languages.
Use this to reassign translators, extend a deadline, or close a task or language; use lokalise_create_task to make a new task instead.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project the task belongs to.`,
      },
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The unique numeric identifier of the task to update.`,
      },
      {
        name: 'auto_close_items',
        type: 'boolean',
        required: false,
        description: `Whether translation task items should be automatically marked complete when edited. Must be true or omitted for the automatic_translation and lqa_by_ai task types.`,
      },
      {
        name: 'auto_close_languages',
        type: 'boolean',
        required: false,
        description: `Whether each language in the task should close automatically once its last item is completed. Must be true or omitted for the automatic_translation and lqa_by_ai task types.`,
      },
      {
        name: 'auto_close_task',
        type: 'boolean',
        required: false,
        description: `Whether the whole task should close automatically once every language is complete. Must be true or omitted for the automatic_translation and lqa_by_ai task types.`,
      },
      {
        name: 'close_task',
        type: 'boolean',
        required: false,
        description: `Set to true to close the whole task and notify assignees. This cannot be undone — the task cannot be reopened afterward.`,
      },
      {
        name: 'closing_tags',
        type: 'array',
        required: false,
        description: `Tags to add to affected keys once the task closes.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the task. For automatic_translation and lqa_by_ai task types, this text is also used as instructions for the AI.`,
      },
      {
        name: 'do_lock_translations',
        type: 'boolean',
        required: false,
        description: `If true, locks translations for project members not assigned to this task.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `New due date and time for the task, in "Y-m-d H:i:s" format (project's timezone).`,
      },
      {
        name: 'languages',
        type: 'array',
        required: false,
        description: `Language assignments to update on the task. Each entry identifies a language already on the task by language_iso, and can update its users (user IDs), groups (user-group IDs), and/or set close_language to true to close that language and notify assignees (this cannot be undone). This field must be omitted entirely for the automatic_translation and lqa_by_ai task types. Example: [{"language_iso": "fi", "users": ["421"]}, {"language_iso": "ru", "close_language": true}].`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the task.` },
    ],
  },
  {
    name: 'lokalise_update_team_group',
    description: `Update an existing user group in a Lokalise team, replacing its name, permission-template role or admin rights, and which languages it can view or contribute to.
Returns the updated group's ID, name, permissions, and team ID.
Use this to change a group's settings after creation. Use lokalise_add_projects_to_group or lokalise_add_members_to_group to manage its project and member assignments instead.
Requires Admin rights in the team, and always resends name, Is Reviewer, and Is Admin since this is a full replace of the group's settings, not a partial patch.`,
    params: [
      {
        name: 'group_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the group to update.`,
      },
      {
        name: 'is_admin',
        type: 'boolean',
        required: true,
        description: `Whether members of this group have Admin access to assigned projects. Lokalise's own documentation states this should override the languages fields below, but in practice the API still rejects the request without them (verified live) — always supply non-empty Reference and Contributable Languages regardless of this value. Also note (verified live): when role_id is set (or certain admin_rights combinations are used), the response's permissions.is_admin/is_reviewer can come back true even though this field was sent as false — the API appears to derive the effective admin/reviewer status from the resulting permission set rather than echoing back exactly what was submitted. Treat this field as a write-only input, not a value you can read back unchanged from the response.`,
      },
      {
        name: 'is_reviewer',
        type: 'boolean',
        required: true,
        description: `Whether members of this group have reviewer access to assigned projects (legacy permission flag, superseded by role_id/admin_rights on newer Lokalise plans but still required by this endpoint).`,
      },
      {
        name: 'languages_contributable',
        type: 'array',
        required: true,
        description: `Language IDs the group can translate into. Always required by the live API — must be a non-empty array even when Is Admin is true (Lokalise's documentation says Is Admin overrides this, but the API rejects an empty or omitted value regardless; verified live).`,
      },
      {
        name: 'languages_reference',
        type: 'array',
        required: true,
        description: `Language IDs the group can view but not translate into (read-only reference languages). Always required by the live API — must be a non-empty array even when Is Admin is true (Lokalise's documentation says Is Admin overrides this, but the API rejects an empty or omitted value regardless; verified live).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the group, shown in the Lokalise team members list.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the group belongs to.`,
      },
      {
        name: 'admin_rights',
        type: 'array',
        required: false,
        description: `Explicit list of permission strings to grant this group when no role_id template is used. Documented values include activity, contributors, branches_create, branches_main_modify, branches_merge, custom_status_modify, download, glossary, glossary_edit, glossary_delete, keys, manage_languages, review, screenshots, settings, statistics, tasks, and upload. Note (verified live): 'glossary' is accepted by this endpoint's schema but silently dropped from the response — the group's stored admin_rights end up empty when only 'glossary' is requested — so treat glossary-related permissions as unsupported for groups even though they are documented as valid values here.`,
      },
      {
        name: 'role_id',
        type: 'integer',
        required: false,
        description: `Numeric ID of a permission template to copy this group's permissions from. When set, it takes precedence over the Admin Rights field. Valid values: 1=Manager (manage project settings, contributors and tasks), 2=Developer (create keys, upload and download content), 3=Content creator (create, translate and edit keys, manage screenshots), 4=Reviewer (translate keys, control key statuses), 5=Translator (translate keys).`,
      },
    ],
  },
  {
    name: 'lokalise_update_team_user',
    description: `Change the role of an existing user on a Lokalise team.
Returns the updated team user object including their new role.
Use this to promote or demote a team member between owner, admin, member, and biller roles.
Requires Admin role in the team and a user ID from lokalise_list_team_users.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `New role to assign to the user. One of owner, admin, member, or biller.`,
      },
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Lokalise team the user belongs to. Find it via lokalise_list_teams.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the team user whose role you want to change. Find it via lokalise_list_team_users.`,
      },
    ],
  },
  {
    name: 'lokalise_update_translation',
    description: `Update a translation's content, review/unverified flags, or assigned custom translation statuses in a Lokalise project.
Returns the updated translation object with its current content, status flags, word count, and metadata.
Use this to edit a single translation. Use lokalise_list_translations or lokalise_get_translation to find a translation_id first.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project containing the translation. Find it with lokalise_list_projects.`,
      },
      {
        name: 'translation',
        type: 'string',
        required: true,
        description: `The new translation content. For plural keys, pass a JSON-encoded object mapping each plural form to its text instead of a plain string.`,
      },
      {
        name: 'translation_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the translation to update.`,
      },
      {
        name: 'custom_translation_status_ids',
        type: 'array',
        required: false,
        description: `List of custom translation status IDs to assign to this translation. Replaces any statuses currently assigned. Find valid IDs with lokalise_list_custom_statuses.`,
      },
      {
        name: 'is_reviewed',
        type: 'boolean',
        required: false,
        description: `Whether the Reviewed flag should be enabled for this translation.`,
      },
      {
        name: 'is_unverified',
        type: 'boolean',
        required: false,
        description: `Whether the Unverified flag should be enabled for this translation.`,
      },
    ],
  },
  {
    name: 'lokalise_update_webhook',
    description: `Update an existing webhook's URL, branch scope, subscribed events, or language mappings on a Lokalise project.
Returns the updated webhook's ID, URL, secret, subscribed events, and any per-event language mappings.
Use this to change an existing webhook's settings; only the fields you provide are changed, so leave the rest blank to keep their current values.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Lokalise project the webhook belongs to.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the webhook to update.`,
      },
      {
        name: 'branch',
        type: 'string',
        required: false,
        description: `Limit the webhook to a specific project branch. Leave blank to keep its current branch scope, or pass an empty value to apply it to all branches.`,
      },
      {
        name: 'event_lang_map',
        type: 'array',
        required: false,
        description: `Replacement mapping restricting specific events to certain languages. Each entry pairs one event name with a list of language ISO codes; only project.translation.updated and project.translation.proofread support this mapping. Leave blank to keep the current mapping.`,
      },
      {
        name: 'events',
        type: 'array',
        required: false,
        description: `Replacement list of event names this webhook should fire for, for example project.translation.updated or project.key.added. Leave blank to keep the current list of subscribed events. Note: Lokalise automatically adds a plural alias alongside some singular event names once a webhook is created (e.g. subscribing to project.key.added also shows project.keys.added on read-back) — both forms are accepted here so a list read from lokalise_get_webhook can always be resent as-is.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `New HTTPS endpoint that should receive the webhook's POST payloads. Leave blank to keep the current URL. Lokalise validates this URL synchronously at update time by making a live request to it and requires a 200 response, so it must already be reachable and responding correctly (a placeholder or non-responsive URL will fail).`,
      },
    ],
  },
  {
    name: 'lokalise_upload_file',
    description: `Upload a file to a Lokalise project for import, sending its content as a base64-encoded string alongside its filename and language code.
Returns a queued process object with a process ID and status, or the completed process details if the import finishes immediately.
Use this to bulk-import or update translations from a file instead of creating or editing keys one at a time.`,
    params: [
      {
        name: 'data',
        type: 'string',
        required: true,
        description: `Base64-encoded content of the file to import. Must be one of Lokalise's supported file types (e.g. JSON, XLIFF, .strings, .properties). Encode the raw file bytes as base64 before calling this tool.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Filename to assign to the uploaded file. May optionally include a relative path (e.g. admin/main.json); the path becomes part of the file's unique identity.`,
      },
      {
        name: 'lang_iso',
        type: 'string',
        required: true,
        description: `Language code (ISO) of the translations contained in the uploaded file, matching a language already added to the project.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Lokalise project to upload the file into. Example: 3002780358964f9bab5a92.87762498.`,
      },
      {
        name: 'apply_tm',
        type: 'boolean',
        required: false,
        description: `Whether to automatically apply 100% translation-memory matches to untranslated content. Takes priority over use_automations when both are enabled.`,
      },
      {
        name: 'cleanup_mode',
        type: 'boolean',
        required: false,
        description: `Whether to delete every key (and its translations in all languages) that is not present in the uploaded file. Consider taking a project snapshot before enabling this.`,
      },
      {
        name: 'convert_placeholders',
        type: 'boolean',
        required: false,
        description: `Whether to automatically convert placeholders in the file to Lokalise's universal placeholder syntax. Defaults to true; set to false to preserve the original placeholder syntax as-is.`,
      },
      {
        name: 'custom_translation_status_ids',
        type: 'array',
        required: false,
        description: `Custom translation status IDs to attach to translations created or updated by this import.`,
      },
      {
        name: 'custom_translation_status_inserted_keys',
        type: 'boolean',
        required: false,
        description: `Whether to apply the given custom translation statuses to newly inserted keys.`,
      },
      {
        name: 'custom_translation_status_skipped_keys',
        type: 'boolean',
        required: false,
        description: `Whether to apply the given custom translation statuses to skipped keys.`,
      },
      {
        name: 'custom_translation_status_updated_keys',
        type: 'boolean',
        required: false,
        description: `Whether to apply the given custom translation statuses to updated keys.`,
      },
      {
        name: 'detect_icu_plurals',
        type: 'boolean',
        required: false,
        description: `Whether to automatically detect and parse ICU-formatted plurals found in the translations being imported.`,
      },
      {
        name: 'distinguish_by_file',
        type: 'boolean',
        required: false,
        description: `Whether to allow keys with the same name to coexist as separate keys when they are assigned to different filenames.`,
      },
      {
        name: 'filter_task_id',
        type: 'number',
        required: false,
        description: `Apply the import results as part of an existing task. Only available for the offline_xliff file format.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `File format override, expressed as a supported file extension (e.g. json, strings, xml). Normally inferred from the filename.`,
      },
      {
        name: 'hidden_from_contributors',
        type: 'boolean',
        required: false,
        description: `Whether to mark newly created keys as hidden from contributors.`,
      },
      {
        name: 'keys_to_values',
        type: 'boolean',
        required: false,
        description: `Whether to automatically replace each key's translation value with the key name itself.`,
      },
      {
        name: 'replace_metadata',
        type: 'boolean',
        required: false,
        description: `Structured JSON only. Whether to replace key metadata (tags, notes, character limit) with the values from the uploaded file. Manually-added tags are preserved; only tags previously set by a file upload are replaced.`,
      },
      {
        name: 'replace_modified',
        type: 'boolean',
        required: false,
        description: `Whether to overwrite translations that have been modified since they were last exported, using the values from the uploaded file.`,
      },
      {
        name: 'skip_detect_lang_iso',
        type: 'boolean',
        required: false,
        description: `Whether to skip automatic language detection based on the filename.`,
      },
      {
        name: 'slashn_to_linebreak',
        type: 'boolean',
        required: false,
        description: `Whether to replace literal \\n sequences in the imported content with real line breaks.`,
      },
      {
        name: 'tag_inserted_keys',
        type: 'boolean',
        required: false,
        description: `Whether to add the given tags to newly inserted keys.`,
      },
      {
        name: 'tag_parsed_keys',
        type: 'boolean',
        required: false,
        description: `Whether to add tags parsed from the uploaded file itself (e.g. structured-JSON per-key tags) to the corresponding keys.`,
      },
      {
        name: 'tag_skipped_keys',
        type: 'boolean',
        required: false,
        description: `Whether to add the given tags to keys that were skipped during import.`,
      },
      {
        name: 'tag_updated_keys',
        type: 'boolean',
        required: false,
        description: `Whether to add the given tags to keys that already existed and were updated.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags to apply to keys created or updated by this import.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Human-readable title for the uploaded file shown in the UI instead of the filename. Maximum 256 characters. Relevant for Marketing and Support (M&S) project types only.`,
      },
      {
        name: 'use_automations',
        type: 'boolean',
        required: false,
        description: `Whether to run the project's configured automations for this upload.`,
      },
    ],
  },
]
