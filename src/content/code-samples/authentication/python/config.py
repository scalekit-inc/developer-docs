from scalekit import ScalekitClient
import os

# Initialize Scalekit client
scalekit = ScalekitClient(
    env_url=os.getenv('SCALEKIT_ENV_URL'),
    client_id=os.getenv('SCALEKIT_CLIENT_ID'),
    client_secret=os.getenv('SCALEKIT_CLIENT_SECRET')
)

CONFIG = {
    'redirect_uri': 'http://localhost:5000/auth/callback',
    'port': 5000
}
