import pool from "./pool.js";

export default {
    query: (text, params) => pool.query(text, params),
};
