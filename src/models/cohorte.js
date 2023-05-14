import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const cohorte = sequelize.define("cohorte", {
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
});

// util functions on cohorte model
export const findClasses = cohorte.findAll()

export default cohorte;
