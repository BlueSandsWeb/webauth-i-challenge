const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig.js');

router.get('/', lockdown, async (req, res) => {
  try {
    const users = await db('users').select('id', 'username','password');
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ message: "Internal server error"});
  }
})

async function lockdown (req, res, next) {
  console.log(`lockdown running`);
  const {username, password } = req.headers;
  if(username && password) {
    const user = await db('users').where({username}).first();
    console.log(bcrypt.compareSync(password, user.password));
    if(bcrypt.compareSync(password, user.password)){
      next();
    } else {
      res.status(403).json({message: "UNAUTHORIZED, WE HAVE NOTIFIED THE FBI"});
    }
  } else {
    res.status(401).json({ message: "Please login"});
  }
}

module.exports = router;