import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getAllDomains } from '../data/domains';
import { generateMindMap, generateFlowchart, generateDiagram, generateTimeline } from '../api/groqAI';
import '../styles/VisualLearningPage.css';

const TYPES = [
  { id: 'mindmap',   icon: '🧠', label: 'Mind Maps',  desc: 'Visual concept connections' },
  { id: 'flowchart', icon: '🔀', label: 'Flowcharts', desc: 'Step-by-step logic flows' },
  { id: 'diagram',   icon: '📊', label: 'Diagrams',   desc: 'Architecture & structure' },
  { id: 'timeline',  icon: '📅', label: 'Timelines',  desc: 'Learning progression' },
];

const COLORS = ['#7c3aed','#ec4899','#10b981','#f59e0b','#3b82f6','#ef4444'];

function MindMapView({ data }) {
  const cx = 400, cy = 280, r = 65;
  const branches = data.branches || [];
  const step = (2 * Math.PI) / Math.max(branches.length, 1);
  return (
    <div className="vl-svg-wrap">
      <svg viewBox="0 0 800 560" className="vl-svg">
        <defs><radialGradient id="rg"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#7c3aed"/></radialGradient></defs>
        {branches.map((b, bi) => {
          const a = bi * step - Math.PI / 2;
          const bx = cx + 195 * Math.cos(a), by = cy + 170 * Math.sin(a);
          const col = COLORS[bi % COLORS.length];
          return (
            <g key={bi}>
              <line x1={cx} y1={cy} x2={bx} y2={by} stroke={col} strokeWidth="2.5" strokeOpacity="0.6"/>
              <rect x={bx-55} y={by-18} width="110" height="36" rx="18" fill={col} fillOpacity="0.85"/>
              <text x={bx} y={by+5} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">{b.label}</text>
              {(b.children||[]).map((leaf,li) => {
                const la = a + (li - (b.children.length-1)/2) * 0.45;
                const lx = bx + 125*Math.cos(la), ly = by + 95*Math.sin(la);
                return (
                  <g key={li}>
                    <line x1={bx} y1={by} x2={lx} y2={ly} stroke={col} strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4,3"/>
                    <rect x={lx-44} y={ly-13} width="88" height="26" rx="13" fill={col} fillOpacity="0.18" stroke={col} strokeWidth="1" strokeOpacity="0.5"/>
                    <text x={lx} y={ly+4} textAnchor="middle" fill="white" fontSize="9.5">{leaf}</text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={r} fill="url(#rg)"/>
        <text x={cx} y={cy-6} textAnchor="middle" fill="white" fontSize="13" fontWeight="800">{data.root}</text>
      </svg>
    </div>
  );
}

function FlowchartView({ data }) {
  const steps = data.steps || [];
  const W = 500, bW = 200, bH = 50, gY = 70;
  const getY = (i) => 40 + i * (bH + gY);
  const mX = W / 2;
  const col = (t) => t==='start'||t==='end' ? '#7c3aed' : t==='decision' ? '#f59e0b' : 'rgba(30,17,71,0.9)';
  return (
    <div className="vl-svg-wrap">
      <svg viewBox={`0 0 ${W} ${getY(steps.length)+40}`} className="vl-svg">
        <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="rgba(167,139,250,0.8)"/></marker></defs>
        {steps.map((s, i) => {
          const cy = getY(i) + bH/2;
          const isT = s.type==='start'||s.type==='end', isDec = s.type==='decision';
          const f = col(s.type);
          return (
            <g key={s.id||i}>
              {i < steps.length-1 && <line x1={mX} y1={cy+bH/2} x2={mX} y2={getY(i+1)+bH/2-bH/2-4} stroke="rgba(167,139,250,0.5)" strokeWidth="2" markerEnd="url(#arr)"/>}
              {isT && <rect x={mX-bW/2} y={cy-bH/2} width={bW} height={bH} rx={bH/2} fill={f}/>}
              {isDec && <polygon points={`${mX},${cy-bH/2} ${mX+bW/2},${cy} ${mX},${cy+bH/2} ${mX-bW/2},${cy}`} fill={f} fillOpacity="0.85"/>}
              {!isT && !isDec && <rect x={mX-bW/2} y={cy-bH/2} width={bW} height={bH} rx="8" fill={f} stroke="rgba(167,139,250,0.4)" strokeWidth="1.5"/>}
              <text x={mX} y={cy+4} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">{s.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DiagramView({ data }) {
  const comps = data.components || [], conns = data.connections || [];
  const cols = Math.min(3, comps.length), bW = 160, bH = 80, gX = 60, gY = 60;
  const tW = cols*bW+(cols-1)*gX+80, rows = Math.ceil(comps.length/cols), tH = rows*bH+(rows-1)*gY+80;
  const pos = {};
  comps.forEach((c,i) => { pos[c.id] = { x: 40+(i%cols)*(bW+gX)+bW/2, y: 40+Math.floor(i/cols)*(bH+gY)+bH/2 }; });
  return (
    <div className="vl-svg-wrap">
      <svg viewBox={`0 0 ${tW} ${tH}`} className="vl-svg">
        <defs><marker id="dArr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="rgba(167,139,250,0.7)"/></marker></defs>
        {conns.map((c,i) => {
          const f=pos[c.from], t=pos[c.to]; if(!f||!t) return null;
          return (<g key={i}><line x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" markerEnd="url(#dArr)"/><text x={(f.x+t.x)/2} y={(f.y+t.y)/2-6} textAnchor="middle" fill="rgba(196,181,253,0.8)" fontSize="9">{c.label}</text></g>);
        })}
        {comps.map((c,i) => {
          const p=pos[c.id], color=COLORS[i%COLORS.length];
          return (<g key={c.id}><rect x={p.x-bW/2} y={p.y-bH/2} width={bW} height={bH} rx="10" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/><text x={p.x} y={p.y-12} textAnchor="middle" fill="white" fontSize="11" fontWeight="700">{c.name}</text><text x={p.x} y={p.y+8} textAnchor="middle" fill="rgba(196,181,253,0.7)" fontSize="8.5">{c.description}</text></g>);
        })}
      </svg>
    </div>
  );
}

function TimelineView({ data }) {
  const phases = data.phases || [];
  return (
    <div className="vl-timeline">
      {phases.map((p,i) => (
        <div key={i} className={`vl-tl-item ${i%2===0?'left':'right'}`}>
          <div className="vl-tl-dot" style={{background:COLORS[i%COLORS.length]}}>{i+1}</div>
          <div className="vl-tl-card" style={{borderColor:COLORS[i%COLORS.length]+'55'}}>
            <span className="vl-tl-week">{p.week}</span>
            <h4>{p.title}</h4>
            <div className="vl-tl-topics">{(p.topics||[]).map((t,j)=><span key={j} className="vl-tl-chip">{t}</span>)}</div>
            {p.milestone && <div className="vl-tl-milestone">🏆 {p.milestone}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VisualLearningPage() {
  const { type, domainId } = useParams();
  const navigate = useNavigate();
  const domains = getAllDomains();
  const [visualData, setVisualData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const typeInfo = TYPES.find(t => t.id === type);
  const domainInfo = domains.find(d => d.id === domainId);

  useEffect(() => {
    if (!type || !domainId || !domainInfo) return;
    setLoading(true); setError(null); setVisualData(null);
    const gens = { mindmap: generateMindMap, flowchart: generateFlowchart, diagram: generateDiagram, timeline: generateTimeline };
    gens[type](domainInfo.name)
      .then(d => setVisualData(d))
      .catch(() => setError('Failed to generate. Please retry.'))
      .finally(() => setLoading(false));
  }, [type, domainId, domainInfo]);

  if (!type) return (
    <div className="vl-page"><Navbar/><Sidebar/>
      <main className="vl-content"><div className="container">
        <div className="vl-header"><h1>🎨 Visual Learning</h1><p>Choose a visual format to learn programming concepts</p></div>
        <div className="vl-types">
          {TYPES.map(t => (
            <div key={t.id} className="vl-type-card" onClick={() => navigate(`/visual-learning/${t.id}`)}>
              <span className="vl-type-icon">{t.icon}</span><h3>{t.label}</h3><p>{t.desc}</p>
              <span className="vl-type-cta">Select →</span>
            </div>
          ))}
        </div>
      </div></main>
    </div>
  );

  if (!domainId) return (
    <div className="vl-page"><Navbar/><Sidebar/>
      <main className="vl-content"><div className="container">
        <div className="vl-header">
          <button className="btn btn-secondary vl-back-btn" onClick={() => navigate('/visual-learning')}>← Back</button>
          <h1>{typeInfo?.icon} {typeInfo?.label}</h1><p>Choose a domain to visualize</p>
        </div>
        <div className="vl-domains">
          {domains.map(d => (
            <div key={d.id} className="vl-domain-card" onClick={() => navigate(`/visual-learning/${type}/${d.id}`)}>
              <span className="vl-domain-icon">{d.icon}</span>
              <div><h3>{d.name}</h3><p>{d.topics.length} topics</p></div>
              <span className="vl-arrow">→</span>
            </div>
          ))}
        </div>
      </div></main>
    </div>
  );

  return (
    <div className="vl-page"><Navbar/><Sidebar/>
      <main className="vl-content"><div className="container">
        <div className="vl-header">
          <button className="btn btn-secondary vl-back-btn" onClick={() => navigate(`/visual-learning/${type}`)}>← Back to Domains</button>
          <h1>{typeInfo?.icon} {typeInfo?.label} — {domainInfo?.icon} {domainInfo?.name}</h1>
        </div>
        {loading && <div className="vl-loading"><div className="vl-spinner"/><p>Generating {typeInfo?.label} for {domainInfo?.name}…</p></div>}
        {error && <div className="vl-error"><p>⚠️ {error}</p><button className="btn btn-primary" onClick={() => { setError(null); setVisualData(null); }}>🔄 Retry</button></div>}
        {visualData && !loading && (
          <div className="vl-result">
            {type==='mindmap'   && <MindMapView   data={visualData}/>}
            {type==='flowchart' && <FlowchartView data={visualData}/>}
            {type==='diagram'   && <DiagramView   data={visualData}/>}
            {type==='timeline'  && <TimelineView  data={visualData}/>}
          </div>
        )}
      </div></main>
    </div>
  );
}