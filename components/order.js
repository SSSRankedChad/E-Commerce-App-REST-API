const db = require('../db');
const pgp = require('pg-promise')( {capSQL: true} );
const moment = require('moment');
const OrderItem = require('./orderItem');


module.exports = class OrderModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toLocaleString();
    this.modified = moment.utc().toLocaleString();
    this.total = data.total || null;
    this.userId = data.userId || null;
    this.items = data.items || [];
    this.status = data.status || 'PENDING';
  }

  addItems(items) {
    this.items = items.map(item => new OrderItem(item));
  }

  async create() {
   try {
     const {items, ...order} = this;

    const statement = pgp.helpers.format(order, null, 'orders') + 'RETURNING *';

    const results = db.query(statement);



    if (results.rows?.length) {
      Object.assign(this, results.rows[0])
      return results.rows[0];
    }
    return null;
   } catch (err) {
    throw new Error(err);
   }
  }

  async update(data) {
    try {
      const condition = pgp.as.format('WHERE id = ${id} RETURNING *', {id: this.id});
      const statement = pgp.helpers.insert(data, null, 'orders') + condition;

      const results = db.query(statement);

      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneByUserId(userId) {
    try {
      const statement = 'SELECT * FROM orders WHERE userId = $1';
      const values = [userId];
      const results = db.query(statement, values);

      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error (err);
    }
  }

  async findOneById(orderId) {
    try {
      const statement = 'SELECT * FROM orders WHERE id = $1';
      const values = [orderId];
      const results = db.query(statement, values);

      if (results.rows?.length) {
        return results.rows[0];

      }
      return null
    } catch (err) {
      throw new Error (err);
    }
  }

}
