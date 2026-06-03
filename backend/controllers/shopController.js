const { Shop, User } = require('../models');
const { Op } = require('sequelize');

exports.getShops = async (req, res) => {
  try {
    const { location, category, search } = req.query;
    const where = {};
    if (location) where.location = location;
    if (category) where.category = category;
    if (search)   where.name = { [Op.like]: `%${search}%` };
    const shops = await Shop.findAll({ where, order: [['avgRating','DESC']] });
    res.json(shops);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updateShop = async (req, res) => {
  try {
    await Shop.update(req.body, { where: { id: req.params.id } });
    const shop = await Shop.findByPk(req.params.id);
    res.json(shop);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.saveShop = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: [{ association: 'savedShops' }] });
    const savedIds = user.savedShops.map(s => s.id);
    const shopId = parseInt(req.params.id);
    if (savedIds.includes(shopId)) {
      await user.removeSavedShops(shopId);
      return res.json({ saved: false });
    }
    await user.addSavedShops(shopId);
    res.json({ saved: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
