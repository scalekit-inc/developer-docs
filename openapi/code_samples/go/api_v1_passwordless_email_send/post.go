templateType := scalekit.TemplateTypeSignin
response, err := scalekitClient.Passwordless().SendPasswordlessEmail(
  ctx,
  "john.doe@example.com",
  &scalekit.SendPasswordlessOptions{
    Template:         &templateType,
    ExpiresIn:        100,
    MagiclinkAuthUri: "https://yourapp.com/auth/passwordless/callback",
    TemplateVariables: map[string]string{
      "employeeID":   "EMP523",
      "teamName":     "Alpha Team",
      "supportEmail": "support@yourcompany.com",
    },
  },
)
if err != nil {
  // handle error
  return
}
authRequestId := response.AuthRequestId
