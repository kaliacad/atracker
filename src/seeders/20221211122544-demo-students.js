'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Dummy data
    */
   await queryInterface.bulkInsert('students', [{
    id: uuidv4(),
    nom: "Kavira",
    prenom: "Patience",
    email: "patiencekav@gmail.com",
    isActif: true
   }, {
    id: uuidv4(),
    nom: "Lifaefi",
    prenom: "Sarah",
    email: "salimas@gmail.com",
    isActif: true
   }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('students', null, {})
  }
};
