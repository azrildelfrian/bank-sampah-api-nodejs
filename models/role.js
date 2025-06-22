'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Role.belongsToMany(Permission, {
      //   through: 'RolePermissions',
      //   foreignKey: 'roleId'
      // });
      
      Role.belongsToMany(models.Permission, {
        through: 'RolePermissions',
        foreignKey: 'roleId',
        otherKey: 'permissionId'
      });

      Role.hasMany(models.User, {
        foreignKey: 'roleId'
      });

      // Role.belongsToMany(Permission, {
      //   through: 'RolePermissions',
      //   foreignKey: 'roleId',
      //   otherKey: 'permissionId',
      // });

      // Permission.belongsToMany(Role, {
      //   through: 'RolePermissions',
      //   foreignKey: 'permissionId',
      //   otherKey: 'roleId',
      // });

      }
  }
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};