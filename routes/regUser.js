const express = require('express');
const router = express.Router();
const renderBooks = require('../controller/renderBorrowedBooks');


// borrowBooks Page
router.get('/borrowBooks', renderBooks.render_index);

// returnBooks Page
router.get('/returnBooks', (req, res) => res.render("returnBooks"));


//view Bills page
router.get('/bills', (req, res) => res.render("viewBills"));
module.exports = router;


