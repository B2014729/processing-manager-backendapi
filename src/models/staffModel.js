import e from 'cors';
import connection from '../configs/databaseConfig.js';
import * as accountModel from '../models/accountModel.js';

const findOne = async (id) => {
   let [staffInfo, field] = await connection.execute('SELECT staff.*, salary.basic, salary.support, salary.BH FROM staff, salary WHERE staff.id_salary = salary.id AND staff.id = ?', [id]);
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


const createStaff = async (id, fullname, birth_date, gender, phone, id_number, address, email, link_avatar, id_dv, position, id_salary, username, password, role) => {
   console.log(id, fullname, birth_date, gender, phone, id_number, address, email, link_avatar, id_dv, position, id_salary, username, password, role);

   try {
      await connection.execute('INSERT INTO staff VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
         , [id, fullname, birth_date, gender, phone, id_number, address, email, id_dv, position, id_salary, link_avatar]);
      await accountModel.createAccount(id, username, password, role);
   } catch (err) {
      console.log(err);
      return false;
   }
   return true;
}


const updateStaff = async (id, name, birth, gender, phone, id_number, address, email, id_dv, position, id_salary) => {
   try {
      await
         connection.execute('UPDATE staff SET fullname = ?, birth_date = ?, gender = ?, phone = ?, id_number = ?, address = ?, email = ?, id_DV = ?, position = ?, id_salary = ? WHERE id = ?',
            [name, birth, gender, phone, id_number, address, email, id_dv, position, id_salary, id]);
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


const getStaffWithPosition = async () => {
   try {
      let [result, field] = await connection.execute('SELECT * FROM staff WHERE position = ?', ['Quản lí lô hàng']);
      if (result.length > 0) {
         return result;
      }
   } catch (err) {
      console.log(err);
      return [];
   }
}

const getSalaryStaff = async () => {
   try {
      let [result, field] = await connection.execute('SELECT staff.id, staff.fullname, staff.position, staff.id_salary, salary.basic, salary.support, salary.BH FROM staff, salary WHERE staff.id_salary = salary.id', []);
      return result;
   } catch (error) {
      console.log(error);
   }
   return [];
}

export {
   findOne,
   findAll,
   createStaff,
   updateStaff,
   deleteStaff,
   getStaffWithPosition,
   getSalaryStaff
}

