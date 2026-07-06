// Verify with OTP code
VerifyPasswordlessOptions verifyOptions = new VerifyPasswordlessOptions();
verifyOptions.setCode("123456"); // OTP code
verifyOptions.setAuthRequestId(authRequestId);

VerifyPasswordLessResponse verifyResponse = passwordlessClient.verifyPasswordlessEmail(verifyOptions);

// User verified successfully
String userEmail = verifyResponse.getEmail();

// Verify with magic link token
VerifyPasswordlessOptions verifyOptions = new VerifyPasswordlessOptions();
verifyOptions.setLinkToken(linkToken); // Magic link token

VerifyPasswordLessResponse verifyResponse = passwordlessClient.verifyPasswordlessEmail(verifyOptions);

// User verified successfully
String userEmail = verifyResponse.getEmail();