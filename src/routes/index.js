import express from 'express';

import { getBlockChain } from '../controllers/processController.js';

import * as staffController from '../controllers/staffController.js';

let router = express.Router();

const initWebRoute = (app) => {
    //Acount

    //Staff
    router.route('/create-user')
        .post(staffController.createStaff)
    router.route('/user/:id')
        .get(staffController.getStaffInfor)
        .put(staffController.updateStaffInfor)
        .delete(staffController.deleteStaff)

    router.route('/staff-list')
        .get(staffController.getStaffList)

    // router.route('/edit-user')
    //     .post(staffController.updateStaffInfor)

    //Processing
    router.route('/myblockchain')
        .get(getBlockChain)

    //Product
    return app.use('/api', router);
}

export default initWebRoute;