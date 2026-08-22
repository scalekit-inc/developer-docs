import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'webflowmcp_ask_webflow_ai',
    description: `Ask Webflow AI any question about the Webflow API and get a direct answer.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Your question about the Webflow API.`,
      },
    ],
  },
  {
    name: 'webflowmcp_asset_tool',
    description: `Designer Tool - Upload an image from a publicly accessible URL as a Webflow asset. Other asset and folder management is handled by data_assets_tool.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_component_builder',
    description: `Insert component instances onto the current active page into an element or a component instance slot.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_agent_instructions_tool',
    description: `Data tool - Manage agent instructions (rules and skills) for a site. Actions: search_instructions, read_instruction, create_instruction, update_instruction, delete_instruction, move_instruction. Paths must follow 'rules/<name>.md', 'rules/<name>.mdc', or '<skill-name>/SKILL.md'.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_analyze_tool',
    description: `Read Webflow Analyze report data for a site, including traffic timeseries, ranked pages, ranked dimensions, ranked engagement events, and aggregate or bucketed time on page. Includes guide actions for building Analyze queries and resolving engagement event rows to page elements, component instances, and CMS context.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_assets_tool',
    description: `Data tool - Manage Webflow site assets and asset folders via the Data API. Creates asset metadata entries and returns presigned S3 upload information (uploadUrl and uploadDetails) used to upload the file bytes, and supports listing, updating, organizing, and deleting assets and asset folders, plus compressing image assets to webp or avif via async tasks.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_cms_tool',
    description: `Data tool - CMS tool to manage collections, collection fields (static/option/reference), collection field groups, and collection items (list, create, update, publish, unpublish, delete)`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_comments_tool',
    description: `Manage Webflow Designer comments — list threads by page, filter by resolution status or date, search comment authors, and reply to existing threads.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_component_builder',
    description: `Data Tool - Component builder to insert component instances on a page via the public-mcp headless surface. Supports inserting into an element (insert_in_element) or into a component instance's slot (insert_in_slot), with recursive nested-component trees via component_schema.slots.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Component insertion actions executed sequentially.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id that exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_component_props_tool',
    description: `Data tool - Component props tool to manage prop definitions and set or reset prop values on component instances.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_component_tool',
    description: `Data tool - Component tool to manage component definitions and instances: create, query, transform, insert, unlink.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_component_variants_tool',
    description: `Data tool - Component variants tool to manage variants and per-variant style overrides.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_element_builder',
    description: `Data Tool - Element builder to create elements on a page via the public-mcp headless surface.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Element creation actions executed sequentially. Each item creates one element at the requested position.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id that exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_element_settings_tool',
    description: `Read and write element settings and data bindings on a Webflow page: get or set settings, discover bindable sources, and set tag, visibility, and DOM id via static values or prop bindings.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Webflow page ID. Use list_pages to discover page IDs.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_element_tool',
    description: `Inspect and modify elements on a Webflow page: query the element tree, move or remove elements, and edit text, styles, links, images, heading levels, attributes, and display names.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Webflow page ID. Use list_pages to discover page IDs.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_enterprise_tool',
    description: `Manage enterprise-tier Webflow settings including 301 redirects and robots.txt. Requires an Enterprise workspace plan.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_fonts_tool',
    description: `Data tool - Manage a site's uploaded custom fonts: list and inspect them, register new fonts and replace their files (a two-step upload flow), update font metadata, and remove fonts individually or in batches.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_forms_tool',
    description: `Data tool - Read forms and manage form submissions on a site. Actions: list_forms, get_form, list_site_form_submissions, list_form_submissions, get_form_submission, update_form_submission, delete_form_submission.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_localization_tool',
    description: `Localize Webflow pages and components into secondary locales by reading and updating static content.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_pages_tool',
    description: `Data tool - Pages tool to perform actions like list pages, get page metadata, update page settings, create a page, bulk update page settings, manage branches and their staging previews (branch actions require the site's workspace to be on an Enterprise plan), and read or write JSON-LD schema markup for pages in bulk.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_scripts_tool',
    description: `Data tool - Scripts tool to manage custom code scripts. Register, apply, update, and remove scripts at the site or page level, and read or write freeform head/footer custom code blocks.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_sitemap_tool',
    description: `Data tool - Manage sitemap indexing status for CMS collection items and static pages. Read and update whether pages and collection items appear in a site's generated sitemap. All endpoints are under the /beta namespace. Folder pages, collection template pages, and utility pages are not supported for page endpoints.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_sites_tool',
    description: `Data tool - Sites tool to perform actions like list sites, get site details, and publish sites`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_style_tool',
    description: `Data Tool - Style tool to perform actions like get all styles, create a new style, update a style, query styles, remove a style, and manage style variable modes`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_variable_tool',
    description: `Data Tool - Variable tool to perform actions like create variable, get all variables, query variables, update variable, rename and delete variables, and reorder variable collections.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_webhook_tool',
    description: `Data tool - Webhook tool to perform actions like list webhooks, create webhooks, get webhook details, and delete webhooks for a Webflow site.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
    ],
  },
  {
    name: 'webflowmcp_data_whtml_builder',
    description: `Data Tool - WHTML builder to insert elements from HTML and CSS strings on a page via the public-mcp headless surface. Accepts HTML markup and optional raw CSS rules, constructs WHTML, and inserts it into a parent element.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `WHTML insertion actions executed sequentially. Each item inserts one HTML/CSS fragment at the requested position.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'pageId',
        type: 'string',
        required: true,
        description: `Any valid page id that exists in the site`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_de_component_tool',
    description: `Designer tool - Component tool to perform actions like create component instances, get all components and more.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_de_page_tool',
    description: `Manage Designer pages — create pages and folders, switch pages, open components, and inspect branch and mode state.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_designer_tool',
    description: `Interact with the user's live Webflow Designer session — select an element on the canvas or read which element is currently selected, navigate the canvas between pages and component canvases, switch to or read the current page, list a page's branches, read the current branch ID, parent page ID, and Designer mode, enter, exit, or inspect the current component view, and read all breakpoints (media queries) configured for the site.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Executed sequentially. Each item must include label and exactly one action property.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `Webflow site ID. Discover with list_sites.`,
      },
    ],
  },
  {
    name: 'webflowmcp_element_builder',
    description: `Designer Tool - Element builder to create element on current active page.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_element_snapshot_tool',
    description: `Capture a visual snapshot of a Designer element for debugging and visual feedback.`,
    params: [
      { name: 'action', type: 'object', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_element_tool',
    description: `Designer Tool - Element tool to perform actions like get all elements, get selected element, select element on current active page. and more`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_get_asset_preview',
    description: `Get an image preview of a site asset by its asset ID. Fetches the asset's metadata, downloads the smallest available image variant (or the original file when no variants exist), and returns the image content. Works with any image content type (e.g. JPG, PNG, GIF, WEBP); non-image files and files larger than 2 MB return an error instead of an image. Returns a 404 error if the asset does not exist or has been deleted.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The asset ID to preview. Discover asset IDs via data_assets_tool > list_assets.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Description of what the user is trying to accomplish, used to select the right action.`,
      },
    ],
  },
  {
    name: 'webflowmcp_get_image_preview',
    description: `Designer Tool - Get image preview from url. this is helpful to get image preview from url. Only supports JPG, PNG, GIF, WEBP, WEBP and AVIF formats.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the image to get the preview from`,
      },
    ],
  },
  {
    name: 'webflowmcp_get_more_tools',
    description: `Check for additional tools whenever your task might benefit from specialized capabilities - even if existing tools could work as a fallback.`,
    params: [
      {
        name: 'brief',
        type: 'string',
        required: true,
        description: `Describe the use case, what the user wants to accomplish, why existing tools are insufficient, and any relevant Webflow context.`,
      },
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category of the capability you are looking for.`,
      },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `A short description of your goal and what kind of tool would help accomplish it.`,
      },
    ],
  },
  {
    name: 'webflowmcp_style_tool',
    description: `Designer Tool - Style tool to perform actions like create style, get all styles, update styles, remove styles`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_variable_tool',
    description: `Manage Webflow Designer variables — create, list, update, rename, delete, and manage style variable modes.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
  {
    name: 'webflowmcp_webflow_guide_tool',
    description: `Retrieve Webflow tool usage guidelines and recommended workflows before performing any actions.`,
    params: [
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
    ],
  },
  {
    name: 'webflowmcp_whtml_builder',
    description: `Insert elements on the current active page from HTML and CSS strings, accepting markup and optional CSS rules.`,
    params: [
      { name: 'actions', type: 'array', required: true, description: `No description.` },
      {
        name: 'context',
        type: 'string',
        required: true,
        description: `Brief description of why this tool is being called in context of the user goal (15-25 words, third-person).`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The unique ID of the Webflow site. Get it from the data_sites_tool if not known.`,
      },
    ],
  },
]
