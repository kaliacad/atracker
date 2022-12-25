/* eslint-disable import/no-cycle */
import { Sequelize } from "sequelize";

import connectionString from "../settings.js";

const sequelize = new Sequelize(connectionString, {});

export default sequelize;
