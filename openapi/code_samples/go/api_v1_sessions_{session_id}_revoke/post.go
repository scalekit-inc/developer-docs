resp, err := scalekitClient.Session().RevokeSession(ctx, "ses_123456789")
if err != nil { /* handle err */ }
_ = resp