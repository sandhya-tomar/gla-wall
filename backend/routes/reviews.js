const express = require('express');
const router = express.Router();
const { getReviews, createReview, markHelpful } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.get('/', getReviews);
router.post('/', createReview);            // no login needed
router.patch('/:id/helpful', markHelpful);

module.exports = router;
