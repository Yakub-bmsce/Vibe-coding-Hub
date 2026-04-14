import React, { useEffect, useState } from 'react';
import '../styles/SplashScreen.css';

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('enter'); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 4500);  // hold for ~4.5s
    const t3 = setTimeout(() => onDone(), 5200);           // total ~5.2s
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`splash-screen ${phase}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <span className="splash-icon">⚡</span>
          <h1 className="splash-title">Vibe Learner</h1>
        </div>
        <p className="splash-tagline">AI-Powered Learning Platform</p>
        <div className="splash-bar">
          <div className="splash-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
