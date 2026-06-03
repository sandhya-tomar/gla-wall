import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './ConfessPage.css'

export default function ConfessPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [posting, setPosting] = useState(false)

  const load = useCallback(async () => {
    const res = await axios.get('/api/confessions')
    setPosts(res.data)
  }, [])

  useEffect(() => { load() }, [load])

  const submit = async (e) => {
    e.preventDefault()
    if (!isLoggedIn) { navigate('/login'); return }
    if (!text.trim()) return
    setPosting(true)
    try {
      await axios.post('/api/confessions', { text })
      setText('')
      load()
    } catch { alert('Could not post') }
    setPosting(false)
  }

  const like = async (id) => {
    await axios.patch(`/api/confessions/${id}/like`)
    load()
  }

  return (
    <div className="confess-page">
      <div className="confess-header">
        <div className="ch-left">
          <h2>Campus Confessions</h2>
          <p>Anonymous. Real. GLA.</p>
        </div>
        <div className="anon-info">
          <i className="ti ti-shield-lock" aria-hidden="true"></i>
          <span>Your identity is <strong>never</strong> revealed</span>
        </div>
      </div>

      <div className="section">
        <div className="post-box card">
          <div className="pb-anon-tag">
            <span>You'll post as a random identity 🦝</span>
            {!isLoggedIn && <span className="pb-login-note">· <a href="/login">Login first</a></span>}
          </div>
          <form onSubmit={submit}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={500}
              placeholder="Kuch bhi likh — funny, rant, honest, heartfelt... 💜"
            />
            <div className="pb-footer">
              <span className="pb-count">{text.length}/500</span>
              <button type="submit" className="btn-primary" disabled={posting}>
                {posting ? 'Posting...' : 'Post Anonymously'}
              </button>
            </div>
          </form>
        </div>

        <div className="confess-feed">
          {posts.map(p => (
            <div key={p._id} className="cpost card">
              <div className="cpost-top">
                <div className="cpost-avatar">{p.anonEmoji}</div>
                <div>
                  <div className="cpost-handle">{p.anonName}</div>
                  {p.branch && <div className="cpost-meta">{p.year && `${p.year} yr · `}{p.branch}</div>}
                </div>
                <span className="cpost-time">{new Date(p.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              <p className="cpost-text">{p.text}</p>
              <div className="cpost-actions">
                <button className="cact-btn" onClick={() => like(p._id)}>
                  <i className="ti ti-heart" aria-hidden="true"></i> {p.likes}
                </button>
                <button className="cact-btn">
                  <i className="ti ti-message" aria-hidden="true"></i> {p.comments}
                </button>
              </div>
            </div>
          ))}
          {!posts.length && (
            <div className="empty-state"><div className="emoji">🎭</div><p>No confessions yet. Be first!</p></div>
          )}
        </div>
      </div>
    </div>
  )
}
