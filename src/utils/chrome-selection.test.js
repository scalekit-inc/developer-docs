import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {
  getActiveProduct,
  getActiveSecondaryNavId,
  isCurrentPage,
  isSelfHostedPath,
  buildPathToSidebarMap,
  matchCurrentByHrefPrefix,
} from './chrome-selection.js'

const here = dirname(fileURLToPath(import.meta.url))

/** Live sidebarToSecondaryNav entries that the SSR table uses today. */
const liveTable = {
  authenticate: {
    default: 'saaskit-user-management',
    pathOverrides: {
      '/authenticate/mcp': 'saaskit-mcp-auth',
      '/authenticate/sso': 'saaskit-sso',
      '/directory/scim': 'saaskit-scim',
      '/authenticate/fsa': 'saaskit-user-management',
    },
  },
  connect: {
    default: 'agentkit-quickstart',
    pathOverrides: {
      '/agentkit/connectors': 'agentkit-connectors',
      '/agentkit/sdks': 'agentkit-sdks',
      '/agentkit/apis': 'agentkit-api-reference',
    },
  },
  'self-hosted': 'enterprise-deployment',
  'dev-kit': {
    default: 'build-with-ai',
    pathOverrides: {
      '/dev-kit/tools': 'testing-utilities',
      '/dev-kit/build-with-ai': 'build-with-ai',
      '/dev-kit/sdks': 'dev-tools',
    },
  },
  resources: {
    default: 'integrations',
    pathOverrides: {
      '/resources/code-samples': 'code-samples',
      '/guides/integrations': 'integrations',
      '/authenticate/implement-workflows': 'workflows',
      '/authenticate/interceptors': 'workflows',
      '/reference/interceptors': 'workflows',
      '/cookbooks': 'cookbooks',
    },
  },
  'agentkit-guides': 'agentkit-guides',
  'saaskit-guides': 'saaskit-guides',
}

/**
 * Sidebar items as they exist today for the disagreement paths.
 * cookbooks and browse are intentionally absent — they are only in
 * the starlight `topics` globs, which SSR tab selection does not read.
 */
const liveSidebar = [
  {
    id: 'authenticate',
    link: '/authenticate/fsa/quickstart/',
    items: ['authenticate/fsa/quickstart'],
  },
  {
    id: 'connect',
    link: '/agentkit/quickstart',
    items: ['agentkit/quickstart'],
  },
  {
    id: 'self-hosted',
    link: '/self-hosted/overview/',
    items: ['self-hosted/overview'],
  },
  {
    id: 'dev-kit',
    link: '/dev-kit/build-with-ai/',
    items: [
      'dev-kit/build-with-ai',
      'dev-kit/tools/scalekit-dryrun',
      'dev-kit/tools/sso-simulator',
    ],
  },
  {
    id: 'resources',
    link: '/guides/integrations',
    items: [
      'authenticate/implement-workflows/implement-webhooks',
      'guides/webhooks-best-practices',
      'authenticate/interceptors/auth-flow-interceptors',
      'reference/interceptors/triggers',
    ],
  },
  {
    id: 'agentkit-guides',
    link: '/agentkit/cookbooks/',
    items: [
      'how-to/environments',
      { autogenerate: { directory: 'agentkit/how-to' } },
      { autogenerate: { directory: 'how-to' } },
      { autogenerate: { directory: 'agentkit/cookbooks' } },
    ],
  },
  {
    id: 'saaskit-guides',
    link: '/saaskit/cookbooks/',
    items: [
      'how-to/environments',
      { autogenerate: { directory: 'how-to' } },
      { autogenerate: { directory: 'saaskit/cookbooks' } },
    ],
  },
]

const liveMap = buildPathToSidebarMap(liveSidebar)

function ssrTab(pathname, entry) {
  return getActiveSecondaryNavId(pathname, entry, undefined, liveMap, liveTable)
}

test('getActiveProduct: ?product= wins over path and topic', () => {
  const saas = new URLSearchParams('product=saaskit')
  const agent = new URLSearchParams('product=agentkit')
  const junk = new URLSearchParams('product=nope')

  assert.equal(getActiveProduct('/agentkit/quickstart/', undefined, saas), 'saaskit')
  assert.equal(getActiveProduct('/authenticate/fsa/quickstart/', undefined, agent), 'agentkit')
  assert.equal(getActiveProduct('/self-hosted/overview/', undefined, saas), 'saaskit')
  assert.equal(getActiveProduct('/guides/foo', 'connect', saas), 'saaskit')
  assert.equal(getActiveProduct('/agentkit/quickstart/', undefined, junk), 'agentkit')
})

