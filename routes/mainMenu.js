const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render("login"));

// Reg Page
router.get('/register', (req, res) => res.render("register"));

router.post('/register', (req,res) => {
    const { username, email, pwd, cc} = req.body;

    User.findOne({email: email})
        .then(user => {
            if(user){
                errors.push({msg: 'Email is already registered'})
                res.render('register', {
                    username,
                    email,
                    pwd,
                    cc

                });
            } else {
                const newUser = new User({
                    username,
                    email,
                    pwd,
                    cc 
                });

                //encrypt password and cc
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.pwd, salt, (err, hash) =>{
                        if(err) throw err;
                        //Hash Password
                        newUser.pwd = hash;
                        //Save User to DB
                        newUser.save()
                            .then(user => {
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                }))

            }
        });

     

});
module.exports = router;
