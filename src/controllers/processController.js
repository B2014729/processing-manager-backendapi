import * as processModel from '../models/processModel.js'

let getAllProcess = async (req, res) => {
    try {
        await processModel.getAllProcess().then((result) => {
            return res.status(200).json({
                data: result
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            data: null
        });
    }
}

let getProcess = async (req, res) => {
    let nameProcess = req.params.name;
    await processModel.getProcess(nameProcess).then((result) => {
        return res.status(200).json({
            data: result
        });
    })
}

let newProcess = async (req, res) => {
    let name = req.body.name;
    try {
        await processModel.createProcess(name).then((result) => {
            return res.status(200).json({
                message: result,
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: false,
        });
    }
}

let addActive = async (req, res) => {
    let name = req.body.name;
    let { dateUpdate, user, contents } = req.body;
    try {
        await processModel.addActiveOnProcess(name, dateUpdate, user, contents).then((result) => {
            if (result) {
                return res.status(200).json({
                    message: result,
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: false,
        });
    }
}

export {
    getProcess,
    newProcess,
    getAllProcess,
    addActive
}