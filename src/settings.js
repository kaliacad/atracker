// TODO.manage configuration data for different env (dev, prod...)

import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, DEV_CONNECTION_STRING, POSTGRES_URI } = process.env;
// eslint-disable-next-line operator-linebreak
const connectionString =
    NODE_ENV === "development" ? DEV_CONNECTION_STRING : POSTGRES_URI;

export default connectionString;
