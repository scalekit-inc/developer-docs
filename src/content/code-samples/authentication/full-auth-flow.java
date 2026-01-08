package com.example.auth;

import com.scalekit.ScalekitClient;
import com.scalekit.models.AuthorizationUrlOptions;
import com.scalekit.models.AuthenticationResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@SpringBootApplication
@RestController
public class AuthApplication {

    // Initialize Scalekit client
    private final ScalekitClient scalekitClient;

    public AuthApplication() {
        this.scalekitClient = new ScalekitClient(
            System.getenv("SCALEKIT_ENV_URL"),
            System.getenv("SCALEKIT_CLIENT_ID"),
            System.getenv("SCALEKIT_CLIENT_SECRET")
        );
    }

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }

    // Step 1: Generate authorization URL
    @GetMapping("/auth/login")
    public String login(@RequestParam String organizationId) {
        AuthorizationUrlOptions options = new AuthorizationUrlOptions()
            .organizationId(organizationId)
            .state("random-state-string"); // Use a secure random string

        String authorizationUrl = scalekitClient.getAuthorizationUrl(
            "http://localhost:8080/auth/callback",
            options
        );

        return "redirect:" + authorizationUrl;
    }

    // Step 2: Handle OAuth callback
    @GetMapping("/auth/callback")
    public String callback(
        @RequestParam String code,
        @RequestParam String state,
        HttpSession session
    ) {
        try {
            // Exchange authorization code for tokens
            AuthenticationResponse result = scalekitClient.authenticateWithCode(
                code,
                "http://localhost:8080/auth/callback"
            );

            // Access user information
            var user = result.getUser();
            var idTokenClaims = result.getIdTokenClaims();

            // Step 3: Create session and store user info
            session.setAttribute("userId", user.getId());
            session.setAttribute("email", user.getEmail());
            session.setAttribute("organizationId", idTokenClaims.getOrgId());

            return "redirect:/dashboard";
        } catch (Exception error) {
            System.err.println("Authentication failed: " + error.getMessage());
            return "redirect:/login?error=auth_failed";
        }
    }

    // Step 4: Protect routes with authentication check
    @GetMapping("/dashboard")
    public String dashboard(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return "redirect:/login";
        }

        String email = (String) session.getAttribute("email");
        return "Welcome, " + email + "!";
    }

    // Step 5: Handle logout
    @PostMapping("/auth/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
