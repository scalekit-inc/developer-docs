import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'deeplmcp_correct_text',
    description: `Correct one or more texts for typos, grammar and punctuation errors using DeepL.`,
    params: [
      { name: 'text', type: 'array', required: true, description: `One or more texts to correct.` },
      {
        name: 'targetLang',
        type: 'string',
        required: false,
        description: `Optional target language code. DeepL Write supports: DE, EN-GB, EN-US, ES, FR, IT, JA, KO, PT-BR, PT-PT, ZH-HANS.`,
      },
    ],
  },
  {
    name: 'deeplmcp_download_document',
    description: `Get a download link for a translated document once its status is 'done'. Returns 'downloadUrl', a short-lived, single-use link. Fetch it with an HTTP GET (the URL carries its own token, so do not add an Authorization header), or present it to the user. The link works only once. The bytes are streamed from the server and never pass through this conversation.`,
    params: [
      {
        name: 'sessionId',
        type: 'string',
        required: true,
        description: `The session id returned by upload-document.`,
      },
    ],
  },
  {
    name: 'deeplmcp_get_document_status',
    description: `Check the translation status of a document session. Returns one of: 'awaiting_upload' (file not received yet), 'queued', 'translating', 'done', or 'error'. The additive 'uploadStatus' is 'awaiting', 'uploading', or 'complete' when known. Once the status is 'done', call download-document.`,
    params: [
      {
        name: 'sessionId',
        type: 'string',
        required: true,
        description: `The session id returned by upload-document.`,
      },
    ],
  },
  {
    name: 'deeplmcp_get_source_languages',
    description: `Get the source language codes supported by DeepL for translation, e.g. 'EN' or 'DE'. Use one of these for the sourceLang parameter of translate-text.`,
    params: [],
  },
  {
    name: 'deeplmcp_get_target_languages',
    description: `Get the target language codes supported by DeepL for translation, e.g. 'EN-US' or 'DE'. Use one of these for the targetLang parameter of translate-text.`,
    params: [],
  },
  {
    name: 'deeplmcp_rephrase_text',
    description: `Rephrase text in the same or a different language using DeepL.`,
    params: [
      {
        name: 'text',
        type: 'array',
        required: true,
        description: `One or more texts to rephrase.`,
      },
      {
        name: 'targetLang',
        type: 'string',
        required: false,
        description: `Target language code. Optional for a plain rephrase (auto-detected), but REQUIRED when a writingStyle or tone is set. DeepL Write supports: DE, EN-GB, EN-US, ES, FR, IT, JA, KO, PT-BR, PT-PT, ZH-HANS — styles/tones work only on DE, EN-GB, EN-US, ES, FR, IT, PT-BR, PT-PT.`,
      },
      {
        name: 'tone',
        type: 'string',
        required: false,
        description: `Optional tone for the output: confident, diplomatic, enthusiastic, or friendly. Requires a style-capable targetLang. Specify either a writing style or a tone, not both.`,
      },
      {
        name: 'writingStyle',
        type: 'string',
        required: false,
        description: `Optional writing style for the output: academic, business, casual, or simple. Requires a style-capable targetLang.`,
      },
    ],
  },
  {
    name: 'deeplmcp_translate_text',
    description: `Translate text to a target language using DeepL. Use this for plain text provided directly in the conversation — snippets, strings, messages, or passages pasted by the user. Do not use this to translate a file or document (e.g. Word, PowerPoint, Excel, PDF, HTML, .txt, .srt, .xlf/.xliff) — even if you can already read its contents — because it returns plain text and discards the document's layout and formatting. For files, use upload-document instead. Review the optional parameters and use those that apply for best results. When using a glossary, you must specify the source language as well as the target language. If the user references a glossary by name, use list-glossaries to look up its id. An unknown glossaryId is silently ignored (translation proceeds without it). An administrator may assign a language system (style profile) to the account, whose glossaries and style rule set can replace the glossaryId and styleId passed here; 'appliedCustomizations' in the result says so when it happened.`,
    params: [
      {
        name: 'targetLang',
        type: 'string',
        required: true,
        description: `Target language code, e.g. 'EN-US' or 'DE'.`,
      },
      { name: 'text', type: 'string', required: true, description: `The text to translate.` },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `Optional description of the text's domain to improve translation quality. Not itself translated. At most 300 characters.`,
      },
      {
        name: 'customInstructions',
        type: 'array',
        required: false,
        description: `Optional custom instructions to steer translation. Max 10 instructions, 300 characters each.`,
      },
      {
        name: 'formality',
        type: 'string',
        required: false,
        description: `Controls formality: 'less', 'more', 'default', 'prefer_less', or 'prefer_more'. Only some target languages support this.`,
      },
      {
        name: 'glossaryId',
        type: 'string',
        required: false,
        description: `Glossary id to ensure consistent terminology.`,
      },
      {
        name: 'sourceLang',
        type: 'string',
        required: false,
        description: `Source language code, e.g. 'EN' or 'DE'. Omit to let DeepL auto-detect.`,
      },
      {
        name: 'styleId',
        type: 'string',
        required: false,
        description: `Style rule set id from list-style-rule-sets. Its own custom instructions are applied with it, so do not repeat them below.`,
      },
    ],
  },
  {
    name: 'deeplmcp_upload_document',
    description: `Translate a whole file or document, preserving its original layout and formatting. Use this — not translate-text — whenever the user wants to translate a file or document (rather than text typed into the conversation), even if its contents are already visible to you; translate-text would strip the formatting. For plain text pasted into the conversation, use translate-text instead. Supported file types: Word (.docx, .doc), PowerPoint (.pptx, .ppt), Excel (.xlsx, .xls), PDF, HTML (.html, .htm), plain text (.txt), subtitles (.srt), and XLIFF (.xlf, .xliff). This call starts the translation and returns 'sessionId', 'uploadUrl', and 'uploadPageUrl'. Select 'agent_http' only when you can read the referenced file and perform an HTTP PUT. In that mode, pass 'filename' with a supported extension and send the raw file bytes to 'uploadUrl' with 'Content-Type: application/octet-stream'. Select 'inline_ui' otherwise. In 'inline_ui', the MCP App collects the file; when no MCP App renders, give the user 'uploadPageUrl' to select it in a browser. Then poll get-document-status with the sessionId until it reports 'done', and call download-document. The file bytes never pass through this conversation. An administrator may assign a language system (style profile) to the account, whose glossaries and style rule set can replace the glossaryId and styleId passed here; 'appliedCustomizations' in the result says so when it happened.`,
    params: [
      {
        name: 'targetLang',
        type: 'string',
        required: true,
        description: `Target language code, e.g. 'EN-US' or 'DE'. Use get-target-languages to discover supported codes.`,
      },
      {
        name: 'customInstructions',
        type: 'array',
        required: false,
        description: `Free-text instructions that steer the translation (e.g. 'Use a friendly tone'). Requires a DeepL Pro plan.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `Original file name including its extension (e.g. 'report.docx'). Required for 'agent_http'; the inline_ui picker supplies it when the user selects a file.`,
      },
      {
        name: 'formality',
        type: 'string',
        required: false,
        description: `Controls formality: 'less', 'more', or 'default'. Only some target languages support this. Requires a DeepL Pro plan.`,
      },
      {
        name: 'glossaryId',
        type: 'string',
        required: false,
        description: `Id of a glossary to apply. Requires sourceLang; the glossary must have a dictionary for the source/target pair. Use list-glossaries to discover ids. Requires a DeepL Pro plan.`,
      },
      {
        name: 'sourceLang',
        type: 'string',
        required: false,
        description: `Source language code, e.g. 'EN'. Omit to let DeepL auto-detect. Required when using a glossary.`,
      },
      {
        name: 'styleId',
        type: 'string',
        required: false,
        description: `Style rule set id from list-style-rule-sets. Its own custom instructions are applied with it, so do not repeat them below. Requires a DeepL Pro plan.`,
      },
      {
        name: 'uploadMode',
        type: 'string',
        required: false,
        description: `Select 'inline_ui' for the widget or 'agent_http' when you can HTTP PUT the referenced file. Defaults to 'inline_ui'.`,
      },
    ],
  },
]
