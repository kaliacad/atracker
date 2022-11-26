import dotenv from "dotenv";
import app from "./app.js";

const PORT = process.env.NODE_PORT || 5000;

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
