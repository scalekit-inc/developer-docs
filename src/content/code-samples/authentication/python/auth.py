from flask import Blueprint, request, redirect, session
from config import scalekit, CONFIG

auth_bp = Blueprint('auth', __name__)

# Generate authorization URL and redirect
@auth_bp.route('/login')
def login():
    organization_id = request.args.get('organization_id')

    authorization_url = scalekit.get_authorization_url(
        redirect_uri=CONFIG['redirect_uri'],
        options={
            'organization_id': organization_id,
            'state': 'random-state-string'
        }
    )

    return redirect(authorization_url)

# Handle OAuth callback
@auth_bp.route('/callback')
def callback():
    code = request.args.get('code')
    state = request.args.get('state')

    try:
        # Exchange code for tokens
        result = scalekit.authenticate_with_code(
            code=code,
            redirect_uri=CONFIG['redirect_uri']
        )

        # Store user in session
        session['user_id'] = result.user.id
        session['email'] = result.user.email
        session['organization_id'] = result.id_token_claims.org_id

        return redirect('/dashboard')
    except Exception as error:
        print(f'Authentication failed: {error}')
        return redirect('/login?error=auth_failed')

# Logout endpoint
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect('/login')
