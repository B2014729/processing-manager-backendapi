import * as staffModel from '../models/staffModel.js';

const getStaffInfor = async (req, res) => {
    let id = req.params.id;
    // let result = await staffModel.findOne(id); no promise
    await staffModel.findOne(id).then((result) => {
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
    })
}


const getStaffList = async (req, res) => {
    await staffModel.findAll().then((result) => {
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
    })
}


const createStaff = async (req, res) => {
    let status = 404;
    let { id, fullname, birth_date, gender, phone, id_number, address, email,
        link_avatar, id_salary, username, password, role } = req.body;

    if (!link_avatar) {
        link_avatar = '';
    }
    await staffModel.createStaff(id, fullname, birth_date, gender, phone,
        id_number, address, email, link_avatar, id_salary, username, password, role).then((result) => {
            if (result) {
                status = 200;
            }
            return res.status(status).json({
                status: status,
                message: result,
            });
        });
}


const updateStaffInfor = async (req, res) => {
    let status = 404;
    let id = req.params.id;
    let { fullname, birth_date, gender, phone, id_number, address, email, id_salary } = req.body;
    await staffModel.updateStaff(id, fullname, birth_date, gender, phone, id_number, address, email, id_salary).then((result) => {
        if (result) {
            status = 200;
        }
        return res.status(status).json({
            status: status,
            message: result,
        });
    });
}


const deleteStaff = async (req, res) => {
    let id = req.params.id;
    let status = 404;
    await staffModel.deleteStaff(id).then((result) => {
        if (result) {
            status = 200;
        }
        return res.status(status).json({
            status: status,
            message: result,
        });
    });
}


export {
    getStaffInfor,
    getStaffList,
    createStaff,
    updateStaffInfor,
    deleteStaff
}