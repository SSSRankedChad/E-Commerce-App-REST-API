const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');


const swaggerDocument = yaml.safeLoad(fs.writeFileSync(path.resolve(__dirname, '../swagger.yml'), 'utf-8'));

module.exports = (app) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
}
