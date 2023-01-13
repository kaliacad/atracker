require("dotenv").config()

const {
  DB_USER,
  PASSWORD,
  DB,
  DB_TEST,
  DB_PROD_USER,
  DB_PROD_PASSWORD,
  DB_PROD,
  DB_PROD_HOST,
  DB_HOST,
  DIALECT
} = process.env

module.exports = {
  development: {
    username: DB_USER,
    password: PASSWORD,
    database: DB,
    host: DB_HOST,
    dialect: DIALECT
  },
  test: {
    username: DB_USER,
    password: PASSWORD,
    database: DB_TEST,
    host: DB_HOST,
    dialect: DIALECT
  },
  production: {
    username: DB_PROD_USER,
    password: DB_PROD_PASSWORD,
    database: DB_PROD,
    host: DB_PROD_HOST,
    dialect: DIALECT
  }
}
