from datetime import datetime, timedelta
import uuid

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import jwt

from config import (
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS,
    JWT_ACCESS_TOKEN_EXPIRES_MINUTES,
    JWT_SECRET_KEY,
)
from model import db, Todo, User


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

    db.init_app(app)
    CORS(app)

    with app.app_context():
        db.create_all()

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    def _generate_access_token(user: User) -> str:
        now = datetime.utcnow()
        payload = {
            "sub": user.id,
            "email": user.email,
            "exp": now + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRES_MINUTES),
            "iat": now,
        }
        token = jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")
        if isinstance(token, bytes):
            token = token.decode("utf-8")
        return token

    def _get_current_user():
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return None
        token = auth_header.split(" ", 1)[1].strip()
        if not token:
            return None
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        user_id = payload.get("sub")
        if user_id is None:
            return None
        return User.query.get(user_id)

    @app.post("/auth/register")
    def register():
        data = request.get_json(silent=True) or {}
        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip().lower()
        password = (data.get("password") or "").strip()

        if not name or not email or not password:
            return jsonify({"error": "Invalid payload"}), 400

        if User.query.filter_by(email=email).first() is not None:
            return jsonify({"error": "Email already registered"}), 400

        password_hash = generate_password_hash(password)
        user = User(name=name, email=email, password_hash=password_hash)
        db.session.add(user)
        db.session.commit()

        return jsonify(user.to_dict()), 201

    @app.post("/auth/login")
    def login():
        data = request.get_json(silent=True) or {}
        email = (data.get("email") or "").strip().lower()
        password = (data.get("password") or "").strip()

        if not email or not password:
            return jsonify({"error": "Invalid credentials"}), 400

        user = User.query.filter_by(email=email).first()
        if user is None or not check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid credentials"}), 401

        access_token = _generate_access_token(user)
        return jsonify({"access_token": access_token, "user": user.to_dict()})

    @app.get("/me")
    def me():
        user = _get_current_user()
        if user is None:
            return jsonify({"error": "Unauthorized"}), 401
        return jsonify(user.to_dict())

    @app.get("/todos")
    def list_todos():
        user = _get_current_user()
        if user is None:
            return jsonify({"error": "Unauthorized"}), 401
        items = (
            Todo.query.filter_by(user_id=user.id)
            .order_by(Todo.id.desc())
            .all()
        )
        return jsonify([t.to_dict() for t in items])

    @app.post("/todos")
    def create_todo():
        user = _get_current_user()
        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json(silent=True) or {}
        title = (data.get("title") or "").strip()
        description = (data.get("description") or "").strip()
        date = (data.get("date") or "").strip()
        if not title or not description or not date:
            return jsonify({"error": "Invalid payload"}), 400

        item = Todo(
            id=str(uuid.uuid4()),
            title=title,
            description=description,
            date=date,
            user_id=user.id,
        )
        db.session.add(item)
        db.session.commit()
        return jsonify(item.to_dict()), 201

    @app.put("/todos/<todo_id>")
    def update_todo(todo_id):
        user = _get_current_user()
        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json(silent=True) or {}
        item = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
        if not item:
            return jsonify({"error": "Not found"}), 404
        if "title" in data and isinstance(data["title"], str):
            item.title = data["title"].strip()
        if "description" in data and isinstance(data["description"], str):
            item.description = data["description"].strip()
        if "date" in data and isinstance(data["date"], str):
            item.date = data["date"].strip()
        db.session.commit()
        return jsonify(item.to_dict())

    @app.delete("/todos/<todo_id>")
    def delete_todo(todo_id):
        user = _get_current_user()
        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        item = Todo.query.filter_by(id=todo_id, user_id=user.id).first()
        if not item:
            return jsonify({"error": "Not found"}), 404
        db.session.delete(item)
        db.session.commit()
        return ("", 204)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500)
