GetUserResponse resp = scalekitClient.users().getUser("usr_123456");
User user = resp.getUser();