test('getActiveProduct: topic connect and /agentkit/ are AgentKit', () => {
  assert.equal(getActiveProduct('/guides/foo', 'connect'), 'agentkit')
  assert.equal(getActiveProduct('/agentkit/quickstart/'), 'agentkit')
  assert.equal(getActiveProduct('/agentkit/connectors/github/'), 'agentkit')
})

test('getActiveProduct: self-hosted cold default is AgentKit', () => {
  assert.equal(isSelfHostedPath('/self-hosted/overview/'), true)
  assert.equal(isSelfHostedPath('/self-hosted'), false)
  assert.equal(getActiveProduct('/self-hosted/overview/'), 'agentkit')
  assert.equal(getActiveProduct('/self-hosted/quickstart/'), 'agentkit')
})

test('getActiveProduct: shared how-to cold default is SaaS', () => {
  const agent = new URLSearchParams('product=agentkit')
  assert.equal(getActiveProduct('/how-to/'), 'saaskit')
  assert.equal(getActiveProduct('/how-to/environments/'), 'saaskit')
  assert.equal(getActiveProduct('/how-to/environments/', undefined, agent), 'agentkit')
  assert.equal(getActiveProduct('/how-to/environments/', 'agentkit-guides'), 'agentkit')
  assert.equal(getActiveProduct('/how-to/environments/', 'saaskit-guides'), 'saaskit')
})

test('getActiveProduct: everything else is saaskit, including cookbooks', () => {
  assert.equal(getActiveProduct('/'), 'saaskit')
  assert.equal(getActiveProduct('/cookbooks/'), 'saaskit')
  assert.equal(getActiveProduct('/cookbooks/mastra-agentkit/'), 'saaskit')
  assert.equal(getActiveProduct('/browse/code-samples/github/nodejs-sdk/'), 'saaskit')
  assert.equal(getActiveProduct('/authenticate/fsa/quickstart/'), 'saaskit')
})

test('live sidebar items still omit cookbooks and browse', () => {
  const src = readFileSync(join(here, '../configs/sidebar.config.ts'), 'utf8')
  const start = src.indexOf('export const sidebar =')
  const end = src.indexOf('export const exclude')
  assert.ok(start >= 0, 'sidebar.config.ts must declare "export const sidebar ="')
  assert.ok(end > start, 'sidebar.config.ts must declare "export const exclude" after the sidebar')
  const sidebarBlock = src.slice(start, end)
  assert.ok(sidebarBlock.length > 0, 'sidebar block must not be empty')

  assert.equal(
    /['"]cookbooks(?:\/[^'"]*)?['"]/.test(sidebarBlock),
    false,
    'cookbooks must stay out of sidebar items so SSR tab stays null',
  )
  assert.equal(
    /['"]browse(?:\/[^'"]*)?['"]/.test(sidebarBlock),
    false,
    'browse must stay out of sidebar items so SSR tab stays null',
  )
})

test('SSR tab: cookbooks is null (not a unified cookbooks tab)', () => {
  assert.equal(ssrTab('/cookbooks/'), null)
  assert.equal(ssrTab('/cookbooks'), null)
  assert.equal(ssrTab('/cookbooks/mastra-agentkit/'), null)
  assert.equal(ssrTab('/cookbooks/mastra-agentkit'), null)
  // Empty map (no binder) is the same result
  assert.equal(getActiveSecondaryNavId('/cookbooks/'), null)
})

test('SSR tab: browse is null', () => {
  assert.equal(ssrTab('/browse/'), null)
  assert.equal(ssrTab('/browse/code-samples/github/nodejs-sdk/'), null)
})

test('SSR tab: interceptors highlight workflows via the resources sidebar', () => {
  assert.equal(ssrTab('/authenticate/interceptors/auth-flow-interceptors'), 'workflows')
  assert.equal(ssrTab('/reference/interceptors/triggers'), 'workflows')
})

