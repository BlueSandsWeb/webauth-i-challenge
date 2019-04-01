const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig.js');

router.get('/', async (req, res) => {
  const {username, password} = req.headers;
  if(username === '' || password === ''){
    res.status(400).json({message: "please fill in both fields"});
  } else {
    const user = await db('users').where({username}).first();
    if(username === user.username && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({message: `Welcome ${user.username}!`})
    } else {
      res.status(401).json({message: `Invalid Credentials`});
    }

  }
})

module.exports = router;