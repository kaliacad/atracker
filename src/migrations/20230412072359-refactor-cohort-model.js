'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Remove isCurrent col.
     */
    return queryInterface.removeColumn(
      'cohortes',
      'isCurrent'
    ) 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    return queryInterface.addColumn(
      'cohortes',
      'isCurrent', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
      
    )
  }
};
