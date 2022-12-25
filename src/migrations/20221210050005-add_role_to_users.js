'use strict';

const Sequelizerc = require('../../.sequelizerc');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn(
      'users',
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
     ),

     await queryInterface.addColumn(
      'users',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
     ),
    
  /**
   * Create new tables:
   * - cohortes
   * - presences
   */

   await queryInterface.createTable(
    "cohortes", {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
      },
      nom: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      isCurrent: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
  }
   ),
   
   await queryInterface.createTable(
    'presences',
    {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
      },
      presence: Sequelize.STRING,
      isMatin: Sequelize.BOOLEAN,
  }
   ),

   await queryInterface.dropTable('Tests')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'createdAt')
    await queryInterface.removeColumn('users', 'updatedAt')
    await queryInterface.dropTable('cohorte')
    await queryInterface.dropTable('presences')
  }
};
