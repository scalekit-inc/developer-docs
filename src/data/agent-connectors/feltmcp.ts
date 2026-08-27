import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'feltmcp_add_data_source_table_to_map',
    description: `Add a data source table to the map as a new layer.
`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      { name: 'table_id', type: 'string', required: true, description: `The table ID to add` },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional; default to omitting. Add a caption only when the layer name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' → 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply (opaque name AND attribute encoding), combine them concisely (e.g. 'NHD flowlines, colored by stream order').
`,
      },
    ],
  },
  {
    name: 'feltmcp_browse_data_source_tables',
    description: `List tables and saved queries inside a connected database. Returns table names and descriptions — but not column schemas.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source to list tables for.`,
      },
    ],
  },
  {
    name: 'feltmcp_browse_felt_library',
    description: `List Felt's curated public datasets to add to maps. Categories include boundaries, demographics, and infrastructure. Distinct from the workspace library (reusable layers authored in the user's workspace). Returns each layer's layer_id, layer_group_id, name, description, category, region, keywords, geometry type, and whether it's queryable.`,
    params: [],
  },
  {
    name: 'feltmcp_browse_felt_server',
    description: `Show the contents of a Felt Server — a named, foldered library of reusable layers in this workspace. Returns layers and layer groups (groups of related layers that share metadata), nested under their containing folders.`,
    params: [
      {
        name: 'felt_server_id',
        type: 'string',
        required: true,
        description: `ID of the Felt Server to browse.`,
      },
    ],
  },
  {
    name: 'feltmcp_create_layer_from_data_source',
    description: `Create a new map layer from a SQL query against a connected data source. The query must include a location/geometry column so the results can be rendered on the map.