test('SSR tab: tools highlight testing-utilities via the dev-kit sidebar', () => {
  assert.equal(ssrTab('/dev-kit/tools/scalekit-dryrun'), 'testing-utilities')
  assert.equal(ssrTab('/dev-kit/tools/sso-simulator'), 'testing-utilities')
})

test('SSR tab: webhooks implement-webhooks is workflows; best-practices is integrations default', () => {
  assert.equal(ssrTab('/authenticate/implement-workflows/implement-webhooks'), 'workflows')
  // Listed in resources items but no pathOverride — today's default, not a webhooks tab
  assert.equal(ssrTab('/guides/webhooks-best-practices'), 'integrations')
})

test('SSR tab: known product and home fallbacks', () => {
  assert.equal(ssrTab('/home/saaskit/'), 'saaskit-user-management')
  assert.equal(ssrTab('/home/saaskit'), 'saaskit-user-management')
  assert.equal(ssrTab('/authenticate/fsa/quickstart/'), 'saaskit-user-management')
  assert.equal(ssrTab('/agentkit/quickstart/'), 'agentkit-quickstart')
  assert.equal(ssrTab('/self-hosted/overview/'), 'enterprise-deployment')
  assert.equal(ssrTab('/agentkit/apis'), 'agentkit-api-reference')
  assert.equal(ssrTab('/saaskit/apis'), 'saaskit-apis')
  assert.equal(ssrTab('/apis'), 'saaskit-apis')
  assert.equal(ssrTab('/sdks'), 'saaskit-sdks')
  assert.equal(ssrTab('/sdks/expo'), 'saaskit-sdks')
  assert.equal(ssrTab('/agentkit/sdks'), 'agentkit-sdks')
  assert.equal(ssrTab('/agentkit/not-in-map'), 'agentkit-quickstart')
})

test('SSR tab: shared how-to follows product, not the first sidebar that lists /how-to', () => {
  assert.equal(ssrTab('/how-to/'), 'saaskit-guides')
  assert.equal(ssrTab('/how-to/environments/'), 'saaskit-guides')
  assert.equal(
    ssrTab('/how-to/environments/', { data: { topic: 'agentkit-guides' } }),
    'agentkit-guides',
  )
  assert.equal(
    getActiveSecondaryNavId(
      '/how-to/environments/',
      undefined,
      new URLSearchParams('product=agentkit'),
      liveMap,
      liveTable,
    ),
    'agentkit-guides',
  )
})

test('SSR tab: frontmatter topic uses the mapping table before the path map', () => {
  assert.equal(ssrTab('/anything', { data: { topic: 'self-hosted' } }), 'enterprise-deployment')
  assert.equal(
    ssrTab('/authenticate/mcp/quickstart', { data: { topic: 'authenticate' } }),
    'saaskit-mcp-auth',
  )
})

test('isCurrentPage: cookbooks item is not current on /cookbooks (SSR)', () => {
  const cookbooksItem = { id: 'cookbooks', href: '/cookbooks/', label: 'Cookbooks' }
  const parent = {
    id: 'developer-resources',
    href: '#developer-resources',
    label: 'Developer Resources',
    children: [cookbooksItem],
  }

  assert.equal(
    isCurrentPage('/cookbooks/', cookbooksItem, undefined, undefined, liveMap, liveTable),
    false,
  )
  assert.equal(
    isCurrentPage('/cookbooks/', parent, undefined, undefined, liveMap, liveTable),
    false,
  )
})

test('isCurrentPage: dropdown parent is current when a child id matches', () => {
  const workflows = {
    id: 'workflows',
    href: '/authenticate/implement-workflows/implement-webhooks/',
    label: 'Workflows',
  }
  const parent = {
    id: 'developer-resources',
    href: '#developer-resources',
    label: 'Developer Resources',
    children: [workflows],
  }

  assert.equal(
    isCurrentPage(
      '/authenticate/implement-workflows/implement-webhooks',
      workflows,
      undefined,
      undefined,
      liveMap,
      liveTable,
    ),
    true,
  )
  assert.equal(
    isCurrentPage(
      '/authenticate/implement-workflows/implement-webhooks',
      parent,
      undefined,
      undefined,
      liveMap,
      liveTable,
    ),
    true,
  )
})

