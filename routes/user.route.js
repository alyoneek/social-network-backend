const express = require('express');
const verifyToken = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', [verifyToken], (req, res) => {
  res.status(200).send('Auth Content.');
});

router.get('/hey', (req, res) => {
  res.status(200).send('All Content.');
});

module.exports = router;
