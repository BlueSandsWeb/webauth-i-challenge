const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

const db = require('../database/dbConfig.js');

router.get('/', lockdown, async (req, res) => {
  try {
    const users = await db('users').select('id', 'username', 'password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

async function lockdown(req, res, next) {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "It's broken :(" });
  }
}

module.exports = router;