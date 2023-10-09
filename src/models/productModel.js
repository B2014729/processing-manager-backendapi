import { run } from "@babel/core/lib/transformation/index.js";
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

const createProduct = async (name, hsd, preserve, pack, status, image) => {
    try {
        await connection.execute('INSERT INTO product(name, hsd, preserve, pack, status, image) VALUES (?,?,?,?,?,?)', [name, hsd, preserve, pack, status, image]);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const updateProduct = async (id, name, hsd, preserve, pack, status, image) => {
    try {
        await connection.execute('UPDATE product SET name = ?, hsd = ?, preserve = ?, pack = ?, status = ?, image = ? WHERE id = ?', [name, hsd, preserve, pack, status, image, id]);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

const deleteProduct = async (id) => {
    try {
        await connection.execute('DELETE FROM product WHERE id = ?', [id]);
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

export {
    getProduct,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}