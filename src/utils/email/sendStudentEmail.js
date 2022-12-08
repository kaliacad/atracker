/* eslint-disable no-console */
import { Sequelize } from "sequelize";
import transporter from "../emailTransport.js";
import Presence from "../../models/Presence.js";

export default async (student) => {
    const date = new Date().toISOString().split("T")[0];
    try {
        let template = `
        <h1> ${student.nom} ${student.prenom}</h1>
        <p>
            Nous avons le réel plaisir de te faire parvenir ton status de présence pour 
        `;

        const presences = await Presence.findAll({
            where: {
                [Sequelize.Op.and]: [
                    { studentId: student.id },
                    // Sequelize.where("createdAt", "=", date),
                    Sequelize.where(
                        Sequelize.fn("date", Sequelize.col("createdAt")),
                        "=",
                        date
                    ),
                ],
            },
        });
        // we add the date of presence to template
        template += `
                ${new Date(presences[0].createdAt).toLocaleDateString()} :
            <ul>`;
        presences.forEach((presence) => {
            console.log({ student, presences: presence.dataValues });
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
            if (error) {
                return console.log("error when sending mail", {
                    message: error.message,
                    stack: error.stack,
                });
            }

            console.log("Message sent: %s", info.response);
            // eslint-disable-next-line no-undef
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    } catch (error) {
        console.log("--------error----------");
        console.log({ message: error.message, stack: error.stack });
    }
};
