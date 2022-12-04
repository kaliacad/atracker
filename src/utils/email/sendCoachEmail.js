/* eslint-disable no-console */
import { getTestMessageUrl } from "nodemailer";
import User from "../../models/Student.js";
import pool from "../../db/index.js";
import transporter from "../emailTransport.js";

const { query } = pool;

export default async () => {
    const date = new Date().toISOString().split("T")[0];
    let usersEmail;
    let contentMail = `
    <p>
        En date du ${date} la situation des présences pour la classe dev GDA se présente comme suit :<br/>
        <ul>
    `;
    try {
        const users = (await User.findAll()).map((ele) => ele.dataValues);
        usersEmail = users.map((user) => user.email);
        // eslint-disable-next-line quotes
        usersEmail = usersEmail.join('","');
        const response = await query(
            "select presences.presence, COUNT (presences.presence)  from presences WHERE CAST(createdat AS DATE) = $1  group by presences.presence, presences.isMatin",
            [date]
        );
        response.rows.forEach((element) => {
            contentMail += `<li>${`${
                element.isMatin ? "avat midi" : "apres midi"
            } : ${element.count} ${element.presence} `}</li>`;
        });
        contentMail += `
                </ul><br>
            Merci!
            </p>
        `;
    } catch (error) {
        console.log(error);
    }

    const mailOptions = {
        // eslint-disable-next-line quotes
        from: '"cedric karungu " <ckarungu921@kinshasadigital.com>', // sender address
        to: `"${usersEmail}", "ckarungu921@gmail.com"`, // list of receivers
        // eslint-disable-next-line quotes
        // cc: '"jean-louis@kinshasadigital.com"',
        subject: "Équipe pédagogique GDA- status de présence ✔", // Subject line
        text: "Bonjour cher apprenant", // plain text body
        html: contentMail, // html body
    };
    // send mail with defined transport object
    // eslint-disable-next-line consistent-return
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);

        console.log("Message sent: %s", info.response);
        console.log("Preview URL: %s", getTestMessageUrl(info));
    });
};
