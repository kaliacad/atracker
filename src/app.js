const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const sendEmail = require("./utils/email/sendEmail");
const cookieParser = require("cookie-parser");

const app = express();
app.use(morgan("dev"));

app.use(cookieParser());

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
    req.user = req.cookies.session ? req.cookies.session : undefined;
    next();
});
//use routes

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(publicRoutes);

//function to send automaticall eMail
const autocall = () => {
    sendEmail();
};
setInterval(() => {
    autocall();
}, 1000);
// autocall()

module.exports = app;
