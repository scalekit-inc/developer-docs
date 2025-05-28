#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { algoliasearch } from 'algoliasearch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Algolia configuration from astro.config.mjs
const ALGOLIA_APP_ID = '7554BDRAJD';
const ALGOLIA_INDEX_NAME = 'crawler_Scalekit Starlight';
const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY;

if (!ALGOLIA_WRITE_API_KEY) {
  console.error('❌ ALGOLIA_WRITE_API_KEY environment variable is required');
  process.exit(1);
}

// Initialize Algolia client
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);

// Load and parse Swagger JSON
function loadSwaggerSpec() {
  try {
    const swaggerPath = path.join(
      __dirname,
      '../public/api/scalekit.swagger.json'
    );
    const swaggerContent = fs.readFileSync(swaggerPath, 'utf8');
    return JSON.parse(swaggerContent);
  } catch (error) {
    console.error('❌ Error loading Swagger file:', error.message);
    process.exit(1);
  }
}

// Generate URL fragment for API endpoint
function generateUrlFragment(path, method, tags) {
  const tag = tags && tags[0] ? tags[0].toLowerCase() : 'api';
  const encodedPath = path.replace(/\{([^}]+)\}/g, '%7B$1%7D');
  return `#tag/${tag}/${method.toUpperCase()}${encodedPath}`;
}

// Extract and structure API records from Swagger
export function extractApiRecords(swagger) {
  const records = [];
  const baseUrl = 'https://docs.scalekit.com/apis/';

  // Add main API reference page
  records.push({
    objectID: 'api-reference-main',
    title: 'Scalekit API Reference',
    description:
      swagger.info.description || 'Complete API documentation for Scalekit',
    content: `${swagger.info.title} - ${swagger.info.description}`,
    url: baseUrl,
    type: 'page',
    hierarchy: {
      lvl0: 'API Reference',
      lvl1: 'Overview',
    },
  });

  // Process each API endpoint
  Object.entries(swagger.paths).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, operation]) => {
      if (!operation || typeof operation !== 'object') return;

      const {
        summary,
        description,
        tags = [],
        operationId,
        parameters = [],
      } = operation;

      const tag = tags[0] || 'API';
      const urlFragment = generateUrlFragment(path, method, tags);
      const fullUrl = baseUrl + urlFragment;

      // Create main endpoint record
      const endpointRecord = {
        objectID:
          operationId || `${method}-${path.replace(/[^a-zA-Z0-9]/g, '-')}`,
        title: summary || `${method.toUpperCase()} ${path}`,
        description: description || summary || '',
        content: `${method.toUpperCase()} ${path} - ${
          description || summary || ''
        }`,
        url: fullUrl,
        type: 'api-endpoint',
        method: method.toUpperCase(),
        path: path,
        tag: tag,
        hierarchy: {
          lvl0: 'API Reference',
          lvl1: `${tag} API`,
          lvl2: summary || `${method.toUpperCase()} ${path}`,
        },
      };

      // Add searchable keywords
      const keywords = [
        method.toUpperCase(),
        tag,
        ...path
          .split('/')
          .filter((segment) => segment && !segment.startsWith('{')),
        ...(summary || '').split(' '),
        ...(description || '').split(' ').slice(0, 10), // First 10 words of description
      ].filter(Boolean);

      endpointRecord.keywords = keywords.join(' ');

      records.push(endpointRecord);

      // Add parameter records for better searchability
      parameters.forEach((param, index) => {
        if (param.name && param.description) {
          records.push({
            objectID: `${endpointRecord.objectID}-param-${index}`,
            title: `${param.name} parameter`,
            description: param.description,
            content: `${param.name} - ${param.description} (${
              param.in
            } parameter for ${method.toUpperCase()} ${path})`,
            url: fullUrl,
            type: 'api-parameter',
            method: method.toUpperCase(),
            path: path,
            tag: tag,
            parameterName: param.name,
            parameterType: param.type || 'string',
            hierarchy: {
              lvl0: 'API Reference',
              lvl1: `${tag} API`,
              lvl2: summary || `${method.toUpperCase()} ${path}`,
              lvl3: `${param.name} parameter`,
            },
          });
        }
      });
    });
  });

  return records;
}

// Main function to index API documentation
export async function indexApiDocumentation() {
  console.log('🚀 Starting API documentation indexing...');

  try {
    // Load Swagger specification
    console.log('📖 Loading Swagger specification...');
    const swagger = loadSwaggerSpec();

    // Extract API records
    console.log('🔍 Extracting API records...');
    const records = extractApiRecords(swagger);
    console.log(`📝 Generated ${records.length} records`);

    // Clear existing API records (optional - remove if you want to keep other content)
    console.log('🧹 Clearing existing API records...');
    await client.deleteBy({
      indexName: ALGOLIA_INDEX_NAME,
      deleteByParams: {
        filters:
          'type:api-endpoint OR type:api-parameter OR objectID:api-reference-main',
      },
    });

    // Index new records in batches
    console.log('📤 Uploading records to Algolia...');
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      await client.saveObjects({
        indexName: ALGOLIA_INDEX_NAME,
        objects: batch,
      });
      console.log(
        `   Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          records.length / batchSize
        )}`
      );
    }

    console.log('✅ API documentation successfully indexed!');
    console.log(`📊 Total records indexed: ${records.length}`);

    // Display sample URLs
    console.log('\n🔗 Sample indexed URLs:');
    records.slice(0, 5).forEach((record) => {
      console.log(`   ${record.title}: ${record.url}`);
    });
  } catch (error) {
    console.error('❌ Error indexing API documentation:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  indexApiDocumentation();
}
