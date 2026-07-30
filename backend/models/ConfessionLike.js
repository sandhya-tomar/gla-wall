const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ConfessionLike = sequelize.define('ConfessionLike', {
  confessionId: { type: DataTypes.INTEGER, allowNull: false },
  userId:       { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'confession_likes', timestamps: false });

module.exports = ConfessionLike;