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
app.use('/mainMenu', require('./routes/mainMenu'));
app.use('/user', require('./routes/user'))
app.use('/lib', require('./routes/lib'));
app.use('/regUser', require('./routes/regUser'));

const PORT = process.env.PORT || 6969;


app.listen(PORT, console.log('Server started on port '+PORT));
