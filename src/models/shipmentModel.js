import connection from "../configs/databaseConfig.js";

const checkIsset = async (id) => {
    try {
        let [result, field] = await connection.execute('SELECT * FROM shipment WHERE id = ?', [id]);
        if (result.length > 0) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }
    return false;
}

const getListShipment = async () => {
    try {
        let [result, field] = await connection.execute('SELECT * FROM shipment LEFT JOIN detail_shipment ON shipment.id = detail_shipment.id', []);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getShipment = async (id) => {
    try {
        let [result, field] = await connection.execute('SELECT * FROM shipment LEFT JOIN detail_shipment ON shipment.id = detail_shipment.id WHERE shipment.id = ?', [id]);
        return result[0];
    } catch (error) {
        console.log(error);
        return [];
    }
}

const createShipment = async (id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price) => {
    try {
        await connection.execute('INSERT INTO shipment VALUES (?,?,?,?)', [id, name, id_product, id_staff_Mn]);
        await connection.execute('INSERT INTO detail_shipment VALUES (?,?,?,?,?)', [id, quantity, price, date_manufacture, status]);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const updateShipment = async (id, name, id_product, id_staff_Mn, date_manufacture, status, quantity, price) => {
    try {
        await connection.execute('UPDATE shipment SET name = ?, id_product = ?, id_staff_Mn = ? WHERE id = ?', [name, id_product, id_staff_Mn, id]);
        await connection.execute('UPDATE detail_shipment SET date_manufacture = ?, status = ?, quantity = ?, price = ? WHERE id = ?',
            [date_manufacture, status, quantity, price, id]);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

export {
    getListShipment,
    createShipment,
    updateShipment,
    getShipment,
    checkIsset
}