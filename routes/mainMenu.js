const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


//User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render("login"));

// Reg Page
router.get('/register', (req, res) => res.render("register"));

// Librarian Login Page
router.get('/libLogin', (req, res) => res.render("LibrarianLogin"));


router.get('/userExists', (req, res) => res.render("userExists"));

router.get('/regSuccess', (req, res) => res.render("regSuccess"));

router.post('/register', (req,res) => {
    const { email, pwd, cc} = req.body;
    
    User.findOne({ email: email })
        .then(user => {
            if(user){
                
                res.redirect('userExists')

                
            }
            else{



                const newUser = new User({
                    
                    email: email,
                    password: pwd,
                    creditCard: cc,
                    
                
                });
                
                
                
                bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //set password to hash
                        newUser.password=hash;
                        //save user
                        newUser.save()
                        .then(user => {
                            res.redirect('/');
                        })
                        .catch(err => console.log(err));

                    })) 
                    res.redirect('regSuccess')
            }

        });
    
});
 
//login handler
router.post("/login", (req,res, next) => {
    


    

    passport.authenticate('local', {
        successRedirect: '/login/regUser',
        failureRedirect: '/mainMenu/login'
        
    })(req, res, next);
});


router.post("/libLogin", (req,res) => {
    const { username, password} = req.body;
    console.log(username);
    console.log(password);
    
    if(username == "admin" && password == "abcd1234"){
        
        res.redirect("/login/lib")
    }
    else{
        res.redirect("/mainMenu/libLogin")
    }
    
    
});

module.exports = router;
