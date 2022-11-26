import pool from "../db/index.js";

const { query } = pool;

export function getLogin(req, res) {
    res.render("auth/login", {
        title: "Login",
        userId: undefined,
    });
}

// eslint-disable-next-line consistent-return
export async function postLogin(req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    try {
        const result = await query(
            `SELECT * FROM users where username='${username}'`
        );
        const user = result.rows[0];
        if (user && password === user.password) {
            req.session.user = user;
            res.cookie("session", user);
            return res.redirect("/admin");
        }
        res.redirect("/login");
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export function postLogout(req, res) {
    req.session.destroy();
    res.cookie("session", undefined);
    res.status(200).clearCookie("connect.sid", {
        path: "/",
    });
    res.redirect("/login");
}
