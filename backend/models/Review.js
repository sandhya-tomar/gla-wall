const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
  id:           { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  targetType:   { type: DataTypes.ENUM('shop','mess'), allowNull: false },
  targetId:     { type: DataTypes.INTEGER, allowNull: false },
  rating:       { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment:      { type: DataTypes.TEXT, allowNull: false },
  reviewerName: { type: DataTypes.STRING(100), defaultValue: 'Anonymous Student' },
  userId:       { type: DataTypes.INTEGER, allowNull: true },
  helpful:      { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'reviews', timestamps: true });

module.exports = Review;
