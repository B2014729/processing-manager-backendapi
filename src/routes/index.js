import express from 'express';

import * as  processController from '../controllers/processController.js';

import * as staffController from '../controllers/staffController.js';
import * as acountController from '../controllers/accountController.js';

import * as shipmentController from '../controllers/shipmentController.js';
import * as productController from '../controllers/productController.js';

import multer from "multer";
import appRootPath from "app-root-path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRootPath + '/src/public/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
});

const uploadFile = multer({ storage: storage });


let router = express.Router();

const initWebRoute = (app) => {
    //Acount ----------------------
    router.route('/login')
        .post(acountController.checkUser);
    router.route('/account/check-isset')
        .post(acountController.checkIssetInDatabase);
    router.route('/account/check-role')
        .post(acountController.checkRole)

    //Staff ----------------------
    router.route('/profile')
        .post(staffController.getProfile);
    router.route('/update-profile')
        .post(staffController.updateProfile);
    router.route('/new-staff')
        .post(staffController.newStaff);
    router.route('/staff/:id')
        .get(staffController.getStaffInfor)
        .put(staffController.updateStaffInfor)
        .delete(staffController.deleteStaff);
    router.route('/staff-list')
        .get(staffController.getStaffList);
    router.route('/get-staff-position')
        .get(staffController.getStaffWithPosition);
    router.route('/get-salary-table')
        .get(staffController.getSalaryStaff);

    //Shipment ----------------------
    router.route('/list-shipments')
        .get(shipmentController.getListShipment);
    router.route('/get-shipment/:id')
        .get(shipmentController.getShipment)
        .put(shipmentController.updateShipment);
    router.route('/get-shipment-filter')
        .post(shipmentController.getShipmentByFilter);
    router.route('/shipment/check-isset')
        .post(shipmentController.checkIsset);
    router.route('/new-shipment')
        .post(shipmentController.newShipment);

    //Product ----------------------
    router.route('/product/:id')
        .get(productController.getProduct)
        .delete(productController.deleteProduct);
    router.route('/list-product')
        .get(productController.getListProduct);
    router.route('/new-product')
        .post(uploadFile.single('image'), productController.newProduct);


    //Upload file image and infor product
    router.route('/uploadFile')
        .post(uploadFile.single('image'), productController.updateProduct);


    //Processing ----------------------
    router.route('/get-process/:id')
        .get(processController.getProcess);
    router.route('/new-process')
        .post(processController.newProcess);
    // router.route('/add-active')
    //     .post(processController.addActive);
    router.route('/check-isvalid/:id')
        .get(processController.checkIsvalid);
    return app.use('/api/processing-management', router);
}

export default initWebRoute;