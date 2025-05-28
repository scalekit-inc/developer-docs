#!/usr/bin/env node

import { algoliasearch } from 'algoliasearch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
console.log('🔍 Looking for .env file at:', envPath);
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
}

// Algolia configuration
const ALGOLIA_APP_ID = '7554BDRAJD';
const ALGOLIA_INDEX_NAME = 'crawler_Scalekit Starlight';
const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY;

console.log('\n🔑 Environment Variables:');
console.log('   ALGOLIA_WRITE_API_KEY exists:', !!ALGOLIA_WRITE_API_KEY);
if (ALGOLIA_WRITE_API_KEY) {
  console.log('   API Key length:', ALGOLIA_WRITE_API_KEY.length);
  console.log(
    '   API Key preview:',
    `${ALGOLIA_WRITE_API_KEY.substring(
      0,
      8
    )}...${ALGOLIA_WRITE_API_KEY.substring(ALGOLIA_WRITE_API_KEY.length - 4)}`
  );
}

if (!ALGOLIA_WRITE_API_KEY) {
  console.error('❌ ALGOLIA_WRITE_API_KEY environment variable is required');
  process.exit(1);
}

async function testAlgoliaPermissions() {
  console.log('\n🔑 Testing Algolia record insertion...\n');

  try {
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);

    console.log('📋 Configuration:');
    console.log(`   App ID: ${ALGOLIA_APP_ID}`);
    console.log(`   Index Name: ${ALGOLIA_INDEX_NAME}`);
    console.log(
      `   API Key: ${ALGOLIA_WRITE_API_KEY.substring(
        0,
        8
      )}...${ALGOLIA_WRITE_API_KEY.substring(ALGOLIA_WRITE_API_KEY.length - 4)}`
    );
    console.log('');

    // Test: Try to add a test object
    console.log('🔍 Testing record insertion...');
    try {
      const testObject = {
        objectID: 'test-permissions-check',
        title: 'Test Object',
        content: 'This is a test object to check write permissions',
        type: 'test',
      };

      await client.saveObjects({
        indexName: ALGOLIA_INDEX_NAME,
        objects: [testObject],
      });

      console.log('   ✅ Successfully added test object');

      // Clean up the test object
      try {
        await client.deleteObject({
          indexName: ALGOLIA_INDEX_NAME,
          objectID: 'test-permissions-check',
        });
        console.log('   ✅ Successfully cleaned up test object');
      } catch (cleanupError) {
        console.log(
          `   ⚠️  Could not clean up test object: ${cleanupError.message}`
        );
      }
    } catch (error) {
      console.log(`   ❌ Cannot write to index: ${error.message}`);

      if (error.message.includes('Not enough rights')) {
        console.log('\n💡 Troubleshooting suggestions:');
        console.log(
          "   1. Make sure you're using an API Key with 'addObject' permission"
        );
        console.log('   2. Verify the API key is for the correct application');
        console.log(
          '   3. In Algolia Dashboard > API Keys, ensure your key has:'
        );
        console.log('      - ACL: addObject');
        console.log(
          '      - Indices: * (all indices) or specifically "crawler_Scalekit Starlight"'
        );
      }
    }
  } catch (error) {
    console.error('❌ Failed to test Algolia permissions:', error.message);
  }
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testAlgoliaPermissions();
}
