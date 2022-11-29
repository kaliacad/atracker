/* eslint-disable no-restricted-globals */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
import sequelize from "../db/config.js";
import pool from "../db/index.js";
import Cohorte from "../models/Cohorte.js";
import Presence from "../models/Presence.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

const date = new Date().toISOString().split("T")[0];
const { query } = pool;

const STUDENT_PER_PAGE = 9;

export async function getIndex(req, res, next) {
    const userId = req.user;
    try {
        const presencesTodayData = await Presence.findAll({
            attributes: [
                ["presence", "pres"],
                [sequelize.fn("COUNT", sequelize.col("presence")), "total"],
            ],
            where: { createdAt: date },
            group: "presence",
        });
        const allPresencesData = await query(
            "select presences.presence, COUNT (presences.presence)  from presences group by presences.presence "
        );
        const presencesToday = presencesTodayData.rows;
        const allPresences = allPresencesData.rows;
        return res.render("admin/index", {
            presencesToday,
            date,
            allPresences,
            userId,
            title: "Dashboard",
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function getAddStudent(req, res, next) {
    try {
        const cohortes = await Cohorte.findAll();
        const userId = req.user;
        res.render("admin/add-student", {
            userId,
            title: "New student",
            cohortes,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

// eslint-disable-next-line consistent-return
export async function getStudents(req, res, next) {
    const page = +req.query.page || 1;
    const userId = req.user || null;
    try {
        const students = await Student.findAll({
            order: [["id", "DESC"]],
            limit: STUDENT_PER_PAGE,
            offset: (page - 1) * STUDENT_PER_PAGE,
        });
        const totalStudents = await Student.findAndCountAll();

        res.render("admin/students", {
            userId,
            students,
            title: "Student list",
            totalStudents,
            currentPage: page,
            hasNextPage: STUDENT_PER_PAGE * page < totalStudents,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalStudents / STUDENT_PER_PAGE),
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function getSingleStudent(req, res, next) {
    const studentId = req.params.id;
    const userId = req.user || null;
    if (isNaN(studentId)) return res.redirect("/not-found");
    try {
        let students = [];
        const studentsResult = await query(
            "SELECT * FROM students where id = $1",
            [studentId]
        );
        if (studentsResult) {
            students = studentsResult.rows;
        }
        const presenceResult = await query(
            "select presences.presence, COUNT (presences.presence)  from presences where studentid= $1 group by presences.presence ",
            [studentId]
        );
        const presences = presenceResult.rows;
        res.render("admin/one-student", {
            userId,
            student: students[0],
            presences,
            title: `${students[0].noms}`,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postAddStudent(req, res, next) {
    const { nom, prenom, email, cohorteId } = req.body;
    const userId = req.user || null;
    try {
        const resul = await Student.create({
            nom,
            prenom,
            email,
            userId,
            cohorteId,
        });
        console.log(resul);

        res.redirect("/admin/students");
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}

export async function postEditStudent(req, res, next) {
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
    const { studentId } = req.body;
    try {
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
    const userId = req.user;
    try {
        const students = await Student.findAll({});

        res.render("admin/add-presence", {
            userId,
            students,
            title: "New attendancy",
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
        try {
            // eslint-disable-next-line no-await-in-loop
            await Presence.create({
                studentId,
                presence,
            });
        } catch (error) {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        }
    }
    res.redirect("/admin/");
}
