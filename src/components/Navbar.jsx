import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [notifCount, setNotifCount] = useState(() => {
    try { return parseInt(localStorage.getItem('cn_notifications') || '0', 10); }
    catch { return 0; }
  });

  // Sync notif count from localStorage on focus
  useEffect(() => {
    const sync = () => {
      try { setNotifCount(parseInt(localStorage.getItem('cn_notifications') || '0', 10)); }
      catch { setNotifCount(0); }
    };
    window.addEventListener('focus', sync);
    return () => window.removeEventListener('focus', sync);
  }, []);

  const handleBell = () => {
    localStorage.setItem('cn_notifications', '0');
    setNotifCount(0);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h2 className="gradient-text">Vibe Learner</h2>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="cn-bell-btn" onClick={handleBell} title="Notifications">
            🔔
            {notifCount > 0 && (
              <span className="cn-bell-badge">{notifCount > 99 ? '99+' : notifCount}</span>
            )}
          </button>

          <div className="user-info">
            <span>{user?.name || 'User'}</span>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
