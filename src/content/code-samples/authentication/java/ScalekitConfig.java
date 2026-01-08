package com.example.auth;

import com.scalekit.ScalekitClient;

public class ScalekitConfig {
    private static ScalekitClient scalekitClient;

    static {
        // Initialize Scalekit client
        scalekitClient = new ScalekitClient(
            System.getenv("SCALEKIT_ENV_URL"),
            System.getenv("SCALEKIT_CLIENT_ID"),
            System.getenv("SCALEKIT_CLIENT_SECRET")
        );
    }

    public static ScalekitClient getClient() {
        return scalekitClient;
    }

    public static final String REDIRECT_URI = "http://localhost:8080/auth/callback";
}
