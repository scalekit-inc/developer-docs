const res = await scalekit.tools.listScopedTools('user@example.com', {
  filter: {
    connectionNames: ['github-connect'],
  },
  pageSize: 50,
})
