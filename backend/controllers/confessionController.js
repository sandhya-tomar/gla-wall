const { Confession } = require('../models');

const ANIMALS = ["SleepyFox","CalmPanda","QuietTurtle","BraveLion","CoolPenguin","WildButterfly","LoneWolf","ChillBear","RandomRaccoon","CuriousFrog","MysticUnicorn","TigerVibes","EagleEye","HappyDolphin","NightOwl"];
const EMOJIS  = ["🦊","🐼","🐢","🦁","🐧","🦋","🐺","🐻","🦝","🐸","🦄","🐯","🦅","🐬","🦉"];

function genAnon() {
  const i = Math.floor(Math.random() * ANIMALS.length);
  return { name: `${ANIMALS[i]}_${Math.floor(Math.random()*99)+1}`, emoji: EMOJIS[i] };
}

exports.getAll = async (req, res) => {
  try {
    const posts = await Confession.findAll({
      where: { isVisible: true },
      attributes: { exclude: ['userId'] },
      order: [['createdAt','DESC']], limit: 50,
    });
    res.json(posts);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try {
    const { text, branch, year } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Text required' });
    const { name, emoji } = genAnon();
    const post = await Confession.create({
      text: text.trim(), anonName: name, anonEmoji: emoji,
      branch, year, userId: req.user?.id || null,
    });
    const safe = post.toJSON(); delete safe.userId;
    res.status(201).json(safe);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.like = async (req, res) => {
  try {
    await Confession.increment('likes', { by: 1, where: { id: req.params.id } });
    const post = await Confession.findByPk(req.params.id, { attributes: { exclude: ['userId'] } });
    res.json(post);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
