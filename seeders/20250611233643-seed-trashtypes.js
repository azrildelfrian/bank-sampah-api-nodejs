'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Trashtypes', [
      { name: 'Plastik', pricePerKg: 2000, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kertas', pricePerKg: 1000, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Logam', pricePerKg: 5000, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Trashtypes', null, {});
  }
};
