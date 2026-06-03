const jwt = require('jsonwebtoken');
const { User } = require('../models');

const token = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = async (req, res) => {
  try {
    const { name, email, password, rollNumber } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password, rollNumber });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, token: token(user.id) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await user.matchPassword(password)) {
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role, isPremium: user.isPremium, token: token(user.id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{ association: 'savedShops' }],
    });
    res.json(user);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
