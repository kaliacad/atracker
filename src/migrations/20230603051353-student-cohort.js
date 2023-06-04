'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create a new table: Student_Cohort
     * edit relationship
     */
    return queryInterface.createTable('Student_Cohort', {}, { timestamps: false })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Student_Cohort');
  }
};
