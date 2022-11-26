import { query } from "../db/pool.js";
import { createStudentsTable, insertStudents } from "./queries.js";

const runQueryArray = async (arr) =>
    new Promise((resolve) => {
        const stop = arr.length;
        arr.forEach(async (q, idx) => {
            await query(q);
            if (idx + 1 === stop) resolve();
        });
    });

export const createTables = () => runQueryArray([createStudentsTable]);
export const insertIntoTables = () => runQueryArray([insertStudents]);

// const _createTables = createTables;
// export { _createTables as createTables };
// const _insertIntoTables = insertIntoTables;
// export { _insertIntoTables as insertIntoTables };
