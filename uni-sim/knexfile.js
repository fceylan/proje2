module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres', 
        password: '123456', 
        database: 'uni-simu', 
      },
      migrations: {
        directory: './migrations',
      },
    },
  };