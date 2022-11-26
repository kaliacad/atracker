import pool from "../db/index.js";

const date = new Date().toISOString().split("T")[0];
const query = pool.query;

const STUDENT_PER_PAGE = 9;

export async function getIndex(req, res, next) {
    const userId = req.user;
    try {
        const presencesTodayData = await query(
            "select presences.presence, COUNT (presences.presence)  from presences WHERE CAST(createdat AS DATE) = $1  group by presences.presence ",
            [date]
        );
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

export function getAddStudent(req, res, next) {
    console.log(req.user);
    const userId = req.user;
    res.render("admin/add-student", {
        userId: userId,
        title: "New student",
    });
}

export async function getStudents(req, res, next) {
    const page = +req.query.page || 1;
    console.log(page);
    const userId = req.user;
    try {
        const result = await query(
            "SELECT * FROM students order by id LIMIT $1 OFFSET $2",
            [STUDENT_PER_PAGE, (page - 1) * STUDENT_PER_PAGE]
        );
        const students = result.rows;
        const totalStudents = (await query("SELECT * FROM students")).rowCount;

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
    const userId = req.user;
    if (isNaN(studentId)) return res.redirect("/not-found");
    try {
        let students = [];
        const studentsResult = await query(
            "SELECT * FROM students where id = $1",
            [studentId]
        );
        if (studentsResult) {
            students = result.rows;
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
    const { names, email, userId } = req.body;
    try {
        await query(
            "INSERT INTO students (noms, email, iduser) values ($1,$2,$3)",
            [names, email, userId]
        );
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
        await query("DELETE FORM student WHERE id = $1", [studentId]);
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
        const result = await query("SELECT * FROM students order by id");
        const students = result.rows;
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
    for (let i in students) {
        studentId = +i;
        presence = students[i];
        try {
            const response = await query(
                `INSERT INTO presences(studentid, presence) values ($1,$2)`,
                [studentId, presence]
            );
        } catch (error) {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        }
    }
    res.redirect("/admin/");
}
