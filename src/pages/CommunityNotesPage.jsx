import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import '../styles/CommunityNotesPage.css';

const DOMAINS = [
  'Programming Languages','Web Development','DSA','Databases',
  'ML/AI','DevOps','Cybersecurity','Mobile Dev','Networking','OS'
];

const TEMPLATES = [
  { id: 'summary',       icon: '📄', label: 'Summary',       placeholder: 'Summarize the key concepts...\n\n• Main idea:\n• Key points:\n• Takeaway:' },
  { id: 'cheatsheet',    icon: '📋', label: 'Cheatsheet',    placeholder: 'Quick reference cheatsheet:\n\nSyntax / Command → What it does\n...' },
  { id: 'interview_prep',icon: '🎯', label: 'Interview Prep', placeholder: 'Q: What is ...?\nA: ...\n\nQ: Explain ...\nA: ...' },
  { id: 'free_write',    icon: '✏️', label: 'Free Write',    placeholder: 'Write anything on your mind about this topic...' },
];

const SOCIAL_FIELDS = [
  { id: 'linkedin',       icon: '💼', label: 'LinkedIn',           placeholder: 'https://linkedin.com/in/yourname' },
  { id: 'twitter',        icon: '🐦', label: 'Twitter/X',          placeholder: 'https://twitter.com/yourhandle' },
  { id: 'instagram',      icon: '📸', label: 'Instagram',          placeholder: 'https://instagram.com/yourhandle' },
  { id: 'github',         icon: '🐙', label: 'GitHub',             placeholder: 'https://github.com/yourname' },
  { id: 'whatsappGroup',  icon: '💬', label: 'WhatsApp Group Link', placeholder: 'https://chat.whatsapp.com/...' },
  { id: 'discordServer',  icon: '🎮', label: 'Discord Server Link', placeholder: 'https://discord.gg/...' },
];

const LS_NOTES    = 'cn_notes';
const LS_SAVED    = 'cn_saved';
const LS_SOCIALS  = 'user_socials';

const loadLS = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

