// Basic usage
const res = await scalekit.session.getUserSessions("user_123");

// With pagination and filtering
const res = await scalekit.session.getUserSessions("user_123", {
  pageSize: 10,
  pageToken: "next_page_token",
  filter: {
    status: ["ACTIVE"],
    startTime: new Date("2024-01-01"),
    endTime: new Date("2024-12-31")
  }
});