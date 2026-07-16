// Verify with OTP code
VerifyPasswordlessOptions verifyOptions = new VerifyPasswordlessOptions();
verifyOptions.setCode("123456"); // OTP code
verifyOptions.setAuthRequestId(authRequestId);

VerifyPasswordLessResponse verifyResponse = scalekitClient.passwordless()
    .verifyPasswordlessEmail(verifyOptions);

// User verified successfully
String userEmail = verifyResponse.getEmail();

// Verify with magic link token
VerifyPasswordlessOptions linkVerifyOptions = new VerifyPasswordlessOptions();
linkVerifyOptions.setLinkToken(linkToken); // Magic link token

VerifyPasswordLessResponse linkVerifyResponse = scalekitClient.passwordless()
    .verifyPasswordlessEmail(linkVerifyOptions);

String verifiedEmail = linkVerifyResponse.getEmail();
