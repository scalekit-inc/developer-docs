const response = await scalekit.passwordless.sendPasswordlessEmail(
	"john.doe@example.com",
	{
		template: "SIGNIN",
		expiresIn: 100,
		magiclinkAuthUri: "https://www.google.com",
		templateVariables: {
			employeeID: "EMP523",
			teamName: "Alpha Team",
			supportEmail: "support@yourcompany.com",
		},
	}
);