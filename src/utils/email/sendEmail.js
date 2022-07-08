const db = require("../../db/index");
const sendCoachMail = require("./sendCoachEmail");
const sendStudentMail = require("./sendStudentEmail");

module.exports = async () => {
    const value = new Date().toTimeString().split(" ")[0];
    value === "11:15:00" ? console.log(value, true) : console.log(value, false);
    if (value == "11:15:00") {
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
