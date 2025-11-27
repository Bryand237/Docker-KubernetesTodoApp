import React, { useState } from 'react';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    console.log('Register attempt:', { name, email, password });
    onRegister();
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-5"> {/* MÊME LARGEUR QUE LOGIN */}
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4 p-md-5">
              {/* En-tête avec icône et nom d'application */}
              <div className="text-center mb-4">
                <div className="bg-success bg-gradient rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-person-plus-fill text-white fs-2"></i>
                </div>
                <h2 className="card-title fw-bold text-success mb-2">Créer un compte</h2>
                <p className="text-muted m-0">Rejoignez TaskFlow dès aujourd'hui</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    <i className="bi bi-person me-2 text-success"></i>Nom complet
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <i className="bi bi-envelope me-2 text-success"></i>Adresse email
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
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    <i className="bi bi-lock me-2 text-success"></i>Mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Créez un mot de passe"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold">
                    <i className="bi bi-shield-lock me-2 text-success"></i>Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre mot de passe"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-success w-100 py-2 mb-3 fw-semibold">
                  <i className="bi bi-person-plus me-2"></i>
                  Créer mon compte
                </button>
                
                <div className="text-center">
                  <span className="text-muted">Déjà un compte ? </span>
                  <button 
                    type="button" 
                    className="btn btn-link p-0 text-decoration-none fw-semibold"
                    onClick={onSwitchToLogin}
                  >
                    Se connecter
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

export default Register;