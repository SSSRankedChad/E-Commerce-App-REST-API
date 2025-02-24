const db = require('../db');
const pgp = require('pg-promises')( {capSQL: true} );

module.exports = class UserModel {
 async create(data) {
   try {
     const statement = pgp.helpers.insert(data, null, 'user') + 'RETURNING *';

     const results = db.query(statement);

     if (results.rows?.length) {
       return results.rows[0];
     }
     return null;
   } catch (err) {
    throw new Error (err);
   }
 }

 async findbyUserId(id) {
   try {
     const statement = 'SELECT * FROM users WHERE id = $1';

     const values = [id];

     const results = db.query(statement, values);

     if (results.rows?.length) {
       return results.rows[0];
     }
     return null;
   } catch (err) {
     throw new Error (err);
   }
 }

 async updateUser(data, id) {
   try {
     const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id})
     const statement = pgp.helpers.insert(data, null, 'user') + condition;

     const results = db.query(statement);

     if (results.rows?.length) {
       return results.rows[0];
     }
     return null;
   } catch (err) {
     throw new Error (err);
   }
 }

 async findUserByEmail(email) {
   try {
     const statement = 'SELECT * FROM users WHERE email = $1';

     const values = [email]
     const results = db.query(statement, values);

     if (results.rows?.length) {
       return results.rows[0];
     }

     return null;
   } catch (err) {
     throw new Error(err);
   }
 }
}
