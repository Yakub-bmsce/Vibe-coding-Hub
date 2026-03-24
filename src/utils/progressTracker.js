export const updateStreak = () => {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  const currentStreak = parseInt(localStorage.getItem('streak') || '0');

  if (lastVisit === today) {
    return currentStreak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  let newStreak;
  if (lastVisit === yesterdayStr) {
    newStreak = currentStreak + 1;
  } else {
    // Missed a day — reset streak, start new session
    newStreak = 1;
    // Archive current session and start fresh
    _startNewStreakSession();
  }

  localStorage.setItem('streak', newStreak.toString());
  localStorage.setItem('lastVisit', today);

  // Append today to the current session
  _appendToCurrentSession(today);

  // Award streak XP (inline to avoid circular import)
  const xpPerDay = 15;
  const currentXP = parseInt(localStorage.getItem('userXP') || '0');
  let bonus = 0;
  if (newStreak === 7)  bonus = 50;
  if (newStreak === 30) bonus = 200;
  localStorage.setItem('userXP', (currentXP + xpPerDay + bonus).toString());

  return newStreak;
};

// Start a new streak session (called on reset)
const _startNewStreakSession = () => {
  const sessions = JSON.parse(localStorage.getItem('streakSessions') || '[]');
  sessions.push([]); // new empty session
  localStorage.setItem('streakSessions', JSON.stringify(sessions));
};

// Append a date string to the latest session
const _appendToCurrentSession = (dateStr) => {
  const sessions = JSON.parse(localStorage.getItem('streakSessions') || '[]');
  if (sessions.length === 0) sessions.push([]);
  const current = sessions[sessions.length - 1];
  if (!current.includes(dateStr)) {
    current.push(dateStr);
    sessions[sessions.length - 1] = current;
    localStorage.setItem('streakSessions', JSON.stringify(sessions));
  }
};

export const getStreak = () => {
  return parseInt(localStorage.getItem('streak') || '0');
};

// Returns the current streak session as array of day objects:
// { dayNum: 1, date: 'Mon Jan 01 2025', active: true/false }
// Always shows up to 30 slots. Active days = days learned. Inactive = gaps (missed).
export const getStreakDays = () => {
  const sessions = JSON.parse(localStorage.getItem('streakSessions') || '[]');
  const currentSession = sessions.length > 0 ? sessions[sessions.length - 1] : [];
  const streak = parseInt(localStorage.getItem('streak') || '0');

  // Build 30 slots: first `streak` are active (learned days), rest are future/empty
  const days = [];
  for (let i = 1; i <= 30; i++) {
    days.push({
      dayNum: i,
      active: i <= streak,
      isToday: i === streak,
      date: currentSession[i - 1] || null
    });
  }
  return days;
};

export const trackLessonProgress = (lessonId, completed = false) => {
  const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
  progress[lessonId] = { completed, lastAccessed: new Date().toISOString() };
  localStorage.setItem('lessonProgress', JSON.stringify(progress));
};

export const getLessonProgress = (lessonId) => {
  const progress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
  return progress[lessonId] || { completed: false };
};

export const trackQuizScore = (quizId, score, totalQuestions) => {
  const quizzes = JSON.parse(localStorage.getItem('quizScores') || '{}');
  quizzes[quizId] = {
    score,
    totalQuestions,
    percentage: (score / totalQuestions) * 100,
    date: new Date().toISOString()
  };
  localStorage.setItem('quizScores', JSON.stringify(quizzes));
  return quizzes[quizId].percentage;
};

export const getQuizHistory = () => {
  return JSON.parse(localStorage.getItem('quizScores') || '{}');
};

export const unlockBadge = (badgeId) => {
  const badges = JSON.parse(localStorage.getItem('unlockedBadges') || '[]');
  if (!badges.includes(badgeId)) {
    badges.push(badgeId);
    localStorage.setItem('unlockedBadges', JSON.stringify(badges));
    return true;
  }
  return false;
};

export const getUnlockedBadges = () => {
  return JSON.parse(localStorage.getItem('unlockedBadges') || '[]');
};
