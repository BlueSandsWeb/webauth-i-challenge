const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const registerRoute = require('./routes/registerRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const usersRoute = require('./routes/usersRoute.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("express working");
})

server.use('/api/register', registerRoute);
server.use('/api/login', loginRoute);
server.use('/api/users', usersRoute);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n** Running on port ${port} **`);
})