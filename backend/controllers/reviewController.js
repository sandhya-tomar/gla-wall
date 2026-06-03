const { Review, Shop, Mess } = require('../models');

const updateAvgRating = async (targetType, targetId) => {
  const reviews = await Review.findAll({ where: { targetType, targetId } });
  if (!reviews.length) return;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const Model = targetType === 'shop' ? Shop : Mess;
  await Model.update({ avgRating: parseFloat(avg.toFixed(1)), reviewCount: reviews.length }, { where: { id: targetId } });
};

exports.getReviews = async (req, res) => {
  try {
    const where = {};
    if (req.query.targetType) where.targetType = req.query.targetType;
    if (req.query.targetId)   where.targetId   = req.query.targetId;
    const reviews = await Review.findAll({ where, order: [['createdAt','DESC']], limit: 50 });
    res.json(reviews);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.createReview = async (req, res) => {
  try {
    const { targetType, targetId, rating, comment, reviewerName } = req.body;
    if (!targetType || !targetId || !rating || !comment)
      return res.status(400).json({ message: 'All fields required' });
    const review = await Review.create({
      targetType, targetId, rating, comment,
      reviewerName: reviewerName || 'Anonymous Student',
      userId: req.user?.id || null,
    });
    await updateAvgRating(targetType, targetId);
    res.status(201).json(review);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.markHelpful = async (req, res) => {
  try {
    await Review.increment('helpful', { by: 1, where: { id: req.params.id } });
    const review = await Review.findByPk(req.params.id);
    res.json(review);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
