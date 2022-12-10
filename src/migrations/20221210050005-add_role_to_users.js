'use strict';

const Sequelizerc = require('../../.sequelizerc');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   'ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(210)'
    // ),

    // /**
    //  * Add missing columns to Users table
    //  */
    // await queryInterface.addColumn(
    //   'users',
    //   'id',
    //   {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    //   }
    //  ),

    //  await queryInterface.addColumn(
    //   'users',
    //   'role',
    //   {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     defaultValue: 3,
    //   }
    //  ),
    // await queryInterface.sequelize.query(
    //   'ALTER TABLE "users" ADD CONSTRAINT "composite_pk" \
    //   PRIMARY KEY ("id")'
    // ),

     await queryInterface.addColumn(
      'users',
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
     ),

     await queryInterface.addColumn(
      'users',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    // await queryInterface.removeColumn('users', 'id')
    // await queryInterface.removeColumn('users', 'role')
    await queryInterface.removeColumn('users', 'createdAt')
    await queryInterface.removeColumn('users', 'updatedAt')
    await queryInterface.dropTable('cohorte')
    await queryInterface.dropTable('presences')
  }
};
