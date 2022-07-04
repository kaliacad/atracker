const { createTables, insertIntoTables } = require("./queryFunctions")

(async () => {
    await createTables()
    await insertIntoTables()
})()