const createError = require('http-errors');
const productModel = require('../models/product.js');
const ProductModelInstance = new productModel();

module.exports = class ProductService {
  async find(options) {
    try {
      const products = ProductModelInstance.find(options);

      return products;
    } catch (err) {
      throw err;
    }
  }

  async get(id) {
    try {
      const product = ProductModelInstance.findbyId(id);

      if (!product) {
        throw createError(404, 'Could not find product')
      }

      return product;
    } catch (err) {
      throw err;
    }
  }
}
