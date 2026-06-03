import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Topbar.css'

export default function Topbar() {
  const { isLoggedIn, logout, user } = useAuth()
  const navigate = useNavigate()
  return (
    <header className="topbar">
      <Link to="/" className="topbar-logo">GLA<em>Any</em><span>thing</span></Link>
      <div className="topbar-search">
        <i className="ti ti-search" aria-hidden="true"></i>
        <input placeholder="canteen, notes, confessions..." />
      </div>
      <div className="topbar-right">
        {isLoggedIn ? (
          <>
            <span className="topbar-hi">Hi, {user.name.split(' ')[0]}!</span>
            <button className="btn-outline" onClick={() => { logout(); navigate('/') }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/register" className="btn-gold">Join free</Link>
          </>
        )}
      </div>
    </header>
  )
}
