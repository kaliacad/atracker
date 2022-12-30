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

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
