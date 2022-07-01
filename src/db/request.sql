create databae attendancy;

\c attendancy;

CREATE TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    noms VARCHAR(200),
    email VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL
    password VARCHAR(20) NOT NULL
);

SELECT * FROM users;


CREATE TABLE students (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    noms VARCHAR(200) NOT NULL,
    email VARCHAR(20) NOT NULL,
    idUser INT NOT NULL REFERENCES users
);

SELECT * FROM students;


SELECT students.id AS id, students.noms AS studentNoms, students.email as studentsEmail, users.noms AS usersNoms  FROM students join users ON students.iduser = users.id;