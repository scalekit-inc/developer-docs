resp, err := scalekitClient.WebAuthn().ListCredentials(ctx, "user_123")
if err != nil { /* handle err */ }
_ = resp