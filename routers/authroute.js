const express=require('express');
const auth=express.Router();
const authControllers=require('../routecontroller/authcontroller');
const { emailValidator, passwordValidator, authenticator } = require('../routecontroller/validators');


auth.get('/login',authControllers.getLogin)
auth.post('/login',authenticator(),authControllers.postLogin)
auth.get('/signup',authControllers.getSignup)
auth.post('/signup',emailValidator(),passwordValidator(),authControllers.postSignup)
auth.get('/logout',authControllers.getLogout)
auth.get('/auth',authControllers.getauth)

module.exports=auth;