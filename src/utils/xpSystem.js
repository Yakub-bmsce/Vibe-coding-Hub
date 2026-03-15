export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  QUIZ_PASS: 30,
  GAME_WIN: 40,
  DAILY_LOGIN: 10,
  PERFECT_SCORE: 100,
  STREAK_DAY: 15,       // XP per streak day
  STREAK_BONUS_7: 50,   // Bonus at 7-day streak
  STREAK_BONUS_30: 200  // Bonus at 30-day streak
};

export const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Beginner' },
  { level: 2, xpRequired: 100, title: 'Learner' },
  { level: 3, xpRequired: 250, title: 'Student' },
  { level: 4, xpRequired: 500, title: 'Developer' },
  { level: 5, xpRequired: 1000, title: 'Expert' },
  { level: 6, xpRequired: 2000, title: 'Master' },
  { level: 7, xpRequired: 4000, title: 'Legend' }
];

// Rank ladder based on streak milestones
export const RANKS = [
  { id: 'bronze',      name: 'Bronze',      icon: '🥉', streakRequired: 30,  xpBonus: 300,  color: '#cd7f32' },
  { id: 'silver',      name: 'Silver',      icon: '🥈', streakRequired: 60,  xpBonus: 500,  color: '#c0c0c0' },
  { id: 'gold',        name: 'Gold',        icon: '🥇', streakRequired: 90,  xpBonus: 800,  color: '#ffd700' },
  { id: 'platinum',    name: 'Platinum',    icon: '💎', streakRequired: 120, xpBonus: 1200, color: '#e5e4e2' },
  { id: 'diamond',     name: 'Diamond',     icon: '💠', streakRequired: 180, xpBonus: 2000, color: '#b9f2ff' },
  { id: 'elite',       name: 'Elite',       icon: '🌟', streakRequired: 270, xpBonus: 3500, color: '#ff6b6b' },
  { id: 'grandmaster', name: 'Grandmaster', icon: '👑', streakRequired: 365, xpBonus: 5000, color: '#a855f7' }
];

export const BADGES = [
  { id: 'first_lesson', name: 'First Steps',   description: 'Complete your first lesson', icon: '🎯' },
  { id: 'streak_7',     name: 'Week Warrior',  description: '7 day streak',               icon: '🔥' },
  { id: 'streak_30',    name: 'Month Master',  description: '30 day streak',              icon: '⭐' },
  { id: 'perfect_quiz', name: 'Perfect Score', description: 'Get 100% on a quiz',         icon: '💯' },
  { id: 'game_master',  name: 'Game Master',   description: 'Win 10 games',               icon: '🏆' }
];

export const addXP = (amount) => {
  const currentXP = parseInt(localStorage.getItem('userXP') || '0');
  const newXP = currentXP + amount;
  localStorage.setItem('userXP', newXP.toString());
  return newXP;
};

// Called each day when streak updates
export const addStreakXP = (streakDays) => {
  let xpToAdd = XP_REWARDS.STREAK_DAY;
  if (streakDays === 7)  xpToAdd += XP_REWARDS.STREAK_BONUS_7;
  if (streakDays === 30) xpToAdd += XP_REWARDS.STREAK_BONUS_30;
  addXP(xpToAdd);

  // Check rank milestones
  const totalStreak = parseInt(localStorage.getItem('totalStreakDays') || '0') + 1;
  localStorage.setItem('totalStreakDays', totalStreak.toString());
  checkRankUnlock(totalStreak);
};

const checkRankUnlock = (totalDays) => {
  const unlockedRanks = JSON.parse(localStorage.getItem('unlockedRanks') || '[]');
  RANKS.forEach(rank => {
    if (totalDays >= rank.streakRequired && !unlockedRanks.includes(rank.id)) {
      unlockedRanks.push(rank.id);
      localStorage.setItem('unlockedRanks', JSON.stringify(unlockedRanks));
      addXP(rank.xpBonus);
    }
  });
};

export const getCurrentRank = () => {
  const streak = parseInt(localStorage.getItem('streak') || '0');
  let current = null;
  for (const rank of RANKS) {
    if (streak >= rank.streakRequired) current = rank;
  }
  return current;
};

export const getNextRank = () => {
  const streak = parseInt(localStorage.getItem('streak') || '0');
  return RANKS.find(r => r.streakRequired > streak) || null;
};

export const getUnlockedRanks = () => {
  return JSON.parse(localStorage.getItem('unlockedRanks') || '[]');
};

export const getCurrentLevel = () => {
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) return LEVELS[i];
  }
  return LEVELS[0];
};

export const getProgressToNextLevel = () => {
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  const currentLevel = getCurrentLevel();
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);
  if (!nextLevel) return 100;
  const progress = ((xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100;
  return Math.min(progress, 100);
};

export const getLearnerCategory = () => {
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  const streak = parseInt(localStorage.getItem('streak') || '0');
  const quizzes = JSON.parse(localStorage.getItem('quizScores') || '{}');
  const avgScore = Object.values(quizzes).length
    ? Object.values(quizzes).reduce((a, b) => a + b.percentage, 0) / Object.values(quizzes).length
    : 0;

  if (xp >= 1000 || streak >= 30 || avgScore >= 80) return 'Advanced';
  if (xp >= 300 || streak >= 7 || avgScore >= 50) return 'Intermediate';
  return 'Beginner';
};
