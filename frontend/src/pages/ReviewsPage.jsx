import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import ReviewCard from '../components/ReviewCard'
import WriteReview from '../components/WriteReview'
import './ReviewsPage.css'

export default function ReviewsPage() {
  const [tab, setTab]       = useState('read')
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const loadReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/reviews')
      setReviews(res.data)
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadReviews() }, [loadReviews])

  return (
    <div>
      <div className="reviews-header">
        <h2>Student Reviews</h2>
        <p>Real feedback from real GLA students</p>
      </div>
      <div className="tabs-row">
        <button className={`tab-btn${tab==='read'?' active':''}`} onClick={() => setTab('read')}>Read Reviews</button>
        <button className={`tab-btn${tab==='write'?' active':''}`} onClick={() => setTab('write')}>Write a Review</button>
      </div>
      <div className="section">
        {tab === 'read' && (
          <>
            {loading && <div className="loading"><div className="spinner"></div></div>}
            {!loading && reviews.length > 0 && reviews.map(r => <ReviewCard key={r._id} review={r} onHelpful={loadReviews} />)}
            {!loading && !reviews.length && <div className="empty-state"><div className="emoji">⭐</div><p>No reviews yet — be first!</p></div>}
          </>
        )}
        {tab === 'write' && (
          <div>
            <p style={{fontSize:'12px',color:'var(--muted)',marginBottom:'12px'}}>
              Go to a specific shop or mess page to review it. Or leave a general one below:
            </p>
            <WriteReview targetType="shop" targetId="general" onSuccess={() => { setTab('read'); loadReviews() }} />
          </div>
        )}
      </div>
    </div>
  )
}
