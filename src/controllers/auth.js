import bcrypt from "bcryptjs";
import User from "../models/User.js";

export function getLogin(req, res) {
    if (res.user) return res.redirect("/admin");
    return res.render("auth/login", {
        title: "Login",
        userId: undefined,
    });
}

// eslint-disable-next-line consistent-return
export async function postLogin(req, res, next) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });

        console.log("user does not exist", username);

        if (!user) {
            return res.redirect("/login");
        }

        const verifiedPassword = await bcrypt.compare(
            password,
            user.dataValues.password
        );
        console.log(`${password} = ${verifiedPassword}`);

        if (user && verifiedPassword) {
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
