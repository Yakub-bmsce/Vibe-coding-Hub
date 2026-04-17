import { useState, useEffect, useRef } from 'react';
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

// All domains from the app
const ALL_DOMAINS = [
  'Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Go', 'Rust',
  'React', 'Next.js', 'Vue', 'Node.js', 'Tailwind',
  'DSA', 'Arrays', 'Trees', 'Graphs', 'Dynamic Programming',
  'SQL', 'MySQL', 'MongoDB', 'PostgreSQL', 'Redis',
  'ML/AI', 'Neural Networks', 'TensorFlow', 'PyTorch',
  'DevOps', 'Docker', 'Kubernetes', 'AWS', 'CI/CD',
  'Cybersecurity', 'Encryption', 'Ethical Hacking',
  'Flutter', 'Android', 'iOS', 'React Native',
  'Networking', 'TCP/IP', 'DNS', 'OSI Model',
];

// Scrolling domain ticker component
function DomainTicker() {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);
  const speed = 0.8;
  const itemWidth = 200; // fixed width — prevents overlap
  const totalWidth = ALL_DOMAINS.length * itemWidth;
  // Duplicate for seamless loop
  const items = [...ALL_DOMAINS, ...ALL_DOMAINS];

  useEffect(() => {
    const animate = () => {
      setOffset(prev => {
        const next = prev - speed; // negative = left to right (items appear from left)
        return next <= -totalWidth ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  // Highlight zone: left quarter of screen (below "Master" text)
  const highlightZoneStart = 0;
  const highlightZoneEnd   = itemWidth * 1.2;

  return (
    <div className="domain-ticker-wrap">
      <div className="domain-ticker-fade left" />
      <div className="domain-ticker-fade right" />
      <div
        className="domain-ticker-track"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {items.map((d, i) => {
          // Position of this item's center relative to the ticker container
          const itemCenter = i * itemWidth + itemWidth / 2 + offset;
          const isHighlighted = itemCenter >= highlightZoneStart && itemCenter <= highlightZoneEnd;
          return (
            <span
              key={i}
              className={`domain-ticker-item ${isHighlighted ? 'center' : ''}`}
              style={{ width: itemWidth }}
            >
              {d}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

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

  const handleDemo = () => {
    login('demo@vibelearner.com', 'demo123');
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
            <DomainTicker />
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

          <button className="auth-demo-btn" onClick={handleDemo}>
            🎮 Try Demo — no signup needed
          </button>

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
