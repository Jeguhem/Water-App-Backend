'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the unused column from the "orders" table
    await queryInterface.removeColumn('water_products', 'quantity');
  },

  async down(queryInterface, Sequelize) {
    // If we need to rollback, re-add the column (use correct DataType)
    await queryInterface.addColumn('water_products', 'quantity', {
      type: Sequelize.NUMBER, // Replace with actual previous data type
    });
  },
};
