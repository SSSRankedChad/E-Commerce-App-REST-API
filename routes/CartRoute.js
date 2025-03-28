const express = require('express');
const router = express.Router();
const CartService = require('../services/CartService.js');
const CartServiceInstance = new CartService();


module.exports = (app) =>  {
  app.use('/cart', router);

  router.get('/mine', async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.loadCart(id);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put('/mine', async(req, res, next) =>  {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.create(id);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/mine', async(req, res, next) =>  {
    try {
      const { id } = req.user;
      const data = req.body;
      const response = await CartServiceInstance.addItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/mine/items', async(req, res, next) =>  {
    try {
      const { cartItemId } = req.params;
      const data = req.body;

      const response = await CartServiceInstance.addItem(cartItemId, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/mine/checkout', async(req, res, next) =>  {
    try {
      const { id } = req.user;
      const { cart, paymentInfo } = req.body;
      const response = await CartServiceInstance.checkout( cart, id, paymentInfo );
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put('/mine/items/:itemId', async(req, res, next) =>  {
    try {
      const { cartItemId } = req.params;
      const data = req.body;
      const response = await CartServiceInstance.updateItem(cartItemId, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/mine/items/:itemId', async(req, res, next) =>  {
    try {
      const { cartItemId } = req.params;
      const response = await CartServiceInstance.removeItem(cartItemId);
      res.status(200).send(response);
    } catch(err) {
      next(err)
    }
  });
}
