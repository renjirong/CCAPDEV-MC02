var express = require('express');
var path = require ("path");
var exphbs = require ('espress-handlebars');

var app = express ();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defautLayout:'main'}));
app.set('view engine', 'handlebars');

app.set('port' , (process.env.PORT || 6969));

app.get('/', function(req, res){

    res.render('home');
})

app.listen(app.get('port'), function (){
    console.log('Server started on port '+ app.get('port'))
});