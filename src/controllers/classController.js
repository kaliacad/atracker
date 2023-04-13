import { findClasses } from "../models/cohorte.js";

export async function all(req, res, next) {
    try {
        const classList = await findClasses;

        if (classList) {
            const userId = req.user.id || null;
            const { role } = req.user;

            res.render("myaccount/classes", {
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
