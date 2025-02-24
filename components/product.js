const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });


module.exports = class ProductModel {
 async find(product = {}) {
  try {
    const statement = 'SELECT * FROM products';
    const values = [product];
    const results = db.query(statement, values);

    if (results.rows?.length){
      return results.rows[0];
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
 }

 async findbyId(id) {
   try {
     const statement = 'SELECT * FROM products WHERE id = $1';
     const values = [id];
     const results = db.query(statement, values);

     if (resutls.rows?.length) {
       return results.rows[0];
     }
     return null;
   } catch (err) {
     throw new Error(err);
   }
 }
}
