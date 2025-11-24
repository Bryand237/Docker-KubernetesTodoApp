import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    onLogin();
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4 p-md-5">
              {/* En-tête avec icône et nom d'application */}
              <div className="text-center mb-4">
                <div className="bg-primary bg-gradient rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-check-circle-fill text-white fs-2"></i>
                </div>
                <h2 className="card-title fw-bold text-primary mb-2">TaskFlow</h2>
                <p className="text-muted m-0">Organisez votre vie, une tâche à la fois</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <i className="bi bi-envelope me-2 text-primary"></i>Adresse email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    <i className="bi bi-lock me-2 text-primary"></i>Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 py-2 mb-3 fw-semibold">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Se connecter
                </button>
                
                <div className="text-center">
                  <span className="text-muted">Nouveau sur TaskFlow ? </span>
                  <button 
                    type="button" 
                    className="btn btn-link p-0 text-decoration-none fw-semibold"
                    onClick={onSwitchToRegister}
                  >
                    Créer un compte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;