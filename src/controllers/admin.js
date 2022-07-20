const db = require("../db");
const date = new Date().toISOString().split("T")[0];

exports.getIndex = async (req, res, next) => {
    const userId = req.user;
    await db
        .query(
            "select presences.presence, COUNT (presences.presence)  from presences WHERE CAST(createdat AS DATE) = $1  group by presences.presence ",
            [date]
        )
        .then(async (presencesTodayData) => {
            await db
                .query(
                    "select presences.presence, COUNT (presences.presence)  from presences group by presences.presence "
                )
                .then((allPresencesData) => {
                    const presencesToday = presencesTodayData.rows;
                    const allPresences = allPresencesData.rows;

                    return res.render("admin/index", {
                        presencesToday,
                        date,
                        allPresences,
                        userId,
                        title: "Dashboard",
                    });
                });
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.getAddStudent = (req, res, next) => {
    console.log(req.user);
    const userId = req.user;
    res.render("admin/add-student", {
        userId: userId,
        title: "New student",
    });
};

exports.getStudents = async (req, res, next) => {
    const userId = req.user;
    await db
        .query("SELECT * FROM students order by id")
        .then((result) => {
            const students = result.rows;
            res.render("admin/students", {
                userId,
                students,
                title: "Student list",
            });
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.getSingleStudent = async (req, res, next) => {
    const studentId = req.params.id;
    const userId = req.user;
    if (isNaN(studentId)) return res.redirect("/not-found");
    await db
        .query("SELECT * FROM students where id = $1", [studentId])
        .then(async (result) => {
            const student = result.rows;
            await db
                .query(
                    "select presences.presence, COUNT (presences.presence)  from presences where studentid= $1 group by presences.presence ",
                    [studentId]
                )
                .then((data) => {
                    const presences = data.rows;
                    res.render("admin/one-student", {
                        userId,
                        student: student[0],
                        presences,
                        title: `${student[0].noms}`,
                    });
                })
                .catch((error) => {
                    const err = new Error(error);
                    err.httpStatusCode = 500;
                    return next(err);
                });
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.postAddStudent = async (req, res, send) => {
    const { names, email, userId } = req.body;
    await db
        .query("INSERT INTO students (noms, email, iduser) values ($1,$2,$3)", [
            names,
            email,
            userId,
        ])
        .then((result) => {
            res.redirect("/admin/students");
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.postEditStudent = async (req, res, send) => {
    const { noms, email, studentId } = req.body;
    await db
        .query("UPDATE students SET noms= $1, email=$2  WHERE id=$3", [
            noms,
            email,
            studentId,
        ])
        .then((result) => {
            res.redirect(`/admin/students/${studentId}`);
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.postDeleleStudent = async (req, res, next) => {
    const { studentId } = req.body;
    await db
        .query("DELETE FORM student WHERE id = $1", [studentId])
        .then((result) => {
            res.redirect("/admin/students");
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.getAddPresence = async (req, res, next) => {
    const userId = req.user;
    await db
        .query("SELECT * FROM students order by id")
        .then((result) => {
            const students = result.rows;
            res.render("admin/add-presence", {
                userId,
                students,
                title: "New attendancy",
            });
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });
};

exports.postAddPresence = async (req, res, next) => {
    const students = req.body;
    let studentId;
    let presence;
    for (let i in students) {
        studentId = +i;
        presence = students[i];
        await db
            .query(
                `INSERT INTO presences(studentid, presence) values ($1,$2)`,
                [studentId, presence]
            )
            .then(async (response) => {})
            .catch((error) => {
                const err = new Error(error);
                err.httpStatusCode = 500;
                return next(err);
            });
    }
    res.redirect("/admin/");
};
