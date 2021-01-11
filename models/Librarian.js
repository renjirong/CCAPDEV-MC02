const mongoose = require('mongoose');


const LibrarianSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    
});

const Librarian = mongoose.model('Librarian', LibrarianSchema);

module.exports = Libraian;