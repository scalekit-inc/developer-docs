resend_response = scalekit_client.passwordless.resend_passwordless_email(
    auth_request_id=auth_request_id,
)

# New auth request ID from resend
new_auth_request_id = resend_response[0].auth_request_id