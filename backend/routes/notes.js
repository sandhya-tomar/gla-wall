const router = require('express').Router();
const { getAll, download, create } = require('../controllers/noteController');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/', getAll);
router.get('/:id/download', download);
router.post('/', protect, adminOnly, create);
module.exports = router;
