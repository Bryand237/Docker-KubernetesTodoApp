import React from 'react';

interface HeaderProps {
  onAddTodo: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTodo, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-bottom">
      <div className="container-fluid">
        <div className="row align-items-center py-2"> {/* Changé de py-3 à py-2 */}
          <div className="col">
            <h1 className="h3 mb-0 text-primary"> {/* Changé de h3 à h4 */}
              <i className="bi bi-check-circle-fill me-2"></i>
              TaskFlow
            </h1>
            {/* Supprimé le small ou le rendre plus discret */}
            <small className="text-muted" style={{ fontSize: '0.75rem' }}> {/* Taille réduite */}
              Organisez votre vie, une tâche à la fois
            </small>
          </div>
          <div className="col-auto">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary btn-sm" 
                onClick={onAddTodo}
              >
                <i className="bi bi-plus-circle me-1"></i> {/* Me-2 à me-1 */}
                Nouvelle note
              </button>
              <button 
                className="btn btn-outline-secondary btn-sm" 
                onClick={onLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i> 
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;