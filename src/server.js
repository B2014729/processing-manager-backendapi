import express from "express";
import middelewareConfig from "./configs/middelwareConfig.js";
import initWebRoute from "./routes/index.js";
import MongoDB from "./configs/mongoDB.js";

const startServer = async () => {
    try {
        const app = express();
        const PORT = 3000;

        middelewareConfig(app);
        initWebRoute(app);

        await MongoDB.connect("mongodb://127.0.0.1:27017/process-manager");

        app.use((req, res, next) => {
            res.send('404 Not Found')
        })

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();

