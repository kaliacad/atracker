const db = require("../db");
const bcrypt = require("bcrypt");

exports.getIndex = (req, res, next) => {
    const userId = req.user;
    db.query(
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

exports.postAddStudent = (req, res, send) => {
    const { names, email, userId } = req.body;
    console.log(names, email, userId);
    db.query(
        `INSERT INTO students (noms, email, iduser) values ('${names}','${email}',${userId})`
    )
        .then((result) => {
            res.redirect("/admin/dashboard");
        })
        .catch((error) => console.log(error));
};

exports.getAddPresence = (req, res, next) => {
    const userId = req.user;
    res.render('admin/add-presence', {
        userId
    })
}
