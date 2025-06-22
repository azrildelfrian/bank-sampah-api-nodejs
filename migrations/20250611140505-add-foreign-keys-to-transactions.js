'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Transactions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_transactions_userId', // nama constraint, bebas tapi unik
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Tambahkan foreign key ke trashId
    await queryInterface.addConstraint('Transactions', {
      fields: ['trashId'],
      type: 'foreign key',
      name: 'fk_transactions_trashId',
      references: {
        table: 'Trashes',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_userId');
    await queryInterface.removeConstraint('Transactions', 'fk_transactions_trashId');
  }
};
