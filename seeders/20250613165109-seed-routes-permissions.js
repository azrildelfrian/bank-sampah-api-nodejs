'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('RoutePermissions', [
      { path: '/admin', permission_name: 'manage_users', method: 'GET', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('RoutePermissions', null, {});

  }
};
