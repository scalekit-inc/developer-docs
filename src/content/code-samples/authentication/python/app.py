from flask import Flask
from flask_session import Session
from auth import auth_bp

app = Flask(__name__)

# Configure session
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Register authentication blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')

# Protected dashboard route
@app.route('/dashboard')
def dashboard():
    from flask import session, redirect
    if 'user_id' not in session:
        return redirect('/login')
    return f"Welcome, {session['email']}!"

if __name__ == '__main__':
    app.run(port=5000)
