import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllDomains } from '../data/domains';
import '../styles/VisualLearningPage.css';

const VISUAL_TYPES = [
  { id: 'mindmap',  icon: '🧠', label: 'Mind Maps',       desc: 'Visual concept connections' },
  { id: 'flowchart',icon: '🔀', label: 'Flowcharts',      desc: 'Step-by-step logic flows' },
  { id: 'diagram',  icon: '📊', label: 'Diagrams',        desc: 'Architecture & structure' },
  { id: 'timeline', icon: '📅', label: 'Timelines',       desc: 'Learning progression' },
];

const VisualLearningPage = () => {
  const navigate = useNavigate();
  const domains = getAllDomains();
  const [selected, setSelected] = useState(null);

  return (
    <div className="vl-page">
      <Navbar />
      <Sidebar />
      <main className="vl-content">
        <div className="container">
          <div className="vl-header">
            <h1>🎨 Visual Learning</h1>
            <p>Learn programming concepts through visual diagrams, mind maps and flowcharts</p>
          </div>

          <div className="vl-types">
            {VISUAL_TYPES.map(t => (
              <div key={t.id} className={`vl-type-card ${selected === t.id ? 'active' : ''}`} onClick={() => setSelected(t.id)}>
                <span className="vl-type-icon">{t.icon}</span>
                <h3>{t.label}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="vl-section-title">Choose a Domain to Visualize</h2>
          <div className="vl-domains">
            {domains.map(d => (
              <div key={d.id} className="vl-domain-card" onClick={() => navigate(`/domain/${d.id}`)}>
                <span className="vl-domain-icon">{d.icon}</span>
                <div>
                  <h3>{d.name}</h3>
                  <p>{d.topics.length} topics</p>
                </div>
                <span className="vl-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisualLearningPage;


