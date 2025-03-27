const cartModel = require('../models/cart.js');
const cartItemModel = require('../models/cartItem.js');
const orderModel = require('../models/order.js');

module.exports = class CartService {
  async create(data) {
    const { userId } = data;

    try {
      const cart = cartModel.create(userId);
      return cart;
    } catch (err) {
      throw err;
    }
  }
  async addItem(userId, data){
    try {
      const cart = await cartModel.findOneByUser(userId);

      const cartItem = await cartItemModel.create({cartId: cart.id, ...data});

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async loadCart(userId) {
    try {
     const cart = await cartModel.findOneByUser(userId);

     const items = await cartItemModel.findCartId(cart.id);

     cart.items = items;

     return cart;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      const cartItem = await cartItemModel.update(cartItemId, data);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      const cartItem = await cartItemModel.deleteCartId(cartItemId);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async checkout(cartId, data, payment) {
    try {
      const stripe = require('stripe')('pk_test_51QpyhaPOpAye6nyzpjWArLlaDq3lZhEFoKNOUFumsjBW1e5gwYCk6pLnEWpfvCEVZJ7dvL8wSJii7v1XwnyhB6U900WKmey0Zw')

      const cartItems = await cartItemModel.findCartId(cartId);

      const total = cartItems.reduce((total, item) => {
        return total + Number(item.price);
      }, 0);

      const Order = new orderModel( {total, cartId} );
      Order.addItems(cartItems);
      await Order.create();

      const charge = await stripe.charges.create({
        amount: total,
        currency: 'usd',
        source: payment.id,
        description: 'E_Commerce Charge'
      });

      const order = Order.update( {status: 'SUCCESFUL'} );

      return order;
    } catch (err) {
      throw err;
    }

  }
}
