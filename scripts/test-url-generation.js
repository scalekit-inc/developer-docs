#!/usr/bin/env node

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

      records.push(endpointRecord);
    });
  });

  return records;
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
