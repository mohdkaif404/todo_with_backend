const path=require('path');
const express=require('express');
const app=express();
const rootdir=require('./utills/pathutills');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose')
const authroute=require('./routers/authroute');
const todoroute=require('./routers/todoroute');
const { error404 } = require('./routecontroller/error');
const session =require('express-session');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(rootdir,'public')));
app.use(cookieParser());
app.use(session({
    secret:"mohdkaif",
    saveUninitialized:false,
    resave:false
}))
app.set('view engine','ejs');
app.set('views',path.join(rootdir,'views'));

app.use(todoroute);
app.use(authroute);
app.use(error404);
const PORT=process.env.PORT|3000;
app.listen(PORT ,()=>{
   
    mongoose.connect(`mongodb+srv://fardeenmohd404:${process.env.DB_PASSWORD}@todocluster.llblike.mongodb.net/?retryWrites=true&w=majority&appName=todocluster`).then((val)=>{
        
    }).catch((err)=>{
        console.log(err);
    })
})