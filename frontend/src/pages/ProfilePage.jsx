import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ShopCard from '../components/ShopCard'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, logout, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  if (!isLoggedIn) return (
    <div>
      <div className="profile-guest-top">
        <div className="guest-emoji">👤</div>
        <h2>You're not logged in</h2>
        <p>Sign in to save shops, see contacts and unlock premium content!</p>
      </div>
      <div style={{padding:'20px 16px',display:'flex',flexDirection:'column',gap:'10px',maxWidth:'400px',margin:'0 auto'}}>
        <Link to="/login"    className="btn-primary" style={{display:'block',textAlign:'center',textDecoration:'none',padding:'12px',borderRadius:'8px'}}>Login</Link>
        <Link to="/register" className="btn-outline"  style={{display:'block',textAlign:'center',textDecoration:'none',padding:'12px',borderRadius:'8px'}}>Sign Up Free</Link>
      </div>
    </div>
  )

  return (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        {user.rollNumber && <p className="profile-roll">Roll: {user.rollNumber}</p>}
      </div>

      <div className="section">
        <div className="section-title">Unlocked Features</div>
        <div className="features-list">
          <div className="feature-item"><i className="ti ti-phone" aria-hidden="true"></i> View shop phone & WhatsApp</div>
          <div className="feature-item"><i className="ti ti-heart" aria-hidden="true"></i> Save favourite shops</div>
          <div className="feature-item"><i className="ti ti-masks-theater" aria-hidden="true"></i> Post anonymous confessions</div>
          <div className="feature-item"><i className="ti ti-notebook" aria-hidden="true"></i> Download free notes</div>
        </div>
      </div>

      <div className="divider" />

      <div className="section">
        {user.savedShops?.length > 0 ? (
          <>
            <div className="section-title">Saved Shops</div>
            <div className="cards-grid">{user.savedShops.map(s => <ShopCard key={s._id} shop={s} />)}</div>
          </>
        ) : (
          <div className="empty-state">
            <div className="emoji">❤️</div>
            <p>No saved shops yet. Browse and tap ❤️ to save!</p>
            <Link to="/shops" className="btn-primary" style={{display:'inline-block',marginTop:'12px',textDecoration:'none',padding:'8px 20px',borderRadius:'8px'}}>Browse Shops</Link>
          </div>
        )}
      </div>

      <div className="section">
        <button className="logout-btn" onClick={() => { logout(); navigate('/') }}>
          <i className="ti ti-logout" aria-hidden="true"></i> Logout
        </button>
      </div>
    </div>
  )
}