test('isCurrentPage: href "#" is never current on its own', () => {
  const trigger = { id: 'saaskit-user-management', href: '#', label: 'Trigger' }
  assert.equal(
    isCurrentPage(
      '/authenticate/fsa/quickstart/',
      trigger,
      undefined,
      undefined,
      liveMap,
      liveTable,
    ),
    false,
  )
})

test('client rematch: cookbooks href prefix is current (SSR stays null)', () => {
  const items = [
    { id: 'cookbooks', href: '/cookbooks/' },
    { id: 'workflows', href: '/authenticate/implement-workflows/implement-webhooks/' },
    { id: 'integrations', href: '/guides/integrations/social-connections/' },
  ]

  assert.equal(matchCurrentByHrefPrefix('/cookbooks/', items)?.id, 'cookbooks')
  assert.equal(matchCurrentByHrefPrefix('/cookbooks/mastra-agentkit/', items)?.id, 'cookbooks')
  // SSR disagreement: interceptors do not prefix-match the workflows href
  assert.equal(
    matchCurrentByHrefPrefix('/authenticate/interceptors/auth-flow-interceptors', items),
    null,
  )
  // SSR disagreement: webhook best-practices do not prefix-match integrations
  assert.equal(matchCurrentByHrefPrefix('/guides/webhooks-best-practices', items), null)
  // SSR disagreement: sso-simulator does not prefix-match dryrun
  assert.equal(
    matchCurrentByHrefPrefix('/dev-kit/tools/sso-simulator', [
      { id: 'testing-utilities', href: '/dev-kit/tools/scalekit-dryrun/' },
    ]),
    null,
  )
})

test('client rematch: longer href prefix wins', () => {
  const items = [
    { id: 'short', href: '/dev-kit/' },
    { id: 'long', href: '/dev-kit/tools/scalekit-dryrun/' },
  ]
  assert.equal(matchCurrentByHrefPrefix('/dev-kit/tools/scalekit-dryrun/', items)?.id, 'long')
})

/** Ticket 01: Keep building rail contract. Reads the live sidebar source. */
function keepBuildingRail(src, id) {
  const marker = `id: '${id}'`
  const idAt = src.indexOf(marker)
  assert.ok(idAt >= 0, `sidebar must declare ${id}`)
  const start = src.lastIndexOf('\n  {', idAt)
  assert.ok(start >= 0, `${id} must sit in a sidebar object`)
  const itemsAt = src.indexOf('items: [', idAt)
  assert.ok(itemsAt > idAt, `${id} must declare items`)
  let depth = 0
  let end = itemsAt
  for (; end < src.length; end++) {
    if (src[end] === '[') depth++
    else if (src[end] === ']') {
      depth--
      if (depth === 0) {
        end++
        break
      }
    }
  }
  return src.slice(start, end)
}

test('Keep building rail: How-to then Recipes on both products', () => {
  const src = readFileSync(join(here, '../configs/sidebar.config.ts'), 'utf8')

  for (const id of ['agentkit-guides', 'saaskit-guides']) {
    const rail = keepBuildingRail(src, id)
    const groupLabels = [...rail.matchAll(/label: '([^']+)'/g)].map((match) => match[1])
    assert.deepEqual(
      groupLabels.slice(0, 3),
      ['Keep building', 'How-to', 'Recipes'],
      `${id} rail must be Keep building, then How-to, then Recipes`,
    )
  }
})

