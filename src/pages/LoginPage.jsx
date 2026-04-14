import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      signup(email, password);
    }
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    setEmail('demo@vibelearning.com');
    setPassword('demo123');
    login('demo@vibelearning.com', 'demo123');
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="login-card fade-in">
        <div className="login-header">
          <h1 className="gradient-text">Vibe Learner</h1>
          <p>AI-Powered Learning Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <button 
            type="button" 
            onClick={handleDemoLogin} 
            className="btn btn-secondary demo-btn"
          >
            🚀 Try Demo Login
          </button>

          <div className="toggle-auth">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                {isLogin ? 'Sign Up' : 'Login'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
