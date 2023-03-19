import { findUserByUsername } from "../models/User.js";
import { comparePassword } from "../utils/helper.util.js";

export function form(req, res) {
    if (req.user) return res.redirect("/myaccount/summary");

    return res.render("auth/login", {
        title: "Bienvenue",
        userId: undefined,
    });
}

// eslint-disable-next-line consistent-return
export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);

        if (user == null) return res.redirect("/");

        const verifiedPassword = await comparePassword(
            password,
            user.dataValues.password
        );

        if (user && verifiedPassword) {
            req.session.user = user;
            req.body = user
            res.cookie("session", user);

            return res.redirect("/myaccount/summary");
        }
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;

        return next(err);
    }
}

export function logout(req, res) {
    res.clearCookie("session");
    
    res.redirect("/");
}
