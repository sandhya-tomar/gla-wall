const { Placement } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.type)   where.type   = req.query.type;
    const list = await Placement.findAll({ where, order: [['createdAt','DESC']] });
    res.json(list);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try {
    const p = await Placement.create(req.body);
    res.status(201).json(p);
  } catch (e) { res.status(400).json({ message: e.message }); }
};
