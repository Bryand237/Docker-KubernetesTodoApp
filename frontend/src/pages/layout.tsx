import React, { useState } from 'react';
import Header from '../components/header';
import AddTodoModal from '../components/addtodomodal';

interface TodoItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

const Layout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: 'Réunion importante',
      description: 'Présentation du nouveau plan d\'action de la DAAC',
      date: '2025-11-06'
    },
    {
      id: '2',
      title: 'dédibbbb',
      description: 'sfasdsdfdfdsdds',
      date: '2025-11-02'
    },
    {
      id: '3',
      title: 'aslasi',
      description: 'ssijkdfdkdd',
      date: '2025-11-05'
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);

  const handleAddTodo = (title: string, description: string, date: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      description,
      date
    };
    setTodos([newTodo, ...todos]);
  };

  const handleEditTodo = (id: string) => {
    alert(`Modifier la note: ${id}`);
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header fixe */}
      <div className="sticky-top">
        <Header 
          onAddTodo={() => setShowModal(true)}
          onLogout={onLogout}
        />
      </div>
      
      {/* Contenu défilant */}
      <main className="container-fluid py-4" style={{ marginTop: '0px' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            {/* En-tête des notes */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 text-dark fw-bold">
                <i className="bi bi-journal-text me-2"></i>
                Notes
              </h2>
              <span className="badge bg-primary fs-6">{todos.length} notes</span>
            </div>

            {/* Liste des notes - Style comme l'image */}
            <div className="notes-list">
              {todos.map((todo, index) => (
                <div key={todo.id}>
                  {/* Note individuelle */}
                  <div className="note-item bg-white rounded p-4 mb-4 shadow-sm">
                    {/* Titre en gras comme sur l'image */}
                    <h3 className="h5 fw-bold text-dark mb-2">
                      {todo.title}
                    </h3>
                    
                    {/* Description */}
                    {todo.description && (
                      <p className="text-muted mb-3">
                        {todo.description}
                      </p>
                    )}
                    
                    {/* Date */}
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar3 text-muted me-2"></i>
                      <span className="text-muted">{formatDate(todo.date)}</span>
                      
                      {/* Boutons d'action qui apparaissent au survol */}
                      <div className="action-buttons ms-auto opacity-0" style={{ transition: 'opacity 0.2s ease' }}>
                        <button 
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => handleEditTodo(todo.id)}
                          title="Modifier"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteTodo(todo.id)}
                          title="Supprimer"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ligne de séparation comme sur l'image */}
                  {index < todos.length - 1 && (
                    <hr className="my-4" />
                  )}
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
    </div>
  );
};

export default Layout;