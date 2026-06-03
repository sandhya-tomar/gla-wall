const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id:         { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name:       { type: DataTypes.STRING(100), allowNull: false },
  email:      { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password:   { type: DataTypes.STRING(255), allowNull: false },
  rollNumber: { type: DataTypes.STRING(50), allowNull: true },
  role:       { type: DataTypes.ENUM('student','admin'), defaultValue: 'student' },
  isPremium:  { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'users', timestamps: true });

// Hash password before save
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});
User.beforeUpdate(async (user) => {
  if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.matchPassword = async function(entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = User;
