'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * username: user
     * password: admin123
     */
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      noms: 'Normal user',
      email: 'normal@gmail.com',
      username: 'user',
      password: '$2y$10$XaZ8u97sZ9Kq2M9L1jpBAO00Q/LzK6aKU4kZksdyHVly9Ae7jtuvW',
      role: 3,
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
     }])
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('users', {username: "user"}, {});
  }
};
