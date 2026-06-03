const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mess = sequelize.define('Mess', {
  id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name:          { type: DataTypes.STRING(150), allowNull: false },
  address:       { type: DataTypes.STRING(255), allowNull: false },
  phone:         { type: DataTypes.STRING(20), allowNull: true },
  timings:       { type: DataTypes.STRING(100), allowNull: true },
  isVeg:         { type: DataTypes.BOOLEAN, defaultValue: true },
  pricePerMeal:  { type: DataTypes.INTEGER, allowNull: true },
  monthlyPrice:  { type: DataTypes.INTEGER, allowNull: true },
  girlsPreferred:{ type: DataTypes.BOOLEAN, defaultValue: false },
  emoji:         { type: DataTypes.STRING(10), defaultValue: '🏠' },
  description:   { type: DataTypes.TEXT, allowNull: true },
  avgRating:     { type: DataTypes.FLOAT, defaultValue: 0 },
  reviewCount:   { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'mess', timestamps: true });

module.exports = Mess;
