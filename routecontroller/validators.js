const {body, check}=require('express-validator');
const { user } = require('../models/user');

exports.emailValidator=()=>{ 
    return (
    check('email')
    .trim()
    .notEmpty()
    .withMessage('Please Give correct Email')
    .custom(async (val,{req})=>{ 
        const email=await user.findOne({email:val});
        if(email) throw new Error('User already Exist');
    }) ) }
exports.passwordValidator=()=>{return check('password').trim().notEmpty().withMessage("Please Provide password").isAlphanumeric().withMessage('Password Should Contains Alphanumeric')}

exports.authenticator=()=>{
    return (
        check('email').custom(async (email,{req})=>{
            const {password}=req.body;
            const val=await user.findOne({email});
            if(!val) throw new Error('User does not exist');
            else{
                console.log(val)
                if(password!=val.password) throw new Error("Wrong password");
            }
        })
    )
}

exports.isloggedin=(req,res,next)=>{
    if(req.session.isloggedin) req.isloggedin=true;
    next();
}