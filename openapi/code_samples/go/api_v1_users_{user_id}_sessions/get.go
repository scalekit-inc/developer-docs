// Basic usage
resp, err := scalekitClient.Session().GetUserSessions(ctx, "user_123", 0, "", nil)
if err != nil { /* handle err */ }

// With pagination and filtering
// import "time", sessionsv1 "...", "google.golang.org/protobuf/types/known/timestamppb"
startTime, _ := time.Parse(time.RFC3339, "2024-01-01T00:00:00Z")
endTime, _ := time.Parse(time.RFC3339, "2024-12-31T23:59:59Z")
filter := &sessionsv1.UserSessionFilter{
    Status:    []string{"ACTIVE"},
    StartTime: timestamppb.New(startTime),
    EndTime:   timestamppb.New(endTime),
}
resp, err := scalekitClient.Session().GetUserSessions(ctx, "user_123", 10, "next_page_token", filter)
if err != nil { /* handle err */ }