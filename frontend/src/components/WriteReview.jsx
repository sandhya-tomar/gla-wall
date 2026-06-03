import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import './WriteReview.css'

export default function WriteReview({ targetType, targetId, onSuccess }) {
  const { user } = useAuth()
  const [rating, setRating]           = useState(5)
  const [comment, setComment]         = useState('')
  const [reviewerName, setReviewerName] = useState(user?.name || '')
  const [loading, setLoading]         = useState(false)
  const [submitted, setSubmitted]     = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setLoading(true)
    try {
      await axios.post('/api/reviews', { targetType, targetId, rating, comment, reviewerName: reviewerName || 'Anonymous Student' })
      setSubmitted(true)
      setComment('')
      if (onSuccess) onSuccess()
    } catch (err) { alert(err.response?.data?.message || 'Could not submit') }
    setLoading(false)
  }

  if (submitted) return (
    <div className="review-success">
      <span>🎉</span> Thanks! Your review helps other students.
      <button onClick={() => setSubmitted(false)}>Write another</button>
    </div>
  )

  return (
    <div className="write-review card">
      <h3 className="write-review-title">Write a Review</h3>
      <p className="write-review-sub">No login needed — just share your experience!</p>
      <form onSubmit={submit}>
        <div className="star-picker">
          {[1,2,3,4,5].map(n => (
            <span key={n} className={`star${n <= rating ? ' active' : ''}`} onClick={() => setRating(n)}>★</span>
          ))}
        </div>
        <div className="form-group">
          <label>Your Name (optional)</label>
          <input value={reviewerName} onChange={e => setReviewerName(e.target.value)} placeholder="Anonymous Student" />
        </div>
        <div className="form-group">
          <label>Your Review *</label>
          <textarea rows="3" value={comment} onChange={e => setComment(e.target.value)} placeholder="Food quality, price, service..." required />
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{width:'100%'}}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}
