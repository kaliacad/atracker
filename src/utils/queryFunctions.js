// eslint-disable-next-line import/no-unresolved
import pool from "../db/pool.js";
import { createStudentsTable, insertStudents } from "./queries.js";

const { query } = pool;

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
