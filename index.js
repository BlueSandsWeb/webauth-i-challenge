const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const registerRoute = require('./routes/registerRoute.js');
const loginRoute = require('./routes/loginRoute.js');
const usersRoute = require('./routes/usersRoute.js');

const db = require('./database/dbConfig.js');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = { // see more at www.npmjs.com/package/express-session
  name: 'authChallenge',
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 30, // in miliseconds
    secure: false, // use cookie over https.  This should be true if in production!!!!! set this in the .env
    httpOnly: true // false means javascript can access the cookie on the client.
  },
  resave: false,
  saveUnitialized: false, // TODO: lookup GDPR cookie compliance and how this works with it.
  store: new knexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

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