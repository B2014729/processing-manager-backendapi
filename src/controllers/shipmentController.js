import * as shipmentModel from '../models/shipmentModel.js';

const checkIsset = async (req, res) => {
    let id = req.body.id;
    await shipmentModel.checkIsset(id).then((result) => {
        return res.status(200).json({
            status: 200,
            message: result
        });
    });
}

const getListShipment = async (req, res) => {
    await shipmentModel.getListShipment().then((result) => {
        return res.status(200).json({
            status: 200,
            message: 'OK',
            data: result
        });
    });
}

const getShipment = async (req, res) => {
    let id = req.params.id;
    await shipmentModel.getShipment(id).then((result) => {
        if (result) {
            return res.status(200).json({
                status: 200,
                message: 'OK',
                data: result
            });
        }
        return res.status(404).json({
            status: 404,
            message: 'Not Found',
            data: null
        });
    });
}
const newShipment = async (req, res) => {
    let { id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price } = req.body;
    await shipmentModel.createShipment(id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price)
        .then((result) => {
            return res.status(200).json({
                status: 200,
                message: result,
            });
        });
}

const updateShipment = async (req, res) => {
    let id = req.params.id;
    let { name, id_product, id_staff_Mn, date_manufacture, status, quantity, price } = req.body;
    await shipmentModel.updateShipment(id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price)
        .then((result) => {
            return res.status(200).json({
                status: 200,
                message: 'OK',
                data: result
            });
        })
}

export {
    getListShipment,
    getShipment,
    updateShipment,
    newShipment,
    checkIsset,
}