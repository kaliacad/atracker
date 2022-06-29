const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use("/css", express.static(path.join("node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join("node_modules/bootstrap/dist/js")));

app.get("/", (req, res) => {
    res.sendFile(path.join("views", "index.html"));
});

// admin
app.get("/", (req, res) => {
    res.render("views/admin");
});

module.exports = app;
