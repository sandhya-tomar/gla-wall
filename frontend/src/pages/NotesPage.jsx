import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../context/AuthContext'
import './NotesPage.css'

export default function NotesPage() {
  const [subject, setSubject] = useState('')
  const [type, setType] = useState('')
  const { isLoggedIn } = useAuth()

  const subjects = ['DBMS','CN','OS','DSA','Maths','Physics','Chemistry','Other']

  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (type)    params.set('type', type)
  const { data: notes, loading } = useApi(`/api/notes?${params}`, [subject, type])

  const download = (note) => {
    if (note.isPremium && !isLoggedIn) {
      alert('Sign up and get Premium to unlock this!')
      return
    }
    window.open(`http://localhost:5000/api/notes/${note.id}/download`, '_blank')
  }

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h2>Notes & PYQs</h2>
        <p>Uploaded by GLA students, for GLA students</p>
      </div>

      <div className="section">
        <div className="notes-filters">
          <div className="filter-group">
            <span className="fg-label">Subject</span>
            <div className="filter-pills">
              <button className={`fpill${subject===''?' active':''}`} onClick={() => setSubject('')}>All</button>
              {subjects.map(s => (
                <button key={s} className={`fpill${subject===s?' active':''}`}
                  onClick={() => setSubject(subject===s ? '' : s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="fg-label">Type</span>
            <div className="filter-pills">
              {[['','All'],['notes','Notes'],['pyq','PYQ'],['assignment','Assignment']].map(([v,l]) => (
                <button key={v} className={`fpill${type===v?' active':''}`} onClick={() => setType(v)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="premium-banner">
          <i className="ti ti-lock" aria-hidden="true"></i>
          <div>
            <div className="pb-title">Unlock all PYQs + Interview Prep</div>
            <div className="pb-sub">₹99/month — cancel anytime. 1st & 2nd years: prep early, get ahead.</div>
          </div>
          <a href="/register" className="btn-gold" style={{textDecoration:'none',fontSize:'12px',padding:'7px 14px',borderRadius:'7px',flexShrink:0}}>Get Premium</a>
        </div>

        {loading && <div className="loading"><div className="spinner"></div></div>}

        <div className="notes-list card">
          {notes?.map(note => (
            <div key={note.id} className={`note-row${note.isPremium ? ' premium' : ''}`}>
              <div className="note-icon">{note.type === 'pyq' ? '📙' : note.type === 'assignment' ? '📋' : '📘'}</div>
              <div className="note-info">
                <div className="note-title">{note.title}</div>
                <div className="note-meta"></div>
              </div>
              <div className="note-action">
                {note.isPremium
                  ? <button className="dl-lock-btn" onClick={() => download(note)}>
                      <i className="ti ti-lock" aria-hidden="true"></i> ₹99
                    </button>
                  : <button className="dl-free-btn" onClick={() => download(note)}>
                      <i className="ti ti-download" aria-hidden="true"></i> Free
                    </button>
                }
              </div>
            </div>
          ))}
          {!loading && !notes?.length && (
            <div className="empty-state" style={{padding:'24px'}}><div className="emoji">📚</div><p>No notes found!</p></div>
          )}
        </div>
      </div>
    </div>
  )
}