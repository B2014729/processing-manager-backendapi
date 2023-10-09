import ProcessModel from '../models/processModel.js';
import MongoDB from '../configs/mongoDB.js';

let getProcess = async (req, res) => {
    let id = req.params.id;
    try {
        const processModel = new ProcessModel(MongoDB.client);
        const document = await processModel.getProcess(id);
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: document
        });
    } catch (error) {
        console.log(error);
    }
}

let newProcess = async (req, res) => {
    let { id, timetamps, title, contents, idUser } = req.body;
    let data = {
        "dateUpdate": timetamps,
        "title": title,
        "contents": contents,
        "user": Number(idUser)
    }
    try {
        let processModel = new ProcessModel(MongoDB.client);
        await processModel.addBlock(id, timetamps, data);
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
        });
    } catch (error) {
        console.log(error);
    }
}


const checkIsvalid = async (req, res) => {
    let id = req.params.id;
    try {
        let processModel = new ProcessModel(MongoDB.client);
        let result = await processModel.checkProcessTrue(id);
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result
        });
    } catch (error) {
        console.log(error);
    }
}
export {
    getProcess,
    newProcess,
    checkIsvalid
}