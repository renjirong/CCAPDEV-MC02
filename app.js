
const express           = require('express');
const expressLayouts    = require('express-ejs-layouts');
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const app               = express();
const bcrypt            = require('bcryptjs');
const localStrategy     = require('passport-local').Strategy;
const session           = require('express-session');

//User model
const User = require('./models/User');


//DB 
const db = require('./config/key').MongoURI;

const passport = require('passport');

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
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


//passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser( (user, done) =>{
    done(null, user.id);
})

passport.deserializeUser( (id, done)=>{
    //setup user model
    User.findById(id, (err,user) =>{
        done(err, user);
    });
});

passport.use(new localStrategy( (email, password, done) => {
    
  User.findOne({ email: email}, (err,user) => {
     
      if(err){return done(err);}
      if(!user) {return done(null,false,{message : "Incorrect Username"}); }
      bcrypt.compare(password, user.password, (err,res) =>{
          if(err){ return done(err)}
          if(res === false){
              return done(null, false, {message: "Incorrect password"})
          }
          return done(null, user);
      })
  }) 
}));

function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()) return next();
    res.redirect("/");
    
}
function isLoggedOut(req, res, next){
    console.log(req.url)
    if(!req.isAuthenticated()) return next();
    res.redirect("/login");
    
}

//routes
app.use('/',  require('./routes/index'));
app.use('/mainMenu', require('./routes/mainMenu'));
app.use('/login', isLoggedIn, require('./routes/login'))
app.use('/lib', require('./routes/lib'));
app.use('/regUser', isLoggedIn ,require('./routes/regUser'));


app.post('/verify', passport.authenticate('local', {
    
    successRedirect: '/login/regUser',
    failureRedirect: '/mainMenu/login?error=true'
}))




app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/')
})



const PORT = process.env.PORT || 6969;


app.listen(PORT, console.log('Server started on port '+PORT));
