const nodemailer = require("nodemailer");

module.exports = (req, res, next) => {
    const date = new Date();
    console.log(date.toTimeString());
    const value = date.toTimeString().split(" ")[0];
    console.log(value);
    if (value === '16:00:00') {
        
    }
   

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
        to: '"cedrickarungu10@gmail.com", "ckarungu921@gmail.com"', // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Bonjour cher apprenant, juste vous informe que votre presence a ete bien enregistre aujourd'hui", // plain text body
        html: `<b>Bonjour Cher apprenant</b>
        <p>
        juste vous informe que votre presence a ete bien enregistre aujourd'hui,
        </p>
        `, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);

        console.log("Message sent: %s", info.response);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    next();
};
