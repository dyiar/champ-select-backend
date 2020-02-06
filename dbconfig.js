const knex = require('knex');
const knexConfig = require('./knexfile');
let environment = process.env.DB_ENV
let client = knexConfig[environment]

module.exports = knex(client);