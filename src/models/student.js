import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const student = sequelize.define("student", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isactif: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
});

export default student;
