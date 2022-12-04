import { Sequelize } from "sequelize";

export default new Sequelize(process.env.POSTGRES_URI, {});
