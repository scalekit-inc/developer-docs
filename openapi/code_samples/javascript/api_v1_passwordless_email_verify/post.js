const { authRequestId } = sendResponse

// Verify with OTP code
const verifyResponse = await scalekit.passwordless.verifyPasswordlessEmail(
  { code: '123456' },
  authRequestId,
)

// Or verify with magic link token
const linkVerifyResponse = await scalekit.passwordless.verifyPasswordlessEmail({
  linkToken: linkToken,
})
