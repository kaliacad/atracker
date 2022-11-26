export const createStudentsTable = `
DROP TABLE IF EXISTS students CASCADE;
CREATE TABLE students (
    id SERIAL NOT NULL PRIMARY KEY,
    noms VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);
`;

export const insertStudents = `
INSERT INTO students(noms, email)
VALUES
('Sarah Lifaefi Masika', 'salimas@gmail.com'),
('Valentin Nasibu', 'valnas@gmail.com'),
('Cedrick Karungu', 'cedrick@gmail.com'),
('Arick B', 'a.b@gmail.com'),
('Patience Kavira', 'patience@protonmail.com');
`;
