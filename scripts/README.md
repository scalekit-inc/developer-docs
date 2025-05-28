# Algolia API Indexer

This script automatically indexes your API documentation from the Swagger JSON file into Algolia search.

## Setup

1. Make sure you have your Algolia Write API Key in your `.env` file:

   ```
   ALGOLIA_WRITE_API_KEY=your_write_api_key_here
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

## Usage

### Test the setup (recommended first)

Test URL generation:

```bash
npm run test-urls
```

Test indexing without uploading (dry run):

```bash
npm run test-indexing
```

### Index API documentation

Run the indexer script:

```bash
npm run index-api
```

Or directly:

```bash
node scripts/algolia-api-indexer.js
```

## Available Scripts

- `npm run test-urls` - Test URL generation against your examples
- `npm run test-indexing` - Dry run to validate records without uploading
- `npm run index-api` - Actually index the API documentation to Algolia

## What it does

The script will:

1. **Load** the Swagger specification from `public/api/scalekit.swagger.json`
2. **Extract** API endpoints and their details
3. **Generate** properly formatted URLs matching your site structure
4. **Clear** existing API records from Algolia (to avoid duplicates)
5. **Upload** new records in batches

## Generated Records

For each API endpoint, the script creates:

- **Main endpoint record** with title, description, method, path, and URL
- **Parameter records** for each endpoint parameter (for better searchability)

### Record Structure

Each record includes:

- `objectID`: Unique identifier
- `title`: Human-readable title
- `description`: Endpoint description
- `content`: Searchable content
- `url`: Direct link to the API documentation
- `type`: Record type (`api-endpoint` or `api-parameter`)
- `method`: HTTP method (GET, POST, etc.)
- `path`: API path
- `tag`: API category (Organizations, Connections, etc.)
- `hierarchy`: Structured navigation levels for Algolia
- `keywords`: Additional searchable terms

### Example URLs Generated

- `https://docs.scalekit.com/apis/#tag/organizations/GET/api/v1/organizations`
- `https://docs.scalekit.com/apis/#tag/organizations/PATCH/api/v1/organizations/%7Bid%7D`
- `https://docs.scalekit.com/apis/#tag/directory/GET/api/v1/organizations/%7Borganization_id%7D/directories/%7Bdirectory_id%7D/users`

## Configuration

The script uses configuration from `astro.config.mjs`:

- **App ID**: `7554BDRAJD`
- **Index Name**: `crawler_Scalekit Starlight`
- **API Key**: From `ALGOLIA_WRITE_API_KEY` environment variable

## Record Statistics

Based on your current Swagger file, the script generates:

- **23 API endpoint records** (main searchable endpoints)
- **52 parameter records** (for enhanced parameter search)
- **1 main page record** (API reference overview)
- **Total: 76 records**

## Troubleshooting

- **Missing API Key**: Ensure `ALGOLIA_WRITE_API_KEY` is set in your `.env` file
- **Swagger File Not Found**: Check that `public/api/scalekit.swagger.json` exists
- **Algolia Errors**: Verify your API key has write permissions for the index
- **URL Mismatch**: Run `npm run test-urls` to verify URL generation

## Automation

You can run this script:

- **Manually** when API documentation changes
- **In CI/CD** as part of your deployment process
- **On a schedule** to keep search index fresh

## Testing

Before running the actual indexing, you can:

1. **Test URL generation**: `npm run test-urls`

   - Validates that generated URLs match your expected format
   - Shows sample URLs for verification

2. **Test record structure**: `npm run test-indexing`
   - Validates all record structures
   - Shows what would be uploaded without actually uploading
   - Displays statistics and sample records
