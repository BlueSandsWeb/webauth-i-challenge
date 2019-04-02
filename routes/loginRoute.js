const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig.js');

router.get('/', async (req, res) => {
  const { username, password } = req.headers;
  if (username === '' || password === '') {
    res.status(400).json({ message: "please fill in both fields" });
  } else {
    const user = await db('users').where({ username }).first();
    if (username === user.username && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      console.log(req.session);
      res.status(200).json({ message: `Welcome ${user.username}!` })
    } else {
      res.status(401).json({ message: `Invalid Credentials` });
    }
  }
})

router.get('/logout', (req, res) => {
  console.log(req.session);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: "Internal error, couldn't log out." })
        console.log('second', req.session);
      } else {
        res.status(200).json({ message: "Thanks for coming, Have a nice day!" })
      }
    })
  } else {
    res.status(200).json({ message: "looks like you weren't logged in" })
  }
})

module.exports = router;