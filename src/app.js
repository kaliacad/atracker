import express from "express";
import path from "path";
import nodemon from "nodemon";

const app = express();

app.set("view engine", "ejs");
app.use(nodemon("tiny"))
app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// admin 
app.get("/", (req, res) => {
  res.render("views/admin")
})

export default app
