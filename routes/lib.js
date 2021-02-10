const express = require('express');
const router = express.Router();
const Book = require('../models/Books');
const libController = require('../controller/libController');
const controller = require('../controller/renderUsers');


// Edit Book Details Page
router.get('/editBooksDB', (req, res) => res.render("editBooksDB"));

// ADD Books Details Page
router.get('/addBook', (req, res) => res.render("addBook"));

// EDIT Books Details Page
router.get('/editBook', (req, res) => res.render("editBook"));

// DELETE Books Details Page
router.get('/deleteBook', libController.render_delete);

router.post('/delete', libController.delete);

// Render Books List Page
router.get('/renderBookList', libController.render_list);


//Add Books to DB
router.post('/addBook', libController.addBook);
    
    
//Edit Books from DB
router.post('/editBook', libController.editBooks); 
    
        



// View User Page
router.get('/viewUsers', controller.render_list);





module.exports = router;
