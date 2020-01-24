const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
const usersRouter = require('./usersRoutes/users');
const gamesRouter = require('./gamesRoutes/games');


const server = express();

// server.use(helmet());
// server.use(cors());
server.use(express.json());

server.use('/users', usersRouter);
server.use('/games', gamesRouter);

module.exports = server;