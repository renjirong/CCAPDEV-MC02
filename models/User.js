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
    
    

    bookCount: {
        type: Number,
        default: 0
    },
    dateReg:{
        type: Date,
        default: Date.now
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
        
            Qty: {
                type: Number,
                required: true
        
            },
        
            dateReg:{
                type: Date,
                default: Date.now
            }
        }

    ]

});

const User = mongoose.model
('User', UserSchema);

module.exports = User;