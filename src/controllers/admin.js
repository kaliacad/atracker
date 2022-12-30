/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
import bcrypt from "bcryptjs";
import sequelize from "../db/config.js";
import Cohorte from "../models/cohorte.js";
import Presence from "../models/presence.js";
import Student from "../models/student.js";
import User from "../models/user.js";

const date = new Date().toISOString().split("T")[0];

const STUDENT_PER_PAGE = 9;

export async function getIndex(req, res, next) {
    const userId = req.user.id;
    const { role } = req.user;
    try {
        const presencesToday = await Presence.findAll({
            attributes: [
                "presence",
                [sequelize.fn("COUNT", sequelize.col("presence")), "total"],
            ],
            where: { createdAt: date }, // i make here great than
            group: "presence",
        });
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
        return res.render("admin/index", {
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
            return res.redirect("/admin/students");
        }

        res.render("admin/add-student", {
            userId,
            title: "New student",
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
    const { role } = req.user;

    const page = +req.query.page || 1;
    const isAuth = (req.user.role === 1 || req.user.role === 2) ?? false;
    const userId = req.user.id || null;
    const offset = (page - 1) * STUDENT_PER_PAGE;

    try {
        const students = await Student.findAll({
            order: [["id", "ASC"]],
            limit: STUDENT_PER_PAGE,
            offset,
        });

        const totalStudents = (await Student.findAndCountAll()).count;
        console.log("count ", totalStudents);
        res.render("admin/students", {
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
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function getUsers(req, res, next) {
    const userId = req.user.id || null;
    const { role } = req.user;

    try {
        const users = await User.findAll({ order: [["noms", "ASC"]] });

        res.render("admin/users", {
            userId,
            users,
            title: "Liste des utilisateurs",
            role,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export function getUserForm(req, res) {
    const { role } = req.user;
    res.render("admin/form/user", {
        title: "Ajouter un utilisateur",
        userId: req.user,
        role,
    });
}

export async function getSingleStudent(req, res, next) {
    const { role } = req.user;
    const userId = req.user.id;

    const studentId = req.params.id;
    const isAuth = (req.user.role === 1 || req.user.role === 2) ?? false;
    if (isNaN(studentId)) return res.redirect("/not-found");
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

        res.render("admin/one-student", {
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
        return res.redirect("/admin/students");
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

        res.redirect("/admin/students");
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export function postUser(req, res, next) {
    const { noms, email, username, password, password2, role } = req.body;

    const userId = req.user.id || null;

    if (password !== password2) {
        return res.render("admin/form/user", {
            message: "les mots de passe ne correspondent pas ",
            title: "Ajouter utilisateur",
            userId,
            role: req.user.role,
        });
    }

    try {
        User.findOne({ where: { username } }) // check for uniqueness
            .then(async (user) => {
                if (!user) {
                    const hash = await bcrypt.hash(
                        password,
                        await bcrypt.genSalt(10)
                    );
                    const newUser = new User({
                        noms,
                        email,
                        username,
                        password: hash,
                        userId,
                        role,
                    });

                    await newUser.save();

                    res.redirect("/admin/users");
                } else {
                    res.render("admin/form/user", {
                        message: "Username already exists",
                        title: "Ajouter utilisateur",
                        userId,
                        role: req.user.role,
                    });
                }
            });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postEditStudent(req, res, next) {
    if (req.user.role !== 1 && req.user.role !== 2) {
        return res.redirect("admin/students");
    }
    const { noms, email, studentId } = req.body;
    try {
        await query("UPDATE students SET noms= $1, email=$2  WHERE id=$3", [
            noms,
            email,
            studentId,
        ]);
        res.redirect(`/admin/students/${studentId}`);
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postDeleleStudent(req, res, next) {
    try {
        if (req.user.role !== 1 && req.user.role !== 2) {
            return res.redirect("admin/students");
        }
        const { studentId } = req.body;

        const student = await Student.findOne({ where: { id: studentId } });
        await student.destroy();
        res.redirect("/admin/students");
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

        res.render("admin/add-presence", {
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
    const students = req.body;
    let studentId;
    let presence;
    // eslint-disable-next-line no-restricted-syntax
    for (const i in students) {
        studentId = +i;
        presence = students[i];

        if (isNaN(studentId)) break;
        try {
            // eslint-disable-next-line no-await-in-loop
            await Presence.create({
                studentId,
                presence,
                isMatin: students.isMatin,
            });
        } catch (error) {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        }
    }
    res.redirect("/admin/");
}
