'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoutePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoutePermission.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'RoutePermission',
  });
  return RoutePermission;
};