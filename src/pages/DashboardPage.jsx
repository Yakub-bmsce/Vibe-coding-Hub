import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCurrentLevel, getProgressToNextLevel } from '../utils/xpSystem';
import { updateStreak } from '../utils/progressTracker';
import { generateClassRecovery } from '../api/groqAI';
import { searchDomains, getAllDomains } from '../data/domains';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [level, setLevel] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [recoveryResult, setRecoveryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRealWorld, setShowRealWorld] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('programming-languages');
  const allDomains = getAllDomains();

  useEffect(() => {
    setLevel(getCurrentLevel());
    setProgress(getProgressToNextLevel());
    setStreak(updateStreak());
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchDomains(searchQuery);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleDomainSelect = (domainId) => {
    navigate(`/domain/${domainId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

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
            <h2>What do you want to learn today?</h2>
            <p>Type the topic you didn't understand in class</p>
            <div className="search-box">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., Python, React, Data Structures, Machine Learning..."
                onFocus={() => searchQuery && setShowDropdown(true)}
              />
              {showDropdown && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((domain) => (
                    <div 
                      key={domain.id}
                      className="search-result-item"
                      onClick={() => handleDomainSelect(domain.id)}
                    >
                      <span className="result-icon">{domain.icon}</span>
                      <div className="result-info">
                        <h4>{domain.name}</h4>
                        <p>{domain.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="ai-help-divider">
              <span>Or ask AI for help</span>
            </div>

            <p>Describe what you didn't understand</p>
            <div className="search-box">
              <input
                type="text"
                placeholder="e.g., Today my teacher taught recursion but I didn't understand"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleClassRecovery();
                  }
                }}
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

          <section className="real-world-section">
            <div 
              className="real-world-toggle-card card"
              onClick={() => setShowRealWorld(!showRealWorld)}
            >
              <div className="toggle-header">
                <div className="toggle-icon">🌍</div>
                <div className="toggle-content">
                  <h2>Real World Applications</h2>
                  <p>See where each domain is actually used in the real world</p>
                </div>
                <button className="toggle-btn">
                  {showRealWorld ? '▼ Close' : 'Explore Now →'}
                </button>
              </div>
            </div>

            {showRealWorld && (
              <div className="real-world-content">
                <div className="domain-tabs">
                  {allDomains.map((domain) => (
                    <button
                      key={domain.id}
                      className={`domain-tab ${selectedDomain === domain.id ? 'active' : ''}`}
                      onClick={() => setSelectedDomain(domain.id)}
                    >
                      <span className="tab-icon">{domain.icon}</span>
                      <span className="tab-name">{domain.name}</span>
                    </button>
                  ))}
                </div>

                {allDomains.find(d => d.id === selectedDomain)?.realWorld && (
                  <div className="real-world-details">
                    <div className="real-world-grid">
                      <div className="rw-card">
                        <h3>🏢 Industries</h3>
                        <div className="rw-list">
                          {allDomains.find(d => d.id === selectedDomain).realWorld.industries.map((industry, idx) => (
                            <span key={idx} className="rw-tag">{industry}</span>
                          ))}
                        </div>
                      </div>

                      <div className="rw-card">
                        <h3>💼 Job Roles & Salary</h3>
                        <div className="job-list">
                          {allDomains.find(d => d.id === selectedDomain).realWorld.jobRoles.map((job, idx) => (
                            <div key={idx} className="job-item">
                              <span className="job-title">{job.title}</span>
                              <span className="job-salary">{job.salary}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rw-card">
                        <h3>🛠️ Tools Used in Industry</h3>
                        <div className="rw-list">
                          {allDomains.find(d => d.id === selectedDomain).realWorld.tools.map((tool, idx) => (
                            <span key={idx} className="rw-tag tool-tag">{tool}</span>
                          ))}
                        </div>
                      </div>

                      <div className="rw-card">
                        <h3>🏆 Top Companies Hiring</h3>
                        <div className="rw-list">
                          {allDomains.find(d => d.id === selectedDomain).realWorld.companies.map((company, idx) => (
                            <span key={idx} className="rw-tag company-tag">{company}</span>
                          ))}
                        </div>
                      </div>

                      <div className="rw-card">
                        <h3>🔨 Real Projects You Can Build</h3>
                        <div className="project-list">
                          {allDomains.find(d => d.id === selectedDomain).realWorld.projects.map((project, idx) => (
                            <div key={idx} className="project-item">
                              <span className="project-number">{idx + 1}</span>
                              <span className="project-name">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rw-footer">
                      <div className="demand-indicator">
                        <span className={`demand-badge ${allDomains.find(d => d.id === selectedDomain).realWorld.demand.toLowerCase()}`}>
                          {allDomains.find(d => d.id === selectedDomain).realWorld.demand === 'High' && '📈 High Demand'}
                          {allDomains.find(d => d.id === selectedDomain).realWorld.demand === 'Stable' && '✅ Stable'}
                          {allDomains.find(d => d.id === selectedDomain).realWorld.demand === 'Niche' && '⚠️ Niche'}
                        </span>
                      </div>
                      <button 
                        className="btn btn-success"
                        onClick={() => navigate(`/domain/${selectedDomain}`)}
                      >
                        Start Learning This Domain →
                      </button>
                    </div>
                  </div>
                )}
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
