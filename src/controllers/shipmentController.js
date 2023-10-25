import * as shipmentModel from '../models/shipmentModel.js';
// import xlsx from 'xlsx';

const checkIsset = async (req, res) => {
    let id = req.body.id;
    await shipmentModel.checkIsset(id).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: result
        });
    });
}

const getListShipment = async (req, res) => {
    await shipmentModel.getListShipment().then((result) => {
        return res.status(200).json({
            statusCode: 200,
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
    });
}

const getShipmentByFilter = async (req, res) => {
    let { month, year, id_product } = req.body;
    await shipmentModel.getShipmentByFilter(month, year, id_product).then((result) => {
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            data: result,
        });
    });
}

const newShipment = async (req, res) => {
    let { id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price } = req.body;
    await shipmentModel.createShipment(id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price)
        .then((result) => {
            return res.status(200).json({
                statusCode: 200,
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
                statusCode: 200,
                message: 'OK',
                data: result
            });
        })
}


// const exportFileExcel = async (req, res) => {
//     let data = await shipmentModel.getListShipment();
//     let newData = [];
//     data.forEach(element => {
//         let newItem = {
//             'id': element.id,
//             'name': element.name,
//             'date_manufacture': element.date_manufacture,
//             'quantity': element.quantity,
//             'price': element.price,
//             'sum': (element.price * element.quantity)
//         }
//         newData.push(newItem);
//     });
//     let header = [['ID', 'Tên lô hàng', 'Ngày sản xuất', 'Số lượng', 'Giá bán', 'Tổng']];
//     let workbook = xlsx.utils.book_new();
//     let worksheet = xlsx.utils.json_to_sheet(newData);
//     xlsx.utils.sheet_add_aoa(worksheet, header)
//     xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     let buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

//     res.attachment('data.xlsx');
//     return res.send(buffer);
// }


export {
    getListShipment,
    getShipment,
    updateShipment,
    newShipment,
    checkIsset,
    getShipmentByFilter,
    //   exportFileExcel
}