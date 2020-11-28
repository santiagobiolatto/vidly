const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:55
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:95
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1024
    }
});

const User = mongoose.model('User', userSchema);

module.exports.userSchema = userSchema;
module.exports.User = User;