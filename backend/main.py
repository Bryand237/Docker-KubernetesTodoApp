from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from model import db, Todo


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

    @app.get("/todos")
    def list_todos():
        items = Todo.query.order_by(Todo.id.desc()).all()
        return jsonify([t.to_dict() for t in items])

    @app.post("/todos")
    def create_todo():
        data = request.get_json(silent=True) or {}
        title = (data.get("title") or "").strip()
        description = (data.get("description") or "").strip()
        date = (data.get("date") or "").strip()
        if not title or not description or not date:
            return jsonify({"error": "Invalid payload"}), 400
        item = Todo(
            id=str(uuid.uuid4()), title=title, description=description, date=date
        )
        db.session.add(item)
        db.session.commit()
        return jsonify(item.to_dict()), 201

    @app.put("/todos/<todo_id>")
    def update_todo(todo_id):
        data = request.get_json(silent=True) or {}
        item = Todo.query.get(todo_id)
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
        item = Todo.query.get(todo_id)
        if not item:
            return jsonify({"error": "Not found"}), 404
        db.session.delete(item)
        db.session.commit()
        return ("", 204)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500)
