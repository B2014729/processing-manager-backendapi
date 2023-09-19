import express from 'express';

import { getBlockChain } from '../controllers/processController.js';

import * as staffController from '../controllers/staffController.js';
import * as acountController from '../controllers/accountController.js';

let router = express.Router();

const initWebRoute = (app) => {
    //Acount
    router.route('/login')
        .post(acountController.checkUser)
    router.route('/get-session')
        .get(acountController.getSession)
    router.route('/logout')
        .post(acountController.removeSession)
    router.route('/check-isset')
        .post(acountController.checkIssetInDatabase)


    //Staff
    router.route('/new-staff')
        .post(staffController.newStaff)
    router.route('/staff/:id')
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
    return app.use('/api/processing-management', router);
}

export default initWebRoute;