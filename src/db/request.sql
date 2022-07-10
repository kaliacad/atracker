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

CREATE TABLE presences (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    studentId BIGINT NOT NULL REFERENCES students,
    presence VARCHAR(20),
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



SELECT * FROM students ORDER BY id;


SELECT students.id AS id, students.noms AS studentNoms, students.email as studentsEmail, users.noms AS usersNoms  FROM students join users ON students.iduser = users.id;


select presences.presence, COUNT (presences.presence)  from presences WHERE CAST(createdat AS DATE) = '2022:07:09'  group by presences.presence