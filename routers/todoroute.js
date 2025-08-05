const express=require('express');
const todo=express.Router();
const todoController=require('../routecontroller/todocontroller');
const { isloggedin } = require('../routecontroller/validators');

todo.get('/',isloggedin,todoController.get)
todo.get('/about',todoController.getAbout)
todo.get('/important',todoController.getImportant)
todo.get('/commingsoon',todoController.getCommingsoon)
todo.get('/upcomming',todoController.getUpcomming)
todo.post('/add-todo',todoController.posttodo)
todo.post('/delete-todo',todoController.deletetodo);
module.exports=todo;