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

// exports.create = async (req, res) => {
//   try {
//     const { text, branch, year } = req.body;
//     if (!text?.trim()) return res.status(400).json({ message: 'Text required' });
//     const { name, emoji } = genAnon();
//     const post = await Confession.create({
//       text: text.trim(), anonName: name, anonEmoji: emoji,
//       branch, year, userId: req.user?.id || null,
//     });
//     const safe = post.toJSON(); delete safe.userId;
//     res.status(201).json(safe);
//   } catch (e) { res.status(400).json({ message: e.message }); }
// };

exports.create = async (req, res) => {
  try {
    const { text, branch, year } = req.body;
    if (!text?.trim()) return res.status(400).json({ message: 'Text required' });

    // ── Anti-spam: same user 5 min mein max 3 posts ──
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentCount = await Confession.count({
      where: {
        userId: req.user.id,
        createdAt: { [require('sequelize').Op.gte]: fiveMinAgo }
      }
    });
    if (recentCount >= 3) {
      return res.status(429).json({ message: 'Thoda ruko! 5 minutes mein 3 se zyada post nahi kar sakte 😅' });
    }

    // ── Auto-hide if reported 5+ times ──
    const { name, emoji } = genAnon();
    const post = await Confession.create({
      text: text.trim(), anonName: name, anonEmoji: emoji,
      branch, year, userId: req.user.id,
    });
    const safe = post.toJSON(); delete safe.userId;
    res.status(201).json(safe);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.like = async (req, res) => {
  try {
    const { ConfessionLike } = require('../models');
    const userId = req.user?.id || null;
    
    if (userId) {
      // check already liked
      const existing = await ConfessionLike.findOne({ 
        where: { confessionId: req.params.id, userId } 
      });
      if (existing) {
        // unlike
        await existing.destroy();
        await Confession.decrement('likes', { by: 1, where: { id: req.params.id } });
      } else {
        // like
        await ConfessionLike.create({ confessionId: req.params.id, userId });
        await Confession.increment('likes', { by: 1, where: { id: req.params.id } });
      }
    } else {
      await Confession.increment('likes', { by: 1, where: { id: req.params.id } });
    }
    const post = await Confession.findByPk(req.params.id, { attributes: { exclude: ['userId'] } });
    res.json(post);
  } catch (e) { res.status(500).json({ message: e.message }); }
};