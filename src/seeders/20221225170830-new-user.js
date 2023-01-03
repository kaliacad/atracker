'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * password: admin123
     */
    await queryInterface.bulkInsert('users', [{
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
