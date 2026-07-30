const sequelize      = require('../config/db');
const User           = require('./User');
const Shop           = require('./Shop');
const Mess           = require('./Mess');
const Review         = require('./Review');
const Confession     = require('./Confession');
const Note           = require('./Note');
const Placement      = require('./Placement');
const ConfessionLike = require('./ConfessionLike');
const Comment        = require('./Comment');

// SavedShops — many-to-many: User <-> Shop
User.belongsToMany(Shop, { through: 'saved_shops', foreignKey: 'userId', as: 'savedShops' });
Shop.belongsToMany(User, { through: 'saved_shops', foreignKey: 'shopId', as: 'savedByUsers' });

module.exports = { sequelize, User, Shop, Mess, Review, Confession, ConfessionLike, Comment, Note, Placement };