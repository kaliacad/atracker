const express = require("express");
const path = require("path");

const app = express();

const adminRoutes = require('./routes/admin')

const views = path.join(__dirname, "views");

app.set("view engine", "ejs");
app.set("views", views);
app.use("/css", express.static(path.join("node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join("node_modules/bootstrap/dist/js")));

app.use(express.static(path.join(__dirname, 'public')))

app.use(adminRoutes);

// admin


module.exports = app;
