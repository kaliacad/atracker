const pool = require('../db/pool')
const { 
    createStudentsTable, 
    insertStudents
} = require("./queries")

const runQueryArray = async arr => new Promise(resolve => {
    const stop = arr.length
    arr.forEach(async (q, idx) => {
        await pool.query(q)
        if (idx + 1 === stop) resolve()
    })
})

const createTables = () => runQueryArray([createStudentsTable])
const insertIntoTables = () => runQueryArray([insertStudents])

exports.createTables = createTables;
exports.insertIntoTables = insertIntoTables;