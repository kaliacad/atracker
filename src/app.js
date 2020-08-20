const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

app.use(logger("tiny"))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = app;
