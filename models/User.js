const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    creditCard:{
        type: String,
        required: true,
    },
    
    firstName:{
        type: String,
        required: true,
    },

    lastName:{
        type: String,
        required: true,
    },


    dateReg:{
        type: Date,
        default: Date.now
    },

    Bill:{
        type: Number,
        default: 0
    },

    Books: [

        {
            Title:{
                type: String,
                required: true,
            },
            Author:{
                type: String,
                required: true,
            },
            Genre:{
                type: String,
                required: true,
            },
            
        
            BookNo: {
                type: Number,
                required: true
        
            },
        
            dateBorrowed:{
                type: Date,
                default: Date.now
            },
            dateDue:{
                type: Date
                
            }
            
        }

    ]

});

const User = mongoose.model
('User', UserSchema);

module.exports = User;