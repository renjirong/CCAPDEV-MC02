const express = require('express');
const router = express.Router();
const Book = require('../models/Books');


// Edit Book Details Page
router.get('/editBooksDB', (req, res) => res.render("editBooksDB"));

// ADD Books Details Page
router.get('/addBook', (req, res) => res.render("addBook"));

// EDIT Books Details Page
router.get('/editBook', (req, res) => res.render("editBook"));

// DELETE Books Details Page
router.get('/deleteBook', (req, res) => res.render("deleteBook"));

// Render Books List Page
router.get('/renderBookList', (req, res) => res.render("renderBookList"));


//Add Books to DB
router.post('/addBook', (req,res) => {
    const { title, author, genre, bNo, qty} = req.body;
    
    Book.findOne({ BookNo : bNo })
        .then(book => {
            if(book){
                res.redirect('addBook')
            }
            else{
                const newBook = new Book({
                    Title: title,
                    Author: author,
                    Genre: genre,
                    BookNo: bNo,
                    Qty: qty,
                    
                });
               
                newBook.save()
                .then(book => {
                    res.redirect('addBook')
                })
                .catch(err => console.log(err));
  
            }

        });
    
});
    
    
//Edit Books from DB
router.post('/editBook', (req,res) =>{
    const { title, author, genre, bNo, qty} = req.body;
    
    Book.findOne({BookNo: bNo})
        .then(book =>{
            if(!book){
                res.redirect('editBook')
            }
            else{
                const updateBook = new Book({
                    Title: title,
                    Author: author,
                    Genre: genre,
                    BookNo: bNo,
                    Qty: qty,
                })
                
                // Book.updateOne({BookNo: bNo}, {$set : updateBook })
                // console.log(Book.updateOne({BookNo: bNo}, {$set : updateBook }));
                Book.find({BookNo : bNo})
                    .then(book => {
                        res.redirect('editBook')
                    })
                    .catch(err => console.log(err));
                
                

            }
        })
    
});     
    
        



// View User Page
router.get('/viewUsers', (req, res) => res.render("viewUsers"));


//borrow Request Page
router.get('/borrowReq', (req, res) => res.render("borrowRequests"));


module.exports = router;
