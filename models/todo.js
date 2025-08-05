const { default: mongoose, mongo } = require("mongoose");
const {user}=require('./user');

const todoschema=new mongoose.Schema({
    title: String,
    subtasks:mongoose.Schema.Types.Array,
    color: String,
    priority: String,
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user
    }
})

module.exports=mongoose.model('todo',todoschema);