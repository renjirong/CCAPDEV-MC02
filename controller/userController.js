const mongoose = require('mongoose');
const User = require("../models/User")
const books = require("../models/Books")
const email = require('../').email;

// console.log(email)

// retrieve all products from the collection and render index.hbs
exports.render_books = function (req, res) {
    
    books.find({}).lean()
        .exec((error, data) => {
            res.render("borrowBooks.hbs", {books: data})
        })

    
}

// retrieve a specific product based on the id 
exports.borrow_book = function (req, res) {
    
    

    user = req.user
    
    books.findOne({BookNo : req.body.BookNo}).lean()
        .exec(function(err, data) {

            if(user.Books.length < 5 && data.Qty > 0){
                var bool = true

                if(user.Books.length != 0){
                    for (i=0 ; i < user.Books.length; i++){
                        if (user.Books[i].BookNo == data.BookNo){
                            bool = false
                            break
                        }
                    }
                }

            
                if(bool){
                    date = new Date()
                    date.setDate(date.getDate() + 7)
                    user.Books.push({
                        Title: data.Title,
                        Author: data.Author,
                        Genre: data.Genre,
                        BookNo: data.BookNo,
                        dateBorrowed: Date.now,
                        dateDue: date
                    })

                    User.deleteOne({email : user.email}).lean()
                        .exec(function(err, data){
                            console.log("Successfully Cleared")
                        })

                    const updateUser = new User({
                        email: user.email,
                        password: user.password,
                        creditCard: user.creditCard,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dateReg: user.dateReg,
                        Bill :user.Bill,
                        Books : user.Books,
                    })

                    // console.log(updateUser)
                    updateUser.save()
                    
                    
                    books.deleteOne({BookNo : data.BookNo}).lean()
                    .exec(function(err, data){
                        console.log("Successfully Cleared")
                    })

                    data.Qty -= 1

                    const updateBooks = new books({
                        Title : data.Title,
                        Author: data.Author,
                        Genre: data.Genre,
                        BookNo: data.BookNo,
                        Qty: data.Qty,
                        dateReg: data.dateReg
                    })
                    
                    updateBooks.save()

                }
            }

            
        });
     
        res.redirect("/regUser/borrowBooks")
}

exports.render_book_list = function (req, res) {
    user = req.user
    res.render("returnBooks", {fName:user.fName, lName: user.lName, books: user.Books})

}

exports.return_book = function (req, res) {
  
    bookNo = req.body.bookNo

    if (bookNo != null){
        arrBooks = req.user.Books
        
        for (i = 0 ; i < arrBooks.length; i++)   {
            if ( arrBooks[i].BookNo == bookNo) { 
                arrBooks.splice(i, 1); 
            }
        }
    }
    
    user = req.user

    User.deleteOne({email : user.email}).lean()
    .exec(function(err, data){
        console.log("Successfully Cleared")
    })

    const updateUser = new User({
        email: user.email,
        password: user.password,
        creditCard: user.creditCard,
        firstName: user.firstName,
        lastName: user.lastName,
        dateReg: user.dateReg,
        Bill :user.Bill,
        Books : user.Books,
    })

    // console.log(updateUser)
    updateUser.save()
    res.redirect("/regUser/returnBooks")

} 

exports.render_bills = function (req, res){
    booksArr = req.user.Books

    // console.log(booksArr)

    
    var Debt = 0

    for (i = 0; i < booksArr.length; i++){
        var Difference_In_Time =  booksArr[i].dateBorrowed - booksArr[i].dateDue; 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
        if (Difference_In_Days >= 1){
            Debt += (5 * math.floor(Difference_In_Days))
        } 
    }
   
    // console.log(Difference_In_Days)

    
    res.render("viewBills",{debt: Debt, fName: req.user.firstName, lName : req.user.lastName})
}

exports.pay_bills = function (req, res){
    
    // console.log(req.body)

    arrBooks = req.user.Books
    var Debt = 0
    //calculate the total debt
    for (i = 0; i < booksArr.length; i++){
        var Difference_In_Time =  booksArr[i].dateBorrowed - booksArr[i].dateDue; 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
        if (Difference_In_Days >= 1){
            Debt += (5 * math.floor(Difference_In_Days))
        } 
    }

    // remove the paid debt
    if(req.body.amount >= Debt ){
        for (i = 0 ; i < arrBooks.length; i++)   {

            var Difference_In_Time =  arrBooks[i].dateBorrowed - arrBooks[i].dateDue; 
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            
            if (Difference_In_Days >= 1){
                arrBooks.splice(i, 1); 
            } 
        }

        //update User bill
        user = req.user

        User.deleteOne({email : user.email}).lean()
        .exec(function(err, data){
            console.log("Successfully Cleared")
        })

        const updateUser = new User({
            email: user.email,
            password: user.password,
            creditCard: user.creditCard,
            firstName: user.firstName,
            lastName: user.lastName,
            dateReg: user.dateReg,
            Books : user.Books,
        })

        // console.log(updateUser)
        updateUser.save()
    }
    res.redirect("/regUser/bills")
}