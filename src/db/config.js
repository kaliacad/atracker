import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("db uri", process.env.POSTGRES_URI);
export default new Sequelize(process.env.POSTGRES_URI, {});
