// Update with your config settings.

const pg = require('pg')
pg.defaults.ssl = true;

module.exports = {
  production: {
    client: "pg",
    // connection: ,
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: './data/seeds' },
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/champSelect.db3'
    }, 
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
