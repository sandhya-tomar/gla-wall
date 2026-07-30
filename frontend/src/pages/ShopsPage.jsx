import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ShopCard from '../components/ShopCard'
import './ShopsPage.css'

export default function ShopsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const location = searchParams.get('location') || ''
  const category = searchParams.get('category') || ''

  const fetchShops = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (location) params.set('location', location)
      if (category) params.set('category', category)
      if (search) params.set('search', search)
      const res = await axios.get(`/api/shops?${params}`)
      setShops(res.data)
    } catch { setShops([]) }
    setLoading(false)
  }

  useEffect(() => { fetchShops() }, [location, category])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchShops()
  }

  const setFilter = (key, val) => {
    const p = new URLSearchParams(searchParams)
    if (val) p.set(key, val); else p.delete(key)
    setSearchParams(p)
  }

  return (
    <div>
      <div className="shops-header">
        <h2>Find Food Shops</h2>
        <form className="shop-search" onSubmit={handleSearch}>
          <i className="ti ti-search" aria-hidden="true"></i>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name..." />
          <button type="submit">Go</button>
        </form>
        <div className="filter-row">
          <span className="filter-label">Location:</span>
          <button className={`filter-btn ${!location ? 'active' : ''}`} onClick={() => setFilter('location','')}>All</button>
          <button className={`filter-btn ${location==='inside' ? 'active' : ''}`} onClick={() => setFilter('location','inside')}>Inside Campus</button>
          <button className={`filter-btn ${location==='outside' ? 'active' : ''}`} onClick={() => setFilter('location','outside')}>Outside Campus</button>
        </div>
      </div>
      <div className="section">
        {loading
          ? <div className="loading"><div className="spinner"></div></div>
          : shops.length > 0
            ? <div className="cards-grid">{shops.map(s => <ShopCard key={s.id} shop={s} />)}</div>
            : <div className="empty-state"><div className="emoji">🔍</div><p>No shops found. Try a different search!</p></div>
        }
      </div>
    </div>
  )
}
