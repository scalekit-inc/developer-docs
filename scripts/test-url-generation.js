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

// Test URL generation
function testUrlGeneration() {
  console.log('🧪 Testing URL generation...\n');

  const swagger = loadSwaggerSpec();
  const records = extractApiRecords(swagger);

  // Filter to API endpoint records only
  const endpointRecords = records.filter((r) => r.type === 'api-endpoint');

  console.log(`📊 Generated ${endpointRecords.length} API endpoint records\n`);

  // Test specific examples from user
  const testCases = [
    {
      path: '/api/v1/organizations/{id}',
      method: 'PATCH',
      expectedUrl:
        'https://docs.scalekit.com/apis/#tag/organizations/PATCH/api/v1/organizations/%7Bid%7D',
    },
    {
      path: '/api/v1/organizations/{organization_id}/directories/{directory_id}/users',
      method: 'GET',
      expectedUrl:
        'https://docs.scalekit.com/apis/#tag/directory/GET/api/v1/organizations/%7Borganization_id%7D/directories/%7Bdirectory_id%7D/users',
    },
    {
      path: '/api/v1/organizations',
      method: 'GET',
      expectedUrl:
        'https://docs.scalekit.com/apis/#tag/organizations/GET/api/v1/organizations',
    },
  ];

  console.log('🎯 Testing specific URL examples:\n');

  testCases.forEach((testCase, index) => {
    const record = endpointRecords.find(
      (r) => r.path === testCase.path && r.method === testCase.method
    );

    if (record) {
      const matches = record.url === testCase.expectedUrl;
      console.log(`${index + 1}. ${testCase.method} ${testCase.path}`);
      console.log(`   Generated: ${record.url}`);
      console.log(`   Expected:  ${testCase.expectedUrl}`);
      console.log(`   ${matches ? '✅ MATCH' : '❌ MISMATCH'}\n`);
    } else {
      console.log(`${index + 1}. ${testCase.method} ${testCase.path}`);
      console.log(`   ❌ Record not found\n`);
    }
  });

  // Show sample of all generated URLs
  console.log('📋 Sample of all generated URLs:\n');
  endpointRecords.slice(0, 10).forEach((record, index) => {
    console.log(`${index + 1}. ${record.title}`);
    console.log(`   ${record.url}\n`);
  });

  // Show tag distribution
  const tagCounts = {};
  endpointRecords.forEach((record) => {
    tagCounts[record.tag] = (tagCounts[record.tag] || 0) + 1;
  });

  console.log('📊 Endpoints by tag:');
  Object.entries(tagCounts).forEach(([tag, count]) => {
    console.log(`   ${tag}: ${count} endpoints`);
  });
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testUrlGeneration();
}
