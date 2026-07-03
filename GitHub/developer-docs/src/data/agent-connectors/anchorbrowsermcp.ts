import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'anchorbrowsermcp_anchor_click',
    description: `Perform a click on an element in the cloud browser page. Use \`element\` to provide a human-readable description of the target (e.g. 'Submit button') and \`ref\` to supply the exact element reference obtained from a prior \`anchor_snapshot\` accessibility snapshot. Optionally set \`doubleClick\` to true to perform a double-click instead.`,
    params: [
      {
        name: 'element',
        type: 'string',
        required: true,
        description: `Human-readable element description used to obtain permission to interact with the element`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `Exact target element reference from the page snapshot`,
      },
      {
        name: 'doubleClick',
        type: 'boolean',
        required: false,
        description: `Whether to perform a double click instead of a single click`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_close',
    description: `Close the current browser page and end the active cloud browser session. Use this to cleanly terminate a session when automation is complete.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_console_messages',
    description: `Returns all console messages captured since the current page was loaded. Use this to inspect JavaScript log output, warnings, and errors for debugging or validation purposes.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_drag',
    description: `Perform a drag-and-drop operation between two elements in the cloud browser page. Provide human-readable descriptions for both the source (\`startElement\`) and target (\`endElement\`), along with their exact element references (\`startRef\`, \`endRef\`) obtained from a prior \`anchor_snapshot\` accessibility snapshot. Useful for reordering list items, moving cards between columns, or resizing elements.`,
    params: [
      {
        name: 'endElement',
        type: 'string',
        required: true,
        description: `Human-readable target element description used to obtain the permission to interact with the element`,
      },
      {
        name: 'endRef',
        type: 'string',
        required: true,
        description: `Exact target element reference from the page snapshot`,
      },
      {
        name: 'startElement',
        type: 'string',
        required: true,
        description: `Human-readable source element description used to obtain the permission to interact with the element`,
      },
      {
        name: 'startRef',
        type: 'string',
        required: true,
        description: `Exact source element reference from the page snapshot`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_file_upload',
    description: `Upload one or more files to the cloud browser page via a file input element. Provide an array of absolute file paths on the server where the browser session is running. Supports single or multiple file uploads to any \`<input type='file'>\` element that has been activated on the page.`,
    params: [
      {
        name: 'paths',
        type: 'array',
        required: true,
        description: `The absolute paths to the files to upload. Can be a single file or multiple files.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_generate_playwright_code',
    description: `Generate a Playwright test script for a given scenario described as a series of steps. Provide a test name, description, and ordered list of step instructions; the tool returns runnable Playwright code. Use this to automate browser test authoring from natural language instructions.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `The description of the test`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the test` },
      { name: 'steps', type: 'array', required: true, description: `The steps of the test` },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_get_body_html',
    description: `Get the HTML content of the body element from the current page, or of a specific element when a selector is provided. Useful for identifying the DOM structure and locating paths to important elements. By default, comments, scripts, styles, images, and SVGs are excluded to keep the output concise.`,
    params: [
      {
        name: 'slimResponse',
        type: 'boolean',
        required: true,
        description: `Whether to exclude HTML comments, script tags, style tags, images and svgs in the output (default: true)`,
      },
      {
        name: 'selector',
        type: 'string',
        required: false,
        description: `The selector of the element to be saved for example: .class-name, #id, etc.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_handle_dialog',
    description: `Accept or dismiss a browser dialog (alert, confirm, or prompt) that has appeared in the cloud browser page. Set \`accept\` to true to confirm/accept the dialog, or false to cancel/dismiss it. For prompt dialogs that require text input, provide the response text in \`promptText\`.`,
    params: [
      {
        name: 'accept',
        type: 'boolean',
        required: true,
        description: `Whether to accept the dialog.`,
      },
      {
        name: 'promptText',
        type: 'string',
        required: false,
        description: `The text of the prompt in case of a prompt dialog.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_hover',
    description: `Hover the mouse cursor over an element in the cloud browser page without clicking it. Use \`element\` to provide a human-readable description of the target and \`ref\` to supply the exact element reference from a prior \`anchor_snapshot\` accessibility snapshot. Useful for revealing tooltips, dropdown menus, or other hover-triggered UI states.`,
    params: [
      {
        name: 'element',
        type: 'string',
        required: true,
        description: `Human-readable element description used to obtain permission to interact with the element`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `Exact target element reference from the page snapshot`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_navigate',
    description: `Navigate the cloud browser to a specified URL, loading the page in the current tab. Use this tool to start browsing a site, follow a link programmatically, or move to any web address during an automation session.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The URL to navigate to` },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_navigate_back',
    description: `Go back to the previous page in the browser history, equivalent to clicking the browser's Back button. Use this to return to a prior page after following a link or submitting a form.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_navigate_forward',
    description: `Go forward to the next page in the browser history, equivalent to clicking the browser's Forward button. Use this after navigating back to re-advance to a page you previously visited.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_network_requests',
    description: `Returns all network requests captured since the current page was loaded. Use this to inspect API calls, resource loads, and HTTP traffic for debugging, auditing, or understanding page behavior.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_pdf_save',
    description: `Save the current browser page as a PDF file. Useful for archiving page content, generating printable reports, or capturing rendered page state as a document. An optional filename can be specified; otherwise a timestamped default is used.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `File name to save the pdf to. Defaults to \`page-{timestamp}.pdf\` if not specified.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_press_key',
    description: `Press a keyboard key or key combination in the cloud browser page. Accepts named keys (e.g. \`ArrowLeft\`, \`Enter\`, \`Tab\`, \`Escape\`) or single characters (e.g. \`a\`, \`1\`). Useful for keyboard navigation, submitting forms, triggering shortcuts, or dismissing dialogs without using the mouse.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Name of the key to press or a character to generate, such as \`ArrowLeft\` or \`a\``,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_resize',
    description: `Resize the browser window to the specified width and height in pixels. Use this to test responsive layouts, simulate different device viewports, or prepare the browser state before capturing screenshots or snapshots.`,
    params: [
      {
        name: 'height',
        type: 'number',
        required: true,
        description: `Height of the browser window`,
      },
      { name: 'width', type: 'number', required: true, description: `Width of the browser window` },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_select_option',
    description: `Select one or more options in a dropdown or select element in the cloud browser page. Use \`element\` to provide a human-readable description of the dropdown and \`ref\` to supply the exact element reference from a prior \`anchor_snapshot\` accessibility snapshot. Pass one or more option values in the \`values\` array to select.`,
    params: [
      {
        name: 'element',
        type: 'string',
        required: true,
        description: `Human-readable element description used to obtain permission to interact with the element`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `Exact target element reference from the page snapshot`,
      },
      {
        name: 'values',
        type: 'array',
        required: true,
        description: `Array of values to select in the dropdown. This can be a single value or multiple values.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_snapshot',
    description: `Capture an accessibility snapshot of the current page. This produces a structured representation of the page's accessible elements (roles, labels, states), which is more useful than a screenshot for planning and executing further interactions. Use this to understand page structure before performing actions.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_tab_close',
    description: `Close a browser tab by its index, or close the currently active tab if no index is specified. Use this to clean up tabs that are no longer needed during a multi-tab automation session.`,
    params: [
      {
        name: 'index',
        type: 'number',
        required: false,
        description: `The index of the tab to close. Closes current tab if not provided.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_tab_list',
    description: `List all currently open tabs in the cloud browser session, returning their indices and titles or URLs. Use this to inspect available tabs before selecting or closing one.`,
    params: [],
  },
  {
    name: 'anchorbrowsermcp_anchor_tab_new',
    description: `Open a new browser tab in the cloud session, optionally navigating it to a specified URL. If no URL is provided, the new tab opens blank. Use this to work across multiple pages simultaneously.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The URL to navigate to in the new tab. If not provided, the new tab will be blank.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_tab_select',
    description: `Switch the active browser tab to the tab at the given zero-based index. Use this to move focus between multiple open tabs before interacting with the content of a specific tab.`,
    params: [
      {
        name: 'index',
        type: 'number',
        required: true,
        description: `The index of the tab to select`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_take_screenshot',
    description: `Take a screenshot of the current browser page or a specific element. Returns a JPEG image by default (or PNG when raw mode is enabled). Use this to visually inspect page state; note that screenshots cannot be used as input for further actions — use anchor_snapshot instead when you need to interact with elements.`,
    params: [
      {
        name: 'element',
        type: 'string',
        required: false,
        description: `Human-readable element description used to obtain permission to screenshot the element. If not provided, the screenshot will be taken of viewport. If element is provided, ref must be provided too.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `File name to save the screenshot to. Defaults to \`page-{timestamp}.{png|jpeg}\` if not specified.`,
      },
      {
        name: 'raw',
        type: 'boolean',
        required: false,
        description: `Whether to return without compression (in PNG format). Default is false, which returns a JPEG image.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `Exact target element reference from the page snapshot. If not provided, the screenshot will be taken of viewport. If ref is provided, element must be provided too.`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_type',
    description: `Type text into an editable element in the cloud browser page. Use \`element\` to provide a human-readable description of the target input and \`ref\` to supply the exact element reference from a prior \`anchor_snapshot\` accessibility snapshot. Optionally press Enter after typing (\`submit\`) or type character-by-character to trigger key handlers (\`slowly\`).`,
    params: [
      {
        name: 'element',
        type: 'string',
        required: true,
        description: `Human-readable element description used to obtain permission to interact with the element`,
      },
      {
        name: 'ref',
        type: 'string',
        required: true,
        description: `Exact target element reference from the page snapshot`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Text to type into the element`,
      },
      {
        name: 'slowly',
        type: 'boolean',
        required: false,
        description: `Whether to type one character at a time. Useful for triggering key handlers in the page. By default entire text is filled in at once.`,
      },
      {
        name: 'submit',
        type: 'boolean',
        required: false,
        description: `Whether to submit entered text (press Enter after)`,
      },
    ],
  },
  {
    name: 'anchorbrowsermcp_anchor_wait_for',
    description: `Pause the automation until a specified text appears on the page, a specified text disappears from the page, or a given number of seconds elapses. Use this to synchronize with dynamic page content loading or transitions before taking the next action.`,
    params: [
      { name: 'text', type: 'string', required: false, description: `The text to wait for` },
      {
        name: 'textGone',
        type: 'string',
        required: false,
        description: `The text to wait for to disappear`,
      },
      { name: 'time', type: 'number', required: false, description: `The time to wait in seconds` },
    ],
  },
]
