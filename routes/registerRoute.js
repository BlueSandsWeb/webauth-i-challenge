const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

router.post('/', (req, res) => {
  res.send("Hello")
})

module.exports = router;