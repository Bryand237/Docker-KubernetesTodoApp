import React, { useState } from 'react';
import Login from './components/login';
import Register from './components/register';
import Layout from './pages/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

  if (isAuthenticated) {
    return <Layout onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="App">
      {currentView === 'login' && (
        <Login 
          onLogin={() => setIsAuthenticated(true)}
          onSwitchToRegister={() => setCurrentView('register')}
        />
      )}
      {currentView === 'register' && (
        <Register 
          onRegister={() => {
            setCurrentView('login');
            alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
          }}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}
    </div>
  );
};

export default App;