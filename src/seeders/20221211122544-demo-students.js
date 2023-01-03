"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Dummy data
         */
        await queryInterface.bulkInsert(
            "students",
            [
                {
                    nom: "Kavira",
                    prenom: "Patience",
                    email: "patiencekav@gmail.com",
                    isActif: true,
                },
                {
                    nom: "Lifaefi",
                    prenom: "Sarah",
                    email: "salimas@gmail.com",
                    isActif: true,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("students", null, {});
    },
};
