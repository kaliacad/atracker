const db = require("../../db/index");
const sendCoachMail = require("./sendCoachEmail");
const sendStudentMail = require("./sendStudentEmail");

module.exports = async () => {
    const value = new Date().toTimeString().split(" ")[0];
    if (value == "16:50:00") {
        setTimeout(sendCoachMail, 1000);
        await db
            .query("SELECT * FROM students ")
            .then((result) => {
                const students = result.rows;
                students.forEach((student) => {
                    //we send email for each student after 1 sec
                    const executeMail = () => {
                        sendStudentMail(student);
                    };
                    setTimeout(executeMail, 1000);
                });
            })
            .catch((error) => {
                const err = new Error(error);
                err.httpStatusCode = 500;
                return next(err);
            });
    }
};
