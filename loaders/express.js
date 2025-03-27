const cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");
const dotenv = require('dotenv').config();
const { SESSION_SECRET } = require('../config.env');

module.exports = (app) => {
  //Implement CORS middleware
  //

  app.use(cors());

  //Parse the req.body into JSON
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded( {extended: true}));

  app.set('trust proxy', 1);
 
  //Creates a session
  app.use(
     session({
       secret: SESSION_SECRET,
       resave: false, 
       saveUninitialized: false,
       cookie: {
          secure: false,
          maxAge: 24 * 24 * 60 * 1000,
       }
  }));

 return app;
}

