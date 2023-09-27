import * as accountModel from '../models/accountModel.js';

let users = [];

const checkIssetInDatabase = async (req, res) => {
    let { username } = req.body;

    await accountModel.checkIsset(username).then((result) => {
        if (result) {
            return res.status(200).json({
                status: 200,
                message: true,
            });
        }
        return res.status(200).json({
            status: 200,
            message: false,
        });
    });
}

//session
let checkIssetUser = (id) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return true;
        }
    }
    return false;
}

let checkUser = async (req, res) => {
    let { username, password } = req.body;
    await accountModel.checkAccount(username, password).then((result) => {
        if (result.length > 0) {
            if (!checkIssetUser(result[0].id)) {
                users.push({
                    id: result[0].id,
                    role: result[0].role
                });
            }

            return res.status(200).json({
                status: 200,
                message: true,
                data: result,
                user: users
            });
        }
        return res.status(404).json({
            status: 404,
            message: false,
            data: []
        });

    });
}

const getSession = (req, res) => {
    if (req.session) {
        return res.status(200).json({
            status: 200,
            message: 'OK',
            data: users
        });
    }
    return res.status(404).json({
        status: 404,
        message: 'Not found',
        data: null
    });
}

const removeSession = (req, res) => {
    let id = req.body.id;
    users.forEach(item => {
        if (item.id == id) {
            users.pop();
        }
    });
    return res.status(200).json({
        status: 200,
        message: 'OK',
    });
}

export {
    checkUser,
    getSession,
    removeSession,
    checkIssetInDatabase
}