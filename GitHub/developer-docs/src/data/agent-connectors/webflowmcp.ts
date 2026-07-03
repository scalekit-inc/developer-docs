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
    description: `Designer Tool - Asset tool to perform actions like create folder, get all assets and folders, update assets and folders, and upload image by URL`,
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
    name: 'webflowmcp_data_assets_tool',
    description: `Manage Webflow site assets — create folders, upload files, and retrieve asset metadata via the Data API.`,
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
    name: 'webflowmcp_data_cms_tool',
    description: `Manage Webflow CMS collections and items including listing, creating, updating, and publishing.`,
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
    description: `List pages, get page metadata, update page settings, and manage branches via the Webflow Data API.`,
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
    name: 'webflowmcp_data_scripts_tool',
    description: `Register, apply, update, and remove custom code scripts at the site or page level in Webflow.`,
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
