const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const comment=mongoose.model('comment',commentSchema);

module.exports =comment;