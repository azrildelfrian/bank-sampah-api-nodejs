'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'role');
  },

  async down (queryInterface, Sequelize) {
return queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING
    });
  }
};
