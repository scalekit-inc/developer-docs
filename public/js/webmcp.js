;(function () {
  'use strict'

  if (!navigator.modelContext) return

  var ac = new AbortController()
  var signal = ac.signal

  // Search documentation using Pagefind
  navigator.modelContext.registerTool(
    {
      name: 'search_docs',
      description:
        'Search the Scalekit documentation. Returns matching pages with titles, excerpts, and URLs.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search query' },
          limit: { type: 'number', description: 'Max results to return (default 5)' },
        },
        required: ['query'],
      },
      execute: async function (input) {
        var pagefind = await import('/pagefind/pagefind.js')
        await pagefind.init()
        var results = await pagefind.search(input.query)
        var limit = input.limit || 5
        var data = await Promise.all(
          results.results.slice(0, limit).map(function (r) {
            return r.data()
          }),
        )
        return data.map(function (d) {
          return { title: d.meta.title, url: d.url, excerpt: d.excerpt }
        })
      },
    },
    { signal: signal },
  )

  // Get current page content as Markdown
  navigator.modelContext.registerTool(
    {
      name: 'get_page_markdown',
      description:
        'Get the content of a documentation page as Markdown. Defaults to the current page if no URL is provided.',
      inputSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Absolute or relative URL of the page (defaults to current page)',
          },
        },
      },
      execute: async function (input) {
        var target = input.url || window.location.href
        var res = await fetch(target, { headers: { Accept: 'text/markdown' } })
        if (!res.ok) throw new Error('Failed to fetch page: ' + res.status)
        return await res.text()
      },
    },
    { signal: signal },
  )

  // Navigate to a docs page
  navigator.modelContext.registerTool(
    {
      name: 'navigate_to',
      description: 'Navigate the browser to a Scalekit documentation page.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Relative path (e.g. /authenticate/mcp/quickstart/)',
          },
        },
        required: ['path'],
      },
      execute: function (input) {
        window.location.href = input.path
        return { navigating: true, path: input.path }
      },
    },
    { signal: signal },
  )

  window.addEventListener('unload', function () {
    ac.abort()
  })
})()
