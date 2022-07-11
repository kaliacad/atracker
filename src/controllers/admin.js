const db = require("../db");
const date = new Date().toISOString().split("T")[0];



exports.getIndex = async (req, res, next) => {
    const userId = req.user;
    await db
        .query(
            "select presences.presence, COUNT (presences.presence)  from presences WHERE CAST(createdat AS DATE) = $1  group by presences.presence ",
            [date]
        )
        .then(async(presencesTodayData) => {
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
                        title: 'Attendancy GDA - Dashboard',
                    });
                });
        })
        .catch((error) => console.log(error));;
    
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
        .query("SELECT * FROM students order by id")
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

exports.getSingleStudent = async(req, res, next) => {
    const studentId = req.params.id;
    const userId = req.user;
    await db
        .query("SELECT * FROM students where id = $1", [studentId])
        .then(result => {
            const student = result.rows;
            
            res.render("admin/one-student", {
                userId,
                student: student[0],
            });
        })
        .catch((error) => console.log(error));
}

exports.postAddStudent = async (req, res, send) => {
    const { names, email, userId } = req.body;
    await db
        .query(
            `INSERT INTO students (noms, email) values ('${names}','${email}')`
        )
        .then((result) => {
            res.redirect("/admin/");
        })
        .catch((error) => console.log(error));
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
    res.redirect("/admin/");
    
};
