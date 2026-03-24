import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getCurrentLevel, getProgressToNextLevel, getLearnerCategory, RANKS, getUnlockedRanks } from '../utils/xpSystem';
import { updateStreak, getLast30Days } from '../utils/progressTracker';
import { generateClassRecovery } from '../api/groqAI';
import { getAllDomains, searchDomains, findTopicMatch } from '../data/domains';
import '../styles/DashboardPage.css';

// ── Modals ───────────────────────────────────────────────────────────────────

const LearnerModal = ({ onClose }) => {
  const category = getLearnerCategory();
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  const streak = parseInt(localStorage.getItem('streak') || '0');
  const quizzes = Object.values(JSON.parse(localStorage.getItem('quizScores') || '{}'));
  const avgScore = quizzes.length
    ? Math.round(quizzes.reduce((a, b) => a + b.percentage, 0) / quizzes.length) : 0;

  const catMap = {
    Beginner:     { icon: '🌱', cls: 'beginner',     desc: 'Just getting started. Keep going!',
      tips: ['Complete at least 1 topic per day', 'Focus on fundamentals first', 'Use the quiz to test yourself'] },
    Intermediate: { icon: '🚀', cls: 'intermediate', desc: 'Good progress! Solid foundations.',
      tips: ['Try harder quiz questions', 'Build small projects', 'Maintain your daily streak'] },
    Advanced:     { icon: '⚡', cls: 'advanced',     desc: 'Impressive! High-level performance.',
      tips: ['Tackle system design topics', 'Contribute to open source', 'Mentor others'] }
  };
  const info = catMap[category];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🏆 Learner Profile</h2>
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
          <div className="streak-stat"><div className="ss-val">{activeDays}</div><div className="ss-lbl">Active (30d)</div></div>
          <div className="streak-stat"><div className="ss-val">{30 - activeDays}</div><div className="ss-lbl">Missed</div></div>
        </div>
        <div className="streak-calendar">
          {days.map((d) => (
            <div key={d.date} className={`cal-day ${d.active ? 'active' : 'inactive'} ${d.date === todayISO ? 'today' : ''}`} title={d.date}>
              <span className="day-num">{d.dayNum}</span>
              <span className="day-dot">{d.active ? '✓' : '·'}</span>
            </div>
          ))}
        </div>
        <div className="streak-legend">
          <span><span className="legend-dot active"></span>Active</span>
          <span><span className="legend-dot inactive"></span>Missed</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginTop: '1rem' }}>
          ⚠️ Missing even one day resets your streak to Day 1.
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
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚡ XP & Rank System</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="rank-current">
          {currentRank ? (
            <><div className="rank-icon">{currentRank.icon}</div><div className="rank-name">{currentRank.name}</div><div className="rank-xp">{xp} XP earned</div></>
          ) : (
            <><div className="rank-icon">🎯</div><div className="rank-name">Unranked</div><div className="rank-xp">{xp} XP</div><div className="rank-none">Complete a 30-day streak to earn Bronze!</div></>
          )}
        </div>
        {nextRank && (
          <div className="next-rank-progress">
            <h4>Next: {nextRank.icon} {nextRank.name}</h4>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min((streak / nextRank.streakRequired) * 100, 100)}%` }}></div></div>
            <p>{streak} / {nextRank.streakRequired} days — {nextRank.streakRequired - streak} more to go</p>
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
              {unlockedIds.includes(rank.id) && <span style={{ color: 'var(--success)', fontSize: '0.8rem' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [level, setLevel] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [recoveryResult, setRecoveryResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRealWorld, setShowRealWorld] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('programming-languages');
  const [activeModal, setActiveModal] = useState(null);
  const searchRef = useRef(null);
  const allDomains = getAllDomains();

  useEffect(() => {
    setLevel(getCurrentLevel());
    setProgress(getProgressToNextLevel());
    setStreak(updateStreak());
    setXp(parseInt(localStorage.getItem('userXP') || '0'));
  }, []);

  // Live search dropdown
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchDomains(searchQuery).slice(0, 6);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Smart search: topic → navigate, sentence → AI help
  const handleSmartSearch = async () => {
    if (!searchQuery.trim()) return;

    // Check if it matches a domain
    const domainMatch = allDomains.find(d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (domainMatch) { navigate(`/domain/${domainMatch.id}`); return; }

    // Check if it matches a topic
    const topicMatch = findTopicMatch(searchQuery);
    if (topicMatch) {
      navigate(`/topic/${topicMatch.domain.id}/${topicMatch.topic.id}`);
      return;
    }

    // Otherwise treat as class recovery (AI help)
    setIsLoading(true);
    setRecoveryResult(null);
    try {
      const result = await generateClassRecovery(searchQuery);
      setRecoveryResult(result);
    } catch (err) {
      setRecoveryResult({ explanation: 'Could not load. Check your Groq API key.', analogy: '', practiceQuestion: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const learningPaths = [
    { title: 'Learn by Concepts', description: 'Structured lessons and practice', icon: '📚', path: '/concepts' },
    { title: 'Videos & Roadmaps', description: 'Curated video tutorials', icon: '🎥', path: '/videos' },
    { title: 'Learn by Games', description: 'Interactive games and challenges', icon: '🎮', path: '/games' }
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

          {/* ── Stat row ── */}
          <section className="streak-row-section">
            <div className="streak-row">
              <div className="streak-item clickable" onClick={() => setActiveModal('learner')}>
                🏆 <span>Level {level?.level || 1} · {level?.title || 'Beginner'}</span>
              </div>
              <div className="streak-item clickable" onClick={() => setActiveModal('streak')}>
                🔥 <span>{streak} Day Streak</span>
              </div>
              <div className="streak-item clickable" onClick={() => setActiveModal('xp')}>
                ⚡ <span>{xp} XP</span>
              </div>
            </div>
            <div className="progress-bar slim">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="progress-label">{Math.round(progress)}% to next level</p>
          </section>

          {/* ── Smart search ── */}
          <section className="search-section">
            <h2>What do you want to learn today?</h2>
            <p className="search-hint">Search a topic, domain, or describe what you didn't understand in class</p>
            <div className="smart-search-wrap" ref={searchRef}>
              <div className="smart-search-box">
                <span className="search-icon-left">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSmartSearch(); }}
                  placeholder="e.g., Python, recursion, or 'I didn't understand pointers today'..."
                  onFocus={() => searchQuery.trim().length > 1 && setShowDropdown(true)}
                />
                <button className="btn btn-primary search-go-btn" onClick={handleSmartSearch} disabled={isLoading}>
                  {isLoading ? '...' : 'Go →'}
                </button>
              </div>

              {showDropdown && searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((domain) => (
                    <div key={domain.id} className="search-result-item" onClick={() => { navigate(`/domain/${domain.id}`); setShowDropdown(false); setSearchQuery(''); }}>
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

            {recoveryResult && (
              <div className="recovery-result card">
                {recoveryResult.explanation && <><h4>💡 Explanation</h4><p>{recoveryResult.explanation}</p></>}
                {recoveryResult.analogy && <><h4>🌍 Analogy</h4><p>{recoveryResult.analogy}</p></>}
                {recoveryResult.practiceQuestion && <><h4>✏️ Practice Question</h4><p>{recoveryResult.practiceQuestion}</p></>}
              </div>
            )}
          </section>

          {/* ── Real World Applications ── */}
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
                    <button key={domain.id} className={`domain-tab ${selectedDomain === domain.id ? 'active' : ''}`} onClick={() => setSelectedDomain(domain.id)}>
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
                        <div className="rw-card"><h3>🏢 Industries</h3><div className="rw-list">{rw.industries.map((x, i) => <span key={i} className="rw-tag">{x}</span>)}</div></div>
                        <div className="rw-card"><h3>💼 Job Roles & Salary</h3><div className="job-list">{rw.jobRoles.map((j, i) => <div key={i} className="job-item"><span className="job-title">{j.title}</span><span className="job-salary">{j.salary}</span></div>)}</div></div>
                        <div className="rw-card"><h3>🛠️ Tools</h3><div className="rw-list">{rw.tools.map((t, i) => <span key={i} className="rw-tag tool-tag">{t}</span>)}</div></div>
                        <div className="rw-card"><h3>🏆 Top Companies</h3><div className="rw-list">{rw.companies.map((c, i) => <span key={i} className="rw-tag company-tag">{c}</span>)}</div></div>
                        <div className="rw-card"><h3>🔨 Projects to Build</h3><div className="project-list">{rw.projects.map((p, i) => <div key={i} className="project-item"><span className="project-number">{i + 1}</span><span className="project-name">{p}</span></div>)}</div></div>
                      </div>
                      <div className="rw-footer">
                        <span className={`demand-badge ${rw.demand.toLowerCase()}`}>
                          {rw.demand === 'High' && '📈 High Demand'}
                          {rw.demand === 'Stable' && '✅ Stable'}
                          {rw.demand === 'Niche' && '⚠️ Niche'}
                        </span>
                        <button className="btn btn-success" onClick={() => navigate(`/domain/${selectedDomain}`)}>Start Learning →</button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </section>

          {/* ── Learning paths ── */}
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
