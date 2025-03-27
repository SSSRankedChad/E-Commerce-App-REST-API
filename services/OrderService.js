const orderModel= require('../models/order.js');
const orderItemModel = require('../models/orderItem.js');

module.exports = class OrderService {
  async find(data){
   try {

    const { id } = data;

    const order = orderModel.findOneById(id);

    return order;
   } catch (err) {
     throw err;
   }
  }
  async create(data) {
    try {
      const { id } = data;

      const order = orderModel.create(id);

      return order;

    } catch (err) {
      throw err
    }

  }

  async list(data) {

    try {
      const { id } = data;

      const orderItem = orderItemModel.findById(id);

      return orderItem;
    } catch (err) {
      throw err;
    }

  }
}
