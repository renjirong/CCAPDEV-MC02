const express = require('express');
const router = express.Router();

// Librarian Page
router.get('/lib', (req, res) => res.render("librarian"));

// Regular User Page
router.get('/regUser', (req, res) => res.render("regularUser"));

module.exports = router;
