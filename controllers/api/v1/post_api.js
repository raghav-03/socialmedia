const post=require('../../../models/post');
const comment=require('../../../models/comment');

module.exports.index=async function(req,res){
    let posts=await post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    return res.json(200,{
        message:"list of posts",
        posts: posts
    })
}


module.exports.destroy = function(req, res){
    post.findById(req.params.id, function(err, post){
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();  
            comment.deleteMany({post: req.params.id}, function(err){
                // if(req.xhr){
                //     return res.status(200).json({
                //         data :{
                //             post_id:req.params.id
                //         },
                //         message:'Post Removed!!'
                //     })
                // }
                // req.flash('success','Deleted post and comment successfully ')
                // return res.redirect('back');
                return res.json(200,{
                    message:"Post and comments deleted"
                })
            });
        }else{
            return res.json(401,{
                message:"You cannot delete this post"
            })
        //     req.flash('error','error in deleting a post')
        //     return res.redirect('back');
        }        
    }); 
}