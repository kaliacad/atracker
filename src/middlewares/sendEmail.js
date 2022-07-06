const nodemailer = require("nodemailer");
const db = require("../db");

module.exports = () => {
    let studentsEmail;
    const date = new Date();
    const value = date.toTimeString().split(" ")[0];

    value === "16:00:00" ? console.log(value, true) : console.log(value, false);
    if (value == "16:15:00") {
        db.query("SELECT * FROM students")
            .then((results) => {
                const students = results.rows;
                studentsEmail = students.map((student) => {
                    return student.email;
                });
                studentsEmail = studentsEmail.join('","')
                console.log(studentsEmail);
            })
            .catch((error) => console.log(error));

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ckarungu921@gmail.com", // generated ethereal user
                pass: "wavadqirqfwhbehe", // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: '"Administratueur " <ckarungu921@kinshasadigital.com>', // sender address
            to: '"' + studentsEmail + '", "ckarungu921@gmail.com"', // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Bonjour cher apprenant, juste vous informe vvvvvvvvvvvv que votre presence a ete bien enregistre aujourd'hui", // plain text body
            html: `<b>Bonjour Cher apprenant</b>
        <p>
        juste vous informe que votre presence vvvvvvvvvvvv a ete bien enregistre aujourd'hui,
        </p>
        `, // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);

            console.log("Message sent: %s", info.response);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }

};
