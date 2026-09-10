from scalekit.v1.tools.tools_pb2 import TOOL_READINESS_STATE_READY

response = scalekit_client.tools.search_tools(
    query="send a message to a slack channel",
    identifier="user@example.com",
    top_k=10,
)

for tool in response[0].tools:
    print(tool.name, tool.score)
    for connection in tool.connections:
        # readiness_state is an int at runtime -- always compare against the
        # named enum constant, never a raw int or a string.
        is_ready = connection.readiness_state == TOOL_READINESS_STATE_READY
        print(" ", connection.connection_name, is_ready, connection.connected_account_id)
