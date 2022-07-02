require('dotenv').config()
const app = require("./app");

const PORT = process.env.NODE_PORT || 5000;

app.listen(PORT, () =>
    console.log(`The server is listning on port ${PORT}`)
);
