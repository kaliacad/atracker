import pg from "pg";

const { Pool } = pg;

import connectionString from "../settings.js";

const pool = new Pool({ connectionString });

export default pool;
