/* eslint-disable no-console */
import transporter from "../emailTransport.js";
import pool from "../../db/index.js";

const { query } = pool;

export default async (student) => {
    const date = new Date().toISOString().split("T")[0];
    let presences;
    try {
        let template = `
        <h1> ${student.noms} </h1>
        <p>
            Nous avons le réel plaisir de te faire parvenir ton status de présence pour 
        `;

        const result = await query(
            "SELECT * FROM presences where studentid= $1  AND CAST(createdat AS DATE) = $2",
            [student.id, date]
        );
        presences = result.rows;

        // we add the date of presence to template
        template += ` 
                ${presences[0].createdat.toISOString().split("T")[0]} :
            <ul>`;
        presences.forEach((presence) => {
            // eslint-disable-next-line no-unused-vars
            const datePresence = new Date(presence.createdat);

            // we add description of presence tp template
            template += `
                <li> ${presence.isMatin ? "Avant-midi" : "Apres-midi"} : ${
    presence.presence
} </li>`;
        });
        template += `
    </ul>
    Merci! <br>
    Equipe pédagogique <br>
    Abel <br>
    Lucien <br>
    </p>`;

        const mailOptions = {
            // eslint-disable-next-line quotes
            from: '"Cedric karungu " <ckarungu921@kinshasadigital.com>', // sender address
            to: `"${student.email}"`, // list of receivers
            subject: "Équipe pedagogique GDA - status de présence ✔", // Subject line
            text: template, // plain text body
            html: template, // html body
        };

        // send mail with defined transport object
        // eslint-disable-next-line consistent-return
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);

            console.log("Message sent: %s", info.response);
            // eslint-disable-next-line no-undef
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    } catch (error) {
        console.log(error);
    }
};
