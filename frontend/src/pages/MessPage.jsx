import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import WriteReview from '../components/WriteReview'
import './MessPage.css'

export default function MessPage() {
  const { data: messList, loading } = useApi('/api/mess')
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="mess-page-header">
        <h2>Outside Mess</h2>
        <p>Affordable home-style food near GLA</p>
      </div>
      <div className="section">
        <div className="mess-info-banner">
          <i className="ti ti-info-circle" aria-hidden="true"></i>
          These are outside-campus mess options. Hostel girls — order via WhatsApp or ask a friend!
        </div>
        {loading && <div className="loading"><div className="spinner"></div></div>}
        {messList?.map(m => (
          <div key={m._id} className="mess-full-card" onClick={() => setSelected(selected?._id === m._id ? null : m)}>
            <div className="mess-full-top">
              <span className="mess-big-emoji">{m.emoji}</span>
              <div className="mess-full-info">
                <div className="mess-full-name">{m.name}</div>
                <div className="mess-full-detail">📍 {m.address}</div>
                {m.phone && <div className="mess-full-detail">📞 {m.phone}</div>}
                <div className="mess-full-detail">⏰ {m.timings}</div>
                <div className="mess-full-price">₹{m.pricePerMeal}/meal · Monthly ₹{m.monthlyPrice}</div>
                <div className="mess-full-badges">
                  {m.girlsPreferred && <span className="chip chip-pk">Girls Preferred ♥</span>}
                  {m.isVeg  && <span className="chip chip-gr">Pure Veg</span>}
                  {!m.isVeg && <span className="chip chip-g">Veg + Non-veg</span>}
                </div>
              </div>
              <i className={`ti ${selected?._id===m._id ? 'ti-chevron-up' : 'ti-chevron-down'}`} style={{color:'var(--muted)',fontSize:'17px',flexShrink:0}} aria-hidden="true"></i>
            </div>
            {selected?._id === m._id && (
              <div className="mess-expanded" onClick={e => e.stopPropagation()}>
                {m.description && <p style={{fontSize:'12px',color:'var(--muted)',marginBottom:'10px'}}>{m.description}</p>}
                {m.phone && <a href={`tel:${m.phone}`} className="mess-action-btn">📞 Call {m.phone}</a>}
                <WriteReview targetType="mess" targetId={m._id} />
              </div>
            )}
          </div>
        ))}
        {!loading && !messList?.length && (
          <div className="empty-state"><div className="emoji">🏠</div><p>No mess listings yet — admin can add!</p></div>
        )}
      </div>
    </div>
  )
}
