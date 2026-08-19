const res = await scalekit.tools.listTools({
  pageSize: 50,
  filter: { query: 'send message' },
})
