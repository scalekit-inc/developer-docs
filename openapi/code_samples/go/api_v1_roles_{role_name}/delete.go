// Basic delete
err := scalekitClient.Role().DeleteRole(ctx, "admin")
if err != nil { /* handle err */ }

// With reassignment
err = scalekitClient.Role().DeleteRole(ctx, "admin", "member")