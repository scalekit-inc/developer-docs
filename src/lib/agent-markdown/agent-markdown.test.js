import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cleanMarkdownFragment, normalizeLines } from './markdown.ts'
import { getParsedDoc, getParsedDocs, parseMdxSource, readFrontmatterValue } from './page-parser.ts'
import {
  createSourceProvider,
  getSourceProvider,
  resolveImportSource,
  resolveTemplateExport,
  setSourceProvider,
} from './source-loader.ts'

const fixtureDir = dirname(fileURLToPath(import.meta.url))

function readFixture(name) {
  return readFileSync(join(fixtureDir, 'fixtures', name), 'utf8')
}

function readGolden(name) {
  return readFileSync(join(fixtureDir, 'fixtures', 'golden', name), 'utf8')
}

const simpleSource = readFixture('simple.mdx')
const componentsSource = readFixture('components.mdx')
const connectorSource = readFixture('connector.mdx')

const fixtureDocs = {
  '/src/content/docs/fixtures/simple.mdx': simpleSource,
  '/src/content/docs/fixtures/components.mdx': componentsSource,
  '/src/content/docs/agentkit/connectors/github.mdx': connectorSource,
}

const fixtureTemplates = {
  '/src/components/templates/agent-connectors/_setup-github.mdx': 'Set up GitHub.\n',
}

const fixtureTemplateIndex = {
  '/src/components/templates/index.ts':
    "export { default as SetupGithubSection } from './agent-connectors/_setup-github.mdx'\n",
}

setSourceProvider(
  createSourceProvider({
    docs: fixtureDocs,
    templates: fixtureTemplates,
    templateIndexModules: fixtureTemplateIndex,
  }),
)

test('normalizeLines converts CRLF to LF', () => {
  assert.equal(normalizeLines('a\r\nb\r\n'), 'a\nb\n')
})

test('injected fixtures replace the full docs tree', () => {
  const routes = getParsedDocs()
    .map((doc) => doc.route)
    .sort()
  assert.deepEqual(routes, ['agentkit/connectors/github', 'fixtures/components', 'fixtures/simple'])
})

test('parseMdxSource locks simple fixture metadata', () => {
  const parsed = parseMdxSource('/src/content/docs/fixtures/simple.mdx', simpleSource)
  assert.equal(parsed.route, 'fixtures/simple')
  assert.equal(parsed.title, 'Simple fixture')
  assert.equal(parsed.description, 'A page with no custom components')
  assert.deepEqual(parsed.imports, [])
  assert.deepEqual(parsed.componentNames, [])
})

test('parseMdxSource locks component fixture imports', () => {
  const parsed = parseMdxSource('/src/content/docs/fixtures/components.mdx', componentsSource)
  assert.equal(parsed.route, 'fixtures/components')
  assert.deepEqual(parsed.imports.map((binding) => binding.localName).sort(), [
    'Aside',
    'Steps',
    'TabItem',
    'Tabs',
  ])
  assert.deepEqual(parsed.componentNames.sort(), ['Aside', 'Steps', 'TabItem', 'Tabs'])
})

test('parseMdxSource resolves @/ imports on the connector fixture', () => {
  const parsed = getParsedDoc('agentkit/connectors/github')
  assert.ok(parsed)
  assert.equal(parsed.title, 'GitHub connector')
  assert.equal(readFrontmatterValue(parsed.frontmatter, 'connectorAuthType'), 'OAuth 2.0')
  assert.deepEqual(
    parsed.imports.map((binding) => [binding.localName, binding.resolvedSource]),
    [
      ['CheckItem', '/src/components/ui/CheckItem.astro'],
      ['SetupGithubSection', '/src/components/templates/index.ts'],
    ],
  )
})

test('resolveImportSource and template export map use the injected provider', () => {
  assert.equal(
    resolveImportSource(
      '@/components/ui/CheckItem.astro',
      '/src/content/docs/fixtures/connector.mdx',
    ),
    '/src/components/ui/CheckItem.astro',
  )
  assert.equal(
    resolveTemplateExport('SetupGithubSection'),
    '/src/components/templates/agent-connectors/_setup-github.mdx',
  )
})

test('cleanMarkdownFragment locks simple fixture output', () => {
  const parsed = parseMdxSource('/src/content/docs/fixtures/simple.mdx', simpleSource)
  assert.equal(cleanMarkdownFragment(parsed.body) + '\n', readGolden('simple.md'))
})

test('cleanMarkdownFragment locks component fixture output', () => {
  const parsed = parseMdxSource('/src/content/docs/fixtures/components.mdx', componentsSource)
  assert.equal(cleanMarkdownFragment(parsed.body) + '\n', readGolden('components.md'))
})

test('cleanMarkdownFragment locks connector fixture output', () => {
  const parsed = parseMdxSource('/src/content/docs/agentkit/connectors/github.mdx', connectorSource)
  assert.equal(cleanMarkdownFragment(parsed.body) + '\n', readGolden('connector.md'))
})

test('setSourceProvider rebuilds parsed docs from a new map', () => {
  const previous = getSourceProvider()

  setSourceProvider(
    createSourceProvider({
      docs: {
        '/src/content/docs/only.mdx': '---\ntitle: Only\ndescription: One page\n---\n\nHello.\n',
      },
    }),
  )

  try {
    const docs = getParsedDocs()
    assert.equal(docs.length, 1)
    assert.equal(docs[0].route, 'only')
    assert.equal(docs[0].title, 'Only')
  } finally {
    setSourceProvider(previous)
  }
})
