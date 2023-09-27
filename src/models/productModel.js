import connection from "../configs/databaseConfig.js";

const getProduct = async (id) => {
    try {
        let [result, field] = await connection.execute('SELECT * FROM product WHERE id = ?', [id]);
        if (result) {
            return result[0];
        }
    } catch (err) {
        console.log(err);
    }
    return [];
}

const getAllProduct = async () => {
    try {
        let [result, field] = await connection.execute('SELECT * FROM product', []);
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {
    getProduct,
    getAllProduct
}