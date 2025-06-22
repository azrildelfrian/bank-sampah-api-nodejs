'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('RoutePermissions', 'method', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'GET'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('RoutePermissions', 'method');
  }
};
