'use strict';
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    token: DataTypes.TEXT,
    userAgent: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {});
  
  RefreshToken.associate = function(models) {
    RefreshToken.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return RefreshToken;
};