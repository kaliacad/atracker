import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line operator-linebreak
const connectionString = process.env.POSTGRES_URI;

export default connectionString;
