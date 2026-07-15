resp, err := scalekitClient.WebAuthn().UpdateCredential(
    ctx,
    "wac_123",
    "Work Laptop Passkey",
)
if err != nil { /* handle err */ }
_ = resp