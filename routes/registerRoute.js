const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

router.post('/', async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password,12);
  console.log(user);
  try {
    const [id] = await db('users').insert(req.body);
    const newUser = await db('users').where({id}).first();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "internal server error"});
  }
})

module.exports = router;