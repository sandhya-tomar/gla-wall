const router = require('express').Router();
const { getAll, create, like } = require('../controllers/confessionController');
const { protect } = require('../middleware/auth');

router.get('/', getAll);
router.post('/', protect, create);         // login needed to post, identity hidden
router.patch('/:id/like', like);           // no login to like
module.exports = router;
