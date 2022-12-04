import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Cohorte = sequelize.define("cohorte", {
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Cohorte;
