response = scalekit_client.passwordless.send_passwordless_email(
    email="john.doe@example.com",
    template="SIGNIN",  # or "SIGNUP", "UNSPECIFIED"
    expires_in=100,
    magiclink_auth_uri="https://yourapp.com/auth/passwordless/callback",
    template_variables={
        "employeeID": "EMP523",
        "teamName": "Alpha Team",
        "supportEmail": "support@yourcompany.com",
    },
)

# with_call returns (response, call)
auth_request_id = response[0].auth_request_id
