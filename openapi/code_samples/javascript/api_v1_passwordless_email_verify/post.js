const { authRequestId } = sendResponse
const verifyResponse = await scalekit.passwordless.verifyPasswordlessEmail(
  // Verification Code (OTP)

  { code: '123456' },

  // Magic Link Token

  { linkToken: link_token },

  authRequestId,
)
