require("dotenv").config();

const connectionString = `${process.env.DIALECT}://${process.env.DB_USER}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`;

module.exports = connectionString;
