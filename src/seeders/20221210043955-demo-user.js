"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         * admin
         * admin123
         */
        await queryInterface.bulkInsert("users", [
            {
                noms: "Admin user",
                email: "admin@gmail.com",
                username: "admin",
                password:
                    "$2y$10$XaZ8u97sZ9Kq2M9L1jpBAO00Q/LzK6aKU4kZksdyHVly9Ae7jtuvW",
                role: 1,
                createdAt: Sequelize.fn("NOW"),
                updatedAt: Sequelize.fn("NOW"),
            },
        ]);
    },

<<<<<<< HEAD
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
=======
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
    //  await queryInterface.delete
  }
>>>>>>> 78dd5c297bb8904871b034fcb87f097a81b7ab34
};
