const mongoose = require('mongoose');
const User = require("../models/User")
const books = require("../models/Books")
const email = require('../').email;

// console.log(email)

// retrieve all products from the collection and render index.hbs
exports.render_delete = function (req, res) {
    books.find({}).lean()
        .exec((error, data) => {
            res.render("deleteBook.hbs", {books: data})
        })

    
}

// retrieve a specific product based on the id 
exports.delete = function (req, res) {
    
    // console.log(req.body.BookNo)
    books.deleteOne({BookNo : req.body.BookNo}).lean()
        .exec(function(err, data) {
            console.log("Update Successful")
        });
    
    res.redirect("/lib/deleteBook")
}

// retrieve all products from the collection and render index.hbs
exports.render_list = function (req, res) {
    books.find({}).lean()
        .exec((error, data) => {
            res.render("renderBookList.hbs", {books: data})
        })

    
}

exports.addBook = function (req,res)  {
    const { title, author, genre, bNo, qty} = req.body;
    
    books.findOne({ BookNo : bNo })
        .then(book => {
            if(book){
                res.redirect('addBook')
            }
            else{
                const newBook = new books({
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
    
}

exports.editBooks = function (req,res) {
    const { title, author, genre, bNo, qty} = req.body;
    
    books.deleteOne({BookNo : bNo}).lean()
        .exec(function(err, data) {
            console.log("Update Succesful")
        });

    books.findOne({ BookNo : bNo })
        .then(book => {
            if(book){
                res.redirect('addBook')
            }
            else{
                const newBook = new books({
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
        
    
}