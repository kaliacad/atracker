/* eslint-disable eqeqeq */
/* eslint-disable no-continue */
/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
import sequelize from "../db/config.js";

import Cohorte from "../models/cohorte.js";
import Presence from "../models/presence.js";
import Student from "../models/student.js";

const date = new Date().toISOString().split("T")[0];

const STUDENT_PER_PAGE = 9;

export async function getIndex(req, res, next) {
    const userId = req.user.id;
    const { role } = req.user;
    const today = new Date();
    try {
        const presencesToday = (
            await Presence.findAll({
                attributes: [
                    "presence",
                    "isMatin",
                    [sequelize.fn("COUNT", sequelize.col("presence")), "total"],
                ],
                where: sequelize.where(
                    sequelize.fn("date", sequelize.col("createdAt")),
                    "=",
                    today
                ),
                group: ["presence", "isMatin"],
            })
        ).map((ele) => ele.dataValues);
        const allPresences = (
            await Presence.findAll({
                attributes: [
                    "presence",
                    "isMatin",
                    [sequelize.fn("COUNT", sequelize.col("presence")), "total"],
                ],
                group: ["presence", "isMatin"],
                order: ["presence"],
            })
        ).map((ele) => ele.dataValues);
        return res.render("myaccount/index", {
            presencesToday,
            date,
            allPresences,
            userId,
            title: "Dashboard",
            role,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function getAddStudent(req, res, next) {
    const { role } = req.user;

    try {
        const cohortes = await Cohorte.findAll();
        const userId = req.user.id;

        if (req.user.role !== 1 && req.user.role !== 2) {
            return res.redirect("/myaccount/students");
        }

        res.render("myaccount/add-student", {
            userId,
            title: "Nouvel étudiant",
            cohortes,
            role,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

// eslint-disable-next-line consistent-return
export async function getStudents(req, res, next) {
    const { role } = req.user || null;

    const page = +req.query.page || 1;
    const isAuth = (req.user.role === 1 || req.user.role === 2) ?? false;
    const userId = req.user.id || null;
    const offset = (page - 1) * STUDENT_PER_PAGE;

    try {
        const students = await Student.findAll({
            limit: STUDENT_PER_PAGE,
            offset,
        });

        const totalStudents = (await Student.findAndCountAll()).count;

        res.render("myaccount/students", {
            userId,
            role,
            students,
            title: "Liste des étudiants",
            totalStudents,
            currentPage: page,
            hasNextPage: STUDENT_PER_PAGE * page < totalStudents,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            isAuth,
            lastPage: Math.ceil(totalStudents / STUDENT_PER_PAGE),
            toast: req.flash("toast")[0]
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function getSingleStudent(req, res, next) {
    const { role } = req.user;
    const userId = req.user.id;

    const studentId = req.params.id;
    const isAuth = (req.user.role === 1 || req.user.role === 2) ?? false;
    if (!studentId) return res.redirect("/not-found");
    try {
        const student = await Student.findOne({
            where: { id: studentId },
            include: Student.belongsTo(Cohorte),
        });

        const presences = (
            await Presence.findAll({
                attributes: [
                    "presence",
                    "isMatin",
                    [sequelize.fn("COUNT", sequelize.col("presence")), "total"],
                ],
                where: { studentId },
                group: ["presence", "isMatin"],
            })
        ).map((element) => element.dataValues);

        res.render("myaccount/one-student", {
            isAuth,
            userId,
            student,
            presences,
            title: `${student.noms}`,
            role,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postAddStudent(req, res, next) {
    const { nom, prenom, email, cohorteId } = req.body;

    const userId = req.user.id || null;

    if (req.user.role !== 1 && req.user.role !== 2) {
        return res.redirect("/myaccount/students");
    }

    try {
        const { role } = req.user;
        await Student.create({
            nom,
            prenom,
            email,
            userId,
            cohorteId,
            role,
        });


        res.redirect("/myaccount/students");

        req.flash("toast", {
            message: `Student ${email} created successfully`,
            severity: "success",
        });
        res.redirect("/myaccount/students");

    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postEditStudent(req, res, next) {
    if (req.user.role !== 1 && req.user.role !== 2) {
        return res.redirect("myaccount/students");
    }
    const { noms, email, studentId } = req.body;
    try {
        await query("UPDATE students SET noms= $1, email=$2  WHERE id=$3", [
            noms,
            email,
            studentId,
        ]);
        res.redirect(`/myaccount/students/${studentId}`);
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postDeleleStudent(req, res, next) {
    try {
        if (req.user.role !== 1 && req.user.role !== 2) {
            return res.redirect("myaccount/students");
        }
        const { studentId } = req.body;

        const student = await Student.findOne({ where: { id: studentId } });
        await student.destroy();
        res.redirect("/myaccount/students");
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function getAddPresence(req, res, next) {
    try {
        const userId = req.user.id;
        const { role } = req.user;

        const students = await Student.findAll({});

        res.render("myaccount/add-presence", {
            userId,
            students,
            title: "New attendancy",
            role,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postAddPresence(req, res, next) {
    const presenceObj = req.body;
    let studentId;
    let presence;
    let isMatin;
    // eslint-disable-next-line no-restricted-syntax
    for (const property in presenceObj) {
        if (property !== "isMatin" && property !== "date") {
            studentId = property;
            presence = presenceObj[property];
        }

        if (property == "isMatin") isMatin = presenceObj[property];

        try {
            // eslint-disable-next-line no-await-in-loop
            if (studentId) {
                await Presence.create({
                    studentId,
                    presence,
                    isMatin,
                });
            }
        } catch (error) {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        }
    }
    res.redirect("/myaccount/");
}
