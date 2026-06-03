const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Shop = sequelize.define('Shop', {
  id:                { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name:              { type: DataTypes.STRING(150), allowNull: false },
  description:       { type: DataTypes.TEXT, allowNull: true },
  category:          { type: DataTypes.ENUM('canteen','fastfood','juice','tea','noodles','meals','snacks','other'), defaultValue: 'other' },
  location:          { type: DataTypes.ENUM('inside','outside'), allowNull: false },
  address:           { type: DataTypes.STRING(255), allowNull: true },
  phone:             { type: DataTypes.STRING(20), allowNull: true },
  whatsapp:          { type: DataTypes.STRING(20), allowNull: true },
  timings:           { type: DataTypes.STRING(100), allowNull: true },
  isVeg:             { type: DataTypes.BOOLEAN, defaultValue: true },
  deliveryAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
  isOpen:            { type: DataTypes.BOOLEAN, defaultValue: true },
  emoji:             { type: DataTypes.STRING(10), defaultValue: '🍽️' },
  tags:              { type: DataTypes.STRING(255), allowNull: true },   // comma-separated
  avgRating:         { type: DataTypes.FLOAT, defaultValue: 0 },
  reviewCount:       { type: DataTypes.INTEGER, defaultValue: 0 },
  girlsFriendly:     { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'shops', timestamps: true });

module.exports = Shop;
