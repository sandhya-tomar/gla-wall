const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Confession = sequelize.define('Confession', {
  id:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  text:      { type: DataTypes.TEXT, allowNull: false },
  anonName:  { type: DataTypes.STRING(50), allowNull: false },
  anonEmoji: { type: DataTypes.STRING(10), defaultValue: '🦊' },
  branch:    { type: DataTypes.STRING(20), allowNull: true },
  year:      { type: DataTypes.STRING(10), allowNull: true },
  likes:     { type: DataTypes.INTEGER, defaultValue: 0 },
  userId:    { type: DataTypes.INTEGER, allowNull: true },  // never exposed in API
  isVisible: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'confessions', timestamps: true });

module.exports = Confession;
