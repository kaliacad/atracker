import sendCoachMail from "./sendCoachEmail.js";
import sendStudentMail from "./sendStudentEmail.js";
import Student from "../../models/Student.js";

const timeTosend = "08:49:50";

export default async () => {
    const value = new Date().toTimeString().split(" ")[0];
    try {
        if (value === timeTosend) {
            sendCoachMail();
            const students = await Student.findAll();
            students.forEach((student) => {
                // we send email for each student after 1 sec
                const executeMail = () => {
                    sendStudentMail(student.dataValues);
                };
                setTimeout(executeMail, 1000);
            });
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log({ message: error.message, stack: error.stack });
    }
};
