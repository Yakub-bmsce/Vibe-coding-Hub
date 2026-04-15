import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const FEATURES = [
  { icon: '🤖', text: 'AI-powered explanations' },
  { icon: '🎮', text: 'Learn through games' },
  { icon: '🔥', text: 'Daily streak rewards' },
  { icon: '🗺️', text: 'Structured roadmaps' },
  { icon: '🎥', text: 'Curated video lessons' },
  { icon: '⚡', text: 'XP & rank system' },
];

const DOMAINS = ['Python', 'JavaScript', 'React', 'DSA', 'ML/AI', 'DevOps', 'SQL', 'Flutter'];

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [domainIdx, setDomainIdx] = useState(0);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Rotate domain names
  useEffect(() => {
    const t = setInterval(() => setDomainIdx(i => (i + 1) % DOMAINS.length), 2000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    isLogin ? login(email, password) : signup(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="landing-page">
      {/* ── Animated background ── */}
      <div className="landing-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="landing-layout">
        {/* ── Left — hero ── */}
        <div className="landing-hero">
          <div className="hero-badge">✨ AI-Powered Learning</div>

          <h1 className="hero-title">
            <span className="hero-master">Master</span>
            <span className="hero-rotating">{DOMAINS[domainIdx]}</span>
            <span className="hero-sub">like never before</span>
          </h1>

          <p className="hero-desc">
            Learn programming with AI explanations, interactive games, video tutorials and daily streaks — all in one place.
          </p>

          <div className="feature-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-pill">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          <div className="hero-stats">
            <div className="stat"><span className="stat-num">10+</span><span className="stat-lbl">Domains</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="stat-num">68+</span><span className="stat-lbl">Topics</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="stat-num">Free</span><span className="stat-lbl">Forever</span></div>
          </div>
        </div>

        {/* ── Right — auth card ── */}
        <div className="auth-card">
          <div className="auth-logo">
            <span>⚡</span>
            <h2>Vibe Learner</h2>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Login</button>
            <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 4 characters" required />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit">
              {isLogin ? '🚀 Start Learning' : '✨ Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            {isLogin ? "New here? " : "Already have an account? "}
            <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? 'Sign Up free' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
