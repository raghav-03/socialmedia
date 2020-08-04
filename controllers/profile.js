const User=require('../models/user');
const post=require('../models/post');
const { populate } = require('../models/post');
const { compile } = require('ejs');
const fs=require('fs');
const path=require('path');
module.exports.home= async function(req,res){
    try{
        let posts=await post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        let users=await User.find({});
        return res.render('../views/user_profile', {
            users_all:users,
            posts:  posts
        });
    }catch{
        console.log(err);
        return ;
    }
    // post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){
    //     User.find({},function(err,users){
    //         return res.render('../views/user_profile', {
    //             users_all:users,
    //             posts:  posts
    //         });
    //     });
    // })


    
    // if(req.cookies.user_id){
    //     if(req.cookies.user_id!=-1)
    //     {
    //         User.findById(req.cookies.user_id,function(err,data){
    //             if(err){
    //                 console.log('Error in fetching data');
    //                 return;
    //             }
    //                 return res.render('../views/user_profile',{
    //                 title: "social media",
    //                 social_media:data
    //              });
    //         });
    //     }
    //     else{
    //         return res.redirect('../user/signin');
    //     }
    // }
    // else{
    //     return res.redirect('../user/signin');
    // }
};
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        req.flash('success','sign-up successfully ')
        return res.redirect('/user/profile');
    }
    res.render('../views/sign-up');
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }
    res.render('../views/sign-in');
}
module.exports.create=function(req,res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error',' Password Not Matched ')
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                req.flash('success','sign-up successfully ')
                return res.redirect('../user/signin');
            })
        }else{
            req.flash('error',' User already exist Plz sign-in ')
            return res.redirect('back');
        }

    });
};
module.exports.session=function(req,res){
    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}
    //     if(user){
    //         if(user.password!=req.body.password){
    //             console.log('Password Incorrect!!!');
    //             return res.redirect('back');
    //         }
    //         res.cookie('user_id',user.id);
    //         res.redirect('/user/profile');

    //     }
    //     else{
    //         console.log('User not found!!');
    //         res.redirect('back');
    //     }
    // });
    req.flash('success',' Logged in Successfully ')
    return res.redirect('/user/profile');
};
module.exports.destroy=function(req,res){
        req.logout();
        req.flash('success',' Logged out Successfully ')
        res.redirect('/user/signin');
};
module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         if(user){
    //             req.flash('success',' updated user Successfully ')
    //             return res.redirect('back');
    //         }
    //     });
    // }
    // else{
    //     req.flash('error',' Unathorised ')
    //     return res.redirect('back');
    // }
    if(req.user.id==req.params.id){
        try{
            
            let user=await User.findById(req.params.id);
            User.uploadedavatar(req,res,function(err){
                if(err){
                    console.log('error',err);
                }
                user.name=req.body.name,
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename
                }
                user.save();
                return res.redirect('back');
            });
        }catch{
            req.flash('error', err)
            return res.redirect('back');
        }
    }
    else{
        // req.flash('error',' Unathorised ')
        return res.redirect('back');
    }
}