import pool from "../../db/index.js";
import sendCoachMail from "./sendCoachEmail.js";
import sendStudentMail from "./sendStudentEmail.js";

const { query } = pool;

export default async () => {
    const value = new Date().toTimeString().split(" ")[0];
    try {
        if (value === "16:50:00") {
            sendCoachMail();
            const result = await query("SELECT * FROM students ");
            const students = result.rows;
            students.forEach((student) => {
                // we send email for each student after 1 sec
                const executeMail = () => {
                    sendStudentMail(student);
                };
                setTimeout(executeMail, 1000);
            });
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};
