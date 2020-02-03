const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('./usersRoutes/users');
const gamesRouter = require('./gamesRoutes/games');
const statsRouter = require('./statsRoutes/stats');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/users', usersRouter);
server.use('/games', gamesRouter);
server.use('/stats', statsRouter);

module.exports = server;