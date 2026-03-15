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
    // Missed a day — reset streak
    newStreak = 1;
  }

  localStorage.setItem('streak', newStreak.toString());
  localStorage.setItem('lastVisit', today);

  // Track streak history (array of ISO date strings)
  const history = JSON.parse(localStorage.getItem('streakHistory') || '[]');
  const todayISO = new Date().toISOString().split('T')[0];
  if (!history.includes(todayISO)) {
    history.push(todayISO);
    // Keep only last 90 days
    const trimmed = history.slice(-90);
    localStorage.setItem('streakHistory', JSON.stringify(trimmed));
  }

  // Award streak XP (inline to avoid circular import)
  const xpPerDay = 15;
  const currentXP = parseInt(localStorage.getItem('userXP') || '0');
  let bonus = 0;
  if (newStreak === 7)  bonus = 50;
  if (newStreak === 30) bonus = 200;
  localStorage.setItem('userXP', (currentXP + xpPerDay + bonus).toString());

  return newStreak;
};

export const getStreak = () => {
  return parseInt(localStorage.getItem('streak') || '0');
};

export const getStreakHistory = () => {
  return JSON.parse(localStorage.getItem('streakHistory') || '[]');
};

// Returns last 30 days with active/inactive status
export const getLast30Days = () => {
  const history = getStreakHistory();
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().split('T')[0];
    days.push({ date: iso, active: history.includes(iso), dayNum: 30 - i });
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
