'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.renameColumn('students', 'noms', 'nom')

    await queryInterface.addColumn(
      'students',
      'prenom',
      {
        type: Sequelize.STRING,
      }
    )

    await queryInterface.addColumn(
      'students',
      'isActif',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    )

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('students', 'nom', 'noms')
    await queryInterface.removeColumn('students', 'prenom');
    await queryInterface.removeColumn('students', 'isActif');
  }
};