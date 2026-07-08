TemplateType templateType = TemplateType.SIGNIN;
Map<String, String> templateVariables = new HashMap<>();
templateVariables.put("employeeID", "EMP523");
templateVariables.put("teamName", "Alpha Team");
templateVariables.put("supportEmail", "support@yourcompany.com");

SendPasswordlessOptions options = new SendPasswordlessOptions();
options.setTemplate(templateType);
options.setExpiresIn(100);
options.setMagiclinkAuthUri("https://www.example.com");
options.setTemplateVariables(templateVariables);

SendPasswordlessResponse response = passwordlessClient.sendPasswordlessEmail(
    "john.doe@example.com",
    options
);

String authRequestId = response.getAuthRequestId();