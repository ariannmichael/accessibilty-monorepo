import "dotenv/config";
import app from "./app";
import { connectMongo } from "./db/mongo";

const PORT = process.env.PORT || 3000;

async function start() {
    await connectMongo();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start().catch((error) => {
    console.error("Error starting server", error);
    process.exit(1);
});