const { Pool } = require("pg");
require('dotenv').config()

const connectionString = require("../settings")

const pool = new Pool({ connectionString })

module.exports = pool