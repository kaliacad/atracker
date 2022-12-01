import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Presence = sequelize.define("presence", {
    presence: DataTypes.STRING,
    isMatin: DataTypes.BOOLEAN,
});

export default Presence;
