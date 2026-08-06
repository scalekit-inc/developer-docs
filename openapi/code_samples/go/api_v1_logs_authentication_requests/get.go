package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

// List authentication request logs (most recent first)
func listAuthRequests(accessToken string) error {
	url := fmt.Sprintf(
		"%s/api/v1/logs/authentication/requests?page_size=10&status=SUCCESS",
		os.Getenv("SCALEKIT_ENVIRONMENT_URL"),
	)
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return err
	}
	fmt.Println(string(body))
	return nil
}
