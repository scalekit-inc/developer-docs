import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'microsoft365_excel_add_table_column',
    description: `Add a new column to an existing Excel table in OneDrive. Optionally specify the column name, its zero-based insertion index (null = append at end), and initial cell values as a 2D array (first row is the header). Returns the created column object.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Name or ID of the table to add the column to. Example: 'Table1' or the GUID assigned by Excel.` },
      { name: 'index', type: 'integer', required: false, description: `Zero-based index position at which to insert the column. Null or omitted means append the column at the right end of the table. Example: 0 inserts as the first column.` },
      { name: 'name', type: 'string', required: false, description: `Display name for the new column header. If omitted, Excel auto-generates a name (e.g., 'Column1'). Example: 'Revenue'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
      { name: 'values', type: 'array', required: false, description: `2D array of initial cell values for the column, including the header row in the first element. Example: [["Header"],["row1val"],["row2val"]]. Each inner array is one row. If omitted, the column is created empty.` },
    ],
  },
  {
    name: 'microsoft365_excel_add_table_row',
    description: `Add a new row to an Excel table in a workbook stored in OneDrive. Provide a 2D array of values (one inner array per row to insert). Optionally specify an index to insert the row at a specific position; omit index to append to the end of the table.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID to add a row to. Example: 'Table1' or '1'.` },
      { name: 'values', type: 'array', required: true, description: `2D array of values to insert as a new row. Each inner array represents one row; each element is a cell value (string, number, boolean, or null). The number of elements in each inner array must match the table's column count. Example: [["Alice", 95, true]] inserts one row with three cells.` },
      { name: 'index', type: 'integer', required: false, description: `Zero-based index at which to insert the row. If null or omitted, the row is appended to the end of the table. Example: 0 inserts at the top of the table.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_clear_range',
    description: `Clear the contents, formats, or both from a cell range in an Excel worksheet stored in OneDrive. Use apply_to to control what is cleared: 'All' clears both content and formatting, 'Contents' clears only values and formulas, 'Formats' clears only cell formatting.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address in Excel notation to clear. Examples: 'A1:C10' to clear a multi-cell range, 'B2' to clear a single cell.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the range to clear. Example: 'Sheet1'.` },
      { name: 'apply_to', type: 'string', required: false, description: `What to clear from the range. Valid values: 'All' (clears both content and formatting, default), 'Contents' (clears only values and formulas), 'Formats' (clears only cell formatting).` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_close_session',
    description: `Close an active workbook session for an Excel file in OneDrive. Releases server-side resources associated with the session. Pass the session ID returned by the createSession call as session_id.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file whose session should be closed. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'session_id', type: 'string', required: true, description: `Workbook session ID returned by the createSession call. Sent as the workbook-session-id request header to identify which session to close. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_create_chart',
    description: `Create a new chart in an Excel worksheet stored in OneDrive. Specify the chart type (e.g., ColumnClustered, Line, Pie), the source data range address (e.g., 'A1:B10'), and optionally how series are arranged (Auto, Columns, Rows). Returns the created chart object including its ID.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'source_data', type: 'string', required: true, description: `Cell range address providing the chart source data in Excel notation. Example: 'A1:B10' uses columns A and B, rows 1–10 as the chart data.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID in which to create the chart. Example: 'Sheet1'.` },
      { name: 'chart_type', type: 'string', required: false, description: `Type of chart to create. Valid values: ColumnClustered, ColumnStacked, ColumnStacked100, BarClustered, BarStacked, BarStacked100, Line, LineStacked, LineMarkers, Pie, Doughnut, Scatter, Area, Radar, XYScatter. Default is 'ColumnClustered'.` },
      { name: 'series_by', type: 'string', required: false, description: `How data series are determined from the source range. Valid values: 'Auto' (Excel decides), 'Columns' (each column is a series), 'Rows' (each row is a series). Default is 'Auto'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_create_session',
    description: `Create a workbook session for an Excel file in OneDrive. Returns a session ID that can be passed as the workbook-session-id header in subsequent Excel API calls to maintain state and improve performance. Requires the OneDrive item ID of the .xlsx file.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file to open a session for. Obtain this from the OneDrive file listing or drive item API. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'persist_changes', type: 'boolean', required: false, description: `Whether to persist changes made during the session to the workbook. Set to true (default) to save changes; set to false for a read-only transient session that does not commit edits.` },
    ],
  },
  {
    name: 'microsoft365_excel_create_table',
    description: `Create a new Excel table from a cell range in a worksheet stored in OneDrive. Specify the address of the range (e.g., 'A1:D10') and whether the first row contains headers. Returns the created table object including its assigned ID and name.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address for the new table in Excel notation. Example: 'A1:D10' creates a table spanning columns A–D and rows 1–10.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID in which to create the table. Example: 'Sheet1'.` },
      { name: 'has_headers', type: 'boolean', required: false, description: `Whether the first row of the range contains column headers. When true (default), the first row becomes the header row of the table. When false, Excel auto-generates header names.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_create_worksheet',
    description: `Add a new worksheet to an Excel workbook stored in OneDrive. Specify the sheet name. Returns the newly created worksheet object including its ID, name, position, and visibility.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file to add the worksheet to. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'name', type: 'string', required: true, description: `Name for the new worksheet tab. Must be unique within the workbook and cannot exceed 31 characters. Example: 'Q1 Sales'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_delete_chart',
    description: `Delete a chart from an Excel worksheet stored in OneDrive. This permanently removes the chart from the worksheet. Requires the OneDrive item ID, worksheet name or GUID, and chart name or GUID.`,
    params: [
      { name: 'chart_id', type: 'string', required: true, description: `Name or ID of the chart to delete. Example: 'Chart 1' or the GUID assigned by Excel.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the chart to delete. Example: 'Sheet1'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_delete_table',
    description: `Permanently delete a table from an Excel workbook stored in OneDrive. The underlying cell data is preserved but the table formatting and structure are removed. This action cannot be undone.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID to delete. Example: 'Table1' or '1'. This permanently removes the table structure (cell data is kept).` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_delete_table_column',
    description: `Delete a column from an Excel table by its zero-based index. This permanently removes the column and all its data from the table. Requires the OneDrive item ID, table name or ID, and the column index to delete.`,
    params: [
      { name: 'column_index', type: 'integer', required: true, description: `Zero-based index of the column to delete within the table. Example: 0 deletes the first column, 2 deletes the third column.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Name or ID of the table containing the column to delete. Example: 'Table1' or the GUID assigned by Excel.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_delete_table_row',
    description: `Permanently delete a row from an Excel table in a workbook stored in OneDrive by its zero-based row index. All rows below the deleted row shift up by one. This action cannot be undone.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'row_index', type: 'integer', required: true, description: `Zero-based index of the row to delete within the table. The header row is not counted; index 0 refers to the first data row. Example: 0 deletes the first data row.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID from which to delete the row. Example: 'Table1' or '1'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_delete_worksheet',
    description: `Permanently delete a worksheet from an Excel workbook stored in OneDrive. This action cannot be undone. The workbook must have at least one remaining visible worksheet after deletion.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID to delete. Example: 'Sheet1' or '{00000000-0001-0000-0000-000000000000}'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_export_to_pdf',
    description: `Export an Excel workbook stored in OneDrive to PDF format. Uses the Microsoft Graph OneDrive content endpoint with format=pdf query parameter. Returns the PDF binary content. The response may be a direct 200 with the PDF body or a 302 redirect to a download URL depending on file size.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file to export. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
    ],
  },
  {
    name: 'microsoft365_excel_filter_table',
    description: `Apply a filter to a column in an Excel table stored in OneDrive. Specify the filter criteria type (e.g., Values, Dynamic, Top, Custom) and the values or criteria to filter by. For 'Values' filtering, provide an array of exact string values to show. The filter is applied in place; no data is returned.`,
    params: [
      { name: 'column_id', type: 'string', required: true, description: `Name or ID of the column within the table on which to apply the filter. Example: 'Status' or the column's integer ID.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Name or ID of the table to filter. Example: 'Table1' or the GUID assigned by Excel.` },
      { name: 'values', type: 'array', required: true, description: `Array of string values to filter by when filter_on is 'Values'. Only rows whose cell in this column matches one of these values will be shown. Example: ["Active", "Pending"].` },
      { name: 'filter_on', type: 'string', required: false, description: `Filter type that determines how the criteria are applied. Valid values: 'Values' (match exact values), 'Custom' (custom expression), 'CellColor' (cell background color), 'FontColor' (cell font color), 'Dynamic' (dynamic filter such as Above Average), 'Top10' (top or bottom N items), 'Icon' (cell icon). Default is 'Values'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_get_range',
    description: `Retrieve the values, formulas, format, and address of a cell range in an Excel worksheet stored in OneDrive. Specify the range using standard Excel notation (e.g., 'A1:C10' or 'B2'). Optionally accepts a workbook session ID.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address in Excel notation to retrieve. Examples: 'A1' for a single cell, 'A1:C10' for a multi-cell range, 'Sheet1!A1:B5' to target a specific sheet within the address.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the range. Example: 'Sheet1' or '{00000000-0001-0000-0000-000000000000}'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_get_table',
    description: `Retrieve details of a specific table in an Excel workbook stored in OneDrive, including its name, style, column count, and header/total row settings. Accepts either a numeric table ID or the table name.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID to retrieve. Example: 'Table1' or '1'. Both the table name and the workbook-assigned numeric ID are accepted.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_get_worksheet',
    description: `Retrieve the properties of a specific worksheet in an Excel workbook stored in OneDrive. Use the worksheet name or its GUID as the worksheet_id. Optionally accepts a workbook session ID.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `The worksheet name or GUID to retrieve. Use the sheet tab name (e.g., 'Sheet1') or the worksheet's unique GUID. Example: 'Sheet1' or '{00000000-0001-0000-0000-000000000000}'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_charts',
    description: `List all charts in an Excel worksheet stored in OneDrive. Returns chart names, IDs, type, dimensions, and position. Supports OData $top for pagination.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the charts to list. Example: 'Sheet1'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of charts to return (1–1000). Defaults to server-defined page size.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_comments',
    description: `List all comments in an Excel workbook stored in OneDrive. Returns comment IDs, author information, content, cell location, and creation date. Supports OData $top for pagination.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of comments to return (1–1000). Defaults to server-defined page size.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_named_items',
    description: `List all named items (named ranges and constants) in an Excel workbook stored in OneDrive. Returns the name, type, value, and scope for each named item. Supports OData $top for pagination and $select for field projection.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each named item. Example: 'name,type,value' to return only those fields.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of named items to return (1–1000). Defaults to server-defined page size.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_table_columns',
    description: `List all columns in an Excel table in a workbook stored in OneDrive. Returns column objects including their name, index, and values. Supports OData pagination with $top and field selection with $select.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID whose columns to list. Example: 'Table1' or '1'.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each column. Example: 'id,name' to return only the column ID and name.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of columns to return. Useful for tables with many columns. Example: 10.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_table_rows',
    description: `List rows in an Excel table stored in OneDrive. Returns an array of row objects, each containing a values array with the cell data. Supports OData pagination with $top and $skip.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID whose rows to list. Example: 'Table1' or '1'.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of rows to skip for pagination. Use in combination with $top to page through large tables. Example: 20 to skip the first 20 rows.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of rows to return. Defaults to server page size. Example: 50 to return up to 50 rows.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_tables',
    description: `List all tables in an Excel workbook stored in OneDrive. Returns table names, IDs, style, and header/total row settings. Supports OData query options for pagination and field selection.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return. Example: 'id,name,style' to return only those fields for each table.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of tables to return (1–1000). Defaults to server-defined page size.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_list_worksheets',
    description: `List all worksheets in an Excel workbook stored in OneDrive. Supports OData query parameters for field selection and pagination. Optionally accepts a workbook session ID for session-based access.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each worksheet. Example: 'id,name,position,visibility'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of worksheets to return. Example: 10.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header for session-based access. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_merge_range',
    description: `Merge a cell range in an Excel worksheet stored in OneDrive. Specify the range address (e.g., 'A1:C3') and optionally set 'across' to true to merge each row separately rather than merging the entire block into one cell.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address in Excel notation to merge. Examples: 'A1:C3' for a 3-column by 3-row block, 'B2:D4' for a rectangular range.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the range to merge. Example: 'Sheet1'.` },
      { name: 'across', type: 'boolean', required: false, description: `When true, merges cells in each row of the range separately (row-by-row merge) instead of merging the entire block into a single cell. Defaults to false.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_protect_worksheet',
    description: `Apply protection to a worksheet in an Excel workbook stored in OneDrive. You can optionally set a password and configure which actions are allowed while the sheet is protected (e.g., allow formatting cells but prevent deleting rows).`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID to protect. Example: 'Sheet1' or '{00000000-0001-0000-0000-000000000000}'.` },
      { name: 'allow_auto_filter', type: 'boolean', required: false, description: `Whether to allow AutoFilter operations while the worksheet is protected. Default is false.` },
      { name: 'allow_delete_columns', type: 'boolean', required: false, description: `Whether to allow deleting columns while the worksheet is protected. Default is false.` },
      { name: 'allow_delete_rows', type: 'boolean', required: false, description: `Whether to allow deleting rows while the worksheet is protected. Default is false.` },
      { name: 'allow_format_cells', type: 'boolean', required: false, description: `Whether to allow formatting cells while the worksheet is protected. Default is false.` },
      { name: 'allow_format_columns', type: 'boolean', required: false, description: `Whether to allow formatting columns while the worksheet is protected. Default is false.` },
      { name: 'allow_format_rows', type: 'boolean', required: false, description: `Whether to allow formatting rows while the worksheet is protected. Default is false.` },
      { name: 'allow_insert_columns', type: 'boolean', required: false, description: `Whether to allow inserting columns while the worksheet is protected. Default is false.` },
      { name: 'allow_insert_hyperlinks', type: 'boolean', required: false, description: `Whether to allow inserting hyperlinks while the worksheet is protected. Default is false.` },
      { name: 'allow_insert_rows', type: 'boolean', required: false, description: `Whether to allow inserting rows while the worksheet is protected. Default is false.` },
      { name: 'allow_pivot_tables', type: 'boolean', required: false, description: `Whether to allow PivotTable operations while the worksheet is protected. Default is false.` },
      { name: 'allow_sort', type: 'boolean', required: false, description: `Whether to allow sorting while the worksheet is protected. Default is false.` },
      { name: 'password', type: 'string', required: false, description: `Optional password to protect the worksheet. If set, users must enter this password to unprotect the sheet. Example: 'MySecretPass123'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_sort_range',
    description: `Apply a sort to a cell range in an Excel worksheet stored in OneDrive. Specify one or more sort fields defining which column index to sort by and whether to sort ascending or descending. Optionally control case sensitivity and whether the range has a header row.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address in Excel notation to sort. Example: 'A1:D20' to sort a 4-column, 20-row range.` },
      { name: 'fields', type: 'array', required: true, description: `Array of sort field objects defining the sort criteria. Each object must have a 'key' (zero-based column index within the range) and optionally 'ascending' (bool, default true) and 'sortOn' (e.g., 'Value', 'CellColor', 'FontColor', 'Icon'). Example: [{"key": 0, "ascending": true, "sortOn": "Value"}].` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the range to sort. Example: 'Sheet1'.` },
      { name: 'has_headers', type: 'boolean', required: false, description: `Whether the range has a header row that should not be sorted. Default is true — the first row is treated as a header and excluded from sorting.` },
      { name: 'match_case', type: 'boolean', required: false, description: `Whether the sort is case-sensitive. Default is false (case-insensitive).` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_sort_table',
    description: `Apply a sort to an Excel table stored in OneDrive. Provide one or more sort field objects specifying the zero-based column key within the table, sort direction (ascending/descending), and sort basis (Value, CellColor, FontColor, Icon). Optionally control case sensitivity. The sort is applied in place; no data is returned.`,
    params: [
      { name: 'fields', type: 'array', required: true, description: `Array of sort field objects defining the sort criteria. Each object must include 'key' (zero-based column index within the table). Optionally include 'ascending' (bool, default true) and 'sortOn' (e.g., 'Value', 'CellColor', 'FontColor', 'Icon'). Example: [{"key": 0, "ascending": true, "sortOn": "Value"}].` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Name or ID of the table to sort. Example: 'Table1' or the GUID assigned by Excel.` },
      { name: 'match_case', type: 'boolean', required: false, description: `Whether the sort is case-sensitive. Default is false (case-insensitive). Example: set to true to distinguish 'Apple' from 'apple'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_unmerge_range',
    description: `Unmerge a previously merged cell range in an Excel worksheet stored in OneDrive. Specify the range address to split any merged cells back into individual cells.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address in Excel notation to unmerge. Example: 'A1:C3' to unmerge a block that was previously merged.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the range to unmerge. Example: 'Sheet1'.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_update_chart',
    description: `Update properties of an existing chart in an Excel worksheet stored in OneDrive. You can update the chart title text, dimensions (height, width in points), and position (left, top offsets in points). Only fields provided will be updated. Returns the updated chart object.`,
    params: [
      { name: 'chart_id', type: 'string', required: true, description: `Name or ID of the chart to update. Example: 'Chart 1' or the GUID assigned by Excel.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the chart. Example: 'Sheet1'.` },
      { name: 'height', type: 'integer', required: false, description: `Height of the chart in points. Example: 300 sets the chart height to 300 points.` },
      { name: 'left', type: 'integer', required: false, description: `Left offset of the chart from the worksheet origin in points. Example: 0 positions the chart at the left edge.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
      { name: 'title', type: 'string', required: false, description: `New text for the chart title. Example: 'Monthly Revenue'. This wraps to the Graph API shape {"title":{"text":"..."}}.` },
      { name: 'top', type: 'integer', required: false, description: `Top offset of the chart from the worksheet origin in points. Example: 0 positions the chart at the top edge.` },
      { name: 'width', type: 'integer', required: false, description: `Width of the chart in points. Example: 400 sets the chart width to 400 points.` },
    ],
  },
  {
    name: 'microsoft365_excel_update_range',
    description: `Write values, formulas, or number formats to a cell range in an Excel worksheet stored in OneDrive. Provide a 2D array of values matching the dimensions of the target range. Optionally set formulas and number formats for cells.`,
    params: [
      { name: 'address', type: 'string', required: true, description: `Cell range address in Excel notation to update. Must match the dimensions of the values array. Examples: 'A1:C2' for a 2-row by 3-column range, 'B5' for a single cell.` },
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'values', type: 'array', required: true, description: `2D array of cell values to write. Each inner array represents a row; each element is a cell value (string, number, boolean, or null). Example: [["Name", "Score"], ["Alice", 95], ["Bob", 87]].` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID containing the range to update. Example: 'Sheet1'.` },
      { name: 'formulas', type: 'array', required: false, description: `2D array of formula strings to write. Each inner array represents a row; each element is a cell formula string (e.g., '=SUM(A1:A5)') or null to leave blank. Must match the dimensions of the address range.` },
      { name: 'number_format', type: 'array', required: false, description: `2D array of number format strings to apply. Each element is an Excel number format code (e.g., 'mm/dd/yyyy', '0.00', '@' for text). Must match the dimensions of the address range.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
    ],
  },
  {
    name: 'microsoft365_excel_update_table',
    description: `Update the properties of an existing Excel table in a workbook stored in OneDrive. Supports renaming the table, toggling header and total rows, and changing the table style.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'table_id', type: 'string', required: true, description: `Table name or numeric ID to update. Example: 'Table1' or '1'.` },
      { name: 'name', type: 'string', required: false, description: `New name for the table. Must be unique within the workbook. Example: 'SalesData'. Only alphanumeric characters and underscores; must not start with a number.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
      { name: 'show_headers', type: 'boolean', required: false, description: `Whether to show the header row of the table. Set to true to display column headers, false to hide them.` },
      { name: 'show_totals', type: 'boolean', required: false, description: `Whether to show the totals row at the bottom of the table. Set to true to display the totals row, false to hide it.` },
      { name: 'style', type: 'string', required: false, description: `Table style name to apply. Valid values follow the Excel table style naming convention, e.g., 'TableStyleLight1', 'TableStyleMedium2', 'TableStyleDark3'. See Excel table styles for available options.` },
    ],
  },
  {
    name: 'microsoft365_excel_update_worksheet',
    description: `Update properties of an existing worksheet in an Excel workbook stored in OneDrive. You can rename the sheet, change its tab position, or change its visibility. At least one of name, position, or visibility must be provided.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `OneDrive item ID of the Excel (.xlsx) file. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
      { name: 'worksheet_id', type: 'string', required: true, description: `Worksheet name or GUID to update. Example: 'Sheet1' or '{00000000-0001-0000-0000-000000000000}'.` },
      { name: 'name', type: 'string', required: false, description: `New name for the worksheet tab. Must be unique within the workbook and no longer than 31 characters. Example: 'Q2 Sales'.` },
      { name: 'position', type: 'integer', required: false, description: `Zero-based index position of the worksheet among other sheets. Example: 0 makes it the first sheet.` },
      { name: 'session_id', type: 'string', required: false, description: `Optional workbook session ID from createSession. When provided, sent as the workbook-session-id header. Example: 'cluster=SN2&session=...'.` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility of the worksheet. Valid values: 'Visible' (shown), 'Hidden' (hidden but can be unhidden by user), 'VeryHidden' (hidden and cannot be unhidden from the UI).` },
    ],
  },
  {
    name: 'microsoft365_onedrive_checkin_file',
    description: `Check in a checked-out OneDrive file to make the version available to others. Optionally provide a comment describing the changes and specify the check-in type. Requires the file to be checked out first.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file to check in. The file must currently be checked out. Obtain item IDs from list or get drive item operations.` },
      { name: 'check_in_as', type: 'string', required: false, description: `The type of check-in to perform. 'published' makes the version visible to all users. 'unspecified' (default) lets the server decide based on document library configuration.` },
      { name: 'comment', type: 'string', required: false, description: `An optional comment to associate with the checked-in version, describing the changes made. Maximum length varies by library configuration.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_checkout_file',
    description: `Check out a OneDrive file to prevent others from editing it while you make changes. Once checked out, only you can modify the file until it is checked back in or the checkout is discarded.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file to check out. The file must be in a document library that supports check out. Obtain item IDs from list or get drive item operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_copy_drive_item',
    description: `Copy a OneDrive file or folder to a new location asynchronously. The operation returns HTTP 202 Accepted with a monitor URL; the actual copy completes in the background. Provide the destination folder ID and an optional new name.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to copy. Obtain item IDs from list or get drive item operations.` },
      { name: 'new_parent_id', type: 'string', required: true, description: `The item ID of the destination folder for the copy. Use "root" to copy the item to the top level of OneDrive.` },
      { name: 'new_name', type: 'string', required: false, description: `Optional name for the copied item in the destination. If omitted, the copy retains the original name.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_copy_item_in_drive',
    description: `Copy a file or folder in a specific drive to a new location asynchronously. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Returns HTTP 202 with a monitor URL; the copy completes in the background. To copy an item in the signed-in user's personal OneDrive, use microsoft365_onedrive_copy_drive_item instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive containing the item to copy. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the file or folder to copy. Obtain item IDs from list or get item operations.` },
      { name: 'new_parent_id', type: 'string', required: true, description: `The item ID of the destination folder for the copy. Use "root" to copy to the top level of the drive.` },
      { name: 'new_name', type: 'string', required: false, description: `Optional name for the copied item in the destination. If omitted, the copy retains the original name.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_create_folder',
    description: `Create a new folder in OneDrive under the specified parent folder. Use "root" as the parent_id to create a top-level folder. Supports conflict behavior control when a folder with the same name already exists.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the folder to create. Must be a valid folder name without path separators.` },
      { name: 'parent_id', type: 'string', required: true, description: `The ID of the parent folder under which to create the new folder. Use "root" to create a folder at the top level of OneDrive. Obtain folder IDs from list or get drive item operations.` },
      { name: 'conflict_behavior', type: 'string', required: false, description: `Behavior when a folder with the same name already exists. "fail" returns an error, "replace" overwrites the existing item, "rename" saves the new folder with a different name. Default: rename.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_create_sharing_link',
    description: `Create a sharing link for a OneDrive file or folder. Supports view-only, edit, and embed link types. The link can optionally be scoped to the organization, password-protected, or set with an expiration date.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder for which to create a sharing link. Obtain item IDs from list or get drive item operations.` },
      { name: 'type', type: 'string', required: true, description: `Type of sharing link to create. "view" is read-only, "edit" allows modifications, "embed" provides an HTML embed code for web pages.` },
      { name: 'expiration_date_time', type: 'string', required: false, description: `Optional expiration date and time for the sharing link in ISO 8601 format. After this date/time the link will no longer work. Example: "2026-12-31T23:59:00Z".` },
      { name: 'password', type: 'string', required: false, description: `Optional password to protect the sharing link. Recipients will need to enter this password to access the shared item.` },
      { name: 'scope', type: 'string', required: false, description: `Scope of the sharing link. "anonymous" allows anyone with the link to access the item. "organization" restricts access to users within the same Microsoft 365 organization. Default: anonymous.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_create_sharing_link_in_drive',
    description: `Create a sharing link for a file or folder in a specific drive by drive ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Supports view-only, edit, and embed link types with optional org scope, password, and expiration. To create a sharing link for an item in the signed-in user's personal OneDrive, use microsoft365_onedrive_create_sharing_link instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive containing the item to share. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the file or folder for which to create a sharing link. Obtain item IDs from list or get item operations.` },
      { name: 'type', type: 'string', required: true, description: `Type of sharing link to create. "view" is read-only, "edit" allows modifications, "embed" provides an HTML embed code for web pages.` },
      { name: 'expiration_date_time', type: 'string', required: false, description: `Optional expiration date and time for the sharing link in ISO 8601 format. After this date/time the link will no longer work. Example: "2026-12-31T23:59:00Z".` },
      { name: 'password', type: 'string', required: false, description: `Optional password to protect the sharing link. Recipients will need to enter this password to access the shared item.` },
      { name: 'scope', type: 'string', required: false, description: `Scope of the sharing link. "anonymous" allows anyone with the link to access the item. "organization" restricts access to users within the same Microsoft 365 organization. Default: anonymous.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_delete_drive_item',
    description: `Permanently delete a file or folder from OneDrive by its item ID. This action cannot be undone — the item is moved to the recycle bin and eventually purged. Use with caution.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to delete. Obtain item IDs from list or get drive item operations. Deleting a folder also removes all its contents.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_delete_item_in_drive',
    description: `Delete a file or folder from a specific drive by drive ID and item ID. The item is moved to the recycle bin. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Deleting a folder also removes all its contents. To delete an item from the signed-in user's personal OneDrive, use microsoft365_onedrive_delete_drive_item instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive containing the item to delete. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the file or folder to delete. Obtain item IDs from list or get item operations. Deleting a folder also removes all its contents.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_delete_permission',
    description: `Remove a specific permission (sharing link or user grant) from a OneDrive file or folder. Once deleted, users who had access only through this permission will lose access. This action cannot be undone.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder from which to remove the permission. Obtain item IDs from list or get drive item operations.` },
      { name: 'permission_id', type: 'string', required: true, description: `The unique ID of the permission to delete. Obtain permission IDs from list permissions operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_discard_checkout',
    description: `Discard a pending checkout for a OneDrive file, releasing the lock without saving any changes. The file reverts to the state it was in before the checkout. Use this when you want to cancel edits and allow others to edit the file again.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file whose checkout to discard. The file must currently be checked out by you. Obtain item IDs from list or get drive item operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_download_file',
    description: `Download the binary content of a OneDrive file by its item ID. The response is the raw file bytes (not JSON). For text files this will be readable text; for binary files (images, Office documents) it will be binary data. Use the item ID from get or list operations.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file to download. Obtain item IDs from list drive items or search drive items operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_follow_drive_item',
    description: `Follow a OneDrive file or folder so it appears in your list of followed items. Following an item allows you to track changes and receive notifications. Returns the updated drive item.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to follow. Obtain item IDs from list or get drive item operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_get_drive',
    description: `Retrieve the properties of the signed-in user's default OneDrive drive, including storage quota, owner information, and drive type (personal, business, or SharePoint document library).`,
    params: [
    ],
  },
  {
    name: 'microsoft365_onedrive_get_drive_item',
    description: `Retrieve the metadata for a specific OneDrive file or folder by its item ID. Returns properties including name, size, creation date, last modified date, MIME type, and download URL.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to retrieve. Obtain item IDs from list or search operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_get_item_in_drive',
    description: `Retrieve metadata for a specific file or folder in a drive by drive ID and item ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Returns name, size, creation date, last modified date, MIME type, and download URL. To get an item from the signed-in user's personal OneDrive, use microsoft365_onedrive_get_drive_item instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive containing the item. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the file or folder to retrieve. Obtain item IDs from list or search operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_get_thumbnails',
    description: `Retrieve thumbnail images for a specific OneDrive file or folder. Returns a collection of thumbnail sets including small, medium, and large thumbnail URLs. Useful for displaying file previews.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder whose thumbnails to retrieve. Obtain item IDs from list or get drive item operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_get_version_content',
    description: `Download the binary content of a specific version of a OneDrive file. Returns the raw file bytes for the requested version. The response is a redirect (302) or direct download (200) depending on the client.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file whose version content to download. Obtain item IDs from list or get drive item operations.` },
      { name: 'version_id', type: 'string', required: true, description: `The unique ID of the version to download. Obtain version IDs from the list versions operation. Example: '1.0' or a GUID string.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_invite_users',
    description: `Send sharing invitations for a OneDrive file or folder to one or more recipients by email address. Assigns the specified roles (read or write) and optionally sends an email notification with a message.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to share. Obtain item IDs from list or get drive item operations.` },
      { name: 'recipient_emails', type: 'array', required: true, description: `Array of email addresses of users to invite. Each email will receive an invitation to access the shared item. Example: ["alice@example.com", "bob@example.com"].` },
      { name: 'roles', type: 'array', required: true, description: `Array of permission roles to grant to the invited users. Use "read" for view-only access and "write" for edit access. Example: ["read"].` },
      { name: 'message', type: 'string', required: false, description: `Optional message to include in the invitation email sent to the recipients.` },
      { name: 'require_sign_in', type: 'boolean', required: false, description: `Whether the recipient must sign in to access the shared item. Set to false to allow access without signing in. Default: true.` },
      { name: 'send_invitation', type: 'boolean', required: false, description: `Whether to send an email invitation to the recipients. Set to false to grant access silently without sending an email. Default: true.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_activities',
    description: `Retrieve the activity feed for a specific OneDrive file or folder. Returns a list of recent actions performed on the item, including who made changes, when, and what type of action was taken (create, edit, delete, share, etc.).`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder whose activity feed to retrieve. Obtain item IDs from list or get drive item operations.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow activity results. Example: "times/recordedTime ge 2024-01-01T00:00:00Z" to filter by date.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of activity records to return per page. Accepts an integer between 1 and 1000. Default: 25.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_drive_items',
    description: `List the children (files and folders) of a OneDrive folder by item ID. Use "root" as the item_id to list top-level drive contents. Supports OData filtering, sorting, pagination, and field selection.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The ID of the folder whose children to list. Use "root" to list top-level OneDrive contents. Obtain item IDs from other list or search operations.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "file ne null" returns only files; "folder ne null" returns only folders.` },
      { name: '$orderby', type: 'string', required: false, description: `Property to sort results by. Example: "name asc" or "lastModifiedDateTime desc".` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return. Example: "id,name,size,lastModifiedDateTime" reduces response payload.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of items to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of items to return per page (default: 25). Accepts values 1–999.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_drives',
    description: `List all drives accessible to the signed-in user, including personal OneDrive, SharePoint document libraries, and shared drives. Supports OData $top for pagination and $select for field selection.`,
    params: [
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of drive properties to return. Example: "id,name,driveType,quota" reduces response payload to only those fields.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of drives to return per page. Accepts values 1–999. Defaults to server-side limit if omitted.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_item_versions_in_drive',
    description: `Retrieve the version history for a file in a specific drive by drive ID and item ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Returns version ID, last modified time, size, and the identity of the user who made each change. To list versions in the signed-in user's personal OneDrive, use microsoft365_onedrive_list_versions instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive containing the file. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the file whose version history to list. Obtain item IDs from list or get item operations.` },
      { name: 'top', type: 'integer', required: false, description: `Maximum number of version entries to return per page. Accepts values 1–1000. Default: 25.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_items_in_drive',
    description: `List the children (files and folders) of a folder in a specific drive by drive ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. Use "root" as item_id to list top-level contents of the drive. To list items in the signed-in user's personal OneDrive, use microsoft365_onedrive_list_drive_items instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive containing the folder. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'item_id', type: 'string', required: true, description: `The ID of the folder whose children to list. Use "root" to list top-level contents of the drive.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "file ne null" returns only files; "folder ne null" returns only folders.` },
      { name: '$orderby', type: 'string', required: false, description: `Property to sort results by. Example: "name asc" or "lastModifiedDateTime desc".` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return. Example: "id,name,size,lastModifiedDateTime" reduces response payload.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of items to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of items to return per page (default: 25). Accepts values 1–999.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_permissions',
    description: `Retrieve the list of permissions (sharing and access grants) for a specific OneDrive file or folder. Returns all permission objects including sharing links, individual user grants, and inherited permissions.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder whose permissions to list. Obtain item IDs from list or get drive item operations.` },
      { name: 'top', type: 'integer', required: false, description: `Maximum number of permission entries to return per page. Accepts an integer between 1 and 100. Default: 25.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_recent_items',
    description: `List files recently viewed or modified by the signed-in user in OneDrive. Returns the most recently accessed items across all drives the user has access to.`,
    params: [
      { name: '$top', type: 'integer', required: false, description: `Maximum number of recent items to return. Accepts values 1–999.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_shared_items',
    description: `List files and folders that have been shared with the signed-in user from other people's OneDrive accounts or SharePoint sites.`,
    params: [
      { name: '$top', type: 'integer', required: false, description: `Maximum number of shared items to return. Accepts values 1–999.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_list_versions',
    description: `Retrieve the version history for a specific OneDrive file by its item ID. Returns a list of version objects including version ID, last modified time, size, and the identity of the user who made each change.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file whose version history to list. Obtain item IDs from list or get drive item operations.` },
      { name: 'top', type: 'integer', required: false, description: `Maximum number of version entries to return per page. Accepts an integer between 1 and 1000. Default: 25.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_move_drive_item',
    description: `Move a OneDrive file or folder to a different parent folder by updating its parentReference. Optionally rename the item during the move. Provide the destination folder's item ID as new_parent_id.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to move. Obtain item IDs from list or get drive item operations.` },
      { name: 'new_parent_id', type: 'string', required: true, description: `The item ID of the destination folder. Use "root" to move the item to the top level of OneDrive. Obtain folder IDs from list or get drive item operations.` },
      { name: 'new_name', type: 'string', required: false, description: `Optional new name to assign to the item during the move. If omitted, the item keeps its current name.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_resolve_shared_link',
    description: `Resolve a OneDrive or SharePoint sharing URL (e.g. a link pasted from the browser) into a drive item, returning its full metadata including drive ID, item ID, name, and download URL. The sharing URL must be base64url-encoded before passing it as encoded_sharing_url. Encoding: base64url(url) with no padding, prefixed with "u!" — e.g. u!aHR0cHM6Ly4uLg.`,
    params: [
      { name: 'encoded_sharing_url', type: 'string', required: true, description: `The base64url-encoded sharing URL prefixed with "u!". To encode: take the full sharing URL, base64url-encode it (no padding), then prepend "u!". Example: "u!aHR0cHM6Ly9jb250b3NvLnNoYXJlcG9pbnQuY29tLy4uLg".` },
    ],
  },
  {
    name: 'microsoft365_onedrive_restore_drive_item',
    description: `Restore a deleted OneDrive file or folder from the recycle bin back to its original location or an optionally specified destination. Provide new_parent_id and new_name to restore to a different location or with a different name.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the deleted OneDrive item to restore. Obtain deleted item IDs from recycle bin list operations.` },
      { name: 'new_name', type: 'string', required: false, description: `Optional new name to assign to the item when restoring. If omitted, the item is restored with its original name.` },
      { name: 'new_parent_id', type: 'string', required: false, description: `Optional item ID of the folder to restore the item into. If omitted, the item is restored to its original parent location.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_search_drive_items',
    description: `Search the signed-in user's OneDrive for files and folders matching a query string. Searches across file names, content, and metadata. Supports OData $top for result count and $select for field selection.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string to find files or folders by name or content. Example: "budget 2024" searches for items containing that text.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return. Example: "id,name,size,webUrl" reduces response payload.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of results to return. Accepts values 1–999.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_search_items_in_drive',
    description: `Search for files and folders within a specific drive by drive ID. Works across any drive accessible to the signed-in user, including SharePoint document libraries and Teams drives. To search the signed-in user's personal OneDrive, use microsoft365_onedrive_search_drive_items instead.`,
    params: [
      { name: 'drive_id', type: 'string', required: true, description: `The unique ID of the drive to search within. Obtain drive IDs from microsoft365_onedrive_list_drives or microsoft365_sharepoint_list_drives.` },
      { name: 'query', type: 'string', required: true, description: `Search query string to find files or folders by name or content. Example: "budget 2024" searches for items containing that text.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return. Example: "id,name,size,webUrl" reduces response payload.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of results to return. Accepts values 1–999.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_unfollow_drive_item',
    description: `Stop following a OneDrive file or folder. The item will no longer appear in your list of followed items and you will stop receiving change notifications for it.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to unfollow. The item must currently be in your followed items list. Obtain item IDs from list or get drive item operations.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_update_drive_item',
    description: `Update the metadata of a OneDrive file or folder by its item ID. Supports renaming (via name) and updating the description. At least one of name or description should be provided.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder to update. Obtain item IDs from list or get drive item operations.` },
      { name: 'description', type: 'string', required: false, description: `New description for the file or folder. Provide a short text description to attach to the item. Optional — can be updated independently from name.` },
      { name: 'name', type: 'string', required: false, description: `New name for the file or folder. Renaming a file preserves its extension unless explicitly changed. Optional — provide only when renaming.` },
    ],
  },
  {
    name: 'microsoft365_onedrive_update_permission',
    description: `Update the roles assigned to an existing permission on a OneDrive file or folder. Use this to change a user's access level from read to write or vice versa. Requires the item ID and the specific permission ID to update.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique ID of the OneDrive file or folder whose permission to update. Obtain item IDs from list or get drive item operations.` },
      { name: 'permission_id', type: 'string', required: true, description: `The unique ID of the permission to update. Obtain permission IDs from the list permissions operation on the same item.` },
      { name: 'roles', type: 'array', required: true, description: `New array of permission roles to assign. Use "read" for view-only access and "write" for edit access. Example: ["write"].` },
    ],
  },
  {
    name: 'microsoft365_onedrive_upload_large_file',
    description: `Create a resumable upload session for uploading large files (greater than 4 MB) to OneDrive. Returns an upload URL that the caller uses to upload file bytes in separate PATCH requests. The file is placed under the specified parent folder with the given filename.`,
    params: [
      { name: 'filename', type: 'string', required: true, description: `The name of the file to create or replace in OneDrive, including extension. Example: "report.xlsx".` },
      { name: 'parent_id', type: 'string', required: true, description: `The ID of the parent folder where the file will be uploaded. Use "root" to upload to the top-level OneDrive folder. Obtain folder IDs from list or get drive item operations.` },
      { name: 'conflict_behavior', type: 'string', required: false, description: `Behavior when a file with the same name already exists. "fail" aborts the upload, "replace" overwrites the existing file, "rename" saves with a new name. Default: replace.` },
    ],
  },
  {
    name: 'microsoft365_outlook_accept_event',
    description: `Accept a calendar event invitation.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `Event ID.` },
      { name: 'comment', type: 'string', required: false, description: `Response comment.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'send_response', type: 'boolean', required: false, description: `Send response.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_batch_move_messages',
    description: `Move up to 20 Outlook messages to a destination folder in a single Microsoft Graph batch request. Builds a $batch envelope where each subrequest POSTs to /me/messages/{id}/move. Returns a 200 response with per-subrequest status codes inside the responses array.`,
    params: [
      { name: 'destination_folder_id', type: 'string', required: true, description: `The ID or well-known name of the destination folder (e.g., 'inbox', 'deleteditems', 'drafts', or a specific folder ID like 'AAMkAGI2...').` },
      { name: 'message_ids', type: 'array', required: true, description: `Array of message IDs to move (max 20). Each ID is an Outlook message ID string.` },
    ],
  },
  {
    name: 'microsoft365_outlook_batch_update_messages',
    description: `Update properties on up to 20 Outlook messages in a single Microsoft Graph batch request. Builds a $batch envelope where each subrequest PATCHes /me/messages/{id} with the provided updates object. Common use: mark messages as read by passing {"isRead": true}. Returns a 200 response with per-subrequest status codes inside the responses array.`,
    params: [
      { name: 'message_ids', type: 'array', required: true, description: `Array of message IDs to update (max 20). Each ID is an Outlook message ID string.` },
      { name: 'updates', type: 'object', required: true, description: `Free-form object of message properties to update on all specified messages. Example: {"isRead": true} to mark as read, or {"isRead": false, "flag": {"flagStatus": "flagged"}} for multiple changes.` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_calendar_event',
    description: `Create a new calendar event in the user's Outlook calendar. Supports attendees, recurrence, reminders, online meetings, multiple locations, and event properties.`,
    params: [
      { name: 'end_datetime', type: 'string', required: true, description: `No description.` },
      { name: 'end_timezone', type: 'string', required: true, description: `No description.` },
      { name: 'start_datetime', type: 'string', required: true, description: `No description.` },
      { name: 'start_timezone', type: 'string', required: true, description: `No description.` },
      { name: 'subject', type: 'string', required: true, description: `No description.` },
      { name: 'attendees_optional', type: 'string', required: false, description: `Array of email addresses for optional attendees` },
      { name: 'attendees_required', type: 'string', required: false, description: `Array of email addresses for required attendees` },
      { name: 'attendees_resource', type: 'string', required: false, description: `Array of email addresses for resources (meeting rooms, equipment)` },
      { name: 'body_content', type: 'string', required: false, description: `No description.` },
      { name: 'body_contentType', type: 'string', required: false, description: `No description.` },
      { name: 'hideAttendees', type: 'boolean', required: false, description: `When true, each attendee only sees themselves` },
      { name: 'importance', type: 'string', required: false, description: `Event importance level` },
      { name: 'isAllDay', type: 'boolean', required: false, description: `Mark as all-day event` },
      { name: 'isOnlineMeeting', type: 'boolean', required: false, description: `Create an online meeting (Teams/Skype)` },
      { name: 'isReminderOn', type: 'boolean', required: false, description: `Enable or disable reminder` },
      { name: 'location', type: 'string', required: false, description: `No description.` },
      { name: 'locations', type: 'string', required: false, description: `JSON array of location objects with displayName, address, coordinates` },
      { name: 'onlineMeetingProvider', type: 'string', required: false, description: `Online meeting provider` },
      { name: 'recurrence_days_of_week', type: 'string', required: false, description: `Days of week for weekly recurrence (comma-separated)` },
      { name: 'recurrence_end_date', type: 'string', required: false, description: `End date for recurrence (YYYY-MM-DD), required if range_type is endDate` },
      { name: 'recurrence_interval', type: 'integer', required: false, description: `How often the event recurs (e.g., every 2 weeks = 2)` },
      { name: 'recurrence_occurrences', type: 'integer', required: false, description: `Number of occurrences, required if range_type is numbered` },
      { name: 'recurrence_range_type', type: 'string', required: false, description: `How the recurrence ends` },
      { name: 'recurrence_start_date', type: 'string', required: false, description: `Start date for recurrence (YYYY-MM-DD)` },
      { name: 'recurrence_type', type: 'string', required: false, description: `Recurrence pattern type` },
      { name: 'reminderMinutesBeforeStart', type: 'integer', required: false, description: `Minutes before event start to show reminder` },
      { name: 'sensitivity', type: 'string', required: false, description: `Event sensitivity/privacy level` },
      { name: 'showAs', type: 'string', required: false, description: `Free/busy status` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_calendar_group',
    description: `Create a new calendar group in the signed-in user's mailbox. Calendar groups organize multiple calendars together in Outlook.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the new calendar group (e.g., 'Work Calendars'). Must be unique among calendar groups for the user.` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_calendar_permission',
    description: `Grant a user access to a specific Outlook calendar by creating a calendar permission entry. Specify the user's email address and the role level (e.g., freeBusyRead, read, write, delegate).`,
    params: [
      { name: 'calendar_id', type: 'string', required: true, description: `The unique identifier of the calendar to share. Use a specific calendar ID from the list calendars endpoint.` },
      { name: 'email_address', type: 'string', required: true, description: `The email address of the user to grant calendar access to. Example: colleague@example.com` },
      { name: 'role', type: 'string', required: true, description: `The permission role to grant. Valid values: freeBusyRead (see free/busy only), limitedRead (see title and location), read (see all event details), write (create/edit/delete events), delegateWithoutPrivateEventAccess (delegate, no private events), delegateWithPrivateEventAccess (delegate including private events), custom (custom role).` },
      { name: 'name', type: 'string', required: false, description: `Display name of the user to grant access to. Optional; the Graph API will resolve it from the email if omitted.` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_category',
    description: `Create a new Outlook master category for the signed-in user. Categories have a display name and a color preset (none or preset0–preset24). Once created, categories can be applied to messages, events, and contacts.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name of the new category. Must be unique among the user's categories.` },
      { name: 'color', type: 'string', required: false, description: `The color assigned to the category. Use 'none' for no color, or 'preset0' through 'preset24' for a specific color slot. Defaults to preset0.` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_contact',
    description: `Create a new contact in the user's mailbox with name, email addresses, and phone numbers.`,
    params: [
      { name: 'givenName', type: 'string', required: true, description: `First name of the contact` },
      { name: 'surname', type: 'string', required: true, description: `Last name of the contact` },
      { name: 'businessPhones', type: 'array', required: false, description: `Array of business phone numbers` },
      { name: 'companyName', type: 'string', required: false, description: `Company name` },
      { name: 'emailAddresses', type: 'array', required: false, description: `Array of email address objects with 'address' and optional 'name' fields` },
      { name: 'jobTitle', type: 'string', required: false, description: `Job title` },
      { name: 'mobilePhone', type: 'string', required: false, description: `Mobile phone number` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_contact_folder',
    description: `Create a new contact folder in the signed-in user's mailbox. Optionally nest it under an existing parent folder by providing a parent folder ID.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name for the new contact folder (e.g., 'Work Contacts').` },
      { name: 'parent_folder_id', type: 'string', required: false, description: `Optional ID of the parent contact folder under which to create this folder. If omitted, the folder is created at the top level.` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_draft_message',
    description: `Create a new email draft in the mailbox.`,
    params: [
      { name: 'bcc_recipients', type: 'string', required: false, description: `BCC recipients.` },
      { name: 'body', type: 'string', required: false, description: `Email body content.` },
      { name: 'body_type', type: 'string', required: false, description: `Body content type.` },
      { name: 'cc_recipients', type: 'string', required: false, description: `CC recipients.` },
      { name: 'importance', type: 'string', required: false, description: `Importance.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'subject', type: 'string', required: false, description: `Email subject.` },
      { name: 'to_recipients', type: 'string', required: false, description: `To recipients.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_focused_inbox_override',
    description: `Create a Focused Inbox override that classifies all messages from a specific sender into either the Focused or Other inbox. This overrides the automatic machine learning classification for that sender.`,
    params: [
      { name: 'classify_as', type: 'string', required: true, description: `How to classify messages from this sender: 'focused' to route to Focused inbox, 'other' to route to Other inbox.` },
      { name: 'sender_email', type: 'string', required: true, description: `The email address of the sender to create an override for (e.g., 'newsletter@example.com').` },
      { name: 'sender_name', type: 'string', required: false, description: `Optional display name for the sender (e.g., 'Weekly Newsletter'). Used for display purposes only.` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_forward_draft',
    description: `Create a forward draft for a specific message.`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `Message ID.` },
      { name: 'comment', type: 'string', required: false, description: `Forward comment.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'to_recipients', type: 'string', required: false, description: `To recipients.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_mail_folder',
    description: `Create a new mail folder in the mailbox.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `Folder name.` },
      { name: 'is_hidden', type: 'boolean', required: false, description: `Hidden folder.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_message_rule',
    description: `Create a new inbox message rule.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `Rule name.` },
      { name: 'actions', type: 'object', required: false, description: `Rule actions.` },
      { name: 'conditions', type: 'object', required: false, description: `Rule conditions.` },
      { name: 'exceptions', type: 'object', required: false, description: `Exception conditions for the rule.` },
      { name: 'is_enabled', type: 'boolean', required: false, description: `Enable rule.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'sequence', type: 'integer', required: false, description: `Rule sequence.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_reply_all_draft',
    description: `Create a reply-all draft for a specific message.`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `Message ID.` },
      { name: 'comment', type: 'string', required: false, description: `Reply comment.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_reply_draft',
    description: `Create a reply draft for a specific message.`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `Message ID.` },
      { name: 'comment', type: 'string', required: false, description: `Reply comment.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_create_upload_session',
    description: `Create an upload session for attaching a large file to an Outlook message using Microsoft Graph. Returns an uploadUrl and expiration time. Use the uploadUrl to upload file content in chunks via PUT requests. Required for attachments larger than 3 MB.`,
    params: [
      { name: 'attachment_name', type: 'string', required: true, description: `The filename of the attachment (e.g., 'report.pdf'). Must include the file extension.` },
      { name: 'attachment_size', type: 'integer', required: true, description: `The total size of the attachment in bytes. Must be the exact file size before uploading.` },
      { name: 'message_id', type: 'string', required: true, description: `The ID of the draft Outlook message to attach the file to.` },
    ],
  },
  {
    name: 'microsoft365_outlook_decline_event',
    description: `Decline a calendar event invitation.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `Event ID.` },
      { name: 'comment', type: 'string', required: false, description: `Response comment.` },
      { name: 'proposed_new_time', type: 'object', required: false, description: `Proposed new meeting time.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'send_response', type: 'boolean', required: false, description: `Send response.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_calendar_event',
    description: `Delete a calendar event by ID.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_calendar_group',
    description: `Permanently delete a calendar group from the signed-in user's mailbox. Note: you cannot delete the default calendar group. All calendars within the group will also be deleted.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The unique ID of the calendar group to delete (e.g., 'AAMkAGI2...'). Obtain from List Calendar Groups. Cannot be the default calendar group.` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_calendar_permission',
    description: `Revoke a user's access to a specific Outlook calendar by deleting the calendar permission entry. This action is permanent and immediately removes the user's access.`,
    params: [
      { name: 'calendar_id', type: 'string', required: true, description: `The unique identifier of the calendar from which to remove the permission.` },
      { name: 'permission_id', type: 'string', required: true, description: `The unique identifier of the calendar permission entry to delete. Retrieve from the list calendar permissions endpoint.` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_category',
    description: `Delete an Outlook master category for the signed-in user. This permanently removes the category definition. Any messages or items tagged with this category will retain the tag label but the category color will no longer appear.`,
    params: [
      { name: 'category_id', type: 'string', required: true, description: `The unique ID of the Outlook category to delete. Retrieve it from the list_categories tool.` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_contact',
    description: `Permanently delete a contact.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `Contact ID.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_contact_folder',
    description: `Permanently delete a contact folder and all its contents from the signed-in user's mailbox. This action cannot be undone.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `The unique ID of the contact folder to delete (e.g., 'AAMkAGI2...'). Obtain from List Contact Folders. Warning: deletes all contacts within the folder.` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_focused_inbox_override',
    description: `Delete a Focused Inbox override rule for the signed-in user. Once deleted, messages from that sender will revert to automatic machine learning classification.`,
    params: [
      { name: 'override_id', type: 'string', required: true, description: `The unique ID of the Focused Inbox override rule to delete (e.g., 'AAMkAGI2...'). Obtain this from the List Focused Inbox Overrides tool.` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_mail_folder',
    description: `Permanently delete a mail folder and its contents.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `Folder ID.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_message',
    description: `Permanently delete an email message.`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `Message ID.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_delete_message_rule',
    description: `Delete an inbox message rule.`,
    params: [
      { name: 'rule_id', type: 'string', required: true, description: `Rule ID.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_find_meeting_times',
    description: `Find available meeting time slots for a set of attendees using Microsoft Graph's findMeetingTimes API. Returns a list of suggested meeting times when all required attendees are available within the given time window.`,
    params: [
      { name: 'attendee_emails', type: 'array', required: true, description: `Array of attendee email addresses to check availability for. Example: ["alice@example.com", "bob@example.com"]` },
      { name: 'end_date_time', type: 'string', required: true, description: `End of the time window to search for meeting times, in ISO 8601 format (e.g., 2025-01-15T18:00:00). The API will not suggest slots after this time.` },
      { name: 'meeting_duration', type: 'string', required: true, description: `Duration of the desired meeting in ISO 8601 duration format (e.g., PT30M for 30 minutes, PT1H for 1 hour, PT1H30M for 1.5 hours).` },
      { name: 'start_date_time', type: 'string', required: true, description: `Start of the time window to search for meeting times, in ISO 8601 format (e.g., 2025-01-15T08:00:00). The API will look for available slots at or after this time.` },
      { name: 'is_organizer_optional', type: 'boolean', required: false, description: `Whether the meeting organizer's presence is optional. When true, the organizer's calendar is not checked for availability. Defaults to false.` },
      { name: 'max_candidates', type: 'integer', required: false, description: `Maximum number of meeting time suggestions to return. Defaults to 20. Acceptable range: 1-40.` },
      { name: 'time_zone', type: 'string', required: false, description: `IANA time zone identifier for interpreting start_date_time and end_date_time (e.g., "UTC", "America/New_York", "Europe/London"). Defaults to UTC.` },
    ],
  },
  {
    name: 'microsoft365_outlook_forward_event',
    description: `Forward a calendar event to other people.`,
    params: [
      { name: 'comment', type: 'string', required: true, description: `Forward comment.` },
      { name: 'event_id', type: 'string', required: true, description: `Event ID.` },
      { name: 'to_recipients', type: 'string', required: true, description: `To recipients.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_attachment',
    description: `Download a specific attachment from an Outlook email message by attachment ID. Returns the full attachment including base64-encoded file content in the contentBytes field. Use List Attachments to get the attachment ID first.`,
    params: [
      { name: 'attachment_id', type: 'string', required: true, description: `The ID of the attachment to download.` },
      { name: 'message_id', type: 'string', required: true, description: `The ID of the message containing the attachment.` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_calendar_event',
    description: `Retrieve an existing calendar event by ID from the user's Outlook calendar.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_calendar_view',
    description: `Retrieve a collection of calendar events within a specific time range from the user's primary Outlook calendar. Returns all occurrences, exceptions, and single instances of events whose start/end times fall within the specified window.`,
    params: [
      { name: 'endDateTime', type: 'string', required: true, description: `End of the time range in ISO 8601 format (e.g., 2025-01-31T23:59:59). The calendar view returns events that end or overlap with this time.` },
      { name: 'startDateTime', type: 'string', required: true, description: `Start of the time range in ISO 8601 format (e.g., 2025-01-01T00:00:00). The calendar view returns events that start or overlap with this time.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to further narrow results (e.g., "subject eq 'Team Sync'").` },
      { name: '$orderby', type: 'string', required: false, description: `OData orderby expression to sort results (e.g., "start/dateTime asc").` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to include in the response (e.g., "subject,start,end,location"). Reduces payload size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of events to return (1-1000). Defaults to 10 if omitted.` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_contact',
    description: `Retrieve a specific contact by ID.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `Contact ID.` },
      { name: 'expand', type: 'string', required: false, description: `Expand relationships.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'select', type: 'string', required: false, description: `Select properties.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_contact_photo',
    description: `Retrieve the profile photo of a specific contact in the signed-in user's mailbox. Returns binary image data (JPEG). A 404 response indicates no photo is set for this contact.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `The unique ID of the contact whose photo to retrieve (e.g., 'AAMkAGI2...'). Obtain from List Contacts or Get Contact.` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_free_busy_schedule',
    description: `Retrieve the free/busy availability schedule for one or more users, rooms, or resources within a specific time window. Returns availability view, schedule items, and working hours for each requested address.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `End of the time window to retrieve schedule availability, in ISO 8601 format (e.g., 2025-01-15T18:00:00).` },
      { name: 'schedules', type: 'array', required: true, description: `Array of SMTP email addresses of users, distribution lists, or resources to get free/busy information for. Example: ["alice@example.com", "room@example.com"]` },
      { name: 'start_date_time', type: 'string', required: true, description: `Start of the time window to retrieve schedule availability, in ISO 8601 format (e.g., 2025-01-15T08:00:00).` },
      { name: 'availability_view_interval', type: 'integer', required: false, description: `Duration in minutes of each time slot in the availability view string. Valid values: 5, 6, 10, 15, 20, 30, 60 (default), 120, 240, 480, or 1440.` },
      { name: 'time_zone', type: 'string', required: false, description: `IANA time zone identifier for interpreting start and end times (e.g., "UTC", "America/New_York", "Europe/London"). Defaults to UTC.` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_mail_tips',
    description: `Get mail tips for a list of recipients before sending an email.`,
    params: [
      { name: 'email_addresses', type: 'array', required: true, description: `Recipient email addresses.` },
      { name: 'mail_tips_options', type: 'string', required: true, description: `Mail tip types.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_message',
    description: `Retrieve a specific email message by ID from the user's Outlook mailbox, including full body content, sender, recipients, attachments info, and metadata.`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `The ID of the message to retrieve.` },
    ],
  },
  {
    name: 'microsoft365_outlook_get_user_presence',
    description: `Get the presence status of a specific user.`,
    params: [
      { name: 'user_id', type: 'string', required: true, description: `User ID or email.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_attachments',
    description: `List all attachments on a specific Outlook email message. Returns attachment metadata including ID, name, size, and content type. Use the attachment ID with Get Attachment to download the file content.`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `The ID of the message to list attachments for.` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_calendar_events',
    description: `List calendar events from the user's Outlook calendar with filtering, sorting, pagination, and field selection.`,
    params: [
      { name: 'filter', type: 'string', required: false, description: `OData filter expression to filter events (e.g., startsWith(subject,'All'))` },
      { name: 'orderby', type: 'string', required: false, description: `OData orderby expression to sort events (e.g., start/dateTime desc)` },
      { name: 'select', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'skip', type: 'number', required: false, description: `Number of events to skip for pagination` },
      { name: 'top', type: 'number', required: false, description: `Maximum number of events to return` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_calendar_groups',
    description: `List all calendar groups in the signed-in user's mailbox. Calendar groups are containers that organize multiple calendars together in Outlook.`,
    params: [
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., 'name,classId'). Reduces response size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of calendar groups to return (1–200, default: 10).` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_calendar_permissions',
    description: `List all sharing permissions for a specific Outlook calendar. Returns the set of users and their assigned roles (e.g., freeBusyRead, read, write, delegate) for the given calendar.`,
    params: [
      { name: 'calendar_id', type: 'string', required: true, description: `The unique identifier of the calendar whose permissions to list. Use 'primary' for the default calendar or a specific calendar ID from the list calendars endpoint.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of permission entries to return (1-1000). Defaults to all entries if omitted.` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_calendars',
    description: `Retrieve all calendars in the user mailbox.`,
    params: [
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'skip', type: 'integer', required: false, description: `Skip count.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
      { name: 'top', type: 'integer', required: false, description: `Page size.` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_categories',
    description: `List all Outlook master categories defined for the signed-in user. Categories can be applied to messages, events, and contacts for color-coded organization.`,
    params: [
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of category properties to return (e.g., 'displayName,color').` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of categories to return (1–200).` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_contact_folders',
    description: `List all contact folders in the signed-in user's mailbox. Supports OData query parameters for filtering, field selection, and pagination.`,
    params: [
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results (e.g., "displayName eq 'Favorites'").` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., 'displayName,parentFolderId'). Reduces response size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of contact folders to return (1–200, default: 10).` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_contacts',
    description: `List all contacts in the user's mailbox with support for filtering, pagination, and field selection.`,
    params: [
      { name: '$filter', type: 'string', required: false, description: `Filter expression to narrow results (e.g., "emailAddresses/any(a:a/address eq 'user@example.com')")` },
      { name: '$orderby', type: 'string', required: false, description: `Property to sort by (e.g., "displayName")` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., "displayName,emailAddresses,phoneNumbers")` },
      { name: '$skip', type: 'integer', required: false, description: `Number of contacts to skip for pagination` },
      { name: '$top', type: 'integer', required: false, description: `Number of contacts to return (default: 10)` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_event_instances',
    description: `List all instances (occurrences) of a recurring calendar event within a specified date-time range. Requires the master recurring event ID and a start/end window in ISO 8601 format.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `End of the time window to query for instances, in ISO 8601 format (e.g., '2024-12-31T23:59:59Z'). Required by Microsoft Graph.` },
      { name: 'event_id', type: 'string', required: true, description: `The unique ID of the master recurring event whose instances to list (e.g., 'AAMkAGI2...'). This must be the series master event ID, not an individual occurrence.` },
      { name: 'start_date_time', type: 'string', required: true, description: `Start of the time window to query for instances, in ISO 8601 format (e.g., '2024-01-01T00:00:00Z'). Required by Microsoft Graph.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of event properties to return (e.g., 'subject,start,end'). Reduces response size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of event instances to return (1–200, default: 10).` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_focused_inbox_overrides',
    description: `List all Focused Inbox overrides for the signed-in user. Overrides define how messages from specific senders are classified — either into the Focused inbox or the Other inbox — overriding the automatic machine learning classification.`,
    params: [
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., 'classifyAs,senderEmailAddress').` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of overrides to return per page.` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_folder_delta',
    description: `Get incremental changes (delta sync) for mail folders in the user's mailbox using Microsoft Graph delta query. Returns new, updated, and deleted folders since the last sync. The response includes @odata.nextLink for pagination or @odata.deltaLink for the next delta call.`,
    params: [
      { name: '$deltatoken', type: 'string', required: false, description: `Delta token from a previous @odata.deltaLink response to retrieve only folder changes since the last sync. Omit on first call to get a full initial sync.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of folder properties to return (e.g., 'displayName,parentFolderId,totalItemCount,unreadItemCount').` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of folders to return per page (1–250).` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_mail_folders',
    description: `List all mail folders in the user mailbox.`,
    params: [
      { name: 'include_hidden', type: 'boolean', required: false, description: `Include hidden folders.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'skip', type: 'integer', required: false, description: `Skip count.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
      { name: 'top', type: 'integer', required: false, description: `Page size.` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_message_delta',
    description: `Get incremental changes (delta sync) for messages in a specific mail folder using Microsoft Graph delta query. Returns new, updated, and deleted messages since the last sync. The response includes @odata.nextLink for pagination or @odata.deltaLink for the next delta call. Pass $deltatoken from a previous deltaLink to get only changes since then.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `The mail folder ID or well-known name to sync (e.g., 'inbox', 'sentitems', 'drafts', or a specific folder ID).` },
      { name: '$deltatoken', type: 'string', required: false, description: `Delta token from a previous @odata.deltaLink response to retrieve only changes since the last sync. Omit on first call to get a full initial sync.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., 'subject,from,receivedDateTime,isRead'). Reduces response size.` },
      { name: '$skiptoken', type: 'string', required: false, description: `Skip token from a previous @odata.nextLink response to continue paginating through a large delta result set.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of messages to return per page (1–1000).` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_message_rules',
    description: `List all inbox message rules for the user.`,
    params: [
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_messages',
    description: `List all messages in the user's mailbox with support for filtering, pagination, and field selection. Returns 10 messages by default.`,
    params: [
      { name: '$filter', type: 'string', required: false, description: `Filter expression to narrow results (e.g., "from/emailAddress/address eq 'user@example.com'")` },
      { name: '$orderby', type: 'string', required: false, description: `Property to sort by (e.g., "receivedDateTime desc")` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., "subject,from,receivedDateTime")` },
      { name: '$skip', type: 'integer', required: false, description: `Number of messages to skip for pagination` },
      { name: '$top', type: 'integer', required: false, description: `Number of messages to return (1-1000, default: 10)` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_shared_calendar_events',
    description: `Retrieve calendar events from another user shared calendar.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `End date/time.` },
      { name: 'start_date_time', type: 'string', required: true, description: `Start date/time.` },
      { name: 'user_id', type: 'string', required: true, description: `User ID or email.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
      { name: 'top', type: 'integer', required: false, description: `Page size.` },
    ],
  },
  {
    name: 'microsoft365_outlook_list_shared_mailbox_messages',
    description: `List messages in a specific folder of a shared mailbox. Supports filtering, ordering, pagination, and field selection. Requires Mail.Read or Mail.ReadWrite permissions on the shared mailbox.`,
    params: [
      { name: 'folder_id', type: 'string', required: true, description: `The ID or well-known name of the mail folder to list messages from. Well-known names include: inbox, sentitems, drafts, deleteditems, junkemail, outbox, archive.` },
      { name: 'shared_mailbox_id', type: 'string', required: true, description: `The email address or user ID of the shared mailbox to read messages from (e.g., support@company.com or a user object ID).` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results (e.g., "isRead eq false" or "from/emailAddress/address eq 'sender@example.com'").` },
      { name: '$orderby', type: 'string', required: false, description: `OData orderby expression to sort messages (e.g., "receivedDateTime desc").` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of message properties to return (e.g., "subject,from,receivedDateTime,isRead"). Reduces response payload size.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of messages to skip for pagination (0-based offset). Use with $top for paging through results.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of messages to return (1-1000). Defaults to 10 if omitted.` },
    ],
  },
  {
    name: 'microsoft365_outlook_mailbox_settings_get',
    description: `Retrieve the mailbox settings for the signed-in user. Returns automatic replies (out-of-office) configuration, language, timezone, working hours, date/time format, and delegate meeting message delivery preferences.`,
    params: [
    ],
  },
  {
    name: 'microsoft365_outlook_mailbox_settings_update',
    description: `Update mailbox settings for the signed-in user. Supports configuring automatic replies (out-of-office), language, timezone, working hours, date/time format, and delegate meeting message delivery preferences. Only fields provided will be updated.`,
    params: [
      { name: 'automaticRepliesSetting', type: 'object', required: false, description: `Configuration for automatic replies (out-of-office). Set status, internal/external reply messages, and optional scheduled time window.` },
      { name: 'dateFormat', type: 'string', required: false, description: `Preferred date format string for the mailbox (e.g., 'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd').` },
      { name: 'delegateMeetingMessageDeliveryOptions', type: 'string', required: false, description: `Controls how meeting messages are delivered when a delegate is configured.` },
      { name: 'language', type: 'object', required: false, description: `Language and locale for the mailbox. Object with locale (e.g., 'en-US') and displayName.` },
      { name: 'timeFormat', type: 'string', required: false, description: `Preferred time format string for the mailbox (e.g., 'hh:mm tt' for 12-hour, 'HH:mm' for 24-hour).` },
      { name: 'timeZone', type: 'string', required: false, description: `Preferred time zone for the mailbox (e.g., 'UTC', 'Pacific Standard Time', 'Eastern Standard Time').` },
      { name: 'workingHours', type: 'object', required: false, description: `Working hours configuration including days of week, start/end times, and time zone.` },
    ],
  },
  {
    name: 'microsoft365_outlook_move_message',
    description: `Move a message to a different mail folder.`,
    params: [
      { name: 'destination_id', type: 'string', required: true, description: `Destination folder ID.` },
      { name: 'message_id', type: 'string', required: true, description: `Message ID.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_move_shared_mailbox_message',
    description: `Move a message in a shared mailbox to a different mail folder. Requires the caller to have read/write access to the shared mailbox.`,
    params: [
      { name: 'destination_folder_id', type: 'string', required: true, description: `The ID or well-known name of the destination mail folder to move the message into (e.g., inbox, drafts, sentitems, deleteditems, junkemail, or a folder ID).` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the message to move within the shared mailbox.` },
      { name: 'shared_mailbox_id', type: 'string', required: true, description: `The email address or user object ID of the shared mailbox containing the message (e.g., support@company.com or a GUID). The caller must have read/write permissions on this mailbox.` },
    ],
  },
  {
    name: 'microsoft365_outlook_reply_from_shared_mailbox',
    description: `Reply to an existing email message on behalf of a shared mailbox. The reply is automatically sent to the original sender and saved in the shared mailbox's Sent Items folder. Requires send-as or send-on-behalf permissions on the shared mailbox.`,
    params: [
      { name: 'comment', type: 'string', required: true, description: `The reply message text content. This will be included as the comment/body of the reply email sent from the shared mailbox.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the message in the shared mailbox to reply to. Retrieve from list or search shared mailbox messages.` },
      { name: 'shared_mailbox_id', type: 'string', required: true, description: `The email address or user ID of the shared mailbox to reply from (e.g., support@company.com or a user object ID). The caller must have send-as or send-on-behalf permissions.` },
    ],
  },
  {
    name: 'microsoft365_outlook_reply_to_message',
    description: `Reply to an existing email message. The reply is automatically sent to the original sender and saved in the Sent Items folder.`,
    params: [
      { name: 'comment', type: 'string', required: true, description: `Reply message content` },
      { name: 'messageId', type: 'string', required: true, description: `The unique identifier of the message to reply to` },
    ],
  },
  {
    name: 'microsoft365_outlook_search_messages',
    description: `Search messages by keywords across subject, body, sender, and other fields. Returns matching messages with support for pagination.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string (searches across subject, body, from, to)` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return (e.g., "subject,from,receivedDateTime")` },
      { name: '$skip', type: 'integer', required: false, description: `Number of messages to skip for pagination` },
      { name: '$top', type: 'integer', required: false, description: `Number of messages to return (1-1000, default: 10)` },
    ],
  },
  {
    name: 'microsoft365_outlook_search_people',
    description: `Search for people relevant to the signed-in user by name or email.`,
    params: [
      { name: 'filter', type: 'string', required: false, description: `OData filter.` },
      { name: 'order_by', type: 'string', required: false, description: `Order by field.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'search', type: 'string', required: false, description: `Search query.` },
      { name: 'select', type: 'string', required: false, description: `Select properties.` },
      { name: 'skip', type: 'integer', required: false, description: `Skip count.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
      { name: 'top', type: 'integer', required: false, description: `Page size.` },
    ],
  },
  {
    name: 'microsoft365_outlook_search_shared_mailbox_messages',
    description: `Search messages across all folders in a shared mailbox by keyword. Searches across subject, body, sender, and recipients. Requires Mail.Read or Mail.ReadWrite permissions on the shared mailbox.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string. Searches across subject, body, sender, and recipient fields. Example: "invoice Q1" will find messages mentioning invoice in Q1 context.` },
      { name: 'shared_mailbox_id', type: 'string', required: true, description: `The email address or user ID of the shared mailbox to search (e.g., support@company.com or a user object ID).` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of message properties to return (e.g., "subject,from,receivedDateTime"). Reduces response payload size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of messages to return (1-1000). Defaults to 10 if omitted.` },
    ],
  },
  {
    name: 'microsoft365_outlook_send_message',
    description: `Send an email message using Microsoft Graph API. The message is saved in the Sent Items folder by default.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Body content of the email` },
      { name: 'subject', type: 'string', required: true, description: `Subject line of the email` },
      { name: 'toRecipients', type: 'array', required: true, description: `Array of email addresses to send to` },
      { name: 'bccRecipients', type: 'array', required: false, description: `Array of email addresses to BCC` },
      { name: 'bodyType', type: 'string', required: false, description: `Content type of the body (Text or HTML)` },
      { name: 'ccRecipients', type: 'array', required: false, description: `Array of email addresses to CC` },
      { name: 'saveToSentItems', type: 'boolean', required: false, description: `Save the message in Sent Items folder (default: true)` },
    ],
  },
  {
    name: 'microsoft365_outlook_send_message_from_shared_mailbox',
    description: `Send an email message on behalf of a shared mailbox using Microsoft Graph API. The message is saved in the shared mailbox's Sent Items folder by default. Requires the caller to have send-as or send-on-behalf-of permissions on the shared mailbox.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Body content of the email. Provide plain text or HTML depending on the bodyType field.` },
      { name: 'shared_mailbox_id', type: 'string', required: true, description: `The email address or user ID of the shared mailbox to send from (e.g., support@company.com or a user object ID). The caller must have send-as or send-on-behalf permissions.` },
      { name: 'subject', type: 'string', required: true, description: `Subject line of the email to send from the shared mailbox.` },
      { name: 'toRecipients', type: 'array', required: true, description: `Array of email addresses to send the email to from the shared mailbox. Example: ["customer@example.com"]` },
      { name: 'bccRecipients', type: 'array', required: false, description: `Array of email addresses to BCC on the outgoing message from the shared mailbox.` },
      { name: 'bodyType', type: 'string', required: false, description: `Content type of the email body. Use 'Text' for plain text or 'HTML' for rich HTML content. Defaults to 'Text' if omitted.` },
      { name: 'ccRecipients', type: 'array', required: false, description: `Array of email addresses to CC on the outgoing message from the shared mailbox.` },
      { name: 'saveToSentItems', type: 'boolean', required: false, description: `Whether to save the sent message in the shared mailbox's Sent Items folder. Defaults to true.` },
    ],
  },
  {
    name: 'microsoft365_outlook_tentatively_accept_event',
    description: `Tentatively accept a calendar event invitation.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `Event ID.` },
      { name: 'comment', type: 'string', required: false, description: `Response comment.` },
      { name: 'proposed_new_time', type: 'object', required: false, description: `Proposed new meeting time.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'send_response', type: 'boolean', required: false, description: `Send response.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_checklist_items_create',
    description: `Add a checklist item (subtask) to a specific task in a Microsoft To Do task list.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name of the checklist item.` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task to add the checklist item to.` },
      { name: 'is_checked', type: 'boolean', required: false, description: `Whether the checklist item is already checked/completed.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_checklist_items_delete',
    description: `Permanently delete a checklist item (subtask) from a task in a Microsoft To Do task list.`,
    params: [
      { name: 'checklist_item_id', type: 'string', required: true, description: `The ID of the checklist item to delete.` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_checklist_items_get',
    description: `Get a specific checklist item (subtask) from a task in a Microsoft To Do task list.`,
    params: [
      { name: 'checklist_item_id', type: 'string', required: true, description: `The ID of the checklist item.` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_checklist_items_list',
    description: `List all checklist items (subtasks) for a specific task in a Microsoft To Do task list.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_checklist_items_update',
    description: `Update a checklist item (subtask) in a Microsoft To Do task. Only provided fields are changed.`,
    params: [
      { name: 'checklist_item_id', type: 'string', required: true, description: `The ID of the checklist item to update.` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task.` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the checklist item.` },
      { name: 'is_checked', type: 'boolean', required: false, description: `Whether the checklist item is checked/completed.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_lists_create',
    description: `Create a new Microsoft To Do task list.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The name of the task list.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_lists_delete',
    description: `Permanently delete a Microsoft To Do task list and all its tasks.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list to delete.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_lists_get',
    description: `Get a specific Microsoft To Do task list by ID.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_lists_list',
    description: `List all Microsoft To Do task lists for the current user.`,
    params: [
    ],
  },
  {
    name: 'microsoft365_outlook_todo_lists_update',
    description: `Rename a Microsoft To Do task list.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The new name for the task list.` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list to update.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_tasks_create',
    description: `Create a new task in a Microsoft To Do task list with optional body, due date, importance, and reminder.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list to add the task to.` },
      { name: 'title', type: 'string', required: true, description: `The title of the task.` },
      { name: 'body', type: 'string', required: false, description: `The body/notes of the task (plain text).` },
      { name: 'categories', type: 'array', required: false, description: `Array of category names to assign to the task.` },
      { name: 'due_date', type: 'string', required: false, description: `Due date in YYYY-MM-DD format (e.g. "2026-04-15").` },
      { name: 'due_time_zone', type: 'string', required: false, description: `Time zone for the due date (e.g. "UTC", "America/New_York"). Defaults to UTC.` },
      { name: 'importance', type: 'string', required: false, description: `The importance of the task: low, normal, or high.` },
      { name: 'reminder_date_time', type: 'string', required: false, description: `Reminder date and time in ISO 8601 format (e.g. "2026-04-15T09:00:00").` },
      { name: 'reminder_time_zone', type: 'string', required: false, description: `Time zone for the reminder (e.g. "UTC"). Defaults to UTC.` },
      { name: 'status', type: 'string', required: false, description: `The status of the task: notStarted, inProgress, completed, waitingOnOthers, or deferred.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_tasks_delete',
    description: `Permanently delete a task from a Microsoft To Do task list.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task to delete.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_tasks_get',
    description: `Get a specific task from a Microsoft To Do task list.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task.` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_tasks_list',
    description: `List all tasks in a Microsoft To Do task list with optional filtering and pagination.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression (e.g. "status eq 'notStarted'").` },
      { name: '$orderby', type: 'string', required: false, description: `Property to sort by (e.g. "createdDateTime desc").` },
      { name: '$skip', type: 'integer', required: false, description: `Number of tasks to skip for pagination.` },
      { name: '$top', type: 'integer', required: false, description: `Number of tasks to return (default: 10).` },
    ],
  },
  {
    name: 'microsoft365_outlook_todo_tasks_update',
    description: `Update a task in a Microsoft To Do task list. Only provided fields are changed.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `The ID of the task list.` },
      { name: 'task_id', type: 'string', required: true, description: `The ID of the task to update.` },
      { name: 'body', type: 'string', required: false, description: `New body/notes for the task (plain text).` },
      { name: 'categories', type: 'array', required: false, description: `Array of category names to assign to the task.` },
      { name: 'due_date', type: 'string', required: false, description: `Due date in YYYY-MM-DD format.` },
      { name: 'due_time_zone', type: 'string', required: false, description: `Time zone for the due date. Defaults to UTC.` },
      { name: 'importance', type: 'string', required: false, description: `The importance: low, normal, or high.` },
      { name: 'status', type: 'string', required: false, description: `The status: notStarted, inProgress, completed, waitingOnOthers, or deferred.` },
      { name: 'title', type: 'string', required: false, description: `New title for the task.` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_calendar_event',
    description: `Update an existing Outlook calendar event. Only provided fields will be updated. Supports time, attendees, location, reminders, online meetings, recurrence, and event properties.`,
    params: [
      { name: 'event_id', type: 'string', required: true, description: `The ID of the calendar event to update` },
      { name: 'attendees_optional', type: 'string', required: false, description: `Comma-separated optional attendee emails` },
      { name: 'attendees_required', type: 'string', required: false, description: `Comma-separated required attendee emails` },
      { name: 'attendees_resource', type: 'string', required: false, description: `Comma-separated resource emails (meeting rooms, equipment)` },
      { name: 'body_content', type: 'string', required: false, description: `Event description/body` },
      { name: 'body_contentType', type: 'string', required: false, description: `Content type of body` },
      { name: 'categories', type: 'string', required: false, description: `Comma-separated categories` },
      { name: 'end_datetime', type: 'string', required: false, description: `Event end time in RFC3339 format` },
      { name: 'end_timezone', type: 'string', required: false, description: `Timezone for end time` },
      { name: 'hideAttendees', type: 'boolean', required: false, description: `When true, each attendee only sees themselves` },
      { name: 'importance', type: 'string', required: false, description: `Event importance level` },
      { name: 'isAllDay', type: 'boolean', required: false, description: `Mark as all-day event` },
      { name: 'isOnlineMeeting', type: 'boolean', required: false, description: `Create an online meeting (Teams/Skype)` },
      { name: 'isReminderOn', type: 'boolean', required: false, description: `Enable or disable reminder` },
      { name: 'location', type: 'string', required: false, description: `Physical or virtual location` },
      { name: 'locations', type: 'string', required: false, description: `JSON array of location objects with displayName, address, coordinates` },
      { name: 'onlineMeetingProvider', type: 'string', required: false, description: `Online meeting provider` },
      { name: 'recurrence_days_of_week', type: 'string', required: false, description: `Days of week for weekly recurrence (comma-separated)` },
      { name: 'recurrence_end_date', type: 'string', required: false, description: `End date for recurrence (YYYY-MM-DD)` },
      { name: 'recurrence_interval', type: 'integer', required: false, description: `How often the event recurs (e.g., every 2 weeks = 2)` },
      { name: 'recurrence_occurrences', type: 'integer', required: false, description: `Number of occurrences` },
      { name: 'recurrence_range_type', type: 'string', required: false, description: `How the recurrence ends` },
      { name: 'recurrence_start_date', type: 'string', required: false, description: `Start date for recurrence (YYYY-MM-DD)` },
      { name: 'recurrence_type', type: 'string', required: false, description: `Recurrence pattern type` },
      { name: 'reminderMinutesBeforeStart', type: 'integer', required: false, description: `Minutes before event start to show reminder` },
      { name: 'sensitivity', type: 'string', required: false, description: `Event sensitivity/privacy level` },
      { name: 'showAs', type: 'string', required: false, description: `Free/busy status` },
      { name: 'start_datetime', type: 'string', required: false, description: `Event start time in RFC3339 format` },
      { name: 'start_timezone', type: 'string', required: false, description: `Timezone for start time` },
      { name: 'subject', type: 'string', required: false, description: `Event title/summary` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_calendar_group',
    description: `Update the name of an existing calendar group in the signed-in user's mailbox.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The unique ID of the calendar group to update (e.g., 'AAMkAGI2...'). Obtain from List Calendar Groups.` },
      { name: 'name', type: 'string', required: true, description: `The new name for the calendar group (e.g., 'Personal Calendars').` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_calendar_permission',
    description: `Update the role of an existing calendar permission entry. Use this to change a user's access level (e.g., upgrade from read to write, or downgrade from delegate to read) on a specific calendar.`,
    params: [
      { name: 'calendar_id', type: 'string', required: true, description: `The unique identifier of the calendar that contains the permission to update.` },
      { name: 'permission_id', type: 'string', required: true, description: `The unique identifier of the calendar permission entry to update. Retrieve from the list calendar permissions endpoint.` },
      { name: 'role', type: 'string', required: true, description: `The new permission role to assign. Valid values: freeBusyRead (see free/busy only), limitedRead (see title and location), read (see all event details), write (create/edit/delete events), delegateWithoutPrivateEventAccess (delegate, no private events), delegateWithPrivateEventAccess (delegate including private events), custom (custom role).` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_category',
    description: `Update the display name or color of an existing Outlook master category. Provide the category ID and at least one of display_name or color to update.`,
    params: [
      { name: 'category_id', type: 'string', required: true, description: `The unique ID of the Outlook category to update. Retrieve it from the list_categories tool.` },
      { name: 'color', type: 'string', required: false, description: `New color for the category. Use 'none' for no color, or 'preset0' through 'preset24' for a specific color slot.` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the category. Must be unique among the user's categories if provided.` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_contact',
    description: `Update properties of an existing contact.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `Contact ID.` },
      { name: 'company_name', type: 'string', required: false, description: `Company name.` },
      { name: 'email_addresses', type: 'string', required: false, description: `Email addresses.` },
      { name: 'given_name', type: 'string', required: false, description: `First name.` },
      { name: 'job_title', type: 'string', required: false, description: `Job title.` },
      { name: 'mobile_phone', type: 'string', required: false, description: `Mobile phone.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'surname', type: 'string', required: false, description: `Last name.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_contact_folder',
    description: `Update the display name of an existing contact folder in the signed-in user's mailbox.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The new display name for the contact folder (e.g., 'Updated Contacts').` },
      { name: 'folder_id', type: 'string', required: true, description: `The unique ID of the contact folder to update (e.g., 'AAMkAGI2...'). Obtain from List Contact Folders.` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_focused_inbox_override',
    description: `Update an existing Focused Inbox override to change how messages from a specific sender are classified. Use this to switch a sender between Focused and Other inbox routing.`,
    params: [
      { name: 'classify_as', type: 'string', required: true, description: `Updated classification for the sender: 'focused' to route to Focused inbox, 'other' to route to Other inbox.` },
      { name: 'override_id', type: 'string', required: true, description: `The unique ID of the Focused Inbox override to update. Retrieve it from the list_focused_inbox_overrides tool.` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_mail_folder',
    description: `Rename or update a mail folder.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `New folder name.` },
      { name: 'folder_id', type: 'string', required: true, description: `Folder ID.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_message',
    description: `Update properties of an email message (e.g. mark as read, set importance).`,
    params: [
      { name: 'message_id', type: 'string', required: true, description: `Message ID.` },
      { name: 'body', type: 'string', required: false, description: `Message body content.` },
      { name: 'body_content_type', type: 'string', required: false, description: `Body content type.` },
      { name: 'categories', type: 'array', required: false, description: `Categories.` },
      { name: 'importance', type: 'string', required: false, description: `Importance.` },
      { name: 'inference_classification', type: 'string', required: false, description: `Inference classification.` },
      { name: 'is_delivery_receipt_requested', type: 'boolean', required: false, description: `Delivery receipt requested.` },
      { name: 'is_read', type: 'boolean', required: false, description: `Mark as read.` },
      { name: 'is_read_receipt_requested', type: 'boolean', required: false, description: `Read receipt requested.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'subject', type: 'string', required: false, description: `Updated subject.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_outlook_update_message_rule',
    description: `Update an existing inbox message rule.`,
    params: [
      { name: 'rule_id', type: 'string', required: true, description: `Rule ID.` },
      { name: 'actions', type: 'object', required: false, description: `Rule actions.` },
      { name: 'conditions', type: 'object', required: false, description: `Rule conditions.` },
      { name: 'display_name', type: 'string', required: false, description: `Rule name.` },
      { name: 'exceptions', type: 'object', required: false, description: `Exception conditions for the rule.` },
      { name: 'is_enabled', type: 'boolean', required: false, description: `Enable rule.` },
      { name: 'is_read_only', type: 'boolean', required: false, description: `Mark rule as read-only.` },
      { name: 'schema_version', type: 'string', required: false, description: `Schema version` },
      { name: 'sequence', type: 'integer', required: false, description: `Rule sequence.` },
      { name: 'tool_version', type: 'string', required: false, description: `Tool version` },
    ],
  },
  {
    name: 'microsoft365_powerpoint_create_presentation',
    description: `Create a new PowerPoint presentation (.pptx) in OneDrive by initiating a resumable upload session. Returns an uploadUrl that the caller must use to upload the .pptx file bytes via one or more PUT requests. The presentation is placed under the specified parent folder with the given filename. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      { name: 'filename', type: 'string', required: true, description: `The base name of the PowerPoint presentation to create, without the .pptx extension. The extension is appended automatically. Example: "Q4 Review" creates "Q4 Review.pptx".` },
      { name: 'parent_id', type: 'string', required: true, description: `The OneDrive item ID of the parent folder where the presentation will be created. Use "root" to create the file at the top level of OneDrive. Obtain folder IDs from list or get drive item operations.` },
      { name: 'conflict_behavior', type: 'string', required: false, description: `Behavior when a file with the same name already exists in the target folder. "fail" aborts and returns an error, "replace" overwrites the existing file, "rename" saves the new presentation with a different auto-generated name. Default: replace.` },
    ],
  },
  {
    name: 'microsoft365_powerpoint_read_presentation',
    description: `Export a PowerPoint presentation (.pptx) from OneDrive as a PDF by requesting the file content with the format=pdf conversion parameter. Returns the PDF binary of the presentation. Note: Microsoft Graph converts the presentation server-side to PDF; it does not return Markdown or plain text. Client-side parsing is required to extract text or slide content from the returned PDF. Requires Files.Read or Files.ReadWrite scope.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique OneDrive item ID of the PowerPoint presentation (.pptx) to export as PDF. Obtain item IDs from list drive items, search drive items, or get drive item operations. Example: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K".` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_add_group_member',
    description: `Add an Azure AD user to a Microsoft 365 group (including SharePoint site groups) by providing the group ID and the user's object ID. This uses the Graph API directoryObjects reference endpoint to create the membership link.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The Azure AD object ID of the group to add the member to. Example: '7d8a5b3c-1234-5678-abcd-ef0123456789'.` },
      { name: 'user_id', type: 'string', required: true, description: `The Azure AD object ID of the user to add to the group. Use the find_user_by_email tool to resolve an email to an object ID. Example: 'aaaabbbb-1234-5678-abcd-ef0123456789'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_add_role_assignment',
    description: `Grant a user or group a role (read, write, or owner) on a SharePoint site by adding a permission entry. Provide either user_id or group_id (not both). The roles array should contain one or more of: 'read', 'write', 'owner'.`,
    params: [
      { name: 'roles', type: 'array', required: true, description: `Array of roles to grant. Valid values are 'read', 'write', and 'owner'. Example: ["write"] grants write (contribute) permission.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site on which to add the permission. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'group_id', type: 'string', required: false, description: `Azure AD group object ID to grant the role to. Provide either user_id or group_id — not both. Example: '7d8a5b3c-1234-5678-abcd-ef0123456789'.` },
      { name: 'user_id', type: 'string', required: false, description: `Azure AD user object ID to grant the role to. Provide either user_id or group_id — not both. Example: 'aaaabbbb-1234-5678-abcd-ef0123456789'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_checkin_file',
    description: `Check in a checked-out file in a SharePoint document library to make the version available to others. Optionally provide a comment describing the changes and specify the check-in type. Requires the file to be checked out first.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique drive item ID of the file to check in. The file must currently be checked out. Obtain item IDs from list drive items or get drive item operations.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'check_in_as', type: 'string', required: false, description: `The type of check-in to perform. 'published' makes the version visible to all users. 'unspecified' (default) lets the server decide based on document library configuration.` },
      { name: 'comment', type: 'string', required: false, description: `An optional comment to associate with the checked-in version, describing the changes made.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_checkout_file',
    description: `Check out a file in a SharePoint document library to prevent others from editing it while you make changes. The file must be checked back in using the check-in operation when editing is complete.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique drive item ID of the file to check out. Obtain item IDs from list drive items or get drive item operations.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_create_list',
    description: `Create a new list in a SharePoint site. Specify a display name and optionally a template type (e.g., genericList, documentLibrary, events) and description. Returns the newly created list.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `Display name for the new list. Example: 'Project Tasks'.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site in which to create the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new list. Example: 'Tracks project tasks and assignments.'` },
      { name: 'template', type: 'string', required: false, description: `SharePoint list template to use. Valid values: genericList (default), documentLibrary, survey, links, announcements, contacts, events, tasks.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_create_list_field',
    description: `Add a new column (field) to a SharePoint list. Specify the internal column name, column type (text, number, boolean, dateTime, choice, hyperlinkOrPicture, personOrGroup), and optionally a display name and description. The tool emits the appropriate Microsoft Graph column definition block for the chosen type.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list to which the column will be added. Use the list GUID or display name.` },
      { name: 'name', type: 'string', required: true, description: `Internal name for the new column. Used as the key in item fields objects. Must be unique within the list and contain no spaces (use camelCase or underscores). Example: 'taskStatus'.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'column_type', type: 'string', required: false, description: `Type of column to create. Determines which Microsoft Graph column configuration block is used. Valid values: text (single or multi-line text), number (numeric values), boolean (yes/no checkbox), dateTime (date and/or time), choice (dropdown or radio from a fixed list), hyperlinkOrPicture (URL or image), personOrGroup (people picker). Default: text.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new column. Appears as a tooltip or hint in the SharePoint list UI.` },
      { name: 'display_name', type: 'string', required: false, description: `Human-readable display name for the column as shown in the SharePoint list UI. If omitted, the internal name is used.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_create_list_item',
    description: `Create a new item in a SharePoint list. Provide a 'fields' object whose keys are the internal column names and whose values are the field data. The required 'Title' field sets the item's primary display name.`,
    params: [
      { name: 'fields', type: 'object', required: true, description: `Object containing the field values for the new item. Keys are internal column names (e.g., 'Title', 'Status', 'DueDate'). Example: {"Title": "New Task", "Status": "In Progress"}.` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list in which to create the item. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_create_subsite',
    description: `Create a new subsite under an existing SharePoint site using the Microsoft Graph beta API. Requires the parent site ID and display name. Optionally specify a description and web template (e.g., 'STS#0' for a team site).`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `Display name of the new subsite. Example: 'Marketing Q3 Campaign'.` },
      { name: 'parent_site_id', type: 'string', required: true, description: `ID of the parent SharePoint site under which the subsite will be created. Use a site GUID or 'root' for the tenant root site.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new subsite. Example: 'Site for the Q3 marketing campaign team.'` },
      { name: 'web_template', type: 'string', required: false, description: `SharePoint web template to use when creating the subsite. Common values: 'STS#0' (Team Site), 'BLOG#0' (Blog Site), 'BDR#0' (Document Center). Defaults to the API default if not specified.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_delete_list',
    description: `Permanently delete a SharePoint list from a site. This action is irreversible and removes the list along with all its items and metadata.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list to delete. Use the list GUID or the list's display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_delete_list_field',
    description: `Permanently delete a column (field) from a SharePoint list. This action is irreversible and removes the column definition and all data stored in that column for every list item.`,
    params: [
      { name: 'column_id', type: 'string', required: true, description: `ID of the column to delete. Use the column GUID returned by the list fields endpoint.` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list that contains the column. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_delete_list_item',
    description: `Permanently delete an item from a SharePoint list. This action is irreversible and removes the item and all its field data.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `ID of the list item to delete. This is the numeric or string identifier of the item within the list.` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list that contains the item. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_delete_role_assignment',
    description: `Remove a specific permission entry from a SharePoint site by deleting its permission ID. This permanently removes the granted access for the user or group associated with that permission.`,
    params: [
      { name: 'permission_id', type: 'string', required: true, description: `The ID of the permission entry to delete. Obtain this from the list permissions endpoint. Example: 'aGVyZUlzVGhlV2F5VGhlUG93ZXJJcw'.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site from which to remove the permission. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_delete_webhook',
    description: `Delete a Microsoft Graph change notification subscription (webhook) by its subscription ID. After deletion, no further notifications will be sent to the registered notification URL for this subscription.`,
    params: [
      { name: 'subscription_id', type: 'string', required: true, description: `The ID of the subscription to delete. Obtain this from the create subscription response or by listing subscriptions. Example: 'abc123de-4567-89ab-cdef-0123456789ab'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_download_file',
    description: `Download the binary content of a file from a SharePoint document library by its item ID. The response is the raw file bytes (not JSON). For text files this will be readable text; for binary files (images, Office documents) it will be binary data. Use the item ID from list or get drive item operations.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique drive item ID of the file to download from the SharePoint site's document library. Obtain item IDs from list drive items or search drive items operations.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_find_user_by_email',
    description: `Look up an Azure Active Directory user by their email address (UPN). Returns the user's object ID, display name, and other profile properties. This is useful for resolving a user email to an object ID before adding them to a SharePoint site or group.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `The email address (user principal name) of the Azure AD user to look up. Example: 'john.doe@contoso.com'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_follow_document',
    description: `Follow a SharePoint document or OneDrive file so it appears in the signed-in user's followed documents list. Provide the drive item ID of the document to follow.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The ID of the drive item (document) to follow. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_get_list',
    description: `Retrieve a specific SharePoint list by its ID within a site. Optionally expand related resources such as columns and items to retrieve list metadata in a single call.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID or name of the SharePoint list to retrieve. Can be the list GUID or the list's display name (URL-encoded).` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site containing the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$expand', type: 'string', required: false, description: `Comma-separated list of related resources to expand. Example: 'columns,items' to include column definitions and list items in the response.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_get_list_item',
    description: `Retrieve a single item from a SharePoint list by its item ID. Use '$expand=fields' to include the column values in the response.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `ID of the list item to retrieve. This is the numeric or GUID identifier of the item within the list.` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list that contains the item. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$expand', type: 'string', required: false, description: `Comma-separated list of related resources to expand. Default is 'fields' to include column values. Example: 'fields'.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return. Example: 'id,createdDateTime,fields'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_get_search_suggestions',
    description: `Get search query suggestions for SharePoint content using the Microsoft Search beta API. Returns autocomplete suggestions based on the provided search text to help users refine their queries.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `The partial search term for which to retrieve suggestions. Example: 'proj' returns suggestions like 'project plan', 'project budget'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_get_site',
    description: `Retrieve properties of a SharePoint site by its ID. Use 'root' for the tenant root site, a GUID for a specific site, or the format '<hostname>:/sites/<path>' (e.g., 'contoso.sharepoint.com:/sites/Marketing').`,
    params: [
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site to retrieve. Use 'root' for the tenant root site, a site GUID, or the format '<hostname>:/sites/<path>' (e.g., 'contoso.sharepoint.com:/sites/Marketing').` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_content_types',
    description: `List all content types defined in a SharePoint site. Supports OData filtering, field selection, and pagination via $top. Content types define the metadata schema for lists and libraries.`,
    params: [
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site whose content types to retrieve. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "isBuiltIn eq false" to return only custom content types.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each content type. Example: 'id,name,description,isBuiltIn'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of content types to return per page. Default is determined by the API.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_drives',
    description: `List all drives (document libraries) within a specific SharePoint site. Returns drive IDs, names, and types. Use the returned drive IDs with other drive item tools to access files within that library. To list all drives accessible to the signed-in user across all sites, use microsoft365_onedrive_list_drives instead.`,
    params: [
      { name: 'site_id', type: 'string', required: true, description: `The unique ID of the SharePoint site whose drives to list. Obtain site IDs from microsoft365_sharepoint_get_site or microsoft365_sharepoint_list_sites.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of drive properties to return. Example: "id,name,driveType" reduces response payload.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_file_versions',
    description: `List all versions of a file in a SharePoint document library. Returns version metadata including version number, last modified time, size, and the user who made each change.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique drive item ID of the file whose version history to retrieve. Obtain item IDs from list drive items or get drive item operations.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the file. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of versions to return per page. Default is determined by the API.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_followed_sites',
    description: `List all SharePoint sites that the signed-in user is following. Returns site IDs, names, URLs, and descriptions. Use the returned site IDs with microsoft365_sharepoint_get_site or microsoft365_sharepoint_list_drives to explore the site's content.`,
    params: [
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_list_fields',
    description: `List all column definitions (fields) for a SharePoint list. Returns metadata for each column including its name, type, and configuration. Supports OData filtering, field selection, and pagination.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list whose column definitions to retrieve. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "hidden eq false" to return only visible columns.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each column. Example: 'id,name,displayName,columnGroup,hidden'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of columns to return per page. Default is determined by the API.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_list_items',
    description: `Retrieve items from a SharePoint list. Supports OData filtering, field selection, ordering, pagination, and expanding related resources such as fields (column values).`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list whose items to retrieve. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$expand', type: 'string', required: false, description: `Comma-separated list of related resources to expand. Use 'fields' to include the column values for each item. Example: 'fields'.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "fields/Status eq 'Active'" to return only active items.` },
      { name: '$orderby', type: 'string', required: false, description: `OData orderby expression to sort results. Example: 'fields/Title asc' or 'createdDateTime desc'.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each item. Example: 'id,createdDateTime,fields'.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of items to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of items to return per page. Default is determined by the API.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_lists',
    description: `List all lists in a SharePoint site. Supports OData filtering, field selection, pagination, and expansion of related resources such as columns and items.`,
    params: [
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site whose lists to retrieve. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$expand', type: 'string', required: false, description: `Comma-separated list of related resources to expand. Example: 'columns,items' to include column definitions and list items.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "list/template eq 'documentLibrary'" to return only document libraries.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each list. Example: 'id,displayName,description,webUrl'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of lists to return per page. Default is determined by the API.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_site_members',
    description: `List all permission entries (members) for a SharePoint site. Returns users and groups with their assigned roles. Supports OData pagination and expansion of related identity resources.`,
    params: [
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site whose members (permissions) to retrieve. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: '$expand', type: 'string', required: false, description: `Comma-separated list of related resources to expand. Example: 'grantedToIdentities' to include the full identity objects for each permission entry.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of permission entries to return per page. Default is determined by the API.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_list_sites',
    description: `List SharePoint sites accessible to the signed-in user. Use the search parameter to find sites by name or keyword. Defaults to returning all sites (search=*). Supports OData query options for pagination and field selection.`,
    params: [
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of properties to return for each site. Example: 'id,displayName,webUrl,description'.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of sites to return per page (1-999). Default is determined by the API.` },
      { name: 'search', type: 'string', required: false, description: `Search keyword to filter sites by name or description. Use '*' to return all accessible sites. Example: 'Marketing' or 'project'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_recycle_item',
    description: `Move a file or folder in a SharePoint document library to the site recycle bin. This is a soft-delete — the item can be restored from the recycle bin. Permanent deletion requires a separate operation on the recycle bin itself.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique drive item ID of the file or folder to move to the recycle bin. Obtain item IDs from list drive items or search drive items operations.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the item to recycle. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_remove_group_member',
    description: `Remove a user from an Azure AD group (including Microsoft 365 and SharePoint site groups) by providing the group ID and user object ID. This permanently removes the membership.`,
    params: [
      { name: 'group_id', type: 'string', required: true, description: `The Azure AD object ID of the group to remove the member from. Example: '7d8a5b3c-1234-5678-abcd-ef0123456789'.` },
      { name: 'user_id', type: 'string', required: true, description: `The Azure AD object ID of the user to remove from the group. Example: 'aaaabbbb-1234-5678-abcd-ef0123456789'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_restore_recycled_item',
    description: `Restore a previously recycled (soft-deleted) item in a SharePoint document library. Optionally specify a new parent folder and/or new name for the restored item. If neither is provided, the item is restored to its original location.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The unique drive item ID of the recycled item to restore. Obtain item IDs from list drive items or search recycled items operations.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the recycled item. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'new_name', type: 'string', required: false, description: `Optional new filename to give the restored item. If omitted, the item retains its original name.` },
      { name: 'new_parent_id', type: 'string', required: false, description: `Optional drive item ID of the parent folder to restore the item into. If omitted, the item is restored to its original parent location.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_search',
    description: `Search across SharePoint sites, lists, drive items, and list items using the Microsoft Search API. Supports full-text keyword search and KQL (Keyword Query Language). Returns up to 25 results by default.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query string to find matching SharePoint content. Supports keyword search and KQL (Keyword Query Language). Example: 'project plan' or 'site:https://contoso.sharepoint.com/sites/Marketing'.` },
      { name: 'entity_types', type: 'array', required: false, description: `Array of entity types to search across. Valid values: driveItem, listItem, site, list, drive, externalItem. Default is ['driveItem', 'listItem'].` },
      { name: 'from', type: 'integer', required: false, description: `Zero-based index of the first result to return, used for pagination. Default is 0 (start from the first result).` },
      { name: 'size', type: 'integer', required: false, description: `Number of results to return per page. Default is 25, maximum is 200.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_subscribe_webhook',
    description: `Create a webhook subscription to receive change notifications for a SharePoint list or site resource. When changes matching the specified change type occur, Graph will POST a notification to your notification URL. Note: the notification URL must be HTTPS and must be pre-approved/allowlisted in the backend. Subscriptions expire within 3 days and must be renewed before expiry.`,
    params: [
      { name: 'expiration_date_time', type: 'string', required: true, description: `The ISO 8601 datetime when the subscription expires. Maximum is 3 days from now for SharePoint resources. Example: '2026-06-20T12:00:00Z'.` },
      { name: 'notification_url', type: 'string', required: true, description: `The HTTPS URL that will receive notifications when changes occur. Must be publicly accessible and pre-approved by the backend. Example: 'https://webhook.example.com/notifications'.` },
      { name: 'resource', type: 'string', required: true, description: `The Graph API resource path to monitor for changes. For SharePoint lists use: 'sites/{site_id}/lists/{list_id}'. For an entire site drive: 'sites/{site_id}/drive/root'. Example: 'sites/contoso.sharepoint.com,abc123,def456/lists/list-guid-here'.` },
      { name: 'change_type', type: 'string', required: false, description: `The type of change to subscribe to. Valid values: 'created', 'updated', 'deleted', 'all'. Default is 'updated'.` },
      { name: 'client_state', type: 'string', required: false, description: `Optional secret string included in the notification payload so you can verify it came from Microsoft Graph. Max 128 characters. Example: 'my-secret-key-12345'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_unfollow_document',
    description: `Stop following a SharePoint document or OneDrive file. The document will be removed from the signed-in user's followed documents list. Provide the drive item ID of the document to unfollow.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `The ID of the drive item (document) to unfollow. Example: '01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_update_list',
    description: `Update the display name or description of an existing SharePoint list. Provide the site ID, list ID, and at least one of display_name or description to update.`,
    params: [
      { name: 'list_id', type: 'string', required: true, description: `ID or name of the SharePoint list to update. Can be the list GUID or the list's display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site containing the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'description', type: 'string', required: false, description: `New description for the SharePoint list. Example: 'Updated task list for Q3 project.'` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the SharePoint list. Example: 'Q3 Project Tasks'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_update_list_field',
    description: `Update the metadata of an existing SharePoint list column (field). Supports updating the display name, description, hidden visibility, and read-only status. Only provided fields are modified.`,
    params: [
      { name: 'column_id', type: 'string', required: true, description: `ID of the column to update. Use the column GUID returned by the list fields endpoint.` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list that contains the column. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'description', type: 'string', required: false, description: `New description for the column. Appears as a tooltip or hint in the SharePoint list UI.` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the column as shown in the SharePoint list UI.` },
      { name: 'hidden', type: 'boolean', required: false, description: `Whether the column should be hidden from the default list view. Set to true to hide or false to show.` },
      { name: 'read_only', type: 'boolean', required: false, description: `Whether the column should be read-only. Set to true to prevent users from editing the column value.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_update_list_item',
    description: `Update the field values of an existing SharePoint list item. PATCH the /fields subpath with a flat object of column name-value pairs. Only the fields provided are updated; omitted fields remain unchanged.`,
    params: [
      { name: 'fields', type: 'object', required: true, description: `Object containing the field values to update. Keys are internal column names. Only provided fields are changed. Example: {"Title": "Updated Title", "Status": "Done"}.` },
      { name: 'item_id', type: 'string', required: true, description: `ID of the list item to update. This is the numeric or string identifier of the item within the list.` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the SharePoint list that contains the item. Use the list GUID or display name.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the list. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_update_site',
    description: `Update the display name or description of an existing SharePoint site. Provide the site ID and at least one of display_name or description to update.`,
    params: [
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site to update. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'description', type: 'string', required: false, description: `New description for the SharePoint site. Example: 'Official site for the Marketing department.'` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the SharePoint site. Example: 'Marketing Hub 2024'.` },
    ],
  },
  {
    name: 'microsoft365_sharepoint_upload_file',
    description: `Create an upload session for uploading a file to a SharePoint document library. Returns an upload URL that the caller uses to upload the file content in subsequent PUT requests. This session-based approach supports files of any size. Required: site_id, parent_id (use 'root' for the library root folder), and filename.`,
    params: [
      { name: 'filename', type: 'string', required: true, description: `Name of the file to upload including its extension. Example: 'report-Q4.xlsx'. This will be the filename in SharePoint.` },
      { name: 'parent_id', type: 'string', required: true, description: `Drive item ID of the parent folder in the SharePoint document library where the file will be uploaded. Use 'root' to upload to the library root folder, or a folder item ID from a list drive items operation.` },
      { name: 'site_id', type: 'string', required: true, description: `ID of the SharePoint site that contains the document library. Use a site GUID, 'root', or the format '<hostname>:/sites/<path>'.` },
      { name: 'conflict_behavior', type: 'string', required: false, description: `Behavior when a file with the same name already exists at the destination. 'fail' returns an error, 'replace' overwrites the existing file, 'rename' creates a new file with an incremented name.` },
    ],
  },
  {
    name: 'microsoft365_teams_add_team_member',
    description: `Add a user to a Microsoft Teams team as a member or owner. Requires the team ID and the Azure AD user ID of the person to add. The user must exist in the same tenant. Returns the new conversationMember resource on success (HTTP 201).`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to add the member to.` },
      { name: 'user_id', type: 'string', required: true, description: `The Azure AD object ID of the user to add to the team. This is the user's unique identifier in Microsoft Entra ID, not their email address.` },
      { name: 'role', type: 'string', required: false, description: `The role to assign to the added user. Valid values: 'member' (standard member) or 'owner' (team owner with admin privileges). Defaults to 'member'.` },
    ],
  },
  {
    name: 'microsoft365_teams_approve_time_off_request',
    description: `Approve a pending time-off request in a Microsoft Teams team schedule. Requires the team ID and request ID. Optionally include a manager note to send with the approval. Returns HTTP 204 No Content on success.`,
    params: [
      { name: 'request_id', type: 'string', required: true, description: `The unique identifier of the time-off request to approve. Obtain from the list time-off requests API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the time-off request.` },
      { name: 'message', type: 'string', required: false, description: `Optional message from the manager to include with the approval decision. Example: 'Approved, enjoy your vacation!'` },
    ],
  },
  {
    name: 'microsoft365_teams_archive_channel',
    description: `Archive a channel in a Microsoft Teams team, making it read-only for members. Archiving is reversible — the channel can be unarchived later. Optionally sets the associated SharePoint site to read-only.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to archive.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel to archive.` },
      { name: 'set_spo_site_readonly', type: 'boolean', required: false, description: `If true, the SharePoint Online (SPO) site associated with the channel will also be set to read-only when the channel is archived. Defaults to false.` },
    ],
  },
  {
    name: 'microsoft365_teams_archive_team',
    description: `Archive a Microsoft Teams team, making it read-only. The team is archived asynchronously (HTTP 202). Optionally set the SharePoint site associated with the team to read-only as well. To restore a team, use the unarchive endpoint.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to archive.` },
      { name: 'should_set_spo_site_read_only_for_members', type: 'boolean', required: false, description: `If true, sets the SharePoint Online site associated with the team to read-only for members. Defaults to false.` },
    ],
  },
  {
    name: 'microsoft365_teams_clear_user_presence',
    description: `Clear a previously set presence override for the signed-in user in Microsoft Teams for a specific application session. Provide the same session ID used when calling setPresence. After clearing, Teams reverts to the user's actual computed presence. Requires the Presence.ReadWrite scope.`,
    params: [
      { name: 'session_id', type: 'string', required: true, description: `The GUID of the application session whose presence override should be cleared. Must match the session ID passed to the setPresence call. Example: '22553876-f5ab-4529-bffb-cfe50aa89f87'.` },
    ],
  },
  {
    name: 'microsoft365_teams_clone_team',
    description: `Clone an existing Microsoft Teams team into a new team, copying selected parts such as apps, tabs, settings, channels, and/or members. The clone operation is asynchronous (HTTP 202). Required: team_id, display_name, parts_to_clone.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name for the new cloned team.` },
      { name: 'parts_to_clone', type: 'string', required: true, description: `Comma-separated list of team parts to clone. Valid parts: apps, tabs, settings, channels, members. Example: 'apps,tabs,settings,channels,members'.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to clone.` },
      { name: 'classification', type: 'string', required: false, description: `Classification label for the cloned team (organization-defined, e.g., 'Confidential', 'Internal'). Optional.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the cloned team.` },
      { name: 'mail_nickname', type: 'string', required: false, description: `The mail alias (nickname) for the new team's Microsoft 365 Group. Must be unique in the tenant and contain only alphanumeric characters and hyphens.` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility of the cloned team. Valid values: 'public' (anyone in org can join), 'private' (owner must invite). Defaults to 'private'.` },
    ],
  },
  {
    name: 'microsoft365_teams_create_channel',
    description: `Create a new channel in a Microsoft Teams team. Supports standard, private, and shared channel membership types. Requires the team ID and a display name for the new channel.`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name of the new channel. Must be unique within the team and cannot contain special characters like #, &, :, <, >, *, ?.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team in which to create the channel.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new channel (plain text, up to 1024 characters).` },
      { name: 'membership_type', type: 'string', required: false, description: `The membership type of the channel: 'standard' (visible to all team members), 'private' (invite-only subset of team members), or 'shared' (shared with people outside the team). Defaults to 'standard'.` },
    ],
  },
  {
    name: 'microsoft365_teams_create_online_meeting',
    description: `Create a new Microsoft Teams online meeting for the signed-in user. Requires a subject, start time, and end time in ISO 8601 format. Optionally invite attendees by UPN (email) and control who can present.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `The end date and time of the meeting in ISO 8601 UTC format. Example: '2024-07-15T10:00:00Z'.` },
      { name: 'start_date_time', type: 'string', required: true, description: `The start date and time of the meeting in ISO 8601 UTC format. Example: '2024-07-15T09:00:00Z'.` },
      { name: 'subject', type: 'string', required: true, description: `The subject/title of the online meeting. Displayed to all participants in the meeting invite and join page.` },
      { name: 'allowed_presenters', type: 'string', required: false, description: `Who can present in the meeting. 'everyone' allows all participants, 'organization' restricts to org members, 'roleIsPresenter' limits to assigned presenters, 'organizer' restricts to the meeting organizer only. Defaults to 'organization'.` },
      { name: 'attendee_upns', type: 'array', required: false, description: `Array of UPN (User Principal Name / email address) strings for meeting attendees. Example: ["alice@contoso.com", "bob@contoso.com"]. Each UPN is mapped to an attendee object in the participants block.` },
    ],
  },
  {
    name: 'microsoft365_teams_create_shift',
    description: `Create a new shift in a Microsoft Teams team schedule. Requires team ID, user ID, scheduling group ID, and start/end date times in ISO 8601 format. Optionally set a display name, notes, and theme color for the shift.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `The end date and time of the shift in ISO 8601 UTC format. Example: '2024-07-15T17:00:00Z'.` },
      { name: 'scheduling_group_id', type: 'string', required: true, description: `The unique identifier of the scheduling group (team member group) to assign the shift to. Obtain from the scheduling groups API.` },
      { name: 'start_date_time', type: 'string', required: true, description: `The start date and time of the shift in ISO 8601 UTC format. Example: '2024-07-15T09:00:00Z'.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule to create the shift in.` },
      { name: 'user_id', type: 'string', required: true, description: `The unique identifier (object ID) of the user to assign the shift to. Obtain from the Microsoft Entra user object or list users API.` },
      { name: 'display_name', type: 'string', required: false, description: `Optional display name for the shift, shown on the schedule. Example: 'Morning Shift'.` },
      { name: 'notes', type: 'string', required: false, description: `Optional notes or instructions for the shift, visible to the assigned user. Example: 'Please cover the front desk.'.` },
      { name: 'theme', type: 'string', required: false, description: `Color theme for the shift block on the schedule view. Valid values: white, blue, green, purple, pink, yellow, gray, darkBlue, darkGreen, darkPurple, darkPink, darkYellow. Defaults to 'blue'.` },
    ],
  },
  {
    name: 'microsoft365_teams_create_shift_swap_request',
    description: `Create a shift swap request in a Microsoft Teams team schedule, proposing that two employees exchange their shifts. Requires the team ID, both employees' user IDs and their respective shift IDs. Optionally include a message from the requester.`,
    params: [
      { name: 'recipient_shift_id', type: 'string', required: true, description: `The unique identifier of the shift belonging to the recipient (the employee whose shift the sender wants to take). Obtain from the list shifts API.` },
      { name: 'recipient_user_id', type: 'string', required: true, description: `The Azure AD object ID of the employee being asked to swap their shift.` },
      { name: 'sender_shift_id', type: 'string', required: true, description: `The unique identifier of the shift belonging to the sender (the employee initiating the swap). Obtain from the list shifts API.` },
      { name: 'sender_user_id', type: 'string', required: true, description: `The Azure AD object ID of the employee initiating the shift swap request.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule the shift swap request belongs to.` },
      { name: 'sender_message', type: 'string', required: false, description: `Optional message from the requesting employee explaining why they want to swap. Example: 'I have a doctor's appointment during my shift.'` },
    ],
  },
  {
    name: 'microsoft365_teams_create_team',
    description: `Create a new Microsoft Teams team from a template. The team is created asynchronously (HTTP 202); poll the returned operation URL for completion. Required: display_name. Optional: description and template (defaults to 'standard').`,
    params: [
      { name: 'display_name', type: 'string', required: true, description: `The display name of the new team. Must be unique within the tenant.` },
      { name: 'description', type: 'string', required: false, description: `Optional description for the new team (plain text, up to 1024 characters).` },
      { name: 'template', type: 'string', required: false, description: `The Teams template to use when creating the team. Valid values: 'standard', 'educationClass', 'educationStaff', 'educationProfessionalLearningCommunity', 'healthcareWard', 'healthcareTeam'. Defaults to 'standard'.` },
    ],
  },
  {
    name: 'microsoft365_teams_create_time_off_request',
    description: `Submit a time-off request in a Microsoft Teams team schedule. Requires the team ID, the sender's user ID, start and end date-times in ISO 8601 UTC format, and the time-off reason ID. Optionally include a message from the sender to the manager.`,
    params: [
      { name: 'end_date_time', type: 'string', required: true, description: `The end date and time of the time-off period in ISO 8601 UTC format. Example: '2024-08-02T17:00:00Z'.` },
      { name: 'sender_user_id', type: 'string', required: true, description: `The Azure AD object ID of the employee submitting the time-off request. Obtain from the Microsoft Entra user object or list users API.` },
      { name: 'start_date_time', type: 'string', required: true, description: `The start date and time of the time-off period in ISO 8601 UTC format. Example: '2024-07-29T00:00:00Z'.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule the request belongs to.` },
      { name: 'time_off_reason_id', type: 'string', required: true, description: `The ID of the time-off reason (e.g., vacation, sick leave) defined in the team schedule. Obtain from the team's timeOffReasons API.` },
      { name: 'sender_message', type: 'string', required: false, description: `Optional message from the employee to the manager accompanying the time-off request. Example: 'Family vacation.'` },
    ],
  },
  {
    name: 'microsoft365_teams_decline_time_off_request',
    description: `Decline a pending time-off request in a Microsoft Teams team schedule. Requires the team ID and request ID. Optionally include a manager message explaining the decision. Returns HTTP 204 No Content on success.`,
    params: [
      { name: 'request_id', type: 'string', required: true, description: `The unique identifier of the time-off request to decline. Obtain from the list time-off requests API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the time-off request.` },
      { name: 'message', type: 'string', required: false, description: `Optional message from the manager to include with the decline decision. Example: 'Insufficient coverage during that period.'` },
    ],
  },
  {
    name: 'microsoft365_teams_delete_channel',
    description: `Permanently delete a channel from a Microsoft Teams team. The General channel of a team cannot be deleted. This action is irreversible and removes all messages and content within the channel.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to delete. The General channel cannot be deleted.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel to delete.` },
    ],
  },
  {
    name: 'microsoft365_teams_delete_channel_message',
    description: `Soft-delete a Microsoft Teams channel message. The message is retracted and replaced with a tombstone indicating it was deleted.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message to delete.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the channel message to soft-delete.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_delete_online_meeting',
    description: `Permanently delete a Microsoft Teams online meeting by meeting ID. This action cannot be undone and removes the meeting for all participants.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The unique identifier of the online meeting to delete. Obtain from the create meeting response or list meetings API.` },
    ],
  },
  {
    name: 'microsoft365_teams_delete_shift',
    description: `Permanently delete a shift from a Microsoft Teams team schedule. Requires both the team ID and the shift ID. This action cannot be undone.`,
    params: [
      { name: 'shift_id', type: 'string', required: true, description: `The unique identifier of the shift to delete. Obtain from the create shift response or list shifts API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the shift to delete.` },
    ],
  },
  {
    name: 'microsoft365_teams_delete_team',
    description: `Permanently delete a Microsoft Teams team by deleting the underlying Microsoft 365 Group. This action is irreversible. The team and all its channels, messages, and files will be permanently removed. Returns HTTP 204 with no body on success.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team (Group ID) to permanently delete.` },
    ],
  },
  {
    name: 'microsoft365_teams_get_channel',
    description: `Retrieve the properties and metadata of a specific channel in a Microsoft Teams team, including its display name, description, membership type, and web URL.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to retrieve.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_get_channel_message',
    description: `Retrieve a single message from a Microsoft Teams channel by its ID, including body content, sender info, attachments, reactions, and metadata.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams channel message to retrieve.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_get_chat_message',
    description: `Retrieve a single message from a Microsoft Teams chat by its ID, including body content, sender info, attachments, reactions, and metadata.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat that contains the message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams chat message to retrieve.` },
    ],
  },
  {
    name: 'microsoft365_teams_get_online_meeting',
    description: `Retrieve details of a specific Microsoft Teams online meeting by meeting ID. Returns meeting properties including subject, join URL, start/end times, participants, and meeting options.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The unique identifier of the online meeting to retrieve. Obtain from the create meeting response or list meetings API.` },
    ],
  },
  {
    name: 'microsoft365_teams_get_team',
    description: `Retrieve the properties and relationships of a Microsoft Teams team by its team ID. Returns team details including display name, description, visibility, member settings, and guest settings.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to retrieve.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_channel_message_replies',
    description: `List all replies in a Microsoft Teams channel message thread. Returns replies to the specified parent message with support for pagination.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message thread.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the parent channel message whose replies to list.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of replies to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of replies to return per page. Use to control page size.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_channel_messages',
    description: `List messages in a Microsoft Teams channel with support for pagination. Returns up to 20 messages by default (max 50 per page).`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to list messages from.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: '$skip', type: 'integer', required: false, description: `Number of messages to skip for pagination. Use with $top to page through results.` },
      { name: '$top', type: 'integer', required: false, description: `Number of channel messages to return per page (1–50, default: 20). Microsoft Graph caps this at 50 for channel messages.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_channel_tabs',
    description: `List all tabs pinned to a Microsoft Teams channel. By default expands the teamsApp relationship to include app details for each tab.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel whose tabs to list.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: '$expand', type: 'string', required: false, description: `OData $expand expression to include related resources. Defaults to 'teamsApp' which includes the app details for each tab. Set to null to suppress expansion.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_channels',
    description: `List all channels in a Microsoft Teams team. Supports OData filtering (e.g., by membershipType) and field selection to reduce response size.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose channels to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "membershipType eq 'standard'" or "displayName eq 'General'".` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of channel properties to return. Example: 'id,displayName,membershipType,webUrl'. Reduces response payload size.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_chat_messages',
    description: `List messages in a Microsoft Teams chat (1:1, group, or meeting chat) with support for pagination and ordering. Returns up to 50 messages per page ordered by creation time descending by default.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat to list messages from. Obtain from the list chats API or Teams URL.` },
      { name: '$orderby', type: 'string', required: false, description: `OData orderby expression for sorting messages. Default is 'createdDateTime desc' (newest first). Example: 'createdDateTime asc' for oldest first.` },
      { name: '$top', type: 'integer', required: false, description: `Number of chat messages to return per page (1–50, default: 50). Microsoft Graph caps this at 50 for chat messages.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_shift_swap_requests',
    description: `List shift swap change requests in a Microsoft Teams team schedule. Supports OData $filter (e.g., filter by state) and $top to control the number of results returned.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule shift swap requests to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow shift swap request results. Example: "state eq 'pending'" to fetch only pending swap requests.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of shift swap requests to return. Use to limit the response size. Example: 25.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_shifts',
    description: `List shifts in a Microsoft Teams team schedule. Supports OData $filter (e.g., filter by start date) and $top to control the number of results returned.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule shifts to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow shift results. Example: "sharedShift/startDateTime ge 2024-07-01T00:00:00Z" to fetch shifts starting on or after July 1, 2024.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of shifts to return. Use to limit the response size. Example: 25.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_team_members',
    description: `List all members (including owners) of a Microsoft Teams team. Returns conversationMember resources with membership IDs, user details, and roles. Supports OData filtering and field selection.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose members to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "roles/any(r:r eq 'owner')" to list only owners.` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of member properties to return. Example: 'id,displayName,roles,email'. Reduces response payload size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of members to return per page. Use for pagination.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_teams',
    description: `List all Microsoft Teams teams that the signed-in user has joined. Supports OData query options for filtering, field selection, and pagination.`,
    params: [
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow results. Example: "displayName eq 'Engineering'".` },
      { name: '$select', type: 'string', required: false, description: `Comma-separated list of team properties to return. Example: 'id,displayName,description,visibility'. Reduces response payload size.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of teams to return per page. Use for pagination.` },
    ],
  },
  {
    name: 'microsoft365_teams_list_time_off_requests',
    description: `List time-off requests in a Microsoft Teams team schedule. Supports OData $filter (e.g., filter by status or date range) and $top to control the number of results returned.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule time-off requests to list.` },
      { name: '$filter', type: 'string', required: false, description: `OData filter expression to narrow time-off request results. Example: "state eq 'pending'" to fetch only pending requests.` },
      { name: '$top', type: 'integer', required: false, description: `Maximum number of time-off requests to return. Use to limit the response size. Example: 25.` },
    ],
  },
  {
    name: 'microsoft365_teams_pin_channel_message',
    description: `Pin a message in a Microsoft Teams channel so it appears in the channel's pinned messages list. Requires the team ID, channel ID, and message ID.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel that contains the message to pin.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams channel message to pin.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_provision_channel_email',
    description: `Provision an email address for a Microsoft Teams channel, enabling users to send emails directly to the channel. Returns the provisioned email address. If an email has already been provisioned, returns the existing address.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel for which to provision an email address.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_remove_channel_email',
    description: `Remove the email address provisioned for a Microsoft Teams channel. After removal, emails can no longer be sent to the channel via that email address.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel from which to remove the provisioned email address.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_remove_team_member',
    description: `Remove a member from a Microsoft Teams team. Requires the team ID and the conversationMember ID (not the Azure AD user ID). The membership_id is the ID returned by the list team members or add team member APIs. Returns HTTP 204 with no body on success.`,
    params: [
      { name: 'membership_id', type: 'string', required: true, description: `The conversationMember ID of the membership to remove. This is the unique ID of the member's team membership, returned by the list team members or add member APIs — it is NOT the Azure AD user ID.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team from which to remove the member.` },
    ],
  },
  {
    name: 'microsoft365_teams_reply_to_channel_message',
    description: `Post a reply to an existing Microsoft Teams channel message thread. Supports plain text or HTML content, an optional subject, and importance levels.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message to reply to.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the reply message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the channel message to reply to.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the reply content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
      { name: 'importance', type: 'string', required: false, description: `The importance of the reply message. Valid values: 'normal', 'high', 'urgent'.` },
      { name: 'subject', type: 'string', required: false, description: `Optional subject line for the reply (appears as a headline above the body).` },
    ],
  },
  {
    name: 'microsoft365_teams_reply_to_chat_message',
    description: `Send a reply to an existing message in a Microsoft Teams chat thread. Supports plain text or HTML content. This endpoint is available on the Microsoft Graph beta API.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat that contains the message to reply to.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the reply message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams chat message to reply to.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the reply content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
    ],
  },
  {
    name: 'microsoft365_teams_search_messages',
    description: `Search Microsoft Teams chat messages across all chats and channels accessible to the signed-in user using the Microsoft Search API. Supports pagination via from/size parameters. Returns up to 25 results by default.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query string to find matching Teams messages. Supports keyword search and KQL (Keyword Query Language). Example: 'project kickoff' or 'from:alice@example.com subject:budget'.` },
      { name: 'from', type: 'integer', required: false, description: `Zero-based index of the first result to return, used for pagination. Default is 0 (start from the first result).` },
      { name: 'size', type: 'integer', required: false, description: `Number of results to return per page. Default is 25, maximum is 200.` },
    ],
  },
  {
    name: 'microsoft365_teams_send_channel_message',
    description: `Send a new message to a Microsoft Teams channel. Supports plain text or HTML content, an optional subject line, and importance levels (normal, high, urgent).`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to send the message to.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the message to send.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the message content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
      { name: 'importance', type: 'string', required: false, description: `The importance of the message. Valid values: 'normal', 'high', 'urgent'. Defaults to normal if omitted.` },
      { name: 'subject', type: 'string', required: false, description: `Optional subject line for the channel message (appears as a headline above the body).` },
    ],
  },
  {
    name: 'microsoft365_teams_send_chat_message',
    description: `Send a new message to a Microsoft Teams chat (1:1, group, or meeting chat). Supports plain text or HTML content. Requires Chat.ReadWrite scope.`,
    params: [
      { name: 'chat_id', type: 'string', required: true, description: `The unique identifier of the Teams chat to send the message to. Obtain from the list chats API or Teams client URL.` },
      { name: 'content', type: 'string', required: true, description: `The text or HTML content of the message to send to the chat.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the message content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
    ],
  },
  {
    name: 'microsoft365_teams_set_preferred_presence',
    description: `Set the preferred presence status for the signed-in user in Microsoft Teams. Unlike setPresence (which is session-scoped), this persists a user-level preferred status that overrides the computed presence. Requires availability and activity values. Optionally specify an expiration duration in ISO 8601 format (e.g., PT1H). Requires the Presence.ReadWrite scope.`,
    params: [
      { name: 'activity', type: 'string', required: true, description: `The preferred activity of the user. Must be consistent with the chosen availability. Valid values: Available, Busy, InACall, InAConferenceCall, InAMeeting, Presenting, Away, DoNotDisturb, UrgentInterruptionsOnly, OffWork.` },
      { name: 'availability', type: 'string', required: true, description: `The preferred presence state of the user at the user level (not session-scoped). Valid values: Available, Busy, DoNotDisturb, BeRightBack, Away, Offline.` },
      { name: 'expiration_duration', type: 'string', required: false, description: `How long the preferred presence override should remain active, expressed as an ISO 8601 duration. Example: 'PT1H' for 1 hour, 'PT4H' for 4 hours. If omitted, the preference persists until explicitly cleared via clearUserPreferredPresence.` },
    ],
  },
  {
    name: 'microsoft365_teams_set_user_presence',
    description: `Set the presence status of the signed-in user in Microsoft Teams for a specific application session. Requires a session ID (a stable GUID representing the calling app), an availability value (e.g., Available, Busy, DoNotDisturb), and an activity value. Optionally specify an expiration duration in ISO 8601 duration format (e.g., PT1H). Requires the Presence.ReadWrite scope.`,
    params: [
      { name: 'activity', type: 'string', required: true, description: `The current activity of the user. Must be consistent with the chosen availability. Valid values: Available, Busy, InACall, InAConferenceCall, InAMeeting, Presenting, Away, DoNotDisturb, UrgentInterruptionsOnly, OffWork.` },
      { name: 'availability', type: 'string', required: true, description: `The base presence state of the user. Valid values: Available, Busy, DoNotDisturb, BeRightBack, Away, Offline.` },
      { name: 'session_id', type: 'string', required: true, description: `A stable GUID identifying the calling application session. Use a consistent GUID per application so multiple calls from the same app update the same session. Example: '22553876-f5ab-4529-bffb-cfe50aa89f87'.` },
      { name: 'expiration_duration', type: 'string', required: false, description: `How long the presence override should remain active, expressed as an ISO 8601 duration. Example: 'PT1H' for 1 hour, 'PT30M' for 30 minutes. If omitted, the presence persists until explicitly cleared.` },
    ],
  },
  {
    name: 'microsoft365_teams_unpin_channel_message',
    description: `Unpin a previously pinned message in a Microsoft Teams channel. The message remains in the channel history but is removed from the pinned messages list.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel that contains the pinned message.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the Teams channel message to unpin.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
    ],
  },
  {
    name: 'microsoft365_teams_update_channel',
    description: `Update the properties of an existing Microsoft Teams channel, such as its display name or description. At least one of display_name or description must be provided.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel to update.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel to update.` },
      { name: 'description', type: 'string', required: false, description: `New description for the channel. Optional. At least one of display_name or description must be provided.` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the channel. Cannot contain special characters like #, &, :, <, >, *, ?. At least one of display_name or description must be provided.` },
    ],
  },
  {
    name: 'microsoft365_teams_update_channel_message',
    description: `Update the body content of an existing Microsoft Teams channel message. Only the message body can be edited after posting.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `The unique identifier of the Teams channel containing the message to update.` },
      { name: 'content', type: 'string', required: true, description: `The new text or HTML content to replace the existing message body with.` },
      { name: 'message_id', type: 'string', required: true, description: `The unique identifier of the channel message to update.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team that contains the channel.` },
      { name: 'content_type', type: 'string', required: false, description: `The format of the updated content: 'text' for plain text or 'html' for HTML markup. Defaults to 'text'.` },
    ],
  },
  {
    name: 'microsoft365_teams_update_online_meeting',
    description: `Update an existing Microsoft Teams online meeting by meeting ID. Any combination of subject, start time, end time, and allowed presenters can be updated in a single call.`,
    params: [
      { name: 'meeting_id', type: 'string', required: true, description: `The unique identifier of the online meeting to update. Obtain from the ID field returned when creating or listing meetings.` },
      { name: 'allowed_presenters', type: 'string', required: false, description: `Updated setting for who can present in the meeting. Valid values: 'everyone', 'organization', 'roleIsPresenter', 'organizer'.` },
      { name: 'end_date_time', type: 'string', required: false, description: `Updated end date and time for the meeting in ISO 8601 UTC format. Example: '2024-07-15T11:00:00Z'. Leave blank to keep the existing end time.` },
      { name: 'start_date_time', type: 'string', required: false, description: `Updated start date and time for the meeting in ISO 8601 UTC format. Example: '2024-07-15T10:00:00Z'. Leave blank to keep the existing start time.` },
      { name: 'subject', type: 'string', required: false, description: `Updated subject/title for the online meeting. Leave blank to keep the existing subject.` },
    ],
  },
  {
    name: 'microsoft365_teams_update_shift',
    description: `Update an existing shift in a Microsoft Teams team schedule by shift ID. Replaces the shift with the provided fields. Requires team ID and shift ID. The sharedShift block fields (start/end time, display name, notes, theme) are built conditionally from optional inputs.`,
    params: [
      { name: 'shift_id', type: 'string', required: true, description: `The unique identifier of the shift to update. Obtain from the create shift response or list shifts API.` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team whose schedule contains the shift.` },
      { name: 'display_name', type: 'string', required: false, description: `Updated display name for the shift shown on the schedule. Leave blank to keep the existing display name.` },
      { name: 'end_date_time', type: 'string', required: false, description: `Updated end date and time for the shift in ISO 8601 UTC format. Example: '2024-07-15T18:00:00Z'. Leave blank to keep the existing end time.` },
      { name: 'notes', type: 'string', required: false, description: `Updated notes for the shift visible to the assigned employee. Leave blank to keep the existing notes.` },
      { name: 'scheduling_group_id', type: 'string', required: false, description: `Updated scheduling group ID for the shift. Leave blank to keep the existing scheduling group.` },
      { name: 'start_date_time', type: 'string', required: false, description: `Updated start date and time for the shift in ISO 8601 UTC format. Example: '2024-07-15T10:00:00Z'. Leave blank to keep the existing start time.` },
      { name: 'theme', type: 'string', required: false, description: `Updated color theme for the shift block on the schedule view. Valid values: white, blue, green, purple, pink, yellow, gray, darkBlue, darkGreen, darkPurple, darkPink, darkYellow.` },
      { name: 'user_id', type: 'string', required: false, description: `Updated user ID (Azure AD object ID) to reassign the shift to. Leave blank to keep the existing assignment.` },
    ],
  },
  {
    name: 'microsoft365_teams_update_team',
    description: `Update the properties of an existing Microsoft Teams team. Requires team_id. At least one of display_name, description, or visibility must be provided. Returns HTTP 204 with no body on success.`,
    params: [
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team to update.` },
      { name: 'description', type: 'string', required: false, description: `New description for the team (plain text, up to 1024 characters).` },
      { name: 'display_name', type: 'string', required: false, description: `New display name for the team.` },
      { name: 'visibility', type: 'string', required: false, description: `Visibility of the team. Valid values: 'public' (anyone in org can join), 'private' (owner must invite). Note: changing from private to public is allowed; changing back may be restricted.` },
    ],
  },
  {
    name: 'microsoft365_teams_update_team_member',
    description: `Update the role of an existing member in a Microsoft Teams team, promoting them to owner or demoting them to member. Requires the team ID, the conversationMember ID (membership_id), and the new role. Returns the updated conversationMember resource (HTTP 200).`,
    params: [
      { name: 'membership_id', type: 'string', required: true, description: `The conversationMember ID of the membership to update. This is the unique ID of the member's team membership returned by the list team members or add member APIs — it is NOT the Azure AD user ID.` },
      { name: 'role', type: 'string', required: true, description: `The new role to assign to the team member. Valid values: 'member' (standard member) or 'owner' (team owner with admin privileges).` },
      { name: 'team_id', type: 'string', required: true, description: `The unique identifier of the Microsoft Teams team containing the member to update.` },
    ],
  },
  {
    name: 'microsoft365_word_create_document',
    description: `Create a new Word document (.docx) in OneDrive by initiating a resumable upload session. Returns an uploadUrl that the caller must use to upload the .docx file bytes via one or more PUT requests. The document is placed under the specified parent folder with the given filename. Requires Files.ReadWrite or Files.ReadWrite.All scope.`,
    params: [
      { name: 'filename', type: 'string', required: true, description: `The base name of the Word document to create, without the .docx extension. The extension is appended automatically. Example: "Project Proposal" creates "Project Proposal.docx".` },
      { name: 'parent_id', type: 'string', required: true, description: `The OneDrive item ID of the parent folder where the document will be created. Use "root" to create the document at the top level of OneDrive. Obtain folder IDs from list or get drive item operations.` },
      { name: 'conflict_behavior', type: 'string', required: false, description: `Behavior when a file with the same name already exists in the target folder. "fail" aborts and returns an error, "replace" overwrites the existing file, "rename" saves the new document with a different auto-generated name. Default: replace.` },
    ],
  },
]
