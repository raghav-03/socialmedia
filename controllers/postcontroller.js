const post=require('../models/post');
const comment=require('../models/comment');

module.exports.create=function(req,res){
    post.create({
        content:req.body.content,
        user: req.user._id
    },function(err,user){
        if(err){
            req.flash('error','error in creating a post')
            return;
        }
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:user
                },
                message: 'Post Created!'
            })
        }
        req.flash('success','created post successfully ')
        res.redirect('back');
    });
}
module.exports.comment=function(req,res){
    post.findById(req.body.post, function(err, post){
        if (post){
            comment.create({
                content: req.body.content,
                Post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                req.flash('error','error in creating a comment')
                    res.redirect('back');
                }
                post.comments.push(comment);
                post.save();
                req.flash('success','created comment successfully ')
                res.redirect('back');
            });
        }

    });
}
module.exports.destroy = function(req, res){
    post.findById(req.params.id, function(err, post){
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();  
            comment.deleteMany({post: req.params.id}, function(err){
                if(req.xhr){
                    return res.status(200).json({
                        data :{
                            post_id:req.params.id
                        },
                        message:'Post Removed!!'
                    })
                }
                req.flash('success','Deleted post and comment successfully ')
                return res.redirect('back');
            });
        }
        else{
            req.flash('error','error in deleting a post')
            return res.redirect('back');
        }        
    }); 
}
module.exports.destroycomment= async function(req,res){
    try{
        let comment1=await comment.findById(req.params.id);
        let post1=await post.findById(comment1.Post);
        var check;
        check=post1.user;
        if(req.user.id==check || comment1.user==req.user.id){
            let postid=comment1.Post;
            comment1.remove();
            await post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});
            req.flash('success','Deleted comment successfully ')
            return res.redirect('back');
        }
        else{
            req.flash('error','error in deleting a comment')
            return res.redirect('back');
        }
    }catch{
        req.flash('error',err);
        return;
    }
}; 