const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const pg = require("pg");
const session = require("express-session");
const pgSession = require("express-pg-session")(session);
require("dotenv").config();
const pool = require("./db");
const sendEmail = require("./middlewares/sendEmail");

const app = express();
app.use(morgan("dev"));

app.use(
    session({
        secret: "secret word",
        resave: false,
        saveUninitialized: false,
    })
);

//routes
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const publicRoutes = require("./routes/public");

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
    req.user = req.session.user ? req.session.user.id : undefined;
    console.log(req.user);
    next();
});
//use routes

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(publicRoutes);
const date = new Date();
console.log(date.toTimeString());
const value = date.toTimeString().split(" ")[0];
if (date === "15:46:00") console.log(value);
value == "15:51:00" ? console.log(true) : console.log(false);


//function to send automaticall eMail
const autocall = () => {  
    sendEmail(); 
};
 setInterval(() => {
     autocall();
 }, 1000);
// autocall()

module.exports = app;
