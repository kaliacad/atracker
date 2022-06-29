const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const db = require('./db')

const app = express();

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

//use routes
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(publicRoutes);

module.exports = app;
