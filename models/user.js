
const mongoose=require('mongoose');

let user= new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please Enter Email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please Enter Password']
    }
})

exports.user=mongoose.model('User',user);
