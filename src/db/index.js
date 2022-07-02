const pool = require("./pool")

module.exports = {
    query: (text, params) => pool.query(text, params),
};