const db = require("../db");
const nodemailer = require("nodemailer");

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
                    console.log(presences);
                    const students = result.rows;
                    // console.log(students);
                    return res.render("admin/index", {
                        students,
                        presences,
                        userId,
                    });
                });
        })
        .catch((error) => console.log(error));
};

exports.getAddStudent = (req, res, next) => {
    const userId = req.user;
    res.render("admin/add-student", {
        userId: userId,
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
            });
        })
        .catch((error) => console.log(error));
};

exports.postAddStudent = async (req, res, send) => {
    const { names, email, userId } = req.body;
    await db
        .query(
            `INSERT INTO students (noms, email, idUser) values ('${names}','${email}', 1)`
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
                console.log("vb");
                let testAccount = await nodemailer.createTestAccount();
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });
                console.log("vba");

                const mailOptions = {
                    from: '"Cedric  👻" <ckarungu921@gmail.com>', // sender address
                    to: "ckarungu921@gmail.com", // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) return console.log(error);

                    console.log("Message sent: %s", info.messageId);
                    console.log(
                        "Preview URL: %s",
                        nodemailer.getTestMessageUrl(info)
                    );
                    return res.redirect("/admin/dashboard");
                });
            })
            .catch((error) => console.log(error));
    }
    
};
