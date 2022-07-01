const db = require("../db");
const bcrypt = require("bcrypt");

exports.getIndex = async (req, res, next) => {
    const userId = req.user;
    await db
        .query(
            "SELECT students.id AS id, students.noms AS studentnoms, students.email as studentsemail, users.noms AS usersnoms  FROM students join users ON students.iduser = users.id"
        )
        .then((result) => {
            const students = result.rows;
            res.render("admin/index", {
                students: students,
                userId: userId,
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
    console.log(names, email, userId);
    await db
        .query(
            `INSERT INTO students (noms, email, iduser) values ('${names}','${email}',${userId})`
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
    let userId;
    let presence;
    const allPresences = [];
    for (let i in students) {
        console.log(i, students[i]);
        userId = +i;
        presence = students[i];
        allPresences.push({ studentId: userId, presence, createdAt: new Date() });
    }
    console.log(allPresences);
    res.redirect("/admin/add-presence");
};
