// Verify with OTP code
verifyResponse, err := scalekitClient.Passwordless().VerifyPasswordlessEmail(
    ctx,
    &scalekit.VerifyPasswordlessOptions{
        Code:          "123456", // OTP code
        AuthRequestId: authRequestId,
    },
)

if err != nil {
    // Handle error
    return
}

// Verify with magic link token
verifyResponse, err := scalekitClient.Passwordless().VerifyPasswordlessEmail(
    ctx,
    &scalekit.VerifyPasswordlessOptions{
        LinkToken: linkToken, // Magic link token
    },
)

if err != nil {
    // Handle error
    return
}

// User verified successfully
userEmail := verifyResponse.Email