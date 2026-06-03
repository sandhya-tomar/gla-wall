const express = require('express');
const router = express.Router();
const { getShops, getShopById, createShop, updateShop, saveShop } = require('../controllers/shopController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getShops);
router.get('/:id', getShopById);
router.post('/', protect, adminOnly, createShop);
router.put('/:id', protect, adminOnly, updateShop);
router.post('/:id/save', protect, saveShop);

module.exports = router;
