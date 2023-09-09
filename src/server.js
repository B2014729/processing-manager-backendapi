import express from "express";
import middelewareConfig from "./configs/middelwareConfig.js";
import initWebRoute from "./routes/index.js";

const app = express();
const PORT = 3000;

middelewareConfig(app);
initWebRoute(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

