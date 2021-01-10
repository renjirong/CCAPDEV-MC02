const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => res.send("Login"));

// Reg Page
router.get('/register', (req, res) => res.send("Register"));

module.exports = router;
