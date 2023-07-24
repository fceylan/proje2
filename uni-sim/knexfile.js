require('dotenv').config()
module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres', 
        password: process.env.PASS_KEY, 
        database: 'uni-simu', 
      },
      migrations: {
        directory: './migrations',
      },
    },
  };