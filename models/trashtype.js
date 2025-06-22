'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrashType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrashType.hasMany(models.Trash, { foreignKey: 'typeId' });
    }
  }
  TrashType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricePerKg: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TrashType',
  });
  return TrashType;
};