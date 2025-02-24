const express = require('expres');
const router = express.Router();
const UserService = require('../services/UserService.js');
const UserServiceInstance = new UserService();


module.exports = (app) =>  {
  app.use('/user', router);


  router.put('/:userId', async(req, res, next) =>  {
    try {
      const { userId } = req.params;
      const data = req.body
      const response = await UserServiceInstance.update({ id: userId, data });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/userId', async(req, res, next) =>  {
    try {
     const { userId } = req.params;
      const response = await UserServiceInstance.get( {id: userId});
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
}
