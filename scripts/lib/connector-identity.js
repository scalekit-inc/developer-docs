/**
 * Connector template identity: slug / stem → export name.
 * Rules must stay identical to the previous inline copies in
 * scripts/sync-agent-connectors.js.
 */

export function toPascalCase(stem) {
  return stem
    .split(/[-_]/)
    .filter((w) => w.length > 0)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')
}

export function setupExportName(stem) {
  return (
    'Setup' +
    stem
      .split('-')
      .filter((w) => w.length > 0)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join('') +
    'Section'
  )
}

export function usageExportName(stem) {
  return (
    'Usage' +
    stem
      .split(/[-_]/)
      .filter((w) => w.length > 0)
      .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join('') +
    'Section'
  )
}

export function lookupStemValue(stemMap, providerSlug) {
  if (!providerSlug) return null
  return (
    stemMap[providerSlug] ||
    stemMap[providerSlug.replace(/_/g, '-')] ||
    stemMap[providerSlug.replace(/_/g, '')] ||
    Object.entries(stemMap).find(([stem]) => {
      const normalized = stem.replace(/-/g, '')
      return normalized === providerSlug || normalized.replace(/s$/, '') === providerSlug
    })?.[1] ||
    null
  )
}

export function getSetupComponent(stemMap, providerSlug) {
  return lookupStemValue(stemMap, providerSlug)
}

export function getUsageComponent(stemMap, providerSlug) {
  return lookupStemValue(stemMap, providerSlug)
}

export function sectionMatchesSlug(tail, providerSlug) {
  if (!providerSlug) return false
  return tail === providerSlug || tail.startsWith(`${providerSlug}-`)
}
