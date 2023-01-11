import bcrypt from "bcryptjs";
import { findUserByUsername } from "../models/User.js"
import { comparePassword } from "../utils/helper.util.js";

import userModel from "../models/User.js";

export function form(req, res) {
    if (res.user) return res.redirect("/admin");
    
    return res.render("auth/login", {
        title: "Connexion",
        userId: undefined,
    });
}

// eslint-disable-next-line consistent-return
export async function login(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username)

        if (!user) return res.redirect("/");

        const verifiedPassword = await comparePassword(
            password,
            user.dataValues.password
        );

        if (user && verifiedPassword) {
            req.session.user = user;
            res.cookie("session", user);

            return res.redirect("/admin");
        }
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;

        return next(err);
    }
}

export function logout(req, res) {
    req.session.destroy();
    res.cookie("session", undefined);
    res.status(200).clearCookie("connect.sid", {
        path: "/",
    });

    res.redirect("/");
}