test('Keep building rail: environments is first; delete-your-account is off the rail', () => {
  const src = readFileSync(join(here, '../configs/sidebar.config.ts'), 'utf8')
  const docsRoot = join(here, '../content/docs')

  for (const id of ['agentkit-guides', 'saaskit-guides']) {
    const rail = keepBuildingRail(src, id)
    const howToAt = rail.indexOf("label: 'How-to'")
    const recipesAt = rail.indexOf("label: 'Recipes'")
    const howToBlock = rail.slice(howToAt, recipesAt)
    assert.match(
      howToBlock,
      /['"]how-to\/environments['"]/,
      `${id} must list environments first as an explicit how-to`,
    )
    assert.ok(
      howToBlock.indexOf("'how-to/environments'") < howToBlock.indexOf('autogenerate'),
      `${id} must put environments before the autogenerated how-tos`,
    )
    assert.equal(
      howToBlock.includes('delete-your-account'),
      false,
      `${id} must not list delete-your-account`,
    )
  }

  const agentHowTo = keepBuildingRail(src, 'agentkit-guides')
  assert.match(agentHowTo, /directory: 'agentkit\/how-to'/, 'AgentKit keeps its own how-tos')

  const saasHowTo = keepBuildingRail(src, 'saaskit-guides')
  assert.equal(
    saasHowTo.includes('agentkit/how-to'),
    false,
    'SaaSKit must not list AgentKit-only how-tos',
  )

  const deletePage = readFileSync(join(docsRoot, 'how-to/delete-your-account.mdx'), 'utf8')
  assert.match(
    deletePage,
    /hidden:\s*true/,
    'delete-your-account stays on its URL but is hidden from the rail',
  )
  assert.match(deletePage, /^title:/m, 'delete-your-account page still exists')

  const environmentsPage = readFileSync(join(docsRoot, 'how-to/environments.mdx'), 'utf8')
  assert.match(
    environmentsPage,
    /hidden:\s*true/,
    'environments is listed first by hand, so autogenerate must hide the duplicate',
  )
})

test('Keep building recipes nest by job type', () => {
  const src = readFileSync(join(here, '../configs/sidebar.config.ts'), 'utf8')

  const agentRecipes = keepBuildingRail(src, 'agentkit-guides').split("label: 'Recipes'")[1]
  for (const label of ['Triage email', 'Add voice', 'Call tools', 'Connect a user']) {
    assert.match(agentRecipes, new RegExp(`label: '${label}'`), `AgentKit recipes nest ${label}`)
  }
  assert.match(agentRecipes, /collapsed: true/, 'AgentKit recipe clusters start collapsed')

  const saasRecipes = keepBuildingRail(src, 'saaskit-guides').split("label: 'Recipes'")[1]
  assert.match(saasRecipes, /label: 'Add sign-in'/, 'SaaSKit recipes nest Add sign-in')
  assert.match(saasRecipes, /label: 'Verify tokens'/, 'SaaSKit recipes nest Verify tokens')
  assert.match(saasRecipes, /collapsed: true/, 'SaaSKit recipe clusters start collapsed')
})

/** Ticket 02: Keep building tab opens the product hub. */
const keepBuildingTabs = [
  {
    product: 'agentkit',
    id: 'agentkit-guides',
    hub: '/agentkit/cookbooks/',
    recipe: '/agentkit/cookbooks/set-up-agentkit-with-your-coding-agent/',
    howTo: '/how-to/environments/',
    firstSuccess: 'agentkit/quickstart.mdx',
  },
  {
    product: 'saaskit',
    id: 'saaskit-guides',
    hub: '/saaskit/cookbooks/',
    recipe: '/saaskit/cookbooks/add-hosted-auth-nextjs-app-router/',
    howTo: '/how-to/environments/',
    firstSuccess: 'authenticate/fsa/quickstart.mdx',
  },
]

test('Keep building tab href is the product hub on desktop and mobile', () => {
  const navSrc = readFileSync(join(here, '../configs/secondary-nav.config.ts'), 'utf8')
  const sidebarSrc = readFileSync(join(here, '../configs/sidebar.config.ts'), 'utf8')

  for (const tab of keepBuildingTabs) {
    const navBlock = navSrc.slice(navSrc.indexOf(`id: '${tab.id}'`))
    const navHref = navBlock.match(/href: '([^']+)'/)?.[1]
    assert.equal(navHref, tab.hub, `${tab.id} secondary-nav href must be the hub`)

    const rail = keepBuildingRail(sidebarSrc, tab.id)
    const sidebarLink = rail.match(/link: '([^']+)'/)?.[1]
    assert.equal(sidebarLink, tab.hub, `${tab.id} sidebar link is the mobile topic href`)
    assert.equal(navHref, sidebarLink, `${tab.id} mobile and desktop must share the hub href`)
  }
})

test('Keep building tab lights on the hub, a how-to, and a recipe', () => {
  for (const tab of keepBuildingTabs) {
    assert.equal(ssrTab(tab.hub), tab.id, `${tab.hub} must light Keep building`)
    assert.equal(ssrTab(tab.recipe), tab.id, `${tab.recipe} must light Keep building`)
    assert.equal(
      getActiveSecondaryNavId(
        tab.howTo,
        { data: { topic: tab.id } },
        undefined,
        liveMap,
        liveTable,
      ),
      tab.id,
      `${tab.howTo} with ${tab.id} topic must light Keep building`,
    )
  }

  assert.equal(
    ssrTab('/how-to/environments/'),
    'saaskit-guides',
    'how-to cold default stays SaaSKit',
  )
})

