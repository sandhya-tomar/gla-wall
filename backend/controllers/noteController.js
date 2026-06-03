const { Note } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.subject) where.subject = req.query.subject;
    if (req.query.type)    where.type    = req.query.type;
    const notes = await Note.findAll({ where, order: [['downloads','DESC']] });
    res.json(notes);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.download = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (note.isPremium && !req.user?.isPremium) return res.status(403).json({ message: 'Premium required' });
    await Note.increment('downloads', { by: 1, where: { id: req.params.id } });
    res.redirect(note.fileUrl);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, uploadedBy: req.user.id });
    res.status(201).json(note);
  } catch (e) { res.status(400).json({ message: e.message }); }
};
