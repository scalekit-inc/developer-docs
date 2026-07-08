// Basic delete
scalekitClient.roles().deleteRole("admin");

// With reassignment
scalekitClient.roles().deleteRole("admin", "member");