test('client rematch: Keep building hub href lights the hub and recipes', () => {
  const items = keepBuildingTabs.map((tab) => ({ id: tab.id, href: tab.hub }))

  for (const tab of keepBuildingTabs) {
    assert.equal(matchCurrentByHrefPrefix(tab.hub, items)?.id, tab.id)
    assert.equal(matchCurrentByHrefPrefix(tab.recipe, items)?.id, tab.id)
  }
})

test('product cookbook index URLs are hubs, not first-recipe redirects', () => {
  const src = readFileSync(join(here, '../configs/redirects.config.ts'), 'utf8')
  const docsRoot = join(here, '../content/docs')

  for (const tab of keepBuildingTabs) {
    const bare = tab.hub.replace(/\/$/, '')
    assert.equal(
      new RegExp(`['"]${bare}/?['"]\\s*:`).test(src),
      false,
      `${bare} must not redirect to a recipe`,
    )

    const hubPage = readFileSync(join(docsRoot, `${tab.product}/cookbooks/index.mdx`), 'utf8')
    assert.match(hubPage, /hidden:\s*true/, `${tab.product} hub stays off the Recipes rail`)
    assert.match(hubPage, /how-to\/environments/, `${tab.product} hub names environments`)
    const visible = hubPage.replace(/^---[\s\S]*?---/, '').replace(/href="[^"]+"/g, '')
    assert.equal(
      /\bcookbooks?\b/i.test(visible),
      false,
      `${tab.product} hub copy must not say Cookbooks`,
    )
  }
})

/** Ticket 03: First success sends to the hub. */
function frontmatterNext(src) {
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const block = fm.match(/^next:\n((?:[ \t]+.+\n?)+)/m)?.[1] ?? ''
  return {
    label: block.match(/label:\s*['"]([^'"]+)['"]/)?.[1],
    link: block.match(/link:\s*['"]([^'"]+)['"]/)?.[1],
  }
}

test('first-success pages send Next to the product Keep building hub', () => {
  const docsRoot = join(here, '../content/docs')

  for (const tab of keepBuildingTabs) {
    const next = frontmatterNext(readFileSync(join(docsRoot, tab.firstSuccess), 'utf8'))
    assert.equal(next.link, tab.hub, `${tab.firstSuccess} Next must open the ${tab.product} hub`)
    assert.equal(next.label, 'Keep building', `${tab.firstSuccess} Next label is Keep building`)
  }
})

test('cross-product cookbooks page points at the two product hubs', () => {
  const src = readFileSync(join(here, '../content/docs/cookbooks.mdx'), 'utf8')

  for (const tab of keepBuildingTabs) {
    assert.match(
      src,
      new RegExp(`href="${tab.hub}"`),
      `${tab.product} card must open the ${tab.product} hub`,
    )
    assert.equal(
      src.includes(tab.recipe),
      false,
      `cross-product page must not send ${tab.product} readers to the first recipe`,
    )
  }
})

test('old per-slug cookbook URLs still resolve to the same recipes', () => {
  const src = readFileSync(join(here, '../configs/redirects.config.ts'), 'utf8')
  const slugs = [
    ['/cookbooks/mastra-agentkit', '/agentkit/cookbooks/mastra-agentkit/'],
    ['/cookbooks/daily-briefing-agent', '/agentkit/cookbooks/daily-briefing-agent/'],
    [
      '/cookbooks/add-hosted-auth-nextjs-app-router',
      '/saaskit/cookbooks/add-hosted-auth-nextjs-app-router/',
    ],
    [
      '/cookbooks/migrate-from-auth0-to-scalekit',
      '/saaskit/cookbooks/migrate-from-auth0-to-scalekit/',
    ],
  ]

  for (const [from, to] of slugs) {
    assert.match(
      src,
      new RegExp(`['"]${from}['"]\\s*:\\s*['"]${to}['"]`),
      `${from} must still open ${to}`,
    )
  }
})
