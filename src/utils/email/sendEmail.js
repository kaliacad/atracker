const db = require("../../db/index");
const sendCoachMail = require("./sendCoachEmail");
const sendStudentMail = require("./sendStudentEmail");

module.exports = async () => {
    const value = new Date().toTimeString().split(" ")[0];
    if (value == "16:50:00") {
        await db
            .query("SELECT * FROM students ")
            .then((result) => {
                const students = result.rows;
                students.forEach((student) => {
                    sendStudentMail(student);
                });
            })
            .catch((error) => console.log(error));
        sendCoachMail();
    }
};