const saveLS = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export default function CommunityNotesPage() {
  const { user } = useAuth();
  const username = user?.name || 'Anonymous';
  const userId   = user?.email || username;

  const [notes,       setNotes]       = useState(() => loadLS(LS_NOTES, []));
  const [savedIds,    setSavedIds]    = useState(() => loadLS(LS_SAVED, []));
  const [socials,     setSocials]     = useState(() => loadLS(LS_SOCIALS, {}));

  // Filters
  const [filterDomain, setFilterDomain] = useState('All');
  const [searchQuery,  setSearchQuery]  = useState('');

  // Post modal
  const [showPostModal,  setShowPostModal]  = useState(false);
  const [postTitle,      setPostTitle]      = useState('');
  const [postDomain,     setPostDomain]     = useState(DOMAINS[0]);
  const [postTopic,      setPostTopic]      = useState('');
  const [postTemplate,   setPostTemplate]   = useState('summary');
  const [postContent,    setPostContent]    = useState('');
  const [postTags,       setPostTags]       = useState('');
  const [postPrivate,    setPostPrivate]    = useState(false);

  // Social modal
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [editSocials,     setEditSocials]     = useState({});

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Persist notes
  useEffect(() => { saveLS(LS_NOTES, notes); }, [notes]);
  useEffect(() => { saveLS(LS_SAVED, savedIds); }, [savedIds]);
  useEffect(() => { saveLS(LS_SOCIALS, socials); }, [socials]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const updateNote = useCallback((id, patch) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...patch } : n));
  }, []);

  const handleLike = (note) => {
    const likedKey = `cn_liked_${userId}`;
    const liked = loadLS(likedKey, []);
    if (liked.includes(note.id)) return;
    const newLikes = note.likes + 1;
    const isVerified = newLikes >= 10;
    updateNote(note.id, { likes: newLikes, isVerified });
    saveLS(likedKey, [...liked, note.id]);
  };

  const isLiked = (noteId) => {
    const likedKey = `cn_liked_${userId}`;
    return loadLS(likedKey, []).includes(noteId);
  };

  const handleSave = (noteId) => {
    setSavedIds(prev =>
      prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]
    );
  };

  const handleDownload = (note) => {
    const printWin = window.open('', '_blank');
    printWin.document.write(`
      <html><head><title>${note.title}</title>
      <style>
        body { font-family: 'DM Sans', sans-serif; padding: 40px; color: #111; }
        h1 { font-size: 1.6rem; margin-bottom: 8px; }
        .meta { color: #666; font-size: 0.85rem; margin-bottom: 20px; }
        .content { white-space: pre-wrap; line-height: 1.7; font-size: 1rem; }
        .tags { margin-top: 20px; }
        .tag { display: inline-block; background: #ede9fe; color: #5b21b6; padding: 2px 10px; border-radius: 12px; font-size: 0.78rem; margin-right: 6px; }
      </style></head><body>
      <h1>${note.title}</h1>
      <div class="meta">By ${note.userName} · ${note.domain} · ${note.topic} · ${new Date(note.createdAt).toLocaleDateString()}</div>
      <div class="content">${note.content}</div>
      <div class="tags">${(note.tags || []).map(t => `<span class="tag">#${t}</span>`).join('')}</div>
      </body></html>
    `);
    printWin.document.close();
    printWin.print();
  };

  const handleShare = (note) => {
    const url = `${window.location.origin}/community-notes/${note.id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this link:', url);
    });
  };

  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    setDeleteConfirm(null);
  };

  // ── Post Note ─────────────────────────────────────────────────────────────
  const handlePost = () => {
    if (!postTitle.trim() || !postContent.trim()) return;
    const tags = postTags.split(',').map(t => t.trim()).filter(Boolean);
    const note = {
      id:        Date.now().toString(),
      userId,
      userName:  username,
      domain:    postDomain,
      topic:     postTopic.trim(),
      title:     postTitle.trim(),
      content:   postContent.trim(),
      template:  postTemplate,
      tags,
      likes:     0,
      saves:     0,
      isPrivate: postPrivate,
      isPinned:  false,
      isVerified:false,
      createdAt: new Date().toISOString(),
      socials:   { ...socials },
    };
    setNotes(prev => [note, ...prev]);
    // Reset
    setPostTitle(''); setPostDomain(DOMAINS[0]); setPostTopic('');
    setPostTemplate('summary'); setPostContent(''); setPostTags(''); setPostPrivate(false);
    setShowPostModal(false);
  };

  // ── Social Links ──────────────────────────────────────────────────────────
  const openSocialModal = () => {
    setEditSocials({ ...socials });
    setShowSocialModal(true);
  };
  const saveSocials = () => {
    setSocials({ ...editSocials });
    setShowSocialModal(false);
  };

  // ── Filtered notes ────────────────────────────────────────────────────────
  const publicNotes = notes.filter(n => !n.isPrivate);
  const filtered = publicNotes
    .filter(n => filterDomain === 'All' || n.domain === filterDomain)
    .filter(n => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        (n.tags || []).some(t => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const templateInfo = (id) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
  const currentTemplate = templateInfo(postTemplate);

  return (
    <div className="cn-page">
      <Navbar />
      <Sidebar />
      <main className="cn-content">
        <div className="container">

          {/* Disclaimer */}
          <div className="cn-disclaimer-banner">
            ⚠️ All notes are written by real students — not AI. Content is user-generated. Post responsibly.
          </div>

          {/* Header */}
          <div className="cn-header">
            <h1>📝 Community Notes</h1>
            <p>Share knowledge, tips, and insights with fellow learners</p>
            <div className="cn-header-actions">
              <button className="btn btn-primary cn-post-btn-main" onClick={() => setShowPostModal(true)}>
                + Post a Note
              </button>
              <button className="btn btn-secondary cn-social-btn" onClick={openSocialModal}>
                🔗 Add Your Social Links
              </button>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="cn-controls">
            <input
              className="cn-search"
              type="text"
              placeholder="🔍 Search notes by title, topic, tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="cn-filters">
              {['All', ...DOMAINS].map(d => (
                <button
                  key={d}
                  className={`cn-filter-btn ${filterDomain === d ? 'active' : ''}`}
                  onClick={() => setFilterDomain(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Notes Feed */}
          {filtered.length === 0 ? (
            <div className="cn-empty">
              <div className="cn-empty-icon">📭</div>
              <p>No notes found. Be the first to share!</p>
            </div>
          ) : (
            <div className="cn-feed">
              {filtered.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  userId={userId}
                  savedIds={savedIds}
                  isLiked={isLiked(note.id)}
                  onLike={() => handleLike(note)}
                  onSave={() => handleSave(note.id)}
                  onDownload={() => handleDownload(note)}
                  onShare={() => handleShare(note)}
                  onDelete={() => setDeleteConfirm(note.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Post Note Modal ── */}
      {showPostModal && (
        <div className="cn-modal-overlay" onClick={() => setShowPostModal(false)}>
          <div className="cn-modal cn-post-modal" onClick={e => e.stopPropagation()}>
            <div className="cn-modal-header">
              <h3>📝 Post a Note</h3>
              <button className="cn-modal-close" onClick={() => setShowPostModal(false)}>✕</button>
            </div>

            <div className="cn-modal-body">
              <div className="cn-field">
                <label>Title</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  placeholder="Give your note a clear title..."
                />
              </div>

              <div className="cn-field-row">
                <div className="cn-field">
                  <label>Domain</label>
                  <select value={postDomain} onChange={e => setPostDomain(e.target.value)} className="cn-select">
                    {DOMAINS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="cn-field">
                  <label>Topic</label>
                  <input
                    type="text"
                    value={postTopic}
                    onChange={e => setPostTopic(e.target.value)}
                    placeholder="e.g. React Hooks"
                  />
                </div>
              </div>

              <div className="cn-field">
                <label>Template</label>
                <div className="cn-template-grid">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      className={`cn-template-card ${postTemplate === t.id ? 'active' : ''}`}
                      onClick={() => setPostTemplate(t.id)}
                      type="button"
                    >
                      <span className="cn-template-icon">{t.icon}</span>
                      <span className="cn-template-label">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cn-field">
                <label>Content</label>
                <textarea
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  placeholder={currentTemplate.placeholder}
                  rows={7}
                />
              </div>

              <div className="cn-field">
                <label>Tags <span className="cn-label-hint">(comma separated)</span></label>
                <input
                  type="text"
                  value={postTags}
                  onChange={e => setPostTags(e.target.value)}
                  placeholder="e.g. hooks, state, react"
                />
              </div>

              <div className="cn-field">
                <label>Visibility</label>
                <div className="cn-visibility-toggle">
                  <button
                    type="button"
                    className={`cn-vis-btn ${!postPrivate ? 'active' : ''}`}
                    onClick={() => setPostPrivate(false)}
                  >
                    🌍 Public
                  </button>
                  <button
                    type="button"
                    className={`cn-vis-btn ${postPrivate ? 'active' : ''}`}
                    onClick={() => setPostPrivate(true)}
                  >
                    🔒 Private
                  </button>
                </div>
              </div>
            </div>

            <div className="cn-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPostModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handlePost}
                disabled={!postTitle.trim() || !postContent.trim()}
              >
                Post Note →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Social Links Modal ── */}
      {showSocialModal && (
        <div className="cn-modal-overlay" onClick={() => setShowSocialModal(false)}>
          <div className="cn-modal" onClick={e => e.stopPropagation()}>
            <div className="cn-modal-header">
              <h3>🔗 Your Social Links</h3>
              <button className="cn-modal-close" onClick={() => setShowSocialModal(false)}>✕</button>
            </div>
            <p className="cn-modal-sub">Let others connect with you. These will appear on your notes.</p>
            <div className="cn-modal-body">
              {SOCIAL_FIELDS.map(s => (
                <div key={s.id} className="cn-field">
                  <label>{s.icon} {s.label}</label>
                  <input
                    type="url"
                    value={editSocials[s.id] || ''}
                    onChange={e => setEditSocials({ ...editSocials, [s.id]: e.target.value })}
                    placeholder={s.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className="cn-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowSocialModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveSocials}>Save Links</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="cn-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="cn-modal cn-modal-sm" onClick={e => e.stopPropagation()}>
            <h3>🗑️ Delete this note?</h3>
            <p>This action cannot be undone.</p>
            <div className="cn-confirm-btns">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn cn-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Note Card Component ────────────────────────────────────────────────────
function NoteCard({ note, userId, savedIds, isLiked, onLike, onSave, onDownload, onShare, onDelete }) {
  const tmpl = [
    { id: 'summary',       icon: '📄', label: 'Summary' },
    { id: 'cheatsheet',    icon: '📋', label: 'Cheatsheet' },
    { id: 'interview_prep',icon: '🎯', label: 'Interview Prep' },
    { id: 'free_write',    icon: '✏️', label: 'Free Write' },
  ].find(t => t.id === note.template) || { icon: '📄', label: 'Summary' };

  const isSaved = savedIds.includes(note.id);
  const isOwner = note.userId === userId;

  const hasSocials = note.socials && Object.values(note.socials).some(v => v);
  const studyLink  = note.socials?.whatsappGroup || note.socials?.discordServer || null;

  return (
    <div className={`cn-note-card ${note.isPinned ? 'pinned' : ''}`}>
      {/* Card Header */}
      <div className="cn-card-header">
        <div className="cn-card-author">
          <div className="cn-avatar">{note.userName.charAt(0).toUpperCase()}</div>
          <div className="cn-author-info">
            <div className="cn-author-name">
              {note.userName}
              {note.isPinned    && <span className="cn-badge cn-badge-pin">📌 Pinned</span>}
              {note.isVerified  && <span className="cn-badge cn-badge-verified">✅ Verified</span>}
            </div>
            <div className="cn-author-meta">
              {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
        <div className="cn-card-badges">
          <span className="cn-template-badge">{tmpl.icon} {tmpl.label}</span>
          {isOwner && (
            <button className="cn-icon-btn cn-delete-btn" onClick={onDelete} title="Delete note">🗑️</button>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="cn-note-title">{note.title}</h3>

      {/* Content preview */}
      <p className="cn-note-preview">{note.content}</p>

      {/* Domain / Topic / Tags */}
      <div className="cn-note-chips">
        <span className="cn-chip cn-chip-domain">{note.domain}</span>
        {note.topic && <span className="cn-chip cn-chip-topic">{note.topic}</span>}
        {(note.tags || []).map(tag => (
          <span key={tag} className="cn-chip cn-chip-tag">#{tag}</span>
        ))}
      </div>

      {/* Social icons */}
      {hasSocials && (
        <div className="cn-note-socials">
          {note.socials.linkedin && (
            <a href={note.socials.linkedin} target="_blank" rel="noopener noreferrer" className="cn-social-icon" title="LinkedIn">💼</a>
          )}
          {note.socials.twitter && (
            <a href={note.socials.twitter} target="_blank" rel="noopener noreferrer" className="cn-social-icon" title="Twitter/X">🐦</a>
          )}
          {note.socials.instagram && (
            <a href={note.socials.instagram} target="_blank" rel="noopener noreferrer" className="cn-social-icon" title="Instagram">📸</a>
          )}
          {note.socials.github && (
            <a href={note.socials.github} target="_blank" rel="noopener noreferrer" className="cn-social-icon" title="GitHub">🐙</a>
          )}
          {studyLink && (
            <a href={studyLink} target="_blank" rel="noopener noreferrer" className="cn-study-btn">
              {note.socials.whatsappGroup ? '💬' : '🎮'} Study Together
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="cn-card-actions">
        <button
          className={`cn-action-btn ${isLiked ? 'active' : ''}`}
          onClick={onLike}
          disabled={isLiked}
          title="Like"
        >
          👍 {note.likes}
        </button>
        <button
          className={`cn-action-btn ${isSaved ? 'active' : ''}`}
          onClick={onSave}
          title={isSaved ? 'Unsave' : 'Save'}
        >
          🔖 {isSaved ? 'Saved' : 'Save'}
        </button>
        <button className="cn-action-btn" onClick={onDownload} title="Download">
          📥 Download
        </button>
        <button className="cn-action-btn" onClick={onShare} title="Share">
          🔗 Share
        </button>
      </div>
    </div>
  );
}
