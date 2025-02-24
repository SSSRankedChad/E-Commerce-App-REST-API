const cors = require('cors');
const bodyParser = require('body-parser');
const session = require("express-session");
const {SESSION_SECRET} = require('../config');


module.exports = (app) => {

  //Implement CORS middleware 

  app.use(cors());

  //Parse the req.body into JSON
  app.use(bodyParser.json());

  app.use('trust proxy', 1);
 
  //Creates a session
  app.use(session({
    session: SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 24 * 60 * 1000,
    }
  }))
}

