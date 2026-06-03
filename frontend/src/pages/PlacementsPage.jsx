import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import axios from 'axios'
import './PlacementsPage.css'

export default function PlacementsPage() {
  const [status, setStatus] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  const { data: list, loading } = useApi(`/api/placements?${params}`, [status])

  return (
    <div>
      <div className="place-header">
        <h2>Placements & Hiring</h2>
        <p>On-campus, off-campus, internships — all in one place</p>
      </div>

      <div className="section">
        {!subscribed ? (
          <div className="subscribe-banner">
            <i className="ti ti-bell" aria-hidden="true"></i>
            <div style={{flex:1}}>
              <div className="sb-title">Get instant placement alerts</div>
              <div className="sb-sub">1st & 2nd year students — subscribe now, prep early, don't miss deadlines</div>
            </div>
            <button className="btn-gold" onClick={() => setSubscribed(true)} style={{fontSize:'12px',padding:'7px 14px',borderRadius:'7px',flexShrink:0}}>Subscribe</button>
          </div>
        ) : (
          <div className="subscribe-banner" style={{background:'rgba(74,222,128,0.08)',borderColor:'rgba(74,222,128,0.2)'}}>
            <i className="ti ti-check" style={{color:'var(--green)'}} aria-hidden="true"></i>
            <span style={{fontSize:'13px',color:'var(--green)',fontWeight:'600'}}>You're subscribed! We'll notify you for every new drive.</span>
          </div>
        )}

        <div className="place-filters">
          {[['','All'],['open','Open Now'],['coming','Coming Soon'],['closed','Closed']].map(([v,l]) => (
            <button key={v} className={`fpill${status===v?' active':''}`} onClick={() => setStatus(v)}>{l}</button>
          ))}
        </div>

        {loading && <div className="loading"><div className="spinner"></div></div>}

        <div className="place-list">
          {list?.map(p => (
            <div key={p._id} className={`place-card card${p.isPremium ? ' premium-card' : ''}`}>
              <div className="pc-top">
                <span className="pc-company">{p.company}</span>
                <span className={`chip ${p.status === 'open' ? 'chip-gr' : p.status === 'coming' ? 'chip-p' : 'chip-r'}`}>
                  {p.status === 'open' ? 'Open now' : p.status === 'coming' ? 'Coming soon' : 'Closed'}
                </span>
              </div>
              <div className="pc-role">{p.role}</div>
              {p.branches?.length > 0 && <div className="pc-branches">{p.branches.join(' · ')}</div>}
              <div className="pc-chips">
                {p.ctc        && <span className="chip chip-g">{p.ctc}</span>}
                {p.cgpaCutoff && <span className="chip chip-p">CGPA {p.cgpaCutoff}+</span>}
                {p.deadline   && <span style={{fontSize:'10px',color:'var(--muted)'}}>Deadline: {new Date(p.deadline).toLocaleDateString('en-IN')}</span>}
              </div>
              {p.isPremium && (
                <div className="pc-premium">
                  <i className="ti ti-lock" aria-hidden="true"></i> Interview experience — unlock for ₹99
                </div>
              )}
              {p.applyLink && !p.isPremium && (
                <a href={p.applyLink} target="_blank" rel="noreferrer" className="pc-apply">Apply Now →</a>
              )}
            </div>
          ))}
          {!loading && !list?.length && (
            <div className="empty-state"><div className="emoji">🏢</div><p>No placements listed yet!</p></div>
          )}
        </div>
      </div>
    </div>
  )
}
