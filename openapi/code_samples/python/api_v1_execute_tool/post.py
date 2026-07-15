response = scalekit_client.tools.execute_tool(
    tool_name="gmail_send_email",
    identifier="user@example.com",
    params={
        "to": "team@example.com",
        "subject": "Hello from Scalekit",
        "body": "Tool execution succeeded.",
    },
)
