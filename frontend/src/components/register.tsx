import React, { useState } from "react";

interface RegisterProps {
  apiBase: string;
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({
  apiBase,
  onRegisterSuccess,
  onSwitchToLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          (data as any)?.error || `Erreur d'inscription (HTTP ${res.status})`;
        throw new Error(message);
      }

      onRegisterSuccess();
    } catch (err: any) {
      setError(err?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-5">
          {" "}
          {/* MÊME LARGEUR QUE LOGIN */}
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4 p-md-5">
              {/* En-tête avec icône et nom d'application */}
              <div className="text-center mb-4">
                <div className="bg-success bg-gradient rounded-circle d-inline-flex p-3 mb-3">
                  <i className="bi bi-person-plus-fill text-white fs-2"></i>
                </div>
                <h2 className="card-title fw-bold text-success mb-2">
                  Créer un compte
                </h2>
                <p className="text-muted m-0">
                  Rejoignez TaskFlow dès aujourd'hui
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    <i className="bi bi-person me-2 text-success"></i>Nom
                    complet
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
                    <i className="bi bi-envelope me-2 text-success"></i>Adresse
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
                  <label
                    htmlFor="confirmPassword"
                    className="form-label fw-semibold"
                  >
                    <i className="bi bi-shield-lock me-2 text-success"></i>
                    Confirmer le mot de passe
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

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 mb-3 fw-semibold"
                  disabled={loading}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  {loading ? "Création en cours..." : "Créer mon compte"}
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
