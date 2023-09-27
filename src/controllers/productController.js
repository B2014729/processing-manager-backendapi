import * as productModel from '../models/productModel.js';

const getProduct = async (req, res) => {
    let id = req.params.id;
    await productModel.getProduct(id).then((result) => {
        return res.status(200).json({
            status: 200,
            message: 'OK',
            data: result
        });
    });
}

const getListProduct = async (req, res) => {
    await productModel.getAllProduct().then((result) => {
        return res.status(200).json({
            status: 200,
            message: 'OK',
            data: result
        });
    });
}


export {
    getProduct,
    getListProduct,
}