const express = require ('express');
const router = express.Router();

const AuthService = require('../services/AuthService.js');
const AuthServiceInstance = new AuthService();


module.exports = (app, passport) => {
  app.use('/auth', router);

  router.post('/register', async (res, req, next) =>  {
    try {
      const data = req.body;
      const response = AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (err) {
      next(err)
    }
  });


  router.post('/login', passport.authenticate('local'), async(res, req, next) =>  {
    try {
      const {user, password } = req.body;
      const response = await AuthServiceInstance.login( {user, password} );
      res.send(200).send(response);
    } catch (err) {
      next(err)
    }
  });
}
