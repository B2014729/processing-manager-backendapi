import * as staffModel from '../models/staffModel.js';
import jwt from 'jsonwebtoken';

const decodeToken = async (token) => {
    let decode = await jwt.verify(token, 'privateKeyToken')
    return decode.userID;
}

const getProfile = async (req, res) => {
    let id = await decodeToken(req.body.token);
    // let result = await staffModel.findOne(id); no promise
    await staffModel.findOne(id).then((result) => {
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'OK',
                data: result
            });
        }
        return res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
            data: null
        });
    })
}

const updateProfile = async (req, res) => {
    let id = await decodeToken(req.body.token);
    let status = 404;
    let { fullname, birth_date, gender, phone, id_number, address, email, id_DV, position, id_salary } = req.body;

    await staffModel.updateStaff(id, fullname, birth_date, gender, phone, id_number, address, email, id_DV, position, id_salary).then((result) => {
        if (result) {
            status = 200;
        }
        return res.status(status).json({
            statusCode: status,
            message: result, //true or false
        });
    });
}

const getStaffInfor = async (req, res) => {
    let id = req.params.id;
    // let result = await staffModel.findOne(id); no promise
    await staffModel.findOne(id).then((result) => {
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'OK',
                data: result
            });
        }
        return res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
            data: null
        });
    })
}


const getStaffList = async (req, res) => {
    await staffModel.findAll().then((result) => {
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'OK',
                data: result
            });
        }
        return res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
            data: null
        });
    })
}


const newStaff = async (req, res) => {
    let { id, fullname, birth_date, gender, phone, id_number, address, email,
        link_avatar, id_DV, position, id_salary, username, password, role } = req.body;
    console.log(id, fullname, birth_date, gender, phone, id_number, address, email,
        link_avatar, id_DV, position, id_salary, username, password, role);

    if (!link_avatar) {
        link_avatar = '';
    }
    await staffModel.createStaff(id, fullname, birth_date, gender, phone,
        id_number, address, email, link_avatar, id_DV, position, id_salary, username, password, role).then((result) => {
            return res.status(200).json({
                statusCode: 200,
                message: result,
            });
        });
}


const updateStaffInfor = async (req, res) => {
    let status = 404;
    let id = req.params.id;
    let { fullname, birth_date, gender, phone, id_number, address, email, id_DV, position, id_salary } = req.body;

    await staffModel.updateStaff(id, fullname, birth_date, gender, phone, id_number, address, email, id_DV, position, id_salary).then((result) => {
        if (result) {
            status = 200;
        }
        return res.status(status).json({
            statusCode: status,
            message: result, //true or false
        });
    });
}


const deleteStaff = async (req, res) => {
    let id = req.params.id;
    await staffModel.deleteStaff(id).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: result,
        });
    });
}

const getStaffWithPosition = async (req, res) => {
    //let position = req.params.position;
    await staffModel.getStaffWithPosition().then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result
        });
    });
}

const getSalaryStaff = async (req, res) => {
    await staffModel.getSalaryStaff().then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result
        });
    });
}

export {
    getProfile,
    updateProfile,
    getStaffInfor,
    getStaffList,
    newStaff,
    updateStaffInfor,
    deleteStaff,
    getStaffWithPosition,
    getSalaryStaff
}