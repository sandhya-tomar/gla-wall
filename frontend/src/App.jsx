import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import ShopsPage from './pages/ShopsPage'
import ShopDetailPage from './pages/ShopDetailPage'
import MessPage from './pages/MessPage'
import ReviewsPage from './pages/ReviewsPage'
import ConfessPage from './pages/ConfessPage'
import NotesPage from './pages/NotesPage'
import PlacementsPage from './pages/PlacementsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

export default function App() {
  return (
    
    <AuthProvider>

      
      <div className="app-layout">
        <div className="app-topbar"><Topbar /></div>
        <div className="app-sidebar"><Sidebar /></div>
        <div className="app-main">
          <div className="module-tabs">
            <a href="/" className="mtab"><i className="ti ti-home" aria-hidden="true"></i> Home</a>
            <a href="/shops" className="mtab"><i className="ti ti-soup" aria-hidden="true"></i> Food</a>
            <a href="/confess" className="mtab"><i className="ti ti-masks-theater" aria-hidden="true"></i> Confess</a>
            <a href="/notes" className="mtab"><i className="ti ti-notebook" aria-hidden="true"></i> Notes <span className="mtab-badge">FREE</span></a>
            <a href="/placements" className="mtab"><i className="ti ti-briefcase" aria-hidden="true"></i> Placements <span className="mtab-badge">HOT</span></a>
          </div>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shops" element={<ShopsPage />} />
              <Route path="/shops/:id" element={<ShopDetailPage />} />
              <Route path="/mess" element={<MessPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/confess" element={<ConfessPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/placements" element={<PlacementsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </div>
    </AuthProvider>
  )
}
