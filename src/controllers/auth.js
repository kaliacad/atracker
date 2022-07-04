const db = require("../db")

exports.getLogin = (req, res, next) => {
    const userId = req.user;
    res.render("auth/login", {
        userId,
    });
};

exports.postLogin = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    await db
        .query(`SELECT * FROM users where username='${username}'`)
        .then((result) => {
            const user = result.rows[0];
            if (user && password == user.password) {
                req.session.user = user;
                return res.redirect("/admin/dashboard/");
            }
            res.redirect("/login");
        })
        .catch((error) => console.log(error));
};

exports.postLogout = (req, res, next) => {
    req.session.user = undefined;
    res.redirect("/login");
};
