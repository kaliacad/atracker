const nodemailer = require("nodemailer");
const db = require("../db");

module.exports = async() => {
    let studentsEmail;
    let presences;
    let contentMail = `<b>Bonjour Cher Coach</b>
        <p>
        Voici les statistiques des presences d'aujourd'hui <br/><ul>`;
    const date = new Date();
    const value = date.toTimeString().split(" ")[0];

    value === "16:54:00" ? console.log(value, true) : console.log(value, false);
    if (value == "17:01:30") {
        await db.query("SELECT * FROM students")
            .then((results) => {
                const students = results.rows;
                studentsEmail = students.map((student) => {
                    return student.email;
                });
                studentsEmail = studentsEmail.join('","');
                console.log(studentsEmail);
            })
            .catch((error) => console.log(error));
        await db.query(
            "select presences.presence, COUNT (presences.presence)  from presences  group by presences.presence"
        )
            .then((response) => {
                // presences = response.rows;
                response.rows.forEach((element) => {
                    contentMail += `<li>${element.presence + ' '+ element.count}</li>`;
                    console.log(element)
                });
                contentMail += `</ul><br>
        Merci et bonne suite
        </p>`;
            })
            .catch((error) => console.log(error));
        console.log(contentMail);

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
            from: '"Administrateur " <ckarungu921@kinshasadigital.com>', // sender address
            to: '"' + studentsEmail + '", "ckarungu921@gmail.com"', // list of receivers
            subject: "Feadback des presences des apprenants ✔", // Subject line
            text: "Bonjour cher apprenant", // plain text body
            html: contentMail, // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);

            console.log("Message sent: %s", info.response);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    }
};
