const authRouter = require('./AuthRoute.js');
const cartRouter = require('./CartRoute.js');
const orderRouter = require('./OrderRoute.js');
const productRouter = require('./ProductRoute.js');
const userRouter = require('./UserRoute.js');

module.exports = (app, passport) =>  {
  authRouter(app, passport);
  cartRouter(app);
  orderRouter(app);
  productRouter(app);
  userRouter(app);
}
