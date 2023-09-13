import connection from '../configs/databaseConfig.js';
import * as accountModel from '../models/accountModel.js';

const findOne = async (id) => {
   let [staffInfo, field] = await connection.execute('SELECT * FROM staff WHERE id = ?', [id]);
   if (staffInfo) {
      return staffInfo[0];
   }
   return [];
}


const findAll = async () => {
   let [staffList, field] = await connection.execute('SELECT * FROM staff', []);
   if (staffList) {
      return staffList;
   }
   return [];
}


const createStaff = async (id, fullname, birth_date, gender, phone, id_number, address, email, link_avatar, id_salary, username, password, role) => {
   try {
      await accountModel.createAccount(id, username, password, role);
      await connection.execute('INSERT INTO staff VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
         , [id, fullname, birth_date, gender, phone, id_number, address, email, link_avatar, id_salary]);
   } catch (err) {
      console.log(err);
      return false;
   }
   return true;
}


const updateStaff = async (id, name, birth, gender, phone, id_number, address, email, id_salary) => {
   try {
      await
         connection.execute('UPDATE staff SET fullname = ?, birth_date = ?, gender = ?, phone = ?, id_number = ?, address = ?, email = ?, id_salary = ? WHERE id = ?',
            [name, birth, gender, phone, id_number, address, email, id_salary, id]);
   } catch (err) {
      console.log(err);
      return false;
   }
   return true;
}


const deleteStaff = async (id) => {
   try {
      await accountModel.deleteAccount(id);
      await connection.execute('DELETE FROM staff WHERE id = ?', [id]);
   }
   catch (err) {
      console.log(err);
      return false;
   }
   return true;
}

export {
   findOne,
   findAll,
   createStaff,
   updateStaff,
   deleteStaff
}

