const color = require("chalk")

const app = require("./app");
const port = 4000;

app.listen(port, () => console.log(`The server is listning on port ${color.green(port)}`));
