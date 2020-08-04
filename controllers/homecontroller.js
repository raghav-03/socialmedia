const user=require('../models/user');
module.exports.home=function(req,res){
    // res.send('home');
    user.findById(req.params.id,function(err,User){
        if(User){
            res.render('../views/home',{
                porfile_user:User
            });
        }
    });
};
module.exports.home1=function(req,res){
    return res.redirect('/user/signin');
};
