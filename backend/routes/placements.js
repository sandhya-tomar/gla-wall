const router = require('express').Router();
const { getAll, create } = require('../controllers/placementController');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/', getAll);
router.post('/', protect, adminOnly, create);
module.exports = router;
