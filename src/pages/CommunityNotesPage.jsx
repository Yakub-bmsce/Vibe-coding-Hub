import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../styles/CommunityNotesPage.css';

const INITIAL_NOTES = [
  { id: 1, author: 'Arjun S',  topic: 'Python',     content: 'List comprehensions are faster than for loops for simple transformations. Use [x*2 for x in list] instead of a loop!', likes: 24, time: '2h ago' },
  { id: 2, author: 'Priya M',  topic: 'React',      content: 'Always use useCallback for functions passed as props to child components to prevent unnecessary re-renders.', likes: 18, time: '4h ago' },
  { id: 3, author: 'Rahul K',  topic: 'DSA',        content: 'For sliding window problems, always think about what to add when expanding and what to remove when shrinking the window.', likes: 31, time: '6h ago' },
  { id: 4, author: 'Sneha R',  topic: 'JavaScript', content: 'Difference between == and ===: == does type coercion, === checks type AND value. Always use === to avoid bugs!', likes: 42, time: '1d ago' },
  { id: 5, author: 'Vikram N', topic: 'SQL',        content: 'Use EXPLAIN before your query to see the execution plan. This helps identify missing indexes and slow queries.', likes: 15, time: '1d ago' },
];

const CommunityNotesPage = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [newNote, setNewNote] = useState('');
  const [newTopic, setNewTopic] = useState('General');
  const [liked, setLiked] = useState([]);

  const handlePost = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Date.now(),
      author: user?.name || 'You',
      topic: newTopic,
      content: newNote,
      likes: 0,
      time: 'Just now'
    };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const handleLike = (id) => {
    if (liked.includes(id)) return;
    setLiked([...liked, id]);
    setNotes(notes.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n));
  };

  const topics = ['General', 'Python', 'JavaScript', 'React', 'DSA', 'SQL', 'ML/AI', 'DevOps'];

  return (
    <div className="cn-page">
      <Navbar />
      <Sidebar />
      <main className="cn-content">
        <div className="container">
          <div className="cn-header">
            <h1>📝 Community Notes</h1>
            <p>Share tips, tricks and insights with fellow learners</p>
          </div>

          {/* Post a note */}
          <div className="cn-post-box card">
            <h3>Share a tip or insight</h3>
            <select value={newTopic} onChange={e => setNewTopic(e.target.value)} className="cn-topic-select">
              {topics.map(t => <option key={t}>{t}</option>)}
            </select>
            <textarea
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Write a helpful tip, trick or insight for other learners..."
              rows="3"
            />
            <button className="btn btn-primary cn-post-btn" onClick={handlePost} disabled={!newNote.trim()}>
              Post Note →
            </button>
          </div>

          {/* Notes feed */}
          <div className="cn-feed">
            {notes.map(note => (
              <div key={note.id} className="cn-note card">
                <div className="cn-note-header">
                  <div className="cn-avatar">{note.author.charAt(0)}</div>
                  <div className="cn-meta">
                    <span className="cn-author">{note.author}</span>
                    <span className="cn-time">{note.time}</span>
                  </div>
                  <span className="cn-topic-tag">{note.topic}</span>
                </div>
                <p className="cn-note-content">{note.content}</p>
                <div className="cn-note-footer">
                  <button
                    className={`cn-like-btn ${liked.includes(note.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(note.id)}
                  >
                    👍 {note.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityNotesPage;
