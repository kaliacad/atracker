const db = require("../db");
const bcrypt = require("bcrypt");

exports.getIndex = async (req, res, next) => {
    const userId = req.user;
    await db
        .query(
            "SELECT students.id AS id, students.noms AS studentnoms, students.email as studentsemail, users.noms AS usersnoms  FROM students join users ON students.iduser = users.id"
        )
        .then(async (result) => {
            await db
                .query(
                    "select students.id, COUNT (students.noms) as jours,students.noms , presences.presence as nompresence from presences inner join students on presences.studentid = students.id group by students.id , presences.presence order by students.noms"
                )
                .then((results) => {
                    const presences = results.rows;
                    console.log(presences);
                    const students = result.rows;
                    // console.log(students);
                    return res.render("admin/index", {
                        students,
                        presences,
                        userId,
                    });
                });
        })
        .catch((error) => console.log(error));
};

exports.getAddStudent = (req, res, next) => {
    const userId = req.user;
    res.render("admin/add-student", {
        userId: userId,
    });
};

exports.postAddStudent = async (req, res, send) => {
    const { names, email, userId } = req.body;
    await db
        .query(
            `INSERT INTO students (noms, email, idUser) values ('${names}','${email}', 1)`
        )
        .then((result) => {
            res.redirect("/admin/dashboard");
        })
        .catch((error) => console.log(error));
};

exports.getAddPresence = async (req, res, next) => {
    const userId = req.user;
    await db
        .query("SELECT * FROM students")
        .then((result) => {
            const students = result.rows;
            res.render("admin/add-presence", {
                userId,
                students,
            });
        })
        .catch((error) => console.log(error));
};

exports.postAddPresence = async (req, res, next) => {
    const students = req.body;
    let studentId;
    let presence;
    for (let i in students) {
        studentId = +i;
        presence = students[i];
        await db
            .query(
                `INSERT INTO presences(studentid, presence) values (${studentId}, '${presence}')`
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => console.log(error));
    }
    return res.redirect("/admin/add-presence");
};
