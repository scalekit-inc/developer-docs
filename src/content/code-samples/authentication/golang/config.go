package main

import (
	"os"
	"github.com/scalekit-inc/scalekit-sdk-go"
)

var ScalekitClient *scalekit.ScalekitClient

func init() {
	// Initialize Scalekit client
	ScalekitClient = scalekit.NewScalekitClient(
		os.Getenv("SCALEKIT_ENV_URL"),
		os.Getenv("SCALEKIT_CLIENT_ID"),
		os.Getenv("SCALEKIT_CLIENT_SECRET"),
	)
}

const RedirectURI = "http://localhost:8080/auth/callback"
