const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


// borrowBooks Page
router.get('/borrowBooks', userController.render_books);
router.post('/borrow', userController.borrow_book)

// returnBooks Page
router.get('/returnBooks', userController.render_book_list);
router.post('/return', userController.return_book);

//view Bills page
router.get('/bills', userController.render_bills);
router.post('/pay', userController.pay_bills);
module.exports = router;


