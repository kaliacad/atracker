import { Sequelize } from "sequelize";

import connectionString from "../settings.js"

export default new Sequelize(connectionString, {});
