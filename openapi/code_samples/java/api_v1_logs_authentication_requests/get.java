// List authentication request logs (most recent first)
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(System.getenv("SCALEKIT_ENVIRONMENT_URL")
        + "/api/v1/logs/authentication/requests?page_size=10&status=SUCCESS"))
    .header("Authorization", "Bearer " + accessToken)
    .GET()
    .build();

HttpResponse<String> response = HttpClient.newHttpClient()
    .send(request, HttpResponse.BodyHandlers.ofString());
// response.body() contains authRequests, next_page_token, total_size
