import { Link } from 'react-router-dom'
import './ShopCard.css'

export default function ShopCard({ shop }) {
  return (
    <Link to={`/shops/${shop.id}`} className="shop-card card">
      <div className="sc-img">{shop.emoji || '🍽️'}</div>
      <div className="sc-body">
        <div className="sc-name">{shop.name}</div>
        <div className="sc-stars">{'★'.repeat(Math.round(shop.avgRating||0))}{'☆'.repeat(5-Math.round(shop.avgRating||0))} <span>{(shop.avgRating||0).toFixed(1)}</span></div>
        <div className="sc-tags">
          {shop.isVeg           && <span className="chip chip-gr">Veg</span>}
          {shop.deliveryAvailable && <span className="chip chip-g">Delivery</span>}
          {shop.girlsFriendly   && <span className="chip chip-pk">Girls ♥</span>}
          <span className={`chip ${shop.isOpen ? 'chip-gr' : 'chip-r'}`}>{shop.isOpen ? 'Open' : 'Closed'}</span>
        </div>
      </div>
    </Link>
  )
}
