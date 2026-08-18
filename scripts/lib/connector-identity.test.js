import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  toPascalCase,
  setupExportName,
  usageExportName,
  getSetupComponent,
  getUsageComponent,
  sectionMatchesSlug,
} from './connector-identity.js'

test('toPascalCase splits on hyphen and underscore', () => {
  assert.equal(toPascalCase('google-ads'), 'GoogleAds')
  assert.equal(toPascalCase('google_ads'), 'GoogleAds')
  assert.equal(
    toPascalCase('after-setup-github-common-workflows'),
    'AfterSetupGithubCommonWorkflows',
  )
})

test('setupExportName splits on hyphen only', () => {
  assert.equal(setupExportName('github'), 'SetupGithubSection')
  assert.equal(setupExportName('google-ads'), 'SetupGoogleAdsSection')
  assert.equal(setupExportName('google-meets'), 'SetupGoogleMeetsSection')
})

test('usageExportName lowercases the rest of each word', () => {
  assert.equal(usageExportName('GitHub'), 'UsageGithubSection')
})

test('lookup keeps the five fallbacks and does not invent brave-search', () => {
  const setupMap = {
    github: setupExportName('github'),
    'google-ads': setupExportName('google-ads'),
    'google-docs': setupExportName('google-docs'),
    'google-meets': setupExportName('google-meets'),
    'brave-search': setupExportName('brave-search'),
  }

  assert.equal(getSetupComponent(setupMap, 'github'), 'SetupGithubSection')
  assert.equal(getSetupComponent(setupMap, 'google_ads'), 'SetupGoogleAdsSection')
  assert.equal(getSetupComponent(setupMap, 'googledocs'), 'SetupGoogleDocsSection')
  assert.equal(getSetupComponent(setupMap, 'googlemeet'), 'SetupGoogleMeetsSection')
  assert.equal(getSetupComponent(setupMap, 'brave'), null)
  assert.equal(getUsageComponent(setupMap, ''), null)
})

test('section tail match keeps prefix behavior', () => {
  assert.equal(sectionMatchesSlug('google_ads-common-workflows', 'google_ads'), true)
  assert.equal(sectionMatchesSlug('brave-search-common-workflows', 'brave'), true)
  assert.equal(sectionMatchesSlug('github-common-workflows', 'linear'), false)
})
