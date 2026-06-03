import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const { pathname } = useLocation()
  const link = (to) => `sidebar-link${pathname === to ? ' active' : ''}`
  return (
    <nav className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Main</div>
        <Link to="/" className={link('/')}><i className="ti ti-home" aria-hidden="true"></i> Home</Link>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Modules</div>
        <Link to="/shops"      className={link('/shops')}><i className="ti ti-soup" aria-hidden="true"></i> Food</Link>
        <Link to="/confess"    className={link('/confess')}><i className="ti ti-masks-theater" aria-hidden="true"></i> Confessions</Link>
        <Link to="/notes"      className={link('/notes')}><i className="ti ti-notebook" aria-hidden="true"></i> Notes / PYQ</Link>
        <Link to="/placements" className={link('/placements')}><i className="ti ti-briefcase" aria-hidden="true"></i> Placements</Link>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Account</div>
        <Link to="/profile" className={link('/profile')}><i className="ti ti-user" aria-hidden="true"></i> Profile</Link>
        <Link to="/profile" className={link('/saved')}><i className="ti ti-heart" aria-hidden="true"></i> Saved</Link>
      </div>
      <div className="sidebar-premium">
        <div className="sp-title">👑 Premium — ₹99/month</div>
        <div className="sp-sub">All PYQs · Interview prep · Placement alerts</div>
        <Link to="/register" className="btn-gold" style={{display:'block',textAlign:'center',marginTop:'10px',textDecoration:'none',fontSize:'12px',padding:'7px 0',borderRadius:'7px'}}>Upgrade Now</Link>
      </div>
    </nav>
  )
}
