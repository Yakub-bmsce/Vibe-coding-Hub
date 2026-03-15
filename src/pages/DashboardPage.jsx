import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCurrentLevel, getProgressToNextLevel, getLearnerCategory, RANKS, getUnlockedRanks } from '../utils/xpSystem';
import { updateStreak, getLast30Days } from '../utils/progressTracker';
import { generateClassRecovery } from '../api/groqAI';
import { searchDomains, getAllDomains } from '../data/domains';
import '../styles/DashboardPage.css';

// ── Modals ──────────────────────────────────────────────────────────────────

const LearnerModal = ({ onClose }) => {
  const category = getLearnerCategory();
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  const streak = parseInt(localStorage.getItem('streak') || '0');
  const quizzes = Object.values(JSON.parse(localStorage.getItem('quizScores') || '{}'));
  const avgScore = quizzes.length
    ? Math.round(quizzes.reduce((a, b) => a + b.percentage, 0) / quizzes.length)
    : 0;

  const catMap = {
    Beginner:     { icon: '🌱', desc: 'You are just getting started. Keep going!', cls: 'beginner',
      tips: ['Complete at least 1 topic per day', 'Focus on fundamentals first', 'Use the quiz to test yourself'] },
    Intermediate: { icon: '🚀', desc: 'Good progress! You have solid foundations.', cls: 'intermediate',
      tips: ['Try harder quiz questions', 'Build small projects', 'Maintain your daily streak'] },
    Advanced:     { icon: '⚡', desc: 'Impressive! You are performing at a high level.', cls: 'advanced',
      tips: ['Tackle system design topics', 'Contribute to open source', 'Mentor others in the community'] }
  };
  const info = catMap[category];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🏆 Your Learner Profile</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className={`learner-category ${info.cls}`}>
          <div className="cat-icon">{info.icon}</div>
          <p className="cat-title">{category}</p>
          <p className="cat-desc">{info.desc}</p>
        </div>
        <div className="learner-stats">
          <div className="ls-item"><div className="ls-val">{xp}</div><div className="ls-lbl">Total XP</div></div>
          <div className="ls-item"><div className="ls-val">{streak}</div><div className="ls-lbl">Day Streak</div></div>
          <div className="ls-item"><div className="ls-val">{avgScore}%</div><div className="ls-lbl">Avg Quiz</div></div>
        </div>
        <div className="learner-tips">
          <h4>💡 Tips for {category}s</h4>
          <ul>{info.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      </div>
    </div>
  );
};

const StreakModal = ({ streak, onClose }) => {
  const days = getLast30Days();
  const todayISO = new Date().toISOString().split('T')[0];
  const activeDays = days.filter(d => d.active).length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔥 Streak Calendar</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="streak-summary">
          <div className="streak-stat"><div className="ss-val">{streak}</div><div className="ss-lbl">Current Streak</div></div>
          <div className="streak-stat"><div className="ss-val">{activeDays}</div><div className="ss-lbl">Days Active (30d)</div></div>
          <div className="streak-stat"><div className="ss-val">{30 - activeDays}</div><div className="ss-lbl">Days Missed</div></div>
        </div>
        <div className="streak-calendar">
          {days.map((d) => (
            <div
              key={d.date}
              className={`cal-day ${d.active ? 'active' : 'inactive'} ${d.date === todayISO ? 'today' : ''}`}
              title={d.date}
            >
              <span className="day-num">{d.dayNum}</span>
              <span className="day-dot">{d.active ? '✓' : '·'}</span>
            </div>
          ))}
        </div>
        <div className="streak-legend">
          <span><span className="legend-dot active"></span>Active day</span>
          <span><span className="legend-dot inactive"></span>Missed day</span>
        </div>
        <p style={{ color: 'rgba(233,179,255,0.6)', fontSize: '0.85rem', marginTop: '1rem' }}>
          ⚠️ Missing even one day resets your streak back to Day 1.
        </p>
      </div>
    </div>
  );
};

