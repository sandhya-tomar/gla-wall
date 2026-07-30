const router = require('express').Router();
const { getAll, create, like } = require('../controllers/confessionController');
const { protect } = require('../middleware/auth');

const { Confession, Comment } = require('../models');

// get comments
router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.findAll({ 
    where: { confessionId: req.params.id },
    attributes: { exclude: ['userId'] },
    order: [['createdAt', 'ASC']]
  });
  res.json(comments);
});

// post comment
router.post('/:id/comments', protect, async (req, res) => {
  const { text } = req.body;
  const animals = ["SleepyFox","CalmPanda","QuietTurtle","BraveLion","CoolPenguin"];
  const emojis  = ["🦊","🐼","🐢","🦁","🐧"];
  const i = Math.floor(Math.random() * animals.length);
  const comment = await Comment.create({
    confessionId: req.params.id,
    text,
    anonName: `${animals[i]}_${Math.floor(Math.random()*99)+1}`,
    anonEmoji: emojis[i],
    userId: req.user.id,
  });
  // increment comment count
  await Confession.increment('comments', { by: 1, where: { id: req.params.id } });
  const safe = comment.toJSON(); delete safe.userId;
  res.json(safe);
});




router.get('/', getAll);
router.post('/', protect, create);         // login needed to post, identity hidden
router.patch('/:id/like', protect, like);           // no login to like

router.patch('/:id/report', async (req, res) => {
  const { Confession } = require('../models');
  await Confession.increment('reports', { by: 1, where: { id: req.params.id } });
  // 5+ reports = auto hide
  const post = await Confession.findByPk(req.params.id);
  if (post.reports >= 5) await post.update({ isVisible: false });
  res.json({ message: 'Reported' });
});

module.exports = router;
