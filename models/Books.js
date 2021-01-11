const mongoose = require('mongoose');
// const databaseURL = "mongodb+srv://admin:admin@weightmate-onmru.mongodb.net/WeightMateDb?retryWrites=true&w=majority";
// const options = { useNewUrlParser: true,
//     useUnifiedTopology: true};
  
// mongoose.connect(databaseURL, options);

const BookSchema = new mongoose.Schema({
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
});

const Books = mongoose.model('Books', BookSchema);
module.exports = Books;