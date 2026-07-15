const response = await scalekit.tools.executeTool({
  toolName: 'gmail_send_email',
  identifier: 'user@example.com',
  params: {
    to: 'team@example.com',
    subject: 'Hello from Scalekit',
    body: 'Tool execution succeeded.',
  },
})
