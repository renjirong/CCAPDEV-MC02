const express = require('express');
const router = express.Router();

// Edit Book Details Page
router.get('/editBooks', (req, res) => res.render("editBooks"));

// View User Page
router.get('/viewUsers', (req, res) => res.render("viewUsers"));


//borrow Request Page
router.get('/borrowReq', (req, res) => res.render("borrowRequests"));


module.exports = router;
