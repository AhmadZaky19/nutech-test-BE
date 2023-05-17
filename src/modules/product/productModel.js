const connection = require("../../config/mysql");

module.exports = {
  getAllProduct: (search, limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM products_list WHERE name LIKE ? LIMIT ? OFFSET ?`,
        [`%${search}%`, limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getProductById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM products_list WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getCountProduct: (search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM products_list WHERE name LIKE ?`,
        [`%${search}%`],
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  postProduct: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO products_list SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateProduct: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE products_list SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  deleteProduct: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM products_list WHERE id = ?",
        id,
        (error) => {
          if (!error) {
            resolve(id);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
