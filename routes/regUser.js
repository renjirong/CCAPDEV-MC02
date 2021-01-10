const express = require('express');
const router = express.Router();

// borrowBooks Page
router.get('/borrowBooks', (req, res) => res.render("borrowBooks"));

// returnBooks Page
router.get('/returnBooks', (req, res) => res.render("returnBooks"));


//view Bills page
router.get('/bills', (req, res) => res.render("viewBills"));
module.exports = router;
