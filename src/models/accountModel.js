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

const checkIsset = async (username) => {
    let [result, field] = await connection.execute('SELECT id FROM user WHERE username = ?', [username]);
    if (result.length > 0) {
        return true;
    }
    return false;
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

const checkAccount = async (username, password) => {
    let [result, field] = await connection.execute('SELECT * FROM user WHERE username = ? AND password = ?', [username, password]);
    if (result) {
        return result;
    }
    return [];
}

const checkRole = async (id) => {
    let [result, field] = await connection.execute('SELECT role FROM user WHERE id = ?', [id]);
    return result[0];
}

export {
    createAccount,
    deleteAccount,
    checkAccount,
    checkIsset,
    checkRole,
}