import React, { useState } from "react";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./pages/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"login" | "register">("login");
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  );
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("authUser");
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  });

  const isAuthenticated = !!token && !!user;

  const apiBase = (() => {
    if (typeof window !== "undefined" && window.location.port === "8080") {
      return "http://localhost:5500";
    }
    return "/api";
  })();

  const handleLoginSuccess = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", newToken);
      localStorage.setItem("authUser", JSON.stringify(newUser));
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
    setCurrentView("login");
  };

  if (isAuthenticated && token && user) {
    return <Layout apiBase={apiBase} token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentView === "login" && (
        <Login
          apiBase={apiBase}
          onLogin={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView("register")}
        />
      )}
      {currentView === "register" && (
        <Register
          apiBase={apiBase}
          onRegisterSuccess={() => {
            setCurrentView("login");
            alert(
              "Compte créé avec succès ! Vous pouvez maintenant vous connecter."
            );
          }}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )}
    </div>
  );
};

export default App;
