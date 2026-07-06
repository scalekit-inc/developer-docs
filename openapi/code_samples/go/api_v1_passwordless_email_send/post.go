templateType := scalekit.TemplateTypeSignin
response, err := scalekitClient.Passwordless().SendPasswordlessEmail(
    ctx,
    "john.doe@example.com",
    &scalekit.SendPasswordlessOptions{
        Template:         &templateType,
        ExpiresIn:        100,
        MagiclinkAuthUri: "https://www.google.com",
        TemplateVariables: map[string]string{
            "employeeID":    "EMP523",
            "teamName":      "Alpha Team",
            "supportEmail":  "support@yourcompany.com",
        },
    },
)

if err != nil {
    // Handle error
    return
}

authRequestId := response.AuthRequestId