package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Register authentication routes
	RegisterAuthRoutes(router)

	// Protected dashboard route
	router.GET("/dashboard", RequireAuth(), func(c *gin.Context) {
		email := c.GetString("email")
		c.String(200, "Welcome, %s!", email)
	})

	router.Run(":8080")
}
