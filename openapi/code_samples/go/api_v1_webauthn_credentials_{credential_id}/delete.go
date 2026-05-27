resp, err := scalekitClient.WebAuthn().DeleteCredential(ctx, "wac_123")
if err != nil { /* handle err */ }
_ = resp