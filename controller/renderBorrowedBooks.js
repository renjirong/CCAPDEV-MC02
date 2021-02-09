const mongoose = require('mongoose');
const User = require("../models/User")
const books = require("../models/Books")
const email = require('../').email;

console.log(email)

// retrieve all products from the collection and render index.hbs
exports.render_index = function (req, res) {
    console.log(email)

    console.log(books)
    
    // find all products from the Product collection and pass on the language chosen and list of products to index.hbs
    // books.find({}).lean()
    //     // execute query
    //     .exec((error, data) => {
    //        //Some code
    //        books = data
    //        console.log("NEW")
           
           
    //        res.render("borrowBooks.hbs", { books: books })
    //     });


    
    
}