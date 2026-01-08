from scalekit import ScalekitClient
from flask import Flask, request, redirect, session
import os

# Initialize Scalekit client
scalekit = ScalekitClient(
    env_url=os.getenv('SCALEKIT_ENV_URL'),
    client_id=os.getenv('SCALEKIT_CLIENT_ID'),
    client_secret=os.getenv('SCALEKIT_CLIENT_SECRET')
)

app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET')

# Step 1: Generate authorization URL
@app.route('/auth/login')
def login():
    organization_id = request.args.get('organization_id')

    authorization_url = scalekit.get_authorization_url(
        redirect_uri='http://localhost:5000/auth/callback',
        options={
            'organization_id': organization_id,
            'state': 'random-state-string'  # Use a secure random string
        }
    )

    return redirect(authorization_url)

# Step 2: Handle OAuth callback
@app.route('/auth/callback')
def callback():
    code = request.args.get('code')
    state = request.args.get('state')

    try:
        # Exchange authorization code for tokens
        result = scalekit.authenticate_with_code(
            code=code,
            redirect_uri='http://localhost:5000/auth/callback'
        )

        # Access user information
        id_token_claims = result.id_token_claims
        user = result.user

        # Step 3: Create session and store user info
        session['user_id'] = user.id
        session['email'] = user.email
        session['organization_id'] = id_token_claims.org_id

        return redirect('/dashboard')
    except Exception as error:
        print(f'Authentication failed: {error}')
        return redirect('/login?error=auth_failed')

# Step 4: Protect routes with authentication decorator
def require_auth(f):
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

@app.route('/dashboard')
@require_auth
def dashboard():
    return f"Welcome, {session['email']}!"

# Step 5: Handle logout
@app.route('/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect('/login')

if __name__ == '__main__':
    app.run(port=5000)
