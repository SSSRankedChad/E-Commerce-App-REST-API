const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB: {
    PGHOST: process.env.PGHOST,
    PGUSER: process.env.PGUSER,
    PGPORT: process.env.PGPORT,
    PGPASSWORD: process.env.PGPASSWORD,
  },
  SESSION_SECRET: process.env.SESSION_SECRET,
}
