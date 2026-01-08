package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/scalekit-inc/scalekit-sdk-go"
)

// Initialize Scalekit client
var scalekitClient *scalekit.ScalekitClient

func init() {
	scalekitClient = scalekit.NewScalekitClient(
		os.Getenv("SCALEKIT_ENV_URL"),
		os.Getenv("SCALEKIT_CLIENT_ID"),
		os.Getenv("SCALEKIT_CLIENT_SECRET"),
	)
}

func main() {
	router := gin.Default()

	// Step 1: Generate authorization URL
	router.GET("/auth/login", func(c *gin.Context) {
		organizationID := c.Query("organization_id")

		authURL := scalekitClient.GetAuthorizationURL(
			"http://localhost:8080/auth/callback",
			scalekit.AuthorizationURLOptions{
				OrganizationID: organizationID,
				State:          "random-state-string", // Use a secure random string
			},
		)

		c.Redirect(http.StatusFound, authURL)
	})

	// Step 2: Handle OAuth callback
	router.GET("/auth/callback", func(c *gin.Context) {
		code := c.Query("code")
		state := c.Query("state")

		// Exchange authorization code for tokens
		result, err := scalekitClient.AuthenticateWithCode(
			code,
			"http://localhost:8080/auth/callback",
		)

		if err != nil {
			fmt.Printf("Authentication failed: %v\n", err)
			c.Redirect(http.StatusFound, "/login?error=auth_failed")
			return
		}

		// Access user information
		user := result.User
		idTokenClaims := result.IDTokenClaims

		// Step 3: Create session and store user info
		session := gin.H{
			"user_id":         user.ID,
			"email":           user.Email,
			"organization_id": idTokenClaims.OrgID,
		}

		// Store session (use a proper session library in production)
		c.SetCookie("session", fmt.Sprintf("%v", session), 3600, "/", "", false, true)

		c.Redirect(http.StatusFound, "/dashboard")
	})

	// Step 4: Protect routes with authentication middleware
	router.GET("/dashboard", requireAuth(), func(c *gin.Context) {
		email := c.GetString("email")
		c.String(http.StatusOK, "Welcome, %s!", email)
	})

	// Step 5: Handle logout
	router.POST("/auth/logout", func(c *gin.Context) {
		c.SetCookie("session", "", -1, "/", "", false, true)
		c.Redirect(http.StatusFound, "/login")
	})

	router.Run(":8080")
}

func requireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		session, err := c.Cookie("session")
		if err != nil || session == "" {
			c.Redirect(http.StatusFound, "/login")
			c.Abort()
			return
		}
		c.Next()
	}
}
