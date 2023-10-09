import * as accountModel from '../models/accountModel.js';
import jwt from 'jsonwebtoken';

const encodeToken = (idUser) => {
    return jwt.sign({
        is: 'Hai Bang',
        userID: idUser,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3)
    }, "privateKeyToken");
}

const decodeToken = (token) => {
    let decode = jwt.verify(token, 'privateKeyToken')
    return decode.userID;
}

const checkIssetInDatabase = async (req, res) => {
    let { username } = req.body;

    await accountModel.checkIsset(username).then((result) => {
        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: true,
            });
        }
        return res.status(200).json({
            statusCode: 200,
            message: false,
        });
    });
}

let checkUser = async (req, res) => {
    let { username, password } = req.body;
    await accountModel.checkAccount(username, password).then((result) => {
        if (result.length > 0) {
            const token = encodeToken(result[0].id);
            res.setHeader("Authorization", token);

            return res.status(200).json({
                statusCode: 200,
                message: true,
                data: result,
            });
        }
        return res.status(404).json({
            statusCode: 404,
            message: false,
            data: []
        });

    });
}

const checkRole = async (req, res) => {
    let id = await decodeToken(req.body.token);

    await accountModel.checkRole(id).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result.role
        });
    });
}


export {
    checkUser,
    checkIssetInDatabase,
    checkRole
}