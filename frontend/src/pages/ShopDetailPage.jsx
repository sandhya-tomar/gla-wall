import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../context/AuthContext'
import ReviewCard from '../components/ReviewCard'
import WriteReview from '../components/WriteReview'
import './ShopDetailPage.css'

export default function ShopDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { data: shop, loading } = useApi(`/api/shops/${id}`)
  const [reviews, setReviews] = useState([])
  const [saved, setSaved] = useState(false)

  const loadReviews = useCallback(async () => {
    try {
      const res = await axios.get(`/api/reviews?targetType=shop&targetId=${id}`)
      setReviews(res.data)
    } catch {}
  }, [id])

  useEffect(() => { loadReviews() }, [loadReviews])

  const toggleSave = async () => {
    if (!isLoggedIn) { navigate('/login'); return }
    await axios.post(`/api/shops/${id}/save`)
    setSaved(s => !s)
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>
  if (!shop)   return <div className="empty-state"><div className="emoji">😕</div><p>Shop not found</p></div>

  return (
    <div>
      <div className="shop-detail-hero">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <i className="ti ti-arrow-left" aria-hidden="true"></i>
        </button>
        <span className="shop-detail-emoji">{shop.emoji || '🍽️'}</span>
        <h1 className="shop-detail-name">{shop.name}</h1>
        <div className="shop-detail-rating">
          <span className="stars">{'★'.repeat(Math.round(shop.avgRating||0))}{'☆'.repeat(5-Math.round(shop.avgRating||0))}</span>
          <span>{(shop.avgRating||0).toFixed(1)} · {shop.reviewCount||0} reviews</span>
        </div>
        <div className="shop-detail-badges">
          {shop.isVeg            && <span className="chip chip-gr">Veg</span>}
          {shop.deliveryAvailable && <span className="chip chip-g">Delivery</span>}
          {shop.girlsFriendly    && <span className="chip chip-pk">Girls ♥</span>}
          <span className={`chip ${shop.isOpen ? 'chip-gr' : 'chip-r'}`}>{shop.isOpen ? 'Open Now' : 'Closed'}</span>
        </div>
      </div>

      <div className="section">
        {shop.description && <p className="shop-desc">{shop.description}</p>}
        <div className="info-grid">
          {shop.address && <div className="info-item"><i className="ti ti-map-pin" aria-hidden="true"></i><span>{shop.address}</span></div>}
          {shop.timings && <div className="info-item"><i className="ti ti-clock" aria-hidden="true"></i><span>{shop.timings}</span></div>}
        </div>

        {isLoggedIn ? (
          <div className="contact-box">
            {shop.phone    && <a href={`tel:${shop.phone}`} className="contact-btn"><i className="ti ti-phone" aria-hidden="true"></i> Call: {shop.phone}</a>}
            {shop.whatsapp && <a href={`https://wa.me/${shop.whatsapp}`} target="_blank" rel="noreferrer" className="contact-btn whatsapp"><i className="ti ti-brand-whatsapp" aria-hidden="true"></i> WhatsApp Order</a>}
          </div>
        ) : (
          <div className="locked-box">
            <i className="ti ti-lock" aria-hidden="true"></i>
            <div className="locked-box-text">
              <div className="title">Sign in to see contact & WhatsApp</div>
              <div className="sub">Free to join — takes 30 seconds</div>
            </div>
            <button className="btn-gold" style={{marginLeft:'auto',fontSize:'12px',padding:'6px 14px',borderRadius:'7px'}} onClick={() => navigate('/register')}>Sign Up</button>
          </div>
        )}

        <button className={`save-btn${saved ? ' saved' : ''}`} onClick={toggleSave}>
          <i className={`ti ${saved ? 'ti-heart-fill' : 'ti-heart'}`} aria-hidden="true"></i>
          {saved ? 'Saved!' : 'Save this Shop'}
        </button>
      </div>

      <div className="divider" />
      <div className="section">
        <WriteReview targetType="shop" targetId={id} onSuccess={loadReviews} />
        <div className="section-title" style={{marginTop:'16px'}}>All Reviews</div>
        {reviews.length > 0
          ? reviews.map(r => <ReviewCard key={r._id} review={r} onHelpful={loadReviews} />)
          : <div className="empty-state"><div className="emoji">⭐</div><p>No reviews yet — be first!</p></div>
        }
      </div>
    </div>
  )
}
