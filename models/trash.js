'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trash extends Model {
    static associate(models) {
      Trash.belongsTo(models.User, { foreignKey: 'userId' });
      Trash.belongsTo(models.TrashType, { foreignKey: 'typeId', as: 'type' });
    }
  }
  Trash.init({
    userId: DataTypes.INTEGER,
    // jenis: DataTypes.STRING,
    berat: DataTypes.FLOAT,
    // hargaPerKg: DataTypes.FLOAT,
    // totalHarga: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trash',
  });
  return Trash;
};
