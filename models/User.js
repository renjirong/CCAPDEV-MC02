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
    userType:{
        type: String,
        required: true,
    },

    bookCount: {
        type: Number,
        required: false
    },
    dateReg:{
        type: Date,
        default: Date.now
    }

    

});

const User = mongoose.model
('User', UserSchema);

module.exports = User;