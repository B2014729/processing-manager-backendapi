import * as productModel from '../models/productModel.js';

const getProduct = async (req, res) => {
    let id = req.params.id;
    await productModel.getProduct(id).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result
        });
    });
}

const getListProduct = async (req, res) => {
    await productModel.getAllProduct().then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result
        });
    });
}

const updateProduct = async (req, res) => {
    let { id, name, hsd, preserve, pack, status, image } = req.body;
    if (req.hasOwnProperty('file')) {
        if (req.file.hasOwnProperty('filename')) {
            image = 'http://localhost:3000/images/' + req.file.filename;
        }
    }

    await productModel.updateProduct(id, name, hsd, preserve, pack, status, image).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result,
        });
    });
}

const newProduct = async (req, res) => {
    let { name, hsd, preserve, pack, status } = req.body;
    let image = '';
    if (req.hasOwnProperty('file')) {
        if (req.file.hasOwnProperty('filename')) {
            image = 'http://localhost:3000/images/' + req.file.filename;
        }
    }

    await productModel.createProduct(name, hsd, preserve, pack, status, image).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result,
        });
    });
}

const deleteProduct = async (req, res) => {
    let id = req.params.id;
    await productModel.deleteProduct(id).then((result) => {
        return res.status(200).json({
            statuscCode: 200,
            message: 'OK',
            data: result
        });
    });
}

export {
    getProduct,
    getListProduct,
    updateProduct,
    newProduct,
    deleteProduct,
}