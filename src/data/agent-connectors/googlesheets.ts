import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlesheets_append_values',
    description: `Append rows of data to a Google Sheets spreadsheet. Data is added after the last row with existing content in the specified range.`,
    params: [
      {
        name: 'insert_data_option',
        type: 'string',
        required: false,
        description: `How the input data should be inserted. Options: INSERT_ROWS (inserts new rows), OVERWRITE (overwrites existing data). Default: OVERWRITE`,
      },
      {
        name: 'range',
        type: 'string',
        required: true,
        description: `The A1 notation range to append data to (e.g. Sheet1!A1)`,
      },
      {
        name: 'spreadsheet_id',
        type: 'string',
        required: true,
        description: `The ID of the spreadsheet to append data to`,
      },
      {
        name: 'value_input_option',
        type: 'string',
        required: false,
        description: `How input data should be interpreted. Options: RAW (literal values), USER_ENTERED (as if typed in UI, parses formulas/dates). Default: USER_ENTERED`,
      },
      {
        name: 'values',
        type: 'array',
        required: true,
        description: `2D array of values to append. Each inner array is a row.`,
      },
    ],
  },
  {
    name: 'googlesheets_clear_values',
    description: `Clear all values in a specified range of a Google Sheets spreadsheet. Formatting is preserved; only the cell values are cleared.`,
    params: [
      {
        name: 'range',
        type: 'string',
        required: true,
        description: `The A1 notation range to clear (e.g. Sheet1!A1:D10)`,
      },
      {
        name: 'spreadsheet_id',
        type: 'string',
        required: true,
        description: `The ID of the spreadsheet to clear values in`,
      },
    ],
  },
  {
    name: 'googlesheets_create_spreadsheet',
    description: `Create a new Google Sheets spreadsheet with an optional title and initial sheet configuration. Returns the new spreadsheet ID and metadata.`,
    params: [
      { name: 'locale', type: 'string', required: false, description: `Locale of the spreadsheet` },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'sheets',
        type: 'array',
        required: false,
        description: `Initial sheets to include in the spreadsheet`,
      },
      {
        name: 'time_zone',
        type: 'string',
        required: false,
        description: `Time zone for the spreadsheet`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the new spreadsheet`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlesheets_get_values',
    description: `Returns only the cell values from a specific range in a Google Sheet — no metadata, no formatting, just the data. For full spreadsheet metadata and formatting, use googlesheets_read_spreadsheet instead.`,
    params: [
      {
        name: 'major_dimension',
        type: 'string',
        required: false,
        description: `Whether values are returned by rows or columns`,
      },
      {
        name: 'range',
        type: 'string',
        required: true,
        description: `Cell range to read in A1 notation`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'spreadsheet_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Sheet`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
      {
        name: 'value_render_option',
        type: 'string',
        required: false,
        description: `How values should be rendered in the response`,
      },
    ],
  },
  {
    name: 'googlesheets_read_spreadsheet',
    description: `Returns everything about a spreadsheet — including spreadsheet metadata, sheet properties, cell values, formatting, themes, and pixel sizes. If you only need cell values, use googlesheets_get_values instead.`,
    params: [
      {
        name: 'include_grid_data',
        type: 'boolean',
        required: false,
        description: `Include cell data in the response`,
      },
      {
        name: 'ranges',
        type: 'string',
        required: false,
        description: `Cell range to read in A1 notation`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'spreadsheet_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Sheet to read`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'googlesheets_update_values',
    description: `Update cell values in a specific range of a Google Sheet. Supports writing single cells or multiple rows and columns at once.`,
    params: [
      {
        name: 'include_values_in_response',
        type: 'boolean',
        required: false,
        description: `Return the updated cell values in the response`,
      },
      {
        name: 'range',
        type: 'string',
        required: true,
        description: `Cell range to update in A1 notation`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'spreadsheet_id',
        type: 'string',
        required: true,
        description: `The ID of the Google Sheet to update`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
      {
        name: 'value_input_option',
        type: 'string',
        required: false,
        description: `How input values should be interpreted`,
      },
      {
        name: 'values',
        type: 'array',
        required: true,
        description: `2D array of values to write to the range`,
      },
    ],
  },
]
