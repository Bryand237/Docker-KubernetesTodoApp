import React, { useState } from "react";
import Header from "../components/header";
import AddTodoModal from "../components/addtodomodal";
import EditTodoModal from "../components/editTodoModal";
import DeleteTodoModal from "../components/deleteTodoModal";

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

const Layout: React.FC<{
  apiBase: string;
  token: string;
  onLogout: () => void;
}> = ({ apiBase, token, onLogout }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiBase}/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: TodoItem[] = await res.json();
        setTodos(data);
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);

  const handleAddTodo = async (
    title: string,
    description: string,
    date: string
  ) => {
    try {
      const res = await fetch(`${apiBase}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created: TodoItem = await res.json();
      setTodos((prev) => [created, ...prev]);
    } catch (e) {
      // Optionnel: notifier
    }
  };

  const openEditModal = (id: string) => {
    setSelectedTodo(todos.find((todo) => todo.id === id) || null);
    setShowEditModal(true);
  };

  const saveEditedTodo = async (
    id: string,
    title: string,
    description: string,
    date: string
  ) => {
    try {
      const res = await fetch(`${apiBase}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated: TodoItem = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      // Optionnel: notifier
    } finally {
      setShowEditModal(false);
      setSelectedTodo(null);
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedTodo(todos.find((todo) => todo.id === id) || null);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id: string) => {
    try {
      const res = await fetch(`${apiBase}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      // Optionnel: notifier
    } finally {
      setShowDeleteModal(false);
      setSelectedTodo(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header fixe */}
      <div className="sticky-top">
        <Header onAddTodo={() => setShowModal(true)} onLogout={onLogout} />
      </div>

      {/* Contenu défilant */}
      <main className="container-fluid py-4" style={{ marginTop: "0px" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            {/* En-tête des notes */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 text-dark fw-bold">
                <i className="bi bi-journal-text me-2"></i>
                Notes
              </h2>
              <span className="badge bg-primary fs-6">
                {todos.length} notes
              </span>
            </div>

            {/* Liste des notes - Style comme l'image */}
            <div className="notes-list">
              {loading && <div className="text-muted">Chargement...</div>}
              {error && <div className="text-danger">{error}</div>}
              {todos.map((todo, index) => (
                <div key={todo.id}>
                  {/* Note individuelle */}
                  <div className="note-item bg-white rounded p-4 mb-4 shadow-sm">
                    {/* Titre en gras comme sur l'image */}
                    <h3 className="h5 fw-bold text-dark mb-2">{todo.title}</h3>

                    {/* Description */}
                    {todo.description && (
                      <p className="text-muted mb-3">{todo.description}</p>
                    )}

                    {/* Date */}
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar3 text-muted me-2"></i>
                      <span className="text-muted">
                        {formatDate(todo.date)}
                      </span>

                      {/* Boutons d'action qui apparaissent au survol */}
                      <div
                        className="action-buttons ms-auto opacity-0"
                        style={{ transition: "opacity 0.2s ease" }}
                      >
                        <button
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => openEditModal(todo.id)}
                          title="Modifier"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => openDeleteModal(todo.id)}
                          title="Supprimer"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ligne de séparation comme sur l'image */}
                  {index < todos.length - 1 && <hr className="my-4" />}
                </div>
              ))}
            </div>

            {/* Message si aucune note */}
            {todos.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-journal-x display-1 text-muted"></i>
                <p className="text-muted mt-3">Aucune note pour le moment</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Créer votre première note
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal d'ajout */}
      <AddTodoModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddTodo}
      />

      {/* Modal de suppression */}
      <DeleteTodoModal
        id={selectedTodo?.id || ""}
        show={showDeleteModal && !!selectedTodo}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* Modal de modification */}
      <EditTodoModal
        todo={selectedTodo || undefined}
        showModal={showEditModal && !!selectedTodo}
        onClose={() => setShowEditModal(false)}
        onEdit={saveEditedTodo}
      />
    </div>
  );
};

export default Layout;
