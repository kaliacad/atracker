const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const pg = require("pg");
const session = require("express-session");
const pgSession = require("express-pg-session")(session);
require('dotenv').config()
const pool = require("./db");

const app = express();
app.use(morgan("dev"));

app.use(
    session({
        secret: "secret word",
        resave: false,
        saveUninitialized: false,
    })
);

// app.use((req, res, next) => {
//     try {
//         if (!req.session.user) {
//             return next();
//         }
//         const result = pool.query("SELECT * FROM users where id = $1", [
//             req.session.user.id,
//         ]);

//         const user = result.row[0];
//         if (user) {
//             req.user = user;
//             next();
//         }
//     } catch (error) {
//         console.log(console.error());
//     }
// });

//routes
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/public");
const { log } = require("console");

const views = path.join(__dirname, "views");

//templates views
app.set("view engine", "ejs");
app.set("views", views);

//body parser to decode form
app.use(bodyParser.urlencoded({ extended: false }));

//bootstrap include
app.use(
    "/css",
    express.static(
        path.join(__dirname, "..", "node_modules/bootstrap/dist/css")
    )
);
app.use(
    "/js",
    express.static(path.join(__dirname, "..", "node_modules/bootstrap/dist/js"))
);

//for public  css and  js folders
app.use(
    express.static(
        path.join(
            __dirname,
            "..",
            "node_modules/bootstrap/dist/css/bootstrap.min.css"
        )
    )
);
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
    // let user = req.get("Cookie")
    // user ? user = user.split(";")[0].split("=")[1] : undefined;
    // req.user = user;

    req.user = req.session.user ? req.session.user : undefined;
    next();
});
//use routes
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(publicRoutes);

module.exports = app;
