const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Note = sequelize.define('Note', {
  id:         { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title:      { type: DataTypes.STRING(200), allowNull: false },
  subject:    { type: DataTypes.STRING(100), allowNull: false },
  //semester: { type: DataTypes.INTEGER, allowNull: true },
  type:       { type: DataTypes.ENUM('notes','pyq','assignment','other'), defaultValue: 'notes' },
  isPremium:  { type: DataTypes.BOOLEAN, defaultValue: false },
  fileUrl:    { type: DataTypes.STRING(500), allowNull: true },
  downloads:  { type: DataTypes.INTEGER, defaultValue: 0 },
  uploadedBy: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'notes', timestamps: true });

module.exports = Note;
