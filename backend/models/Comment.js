const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  id:           { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  confessionId: { type: DataTypes.INTEGER, allowNull: false },
  text:         { type: DataTypes.TEXT, allowNull: false },
  anonName:     { type: DataTypes.STRING(50), allowNull: false },
  anonEmoji:    { type: DataTypes.STRING(10), defaultValue: '🦊' },
  userId:       { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'comments', timestamps: true });

module.exports = Comment;