export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  QUIZ_PASS: 30,
  GAME_WIN: 40,
  DAILY_LOGIN: 10,
  PERFECT_SCORE: 100
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

export const BADGES = [
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯' },
  { id: 'streak_7', name: 'Week Warrior', description: '7 day streak', icon: '🔥' },
  { id: 'streak_30', name: 'Month Master', description: '30 day streak', icon: '⭐' },
  { id: 'perfect_quiz', name: 'Perfect Score', description: 'Get 100% on a quiz', icon: '💯' },
  { id: 'game_master', name: 'Game Master', description: 'Win 10 games', icon: '🏆' }
];

export const addXP = (amount) => {
  const currentXP = parseInt(localStorage.getItem('userXP') || '0');
  const newXP = currentXP + amount;
  localStorage.setItem('userXP', newXP.toString());
  checkLevelUp(newXP);
  return newXP;
};

export const getCurrentLevel = () => {
  const xp = parseInt(localStorage.getItem('userXP') || '0');
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
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

const checkLevelUp = (newXP) => {
  const oldLevel = getCurrentLevel();
  const newLevel = LEVELS.find(l => newXP >= l.xpRequired && newXP < (LEVELS[l.level] || Infinity)?.xpRequired);
  
  if (newLevel && newLevel.level > oldLevel.level) {
    return true;
  }
  return false;
};
