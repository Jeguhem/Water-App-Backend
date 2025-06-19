'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('users', 'phoneNo', { type: Sequelize.STRING, allowNull: false }),
      queryInterface.addColumn('users', 'address', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('users', 'isVerified', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }),
      queryInterface.addColumn('users', 'lga', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('users', 'state', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('users', 'country', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('users', 'phoneNo'),
      queryInterface.removeColumn('users', 'address'),
      queryInterface.removeColumn('users', 'password'),
      queryInterface.removeColumn('users', 'role'),
      queryInterface.removeColumn('users', 'isVerified'),
      queryInterface.removeColumn('users', 'lga'),
      queryInterface.removeColumn('users', 'state'),
      queryInterface.removeColumn('users', 'country'),
    ]);
  },
};
