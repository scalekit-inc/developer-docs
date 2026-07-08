resendResponse, err := scalekitClient.Passwordless().ResendPasswordlessEmail(
    ctx,
    authRequestId,
)

if err != nil {
    // Handle error
    return
}