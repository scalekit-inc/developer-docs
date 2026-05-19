const { authRequestId } = sendResponse;
const resendResponse = await scalekit.passwordless.resendPasswordlessEmail(

	authRequestId

);