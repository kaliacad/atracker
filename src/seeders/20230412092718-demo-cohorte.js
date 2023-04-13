'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('cohortes', [{
        id: uuidv4(),
        nom: 'Dev Goma 2022',
      }], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('cohortes', null, {});

  }
};
