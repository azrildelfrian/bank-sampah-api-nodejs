'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: 'admin', description: 'Admin full access', createdAt: new Date(), updatedAt: new Date() },
      { name: 'user', description: 'Regular user', createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Permissions', [
      { name: 'manage_users', description: 'CRUD user data', createdAt: new Date(), updatedAt: new Date() },
      { name: 'view_saldo', description: 'Lihat saldo', createdAt: new Date(), updatedAt: new Date() },
      { name: 'input_sampah', description: 'Input data sampah', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Assign admin semua permission (contoh manual)
    await queryInterface.bulkInsert('RolePermissions', [
      { roleId: 1, permissionId: 1, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, permissionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 1, permissionId: 3, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, permissionId: 2, createdAt: new Date(), updatedAt: new Date() },
      { roleId: 2, permissionId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete(['Roles', 'Permissions', 'RolePermissions'], null, {});
  }
};
