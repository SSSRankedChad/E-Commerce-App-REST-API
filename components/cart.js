const db = require('../db');
const pgb = require('pg-promise')( {capSQL: true} );
const moment = require('moment');


module.exports = class CartModel {
  constructor ( data = {}) {
    this.modified = moment.utc().toLocaleString();
    this.created = data.created || moment.utc().toLocaleString();
    this.converted = data.converted || null;
    this.isActive = data.isActive || null;

  }

  async create(userID) {
    try {
      const data = {userID, ...this};
      const statement = pgp.helpers.insert(data, null, 'cart') + 'RETURNING *';

      const result = db.query(statement)
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByUser(userID) {
    try {
      const statement = 'SELECT * FROM cart WHERE userId = $1';
      const values = [userID];
      const result = db.query(statement, values);
      if (result.rows?.length) {
        return result.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error(err);
    }
  }

  async findOneByID(id) {
   try {
     const statement = 'SELECT * FROM cart WHERE cartId = $1';
     const values = [id];
     const result = db.query(statement, values);
     if (result.rows?.length) {
       return result.rows[0];
      }
     return null;
    } catch(err) {
      throw new Error(err);
    }
  }
}
