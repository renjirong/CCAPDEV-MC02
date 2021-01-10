const express = require('express');
const expressLayouts = require('express-ejs-layouts');




const app = express();


//add a static folder
app.use(express.static('static'));

//HBS
app.use(expressLayouts);
app.set('view engine', 'hbs');

//routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 6969;


app.listen(PORT, console.log('Server started on port '+PORT));
