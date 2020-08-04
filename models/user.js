const mongoose = require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadedavatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH

const user=mongoose.model('user',userSchema);

module.exports =user;







// // static
// userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;

