const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
const usersRouter = require('./usersRoutes/users');


const server = express();

// server.use(helmet());
// server.use(cors());
server.use(express.json());

server.use('/users', usersRouter);

module.exports = server;