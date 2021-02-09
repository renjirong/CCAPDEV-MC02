const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();






//DB 
const db = require('./config/key').MongoURI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
//add a static folder
app.use(express.static('static'));

//HBS
app.use(expressLayouts);
app.set('view engine', 'hbs');




//middleware  
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));



//routes
app.use('/', require('./routes/index'));
app.use('/mainMenu', require('./routes/mainMenu'));
app.use('/login', require('./routes/login'))
app.use('/lib', require('./routes/lib'));
app.use('/regUser', require('./routes/regUser'));

const PORT = process.env.PORT || 6969;


app.listen(PORT, console.log('Server started on port '+PORT));
