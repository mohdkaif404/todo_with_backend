const { validationResult } = require("express-validator");
const { user } = require("../models/user");


exports.getLogin=(req,res)=>{
    if(req.session.user) return res.redirect('/');
    else return res.render('login',{to:'/login',type:"Login",errors:[]});
};

exports.postSignup=(req,res)=>{
    const result=validationResult(req);
    if(result.isEmpty()){
        const userObj=new user(req.body);
        userObj
        .save()
        .then((val)=>{  return res.redirect('/login')})
        .catch((err)=> { 
            return res.render('login',{to:'/signup',type:"Register",errors:['Something Went wrong']}); })
    }
    else{
       let err=Array.from(result.errors).map((val)=> val.msg )
       return res.render('login',{to:'/signup',type:"Register",errors:err});
    }
    
}

exports.getSignup=(req,res)=>{
    if(req.session.user) return res.redirect('/');
    else res.render('login',{to:'/signup',type:"Register",errors:[]});
}

exports.postLogin=async (req,res)=>{
    const result=validationResult(req);
    if(result.isEmpty()){
        const {email,password}=req.body;
        const users=await user.findOne({email,password});
        req.session.isloggedin=true;
        req.session.user=users;
        req.session.userid=users._id;
        return res.redirect('/');
    }else{
        let err=Array.from(result.errors).map((val)=> val.msg )
        return res.render('login',{to:'/login',type:"login",errors:err});
    }
    
}

exports.getLogout=(req,res)=>{
    req.session.destroy(err => {
        if (err) return res.status(500).send('Could not log out.');
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
}
exports.getauth=(req,res)=>{
    if(req.session.isloggedin) res.json({isloggedin:true})
    else res.json({isloggedin:false});
}