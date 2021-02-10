const mongoose = require('mongoose');
const User = require("../models/User")
const books = require("../models/Books")
const email = require('../').email;

// console.log(email)

// retrieve all products from the collection and render index.hbs
exports.render_list = function (req, res) {
    User.find({}).lean()
        .exec((error, data) => {
            
            // console.log(data.length)
            for(i = 0; i < data.length; i++){
                arrBooks = data[i].Books
                var Debt = 0
                //calculate the total debt
                for (j = 0; j < arrBooks.length; j++){
                    var Difference_In_Time =  arrBooks[j].dateBorrowed - arrBooks[j].dateDue; 
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    
                    if (Difference_In_Days >= 1){
                        Debt += (5 * math.floor(Difference_In_Days))
                    } 
                }
                data[i].Bill = Debt
               
            }
            

            res.render("viewUsers.hbs", {person: data})
        })

    
}

