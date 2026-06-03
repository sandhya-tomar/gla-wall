import { Link, useLocation } from 'react-router-dom'
import './BottomNav.css'

const nav = [
  { to: '/',           icon: 'ti-home',            label: 'Home' },
  { to: '/shops',      icon: 'ti-soup',             label: 'Food' },
  { to: '/confess',    icon: 'ti-masks-theater',    label: 'Confess' },
  { to: '/notes',      icon: 'ti-notebook',         label: 'Notes' },
  { to: '/profile',    icon: 'ti-user',             label: 'Profile' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="bottom-nav">
      {nav.map(n => (
        <Link key={n.to} to={n.to} className={`bnav-item${pathname === n.to ? ' active' : ''}`}>
          <i className={`ti ${n.icon}`} aria-hidden="true"></i>
          <span>{n.label}</span>
        </Link>
      ))}
    </nav>
  )
}
