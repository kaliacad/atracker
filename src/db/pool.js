import pg from "pg";

import connectionString from "../settings.js";

const { Pool } = pg;

const pool = new Pool({ connectionString });

export default pool;
