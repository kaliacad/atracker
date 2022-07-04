const { Pool } = require("pg");

const connectionString = require("../settings")

const pool = new Pool({ connectionString })

module.exports = pool