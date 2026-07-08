// Basic usage
UserSessionDetails res = scalekitClient.sessions().getUserSessions("user_123", null, null, null);

// With pagination and filtering
// import UserSessionFilter, Timestamp, Instant
UserSessionFilter filter = UserSessionFilter.newBuilder()
    .addStatus("ACTIVE")
    .setStartTime(Timestamp.newBuilder().setSeconds(Instant.parse("2024-01-01T00:00:00Z").getEpochSecond()).build())
    .setEndTime(Timestamp.newBuilder().setSeconds(Instant.parse("2024-12-31T23:59:59Z").getEpochSecond()).build())
    .build();
UserSessionDetails res = scalekitClient.sessions().getUserSessions("user_123", 10, "next_page_token", filter);