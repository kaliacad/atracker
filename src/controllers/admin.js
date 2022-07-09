const db = require("../db");


exports.getIndex = async (req, res, next) => {
    const userId = req.user;
    await db
        .query(
            "SELECT students.id AS id, students.noms AS studentnoms, students.email as studentsemail  FROM students"
        )
        .then(async (result) => {
            await db
                .query(
                    "select presences.presence, COUNT (presences.presence)  from presences  group by presences.presence"
                )
                .then((results) => {
                    const presences = results.rows;
                    const students = result.rows;
                    return res.render("admin/index", {
                        students,
                        presences,
                        userId,
                        title: 'Attendancy GDA - Dashboard',
                    });
                });
        })
        .catch((error) => console.log(error));
};

exports.getAddStudent = (req, res, next) => {
    const userId = req.user;
    res.render("admin/add-student", {
        userId: userId,
        title: 'Attendancy GDA - New student',
    });
};

exports.getStudents = async (req, res, next) => {
    const userId = req.user;
    await db
        .query("SELECT * FROM students")
        .then((result) => {
            const students = result.rows;
            res.render("admin/students", {
                userId,
                students,
                title: 'Attendancy GDA - Student list',
            });
        })
        .catch((error) => console.log(error));
};

exports.postAddStudent = async (req, res, send) => {
    const { names, email, userId } = req.body;
    await db
        .query(
            `INSERT INTO students (noms, email) values ('${names}','${email}')`
        )
        .then((result) => {
            res.redirect("/admin/dashboard");
        })
        .catch((error) => console.log(error));
};

exports.getAddPresence = async (req, res, next) => {
    const userId = req.user;
    await db
        .query("SELECT * FROM students")
        .then((result) => {
            const students = result.rows;
            res.render("admin/add-presence", {
                userId,
                students,
                title: 'Attendancy GDA - New attendancy',
            });
        })
        .catch((error) => console.log(error));
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
                `INSERT INTO presences(studentid, presence) values (${studentId}, '${presence}')`
            )
            .then(async(response) => {
                
            })
            .catch((error) => console.log(error));
    }
    res.redirect("/admin/dashboard");
    
};
