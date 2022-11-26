const { createTables, insertIntoTables } = require("./queryFunctions.js")(
    async () => {
        await createTables();
        await insertIntoTables();
    }
)();
