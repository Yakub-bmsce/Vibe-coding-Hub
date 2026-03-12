import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCurrentLevel, getProgressToNextLevel } from '../utils/xpSystem';
import { getStreak, updateStreak } from '../utils/progressTracker';
import { generateClassRecovery } from '../api/groqAI';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [level, setLevel] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [recoveryResult, setRecoveryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLevel(getCurrentLevel());
    setProgress(getProgressToNextLevel());
    setStreak(updateStreak());
  }, []);

  const handleClassRecovery = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await generateClassRecovery(searchQuery);
      setRecoveryResult(result);
    } catch (error) {
      console.error('Recovery error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const learningPaths = [
    {
      title: 'Learn by Concepts',
      description: 'Master topics with structured lessons and practice',
      icon: '📚',
      path: '/concepts',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Learn by Videos & Roadmaps',
      description: 'Follow curated video tutorials and learning paths',
      icon: '🎥',
      path: '/videos',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Learn by Games',
      description: 'Practice through interactive games and challenges',
      icon: '🎮',
      path: '/games',
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <Sidebar />
      
      <main className="dashboard-content">
        <div className="container">

          <section className="hero-section fade-in">
            <h1 className="gradient-text">Welcome to Vibe Learning Hub</h1>
            <p className="hero-subtitle">Your AI-powered learning companion</p>
          </section>

          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <h3>{level?.title || 'Beginner'}</h3>
                <p>Level {level?.level || 1}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <h3>{streak} Days</h3>
                <p>Learning Streak</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <h3>{localStorage.getItem('userXP') || 0} XP</h3>
                <p>Total Experience</p>
              </div>
            </div>
          </section>

          <section className="progress-section">
            <h3>Progress to Next Level</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{Math.round(progress)}% Complete</p>
          </section>

          <section className="search-section">
            <h2>Class Recovery Mode</h2>
            <p>Didn't understand something in class? Let AI help you!</p>
            <div className="search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Today my teacher taught recursion but I didn't understand"
                onKeyPress={(e) => e.key === 'Enter' && handleClassRecovery()}
              />
              <button 
                onClick={handleClassRecovery} 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Get Help'}
              </button>
            </div>
            
            {recoveryResult && (
              <div className="recovery-result card">
                <pre>{recoveryResult}</pre>
              </div>
            )}
          </section>

          <section className="learning-paths">
            <h2>Choose Your Learning Path</h2>
            <div className="paths-grid">
              {learningPaths.map((path, idx) => (
                <div 
                  key={idx}
                  className="path-card card"
                  onClick={() => navigate(path.path)}
                >
                  <div className="path-icon">{path.icon}</div>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <button className="btn btn-primary">Start Learning</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
