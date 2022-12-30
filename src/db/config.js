import { Sequelize } from "sequelize";

import connectionString from "../settings.js"

export default new Sequelize(connectionString, {
    "logging": false,
    define: {
        // All tables won't have "createdAt" and "updatedAt" Auto fields.
        timestamps: false
    }
});
