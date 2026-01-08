package com.example.auth;

import com.scalekit.ScalekitClient;
import com.scalekit.models.AuthenticationResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/auth")
public class AuthController {

    private final ScalekitClient scalekit = ScalekitConfig.getClient();

    // Generate authorization URL and redirect
    @GetMapping("/login")
    public String login(@RequestParam(required = false) String organizationId) {
        Map<String, Object> options = new HashMap<>();
        options.put("organizationId", organizationId);
        options.put("state", "random-state-string");

        String authorizationURL = scalekit.getAuthorizationUrl(
            ScalekitConfig.REDIRECT_URI,
            options
        );

        return "redirect:" + authorizationURL;
    }

    // Handle OAuth callback
    @GetMapping("/callback")
    public String callback(
        @RequestParam String code,
        @RequestParam String state,
        HttpSession session
    ) {
        try {
            // Exchange code for tokens
            AuthenticationResponse result = scalekit.authenticateWithCode(
                code,
                ScalekitConfig.REDIRECT_URI
            );

            // Store user in session
            session.setAttribute("userId", result.getUser().getId());
            session.setAttribute("email", result.getUser().getEmail());
            session.setAttribute("organizationId", result.getIdTokenClaims().getOrgId());

            return "redirect:/dashboard";
        } catch (Exception e) {
            System.err.println("Authentication failed: " + e.getMessage());
            return "redirect:/login?error=auth_failed";
        }
    }

    // Logout endpoint
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }

    // Protected dashboard route
    @GetMapping("/dashboard")
    public String dashboard(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return "redirect:/login";
        }

        return "dashboard";
    }
}
