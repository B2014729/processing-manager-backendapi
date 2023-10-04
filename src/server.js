import express from "express";
import middelewareConfig from "./configs/middelwareConfig.js";
import initWebRoute from "./routes/index.js";

const app = express();
const PORT = 3000;

middelewareConfig(app);
initWebRoute(app);

app.use('/get-session', (req, res, next) => {
    res.send(req.session)
});

app.use('/set-session', (req, res, next) => {
    req.session.userlogin = {
        id: 23650,
        role: 1
    }
    res.send('Ok')
});

app.use((req, res, next) => {
    res.send('404 Not Found')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

