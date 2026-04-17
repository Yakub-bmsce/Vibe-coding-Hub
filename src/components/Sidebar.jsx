import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCurrentLevel, getProgressToNextLevel, getCurrentRank } from '../utils/xpSystem';
import { getStreak } from '../utils/progressTracker';
import '../styles/Sidebar.css';

const menuSections = [
  { label: 'Main',     items: [{ path: '/dashboard', icon: '🏠', label: 'Dashboard' }] },
  { label: 'Learn',    items: [
    { path: '/visual-learning', icon: '🎨', label: 'Visual Learning' },
    { path: '/community-notes', icon: '📝', label: 'Community Notes' },
    { path: '/leaderboard',     icon: '🏆', label: 'Leaderboard' },
    { path: '/videos',          icon: '🎥', label: 'Videos' },
    { path: '/games',           icon: '🎮', label: 'Games' },
  ]},
  { label: 'Practice', items: [{ path: '/revision', icon: '📖', label: 'Revision' }] }
];

const mobileNav = [
  { path: '/dashboard',       icon: '🏠', label: 'Home' },
  { path: '/visual-learning', icon: '🎨', label: 'Visual' },
  { path: '/leaderboard',     icon: '🏆', label: 'Ranks' },
  { path: '/videos',          icon: '🎥', label: 'Videos' },
  { path: '/games',           icon: '🎮', label: 'Games' },
];

const Sidebar = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [rank, setRank] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    setXp(parseInt(localStorage.getItem('userXP') || '0'));
    setLevel(getCurrentLevel());
    setProgress(getProgressToNextLevel());
    setStreak(getStreak());
    setRank(getCurrentRank());
  }, []);

  const username = user?.name || 'Learner';
  const avatar = username.charAt(0).toUpperCase();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <>
      {/* ── Desktop sidebar — always expanded ── */}
      <aside className="sidebar">
        <div className="sidebar-avatar-mini" title={username}>{avatar}</div>

        <div className="sidebar-profile">
          <div className="profile-avatar">{avatar}</div>
          <div className="profile-info">
            <div className="profile-name">{username}</div>
            <div className="profile-level">
              {rank && <span className="profile-rank">{rank.icon} {rank.name}</span>}
              <span className="profile-lvl">Lv.{level?.level || 1} {level?.title || 'Beginner'}</span>
            </div>
          </div>
        </div>

        <div className="sidebar-xp">
          <div className="xp-bar-wrap"><div className="xp-bar-fill" style={{ width: `${progress}%` }}></div></div>
          <div className="xp-labels"><span>⚡ {xp} XP</span><span>{Math.round(progress)}%</span></div>
        </div>

        <div className="sidebar-streak">
          <span className="streak-fire">🔥</span>
          <span className="streak-count">{streak} day streak</span>
        </div>

        <div className="sidebar-divider" />

        {menuSections.map((section) => (
          <div key={section.label} className="sidebar-section">
            <div className="sidebar-section-label">{section.label}</div>
            <ul className="sidebar-menu">
              {section.items.map((item) => (
                <li
                  key={item.path}
                  className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                  title={item.label}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                  {location.pathname === item.path && <span className="active-dot" />}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="sidebar-spacer" />
        <div className="sidebar-footer">
          <div className="sidebar-divider" />
          <div className="sidebar-item sidebar-logout" onClick={handleLogout} title="Logout">
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-label">Logout</span>
          </div>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-bottom-nav">
        {mobileNav.map((item) => (
          <button
            key={item.path}
            className={`mob-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="mob-nav-icon">{item.icon}</span>
            <span className="mob-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