Before calling this, you MUST confirm the exact column names and types of every table you plan to query, and review the SQL dialect guidance for the data source. Don't guess columns or discover them with preview SELECTs.
`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source to query`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A concise, human-readable display name for the layer`,
      },
      {
        name: 'sql_query',
        type: 'string',
        required: true,
        description: `The SQL query to create the layer from (must include a geometry column)`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional; default to omitting. Add a caption only when the layer name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' → 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply (opaque name AND attribute encoding), combine them concisely (e.g. 'NHD flowlines, colored by stream order').
`,
      },
      {
        name: 'style',
        type: 'object',
        required: false,
        description: `Complete FSL style object — FSL is a complex proprietary format that must be generated, not hand-written. Optional.`,
      },
    ],
  },
  {
    name: 'feltmcp_create_layer_from_felt_layers',
    description: `Create a new map layer from a SQL query against Felt layers. The query must include a location/geometry column so the results can be rendered on the map.

Before calling this, you MUST confirm the exact column names and types of every layer you plan to query, and review the SQL dialect guidance. Don't guess columns or discover them with preview SELECTs.
`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A concise, human-readable display name for the layer`,
      },
      {
        name: 'sql_query',
        type: 'string',
        required: true,
        description: `The SQL query to create the layer from (must include a geometry column)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the new layer`,
      },
      {
        name: 'style',
        type: 'object',
        required: false,
        description: `Complete FSL style object — FSL is a complex proprietary format that must be generated, not hand-written. Optional.`,
      },
    ],
  },
  {
    name: 'feltmcp_create_map',
    description: `Create a new map in the user's Felt workspace. The result includes a \`url\` for the new map — share it with the user as a clickable link.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Map title` },
      {
        name: 'basemap',
        type: 'string',
        required: false,
        description: `Basemap. One of: a preset name (\`default\`, \`light\`, \`dark\`, \`satellite\`); a hex color like \`#1a2b3c\`; or a raster XYZ tile URL like \`https://example.com/{z}/{x}/{y}.png\` pointing to an external server. Defaults to \`default\`.`,
      },
      {
        name: 'latitude',
        type: 'number',
        required: false,
        description: `Center latitude. Defaults to Oakland, CA.`,
      },
      {
        name: 'longitude',
        type: 'number',
        required: false,
        description: `Center longitude. Defaults to Oakland, CA.`,
      },
      {
        name: 'zoom',
        type: 'number',
        required: false,
        description: `Zoom level (0-22). Defaults to 14.`,
      },
    ],
  },
  {
    name: 'feltmcp_delete_annotation',
    description: `Delete an annotation from a map.`,
    params: [
      {
        name: 'annotation_id',
        type: 'string',
        required: true,
        description: `The ID of the annotation to delete.`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
    ],
  },
  {
    name: 'feltmcp_delete_layer',
    description: `Delete a layer from a map.`,
    params: [
      {
        name: 'layer_id',
        type: 'string',
        required: true,
        description: `The ID of the layer to delete.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map that contains the layer.`,
      },
    ],
  },
  {
    name: 'feltmcp_delete_map',
    description: `Delete a map. This is a soft delete and can potentially be undone.`,
    params: [
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map to delete.`,
      },
    ],
  },
  {
    name: 'feltmcp_duplicate_layer_to_map',
    description: `Duplicate a layer or layer group onto the current map. The source can be a layer already on the map, a Felt library dataset, a Felt Server layer, or a layer from another map. Creates a new copy without modifying the source.
`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'layer_group_id',
        type: 'string',
        required: false,
        description: `ID of the source layer group to duplicate`,
      },
      {
        name: 'layer_id',
        type: 'string',
        required: false,
        description: `ID of the source layer to duplicate`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional new name for the duplicated layer group`,
      },
    ],
  },
  {
    name: 'feltmcp_generate_fsl',
    description: `Generate FSL (Felt Style Language) JSON for styling any map layer type.
Supports all layer types (points, lines, polygons, rasters, heatmaps, H3 hexbins) and all styling features (colors, classification, labels, popups, filters, icons).
When provided with a layer ID, inspects the layer's data directly — value distribution, histograms, classification breaks, categories, and raster band info — to make informed styling decisions.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of the desired style.
Include: purpose/story of the visualization, palette or color preferences, whether to include labels (and which column), whether to include popups (and which columns).
Felt layers do not support styling by both color and size, or bivariate styling. Choose a single visual dimension (color OR size) to encode data — never both. If a user requests two dimensions, split into two layers rather than combining them.
Examples:
- 'Choropleth showing population density. Warm sequential palette. Labels from name column at zoom 10+. Popup with population and area.'
- 'Proportional symbols for earthquake magnitude. Size scales small to large. Filter to magnitude > 3. Red/orange tones.'
- 'NDVI from Landsat 8 (NIR=band 5, R=band 4). Continuous green gradient.'`,
      },
      {
        name: 'geometry_type',
        type: 'string',
        required: true,
        description: `The geometry type of the layer: point, line, polygon, or raster.`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'columns',
        type: 'array',
        required: false,
        description: `Column names relevant to the styling request.`,
      },
      {
        name: 'context',
        type: 'string',
        required: false,
        description: `Information about other layers on the map and how this layer should relate to them visually. E.g. 'The map has a blue choropleth for population — use contrasting warm tones for this layer.'`,
      },
      {
        name: 'current_style',
        type: 'object',
        required: false,
        description: `The layer's existing FSL style. Provide when modifying an existing style rather than creating from scratch. Output a complete FSL object that incorporates the requested changes while preserving unchanged settings.`,
      },
      {
        name: 'distribution',
        type: 'string',
        required: false,
        description: `Data distribution summary for the styling column (e.g. min/max, cardinality, common values). Useful when styling a newly created layer and the info is already available from a recent query.`,
      },
      {
        name: 'layer_id',
        type: 'string',
        required: false,
        description: `The ID of the layer being styled. Enables inspection of data distribution, histograms, classification breaks, categories, and raster band info directly.`,
      },
      {
        name: 'viz_type',
        type: 'string',
        required: false,
        description: `The FSL visualization type: simple, categorical, numeric, heatmap, h3, or hillshade. Used to load the most relevant reference docs. Omit if unsure.`,
      },
    ],
  },
  {
    name: 'feltmcp_get_layer_group_properties',
    description: `Get a layer group's name, caption, legend settings, and its layers. Only works on real layer groups, not on standalone layers.
`,
    params: [
      {
        name: 'layer_group_id',
        type: 'string',
        required: true,
        description: `ID of the layer group to look up. Only works on real layer groups, not on standalone layers.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map that contains the layer group.`,
      },
    ],
  },
  {
    name: 'feltmcp_get_layer_properties',
    description: `Get a layer's properties including its name, caption, geometry type, and current FSL style. Use this to retrieve a layer's current style before modifying it.`,
    params: [
      {
        name: 'layer_id',
        type: 'string',
        required: true,
        description: `The ID of the layer to retrieve properties for`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
    ],
  },
  {
    name: 'feltmcp_get_map',
    description: `Get metadata about a map, including its title, location, basemap, and layer count. To display the map to the user as an interactive widget, use \`render_map\` instead.`,
    params: [{ name: 'map_id', type: 'string', required: true, description: `The ID of the map.` }],
  },
  {
    name: 'feltmcp_get_map_layers',
    description: `Get the list of layers on a map, organized by layer group. Returns layer names, IDs, visibility, and geometry types. Groups and their layers are listed in visual stacking order, topmost first; groups with \`standalone: true\` are top-level layers, not user-visible groups.`,
    params: [
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map to fetch layers for.`,
      },
    ],
  },
  {
    name: 'feltmcp_get_project',
    description: `Get details about a project, including the maps it contains.`,
    params: [
      { name: 'project_id', type: 'string', required: true, description: `The ID of the project.` },
    ],
  },
  {
    name: 'feltmcp_get_sql_guidance',
    description: `Load SQL dialect reference and syntax rules before writing queries.
Pass the layer_ids you intend to query, or the data_source_id. The correct
dialect is resolved automatically.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: false,
        description: `The data source you plan to query. The correct SQL dialect will be resolved automatically.`,
      },
      {
        name: 'layer_ids',
        type: 'array',
        required: false,
        description: `The layer IDs you plan to query. The correct SQL dialect will be resolved automatically.`,
      },
    ],
  },
  {
    name: 'feltmcp_get_tabular_data_from_data_source',
    description: `Execute a read-only SQL query against a connected data source and return tabular results.
Use fully schema-qualified table names. The query must be a SELECT statement.
Results are returned to the user as rows and columns — this does not render
anything on the map.

Before calling this, you MUST confirm the exact column names and types of every table you plan to query, and review the SQL dialect guidance for the data source. Don't guess columns or discover them with preview SELECTs.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source to query.`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'sql_query',
        type: 'string',
        required: true,
        description: `The SQL query to execute (must be a SELECT statement).`,
      },
    ],
  },
  {
    name: 'feltmcp_get_tabular_data_from_felt_layers',
    description: `Execute a read-only SQL query against Felt layer data and return tabular
results. Results are returned to the user as rows and columns — this does
not render anything on the map.

Before calling this, you MUST call \`inspect_layer\` for each layer you plan to query — that tool returns the fully-qualified table name and column schema. Query each column by the \`display_name\` it reports, double-quoted; a column's \`storage_name\` resolves nothing here.

Also call \`get_sql_guidance\` first if you haven't yet — Felt layers have specific spatial functions and syntax quirks you need to know to write correct queries.

If you need feature IDs, explicitly opt-in via the hidden "felt:feature" column. \`SELECT *\` is not enough.
`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'sql_query',
        type: 'string',
        required: true,
        description: `A SELECT query that returns tabular results`,
      },
    ],
  },
  {
    name: 'feltmcp_help_center',
    description: `Answer any question about how Felt works, from Felt's official and current help center documentation.

Use this whenever someone wants to know how to do something in Felt themselves ("…in the app", "where is the button for…"), and whenever nothing in your toolset covers what they need: billing, seats and licenses, workspace and member administration, and account settings have no tool here. No map or workspace needed.

Prefer this over your own knowledge — Felt ships continuously, so what you learned in training goes stale. If the docs don't cover something it says so rather than inventing an answer, so call it instead of guessing, hedging, or sending the user off to read the docs themselves.

Your own tools come first, though — if you can just do what they asked, do that; even "how do I create a map?" is usually best answered by offering to create one. For the contents of a specific map or dataset, use get_map, inspect_layer, or the tabular data tools instead.`,
    params: [
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `The user's question about how Felt works, verbatim.`,
      },
    ],
  },
  {
    name: 'feltmcp_import_layer_from_url',
    description: `Import an external data source as a new layer on a map by URL.
Supports ArcGIS services, WMS, GeoJSON, Shapefiles, and other formats Felt accepts.

Processing is asynchronous; call \`poll_layer_processing_status\` with the returned \`map_id\` and \`layer_id\` to confirm completion before reporting success to the user.
`,
    params: [
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map to add the layer to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A concise, human-readable display name for the layer`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The URL of the data source to add. Pass URLs verbatim from a tool result or directly from the user — never construct or modify URLs yourself.`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional; default to omitting. Add a caption only when the layer name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' → 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply (opaque name AND attribute encoding), combine them concisely (e.g. 'NHD flowlines, colored by stream order').
`,
      },
    ],
  },
  {
    name: 'feltmcp_inspect_data_source_table_columns',
    description: `Get the full column schema for a table in a connected database, including column names and types.`,
    params: [
      { name: 'table_id', type: 'string', required: true, description: `The table ID to inspect.` },
    ],
  },
  {
    name: 'feltmcp_inspect_layer',
    description: `Get the details of a single layer: the full column schema (column
names, types, sample values, row count, cardinality, min/max for
numeric columns), whether the layer is visible, and its legend items
(categories or class breaks) with the ids set_visibility expects.
Returns a table name for queryable layers that can be used as the
table identifier in SQL queries.

\`processing_status\` says whether the schema below can be trusted:

- \`completed\` — an empty \`columns\` list means the layer really has no
  attributes.
- \`processing\` — the layer is still being built, so its columns and row
  count are missing or provisional. \`progress_percent\` says how far
  along, when the pipeline reports it.
- \`failed\` — the import failed and \`processing_error\` says why.

Every column reports two names. Which one applies is fixed per use, so
route by this list rather than by which name reads better:

- \`storage_name\` — the attribute of an FSL style, and the group_by,
  aggregate_by and filter_by bindings of a layer component. This is the
  name the data itself carries, and it can be an opaque UUID for a
  column added by editing the layer.
- \`display_name\` — a SQL query against this layer's table, the columns
  edit_layer_attributes names, and any title or wording you write for
  the user, including a layer component's title. This is the name Felt
  shows in its own UI.

A layer component therefore takes both: its title is the display name,
its attribute binding is the storage name. A style that renames a column
makes the two names unrelated strings, so neither can be derived from the
other — read both from this tool.

A layer's features and columns can be edited by collaborators between
turns, so treat results as a snapshot and re-inspect when correctness
matters.`,
    params: [
      { name: 'layer_id', type: 'string', required: true, description: `The layer ID to inspect.` },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map the layer belongs to.`,
      },
    ],
  },
  {
    name: 'feltmcp_list_annotations',
    description: `Return all lightweight markup annotations on a map. Only includes annotation types this tool family can edit: \`Place\`, \`Rectangle\`, \`Polygon\`, \`Circle\`, \`Text\`, \`Note\`, \`Link\`, \`Line\`. Other annotation types drawn in the UI are excluded but still exist on the map — mention that to the user if they ask why something is missing. Each returned annotation is shaped to pass straight back to \`upsert_annotations\` (modify by its \`id\`).

Geometry conventions — every coordinate is \`[latitude, longitude]\`, the reverse of the \`[longitude, latitude]\` order that SQL and GeoJSON expect. Per type:

- \`Place\` — \`coordinates\` is one point.
- \`Circle\` — \`center\` and \`radius\` in meters. No polygon is returned; construct one if you need an area.
- \`Rectangle\` — \`corners\` is the south-west corner then the north-east corner of an axis-aligned box.
- \`Polygon\` — \`coordinates\` is the outer ring, left open: the first vertex is not repeated at the end. No holes.
- \`Line\` — \`coordinates\` is an ordered list of vertices forming a single polyline.
- \`Text\`, \`Note\`, \`Link\` — \`corners\` is the box the label occupies on screen. It is not a claim about an area on the ground; don't use it as one.

Annotations are markup, not data — for circling, labelling, sketching and pointing things out. If the geometry comes from a query or a file, traces a real boundary, or runs to more than a handful of shapes, create a layer instead.
`,
    params: [{ name: 'map_id', type: 'string', required: true, description: `The ID of the map.` }],
  },
  {
    name: 'feltmcp_list_data_sources',
    description: `List connected external databases (Postgres, Snowflake, BigQuery, etc.). Returns source names, IDs, and database types. The type indicates the SQL dialect to use when querying.`,
    params: [],
  },
  {
    name: 'feltmcp_list_felt_servers',
    description: `List the workspace's Felt Servers — named containers of reusable layers organized into folders. Returns each server's id, name, and description.`,
    params: [],
  },
  {
    name: 'feltmcp_list_maps',
    description: `List maps the current user can access. Returns the most recently visited maps.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter maps by title using a fuzzy match. Omit to list the most recently visited maps without filtering.`,
      },
    ],
  },
  {
    name: 'feltmcp_list_projects',
    description: `List all projects in the current workspace.`,
    params: [],
  },
  {
    name: 'feltmcp_organize_layers',
    description: `Group, ungroup, or reorder layers and layer groups. Provide exactly one of group, ungroup, or move per call; chain calls for compound changes. Layer and layer group ids come from get_map_layers. Standalone layers are ordered at the top level automatically — pass either their layer id or layer group id. Move semantics: above/below a group places at the top level next to it; top/bottom with a group as relative_to places inside that group; top/bottom with no relative_to means the very top/bottom of the map. Groups cannot be nested inside other groups.
`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'group',
        type: 'object',
        required: false,
        description: `Move layers into an existing group (group_id) or create a new group containing them (name). Provide exactly one of group_id or name.
`,
      },
      {
        name: 'move',
        type: 'object',
        required: false,
        description: `Reorder layers or layer groups. Provide layer_ids or layer_group_ids (not both), a placement, and — for above/below — a relative_to id.
`,
      },
      {
        name: 'ungroup',
        type: 'object',
        required: false,
        description: `Dissolve groups: their layers become standalone layers at the top level, keeping their stacking position.
`,
      },
    ],
  },
  {
    name: 'feltmcp_poll_layer_processing_status',
    description: `Wait until a layer is ready to use. Polls the layer's processing status until it resolves or \`wait_seconds\` elapses.

\`wait_seconds\` is one of \`5\`, \`10\`, or \`30\`. Pick \`5\` for a quick check before moving on; pick \`30\` when waiting for processing is better UX than an idle back-and-forth. The call returns early if the status resolves sooner.

Returns \`status\`, one of:
- \`in_progress\` — layer is still processing; call this tool again.
- \`completed\` — layer is ready.
- \`failed\` — processing failed. An \`error\` field explains why. An \`error_type\` field (when present) gives the exception class name.
`,
    params: [
      {
        name: 'layer_id',
        type: 'string',
        required: true,
        description: `The ID of the layer to poll. Returned by any layer-creating or refresh tool.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map the layer is on.`,
      },
      {
        name: 'wait_seconds',
        type: 'integer',
        required: true,
        description: `Maximum number of seconds to wait for the status to resolve. Polls server-side and returns early if the layer finishes processing.`,
      },
    ],
  },
  {
    name: 'feltmcp_prepare_file_upload',
    description: `Returns a presigned upload slot for adding a file to Felt as a new layer on the map. The layer is created once you POST the file bytes to the returned slot — this tool alone does nothing visible until the upload completes. Requires code execution (shell / HTTP client) to complete. Supported formats: CSV, TSV, Excel, GeoJSON, Shapefile ZIP, KML, KMZ, GPX, MBTiles, FlatGeobuf, GeoPackage, DXF, DWG, GeoTIFF, and any other raster format that GDAL supports.

Felt will reproject data into the correct coordinate system if spatial referencing is defined in the format metadata: DON'T reproject.
Felt detects and geocodes addresses and common location columns (lat/lon, admin boundaries, H3, WKT) automatically.

When narrating progress to the user, describe this as "uploading to Felt" — never as uploading to S3 or naming any backend storage service. Felt's storage is an implementation detail; some customers also connect their own S3 buckets to Felt and naming the backend confuses where their data is going.

Use this when: you can execute code (shell, HTTP client) and need to upload a local file — large or binary files, or text files you'd rather not inline. This is the paved road for file uploads.

Don't use this when: the file is at a public URL (use \`import_layer_from_url\`), the content is small text already inline in your conversation (use \`upload_contents_to_map\`), or you cannot execute code. Without code execution, direct the user to their map's URL (from \`get_map\` / \`list_maps\`) and ask them to drag-and-drop the file into the Felt web app — do not call this tool.

Provide \`replace_layer_id\` to refresh an existing file-backed layer with the uploaded bytes instead of creating a new one. Omit it to create a new layer.

How to use the returned slot: Build a multipart POST using every entry in \`upload.form_fields\` exactly as returned — don't reorder, modify, or re-sign. Add one more part named \`upload.file_field_name\` with the file bytes and filename \`upload.filename_to_send\`. POST to \`upload.url\`. Treat \`upload.expected_status\` (204) as success; any other status means the slot is bad — don't retry, call \`prepare_file_upload\` again for a fresh slot. On 204, call \`poll_layer_processing_status\` with the returned \`map_id\` and \`layer_id\` to confirm processing.

Trust the HTTP status of your upload POST to know whether the bytes landed. If the POST returned 2xx, poll until \`completed\` or \`failed\`. If the POST returned 4xx/5xx, the slot is bad — request a new one via \`prepare_file_upload\`.
`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The user's filename, including extension (e.g. \`parks.geojson\`, \`census.csv\`). Format is detected from the extension — pick one that matches the file's contents.
`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map to add the layer to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A concise, human-readable display name for the layer`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional; default to omitting. Add a caption only when the layer name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' → 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply (opaque name AND attribute encoding), combine them concisely (e.g. 'NHD flowlines, colored by stream order'). Ignored when \`replace_layer_id\` is provided.`,
      },
      {
        name: 'replace_layer_id',
        type: 'string',
        required: false,
        description: `Optional. Omit to create a new layer. Provide an existing file-backed layer's ID to refresh it with the uploaded bytes instead.
`,
      },
    ],
  },
  {
    name: 'feltmcp_refresh_data_source_layer',
    description: `Refresh a data-source-backed layer in place. Re-runs its stored query or re-reads its backing table.

Use this when: the user wants the latest data for a layer backed by a connected data source.

Processing is asynchronous; use the returned \`map_id\` and \`layer_id\` to poll the layer's processing status.
`,
    params: [
      {
        name: 'layer_id',
        type: 'string',
        required: true,
        description: `The ID of the data-source-backed layer to refresh.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map the layer is on.`,
      },
    ],
  },
  {
    name: 'feltmcp_refresh_url_layer',
    description: `Refresh a URL-backed layer in place by re-fetching its stored URL.

Use this when: the user wants the latest data for a layer originally imported from a URL.

Processing is asynchronous; use the returned \`map_id\` and \`layer_id\` to poll the layer's processing status.
`,
    params: [
      {
        name: 'layer_id',
        type: 'string',
        required: true,
        description: `The ID of the URL-backed layer to refresh.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map the layer is on.`,
      },
    ],
  },
  {
    name: 'feltmcp_render_map',
    description: `Render a Felt map inline as an interactive widget for the user. For map metadata (title, location, layer count, etc.) call \`get_map\` instead — \`render_map\` is solely for showing the user the map.

The widget captures a one-shot snapshot of the map's state at the moment this tool is called and does NOT update live as you make further changes — call \`render_map\` LAST in any turn that creates or edits a map so the user sees the final state. If you added or imported layers in this turn, first call \`poll_layer_processing_status\` and wait for them to finish processing; rendering before that point shows an empty or incomplete map.

ALWAYS pair this call with the map's URL in your text reply: include the returned \`url\` as a clickable markdown link (e.g. \`[<map title>](<url>)\`). The widget is a snapshot users can't navigate from — the link is how they actually open the map in Felt, so calling \`render_map\` is not a substitute for sharing the URL.`,
    params: [
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map to render.`,
      },
    ],
  },
  {
    name: 'feltmcp_set_layer_group_interaction',
    description: `Set how a layer group's layers are toggled in the legend. Options:
- default: a checkbox list — each layer toggles independently.
- slider: a slider that steps through layers, one visible at a time (best for ordered series like time steps or scenarios).
- single_select: a radio/dropdown — exactly one layer visible at a time.
- multi_select: checkboxes where any combination of layers can be visible.

Layer group ids come from get_map_layers. slider, single_select, and multi_select require a group with at least two layers. Switching to slider or single_select leaves only the top layer visible; switching to default or multi_select makes every layer visible.
`,
    params: [
      {
        name: 'interaction',
        type: 'string',
        required: true,
        description: `The visibility interaction to apply to the layer group: default (independent checkboxes, each layer toggles on its own), slider (steps through layers one at a time, best for ordered series like time steps or scenarios), single_select (radio/dropdown, exactly one layer visible), or multi_select (checkboxes, any combination of layers visible). slider, single_select, and multi_select require the group to have at least two layers; switching to slider or single_select leaves only the top layer visible, while switching to default or multi_select makes every layer visible.`,
      },
      {
        name: 'layer_group_id',
        type: 'string',
        required: true,
        description: `ID of the layer group to update. Layer group ids come from the get_map_layers tool.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map that contains the layer group.`,
      },
    ],
  },
  {
    name: 'feltmcp_set_visibility',
    description: `Show and/or hide layers, layer groups, and legend items (categories or class breaks). Layer and layer group ids come from get_map_layers; legend item ids come from inspect_layer — treat legend item ids as opaque strings and pass them back verbatim. Hiding a legend item also filters that category out of the layer's data; hiding every legend item of a layer hides the whole layer.
`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      { name: 'hide', type: 'object', required: false, description: `The entities to hide.` },
      { name: 'show', type: 'object', required: false, description: `The entities to show.` },
    ],
  },
  {
    name: 'feltmcp_share_map',
    description: `Update a map's public access setting and return its share URL.`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'public_access',
        type: 'string',
        required: true,
        description: `Map visibility: \`private\` (only explicit members can access), \`view_only\` (anyone with the link can view), \`view_and_comment\` (anyone with the link can view and comment), \`view_comment_and_edit\` (anyone with the link can view, comment, and edit).`,
      },
    ],
  },
  {
    name: 'feltmcp_update_layer_group_properties',
    description: `Update a layer group's name, caption, or legend settings. Only the provided fields change. Only works on real layer groups, not on standalone layers.
`,
    params: [
      {
        name: 'layer_group_id',
        type: 'string',
        required: true,
        description: `ID of the layer group to update. Only works on real layer groups, not on standalone layers.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map that contains the layer group.`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional caption rendered under the group's name in the legend; default to omitting. Add a caption only when the layer group name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' -> 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply, combine them concisely (e.g. 'NHD flowlines, colored by stream order'). Pass an empty string to clear an existing caption.`,
      },
      {
        name: 'collapsed',
        type: 'boolean',
        required: false,
        description: `Whether the group is collapsed in the legend. Omit to leave the current collapsed state unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the group. Only provided fields change on update, so omit this to leave the current name unchanged.`,
      },
      {
        name: 'shown_in_legend',
        type: 'boolean',
        required: false,
        description: `Whether the group appears in the legend at all. Omit to leave the current visibility-in-legend setting unchanged.`,
      },
    ],
  },
  {
    name: 'feltmcp_update_layer_properties',
    description: `Update a layer's properties. Can set any combination of: FSL style, name, caption. Only the provided fields are changed; omitted fields are left as-is.
`,
    params: [
      {
        name: 'layer_id',
        type: 'string',
        required: true,
        description: `The ID of the layer to update`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional; default to omitting. Add a caption only when the layer name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' → 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply (opaque name AND attribute encoding), combine them concisely (e.g. 'NHD flowlines, colored by stream order'). When you change a layer's style to encode a different attribute, update the caption in the same call so it doesn't go stale. Pass an empty string to clear an existing caption.
`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A concise, human-readable display name for the layer`,
      },
      {
        name: 'style',
        type: 'object',
        required: false,
        description: `Complete FSL style object — FSL is a complex proprietary format that must be generated, not hand-written.`,
      },
    ],
  },
  {
    name: 'feltmcp_update_map',
    description: `Update a map's title, basemap, zoom level, or basemap label visibility.`,
    params: [
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
      {
        name: 'basemap',
        type: 'string',
        required: false,
        description: `Basemap. One of: a preset name (\`default\`, \`light\`, \`dark\`, \`satellite\`); a hex color like \`#1a2b3c\`; or a raster XYZ tile URL like \`https://example.com/{z}/{x}/{y}.png\` pointing to an external server.`,
      },
      {
        name: 'show_basemap_labels',
        type: 'boolean',
        required: false,
        description: `Show place labels on the default basemap.`,
      },
      { name: 'title', type: 'string', required: false, description: `New map title.` },
      { name: 'zoom', type: 'number', required: false, description: `Zoom level (0-22).` },
    ],
  },
  {
    name: 'feltmcp_upload_contents_to_map',
    description: `Add Geo data to the map as a new layer by including its contents inline as raw text (no file upload). Supported formats: CSV, TSV, GeoJSON, KML, GPX.

Use this when: the content is already inline in your conversation (e.g., the user dragged a small CSV into Claude) and you cannot run a shell command.

Don't use this when: you have code execution (prefer \`prepare_file_upload\` — bytes flow directly to Felt without passing through conversation context), the file is at a public URL (use \`import_layer_from_url\`), or the content is a larger or binary file (use \`prepare_file_upload\`).

## Check the size before calling

You retype every byte of \`contents\` yourself, so a large paste costs minutes of generation and can exhaust your output budget part-way through, which kills the turn and produces no layer at all.

Judge the size of the data before you call. Above roughly 200 rows or 20 KB of text, use \`prepare_file_upload\` instead — it sends the bytes directly without passing them through your output. Never call this tool with a shortened, sampled, or partial copy of the data. When you are unsure whether it is too big, prefer \`prepare_file_upload\`.

## Felt infers location from the contents — you do not need coordinates

Felt works through these in order and stops at the first that resolves for most rows:

1. Geometry literals — a WKT, WKB, EWKB, or GeoJSON column (named \`wkt\`, \`wkb\`, \`geojson\`, \`geometry\`, \`geom\`, \`the_geom\`, \`geography\`, \`shape\`, or \`location\`), or a coordinate pair: \`longitude\`/\`latitude\`, \`lng\`/\`lat\`, \`lon\`/\`lat\`, \`long\`/\`lat\`, or \`x\`/\`y\`, including prefixed and suffixed variants like \`pickup_lon\`/\`pickup_lat\`.
2. Addresses, which Felt geocodes — either one full-address column, or separate street / city / region / country / postal-code columns.
3. Well-known entities, matched by name or code — countries (name, ISO2, ISO3); admin-1 regions (name, local name, ISO 3166-2); US states (name, USPS abbreviation, FIPS); US counties, CBSAs, census tracts, and block groups (name and/or FIPS GEOID); US ZIP codes and ZCTAs; Eurostat NUTS 1/2/3 and LAU (name and id); Australian postal areas; and IANA time zone names.
4. H3 cell ids.

Pass the location column through as-is — never convert an address or an entity name to coordinates yourself, and never drop a column you think Felt can't read. Guessing coordinates produces a layer that looks authoritative and is wrong; Felt's geocoder and entity matcher are the correct answer.

Name location columns for what they hold (\`county_fips\`, \`zip\`, \`country\`, \`h3\`, \`lat\`/\`lon\`). Detection reads column names as well as values, so a well-named column matches far more reliably. Entity matching needs most values in the column to resolve, so keep the rows in one consistent form rather than mixing, say, county names with state names.

## When the user supplied the text, pass it through verbatim

The column guidance above applies only to data you are composing yourself. When the user pasted or typed the data, set \`format\` to what they actually gave you — \`tsv\` for tab-separated text, \`csv\` for comma-separated — and copy the text through unchanged. Never convert between formats, re-delimit columns, rename or reorder columns, or reflow rows.

Write the data exactly once, as this argument. Restating the rows in your reasoning or drafting them as a table first doubles the cost and can exhaust the turn before the upload begins.

Provide \`replace_layer_id\` to refresh that uploaded layer with the supplied contents instead of creating a new one. Does not work on layers backed by a connected data source. Omit it to create a new layer.

Processing is asynchronous; call \`poll_layer_processing_status\` with the returned \`map_id\` and \`layer_id\` to confirm completion.
`,
    params: [
      {
        name: 'contents',
        type: 'string',
        required: true,
        description: `The file contents, inline as a string.`,
      },
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `Format of \`contents\`: \`csv\`, \`tsv\`, \`geojson\`, \`kml\`, or \`gpx\`.`,
      },
      {
        name: 'map_id',
        type: 'string',
        required: true,
        description: `The ID of the map to add the layer to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A concise, human-readable display name for the layer`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional; default to omitting. Add a caption only when the layer name is opaque — agency acronyms, GIS jargon, or obscure dataset names a layperson can't decode (e.g. 'NHD Flowlines', 'CALVEG Vegetation Types'). Do NOT add a caption that rephrases the name with synonyms (e.g. 'Wind Farms' → 'Major wind energy installations') or pads it with filler qualifiers like 'Active', 'Major', or 'Historical' — if the caption doesn't tell the reader something the name alone didn't, omit it. Also add a caption when the styling encodes a data attribute — color or size by a column — to tell the reader what the symbology represents (e.g. 'Colored by median household income', 'Sized by 2020 population'). If both apply (opaque name AND attribute encoding), combine them concisely (e.g. 'NHD flowlines, colored by stream order'). Ignored when \`replace_layer_id\` is provided.`,
      },
      {
        name: 'replace_layer_id',
        type: 'string',
        required: false,
        description: `Optional. The ID of an existing uploaded layer to replace with these contents.`,
      },
    ],
  },
  {
    name: 'feltmcp_upsert_annotations',
    description: `Create or update lightweight markup annotations on a map — pins, notes, sketched shapes and lines. Supported types: \`Place\` (pin), \`Rectangle\`, \`Polygon\` (arbitrary outline), \`Circle\`, \`Text\`, \`Note\` (callout), \`Link\` (clickable preview that opens a URL), \`Line\` (polyline). Each annotation is an independent item. Coordinates are \`[latitude, longitude]\`.

To create: omit \`id\` and supply \`type\` + the type's required fields.

To update: supply \`id\` AND \`type\` (always required) plus any fields you want to change; fields you omit are preserved. The response returns a \`results\` list in the same order as your input, each entry with an \`id\` and \`status\` (\`"created"\` or \`"updated"\`), so you can zip it against what you sent.

Annotations are markup, not data — for circling, labelling, sketching and pointing things out. If the geometry comes from a query or a file, traces a real boundary, or runs to more than a handful of shapes, create a layer instead.
`,
    params: [
      {
        name: 'annotations',
        type: 'array',
        required: true,
        description: `Annotations to create or update.`,
      },
      { name: 'map_id', type: 'string', required: true, description: `The ID of the map.` },
    ],
  },
  {
    name: 'feltmcp_who_am_i',
    description: `Get information about the current user and workspace they are logged into.`,
    params: [],
  },
]
