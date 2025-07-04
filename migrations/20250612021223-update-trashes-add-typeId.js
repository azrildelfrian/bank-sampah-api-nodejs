'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Trashes', 'typeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'TrashTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Hapus kolom lama "jenis"
    await queryInterface.removeColumn('Trashes', 'jenis');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('Trashes', 'jenis', {
      type: Sequelize.STRING
    });

    await queryInterface.removeColumn('Trashes', 'typeId');
  }
};
