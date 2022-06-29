const db = require("../db");
const bcrypt = require("bcrypt");

exports.getIndex = (req, res, next) => {
    res.render("admin/index");
};

exports.getAddStudent = (req, res, next) => {
    const userId = req.params.idUser;
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
            console.log(result);
            res.redirect("/admin/dashboard");
        })
        .catch((error) => console.log(error));
};
