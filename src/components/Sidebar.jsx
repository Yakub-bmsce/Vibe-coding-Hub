import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard',  icon: '🏠', label: 'Dashboard' },
    { path: '/concepts',   icon: '📚', label: 'Learn by Concepts' },
    { path: '/videos',     icon: '🎥', label: 'Video Tutorials' },
    { path: '/roadmap',    icon: '🗺️', label: 'Learning Roadmap' },
    { path: '/games',      icon: '🎮', label: 'Game Learning' },
    { path: '/revision',   icon: '📝', label: 'Revision' }
  ];

  return (
    <aside
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="sidebar-hint">☰</div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
