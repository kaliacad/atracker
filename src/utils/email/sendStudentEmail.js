const transporter = require("../emailTransport");
const db = require("../../db/index");

module.exports = async (student) => {
    const date = new Date().toISOString().split("T")[0];
    let presences;

    await db
        .query(
            "SELECT * FROM presences where studentid= $1  AND CAST(createdat AS DATE) = $2",
            [student.id, date]
        )
        .then((result) => {
            presences = result.rows;
            console.log(
                date,
                "presences for ",
                student,
                "in sendUser",
                presences
            );
        })
        .catch((error) => console.log(error));
    let template = `
        <h1>Bonjour ${student.noms} </h1>
        <p>
            Aujourd'hui votre presence de la date du 
        </p>
        `;
    presences.forEach((presence) => {
        template += `
            <p>
                A ${presence.createdat} vous etait ${presence.presence}
            </p>
            `;
    });
    const mailOptions = {
        from: '"Administrateur " <ckarungu921@kinshasadigital.com>', // sender address
        to: '"' + student.email + '"', // list of receivers
        subject: "Feadback des presences des apprenants ✔", // Subject line
        text: template, // plain text body
        html: template, // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);

        console.log("Message sent: %s", info.response);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
};
