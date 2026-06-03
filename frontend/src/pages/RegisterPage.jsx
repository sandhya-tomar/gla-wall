import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './AuthPages.css'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', rollNumber: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await axios.post('/api/auth/register', form)
      login(res.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-top">
        <div className="auth-emoji">👋</div>
        <h1>Join GLA Food Finder</h1>
        <p>Free to join. Unlock contacts, save shops & deals!</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-group">
          <label>Full Name</label>
          <input placeholder="Sandhya Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Roll Number (optional)</label>
          <input placeholder="e.g. 2200290100XXX" value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        </div>
        <button type="submit" className="btn-primary" style={{width:'100%'}} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up Free'}
        </button>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}
