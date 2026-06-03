import { Link } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import ShopCard from '../components/ShopCard'
import './HomePage.css'

export default function HomePage() {
  const { data: shops }       = useApi('/api/shops')
  const { data: confessions } = useApi('/api/confessions')
  const { data: mess }        = useApi('/api/mess')
  const { data: notes }       = useApi('/api/notes')
  const { data: placements } = useApi('/api/placements?status=open')
  
  const topNote = notes?.[0]

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-tag"><i className="ti ti-map-pin" aria-hidden="true"></i> GLA University · Mathura</div>
        <h1 className="hero-title">Find <em>anything</em> on campus</h1>
        <p className="hero-sub">Food · Confessions · Notes · Placements — one place, no fuss</p>
      </div>

      <div className="section">
        <div className="bento">

          {/* trending confessions */}
          <div className="bcard tall card">
            <div className="bcard-label"><i className="ti ti-flame" aria-hidden="true"></i> trending confessions</div>
            {confessions?.slice(0,3).map(c => (
              <div key={c.id} className="mini-confess">
                <div className="mc-top">
                  <div className="mc-avatar">{c.anonEmoji}</div>
                  <span className="mc-handle">{c.anonName}</span>
                  <span className="mc-time">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
                <p className="mc-text">{c.text}</p>
                <div className="mc-acts">
                  <span><i className="ti ti-heart" aria-hidden="true"></i> {c.likes || 0}</span>
                </div>
              </div>
            ))}
            {!confessions?.length && (
              <div className="empty-state" style={{padding:'20px 0'}}>
                <div className="emoji">🎭</div><p>Be the first to post!</p>
              </div>
            )}
          </div>

          {/* cheapest mess */}
          <div className="bcard card" style={{background:'var(--surface3)'}}>
            <div className="bcard-label"><i className="ti ti-soup" aria-hidden="true"></i> cheapest right now</div>
            {mess?.[0] ? (
              <>
                <div className="big-emoji">🏠</div>
                <div className="bcard-title">{mess[0].name}</div>
                <div className="bcard-price">₹{mess[0].pricePerMeal}/meal</div>
                <div className="bcard-sub">{mess[0].address}</div>
              </>
            ) : (
              <div className="empty-state" style={{padding:'16px 0'}}><div className="emoji">🍛</div><p>Add mess data</p></div>
            )}
          </div>

          {/* most downloaded note */}
          <div className="bcard card">
            <div className="bcard-label"><i className="ti ti-file" aria-hidden="true"></i> most downloaded</div>
            {topNote ? (
              <>
                <div className="big-emoji">📄</div>
                <div className="bcard-title">{topNote.title}</div>
                <div className="bcard-sub" style={{marginTop:'6px'}}>{topNote.downloads} downloads · {topNote.subject}</div>
                <div style={{marginTop:'8px'}}>
                  <span className={`chip ${topNote.isPremium ? 'chip-g' : 'chip-gr'}`}>
                    {topNote.isPremium ? 'PREMIUM' : 'FREE'}
                  </span>
                </div>
              </>
            ) : (
              <div className="empty-state" style={{padding:'16px 0'}}><div className="emoji">📄</div><p>No notes yet</p></div>
            )}
          </div>

          {/* price compare */}
          <div className="bcard wide card">
            <div className="bcard-label"><i className="ti ti-scale" aria-hidden="true"></i> price compare — today's meal</div>
            {mess?.length ? mess.map((m,i) => (
              <div key={m.id} className="cmp-row">
                <span className="cmp-name">{m.name}</span>
                <div className="cmp-bar">
                  <div className="cmp-fill" style={{width:`${Math.min((m.pricePerMeal/100)*100, 100)}%`, background: ['#8B5CF6','#059669','#B8860B','#993556'][i%4]}}></div>
                </div>
                <span className="cmp-val">₹{m.pricePerMeal}</span>
              </div>
            )) : (
              <div style={{fontSize:'12px',color:'var(--muted)',padding:'8px 0'}}>Mess data coming soon!</div>
            )}
          </div>

          {/* hiring now — premium */}
<div className="bcard card" style={{borderColor:'rgba(240,192,64,0.3)'}}>
  <div className="bcard-label"><i className="ti ti-briefcase" aria-hidden="true"></i> hiring now</div>
  {placements?.[0] ? (
    <>
      <div className="big-emoji">🏢</div>
      <div className="bcard-title">{placements[0].company}</div>
      <div className="bcard-sub" style={{marginTop:'6px'}}>{placements[0].role}</div>
      <div style={{marginTop:'10px',borderTop:'1px solid var(--border)',paddingTop:'10px',display:'flex',alignItems:'center',gap:'8px'}}>
        <i className="ti ti-lock" style={{color:'var(--gold)'}} aria-hidden="true"></i>
        <span style={{fontSize:'11px',color:'var(--muted)'}}>Full details — Premium only</span>
        <Link to="/register" style={{marginLeft:'auto',fontSize:'11px',color:'var(--gold)',fontWeight:'700',textDecoration:'none'}}>Unlock ₹99</Link>
      </div>
    </>
  ) : (
    <div className="empty-state" style={{padding:'16px 0'}}><div className="emoji">🏢</div><p>No openings yet</p></div>
  )}
</div>

        </div>
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-title">🍔 Food Shops <Link to="/shops">See all →</Link></div>
        {shops?.length ? (
          <div className="cards-grid">
            {shops.slice(0,4).map(s => <ShopCard key={s.id} shop={s} />)}
          </div>
        ) : (
          <div className="empty-state"><div className="emoji">🍽️</div><p>No shops yet!</p></div>
        )}
      </div>
    </div>
  )
}