await scalekit.user.updateUser("usr_123", {
	userProfile: {
		firstName: "John",
		lastName: "Smith",
	},
	metadata: {
		department: "sales",
	},
});