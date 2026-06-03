import axios from 'axios'
import './ReviewCard.css'

const COLORS = ['#5429B8','#7C3AED','#0369A1','#065F46','#B45309','#9D174D']

export default function ReviewCard({ review, onHelpful }) {
  const initial = (review.reviewerName || 'A')[0].toUpperCase()
  const color   = COLORS[initial.charCodeAt(0) % COLORS.length]
  const stars   = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)

  const markHelpful = async () => {
    await axios.patch(`/api/reviews/${review._id}/helpful`)
    if (onHelpful) onHelpful()
  }

  return (
    <div className="review-card card">
      <div className="review-header">
        <div className="review-avatar" style={{background: color}}>{initial}</div>
        <div>
          <div className="review-name">{review.reviewerName || 'Anonymous'}</div>
          <div className="review-date">{new Date(review.createdAt).toLocaleDateString('en-IN')}</div>
        </div>
        <span className="stars" style={{marginLeft:'auto'}}>{stars}</span>
      </div>
      <p className="review-text">{review.comment}</p>
      <button className="helpful-btn" onClick={markHelpful}>
        <i className="ti ti-thumb-up" aria-hidden="true"></i> Helpful ({review.helpful || 0})
      </button>
    </div>
  )
}
