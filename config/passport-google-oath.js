const passport=require('passport');
const googlestratogy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');

passport.use(new googlestratogy({
        clientID:"221194791828-g7ddm7t31c35a8h36gvlj2j526a3niu0.apps.googleusercontent.com",
        clientSecret:"B2JJCLD6lMdmJ3DgGp1gO_om", 
        callbackURL:"http://localhost:3601/user/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log("Error in google strategy passport", err); return;}
            
            console.log(profile);

             //if found, set the user as req.user
            if(user){
                return done(null, user);
               
            }else{
                //  if not found, create the user and set it as req.user
                console.log('***** new user lets create ')
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }, function(err, user){
                    if(err){console.log("Error in creating user google strategy passport", err); return;}

                    return done(null, user);
                })
            }
        })
    }
))