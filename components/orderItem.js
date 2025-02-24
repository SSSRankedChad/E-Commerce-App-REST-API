const db = require('../db');
const pgp = require('pg-promises')( {capSQL: true} );
const moment = require('moment');

module.exports = class OrderItemModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.description = data.description;
    this.modified = moment.utc().toISOString();
    this.name = data.name;
    this.price = data.price || 0;
    this.productId = data.id;
    this.qty = data.qty || 1;
    this.orderId = data.orderId || null;
  }

  async create(data) {
    try {
      const statement = pgp.helpers.insert(data, null, 'orderItems') + 'RETURNING *';
      const results = db.query(statement);

      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

 async findById(orderId) {
   try {
     const statement = `SELECT
                       oi.qty,
                       oi.id as "cartItemId"
                       p.* FROM orderItems oi
                       INNER JOIN products p on p.id = oi."productId"
                       WHERE orderId = $1`
     const values = [orderId];
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
