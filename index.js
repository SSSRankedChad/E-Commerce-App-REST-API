const express = require('express');
const app = express();
const loaders = require('./loaders');
const PORT = require('./config.js');

async function startServer() {

    loaders(app);

    app.listen(PORT, () => {
      res.send(`Listening on PORT ${PORT}`)
    });
  }

startServer();

