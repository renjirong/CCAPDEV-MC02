const express = require('express');
const router = express.Router();



// Regular User Page
router.get('/regUser', (req, res) => res.render("regularUser"));

module.exports = router;
