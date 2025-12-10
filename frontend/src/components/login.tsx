import React, { useState } from "react";
import type { AuthUser } from "../App";

interface LoginProps {
  apiBase: string;
  onLogin: (token: string, user: AuthUser) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({
  apiBase,
  onLogin,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data as any)?.error || `Erreur de connexion (HTTP ${res.status})`;
        throw new Error(message);
      }

      const data = await res.json();
      onLogin(data.access_token, data.user as AuthUser);
    } catch (err: any) {
      setError(err?.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
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
                <h2 className="card-title fw-bold text-primary mb-2">
                  TaskFlow
                </h2>
                <p className="text-muted m-0">
                  Organisez votre vie, une tâche à la fois
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <i className="bi bi-envelope me-2 text-primary"></i>Adresse
                    email
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

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3 fw-semibold"
                  disabled={loading}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  {loading ? "Connexion..." : "Se connecter"}
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
