import { findUsers, findUserByUsername, saveUser } from "../models/User.js";

export async function all(req, res, next) {
    try {
        const allUsers = await findUsers;

        if (allUsers) {
            const userId = req.user.id || null;
            const { role } = req.user;

            res.render("myaccount/users", {
                users: allUsers,
                title: "Liste des utilisateurs",
                userId,
                role,

            });

                toast: req.flash("toast")[0]
            })

        }
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 404;
        return next(err);
    }
}

export async function create(req, res, next) {
    try {
        const { password, password2, username } = req.body;

        const userExist = await findUserByUsername(username);

        if (!userExist) {
            const userId = req.user.id || null;
            const { role } = req.user;

            if (password !== password2) {
                return res.render("myaccount/form/user", {
                    message: "les mots de passe ne correspondent pas ",
                    title: "Ajouter utilisateur",
                    userId,
                    role,
                });
            } else {
                const userData = {
                    noms: req.body.noms,
                    email: req.body.email,
                    username,
                    password,
                    id: userId,
                    role,
                };


                const newUser = await saveUser(userData);

                if (newUser) res.redirect("/myaccount/users");

                if (newUser) {
                    req.flash("toast", {
                        message: `User ${username} created successfully`,
                        severity: "success",
                    });
                    res.redirect("/myaccount/users");
             
            }
        } else {
            res.render("myaccount/form/user", {
                message: "Username already exists",
                title: "Ajouter utilisateur",
                userId,
                role,
            });
        }
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function form(req, res, next) {
    const { role } = req.user;

    res.render("myaccount/form/user", {
        title: "Ajouter un utilisateur",
        userId: req.user,
        role,
    });
}
