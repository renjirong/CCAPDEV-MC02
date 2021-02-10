const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load user model
const User = require('../models/User');

function initialize (passport, getUserByEmail, getUserById){

    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null ){
            return done(null, false, {message: 'User not found'})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message : 'Password Incorrect'})
            }
        }catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id));
      
    passport.deserializeUser((id, done) => 
        done(null, getUserById(id)));
} 

module.exports = initialize