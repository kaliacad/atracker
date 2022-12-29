import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Cohorte = sequelize.define("Cohorte", {
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
    isCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export default Cohorte;
