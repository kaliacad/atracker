import app from "./app.js";

const PORT = process.env.NODE_PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));

export default app
