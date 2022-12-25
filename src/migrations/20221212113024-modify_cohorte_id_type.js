/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn(
                "cohortes", // table name
                "id", // new field name
                {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                }
            ),
            queryInterface.changeColumn(
                "users", // table name
                "id", // new field name
                {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                }
            ),
            queryInterface.changeColumn(
                "students", // table name
                "id", // new field name
                {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                }
            ),
            queryInterface.changeColumn(
                "presences", // table name
                "id", // new field name
                {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true,
                }
            ),
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("presences");
        await queryInterface.dropTable("students");
        await queryInterface.dropTable("users");
        await queryInterface.dropTable("cohortes");
    },
};
