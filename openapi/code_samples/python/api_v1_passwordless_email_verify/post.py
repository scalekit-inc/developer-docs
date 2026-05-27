# Verify with OTP code
verify_response = scalekit_client.passwordless.verify_passwordless_email(
    code="123456",  # OTP code received via email
    auth_request_id=auth_request_id,
)

# Verify with magic link token
verify_response = scalekit_client.passwordless.verify_passwordless_email(
    link_token=link_token,  # Magic link token from URL
)

# User verified successfully
user_email = verify_response[0].email