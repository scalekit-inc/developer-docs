import { ToolReadinessState } from '@scalekit-sdk/node'

const res = await scalekit.tools.searchTools('send a message to a slack channel', {
  identifier: 'user@example.com',
  topK: 10,
})

for (const tool of res.tools) {
  console.log(tool.name, tool.score)
  for (const connection of tool.connections) {
    // readinessState is a number at runtime -- always compare against the
    // named enum constant, never a raw number or a string.
    const isReady = connection.readinessState === ToolReadinessState.READY
    console.log(' ', connection.connectionName, isReady, connection.connectedAccountId)
  }
}
