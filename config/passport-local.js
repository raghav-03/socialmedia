const passport=require('passport');

const user=require('../models/user');
const Localstrategy=require('passport-local').Strategy;

passport.use(new Localstrategy({
    usernameField:'email',
    passReqToCallback:'true'
},
    function(req,email ,password, done){
        user.findOne({email:email},function(err,user){
            if(err){
                // console.log('Error');
                req.flash('error',err);
                return done(err);
            }
            if(!user|| user.password!=password){
                // console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        })
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});


passport.deserializeUser(function(id,done) {
    user.findById(id,function(err, user){
        if(err){
            console.log('Error');
            return done(err);
        }
        return done(null,user);
    });
});


// check if user is authenticated or not

passport.checkauthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // if not signed in
    return res.redirect('/user/signin');
};

passport.setauthenticated=function(req,res,next){
    if(req.isAuthenticated()){
        // return next();
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;