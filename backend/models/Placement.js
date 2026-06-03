const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Placement = sequelize.define('Placement', {
  id:         { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  company:    { type: DataTypes.STRING(150), allowNull: false },
  role:       { type: DataTypes.STRING(200), allowNull: false },
  branches:   { type: DataTypes.STRING(255), allowNull: true },  // comma-separated
  ctc:        { type: DataTypes.STRING(50),  allowNull: true },
  cgpaCutoff: { type: DataTypes.FLOAT,       allowNull: true },
  deadline:   { type: DataTypes.DATEONLY,    allowNull: true },
  status:     { type: DataTypes.ENUM('open','coming','closed'), defaultValue: 'open' },
  type:       { type: DataTypes.ENUM('oncampus','offcampus','internship'), defaultValue: 'oncampus' },
  applyLink:  { type: DataTypes.STRING(500), allowNull: true },
  isPremium:  { type: DataTypes.BOOLEAN, defaultValue: false },
  description:{ type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'placements', timestamps: true });

module.exports = Placement;
