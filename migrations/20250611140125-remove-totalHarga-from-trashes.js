'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Trashes', 'totalHarga');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Trashes', 'totalHarga', {
      type: Sequelize.INTEGER
    });
  }
};
