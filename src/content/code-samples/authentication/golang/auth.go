package main

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// Register authentication routes
func RegisterAuthRoutes(router *gin.Engine) {
	// Generate authorization URL and redirect
	router.GET("/auth/login", func(c *gin.Context) {
		organizationID := c.Query("organization_id")

		authorizationURL := ScalekitClient.GetAuthorizationURL(
			RedirectURI,
			map[string]interface{}{
				"organization_id": organizationID,
				"state":          "random-state-string",
			},
		)

		c.Redirect(302, authorizationURL)
	})

	// Handle OAuth callback
	router.GET("/auth/callback", func(c *gin.Context) {
		code := c.Query("code")
		state := c.Query("state")

		// Exchange code for tokens
		result, err := ScalekitClient.AuthenticateWithCode(code, RedirectURI)
		if err != nil {
			c.Redirect(302, "/login?error=auth_failed")
			return
		}

		// Store user in session
		session := sessions.Default(c)
		session.Set("user_id", result.User.ID)
		session.Set("email", result.User.Email)
		session.Set("organization_id", result.IDTokenClaims.OrgID)
		session.Save()

		c.Redirect(302, "/dashboard")
	})

	// Logout endpoint
	router.POST("/auth/logout", func(c *gin.Context) {
		session := sessions.Default(c)
		session.Clear()
		session.Save()
		c.Redirect(302, "/login")
	})
}

// Authentication middleware
func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		userID := session.Get("user_id")

		if userID == nil {
			c.Redirect(302, "/login")
			c.Abort()
			return
		}

		email := session.Get("email")
		c.Set("email", email)
		c.Next()
	}
}
