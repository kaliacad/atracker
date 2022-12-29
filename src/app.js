import express from "express";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

import dotenv from "dotenv";

// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import sendEmail from "./utils/email/sendEmail.js";

// routes
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";

// models
import User from "./models/User.js";
import Student from "./models/Student.js";
import Presence from "./models/Presence.js";
import Cohorte from "./models/Cohorte.js";

// error controller
import { getInternalError, getNotFound } from "./controllers/error.js";
// use routes

// eslint-disable-next-line no-unused-vars
import sequelize from "./db/config.js";

dotenv.config();

const app = express();
const { join } = path;

// const __filename = url.fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const accessLogStream = fs.createWriteStream(join(__dirname, "access.log"), {
    flags: "a",
});

// config
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// database relations
User.hasMany(Student, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Student.belongsTo(User);

Cohorte.hasMany(Student, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Student.belongsTo(Cohorte);

Student.hasMany(Presence, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
});
Presence.belongsTo(Student);

try {
    await sequelize.authenticate();
    sequelize.sync({ alter: false });
    // eslint-disable-next-line no-console
    console.log("connection to db etablished ");
} catch (error) {
    // eslint-disable-next-line no-console
    console.log("Unable to connect to the database", error);
}

app.use(
    session({
        // store: new (require("connect-pg-simple")(session))({
        //     // Insert connect-pg-simple options here
        //     pool : require('./db/pool')
        // }),
        secret: "secret word",
        resave: true,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
        // Insert express-session options here
        saveUninitialized: false,
    })
);

// templates views
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// bootstrap include
app.use(
    "/css",
    express.static(join(__dirname, "..", "node_modules/bootstrap/dist/css"))
);
app.use(
    "/js",
    express.static(join(__dirname, "..", "node_modules/bootstrap/dist/js"))
);

// for public  css and  js folders
app.use(
    express.static(
        join(
            __dirname,
            "..",
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
        )
    )
);
app.use(express.static(join(__dirname, "..", "public")));

app.use((req, res, next) => {
    req.user = req.cookies.session ? req.cookies.session : undefined;
    next();
});
app.use(async (req, res, next) => {
    // await faker();
    next();
});

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(publicRoutes);

app.get("/500", getInternalError);
app.use(getNotFound);

app.use((error, req, res) => {
    // eslint-disable-next-line no-console
    console.log({ message: error.message, stack: error.stack });
    res.redirect("/500");
});

// function to send automaticall eMail
const autocall = () => {
    sendEmail();
};
setInterval(() => {
    autocall();
}, 1000);
// autocall()

export default app;
