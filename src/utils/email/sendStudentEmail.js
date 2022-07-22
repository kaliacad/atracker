const transporter = require("../emailTransport");
const db = require("../../db/index");

module.exports = async (student) => {
    const date = new Date().toISOString().split("T")[0];
    let midi;
    let presences;
    let template = `
        <h1> ${student.noms} </h1>
        <p>
            Nous avons le réel plaisir de te faire parvenir ton status de présence pour 
        `;

    await db
        .query(
            "SELECT * FROM presences where studentid= $1  AND CAST(createdat AS DATE) = $2",
            [student.id, date]
        )
        .then((result) => {
            presences = result.rows;

            //we add the date of presence to template
            template += ` 
                ${presences[0].createdat.toISOString().split("T")[0]} :
            <ul>`;
        })
        .catch((error) => {
            const err = new Error(error);
            err.httpStatusCode = 500;
            return next(err);
        });

    presences.forEach((presence) => {
        const datePresence = new Date(presence.createdat);
        midi = new Date(presence.createdat)
            .toTimeString()
            .split(" ")[0]
            .split(":")[0];


        //we add description of presence tp template
        template += `
            
                <li> ${midi < 12 ? "Avant-midi" : "Apres-midi"} : ${
            presence.presence
        } </li>
            
            `;
    });
    template += `
    </ul>
    Merci! <br>
    Equipe pédagogique <br>
    Abel <br>
    Lucien <br>
    </p>`;

    console.log(template);

    const mailOptions = {
        from: '"Cedric karungu " <ckarungu921@kinshasadigital.com>', // sender address
        to: '"' + student.email + '"', // list of receivers
        subject: "Équipe pedagogique GDA - status de présence ✔", // Subject line
        text: template, // plain text body
        html: template, // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);

        console.log("Message sent: %s", info.response);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
};
