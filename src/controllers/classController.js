import { findClasses, createClass } from "../models/cohorte.js";

export async function classIndex(req, res, next) {
    try {
        const classList = await findClasses;

        if (classList) {
            const userId = req.user.id || null;
            const { role } = req.user;

            res.render("cohorts/index", {
                cohorts: classList,
                title: "Liste de cohortes",
                userId,
                role,
            });

        }
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 404;
        return next(err);
    }
}

// render the form
export async function classCreateGet(req, res) {
    res.render("cohorts/addCohort", 
    { title: "Ajouter une classe", userId: req.user.id, role: req.user })
}

export async function classCreatePost(req, res) {

    try {
        const addClass = await createClass(req.body.nom)

    if (addClass) {
        req.flash("toast", {
            message: `La nouvelle classe a ete ajoutée avec success`,
            severity: "success",
        });

        res.redirect("/myaccount/classes/all");
    }
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 404;
        return next(err);
    }
}