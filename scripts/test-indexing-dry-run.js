#!/usr/bin/env node

import { extractApiRecords } from './algolia-api-indexer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Swagger spec
function loadSwaggerSpec() {
  const swaggerPath = path.join(
    __dirname,
    '../public/api/scalekit.swagger.json'
  );
  const swaggerContent = fs.readFileSync(swaggerPath, 'utf8');
  return JSON.parse(swaggerContent);
}

// Simulate the indexing process
function testIndexingDryRun() {
  console.log('🧪 Testing API indexing (dry run)...\n');

  const swagger = loadSwaggerSpec();
  const records = extractApiRecords(swagger);

  // Filter records by type
  const endpointRecords = records.filter((r) => r.type === 'api-endpoint');
  const parameterRecords = records.filter((r) => r.type === 'api-parameter');
  const pageRecords = records.filter((r) => r.type === 'page');

  console.log('📊 Record Summary:');
  console.log(`   Total records: ${records.length}`);
  console.log(`   API endpoints: ${endpointRecords.length}`);
  console.log(`   Parameters: ${parameterRecords.length}`);
  console.log(`   Pages: ${pageRecords.length}\n`);

  // Show sample records
  console.log('📋 Sample API endpoint records:\n');
  endpointRecords.slice(0, 3).forEach((record, index) => {
    console.log(`${index + 1}. ${record.title}`);
    console.log(`   ObjectID: ${record.objectID}`);
    console.log(`   Method: ${record.method}`);
    console.log(`   Path: ${record.path}`);
    console.log(`   Tag: ${record.tag}`);
    console.log(`   URL: ${record.url}`);
    console.log(`   Description: ${record.description.substring(0, 100)}...`);
    console.log(`   Keywords: ${record.keywords.substring(0, 100)}...\n`);
  });

  // Show sample parameter records
  console.log('📋 Sample parameter records:\n');
  parameterRecords.slice(0, 2).forEach((record, index) => {
    console.log(`${index + 1}. ${record.title}`);
    console.log(`   ObjectID: ${record.objectID}`);
    console.log(
      `   Parameter: ${record.parameterName} (${record.parameterType})`
    );
    console.log(`   URL: ${record.url}`);
    console.log(`   Description: ${record.description.substring(0, 100)}...\n`);
  });

  // Validate record structure
  console.log('🔍 Validating record structure...');
  let validationErrors = 0;

  records.forEach((record, index) => {
    // Check required fields
    const requiredFields = ['objectID', 'title', 'url', 'type'];
    requiredFields.forEach((field) => {
      if (!record[field]) {
        console.log(`   ❌ Record ${index}: Missing required field '${field}'`);
        validationErrors++;
      }
    });

    // Check URL format
    if (
      record.url &&
      !record.url.startsWith('https://docs.scalekit.com/apis/')
    ) {
      console.log(`   ❌ Record ${index}: Invalid URL format: ${record.url}`);
      validationErrors++;
    }

    // Check hierarchy structure for search
    if (!record.hierarchy || !record.hierarchy.lvl0) {
      console.log(`   ❌ Record ${index}: Missing hierarchy structure`);
      validationErrors++;
    }
  });

  if (validationErrors === 0) {
    console.log('   ✅ All records passed validation\n');
  } else {
    console.log(`   ❌ Found ${validationErrors} validation errors\n`);
  }

  // Show what would be uploaded
  console.log('📤 Simulated upload process:');
  const batchSize = 100;
  const batches = Math.ceil(records.length / batchSize);

  for (let i = 0; i < batches; i++) {
    const start = i * batchSize;
    const end = Math.min(start + batchSize, records.length);
    const batchRecords = records.slice(start, end);
    console.log(
      `   Batch ${i + 1}/${batches}: ${batchRecords.length} records (${
        start + 1
      }-${end})`
    );
  }

  console.log('\n✅ Dry run completed successfully!');
  console.log('💡 To actually index the records, run: npm run index-api');
  console.log('⚠️  Make sure ALGOLIA_WRITE_API_KEY is set in your .env file');
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testIndexingDryRun();
}
