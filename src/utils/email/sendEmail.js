import pool from "../../db/index.js";
import sendCoachMail from "./sendCoachEmail.js";
import sendStudentMail from "./sendStudentEmail.js";

const query = pool.query;

export default async () => {
    const value = new Date().toTimeString().split(" ")[0];
    if (value == "16:50:00") {
        sendCoachMail();
        await query("SELECT * FROM students ")
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
