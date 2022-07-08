const nodemailer = require("nodemailer");
const db = require("../../db/index");
const transporter = require("../emailTransport");

module.exports = async () => {
    const date = new Date().toISOString().split("T")[0];
    let usersEmail;
    let contentMail = `
    <b>Bonjour Cher Coach</b>
    <p>
        Voici les statistiques des presences d'aujourd'hui <br/>
        <ul>
    `;
    await db
        .query("SELECT * FROM users")
        .then((results) => {
            const users = results.rows;
            usersEmail = users.map((user) => {
                return user.email;
            });
            usersEmail = usersEmail.join('","');
        })
        .catch((error) => console.log(error));
    await db
        .query(
            "select presences.presence, COUNT (presences.presence)  from presences WHERE CAST(createdat AS DATE) = $1  group by presences.presence ",
            [date]
        )
        .then((response) => {
            response.rows.forEach((element) => {
                contentMail += `<li>${
                    element.presence + " =>  " + element.count
                }</li>`;
                console.log(element);
            });
            contentMail += `
                </ul><br>
            Merci et bonne suite
            </p>
        `;
        })
        .catch((error) => console.log(error));
    const mailOptions = {
        from: '"Administrateur " <ckarungu921@kinshasadigital.com>', // sender address
        to: '"' + usersEmail + '", "ckarungu921@gmail.com"', // list of receivers
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
};
