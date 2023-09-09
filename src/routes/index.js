import express from 'express';

import { getBlockChain } from '../controllers/processController.js';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', (req, res, next) => {
        next();
    }, getBlockChain);

    return app.use('/', router);
}

export default initWebRoute;