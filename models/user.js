'use strict';
const { Model } = require('sequelize');
// const ROLE = require('../constants/roles');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // langsung define relasi di sini
      User.hasMany(models.Trash, { foreignKey: 'userId' });
      User.hasMany(models.RefreshToken, { foreignKey: 'userId' });
      User.belongsTo(models.Role, { 
        foreignKey: 'roleId', 
        as: 'role' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    // role: {
    //   type: DataTypes.STRING,
    //   defaultValue: ROLE.USER // atau bisa 'admin'
    // },
    roleId: DataTypes.INTEGER
    // refreshToken: {
    // type: DataTypes.TEXT,
    // allowNull: true,
    // }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

