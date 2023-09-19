import express from 'express';
import cors from 'cors';
import session from 'express-session';

const corsOptions = {
    origin: 'http://localhost:8080', // Access-Control-Allow-Origin: http://localhost:8080 Khi chay cung server vaf client tren cung mot may chu
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

const middelewareConfig = (app) => {
    app.use(express.static('src/public'));

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use(cors(corsOptions));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
};

export default middelewareConfig;