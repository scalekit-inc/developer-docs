TemplateType templateType = TemplateType.SIGNIN;
Map<String, String> templateVariables = new HashMap<>();
templateVariables.put("employeeID", "EMP523");
templateVariables.put("teamName", "Alpha Team");
templateVariables.put("supportEmail", "support@yourcompany.com");

SendPasswordlessOptions options = new SendPasswordlessOptions();
options.setTemplate(templateType);
options.setExpiresIn(100);
options.setMagiclinkAuthUri("https://yourapp.com/auth/passwordless/callback");
options.setTemplateVariables(templateVariables);

SendPasswordlessResponse response = scalekitClient.passwordless().sendPasswordlessEmail(
    "john.doe@example.com",
    options
);

String authRequestId = response.getAuthRequestId();
