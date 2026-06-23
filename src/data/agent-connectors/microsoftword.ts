import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'microsoftword_create_document',
    description: `Create a new Word document (.docx) in OneDrive by initiating a resumable upload session. Returns an uploadUrl that the caller must use to upload the .docx file bytes via one or more PUT requests. The document is placed under the specified parent folder with the given filename. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      { name: 'filename', type: 'string', required: true, description: `The base name of the Word document to create, without the .docx extension. The extension is appended automatically. Example: "Project Proposal" creates "Project Proposal.docx".` },
      { name: 'parent_id', type: 'string', required: true, description: `The OneDrive item ID of the parent folder where the document will be created. Use "root" to create the document at the top level of OneDrive. Obtain folder IDs from list or get drive item operations.` },
      { name: 'conflict_behavior', type: 'string', required: false, description: `Behavior when a file with the same name already exists in the target folder. "fail" aborts and returns an error, "replace" overwrites the existing file, "rename" saves the new document with a different auto-generated name. Default: replace.` },
    ],
  },
  {
    name: 'microsoftword_read_document',
    description: `Export a Word document (.docx) from OneDrive as a PDF by requesting the file content with the format=pdf conversion parameter. Returns the PDF binary of the document. Note: Microsoft Graph converts the document server-side to PDF; it does not return Markdown or plain text. Client-side parsing is required to extract text from the returned PDF. Requires Files.Read or Files.ReadWrite scope.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique OneDrive item ID of the Word document (.docx) to export as PDF. Obtain item IDs from list drive items, search drive items, or get drive item operations. Example: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K".` },
    ],
  },
]
