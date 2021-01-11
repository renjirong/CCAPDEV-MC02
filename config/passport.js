const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load User
const User = require('../models/User');

console.log("RED");
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({username: "email"}, (email, password, done) => {
            //Find User
            User.findOne({ email: email})
                .then(console.log(email))
                // .then(user => {
                //     if(!user){
                //         return done(null, false, { message: "Email is not registered"});
                //     }

                //     //find password
                //     bcrypt.compare(password, user.password, (err, isMatch) => {
                //         if(err) throw err;
                        
                //         if(isMatch){
                //             return done(null, user);
                //         }
                //         else{
                //             return done(null, false, {message: "Password incorrect"});
                //         }
                //     });
                    

                // })
                .catch(err => console.log(err));
        })
    ); 
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
          done(err, user);
        });
      });
}