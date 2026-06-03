const express = require('express');
const router = express.Router();
const { getAllMess, getMessById, createMess, updateMess } = require('../controllers/messController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getAllMess);
router.get('/:id', getMessById);
router.post('/', protect, adminOnly, createMess);
router.put('/:id', protect, adminOnly, updateMess);

module.exports = router;
