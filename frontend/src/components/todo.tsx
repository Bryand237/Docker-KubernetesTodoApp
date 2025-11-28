import React, { useState } from "react";

interface TodoProps {
  id: string;
  title: string;
  description: string;
  date: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({
  id,
  title,
  description,
  date,
  onEdit,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card border-0 shadow-sm mb-3 todo-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="grow">
            <h5 className="card-title text-primary mb-2">{title}</h5>
            <p className="card-text text-muted mb-2">{description}</p>
            <small className="text-muted">
              <i className="bi bi-calendar me-1"></i>
              {date}
            </small>
          </div>

          {/* Boutons d'action qui apparaissent au survol */}
          {isHovered && (
            <div className="d-flex gap-2 ms-3">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => onEdit(id)}
                title="Modifier"
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(id)}
                title="Supprimer"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
