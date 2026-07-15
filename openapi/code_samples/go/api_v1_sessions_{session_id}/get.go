resp, err := scalekitClient.Session().GetSession(ctx, "ses_123456789")
if err != nil { /* handle err */ }
_ = resp