const mongoose = require('mongoose');
// const databaseURL = "mongodb+srv://admin:admin@weightmate-onmru.mongodb.net/WeightMateDb?retryWrites=true&w=majority";
// const options = { useNewUrlParser: true,
//     useUnifiedTopology: true};
  
// mongoose.connect(databaseURL, options);

const BookSchema = new mongoose.Schema({
    
});

const Books = mongoose.model('Books', BookSchema);
module.exports = Books;