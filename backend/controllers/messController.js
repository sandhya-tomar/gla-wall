const { Mess } = require('../models');

exports.getAllMess = async (req, res) => {
  try {
    const list = await Mess.findAll({ order: [['avgRating','DESC']] });
    res.json(list);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getMessById = async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);
    if (!mess) return res.status(404).json({ message: 'Not found' });
    res.json(mess);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.createMess = async (req, res) => {
  try {
    const mess = await Mess.create(req.body);
    res.status(201).json(mess);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updateMess = async (req, res) => {
  try {
    await Mess.update(req.body, { where: { id: req.params.id } });
    const mess = await Mess.findByPk(req.params.id);
    res.json(mess);
  } catch (e) { res.status(400).json({ message: e.message }); }
};