const XPModal = ({ onClose }) => {
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  const streak = parseInt(localStorage.getItem('streak') || '0');
  const unlockedIds = getUnlockedRanks();
  const currentRank = [...RANKS].reverse().find(r => unlockedIds.includes(r.id)) || null;
  const nextRank = RANKS.find(r => !unlockedIds.includes(r.id)) || null;
  const daysToNext = nextRank ? nextRank.streakRequired - streak : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚡ XP & Rank System</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="rank-current">
          {currentRank ? (
            <>
              <div className="rank-icon">{currentRank.icon}</div>
              <div className="rank-name">{currentRank.name}</div>
              <div className="rank-xp">{xp} XP earned</div>
            </>
          ) : (
            <>
              <div className="rank-icon">🎯</div>
              <div className="rank-name">Unranked</div>
              <div className="rank-xp">{xp} XP</div>
              <div className="rank-none">Complete a 30-day streak to earn Bronze rank!</div>
            </>
          )}
        </div>

        {nextRank && (
          <div className="next-rank-progress">
            <h4>Next Rank: {nextRank.icon} {nextRank.name}</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min((streak / nextRank.streakRequired) * 100, 100)}%` }}></div>
            </div>
            <p>{streak} / {nextRank.streakRequired} streak days — {daysToNext} more days to go</p>
          </div>
        )}

        <div className="rank-ladder">
          <h4>🏅 Rank Ladder</h4>
          {RANKS.map(rank => (
            <div key={rank.id} className={`rank-row ${unlockedIds.includes(rank.id) ? 'unlocked' : 'locked'}`}>
              <span className="rr-icon">{rank.icon}</span>
              <span className="rr-name">{rank.name}</span>
              <span className="rr-req">{rank.streakRequired}d streak</span>
              <span className="rr-xp">+{rank.xpBonus} XP</span>
              {unlockedIds.includes(rank.id) && <span style={{ color: '#34d399', fontSize: '0.8rem' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Dashboard ───────────────────────────────────────────────────────────

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
  const [activeModal, setActiveModal] = useState(null); // 'learner' | 'streak' | 'xp'
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
    { title: 'Learn by Concepts', description: 'Master topics with structured lessons and practice', icon: '📚', path: '/concepts' },
    { title: 'Learn by Videos & Roadmaps', description: 'Follow curated video tutorials and learning paths', icon: '🎥', path: '/videos' },
    { title: 'Learn by Games', description: 'Practice through interactive games and challenges', icon: '🎮', path: '/games' }
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <Sidebar />

      {activeModal === 'learner' && <LearnerModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'streak' && <StreakModal streak={streak} onClose={() => setActiveModal(null)} />}
      {activeModal === 'xp' && <XPModal onClose={() => setActiveModal(null)} />}

      <main className="dashboard-content">
        <div className="container">

          <section className="hero-section fade-in">
            <h1 className="gradient-text">Welcome to Vibe Learning Hub</h1>
            <p className="hero-subtitle">Your AI-powered learning companion</p>
          </section>

          <section className="stats-section">
            <div className="stat-card" onClick={() => setActiveModal('learner')} title="Click to see your learner profile">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <h3>{level?.title || 'Beginner'}</h3>
                <p>Level {level?.level || 1} · Tap to view</p>
              </div>
            </div>

            <div className="stat-card" onClick={() => setActiveModal('streak')} title="Click to see streak calendar">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <h3>{streak} Days</h3>
                <p>Learning Streak · Tap to view</p>
              </div>
            </div>

            <div className="stat-card" onClick={() => setActiveModal('xp')} title="Click to see XP & ranks">
              <div className="stat-icon">⚡</div>
              <div className="stat-info">
                <h3>{localStorage.getItem('userXP') || 0} XP</h3>
                <p>Total Experience · Tap to view</p>
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
                    <div key={domain.id} className="search-result-item" onClick={() => handleDomainSelect(domain.id)}>
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

            <div className="ai-help-divider"><span>Or ask AI for help</span></div>
            <p>Describe what you didn't understand</p>
            <div className="search-box">
              <input
                type="text"
                placeholder="e.g., Today my teacher taught recursion but I didn't understand"
                onKeyDown={(e) => { if (e.key === 'Enter') handleClassRecovery(); }}
              />
              <button onClick={handleClassRecovery} className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get Help'}
              </button>
            </div>
            {recoveryResult && (
              <div className="recovery-result card"><pre>{recoveryResult}</pre></div>
            )}
          </section>

          <section className="real-world-section">
            <div className="real-world-toggle-card card" onClick={() => setShowRealWorld(!showRealWorld)}>
              <div className="toggle-header">
                <div className="toggle-icon">🌍</div>
                <div className="toggle-content">
                  <h2>Real World Applications</h2>
                  <p>See where each domain is actually used in the real world</p>
                </div>
                <button className="toggle-btn">{showRealWorld ? '▼ Close' : 'Explore Now →'}</button>
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

                {allDomains.find(d => d.id === selectedDomain)?.realWorld && (() => {
                  const rw = allDomains.find(d => d.id === selectedDomain).realWorld;
                  return (
                    <div className="real-world-details">
                      <div className="real-world-grid">
                        <div className="rw-card">
                          <h3>🏢 Industries</h3>
                          <div className="rw-list">{rw.industries.map((x, i) => <span key={i} className="rw-tag">{x}</span>)}</div>
                        </div>
                        <div className="rw-card">
                          <h3>💼 Job Roles & Salary</h3>
                          <div className="job-list">{rw.jobRoles.map((j, i) => (
                            <div key={i} className="job-item">
                              <span className="job-title">{j.title}</span>
                              <span className="job-salary">{j.salary}</span>
                            </div>
                          ))}</div>
                        </div>
                        <div className="rw-card">
                          <h3>🛠️ Tools Used in Industry</h3>
                          <div className="rw-list">{rw.tools.map((t, i) => <span key={i} className="rw-tag tool-tag">{t}</span>)}</div>
                        </div>
                        <div className="rw-card">
                          <h3>🏆 Top Companies Hiring</h3>
                          <div className="rw-list">{rw.companies.map((c, i) => <span key={i} className="rw-tag company-tag">{c}</span>)}</div>
                        </div>
                        <div className="rw-card">
                          <h3>🔨 Real Projects You Can Build</h3>
                          <div className="project-list">{rw.projects.map((p, i) => (
                            <div key={i} className="project-item">
                              <span className="project-number">{i + 1}</span>
                              <span className="project-name">{p}</span>
                            </div>
                          ))}</div>
                        </div>
                      </div>
                      <div className="rw-footer">
                        <div className="demand-indicator">
                          <span className={`demand-badge ${rw.demand.toLowerCase()}`}>
                            {rw.demand === 'High' && '📈 High Demand'}
                            {rw.demand === 'Stable' && '✅ Stable'}
                            {rw.demand === 'Niche' && '⚠️ Niche'}
                          </span>
                        </div>
                        <button className="btn btn-success" onClick={() => navigate(`/domain/${selectedDomain}`)}>
                          Start Learning This Domain →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </section>

          <section className="learning-paths">
            <h2>Choose Your Learning Path</h2>
            <div className="paths-grid">
              {learningPaths.map((path, idx) => (
                <div key={idx} className="path-card card" onClick={() => navigate(path.path)}>
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
