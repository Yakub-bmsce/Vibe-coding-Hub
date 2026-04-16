import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../styles/LeaderboardPage.css';

// Generate mock leaderboard data + include current user
const generateLeaderboard = (currentUser, userXP, userStreak) => {
  const mock = [
    { name: 'Arjun S',    xp: 4200, streak: 45, badge: '👑', rank: 'Grandmaster' },
    { name: 'Priya M',    xp: 3800, streak: 38, badge: '🌟', rank: 'Elite' },
    { name: 'Rahul K',    xp: 3100, streak: 32, badge: '💠', rank: 'Diamond' },
    { name: 'Sneha R',    xp: 2600, streak: 28, badge: '💎', rank: 'Platinum' },
    { name: 'Vikram N',   xp: 2100, streak: 22, badge: '🥇', rank: 'Gold' },
    { name: 'Ananya T',   xp: 1700, streak: 18, badge: '🥈', rank: 'Silver' },
    { name: 'Karthik B',  xp: 1200, streak: 14, badge: '🥉', rank: 'Bronze' },
    { name: 'Divya P',    xp: 850,  streak: 10, badge: '🔥', rank: 'Learner' },
    { name: 'Arun V',     xp: 520,  streak: 6,  badge: '⚡', rank: 'Student' },
  ];

  const me = {
    name: currentUser || 'You',
    xp: userXP,
    streak: userStreak,
    badge: '🎯',
    rank: 'You',
    isMe: true
  };

  const all = [...mock, me].sort((a, b) => b.xp - a.xp);
  return all.map((u, i) => ({ ...u, position: i + 1 }));
};

const LeaderboardPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('xp'); // 'xp' | 'streak'
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  const streak = parseInt(localStorage.getItem('streak') || '0');
  const username = user?.name || 'You';

  const [board, setBoard] = useState([]);

  useEffect(() => {
    const data = generateLeaderboard(username, xp, streak);
    setBoard(data);
  }, [username, xp, streak]);

  const sorted = [...board].sort((a, b) =>
    tab === 'xp' ? b.xp - a.xp : b.streak - a.streak
  ).map((u, i) => ({ ...u, position: i + 1 }));

  const myPos = sorted.find(u => u.isMe);

  const medalColor = (pos) => {
    if (pos === 1) return '#ffd700';
    if (pos === 2) return '#c0c0c0';
    if (pos === 3) return '#cd7f32';
    return 'rgba(183,148,246,0.4)';
  };

  return (
    <div className="lb-page">
      <Navbar />
      <Sidebar />
      <main className="lb-content">
        <div className="container">
          <div className="lb-header">
            <h1>🏆 Leaderboard</h1>
            <p>Top learners ranked by XP and streaks</p>
          </div>

          {myPos && (
            <div className="lb-my-rank">
              <span className="lb-my-pos">#{myPos.position}</span>
              <span className="lb-my-name">Your Rank</span>
              <span className="lb-my-xp">⚡ {myPos.xp} XP</span>
              <span className="lb-my-streak">🔥 {myPos.streak} days</span>
            </div>
          )}

          <div className="lb-tabs">
            <button className={`lb-tab ${tab === 'xp' ? 'active' : ''}`} onClick={() => setTab('xp')}>⚡ By XP</button>
            <button className={`lb-tab ${tab === 'streak' ? 'active' : ''}`} onClick={() => setTab('streak')}>🔥 By Streak</button>
          </div>

          <div className="lb-list">
            {sorted.map((u) => (
              <div key={u.name} className={`lb-row ${u.isMe ? 'me' : ''} ${u.position <= 3 ? 'top3' : ''}`}>
                <div className="lb-pos" style={{ color: medalColor(u.position) }}>
                  {u.position <= 3 ? ['🥇','🥈','🥉'][u.position - 1] : `#${u.position}`}
                </div>
                <div className="lb-avatar">{u.name.charAt(0).toUpperCase()}</div>
                <div className="lb-info">
                  <span className="lb-name">{u.name} {u.isMe && <span className="lb-you-tag">You</span>}</span>
                  <span className="lb-rank-label">{u.badge} {u.rank}</span>
                </div>
                <div className="lb-stats">
                  <span className="lb-xp">⚡ {u.xp} XP</span>
                  <span className="lb-streak">🔥 {u.streak}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
