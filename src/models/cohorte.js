import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const Cohorte = sequelize.define("cohorte", {
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
export const findClasses = Cohorte.findAll()
export const createClass = name => new Cohorte({ nom: name }).save()

export default Cohorte;
