/* eslint-disable no-unused-vars */
const Sequelizerc = require("../../.sequelizerc");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            await queryInterface.createTable("cohortes", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                nom: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                isCurrent: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            }),
            await queryInterface.createTable("presences", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true,
                },
                presence: Sequelize.STRING,
                isMatin: Sequelize.BOOLEAN,
            }),
            await queryInterface.dropTable("Tests"),
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "createdAt");
        await queryInterface.removeColumn("users", "updatedAt");
        await queryInterface.dropTable("cohorte");
        await queryInterface.dropTable("presences");
    },
};
