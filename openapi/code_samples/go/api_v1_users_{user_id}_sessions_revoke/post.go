resp, err := scalekitClient.Session().RevokeAllUserSessions(ctx, "user_123")
if err != nil { /* handle err */ }
_ = resp