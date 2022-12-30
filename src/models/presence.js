import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";

const presence = sequelize.define("presence", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    presence: DataTypes.STRING,
    isMatin: DataTypes.BOOLEAN,
}, { timestamps: true });

export default presence;
