const { Pool } = require("pg");
const { DB } = require("../config");

const pool = new Pool({
  USER: DB.PGUSER,
  PASSWORD: DB.PGPASSWORD,
  DATABASE: DB.PGDATABASE,
  HOST: DB.PGHOST,
  PORT: DB.PGPORT,
})


module.exports = {
  query: (text, params) => pool.query(text, params)
}
