const express=require('express');
const port=3601;
const path = require('path');
const cookieparser=require('cookie-parser');
const app=express();    
app.use(express.static('./assets'));
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie and authentication
const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local');
const passport_jwt=require('./config/passport-jwt');
const passportGoogle=require('./config/passport-google-oath');
const crypto=require('crypto');
const MongoStore = require('connect-mongo')(session);
const flash=require('connect-flash');
//sass middleware
const flashmiddleware=require('./config/middleware');

const sassMiddleware =require('node-sass-middleware');
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieparser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScript',true); 

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'social',
    secret:'raghavagarwal',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthenticated);
app.use(flash());
app.use(flashmiddleware.setflash);
app.use('/',require('./routes/index'))
app.listen(port,function(err){
    if(err){
        console.log(`Error: ${err}`);
    }
    console.log(`Running fine on Port: ${port}`);
});
