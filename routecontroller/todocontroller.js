const todo =require('../models/todo');
const { user } = require('../models/user');
exports.get=async (req,res)=>{
    let todos=[];
    if(req.session.userid) todos=await todo.find({userid:req.session.userid,priority:'today'})
    res.render('index',{to:'/',login:req.session.isloggedin,todos});
};

exports.getAbout=(req,res)=>{
    res.render('about',{to:'about',login:req.session.isloggedin});
}

exports.getCommingsoon=(req,res)=>{
    res.render('commingsoon',{to:'important',login:req.session.isloggedin});
}

exports.getUpcomming=async(req,res)=>{
    let todos=[];
    if(req.session.userid) todos=await todo.find({userid:req.session.userid,priority:'upcomming'})
    res.render('upcomming',{to:'upcomming',login:req.session.isloggedin,todos});
}

exports.getImportant=async (req,res)=>{
    let todos=[];
    if(req.session.userid) todos=await todo.find({userid:req.session.userid,priority:'important'})
    console.log(todos);
    res.render('important',{to:'important',login:req.session.isloggedin,todos});
}

exports.posttodo=async (req,res)=>{
    const {title,priority,color,subtasks}=req.body;
    const newtodo=new todo({
        title,
        priority,
        color,
        subtasks,
        userid:req.session.userid
        
    })
    newtodo.save()
}
exports.deletetodo=async (req,res)=>{
   console.log(await todo.deleteOne({_id:req.body.id}));

}