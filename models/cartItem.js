const db = require('../db');
const pgp = require('pg-promise')( {capSQL: true });

module.exports = class CartItemModel {
   async create(data) {
     try {
       const statement = pgp.helpers.insert(data, null, 'cartItem') + 'RETURNING *';

       const results = db.query(statement);

       if(results.rows?.length) {
         return results.rows[0];
       }
       return null;
     } catch (err) {
       throw new Error(err);
     }
   }

   async update(id, data) {
     try {
       const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id});
       const statement = pgp.helpers.insert(data, null, 'cartItems') + condition;

       const results = db.query(statement)

       if (results.rows?.length) {
         return results.rows[0];
       }
       return null;
     } catch (err) {
       throw new Error(err);
     }
   }

  async findCartId(cartId) {
    try {
      const statement = `SELECT
                         ci.qty,
                         ci.id AS "cartItemId",
                         p.* FROM cartItems
                         INNER JOIN products p
                         ON p.id = ci."productId" WHERE cartId = $1`;

      const values = [cartId];

      const results = db.query(statement, values);

      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

 async deleteCartId(cartId) {
   try {
     const statement = 'DELETE FROM cartItems WHERE cartId = $1 RETURNING *';

     const values = [cartId];

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
