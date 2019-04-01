const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.send("Login Route Works");
})

module.exports = router;