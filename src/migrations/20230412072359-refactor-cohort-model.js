'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add isCurrent col.
     */
     return queryInterface.addColumn(
      'cohortes',
      'isCurrent', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
      
    )
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Remove isCurrent col.
     */
    return queryInterface.removeColumn(
      'cohortes',
      'isCurrent'
    ) 
  }
};
