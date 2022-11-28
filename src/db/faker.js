import pool from "./index.js";

const { query } = pool;

const dropDB = async () => {
    const resUsersTable = await query(`
    BEGIN TRANSACTION;
    DROP TABLE IF EXISTS presences;
    DROP TABLE IF EXISTS students; 
      DROP TABLE IF EXISTS users; 
   END TRANSACTION`);
    console.log(resUsersTable);
};

export default async () => {
    await dropDB();
    const resUsersTable = await query(`CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    noms VARCHAR(200),
    email VARCHAR(200) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL
   );`);
    if (resUsersTable) {
        const resStudents = await query(`
         CREATE TABLE students (
         id BIGSERIAL NOT NULL PRIMARY KEY,
         noms VARCHAR(200) NOT NULL,
         email VARCHAR(200) NOT NULL,
         idUser INT NOT NULL REFERENCES users
      );
   `);
        if (resStudents) {
            const resPresences = await query(`
               CREATE TABLE presences (
               id BIGSERIAL NOT NULL PRIMARY KEY,
               studentId BIGINT NOT NULL REFERENCES students,
               presence VARCHAR(20),
               createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
         `);
            if (resPresences) {
                const resUser = await query(
                    "INSERT INTO users(noms,email,username, password) VALUES ('cedric karungu', 'ckarungu921@gmail.com','cedric921','123456')"
                );
                console.log(resUser, resPresences, resStudents, resUsersTable);
            }
        }
    }
};
