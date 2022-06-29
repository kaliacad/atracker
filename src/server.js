import chalk from "chalk";

import app from "./app.js";
const PORT = 5000;

app.listen(PORT, () => console.log(`The server is listning on port ${chalk.green(PORT)}`));
