import connection from "../configs/databaseConfig.js";

const createAccount = async (id, username, password, role) => {
    try {
        await connection.execute('INSERT INTO user VALUES(?, ?, ?, ?)', [id, username, password, role]);
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
}


const deleteAccount = async (id) => {
    try {
        await connection.execute('DELETE FROM user WHERE id = ?', [id]);
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
}


export {
    createAccount,
    deleteAccount
}